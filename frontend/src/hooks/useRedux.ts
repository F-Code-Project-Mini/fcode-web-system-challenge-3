import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// Sử dụng cái này thay cho useSelector thông thường
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
