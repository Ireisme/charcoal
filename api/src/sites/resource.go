package sites

import (
	"errors"
	"net/http"

	"github.com/google/uuid"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	chttp "github.com/ireisme/charcoal/http"
)

type SiteResource interface {
	Routes() chi.Router
}

type resource struct {
	service SiteService
}

func NewResource(service SiteService) SiteResource {
	return &resource{
		service: service,
	}
}

func (rs *resource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", rs.getAll)
	r.Post("/", rs.create)

	r.Route("/{siteID}", func(r chi.Router) {
		r.Get("/", rs.get)
	})

	return r
}

func (rs *resource) getAll(w http.ResponseWriter, r *http.Request) {
	sites, err := rs.service.FindAll()
	if err != nil {
		render.Render(w, r, chttp.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, sites)
}

func (rs *resource) get(w http.ResponseWriter, r *http.Request) {
	param := chi.URLParam(r, "siteID")
	id, err := uuid.Parse(param)
	if err != nil {
		render.Render(w, r, chttp.ErrInvalidRequest(err))
	}

	site, err := rs.service.Find(id)
	if err != nil {
		render.Render(w, r, chttp.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, site)
}

func (rs *resource) create(w http.ResponseWriter, r *http.Request) {
	request := &CreateSiteRequest{}
	if err := render.Bind(r, request); err != nil {
		render.Render(w, r, chttp.ErrInvalidRequest(err))
		return
	}

	site, err := rs.service.Create(*request.CreateSite)
	if err != nil {
		render.Render(w, r, chttp.ErrInternalServer(err))
		return
	}

	render.JSON(w, r, site)
}

type CreateSiteRequest struct {
	*CreateSite

	StringID string `json:"id"`
}

func (s *CreateSiteRequest) Bind(r *http.Request) error {
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
