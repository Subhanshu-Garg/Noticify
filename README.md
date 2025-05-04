# 📣 Noticify

Noticify is a scalable, real-time WebSocket-based notification service for multi-organization platforms. It allows authenticated users to receive organization-specific notices instantly through Redis Pub/Sub and WebSockets.

---

## 🚀 Features

- 🔐 JWT-based authentication via secure cookies
- 🧑‍🤝‍🧑 Multi-organization user support
- 📬 Real-time broadcasting of notices using Redis Pub/Sub
- 🌐 Scalable WebSocket server supporting multiple replicas
- 🧠 State management with Zustand on the frontend
- ♻️ Auto-reconnect WebSocket client
- 📊 Unread tracking and selective notice loading

---

## 🧱 Tech Stack

| Layer           | Tech                                 |
|----------------|--------------------------------------|
| Backend         | Node.js, WebSocket (ws), Redis       |
| Frontend        | React, Zustand, WebSocket            |
| Auth            | JWT in HTTP-only cookies             |
| State Sharing   | Redis Pub/Sub                        |
| Scaling Support | Multi-replica compatible (K8s, etc.) |

---

## 🧩 Architecture

```
+-----------+       +------------+      +----------------------+
|  Client A | <---> |  Replica 1 | <--> | Redis Pub/Sub        |
+-----------+       +------------+      +----------------------+
       |                    ^                     |
+-----------+       +------------+                |
|  Client B | <---> |  Replica 2 | <--------------+
+-----------+       +------------+
```

* Clients connect to any replica via WebSocket.
* Each replica subscribes to Redis channels based on connected clients’ orgIds.
* Redis broadcasts messages to all subscribed replicas.

---

## 🔄 WebSocket Flow

1. Client opens WebSocket and sends JWT (from cookie).
2. Server verifies token and fetches `orgIds`.
3. Server subscribes to `notice:<orgId>` Redis channels.
4. Redis publishes notices to relevant org channels.
5. Server pushes notice to clients subscribed to those orgIds.

---

## 🔧 Environment Setup

### 1. Redis

Install and run Redis locally or use a hosted provider like Redis Cloud.

### 2. Backend

```bash
# Install dependencies
npm install

# Start WebSocket server
node server.js
```

Make sure `.env` contains:

```env
COOKIE_EXPIRE=7
JWT_SECRET=your-secret
REDIS_URL=redis://localhost:6379
```

### 3. Frontend

```bash
# Install frontend dependencies
npm install

# Start client
npm run dev
```

Ensure `CONFIG.WEB_SOCKET` points to your backend WebSocket URL.

---

## 🧠 Zustand Notice Store (Client)

* Automatically connects to WebSocket.
* Listens to `notice` messages and updates local store.
* Tracks unread count.
* Supports notice selection and detail view.

---

## 📦 API Endpoints

> All endpoints (except auth and password reset) require authentication (`isAuthenticatedUser`).

### 🔐 Auth Routes

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| POST   | `/register`              | Register a new user         |
| POST   | `/login`                 | Login and get JWT cookie    |
| GET    | `/logout`                | Logout user (clears cookie) |
| POST   | `/password/forgot`       | Request password reset link |
| PUT    | `/password/reset/:token` | Reset password via token    |

---

### 🏢 Organization Routes

| Method | Endpoint                | Description                            |
| ------ | ----------------------- | -------------------------------------- |
| GET    | `/organizations`        | Get all organizations user belongs to  |
| POST   | `/organizations`        | Create a new organization              |
| GET    | `/organizations/:orgId` | Get details of a specific organization |

---

### 👥 Membership Routes

| Method | Endpoint              | Description                               |
| ------ | --------------------- | ----------------------------------------- |
| POST   | `/memberships/:orgId` | Join an organization (membership create)  |
| DELETE | `/memberships/:orgId` | Leave an organization (membership delete) |

---

### 📬 Notice Routes

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/notices`           | Get all notices user has access to |
| POST   | `/notices`           | Create a new notice                |
| GET    | `/notices/:noticeId` | Get details of a specific notice   |
| PATCH  | `/notices/:noticeId` | Update a specific notice           |
| DELETE | `/notices/:noticeId` | Delete a specific notice           |

---

## 🔐 Security Notes

* All cookies are HTTP-only
* JWT expiry is respected
* Token is verified before every WebSocket connection
* Reconnects are handled gracefully

---

## 📈 Future Enhancements

* [ ] WebSocket authentication expiration handling
* [ ] Prometheus metrics for connections/messages
* [ ] Redis-backed session store for failover
* [ ] Admin dashboard for pushing notices
* [ ] Rate limiting & abuse protection

---

## 🧑‍💻 Author

Made by [Subhanshu Garg](https://github.com/subhanshugarg)
Inspired by building for scale and simplicity 💡

---

## 📄 License

MIT
