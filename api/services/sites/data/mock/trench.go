package mock

import (
	"github.com/google/uuid"

	"github.com/ireisme/charcoal/services/sites/trench"
	"github.com/stretchr/testify/mock"
)

type MockTrenchRepository struct {
	mock.Mock
}

func (r *MockTrenchRepository) Find(id uuid.UUID) (*trench.Trench, error) {
	args := r.Called(id)
	return args.Get(0).(*trench.Trench), args.Error(1)
}

func (r *MockTrenchRepository) FindAll() ([]*trench.Trench, error) {
	args := r.Called()
	return args.Get(0).([]*trench.Trench), args.Error(1)
}

func (r *MockTrenchRepository) FindBySite(siteID uuid.UUID) ([]*trench.Trench, error) {
	args := r.Called(siteID)
	trenchParam := args.Get(0)

	return trenchParam.([]*trench.Trench), args.Error(1)
}

func (r *MockTrenchRepository) Store(trench *trench.Trench) error {
	args := r.Called(trench)
	return args.Error(0)
}

func (r *MockTrenchRepository) Delete(id uuid.UUID) error {
	args := r.Called(id)
	return args.Error(0)
}
