const http = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');

const corsOptions = {
  origin: '*', // Adjust this to allow requests from specific origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const targetUrl = 'http://localhost:8000';  // The local service URL
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Log the incoming request if needed
  console.log(`Proxying request: ${req.method} ${req.url}`);
  
  req.headers['origin'] = 'http://localhost:8000';
  req.headers['referer'] = 'http://localhost:8000/';
  // Proxy the request to the local service
  proxy.web(req, res, { target: targetUrl });
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // Set the 'Access-Control-Allow-Origin' header in the response
  res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
  res.setHeader('Access-Control-Allow-Methods', corsOptions.methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
});


// Use the cors middleware
// server.use(cors(corsOptions));

const PORT = 8383;  // Port for your proxy server to listen on
server.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});