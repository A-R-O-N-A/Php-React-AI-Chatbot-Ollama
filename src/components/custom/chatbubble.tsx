import { Card } from "../ui/card";
import MarkdownConverter from "./markdown-converter";
import { Message } from "@/lib/types";

export default function ChatBubble({ message }: { message: Message }) {
    return (<>

        {message.message_role == 'user'

            // USER
            ?
            <>
                <div className="flex justify-end">
                    <Card className="max-w-xl p-3 bg-primary text-primary-foreground">
                        <MarkdownConverter>
                            {message.message_content}
                        </MarkdownConverter>
                    </Card>
                </div>

            </>

            // AI ASSISTANT
            :
            <>
                <div className="flex justify-start">
                    <Card className="max-w-xl p-3 bg-muted border-0">
                        <MarkdownConverter>
                            {message.message_content}
                        </MarkdownConverter>
                    </Card>
                </div>
            </>
        }

    </>)
}