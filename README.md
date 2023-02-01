# Start app in production mode

```docker-compose up --build ```

# Start app in dev mode 

```
docker-compose -f docker-compose-dev.yml up --build
cd room-service
npm install
npm run dev
```
go back to root folder and run

```
cd user-service
npm install
npm run dev
```

## API

### user-service 


dev-env: 3000

prod-env: 8081

> Sign up

POST `http://localhost:{env}/api/users/signup`
```
body: {
    email: email@email.com,
    password: password,
    reEnteredPassword: password
}
```
> Login

POST `http://localhost:{env}/api/users/login`
```
body: {
    email: email@email.com,
    password: password
}
```

### room-service

dev-env: 3001

prod-env: 8082

> Create room 

POST `http://localhost:{env}/api/rooms/`

```
body: {
    name: name
}
```

> Get one room info 

GET `http://localhost:{env}/api/rooms/{id}`

> Get all rooms info

GET `http://localhost:{env}/api/rooms/`

> Delete room 

DELETE `http://localhost:{env}/api/rooms/{id}`

> Connect user to room

POST `http://localhost:{env}/api/rooms/connect-to-room`

```
body: {
    email: name@email.com,
    id: 4
}
```
> Remove user from room

POST `http://localhost:{env}/api/rooms/remove-room`

```
body: {
    email: name@email.com,
}
```


