import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const createNoticeReducer = createReducer(initialState, {
    CreateNoticeRequest: (state) => {
        state.loading = true;
    },
    CreateNoticeSuccess: (state, action) => {
        state.loading = false;
        state.notice = action.payload;
    },
    CreateNoticeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
});

export const getNoticesReducer = createReducer({notices: null}, {
    GetNoticesRequest: (state) => {
        state.loading = true;
    },
    GetNoticesSuccess: (state, action) => {
        state.loading = false;
        state.notices = action.payload;
    },
    GetNoticesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.notices = null
    },
})
