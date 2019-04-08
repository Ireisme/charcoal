CREATE TABLE sites (
	id UUID NOT NULL,
	name STRING NULL,
	imageurl STRING NULL,
	CONSTRAINT "primary" PRIMARY KEY (id ASC),
	FAMILY "primary" (id, name, imageurl)
)

CREATE TABLE charcoal.trenches (
	id UUID NOT NULL,
  siteid UUID NOT NULL REFERENCES charcoal.sites (id),
	name STRING NULL,
	CONSTRAINT "primary" PRIMARY KEY (id ASC),
	FAMILY "primary" (id, siteid, name)
)