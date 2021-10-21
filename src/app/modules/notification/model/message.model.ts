import { Resource } from "src/app/shared/services/http-resource.service";

export class Message extends Resource {
    name: string | undefined;
    messageId: string | undefined;
    messageType: string | undefined;
    messageHeader: string | undefined;
    messageDate: string | undefined;
    messageContent: string | undefined;
    isRead: boolean | undefined;
    isDeleted: boolean | undefined;
    portalHome: string | undefined;
}