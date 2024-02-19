import React, { useState, useEffect } from 'react';
import axios from "axios"

function useAxios() { // start variables below
    // this holds the results of API call
    const [data, setData] = useState(null)
    // This can tell other components that the axios call is still working
    const [loading, setLoading] = useState(false)

    // This holds the URL from the component; gives us control over when the call occurs
    const [url, setUrl] = useState("")

    // This handles an error  states based on the results of an axios call(faildure to get wanted results)
    const[error, setError] = useState(false)
    
    // async is for talking server to server
    async function customFetch(){
        try {
            let payload = await axios.get(url)

            setData(payload.data)
            // axios always add the data property
            setLoading(false)
            setError(null)
        } catch (error) {
            if (error.response.state==404){
                setError("data could not be found")
                setData(null)
                setLoading(false)
            } else {
                setError(error.message)
                setData(null)
                setLoading(false)
            }
        }
    }

    // On the component side, use `setLoading(true)` to trigger this hook
    useEffect(() =>{
        if(loading){
            customFetch()
        }
    }, [loading])
    return [setUrl, data, loading, setLoading, error];
}

export default useAxios;