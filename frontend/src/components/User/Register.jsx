import React from 'react';
import { useState } from 'react';
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user';
// import { useForm } from "react-hook-form";



function Register() {
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and Confirm Password mismatch.");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        else {
            dispatch(registerUser(fname, lname, email, password));
            navigate("/");
        }
    }
    return (
        <>
            <div className="text-center mb-3">
                <p>Sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                    </MDBBtn>
                </div>

                <p className="text-center mt-3">or:</p>
            </div>
            <form onSubmit={handleRegister}>
            <MDBRow>
                <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='First name' type='text' value={fname} onChange={(e) => setFirstName(e.target.value)} required/>
                </MDBCol>

                <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Last name' type='text' value={lname} onChange={e => setLastName(e.target.value)} required/>
                </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' label='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} required/>
            <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
            <MDBInput wrapperClass='mb-4' label='Confirm Password' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>

            <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required/>
            </div>

            <MDBBtn type='submit' className="mb-4 w-100">Register</MDBBtn>
            </form>
        </>
    );
}

export default Register;