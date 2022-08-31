# questions_answersAPI
An accelerated Back-end RESTful API framework for questions and asnswers data, to enhance user experience for the Atelier e-commerce shop.

## Accomplishments
Accomplished using 4 AWS t2.micros instances
- Provided low latency requests (<100ms) with a 0.0% error rate under a 1000 rps over 1 minute requirement.
- Stress tested each endpoint of the questions and answers microservice and achieved...
- Used loader.io to identify bottlenecking
- Utilized NGINX for load balancing and caching

## How to Use
>#### npm install
>#### npm run server-dev
- To load on a localhost, you will need to create a '.env' file that contains the following:
```
PGUSER= <user>
PGPASSWORD= <password>
PGHOST=localhost
PGDATABASE= <database_name>
PGPORT=5432
```
- To load on a AWS instance, your '.env' file should contain the following:
```
AUTH_TOKEN= <GitHub Token>
PGUSER= <user> 
PGPASSWORD= <password>
PGHOST= <URL>
PGDATABASE= <database_name>
PGPORT=5432
```


## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Deployment
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Creator - Peter McBride
### <a href="https://www.linkedin.com/in/petermcbride61/">
<img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>
<a href="https://github.com/GitPeteM">
<img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
</a>
