package trench

import (
	"github.com/google/uuid"
)

//Trench domain model
type Trench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
