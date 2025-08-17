import ollama from 'ollama'
import axios from 'axios'
import { useEffect } from 'react'
import { baseUrl } from '@/constants'
import { AutoScrollProps, Chatroom, Message } from '@/lib/types'
import { NavigateFunction } from 'react-router-dom'
import { Setter } from '@/lib/types'

export const handleAddChatroom = (
    data: Chatroom, 
    setData: Setter<Chatroom>, 
    setProcessing: Setter<boolean>, 
    setTriggerReload: Setter<boolean>, 
    setOpen: Setter<boolean>, 
    navigate: NavigateFunction
) => {
    setProcessing(true)
    const formData = new FormData()

    formData.append('add_chatroom', 'true')

    formData.append('name', data.name)
    formData.append('is_archived', data.is_archived)

    axios.post(baseUrl + '/db/request.php', formData)
        .then((res) => {
            // clear out form
            setData({
                ...data,
                name: ''
            })

            setOpen(false)
            setTriggerReload((prev: boolean) => !prev) // toggle the reload state                   

            navigate(`/pages/chatroom/${res.data.id}`)
        })
        .catch((error) => {
            // do error handling here
            console.log('Error adding chatroom : ', error)
        })
        .finally(() => {
            setProcessing(false)
        })
}


// CHECL THIS LATER
export const handleArchiveRoom = (
    chatroom: Chatroom, 
    is_archived: string, 
    setTriggerReload: Setter<boolean>
) => {

    const formData = new FormData()
    formData.append('archive_room', 'true')
    formData.append('is_archived', is_archived)
    formData.append('room_id', String(chatroom.id))

    axios.post(baseUrl + '/db/request.php', formData)
        .then(() => {
            setTriggerReload((prev: boolean) => !prev)
        })
        .catch((error) => {
            console.log('Error archiving/unarchiving chatroom : ', error)
        })
}

export const handleAddMessage = (
    data: Message, 
    setProcessing: Setter<boolean>, 
    setAiProcessing: Setter<boolean>,  
    setMessageReload: Setter<boolean> 
) => {

    setProcessing(true)

    const formData = new FormData()
    formData.append('add_message', 'true')
    formData.append('chatroom_id', String(data.chatroom_id))
    formData.append('content', data.content)
    formData.append('role', 'user')

    axios.post(baseUrl + '/db/request.php', formData)
        .then(() => {
            setMessageReload((prev: boolean) => !prev)
        })
        .then(() => {
            handleAiChat_v2(data.chatroom_id, setAiProcessing,  setMessageReload)
        })
        .catch((error) => {
            console.log('Error adding message : ', error)
        })
        .finally(() => {
            setProcessing(false)
        })
}

export const handleAiChat_v2 = async (
    chatroom_id: string | undefined,
    setAiProcessing: Setter<boolean>,
    setMessageReload: Setter<boolean>
) => {

    setAiProcessing(true)
    let response;

    try {
        // Await the full message history (already includes latest user message)
        const history = await loadChatroomMessages(chatroom_id);

        // Pass the history directly to ollama.chat
        response = await ollama.chat({
            model: 'llama3.2:3b',
            messages: history,
        });

        // Save the AI response as a message
        const formData = new FormData();
        formData.append('add_message', 'true');
        formData.append('chatroom_id', String(chatroom_id));
        formData.append('role', 'assistant');
        formData.append('content', response.message.content);

        axios.post(baseUrl + '/db/request.php', formData)
            .then(() => {
                setMessageReload((prev: boolean) => !prev)
            })
            .catch((error) => {
                console.log('Error adding AI message : ', error)
            });

    } catch (error) {
        console.error('Error in AI chat:', error)
        throw error
    } finally {
        setAiProcessing(false)
    }
}



export const loadChatroomMessages = (chatroom_id: string | undefined) => {

    const formData = new FormData()
    formData.append('get_room_messages', 'true')
    formData.append('room_id', String(chatroom_id))

    return axios.post(baseUrl + '/db/request.php', formData)
        .then((res) => {
            // Map to ensure correct keys and structure
            return res.data.map((msg: any) => ({
                role: msg.role || msg.message_role,
                content: msg.content || msg.message_content
            }));
        });
}

