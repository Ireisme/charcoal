package trench

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/pkg/events"
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
	sender     events.EventSender
}

//NewService creates a new Service with dependencies
func NewService(trenchRepo Repository, siteRepo site.Repository, sender events.EventSender) Service {
	return &trenchService{
		trenchRepo: trenchRepo,
		siteRepo:   siteRepo,
		sender:     sender,
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

	trench := &Trench{}

	event, err := trench.Create(cmd)
	if err != nil {
		return nil, err
	}

	if err := s.trenchRepo.Store(trench); err != nil {
		return nil, err
	}

	s.sender.Send("TrenchCreated", event)

	return trench, nil
}
