package main

import (
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type SiteDB struct{}

func (s *SiteDB) Get(id uuid.UUID) Site {
	db := connect()
	defer db.Close()

	site := Site{}

	if err := db.Get(&site, "SELECT * FROM charcoal.sites WHERE id=$1", id); err != nil {
		log.Fatal(err)
	}

	return site
}

func (s SiteDB) GetAll() []Site {
	db := connect()
	defer db.Close()

	sites := []Site{}

	if err := db.Select(&sites, "SELECT * FROM charcoal.sites"); err != nil {
		log.Fatal(err)
	}

	return sites
}

func (s *SiteDB) Upsert(site Site) {
	db := connect()
	defer db.Close()

	if _, err := db.Exec("UPSERT INTO sites (id, name, imageUrl) VALUES ($1, $2, $3)", site.ID, site.Name, site.ImageURL); err != nil {
		log.Fatal(err)
	}
}

func connect() *sqlx.DB {
	db, err := sqlx.Open("postgres",
		"postgresql://charcoaluser@localhost:26257/charcoal?sslmode=disable")
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}

	return db
}
