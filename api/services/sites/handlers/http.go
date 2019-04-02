package handlers

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/google/uuid"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	chttp "github.com/ireisme/charcoal/pkg/http"
	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/ireisme/charcoal/services/sites/trench"
)

//SiteHandler creates an HttpHandler for Site routes
type SiteHandler interface {
	CreateHandler() http.Handler
}

type siteHandler struct {
	chttp.Handler
	ss site.Service
	ts trench.Service
}

//NewHTTPHandler returns a new SiteHandler to handle HTTP requests
func NewHTTPHandler(ss site.Service, ts trench.Service) SiteHandler {
	return &siteHandler{
		ss: ss,
		ts: ts,
	}
}

func (h *siteHandler) CreateHandler() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(chttp.OauthMiddleware{}.Create().Handler)
	r.Use(chttp.CorsMiddleware{}.Create().Handler)

	r.Route("/sites", func(r chi.Router) {
		r.Get("/", h.Handle(h.getAllSites))
		r.Post("/", h.Handle(h.createSite))

		r.Route("/{siteID}", func(r chi.Router) {
			r.Get("/", h.Handle(h.getSite))

			r.Route("/trenches", func(r chi.Router) {
				r.Get("/", h.Handle(h.getTrenchesBySite))
				r.Post("/", h.Handle(h.createTrench))

				r.Route("/{trenchID}", func(r chi.Router) {
					r.Get("/", h.Handle(h.getTrench))
				})
			})
		})
	})

	return r
}

//Sites
func (h *siteHandler) getAllSites() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		sites, err := h.ss.FindAll()
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return sites, nil
	}
}

func (h *siteHandler) getSite() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		param := chi.URLParam(r, "siteID")
		id, err := uuid.Parse(param)
		if err != nil {
			return nil, chttp.ErrInvalidRequest(err)
		}

		site, err := h.ss.Find(id)
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return site, nil
	}
}

func (h *siteHandler) createSite() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		request := &createSiteRequest{}
		if err := render.Bind(r, request); err != nil {
			return nil, chttp.ErrInvalidRequest(err)
		}

		site, err := h.ss.Create(*request.CreateSite)
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return site, nil
	}
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

//Trenches
func (h *siteHandler) getTrenchesBySite() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		param := chi.URLParam(r, "siteID")
		siteID, err := uuid.Parse(param)
		if err != nil {
			return nil, chttp.ErrInvalidRequest(err)
		}

		sites, err := h.ts.FindBySite(siteID)
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return sites, nil
	}
}

func (h *siteHandler) getTrench() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		param := chi.URLParam(r, "trenchID")
		id, err := uuid.Parse(param)
		if err != nil {
			return nil, chttp.ErrInvalidRequest(err)
		}

		site, err := h.ts.Find(id)
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return site, nil
	}
}

func (h *siteHandler) createTrench() chttp.HandleFn {
	return func(r *http.Request) (interface{}, *chttp.ErrResponse) {
		request := &createTrenchRequest{}
		if err := render.Bind(r, request); err != nil {
			return nil, chttp.ErrInvalidRequest(err)
		}

		site, err := h.ts.Create(*request.CreateTrench)
		if err != nil {
			return nil, chttp.ErrInternalServer(err)
		}

		return site, nil
	}
}

type createTrenchRequest struct {
	*trench.CreateTrench

	StringID     string `json:"id"`
	StringSiteID string `json:"siteID"`
}

func (s *createTrenchRequest) Bind(r *http.Request) error {
	if s.CreateTrench == nil {
		return errors.New("missing required Trench fields")
	}

	id, err := uuid.Parse(s.StringID)
	if err != nil {
		id, _ = uuid.NewRandom()
	}

	siteID, err := uuid.Parse(s.StringSiteID)
	if err != nil {
		siteID, _ = uuid.NewRandom()
	}

	s.CreateTrench.ID = id
	s.CreateTrench.SiteID = siteID

	return nil
}
