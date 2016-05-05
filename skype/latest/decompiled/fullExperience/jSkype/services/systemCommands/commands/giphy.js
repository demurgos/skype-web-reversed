define("jSkype/services/systemCommands/commands/giphy", [
  "require",
  "exports",
  "module",
  "jSkype/services/systemCommands/commandsHelper",
  "jSkype/settings",
  "constants/common",
  "reqwest"
], function (e, t) {
  function o() {
    this.isAvailableFor = r.isFeatureOn(i.featureFlags.GIPHY) ? n.availableAlways : n.availableNever, this.help = "[expression] - sends random GIF for given expression (optional)", this.showInHelp = !0, this.action = function (e, t) {
      s.compat({
        method: "get",
        dataType: "json",
        url: "https://api.giphy.com/v1/gifs/random?api_key=" + r.settings.giphy.apiKey + "&rating=" + r.settings.giphy.rating + (t ? "&tag=" + t.replace(/\s+/g, "+") : ""),
        crossOrigin: !0
      }).then(function (r) {
        if (r && r.data && r.data.image_url) {
          e.chatService.sendMessage(r.data.image_url, null, { activityData: JSON.stringify({ giphyExpression: t }) });
          return;
        }
        n.sendSystemMessage(e, "No giphies found for *" + t + "*. Try different one.");
      }, function (t) {
        n.sendSystemMessage(e, "Failed to connect to giphy");
      });
    };
  }
  var n = e("jSkype/services/systemCommands/commandsHelper"), r = e("jSkype/settings"), i = e("constants/common"), s = e("reqwest");
  t.build = function () {
    return new o();
  };
})
