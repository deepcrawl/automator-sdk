#!/bin/bash
testSuiteId=${1:-$AUTOMATOR_TEST_SUITE_ID}
startOnly=${2:-$AUTOMATOR_START_ONLY}
ciBuildId=${3:-$CI_BUILD_ID}

if [[ -z $testSuiteId ]]
then
    exit "No TestSuite Id Set"
fi

totalRunTime=0
maxRunTime=3000
testResults=''

function GetAuthToken() {
    local bodyMutation="{\"query\":\"mutation{createSessionUsingUserKey(input:{userKeyId:\\\"$AUTOMATOR_USER_KEY_ID\\\",secret:\\\"$AUTOMATOR_USER_KEY_SECRET\\\"}){token}}\"}"
    resultResponse=$(curl -s -X POST "https://api.lumar.io/graphql" -H "Content-Type:application/json" -d $bodyMutation)
    errors=$(echo $resultResponse | jq -r '.errors')
    if [[ $errors == "null" ]]
    then
        authToken=$(echo $resultResponse | jq -r '.data.createSessionUsingUserKey.token')
    else
        echo 'Getting Auth Token > Errors Found:' $errors
    fi
}

function DeleteAuthToken() {
    local bodyMutation="{\"query\":\"mutation{deleteSession{token}}\"}"
    resultResponse=$(curl -s -H "X-Auth-Token: $authToken" -X POST "https://api.lumar.io/graphql" -H "Content-Type:application/json" -d $bodyMutation)
    errors=$(echo $resultResponse | jq -r '.errors')
    if [[ $errors != "null" ]]
    then
        echo 'Delete Auth Token > Errors Found:' $errors
    fi
}

function GetResults() {
    local bodyPoll="{\"authToken\":\"$authToken\",\"buildId\":$1}"
    resultResponse=$(curl -s -X POST "https://tools.automator.deepcrawl.com/poller" -H "Content-Type:application/json" -d $bodyPoll)
    echo $resultResponse
}

function WriteResults() {
    if [[ $(echo "$2" | jq '.passed') == "true" ]]
    then
        #have tests passed
        echo "Lumar Tests Passed"
        GetBuildUrl $1
        exit 0
    else
        #have tests failed
        echo "Lumar Tests Failed"
        GetBuildUrl $1
        exit 1
    fi
}

function GetBuildUrl() {
    buildId=$(echo $1 | sed 's/"//g')
    resultResponse=$(curl -s -X POST "https://api.lumar.io/graphql" -H "Content-Type:application/json" -H "X-Auth-Token: $authToken" -d "{\"query\":\"{node(id: \\\"$buildId\\\"){ ...on Build{ testSuite { id account { id } } }}}\"}")
    errors=$(echo $resultResponse | jq -r '.errors')
    if [[ $errors != "null" ]]
    then
        echo 'Get Build Url> Errors Found:' $errors
    else
        buildAccountId=$(echo $resultResponse | jq -r '.data.node.testSuite.account.id')
        buildTestSuiteId=$(echo $resultResponse | jq -r '.data.node.testSuite.id')
        echo "A detailed report can be viewed at: https://automator.deepcrawl.com/account/$buildAccountId/test-suites/$buildTestSuiteId/build-tests/$buildId"
    fi
}

function StartPoll() {
    testResults="$(GetResults $1)"
    if [[ $testResults ]]
    then
        WriteResults $1 $testResults
    else
        echo "Waiting for Lumar Test Results ..."
        sleep 30
        totalRunTime=$(($totalRunTime + 30))
    fi
}

function StartBuild() {
    local body="{\"authToken\":\"$authToken\",\"testSuiteId\":\"$testSuiteId\",\"ciBuildId\":\"$ciBuildId\"}"
    RESPONSE=$(curl -s -X POST "https://tools.automator.deepcrawl.com/start" -H "Content-Type:application/json" -d $body)
    resp=$(echo $RESPONSE | jq '.buildId')

    if [[ "$startOnly" = "true" ]] || [[ "$startOnly" = "1" ]]
    then
        echo "Lumar Skipped Polling"
        exit 0
    fi

    if [[ $? -eq 0 ]]
    then
        until [[ $testResults && $totalRunTime -lt $maxRunTime ]]
        do
            StartPoll $resp
        done
    fi
}

GetAuthToken

StartBuild

DeleteAuthToken
