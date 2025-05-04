import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBAccordion,
    MDBAccordionItem,
    MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrganizationsOfAdmin,
    getOrganizationsOfUser,
} from "../../actions/organization";
import CreateNotice from "../Notice/CreateNotice";
import NoticeCard from "../Notice/NoticeCard";
import { getNotices } from "../../actions/notice";
import UserList from "../User/UserList";
import JoinOrganization from "../Organization/JoinOrganization";
import JoinRequests from "../Organization/JoinRequests";
import RegisterOrganization from "../Organization/RegisterOrganization";

function Home() {
    const dispatch = useDispatch();
    const { organizationsOfAdmin } = useSelector((state) => state.organizations);
    const { organizationsOfUser } = useSelector((state) => state.organizations);
    const { notices, loading } = useSelector((state) => state.notices);
    useEffect(() => {
        dispatch(getOrganizationsOfAdmin());
        dispatch(getOrganizationsOfUser());
    },[dispatch]);
    
    const emptyOrganization = {
        _id: null,
        organizationName: "Get Started",

    }
    const [activeOrganization, setActiveOrganization] = useState(emptyOrganization);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        dispatch(getNotices(activeOrganization._id));
    }, [dispatch, activeOrganization]);


    const handleActiveTab = (organization, isAdmin) => {
        if (activeOrganization._id === organization._id) {
            return;
        }
        setIsAdmin(isAdmin);
        setActiveOrganization(organization);
    };


    return (
        <MDBContainer  className="mt-3 p-2">
            <MDBRow className="g-5">
                <MDBCol lg="9" className="shadow border rounded-6">
                        <MDBTabs className="sticky-top bg-light">
                            <div className={`${styles.tabScroller}`}>
                            {organizationsOfAdmin &&
                                organizationsOfAdmin.map((organization) => {
                                    return (
                                        <MDBTabsItem  key={organization._id}>
                                            <MDBTabsLink
                                                onClick={() => handleActiveTab(organization, true)}
                                                active={activeOrganization._id === organization._id}
                                            >
                                                {organization.organizationName}
                                                <MDBIcon fas icon="user-shield" className="ms-2" />
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                    );
                                })}
                            {organizationsOfUser &&
                                organizationsOfUser.map((organization) => {
                                    return (
                                        <MDBTabsItem key={organization._id}>
                                            <MDBTabsLink
                                                onClick={() => handleActiveTab(organization, false)}
                                                active={activeOrganization._id === organization._id}
                                            >
                                                {organization.organizationName}
                                            </MDBTabsLink>
                                        </MDBTabsItem>
                                    );
                                })}
                            </div>
                        </MDBTabs>
                    <div style={{ maxHeight:"548px", margin: "0.5rem", overflowY: "auto", overflowX: "hidden"}} className={`${styles.scrollBar}`}>
                        <MDBTabsContent>
                            {activeOrganization._id &&
                                (loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <MDBTabsPane show={true
                                    }>
                                        <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 m-1">
                                            {notices &&
                                                notices.map((notice) => (
                                                    <MDBCol key={notice._id}>
                                                        <NoticeCard
                                                            noticeID={notice._id}
                                                            organizationID={activeOrganization._id}
                                                            title={notice.title}
                                                            content={notice.notice}
                                                            date={notice.createdAt}
                                                            isAdmin={isAdmin}
                                                        />
                                                    </MDBCol>
                                                ))}
                                        </MDBRow>
                                    </MDBTabsPane>
                                ))}
                        </MDBTabsContent>
                    </div>
                </MDBCol>
                <MDBCol lg="3" className="g-5">
                    <MDBRow className="mb-3 shadow border rounded-6">
                        <fieldset disabled={!isAdmin}>
                            <CreateNotice organizationId={activeOrganization._id} organizationName={activeOrganization.organizationName} />
                        </fieldset>
                    </MDBRow>
                    <MDBRow className="shadow border rounded-6">
                        <MDBAccordion flush>
                            <MDBAccordionItem active collapseId={"members"} headerTitle={`Members of the ${activeOrganization.organizationName}`}>
                                {
                                    activeOrganization._id &&
                                    <div style={{maxHeight: "200px"}} className={styles.scrollBar}>
                                        <UserList admins={activeOrganization.admins} users={activeOrganization.users}/>
                                    </div>
                                }
                            </MDBAccordionItem>
                            <MDBAccordionItem collapseId={"joinOrganization"} headerTitle="Join New Organization">
                                <JoinOrganization />
                                {/* <JoinRegisterOrganization /> */}
                            </MDBAccordionItem>
                            <MDBAccordionItem collapseId={"registerOrganization"} headerTitle="Register New Organization">
                                <RegisterOrganization />
                            </MDBAccordionItem>
                            {
                                isAdmin && 
                                <MDBAccordionItem collapseId={"joinRequests"} headerTitle="Users want to join organization">
                                {
                                    activeOrganization._id &&
                                    <JoinRequests requests={activeOrganization.joinRequests} organizationID={activeOrganization._id}/>
                                }
                            </MDBAccordionItem>
                            }
                            
                        </MDBAccordion>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;