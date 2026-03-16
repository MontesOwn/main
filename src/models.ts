import { Timestamp } from "firebase/firestore";

export class Message {
    public message: string;
    public messageContainer: string;
    public icon: string;
    constructor(
        message: string,
        messageContainer: string,
        icon: string
    ) {
        this.message = message;
        this.messageContainer = messageContainer;
        this.icon = icon;
    }
}

export interface BookingRequest {
    fullName: string;
    startDate: Timestamp; 
    endDate: Timestamp;
    createdAt: Timestamp;
    status: string;
    email?: string;
    phoneNumber?: string;
    comments?: string;
}

export type BookingWithId = BookingRequest & { id: string };

export interface SelectOption {
    label: string;
    value: any;
}