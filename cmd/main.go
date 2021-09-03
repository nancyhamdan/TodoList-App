package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/nancyhamdan/TodoList-App/pkg/middleware"
	"github.com/nancyhamdan/TodoList-App/pkg/models"

	"github.com/nancyhamdan/TodoList-App/pkg/handlers"
)

func createRouter() *http.ServeMux {
	r := http.NewServeMux()
	staticFilesServer := http.FileServer(http.Dir("../web/static"))

	r.HandleFunc("/signup", handlers.SignUpPostHandler)
	r.HandleFunc("/login", handlers.LoginPostHandler)
	r.Handle("/static/", http.StripPrefix("/static/", staticFilesServer))
	r.HandleFunc("/", middleware.AuthRequired(handlers.IndexHandler))
	r.HandleFunc("/add-task", middleware.AuthRequired(handlers.AddTaskHandler))
	r.HandleFunc("/update-task", handlers.UpdateTaskHandler)

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
