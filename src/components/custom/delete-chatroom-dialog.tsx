import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";
import { deleteChatroom } from "@/hooks/use-chat-functions";
import { DeleteChatroomProps } from "@/lib/types";

export function DeleteChatroomDialog({ 
    chatroom, 
    setTriggerReload , 
    navigate
}: DeleteChatroomProps) {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const confirmDelete = () => {
        deleteChatroom(String(chatroom.id) ,setDeleteDialogOpen ,setTriggerReload, navigate)
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                className="justify-start w-full text-destructive hover:text-destructive "
                onClick={() => setDeleteDialogOpen(true)}
            >
                <Trash2 className="h-4 w-4 mr-3" />
                Delete Forever
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Chatroom Forever</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to permanently delete {chatroom.name}? 
                            This action cannot be undone and all messages will be lost forever.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={confirmDelete}
                        >
                            Delete Forever
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}