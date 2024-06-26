import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "../../interfaces/settings";
import { RootState } from "../store";

const initialState: Settings = {
  alignment: "",
  percentage: 25,
};

// Action Types

const CLEAR_SETTINGS_STORE = "CLEAR_SETTINGS_STORE";
const SET_ALIGNMENT = "SET_ALIGNMENT";
const SET_PERCENTAGE = "SET_PERCENTAGE";

// Action Creators

export const clearSettingsStore = () => ({
  type: CLEAR_SETTINGS_STORE,
});

export const setAlignment = (alignment: string) => ({
  type: SET_ALIGNMENT,
  payload: alignment,
});

export const setPercentage = (value: number) => ({
  type: SET_PERCENTAGE,
  payload: value,
});

// Reducers

const settingSlice = createSlice({
  name: "settingsData",
  initialState,
  reducers: {
    clearSettingsAction: (state) => {
      return initialState;
    },
    setAlignmentAction: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        alignment: action.payload,
      };
    },
    setPercentageAction: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        percentage: action.payload,
      };
    },
  },
});

export const { clearSettingsAction, setAlignmentAction, setPercentageAction } =
  settingSlice.actions;

export default settingSlice.reducer;