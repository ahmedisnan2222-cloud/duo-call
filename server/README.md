# Duo Call signaling server (optional)

A tiny PeerJS server. It only introduces the two browsers to each other; audio and video never pass through it.
Use it if the free public PeerJS server (0.peerjs.com) is blocked or unreliable on someone's network.

## Deploy free on Render (needs your own Render account)
1. Sign up at render.com with your GitHub account.
2. New > Web Service > pick the `duo-call` repo.
3. Settings: Root Directory `server`, Runtime `Node`, Build Command `npm install`, Start Command `npm start`,
   Instance type `Free`. Pick a region close to you (Frankfurt or Singapore).
4. Deploy. You get a URL like `https://duo-signal.onrender.com`. Opening it should show `{"name":"PeerJS Server", ...}`.
   Open `https://<your-url>/peerjs/` too: it should show the same.
5. Put the hostname in `config.js` at the repo root:

       window.DUO_SIGNAL = { host: 'duo-signal.onrender.com', port: 443, path: '/peerjs', secure: true, key: 'duocall' };

6. Commit and push. Both people hard refresh (Ctrl+Shift+R).

## Notes
- The free instance sleeps after about 15 minutes idle; the first connection after that can take up to a minute.
- Free-tier terms change; check Render's current limits.
- Allowed origins are set in `server.js` (`corsOptions`). If your site URL changes, update it there.
- Run locally: `cd server && npm install && npm start` (listens on port 9000).
