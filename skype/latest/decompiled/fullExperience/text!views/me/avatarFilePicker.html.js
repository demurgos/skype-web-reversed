define("text!views/me/avatarFilePicker.html", [], function () {
  return "<div data-bind=\"visible: avatarUploadSupported\">\r\n    <input type=\"file\" accept=\"image/*\" class=\"Me-avatarFilePickerInput\"\r\n        data-bind=\"event: {click: checkUploadEnabled,\r\n                change: processFiles}\"/>\r\n    <button class=\"Me-avatarOpenFilePickerInput\" data-bind=\"click: openFilePickerInput,\r\n            attr: {\r\n                title: uploadProfilePictureText,\r\n                'aria-label': uploadProfilePictureAriaLabel\r\n            }\"></button>\r\n    <span class=\"Me-avatarFilePickerButton\">\r\n        <span class=\"btn primary circle protected picturePickerBtn\">\r\n            <span class=\"iconfont picturePicker picture\"></span>\r\n        </span>\r\n    </span>\r\n</div>\r\n";
})
