package mock

import (
	"github.com/stretchr/testify/mock"
)

type MockSender struct {
	mock.Mock
}

func (sender *MockSender) Send(subject string, event interface{}) error {
	args := sender.Called(subject, event)
	return args.Error(0)
}
