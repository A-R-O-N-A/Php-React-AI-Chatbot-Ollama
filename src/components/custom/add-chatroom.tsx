import { MessageSquarePlus, SquarePen } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { handleAddChatroom } from "@/hooks/use-chat-functions";
import { AddChatroomProps } from "@/lib/types";

export default function AddChatRoom({ 
    setTriggerReload, 
    pageType = 'sidebar', 
    navigate 
}: AddChatroomProps) {

    const [data, setData] = useState({
        name: '',
        is_archived: 'false' //defaulyt
    })
    const [processing, setProcessing] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                {pageType == 'sidebar'
                    ?
                    <Button variant="ghost" className="justify-start w-full">
                        <SquarePen className="h-4 w-4 mr-2 " />
                        Add Chat
                    </Button>

                    :

                    <Button className="text-md px-8 py-6 h-auto">
                        <MessageSquarePlus className="h-5 w-5 mr-3" />
                        Start New AI Conversation
                    </Button>
                }



            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Chat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Chat Name</Label>

                        <Input
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter chat name..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={() => handleAddChatroom(data, setData, setProcessing, setTriggerReload, setOpen, navigate)}
                        disabled={processing}
                    >
                        {processing ? 'Processing . . .' : 'Create Chat'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}