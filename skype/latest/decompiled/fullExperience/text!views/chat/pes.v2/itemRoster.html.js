define("text!views/chat/pes.v2/itemRoster.html", [], function () {
  return "<div class=\"wrapper roster\">\r\n    <!-- ko if: params.item() && params.item().type() === 'emoticon' -->\r\n    <div class=\"largeAllowed large wrapper\">\r\n        <span data-bind=\"css: playState() ? params.item().animatedExtraLargeHtmlClass : params.item().staticExtraLargeHtmlClass\" class=\"emoticon\"><span\r\n            class=\"emoSprite\"></span></span>\r\n    </div>\r\n    <div class=\"info\">\r\n        <p data-bind=\"text: params.item().description\" class=\"smaller name\"></p>\r\n\r\n        <p data-bind=\"text: params.item().shortcut\" class=\"smaller text\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n    <!-- ko if: params.item() && params.item().type() === 'flik' -->\r\n    <div class=\"large wrapper\">\r\n        <span data-bind=\"css: params.item().keyframeClass\" class=\"moji preview\">\r\n            <span class=\"keyframe\" data-bind=\"css: {hide: playState}\"></span>\r\n            <video class=\"moji preview\" data-bind=\"css: {hide: !playState()}, attr: { src: params.item().contentUrl }\"\r\n                   tabindex=\"-1\"></video>\r\n            <span class=\"mojimask preview\"></span>\r\n        </span>\r\n    </div>\r\n    <div class=\"info\">\r\n        <p data-bind=\"text: params.item().pickerTitle\" class=\"smaller name\"></p>\r\n\r\n        <p data-bind=\"text: params.item().copyright\" class=\"smaller text\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n    <!-- ko if: !(params.item() && params.item().type) || (['emoticon', 'flik'].indexOf(params.item().type()) === -1) -->\r\n    <div class=\"large wrapper\">\r\n        <p data-bind=\"l10n: {'key': 'emoticonPicker_heading_label'}\" class=\"smaller name\"></p>\r\n    </div>\r\n    <!-- /ko -->\r\n\r\n\r\n</div>\r\n";
})
