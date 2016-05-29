define("ui/components/chat/recentItem", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/chat/timeline/recentItem.html"
], function (e, t) {
  t.name = e("constants/components").chat.RECENT_ITEM;
  t.template = e("text!views/chat/timeline/recentItem.html");
});
