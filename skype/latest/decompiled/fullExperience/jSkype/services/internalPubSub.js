define("jSkype/services/internalPubSub", [
  "require",
  "lodash-compat",
  "swx-pubsub"
], function (e) {
  function i() {
    return r || (r = new n(), t.bindAll(r, "subscribe", "unsubscribe", "publish", "unsubscribeAll")), r;
  }
  function s() {
    r = null;
  }
  var t = e("lodash-compat"), n = e("swx-pubsub").default, r;
  return {
    get: i,
    reset: s
  };
})
