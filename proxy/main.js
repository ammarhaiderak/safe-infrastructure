const http = require('http');
const httpProxy = require('http-proxy');


const targetUrl = 'http://localhost:8000';  // The local service URL
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Log the incoming request if needed
  console.log(`Proxying request: ${req.method} ${req.url}`);
  
//   req.headers['origin'] = 'https://api.wagmilabz.com';
//   req.headers['referer'] = 'https://api.wagmilabz.com/';
  // Proxy the request to the local service
  proxy.web(req, res, { target: targetUrl });
  res.setHeader('Access-Control-Allow-Origin', '*');
});

const PORT = 8383;  // Port for your proxy server to listen on
server.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});