import { createServer } from 'node:http';
import { parse } from 'node:url';
import { handler as myHelloWorldLambdaHandler } from './lambdas/MyHelloWorldLambda';

const server = createServer(async (req, res) => {
  const parsedUrl = parse(req.url || '', true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    const result = await myHelloWorldLambdaHandler({}, {}, () => {});
    res.writeHead(result.statusCode, { 'Content-Type': 'text/plain' });
    res.end(result.body);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found\n');

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
