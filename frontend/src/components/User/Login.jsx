import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user"
import {
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
    MDBCardLink,
    MDBCardText
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
    
function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();

        dispatch(loginUser(email, password));
        setEmail("");
        setPassword("");
        navigate("/");
    }

    return (
        <>
            <div className="text-center mb-3">
                <p>Sign in with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{ width: '50%' }}>
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
            <form onSubmit={handleLogin}>
                <MDBInput wrapperClass='mb-4' label='Email address' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <Link to="/users/forgotpassword">Forgot password</Link>
                </div>

                <MDBBtn className="mb-4 w-100" type="submit">Login</MDBBtn>
                <MDBCardText className="text-center">Not a member? <MDBCardLink role='button' onClick={()=>{props.handleJustifyClick("/register")}}><Link to="/register">Register</Link></MDBCardLink></MDBCardText>
            </form>
        </>
)}

export default Login;