import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./SliceReducer";

export default configureStore({
  reducer: {
    data: SliceReducer,
  },
});
