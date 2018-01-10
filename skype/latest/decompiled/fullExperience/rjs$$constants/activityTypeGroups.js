define("constants/activityTypeGroups", [
  "require",
  "exports",
  "module",
  "swx-enums"
], function (e, t) {
  var n = e("swx-enums");
  t.CALL_MESSAGES = [
    n.activityType.CallStarted,
    n.activityType.CallEnded,
    n.activityType.CallMissed
  ];
  t.PSTN_MESSAGES = [
    n.activityType.PstnInsufficientFunds,
    n.activityType.PstnInvalidNumber,
    n.activityType.PstnForbiddenNumber
  ];
  t.PLUGIN_FREE_MESSAGES = [
    n.activityType.PluginFreeFallbackScreenSharing,
    n.activityType.PluginFreeFallbackMicrophoneAccess,
    n.activityType.PluginFreeNoVideoCapability,
    n.activityType.PluginFreeVideoCompatibility
  ];
  t.NGC_UPGRADE_MESSAGES = [n.activityType.NgcUpgradeMessage];
  t.MEDIA_MESSAGES = [
    n.activityType.VideoMessage,
    n.activityType.PictureMessage,
    n.activityType.AudioMessage,
    n.activityType.MojiMessage,
    n.activityType.FileTransfer
  ];
  t.PARTICIPANT_MESSAGES = [
    n.activityType.ParticipantJoined,
    n.activityType.ParticipantLeft,
    n.activityType.ParticipantJoinFailed,
    n.activityType.ParticipantRoleUpdate,
    n.activityType.ParticipantTopicUpdate,
    n.activityType.ParticipantPictureUpdate,
    n.activityType.ParticipantHistoryDisclosed,
    n.activityType.ParticipantJoiningEnabled,
    n.activityType.ParticipantLegacyMemberAdded,
    n.activityType.ParticipantLegacyMemberUpgraded
  ];
  t.CONTACT_REQUEST_MESSAGES = [
    n.activityType.ContactRequestIncoming,
    n.activityType.ContactRequestIncomingInviteFree,
    n.activityType.ContactRequestOutgoing,
    n.activityType.ContactRequestOutgoingResend,
    n.activityType.ContactRequestIsNowContact,
    n.activityType.SuggestedContact,
    n.activityType.UnblockContact,
    n.activityType.ContactRequestOutgoingAgent
  ];
  t.CONTACT_INFO_MESSAGES = [n.activityType.ContactInfoMessage];
  t.TRANSACTION_MESSAGES = [n.activityType.CreditTransaction];
  t.POLL_MESSAGES = [n.activityType.PollMessage];
  t.CUSTOM_MESSAGES = [n.activityType.CustomMessage];
  t.TRANSCRIPT_MESSAGES = [n.activityType.Transcript];
  t.SYSTEM_MESSAGES = [n.activityType.SystemMessage];
});
