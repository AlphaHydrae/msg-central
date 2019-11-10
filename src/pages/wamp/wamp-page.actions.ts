import { callWampProcedure, connectToWampRouter, handleWampConnectionClosed, handleWampTopicEvent, subscribeToWampTopic, unsubscribeFromWampTopic } from '../../domain/wamp/wamp.actions';

export const wampEventActionTypes = [
  callWampProcedure.done,
  callWampProcedure.failed,
  connectToWampRouter.done,
  connectToWampRouter.failed,
  handleWampConnectionClosed,
  handleWampTopicEvent,
  subscribeToWampTopic.done,
  unsubscribeFromWampTopic.done
].map(creator => creator.type);