package domain

import (
	"github.com/google/uuid"
)

//CreateSite is a command for creating a Site
type CreateSite struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

//CreateTrench is a command for creating a Trench
type CreateTrench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
