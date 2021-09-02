package middleware

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/nancyhamdan/TodoList-App/pkg/auth"
)

func AuthRequired(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
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
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		handler.ServeHTTP(w, r)
	}
}
