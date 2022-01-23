chrome.alarms.onAlarm.addListener(function(alarm) {
    alarmName = alarm.name
    if (alarmName.slice(0, 6) !== 'Delete' && ((new Date().getTime() - alarm.scheduledTime) < 200 )) {
      var url = `${alarmName.split('-')[3]}-${alarmName.split('-')[4]}-${alarmName.split('-')[5]}`;
      chrome.tabs.query({
          url: url
      }, function(tabs) {
            if (tabs.length === 0) {
                chrome.tabs.create({ url:url, active: true });
                chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                    if (changeInfo.status === 'complete') {
                        chrome.tabs.query({url: `${url}*`}, function(tabs) {
                            try {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabs[0].id },
                                    files: ["js/join.js"]
                                })
                            }
                            catch(err) {
                                console.log(err)
                            }
                        } )
                    }
                });
            }
            else {
                chrome.tabs.update(tabs[0].id, { active: true });
                chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ["js/join.js"]
                    })
            }
        });
        chrome.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
    }

    else if (alarmName.slice(0, 6) === 'Delete' && (new Date().getTime() - alarm.scheduledTime) < 200 ) {
        var url = `${alarmName.split('-')[4]}-${alarmName.split('-')[5]}-${alarmName.split('-')[6]}`;
        try {
            chrome.tabs.query({url: `${url}*`}, function(tabs) {
                try {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ["js/leave.js"]
                    })
                }
                catch(err) {
                    console.log(err)
                }
            });
            chrome.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
        }
        catch(err) {
            console.log(err)
        }
    }

    else {
        chrome.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
    }
});