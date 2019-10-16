
const testSuiteId: string = process.params.testSuiteId
const token: string = process.env.AUTOMATOR_TOKEN

interface StartRequestBody {
    authToken  : string,
    testSuiteId : string
}

const startRequestBody: StartRequestBody = {
    authToken  : token,
    testSuiteId : testSuiteId
}

const startOnly = false
let totalRunTime = 0
const maxRunTime = 3000

let testResults: any;

function getResults(Uri, BuildId): any {
    try {
        const bodyPoll = {
            authToken : token,
            buildId   : buildId
        }

        params = @{
            Uri         = $Uri
            Method      = 'Post'
            Body        = ($bodyPoll | ConvertTo-Json)
            ContentType = "application/json"

        }

        $resultResponse = Invoke-RestMethod @params;

        return $resultResponse
    }
    catch (e) {
        console.warn(`An exception was caught: ${e}`);
        process.exit(1)
    }
}

function writeResults(resultsData) {
    console.info(resultsData)
    if (testResults.passed === true) {
        console.log("DeepCrawl Tests Passed")
        process.exit(0)
    }
    else {
        console.log("DeepCrawl Tests Failed")
        process.exit(1)
    }
}

function startPoll(BuildId) {
    testResults = getResults("https://beta-triggers.deepcrawl.com/poller", BuildId);
    if(startOnly === true){
        console.log("DeepCrawl Skipped Polling")
        process.exit(0)
    }

    if ( testResults.name === "passed") {
        writeResults(testResults)
    }
    else {
        console.log("Waiting for DeepCrawl Test Results ...")
    }
}

function startBuild {

    const params = {
        Uri         : "https://beta-triggers.deepcrawl.com/start",
        Method      : 'Post',
        Body        : JSON.stringify(startRequestBody),
        ContentType : "application/json"

    }

    const triggerResponse = {};//Invoke-RestMethod @params;
    console.log(triggerResponse);

    if(testResults) {

    } else {
        startPoll(triggerResponse.buildId)
        totalRunTime += 30
    }
    
}

startBuild()