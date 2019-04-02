package site_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/google/uuid"
	"github.com/ireisme/charcoal/services/sites/site"
)

func TestCreatePopulatesSite(t *testing.T) {
	id, _ := uuid.NewRandom()
	cmd := site.CreateSite{
		ID:       id,
		Name:     "New Site",
		ImageURL: "http://www.realsite.com/image.png",
	}

	expected := &site.Site{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	sut := &site.Site{}

	_, err := sut.Create(cmd)

	assert.Nil(t, err)
	assert.Equal(t, expected, sut)
}

func TestCreateReturnsEvent(t *testing.T) {
	id, _ := uuid.NewRandom()
	cmd := site.CreateSite{
		ID:       id,
		Name:     "New Site",
		ImageURL: "http://www.realsite.com/image.png",
	}

	expected := site.SiteCreated{
		ID:       cmd.ID,
		Name:     cmd.Name,
		ImageURL: cmd.ImageURL,
	}

	sut := &site.Site{}

	actual, err := sut.Create(cmd)

	assert.Nil(t, err)
	assert.Equal(t, expected, actual)
}
