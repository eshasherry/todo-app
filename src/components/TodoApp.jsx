import './TodoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate} from "react-router-dom";

import LogoutComponent from "./LogoutComponent";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ListTodoComponent from "./ListTodoComponent";
import ErrorComponent from "./ErrorComponent";
import HeaderComponent from "./HeaderComponent";
import AuthProvider, {useAuth} from "../security/AuthContext";

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    }
    else{
        return <Navigate to="/" />
    }
}
export default function TodoApp(){
    const [username, setUsername] = useState('username')

    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                              <WelcomeComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodoComponent />
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path='*' element={<ErrorComponent/>}></Route>
                        <Route path='/logout' element={<LogoutComponent/>}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}