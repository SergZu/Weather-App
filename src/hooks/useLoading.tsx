import React, { useState } from 'react'

interface propsWithOptions {
    [key : string] : object|string
}

type CallbackType = (() => Promise<void>)|((props : propsWithOptions) => void);

type useLoadingHook = [
    Callback : CallbackType,
    isLoading : boolean,
    error : string
]

const useLoading = (callback : CallbackType) : useLoadingHook => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const fetching = async (props?) => {
        setError(null);
        try {
            setLoading(true);
            await callback(props)
        }
        catch(err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        [fetching, isLoading, error]
    )
}

export default useLoading
