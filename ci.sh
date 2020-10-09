#!/bin/bash
testSuiteId=${1:-$AUTOMATOR_TEST_SUITE_ID}
startOnly=${2:-$AUTOMATOR_START_ONLY}
ciBuildId=${3:-$CI_BUILD_ID}

if [ -z $testSuiteId ]; then
    exit "No TestSuite Id Set"
fi

totalRunTime=0
maxRunTime=3000
testResults=''

function GetAuthToken() {
    local bodyMutation="{\"query\":\"mutation{createSessionUsingUserKey(input:{userKeyId:\\\"$AUTOMATOR_USER_KEY_ID\\\",secret:\\\"$AUTOMATOR_USER_KEY_SECRET\\\"}){token}}\"}"
    resultResponse=$(curl -s -X POST "https://graph.deepcrawl.com/" -H "Content-Type:application/json" -d $bodyMutation)
    authToken=$(echo $resultResponse | jq -r '.data.createSessionUsingUserKey.token')
}

function DeleteAuthToken() {
    local bodyMutation="{\"query\":\"mutation{deleteSession{token}}\"}"
    resultResponse=$(curl -s -H "X-Auth-Token: $authToken" -X POST "https://graph.deepcrawl.com/" -H "Content-Type:application/json" -d $bodyMutation)
}

function GetResults() {
    local bodyPoll="{\"authToken\":\"$authToken\",\"buildId\":$1}"
    resultResponse=$(curl -s -X POST "https://tools.automator.deepcrawl.com/poller" -H "Content-Type:application/json" -d $bodyPoll)
    echo $resultResponse
}

function WriteResults() {
    if [ $(echo "$1" | jq '.passed') == "true" ]; then
        #have tests passed
        echo "DeepCrawl Tests Passed"
        exit 0
    else
        #have tests failed
        echo "DeepCrawl Tests Failed"
        exit 1
    fi
}

function StartPoll() {
    testResults="$(GetResults $1)"
    if [ $testResults ]; then
        WriteResults $testResults
    else
        echo "Waiting for DeepCrawl Test Results ..."
        sleep 30
        totalRunTime=$(($totalRunTime + 30))
    fi
}

function StartBuild() {
    local body="{\"authToken\":\"$authToken\",\"testSuiteId\":\"$testSuiteId\",\"ciBuildId\":\"$ciBuildId\"}"
    RESPONSE=$(curl -s -X POST "https://tools.automator.deepcrawl.com/start" -H "Content-Type:application/json" -d $body)
    resp=$(echo $RESPONSE | jq '.buildId')

    if [ "$startOnly" = "true" ] || [ "$startOnly" = "1" ]; then
        echo "DeepCrawl Skipped Polling"
        exit 0
    fi

    if [ $? -eq 0 ]; then
        until [[ $testResults && $totalRunTime -lt $maxRunTime ]]; do
            StartPoll $resp
        done
    fi
}

GetAuthToken

StartBuild

DeleteAuthToken
