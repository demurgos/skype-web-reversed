(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/extensionLifecycleFacade", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../../lib/services/outOfBrowser/extension",
      "../../../lib/services/outOfBrowser/messagingChannel",
      "../../../lib/services/outOfBrowser/extensionCommandHandler",
      "swx-constants",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function f(e) {
    return new a(e);
  }
  var n = e("jcafe-property-model"), r = e("../../../lib/services/outOfBrowser/extension"), i = e("../../../lib/services/outOfBrowser/messagingChannel"), s = e("../../../lib/services/outOfBrowser/extensionCommandHandler"), o = e("swx-constants"), u = e("jskype-settings-instance"), a = function () {
      function e(e) {
        var t = this;
        this.extension = null;
        this.messagingChannel = null;
        this.getMessagingChannelTask = null;
        this.getMessagingChannel = function () {
          return t.getMessagingChannelTask || (t.getMessagingChannelTask = n.task(), t.extension.getAppHost().then(function () {
            return t.subscribeToMessagesFromExtension(), t.extension.openShellApp(t.notifyOnExtensionDisconnected.bind(t));
          })["catch"](function (e) {
            t.getMessagingChannelTask.reject(e);
          })), t.getMessagingChannelTask.promise;
        };
        this.disconnect = function () {
          return t.extension ? t.extension.disconnect() : Promise.resolve();
        };
        this.getVersion = function () {
          return t.extension ? t.extension.getAppHost().then(function (e) {
            return e.getVersion();
          }) : Promise.reject(new Error("The object was disposed."));
        };
        this.dispose = function () {
          t.messagingChannel && (t.messagingChannel.dispose(), t.messagingChannel = null);
          t.getMessagingChannelTask = null;
          t.onShellAppWindowHiddenCallback = null;
          t.onExtensionDisconnectedCallback = null;
          t.onShellAppCallEscalatedCallback = null;
          t.extension && (t.extension.disconnect(), t.extension.dispose(), t.extension = null);
        };
        this.onExtensionDisconnected = function (e) {
          t.onExtensionDisconnectedCallback = e;
        };
        this.onShellAppWindowHidden = function (e) {
          t.onShellAppWindowHiddenCallback = e;
        };
        this.onShellAppCallEscalated = function (e) {
          t.onShellAppCallEscalatedCallback = e;
        };
        this.extension = r.build(e);
      }
      return e.prototype.notifyOnExtensionDisconnected = function () {
        this.onExtensionDisconnectedCallback && this.onExtensionDisconnectedCallback();
      }, e.prototype.notifyOnShellAppWindowHidden = function () {
        this.onShellAppWindowHiddenCallback && this.onShellAppWindowHiddenCallback();
      }, e.prototype.notifyOnShellAppCallEscalated = function (e) {
        this.onShellAppCallEscalatedCallback && this.onShellAppCallEscalatedCallback(e);
      }, e.prototype.subscribeToMessagesFromExtension = function () {
        this.messagingChannel = i.build(this.extension);
        this.messagingChannel.registerCommandHandler(o.OUT_OF_BROWSER.commands.SHELL_APP_READY_FOR_BOOTSTRAP, this.onShellAppReadyForBootstrap.bind(this));
        this.messagingChannel.registerCommandHandler(o.OUT_OF_BROWSER.commands.SHELL_APP_INITIALISED, this.onShellAppInitialised.bind(this));
        this.messagingChannel.registerEventHandler(o.OUT_OF_BROWSER.shellAppEvents.WindowHidden, this.notifyOnShellAppWindowHidden.bind(this));
        this.messagingChannel.registerCommandHandler(o.OUT_OF_BROWSER.commands.ESCALATE_CONVERSATION, this.notifyOnShellAppCallEscalated.bind(this));
      }, e.prototype.onShellAppInitialised = function () {
        s.build(this.messagingChannel);
        this.getMessagingChannelTask.resolve(this.messagingChannel);
      }, e.prototype.onShellAppReadyForBootstrap = function () {
        this.messagingChannel.sendCommand(o.OUT_OF_BROWSER.commands.BOOTSTRAP, { url: u.settings.shellApp.bootstrapperUrl });
      }, e;
    }();
  t.ExtensionLifecycleFacade = a;
  t.build = f;
}));
