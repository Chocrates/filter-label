const core = require("@actions/core")
const github = require("@actions/github")

async function run() {
    try {
        const validLabels = core.getInput('labels').split(',')
        const issueLabels = github.context.payload.issue.labels.map(label => { label.name  })
        if(!(issueLabels.filter(label => validLabels.includes(label)))){
            core.setDebug('Attempting to stop execution')
            // stop execution
            return 78
        }
        core.setDebug('Labels are valid, continuing')
    } catch(error) {
        core.setFailed(error.message)
    }
}

if(!module.parent) {
    run();
}

export {run}
