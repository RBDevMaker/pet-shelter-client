# 🐾 Pets Shelter Application 

https://main.def6bew6oruvs.amplifyapp.com

A modern React + Vite application deployed with AWS Amplify, with secure user authentication powered by Amazon Cognito. Designed to streamline pet adoption workflows for both applicants and shelter employees.

## 🚀 Overview

### The Pets Shelter App offers:

- A user-friendly public experience for adoption applicants.

- A secure, Cognito-protected backend dashboard for shelter employees.

- Automated workflows that update pet availability and notify staff when an applicant is approved.

- Downloadable and printable reporting tools for operations management.

### 🔐 Secure Authentication (Amazon Cognito)

- Employee logins are handled with AWS Cognito.

- Protects backend routes and dashboard access.

- Ensures only authorized staff can review or process applications.

### 🧑‍💼 Employee Processing Tools

- Employees can review applications directly from the dashboard.

- Each application can be assigned a status:

       Pending

       Approved

       Pet Not Available

- When marked Approved:

A reminder pop-up shows applicant email and phone number.

The pet automatically updates to Adopted on the public site.

### 📝 Applicant Submission Form

Public-facing adoption form on the Adopt page.

Submissions flow into the secure employee dashboard for processing.

### 📊 Reporting Suite

The Employee Dashboard includes four major operational reports:

📌 Pet Status Report

   Displays every pet and its adoption status.

📌 Application Report

   Shows submitted applications with filtering and status tracking.

📌 Pet Inventory Report (with Days in Shelter)

   Tracks each pet’s duration in the shelter.

📌 Status Breakdown Report

   Summaries by status category (Adopted, Pending, Not Available, etc.).

### All reports can be:

    - Printed

    - Downloaded (for records or meetings)

## 🛠️ Tech Stack
Frontend

React 18

Vite

Backend & Deployment

AWS Amplify Hosting

AWS Cognito Authentication

Serverless backend components 

## 📦 Installation (Local Development)

### Enter the project
cd pets-shelter-app

### Install dependencies
npm install

### Local development
npm run dev

## 🌐 Deployment

This project is deployed using AWS Amplify, with continuous deployment triggered by Git pushes.
Cognito authentication protects all employee-only routes.
