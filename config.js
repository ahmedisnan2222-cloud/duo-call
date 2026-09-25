// Which signaling server the page uses (it only introduces the two browsers; no audio or video passes through it).
// null = the free public PeerJS server (0.peerjs.com).
window.DUO_SIGNAL = null;

// To use your own server (see server/README.md), replace the line above with, for example:
// window.DUO_SIGNAL = { host: 'duo-signal.onrender.com', port: 443, path: '/peerjs', secure: true, key: 'duocall' };
