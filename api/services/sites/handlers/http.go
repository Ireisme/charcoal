package handlers

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/google/uuid"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	cerrors "github.com/ireisme/charcoal/pkg/errors"
	chttp "github.com/ireisme/charcoal/pkg/http"
	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/ireisme/charcoal/services/sites/trench"
)

type HTTPHandler interface {
	Handle() http.Handler
}

type httpHandler struct {
	ss site.Service
	ts trench.Service
}

func NewHTTPHandler(ss site.Service, ts trench.Service) HTTPHandler {
	return &httpHandler{
		ss: ss,
		ts: ts,
	}
}

func (h *httpHandler) Handle() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(chttp.OauthMiddleware{}.Create().Handler)
	r.Use(chttp.CorsMiddleware{}.Create().Handler)

	r.Route("/sites", func(r chi.Router) {
		r.Get("/", h.getAllSites)
		r.Post("/", h.createSite)

		r.Route("/{siteID}", func(r chi.Router) {
			r.Get("/", h.getSite)
		})
	})

	return r
}

func siteRoutes() chi.Router {
	r := chi.NewRouter()

	return r
}

func (h *httpHandler) getAllSites(w http.ResponseWriter, r *http.Request) {
	sites, err := h.ss.FindAll()
	if err != nil {
		render.Render(w, r, cerrors.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, sites)
}

func (h *httpHandler) getSite(w http.ResponseWriter, r *http.Request) {
	param := chi.URLParam(r, "siteID")
	id, err := uuid.Parse(param)
	if err != nil {
		render.Render(w, r, cerrors.ErrInvalidRequest(err))
	}

	site, err := h.ss.Find(id)
	if err != nil {
		render.Render(w, r, cerrors.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, site)
}

func (h *httpHandler) createSite(w http.ResponseWriter, r *http.Request) {
	request := &createSiteRequest{}
	if err := render.Bind(r, request); err != nil {
		render.Render(w, r, cerrors.ErrInvalidRequest(err))
		return
	}

	site, err := h.ss.Create(*request.CreateSite)
	if err != nil {
		render.Render(w, r, cerrors.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, site)
}

type createSiteRequest struct {
	*site.CreateSite

	StringID string `json:"id"`
}

func (s *createSiteRequest) Bind(r *http.Request) error {
	if s.CreateSite == nil {
		return errors.New("missing required Site fields")
	}

	id, err := uuid.Parse(s.StringID)
	if err != nil {
		id, _ = uuid.NewRandom()
	}

	s.CreateSite.ID = id

	return nil
}
