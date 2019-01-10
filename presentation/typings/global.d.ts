interface Settings {
  username: string
  host: string
  privateKey: string
}

interface SshCommand {
  command: SshCommandLine[]
  results?: string[]
  done?: boolean
  started?: boolean,
}

interface SshCommandLine{
  value: string,
  hidden?: boolean
}
