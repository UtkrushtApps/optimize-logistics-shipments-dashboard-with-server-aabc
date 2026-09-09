#!/usr/bin/env bash
set -e

echo "[kill.sh] Stopping and removing containers, networks, and volumes using docker-compose..."
docker-compose -f /root/task/docker-compose.yml down --volumes --remove-orphans || true

echo "[kill.sh] Removing any remaining images related to this task..."
# Attempt to remove images by name; ignore errors if they do not exist
docker rmi utkrusht_frontend_image || true
docker rmi utkrusht_backend_image || true

echo "[kill.sh] Running docker system prune to remove dangling resources..."
docker system prune -a --volumes -f || true

echo "[kill.sh] Removing task directory /root/task ..."
rm -rf /root/task || true

echo "Cleanup completed successfully! Droplet is now clean."
