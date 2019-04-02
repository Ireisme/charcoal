package trench_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/trench"
)

func TestCreatePopulatesTrench(t *testing.T) {
	id, _ := uuid.NewRandom()
	siteID, _ := uuid.NewRandom()
	cmd := trench.CreateTrench{
		ID:     id,
		SiteID: siteID,
		Name:   "New Trench",
	}

	expected := &trench.Trench{
		ID:     cmd.ID,
		Name:   cmd.Name,
		SiteID: siteID,
	}

	sut := &trench.Trench{}

	_, err := sut.Create(cmd)

	assert.Nil(t, err)
	assert.Equal(t, expected, sut)
}

func TestCreateReturnsEvent(t *testing.T) {
	id, _ := uuid.NewRandom()
	siteID, _ := uuid.NewRandom()
	cmd := trench.CreateTrench{
		ID:     id,
		SiteID: siteID,
		Name:   "New Trench",
	}

	expected := trench.TrenchCreated{
		ID:     cmd.ID,
		SiteID: siteID,
		Name:   cmd.Name,
	}

	sut := &trench.Trench{}

	actual, err := sut.Create(cmd)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}
