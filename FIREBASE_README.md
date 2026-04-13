# CodInsta - Firebase Integration

This project has been integrated with Firebase for database functionality and user authentication.

## Firebase Services Used

- **Firebase Authentication**: User registration and login
- **Firestore Database**: Storing user data, DSA content, and user progress
- **Firebase Analytics**: Usage tracking

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing "codinteger" project
3. Enable Authentication with Email/Password provider
4. Enable Firestore Database
5. Copy your Firebase config from Project Settings

### 2. Database Structure

The Firestore database has the following collections:

```
users/
  {username}/
    - username: string
    - email: string
    - points: number
    - solved: number
    - bio: string
    - createdAt: timestamp
    - lastLogin: timestamp

dsa-topics/
  {topic-slug}/
    - icon: string
    - color: string
    - desc: string
    - overview: string
    - complexity: object
    - concepts: array
    - realWorld: string
    - code1: object
    - code2: object
    - lastUpdated: timestamp

user-progress/
  {username}-{topic-slug}/
    - username: string
    - topic: string
    - progress: object
    - lastUpdated: timestamp
```

### 3. Migrate Existing Data

1. Open `migrate-data.html` in your browser
2. The page will automatically migrate DSA data to Firestore
3. Check the console for migration status

### 4. User Authentication Flow

- **Registration**: Creates Firebase Auth user + saves profile to Firestore
- **Login**: Authenticates with Firebase + loads profile from Firestore
- **Session**: Uses localStorage for session persistence + syncs with Firebase

## API Reference

### FirebaseDB Helper Functions

```javascript
// User Management
await window.FirebaseDB.saveUser(userData)
await window.FirebaseDB.getUser(username)

// DSA Data Management
await window.FirebaseDB.saveDSAData(topic, data)
await window.FirebaseDB.getDSAData(topic)

// User Progress
await window.FirebaseDB.saveUserProgress(username, topic, progress)
await window.FirebaseDB.getUserProgress(username, topic)
```

## Security Rules

Make sure to set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }

    // DSA topics are publicly readable
    match /dsa-topics/{topicId} {
      allow read: if true;
      allow write: if false; // Only admin can write
    }

    // User progress is private
    match /user-progress/{progressId} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.uid;
    }
  }
}
```

## Development Notes

- Firebase is initialized in `index.html`, `login.html`, `register.html`, and `migrate-data.html`
- The main Firebase helper functions are in `assets/js/main.js`
- Session management combines localStorage with Firebase sync
- All database operations are asynchronous and include error handling

## Troubleshooting

1. **Firebase not initializing**: Check console for errors, ensure config is correct
2. **Authentication errors**: Verify Firebase Auth is enabled and configured
3. **Database errors**: Check Firestore security rules and network connectivity
4. **Migration issues**: Ensure Firebase is properly initialized before running migration

## Next Steps

- Add more DSA topics to the database
- Implement user progress tracking
- Add leaderboard functionality
- Create admin panel for content management
- Add real-time features with Firebase Realtime Database