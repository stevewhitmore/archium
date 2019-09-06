# Wiki Microservice

This is the RESTful API used for CRUD operations for the Wiki portion of the Archium app.

## Running Locally
Requires 
- PHP v7+
- MySQL
- Apache

```
cd <wherever your php install points (usually /var/www/html)>

git clone <repo>
```
Service will run in localhost if apache is already running.

---

## This is a work in progress

### Todos
- Get Delete to function properly. 
  - Flag with PUT for soft delete
  - Cron job that runs to clear out every week after backup?
- Cron job for weekly data backup - likely selenium since shared hosting plan doesn't support server side retrieval :(
- Route guards. Need to get persisted api key value on every call to ensure authorized to make changes