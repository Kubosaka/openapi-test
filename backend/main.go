package main

import (
	"fmt"
	"go-open-api/controller"
	"go-open-api/db"
	oapi "go-open-api/generated"
	"net/http"

	oapiMiddleware "github.com/deepmap/oapi-codegen/pkg/middleware"

	"context"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/redis/go-redis/v9"
)

type apiController struct{}

// OpenAPI で定義された (GET /users) の実装
func (a apiController) GetUser(ctx echo.Context) error {
	// OpenApi で生成された User モデルを使ってレスポンスを返す
	users := controller.GetUsers(ctx)
	user := users[0]
	return ctx.JSON(http.StatusOK, &oapi.User{
		Id:   int(user.ID),
		Name: user.Name,
	})
}

// OpenAPI で定義された (POST /users) の実装
func (a apiController) PostUser(ctx echo.Context) error {
	// リクエストボディを構造体にバインド
	user := &oapi.User{}
	ctx.Bind(&user)
	fmt.Println(user)
	// 200 ステータスのみ返す
	return ctx.NoContent(http.StatusOK)
}

func main() {
	var ctx = context.Background()

	// Echo のインスタンス作成
	e := echo.New()

	// DB 接続
	db, _ := db.DB.DB()
	defer db.Close()

	// redis 接続
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
		PoolSize: 1000,
	})

	ret, err := rdb.Get(ctx, "sample_key_1").Result()
	if err != nil {
		println("Error: ", err)
		return
	}

	fmt.Println(ret)

	// OpenApi 仕様に沿ったリクエストかバリデーションをするミドルウェアを設定
	swagger, err := oapi.GetSwagger()
	if err != nil {
		panic(err)
	}
	e.Use(oapiMiddleware.OapiRequestValidator(swagger))

	// CORSの設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		// アクセスを許可するオリジンを指定
		AllowOrigins:     []string{"http://localhost:3000"},
		// アクセスを許可するメソッドを指定
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		// アクセスを許可するヘッダーを指定
		AllowHeaders:     []string{echo.HeaderContentType, echo.HeaderAuthorization, "X-CSRF-Header"},
		// cookieを使う場合はtrue。後々cookieを使うつもりなのでtrueに。
		AllowCredentials: true,
	}))

	// ロガーのミドルウェアを設定
	e.Use(middleware.Logger())
	// APIがエラーで落ちてもリカバーするミドルウェアを設定
	e.Use(middleware.Recover())

	// OpenAPI の仕様を満たす構造体をハンドラーとして登録する
	api := apiController{}
	oapi.RegisterHandlers(e, api)

	// 8080ポートで Echo サーバ起動
	e.Logger.Fatal(e.Start(":8080"))

}

