import { Client } from 'ssh2'

var reset = () => {
  const electronSettings = window
    // @ts-ignore
    .require('electron')
    .remote.require('electron-settings')

  var settings: Settings = JSON.parse(electronSettings.get('settings'))
  runCommand('docker rm -f docker-demo', settings)
  runCommand('docker rmi -f docker-demo', settings)
  runCommand('kubectl delete ing/demo-ingress', settings)
  runCommand('kubectl delete svc/demo-service', settings)
  runCommand('kubectl delete depoy/demo-deployment', settings)
}

var handleData = (data: any) => {
  console.log('' + data)
}

var runCommand = async (command: string, settings: Settings) => {
  var conn = getClient()
  conn
    .on('ready', function() {
      conn.exec(command, function(err, stream) {
        if (err) throw err
        stream
          .on('close', function() {
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

var getClient = () => {
  var conn: Client = window
    // @ts-ignore
    .require('electron')
    .remote.require('./main')
    .getSshClient()
  return conn
}

export { reset }
