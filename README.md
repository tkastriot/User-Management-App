# React User Management App

A small **React + TypeScript** project built for an internship challenge.  
The app demonstrates components, state management, routing, forms, and data fetching using **Redux Toolkit** and **Material UI**.

---

## Features

- List Users (fetch from JSONPlaceholder API)  
- Search by name or email  
- User Details page (edit + delete)  
- Add New User (Name & Email required, optional phone, website, address, company)  
- New users appear at the top of the list  
- Sorting by Name or Email  
- Responsive UI with Material UI  

---

## Tech Stack

- React 18  
- TypeScript  
- Vite  
- Redux Toolkit  
- React Router  
- Material UI  

---

## Getting Started

To run the project locally:

1. Clone the repository  
   ```bash
   git clone https://github.com/tkastriot/User-Management-App.git
   cd User-Management-App/react-user-management-app
2. Install dependencies  
   ```bash
   npm install
3. Start the development server  
   ```bash
   npm run dev


   
## Project Structure

```text
src/
├── App.tsx              # Routes and layout
├── hooks.ts             # Typed Redux hooks
├── store.ts             # Redux store setup
├── usersSlice.ts        # Redux slice (fetch, add, update, delete)
├── pages/
│   ├── UsersPage.tsx    # List + search + sort users
│   ├── AddUserPage.tsx  # Add new user form
│   └── UserDetailsPage.tsx # Edit/delete user



## Requirements Completed

- [x] List Users  
- [x] Search  
- [x] User Details (edit & delete)  
- [x] Add New User  
- [x] Sorting  
- [x] Redux state management  
- [x] Responsive UI



