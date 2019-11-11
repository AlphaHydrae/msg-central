# MSG Central

A [WebSocket][ws] and [Wamp Application Messaging Protocol (WAMP)][wamp] web
client.



## Getting started

### In the cloud

Visit https://msg-central.herokuapp.com and message away. This version will
often need a few seconds to answer.

> If you need to connect to an insecure WebSocket server or WAMP router (your
> URL starts with `ws://`), use http://msg-central.herokuapp.com.

### On your machine

Clone, build and run the application locally:

```bash
git clone https://github.com/AlphaHydrae/msg-central.git
cd msg-central
npm ci
npm run build
npm start
```



[wamp]: https://wamp-proto.org
[ws]: https://en.wikipedia.org/wiki/WebSocket