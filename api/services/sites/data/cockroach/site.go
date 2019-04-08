package cockroach

import (
	"database/sql"
	"log"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/site"
	"github.com/jmoiron/sqlx"
)

type siteRepository struct {
	db sqlx.DB
}

//NewSiteRepository creates a new repository for Sites using CockroachDB
func NewSiteRepository(db sqlx.DB) site.Repository {
	return &siteRepository{
		db: db,
	}
}

func (r *siteRepository) Find(id uuid.UUID) (*site.Site, error) {
	site := site.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Output(2, err.Error())
		return nil, err
	}

	return &site, nil
}

func (r *siteRepository) FindAll() ([]*site.Site, error) {
	var sites []*site.Site

	if err := r.db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Output(2, err.Error())
		return nil, err
	}

	return sites, nil
}

func (r *siteRepository) FindByName(name string) (*site.Site, error) {
	site := site.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE name=$1", name); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		log.Output(2, err.Error())
		return nil, err
	}

	return &site, nil
}

func (r *siteRepository) Store(site *site.Site) error {
	if _, err := r.db.Exec("UPSERT INTO sites (id, name, imageUrl) VALUES ($1, $2, $3)", site.ID, site.Name, site.ImageURL); err != nil {
		log.Output(2, err.Error())
		return err
	}

	return nil
}

func (r *siteRepository) Delete(id uuid.UUID) error {
	if _, err := r.db.Exec("DELETE FROM sites WHERE id=$1)", id); err != nil {
		log.Output(2, err.Error())
		return err
	}

	return nil
}
