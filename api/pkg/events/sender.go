package events

//EventSender sends events
type EventSender interface {
	Send(subject string, event interface{}) error
}
