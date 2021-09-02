package models

import (
	"log"
)

type Task struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	DueDate     string `json:"dueDate"`
	IsToday     bool   `json:"isToday"`
	IsImportant bool   `json:"isImportant"`
	IsCompleted bool   `json:"isCompleted"`
}

func AddTask(task *Task, username string) error {
	var taskId int64
	var err error

	if task.DueDate != "" {
		res, err := db.Exec("INSERT INTO Tasks(description, dueDate, isToday, isImportant, isCompleted) VALUES(?, ?, ?, ?, ?)",
			task.Description, task.DueDate, task.IsToday, task.IsImportant, task.IsCompleted)

		if err != nil {
			log.Println(err)
			return err
		}

		taskId, err = res.LastInsertId()
		if err != nil {
			log.Println(err)
			return err
		}
	} else {
		res, err := db.Exec("INSERT INTO Tasks(description, isToday, isImportant, isCompleted) VALUES(?, ?, ?, ?)",
			task.Description, task.IsToday, task.IsImportant, task.IsCompleted)
		if err != nil {
			log.Println(err)
			return err
		}

		taskId, err = res.LastInsertId()
		if err != nil {
			log.Println(err)
			return err
		}
	}

	_, err = db.Exec("INSERT INTO TasksByUser VALUES(?, ?)", taskId, username)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

// func (task *Task) UpdateTask() error {

// }

// func (task *Task) UpdateTaskImportance() error {

// }

// func (task *Task) UpdateTaskCompletion() error {

// }

// func (task *Task) DeleteTask() error {

// }
