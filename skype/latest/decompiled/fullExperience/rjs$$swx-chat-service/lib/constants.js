(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/constants", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e.SET_THREAD_OPTION = "setThreadOption";
    e.SET_CONVERSATION_OPTION = "setConversationOption";
    e.PIN_TO_DOGFOOD = "pinToDogfood";
    e.CREATE_CONVERSATION = "createConversation";
    e.POST_MESSAGE = "postMessage";
    e.ADD_PARTICIPANT = "addParticipant";
    e.REMOVE_PARTICIPANT = "removeParticipant";
    e.SET_CONSUMPTION_HORIZON = "setConsumptionHorizon";
    e.FETCH_MESSAGES = "fetchMessages";
    e.FETCH_MESSAGES_LOAD_MORE = "fetchMessagesLoadMore";
    e.FETCH_THREAD = "fetchThread";
    e.FETCH_CONVERSATION = "fetchConversation";
    e.FETCH_CONVERSATIONS = "fetchConversations";
    e.FETCH_CONVERSATIONS_BY_SYNC_STATE = "fetchConversationsBySyncState";
    e.REQUEST_ENDPOINT_CREATION = "requestEndpointCreation";
    e.REQUEST_ENDPOINT_DELETION = "requestEndpointDeletion";
    e.REQUEST_SUBSCRIPTION_CREATION = "requestSubscriptionCreation";
    e.REQUEST_POLLING = "requestPolling";
    e.SET_ENDPOINT_PRESENCE = "setEndpointPresence";
    e.SET_ENDPOINT_PROPERTY = "setEndpointProperty";
    e.ACTIVATE_ENDPOINT = "activateEndpoint";
    e.SET_USER_PRESENCE = "setUserPresence";
    e.GET_USER_PRESENCE = "getUserPresence";
    e.SEND_CONTACT_LIST = "sendContactsList";
    e.ADD_CONTACT_TO_CONTACTS_LIST = "addContactToContactsList";
    e.REMOVE_CONTACT_FROM_CONTACTS_LIST = "removeContactFromContactsList";
    e.GET_SELF_PROPERTIES = "getSelfProperties";
    e.SET_MESSAGE_PROPERTY = "setMessageProperty";
    e.REMOVE_MESSAGE_PROPERTY = "removeMessageProperty";
    e.REMOVE_ALL_MESSAGES = "removeAllMessage";
    e.SET_IS_FAVORITE = "setIsFavorite";
    e.SMS_PRICE = "getSmsPrice";
  }(n = t.SERVICE_CALLS || (t.SERVICE_CALLS = {})));
  var r;
  (function (e) {
    e.SUPPORTS_MESSAGE_PROPERTIES = "supportsMessageProperties";
  }(r = t.ENDPOINT_PROPERTIES || (t.ENDPOINT_PROPERTIES = {})));
  var i;
  (function (e) {
    var t;
    (function (e) {
      e.ACTIVITY_DATA = "activityData";
      e.PINNED = "pinned";
      e.PROTOTYPE_SKYPEX = "prototype_skypex";
    }(t = e.GLOBAL || (e.GLOBAL = {})));
    var n;
    (function (e) {
      e.EMOTIONS = "emotions";
      e.POLL = "poll";
      e.TRANSLATIONS = "translations";
      e.ACTIVITY_DATA = "activityData";
      e.SMS_REPORT = "smsdeliveryreports";
    }(n = e.PER_USER || (e.PER_USER = {})));
  }(i = t.MESSAGE_PROPERTIES || (t.MESSAGE_PROPERTIES = {})));
  t.ACTIVATE_ENDPOINT_TIMEOUT = 12000;
  t.ACTIVATE_ENDPOINT_TOLERANCE = 6000;
}));
