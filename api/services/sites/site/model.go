package site

import (
	"github.com/google/uuid"
)

//Site domain model
type Site struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

//Create populates a Site with data from the CreateSite command
func (site *Site) Create(cmd CreateSite) (SiteCreated, error) {
	site.ID = cmd.ID
	site.Name = cmd.Name
	site.ImageURL = cmd.ImageURL

	event := SiteCreated{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	return event, nil
}
