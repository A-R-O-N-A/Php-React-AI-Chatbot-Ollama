import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "@/components/custom/chat-input";
import { LoadingBubble } from "@/components/custom/loading-bubble";
import { useLoadChatroomMessages, useAutoScroll } from "@/hooks/use-chat-functions";
import ChatMessages from "@/components/custom/chat-messages";
import { useNavigate, useParams } from "react-router-dom";
import { RightSidebar } from "@/components/custom/right-chat-sidebar";
import { LeftSidebar } from "@/components/custom/chat-sidebar";
import { useLoadChatroom } from "@/hooks/use-chat-functions";
import EmptyChatroomContent from "@/components/custom/empy-chatroom-content";
import { Chatroom, Message } from "@/lib/types";

export default function ChatPage() {
  const { chatroom_id } = useParams()
  
  const [data, setData] = useState<Message>({
    chatroom_id: chatroom_id,
    content: '',
    role: 'user'
  })

  const [chatroom, setChatroom] = useState<Chatroom>()
  const [messages, setMessages] = useState<Message[]>([])

  const [processing, setProcessing] = useState(false)
  const [aiProcessing, setAiProcessing] = useState(false)
  
  const [triggerReload, setTriggerReload] = useState(false)
  const [messageReload, setMessageReload] = useState(false)

  // for auto scroll
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const navigate = useNavigate();

  useAutoScroll({ messagesEndRef, messages })

  useLoadChatroom(chatroom_id, setChatroom, triggerReload)
  useLoadChatroomMessages(chatroom_id, setMessages, data, setData, messageReload)

  if (!chatroom_id || !chatroom) {
    return (<>
      <LeftSidebar triggerReloadFromParent={triggerReload}  setTriggerReload={setTriggerReload} navigate={navigate}/>
        <EmptyChatroomContent setTriggerReload={setTriggerReload} navigate={navigate} />
    </>)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] relative">

      <LeftSidebar triggerReloadFromParent={triggerReload}  setTriggerReload={setTriggerReload}  navigate={navigate}/>


      <div className="flex-1 p-4 pb-20 overflow-hidden ">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4 mb-5">

            <ChatMessages messages={messages} />

            <LoadingBubble
              processing={processing}
              aiProcessing={aiProcessing}
            />

          </div>

          <div ref={messagesEndRef} />
        </ScrollArea>
      </div>

      <ChatInput
        data={data}
        setData={setData}
        aiProcessing={aiProcessing}
        setAiProcessing={setAiProcessing}
        setProcessing={setProcessing}
        setMessageReload={setMessageReload}
        isArchived={chatroom.is_archived == 'true'}
      />

      <RightSidebar chatroom={chatroom} setTriggerReload={setTriggerReload} navigate={navigate}/>

    </div>
  );
}