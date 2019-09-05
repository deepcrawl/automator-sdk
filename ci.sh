#!/bin/bash

totalRunTime=0
maxRunTime=$AUTOMATOR_TIMEOUT_SEC
body="{\"authToken\":\"$AUTOMATOR_TOKEN\",\"testSuiteId\":\"$AUTOMATOR_TEST_SUITE_ID\"}"
meridianResults='';

function GetResults () {

    local bodyPoll="{\"authToken\":\"$AUTOMATOR_TOKEN\",\"buildId\":$1}"
    resultResponse=$(curl -s "$AUTOMATOR_POLL_URL" -H "Content-Type:application/json" -d "$bodyPoll")
    echo "$resultResponse"
    
}

function WriteResults () {
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

function StartPoll () {
    meridianResults="$(GetResults "$1")"
    if [ "$meridianResults" ]; then
        WriteResults "$meridianResults"
    else
        echo "Waiting for DeepCrawl Test Results ..."
        sleep 30
        totalRunTime=$((totalRunTime + 30))
    fi
}

function StartBuild () {
    RESPONSE=$(curl -s "$AUTOMATOR_START_URL" -H "Content-Type:application/json" -d "$body" )
    resp=$(echo "$RESPONSE" | jq '.buildId')

    if [ $? -eq 0 ]; then
        until [[ $meridianResults && $totalRunTime -lt $maxRunTime ]]; do
            StartPoll "$resp"
        done
    fi
}

StartBuild
