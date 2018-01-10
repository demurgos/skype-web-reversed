(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/utils/sanitizer", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function i(e, n) {
    n === void 0 && (n = !1);
    e.forEach(function (e) {
      if (!e)
        return;
      t.message(e.lastMessage, n);
    });
  }
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
      "isactive"
    ], r = [
      "_isFromPolling",
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
  t.message = function (e, t) {
    t === void 0 && (t = !1);
    var i = t ? n : n.concat(r);
    for (var s in e)
      e.hasOwnProperty(s) && i.indexOf(s) === -1 && delete e[s];
  };
  t.conversations = i;
}));
