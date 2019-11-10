import { connectToWsServer, handleWsConnectionClosed, handleWsMessage, sendWsMessage } from '../../domain/ws/ws.actions';

export const wsEventActionTypes = [
  connectToWsServer.done,
  connectToWsServer.failed,
  handleWsConnectionClosed,
  handleWsMessage,
  sendWsMessage
].map(creator => creator.type);