import React from 'react'

const CircularLoader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-4 border-t-transparent border-white-200"></div>
        </div>
    )
}

export default CircularLoader