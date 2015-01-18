if (document.title === "GitHub") {
  var colors = {}
  colorify();
}

function colorify() {
  BGCOLORS = [
    "fce94f", "fcaf3e", "e9b96e", "8ae234", "729fcf", "ad7fa8", "ef2929", "eeeeec", "888a85"
  ]

  $(".alert").each(function(_, e) {
    var project = getProjectName(e);
    var color = getColorForProject(project)

    e.style.backgroundColor = color;
    e.style.paddingTop = "10px";
  });
}

function getProjectName(e) {
  return $(e).find('.title > a:last').text().split('#')[0];
}

function getColorForProject(project) {
  if (!(project in colors)) {
    colors[project] = "#" + BGCOLORS[Math.floor(Math.random() * BGCOLORS.length)]
  }
  return colors[project];
}
