function createAlarm(meeting_time, label, day, day_id, link, duration) {
    var now = new Date();
    var day_of_week = now.getDay()

    if (day_of_week < day_id) {
        var diff = day_id - day_of_week
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, meeting_time[0], meeting_time[1], 0, 0);
    }
    else if (day_of_week == day_id) {
        var tempTimestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), meeting_time[0], meeting_time[1], 0, 0);
        if (tempTimestamp > now.getTime()) {
            var timestamp = tempTimestamp
        }
        else {
            var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, meeting_time[0], meeting_time[1], 0, 0);
        }
    }
    else {
        var days = (6-day_of_week) + (day_id+1)
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, meeting_time[0], meeting_time[1], 0, 0)
    }

    browser.alarms.create(`${label}-${day}-${meeting_time[0]}:${meeting_time[1]}-${link}`, {
            when: timestamp
        });
    browser.alarms.create(`Delete-${label}-${day}-${meeting_time[0]}:${meeting_time[1]}-${link}`, {
            when: timestamp + (duration*60000)
        });
}

function getStorageValuePromise(key) {
  return new Promise((resolve) => {
    browser.storage.sync.get(key, resolve);
  });
}

storeLabels = async () => {
    labelData = await getStorageValuePromise('labels');
    if (labelData.labels == undefined) {
        browser.storage.sync.set({'labels': []}, function() {
        console.log('An empty list has been stored.');
        });
    }
    else {
        var label = document.getElementById("label");
        for (var i = 0; i < labelData.labels.length; i++) {
            var opt = labelData.labels[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            label.appendChild(el);
    }
    }
}
storeLabels()

var day = document.getElementById("day");

for (var i = 0; i < Object.keys(days).length; i++) {
    var opt = Object.keys(days)[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    day.appendChild(el);
}

document.getElementById("time").defaultValue = "12:00";
document.getElementById("duration").defaultValue = "60";
document.getElementById("submit").disabled = true;

link_url = document.getElementById('link')
link_url.addEventListener('keyup', () => {
    if (link_url.value.length != 0) {
        document.getElementById("submit").disabled = false;
    }
    else {
        document.getElementById("submit").disabled = true;
    }
})

async function saveMeeting() {
    var timeControl = document.querySelector('input[type="time"]');
    var timestamp = timeControl.value.split(":")

    var time = timestamp.map(Number);
    var link = document.getElementById('link').value;
    var label = document.getElementById('label').value;
    var day = document.getElementById('day').value;
    var day_id = days[day]
    var duration = Number(document.getElementById('duration').value)
    if (duration >= 1 && label != '' && (link.includes('meet.google.com') == true)) {
        await createAlarm(time, label, day, day_id, link, duration)
        swal.fire({
          title: "Info",
          text: "Meeting saved !",
          showCloseButton: true,
          showConfirmButton: false
        })
    }
    else {
        swal.fire({
          title: "Error",
          text: "Could not save meeting! Please check your details.",
          showCloseButton: true,
          showConfirmButton: false
        })
    }
}

document.getElementById("submit").addEventListener("click", saveMeeting);