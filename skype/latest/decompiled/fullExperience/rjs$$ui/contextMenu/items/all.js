define("ui/contextMenu/items/all", [
  "require",
  "exports",
  "module",
  "ui/contextMenu/menuItemGroup",
  "ui/contextMenu/items/blockContact",
  "ui/contextMenu/items/callSkype",
  "ui/contextMenu/items/deleteContact",
  "ui/contextMenu/items/editMessage",
  "ui/contextMenu/items/leaveConversation",
  "ui/contextMenu/items/markConversationAsRead",
  "ui/contextMenu/items/markAllConversationsAsRead",
  "ui/contextMenu/items/mutingConversation",
  "ui/contextMenu/items/mutingConversation",
  "ui/contextMenu/items/openConversation",
  "ui/contextMenu/items/openConversationWithPerson",
  "ui/contextMenu/items/viewPersonProfile",
  "ui/contextMenu/items/quoteMessage",
  "ui/contextMenu/items/copyMessageMenuItem",
  "ui/contextMenu/items/copySelectionMenuItem",
  "ui/contextMenu/items/copySelectionTextMenuItem",
  "ui/contextMenu/items/removeConversationHistory",
  "ui/contextMenu/items/addGroupConversationToFavorites",
  "ui/contextMenu/items/addContactToFavorites",
  "ui/contextMenu/items/removeGroupConversationFromFavorites",
  "ui/contextMenu/items/removeContactFromFavorites",
  "ui/contextMenu/items/removeMessage",
  "ui/contextMenu/items/copyLink",
  "ui/contextMenu/items/openLink",
  "ui/contextMenu/items/removeParticipant",
  "ui/contextMenu/items/saveVideoMessage",
  "ui/contextMenu/items/startPSTNCall",
  "ui/contextMenu/items/unblockContact",
  "ui/contextMenu/items/videoCall",
  "ui/contextMenu/items/addParticipants",
  "ui/contextMenu/items/scheduleCall",
  "ui/contextMenu/items/shareScreen",
  "ui/contextMenu/items/avSettings",
  "ui/contextMenu/items/transferCall",
  "ui/contextMenu/items/unansweredCallWrap",
  "ui/contextMenu/items/goToDialPad",
  "ui/contextMenu/items/callParticipant/chat",
  "ui/contextMenu/items/callParticipant/pin",
  "ui/contextMenu/items/callParticipant/zoom"
], function (e, t) {
  t.MenuItemGroup = e("ui/contextMenu/menuItemGroup");
  t.BlockContactMenuItem = e("ui/contextMenu/items/blockContact");
  t.CallSkypeMenuItem = e("ui/contextMenu/items/callSkype");
  t.DeleteContactMenuItem = e("ui/contextMenu/items/deleteContact");
  t.EditMessageMenuItem = e("ui/contextMenu/items/editMessage");
  t.LeaveConversationMenuItem = e("ui/contextMenu/items/leaveConversation");
  t.MarkConversationAsReadMenuItem = e("ui/contextMenu/items/markConversationAsRead");
  t.MarkAllConversationsAsReadMenuItem = e("ui/contextMenu/items/markAllConversationsAsRead");
  t.MuteConversationMenuItem = e("ui/contextMenu/items/mutingConversation").MuteConversationMenuItem;
  t.UnmuteConversationMenuItem = e("ui/contextMenu/items/mutingConversation").UnmuteConversationMenuItem;
  t.OpenConversationMenuItem = e("ui/contextMenu/items/openConversation");
  t.OpenConversationWithPersonMenuItem = e("ui/contextMenu/items/openConversationWithPerson");
  t.ViewPersonProfileMenuItem = e("ui/contextMenu/items/viewPersonProfile");
  t.QuoteMessageMenuItem = e("ui/contextMenu/items/quoteMessage");
  t.CopyMessageMenuItem = e("ui/contextMenu/items/copyMessageMenuItem");
  t.CopySelectionMenuItem = e("ui/contextMenu/items/copySelectionMenuItem");
  t.CopySelectionTextMenuItem = e("ui/contextMenu/items/copySelectionTextMenuItem");
  t.RemoveConversationMenuItem = e("ui/contextMenu/items/removeConversationHistory");
  t.AddGroupConversationToFavoritesMenuItem = e("ui/contextMenu/items/addGroupConversationToFavorites");
  t.AddContactToFavoritesMenuItem = e("ui/contextMenu/items/addContactToFavorites");
  t.RemoveGroupConversationFromFavoritesMenuItem = e("ui/contextMenu/items/removeGroupConversationFromFavorites");
  t.RemoveContactFromFavoritesMenuItem = e("ui/contextMenu/items/removeContactFromFavorites");
  t.RemoveMessageMenuItem = e("ui/contextMenu/items/removeMessage");
  t.CopyLinkMenuItem = e("ui/contextMenu/items/copyLink");
  t.OpenLinkMenuItem = e("ui/contextMenu/items/openLink");
  t.RemoveParticipantMenuItem = e("ui/contextMenu/items/removeParticipant");
  t.SaveVideoMessageMenuItem = e("ui/contextMenu/items/saveVideoMessage");
  t.StartPSTNCallMenuItem = e("ui/contextMenu/items/startPSTNCall");
  t.UnblockContactMenuItem = e("ui/contextMenu/items/unblockContact");
  t.VideoCallMenuItem = e("ui/contextMenu/items/videoCall");
  t.AddParticipantsMenuItem = e("ui/contextMenu/items/addParticipants");
  t.ScheduleCallMenuItem = e("ui/contextMenu/items/scheduleCall");
  t.ShareScreen = e("ui/contextMenu/items/shareScreen");
  t.AVSettings = e("ui/contextMenu/items/avSettings");
  t.TransferCall = e("ui/contextMenu/items/transferCall");
  t.UnansweredCallWrapMenuItem = e("ui/contextMenu/items/unansweredCallWrap");
  t.GoToDialPadMenuItem = e("ui/contextMenu/items/goToDialPad");
  t.CallParticipantChatMenuItem = e("ui/contextMenu/items/callParticipant/chat");
  t.CallParticipantPinMenuItem = e("ui/contextMenu/items/callParticipant/pin");
  t.CallParticipantZoomMenuItem = e("ui/contextMenu/items/callParticipant/zoom");
  t.itemOrderPriorities = {};
  t.itemOrderPriorities[t.OpenConversationMenuItem.TYPE] = { priority: 0 };
  t.itemOrderPriorities[t.OpenConversationWithPersonMenuItem.TYPE] = { priority: 0 };
  t.itemOrderPriorities[t.CallSkypeMenuItem.TYPE] = { priority: 1 };
  t.itemOrderPriorities[t.StartPSTNCallMenuItem.TYPE] = {
    priority: 2,
    subPriorities: {
      Cell: { priority: 0 },
      Home: { priority: 1 },
      Work: { priority: 2 },
      Other: { priority: 3 }
    }
  };
  t.itemOrderPriorities[t.VideoCallMenuItem.TYPE] = { priority: 3 };
  t.itemOrderPriorities[t.ViewPersonProfileMenuItem.TYPE] = { priority: 4 };
  t.itemOrderPriorities[t.MuteConversationMenuItem.TYPE] = { priority: 5 };
  t.itemOrderPriorities[t.UnmuteConversationMenuItem.TYPE] = { priority: 5 };
  t.itemOrderPriorities[t.BlockContactMenuItem.TYPE] = { priority: 6 };
  t.itemOrderPriorities[t.UnblockContactMenuItem.TYPE] = { priority: 7 };
  t.itemOrderPriorities[t.DeleteContactMenuItem.TYPE] = { priority: 8 };
  t.itemOrderPriorities[t.LeaveConversationMenuItem.TYPE] = { priority: 9 };
  t.itemOrderPriorities[t.RemoveConversationMenuItem.TYPE] = { priority: 10 };
  t.itemOrderPriorities[t.MarkConversationAsReadMenuItem.TYPE] = { priority: 11 };
  t.itemOrderPriorities[t.MarkAllConversationsAsReadMenuItem.TYPE] = { priority: 12 };
  t.itemOrderPriorities[t.AddGroupConversationToFavoritesMenuItem.TYPE] = { priority: 13 };
  t.itemOrderPriorities[t.RemoveGroupConversationFromFavoritesMenuItem.TYPE] = { priority: 14 };
  t.itemOrderPriorities[t.AddContactToFavoritesMenuItem.TYPE] = { priority: 11 };
  t.itemOrderPriorities[t.RemoveContactFromFavoritesMenuItem.TYPE] = { priority: 12 };
});
