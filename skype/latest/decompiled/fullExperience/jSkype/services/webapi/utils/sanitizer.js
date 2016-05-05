define("jSkype/services/webapi/utils/sanitizer", [
  "require",
  "exports",
  "module"
], function (e, t) {
  var n = [
    "id",
    "type",
    "clientmessageid",
    "ackrequired",
    "imdisplayname",
    "from",
    "messagetype",
    "conversationLink",
    "originalarrivaltime",
    "composetime",
    "content",
    "contenttype",
    "contentformat",
    "skypeeditedid",
    "skypeeditoffset",
    "skypeemoteoffset",
    "skypeguid",
    "skypeignore",
    "properties",
    "originalContent",
    "personId",
    "timestamp",
    "contactRequestType",
    "greeting",
    "isOutgoing",
    "pstnEventType",
    "isGroup",
    "participantName",
    "participantEndpoint",
    "pluginFreeMessageType"
  ];
  t.message = function (e) {
    for (var t in e)
      e.hasOwnProperty(t) && n.indexOf(t) === -1 && delete e[t];
  }, t.conversations = function (e) {
    e.forEach(function (e) {
      t.message(e.lastMessage);
    });
  };
})
