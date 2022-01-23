browser.alarms.onAlarm.addListener(function(alarm) {
    alarmName = alarm.name
    if (alarmName.slice(0, 6) !== 'Delete' && ((new Date().getTime() - alarm.scheduledTime) < 200 )) {
      var url = `${alarmName.split('-')[3]}-${alarmName.split('-')[4]}-${alarmName.split('-')[5]}`;
      browser.tabs.query({
          url: (url.includes('https') || url.includes('http')) ? url : `https://${url}`
      }, function(tabs) {
            if (tabs.length === 0) {
                if (url.includes('https') || url.includes('http')){
                    browser.tabs.create({ url:url, active: true });
                }
                else {
                    browser.tabs.create({url:`https://${url}`, active: true})
                }
                browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                    if (changeInfo.status === 'complete') {
                        browser.tabs.query({url: (url.includes('https') || url.includes('http')) ? `${url}` : `https://${url}`}, function(tabs) {
                            try {
                                browser.tabs.executeScript(
                                    tabs.id, {
                                        file: "js/join.js"
                                    }
                                )
                            }
                            catch(err) {
                                console.log(err)
                            }
                        } )
                    }
                });
            }
            else {
                browser.tabs.update(tabs[0].id, { active: true });
                browser.tabs.executeScript(tabs.id, {
                    file: "js/join.js"
                })
            }
        });
        browser.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
    }

    else if (alarmName.slice(0, 6) === 'Delete' && (new Date().getTime() - alarm.scheduledTime) < 200 ) {
        var url = `${alarmName.split('-')[4]}-${alarmName.split('-')[5]}-${alarmName.split('-')[6]}`;
        try {
            browser.tabs.query({url: (url.includes('https') || url.includes('http')) ? url : `https://${url}`}, function(tabs) {
                try {
                    browser.tabs.executeScript(
                        tabs.id, {
                            file: "js/leave.js"
                        }
                    )
                }
                catch(err) {
                    console.log(err)
                }
            });
            browser.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
        }
        catch(err) {
            console.log(err)
        }
    }

    else {
        browser.alarms.create(alarmName, {when: alarm.scheduledTime + 604800000})
    }
});