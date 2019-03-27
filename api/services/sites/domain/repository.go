package domain

import (
	"github.com/google/uuid"
)

//SiteRepository for storing Sites
type SiteRepository interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	FindByName(name string) (*Site, error)
	Store(site *Site) error
	Delete(id uuid.UUID) error
}

//TrenchRepository for storing Trenches
type TrenchRepository interface {
	Find(id uuid.UUID) (*Trench, error)
	FindBySite(siteID uuid.UUID) ([]*Trench, error)
	Store(trench *Trench) error
	Delete(id uuid.UUID) error
}
