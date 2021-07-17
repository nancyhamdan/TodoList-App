package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/nancyhamdan/TodoList-App/pkg/handlers"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("running on port:", port)

	mux := http.NewServeMux()

	mux.HandleFunc("/", handlers.IndexHandler)

	staticFilesServer := http.FileServer(http.Dir("../web/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", staticFilesServer))

	http.ListenAndServe(":"+port, mux)
}
