import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalDialog,
    MDBModalContent,
} from 'mdb-react-ui-kit';
import LoginRegister from '../../User/LoginRegister';
import { logoutUser } from '../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Header() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    }

    return (
        <MDBNavbar fluid style={{backgroundColor: "#f5ba13"}} expand="md" >
            <MDBContainer fluid>
                <MDBNavbarBrand className="logo" href='/'>Noticify</MDBNavbarBrand>
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    {/* <MDBNavbarItem className='invisible'>
                            <form className='d-flex input-group w-auto'>
                                <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                                <MDBBtn><MDBIcon fas icon="search" /></MDBBtn>
                            </form>
                    </MDBNavbarItem> */}
                    <MDBNavbarItem className='ms-3'>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login">
                                    <MDBBtn>Login</MDBBtn>
                                </Link>
                            </>
                        ) : (
                            <MDBDropdown>
                                <MDBDropdownToggle role="button" floating tag='a'>
                                    <MDBIcon color="light" fas icon="user-alt" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='/users/me'>My Profile</MDBDropdownItem>
                                    <MDBDropdownItem link>Settings</MDBDropdownItem>
                                    <MDBDropdownItem divider />
                                    <MDBDropdownItem link onClick={handleLogout}>Logout<MDBIcon fas icon="sign-out-alt" /></MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        )}
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
    );
}