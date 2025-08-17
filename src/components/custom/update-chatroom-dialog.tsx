import { useEffect, useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { updateChatroomName } from "@/hooks/use-chat-functions";
import { UpdateDialogProps } from "@/lib/types";

export function UpdateDialog({ 
    chatroom, 
    setTriggerReload 
}: UpdateDialogProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        name: chatroom.name,
    })

    // keep chatroom name updated across changes
    useEffect(() => {
        if (chatroom) {
            setData({ name: chatroom.name });
        }
    }, [chatroom.id]);

    // loading guard
    if (!chatroom) { <></> }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start text-sm ">
                    <Edit3 className="h-4 w-4 mr-3" />
                    Update Name
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Chat Name</DialogTitle>
                    <DialogDescription>
                        Change the name of this chatroom. This will help you identify it better in your chat list.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="col-span-3"
                            placeholder="Enter chatroom name"
                            maxLength={100}
                            autoFocus
                        />
                    </div>


                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        onClick={() => {
                            updateChatroomName(chatroom.id, data.name, setTriggerReload)
                            setIsOpen(false)
                        }}
                    >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Update name
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}