param(
    [string]$testSuiteId = $env:AUTOMATOR_TEST_SUITE_ID,
    [string]$startOnly = $env:AUTOMATOR_START_ONLY
)

$secret = $env:AUTOMATOR_USER_KEY_SECRET
$key_id = $env:AUTOMATOR_USER_KEY_ID

function Get-Auth-Token {

    $query = @{"query" = "mutation { createSessionUsingUserKey(input: {userKeyId:""$key_id"" secret:""$secret""}) { token }}"} | ConvertTo-Json -Depth 9

    $params = @{
        Uri         = "https://api.lumar.io/graphql"
        Method      = 'Post'
        Body        = ($query)
        ContentType = "application/json"
    }

    try {
        $response = Invoke-RestMethod @params;
    } catch {
        Write-Host " "
        Write-Host "Get Auth Token Error"
        Write-Host "===================="
        Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
        Write-Host "Error Message:" $_.Exception.Message
    }

    return $response.data.createSessionUsingUserKey.token
}

function Delete-Auth-Token {
    $params = @{
        Uri         = "https://api.lumar.io/graphql"
        Method      = 'Post'
        Body        = (@{"query" = "mutation { deleteSession { token }}"} | ConvertTo-Json)
        ContentType = "application/json"
        Headers     = @{
            'X-Auth-Token' = $token
        }
    }
    try {
        $response = Invoke-RestMethod @params;
    } catch {
        Write-Host " "
        Write-Host "Delete Auth Token Error"
        Write-Host "======================="
        Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
        Write-Host "Error Message:" $_.Exception.Message
    }
    return $response.data.deleteSession.token
}

$token = Get-Auth-Token

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
        try {
            $resultResponse = Invoke-RestMethod @params;
        } catch {
            Write-Host " "
            Write-Host "Get Results Error"
            Write-Host "================="
            Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
            Write-Host "Error Message:" $_.Exception.Message
        }

        return $resultResponse
    }
    catch [System.Net.WebException] {
        Write-Warning "An exception was caught: $($_.Exception.Message)"
        exit 1;
    }
    Write-Output $resultResponse
}

function Write-Results {
    Param($BuildId, $resultsData)
    Write-Information $resultsData
    if ($testResults.passed -eq $true) {
        #have tests passed
        Write-Output "Lumar Tests Passed"
        $url = Get-Build-Url($BuildId)
        Write-Output $url
        exit 0
    }
    else {
        #have tests failed
        Write-Output "Lumar Tests Failed"
        $url = Get-Build-Url($BuildId)
        Write-Output $url
        exit 1
    }
}

function Get-Build-Url {
    Param($BuildId)
    $params = @{
        Uri         = "https://api.lumar.io/graphql"
        Method      = 'Post'
        Body        = (@{"query" = "{ node(id: `"$BuildId`") { ...on Build { testSuite { id account { id } } } } }"} | ConvertTo-Json)
        ContentType = "application/json"
        Headers     = @{
            'X-Auth-Token' = $token
        }
    }
    try {
        $response = Invoke-RestMethod @params;
    } catch {
        Write-Host " "
        Write-Host "Get Build Url Error"
        Write-Host "======================="
        Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
        Write-Host "Error Message:" $_.Exception.Message
    }
    $BuildAccountId = $response.data.node.testSuite.account.id;
    $BuildTestSuiteId = $response.data.node.testSuite.id;
    return "A detailed report can be viewed at: https://protect.lumar.io/account/$BuildAccountId/test-suites/$BuildTestSuiteId/build-tests/$BuildId"
}

function Start-Poll {
    Param($BuildId)
    $testResults = Get-Results -Uri "https://tools.automator.deepcrawl.com/poller" -BuildId $BuildId
    if ( [bool]($testResults.PSobject.Properties.name -match "passed")) {
        #do results contain the passed prop
        Write-Results($BuildId, $testResults)
    }
    else {
        Write-Output "Waiting for Lumar Test Results ..."
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

    $body = @{
        "authToken"   = $token
        "testSuiteId" = $testSuiteId
    }

    $params = @{
        Uri         = "https://tools.automator.deepcrawl.com/start"
        Method      = 'Post'
        Body        = ($body | ConvertTo-Json)
        ContentType = "application/json"
    }

    try {
        $triggerResponse = Invoke-RestMethod @params;
    } catch {
        Write-Host " "
        Write-Host "StartBuild Error"
        Write-Host "================"
        Write-Host "StatusCode:" $_.Exception.Response.StatusCode.value__
        Write-Host "Error Message:" $_.Exception.Message
    }

    if (($startOnly -eq $true) -or ($startOnly -eq 1)) {
        Write-Output "Lumar Skipped Polling"
        exit 0
    }

    while ( ($null -eq $testResults) -and (Get-Timeout) ) {
        #poll server
        Start-Poll -BuildId $triggerResponse.buildId
    }

}

Start-Build

Delete-Auth-Token
