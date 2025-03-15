import { useMutation,  } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { post } from "../Api";
import TokenService from "../token/TokenService";

export const useSignupMutation = ()=>{
    return useMutation({
        mutationFn: async (data: any) => {
          return await post("/auth/signup", data);
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
export const useLoginMutation = ()=>{
    const navigate =useNavigate();
     return useMutation({
         mutationFn:async(data: { identifier: string; password: string })=>{
            return await post("/auth/login",data)
         },
     onSuccess:(response)=>{
         if(response.success && response.token){
            TokenService.setToken(response.token)
            window.dispatchEvent(new Event("storage"));
            toast.success(response.message)
            const user = TokenService.getuserId()
            const role = TokenService.getRole();
            if(role === 'admin'){
                navigate("/admin/dashboard")
            }else if(role === 'user'){
                navigate("/")
            }
            else{
                console.error("Invalid user:", user);
                localStorage.clear()
                toast.error("Invalid user");
            }
         }else{
            console.error("Login failed:", response.message);
            toast.error(response.message);
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