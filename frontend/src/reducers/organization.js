import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const registerOrganizationReducer = createReducer(initialState, {
    RegisterOragnizationRequest: (state) => {
        state.loading = true;
    },
    RegisterOrganizationSuccess: (state, action) => {
        state.loading = false;
        state.organization = action.payload;
    },
    RegisterOrganaizationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const joinOrganizationReducer = createReducer(initialState,{
    JoinOrganizationRequest: (state) => {
        state.loading = true;
    },
    JoinOrganizationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    JoinOrganizationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});

export const getOrganizationsReducer = createReducer(initialState, {
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
})