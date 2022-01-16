chrome.alarms.getAll((arr) => {
  var classes = document.getElementById("classes");
  for(var i = 0; i < Object.keys(arr).length; i++) {
    if ((arr[i]['name']).substring(0, 6) !== 'Delete') {
      var val = arr[i]['name'].split("-")
      const opt = `${val[0]} ${val[1]} ${val[2]} ${val[3]}-${val[4]}-${val[5]}`
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      classes.appendChild(el);
    }
  }
})

deleteClass = () => {
  class_name = document.getElementById('classes')
  class_name_value = class_name.options[class_name.selectedIndex].text;
  class_name_val = class_name_value.replace(/ /g,"-");
  chrome.alarms.clear(class_name_val);
  chrome.alarms.clear(`Delete-${class_name_val}`);
  var myclass = class_name.querySelector('option[value="' + class_name_value + '"]');
  class_name.removeChild(myclass);
  alert("Class successfully deleted !")
}
document.getElementById('delClass').addEventListener('click', deleteClass);