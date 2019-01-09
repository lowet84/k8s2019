var dockerfile1 = `
FROM arm32v7/node:10-slim
RUN mkdir /app
ADD index.js /app/index.js
CMD node /app/index.js
`

var batches: { [name: string]: SshBatch } = {
  docker1: {
    items: [
      {
        command: `
        rm -r example1 || true
        mkdir example1
        `
      },
      {
        command: `
        ls
        ls
        `
      },
      {
        command: `
        docker rmi lowet84/k8s2019-docker-demo || true
        docker pull lowet84/k8s2019-docker-demo
        `
      }
    ]
  }
}

export { dockerfile1, batches }
