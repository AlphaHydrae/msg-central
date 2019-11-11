# TODO

* Handle `Uncaught DOMException: Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS.`
* Connecting from https to ws with WAMP causes HANDLE_WAMP_ERROR without connection close
* Allow expanding/collapsing all events
* Normalize error types
* Add bin
* Implement auto-reconnect on connection lost (with configurable exponential/incremental backoff)
* Make auto-reconnect configurable
* Complete subscription observables when unsubscribing or connection is lost
* Handle WebSocket binary data
* Show calling/subscribing/unsubscribing progress