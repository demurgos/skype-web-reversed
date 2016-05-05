define("text!views/chat/timeline/currentCallActions.html", [], function () {
  return "<!-- ko if: canJoinCall -->\r\n    <swx-joincall-button params=\"cssClass:'btn small primary green circle', conversationModel:conversation, showIcon:true\"></swx-joincall-button>\r\n<!-- /ko -->\r\n\r\n<!-- ko if: isOnCall -->\r\n    <!-- ko control: { name: 'muteControl', model: { conversation: conversation, isInCallScreen: false } } --> <!-- /ko -->\r\n    <!-- ko control: { name: 'endCallControl', model: { conversation: conversation, isInCallScreen: false } } --> <!-- /ko -->\r\n<!-- /ko -->\r\n";
})
