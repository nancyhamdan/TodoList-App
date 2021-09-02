package utils

import (
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/nancyhamdan/TodoList-App/pkg/auth"
)

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
