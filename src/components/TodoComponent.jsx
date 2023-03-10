import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../security/AuthContext";
import {addTodo, getTodo, updateTodo} from "../api/TodoServiceApi";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import moment from "moment";

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const navigate = useNavigate()

//refresh only when the id value changes
    useEffect(
        ()=>todo(),
        [id]
    )
    function todo(){
        if(id != -1){
            getTodo(username, id)
                .then((response)=> {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error=>console.log(error))
        }
    }
    function onSubmit(values){
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            completed: false
        }
        if(id == -1){
            addTodo(username)
                .then(navigate("/todos"))
                .catch(error=>console.log(error))
        }
        updateTodo(username, id, todo)
            .then(navigate("/todos"))
            .catch(error=>console.log(error))
    }
    function validate(values){
        let errors = {
        }
        if(values.description.length<4){
            errors.description = 'Enter at least 4 characters'
        }
        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a target date'
        }
        return errors
    }
    return(
        <div>
            <h3>Update your Task</h3>
            <div>
                <Formik initialValues={{description, targetDate}}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}>

                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="description"
                                              component="div"
                                              className="alert alert-warning"/>
                                <ErrorMessage name="targetDate"
                                              component="div"
                                              className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-primary m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}