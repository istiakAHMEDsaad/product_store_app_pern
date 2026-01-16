# Productify - Full Stack PERN Product Store

Productify is a professional, full-stack product management application built using the PERN stack. It features a robust backend API with Node.js and Drizzle ORM, and a dynamic, responsive frontend built with React, Tailwind CSS, and DaisyUI.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TanstackQuery](https://img.shields.io/badge/TanStack_Query-160440?style=for-the-badge&logo=react-query)


## 📸 Screenshot
![live ss](./productify.png)
[Live Link](https://product-store-app-frontend.onrender.com/)

## 🚀 Features

- **Authentication:** Secure sign-in/up via Clerk (Google, GitHub, Facebook, and Email).
- **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for products.
- **Commenting System:** Users can add and manage comments on product pages.
- **Theme Support:** 30+ dynamic themes using DaisyUI, persisted via LocalStorage.
- **Responsive Design:** Mobile-first UI optimized for all screen sizes.
- **Database:** Managed serverless PostgreSQL via Neon.tech.
- **Performance:** Optimized data fetching using TanStack Query (React Query).
- **Find Product:** Find your desire products with search and pagination option.

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Drizzle ORM
- **Database:** PostgreSQL (Neon)

### Frontend

- **Framework:** React
- **Styling:** Tailwind CSS & DaisyUI
- **State Management:** TanStack Query
- **Authentication:** Clerk

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- A Neon.tech account (for PostgreSQL)
- A Clerk account (for Auth)

## 📜 Database Schema

The project utilizes Drizzle ORM to manage the schema, including:

- **Products Table:** Stores name, price, description, and image URLs.
- **Comments Table:** Stores user feedback linked to specific products.
- **Relations:** One-to-many relationship between products and comments.
