import resolver from 'appkit/tests/helpers/resolver';

function fakeServer(method, url, response) {
  var server = sinon.fakeServer.create();
  server.respondWith(method, url, [
    200,
    { "Content-Type": "application/json" },
    JSON.stringify(response)
  ]);
  return server;
}

export default fakeServer;
