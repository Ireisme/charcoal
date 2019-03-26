package cockroach

import (
	"log"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/pkg/site"
	"github.com/jmoiron/sqlx"
)

type repository struct {
	db sqlx.DB
}

func NewSiteRepository(db sqlx.DB) site.SiteRepository {
	return &repository{
		db: db,
	}
}

func (r *repository) Find(id uuid.UUID) (*site.Site, error) {
	site := site.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &site, nil
}

func (r *repository) FindAll() ([]*site.Site, error) {
	var sites []*site.Site

	if err := r.db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return sites, nil
}

func (r *repository) FindByName(name string) (*site.Site, error) {
	site := site.Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE name=$1", name); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &site, nil
}

func (r *repository) Store(site *site.Site) error {
	if _, err := r.db.Exec("UPSERT INTO sites (id, name, imageUrl) VALUES ($1, $2, $3)", site.ID, site.Name, site.ImageURL); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func (r *repository) Delete(id uuid.UUID) error {
	if _, err := r.db.Exec("DELETE FROM sites WHERE id=$1)", id); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
