import React from "react";
import { NavigateFunction } from "react-router-dom";

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface Chatroom {
    id?: number;
    name: string;
    is_archived: string;
   [key: string]: any;
}

export interface Message {
    id?: number;
    content: string;
    chatroom_id?: string;
    [key: string]: any;
}

// type interfaces for controllers

export interface AddChatroomProps {
    setTriggerReload: Setter<boolean>;
    pageType?: string;
    navigate: NavigateFunction;
}

export interface ArchiveChatroomButtonProps {
    chatroom: Chatroom;
    setTriggerReload: Setter<boolean>;
    navigate: NavigateFunction;
}

export interface ArchiveChatroomDialogProps {
    chatroom : Chatroom;
    setTriggerReload: Setter<boolean>;
}

export interface ViewArchivedRoomsSwitchProps {
    isArchived: string;
    setIsArchived: Setter<string>;
    setTriggerReload: Setter<boolean>;
}

export interface ChatInputProps {
    data: Message;
    setData: Setter<Message>;
    aiProcessing: boolean;
    setProcessing: Setter<boolean>;
    setAiProcessing: Setter<boolean>;
    setMessageReload: Setter<boolean>;
    isArchived: boolean;
}

export interface LeftSidebarProps {
    triggerReloadFromParent: boolean;
    setTriggerReload: Setter<boolean>;
    navigate: NavigateFunction
}

export interface DeleteChatroomProps {
    chatroom : Chatroom;
    setTriggerReload: Setter<boolean>
    navigate: NavigateFunction;
}

export interface EmptyChatroomContentProps {
    setTriggerReload: Setter<boolean>;
    navigate: NavigateFunction;
}

export interface LoadingBubbleProps {
    processing: boolean;
    aiProcessing: boolean;
}

export interface MarkdownConverterProps {
    children: string;
}

export interface RightSidebarProps {
    chatroom: Chatroom;
    setTriggerReload: Setter<boolean>;
    navigate: NavigateFunction;
}

export interface SidebarSearchInputProps {
    searchQuery: string;
    setSearchQuery: Setter<string>;
}

export interface UpdateDialogProps {
    chatroom: Chatroom;
    setTriggerReload: Setter<boolean>;
}

export interface AutoScrollProps {
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    messages: Message[];
}

