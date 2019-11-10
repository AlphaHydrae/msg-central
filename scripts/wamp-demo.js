const { Connection } = require('autobahn');
const WebSocket = require('ws');

const intervals = [];

const connection = new Connection({
  url: process.env.WAMP_ROUTER_URL || 'ws://localhost:5000/ws',
  realm: 'realm1'
});

connection.onclose = () => {

  for (const interval of intervals) {
    clearInterval(interval);
  }

  intervals.length = 0;

  return false;
};

connection.onopen = session => {

  session.register('com.example.add2', args => args[0] + args[1]).catch(handleWampError);
  session.register('com.example.foo', (args, kwargs) => kwargs.foo.bar).catch(handleWampError);

  intervals.push(setInterval(
    () => session.publish(
      'com.example.notifications',
      [ Math.random() ],
      { time: new Date().toISOString() },
      { acknowledge: true }
    ).then(() => console.log('Published event to com.example.notifications')).catch(handleWampError),
    10000
  ));
};

connection.open();

const wss = new WebSocket.Server({
  port: process.env.WS_SERVER_PORT || 5001
});

wss.on('connection', ws => {
  ws.on('message', message => {
    if (message === 'ping') {
      ws.send('pong');
    }
  });

  ws.send(JSON.stringify({ hello: 'world' }));
});

function handleWampError(err) {
  console.error('WAMP error', err);
  connection.close();
}