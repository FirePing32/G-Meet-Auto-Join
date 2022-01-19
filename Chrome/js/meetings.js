chrome.alarms.getAll((arr) => {
  var meetings = document.getElementById("meetings");
  for(var i = 0; i < Object.keys(arr).length; i++) {
    if ((arr[i]['name']).substring(0, 6) !== 'Delete') {
      var val = arr[i]['name'].split("-")
      const opt = `${val[0]} ${val[1]} ${val[2]} ${val[3]}-${val[4]}-${val[5]}`
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      meetings.appendChild(el);
    }
  }
})

deleteMeeting = () => {
  Meeting_name = document.getElementById('meetings')
  if (Meeting_name.value != '') {
    Meeting_name_value = Meeting_name.options[Meeting_name.selectedIndex].text;
    Meeting_name_val = Meeting_name_value.replace(/ /g,"-");
    chrome.alarms.clear(Meeting_name_val);
    chrome.alarms.clear(`Delete-${Meeting_name_val}`);
    var myMeeting = Meeting_name.querySelector('option[value="' + Meeting_name_value + '"]');
    Meeting_name.removeChild(myMeeting);
    alert("Meeting successfully deleted !")
  }
}
document.getElementById('delMeeting').addEventListener('click', deleteMeeting);