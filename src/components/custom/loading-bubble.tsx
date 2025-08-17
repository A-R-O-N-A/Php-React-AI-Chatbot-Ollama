import { SyncLoader } from "react-spinners";
import { Card, CardContent } from "../ui/card";
import { LoadingBubbleProps } from "@/lib/types";

export function LoadingBubble({ 
    processing, 
    aiProcessing 
} : LoadingBubbleProps) {

    return <>

        {(processing || aiProcessing) && <>

            {/* AI ASSISTANT */}
            <div className="flex justify-start">
                <Card className="bg-muted border-0 max-w-xs p-1">
                    <CardContent className="p-1">

                        <SyncLoader
                            color="#939393"
                            size={4}
                            speedMultiplier={0.7}
                        />

                    </CardContent>
                </Card>
            </div>
        </>}


    </>
}