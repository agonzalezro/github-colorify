(function (document, chrome) {

  var colorify = {},
      randomColor = function () {
        return ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
      },
      extractProjectName = function (element) {
        var link = Array.prototype.pop.call(element.getElementsByClassName('title')[0].getElementsByTagName('a'));

        return link.innerHTML.split('#')[0].split('@')[0];
      };

  colorify.init = function () {
    var self = this;

    chrome.storage.sync.get('colors', function(result) {
      if (Object.keys.call(null, result).length !== 0) {
        self.colors = result.colors;
      } else {
        self.colors = {};
      }
    });

    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        self.paint();
        document.querySelector('.js-events-pagination').onclick = function () {
          setTimeout(function () {
            self.paint();
          }, 1000);
        }
      }
    }
  };

  colorify.paint = function () {
    var self = this,
        previousColor;

    Array.prototype.forEach.call(document.querySelectorAll('.alert'), function (element) {
      var project = extractProjectName(element),
          color = self.getColorForProject(project, previousColor);

      previousColor = color;
      element.style.paddingTop = '5px';
      element.style.borderLeft = '7px solid #' + color;
      element.style.borderTop = '0';
    });
  };

  colorify.getColorForProject = function (project, previousColor) {
    if (!(project in this.colors)) {
      var color = randomColor();
      if (color === previousColor) {
        return this.getColorForProject(project, previousColor);
      }
      this.colors[project] = color;
      chrome.storage.sync.set({'colors': this.colors});
    }
    return this.colors[project];
  };

  colorify.init();
})(document, chrome);
