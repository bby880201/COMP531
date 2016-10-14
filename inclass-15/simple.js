var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload = { 'hello': 'world' } 

     switch (req.url) {
          case "/articles":
               if (req.method==="GET") {
                    payload = { articles: [ { id:1, author: "Scott", body:"Post 1" }, 
                    { id:2, author: "A", body:"Post 2" }, 
                    { id:3, author: "B", body:"Post 3" }]}
               }
               break
          case "/login":
               if (req.method==="POST") {
                    const body = JSON.parse(req.body)
                    payload = { username: body.username, result: "success" }
               }
               break
          case "/logout" :
               if (req.method==="PUT") {
                    payload = "OK"
               }
               break               
     }

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
