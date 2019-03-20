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
	connectionString string
}

func NewRepository(connection string) SiteRepository {
	return &repository{
		connectionString: connection,
	}
}

func (r *repository) Find(id uuid.UUID) (*Site, error) {
	db := connect(r.connectionString)
	defer db.Close()

	site := Site{}

	if err := db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return &site, nil
}

func (r *repository) FindAll() ([]*Site, error) {
	db := connect(r.connectionString)
	defer db.Close()

	var sites []*Site

	if err := db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return sites, nil
}

func (r *repository) Store(site *Site) error {
	db := connect(r.connectionString)
	defer db.Close()

	if _, err := db.Exec("UPSERT INTO sites (id, name, imageUrl) VALUES ($1, $2, $3)", site.ID, site.Name, site.ImageURL); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func (r *repository) Delete(id uuid.UUID) error {
	db := connect(r.connectionString)
	defer db.Close()

	if _, err := db.Exec("DELETE FROM sites WHERE id=$1)", id); err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}

func connect(connection string) *sqlx.DB {
	db, err := sqlx.Open("postgres", connection)
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}

	return db
}
