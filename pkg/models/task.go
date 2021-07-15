package models

type Task struct {
	taskId      int
	description string
	dueDate     string
	isImportant bool
	isCompleted bool
	isToday     bool
}
