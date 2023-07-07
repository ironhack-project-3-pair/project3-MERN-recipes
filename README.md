# Tit Tit Kitchen (Backend)
This repository contains the backend code for the Tit Tit Kitchen application, a REST API backend built with ExpressJS, MongoDB and Mongoose which allows the user to manage public recipes, public ingredients, their kitchen ingredients, and week plan.

## How It Works
A user can create public ingredients and public recipes.
The user can manage their own kitchen ingredients, which represents what they really have at home.
The user can plan their meals for the week.
The user can consume ingredients on a daily basis, updating their kitchen inventory.

## DB Relationships
1. One-to-many → Each user has multiple ingredients. These are directly stored in the user's model and not as embedded sub-documents or references.
2. One-to-one → Each user has only one week plan and reciprocally.
There are no relations for the public models.
Please find the frontend code in this repository.

## Instructions
To run this app on your computer