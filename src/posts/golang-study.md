---
title: Goの勉強
published: 2020-08-23
---

# Goについて調べてみた
趣味でコードを書くのに、Scalaだとtoo muchすぎる  
TypeScriptはReactで使っているので別の言語に触ってみたい  
IDEの補完を効かせたいのでRuby,Pythonなどの動的型付け言語ではないもの  
と思ったので今？流行りのGoについて調べてみた  

## Goの特徴
- シンプルな言語仕様
- 並行プログラミング
- 豊富な標準ライブラリ
- 周辺ツール
- クロスコンパイル,シングルライブラリ

大体この辺がGoの特徴らしい

### シンプルな言語仕様
- スクリプト言語としての書きやすさ  
`冗長な記述`はできないように  
- 型のある言語の厳密さ  
`曖昧な記述`はできない  
- シンプル  
　少ない機能（例えば繰り返し処理はforのみでwhileやmap関数は標準としてはない)

### 並行プログラミング
#### ゴルーチン
軽量スレッドに近い   
go　とつけ関数を読み出す  
```go
  go f()
```
#### チャネル
ゴルーチン間のデータのやりとり  
安全にデータのやりとりをすることができる  

### 豊富な標準ライブラリ
|  ライブラリ  |  機能  |
| ---- | ---- |
|  fmt  |  書式の処理  |
|  net/http  |  HTTPサーバー  |
| archive, compress | zip, gzip |
| encoding | JSON, XML, CSV |
| html/template | HTMLテンプレート |
| os, path/filepath | ファイル操作 |

### 周辺ツール
- go toolに標準/準標準で提供されている

| コマンド | 機能 |
| ---- | ---- |
| go build | ビルドをする |
| go test | xx_test.goのテストを実行 |
| go doc, godock | ドキュメントを生成 |
| gofmt, goimports | フォーマッター |
| go vet, golint | チェッカー, リンター |
| gopls | ランゲージサーバーProtocloの実装 |

### クロスコンパイル・シングルバイナリ
`GOOS`と`GOARCH`をbuild時に環境変数として渡すことで可能  
```go
$ GOOS=windows GOARCH=386 go build
```

## とりあえずHello Worldをする
### Playground
Playgroundを使えばinstallする必要はない  
[https://play.golang.org/](https://play.golang.org/)
### GOのInstall
Macであれば`Homebrew`を使えば簡単
```bash
$ brew install go
```  

### Pathを通す(Bash)
```bash
$ echo "export GOPATH=$(go env GOPATH)" >> ~/.bash_profile
$ echo "export PATH=$PATH:$(go env GOPATH)/bin" >> ~/.bash_profile
```  

### Hello Worldしてみる
main.go
```go
package main // パッケージの定義

func main(){ // 関数の定義
    println("Hello World)"
}
```
コマンド  
```bash
go run main.go
```