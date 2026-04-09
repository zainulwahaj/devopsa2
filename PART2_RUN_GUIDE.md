# Part-II Run Guide (Jenkins + Webhook + Compose)

This part uses:

- `Jenkinsfile` for CI pipeline
- `docker-compose.part2.yml` for deployment
- Code volume mount (`./:/app`) for web service
- Different names/ports from Part-I

## Part-II container details

- Web container: `jenkins-web-app`
- Mongo container: `jenkins-mongo-db`
- App URL after pipeline run: `http://<ec2-public-ip>:4000`
- Mongo host port: `27018`

## Important assignment condition

Keep Part-I up, keep Part-II down initially.

Only after Jenkins pipeline trigger, Part-II should come up.

## Jenkins setup summary

1. Install Jenkins on EC2.
2. Install plugins:
   - Git
   - Pipeline
   - Docker Pipeline
3. Ensure Jenkins user can run Docker commands.
4. Create a Pipeline job and set script from SCM:
   - Repository: `https://github.com/zainulwahaj/devopsa2.git`
   - Branch: `main`
   - Script Path: `Jenkinsfile`
5. In GitHub repo settings, add webhook:
   - Payload URL: `http://<jenkins-public-ip>:8080/github-webhook/`
   - Content type: `application/json`
   - Event: Just the push event

## Manual verification commands

`docker compose -f docker-compose.part2.yml ps`

`docker logs jenkins-web-app`

`docker logs jenkins-mongo-db`
