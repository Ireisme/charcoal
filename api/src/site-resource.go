package main

import (
	"errors"
	"net/http"

	"github.com/google/uuid"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type siteResource struct{}

func (rs siteResource) Routes() chi.Router {
	r := chi.NewRouter()

	r.Get("/", GetAll)
	r.Post("/", Create)

	r.Route("/{siteID}", func(r chi.Router) {
		r.Get("/", Get)
	})

	return r
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := SiteDB{}
	sites := db.GetAll()

	render.JSON(w, r, sites)
}

func Get(w http.ResponseWriter, r *http.Request) {
	param := chi.URLParam(r, "siteID")
	id, err := uuid.Parse(param)
	if err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
	}

	db := SiteDB{}
	site := db.Get(id)

	render.JSON(w, r, site)
}

func Create(w http.ResponseWriter, r *http.Request) {
	request := &CreateSiteRequest{}
	if err := render.Bind(r, request); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	site := Site{}
	site.Create(request.CreateSite)

	render.JSON(w, r, true)
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

type ErrResponse struct {
	Err            error `json:"-"` // low-level runtime error
	HTTPStatusCode int   `json:"-"` // http response status code

	StatusText string `json:"status"`          // user-level status message
	AppCode    int64  `json:"code,omitempty"`  // application-specific error code
	ErrorText  string `json:"error,omitempty"` // application-level error message, for debugging
}

func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func ErrInvalidRequest(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Invalid request.",
		ErrorText:      err.Error(),
	}
}
