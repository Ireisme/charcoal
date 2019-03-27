package domain

import (
	"github.com/google/uuid"
)

//Site domain model
type Site struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

//Create to create new Site
func Create(cmd CreateSite) (Site, SiteCreated, error) {
	site := Site{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	event := SiteCreated{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	return site, event, nil
}

//Trench domain model
type Trench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
