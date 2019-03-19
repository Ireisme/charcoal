package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/ireisme/charcoal/sites"
)

func main() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(OauthMiddleware{}.Create().Handler)
	r.Use(CorsMiddleware{}.Create().Handler)

	r.Mount("/hello", helloResource{}.Routes())
	r.Mount("/sites", sites.SiteResource{}.Routes())

	http.ListenAndServe(":3000", r)
}
