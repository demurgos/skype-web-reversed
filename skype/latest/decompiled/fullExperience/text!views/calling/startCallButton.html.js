define("text!views/calling/startCallButton.html", [], function () {
  return "<swx-button params=\"icon: 'callStart',\r\n                cssClass: 'primary circle',\r\n                disabled: callButtonViewModel.isAudioDisabled,\r\n                textKey: 'button_text_audioCall',\r\n                i18nTitle: callButtonViewModel.buttonCallTitle,\r\n                action: callButtonViewModel.startCallWithAudio,\r\n                ariaLabel: callButtonViewModel.buttonCallAriaLabel\"></swx-button>\r\n";
})
