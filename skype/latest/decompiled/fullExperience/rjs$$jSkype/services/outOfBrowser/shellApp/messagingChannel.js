define("jSkype/services/outOfBrowser/shellApp/messagingChannel", [
  "require",
  "exports",
  "module",
  "constants/outOfBrowser"
], function (e, t) {
  function r() {
    function r(r) {
      var i = r.data;
      if (i.type === n.commandTypes.REQUEST) {
        var s = {
            name: i.name,
            type: n.commandTypes.RESPONSE
          }, o = function () {
            e.sendCommand(s);
          }, u = function (t) {
            s.error = t, e.sendCommand(s);
          }, a;
        try {
          var f = t[i.name];
          a = Promise.resolve(f(i.data));
        } catch (l) {
          a = Promise.reject(l);
        }
        a.then(o, u);
      }
    }
    var e = this, t = {};
    window.shellApp.addEventListener(n.shellAppEvents.MessageReceived, r), e.sendCommand = function (e) {
      window.shellApp.invoke(n.shellAppMethods.PostMessage, { message: e });
    }, e.registerCommandHandler = function (e, n) {
      t[e] = n;
    };
  }
  var n = e("constants/outOfBrowser");
  t.build = function () {
    return new r();
  };
})
