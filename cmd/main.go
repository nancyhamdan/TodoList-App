package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/nancyhamdan/TodoList-App/pkg/middleware"
	"github.com/nancyhamdan/TodoList-App/pkg/models"

	"github.com/gorilla/mux"
	"github.com/nancyhamdan/TodoList-App/pkg/handlers"
)

func createRouter() *mux.Router {
	r := mux.NewRouter()
	staticFilesServer := http.FileServer(http.Dir("../web/static"))

	r.HandleFunc("/signup", handlers.SignUpPostHandler).Methods("POST")
	r.HandleFunc("/login", handlers.LoginPostHandler).Methods("POST")
	r.Handle("/static/", http.StripPrefix("/static/", staticFilesServer))
	r.HandleFunc("/", middleware.AuthRequired(handlers.IndexHandler)).Methods("GET")
	r.HandleFunc("/tasks", middleware.AuthRequired(handlers.AddTaskHandler)).Methods("POST")
	r.HandleFunc("/tasks/{id}", middleware.AuthRequired(handlers.UpdateTaskHandler)).Methods("PUT")
	r.HandleFunc("/tasks/{id}", middleware.AuthRequired(handlers.DeleteTaskHandler)).Methods("DELETE")
	r.HandleFunc("/tasks", middleware.AuthRequired(handlers.GetAllTasksHandler)).Methods("GET")
	r.HandleFunc("/tasks/today", middleware.AuthRequired(handlers.GetAllTodayTasksHandler)).Methods("GET")
	r.HandleFunc("/tasks/important", middleware.AuthRequired(handlers.GetAllImportantTasksHandler)).Methods("GET")
	r.HandleFunc("/tasks/planned", middleware.AuthRequired(handlers.GetAllPlannedTasksHandler)).Methods("GET")

	return r
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("running on port:", port)

	models.InitDb()
	router := createRouter()
	http.ListenAndServe(":"+port, router)
}
