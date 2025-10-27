# Countries API

A RESTful API for managing and querying country data with population, currency, and GDP information.

## API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get API Status
Get the current status of the API including total countries and last refresh time.

**Endpoint:** `GET /status`

**Response:**
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-27T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success

---

#### 2. Refresh Countries Data
Fetch and update country data from external sources (restcountries.com and exchange rates API).

**Endpoint:** `POST /countries/refresh`

**Response:**
```json
{
  "message": "Countries refreshed successfully"
}
```

**Status Codes:**
- `200 OK` - Data refreshed successfully
- `503 Service Unavailable` - External data source unavailable

**Error Response:**
```json
{
  "error": "External data source unavailable",
  "details": "Could not fetch data from restcountries"
}
```

---

#### 3. Get All Countries
Retrieve a list of countries with optional filtering and sorting.

**Endpoint:** `GET /countries`

**Query Parameters:**
- `region` (optional) - Filter by region (e.g., "Africa", "Europe", "Asia")
- `currency` (optional) - Filter by currency code (e.g., "USD", "EUR", "NGN")
- `sort` (optional) - Sort by GDP (`gdp_desc` for descending order)

**Example Requests:**
```
GET /countries
GET /countries?region=Africa
GET /countries?currency=USD
GET /countries?region=Europe&sort=gdp_desc
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nigeria",
    "capital": "Abuja",
    "region": "Africa",
    "population": 206139589,
    "flag_url": "https://flagcdn.com/ng.svg",
    "currency_code": "NGN",
    "exchange_rate": 1620.5,
    "estimated_gdp": 334567891234.5,
    "last_refreshed_at": "2025-10-27T10:30:00.000Z"
  },
  ...
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

#### 4. Get Country by Name
Retrieve detailed information about a specific country.

**Endpoint:** `GET /countries/:name`

**URL Parameters:**
- `name` (required) - The name of the country

**Example Request:**
```
GET /countries/Nigeria
```

**Response:**
```json
{
  "id": 1,
  "name": "Nigeria",
  "capital": "Abuja",
  "region": "Africa",
  "population": 206139589,
  "flag_url": "https://flagcdn.com/ng.svg",
  "currency_code": "NGN",
  "exchange_rate": 1620.5,
  "estimated_gdp": 334567891234.5,
  "last_refreshed_at": "2025-10-27T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Country not found

**Error Response:**
```json
{
  "success": false,
  "error": "County not found!"
}
```

---

#### 5. Get Summary Image
Retrieve a generated summary image of country statistics.

**Endpoint:** `GET /countries/image`

**Response:**
- Returns a PNG image file

**Headers:**
- `Content-Type: image/png`
- `Cache-Control: public, max-age=3600`

**Status Codes:**
- `200 OK` - Image returned successfully
- `404 Not Found` - Summary image not found
- `500 Internal Server Error` - Server error

**Error Response:**
```json
{
  "error": "Summary image not found"
}
```

---

#### 6. Delete Country
Delete a specific country from the database.

**Endpoint:** `DELETE /countries/:name`

**URL Parameters:**
- `name` (required) - The name of the country to delete

**Example Request:**
```
DELETE /countries/Nigeria
```

**Response:**
```json
{
  "message": "Country deleted successfully"
}
```

**Status Codes:**
- `204 No Content` - Country deleted successfully
- `404 Not Found` - Country not found

**Error Response:**
```json
{
  "error": "Country not found"
}
```

---

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd stage-2-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/countries_db"
PORT=5000
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

---

## Data Sources

- **Country Data:** [REST Countries API](https://restcountries.com)
- **Exchange Rates:** [Open Exchange Rates API](https://open.er-api.com)

---

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Programming language
- **Prisma** - ORM for database management
- **MySQL** - Database
- **Axios** - HTTP client
- **Pino** - Logging library
