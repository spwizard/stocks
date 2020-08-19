# Stockopedia front-end developer coding challenge

The goal of this project is to display a list of transactions in a portfolio which is fetched from a RESTful API.

The table of transactions should render all available properties of the transactions in the order returned by the API and allow the user to edit and delete a row as well as add new transactions to the list (which should be persisted in the API).

Additionally, the page should display the cumulative cashflow for the portfolio below the table (see below for calculation).

You should aim to spend roughly 2 hours on this task. If are you unable to complete all the requirements that is fine, but please leave a note on the remaining tasks and how you would anticipate addressing them.

Please include some tests for components or services you might introduce. These do not have to be comprehensive, but we would like to see your approach to automated testing for Angular projects. Feel free to use any testing framework that you see fit (Karma, Jest, etc.).

## Getting started

A mock-up with all the mark-up and styles you'll need to get started can be found in the accompanying `index.html` file. Feel free to use this as a starting point. **NB** it is not necessary to follow this style/structure, it is provided to save you time!

## Data model

There are 4 types of transactions:

* Buy
* Sell
* Deposit
* Withdrawal

All transactions have a set of common fields:

* id `integer`
* type `enumeration` ('buy', 'sell', 'deposit', 'withdrawal')
* date `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted date string)
* value `integer` (a Sterling **pence** value)
* cashflow `integer` (a Sterling **pence** cashflow change)

Buy and sell transactions have the additional properties:

* security `string` (the name of the traded share)
* shares `integer` (the number of the shares transacted)

## Formatting requirements

* Dates should be formatted in a human-readable manner
* Transaction values and cashflow changes and  should be formatted in  **pounds Sterling**, i.e. `£${value/100}`
* The sign of the change should be prefixed (i.e. `+` for a positive change and `-` for a negative change)
* Positive changes should be formatted in _green_ and negative changes in _red_. 
* When editing the value on the form, it should also be in **pounds sterling** but stored as the pence value.

## Cumulative cashflow

The cumulative cashflow is calculated by summing all the individual cashflows across the transactions, for example. For the following transactions:

| type       | value  | cashflow |
|------------|--------|----------|
| deposit    | 500000 | 500000   |
| buy        | 120000 | -120000  |
| sell       | 72000  | 72000    |
| withdrawal | 100000 | -100000  |

The cumulative cashflow would be given by `500000 - 120000 + 72000 - 100000 = 352000` and should be displayed below the table.

## Adding, editing and deleting transactions

We use the same form for adding and editing transactions, however, when you switch to "edit" mode you need change the following:

* "Add transactions" title should be "Edit transaction (`#{transaction ID}`)"
* "Add transaction" button text should be "Update transaction"
* Show "Cancel" button which, when clicked, will clear the form and change the state back to "add transaction" 

When transaction has been added, edited or deleted you need to display a relevant message above the table.

## API endpoints

### Listing all transactions

Make a `GET` request to https://transactions-challenge.stockopedia.com/api/v1/transactions

The response will be an object with a single `transactions` key. The value will be an array of transactions.

### Creating a transaction

Make a `POST` request to https://transactions-challenge.stockopedia.com/api/v1/transactions with a transaction as the body of the request. The content type must be `application/json`, e.g.

```bash
curl -X POST \
    https://transactions-challenge.stockopedia.com/api/v1/transactions \
    -d '{"value": 123, "type": "deposit", "date": "2020-07-21T15:45:49.958Z", "cashflow": 123, "value": 123}' \
    -H "Content-Type: application/json"
```

For a valid transaction, the API will return a `201 CREATED` response which will contain the transaction with an assigned ID in it.

For invalid transactions a `400 BAD REQUEST` response will be returned. The detail of the error will be presented in a response.

**NB** this will not actually update any data on the server.

### Updating a transaction

Make a `PUT` request to https://transactions-challenge.stockopedia.com/api/v1/transactions/<transactionId> (where `transactionId` is the ID of the transaction) with a transaction as the body of the request. The content type must be `application/json`, e.g.

```bash
curl -X PUT \
    https://transactions-challenge.stockopedia.com/api/v1/transactions/123 \
    -d '{"id": 987, "type": "deposit", "date": "2020-07-21T15:45:49.958Z", "cashflow": 123, "value": 123}' \
    -H "Content-Type: application/json"
```

For a valid transaction, the API will return a `200 OK` response which will contain the transaction data you passed.

For invalid transactions a `400 BAD REQUEST` response will be returned. The detail of the error will be presented in a response.

**NB** this will not actually update any data on the server.

### Deleting a transaction

Make a `DELETE` request to https://transactions-challenge.stockopedia.com/api/v1/transactions/<transactionId> (where `transactionId` is the ID of the transaction), e.g.

```bash
curl -X DELETE \
    https://transactions-challenge.stockopedia.com/api/v1/transactions/123
```

The API will respond unconditionally with `204 NO CONTENT`.

**NB** this will not actually update any data on the server.
