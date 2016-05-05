define("text!views/chat/pes/itemRoster.html", [], function () {
  return "<div class=\"wrapper roster\">\r\n    <!-- ko if: item().type ==='emoticon' -->\r\n    <div class=\"largeAllowed large wrapper\">\r\n        <span data-bind=\"css: item().animatedExtraLargeHtmlClass\" class=\"emoticon\"><span\r\n            class=\"emoSprite\"></span></span>\r\n    </div>\r\n    <div class=\"info\">\r\n        <p data-bind=\"text: item().description\" class=\"smaller name\"></p>\r\n\r\n        <p data-bind=\"text: item().shortcut\" class=\"smaller text\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n    <!-- ko if: item().type==='flik' -->\r\n    <div class=\"large wrapper\">\r\n        <span data-bind=\"css: item().keyframeClass\" class=\"moji preview\">\r\n            <span class=\"keyframe\" data-bind=\"css: {hide: item().isPlaying()}\"></span>\r\n            <video class=\"moji preview\" data-bind=\"css: {hide: !item().isPlaying()}, attr: { src:item().contentUrl }\"\r\n                   tabindex=\"-1\"></video>\r\n            <span class=\"mojimask preview\"></span>\r\n        </span>\r\n    </div>\r\n    <div class=\"info\">\r\n        <p data-bind=\"text: item().pickerTitle\" class=\"smaller name\"></p>\r\n\r\n        <p data-bind=\"text: item().copyright\" class=\"smaller text\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n    <!-- ko if: item().type==='' -->\r\n    <div class=\"info\">\r\n        <p data-bind=\"text: item().description\" class=\"smaller name\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n\r\n</div>\r\n";
})
