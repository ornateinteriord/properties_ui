import { useMutation } from "@tanstack/react-query"
import { post } from "../Api"
import { toast } from "react-toastify"
import axios from "axios"



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

export const getCloudinaryUrl = (file :  File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  return useMutation({
    mutationFn : async () => {
      const response = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, data)
      return response.data
    }
  })
}