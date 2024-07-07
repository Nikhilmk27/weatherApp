# Weather App API Documentation

**Version:** 1.0  
**Date:** 05-07-2024  
**Author:** Nikhil mk  
**Description:** Initial draft

## Authentication

All routes except for registration and login require a valid JWT token in the Authorization header:
Authorization: Bearer <your_jwt_token>

## Endpoints

### 1. Register User

- **URL:** `http://localhost:5000/api/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

Success Response:

Code: 200
Content: { "message": "user created sucessfully" }

### 2. User Login

  ## URL: `http://localhost:5000/api/auth/register`
  Method: POST
  Request Body:
  json{
  "email": "user@example.com",
  "password": "securepassword123"
  }

Success Response:

Code: 200
Content:
json{
"message": "Success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

## 3. Get Current Weather

## URL: `http://localhost:5000/api/weather/current?city=London`
Method: GET
Headers: Authorization: Bearer <your_jwt_token>
Query Params: city=[string]
Success Response:

Code: 200
Content: Current weather data

## 4. Get Five Days Forecast

## URL: `http://localhost:5000/api/weather/forecasts?city=London`
Method: GET
Headers: Authorization: Bearer <your_jwt_token>
Query Params: city=[string]
Success Response:

Code: 200
Content: Five-day forecast data

## 5. Get Historical Data For Five Days

## URL: `http://localhost:5000/api/weather/historical?city=London`
Method: GET
Headers: Authorization: Bearer <your_jwt_token>
Query Params: city=[string]
Success Response:

Code: 200
Content: Historical weather data

## 6. Add Favorite City

## URL: `http://localhost:5000/api/favourites`
Method: POST
Headers: Authorization: Bearer <your_jwt_token>
Request Body:
jsonCopy{
"city": "London"
}

Success Response:

Code: 200
Content: { "message": "City added to favorites" }

## 7. Get Favorite Cities

## URL: `http://localhost:5000/api/favourites`
Method: GET
Headers: Authorization: Bearer <your_jwt_token>
Success Response:

Code: 200
Content: List of favorite cities

## Error Responses
All endpoints may return the following error responses:

401 Unauthorized:
jsonCopy{
"error": "Authentication required"
}

400 Bad Request:
jsonCopy{
"error": "Invalid input"
}

500 Internal Server Error:
jsonCopy{
"error": "An unexpected error occurred"
}
