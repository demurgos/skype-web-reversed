define("experience/api/messageFilter", [
  "require",
  "lodash-compat",
  "experience/settings"
], function (e) {
  function r(e) {
    if (!t.isFunction(e))
      throw "Message filter needs to be a valid function object";
    n.messageFilters.outgoingMessageFilter = e;
  }
  function i(e) {
    if (!t.isFunction(e))
      throw "Message filter needs to be a valid function object";
    n.messageFilters.chatLogMessageFilter = e;
  }
  var t = e("lodash-compat"), n = e("experience/settings");
  return {
    setOutgoingMessageFilter: r,
    setChatLogMessageFilter: i
  };
})
