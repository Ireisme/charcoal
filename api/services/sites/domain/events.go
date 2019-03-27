package domain

import (
	"github.com/google/uuid"
)

//SiteCreated is an event dispatched when a Site is created
type SiteCreated struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

//TrenchCreated is an event dispatched when a Trench is created
type TrenchCreated struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
