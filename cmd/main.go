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

	stylesServer := http.FileServer(http.Dir("../web/static/styles"))

	mux.HandleFunc("/", handlers.IndexHandler)

	mux.Handle("/static/styles/", http.StripPrefix("/static/styles", stylesServer))

	http.ListenAndServe(":"+port, mux)
}
