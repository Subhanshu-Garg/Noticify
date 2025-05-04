import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const organizationReducer = createReducer(initialState, {
    RegisterOragnizationRequest: (state) => {
        state.loading = true;
    },
    RegisterOrganizationSuccess: (state, action) => {
        state.loading = false;
        state.organizationsOfAdmin.push(action.payload);
    },
    RegisterOrganaizationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    GetAllOrganizationsRequest: (state) => {
        state.loading = true;
    },
    GetAllOrganizationsSuccess: (state, action) => {
        state.loading = false;
        state.organizations = action.payload;
    },
    GetAllOrganizationsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    GetOrganizationsOfAdminRequest: (state, action) => {
        state.loading = true; 
    },
    GetOrganizationsOfAdminSuccess: (state, action) => {
        state.loading = false;
        state.organizationsOfAdmin = action.payload;
    },
    GetOrganizationsOfAdminFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    GetOrganizationsOfUserRequest: (state, action) => {
        state.loading = true; 
    },
    GetOrganizationsOfUserSuccess: (state, action) => {
        state.loading = false;
        state.organizationsOfUser = action.payload;
    },
    GetOrganizationsOfUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }, 
    clearErrors: (state) => {
        state.error = null;
    },
});

export const sendJoinOrganizationRequestReducer = createReducer(initialState,{
    sendJoinOrganizationRequestRequest: (state) => {
        state.loading = true;
    },
    sendJoinOrganizationRequestSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    sendJoinOrganizationRequestFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const processJoinOrganizationRequestReducer = createReducer(initialState,{
    acceptJoinOrganizationRequest: (state) => {
        state.loading = true;
    },
    acceptJoinOrganizationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    acceptJoinOrganizationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    rejectJoinOrganizationRequest: (state) => {
        state.loading = true;
    },
    rejectJoinOrganizationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    rejectJoinOrganizationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null;
    },
});