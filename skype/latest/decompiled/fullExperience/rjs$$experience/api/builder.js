define("experience/api/builder", [
  "require",
  "exports",
  "module",
  "jCafe",
  "cafe/applicationInstance",
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
  "experience/api/flagsObservable"
], function (e, t) {
  function y(e) {
    e.isAvailable = function () {
      return !0;
    };
  }
  function b(e) {
    e.setPluginAutoUpdate = function (e) {
      v.featureFlags.pluginAutoUpdate = e;
    };
  }
  function w(e) {
    e.application = n.Application;
  }
  function E(e) {
    e.subscribeUI = c.subscribeUI;
  }
  function S(e) {
    e.renderContent = d.renderContent, e.renderSidebar = d.renderSidebar, e.renderMe = d.renderMe;
  }
  function x(e) {
    e.me = i.expose();
  }
  function T(e) {
    e.contact = s.getByUri;
  }
  function N(e) {
    e.setNotificationHandler = u.setNotificationHandler;
  }
  function C(e) {
    e.startConversation = o.startConversation, e.joinConversation = o.joinConversation, e.newConversation = o.newConversation;
  }
  function k(e) {
    e.activity = { unreadConversations: a.getInstance().getCount };
  }
  function L(e) {
    e.setFocus = h.setFocus;
  }
  function A(e) {
    e.focus = { restoreFocus: p.restoreFocus };
  }
  function O(e) {
    e.calling = f.buildApi();
  }
  function M(e) {
    l.init(), e.setAuthProvider = l.setAuthProvider, e.signIn = l.signIn, e.signOut = l.signOut;
  }
  function _(e) {
    e.getVersion = function () {
      return v.version;
    };
  }
  function D(e) {
    e.renderConversation = o.renderConversation;
  }
  function P(e) {
    e.setAnonymousUserMode = function (e) {
      v.authentication.anonymousMode = !!e;
    };
  }
  function H(e) {
    e.UIApplicationInstance = r.get();
  }
  function B(e) {
    e.setOutgoingMessageFilter = m.setOutgoingMessageFilter;
  }
  function j(e) {
    e.setChatLogMessageFilter = m.setChatLogMessageFilter;
  }
  function F(e) {
    e.setFlag = g.expose().setFlag;
  }
  var n = e("jCafe"), r = e("cafe/applicationInstance"), i = e("experience/api/me"), s = e("experience/api/contact"), o = e("experience/api/conversation"), u = e("experience/api/notifications"), a = e("utils/chat/unreadConversations"), f = e("experience/api/calling"), l = e("experience/api/authentication"), c = e("experience/api/events"), h = e("experience/api/visibility"), p = e("experience/api/focus"), d = e("experience/api/rendering"), v = e("experience/settings"), m = e("experience/api/messageFilter"), g = e("experience/api/flagsObservable");
  t.get = function () {
    var t = {};
    return v.API.version === 1 && (M(t), x(t), T(t), N(t), S(t), C(t), k(t), L(t), A(t), E(t), _(t), O(t), b(t), y(t), F(t)), v.API.version === 2 && (H(t), D(t), P(t), B(t), j(t)), v.API.exposeCafe && w(t), t;
  };
})