export const updateChatroomName = (chatroom_id: any, updatedName: string, setTriggerReload: any) => {

    const formData = new FormData()
    formData.append('update_chatroom_name', 'true')
    formData.append('chatroom_id', chatroom_id)
    formData.append('updated_name', updatedName)

    axios.post(baseUrl + '/db/request.php', formData)
        .then(() => {
            setTriggerReload((prev: any) => !prev)
        })
        .catch(() => {
            console.log('Error updated the room name')
            console.log('Data passed : ', {
                chatroom_id,
                updatedName,
            })
        })
}

export const deleteChatroom = (
    chatroom_id: string | number, 
    setDeleteDialogOpen: Setter<boolean>, 
    setTriggerReload: Setter<boolean>, 
    navigate: NavigateFunction
) => {

    const formData = new FormData()
    formData.append('delete_entry', 'true')
    formData.append('table_name', 'chatroom')
    formData.append('table_id', String(chatroom_id))

    axios.post(baseUrl + '/db/request.php', formData)
        .then(() => {
            setDeleteDialogOpen(false) // Close the dialog
            setTriggerReload((prev: boolean) => !prev)
        })
        .catch((error) => {
            console.log('Error deleting chatroom : ', error)
        })
        .finally(() => {
            navigate('/pages/chatroom/')
        })
}

export const useLoadChatroom = (
    chatroom_id: string | undefined, 
    setChatroom: Setter<Chatroom | undefined>, 
    triggerReload: boolean
) => {

    useEffect(() => {
        const formData = new FormData()
        formData.append('get_room', 'true')
        formData.append('room_id', String(chatroom_id))

        axios.post(baseUrl + '/db/request.php', formData)
            .then((res) => {
                setChatroom(res.data)

            })
            .catch((error) => {
                console.log('ERROR fetching chatroom : ', error)
            })
    }, [chatroom_id, triggerReload])
}

export const useLoadUserChatrooms = ( 
    setChatrooms: Setter<Chatroom[]>, 
    isArchived: string = 'false',  
    triggerReloadFromParent: boolean
) => {

    useEffect(() => {
        const formData = new FormData()

        formData.append('get_rooms', 'true')
        formData.append('is_archived', isArchived)

        axios.post(baseUrl + '/db/request.php', formData)
            .then((res) => {
                setChatrooms(res.data)
            })
            .catch((error) => {
                console.log('ERROR fetching rooms : ', error)
            })

    }, [ isArchived, triggerReloadFromParent])
}
export const useLoadChatroomMessages = (
    chatroom_id: string | undefined, 
    setMessages: Setter<Message[]>, 
    data: Message, 
    setData: Setter<Message>,  
    messageReload: boolean
) => {

    useEffect(() => {
        const formData = new FormData()
        formData.append('get_room_messages', 'true')
        formData.append('room_id', String(chatroom_id))


        axios.post(baseUrl + '/db/request.php', formData)
            .then((res) => {
                setMessages(res.data)
                setData({ ...data, chatroom_id: chatroom_id })
            })
            .catch((error) => {
                console.log('ERROR fetching messages : ', error)
            })
    }, [chatroom_id, messageReload])
}

export const useAutoScroll = ({ messagesEndRef, messages }: AutoScrollProps) => {
    // auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
}

export function filterChatroomsByQuery(chatrooms: Chatroom[], searchQuery: string) {
    return chatrooms.filter(
        (chatroom: Chatroom) =>
            chatroom.chatroom_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );
}

export function canSendMessage(
    e: React.KeyboardEvent, 
    aiProcessing: boolean, 
    content: string
): boolean {

    return e.key === "Enter" && !e.shiftKey && !aiProcessing && !!content.trim();
}

export function canSendMessageButton(
    isArchived: boolean,
    aiProcessing: boolean,
    data: Message
) {
    return !isArchived || !aiProcessing || !!data.content.trim();
}