param( $testSuiteId = $env:AUTOMATOR_TEST_SUITE_ID )
$token = $env:AUTOMATOR_TOKEN
Write-Output $testSuiteId
$body = @{
    "authToken"   = $token
    "testSuiteId" = $testSuiteId
}

[int]$totalRunTime = 0
[int]$maxRunTime = $env:AUTOMATOR_TIMEOUT_SEC

$meridianResults = $null;

function Get-Results {
    Param([string]$Uri, $BuildId)
    try {
        $bodyPoll = @{
            authToken = $token
            buildId   = $buildId
        }
        $resultResponse = Invoke-RestMethod -Uri $Uri -Method 'Post' -Body ($bodyPoll | ConvertTo-Json) -ContentType "application/json"
        return $resultResponse
    }
    catch [System.Net.WebException] {
        Write-Verbose "An exception was caught: $($_.Exception.Message)"
        return $null;
    }
    Write-Output $resultResponse
}

function Write-Results {
    Param($resultsData)
    Write-Output $resultsData
    if ($meridianResults.passed -eq $true) {
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
    $meridianResults = Get-Results -Uri $env:AUTOMATOR_POLL_URL -BuildId $BuildId
    if ( [bool]($meridianResults.PSobject.Properties.name -match "passed")) {
        #do results contain the passed prop
        Write-Results($meridianResults)
    }
    else {
        Write-Output "Waiting for DeepCrawl Test Results ..."
        Start-Sleep -Seconds 30 #wait and run poll again
        $totalRunTime += 30
    }
}


function Start-Build {

    $triggerResponse = Invoke-RestMethod -Uri $env:AUTOMATOR_START_URL -Method "Post" -Body ($body | ConvertTo-Json) -ContentType "application/json";
    Write-Output $triggerResponse;

    while ( ($null -eq $meridianResults) -and ($totalRunTime -lt $maxRunTime) ) {
        #poll server
        Start-Poll -BuildId $triggerResponse.buildId
    }
    
}

Start-Build