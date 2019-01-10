export class SshBatch {
  public files: {[index:string]: string}
  public commands: SshCommand[]

  constructor(files: {[index:string]: string}, commands: (files: {[index:string]: string}) => SshCommand[]) {
    this.files = files
    this.commands = commands(files)
  }
}
