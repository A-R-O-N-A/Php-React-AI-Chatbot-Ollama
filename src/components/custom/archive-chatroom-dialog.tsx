import { Archive } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { useState } from "react";
import { handleArchiveRoom } from "@/hooks/use-chat-functions";
import { ArchiveChatroomDialogProps } from "@/lib/types";

export function ArchiveChatroomDialog({ 
    chatroom, 
    setTriggerReload 
}: ArchiveChatroomDialogProps) {

    const [open, setOpen] = useState(false);

    const handleConfirm = (setArchiveValue: string) => {
        handleArchiveRoom(chatroom, setArchiveValue, setTriggerReload);
        setOpen(false);
    };

    const isArchived = chatroom.is_archived === 'true';

    return (
        <>
            <Button
                variant="ghost"
                className="justify-start w-full"
                onClick={() => setOpen(true)}
            >
                <Archive className="mr-2" />
                {isArchived ? "Unarchive" : "Archive"}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isArchived ? "Unarchive Chatroom" : "Archive Chatroom"}
                        </DialogTitle>
                        <DialogDescription>
                            {isArchived
                                ? `Do you want to unarchive "${chatroom.name}"? It will become active again.`
                                : `Are you sure you want to archive "${chatroom.name}"? You can unarchive it later.`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>

                        {isArchived
                            ?


                            <Button
                                variant="default"
                                onClick={() => handleConfirm('false')}
                                
                            >
                                "Unarchive" 
                            </Button>
                            :

                            <Button
                                variant="secondary"
                                onClick={() => handleConfirm('true')}
                            >
                                "Archive"
                            </Button>
                        }

                    </DialogFooter>
                </DialogContent >
            </Dialog >
        </>
    );
}