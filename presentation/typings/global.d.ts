interface Settings {
  username: string
  host: string
  privateKey: string
}

interface SshBatch {
  items: SshCommand[]
}

interface SshCommand {
  command: string
  result?: string
  auto?: boolean
  done?: boolean
  started?: boolean
}
