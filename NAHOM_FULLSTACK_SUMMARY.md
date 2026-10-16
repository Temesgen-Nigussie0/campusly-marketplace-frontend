# CAMPUSLY MARKETPLACE: FULL-STACK ARCHITECTURE & END-TO-END INTEGRATION DEFENSE GUIDE

* **Author / Candidate:** Nahom  
* **Role:** Full-Stack Software Engineer & Cross-Layer Integration Lead  
* **Host Organization:** Hance Technology PLC (*Publicly Operating as Formidable*), Bole, Addis Ababa  
* **Company Supervisor:** Hana Adane (Hannah) | **Technical Mentor:** Abubeker  
* **Academic Institution:** St. Mary's University, Faculty of Informatics, Department of Computer Science  
* **Project Title:** Campusly Marketplace  
* **Live Production URL:** `https://campusly-marketplace.vercel.app/`

---

## 1. PROJECT OVERVIEW & SCOPE OF RESPONSIBILITY

### 1.1 The Crucial Role of the Full-Stack Engineer
In a four-person engineering team building a multi-tier software product, specialized developers often focus deeply on their respective layers: one on frontend visual design, one on backend API services, and one on database modeling. However, without someone moving across all three layers, team projects frequently encounter severe friction:
* The frontend team designs forms that send data fields the backend never expected.
* The backend team exposes API endpoints that do not match the database schema constraints.
* Bugs occur in the "seams" between layers (caching issues, validation mismatches, and token expiration edge cases).

As the **Full-Stack Software Engineer**, my mandate was to eliminate the silos between the layers. I connected the user interface that university students interact with directly to the server-side business logic and the underlying PostgreSQL database.

### 1.2 My Specific Ownership on the Project
* **Cross-Tier Architecture & API Contract Alignment:** Establishing shared data contracts, DTO schemas, and response formats between the Next.js frontend, NestJS backend, and Prisma ORM.
* **End-to-End Feature Implementation:** Developing complete, multi-tier features spanning the entire lifecycle—from the React form and state handling, through the NestJS controller and service, down to the PostgreSQL relational query.
* **Authentication Pipeline Across All 3 Tiers:** Wiring user registration, Bcrypt password hashing, JWT session handling, and role-based guards across client components, server middleware, and database tables.
* **Content Moderation & Listing Lifecycle:** Implementing the end-to-end operational pipeline for resource submissions (`pending` -> `approved` / `rejected`), administrative review drawers, and automatic status resets.
* **Full-Stack Debugging & Quality Assurance:** Tracing cross-cutting bugs from visual symptoms in the browser back through network requests and API controllers to database constraints.
* **Production Deployment Verification:** Ensuring the Vercel-deployed frontend seamlessly communicated with the cloud-hosted backend and managed Supabase PostgreSQL database.

---

## 2. INITIAL PLANNING & CROSS-TIER ARCHITECTURAL FORMULATION

During the opening sprint of the internship at Hance Technology PLC, our team met to decompose the technical specification document provided by the company.

### 2.1 Tracing Features Across the Three Layers
While my teammates could focus on their specific layer's documentation, my role required me to trace every single feature description across all three application layers simultaneously:
* **The Product Listing Feature:** I cross-referenced the Next.js listing submission form with the NestJS `CreateProductDto` and mapped both onto the PostgreSQL `Product` table, ensuring field names, optional properties, and data types (e.g., price in ETB, category references) were perfectly aligned.
* **The Authentication Feature:** Traced how a student signing up on `/register` triggered an API call to `/auth/register`, passed through password hashing via Bcrypt, created rows in both `User` and `Profile` tables, and returned a signed JWT access token stored in the client's React `AuthContext`.
* **The Content Moderation Feature:** Mapped how an administrator clicking "Approve" or "Reject" on `/admin/verifications` called backend review endpoints, recorded audit logs in `ProductReview`, updated status in `Product`, and instantly refreshed the seller's dashboard view.

---

## 3. DEEP DIVE INTO THE FULL-STACK TECHNOLOGY STACK

