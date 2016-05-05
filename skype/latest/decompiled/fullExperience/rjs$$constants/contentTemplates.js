define("constants/contentTemplates", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/common"
], function (e, t) {
  var n = e("swx-enums"), r = e("constants/common"), i = "MessageContentTemplate", s = {};
  s[n.activityType.TextMessage] = "text" + i, s[n.activityType.CallStarted] = "calling" + i, s[n.activityType.CallEnded] = "calling" + i, s[n.activityType.CallMissed] = "calling" + i, s[n.activityType.PluginFreeFallbackWindowsUpdate] = "pluginFree" + i, s[n.activityType.PluginFreeFallbackScreenSharing] = "pluginFree" + i, s[n.activityType.PluginFreeFallbackMicrophoneAccess] = "pluginFree" + i, s[n.activityType.PluginFreeFallbackOutgoingP2PCall] = "pluginFree" + i, s[n.activityType.PluginFreeFallbackIncomingP2PCall] = "pluginFree" + i, s[n.activityType.PluginFreeNoVideoCapability] = "pluginFree" + i, s[n.activityType.NgcUpgradeMessage] = "ngcUpgrade" + i, s[n.activityType.PstnInsufficientFunds] = "pstn" + i, s[n.activityType.PstnInvalidNumber] = "pstn" + i, s[n.activityType.PstnForbiddenNumber] = "pstn" + i, s[n.activityType.VideoMessage] = "video" + i, s[n.activityType.PictureMessage] = "picture" + i, s[n.activityType.FileTransfer] = "fileTransfer" + i, s[n.activityType.ContactRequestIncoming] = "contactRequestIncoming" + i, s[n.activityType.ContactRequestIncomingInviteFree] = "contactRequestIncomingInviteFree" + i, s[n.activityType.ContactRequestOutgoing] = "contactRequestOutgoing" + i, s[n.activityType.ContactRequestOutgoingResend] = "contactRequestOutgoingResend" + i, s[n.activityType.ContactRequestOutgoingAgent] = "contactRequestOutgoingAgent" + i, s[n.activityType.SuggestedContact] = "suggestedContact" + i, s[n.activityType.MojiMessage] = "moji" + i, s[n.activityType.PollMessage] = "poll" + i, s[n.activityType.UnblockContact] = "unblockContact" + i, s[n.activityType.ContactInfoMessage] = "contactInfo" + i, s[r.customActivityItemTemplates.SPACES_WELCOME_MESSAGE] = "spacesWelcome" + i, t.templates = s;
})
