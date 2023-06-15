import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getOrganizationsOfAdmin, getOrganizationsOfUser, registerOrganization } from "../../actions/organization";
import { MDBInput, MDBBtn,MDBCardLink, MDBContainer, MDBTypography, MDBRow, MDBCol } from "mdb-react-ui-kit";

function RegisterOrganization() {
    const [organizationName, setOrganizationName] = useState("");
    const dispatch = useDispatch();
    const handleRegisterOrganization = (e) => {
        e.preventDefault();
        dispatch(registerOrganization(organizationName));
        dispatch(getOrganizationsOfAdmin());
        dispatch(getOrganizationsOfAdmin());
        dispatch(getOrganizationsOfUser());
    }

    return (
        <MDBContainer className="my-2">
            {/* <MDBTypography variant="h4" className="mb-2">Register New Organization</MDBTypography> */}
            {/* <hr className="hr"/> */}
            <MDBRow>
                <MDBTypography>Register your organization, stay informed with important notices!</MDBTypography>
            </MDBRow>
            <MDBRow className="mb-2">
                <MDBCol>
                    <MDBInput label='Organization Name' value={organizationName} onChange={(e) => setOrganizationName(e.target.value)}></MDBInput>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-2">
                <MDBCol>
                    <MDBBtn onClick={handleRegisterOrganization}>Register Organization</MDBBtn>
                </MDBCol>
            </MDBRow>
            <hr className="hr"/>
            <MDBRow>
                <MDBTypography>Not a Member Yet? <MDBCardLink>Login</MDBCardLink></MDBTypography>
            </MDBRow>
        </MDBContainer>
    )
}

export default RegisterOrganization;