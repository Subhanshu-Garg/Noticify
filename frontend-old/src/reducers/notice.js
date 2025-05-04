import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const noticeReducer = createReducer(initialState, {
    CreateNoticeRequest: (state) => {
        state.loading = true;
    },
    CreateNoticeSuccess: (state, action) => {
        state.loading = false;
        state.notice = action.payload;
        state.notices = [action.payload,...state.notices]
    },
    CreateNoticeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
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
    GetNoticeRequest: (state) => {
        state.loading = true;
    },
    GetNoticeSuccess: (state, action) => {
        state.loading = false;
        state.notice = action.payload;
    },
    GetNoticeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    DeleteNoticeRequest: (state) => {
        state.loading = true;
    },
    DeleteNoticeSuccess: (state, action) => {
        state.loading = false;
        state.notices = state.notices.filter(notice => notice._id !== action.payload._id);
    },
    DeleteNoticeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
});

// export const getNoticesReducer = createReducer({notices: null}, {
//     GetNoticesRequest: (state) => {
//         state.loading = true;
//     },
//     GetNoticesSuccess: (state, action) => {
//         state.loading = false;
//         state.notices = action.payload;
//     },
//     GetNoticesFailure: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.notices = null
//     },
// })
