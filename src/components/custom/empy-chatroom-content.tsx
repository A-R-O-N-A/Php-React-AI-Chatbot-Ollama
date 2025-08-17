import { Card, CardContent } from "../ui/card";
import AddChatRoom from "./add-chatroom";
import { EmptyChatroomContentProps } from "@/lib/types";


export default function EmptyChatroomContent({ 
    setTriggerReload, 
    navigate 
}: EmptyChatroomContentProps) {

    return (
        <div className="ml-60 flex h-full items-center justify-center p-8">
            <Card className="w-full max-w-2xl">
                <CardContent className="p-12 text-center space-y-8">

                    {/* Hero Icon */}
                    <div className="flex justify-center">


                        <img
                            src='/millennium_logo_svg.svg'
                            alt='Millennium AI'
                            className='h-10 dark:filter dark:brightness-0 dark:invert'
                        />

                    </div>

                    {/* Hero Text */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight">
                                Millennium GPT
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                                Your intelligent conversation partner. Start chatting to get help with anything you need.
                            </p>
                            <small>powered by Llama 3.2</small>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <AddChatRoom setTriggerReload={setTriggerReload} pageType={'main'} navigate={navigate} />
                    </div>

                </CardContent>
            </Card>
        </div>)
}