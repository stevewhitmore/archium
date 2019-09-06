# Login Microservice

This is the service used for handling the authentication portion of the Archium app.

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

### Todos:
- Implement some actual hashing for password
- Make api key portable for other services to use
- Clean up the code (especially in api.php). It's not really organized or maintainable/scalable.
- Fix toggle between local and remote environments. Set to local for development until closer to deployment date.