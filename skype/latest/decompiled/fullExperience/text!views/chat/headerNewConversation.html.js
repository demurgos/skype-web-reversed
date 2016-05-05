define("text!views/chat/headerNewConversation.html", [], function () {
  return "<div class=\"headerMain\">\r\n    <div class=\"roster\">\r\n        <div class=\"grid\">\r\n            <span class=\"tile conversationTopic\">\r\n                <span class=\"tileText\">\r\n                    <span class=\"tileName square\">\r\n                        <h3 data-bind=\"html: topic\"></h3>\r\n                    </span>\r\n                    <span class=\"tileMessage\">\r\n                        <div class=\"message\">\r\n                            <a class=\"participantCount\">\r\n                                 <p data-bind=\"text: participantCount\"></p>\r\n                            </a>\r\n                        </div>\r\n                    </span>\r\n                </span>\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"contactPickerWrapper\" data-bind=\"event: { keydown: handleKeyDown }\">\r\n    <div class=\"headerAdd\">\r\n        <swx-contact-picker-input params=\"setParticipantProvider: setParticipantProvider\"></swx-contact-picker-input>\r\n    </div>\r\n\r\n    <swx-contact-picker params=\"conversation: conversationModel, className: 'headerPicker', showJumpToConversation: true\"></swx-contact-picker>\r\n    <!-- ko if: !newConversationV2() -->\r\n        <!-- ko if: spacesEnabled -->\r\n            <swx-space-settings params=\"conversationModel: conversationModel, defaultVal: true\"></swx-space-settings>\r\n        <!-- /ko -->\r\n    <!-- /ko -->\r\n\r\n    <!-- ko if: newConversationV2 -->\r\n    <div class=\"actions\">\r\n        <div class=\"conversationButtons\">\r\n            <div class=\"submitConversation\">\r\n                <swx-button params=\"cssClass: 'secondary circle', disabled: false, textKey: 'action_button_cancel', titleKey: 'action_button_cancel', ariaLabelKey: 'action_button_cancel', action: cancel\"></swx-button>\r\n                <swx-button params=\"cssClass: 'primary circle', disabled: confirmButtonDisabled, textKey: 'action_button_confirm', titleKey: 'action_button_confirm', ariaLabelKey: 'action_button_confirm', action: confirm\"></swx-button>\r\n            </div>\r\n\r\n            <!-- ko if: spacesEnabled -->\r\n            <swx-conversation-share-link class=\"conversation-share-link-actions\" params=\"conversationModel: conversationModel, telemetryContext: telemetryContext\"></swx-conversation-share-link>\r\n            <!-- /ko -->\r\n        </div>\r\n    </div>\r\n    <!-- /ko -->\r\n</div>\r\n\r\n<div class=\"headerControls\" data-bind=\"css: { newConversationV2: newConversationV2 }\">\r\n    <!-- ko if: !newConversationV2() -->\r\n    <div class=\"buttonRow\">\r\n        <swx-button params=\"icon: 'tick', cssClass: 'primary circle', disabled: confirmButtonDisabled, textKey: 'action_button_confirm', titleKey: 'action_button_confirm', ariaLabelKey: 'action_button_confirm', action: confirm\"></swx-button>\r\n        <swx-button params=\"icon: 'cross', cssClass: 'primary circle', disabled: false, textKey: 'action_button_cancel', titleKey: 'action_button_cancel', ariaLabelKey: 'action_button_cancel', action: cancel\"></swx-button>\r\n    </div>\r\n    <!-- /ko -->\r\n    <!-- ko if: newConversationV2 -->\r\n    <div class=\"buttonRow newConversationV2\">\r\n        <swx-button class=\"callButtons\" params=\"icon: 'videoOn', cssClass: 'primary circle', disabled: 'true', textKey: 'button_text_videoCall'\"></swx-button>\r\n        <swx-button class=\"callButtons\" params=\"icon: 'callStart', cssClass: 'primary circle', disabled: 'true', textKey: 'button_text_audioCall'\"></swx-button>\r\n\r\n        <!-- ko if: !showMoreActions() -->\r\n        <swx-button params=\"icon: 'contactAdd', cssClass: 'primary circle', disabled: 'true', textKey: 'button_text_addParticipants'\"></swx-button>\r\n        <!-- /ko -->\r\n        <!-- ko if: showMoreActions() -->\r\n        <swx-button params=\"icon: 'more', cssClass: 'secondary circle stroke', disabled: 'true', textKey: 'button_text_moreActions'\"></swx-button>\r\n        <!-- /ko -->\r\n    </div>\r\n    <!-- /ko -->\r\n</div>\r\n";
})
