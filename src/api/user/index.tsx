import { useContext } from "react";
import UserContext from "../../context/user/userContext";
import { useQuery } from "@tanstack/react-query";
import TokenService from "../token/TokenService";
import { get } from "../Api";



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
  