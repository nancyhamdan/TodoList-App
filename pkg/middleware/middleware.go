package middleware

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/nancyhamdan/TodoList-App/pkg/auth"
)

// AuthRequired is a middleware function that ensures a user is authenticated before using the API.
// A user is authenticated if they have a valid token cookie.
func AuthRequired(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Redirect(w, r, "/login", http.StatusFound)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		tokenStr := cookie.Value

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return auth.JwtSecretKey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid || !token.Valid {
				http.Redirect(w, r, "/login", http.StatusFound)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		handler.ServeHTTP(w, r)
	}
}
