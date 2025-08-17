import { Button } from "../ui/button";
import { handleAddMessage } from "@/hooks/use-chat-functions";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { canSendMessage } from "@/hooks/use-chat-functions";
import { canSendMessageButton } from "@/hooks/use-chat-functions";
import { ChatInputProps } from "@/lib/types";

export default function ChatInput({
    data,
    setData,
    aiProcessing,
    setProcessing,
    setAiProcessing,
    setMessageReload,
    isArchived
}: ChatInputProps) {

    return (<>

        {/* Fixed Input Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-0 bg-background p-4 shadow-0">
            <div className="flex gap-2 items-center">

                <Textarea
                    value={data.content}
                    onChange={(e) => setData({ ...data, content: e.target.value })}

                    onKeyDown={(e) => {
                        if (canSendMessage(e, aiProcessing, data.content)) {
                            e.preventDefault();
                            handleAddMessage(data, setProcessing, setAiProcessing, setMessageReload);
                            setData({ ...data, content: "" });
                        }
                    }}

                    disabled={isArchived || aiProcessing}
                    placeholder={isArchived ? 'This chat has been archived' : 'Type your message . . . '}
                    className="flex-1 resize-none"
                    rows={2}
                />


                {!isArchived &&
                    <Button
                        onClick={() => {

                            handleAddMessage(data, setProcessing, setAiProcessing, setMessageReload)
                            setData({ ...data, content: '' })
                        }}
                        disabled={canSendMessageButton(isArchived, aiProcessing, data)}
                        variant='ghost'
                        size="sm"
                    >
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    </>)
}