import { Outlet } from 'react-router'

export function AppLayout() {
    return (

        <div className="min-h-screen flex flex-col w-full ~bg-muted/50">
            <div className="flex flex-1">
                <div className='flex flex-grow flex-col ml-64 mr-64 p-4'>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}