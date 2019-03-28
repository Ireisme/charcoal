package mock

import (
	"github.com/stretchr/testify/mock"
)

type MockReceiver struct {
	mock.Mock
}

func (receiver *MockReceiver) Receieve(subject string, event interface{}, subscription func(event interface{})) error {
	args := receiver.Called(subject, event, subscription)
	return args.Error(0)
}
