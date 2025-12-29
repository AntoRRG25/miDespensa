# Server Documentation

## API Routes

### Categories (`/api/categories`)
Base endpoint for managing categories.

| Method | Path | Description | Parameters |
|:---|:---|:---|:---|
| `GET` | `/` | Get all categories | - |
| `GET` | `/paginated` | Get categories with pagination | Query Params: `page`, `limit`, `search` (implied by controller typically) |
| `GET` | `/:id` | Get a category by ID | `id` (int) |
| `POST` | `/` | Create a new category | Body: `name` (string), `color` (string), `icon` (string) |
| `PUT` | `/:id` | Update a category | `id` (int), Body: `name`, `color`, `icon` |
| `DELETE` | `/:id` | Delete a category | `id` (int) |

### Pantry Products (`/api/pantry`)
Manage products in the pantry.

| Method | Path | Description | Parameters |
|:---|:---|:---|:---|
| `GET` | `/` | Get all products | - |
| `GET` | `/paginated` | Get products with pagination | Query Params: `page`, `limit` |
| `GET` | `/:id` | Get a product by ID | `id` (number) |
| `POST` | `/` | Create a product | Body: `name` (string), `quantity` (number), `expiresAt` (string/date), `categoryId` (number) |
| `PUT` | `/:id` | Update a product | `id` (int), Body: Product fields |
| `DELETE` | `/:id` | Delete a product | `id` (int) |

### Shopping List (`/api/shopping-list`)
Manage the shopping list.

| Method | Path | Description | Parameters |
|:---|:---|:---|:---|
| `GET` | `/` | Get all items | - |
| `GET` | `/paginated` | Get items with pagination | Query Params: `page`, `limit` |
| `GET` | `/stats` | Get statistics | - |
| `GET` | `/:id` | Get item by ID | `id` (number) |
| `POST` | `/` | Add item to list | Body: `name` (string), `quantity` (number), `checked` (boolean) |
| `PUT` | `/:id` | Update item | `id` (int), Body: Item fields |
| `DELETE` | `/:id` | Delete item | `id` (int) |

### Logs (`/api/logs`)
System logs access.

| Method | Path | Description | Parameters |
|:---|:---|:---|:---|
| `GET` | `/` | Get logs | Query: `page`, `limit`, `searchField`, `search`, `sortBy`, `order` |
| `GET` | `/:id` | Get log by ID | `id` (int) |
| `PATCH` | `/:id` | Update log | `id` (int), Body: `keep` (boolean) |
| `DELETE` | `/:id` | Delete log | `id` (int) |
| `DELETE` | `/all/:id` | Delete all logs (or specific type, based on impl) | `id` (int) |

## Parameters Details

### Log Query Parameters
- `searchField`: 'levelName', 'message', 'status'
- `sortBy`: 'id', 'time', 'createdAt'
- `order`: 'ASC', 'DESC'
