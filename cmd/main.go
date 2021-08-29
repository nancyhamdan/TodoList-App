package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/nancyhamdan/TodoList-App/pkg/models"

	"github.com/nancyhamdan/TodoList-App/pkg/handlers"
)

func createRouter() *http.ServeMux {
	r := http.NewServeMux()
	staticFilesServer := http.FileServer(http.Dir("../web/static"))

	r.HandleFunc("/", handlers.IndexHandler)
	r.Handle("/static/", http.StripPrefix("/static/", staticFilesServer))
	r.HandleFunc("/signup", handlers.SignUpPostHandler)

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
