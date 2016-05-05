define("jSkype/services/webapi/constants", [
  "require",
  "exports",
  "module"
], function (e, t) {
  t.SERVICE_CALLS = {
    SET_THREAD_OPTION: "setThreadOption",
    SET_CONVERSATION_OPTION: "setConversationOption",
    PIN_TO_DOGFOOD: "pinToDogfood",
    CREATE_CONVERSATION: "createConversation",
    POST_MESSAGE: "postMessage",
    ADD_PARTICIPANT: "addParticipant",
    REMOVE_PARTICIPANT: "removeParticipant",
    SET_CONSUMPTION_HORIZON: "setConsumptionHorizon",
    FETCH_MESSAGES: "fetchMessages",
    FETCH_MESSAGES_LOAD_MORE: "fetchMessagesLoadMore",
    FETCH_THREAD: "fetchThread",
    FETCH_CONVERSATION: "fetchConversation",
    FETCH_CONVERSATIONS: "fetchConversations",
    FETCH_CONVERSATIONS_BY_SYNC_STATE: "fetchConversationsBySyncState",
    REQUEST_ENDPOINT_CREATION: "requestEndpointCreation",
    REQUEST_ENDPOINT_DELETION: "requestEndpointDeletion",
    REQUEST_SUBSCRIPTION_CREATION: "requestSubscriptionCreation",
    REQUEST_POLLING: "requestPolling",
    SET_ENDPOINT_PRESENCE: "setEndpointPresence",
    SET_ENDPOINT_PROPERTY: "setEndpointProperty",
    ACTIVATE_ENDPOINT: "activateEndpoint",
    SET_USER_PRESENCE: "setUserPresence",
    GET_USER_PRESENCE: "getUserPresence",
    SEND_CONTACT_LIST: "sendContactsList",
    ADD_CONTACT_TO_CONTACTS_LIST: "addContactToContactsList",
    REMOVE_CONTACT_FROM_CONTACTS_LIST: "removeContactFromContactsList",
    GET_SELF_PROPERTIES: "getSelfProperties",
    SET_MESSAGE_PROPERTY: "setMessageProperty",
    REMOVE_MESSAGE_PROPERTY: "removeMessageProperty",
    REMOVE_ALL_MESSAGES: "removeAllMessage",
    SET_FAVORITES: "setFavorites",
    GET_FAVORITES: "getFavorites"
  }, t.ENDPOINT_PROPERTIES = { SUPPORTS_MESSAGE_PROPERTIES: "supportsMessageProperties" }, t.MESSAGE_PROPERTIES = {
    GLOBAL: {
      ACTIVITY_DATA: "activityData",
      PINNED: "pinned",
      PROTOTYPE_SKYPEX: "prototype_skypex"
    },
    PER_USER: {
      EMOTIONS: "emotions",
      POLL: "poll",
      TRANSLATIONS: "translations"
    }
  }, t.ACTIVATE_ENDPOINT_TIMEOUT = 12000, t.ACTIVATE_ENDPOINT_TOLERANCE = 6000;
})
