import React, { useState } from 'react'

type CallbackType = (() => Promise<void>); 

type useLoadingHook = [
    Callback : CallbackType,
    isLoading : boolean,
    error : string
]

const useLoading = (callback : CallbackType) : useLoadingHook => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setLoading(true);
            await callback()
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
