BGCOLORS = [
  "#8ddece", "#a0eabf", "#9acced", "#f8e287", "#f3bf91", "#f3a69e",
  "#8bd0c2", "#93d7b0", "#94c0dc", "#f9ce89", "#e9aa80", "#e09c95"
]

function colorify() {
  $(".alert").each(function(_, e) {
    var project = getProjectName(e);
    var color = getColorForProject(project)

    e.style.backgroundColor = color;
    e.style.paddingTop = "5px";
    e.style.border = "5px solid " + color;
  });
}

function getProjectName(e) {
  return $(e).find('.title > a:last').text().split('#')[0];
}

function getColorForProject(project) {
  if (!(project in colors)) {
    colors[project] = BGCOLORS[Math.floor(Math.random() * BGCOLORS.length)];
    chrome.storage.sync.set({"colors": colors});
  }
  return colors[project];
}

function assignEvents() {
  $(document).ready(function() {
    $(".js-events-pagination").click(function() {
      setTimeout(function() { colorify(); assignEvents(); }, 1000)
    });
  });
}

if (document.title === "GitHub") {
  var colors = {};
  chrome.storage.sync.get("colors", function(result) {
    if (result != null) {
      colors = result.colors;
    }
    colorify();
  });
  assignEvents();
}
