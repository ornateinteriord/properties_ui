import { useMutation, useQuery } from "@tanstack/react-query"
import { get, post } from "../Api"
import { toast } from "react-toastify"
import axios from "axios"

export const getAllProperties =()=>{
  return useQuery({
    queryKey:["allProperties"],
    queryFn: async() =>{
        const response = await get("/product/getall")
        if(response.success){
          return response.properties;
        }else{
            throw new Error(response.message )
        }
    }
})
}

// export const getAllProperties2 = async ()=>{
//  try {
//   const response = await get("/product/getall")
//   if(response.success){
//     return response.properties
//   }else {
//     console.error( response.data?.message);
//     return [];
//   }
//  } catch (error) {
//   console.log(error)
//  }
// }

export const useCreateProperty = ()=>{
    return useMutation({
        mutationFn:async(data:any)=>{
            return await post("/product/create-property",data)
        },
     onSuccess:(response)=>{
        if(response.success){
            toast.success(response.message)
            console.log(response.message)
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

export const getCloudinaryUrl = () => {
 
  return useMutation({
    
    mutationFn : async (file :File) => {
       const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      const response = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, data)
      return response.data
    }
  })
}