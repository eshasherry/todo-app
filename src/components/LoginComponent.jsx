import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../security/AuthContext";

export default function LoginComponent(){
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()
    function handleOnSubmit(){
        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }
    }
    return(
        <div className="Login">
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