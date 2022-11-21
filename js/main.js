document.getElementById('issueInputForm').addEventListener('submit',saveIssue)

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issuesList = document.getElementById('issuesList')
    console.log(issues)

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id
        let subject = issues[i].subject
        let description = issues[i].description
        let number = issues[i].number
        let severity = issues[i].severity
        let assignedTo = issues[i].assignedTo
        let status = issues[i].status
        let statusColor = status == "Message Received" ? 'label-success' : 'label-info'

        //HTML Section for Displaying List (Will Change Later I Promise...)
        issuesList.innerHTML += 
        '<div class="well">' +
        '<h6 class="refer">Reference ID: ' + id + '</h6>' +
        '<p><span class= "label ' + statusColor + ' ">' + status + '</span></p>' +
        '<h3 class="names">' + subject + '</h3>' +
        '<p class="reasons">Reason: ' + description + '</p>' + 
        '<p class="numbers">Number: ' + number + '</p>' +
        '<p class="howBad">Priority: ' + severity + '</p>' + 
        '<p class="callFor">Call for: ' + assignedTo + '</p>' +
        '<a href="#" class="btn btn-primary" onclick="setStatusClosed(\''+id+'\')">Received</a> ' +
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '
        + '</div>'
    }
}

function saveIssue(e) {
    let issueId = chance.guid()
    let issueSubject = document.getElementById('issueSubjInput').value
    let issueDesc = document.getElementById('issueDescInput').value
    let issueNumb = document.getElementById('issueNumbInput').value
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value
    let issueStatus = 'Unanswered '

    let issue = {
        id: issueId,
        subject: issueSubject,
        description: issueDesc,
        number: issueNumb,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues')===null) {
        let issues = []
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues()

    e.preventDefault()
}

function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i=0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues[i].status = "Message Received"
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()
}

function deleteIssue (id) {
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i=0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues.splice(i,1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()

}