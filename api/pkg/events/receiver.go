package events

//EventReceiver sends events
type EventReceiver interface {
	Receieve(subject string, event interface{}, subscription func(event interface{})) error
}
