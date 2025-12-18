import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import AuthApi from "~/api-requests/auth.requests";
import type { LoginInput, UserType } from "~/types/user.types";
const initialState = {
    userInfo: { full_name: "", role: "", candidate_id: "" },
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
export const getInfoUser = createAsyncThunk("user/getInfo", async () => {
    return await AuthApi.getInfo();
});
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // action bth thôi
        setUser: (state, action: PayloadAction<UserType>) => {
            state.userInfo = action.payload;
        },
        clearUser(state) {
            state.userInfo = initialState.userInfo;
        },
    },
    extraReducers: (builder) => {
        // xử lý mấy cái gọi api
        builder.addCase(getInfoUser.fulfilled, (state, action: PayloadAction<UserType>) => {
            state.userInfo = action.payload;
        });
    },
});
const userReducer = userSlice.reducer;
export default userReducer;
