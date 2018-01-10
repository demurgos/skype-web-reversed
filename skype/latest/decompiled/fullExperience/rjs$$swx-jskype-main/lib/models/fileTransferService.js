(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/fileTransferService", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/models/file",
      "../../lib/services/asyncMedia/main"
    ], e);
}(function (e, t) {
  function o(e, t) {
    return new s(e, t);
  }
  var n = e("jcafe-property-model"), r = e("../../lib/models/file"), i = e("../../lib/services/asyncMedia/main"), s = function () {
      function e(e, t) {
        this.files = n.collection();
        this.apiHandler = t;
        this.conversation = e;
        this.send = n.command(this.sendCommand.bind(this), this.conversation.activeModalities.chat);
        this.remove = n.command(this.removeCommand.bind(this), this.conversation.activeModalities.chat);
      }
      return e.prototype.sendCommand = function (e) {
        var t = this, i = [];
        return Array.prototype.forEach.call(e, function (e) {
          var n = r.build(t.conversation, t.apiHandler);
          i.push(n._send(e));
          t.files.add(n);
        }), n.task.waitAll(i);
      }, e.prototype.removeCommand = function (e) {
        return i.get().deleteFile(e);
      }, e;
    }();
  t.FileTransferService = s;
  t.build = o;
}));
