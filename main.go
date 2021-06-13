package main

import (
	"html/template"
	"net/http"
)

const (
	PORT = "8080"
)

var tmpl = template.Must(template.ParseFiles("templates/index.html"))

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl.Execute(w, nil)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", IndexHandler)

	http.ListenAndServe(":"+PORT, mux)
}
