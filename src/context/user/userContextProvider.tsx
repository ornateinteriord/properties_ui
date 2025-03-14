import { useState } from "react"
import UserContext from "./userContext";
import { get } from "../../api/Api";
import { profile } from "../../types";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<profile | null>()

        const getUser = async (userId: string) => {
           return await get(`/user/user-details/${userId}`) 
         };

         return (
            <UserContext.Provider value={{ user, getUser , setUser}}>
                {children}
            </UserContext.Provider>
        )
    
}

export default UserProvider