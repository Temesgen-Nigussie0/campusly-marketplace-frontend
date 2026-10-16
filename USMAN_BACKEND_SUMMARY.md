# CAMPUSLY MARKETPLACE: BACKEND ARCHITECTURE, API ENGINEERING & SECURITY DEFENSE GUIDE

* **Author / Candidate:** Usman Hassen Usman  
* **Role:** Backend Software Engineer  
* **Host Organization:** Hance Technology PLC (*Publicly Operating as Formidable*), Bole, Addis Ababa  
* **Company Supervisor:** Hana Adane (Hannah) | **Technical Mentor:** Abubeker  
* **Academic Institution:** St. Mary's University, Faculty of Informatics, Department of Computer Science  
* **Project Title:** Campusly Marketplace  
* **Live Production URL:** `https://campusly-marketplace.vercel.app/`

---

## 1. PROJECT OVERVIEW & SCOPE OF RESPONSIBILITY

### 1.1 The Role of the Backend in Campusly
The backend of Campusly is the core computational engine and security gatekeeper of the platform. While the frontend provides an intuitive visual interface for university students and administrators, the backend is responsible for:
* Enforcing business rules, validation constraints, and operational lifecycles.
* Safeguarding user accounts, password hashes, and session tokens.
* Protecting sensitive digital assets (preventing unauthorized downloads of paid lecture notes and exam papers).
* Managing transactional integrity, role-based access control (RBAC), and administrative governance.

### 1.2 My Specific Ownership on the Project
As the dedicated **Backend Software Engineer**, I was responsible for designing, building, securing, and testing the server-side architecture:
* **Server Architecture & NestJS Setup:** Structuring a clean, scalable, modular backend using **NestJS** (Node.js and TypeScript).
* **API Endpoint Engineering:** Developing comprehensive RESTful API controllers and services for Authentication, User Profiles, Academic Taxonomy, Product Listings, Transactions, and Admin Moderation.
* **Authentication & Security Guard Implementation:** Implementing **Bcrypt** password encryption, **JWT (JSON Web Token)** session issuance, and NestJS Guards for role-based authorization (`user` vs `admin`).
* **Digital Asset Protection & Storage:** Designing the deliverable file protection pipeline ensuring paid academic materials are never leaked to non-paying users.
* **Payment Architecture with Webhooks:** Implementing checkout logic and verifying payments server-side via webhooks rather than blindly trusting frontend inputs.
* **DevOps, Containerization & CI/CD:** Packaging the backend into **Docker** containers with Nginx and configuring **GitHub Actions** for automated build and integration pipelines.
* **System Testing & Bug Resolution:** Using **Postman** to systematically test endpoints and diagnosing real-world security vulnerabilities (such as banned user token loopholes, public file leaks, and self-purchase fraud).

---

## 2. INITIAL BACKEND PLANNING & SPEC DECOMPOSITION

Before developing any server routes, our team met to break down the technical specifications into an actionable backend architecture.

### 2.1 Moving Beyond Classroom Code to Modular Architecture
In university assignments, backend projects often consist of a single script handling routes, database queries, and styling. For an enterprise marketplace like Campusly, that monolithic approach leads to spaghetti code and merge conflicts. 

Under the guidance of our supervisor Hannah and technical mentor Abubeker, I adopted the **NestJS Modular Design Pattern**:
* **Controllers (`*.controller.ts`):** Dedicated exclusively to handling incoming HTTP requests, route routing, query parsing, and returning HTTP status codes.
* **Services (`*.service.ts`):** Dedicated to executing core business logic, validation algorithms, and database operations via Prisma ORM.
* **Modules (`*.module.ts`):** Encapsulating related domain features into isolated, testable modules (e.g., `AuthModule`, `ProductsModule`, `AdminModule`).
* **Data Transfer Objects (DTOs):** Defining strict input schemas decorated with `class-validator` to guarantee that malformed or malicious payloads are rejected before ever reaching server services.

