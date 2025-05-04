import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import {  sendJoinOrganizationRequestReducer, processJoinOrganizationRequestReducer, organizationReducer } from "./reducers/organization";
import { noticeReducer } from "./reducers/notice";

const store = configureStore({
    reducer: {
        user: userReducer,
        sendJoinOrganizationRequest: sendJoinOrganizationRequestReducer,
        processJoinOrganizationRequest: processJoinOrganizationRequestReducer,
        organizations: organizationReducer,
        notices: noticeReducer,
        // notices: getNoticesReducer,

    }
});

export default store;