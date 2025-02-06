# CSV Generator Service

A Node.js service that generates CSV files by aggregating data from multiple APIs with worker thread support.

## Features

- Async API data fetching
- Worker thread pool for CSV generation
- Structured logging with Pino
- Docker support
- Comprehensive error handling

## Setup

1. Clone the repository

```bash
git clone https://github.com/pawarkaran/csv_generator_microservice.git
cd csv_generator_microservice
```

2. Install dependencies

```bash
npm install
```

3. Create .env file:

```
PORT=3000
LOG_LEVEL=info
WORKER_POOL_SIZE=4
```

4. Run the service:

```bash
npm start
```

## Docker Usage

```bash
docker-compose up --build
```

## API Endpoint

- `GET /api/generate-csv`: Generates CSV file from aggregated API data

## Output

CSV files are stored in the `/output` directory
Logs are stored in the `/logs` directory

## License

MIT
