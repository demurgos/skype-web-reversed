define("jSkype/services/systemCommands/commands/alerts", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper"
], function (e, t) {
  function r() {
    this.isAvailableFor = n.availableAlways, this.help = "", this.showInHelp = !0, this.action = function (e) {
      e.chatService._updateNotificationSettings(!1);
    };
  }
  function i() {
    this.isAvailableFor = n.availableAlways, this.help = "[keywords]", this.showInHelp = !0, this.action = function (e, t) {
      e.chatService._updateNotificationSettings(!0, t);
    };
  }
  function s() {
    this.on = new i(), this.off = new r(), this.isAvailableFor = n.availableAlways, this.help = "off | on [keywords]", this.showInHelp = !0, this.action = function (e, t) {
      function r(t) {
        n.sendSystemMessage(e, "Unknown argument, use: /alerts " + t);
      }
      if (!t) {
        r(this.help);
        return;
      }
      var i = t.match(/^(\w+)\s*([\s\S]+)?/), s = i && i[1].toLowerCase();
      s === "on" || s === "off" ? this[s].action(e, i && i[2]) : r(this.help);
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper");
  t.off = {
    build: function () {
      return new r();
    }
  }, t.on = {
    build: function () {
      return new i();
    }
  }, t.build = function () {
    return new s();
  };
})
