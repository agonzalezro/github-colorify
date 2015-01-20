BGCOLORS = [
  "#e1f6f2", "#e5f2fa", "#f2eaf6", "#fdf7e0", "#fce8e6", "#f6f7f8"
]

function colorify() {
  var previousColor;

  $(".alert").each(function(_, e) {
    var project = getProjectName(e);
    var color = getColorForProject(project, previousColor);
    previousColor = color;

    e.style.backgroundColor = color;
    e.style.paddingTop = "5px";
    e.style.border = "5px solid " + color;
  });
}

function getProjectName(e) {
  name = $(e).find('.title > a:last').text().split('#')[0];
  return name.split('@')[0];
}

function getColorForProject(project, previousColor) {
  if (!(project in colors)) {
    var color = BGCOLORS[Math.floor(Math.random() * BGCOLORS.length)];
    if (color == previousColor) {
      return getColorForProject(project, previousColor);
    }
    colors[project] = color;
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
    if (Object.keys.call(null, result).length !== 0) {
      colors = result.colors;
    }
    colorify();
  });
  assignEvents();
}
