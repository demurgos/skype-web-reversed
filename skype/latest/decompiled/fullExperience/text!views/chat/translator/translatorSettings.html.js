define("text!views/chat/translator/translatorSettings.html", [], function () {
  return "<div class=\"TranslatorSettings\">\r\n    <button class=\"settingsButton btn transparent circle\" data-bind=\"click: settingsButtonHandler, attr: {'aria-label': settingsButtonAriaLabel, title: settingsButtonLabel}, css: {off: !translatorEnabled()}\" type=\"button\">\r\n        <span id=\"settingsButtonLabelId\" class=\"iconfont globe\" data-bind=\"text: settingsButtonLabel\"></span>\r\n    </button>\r\n    <!-- ko if: dialogOpened -->\r\n    <div class=\"SettingsDialog popup arrow up\">\r\n        <h4 class=\"header\" data-bind=\"text: settingsDialogLabel\"></h4>\r\n\r\n        <div class=\"Splitter\"></div>\r\n\r\n        <div class=\"SettingsDialog-toggle\">\r\n            <span id=\"enableTranslator\" class=\"fontSize-p\" data-bind=\"text: translatorToggleText\"></span>\r\n            <button aria-labelledby=\"settingsButtonLabelId\" class=\"toggler\" type=\"button\" role=\"checkbox\" aria-relevant=\"all\"\r\n                    data-bind=\"click: translatorEnabledHandler, event: { keydown: onTranslatorEnabledKeyDown }, css: { checked: translatorEnabled }, attr: { 'aria-checked': translatorEnabled() ? 'true' : 'false', 'aria-label': settingsButtonLabel}\">\r\n                <span class=\"on\"></span>\r\n                <span class=\"off\"></span>\r\n            </button>\r\n        </div>\r\n\r\n        <div class=\"Splitter\"></div>\r\n\r\n        <div class=\"SettingsDialog-lang\">\r\n            <swx-avatar-deprecated params=\"avatar: meAvatar\"></swx-avatar-deprecated>\r\n            <div class=\"text\" >\r\n                <p data-bind=\"text: meDisplayName\" class=\"displayName\"></p>\r\n                <swx-translator-language-picker params=\"language: meLanguage, supportedLanguages: availableLanguages, class: 'LanguagePicker-mine', ariaLabel: meLanguagePickerLabel\"></swx-translator-language-picker>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"SettingsDialog-icons\">\r\n            <div class=\"Splitter lang\"></div>\r\n            <div class=\"iconsGroup\">\r\n                <div class=\"chat\"><span class=\"iconfont message\"></span></div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"SettingsDialog-lang bottom\">\r\n            <swx-avatar-deprecated params=\"avatar: participantAvatar\"></swx-avatar-deprecated>\r\n            <div class=\"text\">\r\n                <p data-bind=\"text: participantDisplayName\" class=\"displayName\"></p>\r\n                <swx-translator-language-picker params=\"language: participantLanguage, supportedLanguages: availableLanguages, class: 'LanguagePicker-their', ariaLabel: theirLanguagePickerLabel\"></swx-translator-language-picker>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <!-- /ko -->\r\n</div>\r\n";
})
