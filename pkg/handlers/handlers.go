package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"text/template"

	"github.com/nancyhamdan/TodoList-App/pkg/auth"
	"github.com/nancyhamdan/TodoList-App/pkg/models"
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
