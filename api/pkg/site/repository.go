package site

import (
	"github.com/google/uuid"
)

type SiteRepository interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	FindByName(name string) (*Site, error)
	Store(site *Site) error
	Delete(id uuid.UUID) error
}
