package sites

import (
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type SiteRepository interface {
	Find(id uuid.UUID) (*Site, error)
	FindAll() ([]*Site, error)
	Store(site *Site) error
	Delete(id uuid.UUID) error
}

type repository struct {
	db sqlx.DB
}

func NewRepository(db sqlx.DB) SiteRepository {
	return &repository{
		db: db,
	}
}

func (r *repository) Find(id uuid.UUID) (*Site, error) {
	site := Site{}

	if err := r.db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &site, nil
}

func (r *repository) FindAll() ([]*Site, error) {
	var sites []*Site

	if err := r.db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return sites, nil
}

func (r *repository) Store(site *Site) error {
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
