define("text!views/chat/smsPrice.html", [], function () {
  return "<div class='smsPriceContainer'>\r\n\r\n    <!-- ko if: numberOfMessages()!=='' -->\r\n    <span class='smsNumberCircle' data-bind='text:numberOfMessages'></span>\r\n    <!-- /ko -->\r\n\r\n    <span class='formatPrice' data-bind='text:formattedFetchedPrice'></span>\r\n\r\n    <!-- ko if: errorMessage().length > 0 -->\r\n    <span class='iconfont warning' data-bind=' attr: {title: errorMessage}'></span>\r\n    <!-- /ko -->\r\n</div>\r\n";
});
