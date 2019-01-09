import { SshBatch } from './SshBatch'

var writeFileCommand = (filename: string, content: string): string => {
  var index = 0
  var lines = content
    .split(/\r?\n/)
    .map(d => d.trim())
    .filter(d => d.length > 0)
    .map(d => `echo "${d}" ${index++ === 0 ? '>' : '>>'} ${filename}`)
  return lines.join('\n')
}

var batches: { [name: string]: SshBatch } = {
  docker1: new SshBatch(
    `
  FROM arm32v7/node:10-slim
  RUN mkdir /app
  ADD index.js /app/index.js
  CMD node /app/index.js
  `,
    (info: string) => {
      return [
        {
          command: [
            { value: 'rm -r example1 || true', hidden: true },
            { value: 'mkdir example1' }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            {
              value: writeFileCommand(
                'index.js',
                `
            console.log('Running demo-application on host:')
            console.log(require('fs').readFileSync('/etc/hostname','utf8'))
            `
              )
            },
            { value: 'node index.js' }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            { value: `${writeFileCommand('Dockerfile', info)}` },
            { value: 'cat Dockerfile' }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            { value: `docker build -t docker-demo .` }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            { value: `docker run --rm docker-demo` }
          ]
        }
      ]
    }
  )
}

export { batches }
