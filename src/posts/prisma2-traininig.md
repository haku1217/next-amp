---
title: Prisma2を素振りしてみた
published: 2020-11-22
---

## Prisma2 とは

Prisma2 とは Node.js,TypeScript を使った ORM
Prisma1 の時はデータモデルを定義して PrismaServer というサーバーを立てて、GraphQL API としても実行できるという
結構「全部入り」なものでしたが

Prisma2 は PrismaServer が廃止され、GraphQL の API とは切り離されています。

GraphQL と切り離されたことでかなり柔軟に使えるライブラリになったのではないかなって思います。

## Prisma の構成要素

Prisma は 3 つの部品で構成されています。

- Prisma Client
- Prisma Migrate
- Prisma Studio

Prisma Client はクエリビルダー、Prisma Migrate はマイグレーションツール
Prisma Studio はデータの表示、編集の GUI ツール
で今回は、Prisma Migrate と Prisma Client を利用します。

## 使った技術・環境

- Node.js(TypeScript) v10.13
- npm v6.14.8
- PostgreSQL v10
- Docker Compose

### Docker 環境を作る

ローカルで DB 環境を作って汚したくなかったので Docker を使いました。
[こちらの記事を参考にしました](https://qiita.com/asylum/items/17e655d8369c19affbc3)
`docker-compose.yml`

```yml
version: '3'
services:
  appdb:
    image: postgres:10
    container_name: 'appdb'
    environment:
      - POSTGRES_USER
      - POSTGRES_PASSWORD
      - POSTGRES_DB
    ports:
      - '15432:5432'
    volumes:
      - database:/var/lib/postgresql/data
      - ./initdb:/docker-entrypoint-initdb.d
volumes:
  database:
    driver: local
```

.env に DB の接続情報を記入
`.env`

```
POSTGRES_USER=test01
POSTGRES_PASSWORD=test01
POSTGRES_DB=test01
```

### プロジェクトの作成

TypeScript 環境と周辺ライブラリをインストールする。

```sh
npm init -y prisma-training
cd prisma-training
npm install @prisma/cli typescript ts-node @types/node --save-dev
```

`tsconfig.json`に設定を記述

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

## 素振りをしてみる

公式のチュートリアルをさらっとやってみただけなので、
詳しく見たい方は、[公式へ](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-prisma-migrate-typescript-postgres)

### Prisma の初期化

まずはプロジェクトに Prisma のモデル定義をできるようにする

```sh
npx prisma init
```

上記のコマンドを打つと「prisma」のディレクトリが作られ、配下に`schema.prisma`
というファイルが作られている。この`schema.prisma`にモデル定義や DB の接続情報、
クエリビルダーの設定などを行っていく。

#### DB の接続情報を定義

`prisma/schema.prisma`

```GraphQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`prisma/.env`

```
DATABASE_URL="postgresql://test01:test01@localhost:15432/test01?schema=public"
```

postgre の場合は DATABASE_URL の記入内容は以下のようにする

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

#### モデルの定義を行う

`prisma/schema.prisma`に追記

```GraphQL
----追記
model Post {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
model Profile {
  id     Int     @default(autoincrement()) @id
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}
model User {
  id      Int      @default(autoincrement()) @id
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

#### DB にマッピングとマイグレーションをする

```bash
npx prisma migrate save --name init --experimental
```

上記のコマンドを打つと`prisma`ディレクトリの配下に`migrate`ディレクトリが作られる

下記のコマンドを打つと、接続情報を書いた DB に書くテーブルが生成される

```bash
npx prisma migrate up --experimental
```

#### クエリビルダーの生成

DB 側の定義が終わったので、次は TypeScript 側で DB 操作を行うために
クエリビルダーを生成する

```bash
npm install @prisma/client
```

`prisma/schema.prisma`に追記

```GraphQL
----追記
generator client {
  provider = "prisma-client-js"
}
```

```bash
npx prisma generate
```

上記のコマンドを実行すると `node_modules/`配下の`.prisma/client`に
自分が定義したモデルの情報が追加で入っている
別の環境で、クエリビルダーを使う場合には`node_modules`を入れ直すことが
多いと思うので`npm install`した後に上記のコマンドを打つ必要がある

#### 実際にテーブルを操作する

ここまでで、DB のモデル定義、TypeScript 側で使うクエリビルダーのコード生成
まで行ったのであとは、実際に操作を行う

`index.ts`

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // データの保存
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' }
      },
      profile: {
        create: { bio: 'I like turtles' }
      }
    }
  })
  // データの参照
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true
    }
  })
  console.dir(allUsers, { depth: null })
}
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```
動作確認
```bash
npx ts-node index.ts
---出力
[ { id: 1,
    email: 'alice@prisma.io',
    name: 'Alice',
    posts:
     [ { id: 1,
         createdAt: 2020-11-21T14:41:47.869Z,
         title: 'Hello World',
         content: null,
         published: false,
         authorId: 1 } ],
    profile: { id: 1, bio: 'I like turtles', userId: 1 } } ]
```
![prisma-trainig-image1.png](/prisma-trainig-image1.png)

### 所感
モデルの定義がGraphQLライクなので自分としては馴染みやすいなと
思うのと、まだ実験的ながらマイグレーションとクエリビルダーが
一緒に行えるリッチさはRailsのAcctive Recordにも近く
かつTypeScriptなので型情報があるので,スケールしやすいなと。

また、Prisma1を使ったことはないが、Prisma2は、細かい単位で利用すること
ができるのですでにDBのモデルが定義されている場合でもクエリビルダーとして
も使うことができたり他のライブラリ、フレームワークとも簡単に組み合わせられる
のが利点だと思った。

ただ、クエリビルダーの生成が、`node_modules`若干特殊なので、デプロイする時は
`npx prisma generate`をするのを忘れないようにしないといけなかったりする
のが慣れないなって思ったりもした。

Next.jsのAPI Routeとの組み合わせをすることでTypeScriptだけで
疎結合なフルスタックにWebアプリケーションの作成が実現できそう