import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody
}
    from 'mdb-react-ui-kit';
import Login from './Login';
import Register from './Register';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginRegister() {
    const [justifyActive, setJustifyActive] = useState(window.location.pathname);;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const [showForm, setShowForm] = useState(true);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        setShowForm(!showForm);

        navigate("/");
    }

    return (
        <MDBModal show={showForm} setShow={setShowForm}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                            <MDBBtn className='btn-close' color='none' onClick={handleButtonClick}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBContainer fluid>
                            <MDBTabs pills justify className='d-flex justify-content-center align-items-center h-100 '>
                                <MDBTabsItem>
                                    <Link to="/login">
                                        <MDBTabsLink onClick={() => handleJustifyClick('/login')} active={justifyActive === '/login'}>
                                            Login
                                        </MDBTabsLink>
                                    </Link>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <Link to="/register">
                                        <MDBTabsLink onClick={() => handleJustifyClick('/register')} active={justifyActive === '/register'}>
                                            Register
                                        </MDBTabsLink>
                                    </Link>
                                </MDBTabsItem>
                            </MDBTabs>
                            <MDBTabsContent>
                                <MDBTabsPane show={justifyActive === '/login'}>
                                    <Login handleJustifyClick={handleJustifyClick} />
                                </MDBTabsPane>
                                <MDBTabsPane show={justifyActive === '/register'}>
                                    <Register />
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </MDBContainer>
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default LoginRegister;