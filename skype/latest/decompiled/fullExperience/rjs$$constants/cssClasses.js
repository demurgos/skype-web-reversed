define("constants/cssClasses", [
  "require",
  "exports",
  "module"
], function (e, t) {
  t.HIDE = "swx-hide";
  t.LIST_SELECTABLE = "list-selectable";
  t.SEARCH_ITEM = "searchItem";
  t.MODAL_DIALOG = "swx-overlayModal";
  t.contextMenu = {
    CONTEXT_MENU: "swxContextMenu",
    FLIPPED: "flipped",
    items: {
      BLOCK_CONTACT: "blockContactMenuItem",
      CALL_SKYPE: "callSkypeMenuItem",
      DELETE_CONTACT: "deleteContactMenuItem",
      START_PSTN_CALL: "startPSTNCallMenuItem",
      UNBLOCK_CONTACT: "unblockContactMenuItem",
      VIDEO_CALL: "videoCallMenuItem",
      SCHEDULE_CALL: "scheduleCallMenuItem"
    }
  };
  t.avatar = {
    AVATAR: "Avatar",
    AVATAR_PRESENCE: "Avatar--presence",
    AVATAR_GROUP: "Avatar--group",
    AVATAR_SELECTED: "Avatar--selected",
    AVATAR_AGENT: "Avatar--agent",
    AVATAR_PSTN: "Avatar--pstn",
    AVATAR_SIZE: "Avatar--size"
  };
  t.avatarDeprecated = {
    GROUP_AVATAR: "group",
    SHOW_PRESENCE: "presence"
  };
  t.presence = { BLOCKED: "blocked" };
  t.contacts = {
    CONTACT_TILE: "contactTile",
    TILE_NAME: "tileName"
  };
  t.discoverAgents = { PAGE: "DiscoverAgentsPage" };
  t.base = {
    SWX: "swx",
    DESKTOP: "desktop",
    OVERLAY_CONTAINER: "overlayContainer"
  };
  t.educationBubbles = {
    PREFIX: "EducationBubble--",
    LARGE: "EducationBubble--large"
  };
});
