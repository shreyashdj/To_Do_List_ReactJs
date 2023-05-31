import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import './Login.css'

const Login = () => {
    let navigate = useNavigate();
    let startValue = {
        loginId: "",
        password: "",
        error: "",
    }

    const [formValue, setForm] = useState(startValue)

    const login = (event) => {
        if (formValue.loginId === "" || formValue.password === "") {
            alert("All Fileds are Required...!");
            return;
        }
        event.preventDefault();
        let object = {
            loginId: formValue.loginId,
            password: formValue.password,
        };

        UserService.login(object).then((response) => {
            console.log(response);
            if (response.data.msg === "Login Successful") {
                console.log("Login Success....");

                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('First Name', response.data.data.firstName);
                localStorage.setItem('Last Name', response.data.data.lastName);
                localStorage.setItem('UserId', response.data.data.userId);

                setForm({ ...startValue });
                alert("Login Success....");
                navigate("/home");
                window.location.reload();
            } else {
                console.log("Login Id or Password is Wrong....");
                setForm({ ...startValue });
                alert(" Login Failed.... \n Check Login Id & Password....");
            }

        })
    }

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div className="form-content">
                <form className="form">
                    <div className="form-head">
                        User Login Form
                    </div>

                    <div className="row-content">
                        <label htmlFor="name" className="label text">Login Id</label>
                        <input type="text" className="input" id="loginId" name="loginId" value={formValue.loginId}
                            placeholder="Enter Login Id" required onChange={onNameChange} />
                    </div>

                    <div className="row-content">
                        <label htmlFor="name" className="label text">Password</label>
                        <input type="password" className="input" id="password" name="password" value={formValue.password}
                            placeholder="Enter Password" required onChange={onNameChange} />
                    </div>

                    <button variant="contained" size="large" type="submit" className="button submitButton" id="submitButton" onClick={login} >Login</button>
                    <br></br>
                    <div className="text-center">
                        Not Registered Yet ?{" "}
                        <a className="link-primary" href='/register'>
                            Sign Up
                        </a>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default Login;