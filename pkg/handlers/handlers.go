package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"text/template"

	"github.com/nancyhamdan/TodoList-App/pkg/auth"
	"github.com/nancyhamdan/TodoList-App/pkg/models"
	"github.com/nancyhamdan/TodoList-App/pkg/utils"
)

func SignUpPostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
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
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}

func LoginPostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
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
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	var tmpl = template.Must(template.ParseFiles("../web/templates/index.gohtml"))
	tmpl.Execute(w, nil)
}

func AddTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
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

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func UpdateTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
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
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func UpdateTaskImportanceHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var newTask models.Task

		err := json.NewDecoder(r.Body).Decode(&newTask)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = newTask.UpdateImportance()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func UpdateTaskCompletionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var newTask models.Task

		err := json.NewDecoder(r.Body).Decode(&newTask)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = newTask.UpdateCompletion()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func DeleteTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
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
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func GetTasksHandler(w http.ResponseWriter, r *http.Request, getTasksFunc models.GetTasksFunc) {
	if r.Method == http.MethodGet {
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

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(tasks)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func GetAllTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllTasks)
}

func GetAllTodayTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllTodayTasks)
}

func GetAllImportantTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllImportantTasks)
}

func GetAllPlannedTasksHandler(w http.ResponseWriter, r *http.Request) {
	GetTasksHandler(w, r, models.GetAllPlannedTasks)
}
