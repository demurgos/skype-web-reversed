define("ui/viewModels/chat/groupSearch", [
  "require",
  "vendor/knockout",
  "utils/common/ko",
  "utils/common/array",
  "cafe/applicationInstance",
  "services/pubSub/pubSub",
  "constants/common",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "constants/common"
], function (e) {
  var t = e("vendor/knockout"), n = e("utils/common/ko"), r = e("utils/common/array"), i = e("cafe/applicationInstance"), s = e("services/pubSub/pubSub"), o = e("constants/common"), u = e("ui/telemetry/telemetryClient"), a = e("experience/settings"), f = e("constants/common").events.search;
  return function (l, c) {
    function y(e) {
      if (g !== e)
        return;
      g = null;
      p(d.results().map(function (e) {
        return e.result;
      }));
    }
    function b(e) {
      var t, n;
      if (!e) {
        p([]);
        return;
      }
      if (g)
        try {
          g.cancel("Another search triggered");
        } catch (r) {
          u.get().sendEvent(a.telemetry.uiTenantToken, o.telemetry.promiseInvalidStateException.TYPE, {
            feature: o.telemetry.promiseInvalidStateException.feature.GROUP_SEARCH,
            exception: JSON.stringify(r)
          });
        }
      t = e.replace(/[^\w\s]/g, "").trim().toLowerCase();
      d = i.get().conversationsManager.createSearchQuery();
      w("group", !0);
      w("topic", t);
      n = d.getMore();
      g = n;
      n.then(y.bind(null, n));
    }
    function w(e, t) {
      if (d.supportedKeywords().indexOf(e) < 0)
        return;
      d.keywords[e] = t;
    }
    function E(e) {
      function i(e, n) {
        var i = new l(c);
        i.init(n);
        i.groupSearchResults = m;
        r.insertAt(t, e, i);
      }
      var t = h.searchResults();
      n.handleArrayChanges(t, e, i);
      h.searchResults.valueHasMutated();
    }
    var h = this, p = t.observableArray(), d, v, m, g;
    p.subscribe(function (e) {
      m = e.length;
      s.publish(f.GROUPS_SEARCH_RESULTS, m);
    });
    this.searchResults = t.observableArray();
    this.init = function () {
      s.subscribe(f.QUERY_CHANGED, b);
      v = p.subscribe(E, null, "arrayChange");
    };
    this.dispose = function () {
      s.unsubscribe(f.QUERY_CHANGED, b);
      v && v.dispose();
    };
  };
});
