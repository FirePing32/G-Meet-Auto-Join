if (window.location.href.includes('meet.google.com') == true) {
  items = document.getElementsByTagName('div');
    setTimeout(function() {
        try {
            for (i = 0; i < items.length; i++) {
                if (items[i].hasAttribute("aria-label")) {
                    if (items[i].getAttribute("aria-label")
                        .includes("microphone") ||
                        items[i].getAttribute("aria-label")
                        .includes("camera")) {
                        items[i].click();
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }, 2000)

    var spans = document.getElementsByTagName('span');
    setTimeout(function() {
      try {
        for (i = 0; i < spans.length; i++) {
          if (spans[i].innerText == 'Ask to join' || spans[i].innerText == 'Join now') {
            spans[i].click()
          }
        }
      } catch(err) {
        console.log(err);
      }
    }, 4000);
}
