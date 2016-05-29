(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-enums/lib/enums", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  (function (e) {
    e[e.ParticipantJoined = "ParticipantJoined"] = "ParticipantJoined";
    e[e.ParticipantLeft = "ParticipantLeft"] = "ParticipantLeft";
    e[e.ParticipantJoinFailed = "ParticipantJoinFailed"] = "ParticipantJoinFailed";
    e[e.ParticipantRoleUpdate = "ParticipantRoleUpdate"] = "ParticipantRoleUpdate";
    e[e.ParticipantTopicUpdate = "ParticipantTopicUpdate"] = "ParticipantTopicUpdate";
    e[e.ParticipantPictureUpdate = "ParticipantPictureUpdate"] = "ParticipantPictureUpdate";
    e[e.ParticipantHistoryDisclosed = "ParticipantHistoryDisclosed"] = "ParticipantHistoryDisclosed";
    e[e.ParticipantJoiningEnabled = "ParticipantJoiningEnabled"] = "ParticipantJoiningEnabled";
    e[e.ParticipantLegacyMemberAdded = "ParticipantLegacyMemberAdded"] = "ParticipantLegacyMemberAdded";
    e[e.ParticipantLegacyMemberUpgraded = "ParticipantLegacyMemberUpgraded"] = "ParticipantLegacyMemberUpgraded";
    e[e.CallStarted = "CallStarted"] = "CallStarted";
    e[e.CallEnded = "CallEnded"] = "CallEnded";
    e[e.CallMissed = "CallMissed"] = "CallMissed";
    e[e.NgcUpgradeMessage = "NgcUpgradeMessage"] = "NgcUpgradeMessage";
    e[e.PluginFreeFallbackWindowsUpdate = "PluginFreeFallbackWindowsUpdate"] = "PluginFreeFallbackWindowsUpdate";
    e[e.PluginFreeFallbackScreenSharing = "PluginFreeFallbackScreenSharing"] = "PluginFreeFallbackScreenSharing";
    e[e.PluginFreeFallbackMicrophoneAccess = "PluginFreeFallbackMicrophoneAccess"] = "PluginFreeFallbackMicrophoneAccess";
    e[e.PluginFreeFallbackOutgoingP2PCall = "PluginFreeFallbackOutgoingP2PCall"] = "PluginFreeFallbackOutgoingP2PCall";
    e[e.PluginFreeFallbackIncomingP2PCall = "PluginFreeFallbackIncomingP2PCall"] = "PluginFreeFallbackIncomingP2PCall";
    e[e.PluginFreeNoVideoCapability = "PluginFreeNoVideoCapability"] = "PluginFreeNoVideoCapability";
    e[e.PstnInsufficientFunds = "InsufficientFunds"] = "PstnInsufficientFunds";
    e[e.PstnInvalidNumber = "InvalidNumber"] = "PstnInvalidNumber";
    e[e.PstnForbiddenNumber = "ForbiddenNumber"] = "PstnForbiddenNumber";
    e[e.TextMessage = "TextMessage"] = "TextMessage";
    e[e.VideoMessage = "VideoMessage"] = "VideoMessage";
    e[e.PictureMessage = "PictureMessage"] = "PictureMessage";
    e[e.ContactRequestIncoming = "ContactRequestIncoming"] = "ContactRequestIncoming";
    e[e.ContactRequestIncomingInviteFree = "ContactRequestIncomingInviteFree"] = "ContactRequestIncomingInviteFree";
    e[e.ContactRequestOutgoing = "ContactRequestOutgoing"] = "ContactRequestOutgoing";
    e[e.ContactRequestOutgoingResend = "ContactRequestOutgoingResend"] = "ContactRequestOutgoingResend";
    e[e.ContactRequestOutgoingAgent = "ContactRequestOutgoingAgent"] = "ContactRequestOutgoingAgent";
    e[e.ContactRequestIsNowContact = "ContactRequestIsNowContact"] = "ContactRequestIsNowContact";
    e[e.SuggestedContact = "SuggestedContact"] = "SuggestedContact";
    e[e.UnblockContact = "UnblockContact"] = "UnblockContact";
    e[e.MojiMessage = "MojiMessage"] = "MojiMessage";
    e[e.FileTransfer = "FileTransfer"] = "FileTransfer";
    e[e.ContactInfoMessage = "ContactInfoMessage"] = "ContactInfoMessage";
    e[e.CreditTransaction = "CreditTransaction"] = "CreditTransaction";
    e[e.PollMessage = "PollMessage"] = "PollMessage";
    e[e.SystemMessage = "SystemMessage"] = "SystemMessage";
    e[e.CustomMessage = "CustomMessage"] = "CustomMessage";
  }(t.activityType || (t.activityType = {})));
  var n = t.activityType;
  (function (e) {
    e[e.Pending = "Pending"] = "Pending";
    e[e.Succeeded = "Succeeded"] = "Succeeded";
    e[e.Failed = "Failed"] = "Failed";
  }(t.activityStatus || (t.activityStatus = {})));
  var r = t.activityStatus;
  (function (e) {
    e[e.Pending = "Pending"] = "Pending";
    e[e.Succeeded = "Succeeded"] = "Succeeded";
    e[e.Failed = "Failed"] = "Failed";
  }(t.transactionStatus || (t.transactionStatus = {})));
  var i = t.transactionStatus;
  (function (e) {
    e[e.Incoming = "Incoming"] = "Incoming";
    e[e.Outgoing = "Outgoing"] = "Outgoing";
  }(t.direction || (t.direction = {})));
  var s = t.direction;
  (function (e) {
    e[e.Text = "Text"] = "Text";
    e[e.Html = "Html"] = "Html";
  }(t.messageFormat || (t.messageFormat = {})));
  var o = t.messageFormat;
  (function (e) {
    e[e.Text = "Text"] = "Text";
    e[e.Html = "Html"] = "Html";
  }(t.messageType || (t.messageType = {})));
  var u = t.messageType;
  (function (e) {
    e[e.Disconnected = "Disconnected"] = "Disconnected";
    e[e.Notified = "Notified"] = "Notified";
    e[e.Connecting = "Connecting"] = "Connecting";
    e[e.Ringing = "Ringing"] = "Ringing";
    e[e.EarlyMedia = "EarlyMedia"] = "EarlyMedia";
    e[e.Connected = "Connected"] = "Connected";
    e[e.Disconnecting = "Disconnecting"] = "Disconnecting";
  }(t.callConnectionState || (t.callConnectionState = {})));
  var a = t.callConnectionState;
  (function (e) {
    e[e.Terminated = "Terminated"] = "Terminated";
    e[e.FullSession = "FullSession"] = "FullSession";
    e[e.Busy = "Busy"] = "Busy";
    e[e.Refused = "Refused"] = "Refused";
    e[e.Missed = "Missed"] = "Missed";
    e[e.Dropped = "Dropped"] = "Dropped";
    e[e.InvalidNumber = "InvalidNumber"] = "InvalidNumber";
    e[e.ForbiddenNumber = "ForbiddenNumber"] = "ForbiddenNumber";
    e[e.EmergencyCallDenied = "EmergencyCallDenied"] = "EmergencyCallDenied";
    e[e.VoiceMailFailed = "VoiceMailFailed"] = "VoiceMailFailed";
    e[e.TransferFailed = "TransferFailed"] = "TransferFailed";
    e[e.InsufficientFunds = "InsufficientFunds"] = "InsufficientFunds";
    e[e.Failed = "Failed"] = "Failed";
    e[e.MissingSpeaker = "MissingSpeaker"] = "MissingSpeaker";
    e[e.CallEscalated = "CallEscalated"] = "CallEscalated";
    e[e.OutOfBrowserCall = "OutOfBrowserCall"] = "OutOfBrowserCall";
    e[e.AutoCallFailed = "AutoCallFailed"] = "AutoCallFailed";
    e[e.AutoCallTimeout = "AutoCallTimeout"] = "AutoCallTimeout";
    e[e.Canceled = "Canceled"] = "Canceled";
  }(t.callDisconnectionReason || (t.callDisconnectionReason = {})));
  var f = t.callDisconnectionReason;
  (function (e) {
    e[e.Skype = "Skype"] = "Skype";
  }(t.ecsClientNames || (t.ecsClientNames = {})));
  var l = t.ecsClientNames;
  (function (e) {
    e[e.Camera = "Camera"] = "Camera";
    e[e.Microphone = "Microphone"] = "Microphone";
    e[e.Speaker = "Speaker"] = "Speaker";
  }(t.deviceType || (t.deviceType = {})));
  var c = t.deviceType;
  (function (e) {
    e[e.Root = "Root"] = "Root";
    e[e.Custom = "Custom"] = "Custom";
    e[e.Others = "Others"] = "Others";
    e[e.Favorites = "Favorites"] = "Favorites";
    e[e.Distribution = "Distribution"] = "Distribution";
    e[e.PrivacyRelationship = "PrivacyRelationship"] = "PrivacyRelationship";
  }(t.groupType || (t.groupType = {})));
  var h = t.groupType;
  (function (e) {
    e[e.None = "None"] = "None";
    e[e.Blocked = "Blocked"] = "Blocked";
    e[e.Colleagues = "Colleagues"] = "Colleagues";
    e[e.Workgroup = "Workgroup"] = "Workgroup";
    e[e.External = "External"] = "External";
    e[e.FriendsAndFamily = "FriendsAndFamily"] = "FriendsAndFamily";
  }(t.groupPrivacyRelationshipLevel || (t.groupPrivacyRelationshipLevel = {})));
  var p = t.groupPrivacyRelationshipLevel;
  (function (e) {
    e[e.Started = "Started"] = "Started";
    e[e.Active = "Active"] = "Active";
    e[e.Inactive = "Inactive"] = "Inactive";
    e[e.Stopped = "Stopped"] = "Stopped";
  }(t.mediaStreamState || (t.mediaStreamState = {})));
  var d = t.mediaStreamState;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Video = "Video"] = "Video";
    e[e.Video_WMV = "Video_WMV"] = "Video_WMV";
    e[e.Video_MOV = "Video_MOV"] = "Video_MOV";
    e[e.Video_MP4 = "Video_MP4"] = "Video_MP4";
    e[e.Picture = "Picture"] = "Picture";
  }(t.mediaType || (t.mediaType = {})));
  var v = t.mediaType;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Pending = "Pending"] = "Pending";
    e[e.Completed = "Completed"] = "Completed";
    e[e.Failed = "Failed"] = "Failed";
  }(t.mediaStatus || (t.mediaStatus = {})));
  var m = t.mediaStatus;
  (function (e) {
    e[e.Attendee = "Attendee"] = "Attendee";
    e[e.Leader = "Leader"] = "Leader";
  }(t.participantRole || (t.participantRole = {})));
  var g = t.participantRole;
  (function (e) {
    e[e.Disconnected = "Disconnected"] = "Disconnected";
    e[e.Connecting = "Connecting"] = "Connecting";
    e[e.InLobby = "InLobby"] = "InLobby";
    e[e.Connected = "Connected"] = "Connected";
    e[e.Disconnecting = "Disconnecting"] = "Disconnecting";
  }(t.participantState || (t.participantState = {})));
  var y = t.participantState;
  (function (e) {
    e[e.Online = "Online"] = "Online";
    e[e.Offline = "Offline"] = "Offline";
    e[e.Hidden = "Hidden"] = "Hidden";
    e[e.Busy = "Busy"] = "Busy";
    e[e.Idle = "Idle"] = "Idle";
    e[e.BeRightBack = "BeRightBack"] = "BeRightBack";
    e[e.Away = "Away"] = "Away";
    e[e.DoNotDisturb = "DoNotDisturb"] = "DoNotDisturb";
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.OnThePhone = "OnThePhone"] = "OnThePhone";
    e[e.OutForLunch = "OutForLunch"] = "OutForLunch";
  }(t.onlineStatus || (t.onlineStatus = {})));
  var b = t.onlineStatus;
  (function (e) {
    e[e.Home = "Home"] = "Home";
    e[e.Work = "Work"] = "Work";
    e[e.Cell = "Cell"] = "Cell";
    e[e.Other = "Other"] = "Other";
  }(t.phoneType || (t.phoneType = {})));
  var w = t.phoneType;
  (function (e) {
    e[e.autoBuddy = "autoBuddy"] = "autoBuddy";
    e[e.linkedMSA = "linkedMSA"] = "linkedMSA";
  }(t.selfSettings || (t.selfSettings = {})));
  var E = t.selfSettings;
  (function (e) {
    e[e.Personal = "Personal"] = "Personal";
    e[e.Work = "Work"] = "Work";
    e[e.Other = "Other"] = "Other";
  }(t.emailType || (t.emailType = {})));
  var S = t.emailType;
  (function (e) {
    e[e.Home = "Home"] = "Home";
    e[e.Work = "Work"] = "Work";
    e[e.Other = "Other"] = "Other";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(t.locationType || (t.locationType = {})));
  var x = t.locationType;
  (function (e) {
    e[e.Personal = "Personal"] = "Personal";
    e[e.OutOfOffice = "OutOfOffice"] = "OutOfOffice";
  }(t.noteType || (t.noteType = {})));
  var T = t.noteType;
  (function (e) {
    e[e.Desktop = "Desktop"] = "Desktop";
    e[e.Mobile = "Mobile"] = "Mobile";
    e[e.Web = "Web"] = "Web";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(t.endpointType || (t.endpointType = {})));
  var N = t.endpointType;
  (function (e) {
    e[e.RequestFailed = "RequestFailed"] = "RequestFailed";
  }(t.reasonCode || (t.reasonCode = {})));
  var C = t.reasonCode;
  (function (e) {
    e[e.Desktop = "Desktop"] = "Desktop";
    e[e.Application = "Application"] = "Application";
    e[e.Window = "Window"] = "Window";
  }(t.sharedResourceType || (t.sharedResourceType = {})));
  var k = t.sharedResourceType;
  (function (e) {
    e[e.Agent = "Agent"] = "Agent";
    e[e.AddressBook = "AddressBook"] = "AddressBook";
    e[e.SkypeDirectory = "SkypeDirectory"] = "SkypeDirectory";
    e[e.All = "All"] = "All";
  }(t.searchScope || (t.searchScope = {})));
  var L = t.searchScope;
  (function (e) {
    e[e.SignedOut = "SignedOut"] = "SignedOut";
    e[e.SigningIn = "SigningIn"] = "SigningIn";
    e[e.SignedIn = "SignedIn"] = "SignedIn";
    e[e.SigningOut = "SigningOut"] = "SigningOut";
  }(t.loginState || (t.loginState = {})));
  var A = t.loginState;
  (function (e) {
    e[e.NotReady = "NotReady"] = "NotReady";
    e[e.Authenticated = "Authenticated"] = "Authenticated";
    e[e.Error = "Error"] = "Error";
  }(t.translatorServiceState || (t.translatorServiceState = {})));
  var O = t.translatorServiceState;
  (function (e) {
    e[e.Password = "Password"] = "Password";
    e[e.Token = "Token"] = "Token";
    e[e.Passive = "Passive"] = "Passive";
    e[e.ImplicitOAuth = "ImplicitOAuth"] = "ImplicitOAuth";
    e[e.Guest = "Guest"] = "Guest";
    e[e.Integrated = "Integrated"] = "Integrated";
    e[e.OutOfBrowser = "OutOfBrowser"] = "OutOfBrowser";
  }(t.authType || (t.authType = {})));
  var M = t.authType;
  (function (e) {
    e[e.PluginNotInstalled = "PluginNotInstalled"] = "PluginNotInstalled";
    e[e.PluginOutOfDate = "PluginOutOfDate"] = "PluginOutOfDate";
    e[e.BrowserNotSupported = "BrowserNotSupported"] = "BrowserNotSupported";
    e[e.PluginBlocked = "PluginBlocked"] = "PluginBlocked";
    e[e.PluginAlreadyRunning = "PluginAlreadyRunning"] = "PluginAlreadyRunning";
    e[e.OSNotSupported = "OSNotSupported"] = "OSNotSupported";
    e[e.FeatureDisabled = "FeatureDisabled"] = "FeatureDisabled";
    e[e.TooManyParticipants = "TooManyParticipants"] = "TooManyParticipants";
    e[e.NotInConversation = "NotInConversation"] = "NotInConversation";
    e[e.CameraUnavailable = "CameraUnavailable"] = "CameraUnavailable";
    e[e.TrouterNotInitialized = "TrouterNotInitialized"] = "TrouterNotInitialized";
  }(t.callingNotSupportedReasons || (t.callingNotSupportedReasons = {})));
  var _ = t.callingNotSupportedReasons;
  (function (e) {
    e[e.Uploading = "Uploading"] = "Uploading";
    e[e.FileMissing = "FileMissing"] = "FileMissing";
    e[e.Failed = "Failed"] = "Failed";
    e[e.FailedMalwareScan = "FailedMalwareScan"] = "FailedMalwareScan";
    e[e.Cancelled = "Cancelled"] = "Cancelled";
    e[e.Sent = "Sent"] = "Sent";
  }(t.fileUploadState || (t.fileUploadState = {})));
  var D = t.fileUploadState;
  (function (e) {
    e[e.Premium = "Premium"] = "Premium";
    e[e.Skypein = "Skypein"] = "Skypein";
    e[e.Calling = "Calling"] = "Calling";
    e[e.CallingLegacy = "CallingLegacy"] = "CallingLegacy";
    e[e.StickerPack = "StickerPack"] = "StickerPack";
  }(t.marketplaceSkuType || (t.marketplaceSkuType = {})));
  var P = t.marketplaceSkuType;
  (function (e) {
    e[e.None = "None"] = "None";
    e[e.P2P = "P2P"] = "P2P";
    e[e.NGC = "NGC"] = "NGC";
  }(t.callTechnology || (t.callTechnology = {})));
  var H = t.callTechnology;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.PluginBasedP2P = "PluginBasedP2P"] = "PluginBasedP2P";
    e[e.PluginBasedNGC = "PluginBasedNGC"] = "PluginBasedNGC";
    e[e.Pluginless = "Pluginless"] = "Pluginless";
  }(t.mediaConnectionType || (t.mediaConnectionType = {})));
  var B = t.mediaConnectionType;
  (function (e) {
    e[e.Plan = "plan"] = "Plan";
    e[e.Package = "package"] = "Package";
  }(t.subscriptionType || (t.subscriptionType = {})));
  var j = t.subscriptionType;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Unset = "Unset"] = "Unset";
    e[e.Defined = "Defined"] = "Defined";
    e[e.Saving = "Saving"] = "Saving";
  }(t.preferenceValueState || (t.preferenceValueState = {})));
  var F = t.preferenceValueState;
  (function (e) {
    e[e.URL_PREVIEWS = 11] = "URL_PREVIEWS";
    e[e.YOUTUBE_PLAYER = 12] = "YOUTUBE_PLAYER";
    e[e.MENTIONS = 13] = "MENTIONS";
    e[e.FILE_PASTE = 14] = "FILE_PASTE";
    e[e.ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY = 15] = "ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY";
    e[e.DONT_ALLOW_VIDEO_CALLS = 16] = "DONT_ALLOW_VIDEO_CALLS";
  }(t.skypeFlagsApiMappings || (t.skypeFlagsApiMappings = {})));
  var I = t.skypeFlagsApiMappings;
  (function (e) {
    e[e.Boolean = "Boolean"] = "Boolean";
    e[e.Number = "Number"] = "Number";
    e[e.String = "String"] = "String";
    e[e.CallPolicy = "CallPolicy"] = "CallPolicy";
    e[e.VideoPolicy = "VideoPolicy"] = "VideoPolicy";
    e[e.AutoBuddy = "AutoBuddy"] = "AutoBuddy";
    e[e.AutoBuddyDiscovery = "AutoBuddyDiscovery"] = "AutoBuddyDiscovery";
    e[e.AutoBuddyDiscoveryEmail = "AutoBuddyDiscoveryEmail"] = "AutoBuddyDiscoveryEmail";
    e[e.AutoBuddyDiscoveryPhone = "AutoBuddyDiscoveryPhone"] = "AutoBuddyDiscoveryPhone";
  }(t.preferenceType || (t.preferenceType = {})));
  var q = t.preferenceType;
  (function (e) {
    e[e.Anyone = 0] = "Anyone";
    e[e.ContactsOnly = 1] = "ContactsOnly";
    e[e.NoOne = 2] = "NoOne";
  }(t.privacyPolicyValues || (t.privacyPolicyValues = {})));
  var R = t.privacyPolicyValues;
}));
