import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer from "./features/useAuth/userSlice";
import transactionSlice from "./features/usertransaction/userTransactionSlice";
import dataReducer from './features/statsdata/dataSlice';

const reducer = {
  userAuth: userReducer,
  transactions: transactionSlice,
  data: dataReducer,

};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer,
});

export default store;
