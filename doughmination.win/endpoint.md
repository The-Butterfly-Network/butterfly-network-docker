# API Endpoints Documentation

## Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/login` | User login with username/password | No |
| GET | `/api/user_info` | Get current user information | Yes |
| GET | `/api/is_admin` | Check if current user is admin | Yes |

## Static File Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/robots.txt` | Serve robots.txt file | No |
| GET | `/sitemap.xml` | Serve sitemap.xml file | No |
| GET | `/favicon.ico` | Serve favicon | No |

## WebSocket Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| WS | `/ws` | WebSocket connection for real-time updates | No |

## Mental State Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/mental-state` | Get current mental state | No |
| POST | `/api/mental-state` | Update mental state | Yes (Admin only) |

## System & Member Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/system` | Get system information and mental state | No |
| GET | `/api/members` | Get all members (with optional subsystem filter) | No |
| GET | `/api/fronters` | Get current fronting members | No |
| GET | `/api/member/{member_id}` | Get details for specific member | No |

## Fronting Control Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/switch` | Switch to multiple fronters | Yes |
| POST | `/api/switch_front` | Switch to single fronter | Yes |
| POST | `/api/multi_switch` | Switch to multiple fronters (detailed response) | Yes |

## Cofront Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/dynamic_cofront` | Create dynamic cofront from selected members | Yes |
| GET | `/api/cofronts` | Get all available predefined cofronts | Yes |

## Sub-system Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/subsystems` | Get all available sub-systems | No |
| GET | `/api/members/by-subsystem` | Get members grouped by sub-systems | No |
| GET | `/api/members/filtered` | Get members filtered by sub-system | No |
| GET | `/api/member-tags` | Get all member tag assignments | Yes (Admin only) |
| POST | `/api/member-tags/{member_identifier}` | Update complete tag list for member | Yes (Admin only) |
| POST | `/api/member-tags/{member_identifier}/add` | Add single tag to member | Yes (Admin only) |
| DELETE | `/api/member-tags/{member_identifier}/{tag}` | Remove single tag from member | Yes (Admin only) |

## User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | List all users | Yes (Admin only) |
| POST | `/api/users` | Create new user | Yes (Admin only) |
| DELETE | `/api/users/{user_id}` | Delete user | Yes (Admin only) |
| PUT | `/api/users/{user_id}` | Update user information | Yes (Admin or self) |
| POST | `/api/users/{user_id}/avatar` | Upload user avatar | Yes (Admin or self) |
| GET | `/avatars/{filename}` | Serve avatar images | No |

## Metrics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/metrics/fronting-time` | Get fronting time metrics | Yes |
| GET | `/api/metrics/switch-frequency` | Get switch frequency metrics | Yes |

## Admin Utility Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/refresh` | Force refresh all connected clients | Yes (Admin only) |

## Summary

**Total Endpoints: 28**
- **GET endpoints: 18**
- **POST endpoints: 9** 
- **DELETE endpoints: 1**
- **PUT endpoints: 1**
- **WebSocket endpoints: 1**

**Authentication Breakdown:**
- **No auth required: 11 endpoints**
- **Auth required: 17 endpoints**
  - Admin only: 8 endpoints
  - Any authenticated user: 7 endpoints  
  - Admin or self: 2 endpoints

**Special Features:**
- Real-time updates via WebSocket
- File upload support for avatars
- Caching system for API responses
- PluralKit integration for system management