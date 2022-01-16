chrome.storage.sync.get(['courses'], function(result) {
  if (result.courses == undefined) {
    chrome.storage.sync.set({'courses': []}, function() {
      console.log('An empty list has been stored.');
    });
  }
})

createCourses = () => {
  var coursename = document.getElementById('courseName').value
  if (!/^[a-z0-9]+$/i.test(coursename)) {
    alert("Invalid course name")
  }
  else {

    chrome.storage.sync.get(['courses'], function(result) {
      currentCourses = result.courses
      currentCourses.push(coursename)
      chrome.storage.sync.set({'courses': currentCourses}, function() {
        alert(`Course "${coursename}" has been added !`)
      });

      var courseOptions = document.getElementById("coursesDel");
      var el = document.createElement("option");
      el.textContent = coursename;
      el.value = coursename;
      courseOptions.appendChild(el);
      document.getElementById('courseName').value = ''
    });
  }
}

getCourses = async () => {
  function getStorageValuePromise(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve);
    });
  }

  courseList = await getStorageValuePromise('courses');
  if (courseList.courses == undefined) {
      chrome.storage.sync.set({'courses': []}, function() {
        console.log('An empty list has been stored.');
      });
  }
  else {
    coursesDel = document.getElementById('coursesDel')
    for (var i = 0; i < courseList.courses.length; i++) {
          var opt = courseList.courses[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          coursesDel.appendChild(el);
    }
  }
}
getCourses()

delCourses = () => {
  var courseName = document.getElementById('coursesDel')
  var courseNameOption = courseName.options[courseName.selectedIndex].text;
  chrome.storage.sync.get(['courses'], function(result) {
    courseList = result.courses
    courseList.splice(courseList.indexOf(courseName.value), 1)
    chrome.storage.sync.set({'courses': courseList}, function() {
      var deletedClass = courseName.querySelector('option[value="' + courseNameOption + '"]');
      courseName.removeChild(deletedClass);
      console.log('Course deleted')
      alert(`Course "${courseName.value}" has been deleted !`)
    })
  })
}

courseInput = document.getElementById('courseName')
courseInput.addEventListener('keyup', () => {
    if (courseInput.value.length != 0) {
        document.getElementById("addCourse").disabled = false;
    }
    else {
        document.getElementById("addCourse").disabled = true;
    }
})

document.getElementById("addCourse").addEventListener('click', createCourses)
document.getElementById("delCourse").addEventListener('click', delCourses)

/*
  var base_courses = [
  'BE',
  'CLP',
  'M1',
  'TCE',
  'CP',
  'BE-LAB',
  'CLP-LAB',
  'BE-TUT',
  'M1-TUT'
  ]
*/