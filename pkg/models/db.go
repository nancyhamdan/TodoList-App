package models

import (
	"database/sql"
	"encoding/json"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type config struct {
	DbUser string `json:"MysqlUsername"`
	DbPass string `json:"MysqlPassword"`
	DbHost string `json:"MysqlHost"`
	DbPort string `json:"MysqlPort"`
	DbName string `json:"MysqlDbname"`
}

var cfg config

func LoadConfig(filename string) {
	configFile, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer configFile.Close()

	if err = json.NewDecoder(configFile).Decode(&cfg); err != nil {
		log.Fatal(err)
	}
}

func InitDb() {
	LoadConfig("../config.json")
	db, err := sql.Open("mysql", cfg.DbUser+":"+cfg.DbPass+"@("+cfg.DbHost+":"+cfg.DbPort+")/"+cfg.DbName)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
}
