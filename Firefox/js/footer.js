developerSite = () => {
    var url = 'https://www.prakhargurunani.com/'
    browser.tabs.create({url: url})
}

document.getElementById('footer').addEventListener('click', developerSite)