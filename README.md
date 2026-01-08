# Online Book Web Service

Primary URL:
https://onlinebookwebservice.onrender.com

----------------------------------------

Retrieve all books:
GET https://onlinebookwebservice.onrender.com/allbooks

----------------------------------------

Add a book:
POST https://onlinebookwebservice.onrender.com/addbook

Sample JSON:
{
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald"
}

----------------------------------------

Update a book:
POST https://onlinebookwebservice.onrender.com/updatebook

Sample JSON:
{
"id": 1,
"title": "The Great Gatsby (Updated)",
"author": "Fitzgerald"
}

----------------------------------------

Delete a book:
POST https://onlinebookwebservice.onrender.com/deletebook

Sample JSON:
{
"id": 1
}
