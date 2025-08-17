import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home } from "lucide-react"; // or any icon library

import ArchiveChatroomButton from "./archive-chatroom-button";
import { UpdateDialog } from "./update-chatroom-dialog";
import { RightSidebarProps } from "@/lib/types";

export function RightSidebar({ chatroom, setTriggerReload, navigate }: RightSidebarProps) {

    // loading guard
    if (!chatroom) { return <> . . . </> }

    return (
        <aside className="fixed top-0 right-0 h-screen w-64 flex flex-col border-l bg-background z-50">
            <div className="p-4 ml-3">
                Chat info
                <p className="text-xs">Model : Llama 3.2:3b</p>

            </div>
            <Separator />
            <nav className="flex flex-col gap-1 p-4">
                <Button variant="ghost" className="justify-start w-full" asChild>

                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                        <Home className="h-4 w-4 mr-2" />
                        { chatroom.name }
                    </Button>

                </Button>

                <UpdateDialog chatroom={chatroom} setTriggerReload={setTriggerReload} />

                <ArchiveChatroomButton chatroom={chatroom} setTriggerReload={setTriggerReload} navigate={navigate}/>

            </nav>
        </aside>
    );
}