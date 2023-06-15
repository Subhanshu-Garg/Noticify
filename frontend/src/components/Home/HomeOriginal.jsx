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
  const { organizationsOfAdmin } = useSelector((state) => state.organization);
  const { organizationsOfUser } = useSelector((state) => state.organization);
  const { notices } = useSelector((state => state.notice));

  useEffect(() => {
    dispatch(getOrganizationsOfAdmin());
    dispatch(getOrganizationsOfUser());
  }, [dispatch]);



  const [activeTab, setActiveTab] = useState();

  const handleActiveTab = (value) => {
    if (activeTab === value) {
      return;
    }
    
    setActiveTab(value);
  };
  useEffect(() => {
    dispatch(getNotices(activeTab));
  },[dispatch, activeTab]);

  return (
    <MDBContainer breakpoint="md" className="mt-3 p-2">
      <MDBRow className="g-5">
        <MDBCol lg="9" className="shadow border rounded-6">
          <MDBTabs>
            {organizationsOfAdmin &&
              organizationsOfAdmin.map((organization) => {
                return (
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() =>
                      handleActiveTab(organization._id)
                    }
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
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() =>
                        handleActiveTab(organization._id)
                      }
                      active={activeTab === organization._id}
                    >
                      {organization.organizationName}
                    </MDBTabsLink>
                  </MDBTabsItem>
                );
              })}
          </MDBTabs>

          <MDBTabsContent>
            {organizationsOfAdmin &&
              organizationsOfAdmin.map((organization, index) => {
                return (
                  <MDBTabsPane
                    show={activeTab === organization._id}
                  >
                  <MDBRow className="row-cols-1 row-cols-md-4 g-4 overflow-auto">
                    {
                      notices && 
                      notices.map(notice => {
                        return (
                          <MDBCol>
                            <NoticeCard
                              title={notice.title}
                              content={notice.notice}
                              date={notice.createdAt}
                            />
                          </MDBCol>
                        )
                      })
                    }
                    
                  </MDBRow>
                </MDBTabsPane>
                );
              })}
          </MDBTabsContent>
        </MDBCol>
        <MDBCol lg="3" className="g-5">
          <MDBRow className="mb-3 shadow border rounded-6">
            <CreateNotice organizationId={activeTab} />
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

/*<div>


{notes.map((noteItem, index) => {
    return (
        <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
        />
    )
})
}
</div>*/
