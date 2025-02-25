# UnstableCurios - Trading Card App

## 1. Project Overview

UnstableCurios is a web application where users can:

- **Collect Cards:** Each user has a personal collection of cards.
- **Manage Friendships:** Users can add friends and view their friends' card collections.
- **Request Trades:** Users can send and receive trade requests to exchange cards.
- **Cards belong to Collections, which belong to Organizations.**

## 2. Tech Stack

### Frontend

- **Next.js:** For server-side rendering, routing, and API endpoints.
- **React:** Built into Next.js for interactive components.
- **Tailwind CSS:** For rapid, utility-first styling.
- **TypeScript:** For type safety and a better developer experience.

### Backend & Database

- **API Routes in Next.js:** To build RESTful API endpoints.
- **Drizzle ORM:** For interacting with the database.
- **PostgreSQL (Neon):** To store user data, card data, friendships, and trade requests.

### Authentication

- **Clerk:** To manage user sign-ups, logins, and sessions.

### Storage

- **Uploadthing:** For image storage (card images).

### Deployment & Hosting

- **Vercel:** For seamless deployment and database hosting.

## 3. High-Level Architecture

### Database Schema

#### User

- `id` (UUID, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Organization

- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Collection

- `id` (UUID, Primary Key)
- `organizationId` (UUID, Foreign Key referencing Organization.id)
- `name` (String)
- `description` (Text, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Card

- `id` (UUID, Primary Key)
- `collectionId` (UUID, Foreign Key referencing Collection.id)
- `name` (String)
- `description` (Text)
- `imageUrl` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### UserCard (Linking Users and Cards)

- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key referencing User.id)
- `cardId` (UUID, Foreign Key referencing Card.id)
- `quantity` (Integer)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Friendship

- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key referencing User.id)
- `friendId` (UUID, Foreign Key referencing User.id)
- `status` (Enum: 'pending', 'accepted', 'declined')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Trade

- `id` (UUID, Primary Key)
- `fromUserId` (UUID, Foreign Key referencing User.id)
- `toUserId` (UUID, Foreign Key referencing User.id)
- `offeredCardIds` (JSON array of UUIDs, referencing Card.id)
- `requestedCardIds` (JSON array of UUIDs, referencing Card.id)
- `status` (Enum: 'pending', 'accepted', 'declined')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

#### Message (Optional - for future implementation)

- `id` (UUID, Primary Key)
- `senderId` (UUID, Foreign Key referencing User.id)
- `receiverId` (UUID, Foreign Key referencing User.id)
- `content` (Text)
- `timestamp` (Timestamp)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### API Endpoints (in Next.js `/pages/api`)

#### `/api/cards`

- **GET:** List available cards.
- **POST:** Add a card to a user’s collection.

#### `/api/friends`

- **POST:** Send a friend request.
- **GET:** List current friends.

#### `/api/trades`

- **POST:** Create a new trade request.
- **GET:** List trade requests.
- **PUT:** Update trade status (accept/decline).

## 4. Checklist

This checklist outlines the tasks required to build the UnstableCurios application.

- [ ] Initialize a new Next.js project.
- [ ] Set up TypeScript.
- [ ] Install and configure Tailwind CSS.
- [ ] Install and configure Clerk for authentication.
- [ ] Install and configure Drizzle ORM.
- [ ] Set up PostgreSQL database on Vercel (Neon).
- [ ] Install and configure Uploadthing for image storage.

### Setup & Configuration

- [x] **Initialize Next.js Project:**
  - [x] Create a new Next.js project using `create-next-app`.
  - [x] Choose TypeScript, Tailwind CSS, and other options as needed during setup.