Campusly was built using a cohesive, modern full-stack ecosystem:

```
┌─────────────────────────────────────────────────────────────┐
│                 PRESENTATION TIER (Frontend)                │
│       Next.js (App Router), React, TypeScript, Tailwind     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON / JWT Bearer
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 APPLICATION TIER (Backend API)               │
│             NestJS, Node.js, TypeScript, REST API           │
└──────────────────────────────┬──────────────────────────────┘
                               │ Prisma ORM Queries
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA TIER (Database)                    │
│             PostgreSQL 16 (Hosted on Supabase Cloud)        │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 The Presentation Tier (Next.js, React, Tailwind CSS)
* **Next.js (App Router):** Provided file-system routing, nested layouts for dashboards and admin portals, and server pre-rendering for academic search discoverability.
* **React:** Provided component-based UI construction, reactive state management, and interactive client directives (`'use client'`).
* **Tailwind CSS:** Provided utility-first styling with responsive design tokens and purged production stylesheets for fast mobile loading.

### 3.2 The Application Logic Tier (NestJS & Node.js)
* **Node.js:** Provided high-performance, asynchronous non-blocking event loop execution, efficiently handling concurrent student requests.
* **NestJS Framework:** Enforced modular architectural patterns (Modules, Controllers, Services), dependency injection, and declarative security guards for Role-Based Access Control (RBAC).

### 3.3 The Data Tier (PostgreSQL & Prisma ORM)
* **PostgreSQL 16 (on Supabase Cloud):** Enforced strict relational integrity, custom ENUMs (`Role`, `ProductStatus`), and multi-table ACID transactions.
* **Prisma ORM:** Bridged the application and data tiers, generating type-safe TypeScript interfaces from the database schema directly into our server services.

---

## 4. ARCHITECTURAL JUSTIFICATION: WHY THIS DECOUPLED FULL-STACK ARCHITECTURE?

When university evaluators ask: *"Why did you design a decoupled architecture (Next.js + NestJS + PostgreSQL) instead of building a traditional monolithic PHP or vanilla HTML/CSS/JS website?"*, explain the architectural advantages:

### 4.1 Decoupled Architecture vs. Monolithic PHP
1. **Multi-Platform Extensibility:**
   * In a traditional PHP monolith, the backend renders HTML directly for a browser. If the university wants a mobile application, the PHP backend must be rewritten or retrofitted.
   * With our decoupled architecture, the **NestJS backend is a pure REST API**. It serves JSON data identically to our Next.js web application and can immediately power future mobile apps (e.g., Flutter or React Native) without altering server code.
2. **Independent Scaling and Deployment:**
   * The frontend is deployed to **Vercel** on a global Content Delivery Network (CDN), caching static assets close to Ethiopian users. The backend runs in an isolated containerized environment. Scaling or updating the client UI does not risk taking down the API server or database.
3. **Application-Like Performance (No Page Reloads):**
   * Traditional PHP reloads the entire browser window on every action, flashing a white screen and consuming valuable cellular data. Next.js transitions happen instantly in client memory, drastically improving the student experience.

### 4.2 Component Architecture vs. Vanilla HTML/CSS/JavaScript
* **Maintainability & DRY Principle:** In vanilla HTML, building a 15-page application requires duplicating headers, footers, and cards 15 times. In our full-stack setup, UI components, API client utilities, and TypeScript types are written once and reused across the entire platform.
* **Type Safety from Database to UI:** Because we used TypeScript on both the frontend and backend with Prisma ORM, a change in a database column is immediately reflected in TypeScript types across backend controllers and frontend forms, eliminating runtime type mismatches.

---

## 5. END-TO-END FEATURE IMPLEMENTATION (CROSS-TIER EXAMPLES)

To showcase full-stack mastery, explain how complete features were built across all three tiers:

### 5.1 End-to-End Authentication & Authorization Flow
* **Frontend Tier:** The student submits credentials on `/login`. React Hook Form validates email format and password presence before sending the request.
* **Backend Tier:** The NestJS `AuthController` receives the payload, calls `AuthService` to compare the submitted password against the stored Bcrypt hash, and generates a cryptographically signed JWT containing user ID and role.
* **Database Tier:** Prisma executes an indexed query on `User.email` and joins `Profile` to retrieve student details.
* **Full-Stack Integration:** The frontend receives the JWT, stores it in `localStorage`, decodes the payload into `AuthContext`, and conditionally routes administrators to `/admin/overview` and students to `/dashboard`.

### 5.2 End-to-End Product Listing & Moderation Lifecycle
* **Creation Across Tiers:**
  * A seller fills out the submission form on `/dashboard/listings/new`, uploads preview images, and attaches the deliverable PDF.
  * The frontend dispatches `POST /products` with the `Authorization: Bearer <token>` header.
  * The NestJS `ProductsService` extracts the user ID from the token, assigns `status: 'pending'`, and creates the record in PostgreSQL.
  * The listing is immediately hidden from the public marketplace.
* **Moderation Across Tiers:**
  * The administrator opens `/admin/verifications` and sees the pending listing.
  * Clicking "Approve" calls `PATCH /admin/products/:id/review` with `status: 'approved'`.
  * The database updates `Product.status = 'approved'`, making the item immediately queryable on the public homepage.
  * If rejected, the admin submits a mandatory rejection note, which is persisted to `ProductReview` and displayed in the seller's dashboard drawer.
* **The Auto-Pending Re-Review Trigger:**
  * If the seller edits an approved listing, the backend update service automatically resets `status: 'pending'`, forcing it back into the admin moderation queue before changes become visible to buyers.

---

## 6. COMPLETE SYSTEM WORKFLOW: USER SIDE VS. ADMIN SIDE

### 6.1 THE USER SIDE (GUEST, BUYER, SELLER)
* **Unauthenticated Guest:** 
  * Explores the marketplace catalog at `/`, filtering by academic categories (Computer Science, Engineering, Medicine, etc.) and resource types.
  * Uses live keyword search and views product preview cards.
  * Attempting to buy or list triggers the `AuthModal`, requiring authentication without losing their browsing state.
* **Student Buyer:**
  * Logs in, browses verified study materials, and reviews seller verification badges.
  * Completes purchase transactions recorded in the `Transaction` table.
  * Unlocks the **Digital Locker** (`/dashboard/purchases` & `/dashboard/downloads`) to download protected PDF lecture notes and exam solutions.
* **Student Seller:**
  * Submits academic resources at `/dashboard/listings/new`.
  * Monitors items in `/dashboard/listings` via color-coded badges (`Pending Review`, `Approved`, `Rejected`, `Sold`).
  * If rejected, opens the feedback drawer to read the administrator’s specific explanation, makes corrections, and re-submits.
  * Uploads their university student ID card to `/dashboard/profile` to request official verification.

### 6.2 THE ADMIN SIDE (PLATFORM GOVERNANCE)
* **Role-Guarded Access:** Any non-admin user attempting to access `/admin/*` is terminated by frontend route guards and backend `RolesGuard(['admin'])`.
* **Platform Analytics (`/admin/overview`):** Displays aggregated metrics (total registered students, active listings, pending reviews, revenue totals) and time-series trend charts.
* **Listing Moderation Queue:** Admins inspect pending submissions and execute one-click approvals or mandatory-reason rejections.
* **Student Verification Queue (`/admin/verifications`):** Inspects uploaded university ID cards using a full-screen **Lightbox Modal** to verify academic credentials and grant or revoke verified badges.
* **User Management (`/admin/users`):** Searchable user directory with ban/unban controls, protected by safeguards preventing administrators from banning other admins.
* **Taxonomy Management (`/admin/settings`):** CRUD management of university departments and subcategories.

---

## 7. REAL-WORLD CROSS-TIER BUGS & INTEGRATION CHALLENGES SOLVED

Because my role sat at the intersection of all three layers, I diagnosed and resolved subtle bugs that single-layer developers missed:

### 1. Stale UI Caching After Admin Moderation
* **The Problem:** When an admin approved or rejected a listing, the seller’s dashboard continued to display the old status as "Pending" until the student performed a hard browser refresh.
* **The Cause:** The frontend was retaining cached data locally and was not re-triggering API calls after modal closures.
* **The Fix:** Implemented active cache invalidation and data refetching in the Next.js listing component upon modal actions and route focus, ensuring real-time consistency.

### 2. Validation Mismatches Causing Generic 500 Errors
* **The Problem:** The frontend form permitted users to submit listings with empty strings `""` for optional fields or negative prices, which violated PostgreSQL column constraints and caused the backend to crash with confusing, generic 500 server errors.
* **The Fix:** Synchronized validation across all three tiers: added client-side validation rules in React Hook Form matching the NestJS `class-validator` DTOs, and transformed empty strings into true `null` values before reaching PostgreSQL.

### 3. Public API Deliverable Leak
* **The Problem:** The frontend hid the "Download" button from non-paying visitors, but the public catalog API endpoint was still sending the raw `deliverable_file_url` in the JSON response. Any tech-savvy user could inspect network traffic and download materials for free.
* **The Fix:** Sanitized public query responses in the NestJS service by stripping the deliverable URL from public payloads and creating a separate, transaction-guarded download endpoint.

### 4. Admin Ban Enforcement on Active Sessions
* **The Problem:** Banned users could continue purchasing items until their JWT expired because the server only verified token mathematical signatures.
* **The Fix:** Added a real-time database check in the backend auth guard verifying account status on every request, terminating banned sessions instantaneously.

---

## 8. PRODUCTION DEPLOYMENT & TEAM COLLABORATION

* **Collaborative Git Workflows:** Managed shared GitHub repositories using feature branches, pull requests, and peer reviews. Held daily standups with Temesgen, Usman, and Naod to unblock endpoints and resolve database dependencies.
* **Multi-Tier Deployment Verification:**
  * Frontend deployed to **Vercel** with automated CI/CD pipelines connected to GitHub.
  * Backend containerized using **Docker** and hosted on cloud infrastructure.
  * PostgreSQL database hosted on **Supabase** with transaction connection pooling.
* **Final Presentation:** Successfully demonstrated the live full-stack platform (`campusly-marketplace.vercel.app`) to company mentors and executives at Hance Technology PLC.

---

## 9. ORAL DEFENSE MASTER Q&A: FULL-STACK INTEGRATION

### Q1: "What was your specific role as a Full-Stack Developer on this project?"
> *"My role was to act as the architectural bridge between frontend, backend, and database. While my teammates focused deeply on individual layers, I ensured that the Next.js user interface cleanly matched the NestJS REST API endpoints and PostgreSQL database schema. I developed features end-to-end, synchronized API data contracts, and diagnosed cross-cutting bugs that occurred at the seams between the layers."*

### Q2: "Why is a decoupled architecture better than a traditional PHP monolith?"
> *"A decoupled architecture separates client presentation from server logic. Our NestJS backend serves purely as an independent REST API returning standardized JSON. This means the exact same backend can support our Next.js web application today and a Flutter or React Native mobile app in the future without rewriting server logic. Furthermore, Next.js provides instantaneous single-page navigation without the full-page reloads and white flashes characteristic of traditional PHP websites."*

### Q3: "How did you ensure that study files were protected from unauthorized downloads?"
> *"We enforced security across both layers. On the frontend, download actions are restricted to verified purchasers. More importantly, on the backend, public catalog endpoints actively strip the deliverable URL from the API response so the file link is never transmitted over the network. Access is only granted through a dedicated download route that queries the database to verify a completed purchase record."*

### Q4: "What was the most challenging bug you solved?"
> *"The most challenging bugs were cross-cutting issues, such as the stale listing status bug where an admin rejection was not updating on the seller's dashboard. I traced the problem across all three layers—ruling out database updates and backend API responses, and discovering that the frontend was retaining cached state. I fixed it by implementing programmatic cache invalidation and refetching upon component focus and modal actions."*
