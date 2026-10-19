(function () {
  try {
    var t = localStorage.getItem("gems-theme");
    if (!t && matchMedia("(prefers-color-scheme: light)").matches) t = "light";
    document.documentElement.dataset.theme = t || "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
