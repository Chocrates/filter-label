const core = require("@actions/core")
const github = require("@actions/github")

async function run() {
    try {
        const validLabels = core.getInput('labels').split(',')
        const issueLabels = github.context.payload.issue.labels.map(label => { return label.name  })
        core.debug(`Label object: ${JSON.stringify(github.context.payload.issue.labels)}`)
        core.debug(`Valid Labels: ${validLabels}`)
        core.debug(`Issue Labels: ${issueLabels}`)
        core.debug(`Issue Label filter: ${issueLabels.filter(label => validLabels.includes(label))}`)
        if(!(issueLabels.filter(label => validLabels.includes(label)).length)){
            core.debug('Attempting to stop execution')
            // stop execution
            core.setFailed('Not really failed, just a test')
            return 78
        }
        core.debug('Labels are valid, continuing')
    } catch(error) {
        core.setFailed(error.message)
    }
}

if(!module.parent) {
    run();
}

export {run}
