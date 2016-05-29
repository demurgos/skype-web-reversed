define("text!views/calling/muteButton.html", [], function () {
  return "<button data-bind=\"click: toggleMicrophone, css: { disabled: !isMicrophoneButtonEnabled() }, attr: { title: microphoneStateText(), 'aria-disabled': isMicrophoneButtonEnabled() }\" class=\"btn small primary circle toggleMic\" type=\"button\">\r\n    <span class=\"iconfont microphoneOn\" data-bind=\"css: { microphoneOff: !isMicrophoneOn() }, text: microphoneStateText\"></span>\r\n</button>\r\n";
});
