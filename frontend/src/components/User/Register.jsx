import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
}
    from 'mdb-react-ui-kit';
// import { useForm } from "react-hook-form";



function Register() {
    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                            <form>
                                {/* {error && <span>{error}</span>} */}
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='First Name' id='form1' type='text' className='w-100' /*{...register('firstName')*/ required/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Last Name' id='form2' type='text' className='w-100' /*{...register('lastName')*/ required/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form3' type='email' /*{...register('email')></MDBInput>}*/ required />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form4' type='password' /*{...register('password')}*/ required/>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Confirm Password' id='form5' type='password' /*{...register('confirmPassword')}*/ required/>
                                </div>

                                <MDBBtn className='mb-4' size='lg' type='submit'>{false ? '...' : 'Register'}</MDBBtn>

                            </form>
                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Register;