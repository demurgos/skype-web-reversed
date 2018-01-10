(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/alerts", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = function () {
      function e() {
        this.isAvailableFor = n.availableAlways;
        this.help = "";
        this.showInHelp = !0;
        this.action = function (e, t, n) {
          e.chatService._updateNotificationSettings(!1);
          n.data.isSuccess = !0;
          n.publish();
        };
      }
      return e;
    }();
  t.Off = r;
  var i = function () {
    function e() {
      this.isAvailableFor = n.availableAlways;
      this.help = "[keywords]";
      this.showInHelp = !0;
      this.action = function (e, t, n) {
        e.chatService._updateNotificationSettings(!0, t);
        n.data.isSuccess = !0;
        n.publish();
      };
    }
    return e;
  }();
  t.On = i;
  var s = function () {
    function e() {
      var e = this;
      this.on = new i();
      this.off = new r();
      this.isAvailableFor = n.availableAlways;
      this.help = "off | on [keywords]";
      this.showInHelp = !0;
      this.action = function (t, r, i) {
        function s(e) {
          n.sendSystemMessage(t, "Unknown argument, use: /alerts " + e);
        }
        i.data.isSuccess = !1;
        if (!r) {
          s(e.help);
          i.publish();
          return;
        }
        var o = r.match(/^(\w+)\s*([\s\S]+)?/), u = o && o[1].toLowerCase();
        if (u === "on" || u === "off") {
          var a = e;
          a[u].action(t, o && o[2], i);
          i.data.argument = u;
          i.data.isSuccess = !0;
        } else
          s(e.help);
        i.publish();
      };
    }
    return e;
  }();
  t.Alerts = s;
  t.off = {
    build: function () {
      return new r();
    }
  };
  t.on = {
    build: function () {
      return new i();
    }
  };
  t.build = o;
}));
