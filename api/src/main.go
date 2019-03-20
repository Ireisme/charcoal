package main

import (
	"net/http"

	"github.com/ireisme/charcoal/sites"
)

func main() {
	connectionString := "postgresql://charcoaluser@localhost:26257/charcoal?sslmode=disable"

	rp := sites.NewRepository(connectionString)
	s := sites.NewService(rp)
	rs := sites.NewResource(s)

	r := NewHandler(rs)

	http.ListenAndServe(":3000", r)
}
