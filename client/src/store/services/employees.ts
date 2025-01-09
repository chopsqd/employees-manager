import { api } from "./api";
import { EmployeeType } from "../../types/user.types";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<EmployeeType[], void>({
      query: () => ({
        url: "/employees",
        method: "GET"
      })
    }),
    getEmployee: builder.query<EmployeeType, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET"
      })
    }),
    addEmployee: builder.mutation<EmployeeType, EmployeeType>({
      query: (employeeData) => ({
        url: "/employees/add",
        method: "POST",
        body: employeeData
      })
    }),
    editEmployee: builder.mutation<string, EmployeeType>({
      query: (employeeData) => ({
        url: `/employees/edit/${employeeData.id}`,
        method: "PUT",
        body: employeeData
      })
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id }
      })
    })
  })
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation
} = employeesApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee
  }
} = employeesApi;