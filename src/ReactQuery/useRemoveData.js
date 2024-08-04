import React from 'react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


function useRemoveData() {
    const {mutate} = useMutation({
        // mutationKey: ['users'],
        mutationFn: async({typePost})=>{
            let url = `https://yousefshopapi.liara.run/api/${typePost}`
            return await axios.delete(url)
        },
        onSuccess : ({success})=> success
    })
    return { mutate }
}

export default useRemoveData;
