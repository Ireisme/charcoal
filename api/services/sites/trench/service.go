package trench

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/site"
)

//Service for interacting with Trenches
type Service interface {
	Find(id uuid.UUID) (*Trench, error)
	FindBySite(siteID uuid.UUID) ([]*Trench, error)
	Create(cmd CreateTrench) (*Trench, error)
}

type trenchService struct {
	trenchRepo Repository
	siteRepo   site.Repository
}

//NewService creates a new Service with dependencies
func NewService(t Repository, s site.Repository) Service {
	return &trenchService{
		trenchRepo: t,
		siteRepo:   s,
	}
}

func (s *trenchService) Find(id uuid.UUID) (*Trench, error) {
	return s.trenchRepo.Find(id)
}

func (s *trenchService) FindBySite(siteID uuid.UUID) ([]*Trench, error) {
	return s.trenchRepo.FindBySite(siteID)
}

func (s *trenchService) Create(cmd CreateTrench) (*Trench, error) {
	if existingSite, err := s.siteRepo.Find(cmd.SiteID); existingSite == nil {
		return nil, fmt.Errorf("A site with the ID '%s' does not exist", cmd.SiteID)
	} else if err != nil {
		return nil, err
	}

	if existingTrenches, err := s.trenchRepo.FindBySite(cmd.SiteID); existingTrenches != nil {
		for _, trench := range existingTrenches {
			if trench.Name == cmd.Name {
				return nil, fmt.Errorf("A trench with the name '%s' already exists", cmd.Name)
			}
		}
	} else if err != nil {
		return nil, err
	}

	trench := &Trench{
		ID:     cmd.ID,
		SiteID: cmd.SiteID,
		Name:   cmd.Name,
	}

	if err := s.trenchRepo.Store(trench); err != nil {
		return nil, err
	}

	return trench, nil
}
