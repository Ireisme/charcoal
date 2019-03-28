package cockroach

import (
	"log"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/trench"
	"github.com/jmoiron/sqlx"
)

type trenchRepository struct {
	db sqlx.DB
}

//NewTrenchRepository creates a new repository for Trenches using CockroachDB
func NewTrenchRepository(db sqlx.DB) trench.Repository {
	return &trenchRepository{
		db: db,
	}
}

func (r *trenchRepository) Find(id uuid.UUID) (*trench.Trench, error) {
	trench := trench.Trench{}

	if err := r.db.Get(&trench, "SELECT * FROM charcoal.trenches WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &trench, nil
}

func (r *trenchRepository) FindBySite(siteID uuid.UUID) ([]*trench.Trench, error) {
	var trenches []*trench.Trench

	if err := r.db.Select(&trenches, "SELECT * FROM charcoal.trenches WHERE siteId=$1", siteID); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return trenches, nil
}

func (r *trenchRepository) Store(trench *trench.Trench) error {
	if _, err := r.db.Exec("UPSERT INTO trenches (id, siteId, name) VALUES ($1, $2, $3)", trench.ID, trench.SiteID, trench.Name); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func (r *trenchRepository) Delete(id uuid.UUID) error {
	if _, err := r.db.Exec("DELETE FROM trenches WHERE id=$1)", id); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}
