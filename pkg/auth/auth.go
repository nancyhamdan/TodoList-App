package auth

import (
	"log"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var JwtSecretKey = []byte("ijofwqhiufreq")

// CreateToken creates a JWT with username as the payload (claims).
func CreateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
	})

	tokenString, err := token.SignedString(JwtSecretKey)
	if err != nil {
		log.Println(err)
		return "", err
	}
	return tokenString, nil
}

// EncryptPassword encrypts a password using bcrypt hashing
func EncryptPassword(password string) ([]byte, error) {
	cost := bcrypt.DefaultCost
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	return hashedPassword, nil
}

// CompareHashPass compares a hashed password with a plaintext password
func CompareHashPass(hashedPassword string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return err
	}
	return nil
}
