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
  var n;
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
    e[e.PluginFreeFallbackScreenSharing = "PluginFreeFallbackScreenSharing"] = "PluginFreeFallbackScreenSharing";
    e[e.PluginFreeFallbackMicrophoneAccess = "PluginFreeFallbackMicrophoneAccess"] = "PluginFreeFallbackMicrophoneAccess";
    e[e.PluginFreeNoVideoCapability = "PluginFreeNoVideoCapability"] = "PluginFreeNoVideoCapability";
    e[e.PluginFreeVideoCompatibility = "PluginFreeVideoCompatibility"] = "PluginFreeVideoCompatibility";
    e[e.PstnInsufficientFunds = "InsufficientFunds"] = "PstnInsufficientFunds";
    e[e.PstnInvalidNumber = "InvalidNumber"] = "PstnInvalidNumber";
    e[e.PstnForbiddenNumber = "ForbiddenNumber"] = "PstnForbiddenNumber";
    e[e.TextMessage = "TextMessage"] = "TextMessage";
    e[e.AudioMessage = "AudioMessage"] = "AudioMessage";
    e[e.VideoMessage = "VideoMessage"] = "VideoMessage";
    e[e.PictureMessage = "PictureMessage"] = "PictureMessage";
    e[e.ContactRequestIncoming = "ContactRequestIncoming"] = "ContactRequestIncoming";
    e[e.ContactRequestIncomingInviteFree = "ContactRequestIncomingInviteFree"] = "ContactRequestIncomingInviteFree";
    e[e.ContactRequestOutgoing = "ContactRequestOutgoing"] = "ContactRequestOutgoing";
    e[e.ContactRequestOutgoingResend = "ContactRequestOutgoingResend"] = "ContactRequestOutgoingResend";
    e[e.ContactRequestOutgoingAgent = "ContactRequestOutgoingAgent"] = "ContactRequestOutgoingAgent";
    e[e.ContactRequestOutgoingPSTN = "ContactRequestOutgoingPSTN"] = "ContactRequestOutgoingPSTN";
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
    e[e.Transcript = "Transcript"] = "Transcript";
    e[e.Na = "n/a"] = "Na";
  }(n = t.activityType || (t.activityType = {})));
  var r;
  (function (e) {
    e[e.Pending = "Pending"] = "Pending";
    e[e.Succeeded = "Succeeded"] = "Succeeded";
    e[e.Failed = "Failed"] = "Failed";
  }(r = t.activityStatus || (t.activityStatus = {})));
  var i;
  (function (e) {
    e[e.Pending = "Pending"] = "Pending";
    e[e.Succeeded = "Succeeded"] = "Succeeded";
    e[e.Failed = "Failed"] = "Failed";
  }(i = t.transactionStatus || (t.transactionStatus = {})));
  var s;
  (function (e) {
    e[e.Incoming = "Incoming"] = "Incoming";
    e[e.Outgoing = "Outgoing"] = "Outgoing";
  }(s = t.direction || (t.direction = {})));
  var o;
  (function (e) {
    e[e.Text = "Text"] = "Text";
    e[e.Html = "Html"] = "Html";
  }(o = t.messageFormat || (t.messageFormat = {})));
  var u;
  (function (e) {
    e[e.Text = "Text"] = "Text";
    e[e.Html = "Html"] = "Html";
  }(u = t.messageType || (t.messageType = {})));
  var a;
  (function (e) {
    e[e.Disconnected = "Disconnected"] = "Disconnected";
    e[e.Notified = "Notified"] = "Notified";
    e[e.Connecting = "Connecting"] = "Connecting";
    e[e.Ringing = "Ringing"] = "Ringing";
    e[e.EarlyMedia = "EarlyMedia"] = "EarlyMedia";
    e[e.Connected = "Connected"] = "Connected";
    e[e.Disconnecting = "Disconnecting"] = "Disconnecting";
  }(a = t.callConnectionState || (t.callConnectionState = {})));
  var f;
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
    e[e.MissingMicrophone = "MissingMicrophone"] = "MissingMicrophone";
    e[e.CallEscalated = "CallEscalated"] = "CallEscalated";
    e[e.OutOfBrowserCall = "OutOfBrowserCall"] = "OutOfBrowserCall";
    e[e.NoP2PFallback = "NoP2PFallback"] = "NoP2PFallback";
    e[e.AutoCallFailed = "AutoCallFailed"] = "AutoCallFailed";
    e[e.AutoCallTimeout = "AutoCallTimeout"] = "AutoCallTimeout";
    e[e.CallConnectTimeout = "CallConnectTimeout"] = "CallConnectTimeout";
    e[e.NotificationTimeout = "NotificationTimeout"] = "NotificationTimeout";
    e[e.Canceled = "Canceled"] = "Canceled";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(f = t.callDisconnectionReason || (t.callDisconnectionReason = {})));
  var l;
  (function (e) {
    e[e.Skype = "Skype"] = "Skype";
  }(l = t.ecsClientNames || (t.ecsClientNames = {})));
  var c;
  (function (e) {
    e[e.Camera = "Camera"] = "Camera";
    e[e.Microphone = "Microphone"] = "Microphone";
    e[e.Speaker = "Speaker"] = "Speaker";
  }(c = t.deviceType || (t.deviceType = {})));
  var h;
  (function (e) {
    e[e.Root = "Root"] = "Root";
    e[e.Custom = "Custom"] = "Custom";
    e[e.Others = "Others"] = "Others";
    e[e.Favorites = "Favorites"] = "Favorites";
    e[e.Distribution = "Distribution"] = "Distribution";
    e[e.PrivacyRelationship = "PrivacyRelationship"] = "PrivacyRelationship";
  }(h = t.groupType || (t.groupType = {})));
  var p;
  (function (e) {
    e[e.None = "None"] = "None";
    e[e.Blocked = "Blocked"] = "Blocked";
    e[e.Colleagues = "Colleagues"] = "Colleagues";
    e[e.Workgroup = "Workgroup"] = "Workgroup";
    e[e.External = "External"] = "External";
    e[e.FriendsAndFamily = "FriendsAndFamily"] = "FriendsAndFamily";
  }(p = t.groupPrivacyRelationshipLevel || (t.groupPrivacyRelationshipLevel = {})));
  var d;
  (function (e) {
    e[e.Started = "Started"] = "Started";
    e[e.Active = "Active"] = "Active";
    e[e.Inactive = "Inactive"] = "Inactive";
    e[e.Stopped = "Stopped"] = "Stopped";
  }(d = t.mediaStreamState || (t.mediaStreamState = {})));
  var v;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Video = "Video"] = "Video";
    e[e.Video_WMV = "Video_WMV"] = "Video_WMV";
    e[e.Video_MOV = "Video_MOV"] = "Video_MOV";
    e[e.Video_MP4 = "Video_MP4"] = "Video_MP4";
    e[e.Picture = "Picture"] = "Picture";
  }(v = t.mediaType || (t.mediaType = {})));
  var m;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Pending = "Pending"] = "Pending";
    e[e.Completed = "Completed"] = "Completed";
    e[e.Failed = "Failed"] = "Failed";
  }(m = t.mediaStatus || (t.mediaStatus = {})));
  var g;
  (function (e) {
    e[e.Attendee = "Attendee"] = "Attendee";
    e[e.Leader = "Leader"] = "Leader";
  }(g = t.participantRole || (t.participantRole = {})));
  var y;
  (function (e) {
    e[e.Disconnected = "Disconnected"] = "Disconnected";
    e[e.Connecting = "Connecting"] = "Connecting";
    e[e.InLobby = "InLobby"] = "InLobby";
    e[e.Connected = "Connected"] = "Connected";
    e[e.Disconnecting = "Disconnecting"] = "Disconnecting";
  }(y = t.participantState || (t.participantState = {})));
  var b;
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
  }(b = t.onlineStatus || (t.onlineStatus = {})));
  var w;
  (function (e) {
    e[e.Home = "Home"] = "Home";
    e[e.Work = "Work"] = "Work";
    e[e.Cell = "Cell"] = "Cell";
    e[e.Other = "Other"] = "Other";
  }(w = t.phoneType || (t.phoneType = {})));
  var E;
  (function (e) {
    e[e.autoBuddy = "autoBuddy"] = "autoBuddy";
    e[e.linkedMSA = "linkedMSA"] = "linkedMSA";
  }(E = t.selfSettings || (t.selfSettings = {})));
  var S;
  (function (e) {
    e[e.Personal = "Personal"] = "Personal";
    e[e.Work = "Work"] = "Work";
    e[e.Other = "Other"] = "Other";
  }(S = t.emailType || (t.emailType = {})));
  var x;
  (function (e) {
    e[e.Home = "Home"] = "Home";
    e[e.Work = "Work"] = "Work";
    e[e.Other = "Other"] = "Other";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(x = t.locationType || (t.locationType = {})));
  var T;
  (function (e) {
    e[e.Personal = "Personal"] = "Personal";
    e[e.OutOfOffice = "OutOfOffice"] = "OutOfOffice";
  }(T = t.noteType || (t.noteType = {})));
  var N;
  (function (e) {
    e[e.Desktop = "Desktop"] = "Desktop";
    e[e.Mobile = "Mobile"] = "Mobile";
    e[e.Web = "Web"] = "Web";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(N = t.endpointType || (t.endpointType = {})));
  var C;
  (function (e) {
    e[e.RequestFailed = "RequestFailed"] = "RequestFailed";
  }(C = t.reasonCode || (t.reasonCode = {})));
  var k;
  (function (e) {
    e[e.Desktop = "Desktop"] = "Desktop";
    e[e.Application = "Application"] = "Application";
    e[e.Window = "Window"] = "Window";
  }(k = t.sharedResourceType || (t.sharedResourceType = {})));
  var L;
  (function (e) {
    e[e.Agent = "Agent"] = "Agent";
    e[e.AddressBook = "AddressBook"] = "AddressBook";
    e[e.SkypeDirectory = "SkypeDirectory"] = "SkypeDirectory";
    e[e.Groups = "Groups"] = "Groups";
    e[e.All = "All"] = "All";
  }(L = t.searchScope || (t.searchScope = {})));
  var A;
  (function (e) {
    e[e.SignedOut = "SignedOut"] = "SignedOut";
    e[e.SigningIn = "SigningIn"] = "SigningIn";
    e[e.SignedIn = "SignedIn"] = "SignedIn";
    e[e.SigningOut = "SigningOut"] = "SigningOut";
  }(A = t.loginState || (t.loginState = {})));
  var O;
  (function (e) {
    e[e.NotReady = "NotReady"] = "NotReady";
    e[e.Authenticated = "Authenticated"] = "Authenticated";
    e[e.Error = "Error"] = "Error";
  }(O = t.translatorServiceState || (t.translatorServiceState = {})));
  var M;
  (function (e) {
    e[e.Password = "Password"] = "Password";
    e[e.Token = "Token"] = "Token";
    e[e.Passive = "Passive"] = "Passive";
    e[e.ImplicitOAuth = "ImplicitOAuth"] = "ImplicitOAuth";
    e[e.Guest = "Guest"] = "Guest";
    e[e.Integrated = "Integrated"] = "Integrated";
    e[e.OutOfBrowser = "OutOfBrowser"] = "OutOfBrowser";
  }(M = t.authType || (t.authType = {})));
  var _;
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
  }(_ = t.callingNotSupportedReasons || (t.callingNotSupportedReasons = {})));
  var D;
  (function (e) {
    e[e.Uploading = "Uploading"] = "Uploading";
    e[e.FileMissing = "FileMissing"] = "FileMissing";
    e[e.Failed = "Failed"] = "Failed";
    e[e.FailedMalwareScan = "FailedMalwareScan"] = "FailedMalwareScan";
    e[e.Cancelled = "Cancelled"] = "Cancelled";
    e[e.Sent = "Sent"] = "Sent";
  }(D = t.fileUploadState || (t.fileUploadState = {})));
  var P;
  (function (e) {
    e[e.Premium = "Premium"] = "Premium";
    e[e.Skypein = "Skypein"] = "Skypein";
    e[e.Calling = "Calling"] = "Calling";
    e[e.CallingLegacy = "CallingLegacy"] = "CallingLegacy";
    e[e.StickerPack = "StickerPack"] = "StickerPack";
  }(P = t.marketplaceSkuType || (t.marketplaceSkuType = {})));
  var H;
  (function (e) {
    e[e.None = "None"] = "None";
    e[e.P2P = "P2P"] = "P2P";
    e[e.NGC = "NGC"] = "NGC";
  }(H = t.callTechnology || (t.callTechnology = {})));
  var B;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.PluginBasedP2P = "PluginBasedP2P"] = "PluginBasedP2P";
    e[e.PluginBasedNGC = "PluginBasedNGC"] = "PluginBasedNGC";
    e[e.Pluginless = "Pluginless"] = "Pluginless";
  }(B = t.mediaConnectionType || (t.mediaConnectionType = {})));
  var j;
  (function (e) {
    e[e.Plan = "plan"] = "Plan";
    e[e.Package = "package"] = "Package";
  }(j = t.subscriptionType || (t.subscriptionType = {})));
  var F;
  (function (e) {
    e[e.Unknown = "Unknown"] = "Unknown";
    e[e.Unset = "Unset"] = "Unset";
    e[e.Defined = "Defined"] = "Defined";
    e[e.Saving = "Saving"] = "Saving";
  }(F = t.preferenceValueState || (t.preferenceValueState = {})));
  var I;
  (function (e) {
    e[e.URL_PREVIEWS = 11] = "URL_PREVIEWS";
    e[e.YOUTUBE_PLAYER = 12] = "YOUTUBE_PLAYER";
    e[e.MENTIONS = 13] = "MENTIONS";
    e[e.FILE_PASTE = 14] = "FILE_PASTE";
    e[e.ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY = 15] = "ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY";
    e[e.DONT_ALLOW_VIDEO_CALLS = 16] = "DONT_ALLOW_VIDEO_CALLS";
    e[e.TYPING_INDICATOR = 20] = "TYPING_INDICATOR";
    e[e.NOTIFICATIONS = 21] = "NOTIFICATIONS";
    e[e.NOTIFICATIONS_SOUND = 22] = "NOTIFICATIONS_SOUND";
    e[e.SHOW_EMOTICON_SUGGESTIONS_SETTINGS = 23] = "SHOW_EMOTICON_SUGGESTIONS_SETTINGS";
    e[e.SHOW_EMOTICONS = 24] = "SHOW_EMOTICONS";
    e[e.SHOW_ANIMATED_EMOTICONS = 25] = "SHOW_ANIMATED_EMOTICONS";
    e[e.SHOW_LARGE_EMOTICONS = 26] = "SHOW_LARGE_EMOTICONS";
    e[e.DARK_THEME = 28] = "DARK_THEME";
    e[e.VIDEO_AUTOPLAY = 29] = "VIDEO_AUTOPLAY";
    e[e.CHAT_NOTIFICATIONS_SOUND = 31] = "CHAT_NOTIFICATIONS_SOUND";
    e[e.CALL_NOTIFICATIONS = 32] = "CALL_NOTIFICATIONS";
    e[e.CALL_NOTIFICATIONS_SOUND = 33] = "CALL_NOTIFICATIONS_SOUND";
  }(I = t.skypeFlagsApiMappings || (t.skypeFlagsApiMappings = {})));
  var q;
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
    e[e.Notifications = "Notifications"] = "Notifications";
    e[e.RingingDeferrer = "RingingDeferrer"] = "RingingDeferrer";
  }(q = t.preferenceType || (t.preferenceType = {})));
  var R;
  (function (e) {
    e[e.Anyone = 0] = "Anyone";
    e[e.ContactsOnly = 1] = "ContactsOnly";
    e[e.NoOne = 2] = "NoOne";
  }(R = t.privacyPolicyValues || (t.privacyPolicyValues = {})));
  var U;
  (function (e) {
    e[e.Top = "Top"] = "Top";
    e[e.Bottom = "Bottom"] = "Bottom";
  }(U = t.contextMenuPosition || (t.contextMenuPosition = {})));
  var z;
  (function (e) {
    e[e.Unset = 0] = "Unset";
    e[e.Defer4Hours = 4] = "Defer4Hours";
    e[e.Defer8Hours = 8] = "Defer8Hours";
    e[e.Defer24Hours = 24] = "Defer24Hours";
  }(z = t.ringingDeferrerOptions || (t.ringingDeferrerOptions = {})));
  var W;
  (function (e) {
    e[e.Sending = "Sending"] = "Sending";
    e[e.Sent = "Sent"] = "Sent";
    e[e.Delivered = "Delivered"] = "Delivered";
    e[e.Error = "Error"] = "Error";
    e[e.Unknown = "Unknown"] = "Unknown";
  }(W = t.smsStatus || (t.smsStatus = {})));
  var X;
  (function (e) {
    e[e.ActiveSpeaker = "ActiveSpeaker"] = "ActiveSpeaker";
    e[e.MultiView = "MultiView"] = "MultiView";
    e[e.Both = "Both"] = "Both";
  }(X = t.videoMode || (t.videoMode = {})));
}));
