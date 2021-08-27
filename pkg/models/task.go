package models

type Task struct {
	TaskId      int
	Description string
	DueDate     string
	IsImportant bool
	IsCompleted bool
	IsToday     bool
}
