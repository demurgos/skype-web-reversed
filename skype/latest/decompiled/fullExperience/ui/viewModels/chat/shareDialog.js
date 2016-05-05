define("ui/viewModels/chat/shareDialog", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "constants/common",
  "utils/common/eventMixin",
  "cafe/applicationInstance"
], function (e, t) {
  function u(e, t) {
    function a() {
      return s.chatInputAsync.then(function (e) {
        f().then(function (t) {
          var r = e();
          n.forEach(t, function (e) {
            l(e, r);
          });
        });
      });
    }
    function f() {
      var e = o.get().conversationsManager, t, r = e.conversations();
      return r.length > 0 ? (t = n.max(r, function (e) {
        return e.lastModificationTimestamp();
      }), Promise.resolve([t])) : e.getMoreConversations.enabled() ? e.getMoreConversations(1).then(function () {
        return [n.first(e.conversations())];
      }) : Promise.resolve([]);
    }
    function l(e, t) {
      var n = e.chatService;
      t = t.trim(), t.length > 0 && n.sendMessage(t), s.sharedUrl && n.sendMessage(s.sharedUrl);
    }
    var s = this, u = [];
    s.sharedUrl = e, s.flowId = t, s.isHidden = r.observable(!0), s.show = function () {
      s.isHidden(!1);
    }, s.dispose = function () {
    }, s.shareButtonEnabled = r.observable(!0), s.chatInputAsync = new Promise(function (e) {
      s.registerEvent(i.textarea.INITIALIZATION_COMPLETE, function (n) {
        e(n.messageBody);
      });
    }), s.share = function () {
      var e = a();
      return u.push(e), e.then(function () {
        u.remove(e);
      }), e;
    }, s.whenAllSharingOpsCompleted = function () {
      return Promise.all(u);
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("constants/common").events, s = e("utils/common/eventMixin"), o = e("cafe/applicationInstance");
  n.assign(u.prototype, s), t.build = function (e, t) {
    return new u(e, t);
  };
})
