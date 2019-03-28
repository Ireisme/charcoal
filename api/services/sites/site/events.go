package site

import (
	"github.com/google/uuid"
)

//SiteCreated is an event dispatched when a Site is created
type SiteCreated struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}
