package main

import (
	"log"
	"net/http"

	"github.com/ireisme/charcoal/pkg/data/cockroach"
	chttp "github.com/ireisme/charcoal/pkg/http"
	"github.com/ireisme/charcoal/pkg/site"
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

	rp := cockroach.NewSiteRepository(*db)
	s := site.NewService(rp)
	rs := site.NewResource(s)

	r := chttp.NewHandler(rs)

	http.ListenAndServe(":3000", r)
}
