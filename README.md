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
1. The first person opens the site and clicks Create my room link. The address becomes a permanent link
   (…/?room=<secret>). Bookmark it and send the SAME link to the other person.
2. Both open that link and click Enter room. Whoever arrives first hosts, the other joins. Roles do not matter.
3. Refreshing or closing a tab is fine: reopen the same link and the call reconnects. If the host leaves, the
   other person takes over the room. A healthy call is never displaced, so a third person cannot join.
4. Top-right shows DIRECT or RELAYED plus round-trip time (ms).

The secret in the link is the only access control, so only share it with the person you want in the room.
The browser also remembers your room (localStorage): opening the bare site offers Enter my room.

## Noise cancellation
Three independent buttons, all running locally in the browser (nothing leaves the device):
- **RNNoise** (on by default): light, fast ML noise removal.
- **GTCRN**: newer ML model, better on keyboard clicks and background voices, uses more CPU.
- **Noise gate**: mutes the mic below a threshold (slider + live level meter). Set the threshold between your
  room noise and your speaking level.
They chain in that order and can be combined (stacking both ML models can sound over-processed). The browser's own
suppression is only active when neither ML model is on. Each person's buttons change only how THEIR mic sounds to
the other side. Files are in vendor/ (from @sapphi-red/web-noise-suppressor, see vendor/LICENSE-web-noise-suppressor).
If loading fails, the call falls back to plain mic audio. The page uses ES modules and audio worklets, so it must be
served over http(s), not opened as a file.

## Known limits
- No TURN relay: if a network blocks direct connections, that user cannot connect.
- Keep the host tab open; closing it ends the room.
- Screen share cannot start from phones.
