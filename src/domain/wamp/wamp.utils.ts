import { Error as AutobahnError } from 'autobahn';

import { WampClientError } from './wamp.actions';

export function serializeWampClientError(err: unknown): WampClientError {
  if (typeof err === 'string') {
    return {
      message: err,
      args: [],
      kwargs: {}
    };
  } else if (err instanceof AutobahnError) {
    return {
      message: err.error,
      args: err.args,
      kwargs: err.kwargs
    };
  } else if (err instanceof Error) {
    return {
      message: err.message,
      stack: err.stack,
      args: [],
      kwargs: {}
    };
  }

  return {
    message: 'An unexpected error occurred',
    args: [],
    kwargs: {}
  };
}