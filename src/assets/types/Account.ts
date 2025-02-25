export type AccountType = {
  code: string,
  name: string,
}
export type InvalidType = {
  login: boolean,
  password: boolean,
}

export interface Account {
  id: string
  tags: { text: string }[]
  type: AccountType
  login: string
  password: string | null
  invalid: InvalidType
}
