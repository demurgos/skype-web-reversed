define("componentsToLoad", [
  "experience/components/experience",
  "experience/components/people",
  "experience/components/calling",
  "experience/components/chat",
  "experience/components/commerce",
  "experience/components/userSettings",
  "experience/components/me",
  "experience/components/notifications"
], function () {
  return Array.prototype.slice.apply(arguments);
});
