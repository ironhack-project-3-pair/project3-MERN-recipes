# Tit Tit Kitchen (Backend Server)

## Description

Tit Tit Kitchen is a full-stack web application (based on the MERN stack).

## Deployed live version: https://tit-tit-kitchen.netlify.app/

## Backend server repo: https://github.com/hymced/project-management-server
## Backend server API: https://project3-mern-recipes-server.adaptable.app/api/

## Story

Tit Tit Kitchen is named after a combination of the French expression "bon apétit" and the Vietnamese sweet and neat way of saying it, just like this app! 😃

## How does it work

This repository contains the backend code for the server of this application. It is a RESTful API built with ExpressJS, MongoDB and Mongoose.

It allows logged in users to manage all the recipes and all the ingredients in the database (public except for anonymous users). The main feature is that they can also track the ingredients they have in their kitchen and plan their meals in a week plan view. On a daily basis for a week, user can then consume the ingredients of the planned recipes that he/she actually cooked and ate. Stay tuned for more functionalities to come!

## DB Relationships
1. One-to-many (1:many) → A user has multiple ingredients (directly stored in the user’s model, and not as embedded sub documents or references as of now).
2. One-to-one (1:1) → A user as only one week plan and reciprocally.
3. One-to-many (1:many) → A recipes as multiples ingredients, but ingredients can be used in more than 1 recipe.
3. There are no relations between the public models and users.

## Frontend Resources

### Frontend client (React app) repo: https://github.com/hymced/project-management-client

## Instructions

To run in your computer, follow these steps:
- clone 
- install dependencies: `npm install`
- create a `.env` file with the following environment variables
  - ORIGIN, with the location of your frontend app (example, `ORIGIN=https://mycoolapp.netlify.com`)
  - TOKEN_SECRET: used to sign auth tokens (example, `TOKEN_SECRET=ilovepizza`)
- run the application: `npm run dev`

# Environment variables

## Case 1: hosted on localhost

Add the following environment variables in .env files:

### Server

```
PORT=<YOUR_PORT> (default is 5000)
ORIGIN=http://localhost:3000
TOKEN_SECRET=<YOUR_CHOSEN_TOKEN_SECRET>
MONGODB_URI=mongodb://127.0.0.1:27017/<YOUR_LOCAL_MONGODB_DB_NAME>

# CLOUDINARY CREDENTIALS FOR IMAGE UPLOAD
CLOUDINARY_NAME=<CHECK_YOUR_CLOUDINARY_CONSOLE>
CLOUDINARY_KEY=<CHECK_YOUR_CLOUDINARY_CONSOLE>
CLOUDINARY_SECRET=<CHECK_YOUR_CLOUDINARY_CONSOLE>
```

### Client

```
PORT=<YOUR_PORT> (default is 3000)
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_DEBUG_COMPONENT_LIFECYCLE=true (default is false)
```

## Case 2: creating your own deployment

### Server --> adaptable.io

```
TOKEN_SECRET=<YOUR_CHOSEN_TOKEN_SECRET>
MONGODB_URI=mongodb+srv://<YOUR_MONGODB_ATLAS_DB_URI>
ORIGIN=<YOUR_NETLIFY_SITE_DOMAIN>

# CLOUDINARY CREDENTIALS FOR IMAGE UPLOAD
CLOUDINARY_NAME=<CHECK_YOUR_CLOUDINARY_CONSOLE>
CLOUDINARY_KEY=<CHECK_YOUR_CLOUDINARY_CONSOLE>
CLOUDINARY_SECRET=<CHECK_YOUR_CLOUDINARY_CONSOLE>
```

### Client --> netlify.app

```
CI=false (required for SPA applications deployed on this service to redirect requests to index.html)
REACT_APP_SERVER_URL=<YOUR_ADAPTABLE_APP_DOMAINE>
REACT_APP_DEBUG_COMPONENT_LIFECYCLE=true (dafault is false)
```

## API endpoints

<br/>

**Auth endpoints**

| HTTP verb | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST | /api/auth/signup | – | { email: String, password: String, name: String } | Sign up |
| POST | /api/auth/login | – | { email: String, password: String } | Log in |
| GET | /api/auth/verify | Authorization: Bearer `<jwt>` | – | Verify jwt |

<br/>

**Ingredients**

| HTTP verb | Path | Request Headers | Request body | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST | /api/ingredients | Authorization: Bearer `<jwt>` | { name: String, emoji: String } | Create new ingredient |
| GET | /api/projects | Authorization: Bearer `<jwt>` | – | Get all ingredients |
| GET | /api/projects/:projectId  | Authorization: Bearer `<jwt>` | – | Get ingredient details |

<br/>

**Recipes**

| HTTP verb | Path | Request Headers | Request body | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST | /api/upload | Authorization: Bearer `<jwt>` | { data: { pictureBodyFormDataKey: [ file ] } } | Create new recipe |
| POST | /api/recipes | Authorization: Bearer `<jwt>` | { name: String, instructions: String, durationInMin: Number, recipeIngredients: [{ ingredient: Ingredient, qtyInGrams: Number }], picture: String } | Create new recipe |
| GET | /api/recipes | Authorization: Bearer `<jwt>` | – | Get all recipes |
| GET | /api/recipes/:recipeId  | Authorization: Bearer `<jwt>` | – | Get recipe details |
| PUT | /api/recipes/:recipeId | Authorization: Bearer `<jwt>` | { name: String, instructions: String, durationInMin: Number, recipeIngredients: [{ ingredient: Ingredient, qtyInGrams: Number }], picture: String } | Update recipe |
| DELETE | /api/projects/:recipeId | Authorization: Bearer `<jwt>` | – | Delete recipe |

<br/>

**User Ingredients**

| HTTP verb | Path | Request Headers | Request body | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST | /api/user-ingredients | Authorization: Bearer `<jwt>` | { ingredient: Ingredient, qtyInGrams: Number, userId: String } | Create new user ingredient |
| GET | /api/user-ingredients | Authorization: Bearer `<jwt>` | { userId: String } | Get all user ingredient |
| GET | /api/user-ingredients/:userIngredientId  | Authorization: Bearer `<jwt>` | { userId: String } | Get user ingredient details |
| PUT | /api/user-ingredients/:userIngredientId | Authorization: Bearer `<jwt>` | { ingredient: Ingredient, qtyInGrams: Number, userId: String } | Update user ingredient |
| PUT | /api/user-ingredients | Authorization: Bearer `<jwt>` | { userIngredients: [{ ingredient: Ingredient, qtyInGrams: Number }], userId: String } | Update user ingredients |
| DELETE | /api/user-ingredients/:userIngredientId | Authorization: Bearer `<jwt>` | { userId: String } | Delete user ingredient |

(userId is optional, intended for admins only)

<br/>

**Week Plan**

| HTTP verb | Path | Request Headers | Request body | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| GET | /api/week-plan  | Authorization: Bearer `<jwt>` | { userId: String } | Get user week plan |
| PUT | /api/week-plan | Authorization: Bearer `<jwt>` | { weekPlanRecipes: Array, userId: String } | Update user week plan |

(userId is optional, intended for admins only)

<br/>