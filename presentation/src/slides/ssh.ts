import { html } from 'lit-html'
import { Client } from 'ssh2'
import { SshBatch } from './SshBatch'

var filterCommands = (commands: SshCommand[]): SshCommand[] => {
  var done = commands.filter(d => d.done) || []
  var last = commands.find(d => !d.done)
  if (last) done.push(last)
  return done
}

var sshComponent = (batch: SshBatch, settings: Settings, size?: string) => html`
  <div class="ssh-box ssh-box-${size||'small'}">
    ${
      filterCommands(batch.commands).map(
        item =>
          html`
            <div>
              ${
                !item.done && !item.started
                  ? html`
                      <button
                        @click="${() => runCommand(item, settings)}"
                        class="command-button"
                      >
                        <div class="ssh-line">
                          ${
                            splitCommands(item.command).map(
                              line =>
                                html`
                                  <div>${line}</div>
                                `
                            )
                          }
                        </div>
                      </button>
                    `
                  : html`
                      <div class="ssh-line">
                        ${
                          splitCommands(item.command).map(
                            line =>
                              html`
                                <div class="started-command">${line}</div>
                              `
                          )
                        }
                      </div>
                    `
              }
              ${
                item.results
                  ? item.results.map(
                      result => html`
                        <div>${result.split('').map(d=>d===' '?html`&nbsp;`:d)}</div>
                      `
                    )
                  : ''
              }
            </div>
          `
      )
    }
  </div>
`

const splitCommands = (lines: SshCommandLine[]): string[] => {
  var ret: string[] = lines.filter(d => !d.hidden).map(d => d.value)
  ret.forEach(item => {
    var split = item
      .split(/\r?\n/)
      .map(d => d.trim())
      .filter(d => d.length > 0)
    if (split.length > 1) {
      console.log('splitting')
      for (let index = 0; index < split.length; index++) {
        const line = split[index]
        ret.splice(ret.indexOf(item)+index, 0, line)
      }
      ret.splice(ret.indexOf(item),1)
    }
  })
  return ret
}

const runCommand = (command: SshCommand, settings: Settings): void => {
  command.started = true
  document.dispatchEvent(new Event('update'))
  var conn: Client = window
    // @ts-ignore
    .require('electron')
    .remote.require('./main')
    .getSshClient()

  var handleData = (data: any) => {
    if (!command.results) command.results = []
    var result = ('' + data)
      .split(/\r?\n/)
      .filter(d => d.trim().length > 0)

    if (result && result.length > 0) {
      result.forEach(r => {
        command.results.push(r)
      })
      document.dispatchEvent(new Event('update'))
    }
  }

  conn
    .on('ready', function() {
      conn.exec(command.command.map(d => d.value).join('\n'), function(
        err,
        stream
      ) {
        if (err) throw err
        stream
          .on('close', function() {
            command.done = true
            if (!command.results) command.results = []
            command.results.push('---')
            document.dispatchEvent(new Event('update'))
            conn.end()
          })
          .on('data', handleData)
          .stderr.on('data', handleData)
      })
    })
    .connect({
      host: settings.host,
      port: 22,
      username: settings.username,
      privateKey: settings.privateKey
    })
}

export { sshComponent }
