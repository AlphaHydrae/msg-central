const { Connection } = require('autobahn');

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

  session.subscribe('com.example.add2', args => args[0] + args[1]).catch(handleError);

  intervals.push(setInterval(
    () => session.publish(
      'com.example.notifications',
      [ 'arg1', 'arg2' ],
      { key1: 'value1', key2: 'value2' },
      { acknowledge: true }
    ).then(() => console.log('Published event to com.example.notifications')).catch(handleError),
    10000
  ));
};

connection.open();

function handleError(err) {
  console.error('WAMP error', err);
  connection.close();
}