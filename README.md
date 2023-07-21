# E-commerce store

The online store is built on MERN stack. There is also an admin panel. The orders are formed and processed by mail.

## Installation

Clone the repository:

```bash
git clone https://github.com/VadymSerheiev/e-commerce
```

## Configuration

Before you can launche the app, you need to set up the necessary credentials. Follow the steps below to configure your bot:

1. Rename the `.env.example` file to `.env`:

```bash
mv .env.example .env
```

2. Register for an account on MongoDB Atlas if you haven't already. MongoDB Atlas is a cloud-based database service. Create a new MongoDB cluster, and once it's set up, obtain the connection URL from MongoDB Atlas. The URL should look like this (with placeholders):

```bash
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<database-name>` with your actual MongoDB Atlas credentials and database information.

Add the MongoDB connection URL to the .env file:

```bash
# .env
MONGODB_URL=YOUR_MONGODB_URL
```

3. For storing pictures on Google Drive as a CDN alternative, you'll need to create a project in the Google Developers Console, enable the Google Drive API, and create credentials (OAuth 2.0 Client ID). Download the credentials as a JSON file. Copy the `PRIVATE_KEY` and `CLIENT_EMAIL` values.

Add the `PRIVATE_KEY` and `CLIENT_EMAIL` to the .env file:

```bash
# .env
PRIVATE_KEY=YOUR_GOOGLE_DRIVE_PRIVATE_KEY
CLIENT_EMAIL=YOUR_GOOGLE_DRIVE_CLIENT_EMAIL
```

4. For sending emails, you'll need to set up your email login and password for Nodemailer. If you are using Gmail, make sure you allow "less secure apps" to access your account or generate an App Password.

Add your email login and password to the .env file:

```bash
# .env
MAIL_ADDRESS=your.email@example.com
MAIL_PASSWORD=your_email_password
```

## Usage

To run the app in **development mode**, follow these steps:

1. Set the `MODE` environment variable to `development` in the `.env` file:

```bash
# .env
MODE=development
```

2. Install the required dependencies:
```bash
npm install  # or yarn install
```

3. Run the app in development mode:
```bash
npm run dev  # or yarn dev
```

The development server will start and any code changes you make will trigger automatic reloading for a smoother development experience.

To run the app in **production mode**, follow these steps:

1. Set the `MODE` environment variable to `production` in the `.env` file:

```bash
# .env
MODE=production

```
2. Install the required dependencies:

```bash
npm install # or yarn install
```

3. Build the production-ready code:

```bash
npm run build  # or yarn build
```

4. Start the app in production mode:

```bash
npm start  # or yarn start
```