package main

import "github.com/spf13/viper"

func main() {
	conf()
}

func conf() {
	viper.SetDefault("DatabaseURL", "user:password@(host:port)/database")
	viper.SetDefault("ListenPort", 3000)

	err := viper.SafeWriteConfig()

	if err != nil {
		panic(err)
	}
}