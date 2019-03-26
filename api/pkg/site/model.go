package site

import (
	"github.com/google/uuid"
)

type Site struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}
