package controller

import (
	"go-open-api/db"
	"go-open-api/model"

	"github.com/labstack/echo/v4"
)

func GetUsers(c echo.Context) []model.User {
	users := []model.User{}
	db.DB.Find(&users)
	return users
}