---

## 3. DEEP DIVE INTO BACKEND TECHNOLOGIES & TOOLS

### 3.1 Node.js (Server Runtime Environment)
* **What it is:** A high-performance, asynchronous event-driven JavaScript runtime engine built on Google Chrome's V8 engine.
* **Why it was used in Campusly:**
  * **Asynchronous Non-Blocking I/O:** Ideal for marketplace workloads where hundreds of students concurrently search listings, upload files, and query profile data. Node.js handles high-concurrency requests efficiently without spinning up expensive OS threads for each connection.
  * **Unified TypeScript Ecosystem:** Enabled our team to share data models and TypeScript types between the frontend and backend, reducing cognitive friction and communication errors.

### 3.2 NestJS Framework (Enterprise Architecture for Node.js)
* **What it is:** A progressive Node.js framework that brings architectural structure, TypeScript support, and Object-Oriented Programming (OOP) patterns to server-side development.
* **Why it was used in Campusly:**
  * **Dependency Injection (DI):** Decouples database services, authentication guards, and controllers, making code testable and easy to maintain.
  * **Built-in Security Guards & Interceptors:** Made implementing Role-Based Access Control (RBAC) clean and declarative using `@UseGuards(JwtAuthGuard, RolesGuard)`.
  * **Standardized Exception Filters:** Centralized error handling, ensuring the backend returns uniform, professional JSON error messages (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`) rather than crashing unhandled.

### 3.3 JWT (JSON Web Tokens) & Bcrypt
* **What they are:** 
  * **Bcrypt:** An adaptive, one-way cryptographic hashing function incorporating random salts.
  * **JWT:** A compact, URL-safe standard for transmitting cryptographically signed claims between client and server.
* **Why they were used in Campusly:**
  * **Password Security:** Plaintext passwords never enter our database. User passwords are salted and hashed with Bcrypt before saving. Even if the database were compromised, passwords remain unbreakable.
  * **Stateless Scalability:** JWT tokens allow the backend to verify user identity on every request without performing expensive session lookups against the database, drastically improving server response speeds.

### 3.4 Prisma ORM (Type-Safe Database Integration)
* **What it is:** An advanced Object-Relational Mapper connecting our NestJS services directly to the PostgreSQL database.
* **Why it was used in Campusly:**
  * **Type-Safe Queries:** Automatically generated TypeScript types from the database schema, ensuring every query in `ProductsService` or `UsersService` was checked at compile time.
  * **Eliminating SQL Injection:** Prisma automatically parameterizes all queries, completely preventing malicious SQL injection attacks.

### 3.5 Docker & Containerization
* **What it is:** A platform that packages software into lightweight, isolated containers containing all system libraries and configurations.
* **Why it was used in Campusly:**
  * Guaranteed the backend ran identically on local development laptops and production cloud servers, eliminating the classic "it works on my machine" dilemma.
  * Isolated the Node.js runtime and environment dependencies into reproducible container images.

### 3.6 Postman (API Testing & Contract Verification)
* **What it is:** An industry-standard platform for designing, testing, and debugging REST APIs.
* **Why it was used in Campusly:**
  * Used daily to test endpoints before frontend integration, verify JWT authorization headers, test edge cases with malformed payloads, and inspect status codes.

---

## 4. ARCHITECTURAL JUSTIFICATION: WHY NESTJS VS. VANILLA EXPRESS OR PHP?

Examiners frequently ask: *"Why did you use NestJS with Node.js instead of a traditional PHP backend (like Laravel) or basic Express.js?"*

```
TRADITIONAL PHP / MONOLITHIC SERVER
┌──────────────────────────────────────────────────────────────┐
│  Server renders entire HTML page on every request            │
│  Tightly coupled UI views, routing, and database queries     │
│  Cannot easily support mobile applications in the future     │
└──────────────────────────────────────────────────────────────┘

CAMPUSLY NESTJS REST API ARCHITECTURE
┌──────────────────────────────────────────────────────────────┐
│  Decoupled, Headless RESTful API Server                      │
│  Modular Architecture: AuthModule, ProductsModule, etc.      │
│  Stateless JWT Authentication with Role Guards               │
│  Serves Next.js Web Client, ready for Flutter/React Native   │
└──────────────────────────────────────────────────────────────┘
```

### 4.1 Why NestJS Instead of Plain Express.js?
1. **Enforced Architecture vs. Anarchy:**
   * Plain Express is an un-opinionated library with zero architectural guidelines. In a team project, four developers will write Express in four completely different ways, resulting in messy files where routing, business logic, and database queries are jumbled together.
   * NestJS enforces an enterprise-grade architectural pattern out of the box (Controllers, Services, Modules). This allowed our team to split up backend modules without running into each other's code.
2. **First-Class TypeScript Support:**
   * Express was built for plain JavaScript, requiring manual and awkward setups for TypeScript. NestJS is built natively with TypeScript, allowing us to leverage decorators (`@Post`, `@Get`, `@Body`, `@UseGuards`), dependency injection, and static type analysis.

### 4.2 Why This Stack Instead of a Traditional Monolithic PHP Backend?
1. **Decoupled API Architecture:**
   * Traditional PHP servers generate HTML and send it to the browser, tightly coupling backend logic with website presentation.
   * By building a standalone NestJS REST API, our backend is entirely decoupled. It communicates strictly via standardized JSON payloads. If the university decides to launch a mobile app tomorrow, the mobile app connects to the exact same NestJS API endpoints without any backend modifications.
2. **Asynchronous Concurrency Performance:**
   * Traditional PHP uses a synchronous, blocking multi-process model where each request spawns a new process, consuming significant server memory under traffic spikes.
   * Node.js and NestJS utilize a single-threaded, non-blocking event loop capable of handling high concurrent search queries and transactions with a fraction of the memory footprint.

---

## 5. CORE BACKEND MODULES DELIVERED

The backend was organized into 6 core functional modules:

1. **`AuthModule` (Authentication & Security):**
   * Handled user registration, credential verification, Bcrypt hashing, and JWT access token issuance.
   * Provided `JwtAuthGuard` to validate bearer tokens on incoming requests.
2. **`UsersModule` (Profiles & Role Management):**
   * Endpoints for fetching and updating user profiles.
   * Managed student university ID card upload records for the verification queue.
   * Enforced soft-ban discipline status checks on every incoming request.
3. **`ProductsModule` (Resource Listings & Search):**
   * Comprehensive CRUD endpoints: creating listings, editing items, deleting listings, and retrieving catalog items.
   * Handled multi-criteria search filtering (by keyword, department category, material type, and price).
   * Enforced deliverable file protection and automatic reset to `pending` upon edits.
4. **`Categories & ProductTypes Modules`:**
   * Lookup endpoints providing academic department taxonomy and nested subcategories.
   * Administrative CRUD endpoints for adding or updating academic disciplines.
5. **`TransactionsModule` (Purchasing & Digital Fulfillment):**
   * Created purchase transaction records, linking buyers to paid products.
   * Provided verified download access routes that verify completed purchase records before generating file links.
   * Structured for Stripe webhooks and ready for local Ethiopian payment gateways (Telebirr).
6. **`AdminModule` (Governance & Moderation):**
   * Protected by `RolesGuard(['admin'])` to restrict access strictly to platform administrators.
   * Endpoints for approving or rejecting resource listings with mandatory feedback reasons.
   * Endpoints for approving or revoking verified student badges after inspecting ID card uploads.
   * User management endpoints for banning or unbanning abusive accounts.

---

## 6. COMPLETE SYSTEM WORKFLOW: USER SIDE VS. ADMIN SIDE

To demonstrate deep command of the system, explain how data flows through the backend controllers, services, and security guards for both user categories:

### 6.1 THE USER SIDE (STUDENT & SELLER BACKEND FLOW)
* **Registration & Secure Password Storage:** The student sends registration details. `AuthService` checks if the email already exists, hashes the password with 10 salt rounds of Bcrypt, creates the user and profile rows via Prisma, and returns a signed JWT.
* **Listing Creation & Mandatory Pending State:**
  * When a seller posts a resource (`POST /products`), `ProductsService` extracts the authenticated student’s ID from the JWT payload.
  * The service inserts the listing into the database with `status: 'pending'`.
  * The listing is immediately excluded from all public search queries.
* **Secure Deliverable File Obfuscation:**
  * When any user browses the public catalog (`GET /products`), `ProductsService` actively **strips the deliverable file URL** from the returned JSON response.
  * When a user requests a single listing (`GET /products/:id`), the service queries the `Transaction` table. If the requesting user is NOT the owner and has NOT purchased the item, the download URL is deleted from the response, and a boolean `has_purchased: false` is returned.
* **Purchasing & Unlocking Deliverables:**
  * When a student buys notes, `TransactionsService` creates a transaction marked as `completed`.
  * When the buyer subsequently calls the download endpoint, the service verifies the completed purchase record, authenticates the buyer, and securely unlocks the file.
* **The Auto-Pending Re-Moderation Safeguard:**
  * If an authorized seller updates an already approved listing (`PATCH /products/:id`), the service validates ownership, updates the fields, and **automatically resets `status: 'pending'`**, sending it back into the moderation queue.

### 6.2 THE ADMIN SIDE (MODERATION & GOVERNANCE FLOW)
* **Role-Based Route Protection:** All administrative endpoints are decorated with `@UseGuards(JwtAuthGuard, RolesGuard)` and `@Roles('admin')`. If a regular student attempts to call an admin route, `RolesGuard` inspects the user's role from the token, rejects the request, and returns an immediate `403 Forbidden` response.
* **Listing Moderation Logic:**
  * The admin calls `PATCH /admin/products/:id/review` with a decision (`approved` or `rejected`).
  * If approved, the service sets `status: 'approved'`, making it immediately queryable in the public marketplace.
  * If rejected, the service validates that a non-empty `rejection_reason` was supplied. It updates `status: 'rejected'` and logs the decision in `ProductReview` for the seller to view.
* **Student Verification Pipeline:**
  * The admin calls `PATCH /admin/verifications/:id` with approval or rejection.
  * Upon approval, `UsersService` updates the student’s profile to `is_verified: true`, which dynamically cascades verified trust badges to all listings published by that student.
* **User Discipline & Self-Protection Check:**
  * When an admin bans a user (`PATCH /admin/users/:id/ban`), the service verifies that the target user is NOT another administrator. If the target is an admin, the service throws a `ForbiddenException`, preventing hostile takeover or accidental administrative lockouts.

---

## 7. REAL-WORLD BACKEND BUGS & SECURITY VULNERABILITIES SOLVED

During development and systematic Postman testing, I identified and resolved several critical real-world backend security vulnerabilities:

### 1. The Banned User Token Loophole
* **The Problem:** When an administrator banned a malicious user, that user could still purchase materials, edit listings, and post comments until their JWT access token expired, because the backend only verified token signatures without checking database status.
* **The Fix:** Implemented a custom middleware/guard check that queries the user’s `is_banned` status from the database on every authenticated request. If banned, access is terminated immediately with a `403 Forbidden`, cutting off malicious users instantaneously.

### 2. The Public API Deliverable File Leak
* **The Problem:** The frontend concealed the "Download" button from unpaid users, but inspecting the raw JSON payload in the browser network tab revealed that the public `GET /products` endpoint was still transmitting the sensitive `deliverable_file_url`. Any tech-savvy student could copy the link and download paid materials for free without paying.
* **The Fix:** Sanitized public query responses in `ProductsService`. The deliverable URL is stripped out completely for general browsing. Deliverable links are only served through a dedicated, transaction-verified route.

### 3. Silent Listing Edits Bypassing Moderation
* **The Problem:** A student could submit an innocent, high-quality study guide to get approved by an administrator, and then immediately edit the listing title, description, or file to spam or inappropriate content without triggering re-review.
* **The Fix:** In `ProductsService.update()`, added logic that automatically resets `status: 'pending'` whenever a listing is updated, forcing any modified resource back through administrative moderation.

### 4. Self-Purchase Volume Inflation
* **The Problem:** A seller could purchase their own listings using dummy accounts or test cards to artificially inflate their sales volume, climb marketplace rankings, and generate fake reviews.
* **The Fix:** Added validation in the checkout service comparing `buyer_id` with `product.user_id`. If they match, the transaction is rejected with a `400 Bad Request` explaining that sellers cannot purchase their own products.

### 5. Memory Overload on File Uploads
* **The Problem:** Initially, file uploads were ingested into memory before file types and sizes were checked. A user could upload an oversized 100MB file or an executable `.exe`, consuming server memory and creating denial-of-service risks.
* **The Fix:** Configured strict upload interceptors with file-size limits (maximum 10MB) and MIME-type whitelisting (PDF and images only), rejecting invalid payloads at the network boundary before memory allocation.

---

## 8. DEVOPS, DOCKER CONTAINERIZATION & CI/CD

* **Docker & Multi-Stage Builds:** Authored the backend `Dockerfile` using multi-stage builds. Multi-stage builds compile TypeScript in a build container, discard development dependencies, and run only the compiled JavaScript in a lightweight Alpine Linux production container.
* **CI/CD with GitHub Actions:** Configured automated GitHub Actions workflows that run automated linting and build checks on every push to the repository, ensuring broken code is never merged into the main development branch.
* **Production Environment Configurations:** Managed secure environment configurations (including JWT secrets, database connection strings, and CORS whitelist settings), ensuring local development ports never conflicted with live cloud deployments.

---

## 9. ORAL DEFENSE MASTER Q&A: BACKEND ENGINEERING

### Q1: "Why did you use NestJS instead of basic Express.js?"
> *"Express is completely un-opinionated and lacks architectural structure, which quickly leads to unmaintainable, messy code in team environments. NestJS enforces an enterprise-grade modular architecture (Modules, Controllers, Services) out of the box, natively supports TypeScript, and provides built-in dependency injection and security guards. This allowed our team to develop isolated, testable backend modules with clean separation between routing, business logic, and database access."*

### Q2: "How did you secure user authentication and authorization?"
> *"Authentication is handled using Bcrypt for one-way salted password hashing and stateless JSON Web Tokens (JWT) for session management. For authorization, we implemented Role-Based Access Control (RBAC) using NestJS Guards (`JwtAuthGuard` and `RolesGuard`). Admin routes are strictly protected at the server boundary—even if an unauthorized user attempts to call an admin endpoint directly via curl or Postman, the server verifies their token role and terminates the request with a `403 Forbidden`."*

### Q3: "How did you prevent users from accessing paid study materials without paying?"
> *"We solved this at the API response level. In public catalog endpoints, the backend completely removes the `deliverable_file_url` from the JSON payload so it never reaches the browser. File downloads are handled through a dedicated route that queries the database to verify whether the requesting user is the original seller or has a recorded, completed transaction in the `Transaction` table before granting access."*

### Q4: "What happens if a seller edits an approved listing to something inappropriate?"
> *"We built an automatic re-review trigger in our `ProductsService`. Whenever an update request is executed on a listing, the service automatically resets its status back to `pending`. This forces the listing off the public marketplace and places it back into the administrative moderation queue, ensuring sellers cannot bypass content vetting."*
