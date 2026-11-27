# MIU Cover Page Generator

A modern, user-friendly web application that helps students of **Manarat International University (MIU)** create professional Assignment and Lab Report cover pages.

Enter academic information, preview the cover page instantly, and download a print-ready PDF — all through a simple and responsive interface.

**Live Application:** https://miu-cover-page-generator.vercel.app/

---

## Overview

MIU Cover Page Generator simplifies academic cover page preparation for students across all departments at Manarat International University.

The application provides separate layouts for Assignment and Lab Report cover pages, real-time preview, PDF generation, and Progressive Web App (PWA) installation support.

It also includes a public statistics system that tracks website visits, PDF downloads, and application installations.

## Features

- **Assignment Cover Page** – Generate professionally formatted assignment cover pages.
- **Lab Report Cover Page** – Create dedicated lab report cover pages.
- **All Departments Supported** – Department selection for students across MIU.
- **Teacher Information** – Select teacher designation and department.
- **Submission Date Picker** – Choose dates using a calendar interface with DD-MM-YYYY formatting.
- **Live Preview** – Preview cover pages instantly while entering information.
- **PDF Export** – Download A4-sized cover pages as PDF documents.
- **University Branding** – Includes MIU logo, watermark, and university-style formatting.
- **Responsive Design** – Supports desktop, tablet, and mobile devices.
- **Progressive Web App (PWA)** – Install the application on supported devices.
- **Local Data Storage** – Automatically saves form information in the browser using LocalStorage.
- **Public Statistics** – Displays total visits, PDF downloads, and app installations.
- **Service Worker** – Provides PWA caching and application resource management.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript (Vanilla JS) | Application functionality |
| HTML2PDF.js | PDF generation |
| Vercel | Hosting and deployment |
| Vercel Serverless Functions | Statistics API |
| Upstash Redis | Cloud-based statistics storage |
| Upstash Redis REST API | Communication with Redis |
| LocalStorage | Saving user form information locally |
| PWA | Installable web application |
| Service Worker | Caching and offline-related functionality |
| Web App Manifest | PWA configuration and installation metadata |

## Statistics & Tracking

The application includes a public statistics system powered by **Vercel Serverless Functions** and **Upstash Redis**.

The statistics API is available at:

`/api/stats`

### Tracked Statistics

| Metric | Description |
|---|---|
| Total Visits | Counts recorded website visits |
| PDF Downloads | Counts successful PDF download events |
| App Installs | Counts installations detected through supported browser events |

### How It Works

1. The frontend sends requests to the `/api/stats` endpoint.
2. Vercel executes the serverless API function.
3. The API communicates with Upstash Redis through its REST API.
4. Redis stores and updates the statistics counters.
5. The frontend retrieves the latest values and displays them publicly.

### Redis Storage Keys

| Key | Purpose |
|---|---|
| `visitors` | Website visit counter |
| `downloads` | PDF download counter |
| `installs` | App installation counter |

**Note:** Visit tracking counts recorded page visits, not verified unique visitors. App installation tracking depends on browser-supported installation events; manual installation methods may not always be detected.

## Data Privacy

- Student form information is saved locally in the user's browser using LocalStorage.
- Student information is not uploaded to a server by the cover page form.
- Statistics are stored separately in Upstash Redis.
- Upstash credentials are configured as environment variables in Vercel and should never be exposed in frontend code.

## Project Structure

```text
miu-cover-page-generator/
│
├── api/
│   └── stats.js
│
├── assets/
│   ├── miu-logo.png
│   ├── miu-watermark.png
│   └── icon-192.png
│
├── index.html
├── manifest.json
├── sw.js
└── README.md
```

## Environment Variables

The statistics API requires the following environment variables in Vercel:

| Variable | Description |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis authentication token |

These credentials must be configured in the Vercel project's Environment Variables settings.

**Important:** Never commit Redis credentials or secret tokens to a public GitHub repository.

## Getting Started

### Prerequisites

- Git
- A GitHub account
- A Vercel account
- An Upstash Redis database for statistics tracking

### Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/mehedyrifat/miu-cover-page-generator.git
```

**2. Navigate to the project directory**

```bash
cd miu-cover-page-generator
```

**3. Run the application**

For basic frontend testing, open `index.html` in a browser.

For full API and PWA functionality, run the project through a local development server configured to support Vercel Serverless Functions.

## Installation as an App

MIU Cover Page Generator supports Progressive Web App installation.

1. Open the deployed website using a supported browser.
2. Select **Install App** or **Add to Home Screen**.
3. Confirm the installation when prompted.
4. Launch the application from your device.

## Deployment

The application is deployed using **Vercel**.

Vercel provides:

- Frontend hosting.
- Serverless API execution.
- HTTPS support.
- Automatic deployment through GitHub integration.

**Note:** GitHub Pages alone cannot execute the `/api/stats` Vercel Serverless Function. Use a hosting platform that supports serverless functions to enable the statistics system.

## Intended Users

Students of all academic departments at:

**Manarat International University (MIU)**  
Dhaka, Bangladesh.

## Project Goals

- Simplify academic cover page creation.
- Maintain consistent university-style formatting.
- Reduce repetitive manual document preparation.
- Provide convenient PDF generation.
- Support students across different academic departments.
- Make the application accessible on desktop and mobile devices.

---

## Author

**Developed by Mehedy Hasan Rifat**

A student-focused academic utility project developed for the students of Manarat International University.

**GitHub:** https://github.com/mehedyrifat

---

## License

This project is intended for educational and academic use. No formal open-source license has been specified.

---

**MIU Cover Page Generator**  
*Making Academic Document Preparation Simpler.*
