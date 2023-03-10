import {useParams} from "react-router-dom";
import {useAuth} from "../security/AuthContext";
import {getTodo} from "../api/TodoServiceApi";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

//refresh only when the id value changes
    useEffect(
        ()=>todo(),
        [id]
    )
    function todo(){
        getTodo(username, id)
            .then((response)=> {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error=>console.log(error))
    }
    return(
        <div>
            <h3>Update your Task</h3>
            <div>
                <Formik initialValues={{description, targetDate}} enableReinitialize={true}>
                    {
                        (props)=>(
                            <Form>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}