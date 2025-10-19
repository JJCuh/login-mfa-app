# Login + MFA React App

A simple React app demonstrating Login, Multi-Factor Authentication (MFA), and Role-Based Access Control.

## Setup

Install dependencies:

```npm install```

Run the development server:

```npm run dev```

Open your browser and visit:
http://localhost:5173

## Mock Credentials
Email					Password			Role
user1@example.com		password123			read-only
admin@example.com		admin123			read-write

MFA Code: 123456

## Run Cypress Tests

To open Cypress and run the end-to-end tests:

```npx cypress open```

## How it Works

[ Sign Up ] → [ Login Page ] → [ MFA Verification ] → [ Protected Dashboard ]

Sign Up:
  • Creates a mock user (stored in memory)
  • Choose role: read-only or read-write

Login:
  • Validates email and password
  • On success, redirects to MFA screen

MFA:
  • Enter static OTP (123456)
  • On success, grants access to dashboard

Dashboard:
  • Shows user info and role
  • Read-only users can view content
  • Read-write users can edit content

## Notes

  • No database used — mock data stored in src/services/authService.js
  • Role-based access handled in src/components/RoleBasedActions.jsx
  • MFA is simulated with a static OTP (123456)
  • Uses React Context for auth state and React Router for navigation

## Features

  • Login with validation
  • Mock MFA verification step
  • Role-based UI control (read-only / read-write)
  • Protected routes
  • Cypress E2E test coverage