function createAlarm(class_time, course, day, day_id, link, duration) {
    var now = new Date();
    var day_of_week = now.getDay()

    if (day_of_week <= day_id) {
        var diff = day_id - day_of_week
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, class_time[0], class_time[1], 0, 0);
    }
    else {
        var days = (6-day_of_week) + (day_id+1)
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, class_time[0], class_time[1], 0, 0)
    }

    chrome.alarms.create(`${course}-${day}-${link}`, {
            when: timestamp,
            periodInMinutes: duration
        });
}

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
