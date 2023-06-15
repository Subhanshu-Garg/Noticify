import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { getOrganizationsReducer, joinOrganizationReducer, registerOrganizationReducer } from "./reducers/organization";
import { createNoticeReducer, getNoticesReducer } from "./reducers/notice";

const store = configureStore({
    reducer: {
        user: userReducer,
        registerOrganization: registerOrganizationReducer,
        joinOrganization: joinOrganizationReducer,
        organizations: getOrganizationsReducer,
        createNotice: createNoticeReducer,
        notices: getNoticesReducer
    }
});

export default store;