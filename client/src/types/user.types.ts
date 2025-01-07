export type UserType = {
  id?: string
  name: string
  email: string
  password: string
}

export type UserWithTokenType = UserType & { token: string }