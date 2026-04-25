#!/bin/bash
# Yaris Learning Assistant - Deployment Script
set -e

PROJECT_ID=$(gcloud config get-value project)
REGION="asia-south1"

echo "🚀 Enabling Google Cloud APIs..."
gcloud services enable \
  firebase.googleapis.com \
  aiplatform.googleapis.com \
  identitytoolkit.googleapis.com \
  storage.googleapis.com \
  logging.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com

echo "🔑 Configuring Service Account Permissions..."
SERVICE_ACCOUNT=$(gcloud run services describe yaris-backend --region $REGION --format 'value(spec.template.spec.serviceAccountName)' 2>/dev/null || echo "$PROJECT_ID-compute@developer.gserviceaccount.com")

for ROLE in aiplatform.user firebaseauth.admin storage.objectAdmin logging.logWriter datastore.user; do
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT" \
    --role="roles/$ROLE" --quiet
done

echo "📦 Building and Deploying via Cloud Build..."
gcloud builds submit --config cloudbuild.yaml

echo "✅ Deployment complete!"
