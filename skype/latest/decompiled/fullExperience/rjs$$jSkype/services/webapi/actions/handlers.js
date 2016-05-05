define("jSkype/services/webapi/actions/handlers", [
  "require",
  "exports",
  "module",
  "jSkype/services/webapi/utils/conversationMetadataStore",
  "jSkype/utils/chat/conversation"
], function (e, t) {
  var n = e("jSkype/services/webapi/utils/conversationMetadataStore"), r = e("jSkype/utils/chat/conversation");
  t.buildMessageSuccess = function (e, t) {
    return function (i) {
      var s = i.response, o = r.getSyncStateFromResponse(s), u = !!s._metadata.backwardLink;
      n.set(e, o), t(s.messages || [], u);
    };
  };
})
