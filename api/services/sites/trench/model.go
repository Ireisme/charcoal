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

//Create populates a Trench with data from the CreateTrench command
func (trench *Trench) Create(cmd CreateTrench) (TrenchCreated, error) {
	trench.ID = cmd.ID
	trench.SiteID = cmd.SiteID
	trench.Name = cmd.Name

	event := TrenchCreated{
		ID:     cmd.ID,
		SiteID: cmd.SiteID,
		Name:   cmd.Name,
	}

	return event, nil
}
