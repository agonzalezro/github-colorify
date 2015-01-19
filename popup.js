$(document).ready(function() {
  $("#refresh").click(function(e) {
    chrome.storage.sync.clear();
    e.preventDefault();
    chrome.tabs.query({title: "GitHub"}, function(tabs) {
      $(tabs).each(function(_, tab) {
        chrome.tabs.reload(tab.id);
      });
    });
    close();
  });
});