- [ X **Set up TypeScript:**
  - [x] Ensure TypeScript is correctly configured in the project.
  - [x] Create a `tsconfig.json` file if one doesn't exist.
- [x] **Install and Configure Tailwind CSS:**
  - [x] Install Tailwind CSS and its dependencies.
  - [x] Configure Tailwind CSS in `tailwind.config.js`.
  - [x] Add Tailwind directives to your CSS file (e.g., `globals.css`).
- [x] **Install and Configure Clerk for Authentication:**
  - [x] Create a Clerk account and project.
  - [x] Install the Clerk SDK.
  - [x] Configure Clerk environment variables (publishable key, secret key, etc.).
  - [x] Set up Clerk components (e.g., `<ClerkProvider>`, `<SignedIn>`, `<SignedOut>`).
- [ ] **Install and Configure Drizzle ORM:**
  - [ ] Install Drizzle ORM and its dependencies (`drizzle-orm`, `@neondatabase/serverless`).
  - [ ] Set up the database connection (PostgreSQL on Vercel).
  - [ ] Configure Drizzle environment variables (database URL).
- [ ] **Set up PostgreSQL Database on Vercel (Neon):**
  - [ ] Create a Neon account.
  - [ ] Create a new PostgreSQL database in Neon.
  - [ ] Obtain the database connection string.
  - [ ] Configure the database connection string as an environment variable in Vercel.
- [ ] **Install and Configure Uploadthing for Image Storage:**
  - [ ] Create an Uploadthing account and project.
  - [ ] Install the Uploadthing SDK.
  - [x] Configure Uploadthing environment variables (API key, secret key).
  - [ ] Set up Uploadthing routes for image uploads.

### Database Schema & Models

- [ ] **Define Drizzle Schema:**
  - [ ] Create Drizzle schema definitions for `User`, `Organization`, `Collection`, `Card`, `UserCard`, `Friendship`, and `Trade` models.
  - [ ] Define the data types, relationships (foreign keys), and constraints for each model.
- [ ] **Create Database Migrations:**
  - [ ] Generate database migration files using Drizzle CLI.
  - [ ] Review the generated migration files.
  - [ ] Run the migrations to apply the schema to your PostgreSQL database.
- [ ] **Implement Database Connection:**
  - [ ] Create a Drizzle client instance.
  - [ ] Export the Drizzle client for use in API routes and server-side components.

### Authentication

- [ ] **Implement User Registration:**
  - [ ] Create a registration form using Clerk components.
  - [ ] Handle form submission to register new users with Clerk.
  - [ ] Redirect users after successful registration.
- [ ] **Implement User Login:**
  - [ ] Create a login form using Clerk components.
  - [ ] Handle form submission to log in existing users with Clerk.
  - [ ] Redirect users after successful login.
- [ ] **Implement User Logout:**
  - [ ] Create a logout button or link.
  - [ ] Use Clerk's `signOut` function to log the user out.
  - [ ] Redirect users after logout.
- [ ] **Implement Authentication Middleware/Guards:**
  - [ ] Create middleware or higher-order components to protect routes.
  - [ ] Use Clerk's `useAuth` hook or similar to check if a user is signed in.
  - [ ] Redirect unauthorized users to the login page.

### Frontend Components

- [ ] **Create Basic Layout with Navigation:**
  - [ ] Create a layout component (e.g., `Layout.tsx`).
  - [ ] Implement a navigation bar with links to different sections of the app.
  - [ ] Display login/logout buttons based on the user's authentication status.
- [ ] **Create Components for Displaying Cards:**
  - [ ] Create a `Card` component to display individual card details (image, name, description).
  - [ ] Fetch card data from the API.
  - [ ] Render a list of cards using the `Card` component.
- [ ] **Create Components for Managing User's Card Collection:**
  - [ ] Create a `Collection` component to display a user's card collection.
  - [ ] Fetch the user's cards from the API.
  - [ ] Implement functionality to add cards to the collection (e.g., a form or search).
- [ ] **Create Components for Managing Friendships:**
  - [ ] Create a `FriendList` component to display the user's friends.
  - [ ] Fetch the user's friends from the API.
  - [ ] Create a `FriendRequest` component to handle friend requests (send, accept, decline).
- [ ] **Create Components for Creating and Viewing Trade Requests:**
  - [ ] Create a `TradeRequestForm` component to allow users to create trade requests.
  - [ ] Create a `TradeRequestList` component to display incoming and outgoing trade requests.
  - [ ] Implement functionality to accept or decline trade requests.

### API Endpoints Implementation

- [ ] **Implement `/api/cards` GET Endpoint (List Cards):**
  - [ ] Create a new API route file (`/pages/api/cards/index.ts`).
  - [ ] Fetch cards from the database using Drizzle.
  - [ ] Return the card data as a JSON response.
- [ ] **Implement `/api/cards` POST Endpoint (Add Card to User's Collection):**
  - [ ] Create a new API route file (`/pages/api/cards/index.ts`).
  - [ ] Handle the POST request.
  - [ ] Authenticate the user (using Clerk).
  - [ ] Extract card details from the request body.
  - [ ] Add the card to the user's collection in the database (using Drizzle).
  - [ ] Return a success or error response.
- [ ] **Implement `/api/friends` POST Endpoint (Send Friend Request):**
  - [ ] Create a new API route file (`/pages/api/friends/index.ts`).
  - [ ] Handle the POST request.
  - [ ] Authenticate the user (using Clerk).
  - [ ] Extract the friend's user ID from the request body.
  - [ ] Create a new friendship record in the database (using Drizzle).
  - [ ] Return a success or error response.
- [ ] **Implement `/api/friends` GET Endpoint (List Friends):**
  - [ ] Create a new API route file (`/pages/api/friends/index.ts`).
  - [ ] Handle the GET request.
  - [ ] Authenticate the user (using Clerk).
  - [ ] Fetch the user's friends from the database (using Drizzle).
  - [ ] Return the friend data as a JSON response.
- [ ] **Implement `/api/trades` POST Endpoint (Create Trade Request):**
  - [ ] Create a new API route file (`/pages/api/trades/index.ts`).
  - [ ] Handle the POST request.
  - [ ] Authenticate the user (using Clerk).
  - [ ] Extract trade details (offered cards, requested cards, recipient) from the request body.
  - [ ] Create a new trade request record in the database (using Drizzle).
  - [ ] Return a success or error response.
- [ ] **Implement `/api/trades` GET Endpoint (List Trade Requests):**
  - [ ] Create a new API route file (`/pages/api/trades/index.ts`).
  - [ ] Handle the GET request.
  - [ ] Authenticate the user (using Clerk).
  - [ ] Fetch the user's trade requests from the database (using Drizzle).
  - [ ] Return the trade request data as a JSON response.
- [ ] **Implement `/api/trades` PUT Endpoint (Update Trade Status):**
  - [ ] Create a new API route file (`/pages/api/trades/[id].ts`).
  - [ ] Handle the PUT request (using the trade ID in the route).
  - [ ] Authenticate the user (using Clerk).
  - [ ] Extract the trade ID and new status (accept/decline) from the request.
  - [ ] Update the trade status in the database (using Drizzle).
  - [ ] Return a success or error response.

### Image Upload

- [ ] **Integrate Uploadthing:**
  - [ ] Import and initialize Uploadthing in your project.
  - [ ] Create an Uploadthing route for card images.
- [ ] **Implement Image Upload Functionality:**
  - [ ] Create a component or form element for uploading card images.
  - [ ] Use Uploadthing's API to handle the image upload.
  - [ ] Store the uploaded image URL in the database (e.g., in the `Card` model).

### Testing

- [ ] **Write Unit Tests for API Endpoints:**
  - [ ] Use a testing framework (e.g., Jest, Vitest) to write unit tests.
  - [ ] Mock the database connection.
  - [ ] Test the API endpoints for different scenarios (success, error, authentication).
- [ ] **Write Unit Tests for Frontend Components:**
  - [ ] Use a testing framework (e.g., Jest, React Testing Library) to write unit tests.
  - [ ] Test the components for rendering, user interactions, and data display.

### Deployment

- [ ] **Deploy the Application to Vercel:**
  - [ ] Connect your project to your Vercel account.
  - [ ] Deploy the project.
- [ ] **Configure Environment Variables on Vercel:**
  - [ ] Set up environment variables for Clerk, Drizzle, and Uploadthing on Vercel.

### Optional Enhancements

- [ ] **Implement a Search Feature for Cards:**
  - [ ] Create a search input field.
  - [ ] Implement a search API endpoint (or use client-side filtering).
  - [ ] Display search results.
- [ ] **Implement Pagination for Large Card Collections or Trade Requests:**
  - [ ] Implement pagination on the frontend.
  - [ ] Modify the API endpoints to support pagination (e.g., using `limit` and `offset`).
- [ ] **Implement Real-Time Updates (e.g., using WebSockets) for Trade Requests:**
  - [ ] Set up a WebSocket server (e.g., using Socket.IO).
  - [ ] Implement real-time updates for trade requests (e.g., using WebSockets).
- [ ] **Implement a Messaging System:**
  - [ ] Design the database schema for messages.
  - [ ] Implement API endpoints for sending and receiving messages.
  - [ ] Create frontend components for displaying and composing messages.
