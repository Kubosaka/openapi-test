package db

import (
	"log"

	"go-open-api/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func init() {
	dsn := "user:password@tcp(localhost:3306)/mydatabase?charset=utf8mb4"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(dsn + "database can't connect")
	}
	DB.AutoMigrate(&model.User{})
}
