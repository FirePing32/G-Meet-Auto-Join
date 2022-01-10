chrome.alarms.getAll((arr) => {
  var classes = document.getElementById("classes");
  for(var i = 0; i < Object.keys(arr).length; i++) {
    var opt = arr[i]['name']
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    classes.appendChild(el);
  }
})

delete_alarm = () => {
  class_name = document.getElementById('classes')
  chrome.alarms.clear(class_name.value);
  var option = class_name.querySelector('option[value="' + class_name.value + '"]');
  class_name.removeChild(option);
  alert("Alarm successfully deleted !")
}
document.getElementById('delAlarm').addEventListener('click', delete_alarm)