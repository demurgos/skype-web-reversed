define("text!views/chat/narrator.html", [], function () {
  return "<div aria-live=\"assertive\" role=\"log\" class=\"offScreen\">\r\n    <!-- ko foreach: narrationLog -->\r\n    <div>\r\n        <span data-bind=\"html: message, visible: visible\"></span>\r\n    </div>\r\n    <!-- /ko -->\r\n</div>\r\n";
});
