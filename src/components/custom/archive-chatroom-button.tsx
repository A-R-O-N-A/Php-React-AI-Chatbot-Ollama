import { DeleteChatroomDialog } from "./delete-chatroom-dialog";
import { ArchiveChatroomDialog } from "./archive-chatroom-dialog";
import { ArchiveChatroomButtonProps } from "@/lib/types";


export default function ArchiveChatroomButton({ 
    chatroom, 
    setTriggerReload, 
    navigate 
}: ArchiveChatroomButtonProps) {

    return (<>


        {chatroom.is_archived == 'false'
            ? <>

                <ArchiveChatroomDialog chatroom={chatroom} setTriggerReload={setTriggerReload} />

            </> : <>

                <ArchiveChatroomDialog chatroom={chatroom} setTriggerReload={setTriggerReload} />

                <DeleteChatroomDialog chatroom={chatroom} setTriggerReload={setTriggerReload} navigate={navigate} />

            </>
        }
    </>)
} 