 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import './RegisterForm.css';

const RegistrationForm = () => {
    let navigate = useNavigate();
    let startValue = {
        firstName: "",
        lastName: "",
        loginId: "",
        password: "",
        isUpdate: false
    }

    const [formValue, setForm] = useState(startValue);

    const firstNameCheck = (event) => {
        nameCheck(event, "firstNameError");
    }

    const lastNameCheck = (event) => {
        nameCheck(event, "lastNameError");
    }

    const nameCheck = (event, nameError) => {
        const setName = event.target.name;
        const setValue = event.target.value;

        const regexForOnlyChar = RegExp("^[a-zA-Z]*$");
        const regexForFirstChar = RegExp("^[A-Z]{1}[a-z]*$");
        const regexForMinChar = RegExp("^[A-Z]{1}[a-z]{2,}$");

        if (!(regexForOnlyChar.test(setValue))) {
            setForm({ ...formValue, [setName]: setValue, [nameError]: "Only char allowed" });
        } else if (!(regexForFirstChar.test(setValue))) {
            setForm({ ...formValue, [setName]: setValue, [nameError]: "First char should be upper case" });
        } else if (!(regexForMinChar.test(setValue))) {
            setForm({ ...formValue, [setName]: setValue, [nameError]: "Min 3 char reqired" });
        } else {
            setForm({ ...formValue, [setName]: setValue, [nameError]: "" });
        }
    }

    const save = async (event) => {

        event.preventDefault();

        let object = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            loginId: formValue.loginId,
            password: formValue.password,
        };

        console.log(object);

        if (formValue.firstName === "" || formValue.lastName === "" || formValue.loginId === "" || formValue.password === "") {
            alert("All Fileds Are Mandatory...!");
            return;
        }

        UserService.addUser(object).then((response) => {
            console.log(response);
            alert("Regisraion Success....");
            navigate("/login");
        })

    }
    const onChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div className="form-content">
                <form className="form">
                    <div className="form-head">
                        User Registration Form
                    </div>

                    <label className="label text" htmlFor="firstName">First Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="firstName" name="firstName" placeholder="Enter First Name"
                            onChange={firstNameCheck} value={formValue.firstName} required />
                        <error-output className="firstName-error" htmlFor="firstName">{formValue.firstNameError}</error-output>
                    </div>

                    <label className="label text" htmlFor="lastName">Last Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="lastName" name="lastName" placeholder="Enter Last Name"
                            onChange={lastNameCheck} value={formValue.lastName} required />
                        <error-output className="lastName-error" htmlFor="lastName">{formValue.lastNameError}</error-output>
                    </div>

                    <div className="row-content">
                        <label htmlFor="name" className="label text">Login Id</label>
                        <input type="text" className="input" id="loginId" name="loginId" value={formValue.loginId}
                            placeholder="Enter Login Id" required onChange={onChange} />
                    </div>

                    <div className="row-content">
                        <label htmlFor="name" className="label text">Password</label>
                        <input type="password" className="input" id="password" name="password" value={formValue.password}
                            placeholder="Enter Password" required onChange={onChange} />
                    </div>

                    <button variant="contained" size="large" type="submit" className="button submitButton" id="submitButton" onClick={save} >Sign Up</button>

                    <div className="text-center">
                        Already Registered ?{" "}
                        <a className="link-primary" href='/login'>
                            Login
                        </a>
                    </div>

                </form>
            </div >
        </div >
    )
}

export default RegistrationForm;