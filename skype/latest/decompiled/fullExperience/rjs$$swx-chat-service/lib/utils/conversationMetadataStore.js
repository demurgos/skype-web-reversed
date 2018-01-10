(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/utils/conversationMetadataStore", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e() {
      this.conversationMetadataStore = {};
    }
    return e.prototype.get = function (e) {
      return this.conversationMetadataStore[e] ? this.conversationMetadataStore[e].syncState : undefined;
    }, e.prototype.set = function (e, t) {
      this.conversationMetadataStore[e] = { syncState: t };
    }, e.prototype.clear = function (e) {
      delete this.conversationMetadataStore[e];
    }, e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));
