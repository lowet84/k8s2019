import express from 'express'

var app = express()

app.get('/', function(req, res) {
  var html = `
    <html>
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' rel="stylesheet">
        <style>
          .header {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4em;
            height: 100vh;
            color: white;
          }
          body{
            background:rgb(54, 54, 54);
            font-family: 'Roboto'
          }
        </style>
      </head>
      <body>
        <div class="header">This is just a demo!</div>
      </body>
    </html>
  `
  res.send(html)
})

app.use(express.static('web'))

app.listen(3000)
