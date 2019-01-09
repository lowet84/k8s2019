var dockerfile1 = `
FROM arm32v7/node:10-slim
RUN mkdir /app
ADD index.js /app/index.js
CMD node /app/index.js
`

var batches: { [name: string]: SshBatch } = {
  docker1: {
    items: [{ command: 'rm -r example1' }, { command: 'mkdir example1' }]
  }
}

export { dockerfile1, batches }
