package nats

import (
	"bytes"
	"encoding/gob"
	"log"

	"github.com/ireisme/charcoal/pkg/events"
	nats "github.com/nats-io/go-nats"
)

type natsSender struct {
	conn *nats.Conn
}

//NewNATSSender creates a new EventSender using NATS
func NewNATSSender() events.EventSender {
	nc, _ := nats.Connect(nats.DefaultURL)

	return &natsSender{
		conn: nc,
	}
}

func (sender *natsSender) Send(subject string, event interface{}) error {
	var buff bytes.Buffer
	enc := gob.NewEncoder(&buff)
	err := enc.Encode(event)
	if err != nil {
		log.Fatal(err)
	}

	sender.conn.Publish(subject, buff.Bytes())

	return nil
}
