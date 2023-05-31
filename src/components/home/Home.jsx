import "./Home.css";
import { useState } from "react";
import deleteIcon from '../../assets/icons/delete.png'
import TaskService from "../../service/TaskService";
import { useEffect } from "react";
import editIcon from '../../assets/icons/edit.png'
import '../user/AllUsers.css'
import { useRef } from "react";

function Home() {
    const ref = useRef(null);
    useEffect(() => {
        if (localStorage.getItem("token") !== "null") {
            TaskService.getAll().then((response) => {
                setForm({ ...formValue, taskList: response.data.data });
                console.log("Tasks : ", response.data.data);
            });
        }
    }, []);

    let startValue = {
        "taskTitle": "",
        "task": "",
        "taskList": [],
        "check": false,
        "updateId": 0
    };
    const [formValue, setForm] = useState(startValue);

    const onChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    };
    const add = () => {
        if (formValue.task === "" || formValue.taskTitle === "") {
            alert("Enter All Details...!");
            return;
        }
        const userInput = {
            "taskTitle": formValue.taskTitle,
            "taskDescription": formValue.task
        };
        if (formValue.check) {
            console.log("Update")
            TaskService.editTask(formValue.updateId, userInput);
            setForm({ ...formValue, check: false });
        } else {
            console.log("Add New")
            TaskService.addTask(userInput);
        }
    };
    let deleteTask = (key) => {
        let ans = window.confirm("  Are You Sure...! \n  Do You Want To Delete Task...?");
        if (ans) {
            TaskService.deleteTask(key);
            window.location.reload();
        }

    }

    let editTask = (id, taskTitle, task) => {
        setForm({ ...formValue, taskTitle: taskTitle, task: task, check: true, updateId: id });
        ref.current.focus();
    }

    let check = (key) => {
        TaskService.updateTask(key);
        window.location.reload()
    }

    return (
        
        <div className="home">
         <form className="form">
                <h4 className="tag">Task Title</h4>
                <input className="input" type="text" id="taskTitle" name="taskTitle" placeholder="Enter Task Title" ref={ref}
                    onChange={onChange} value={formValue.taskTitle} required />
                <h4 className="tag">Task Description</h4>
                <input className="input" type="text" id="task" name="task" placeholder="Enter Task Description"
                    onChange={onChange} value={formValue.task} required />
                <button className="add-button" onClick={add}>{formValue.check ? "UPDATE" : "ADD"}</button>
            </form>
            <div className="list">
                <h3 className="tag">Tasks</h3>

                <table id="table-display" className="table">
                    <tr>
                        <th>Check Box</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Buttons</th>
                    </tr>
                    <tbody>
                        {formValue.taskList.map((item, index) => (
                            <tr key={`${index}`}>
                                <input
                                    defaultChecked={item.done}
                                    className="checkbox"
                                    type="checkbox"
                                    onClick={() => check(item.taskId)}
                                />
                                <td>{item.taskTitle}</td>
                                <td >{item.taskDescription}   </td>
                                <td>{item.done ? "Completed" : "Pending"}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td className="action-buttons">
                                    <button className="delete-button" disabled={item.done}
                                        onClick={() => editTask(item.taskId, item.taskTitle, item.taskDescription)}>
                                        <img height={14} src={editIcon} />
                                    </button>
                                    <button className="delete-button" onClick={() => deleteTask(item.taskId)}>
                                        <img height={14} src={deleteIcon} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
}

export default Home;