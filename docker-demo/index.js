import express from 'express'
import { readFileSync, existsSync } from 'fs'

var app = express()

const filename = '/etc/hostname'
var hostname = existsSync(filename) ? readFileSync(filename, 'utf8') : 'dummy'

app.get('/', function(req, res) {
  var html = `
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
          rel="stylesheet"
        />
        <style>
          .header {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4em;
            height: 100vh;
            color: white;
            flex-direction: column;
          }
          body {
            background: rgb(54, 54, 54);
            font-family: 'Roboto';
          }
          ::-webkit-scrollbar {
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>This demo is running on:</div>
          <div>${hostname}</div>
        </div>
      </body>
    </html>
  `
  res.send(html)
})

app.use(express.static('web'))

app.listen(3000)
