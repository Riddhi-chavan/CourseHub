# Course Management System

## Overview

Course Management System is a platform designed for students to view and enroll in courses. The system provides a detailed view of each course, including the syllabus and enrollment status. It also includes student authentication via Google, a personalized student dashboard, and a progress tracker. The application is built using React.js, Redux, and Firebase for the backend, ensuring a responsive and seamless user experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Demo](#demo)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Clone Project](#clone-project)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contact](#contact)

## Features

- **User Authentication with Google**: Students can log in using their Google account.
- **Course List and Details**: View a list of all courses and detailed information about each course, including the syllabus.
- **Student Dashboard**: Personalized dashboard where students can view and manage their enrolled courses.
- **Progress Tracker**: Allows students to track their progress in each course (start, in-progress, done).
- **Responsive Design**: Fully responsive design that works efficiently on all devices.

## Screenshots

![Course List Screenshot](https://github.com/Riddhi-chavan/CourseHub/assets/130183432/63b46380-9a7d-4152-a364-8c7fe4b12459)
![Course Details Screenshot](https://github.com/Riddhi-chavan/CourseHub/assets/130183432/f200b207-d62a-415d-948d-555ec6129238)
![Student Dashboard Screenshot](https://github.com/Riddhi-chavan/CourseHub/assets/130183432/9413ebcc-c553-4447-93f2-ab952a22ece8)
![Progress Tracker Screenshot](https://github.com/Riddhi-chavan/CourseHub/assets/130183432/b6a6bed5-9eef-47c3-b944-1e2d1f7098f7)

## Demo

- [https://github.com/Riddhi-chavan/CourseHub/assets/130183432/f80f617b-c9f1-49b8-80e0-0ea06b94da45]

## Live Demo

- [click here for live demo](https://soft-gumption-a980d3.netlify.app/)

## Tech Stack

- **Frontend**: React.js, Redux
- **Backend**: Firebase
- **State Management**: Redux
- **Authentication**: Firebase Authentication (Google Auth)
- **Styling**: CSS/Styled-components

## Getting Started

### Prerequisites

- **Node.js**: Install Node.js from [here](https://nodejs.org/en)
- **Firebase Account**: Set up a Firebase project [here](https://firebase.google.com)

### Installation

#### Clone Project

```bash
git clone https://github.com/your-username/course-management-system.git
cd course-management-system
```
## Backend Setup

1. **Set up Firebase project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/), create a new project, and set up Firebase Authentication and Firestore Database.

2. **Create a `.env` file in the root directory and add the following:**

   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-firebase-app-id

## Frontend Setup

1. Install the dependencies:
     ```bash
     npm install
    ```
      

2. **Start the frontend server:**
    ```bash
    npm run dev
    ```

    ### Tailwind CSS Configuration

1. **Install Tailwind CSS:**
    ```bash
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    ```

2. **Generate Tailwind CSS configuration file:**
    ```bash
    npx tailwindcss init
    ```

   3. **Update `tailwind.config.js` with your custom configuration if needed.**


## Configuration

Ensure all necessary configurations, such as Firebase API keys, are correctly set up in the environment variables

## Usage

- Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.
- Log in using your Google account to access the student dashboard.

- Browse through the list of courses, enroll in courses, and track your progress in the student dashboard.


## Contact

Email: riddhic164@gmail.com

Project Link: [https://github.com/Riddhi-chavan/CourseHub](https://github.com/Riddhi-chavan/CourseHub)

Thank you for checking out my project! If you have any suggestions or find issues, feel free to open an issue or submit a pull request. Your feedback is highly appreciated!
