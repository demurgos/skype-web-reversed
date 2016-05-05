define("componentsToLoad", [
  "experience/components/experience",
  "experience/components/people",
  "experience/components/calling",
  "experience/components/chat",
  "experience/components/commerce",
  "experience/components/userSettings",
  "experience/components/me"
], function () {
  return Array.prototype.slice.apply(arguments);
})
