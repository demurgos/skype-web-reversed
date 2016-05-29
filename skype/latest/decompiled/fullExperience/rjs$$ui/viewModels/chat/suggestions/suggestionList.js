define("ui/viewModels/chat/suggestions/suggestionList", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "ui/components/chat/suggestions/emoticonSuggestionEngine",
  "utils/common/eventMixin",
  "constants/keys",
  "vendor/knockout",
  "telemetry/chat/suggestionSelectedEvent",
  "ui/components/chat/suggestions/mentionSuggestionEngine",
  "utils/common/outsideClickHandler"
], function (e, t) {
  function p() {
    function p(n, r) {
      var i = e.suggestions()[e.selectedIndex()];
      i.applySuggestion(t);
      t.data.selectedIndex = e.selectedIndex();
      t.data.resolution = t.enums.getResolution(n);
      t.publish();
      e.isVisible(!1);
      r.setBlurAndFocus();
    }
    function d() {
      t.data.resolution = t.enums.RESOLUTION.ESC;
      t.data.selectedIndex = e.selectedIndex();
      t.publish();
      e.isVisible(!1);
    }
    function v(t) {
      var n = e.selectedIndex() + t;
      e.selectedIndex() === -1 && (n = t === -1 ? e.suggestions().length - 1 : 0);
      0 <= n && n < e.suggestions().length && e.selectedIndex(n);
    }
    function m() {
      e.isVisible() && (t.data.resolution = t.enums.RESOLUTION.CLICKOUT, t.data.selectedIndex = e.selectedIndex(), t.publish(), e.isVisible(!1));
    }
    function g(i) {
      s = i.viewModel;
      var o = r.map(function (e) {
          return e.getSuggestions(i.viewModel, i.view);
        }), u = n.some(o, function (e) {
          return e.isExplicit;
        });
      t.data.trigger = u ? t.enums.TRIGGER.EXPLICIT : t.enums.TRIGGER.IMPLICIT;
      o = o.reduce(function (e, t) {
        return t.isExplicit === u ? e.concat(t.suggestions) : e;
      }, []);
      t.data.totalMatchCount = o.length;
      o = n.take(o, h);
      t.data.visibleMatchCount = o.length;
      var a = e.isVisible();
      e.suggestions(o);
      e.isVisible(o.length !== 0);
      e.selectedIndex() >= o.length ? e.selectedIndex(o.length - 1) : (!a || e.selectedIndex() === -1) && e.selectedIndex(u ? 0 : -1);
      a && !e.isVisible() && (t.data.resolution = t.enums.RESOLUTION.MISSMATCH, t.data.selectedIndex = e.selectedIndex(), t.publish());
    }
    function y(t) {
      var n = t.event.keyCode || t.event.which;
      if (!e.isVisible())
        return;
      var r = !0;
      switch (n) {
      case u.ESCAPE:
        d();
        break;
      case u.UP:
      case u.DOWN:
        v(n === u.UP ? -1 : 1);
        break;
      case u.ENTER:
      case u.TAB:
        e.selectedIndex() !== -1 ? p(n, t.viewModel) : r = !1;
        break;
      default:
        r = !1;
      }
      r && t.event.stopImmediatePropagation();
    }
    var e = this, t, r, s;
    e.isVisible = a.observable(!1);
    e.selectedIndex = a.observable(0);
    e.suggestions = a.observableArray([]);
    e.dispose = function () {
      c.remove("suggestionList");
    };
    e.init = function (u) {
      t = u.suggestionSelectedTelemetryEvent || new f();
      r = u.suggestionEngines || [];
      r.length === 0 && (r.push(new l()), r.push(new i()));
      r = n.sortBy(r, "priority");
      e.registerEvent(o.textarea.KEY_DOWN, y);
      e.registerEvent(o.textarea.INPUT, g);
      e.isVisible.subscribe(function (e) {
        e ? c.add("suggestionList", m) : c.remove("suggestionList");
      });
    };
    e.onSuggestionClick = function (r) {
      r.applySuggestion(t);
      var i = e.suggestions().indexOf(r);
      t.data.selectedIndex = i;
      t.data.resolution = t.enums.RESOLUTION.CLICKIN;
      t.publish();
      e.selectedIndex(i);
      e.isVisible(!1);
      s && s.setBlurAndFocus();
    };
    e.onSuggestionMouseOver = function (n) {
      var r = e.suggestions().indexOf(n);
      e.selectedIndex(r);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("ui/components/chat/suggestions/emoticonSuggestionEngine"), s = e("utils/common/eventMixin"), o = r.events, u = e("constants/keys"), a = e("vendor/knockout"), f = e("telemetry/chat/suggestionSelectedEvent"), l = e("ui/components/chat/suggestions/mentionSuggestionEngine"), c = e("utils/common/outsideClickHandler"), h = 8;
  n.assign(p.prototype, s);
  t.build = function () {
    return new p();
  };
});
