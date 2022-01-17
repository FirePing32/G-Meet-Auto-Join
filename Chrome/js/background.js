chrome.alarms.onAlarm.addListener(function(alarm) {
    alarmName = alarm.name
    if (alarmName.slice(0, 6) !== 'Delete') {
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
    }
});