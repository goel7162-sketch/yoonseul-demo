(function () {
  var files = ["c1.txt", "c2.txt", "c3.txt", "c4.txt", "c5.txt", "c6.txt"];
  Promise.all(files.map(function (f) {
    return fetch(f, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(f + " " + r.status);
      return r.text();
    });
  })).then(function (parts) {
    var url = "data:image/jpeg;base64," + parts.join("").replace(/\s+/g, "");
    function apply() {
      document.querySelectorAll('img[src="grandma-dog.jpg"]').forEach(function (img) {
        img.src = url;
      });
    }
    apply();
    new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  }).catch(function (err) { console.warn("cover-boot", err); });
})();
