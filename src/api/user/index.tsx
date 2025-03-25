import { useContext } from "react";
import UserContext from "../../context/user/userContext";
import {  useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import TokenService from "../token/TokenService";
import { get, post } from "../Api";
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

  export const useUpdateUser = (userid ?: any) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (data: any) => {
        return await put(`/user/update-profile/${userid}`, data);
      },
      onSuccess: (data) => {
        if(data.success){
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["allUsers"] });
        queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        }else{
          toast.error(data.message);
        }
      },
      onError: (error : any) => {
        toast.error(error?.response?.data?.message);
      },
    })
  }

  export const useContact = ()=>{
      return useMutation({
          mutationFn: async (data: any) => {
            return await post("/user/contact", data);
          },
          onSuccess: (response) => {
            if (response.success) {
              toast.success(response.message);
            } else {
              console.error(response.message);
            }
          },
          onError: (error: any) => {
            toast.error(error.response.data.message);
          },
        });
  }