import React, { useEffect } from "react";
import { useState } from "react";
import JoinRegisterOrganization from "../Organization/JoinRegisterOrganization";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrganizationsOfAdmin,
    getOrganizationsOfUser,
} from "../../actions/organization";
import CreateNotice from "../Notice/CreateNotice";
import NoticeCard from "../Notice/NoticeCard";
import { getNotices } from "../../actions/notice";

function Home() {
    const dispatch = useDispatch();
    const { organizationsOfAdmin } = useSelector((state) => state.organizations);
    const { organizationsOfUser } = useSelector((state) => state.organizations);
    const { notices, loading } = useSelector((state) => state.notices);
    
    const [activeTab, setActiveTab] = useState();
    const [activeOrganizationName, setActiveOrganizationName] = useState();
    useEffect(() => {
        dispatch(getOrganizationsOfAdmin());
        dispatch(getOrganizationsOfUser());
    },[dispatch]);

    useEffect(() => {
        dispatch(getNotices(activeTab));
    }, [dispatch, activeTab]);


    const handleActiveTab = (value, organizationName) => {
        if (activeTab === value) {
            return;
        }
        setActiveTab(value);
        setActiveOrganizationName(organizationName);
    };

    useEffect(() => {
        setActiveTab(null);
    }, []);

    return (
        <MDBContainer breakpoint="md" className="mt-3 p-2">
            <MDBRow className="g-5">
                <MDBCol lg="9" className="shadow border rounded-6">
                    <MDBTabs>
                        {organizationsOfAdmin &&
                            organizationsOfAdmin.map((organization) => {
                                return (
                                    <MDBTabsItem key={organization._id}>
                                        <MDBTabsLink
                                            onClick={() => handleActiveTab(organization._id, organization.organizationName)}
                                            active={activeTab === organization._id}
                                        >
                                            {organization.organizationName}
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                );
                            })}
                        {organizationsOfUser &&
                            organizationsOfUser.map((organization) => {
                                return (
                                    <MDBTabsItem key={organization._id}>
                                        <MDBTabsLink
                                            onClick={() => handleActiveTab(organization._id, organization.organizationName)}
                                            active={activeTab === organization._id}
                                        >
                                            {organization.organizationName}
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                );
                            })}
                    </MDBTabs>

                    <MDBTabsContent>
                        {activeTab &&
                            (loading ? (
                                <p>Loading...</p>
                            ) : (
                                <MDBTabsPane show={true
                                }>
                                    <MDBRow className="row-cols-4 g-4 mt-1">
                                        {notices &&
                                            notices.map((notice) => (
                                                <MDBCol key={notice._id}>
                                                    <NoticeCard
                                                        title={notice.title}
                                                        content={notice.notice}
                                                        date={notice.createdAt}
                                                    />
                                                </MDBCol>
                                            ))}
                                    </MDBRow>
                                </MDBTabsPane>
                            ))}
                    </MDBTabsContent>
                </MDBCol>
                <MDBCol lg="3" className="g-5">
                    <MDBRow className="mb-3 shadow border rounded-6">
                        <CreateNotice organizationId={activeTab} organizationName={activeOrganizationName} />
                    </MDBRow>
                    <MDBRow className="shadow border rounded-6">
                        <JoinRegisterOrganization />
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;