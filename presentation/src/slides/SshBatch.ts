export class SshBatch {
  public info: string
  public commands: SshCommand[]

  constructor(info: string, commands: (info: string) => SshCommand[]) {
    this.info = info
    this.commands = commands(info)
  }
}
