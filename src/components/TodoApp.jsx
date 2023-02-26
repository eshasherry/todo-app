import './TodoApp.css'
import {useState} from "react";
export default function TodoApp(){
    return(
        <div className="TodoApp">
            To-do Application
            <LoginComponent/>
        </div>
    )
}

function LoginComponent(){
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    function handleOnSubmit(){
        if(username === 'username' && password === 'password'){
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            console.log('Success')
        }else{
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
            console.log('Failure')
        }
    }
    function ShowSuccessMessageComponent(){
        if(showSuccessMessage){
            return <div>Successful Authentication</div>
        }
        else{
            return null
        }
    }
    function ShowErrorMessageComponent(){
        if(showErrorMessage){
            return <div>Authentication Failed. Please try again</div>
        }
        else{
            return null
        }
    }
    return(
        <div className="Login">
            <ShowSuccessMessageComponent/>
            <ShowErrorMessageComponent/>
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