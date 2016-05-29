define("ui/telemetry/actions/actionNames", {
  audioVideo: {
    videoCall: "av_call_with_video",
    audioCall: "av_call_with_audio",
    pstnCall: "av_call_with_pstn",
    apiVideoCall: "av_api_call_with_video",
    apiAudioCall: "av_api_call_with_audio",
    toggleMute: "av_mute_unmute",
    toggleVideo: "av_video_on_off",
    toggleFullScreen: "av_full_screen",
    toggleNarrowMenu: "av_narrow_menu",
    toggleDialpad: "av_dialpad_on_off",
    zoomInOut: "av_zoom_in_out",
    endCall: "av_end_call",
    acceptWithAudio: "av_accept_with_audio",
    acceptWithVideo: "av_accept_with_video",
    reject: "av_reject_call",
    joinCall: "av_join_call",
    moreActions: "av_more_actions",
    addParticipants: "av_add_participants",
    shareScreen: "av_share_screen",
    stopSharingScreen: "av_stop_sharing_screen",
    submitParticipantsIn1to1: "av_submit_participants_in_1_1",
    submitParticipantsInGroup: "av_submit_participants_in_group",
    pluginInstall: {
      start: "av_plugin_install_start",
      installExtension: "av_install_extension",
      installPlugin: "av_install_plugin",
      restart: "av_plugin_install_restart",
      leave: "av_plugin_install_leave",
      stayInFlow: "av_plugin_install_cancel_leave"
    },
    timeline: {
      endCall: "av_timeline_end_call",
      toggleMute: "av_timeline_mute_unmute"
    }
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
    hidden: "contextMenuHidden"
  },
  search: {
    directorySearchActivated: "directorySearchActivated",
    started: "searchStarted",
    reset: "searchReset"
  },
  focusManager: { tryRestoreFocus: "tryRestoreFocus" },
  conversation: {
    addParticipantsButton: "conversation_addParticipants_button_clicked",
    scheduleCallButton: "conversation_scheduleCall_button_clicked",
    moreActionsButton: "conversation_moreActions_button_clicked"
  },
  scheduleCall: { scheduleCallConfirmButton: "conversation_scheduleCall_confirm_clicked" },
  chat: {
    removeMessage: "removeMessage",
    sendMessageButton: "send_message_button_clicked",
    editMessageButton: "edit_message_button_clicked",
    sendMessageEnter: "send_message_enter_key",
    editMessageEnter: "edit_message_enter_key",
    saveVideoMessage: "save_video_message"
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
    presenceLoaded: "me_presence_loaded"
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
  }
});
