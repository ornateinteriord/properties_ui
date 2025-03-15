import { useContext } from "react";
import UserContext from "../../context/user/userContext";
import {  useQuery, } from "@tanstack/react-query";
import TokenService from "../token/TokenService";
import { get } from "../Api";
import { put } from "../Api";
import { toast } from "react-toastify";



export const useGetuserDetails = () => {
    const { getUser, setUser } = useContext(UserContext);
    const userId = TokenService.getuserId()
    return useQuery({
      queryKey: ["userDetails", userId], 
      queryFn: async () => {
        const response = await getUser(userId);
        if (response.success) {
          setUser(response.user);
          return response.user;
        } else {
          throw new Error(response.message );
        }
      },
      enabled: !!userId,
    });
  };

  export const getAllUserDetails = ()=>{
   return useQuery({
       queryKey:["allUsers"],
       queryFn: async() =>{
           const response = await get("/user/alluser-details")
           if(response.success){
             return response.users;
           }else{
               throw new Error(response.message )
           }
       }
   })
  }
  
export const userUpdateDetails = async (data:any)=>{
  try {
    const userId = TokenService.getuserId();
    const response = await put(`/user/update-profile/${userId}`, data);

    if (response.success) {
      toast.success(response.message);
      return response.data;
    } else {
      toast.error(response.message);
    }
  } catch (err: any) {
    const errorMessage = err.response?.data?.message ;
    toast.error(errorMessage);
  }
}