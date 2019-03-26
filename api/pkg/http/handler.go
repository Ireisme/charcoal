package http

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/ireisme/charcoal/pkg/site"
)

func NewHandler(siteResource site.SiteResource) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(OauthMiddleware{}.Create().Handler)
	r.Use(CorsMiddleware{}.Create().Handler)

	r.Mount("/sites", siteResource.Routes())

	return r
}
