package models

type Task struct {
	ID          int
	Description string
	DueDate     string
	IsToday     bool
	IsImportant bool
	IsCompleted bool
}

// func NewTask() (*Task, error) {

// }

// func (task *Task) UpdateTask() error {

// }

// func (task *Task) UpdateTaskImportance() error {

// }

// func (task *Task) UpdateTaskCompletion() error {

// }

// func (task *Task) DeleteTask() error {

// }
