define("text!views/calling/participantMenu.html", [], function () {
  return "<div class=\"participantMenuPill\">\r\n    <div class=\"wrapper\">\r\n        <button class=\"btn primary\" type=\"button\" data-bind=\"attr: { title: displayName }\">\r\n            <span class=\"menu\" data-bind=\"text: displayName\"></span>\r\n        </button>\r\n    </div>\r\n</div>\r\n";
})
