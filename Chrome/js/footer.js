developerSite = () => {
    var url = 'https://www.prakhargurunani.com/'
    chrome.tabs.create({url: url})
}

document.getElementById('footer').addEventListener('click', developerSite)