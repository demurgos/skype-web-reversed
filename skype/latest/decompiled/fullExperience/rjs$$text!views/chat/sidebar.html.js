define("text!views/chat/sidebar.html", [], function () {
  return "<!-- ko if: isSidebarInAlternativeLayout  -->\r\n    <div class=\"navigation beforeSearch\">\r\n        <div role=\"menubar\" data-bind=\"foreach: items\">\r\n            <swx-menu-item params=\"viewModel: $data\"></swx-menu-item>\r\n        </div>\r\n        <!-- ko if: isNotificationsCenterEnabled -->\r\n        <swx-notifications-menu-item params=\"isDisabled: itemsDisabled\"></swx-notifications-menu-item>\r\n        <!-- /ko -->\r\n    </div>\r\n    <!-- ko ifnot: isNotificationsCenterActive -->\r\n    <div class=\"search afterMenuItems\" data-bind=\"css: {active: isSearchActive}\">\r\n        <div class=\"splitter\"></div>\r\n        <swx-search-input></swx-search-input>\r\n        <swx-search-results></swx-search-results>\r\n    </div>\r\n    <!-- /ko -->\r\n<!-- /ko -->\r\n\r\n<!-- ko ifnot: isSidebarInAlternativeLayout  -->\r\n<div class=\"search beforeMenuItems\" data-bind=\"css: {active: isSearchActive}\">\r\n    <swx-search-input></swx-search-input>\r\n    <div class=\"splitter\"></div>\r\n    <swx-search-results></swx-search-results>\r\n</div>\r\n<div class=\"navigation afterSearch\" data-bind=\"css: {hide: isSearchActive}\">\r\n    <div role=\"menubar\" data-bind=\"foreach: items, keyboardNavigation: { itemSelector: 'a' }, css: { navigationMenuIcons: isNavigationMenuIconsEnabled }\">\r\n        <swx-menu-item params=\"viewModel: $data\"></swx-menu-item>\r\n    </div>\r\n    <!-- ko if: isNotificationsCenterEnabled -->\r\n    <swx-notifications-menu-item params=\"isDisabled: itemsDisabled\"></swx-notifications-menu-item>\r\n    <!-- /ko -->\r\n</div>\r\n<!-- /ko -->\r\n\r\n<swx-recents params=\"buttonsDisabled: itemsDisabled\" class=\"timeline\" data-bind=\"css: {hide: hideRecents}\"></swx-recents>\r\n<!-- ko if: isUserSettingsEnabled && !isNavigationMenuIconsEnabled -->\r\n<div class=\"navigation afterTimeline\" data-bind=\"keyboardNavigation: { itemSelector: 'a' }\">\r\n    <swx-menu-item params=\"viewModel: userSettingsMenuItem\"></swx-menu-item>\r\n</div>\r\n<!-- /ko -->\r\n\r\n<!-- ko if: isNotificationsCenterEnabled && isNotificationsCenterActive -->\r\n<swx-notifications></swx-notifications>\r\n<!-- /ko -->\r\n\r\n";
})