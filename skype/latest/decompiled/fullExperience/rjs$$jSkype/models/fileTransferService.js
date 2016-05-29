define("jSkype/models/fileTransferService", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/models/file",
  "jSkype/services/asyncMedia/main"
], function (e, t) {
  function s(e, t) {
    function o(i) {
      var o, u = [];
      return Array.prototype.forEach.call(i, function (n) {
        o = r.build(e, t);
        u.push(o._send(n));
        s.files.add(o);
      }), n.task.waitAll(u);
    }
    function u(e) {
      var t = n.task();
      return i.deleteFile(e, t.resolve.bind(t), t.reject.bind(t)), t.promise;
    }
    var s = this;
    s.files = n.collection();
    s.send = n.command(o, e.activeModalities.chat);
    s.remove = n.command(u, e.activeModalities.chat);
  }
  var n = e("jcafe-property-model"), r = e("jSkype/models/file"), i = e("jSkype/services/asyncMedia/main");
  t.build = function (e, t) {
    return new s(e, t);
  };
});
