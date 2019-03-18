package main

import (
	"github.com/google/uuid"
	_ "github.com/lib/pq"
)

type Site struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}

func (site Site) Create(cmd *CreateSite) {
	site.ID = cmd.ID
	site.Name = cmd.Name
	site.ImageURL = cmd.ImageURL

	db := SiteDB{}
	db.Upsert(site)
}

type CreateSite struct {
	ID       uuid.UUID
	Name     string
	ImageURL string
}
