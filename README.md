# Node.js Backend Proxy Server

A secure Node.js proxy server that validates and forwards client requests to external services. It operates as a middleware layer, implementing security controls such as input validation, rate limiting, CORS enforcement, and TLS-based data transmission to ensure integrity and confidentiality across applications.

## 🚀 Features

- **Secure Image Upload Proxy**: Handles multipart/form-data image uploads with signature verification
- **Cryptographic Security**: HMAC-SHA256 signature validation for all incoming requests
- **Rate Limiting**: Configurable rate limiting to prevent abuse (10 requests per minute per IP)
- **CORS Protection**: Whitelist-based CORS configuration for secure cross-origin requests
- **Request Logging**: Comprehensive logging of all incoming requests
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Environment Configuration**: Secure environment-based configuration management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/jakariyaa/nodejs-backend-proxy.git
cd nodejs-backend-proxy
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=3000

# Security Configuration
CRYPTO_SHARED_SECRET=your-secure-shared-secret-key

# Add Other External Webhook Configurations
```

## 🔧 Configuration

### CORS Configuration

The server is pre-configured to accept requests from:

- `*.jakariya.eu.org` (all subdomains)

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### Health Check

```
GET /
```

Returns a welcome message to confirm the server is running.

#### Request Headers

- `x-signature`: HMAC-SHA256 signature of the meta data (required)

#### Request Body (multipart/form-data)

- `meta`: JSON string containing metadata (required)
- `image`: Image file (required)

#### Example Request

```bash
curl -X POST http://localhost:3000/proxy/calscan/sendData \
  -H "x-signature: your-hmac-signature" \
  -F "meta={\"key\":\"value\"}" \
  -F "image=@/path/to/image.jpg"
```

#### Response

- **200 OK**: Successfully forwarded to webhook
- **400 Bad Request**: Missing required fields
- **401 Unauthorized**: Invalid signature
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## 🔐 Security Features

### Signature Verification

All requests must include a valid HMAC-SHA256 signature in the `x-signature` header. The signature is calculated using the shared secret and the meta data string.

### Rate Limiting

- **Window**: 60 seconds
- **Max Requests**: 10 per IP address
- **Message**: "Too many requests from this IP, please try again after an hour"

### CORS Protection

Strict CORS policy prevents unauthorized cross-origin requests. Only whitelisted domains are allowed.

## 🏗️ Project Structure

```
nodejs-backend-proxy/
├── app/
│   ├── configs/
│   │   └── env.js              # Environment configuration
│   ├── controllers/
│   │   └── calscan.controller.js  # Main business logic
│   ├── middlewares/
│   │   ├── error-handler.js    # Global error handling
│   │   ├── logger.js          # Request logging
│   │   └── rate-limiter.js    # Rate limiting configuration
│   └── routes/
│       └── calscan.routes.js   # Route definitions
├── server.js                   # Express server setup
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables (not in repo)
└── .gitignore                # Git ignore rules
```

## 🚦 Development

### Running in Development Mode

```bash
npm run dev
```

This starts the server with file watching enabled.

### Running in Production Mode

```bash
npm start
```

## 🧪 Testing

### Manual Testing

1. Start the server: `npm run dev`
2. Send a test request using curl or Postman
3. Verify the signature is correctly calculated
4. Check the webhook receives the forwarded data

### Signature Generation Example

```javascript
const crypto = require("crypto");

const metaString = JSON.stringify({ key: "value" });
const signature = crypto
  .createHmac("sha256", process.env.CRYPTO_SHARED_SECRET)
  .update(metaString)
  .digest("hex");
```

## 🚀 Deployment

### Vercel Deployment

This project is configured for Vercel deployment. The `.vercel` directory is ignored in git.

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring

The server includes built-in request logging. All requests are logged with:

- HTTP method
- Request URL
- Request body (if present)

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid signature" error**

   - Verify the shared secret matches between client and server
   - Ensure the meta string is exactly the same when generating the signature

2. **CORS errors**

   - Check if your domain is whitelisted in the CORS configuration
   - Verify the origin header is being sent correctly

3. **Rate limiting**
   - Check if you're exceeding 10 requests per minute
   - The limit resets every 60 seconds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.
