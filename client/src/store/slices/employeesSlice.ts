import { createSlice } from "@reduxjs/toolkit";
import { EmployeeType } from "../../types/user.types";
import { employeesApi } from "../services/employees";
import { RootState } from "../store";

interface InitialState {
  employees: EmployeeType[] | null;
}

const initialState: InitialState = {
  employees: null
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
        state.employees = action.payload;
      });
  }
});

export default employeesSlice.reducer;

export const selectEmployees = (state: RootState) => state.employees.employees;