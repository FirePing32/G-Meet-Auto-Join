chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'Class') {
      var url = 'https://meet.google.com/uux-jmhm-oip';
      chrome.tabs.query({
          url: url
      }, function(tabs) {
          if (tabs.length === 0) {
              chrome.tabs.create({ url:url, active: true });
          } else {
              // Focus first match
              chrome.tabs.update(tabs[0].id, { active: true });
          }
      });
    }
});
