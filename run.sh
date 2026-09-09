#!/usr/bin/env bash
set -e

echo "[run.sh] Starting full-stack application with docker-compose..."
cd /root/task

docker-compose up -d

echo "[run.sh] Waiting for MongoDB to become ready..."
until docker exec utkrusht_mongo mongosh --quiet --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; do
  echo "[run.sh] MongoDB not ready yet, retrying in 5 seconds..."
  sleep 5
done

echo "[run.sh] Waiting for backend service to become ready..."
until curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health | grep -q "200"; do
  echo "[run.sh] Backend not ready yet, retrying in 5 seconds..."
  sleep 5
done

echo "[run.sh] Waiting for frontend service to become ready..."
until curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; do
  echo "[run.sh] Frontend not ready yet, retrying in 5 seconds..."
  sleep 5
done

echo "[run.sh] All services are up and responding. Deployment successful."
