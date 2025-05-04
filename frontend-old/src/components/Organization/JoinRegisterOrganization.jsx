import React, { useState } from "react";
import { MDBContainer, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';
import RegisterOrganization from '../Organization/RegisterOrganization';
import JoinOrganization from '../Organization/JoinOrganization';

function JoinRegisterOrganization() {
    const [activeTab, setActiveTab] = useState("Join Organization");

    const handleActiveTab = (value) => {
        if(activeTab === value) {
            return;
        }
        setActiveTab(value);
    }
    return (
        <MDBContainer fluid className="my-2">
            <MDBTabs justify className="nav-justified">
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleActiveTab("Join Organization")} active={activeTab === "Join Organization"}>
                        Join Org
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleActiveTab("Register Organization")} active={activeTab === "Register Organization"}>
                        Register Org
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
                <MDBTabsPane show={activeTab === "Register Organization"}>
                    <RegisterOrganization />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === "Join Organization"}>
                    <JoinOrganization />
                </MDBTabsPane>
            </MDBTabsContent>
        </MDBContainer>
    );
}

export default JoinRegisterOrganization;