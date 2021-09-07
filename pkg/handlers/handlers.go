package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"text/template"

	"github.com/nancyhamdan/TodoList-App/pkg/auth"
	"github.com/nancyhamdan/TodoList-App/pkg/models"
	"github.com/nancyhamdan/TodoList-App/pkg/utils"
)

func SignUpGetHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("../web/templates/signup.gohtml"))
	tmpl.Execute(w, nil)
}

func SignUpPostHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = models.AddUser(&user)
	if err == models.ErrUsernameTaken {
		w.WriteHeader(http.StatusBadRequest)
		// return template saying username is taken
	} else if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	// http.Redirect(w, r, "/login", http.StatusFound)
}

func LoginGetHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("../web/templates/login.html"))
	tmpl.Execute(w, nil)
}

func LoginPostHandler(w http.ResponseWriter, r *http.Request) {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = user.Authenticate()
	if err != nil {
		switch err {
		case models.ErrUserDoesNotExist:
			w.WriteHeader(http.StatusBadRequest)
			return
		case models.ErrInvalidLogin:
			w.WriteHeader(http.StatusBadRequest)
			return
		default:
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	token, err := auth.CreateToken(user.Username)
	if err != err {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:  "token",
		Value: token,
	})

	http.Redirect(w, r, "/", http.StatusFound)
}

func AddTaskHandler(w http.ResponseWriter, r *http.Request) {
	var task models.Task

	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	cookie, err := r.Cookie("token")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	username, err := utils.GetCurrentUsername(cookie)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = models.AddTask(&task, username)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	var newTask models.Task

	err := json.NewDecoder(r.Body).Decode(&newTask)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = models.UpdateTask(&newTask)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func DeleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	var task models.Task

	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = task.Delete()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func GetTasksHandler(w http.ResponseWriter, r *http.Request, getTasksFunc models.GetTasksFunc, tmplToExec string) {
	cookie, err := r.Cookie("token")
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	username, err := utils.GetCurrentUsername(cookie)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	tasks, err := getTasksFunc(username)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	tmplPath := fmt.Sprintf("../web/templates/%s.gohtml", tmplToExec)

	tmpl := template.Must(template.ParseFiles(tmplPath, "../web/templates/task.gohtml"))
	err = tmpl.ExecuteTemplate(w, tmplToExec, tasks)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func GetAllTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllTasks, "alltasks")
}

func GetAllTodayTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllTodayTasks, "today")
}

func GetAllImportantTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllImportantTasks, "important")
}

func GetAllPlannedTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllPlannedTasks, "planned")
}
