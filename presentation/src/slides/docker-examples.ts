var dockerfile1 = `
FROM arm32v7/node:10-slim
RUN mkdir /app
ADD index.js /app/index.js
CMD node /app/index.js
`

export { dockerfile1 }
