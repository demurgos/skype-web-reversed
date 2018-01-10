define("ui/educationBubbles/educationBubbleInfo", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-constants").COMMON;
  t.SEARCH_EDUCATION_BUBBLE = {
    id: 8,
    anchorElementQuery: ".swx .icon .search",
    i18nKey: "education_bubble_search",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleSearch.svg"
  };
  t.SEARCH_EDUCATION_BUBBLE_BUSINESS = {
    id: 9,
    anchorElementQuery: ".swx .icon .search",
    i18nKey: "education_bubble_search_4b",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleSearch.svg",
    options: {
      isBusinessFlagService: !0,
      i18nButtonKey: "education_bubble_gotit_button_4b",
      i18nTitleKey: "education_bubble_search_title_4b"
    }
  };
  t.CALL_EDUCATION_BUBBLE = {
    id: 6,
    anchorElementQuery: ".fragment:not(.hide) .headerMain .headerControls .callButtons button",
    i18nKey: "education_bubble_call",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleCall.svg",
    options: { mutatingContainerElementQuery: ".fragment:not(.hide) .headerMain" }
  };
  t.CHAT_EDUCATION_BUBBLE = {
    id: 10,
    anchorElementQuery: ".ContactsPage-body .contactTile:not(.echo)",
    i18nKey: "education_bubble_chat",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleChat.svg",
    options: { orientation: r.educationBubbles.ORIENTATION.TOP }
  };
  t.CHAT_EDUCATION_BUBBLE_BUSINESS = {
    id: 11,
    anchorElementQuery: ".ContactsPage-body .contactTile:not(.echo)",
    i18nKey: "education_bubble_chat_4b",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleChat.svg",
    options: {
      orientation: r.educationBubbles.ORIENTATION.TOP,
      isBusinessFlagService: !0,
      i18nButtonKey: "education_bubble_gotit_button_4b",
      i18nTitleKey: "education_bubble_chat_title_4b"
    }
  };
  t.SCHEDULE_CALL_EDUCATION_BUBBLE_1_GROUP = {
    id: 17,
    anchorElementQuery: ".fragment:not(.hide) .headerMain .headerControls .moreActions button",
    i18nKey: "education_bubble_schedule_call_1_group",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleScheduleCall.svg",
    options: {
      prerequisiteBubbleIds: [6],
      mutatingContainerElementQuery: ".fragment:not(.hide) .headerMain",
      size: r.educationBubbles.SIZE.LARGE
    }
  };
  t.SCHEDULE_CALL_EDUCATION_BUBBLE_1 = n.extend({}, t.SCHEDULE_CALL_EDUCATION_BUBBLE_1_GROUP, { i18nKey: "education_bubble_schedule_call_1" });
  t.SCHEDULE_CALL_EDUCATION_BUBBLE_2_GROUP = {
    id: 18,
    anchorElementQuery: ".swxContextMenu .scheduleCallMenuItem",
    i18nKey: "education_bubble_schedule_call_1_group",
    iconUrlPath: "/assets/images/components/educationBubbles/educationBubbleScheduleCall.svg",
    options: {
      prerequisiteBubbleIds: [17],
      orientation: r.educationBubbles.ORIENTATION.LEFT
    }
  };
  t.SCHEDULE_CALL_EDUCATION_BUBBLE_2 = n.extend({}, t.SCHEDULE_CALL_EDUCATION_BUBBLE_2_GROUP, { i18nKey: "education_bubble_schedule_call_1_group" });
});
