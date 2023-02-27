import './TodoApp.css'
import {useState} from "react";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route path='/welcome' element={<WelcomeComponent/>}></Route>
                    <Route path='*' element={<ErrorComponent/>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

function LoginComponent(){
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    function handleOnSubmit(){
        if(username === 'username' && password === 'password'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate('/welcome')
        }else{
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }
    return(
        <div className="Login">
            {showSuccessMessage && <div>Successful Authentication</div>}
            {showErrorMessage && <div>Authentication Failed. Please try again</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name ="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name ="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleOnSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}
function WelcomeComponent(){
    return(
        <div>
            Welcome to the Application
        </div>
    )
}
function ErrorComponent(){
    return(
        <div>
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404.
            </div>
        </div>
    )
}