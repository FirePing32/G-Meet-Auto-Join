chrome.alarms.onAlarm.addListener(function(alarm) {
    alarmName = alarm.name
    if (alarmName.slice(0, 6) !== 'Delete' && ((new Date().getTime() - alarm.scheduledTime) < 200 )) {
      var url = `${alarmName.split('-')[3]}-${alarmName.split('-')[4]}-${alarmName.split('-')[5]}`;
      chrome.tabs.query({
          url: url
      }, function(tabs) {
          if (tabs.length === 0) {
              chrome.tabs.create({ url:url, active: true });
          } else {
              chrome.tabs.update(tabs[0].id, { active: true });
          }
      });
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete') {
            chrome.tabs.query({url: 'https://meet.google.com/*'}, function(tabs) {
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
        try {
            chrome.tabs.query({url: 'https://meet.google.com/*'}, function(tabs) {
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
        }
        catch(err) {
            console.log(err)
        }
    }
});

function getStorageValuePromise(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, resolve);
    });
}