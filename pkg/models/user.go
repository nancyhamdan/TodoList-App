package models

import (
	"errors"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/nancyhamdan/TodoList-App/pkg/auth"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var (
	ErrUsernameTaken    = errors.New("user exists, username is taken")
	ErrUserDoesNotExist = errors.New("user does not exist")
	ErrInvalidLogin     = errors.New("password is incorrect")
)

func CheckUserExists(user *User) (bool, error) {
	var numMatchingUsers int
	err := db.QueryRow("SELECT EXISTS (SELECT * FROM Users WHERE username = ?)", user.Username).Scan(&numMatchingUsers)
	if err != nil {
		log.Println(err)
		return false, err
	}

	if numMatchingUsers != 0 {
		return true, nil
	}

	return false, nil
}

func AddUser(user *User) error {
	// if user already exists or an error occurred, return
	userExists, err := CheckUserExists(user)
	if err != nil {
		log.Fatal(err)
		return err
	}

	if userExists != false {
		return ErrUsernameTaken
	}

	// encrypt password before storing it in the database
	hashedPassword, err := auth.EncryptPassword(user.Password)
	if err != nil {
		log.Println(err)
		return err
	}

	_, err = db.Exec("INSERT INTO Users(username, password) VALUES (?, ?)", user.Username, hashedPassword)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (user *User) Authenticate() error {
	// if user doesnt exist or an error occurred, return
	userExists, err := CheckUserExists(user)
	if err != nil {
		log.Fatal(err)
		return err
	}

	if userExists != true {
		return ErrUserDoesNotExist
	}

	hashedPassword, err := user.GetHashedPassword()
	if err != nil {
		log.Println(err)
		return err
	}

	err = auth.CompareHashPass(hashedPassword, user.Password)
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return ErrInvalidLogin
	}

	return err
}

func (user *User) GetHashedPassword() (string, error) {
	var hashedPassword string
	err := db.QueryRow("SELECT password FROM Users WHERE username = ?", user.Username).Scan(&hashedPassword)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return hashedPassword, nil
}

func GetTasks(username string, query string) ([]*Task, error) {
	res, err := db.Query(query, username)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer res.Close()

	var tasks []*Task

	var tmpDueDate interface{}
	for res.Next() {
		var task Task

		err := res.Scan(&task.ID, &task.Description, &tmpDueDate, &task.IsToday, &task.IsImportant, &task.IsCompleted)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		task.DueDate = fmt.Sprintf("%s", tmpDueDate)
		if task.DueDate == "%!s(<nil>)" {
			task.DueDate = ""
		}

		tasks = append(tasks, &task)
	}
	return tasks, nil
}

func GetAllTasks(username string) ([]*Task, error) {
	tasks, err := GetTasks(username, "SELECT Tasks.taskId, Tasks.description, Tasks.dueDate, Tasks.isToday, Tasks.isImportant, Tasks.isCompleted FROM Tasks INNER JOIN TasksByUser ON TasksByUser.taskId = Tasks.taskId WHERE TasksByUser.username = ?")
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return tasks, nil
}

func GetAllTodayTasks(username string) ([]*Task, error) {
	tasks, err := GetTasks(username, "SELECT Tasks.taskId, Tasks.description, Tasks.dueDate, Tasks.isToday, Tasks.isImportant, Tasks.isCompleted FROM Tasks INNER JOIN TasksByUser ON TasksByUser.taskId = Tasks.taskId WHERE TasksByUser.username = ? AND Tasks.isToday = TRUE")
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return tasks, nil
}

// func GetAllImportantTasks(username string) ([]*Task, error) {

// }

// func GetAllPlannedTasks(username string) ([]*Task, error) {

// }
