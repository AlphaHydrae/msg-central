# TODO

* Show connection form when attempting to reconnect with unsaved authentication
* Complete subscription observables when unsubscribing or connection is lost
* Show calling/subscribing/unsubscribing progress
* Handle subscribe/unsubscribe errors
* Handle `Uncaught DOMException: Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS.`
* Connecting from https to ws with WAMP causes HANDLE_WAMP_ERROR without connection close
* Handle WAMP connection already closed error
* Normalize error types
* Add bin
* Implement auto-reconnect on connection lost (with configurable exponential/incremental backoff)
* Make auto-reconnect configurable
* Handle WebSocket binary data