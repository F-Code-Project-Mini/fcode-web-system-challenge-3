import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import AuthApi from "~/api-requests/auth.requests";
import type { ReduxType } from "~/types/redux.type";
import type { UserType } from "~/types/user.types";
import LocalStorage from "~/utils/localstorage";
const initialState: ReduxType = {
    userInfo: {
        isLogin: false,
        isChecking: false,
        id: "",
        email: "",
        fullName: "",
        role: null,
        candidateId: "",
        createdAt: "",
        updatedAt: "",
        candidate: {
            id: "",
            studentCode: "",
            phone: "",
            major: "",
            semester: "",
            teamId: "",
            createdAt: "",
            updatedAt: "",
        },
    },
    isLoading: false,
};

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await AuthApi.logout();
    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data?.message;
            return thunkAPI.rejectWithValue(message);
        }

        return thunkAPI.rejectWithValue("[F-Code] Vui lòng tạo ticket trên Discord để được hỗ trợ!");
    }
});
export const getInfo = createAsyncThunk("user/getInfo", async () => {
    return await AuthApi.getInfo();
});
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // action bth thôi
        setUser: (state, action: PayloadAction<UserType>) => {
            state.userInfo = {
                ...action.payload,
                isChecking: true,
                isLogin: true,
            };
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        // xử lý mấy cái gọi api bất đồng bộ

        builder.addCase(getInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getInfo.fulfilled, (state, action: PayloadAction<UserType>) => {
            state.userInfo = {
                ...action.payload,
                isLogin: !!action.payload,
                isChecking: true,
            };
            state.isLoading = false;
        });
        builder.addCase(getInfo.rejected, (state) => {
            state.isLoading = false;
            LocalStorage.removeItem("login");
            LocalStorage.removeItem("access_token");
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.userInfo = {
                ...initialState.userInfo,
                isLogin: false,
                isChecking: true,
            };
        });
    },
});
const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
export default userReducer;
