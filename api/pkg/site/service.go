package site

import (
	"fmt"

	"github.com/google/uuid"
)

type SiteService interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	Create(cmd CreateSite) (*Site, error)
}

type service struct {
	repo SiteRepository
}

func NewService(repo SiteRepository) SiteService {
	return &service{
		repo: repo,
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

	site := &Site{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	if err := s.repo.Store(site); err != nil {
		return nil, err
	}

	return site, nil
}

type CreateSite struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}