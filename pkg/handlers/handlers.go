package handlers

import (
	"net/http"
	"text/template"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	var tmpl = template.Must(template.ParseFiles("../web/templates/index.html"))
	tmpl.Execute(w, nil)
}
