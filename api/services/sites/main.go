package main

import (
	"log"
	"net/http"

	"github.com/ireisme/charcoal/pkg/events/nats"
	"github.com/ireisme/charcoal/services/sites/data/cockroach"
	"github.com/ireisme/charcoal/services/sites/handlers"
	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/ireisme/charcoal/services/sites/trench"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func main() {
	connectionString := "postgresql://charcoaluser@localhost:26257/charcoal?sslmode=disable"
	db, err := sqlx.Open("postgres", connectionString)
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}
	defer db.Close()

	sender := nats.NewNATSSender()
	receiver := nats.NewNATSReceiver()

	siteRepo := cockroach.NewSiteRepository(*db)
	trenchRepo := cockroach.NewTrenchRepository(*db)

	siteService := site.NewService(siteRepo, sender)
	trenchService := trench.NewService(trenchRepo, siteRepo, sender)

	events := handlers.NewEventHandler(receiver)
	events.Handle()

	h := handlers.NewHTTPHandler(siteService, trenchService)

	http.ListenAndServe(":5309", h.CreateHandler())
}
