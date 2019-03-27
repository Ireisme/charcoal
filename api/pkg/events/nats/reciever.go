package nats

import (
	"bytes"
	"encoding/gob"
	"log"

	"github.com/ireisme/charcoal/pkg/events"
	nats "github.com/nats-io/go-nats"
)

type natsReceiver struct {
	conn *nats.Conn
}

//NewNATSReceiver creates a new EventReceiver using NATS
func NewNATSReceiver() events.EventReceiver {
	nc, _ := nats.Connect(nats.DefaultURL)

	return &natsReceiver{
		conn: nc,
	}
}

func (receiver *natsReceiver) Receieve(subject string, event interface{}, subscription func(event interface{})) error {

	receiver.conn.Subscribe(subject, func(message *nats.Msg) {

		buff := bytes.NewBuffer(message.Data)
		dec := gob.NewDecoder(buff)
		err := dec.Decode(event)
		if err != nil {
			log.Fatal(err)
		}

		subscription(event)
	})

	return nil
}
