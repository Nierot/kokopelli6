package db

import (
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
)

var _db *sqlx.DB

func Get() *sqlx.DB {
	if _db == nil {
		panic("database is nil")
	}

	return _db
}

func Init() {
	connString := viper.GetString("DatabaseURL")

	db, err := sqlx.Connect("mysql", connString) 
	if err != nil {
		panic(err)
	}

	_db = db
}