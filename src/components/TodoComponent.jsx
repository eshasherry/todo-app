import {useParams} from "react-router-dom";
import {useAuth} from "../security/AuthContext";
import {getTodo} from "../api/TodoServiceApi";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";

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
    function onSubmit(values){
        console.log(values)
    }
    function validate(values){
        let errors = {
        }
        if(values.description.length<4){
            errors.description = 'Enter at least 4 characters'
        }
        if(values.targetDate == null){
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