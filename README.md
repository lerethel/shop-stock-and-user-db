This repository contains three projects created as part of an assignment for backend developers.

# shop-stock

This project includes methods to manage shop stocks. It is written in TypeScript and uses Express and PostgreSQL, which is managed via MikroORM. Moreover, it sends information about all operations to the `shop-stock-action-history` service using RabbitMQ.

## How to run

1. Go to the project folder in your terminal (for example, using the `cd` command)
2. Run `docker compose up`
3. After the project has fully initialized, open a new terminal and navigate to the same folder. Run `docker ps` and note the name of the app container (typically `shop-stock-shop-stock-1`). Then, run `docker exec shop-stock-shop-stock-1 npm run db:setup` (use the correct container name) to create tables in the database
4. The app will be available at `http://localhost:3000`

## Endpoints

`POST /product`

- Creates a new product
- Requires the following JSON object: `{ plu: number, name: string }`
- Returns the newly created product

`GET /product`

- Returns all products
- Possible query parameters to narrow down the results:
  - plu: the product PLU code
  - name: the product name

`POST /stock`

- Creates a new stock
- Requires the following JSON object: `{ product: number, itemsAvailable: number, itemsOrdered: number, shop: number, date?: string }`
- Returns the newly created stock

`GET /stock`

- Returns all stocks
- Possible query parameters to narrow down the results:
  - plu: the PLU code of the product associated with the stocks
  - shop_id: the shop associated with the stocks
  - from: a date to retrieve records from; must be used together with `to`
  - to: a date to retrieve records to; must be used together with `from`

`PATCH /stock/:id`

- Increases or decreases the `itemsAvailable` field value by the provided number
- Requires the following JSON object: `{ increase: number }` or `{ decrease: number }`
- Returns an empty 200 response

# shop-stock-action-history

This project stores reports about all actions performed in the `shop-stock` service. It is written is JavaScript and uses Express and PostgreSQL, managed via Knex.js. It uses its own database which partially duplicates the one used in `shop-stock`. It receives the reports from `shop-stock` via RabbitMQ.

## How to run

1. Go to the project folder in your terminal (for example, using the `cd` command)
2. Run `docker compose up` to start the app
3. The app will be available at `http://localhost:3500`

## Endpoints

`GET /report`

- Returns all reports with pagination
- Possible query parameters to narrow down the results:
  - shop_id: the shop associated with the stocks
  - plu: the PLU code of the product associated with the stocks
  - from: a date to retrieve records from; must be used together with `to`
  - to: a date to retrieve records to; must be used together with `from`
  - action: the type of action performed on the records. The possible values are `createProduct`, `getProducts`, `createStock`, `getStocks`, and `changeStock`

# user-db

This project includes a database of users who have some kind of problem. The app is written in TypeScript and uses NestJS and PostgreSQL, managed via MikroORM. The database can be populated with random users with MikroORM's seeder.

## How to run

1. Go to the project folder in your terminal (for example, using the `cd` command)
2. Run `docker compose up`
3. After the project has fully initialized, open a new terminal and navigate to the same folder. Run `docker ps` and note the name of the app container (typically `user-db-user-db-1`). Then, run `docker exec user-db-user-db-1 npm run db:setup` (use the correct container name) to create a table in the database
4. In the same terminal, run `docker exec user-db-user-db-1 npm run db:seed` to populate the database with 100.000 random users. You can run the seeder multiple times to create more users
5. The app will be available at `http://localhost:3000`

## Endpoints

`PATCH /`

- Sets the `problems` field to `false` for all users and returns the number of users who had that field set to `true`
