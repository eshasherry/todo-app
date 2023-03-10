
//1. create a context
import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

//2.share the created context with other components
export default function AuthProvider({children}){
    const [username, setUsername] = useState(null)
    function login(username, password){
        if(username === 'esha' && password === 'password'){
            setAuthenticated(true)
            setUsername(username)
            return true
        }else{
            setAuthenticated(false)
            return false
        }
    }
    function logout(){
        setAuthenticated(false)
    }
    //3. put some state in auth provider
    const [isAuthenticated, setAuthenticated] = useState(false)

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
}