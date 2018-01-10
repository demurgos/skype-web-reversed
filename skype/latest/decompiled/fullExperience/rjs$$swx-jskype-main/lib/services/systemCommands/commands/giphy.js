(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/systemCommands/commands/giphy", [
      "require",
      "exports",
      "../../../../lib/services/systemCommands/commandsHelper",
      "jskype-settings-instance",
      "swx-constants",
      "swx-log-tracer",
      "reqwest"
    ], e);
}(function (e, t) {
  function f() {
    return new a();
  }
  var n = e("../../../../lib/services/systemCommands/commandsHelper"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("swx-log-tracer"), o = e("reqwest"), u = s.getLogger("CommandGiphy"), a = function () {
      function e() {
        this.isAvailableFor = r.isFeatureOn(i.COMMON.featureFlags.GIPHY) ? n.availableAlways : n.availableNever;
        this.help = "[expression] - sends random GIF for given expression (optional)";
        this.showInHelp = !0;
        this.action = function (e, t, i) {
          i.data.argument = t;
          o.compat({
            method: "get",
            dataType: "json",
            url: "https://api.giphy.com/v1/gifs/random?api_key=" + r.settings.giphy.apiKey + "&rating=" + r.settings.giphy.rating + (t ? "&tag=" + t.replace(/\s+/g, "+") : ""),
            crossOrigin: !0
          }).then(function (r) {
            if (r && r.data && r.data.image_url) {
              t ? e.chatService.sendMessage(r.data.image_url, null, { activityData: JSON.stringify({ giphyExpression: t }) }) : e.chatService.sendMessage(r.data.image_url);
              i.data.isSuccess = !0;
              i.publish();
              return;
            }
            n.sendSystemMessage(e, "No giphies found for *" + t + "*. Try different one.");
            i.data.isSuccess = !1;
            i.publish();
          }, function (t) {
            u.error(t);
            n.sendSystemMessage(e, "Failed to connect to giphy");
            i.data.isSuccess = !1;
            i.publish();
          });
        };
      }
      return e;
    }();
  t.Giphy = a;
  t.build = f;
}));
