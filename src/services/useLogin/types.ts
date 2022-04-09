export type UseLogin = {
  /**
   * Perform a system login and get a token
   */
  login: (credentials: Credentials) => Promise<string>
}

export type Credentials = {
  login: string
  senha: string
}
