package domain

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/pkg/events"
)

// SiteService for interacting with Sites
type SiteService interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	Create(cmd CreateSite) (*Site, error)
}

type siteService struct {
	repo   SiteRepository
	sender events.EventSender
}

//NewSiteService creates a new SiteService with dependencies
func NewSiteService(repo SiteRepository, sender events.EventSender) SiteService {
	return &siteService{
		repo:   repo,
		sender: sender,
	}
}

func (s *siteService) Find(id uuid.UUID) (*Site, error) {
	return s.repo.Find(id)
}

func (s *siteService) FindAll() ([]*Site, error) {
	return s.repo.FindAll()
}

func (s *siteService) Create(cmd CreateSite) (*Site, error) {
	if existingSite, err := s.repo.FindByName(cmd.Name); existingSite != nil {
		return nil, fmt.Errorf("A site with the name '%s' already exists", cmd.Name)
	} else if err != nil {
		return nil, err
	}

	site, event, err := Create(cmd)
	if err != nil {
		return nil, err
	}

	if err := s.repo.Store(&site); err != nil {
		return nil, err
	}

	s.sender.Send("SiteCreated", event)

	return &site, nil
}
