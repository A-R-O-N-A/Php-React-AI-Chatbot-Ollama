import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Archive } from "lucide-react";
import { useParams } from "react-router-dom";
import { Chatroom } from "@/lib/types";

export default function SidebarRooms({ chatrooms }: { chatrooms: Chatroom[] }) {
    const { chatroom_id } = useParams();

    return (<>

        {chatrooms.map((chatroom: any) => {
            const isSelected = chatroom.chatroom_id == chatroom_id

            return (<>

                <Button variant={isSelected ? 'secondary' : 'ghost'}
                    className="justify-start w-full" asChild
                >
                    <Link to={'/pages/chatroom/' + chatroom.chatroom_id}>
                        {chatroom.is_archived == 'true' && <Archive />}
                        {chatroom.chatroom_name}
                    </Link>
                </Button>
            </>)
        })}

    </>)
}