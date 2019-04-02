package mock

import (
	"github.com/google/uuid"

	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/stretchr/testify/mock"
)

type MockSiteRepository struct {
	mock.Mock
}

func (r *MockSiteRepository) Find(id uuid.UUID) (*site.Site, error) {
	args := r.Called(id)
	return args.Get(0).(*site.Site), args.Error(1)
}

func (r *MockSiteRepository) FindAll() ([]*site.Site, error) {
	args := r.Called()
	return args.Get(0).([]*site.Site), args.Error(1)
}

func (r *MockSiteRepository) FindByName(name string) (*site.Site, error) {
	args := r.Called(name)
	siteParam := args.Get(0)
	if siteParam == nil {
		return nil, args.Error(1)
	}

	return siteParam.(*site.Site), args.Error(1)
}

func (r *MockSiteRepository) Store(site *site.Site) error {
	args := r.Called(site)
	return args.Error(0)
}

func (r *MockSiteRepository) Delete(id uuid.UUID) error {
	args := r.Called(id)
	return args.Error(0)
}
