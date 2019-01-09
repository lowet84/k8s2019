import { html } from 'lit-html'
import { Client } from 'ssh2'

var filterCommands = (commands: SshCommand[]): SshCommand[] => {
  var done = commands.filter(d => d.done) || []
  var last = commands.find(d => !d.done)
  if (last) done.push(last)
  return done
}

var sshComponent = (batch: SshBatch, settings: Settings) => html`
  <div class="ssh-box">
    ${
      filterCommands(batch.items).map(
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
                            item.command
                              .split(/\r?\n/)
                              .filter(d => d.length > 0)
                              .map(
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
                          item.command
                            .split(/\r?\n/)
                            .filter(d => d.length > 0)
                            .map(
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
                        <div>${result}</div>
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
    var result = '' + data
    command.results.push(result)
    document.dispatchEvent(new Event('update'))
  }

  conn
    .on('ready', function() {
      conn.exec(command.command, function(err, stream) {
        if (err) throw err
        stream
          .on('close', function() {
            command.done = true
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
