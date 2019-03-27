package cockroach

import (
	"database/sql"
	"log"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/domain"
	"github.com/jmoiron/sqlx"
)

type siteRepository struct {
	db sqlx.DB
}

func NewSiteRepository(db sqlx.DB) domain.SiteRepository {
	return &siteRepository{
		db: db,
	}
}

func (r *siteRepository) Find(id uuid.UUID) (*domain.Site, error) {
	site := domain.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &site, nil
}

func (r *siteRepository) FindAll() ([]*domain.Site, error) {
	var sites []*domain.Site

	if err := r.db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return sites, nil
}

func (r *siteRepository) FindByName(name string) (*domain.Site, error) {
	site := domain.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE name=$1", name); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		log.Print(err)
		return nil, err
	}

	return &site, nil
}

func (r *siteRepository) Store(site *domain.Site) error {
	if _, err := r.db.Exec("UPSERT INTO sites (id, name, imageUrl) VALUES ($1, $2, $3)", site.ID, site.Name, site.ImageURL); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func (r *siteRepository) Delete(id uuid.UUID) error {
	if _, err := r.db.Exec("DELETE FROM sites WHERE id=$1)", id); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
