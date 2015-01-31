document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    document.querySelector('#refresh').onclick = function (event) {
      event.preventDefault();
      chrome.storage.sync.clear();

      chrome.tabs.query({title: "GitHub"}, function(tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.reload(tab.id);
        });
      });
      window.close();
    }
  }
};
