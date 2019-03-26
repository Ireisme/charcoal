package trench

import (
	"github.com/google/uuid"
)

type Trench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
