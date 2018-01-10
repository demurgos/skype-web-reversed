define("experience/api/builder", [
  "require",
  "exports",
  "module",
  "jCafe",
  "swx-cafe-application-instance",
  "experience/api/me",
  "experience/api/contact",
  "experience/api/conversation",
  "experience/api/notifications",
  "utils/chat/unreadConversations",
  "experience/api/calling",
  "experience/api/authentication",
  "experience/api/events",
  "experience/api/visibility",
  "experience/api/focus",
  "experience/api/rendering",
  "experience/settings",
  "experience/api/messageFilter",
  "experience/api/navigation",
  "experience/api/flagsObservable"
], function (e, t) {
  function b(e) {
    e.isAvailable = function () {
      return !0;
    };
  }
  function w(e) {
    e.setPluginAutoUpdate = function (e) {
      v.featureFlags.pluginAutoUpdate = e;
    };
  }
  function E(e) {
    e.application = n.Application;
  }
  function S(e) {
    e.subscribeUI = c.subscribeUI;
  }
  function x(e) {
    e.renderContent = d.renderContent;
    e.renderSidebar = d.renderSidebar;
    e.renderMe = d.renderMe;
  }
  function T(e) {
    e.me = i.expose();
  }
  function N(e) {
    e.contact = s.getByUri;
  }
  function C(e) {
    e.setNotificationHandler = u.setNotificationHandler;
  }
  function k(e) {
    e.startConversation = o.startConversation;
    e.joinConversation = o.joinConversation;
    e.newConversation = o.newConversation;
  }
  function L(e) {
    e.activity = { unreadConversations: a.getInstance().getCount };
  }
  function A(e) {
    e.setFocus = h.setFocus;
  }
  function O(e) {
    e.focus = { restoreFocus: p.restoreFocus };
  }
  function M(e) {
    e.calling = f.buildApi();
  }
  function _(e) {
    l.init();
    e.setAuthProvider = l.setAuthProvider;
    e.signIn = l.signIn;
    e.signOut = l.signOut;
  }
  function D(e) {
    e.getVersion = function () {
      return v.version;
    };
  }
  function P(e) {
    e.renderConversation = o.renderConversation;
  }
  function H(e) {
    e.setAnonymousUserMode = function (e) {
      v.authentication.anonymousMode = !!e;
    };
  }
  function B(e) {
    e.UIApplicationInstance = r.get();
  }
  function j(e) {
    e.setOutgoingMessageFilter = m.setOutgoingMessageFilter;
  }
  function F(e) {
    e.setChatLogMessageFilter = m.setChatLogMessageFilter;
  }
  function I(e) {
    e.flags = y.expose();
  }
  function q(e) {
    e.navigateBySkypeUri = g.navigateBySkypeUri;
  }
  var n = e("jCafe"), r = e("swx-cafe-application-instance"), i = e("experience/api/me"), s = e("experience/api/contact"), o = e("experience/api/conversation"), u = e("experience/api/notifications"), a = e("utils/chat/unreadConversations"), f = e("experience/api/calling"), l = e("experience/api/authentication"), c = e("experience/api/events"), h = e("experience/api/visibility"), p = e("experience/api/focus"), d = e("experience/api/rendering"), v = e("experience/settings"), m = e("experience/api/messageFilter"), g = e("experience/api/navigation"), y = e("experience/api/flagsObservable");
  t.get = function () {
    var t = {};
    return v.API.version === 1 && (_(t), T(t), N(t), C(t), x(t), k(t), L(t), A(t), O(t), S(t), D(t), M(t), w(t), b(t), I(t), q(t)), v.API.version === 2 && (B(t), P(t), H(t), j(t), F(t)), v.API.exposeCafe && E(t), t;
  };
});
