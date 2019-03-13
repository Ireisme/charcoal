package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type helloResource struct{}

func (rs helloResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", Hello)

	return r
}

func Hello(w http.ResponseWriter, r *http.Request) {
	response := HelloResponse{
		Greeting: "HELLO THERE",
	}
	render.JSON(w, r, response)
}

type HelloResponse struct {
	Greeting string
}
