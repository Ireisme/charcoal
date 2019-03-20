package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	chttp "github.com/ireisme/charcoal/http"
	"github.com/ireisme/charcoal/sites"
)

func NewHandler(sitesResource sites.SiteResource) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(chttp.OauthMiddleware{}.Create().Handler)
	r.Use(chttp.CorsMiddleware{}.Create().Handler)

	r.Mount("/sites", sitesResource.Routes())

	return r
}
