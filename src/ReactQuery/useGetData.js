import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchData = async (typeGet) => {
//     const response = await axios.get(`/api/${typeGet}`);
//     return response.data;
// };

const useGetData = (typeGet) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: [typeGet],
    queryFn: async () => {
      let response = await axios.get(`https://yousefshopapi.liara.run/api/${typeGet}`);
      return response.data;
    },
    enabled: typeGet ? true : false
  });
  return { data, isPending, refetch };
};

export default useGetData;
