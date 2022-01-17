function createAlarm(class_time, course, day, day_id, link, duration) {
    var now = new Date();
    var day_of_week = now.getDay()

    if (day_of_week < day_id) {
        var diff = day_id - day_of_week
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, class_time[0], class_time[1], 0, 0);
    }
    else if (day_of_week == day_id) {
        var tempTimestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), class_time[0], class_time[1], 0, 0);
        if (tempTimestamp > now.getTime()) {
            var timestamp = tempTimestamp
        }
        else {
            var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, class_time[0], class_time[1], 0, 0);
        }
    }
    else {
        var days = (6-day_of_week) + (day_id+1)
        var timestamp = +new Date(now.getFullYear(), now.getMonth(), now.getDate() + days, class_time[0], class_time[1], 0, 0)
    }

    chrome.alarms.create(`${course}-${day}-${class_time[0]}:${class_time[1]}-${link}`, {
            when: timestamp
        });
    chrome.alarms.create(`Delete-${course}-${day}-${class_time[0]}:${class_time[1]}-${link}`, {
            when: timestamp + (duration*60000)
        });
}

function getStorageValuePromise(key) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, resolve);
  });
}

storeCourses = async () => {
    courseData = await getStorageValuePromise('courses');
    if (courseData.courses == undefined) {
        chrome.storage.sync.set({'courses': []}, function() {
        console.log('An empty list has been stored.');
        });
    }
    else {
        var course = document.getElementById("course");
        for (var i = 0; i < courseData.courses.length; i++) {
            var opt = courseData.courses[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            course.appendChild(el);
    }
    }
}
storeCourses()

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

async function saveClass() {
    var timeControl = document.querySelector('input[type="time"]');
    var timestamp = timeControl.value.split(":")

    var time = timestamp.map(Number);
    var link = document.getElementById('link').value;
    var course = document.getElementById('course').value;
    var day = document.getElementById('day').value;
    var day_id = days[day]
    var duration = Number(document.getElementById('duration').value)
    if (duration >= 1 && course != '') {
        await createAlarm(time, course, day, day_id, link, duration)
        alert('Class saved !')
    }
    else {
        alert('Could not save class! Please check your details.')
    }
}

document.getElementById("submit").addEventListener("click", saveClass);