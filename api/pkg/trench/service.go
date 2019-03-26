package trench

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/pkg/site"
)

type TrenchService interface {
	Find(id uuid.UUID) (*Trench, error)
	FindBySite(siteID uuid.UUID) ([]*Trench, error)
	Create(cmd CreateTrench) (*Trench, error)
}

type service struct {
	trenchRepo TrenchRepository
	siteRepo   site.SiteRepository
}

func NewService(t TrenchRepository, s site.SiteRepository) TrenchService {
	return &service{
		trenchRepo: t,
		siteRepo:   s,
	}
}

func (s *service) Find(id uuid.UUID) (*Trench, error) {
	return s.trenchRepo.Find(id)
}

func (s *service) FindBySite(siteID uuid.UUID) ([]*Trench, error) {
	return s.trenchRepo.FindBySite(siteID)
}

func (s *service) Create(cmd CreateTrench) (*Trench, error) {
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

type CreateTrench struct {
	ID     uuid.UUID
	SiteID uuid.UUID
	Name   string
}
