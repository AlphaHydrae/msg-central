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

  session.register('com.example.add2', args => args[0] + args[1]).catch(handleError);

  intervals.push(setInterval(
    () => session.publish(
      'com.example.notifications',
      [ Math.random() ],
      { time: new Date().toISOString() },
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