import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Header() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <MDBNavbar className='header' expand='md'>
            <MDBContainer fluid>
                <MDBNavbarBrand className='logo' href='/'>Noticify</MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <form className='d-flex input-group w-auto'>
                                <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                                <MDBBtn><MDBIcon fas icon="search" /></MDBBtn>
                            </form>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link' role="button">
                                    <MDBIcon size='lg' fas icon="user-circle" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link href='/login'>Login</MDBDropdownItem>
                                    <MDBDropdownItem link href='/register'>Register</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}