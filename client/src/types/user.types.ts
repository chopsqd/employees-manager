export type UserType = {
    id?: string
    name: string
    email: string
    password: string
}

export type UserWithTokenType = UserType & { token: string }

export type EmployeeType = {
    id: string
    firstName: string
    lastName: string
    age: number
    address: string
    user: string
    userId: string
}