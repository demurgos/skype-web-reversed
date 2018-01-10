define("text!views/experience/eduCarousel.html", [], function () {
  return "<div data-bind=\"css: 'EduCarousel-item ' + itemName(), visible: isVisible()\">\r\n    <div class=\"EduCarousel-overlay\">\r\n        <div class=\"EduCarousel-overlay--infoMessage\">\r\n            <h1 data-bind=\"text: itemHeader()\"></h1>\r\n            <p data-bind=\"text: itemText()\"></p>\r\n            <div class=\"spinnerHolder\">\r\n                <swx-loading-animation class=\"spinner white\"></swx-loading-animation>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
});
