package handlers

import (
	"fmt"

	"github.com/ireisme/charcoal/pkg/events"
	"github.com/ireisme/charcoal/services/sites/site"
)

type EventHandler interface {
	Handle()
}

type eventHandler struct {
	receiver events.EventReceiver
}

func NewEventHandler(receiver events.EventReceiver) EventHandler {
	return &eventHandler{
		receiver: receiver,
	}
}

func (handler *eventHandler) Handle() {
	handler.siteCreated()
}

func (handler *eventHandler) siteCreated() {
	event := site.SiteCreated{}
	handler.receiver.Receieve("SiteCreated", &event, func(event interface{}) {
		siteCreated := event.(*site.SiteCreated)

		fmt.Printf("Site was created! %s", siteCreated.Name)
	})
}
