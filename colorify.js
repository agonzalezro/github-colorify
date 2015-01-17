if (document.title === "GitHub") {
  COLORS = [
    "fce94f", "edd400", "c4a000",
    "fcaf3e", "f57900", "ce5c00",
    "e9b96e", "c17d11", "8f5902",
    "8ae234", "73d216", "4e9a06",
    "729fcf", "3465a4", "204a87",
    "ad7fa8", "75507b", "5c3566",
    "ef2929", "cc0000", "a40000",
    "eeeeec", "d3d7cf", "babdb6",
    "888a85", "555753", "2e3436"
  ]

  $(".alert").each(function(_, e) {
    color = "#" + COLORS[Math.floor(Math.random() * COLORS.length)]
    e.style.backgroundColor = color;
    e.style.paddingTop = "10px";
  });
}
