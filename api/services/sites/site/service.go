package site

import (
	"fmt"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/pkg/events"
)

//Service for interacting with Sites
type Service interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	Create(cmd CreateSite) (*Site, error)
}

type service struct {
	repo   Repository
	sender events.EventSender
}

//NewService creates a new Service with dependencies
func NewService(repo Repository, sender events.EventSender) Service {
	return &service{
		repo:   repo,
		sender: sender,
	}
}

func (s *service) Find(id uuid.UUID) (*Site, error) {
	return s.repo.Find(id)
}

func (s *service) FindAll() ([]*Site, error) {
	return s.repo.FindAll()
}

func (s *service) Create(cmd CreateSite) (*Site, error) {
	if existingSite, err := s.repo.FindByName(cmd.Name); existingSite != nil {
		return nil, fmt.Errorf("A site with the name '%s' already exists", cmd.Name)
	} else if err != nil {
		return nil, err
	}

	site := &Site{}

	event, err := site.Create(cmd)
	if err != nil {
		return nil, err
	}

	if err := s.repo.Store(site); err != nil {
		return nil, err
	}

	s.sender.Send("SiteCreated", event)

	return site, nil
}
