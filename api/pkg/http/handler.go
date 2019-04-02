package http

import (
	"net/http"

	"github.com/go-chi/render"
)

type HandleFn func(*http.Request) (interface{}, *ErrResponse)

type Handler struct{}

func (h *Handler) Handle(createFn func() HandleFn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var fn = createFn()
		response, err := fn(r)

		if err != nil {
			render.Render(w, r, err)
		} else {
			render.JSON(w, r, response)
		}
	}
}
