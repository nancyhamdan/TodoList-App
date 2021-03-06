package models

import (
	"database/sql"
	"log"
	"time"
)

type Task struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	DueDate     string `json:"dueDate"`
	IsToday     bool   `json:"isToday"`
	IsImportant bool   `json:"isImportant"`
	IsCompleted bool   `json:"isCompleted"`
}

func AddTask(task *Task, username string) (int64, error) {
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
		return 0, err
	}

	taskId, err := res.LastInsertId()
	if err != nil {
		log.Println(err)
		return 0, err
	}

	_, err = db.Exec("INSERT INTO TasksByUser VALUES(?, ?)", taskId, username)
	if err != nil {
		log.Println(err)
		return 0, err
	}

	return taskId, nil
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

func (task *Task) Delete() error {
	_, err := db.Exec("DELETE FROM TasksByUser WHERE taskId = ?", task.ID)
	if err != nil {
		log.Println(err)
		return err
	}

	_, err = db.Exec("DELETE FROM Tasks WHERE taskId = ?", task.ID)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (task *Task) GetFormattedDueDate() string {
	date, err := time.Parse("2006-01-02", task.DueDate)
	if err != nil {
		log.Println(err)
		return ""
	}
	dateStr := date.Format("Mon, 02 Jan 2006")

	return dateStr
}
