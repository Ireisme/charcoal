package trench_test

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/google/uuid"
	emock "github.com/ireisme/charcoal/pkg/events/mock"
	dmock "github.com/ireisme/charcoal/services/sites/data/mock"
	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/ireisme/charcoal/services/sites/trench"
)

func TestFindToReturnTrench(t *testing.T) {
	id, _ := uuid.NewRandom()
	expected := &trench.Trench{
		ID: id,
	}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("Find", id).Return(expected, nil)
	mockSiteRepo := new(dmock.MockSiteRepository)

	mockSender := new(emock.MockSender)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.Find(id)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestFindBySiteToReturnTrenches(t *testing.T) {
	siteID, _ := uuid.NewRandom()
	expected := []*trench.Trench{&trench.Trench{}, &trench.Trench{}}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("FindBySite", siteID).Return(expected, nil)

	mockSiteRepo := new(dmock.MockSiteRepository)

	mockSender := new(emock.MockSender)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.FindBySite(siteID)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestStoreToReturnNewTrench(t *testing.T) {
	id, _ := uuid.NewRandom()
	siteID, _ := uuid.NewRandom()
	existingSite := &site.Site{
		ID: siteID,
	}
	createTrench := trench.CreateTrench{
		ID:     id,
		SiteID: siteID,
		Name:   "Test Name",
	}
	trenchCreated := trench.TrenchCreated{
		ID:     createTrench.ID,
		SiteID: siteID,
		Name:   createTrench.Name,
	}

	expected := &trench.Trench{
		ID:     id,
		SiteID: siteID,
		Name:   createTrench.Name,
	}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("Store", expected).Return(nil)
	mockTrenchRepo.On("FindBySite", createTrench.SiteID).Return([]*trench.Trench{}, nil)

	mockSiteRepo := new(dmock.MockSiteRepository)
	mockSiteRepo.On("Find", createTrench.SiteID).Return(existingSite, nil)

	mockSender := new(emock.MockSender)
	mockSender.On("Send", "TrenchCreated", trenchCreated).Return(nil)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.Create(createTrench)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)

	mockTrenchRepo.AssertExpectations(t)
}

func TestStoreToSendEvent(t *testing.T) {
	id, _ := uuid.NewRandom()
	siteID, _ := uuid.NewRandom()
	existingSite := &site.Site{
		ID: siteID,
	}
	createTrench := trench.CreateTrench{
		ID:     id,
		SiteID: siteID,
		Name:   "Test Name",
	}
	trenchCreated := trench.TrenchCreated{
		ID:     createTrench.ID,
		SiteID: siteID,
		Name:   createTrench.Name,
	}

	expected := &trench.Trench{
		ID:     id,
		SiteID: siteID,
		Name:   createTrench.Name,
	}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("Store", expected).Return(nil)
	mockTrenchRepo.On("FindBySite", createTrench.SiteID).Return([]*trench.Trench{}, nil)

	mockSiteRepo := new(dmock.MockSiteRepository)
	mockSiteRepo.On("Find", createTrench.SiteID).Return(existingSite, nil)

	mockSender := new(emock.MockSender)
	mockSender.On("Send", "TrenchCreated", trenchCreated).Return(nil)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.Create(createTrench)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)

	mockSender.AssertExpectations(t)
}

func TestStoreToErrorWhenSiteDoesNotExist(t *testing.T) {
	id, _ := uuid.NewRandom()
	siteID, _ := uuid.NewRandom()
	createTrench := trench.CreateTrench{
		ID:     id,
		SiteID: siteID,
		Name:   "Test Name",
	}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("FindBySite", createTrench.SiteID).Return(nil, nil)
	mockTrenchRepo.On("Store", &trench.Trench{}).Return(nil)

	mockSiteRepo := new(dmock.MockSiteRepository)
	mockSiteRepo.On("Find", createTrench.SiteID).Return(nil, nil)

	mockSender := new(emock.MockSender)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.Create(createTrench)

	assert.EqualError(t, err, fmt.Sprintf("A site with the ID '%s' does not exist", siteID))
	assert.Nil(t, actual)
}

func TestStoreToErrorWhenTrenchNameExists(t *testing.T) {
	siteID, _ := uuid.NewRandom()
	existingSite := &site.Site{
		ID: siteID,
	}
	existingID, _ := uuid.NewRandom()
	existingTrench := &trench.Trench{
		ID:     existingID,
		SiteID: siteID,
		Name:   "Test Name",
	}

	newID, _ := uuid.NewRandom()
	createTrench := trench.CreateTrench{
		ID:     newID,
		SiteID: siteID,
		Name:   existingTrench.Name,
	}

	mockTrenchRepo := new(dmock.MockTrenchRepository)
	mockTrenchRepo.On("FindBySite", createTrench.SiteID).Return([]*trench.Trench{existingTrench}, nil)
	mockTrenchRepo.On("Store", &trench.Trench{}).Return(nil)

	mockSiteRepo := new(dmock.MockSiteRepository)
	mockSiteRepo.On("Find", createTrench.SiteID).Return(existingSite, nil)

	mockSender := new(emock.MockSender)

	sut := trench.NewService(mockTrenchRepo, mockSiteRepo, mockSender)

	actual, err := sut.Create(createTrench)

	assert.EqualError(t, err, fmt.Sprintf("A trench with the name '%s' already exists", createTrench.Name))
	assert.Nil(t, actual)
}
