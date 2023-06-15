import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn, MDBContainer, MDBTypography, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Select from "react-select";
import { getAllOrganizations, joinOrganization } from "../../actions/organization";

export default function JoinOrganization() {
    const [selectedOrganization, setSelectedOrganization] = useState(null);



    const dispatch = useDispatch();
    const { organizations } = useSelector(state => state.organizations);
    const transformedOrganizations = organizations && organizations.map((org) => {
        return ({
            value: org._id,
            label: org.organizationName
        })
    })

    const handleOrganizationChange = (selectedOption) => {
        setSelectedOrganization(selectedOption);
    };

    const handleSendJoinRequest = (e) => {
        e.preventDefault();
        dispatch(joinOrganization(selectedOrganization.value));
    }

    return (
        <MDBContainer className="my-2">
            {/* <MDBTypography variant="h4">Request to Join Organization</MDBTypography>
            <hr className="hr"/> */}
            <MDBRow>
                <MDBTypography>Connect with Your Desired Community and Stay Updated</MDBTypography>
            </MDBRow>
            <MDBRow className="mb-2">
                <MDBCol onClick={() => dispatch(getAllOrganizations())}>
                    <Select
                        options={transformedOrganizations}
                        value={selectedOrganization}
                        onChange={handleOrganizationChange}
                        placeholder="Select an organization"
                        isSearchable
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <MDBBtn onClick={handleSendJoinRequest}>Send Join Request</MDBBtn>
                </MDBCol>
            </MDBRow>
            <hr className="hr"/>
            <p>Joining Requires Admin's Green Light</p>
        </MDBContainer>

    )
};