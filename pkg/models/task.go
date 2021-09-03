package models

import (
	"database/sql"
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
	var err error
	var res sql.Result

	if task.DueDate != "" {
		res, err = db.Exec("INSERT INTO Tasks(description, dueDate, isToday, isImportant, isCompleted) VALUES(?, ?, ?, ?, ?)",
			task.Description, task.DueDate, task.IsToday, task.IsImportant, task.IsCompleted)
	} else {
		res, err = db.Exec("INSERT INTO Tasks(description, isToday, isImportant, isCompleted) VALUES(?, ?, ?, ?)",
			task.Description, task.IsToday, task.IsImportant, task.IsCompleted)
	}

	if err != nil {
		log.Println(err)
		return err
	}

	taskId, err := res.LastInsertId()
	if err != nil {
		log.Println(err)
		return err
	}

	_, err = db.Exec("INSERT INTO TasksByUser VALUES(?, ?)", taskId, username)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func UpdateTask(newTask *Task) error {
	var err error

	if newTask.DueDate != "" {
		_, err = db.Exec("UPDATE Tasks SET description = ?, dueDate = ?, isToday = ?, isImportant = ?, isCompleted = ? WHERE taskId = ?",
			newTask.Description, newTask.DueDate, newTask.IsToday, newTask.IsImportant, newTask.IsCompleted, newTask.ID)
	} else {
		_, err = db.Exec("UPDATE Tasks SET description = ?, dueDate = NULL, isToday = ?, isImportant = ?, isCompleted = ? WHERE taskId = ?",
			newTask.Description, newTask.IsToday, newTask.IsImportant, newTask.IsCompleted, newTask.ID)
	}

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (task *Task) UpdateTaskImportance() error {
	_, err := db.Exec("UPDATE Tasks SET isImportant = ? WHERE taskId = ?", task.IsImportant, task.ID)

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (task *Task) UpdateTaskCompletion() error {
	_, err := db.Exec("UPDATE Tasks SET isCompleted = ? WHERE taskId = ?", task.IsCompleted, task.ID)

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

// func (task *Task) DeleteTask() error {

// }
