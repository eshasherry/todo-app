export default function ListTodoComponent(){
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+2, today.getMonth(), today.getDay());
    const todos = [{id: 1, description: "Learn Spring", isComplete: false, targetDate:targetDate},
        {id: 2, description: "Learn Something", isComplete: false, targetDate:targetDate}]
    return(
        <div className="container">
            <div>
                <h2>List of all your Todos</h2>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Is Complete</td>
                        <td>Target Date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.isComplete.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}