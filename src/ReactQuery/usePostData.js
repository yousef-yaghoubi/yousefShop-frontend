import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function usePostData() {
  const { mutate } = useMutation({
    // mutationKey: ['users'],
    mutationFn: async ({ typePost, body }) => {
      let url = `/api/${typePost}`;
      let headers = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let bodyRes = JSON.stringify(body);
      let response = await axios.post(url, bodyRes, headers);
      return response.data;
    },
    onSuccess: ({success}) => success,
  });
  return { mutate };
}

export default usePostData;
