# Part-I Run Guide (Docker + EC2)

This project satisfies Part-I requirements using:

- `Dockerfile` for web app image
- `docker-compose.yml` for app + database
- Persistent MongoDB volume: `mongo_data`

## 1) Run locally .

From project root:

`docker compose up --build -d`

Check services:

`docker compose ps`

Open app:

`http://localhost:3000`

Stop containers:

`docker compose down`

Data persists because MongoDB uses named volume `mongo_data`.

## 2) Push image to Docker Hub

Build image:

`docker build -t <dockerhub-username>/devops-web-app:part1 .`

Login:

`docker login`

Push:

`docker push <dockerhub-username>/devops-web-app:part1`

## 3) Deploy on AWS EC2

1. Launch Ubuntu EC2 instance.
2. Install Docker and Docker Compose plugin.
3. Clone your GitHub repo.
4. Run:
   `docker compose up --build -d`
5. Allow inbound TCP port `3000` in EC2 Security Group.
6. Open:
   `http://<ec2-public-ip>:3000`

## What to submit for Part-I

- `Dockerfile`
- `docker-compose.yml`
- Docker Hub image URL
- Screenshots: build, running containers, web app page, volume persistence proof
