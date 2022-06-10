CREATE DATABASE "shortly";

CREATE TABLE "users" (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "visitCount" INTEGER 
);

CREATE TABLE "urls" (
    id SERIAL NOT NULL PRIMARY KEY,
    "longUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "visitCount" INTEGER 
);

CREATE TABLE "usersUrls" (
    id SERIAL NOT NULL PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    "urlId" integer REFERENCES urls(id)
);
