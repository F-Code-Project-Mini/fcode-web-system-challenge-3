import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import AuthApi from "~/api-requests/auth.requests";
import type { ReduxType } from "~/types/redux.type";
import type { LoginInput, UserType } from "~/types/user.types";
const initialState: ReduxType = {
    userInfo: {
        isLogin: false,
        isChecking: false,
        id: "",
        email: "",
        fullName: "",
        role: "CANDIDATE",
        candidateId: "",
        createdAt: "",
        updatedAt: "",
    },
    isLoading: false,
};
export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginInput, thunkAPI) => {
    try {
        const response = await AuthApi.login(credentials);
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            const message = error.response?.data?.message;

            return thunkAPI.rejectWithValue(message);
        }

        return thunkAPI.rejectWithValue("[F-Code] Vui lòng tạo ticket trên Discord để được hỗ trợ!");
    }
});
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
export const getInfoUser = createAsyncThunk("user/getInfo", async () => {
    return await AuthApi.getInfo();
});
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // action bth thôi
        setUser: (state, action: PayloadAction<UserType>) => {
            console.log({
                ...action.payload,
                isLogin: true,
            });
            state.userInfo = {
                ...action.payload,
                isChecking: true,
                isLogin: true,
            };
            state.isLoading = true;
        },
    },
    extraReducers: (builder) => {
        // xử lý mấy cái gọi api bất đồng bộ

        builder.addCase(getInfoUser.pending, (state) => {
            state.isLoading = true;
            console.log("vô");
            
        });
        builder.addCase(getInfoUser.fulfilled, (state, action: PayloadAction<UserType>) => {
            console.log({
                ...action.payload,
                isLogin: !!action.payload,
                isChecking: true,
            });

            state.userInfo = {
                ...action.payload,
                isLogin: !!action.payload,
                isChecking: true,
            };
            state.isLoading = false;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserType>) => {
            state.userInfo = {
                ...action.payload,
                isLogin: !!action.payload,
                isChecking: true,
            };
            state.isLoading = false;
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
