import { html } from 'lit-html'
import { Client } from 'ssh2'

var filterCommands = (commands: SshCommand[]): SshCommand[] => {
  var done = commands.filter(d => d.done) || []
  var last = commands.find(d => !d.done)
  if (last) done.push(last)
  return done
}

var sshComponent = (batch: SshBatch) => html`
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
                        @click="${() => runCommand(item)}"
                        class="command-button"
                      >
                        ${item.command}
                      </button>
                    `
                  : html`
                      <span>${item.command}</span>
                    `
              }
            </div>
          `
      )
    }
  </div>
`

const runCommand = (command: SshCommand): void => {
  command.started = true
  document.dispatchEvent(new Event('update'))
}

var client: Client = window
  // @ts-ignore
  .require('electron')
  .remote.require('./main')
  .getSshClient()

export { sshComponent }
