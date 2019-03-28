package trench

import (
	"github.com/google/uuid"
)

//TrenchCreated is an event dispatched when a Trench is created
type TrenchCreated struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
