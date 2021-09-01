package auth

import (
	"log"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecretKey = []byte("ijofwqhiufreq")

func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
	})

	tokenString, err := token.SignedString(jwtSecretKey)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return tokenString, nil
}

func EncryptPassword(password string) ([]byte, error) {
	cost := bcrypt.DefaultCost
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return hashedPassword, nil
}

func CompareHashPass(hashedPassword string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return err
	}
	return nil
}
