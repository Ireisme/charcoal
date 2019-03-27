package handlers

import (
	"fmt"

	"github.com/ireisme/charcoal/pkg/events"
	"github.com/ireisme/charcoal/services/sites/domain"
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
	event := domain.SiteCreated{}
	handler.receiver.Receieve("SiteCreated", &event, func(event interface{}) {
		siteCreated := event.(*domain.SiteCreated)

		fmt.Printf("Site was created! %s", siteCreated.Name)
	})
}
