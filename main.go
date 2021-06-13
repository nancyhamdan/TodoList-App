package main

import (
	"html/template"
	"net/http"
	"os"
)

var tmpl = template.Must(template.ParseFiles("templates/index.html"))

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl.Execute(w, nil)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	mux := http.NewServeMux()
	stylesServer := http.FileServer(http.Dir("static/styles"))

	mux.HandleFunc("/", IndexHandler)
	mux.Handle("/static/styles/", http.StripPrefix("/static/styles/", stylesServer))
	http.ListenAndServe(":"+port, mux)
}
