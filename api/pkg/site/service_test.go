package site

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/google/uuid"

	"github.com/stretchr/testify/mock"
)

type MockRepository struct {
	mock.Mock
}

func (r *MockRepository) Find(id uuid.UUID) (*Site, error) {
	args := r.Called(id)
	return args.Get(0).(*Site), args.Error(1)
}

func (r *MockRepository) FindAll() ([]*Site, error) {
	args := r.Called()
	return args.Get(0).([]*Site), args.Error(1)
}

func (r *MockRepository) FindByName(name string) (*Site, error) {
	args := r.Called(name)
	return args.Get(0).(*Site), args.Error(1)
}

func (r *MockRepository) Store(site *Site) error {
	args := r.Called(site)
	return args.Error(0)
}

func (r *MockRepository) Delete(id uuid.UUID) error {
	args := r.Called(id)
	return args.Error(0)
}

func TestFindToReturnSite(t *testing.T) {
	id, _ := uuid.NewRandom()
	expected := &Site{
		ID: id,
	}

	mockRepo := new(MockRepository)
	mockRepo.On("Find", id).Return(expected, nil)

	sut := NewService(mockRepo)

	actual, err := sut.Find(id)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestFindAllToReturnSites(t *testing.T) {
	expected := []*Site{&Site{}, &Site{}}

	mockRepo := new(MockRepository)
	mockRepo.On("FindAll").Return(expected, nil)

	sut := NewService(mockRepo)

	actual, err := sut.FindAll()

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestStoreToReturnNewSite(t *testing.T) {
	id, _ := uuid.NewRandom()
	createSite := CreateSite{
		ID:       id,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}
	expected := &Site{
		ID:       id,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}

	mockRepo := new(MockRepository)
	mockRepo.On("Store", expected).Return(nil)

	sut := NewService(mockRepo)

	actual, err := sut.Create(createSite)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)

	mockRepo.AssertExpectations(t)
}

func TestStoreToErrorWhenSiteNameExists(t *testing.T) {
	existingID, _ := uuid.NewRandom()
	existingSite := &Site{
		ID:       existingID,
		Name:     "Test Name",
		ImageURL: "http://fake.url.com",
	}
	newID, _ := uuid.NewRandom()
	createSite := CreateSite{
		ID:       newID,
		Name:     existingSite.Name,
		ImageURL: "http://different.url.com",
	}

	mockRepo := new(MockRepository)
	mockRepo.On("FindByName", createSite.Name).Return(existingSite, nil)
	mockRepo.On("Store", &Site{}).Return(nil)

	sut := NewService(mockRepo)

	actual, err := sut.Create(createSite)

	assert.EqualError(t, err, "A site with the name 'Test Name' already exists")
	assert.Nil(t, actual)
}
