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
  "ui/contextMenu/items/openConversation",
  "ui/contextMenu/items/openConversationWithPerson",
  "ui/contextMenu/items/viewPersonProfile",
  "ui/contextMenu/items/quoteMessage",
  "ui/contextMenu/items/removeConversationHistory",
  "ui/contextMenu/items/addToFavorites",
  "ui/contextMenu/items/removeFromFavorites",
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
  "ui/contextMenu/items/shareScreen"
], function (e, t) {
  t.MenuItemGroup = e("ui/contextMenu/menuItemGroup");
  t.BlockContactMenuItem = e("ui/contextMenu/items/blockContact");
  t.CallSkypeMenuItem = e("ui/contextMenu/items/callSkype");
  t.DeleteContactMenuItem = e("ui/contextMenu/items/deleteContact");
  t.EditMessageMenuItem = e("ui/contextMenu/items/editMessage");
  t.LeaveConversationMenuItem = e("ui/contextMenu/items/leaveConversation");
  t.OpenConversationMenuItem = e("ui/contextMenu/items/openConversation");
  t.OpenConversationWithPersonMenuItem = e("ui/contextMenu/items/openConversationWithPerson");
  t.ViewPersonProfileMenuItem = e("ui/contextMenu/items/viewPersonProfile");
  t.QuoteMessageMenuItem = e("ui/contextMenu/items/quoteMessage");
  t.RemoveConversationMenuItem = e("ui/contextMenu/items/removeConversationHistory");
  t.AddToFavoritesMenuItem = e("ui/contextMenu/items/addToFavorites");
  t.RemoveFromFavoritesMenuItem = e("ui/contextMenu/items/removeFromFavorites");
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
  t.itemOrderPriorities[t.BlockContactMenuItem.TYPE] = { priority: 5 };
  t.itemOrderPriorities[t.UnblockContactMenuItem.TYPE] = { priority: 6 };
  t.itemOrderPriorities[t.DeleteContactMenuItem.TYPE] = { priority: 7 };
  t.itemOrderPriorities[t.LeaveConversationMenuItem.TYPE] = { priority: 8 };
  t.itemOrderPriorities[t.RemoveConversationMenuItem.TYPE] = { priority: 9 };
  t.itemOrderPriorities[t.AddToFavoritesMenuItem.TYPE] = { priority: 10 };
  t.itemOrderPriorities[t.RemoveFromFavoritesMenuItem.TYPE] = { priority: 10 };
});
