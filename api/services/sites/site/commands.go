package site

import (
	"github.com/google/uuid"
)

//CreateSite is a command for creating a Site
type CreateSite struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}
