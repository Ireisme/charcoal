package trench

import (
	"github.com/google/uuid"
)

//TrenchRepository for storing Trenches
type Repository interface {
	Find(id uuid.UUID) (*Trench, error)
	FindBySite(siteID uuid.UUID) ([]*Trench, error)
	Store(trench *Trench) error
	Delete(id uuid.UUID) error
}
