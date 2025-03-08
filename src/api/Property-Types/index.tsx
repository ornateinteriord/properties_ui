import { useQuery } from "@tanstack/react-query"
import { get } from "../Api"

export const useGetPropertyTypes = () => {
    return useQuery({
        queryKey : ["property-types"],
        queryFn : async () => {
            const response = await get('/property-type/getall')
            if (response.success) {
                return response.data;
              } else {
                throw new Error(response.message );
              }
        }
    })
  }