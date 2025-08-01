package db


import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Init() {
	var err error
	connStr := "postgres://postgres:Haarsh@123@localhost:5432/mydb?sslmode=disable"

	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Database connection failed: ", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Database ping failed: ", err)
	}
	log.Println("Connected to PostgreSQL database")
}
