param( [string]$testSuiteId = $env:AUTOMATOR_TEST_SUITE_ID )

$token = $env:AUTOMATOR_TOKEN

Write-Output $testSuiteId

$body = @{
    "authToken"   = $token
    "testSuiteId" = $testSuiteId
}

[int]$totalRunTime = 0
[int]$maxRunTime = 3000

$testResults = $null;

function Get-Results {
    Param([string]$Uri, $BuildId)
    try {
        $bodyPoll = @{
            authToken = $token
            buildId   = $buildId
        }

        $params = @{
            Uri         = $Uri
            Method      = 'Post'
            Body        = ($bodyPoll | ConvertTo-Json)
            ContentType = "application/json"

        }
        Write-Output @params;
        $resultResponse = Invoke-RestMethod @params;

        return $resultResponse
    }
    catch [System.Net.WebException] {
        Write-Warning "An exception was caught: $($_.Exception.Message)"
        exit 1;
    }
    Write-Output $resultResponse
}

function Write-Results {
    Param($resultsData)
    Write-Information $resultsData
    if ($testResults.passed -eq $true) {
        #have tests passed 
        Write-Output "DeepCrawl Tests Passed"
        exit 0
    }
    else {
        #have tests failed
        Write-Output "DeepCrawl Tests Failed"
        exit 1
    }
}

function Start-Poll {
    Param($BuildId)
    $testResults = Get-Results -Uri "https://beta-triggers.deepcrawl.com/poller" -BuildId $BuildId
    if ( [bool]($testResults.PSobject.Properties.name -match "passed")) {
        #do results contain the passed prop
        Write-Results($testResults)
    }
    else {
        Write-Output "Waiting for DeepCrawl Test Results ..."
        Start-Sleep -Seconds 30 #wait and run poll again
        $totalRunTime += 30
    }
}

function Get-Timeout() {
    if ($totalRunTime -lt $maxRunTime) {
        return $true;
    }
    else {
        return $false;
    }
}

function Start-Build {

    $params = @{
        Uri         = "https://beta-triggers.deepcrawl.com/start"
        Method      = 'Post'
        Body        = ($body | ConvertTo-Json)
        ContentType = "application/json"

    }

    $triggerResponse = Invoke-RestMethod @params;
    Write-Output $triggerResponse;

    while ( ($null -eq $testResults) -and (Get-Timeout) ) {
        #poll server
        Start-Poll -BuildId $triggerResponse.buildId
    }
    
}

Start-Build