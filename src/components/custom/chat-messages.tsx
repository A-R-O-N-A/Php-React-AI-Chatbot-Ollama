import ChatBubble from "./chatbubble"
import { Message } from "@/lib/types"

export default function ChatMessages  ({ messages }: { messages: Message[] }) {

    return (
    <>
        {messages.map((message: Message) => {
            return (<>
                <ChatBubble message={message}/>
            </>)
        })}
    </>)
}