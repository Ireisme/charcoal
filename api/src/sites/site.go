package sites

import (
	"github.com/google/uuid"
)

type Site struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

func (site Site) Create(cmd *CreateSite) {
	site.ID = cmd.ID
	site.Name = cmd.Name
	site.ImageURL = cmd.ImageURL

	db := SiteDB{}
	db.Upsert(site)
}

type CreateSite struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}
