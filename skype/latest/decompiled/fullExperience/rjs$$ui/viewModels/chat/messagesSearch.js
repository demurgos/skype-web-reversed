define("ui/viewModels/chat/messagesSearch", [
  "require",
  "vendor/knockout",
  "swx-i18n",
  "services/pubSub/pubSub",
  "constants/common",
  "services/serviceLocator",
  "cafe/applicationInstance",
  "constants/common"
], function (e) {
  var t = e("vendor/knockout"), n = e("swx-i18n").localization, r = e("services/pubSub/pubSub"), i = e("constants/common"), s = e("services/serviceLocator"), o = e("cafe/applicationInstance"), u = e("constants/common").events.search;
  return function (a) {
    function m(e) {
      var t;
      if (!v)
        return;
      y(), f.hasAdditionalResults(!1);
      if (!e || e.length < h)
        return;
      t = e.replace(/[^\w\s]/g, "").trim().toLowerCase(), l = t, o.get()._messagesSearchService.query(t, 20).then(function (n) {
        if (l !== t)
          return;
        y(), f.hasAdditionalResults(!1);
        var r = 0;
        n.forEach(function (e) {
          var t, n = g(e);
          if (!n)
            return;
          t = new a(), t.init(e, n), r++ < c ? f.searchResults.push(t) : (p.push(t), f.hasAdditionalResults(!0));
        });
      });
    }
    function g(e) {
      return o.get().conversationsManager._getConversation(e.ConversationId);
    }
    function y() {
      p.forEach(function (e) {
        e.dispose();
      }), p = [], f.searchResults().forEach(function (e) {
        e.dispose();
      }), f.searchResults.removeAll();
    }
    var f = this, l, c = 5, h = 4, p = [], d = s.resolve(i.serviceLocator.FEATURE_FLAGS), v = d.isFeatureOn(i.featureFlags.CONTENT_SEARCH);
    this.searchResults = t.observableArray(), this.title = n.fetch({ key: "content_search_header" }), this.displayAdditionResults = function () {
      p.forEach(function (e) {
        f.searchResults.push(e);
      }), p = [], f.hasAdditionalResults(!1);
    }, this.hasAdditionalResults = t.observable(!1), this.additionalResultsTitle = n.fetch({ key: "content_search_additional_results" }), this.init = function () {
      if (!v)
        return;
      r.subscribe(u.QUERY_CHANGED, m);
    }, this.dispose = function () {
      r.unsubscribe(u.QUERY_CHANGED, m), y();
    };
  };
})
