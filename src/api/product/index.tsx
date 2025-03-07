import { useMutation } from "@tanstack/react-query"
import { post } from "../Api"
import { toast } from "react-toastify"



export const useCreateProperty = ()=>{
    return useMutation({
        mutationFn:async(data:any)=>{
            return await post("/product/create-property",data)
        },
     onSuccess:(response)=>{
        if(response.success){
            toast.success(response.message)
        }else{
            console.error( response.message)
          }
     },
     onError: (err: any) => {
        const errorMessage =
          err.response.data.message ;
        console.error("Login error:", errorMessage);
        toast.error(errorMessage);
      },
    })
}