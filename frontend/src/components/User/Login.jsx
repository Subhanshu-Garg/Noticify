import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    // MDBCheckbox,
    MDBCard,
    MDBCardBody,
    MDBCardImage
}
    from 'mdb-react-ui-kit';


async function loginUser(credentials) {
    return fetch('http://localhost:4000/api/v1/login', {
        method: 'POST'
    });
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async e => {
        const user = await loginUser({
            email,
            password
        });
        console.log(user);
    }
    
    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" fluid />
                        </MDBCol>
                        { !isLoggedIn ?(
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form3' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form4' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                                {/* <div className="d-flex justify-content-between mx-4 mb-4">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                    <a href="!#">Forgot password?</a>
                                </div> */}

                                {/* <div className='mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                                </div> */}

                                <MDBBtn className='mb-4' size='lg' onClick={handleLogin}>Login</MDBBtn>

                            </MDBCol>
                        ) : (
                            <MDBCol>
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">User is logged in</p>
                            </MDBCol>
                        )
                        }
                        
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Login;