package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/nancyhamdan/TodoList-App/pkg/auth"
	"github.com/nancyhamdan/TodoList-App/pkg/models"
	"github.com/nancyhamdan/TodoList-App/pkg/utils"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/tasks/today", http.StatusFound)
}

func SignUpGetHandler(w http.ResponseWriter, r *http.Request) {
	utils.ExecTemplate(w, "signup", nil)
}

func SignUpPostHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	var user models.User
	user.Username = r.PostForm.Get("username")
	user.Password = r.PostForm.Get("password")

	err := models.AddUser(&user)
	if err == models.ErrUsernameTaken {
		utils.ExecTemplate(w, "signup", "Username already exists")
		return
	} else if err != nil {
		log.Println(err)
		utils.ExecTemplate(w, "signup", "Sorry, something went wrong please try again")
		return
	}

	http.Redirect(w, r, "/login", http.StatusFound)
}

func LoginGetHandler(w http.ResponseWriter, r *http.Request) {
	utils.ExecTemplate(w, "login", nil)
}

func LoginPostHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	var user models.User
	user.Username = r.PostForm.Get("username")
	user.Password = r.PostForm.Get("password")

	err := user.Authenticate()
	if err != nil {
		switch err {
		case models.ErrUserDoesNotExist:
			utils.ExecTemplate(w, "login", "Username does not exist")
			return
		case models.ErrInvalidLogin:
			utils.ExecTemplate(w, "login", "Invalid login, wrong username or password")
			return
		default:
			log.Println(err)
			utils.ExecTemplate(w, "login", "Sorry, something went wrong please try again")
			return
		}
	}

	// if user authenticated fine, create token cookie
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

	http.Redirect(w, r, "/tasks/today", http.StatusFound)
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	// delete cookie on logout
	http.SetCookie(w, &http.Cookie{
		Name:   "token",
		MaxAge: -1,
	})

	http.Redirect(w, r, "/login", http.StatusFound)
}

func AddTaskHandler(w http.ResponseWriter, r *http.Request) {
	var task models.Task

	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// get username from cookie
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

	// add task to the database and return the id created for the task
	taskId, err := models.AddTask(&task, username)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	taskIdStr := []byte(strconv.Itoa(int(taskId)))
	w.WriteHeader(http.StatusOK)
	w.Write(taskIdStr)
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

// GetTasksHandler is a general handler for getting tasks of a user.
// GetTasksHandler is used by all get tasks handlers as they all do the same operations
// but differ in the GetTasksFunc and template they use.
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

	utils.ExecTemplate(w, tmplToExec, tasks)
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
