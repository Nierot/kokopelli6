package models

import "github.com/nierot/kokopelli6/db"

type Game struct {
	ID int `json:"id"`
	Slug string `json:"slug"`

	Title string `json:"title"`
	Writer string `json:"writer"`
	Content string `json:"content"`

	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

func GetGame(id int) (Game, error) {
	var game Game
	err := db.Get().Get(&game, "SELECT * FROM games WHERE id = ?", id)
	return game, err
}

func GetRandomGame() (Game, error) {
	var game Game
	err := db.Get().Get(&game, "SELECT * FROM games ORDER BY RAND() LIMIT 1")
	return game, err
}

func GetGames() ([]Game, error) {
	var games []Game
	err := db.Get().Select(&games, "SELECT * FROM games")
	return games, err
}