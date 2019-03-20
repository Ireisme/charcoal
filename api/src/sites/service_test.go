package sites

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

func (r *MockRepository) Store(site *Site) error {
	args := r.Called(site)
	return args.Error(0)
}

func (r *MockRepository) Delete(id uuid.UUID) error {
	args := r.Called(id)
	return args.Error(0)
}

func TestFind(t *testing.T) {
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

func TestFindAll(t *testing.T) {
	expected := []*Site{&Site{}, &Site{}}

	mockRepo := new(MockRepository)
	mockRepo.On("FindAll").Return(expected, nil)

	sut := NewService(mockRepo)

	actual, err := sut.FindAll()

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}

func TestStore(t *testing.T) {
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
