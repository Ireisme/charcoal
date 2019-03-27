package cockroach

import (
	"log"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/domain"
	"github.com/jmoiron/sqlx"
)

type trenchRepository struct {
	db sqlx.DB
}

func NewTrenchRepository(db sqlx.DB) domain.TrenchRepository {
	return &trenchRepository{
		db: db,
	}
}

func (r *trenchRepository) Find(id uuid.UUID) (*domain.Trench, error) {
	trench := domain.Trench{}

	if err := r.db.Get(&trench, "SELECT * FROM charcoal.trenches WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &trench, nil
}

func (r *trenchRepository) FindBySite(siteID uuid.UUID) ([]*domain.Trench, error) {
	var trenches []*domain.Trench

	if err := r.db.Select(&trenches, "SELECT * FROM charcoal.trenches WHERE siteId=$1", siteID); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return trenches, nil
}

func (r *trenchRepository) Store(trench *domain.Trench) error {
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
