import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { ViewArchivedRoomsSwitchProps } from "@/lib/types";

export const ViewArchivedRoomsSwitch = ({ 
    isArchived, 
    setIsArchived, 
    setTriggerReload 
}: ViewArchivedRoomsSwitchProps) => {

    return (<>
        <div className="flex items-center space-x-4 my-1">
            <Switch
                checked={isArchived == 'true'}
                onCheckedChange={() => {
                    setIsArchived((prev: string) => prev === 'true' ? 'false' : 'true')
                    setTriggerReload((prev: boolean) => !prev)
                }}
                id="archived-view"
                className="ml-3"
            />
            <Label htmlFor="archived-view">Archived view</Label>
        </div>
    </>)
}