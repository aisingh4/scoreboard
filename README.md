# scoreboard

Fetches top 5 scores of all time

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

## Collections/Tables

There need to be two collections in MongoDB:

	-> scores: (userId: string, points: string)
	-> users: (userId: string, name: string, country: string)


## Endpoints

There are 4 different endpoints in the project.

1]	GET - Fetches top 5 scores as a list of JSON objects.
	/leaderboard

	Example: 
	http://localhost:3000/leaderboard
	=>
	[{"name":"Aishwarya Singh","score":"2000"},{"name":"Shubham Maurya","score":"1700"},{"name":"Aman Singh","score":"1600"},{"name":"Richa Verma","score":"1500"},{"name":"Asha Kushwaha","score":"1200"}]
	
2] GET - Fetches the rank of a player 
	/rank/<userId>

	Example: 
	http://localhost:3000/rank/aisingh
	=> aisingh rank is: 1st

3]	POST - Updates the score for a given player.
	/updateScore
	
	Example:
	http://localhost:3000/updateScore
	Body: 
	{
		"userId": "aisingh",
		"points": "1000"
	}
	Returns a JSON object that includes the success or error messages by result of the post operation.
	
4] DELETE - Deletes the user by user id and corresponding points earned from 'Scores' Collection.

	/user/deleteUser/<userId>
	Example: 
	http://localhost:3000/deleteUser/aisingh

	Returns a JSON object that includes the success or error messages by result of the delete operation.
