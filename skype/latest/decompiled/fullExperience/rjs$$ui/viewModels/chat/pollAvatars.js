define("ui/viewModels/chat/pollAvatars", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-i18n",
  "ui/viewModels/people/contactBuilder",
  "telemetry/chat/poll"
], function (e, t) {
  function o(e, t) {
    function u(e) {
      var t = o.model.pollAnswers()[e];
      o.selectedEllipsis(e);
      o.users.removeAll();
      t.users.forEach(function (e) {
        var t = {};
        t.person = e.person;
        t.displayName = e.displayName;
        e.person && (t.contact = i.build(e.person));
        o.users.push(t);
      });
    }
    var o = this;
    o.selectedEllipsis = n.observable(-1);
    o.model = e;
    o.users = n.observableArray();
    o.isSelfPopup = function (e, t) {
      return o.selectedEllipsis() === e && t.key === "polls";
    };
    o.onEllipsisClick = function (e, n, r) {
      s.avatarElipsisClicked(o.model);
      u(e);
      t({
        key: "polls",
        eventPageY: r.pageY
      });
    };
    o.votedByCount = function (e) {
      return r.fetch({
        key: "poll_list_title",
        params: { count: e }
      });
    };
  }
  var n = e("vendor/knockout"), r = e("swx-i18n").localization, i = e("ui/viewModels/people/contactBuilder"), s = e("telemetry/chat/poll");
  t.build = function (e, t) {
    return new o(e, t);
  };
});
