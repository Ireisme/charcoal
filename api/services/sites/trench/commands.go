package trench

import (
	"github.com/google/uuid"
)

//CreateTrench is a command for creating a Trench
type CreateTrench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
