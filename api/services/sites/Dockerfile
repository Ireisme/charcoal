FROM golang:1.11-alpine3.8

# install git
RUN apk --update add \
	git openssl \
	&& rm /var/cache/apk/*

WORKDIR /

ADD . /

RUN go get -d -v ./...

CMD ["go", "run", "."]

EXPOSE 3000