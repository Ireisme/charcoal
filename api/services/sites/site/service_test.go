package site_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/google/uuid"
	emock "github.com/ireisme/charcoal/pkg/events/mock"
	dmock "github.com/ireisme/charcoal/services/sites/data/mock"
	"github.com/ireisme/charcoal/services/sites/site"
)

func TestFindToReturnSite(t *testing.T) {
	id, _ := uuid.NewRandom()
	expected := &site.Site{
		ID: id,
	}

	mockRepo := new(dmock.MockSiteRepository)
	mockRepo.On("Find", id).Return(expected, nil)

	mockSender := new(emock.MockSender)

	sut := site.NewService(mockRepo, mockSender)

	actual, err := sut.Find(id)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestFindAllToReturnSites(t *testing.T) {
	expected := []*site.Site{&site.Site{}, &site.Site{}}

	mockRepo := new(dmock.MockSiteRepository)
	mockRepo.On("FindAll").Return(expected, nil)

	mockSender := new(emock.MockSender)

	sut := site.NewService(mockRepo, mockSender)

	actual, err := sut.FindAll()

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestStoreToReturnNewSite(t *testing.T) {
	id, _ := uuid.NewRandom()
	createSite := site.CreateSite{
		ID:       id,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}
	siteCreated := site.SiteCreated{
		ID:       createSite.ID,
		Name:     createSite.Name,
		ImageURL: createSite.ImageURL,
	}

	expected := &site.Site{
		ID:       id,
		Name:     createSite.Name,
		ImageURL: createSite.ImageURL,
	}

	mockRepo := new(dmock.MockSiteRepository)
	mockRepo.On("Store", expected).Return(nil)
	mockRepo.On("FindByName", createSite.Name).Return(nil, nil)

	mockSender := new(emock.MockSender)
	mockSender.On("Send", "SiteCreated", siteCreated).Return(nil)

	sut := site.NewService(mockRepo, mockSender)

	actual, err := sut.Create(createSite)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)

	mockRepo.AssertExpectations(t)
}

func TestStoreToSendEvent(t *testing.T) {
	id, _ := uuid.NewRandom()
	createSite := site.CreateSite{
		ID:       id,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}
	siteCreated := site.SiteCreated{
		ID:       createSite.ID,
		Name:     createSite.Name,
		ImageURL: createSite.ImageURL,
	}

	expected := &site.Site{
		ID:       id,
		Name:     createSite.Name,
		ImageURL: createSite.ImageURL,
	}

	mockRepo := new(dmock.MockSiteRepository)
	mockRepo.On("Store", expected).Return(nil)
	mockRepo.On("FindByName", createSite.Name).Return(nil, nil)

	mockSender := new(emock.MockSender)
	mockSender.On("Send", "SiteCreated", siteCreated).Return(nil)

	sut := site.NewService(mockRepo, mockSender)

	actual, err := sut.Create(createSite)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)

	mockSender.AssertExpectations(t)
}

func TestStoreToErrorWhenSiteNameExists(t *testing.T) {
	existingID, _ := uuid.NewRandom()
	existingSite := &site.Site{
		ID:       existingID,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}
	newID, _ := uuid.NewRandom()
	createSite := site.CreateSite{
		ID:       newID,
		Name:     existingSite.Name,
		ImageURL: "http://different.url.com",
	}

	mockRepo := new(dmock.MockSiteRepository)
	mockRepo.On("FindByName", createSite.Name).Return(existingSite, nil)
	mockRepo.On("Store", &site.Site{}).Return(nil)

	mockSender := new(emock.MockSender)

	sut := site.NewService(mockRepo, mockSender)

	actual, err := sut.Create(createSite)

	assert.EqualError(t, err, "A site with the name 'Test Name' already exists")
	assert.Nil(t, actual)
}
