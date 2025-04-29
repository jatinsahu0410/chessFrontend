import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className="items-center justify-center min-h-screen w-[100%]">
            {children}
        </div>
    )
}

export default layout