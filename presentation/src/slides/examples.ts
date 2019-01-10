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
  dockerBuild: new SshBatch(
    {
      dockerfile: `
  FROM arm32v7/node:10-slim
  RUN mkdir /app
  ADD index.js /app/index.js
  CMD node /app/index.js
  `,
      indexjs: `console.log('Running demo-application on host: ' + require('fs').readFileSync('/etc/hostname','utf8'))`
    },
    files => [
      {
        command: [
          { value: 'rm -r example1 || true', hidden: true },
          { value: 'mkdir example1', hidden: true },
          { value: 'cd example1', hidden: true },
          {
            value: writeFileCommand('index.js', files['indexjs']),
            hidden: true
          },
          { value: 'node index.js' }
        ]
      },
      {
        command: [
          { value: 'cd example1', hidden: true },
          {
            value: `${writeFileCommand('Dockerfile', files['dockerfile'])}`,
            hidden: true
          },
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
  ),
  dockerPortVolume: new SshBatch({}, _ => [
    {
      command: [
        { value: 'docker pull lowet84/k8s2019-port-volume-demo' }
      ],
    },
    {
      command: [
        { value: 'docker rm -f example2 || true', hidden: true },
        { value: 'docker run -d -p 3000:3000 --name example2 lowet84/k8s2019-port-volume-demo' }
      ],
    },
    {
      command: [
        { value: 'docker rm -f example2 || true', hidden: true },
        { value: 'docker run -d -p 3000:3000 -v /etc/hostname:/etc/hostname --name example2 lowet84/k8s2019-port-volume-demo' }
      ],
    }
  ])
}

export { batches }
