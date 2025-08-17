import { Separator } from "@/components/ui/separator";
import AddChatRoom from "./add-chatroom";
import { useState } from "react";
import { useLoadUserChatrooms } from "@/hooks/use-chat-functions";
import SidebarRooms from "./sidebar-item";
import { ViewArchivedRoomsSwitch } from "./archive-room-view-switch";
import SidebarSearchInput from "./sidebar-search";
import { filterChatroomsByQuery } from "@/hooks/use-chat-functions";
import { ModeToggle } from "../mode-toggle";
import { ScrollArea } from "../ui/scroll-area";
import { Chatroom } from "@/lib/types";
import { LeftSidebarProps } from "@/lib/types";

export function LeftSidebar({ 
    triggerReloadFromParent, 
    setTriggerReload, 
    navigate 
}: LeftSidebarProps) {

    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
    const [isArchived, setIsArchived] = useState('false')
    const [searchQuery, setSearchQuery] = useState("")

    useLoadUserChatrooms(setChatrooms, isArchived, triggerReloadFromParent)

    const filteredChatrooms = filterChatroomsByQuery(chatrooms, searchQuery);

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col border-r bg-background z-50">

            <div className="p-4 ml-2">
                <div className="flex items-center gap-2">
                    <img
                        src='/millennium_logo_svg.svg'
                        alt='Millennium AI'
                        className='h-10 dark:filter dark:brightness-0 dark:invert'
                    />
                    <span className='ml-2'>Millennium GPT</span>
                </div>
            </div>

            <nav className="flex flex-col gap-1 p-4 flex-1 min-h-0">

                <ModeToggle />
                <AddChatRoom setTriggerReload={setTriggerReload} pageType={'sidebar'} navigate={navigate} />
                <ViewArchivedRoomsSwitch isArchived={isArchived} setIsArchived={setIsArchived} setTriggerReload={setTriggerReload} />


                <SidebarSearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <Separator />

                <ScrollArea className="w-full flex-1 min-h-0 max-h-[calc(100vh-150px)]">
                    <SidebarRooms chatrooms={filteredChatrooms} />
                </ScrollArea>

            </nav>
        </aside>
    );
}