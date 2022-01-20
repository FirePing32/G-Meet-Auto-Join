browser.storage.sync.get(['labels'], function(result) {
  if (result.labels == undefined) {
    browser.storage.sync.set({'labels': []}, function() {
      console.log('An empty list has been stored.');
    });
  }
})

createLabels = () => {
  var labelname = document.getElementById('labelName').value
  if (!/^[a-z0-9]+$/i.test(labelname)) {
    swal.fire({
      title: "Error",
      text: "Invalid label name !",
      showCloseButton: true,
      showConfirmButton: false
    })
  }
  else {

    browser.storage.sync.get(['labels'], function(result) {
      currentLabels = result.labels
      if (!currentLabels.includes(labelname)) {
        currentLabels.push(labelname)
        browser.storage.sync.set({'labels': currentLabels}, function() {
          swal.fire({
            title: "Info",
            text: `Label "${labelname}" has been added !`,
            showCloseButton: true,
            showConfirmButton: false
          })
        });

        var labelOptions = document.getElementById("labelsDel");
        var el = document.createElement("option");
        el.textContent = labelname;
        el.value = labelname;
        labelOptions.appendChild(el);
        document.getElementById('labelName').value = ''
      }
      else {
        swal.fire({
          title: "Error",
          text: "Label already exists !",
          showCloseButton: true,
          showConfirmButton: false
        })
      }
    });
  }
}

getLabels = async () => {
  function getStorageValuePromise(key) {
    return new Promise((resolve) => {
      browser.storage.sync.get(key, resolve);
    });
  }

  labelList = await getStorageValuePromise('labels');
  if (labelList.labels == undefined) {
      browser.storage.sync.set({'labels': []}, function() {
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
    browser.storage.sync.get(['labels'], function(result) {
      labelList = result.labels
      labelList.splice(labelList.indexOf(labelName.value), 1)
      browser.storage.sync.set({'labels': labelList}, function() {
        var deletedLabel = labelName.querySelector('option[value="' + labelNameOption + '"]');
        labelName.removeChild(deletedLabel);
        console.log('Label deleted')
        swal.fire({
          title: "Info",
          text: `Label "${labelNameVal}" has been deleted !`,
          showCloseButton: true,
          showConfirmButton: false
        })
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