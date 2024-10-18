declare module '@green-api/whatsapp-api-client' {
    export function restAPI(params?: {}): RestAPI;
    export function webhookAPI(express: any, webhookRoutePath: any): WebhooksCallbackAPI;
    declare class RestAPI {
        constructor(params: any);
        params: {
            host: string;
            media: string;
            idInstance: string;
            apiTokenInstance: string;
            credentialsPath: any;
        };
        message: MessageAPI;
        file: FileAPI;
        instance: InstanceAPI;
        settings: SettingsAPI;
        group: GroupAPI;
        webhookService: WebhookServiceAPI;
    }
    declare class WebhooksCallbackAPI {
        constructor(express: any, webhookRoutePath: any);
        _app: any;
        _webhookRoutePath: any;
        _callbacks: Map<any, any>;
        init(): void;
        /**
         *
         * @param {Function} callback function
         */
        onStateInstance(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onOutgoingMessageStatus(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onIncomingMessageText(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onIncomingMessageFile(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onIncomingMessageLocation(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onIncomingMessageContact(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onIncomingMessageExtendedText(callback: Function): void;
        /**
         *
         * @param {Function} callback function
         */
        onDeviceInfo(callback: Function): void;
    }
    declare class MessageAPI {
        constructor(restAPI: any);
        _restAPI: any;
        /** Send text message to chat or phone. Method call adds message to sending queue
         *
         * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages).
         * Mandatory if phoneNumber is empty
         * @param {Number} phoneNumber - receiver phone number using international format without + sign.
         * Mandatory if chatId is empty
         * @param {String} message - text message
         * @param {boolean} linkPreview - allow preview
         * @param {String} quotedMessageId - id of message
         */
        sendMessage(chatId: string, phoneNumber: number, message: string, quotedMessageId?: string, linkPreview?: boolean): Promise<any>;
        /** Send text message to chat or phone. Method call adds message to sending queue
         *
         * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages).
         * Mandatory if phoneNumber is empty
         * @param {String} phoneNumber - number (77077771515@c.us - for private messages).
         * @param {String} message - text message
         * @param {array} options - array of objects
         * @param {boolean} multipleAnswers - allow answers
         * @param {String} quotedMessageId - id of message
         */
        sendPoll(chatId: string, phoneNumber: string, message: string, options: any[], multipleAnswers?: boolean, quotedMessageId?: string): Promise<any>;
        /** Send buttons message to chat. Method call adds message to sending queue
         *
         * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages).
         * Mandatory if phoneNumber is empty
         * @param {String} message - text message
         * @param {footer} footer - footer message
         * @param {array} buttons - buttons, for example  [{"buttonId": "1", "buttonText": "green"}, {"buttonId": "2", "buttonText": "red"}, {"buttonId": "3", "buttonText": "blue"}]
         */
        sendButtons(chatId: string, message: string, footer: any, buttons: any[]): Promise<any>;
        /** Send buttons message to chat. Method call adds message to sending queue
         *
         * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages).
         * @param {String} message - text message
         * @param {footer} footer - footer message
         * @param {array} templateButtons - buttons, for example [
                {"index": 1, "urlButton": {"displayText": "⭐ Star us on GitHub!", "url": "https://github.com/green-api"}},
                {"index": 2, "callButton": {"displayText": "Call us", "phoneNumber": "+1 (234) 5678-901"}},
                {"index": 3, "quickReplyButton": {"displayText": "Plain button", "id": "plainButtonId"}}
            ]
         */
        sendTemplateButtons(chatId: string, message: string, footer: any, templateButtons: any[]): Promise<any>;
        /** Send buttons message to chat. Method call adds message to sending queue
         *
         * @param {String} chatId - chat id using Whatsapp format (17633123456@c.us - for private messages).
         * @param {String} message - text message
         * @param {String} buttonText - action list
         * @param {String} title - title
         * @param {footer} footer - footer message
         * @param {array} sections - sections, for example  [
            {
                "title": "Секция 1",
                "rows": [
                    {
                        "title": "Вариант 1",
                        "rowId": "option1"
                    },
                    {
                        "title": "Вариант 2",
                        "rowId": "option2",
                        "description": "Пояснение"
                    }
                ]
            }
         */
        sendListMessage(chatId: string, message: string, buttonText: string, title: string, footer: any, sections: any[]): Promise<any>;
        /**
         * @param {String} chatId
         * @param {Number} phoneNumber
         * @param {String} nameLocation
         * @param {String} address
         * @param {Number} latitude
         * @param {Number} longitude
         */
        sendLocation(chatId: string, phoneNumber: number, nameLocation: string, address: string, latitude: number, longitude: number): Promise<any>;
        /**
         * @param {String} chatId
         * @param {Number} phoneNumber
         * @param {Object} contact - object with one or more fields
         */
        sendContact(chatId: string, phoneNumber: number, contact: any): Promise<any>;
        /**
         * @param {String} chatId
         * @param {Number} phoneNumber
         * @param {String} urlLink
         */
        sendLink(chatId: string, phoneNumber: number, urlLink: string): Promise<any>;
        /**
         * @param {String} chatId
         * @param {Number} phoneNumber
         * @param {String} idMessage
         */
        readChat(chatId: string, phoneNumber: number, idMessage?: string): Promise<any>;
        /**
         * Returns array of QueueMessage objects
         */
        showMessagesQueue(): Promise<any>;
        clearMessagesQueue(): Promise<any>;
        /**
         * Returns array of Message objects
         */
        lastIncomingMessages(): Promise<any>;
        /**
         * Returns array of Message objects
         */
        lastOutgoingMessages(): Promise<any>;
        /**
         * Returns history of chat
         */
        getChatHistory(chatId: any, count?: any): Promise<any>;
        /**
         * The method returns the chat message.
         *
         * @param {String} chatId
         * @param {String} idMessage
         *
         */
        getMessage(chatId: string, idMessage: string): Promise<any>;
        /**
         * The method is intended for forwarding messages to a personal or group chat
         * @param {String} chatId
         * @param {String} chatIdFrom
         * @param {Array} messages
         */
        forwardMessages(chatId: string, chatIdFrom: string, messages: any[]): Promise<any>;
        addChadIdParam(postData: any, chatId: any): void;
        addPhoneParam(postData: any, phoneNumber: any): void;
    }
    declare class FileAPI {
        constructor(restAPI: any);
        _restAPI: any;
        /**
         * @param {String} chatId
         * @param {Number} phoneNumber
         * @param {String} urlFile
         * @param {String} fileName
         * @param {String} caption Optional
         */
        sendFileByUrl(chatId: string, phoneNumber: number, urlFile: string, fileName: string, caption?: string): Promise<any>;
        /**
         * @param {String} filePath
         */
        uploadFile(filePath: string): Promise<any>;
        /**
         * @param {FormData} formData
         */
        sendFileByUpload(formData: FormData): Promise<any>;
        /**
         * @param {String} chatId
         * @param {String} idMessage
         */
        downloadFile(chatId: string, idMessage: string): Promise<any>;
        addChadIdParam(postData: any, chatId: any): void;
        addPhoneParam(postData: any, phoneNumber: any): void;
    }
    declare class InstanceAPI {
        constructor(restAPI: any);
        _restAPI: any;
        qr(): Promise<any>;
        logout(): Promise<any>;
        reboot(): Promise<any>;
        getStateInstance(): Promise<any>;
        getDeviceInfo(): Promise<any>;
        /**
         *
         * @param {Number} phoneNumber
         */
        checkWhatsapp(phoneNumber: number): Promise<any>;
        /**
         *
         * @param {Number} phoneNumber
         */
        getAuthorizationCode(phoneNumber: number): Promise<any>;
        /**
         *
         * @param {String} chatId
         * @param {Number} phoneNumber
         */
        getAvatar(chatId: string, phoneNumber: number): Promise<any>;
        /**
         *
         * @param {String} chatId
         */
        archiveChat(chatId: string): Promise<any>;
        /**
        *
        * @param {String} chatId
        */
        unarchiveChat(chatId: string): Promise<any>;
        /**
         *
         * @param {String} chatId
         */
        getContactInfo(chatId: string): Promise<any>;
        getContacts(): Promise<any>;
        getChats(): Promise<any>;
        addChadIdParam(postData: any, chatId: any): void;
        addPhoneParam(postData: any, phoneNumber: any): void;
    }
    declare class SettingsAPI {
        constructor(restAPI: any);
        _restAPI: any;
        getSettings(): Promise<any>;
        /**
         * Change instance account settings. You can specify which settings to update.
         * Instance will be restarted as a result of method.
         *
         * @param {Object} settings - js object that consists of one or more props:
         * countryInstance, webhookUrl, delaySendMessagesMilliseconds, markIncomingMessagesReaded,
         * for example:
         *
         * settings = {
         *   countryInstance: "ru",
         *   delaySendMessagesMilliseconds: 500
         * }
         *
         */
        setSettings(settings: any): Promise<any>;
        getWaSettings(): Promise<any>;
    }
    declare class GroupAPI {
        constructor(restAPI: any);
        _restAPI: any;
        /**
         *
         * @param {String} groupName
         * @param {Array} chatIds
         */
        createGroup(groupName: string, chatIds: any[]): Promise<any>;
        /**
         *
         * @param {String} groupId
         * @param {String} participantChatId
         * @param {Number} participantPhone
         */
        addGroupParticipant(groupId: string, participantChatId: string, participantPhone: number): Promise<any>;
        /**
         *
         * @param {String} groupId
         */
        getGroupData(groupId: string): Promise<any>;
        /**
         *
         * @param {String} groupId
         * @param {String} participantChatId
         * @param {Number} participantPhone
         */
        removeGroupParticipant(groupId: string, participantChatId: string, participantPhone: number): Promise<any>;
        /**
         *
         * @param {String} groupId
         * @param {String} groupName
         */
        updateGroupName(groupId: string, groupName: string): Promise<any>;
        /**
         *
         * @param {String} groupId
         * @param {String} participantChatId
         * @param {Number} participantPhone
         */
        setGroupAdmin(groupId: string, participantChatId: string, participantPhone?: number): Promise<any>;
        /**
         *
         * @param {String} groupId
         * @param {String} participantChatId
         * @param {Number} participantPhone
         */
        removeAdmin(groupId: string, participantChatId: string, participantPhone?: number): Promise<any>;
        /**
         *
         * @param {String} groupId
         */
        leaveGroup(groupId: string): Promise<any>;
        /**
         * @param {String} filePath
         * @param {String} groupId
         */
        setGroupPicture(groupId: string, filePath: string): Promise<any>;
    }
    declare class WebhookServiceAPI {
        constructor(restAPI: any);
        _restAPI: any;
        _jobScheduler: SingleThreadJobScheduler;
        noteTypes: {
            incomingMessageReceived: string;
            outgoingMessageStatus: string;
            stateInstanceChanged: string;
            deviceInfo: string;
        };
        callbackTypes: {
            onReceivingMessageText: string;
            onReceivingMessageImage: string;
            onReceivingMessageVideo: string;
            onReceivingMessageDocument: string;
            onReceivingMessageAudio: string;
            onReceivingOutboundMessageStatus: string;
            onReceivingAccountStatus: string;
            onReceivingDeviceStatus: string;
            onReceivingMessageTextURL: string;
            onReceivingMessageContact: string;
            onReceivingMessageLocation: string;
        };
        _callbacks: Map<any, any>;
        receiveNotification(): Promise<any>;
        /**
         *
         * @param {Number} receiptId
         */
        deleteNotification(receiptId: number): Promise<any>;
        startReceivingNotifications(): Promise<void>;
        stopReceivingNotifications(): Promise<void>;
        onReceivingMessageText(callback: any): void;
        onReceivingMessageImage(callback: any): void;
        onReceivingMessageVideo(callback: any): void;
        onReceivingMessageDocument(callback: any): void;
        onReceivingMessageAudio(callback: any): void;
        onReceivingOutboundMessageStatus(callback: any): void;
        onReceivingAccountStatus(callback: any): void;
        onReceivingDeviceStatus(callback: any): void;
        onReceivingMessageTextURL(callback: any): void;
        onReceivingMessageContact(callback: any): void;
        onReceivingMessageLocation(callback: any): void;
    }
    declare class SingleThreadJobScheduler {
        initJobs(jobs?: any[]): void;
        jobs: any[];
        reschedule(): void;
        unschedule(): void;
    }
    export {};
}
