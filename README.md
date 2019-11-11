# MSG Central

A [WebSocket][ws] and [Wamp Application Messaging Protocol (WAMP)][wamp] web
client.



## Getting started

### In the cloud

Visit https://msg-central.herokuapp.com and message away. This version may need
a few seconds to answer.

> MSG Central runs entirely in your browser, so it can connect to `localhost`
> URLs just fine. However, if you need to connect to an insecure WebSocket
> server or WAMP router somewhere on the web (your URL starts with `ws://` and
> is not on `localhost`), use http://msg-central.herokuapp.com (or the browser
> may block the connection for security reasons).

### On your machine

Clone, build and run the application locally:

```bash
git clone https://github.com/AlphaHydrae/msg-central.git
cd msg-central
npm ci
npm run build
npm start
```



## What do I do with it?

You can:

* Connect to a [WebSocket][ws] server and:
  * Send messages
  * Receive messages
* Connect to a [WAMP][wamp] router (optionally with ticket authentication) and:
  * Call procedures
  * Subscribe to topics

You can connect to `wss://demos.kaazing.com/echo`, the [WebSocket echo
server][ws-echo], to test sending and receiving messages.



[wamp]: https://wamp-proto.org
[ws]: https://en.wikipedia.org/wiki/WebSocket
[ws-echo]: https://www.websocket.org/echo.html