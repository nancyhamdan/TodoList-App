package utils

import (
	"log"
	"net/http"

	"html/template"

	"github.com/dgrijalva/jwt-go"
	"github.com/nancyhamdan/TodoList-App/pkg/auth"
)

// GetCurrentUsername returns username stored in token cookie
func GetCurrentUsername(cookie *http.Cookie) (string, error) {
	tokenString := cookie.Value
	claims := &jwt.MapClaims{}

	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return auth.JwtSecretKey, nil
	})
	if err != nil {
		log.Panicln(err)
		return "", err
	}

	return (*claims)["username"].(string), nil
}

var templates *template.Template

func LoadTemplates(pattern string) {
	templates = template.Must(template.ParseGlob(pattern))
}

func ExecTemplate(w http.ResponseWriter, tmplName string, data interface{}) {
	templates.ExecuteTemplate(w, tmplName, data)
}
