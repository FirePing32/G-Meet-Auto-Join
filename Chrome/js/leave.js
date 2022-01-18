var button = document.getElementsByTagName('button');
try {
  for (i = 0; i < button.length; i++) {
    if (button[i].hasAttribute("aria-label")) {
      if (button[i].getAttribute("aria-label")
        .includes("Leave call")) {
        button[i].click();
      }
    }
  }
} catch (err) {
  console.log(err);
}
window.close();