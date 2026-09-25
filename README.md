# Call Room (2 people, free, peer-to-peer)

Single static page. Audio, video and screen share go directly browser to browser (WebRTC).
The only third-party pieces are free: PeerJS public signaling server and Google STUN.

## Run locally
    py -m http.server 8080
Open http://localhost:8080 in two tabs (or two devices on the same network via your PC's IP, though
cameras need HTTPS off localhost, so use hosting below for real tests).

## Host free (needed for real tests, camera/mic require HTTPS)
Upload this folder to Netlify Drop, Cloudflare Pages or GitHub Pages. No build step.

## Use
1. Person A opens the site, clicks Create room, sends the link.
2. Person B opens the link, clicks Join call. A third person is rejected.
3. Top-right shows DIRECT or RELAYED plus round-trip time (ms).

## Noise cancellation
Mic audio passes through RNNoise (WebAssembly, runs in the browser, nothing leaves the device) before
it is sent. The "Noise cancel" button toggles it. ON = RNNoise with the browser's own suppression off;
OFF = the browser's built-in suppression only. Files are in `vendor/` (from @sapphi-red/web-noise-suppressor,
see `vendor/LICENSE-web-noise-suppressor`). If it fails to load, the call falls back to plain mic audio.
Because the page now loads ES modules and a worklet, it must be served over http(s), not opened as a file.

## Known limits
- No TURN relay: if a network blocks direct connections, that user cannot connect.
- Keep the host tab open; closing it ends the room.
- Screen share cannot start from phones.
