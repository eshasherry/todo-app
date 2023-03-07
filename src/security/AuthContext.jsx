
//1. create a context
import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

//2.share the created context with other components
export default function AuthProvider({children}){
    //3. put some state in auth provider
    const [isAuthenticated, setAuthenticated] = useState(false)
    return(
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}