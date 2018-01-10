define("ui/telemetry/actions/actionNames", {
  audioVideo: {
    videoCall: "av_call_with_video",
    audioCall: "av_call_with_audio",
    pstnCall: "av_call_with_pstn",
    apiVideoCall: "av_api_call_with_video",
    apiAudioCall: "av_api_call_with_audio",
    toggleMute: "av_mute_unmute",
    toggleVideo: "av_video_on_off",
    showChat: "av_show_chat",
    hideChat: "av_hide_chat",
    toggleFullScreen: "av_full_screen",
    toggleNarrowMenu: "av_narrow_menu",
    toggleDialpad: "av_dialpad_on_off",
    toggleGridView: "av_grid_view",
    zoomInOut: "av_zoom_in_out",
    endCall: "av_end_call",
    acceptWithAudio: "av_accept_with_audio",
    acceptWithVideo: "av_accept_with_video",
    reject: "av_reject_call",
    joinCall: "av_join_call",
    joinCallWithVideo: "av_join_call_with_video",
    moreActions: "av_more_actions",
    addParticipants: "av_add_participants",
    shareScreenPreview: "av_share_screen_preview",
    shareScreen: "av_share_screen",
    stopSharingScreen: "av_stop_sharing_screen",
    submitParticipantsIn1to1: "av_submit_participants_in_1_1",
    submitParticipantsInGroup: "av_submit_participants_in_group",
    participantMenu: {
      show: "av_participantMenu_show",
      chat: "av_participantMenu_chat",
      pin: "av_partcipantMenu_pin",
      zoom: "av_partcipantMenu_zoom"
    },
    pluginInstall: {
      start: "av_plugin_install_start",
      installExtension: "av_install_extension",
      installPlugin: "av_install_plugin",
      restart: "av_plugin_install_restart",
      leave: "av_plugin_install_leave",
      stayInFlow: "av_plugin_install_cancel_leave",
      firefoxUnableToCall: "av_plugin_firefox_unable_to_call"
    },
    timeline: {
      endCall: "av_timeline_end_call",
      toggleMute: "av_timeline_mute_unmute"
    }
  },
  deviceSelection: {
    callScreenPaneOpened: "callScreenPaneOpened",
    microphoneSelected: "microphoneSelected",
    speakerSelected: "speakerSelected",
    cameraSelected: "cameraSelected"
  },
  contacts: {
    openPage: "contacts_contactsPage_openPage",
    openConversation: "contacts_contactsPage_openConversation",
    showContextMenu: "contacts_contactsPage_showContextMenu",
    contactRequestSent: "contacts_contactRequest_sent",
    contactRequestSuggestedSent: "contacts_contactRequest_suggestedSent",
    contactRequestAccepted: "contacts_contactRequest_accepted",
    contactRequestDeclined: "contacts_contactRequest_declined",
    contactBlocked: "contactBlocked",
    contactUnblocked: "contactUnblocked",
    contactDeleted: "contactDeleted",
    informationButtonClicked: "contacts_informationButton_clicked"
  },
  discoverAgents: {
    openPage: "agents_discoverAgentsPage_openPage",
    openConversation: "agents_discoverAgentsPage_openConversation"
  },
  contextMenu: {
    shown: "contextMenuShown",
    hidden: "contextMenuHidden",
    recents: {
      notificationsMuted: "contextMenu_recents_notificationsMuted",
      notificationsUnmuted: "contextMenu_recents_notificationsUnmuted"
    }
  },
  search: {
    directorySearchActivated: "directorySearchActivated",
    started: "searchStarted",
    startedLocal: "searchStartedLocal",
    startedDirectory: "searchStartedDirectory",
    reset: "searchReset"
  },
  focusManager: { tryRestoreFocus: "tryRestoreFocus" },
  conversation: {
    addParticipantsButton: "conversation_addParticipants_button_clicked",
    scheduleCallButton: "conversation_scheduleCall_button_clicked",
    moreActionsButton: "conversation_moreActions_button_clicked",
    mute: "conversation_mute_notifications_setting_changed"
  },
  scheduleCall: { scheduleCallConfirmButton: "conversation_scheduleCall_confirm_clicked" },
  chat: {
    removeMessage: "removeMessage",
    sendMessageButton: "send_message_button_clicked",
    editMessageButton: "edit_message_button_clicked",
    sendMessageEnter: "send_message_enter_key",
    editMessageEnter: "edit_message_enter_key",
    saveVideoMessage: "save_video_message",
    notificationsDisabled: "chat_notifications_disabled",
    notificationsEnabled: "chat_notifications_enabled"
  },
  skypeOut: { openPage: "skypeOut_openPage" },
  invites: {
    shareButton: "invites_share_button_clicked",
    copyButton: "invites_copy_button_clicked",
    mailButton: "invites_mail_button_clicked"
  },
  presence: { change: "mepresence_change" },
  userSettings: { openPage: "user_settings_open_page" },
  educationBubbles: { educationBubbleShown: "education_bubble_shown" },
  me: {
    expanded: "me_expanded",
    collapsed: "me_collapsed",
    accountLinkClicked: "me_account_link_clicked",
    signOutClicked: "me_sign_out_clicked",
    installPluginLinkClicked: "me_install_plugin_link_clicked",
    avatarFilePickerClicked: "me_avatar_file_picker_clicked",
    presenceChanged: "me_presence_changed",
    presenceLoaded: "me_presence_loaded",
    activityChanged: "me_activity_changed"
  },
  externalSignIn: {
    signIn: "external_sign_in",
    signInRequest: "external_sign_in_request",
    signInRequestAfterTokenRefresh: "external_sign_in_request_after_token_refresh",
    openSignInWindow: "external_open_sign_in_window"
  },
  shortCircuit: {
    contactsPageOpen: "sc_open_contactsPage",
    manageAddressBooks: "sc_open_manageAddressBooks",
    addNewNumber: "sc_open_pnv",
    deleteNumber: "sc_delete_phoneProof",
    toggleAutoBuddy: "sc_toggle_autoBuddy",
    togglePhoneProof: "sc_toggle_phoneProof"
  },
  notificationsSettings: {
    toggleNotifications: "toggleNotifications",
    toggleSound: "toggleSound",
    changeRingingDeferrerSetting: "ringingDeferrer_settingChanged"
  },
  notificationBox: {
    shown: "notification_box_shown",
    requestPermission: "notification_box_request_permission",
    permissionResponse: "notification_box_permission_response"
  },
  browserNotificationsOptInToast: { shown: "browser_notifications_opt_in_toast_shown" },
  allowBrowserNotificationsModalDialog: { shown: "allow_browser_notifications_modal_dialog_shown" }
});
