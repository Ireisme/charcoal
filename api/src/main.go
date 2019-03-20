package main

import (
	"log"
	"net/http"

	"github.com/ireisme/charcoal/sites"
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

	rp := sites.NewRepository(*db)
	s := sites.NewService(rp)
	rs := sites.NewResource(s)

	r := NewHandler(rs)

	http.ListenAndServe(":3000", r)
}
