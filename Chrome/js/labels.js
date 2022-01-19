chrome.storage.sync.get(['labels'], function(result) {
  if (result.labels == undefined) {
    chrome.storage.sync.set({'labels': []}, function() {
      console.log('An empty list has been stored.');
    });
  }
})

createLabels = () => {
  var labelname = document.getElementById('labelName').value
  if (!/^[a-z0-9]+$/i.test(labelname)) {
    alert("Invalid label name")
  }
  else {

    chrome.storage.sync.get(['labels'], function(result) {
      currentLabels = result.labels
      currentLabels.push(labelname)
      chrome.storage.sync.set({'labels': currentLabels}, function() {
        alert(`Label "${labelname}" has been added !`)
      });

      var labelOptions = document.getElementById("labelsDel");
      var el = document.createElement("option");
      el.textContent = labelname;
      el.value = labelname;
      labelOptions.appendChild(el);
      document.getElementById('labelName').value = ''
    });
  }
}

getLabels = async () => {
  function getStorageValuePromise(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve);
    });
  }

  labelList = await getStorageValuePromise('labels');
  if (labelList.labels == undefined) {
      chrome.storage.sync.set({'labels': []}, function() {
        console.log('An empty list has been stored.');
      });
  }
  else {
    labelsDel = document.getElementById('labelsDel')
    for (var i = 0; i < labelList.labels.length; i++) {
          var opt = labelList.labels[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          labelsDel.appendChild(el);
    }
  }
}
getLabels()

delLabels = () => {
  var labelName = document.getElementById('labelsDel')
  var labelNameVal = labelName.value
  if (labelNameVal != '') {
    var labelNameOption = labelName.options[labelName.selectedIndex].text;
    chrome.storage.sync.get(['labels'], function(result) {
      labelList = result.labels
      labelList.splice(labelList.indexOf(labelName.value), 1)
      chrome.storage.sync.set({'labels': labelList}, function() {
        var deletedLabel = labelName.querySelector('option[value="' + labelNameOption + '"]');
        labelName.removeChild(deletedLabel);
        console.log('Label deleted')
        alert(`Label "${labelNameVal}" has been deleted !`)
      })
    })
  }
}

labelInput = document.getElementById('labelName')
labelInput.addEventListener('keyup', () => {
    if (labelInput.value.length != 0) {
        document.getElementById("addLabel").disabled = false;
    }
    else {
        document.getElementById("addLabel").disabled = true;
    }
})

document.getElementById("addLabel").addEventListener('click', createLabels)
document.getElementById("delLabel").addEventListener('click', delLabels)

/*
  var base_labels = [
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