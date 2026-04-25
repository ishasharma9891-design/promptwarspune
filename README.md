# Yaris Learning Assistant

## Google Services Integration
The following Google Cloud services are integrated into Yaris:

| Service | Purpose | Implementation |
|---------|---------|----------------|
| **Firebase Auth** | User Authentication | Google Sign-In with server-side token verification. |
| **Firestore** | Persistent Storage | Real-time sync of learner profiles and progress. |
| **Google Gemini 1.5** | AI Brain | Adaptive learning responses and streaming chat. |
| **Cloud Storage** | Resource Management | Secure file uploads with signed URLs (1hr expiry). |
| **Cloud Logging** | Analytics & Monitoring | Structured JSON logging of session data and performance. |
| **Cloud Run** | Serverless Hosting | Auto-scaling backend and frontend deployment. |

### Setup Instructions
1. **APIs**: Run `./deploy.sh` to enable all required APIs.
2. **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google AI Studio key.
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID.
   - `GOOGLE_APPLICATION_CREDENTIALS`: Path to your service account key (for local dev).
3. **Local Development**:
   ```bash
   npm run start
   ```

## Development Standards
- All functions are < 30 lines.
- Fully JSDoc documented.
- WCAG 2.1 AA compliant.
