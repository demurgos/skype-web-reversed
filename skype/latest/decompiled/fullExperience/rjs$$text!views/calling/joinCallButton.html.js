define("text!views/calling/joinCallButton.html", [], function () {
  return " <swx-button params=\"icon: icon,\r\n                        cssClass: cssClass,\r\n                        disabled: isJoinCallDisabled,\r\n                        action: joinCall,\r\n                        withVideo: false,\r\n                        titleKey: joinCallTextKey,\r\n                        textKey: joinCallTextKey,\r\n                        i18nTitle: joinCallTitle,\r\n                        ariaLabelKey: joinCallTextKey\"></swx-button>\r\n";
});
