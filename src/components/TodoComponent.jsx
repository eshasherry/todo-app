import {useParams} from "react-router-dom";
import {useAuth} from "../security/AuthContext";
import {getTodo} from "../api/TodoServiceApi";
import {useEffect} from "react";

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
//refresh only when the id value changes
    useEffect(
        ()=>todo(),
        [id]
    )
    function todo(){
        getTodo(username, id)
            .then((response)=>console.log(response))
            .catch(error=>console.log(error))
    }
    return(
        <div>
            <h3>Update your Task</h3>
        </div>
    )
}