import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function UserList({ admins, users }) {
    return (
        <MDBListGroup>
            {admins &&
                admins.map((admin) => (
                    <MDBRipple key={admin._id}>
                        <MDBListGroupItem
                            tag="button"
                            style={{ border: 'none' }}
                            className="d-flex align-items-center justify-content-between"
                        >
                            <MDBRow className="align-items-center">
                                <MDBCol size="auto">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                                        className="rounded-circle me-2"
                                        height="40"
                                        loading="lazy"
                                        alt="Avatar"
                                    />
                                </MDBCol>
                                <MDBCol>{`${admin.fname} ${admin.lname} (admin)`}</MDBCol>
                            </MDBRow>
                        </MDBListGroupItem>
                    </MDBRipple>
                ))}
                {users &&
                users.map((user) => (
                    <MDBRipple key={user._id}>
                        <MDBListGroupItem
                            tag="button"
                            style={{ border: 'none' }}
                            className="d-flex align-items-center justify-content-between"
                        >
                            <MDBRow className="align-items-center">
                                <MDBCol size="auto">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img(31).webp"
                                        className="rounded-circle me-2"
                                        height="40"
                                        loading="lazy"
                                        alt="Avatar"
                                    />
                                </MDBCol>
                                <MDBCol>{`${user.fname} ${user.lname}`}</MDBCol>
                            </MDBRow>
                        </MDBListGroupItem>
                    </MDBRipple>
                ))}
        </MDBListGroup>
    );
}

export default UserList;
