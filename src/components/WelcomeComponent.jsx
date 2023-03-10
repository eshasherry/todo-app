import {Link, useParams} from "react-router-dom";

export default function WelcomeComponent(){
    // const params = useParams() or do below
    const {username} = useParams()

    return(
        <div>
            <div>
                Welcome to the Application {username}
            </div>
            <div>
                Manage your Todos <Link to="/todos">here</Link>
            </div>

        </div>
    )
}