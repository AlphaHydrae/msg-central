import { callWampProcedure, connectToWampRouter, handleWampConnectionClosed, handleWampTopicEvent, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';
import { connectToWsServer, handleWsConnectionClosed, handleWsMessage, sendWsMessage } from '../../domain/ws/ws.actions';

export const eventActionTypes = [
  callWampProcedure.done,
  callWampProcedure.failed,
  connectToWampRouter.done,
  connectToWampRouter.failed,
  connectToWsServer.done,
  connectToWsServer.failed,
  handleWampConnectionClosed,
  handleWampTopicEvent,
  handleWsConnectionClosed,
  handleWsMessage,
  sendWsMessage,
  subscribeToWampTopic.done,
  unsubscribeFromWampTopic.done
].map(creator => creator.type);