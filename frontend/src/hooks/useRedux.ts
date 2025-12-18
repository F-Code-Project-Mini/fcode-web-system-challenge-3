import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// xài dụng cái này thay cho useSelector thì nếu k sẽ import thêm cái type nữa, mệt
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
