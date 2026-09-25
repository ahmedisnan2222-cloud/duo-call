// Signaling only: introduces the two browsers to each other. Audio and video never pass through here.
const { PeerServer } = require('peer');

const port = Number(process.env.PORT) || 9000;

const server = PeerServer({
  port,
  path: '/peerjs',
  key: 'duocall',
  proxied: true,              // running behind the host's HTTPS proxy
  allow_discovery: false,     // do not list connected peers
  concurrent_limit: 20,
  corsOptions: { origin: ['https://ahmedisnan2222-cloud.github.io', 'http://localhost:8080'] },
});

server.on('connection', c => console.log('connected', c.getId().slice(0, 12)));
server.on('disconnect', c => console.log('disconnected', c.getId().slice(0, 12)));
console.log('Duo Call signaling server listening on port ' + port);
