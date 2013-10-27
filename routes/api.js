/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/16/13
 * Time: 10:56 PM
 * To change this template use File | Settings | File Templates.
 */

/*
 * Serve JSON to our AngularJS client
 */

var status =  {
    "ctodo":["Awaiting Review","Reopened","Open"],
    "cProgress":["Development in Progress","In Progress"],
    "cReview":["QA Testing","Resolved"],
    "cClosed":["Closed"]
};

var statusnames = Object.keys(status);

exports.issues = function(req,res) {
    var issueList = {};
    requestify.get('https://jira.sakaiproject.org/rest/api/2/search?jql=filter=13625')
        .then(function(response) {
            var issueCount = 0;
            var json = response.getBody();
            var issues = json.issues;
            res.json({ issues:getIssueList(issues)});
        }
    );
};


/*
 Issue format utility functions
*/
function getIssueList(issues) {
    var issueList = {};
    var priorityTypes = [];
    var issueCount = issues.length;
    // setup empty array for each status name
    for (var key in status) {
        //console.log("key " + key);
        issueList[key] = [];
    }

    //console.log("returned " + issueCount + "items");
    try {
        // build lists for each
        //console.log("Building list");
        for (var index = 0; index < issueCount; ++index){
            var issue = issues[index];
            //console.log(issue.fields.summary);
            var jsonSet = getSetName(issue);
            if (issueList.hasOwnProperty(jsonSet)===false) {
                issueList[jsonSet] = [];
                //console.log("added " + jsonSet);
            }
            if (doesNotContain(issue.fields.priority.name,priorityTypes)) {
                priorityTypes.push(issue.fields.priority.name);
            }
            issueList[jsonSet].push(getIssue(issue));
        }

        // also add unique priority list
        issueList['priorities'].push(priorities);

        // output to file
        //writeJSON(jsonWrite);
    } catch (e) {
        console.log(e.message);
    }
    //console.log("sort complete");
    return issueList;

}

// get key for this jira status
function getSetName(jirastatus){
    //console.log("Getting " + +  " from " + statusnames);
    var jirastatustitle = jirastatus.fields.status.name;
    var statArray = [];
    for (var key in status) {
        var statArray = status[key];
        for (index = 0; index < statArray.length; index++){
            var statustitle = statArray[index];
            if (statustitle === jirastatustitle) {
                return key;
            }
        }
    }
    return "not found";
}

// return only properties of issue we're interested in. This should be in a config file
function getIssue(issue) {
    var item =   {  "id" : issue.id,
        "key" : issue.key,
        "url" : issue.self,
        "title": issue.title,
        "status" : issue.fields.status.name,
        "summary": issue.fields.summary,
        "reporterDisplayName" : issue.fields.reporter.displayName,
        "reporterName" : issue.fields.reporter.name,
        //"description": issue.fields.summary.issuetype.description,
        "priority" : issue.fields.priority.name,
        "assigneeDisplayName" : issue.fields.assignee.displayName,
        "assigneeName" : issue.fields.assignee.name,
        "labels" : issue.labels} ;
//        console.log(item);
    console.log(item);
    return item;
}

function doesNotContain(priority, priorityArray) {
        return (priorityArray.indexOf(priority) > -1);
}

/* This iter is not writing to file system right now
function writeJSON(json) {

    var file = 'data.json';
    console.log("Writing arrays");
    for (var key in json) {
        jf.writeFile(file, json[key], function(err) {
            console.log(err);
        })
    }
}
 */
