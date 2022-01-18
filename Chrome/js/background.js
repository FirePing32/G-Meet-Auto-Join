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
        if (changeInfo.status === 'complete' && tab.url.includes('https://meet.google.com')) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["js/join.js"]
            })
        }
      });
    }
});