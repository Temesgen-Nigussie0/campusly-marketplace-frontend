# Project Overview: Campusly Marketplace

**Authoritative Technical Reference & Handover Document**  
_Generated based on direct codebase inspection of routes, schemas, controllers, services, guards, and active configurations._

---

## 1. Project Summary

Campusly Marketplace is a specialized digital peer-to-peer (P2P) web marketplace engineered specifically for university students and academic communities. The platform enables students to buy, sell, and exchange academic resources, study guides, code repositories, course notes, digital project templates, and freelance technical services within a verified campus ecosystem.

By restricting access to academic networks and introducing a multi-tiered student verification workflow, Campusly addresses the trust and quality deficits common in generic classifieds platforms. Sellers can upload digital deliverable files securely gated behind instant transaction authorization, while buyers gain immediate access to course materials verified by campus peers.

The platform balances peer autonomy with centralized oversight. All user listings undergo an admin moderation queue before public publication, while administrators maintain continuous visibility over platform activity, seller compliance, transactional ledgers, user verification queues, and system-wide performance metrics.

---

## 2. Tech Stack & Component Architecture

All technology dependencies, version numbers, component modules, and architectural rationale have been verified against the codebase manifests (`package.json`, `node_modules`, and component trees):

---

### 2.1 Frontend Architecture & Component Ecosystem

The frontend client is built on Next.js 16 using the App Router model, structured into modular client/server component hierarchies, custom UI design tokens, context providers, and dynamic route handlers:

- **Framework & Core Engine**:
  - **Next.js (`v16.2.10`)**: App Router architecture utilizing nested layouts (`app/layout.tsx`, `app/admin/layout.tsx`, `app/dashboard/layout.tsx`), route grouping, server-rendered page shells, and client-side page transitions.
  - **React (`v19.2.4`) & React DOM (`v19.2.4`)**: Core component UI engine rendering declarative states, reactive context hooks, and DOM portals for modal overlays.

- **Styling, Design System & Theming**:
  - **TailwindCSS (`v4.0.0`) & `@tailwindcss/postcss` (`v4.0.0`)**: Utility-first CSS framework coupled with custom CSS variables in `app/globals.css`.
  - **Design System**: Built with modern visual tokens including custom HSL color palettes, subtle glassmorphism (`backdrop-blur-md`, semi-transparent borders), glowing accent highlights, and dark-mode aesthetic styling.
  - **Theme Management (`components/layout/ThemeProvider.tsx`)**: Client-side theme provider supporting dynamic dark and light mode switching with persisted theme state.

- **Animations & Micro-Interactions**:
  - **Framer Motion (`v12.43.0`)**: Powers interactive UI animations including smooth card hover scaling, layout transitions, modal backdrop fade-ins, filter tab sliding indicators, and dynamic feedback toasts.

- **Frontend Component Modules**:
  - **Core UI Primitives (`components/ui/`)**:
    - `Button.tsx`: Customizable button component supporting variants (`primary`, `secondary`, `outline`, `danger`, `ghost`) and loading state spinners.
    - `Input.tsx`: Accessible form field input with floating label animations, error boundary highlights, helper text, and show/hide password toggles.
    - `Modal.tsx`: Accessible portal dialog overlay with backdrop blur, keyboard ESC dismissal, and focus trapping.
    - `Badge.tsx`: Visual tag component displaying entity statuses (`pending`, `approved`, `rejected`, `sold`, `verified student`).
    - `StatCard.tsx`: Metric card for analytics dashboards displaying total counters, icons, and trend indicators.
    - `EmptyState.tsx`: Graphic placeholder component displayed when zero search results, listings, or notifications are found.
    - `Pagination.tsx`: Paginated navigation controls for large data tables and listing grids.
    - `Skeleton.tsx` & `Spinner.tsx`: Loading shimmer blocks and spinning indicators for asynchronous data fetches.
  - **Custom Loading Primitives (`components/loading-ui/`)**:
    - `twin-orbit.tsx` & `fade-arc.tsx`: Custom SVG-based animated loading graphics used during high-level layout mounts and route transitions.
  - **Layout & Navigation (`components/layout/`)**:
    - `Navbar.tsx`: Sticky navigation header featuring search query input triggers, category navigation links, dynamic role-based navigation (Buyer / Seller / Admin links), user avatar dropdown, and mobile navigation drawer.
    - `Footer.tsx`: Universal footer featuring platform mission, category links, legal disclosures, and contact links.
  - **Marketplace Components (`components/marketplace/`)**:
    - `ProductCard.tsx`: Marketplace grid card featuring product preview image carousel, price formatting in ETB, category pill, verified student seller badge, and hover action triggers.
    - `ProductCardSkeleton.tsx`: Multi-card skeleton loader preserving layout geometry while fetching marketplace listings.
    - `FilterBar.tsx`: Dynamic search and filtering control bar supporting full-text search input, category tabs, product type dropdowns, and sorting order selectors.

- **State Management & Authentication Context (`contexts/AuthContext.tsx`)**:
  - Centralized React context managing user authentication state, JWT access token storage, automatic token refreshing, user profile state, session termination, and client-side route guard protection.

- **Forms, Data Utilities & Iconography**:
  - **React Hook Form (`v7.82.0`)**: Form state tracking, client-side input validation, error handling, and performance-optimized input binding.
  - **Date Utilities (`date-fns v4.4.0`)**: Date parsing and relative time formatting (e.g. "2 hours ago", "Member since 2026") across user activity feeds, transactions, and reviews.
  - **Lucide React (`v1.25.0`)**: Clean, consistent SVG icon library used across navigation bars, buttons, status indicators, and metric dashboards.
  - **TypeScript (`v5.x`)**: Strict static typing across API DTO payload interfaces, context values, Prisma models, and component props.

---

### 2.2 Backend API Architecture & Technologies

The backend API is built as a modular NestJS server (`v11.1.28`), exposing RESTful controllers, decoupled domain services, custom authentication guards, and validation pipelines:

- **Framework & Modular Architecture**:
  - **NestJS (`v11.1.28`)**: Structured around `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, and `@nestjs/config` (`v4.0.4`).
  - **Feature Modules**: Organized into decoupled domain modules: `AuthModule`, `UsersModule`, `ProductsModule`, `CategoriesModule`, `ProductTypesModule`, `AdminModule`, `TransactionsModule`, `UploadsModule`, and global `PrismaModule`.

- **Database Engine & ORM Rationale**:
  - **Prisma Client & CLI (`v7.8.0`)**: Type-safe database ORM managing query execution, relational inclusions (`include: { seller: true, images: true }`), and transactional atomic operations.
  - **PostgreSQL 16 Engine (Supabase Cloud & Docker)**:
    - _Deployment & Target Rationale_: PostgreSQL 16 hosted on **Supabase Cloud** for the deployed production environment (Docker-based local Postgres container used during local development). Supabase Cloud Postgres was selected specifically to support live deployment on Vercel (frontend) and Railway (backend) — a locally-hosted database cannot be reached by external cloud hosting platforms, making a managed cloud Postgres instance a mandatory requirement of the deployment target architecture, not a deviation from it.

- **Authentication & Security Infrastructure**:
  - **Passport JWT (`@nestjs/passport v11.0.5`, `@nestjs/jwt v11.0.2`, `passport-jwt v4.0.1`, `passport v0.7.0`)**: Implements stateless JWT authentication using Bearer tokens.
  - **Bcrypt (`v6.0.0`)**: Salted password hashing (12 rounds) for registration and password changes.
  - **Guards & Authorization**:
    - `JwtAuthGuard`: Extracts and verifies access tokens.
    - `RolesGuard` & `@Roles('admin')`: Custom metadata decorator enforcing role-based access control on sensitive endpoints.
    - **Active Database Account Guard**: On every request, `JwtStrategy` queries the database (`prisma.user.findUnique`) to verify account status. If `is_banned` is `true`, the strategy immediately throws a `403 ForbiddenException`, instantly revoking access even for previously issued valid JWT tokens.
  - **Rate Limiting (`@nestjs/throttler v6.5.0`)**: Throttles API endpoint abuse.

- **Data Validation & DTO Layer**:
  - **`class-validator` (`v0.15.1`) & `class-transformer` (`v0.5.1`)**: Global NestJS `ValidationPipe` enforces incoming payload schemas across DTOs (`CreateProductDto`, `RegisterDto`, `BanUserDto`, etc.), validating string bounds, numeric constraints, array item types, and optional parameters before controller execution.

- **File & Media Storage Pipeline**:
  - **Cloudinary Node SDK (`v2.10.0`)**: Integrated with NestJS `FileInterceptor` via Express Multer memory storage buffers.
  - Handles image upload endpoints (`POST /uploads/image`) with image mimetype filters (JPEG, PNG, WEBP, Max 5MB) for profile avatars and product listing photos, as well as file upload endpoints (`POST /uploads/file`, Max 10MB) for gated deliverable files.

- **Payment Processing Strategy & Regional Market Rationale**:
  - **Internal Synchronous Mock Checkout**: Handled via an internal, synchronous mock transaction workflow (`is_test: true`, instant `completed` status) by deliberate design.
  - _Market & Regional Rationale_: Credit-card-based payment platforms (such as Stripe) have negligible adoption among the platform's target university student demographic in Ethiopia. Stripe was evaluated and intentionally not integrated for this reason.
  - _Architecture & Future Provider Handoff_: The full purchase-to-delivery pipeline (transaction recording, self-purchase validation, product access state update, deliverable file unlocking, seller sales tracking, buyer reviews) is fully built, tested, and operational against this mock trigger. The backend transaction service is explicitly architected so the trigger point can be swapped for a real payment provider's webhook confirmation event (specifically **Telebirr**, Ethio Telecom's dominant mobile money platform) without requiring any structural changes downstream.

---

## 3. Architecture Overview

The system follows a decoupled client-server architecture with secure API boundary controls:

**Client Layer**:
- Next.js 16 App Router Frontend (Port 3000)
- Sends HTTP REST Requests & Multipart FormData with Bearer JWT tokens

**Backend API Layer**:
- NestJS 11 Modular Backend API Server (Port 3002)
- Feature Modules: Auth Module, Users Module, Products & Gatekeeper Module, Admin Moderation & Analytics Module, Transactions Module, Uploads Module

**Storage & Media Layer**:
- Cloudinary Cloud Media CDN (Buffer upload streaming via Express Multer)

**Database Layer**:
- Managed Supabase PostgreSQL 16 Instance (Queried via Prisma ORM v7.8 Client pooler)

---

## 4. Database Schema

Extracted directly from `node_modules/.prisma/client/schema.prisma`:

### Enums

- **`Role`**: `user`, `admin`
- **`ProductStatus`**: `pending`, `approved`, `rejected`, `sold`

### Data Models

#### 1. `User`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Unique user identifier |
| `email` | String | `@unique` | Account email address |
| `password_hash` | String | | Bcrypt hashed password |
| `role` | Role | `@default(user)` | User authorization role (`user` or `admin`) |
| `is_banned` | Boolean | `@default(false)` | Account ban status flag |
| `banned_reason` | String? | | Optional reason for account ban |
| `banned_at` | DateTime? | | Timestamp when account was banned |
| `created_at` | DateTime | `@default(now())` | Account creation timestamp |

#### 2. `Profile`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Profile record identifier |
| `user_id` | String | `@unique`, FK -> `User.id` (Cascade) | User relation |
| `username` | String | `@unique` | Public unique username handle |
| `name` | String | | Display full name |
| `bio` | String? | | Short biography |
| `avatar_url` | String? | | Cloudinary avatar image URL |
| `is_verified` | Boolean | `@default(false)` | Student verification flag |
| `phone` | String? | | Contact phone number |
| `student_id` | String? | | University student ID number |
| `student_id_card_url` | String? | | Uploaded student ID card image URL |
| `verification_status` | String | `@default("unverified")` | State: `unverified`, `pending`, `verified`, `rejected` |
| `verification_reason` | String? | | Reason for verification decision |
| `notify_email` | Boolean | `@default(true)` | Email notification toggle |
| `notify_push` | Boolean | `@default(true)` | Push notification toggle |
| `notify_sms` | Boolean | `@default(false)` | SMS notification toggle |

#### 3. `Category`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Category identifier |
| `name` | String | `@unique` | Category name |

#### 4. `ProductType`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Product type identifier |
| `category_id` | String | FK -> `Category.id` (Cascade) | Parent category relation |
| `name` | String | | Sub-category / product type name |
| Constraint | | `@@unique([category_id, name])` | Unique name per category |

#### 5. `Product`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Product listing identifier |
| `user_id` | String | FK -> `User.id` (Cascade) | Seller user relation |
| `title` | String | | Listing title |
| `description` | String | | Listing detailed description |
| `price` | Float | | Price in ETB |
| `status` | ProductStatus | `@default(pending)` | Moderation status |
| `category_id` | String | FK -> `Category.id` | Associated category |
| `product_type_id` | String | FK -> `ProductType.id` | Associated product type |
| `is_featured` | Boolean | `@default(false)` | Featured placement flag |
| `is_hidden` | Boolean | `@default(false)` | Seller hidden state toggle |
| `report_count` | Int | `@default(0)` | Count of user flags/reports |
| `deliverable_file_url` | String? | | Protected Cloudinary file download URL |
| `created_at` | DateTime | `@default(now())` | Creation timestamp |

#### 6. `ProductImage`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Image record identifier |
| `product_id` | String | FK -> `Product.id` (Cascade) | Parent product listing |
| `image_url` | String | | Cloudinary photo URL |

#### 7. `ProductReview`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Admin review record identifier |
| `product_id` | String | FK -> `Product.id` (Cascade) | Moderated product listing |
| `admin_id` | String | FK -> `User.id` (Cascade) | Reviewing administrator |
| `status` | ProductStatus | | Moderation decision (`approved` / `rejected`) |
| `reason` | String? | | Mandatory reason if rejected |
| `reviewed_at` | DateTime | `@default(now())` | Timestamp of review |

#### 8. `Transaction`

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | `@id @default(uuid())` | Transaction identifier |
| `product_id` | String | FK -> `Product.id` | Purchased product listing |
| `buyer_id` | String | FK -> `User.id` | Buyer user relation |
| `payment_id` | String? | | Payment intent ID (null for mock checkout) |
| `status` | String | `@default("pending")` | State (e.g. `completed`) |
| `is_test` | Boolean | `@default(true)` | Test transaction indicator |
| `buyer_comment` | String? | | Post-purchase buyer review comment |
| `buyer_rating` | Int? | | Post-purchase buyer rating (1-5) |
| `created_at` | DateTime | `@default(now())` | Purchase timestamp |

### Database Migration History

- No raw SQL migration scripts exist under a `prisma/migrations` directory in the repository.
- Schema changes were directly pushed and synchronized to the live Supabase PostgreSQL database using Prisma CLI (`prisma db push`).

---

## 5. API Reference

Every endpoint listed below has been verified against backend controllers:

### Authentication Module (`/auth`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Register new user account with profile |
| `POST` | `/auth/login` | Public | Authenticate credentials, returns access & refresh tokens |
| `POST` | `/auth/refresh` | Public | Generate new access token via refresh token |

### Users Module (`/users`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/users/me` | JWT | Get current authenticated user profile |
| `GET` | `/users/me/notifications` | JWT | Fetch recent synthesized notifications (last 7 days reviews & sales) |
| `GET` | `/users/:id` | JWT | View public profile of a user by ID |
| `PATCH` | `/users/me` | JWT | Update authenticated profile details |
| `POST` | `/users/password` | JWT | Change password with current password validation |

### Products Module (`/products`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Public | Query approved/sold listings (filterable by category, type, search, seller) |
| `GET` | `/products/mine` | JWT | Get listings created by the authenticated user |
| `GET` | `/products/:id` | Optional Bearer | Get single product detail (returns purchase state if token present) |
| `GET` | `/products/:id/download` | JWT | Securely fetch deliverable file URL (Owner, Admin, or Buyer only) |
| `POST` | `/products` | JWT | Create product listing (initial status: `pending`) |
| `PATCH` | `/products/:id` | JWT | Update listing details (resets status to `pending`) |
| `DELETE` | `/products/:id` | JWT | Delete product listing (owner only) |
| `PATCH` | `/products/:id/toggle-hide` | JWT | Toggle hidden state of owned listing |

### Categories Module (`/categories` & `/product-types`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Public | List all categories with product types & product counts |
| `GET` | `/product-types` | Public | List product types, optionally filtered by `category_id` |

### Transactions Module (`/transactions`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/transactions` | JWT | List authenticated buyer's purchase history |
| `GET` | `/transactions/sales` | JWT | List authenticated seller's sales history |
| `GET` | `/transactions/:id` | JWT | Get transaction details by ID |
| `POST` | `/transactions` | JWT | Execute instant purchase for a listing (`product_id`) |
| `DELETE` | `/transactions/:id` | JWT | Delete purchase record from buyer history |
| `POST` | `/transactions/:id/review` | JWT | Submit buyer review comment and 1-5 rating |

### Uploads Module (`/uploads`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/uploads/image` | JWT | Upload image file to Cloudinary (Max 5MB, image mimetypes) |
| `POST` | `/uploads/file` | JWT | Upload deliverable file to Cloudinary (Max 10MB) |

### Admin Moderation & Analytics Module (`/admin`)

| Method | Path | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/stats` | Admin JWT | System metrics, revenue totals, SLA stats, category breakdown |
| `GET` | `/admin/stats/timeseries` | Admin JWT | Daily listings and transactions metrics (7d / 30d) |
| `GET` | `/admin/activity/recent` | Admin JWT | Recent system audit feed (listings, transactions, reports) |
| `GET` | `/admin/products` | Admin JWT | View pending listings review queue |
| `GET` | `/admin/products/all` | Admin JWT | View all non-pending listings (paginated, searchable) |
| `PATCH` | `/admin/products/:id/review` | Admin JWT | Approve listing or reject with mandatory reason |
| `DELETE` | `/admin/products/:id` | Admin JWT | Admin delete any listing |
| `GET` | `/admin/users` | Admin JWT | View paginated user directory (searchable, role filter) |
| `GET` | `/admin/users/:id` | Admin JWT | View user profile, listings, and transaction details |
| `PATCH` | `/admin/users/:id/ban` | Admin JWT | Ban user account with reason (blocks admins from being banned) |
| `PATCH` | `/admin/users/:id/unban` | Admin JWT | Unban user account |
| `GET` | `/admin/transactions` | Admin JWT | View global transaction ledger (paginated, searchable) |
| `GET` | `/admin/verifications` | Admin JWT | View student ID verification queue |
| `PATCH` | `/admin/verifications/:userId` | Admin JWT | Approve, reject, or revoke student verification status |
| `GET` | `/admin/categories` | Admin JWT | Manage category list |
| `POST` | `/admin/categories` | Admin JWT | Create category |
| `PATCH` | `/admin/categories/:id` | Admin JWT | Update category name |
| `DELETE` | `/admin/categories/:id` | Admin JWT | Delete category (blocked if products linked) |
| `GET` | `/admin/product-types` | Admin JWT | Manage product types |
| `POST` | `/admin/product-types` | Admin JWT | Create product type |
| `PATCH` | `/admin/product-types/:id` | Admin JWT | Update product type name |
| `DELETE` | `/admin/product-types/:id` | Admin JWT | Delete product type (blocked if products linked) |

---

## 6. Features Implemented & Detailed Functionality

_All features listed below have been explicitly verified, tested, and confirmed working by the project user in the running application environment._

---

### 6.1 Standard User Features

#### 1. Authentication & Session Security Flow

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Provides user registration, secure credential authentication, and stateless token maintenance for platform accounts.
- **User Experience**: New users register with email, password, display name, username, phone number, and optional student ID. Upon logging in, access credentials and tokens are issued seamlessly, persisting user session state across browser refreshes.
- **Under the Hood**:
  - `POST /auth/register`: Validates input parameters, hashes user passwords using `bcrypt` (12 salt rounds), and creates linked `User` and `Profile` records in PostgreSQL.
  - `POST /auth/login`: Authenticates credentials via `bcrypt.compare`, returning a 15-minute JWT access token (`JWT_SECRET`) and a 7-day refresh token (`JWT_REFRESH_SECRET`).
  - `POST /auth/refresh`: Mints new access tokens from valid refresh tokens without requiring re-entry of password credentials.
  - Client session state managed globally via `AuthContext.tsx` with automatic localStorage synchronization.

#### 2. User Profile & Account Settings Management

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Enables users to view public seller profiles, update personal details, change security credentials, and configure notification preferences.
- **User Experience**: Users can visit their settings page (`app/dashboard/settings/page.tsx`), update display name, biography, phone number, upload custom avatar photos, configure email/push/SMS notification toggles, and change their account password.
- **Under the Hood**:
  - `GET /users/me`: Fetches authenticated user profile data.
  - `PATCH /users/me`: Updates `Profile` record attributes in the database. Avatar uploads route through `POST /uploads/image` to Cloudinary.
  - `POST /users/password`: Validates current password with `bcrypt`, updating `password_hash` upon successful verification.
  - `GET /users/:id`: Returns public seller profile metadata and active listings while stripping private contact fields.

#### 3. Student ID Verification Submission

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Allows students to submit official university identification credentials to earn a "Verified Student" badge on their profile and product listings.
- **User Experience**: Students enter their student ID number and upload a photo of their physical student ID card. The submission transitions their profile verification status to `pending`, displaying a pending status banner until an administrator reviews the submission.
- **Under the Hood**:
  - File payload uploaded via `POST /uploads/image`, returning a secure Cloudinary CDN image URL.
  - `PATCH /users/me` updates `student_id`, `student_id_card_url`, and sets `verification_status: 'pending'` in the `Profile` model.
  - Frontend components render `Badge.tsx` with verification status styling.

#### 4. Marketplace Discovery, Search & Multi-Filter Catalog

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: High-performance catalog browsing engine with multi-parameter filtering, full-text keyword search, and responsive grid visualization.
- **User Experience**: Users can search products by title or description keywords, select category pills (e.g., Computer Science, Engineering), select specific sub-product types, and view responsive product cards with price formatted in ETB, seller avatar, and verification badges.
- **Under the Hood**:
  - `GET /products`: Queries Prisma with case-insensitive `contains` filters on `title` and `description`, matching `category_id`, `product_type_id`, and status constraints (`approved` or `sold`).
  - Automatically removes `deliverable_file_url` from response data payloads (`delete product.deliverable_file_url`), returning `has_deliverable: boolean`.
  - Frontend components: `FilterBar.tsx`, `ProductCard.tsx`, `ProductCardSkeleton.tsx`, `Pagination.tsx`.

#### 5. Product Listing Creation Workflow

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Sellers can publish digital resources, academic materials, or service listings with image galleries and gated deliverable files.
- **User Experience**: Sellers fill out a structured creation form (`app/seller/listings/page.tsx`), specify title, detailed description, price in ETB, select parent category and product type, upload product preview images, and upload the deliverable digital file.
- **Under the Hood**:
  - Preview images uploaded via `POST /uploads/image` (Max 5MB). Deliverable file uploaded via `POST /uploads/file` (Max 10MB).
  - `POST /products`: Enforces `CreateProductDto` validation (`title` max 120 chars, `price` min 1 ETB).
  - Inserts `Product` record with `status: 'pending'`, creating `ProductImage` relations.
  - Gated file URL (`deliverable_file_url`) stored securely in database, accessible only via gated download controller.

#### 6. Product Listing Management & Seller Controls

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Sellers retain complete control over their active catalog, with capabilities to edit listing details, temporarily hide/unhide listings from public search, or permanently delete listings.
- **User Experience**: From "My Listings" (`app/seller/listings`), sellers can toggle listing visibility with an Eye icon switch, edit listing content, or delete obsolete listings with confirmation modals.
- **Under the Hood**:
  - `PATCH /products/:id`: Updates listing parameters. Re-submitting an edit automatically resets `status` to `pending`, forcing re-moderation by admins. Verifies ownership (`product.user_id === userId`).
  - `PATCH /products/:id/toggle-hide`: Flips `is_hidden` boolean property without altering moderation status.
  - `DELETE /products/:id`: Deletes listing and associated image relations via cascading delete constraints.

#### 7. Instant Purchase & Transaction Execution

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Synchronous purchase workflow enabling immediate transaction authorization and deliverable file unlocking.
- **User Experience**: Buyers click "Buy Now" on any approved product page. The system executes the transaction instantly without payment gateway friction, returning a purchase success notification and updating the listing page view to show unlocked deliverable download controls.
- **Under the Hood**:
  - `POST /transactions`: Receives `{ product_id }`. Verifies product existence and enforces self-purchase guard (`product.user_id !== buyerId`).
  - Inserts `Transaction` record with `status: 'completed'`, `is_test: true`, `payment_id: null`.
  - Instantly unlocks buyer download permission for the specific `product_id`.

#### 8. Secure Deliverable File Gatekeeping

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Multi-layered authorization download gateway protecting digital asset files from unauthorized public access or direct link scraping.
- **User Experience**: Deliverable file download links are completely invisible to non-purchasers. Confirmed buyers see a "Download Resource File" button that securely fetches the deliverable file payload.
- **Under the Hood**:
  - `GET /products/:id/download`: Protected by `JwtAuthGuard`.
  - `ProductsService.getDeliverableFile` checks if `userId` is the product seller, an administrator (`role === 'admin'`), or has an existing `Transaction` record with `status: 'completed'`.
  - Throws `403 ForbiddenException` if authorization conditions fail; returns `{ deliverable_file_url }` upon clean verification.

#### 9. Personal Sales & Purchase History Dashboards

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Dedicated dashboard interfaces for tracking personal buying and selling activity over time.
- **User Experience**: Users can navigate to "My Purchases" (`app/dashboard/purchases`) to review bought materials, re-download deliverable files, and leave reviews. Sellers can view "My Sales" (`app/dashboard/earnings`) to inspect buyer details, sales counts, and total earnings.
- **Under the Hood**:
  - `GET /transactions`: Queries transactions where `buyer_id === userId`, joining product details, seller profile, and purchase date.
  - `GET /transactions/sales`: Queries transactions where `product.user_id === userId`, joining buyer profile metadata (`username`, `name`, `avatar_url`).

#### 10. Post-Purchase Ratings & Text Reviews

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Feedback system allowing buyers to rate completed transactions and leave text comments.
- **User Experience**: After completing a purchase, buyers can open the transaction modal, select a 1 to 5-star rating, write a review comment, and submit feedback.
- **Under the Hood**:
  - `POST /transactions/:id/review`: Validates `CreateReviewDto` (`rating` integer 1-5, `comment` non-empty string).
  - Verifies transaction exists and belongs to buyer with `status: 'completed'`.
  - Updates `buyer_rating` and `buyer_comment` on the `Transaction` record.

#### 11. In-App Synthesized Notification Feed

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Dynamic notification log informing sellers of listing approval/rejection decisions and new item sales.
- **User Experience**: Sellers click the Notification bell in the header to view a chronological feed of recent events from the past 7 days, complete with rejection reasons, approval confirmations, and buyer purchase alerts.
- **Under the Hood**:
  - `GET /users/me/notifications`: Executes parallel queries on `ProductReview` (rejections/approvals) and `Transaction` (sales) tables for the user's products created within the last 7 days (`gte: sevenDaysAgo`).
  - Synthesizes notification objects dynamically sorted by timestamp, supporting up to 30 recent alerts without requiring a dedicated notification database table.

---

### 6.2 Admin Moderation & Management Features

#### 1. Centralized Analytics & Overview Dashboard

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Command center providing real-time platform metrics, revenue tallies, category distribution, and moderation SLA compliance indicators.
- **User Experience**: Administrators view high-level metric cards (`app/admin/overview`) displaying total listings, pending review queue count, approved vs rejected counts, total registered users, completed transaction counts, total platform revenue in ETB, and average review SLA time in hours.
- **Under the Hood**:
  - `GET /admin/stats`: Executes parallel database counts on `Product`, `User`, `Transaction`, and `ProductReview` models.
  - Aggregates total revenue via `Transaction` price sum. Calculates average moderation turnaround time in hours by comparing `reviewed_at` against `product.created_at`. Computes SLA compliance percentage (reviews completed within 24 hours).

#### 2. Interactive Metric Time-Series Charts

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Visual trend charts rendering daily listing creation rates and daily completed purchase volumes over 7-day or 30-day windows.
- **User Experience**: Admins switch between 7D and 30D view toggles to analyze platform growth trends, listing submission spikes, and buyer activity patterns.
- **Under the Hood**:
  - `GET /admin/stats/timeseries?range=7d|30d`: Executes raw PostgreSQL queries (`$queryRawUnsafe`) grouping listing and transaction timestamps by `DATE("created_at")`.
  - Maps missing calendar dates to `0` counts, returning a continuous chronological date array.

#### 3. Real-Time System Activity Feed & Audit Log

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Live system event log aggregating new listing submissions, completed transactions, and user flag reports.
- **User Experience**: Admins view a chronological activity feed (`app/admin/activity`) detailing platform occurrences (e.g., `@john listed "CS101 Notes" for ETB 250`, `@mary purchased "Calculus Guide"`), with filter buttons for specific event types.
- **Under the Hood**:
  - `GET /admin/activity/recent?filter=all|listings|transactions|reports&limit=20`: Queries recent rows from `Product` and `Transaction` tables, formats human-readable activity descriptions, and sorts combined results by timestamp.

#### 4. Product Listing Moderation Queue

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Dedicated moderation workspace where administrators review pending listing submissions before they appear in the public catalog.
- **User Experience**: Admins inspect pending products (`app/admin/overview`), view listing details, inspect preview images, and click "Approve" or "Reject". If rejecting, a modal prompts the admin to enter a mandatory rejection reason.
- **Under the Hood**:
  - `GET /admin/products`: Returns all listings with `status: 'pending'`.
  - `PATCH /admin/products/:id/review`: Validates `ReviewProductDto` (`action: 'approve' | 'reject'`).
  - Executes database transaction updating `Product.status` to `approved` or `rejected`, and inserts a `ProductReview` audit record storing `admin_id`, `status`, and `reason`.

#### 5. Global Listings Directory & Administrative Cleanup

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Searchable directory of all non-pending listings across the platform, providing administrative removal powers.
- **User Experience**: Admins can search any published listing by title or seller username, filter by category, inspect listing details, or delete inappropriate listings directly.
- **Under the Hood**:
  - `GET /admin/products/all`: Returns paginated non-pending listings with search and category filtering.
  - `DELETE /admin/products/:id`: Permanently removes the listing from the database, cascading deletions to images and reviews.

#### 6. User Management, Detail Audit & Banning System

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Comprehensive user account administration tool with search, detailed activity audit views, unbanning, and immediate account suspension capabilities.
- **User Experience**: Admins can search users by email, username, or display name, filter by role (`user` or `admin`), inspect a user's full listing and purchase history, ban problematic users with a reason, or restore banned accounts.
- **Under the Hood**:
  - `GET /admin/users`: Returns paginated user accounts with listing counts.
  - `GET /admin/users/:id`: Fetches complete user detail, including profile metadata, created listings, and purchase history.
  - `PATCH /admin/users/:id/ban`: Validates `BanUserDto` (`reason`). Enforces admin protection check (`user.role !== 'admin'`). Updates `is_banned: true`, `banned_reason`, and `banned_at`.
  - **Security Impact**: Banning invalidates active JWT access tokens on the user's next API request via `JwtStrategy` DB verification.
  - `PATCH /admin/users/:id/unban`: Resets `is_banned: false`, restoring account access.

#### 7. Student ID Verification Moderation Queue

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Verification review interface for evaluating uploaded student ID card credentials.
- **User Experience**: Admins view a queue of user profiles (`app/admin/verifications`), click on student ID card URLs to visually inspect uploaded card photos, and click "Approve Student", "Reject", or "Revoke Verification".
- **Under the Hood**:
  - `GET /admin/verifications`: Returns profile records with user metadata.
  - `PATCH /admin/verifications/:userId`: Accepts `action: 'approve' | 'reject' | 'revoke'`.
  - `approve` sets `is_verified: true`, `verification_status: 'verified'`, `verification_reason: null`.
  - `reject`/`revoke` sets `is_verified: false`, `verification_status: 'rejected'`, `verification_reason: dto.reason`.

#### 8. Category & Product Type Relational Management

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Administrative catalog taxonomy manager for creating, updating, and removing product categories and sub-types.
- **User Experience**: Admins can view existing categories, add new categories (e.g., "Software & Code"), add sub-product types (e.g., "Next.js Templates"), edit category names, or delete obsolete categories with dependency warnings.
- **Under the Hood**:
  - `GET /admin/categories` & `GET /admin/product-types`: Fetches category hierarchy with product reference counts (`_count: { select: { products: true } }`).
  - `POST /admin/categories` & `POST /admin/product-types`: Creates unique category or product type records.
  - `DELETE /admin/categories/:id` & `DELETE /admin/product-types/:id`: Verifies zero products reference the category before deletion. Throws `400 BadRequestException` if products are attached, protecting database relational integrity.

#### 9. Global Transaction Ledger & Audit Directory

- **Testing Verification**: Manually Tested & Confirmed Working
- **Functional Description**: Full administrative view of all financial transactions executed across the platform.
- **User Experience**: Admins can view a paginated table (`app/admin/transactions`) listing every purchase, buyer details, seller details, product title, price, payment ID, and completion timestamp, with search by keyword and status filters.
- **Under the Hood**:
  - `GET /admin/transactions`: Queries `Transaction` table joined with buyer profile, seller profile, and product images. Supports pagination and multi-field OR search on product title, buyer username, and seller username.

---

## 6.5. System Behavior & Business Logic

### Standard User

#### 1. Required Fields & Validation Rules for Product Listing Submission

Enforced server-side via NestJS `ValidationPipe` using `CreateProductDto`:

- **`title`**: Required string, maximum length 120 characters (`@IsString()`, `@IsNotEmpty()`, `@MaxLength(120)`).
- **`description`**: Required string, non-empty (`@IsString()`, `@IsNotEmpty()`).
- **`price`**: Required number, minimum value 1 ETB (`@IsNumber()`, `@Min(1)`, `@Type(() => Number)`).
- **`category_id`**: Required valid category UUID string (`@IsString()`, `@IsNotEmpty()`).
- **`product_type_id`**: Required valid product type UUID string (`@IsString()`, `@IsNotEmpty()`).
- **`images`**: Optional array of valid URL strings (`@IsOptional()`, `@IsArray()`, `@IsUrl({}, { each: true })`).
- **`deliverable_file_url`**: Optional string URL (`@IsOptional()`, `@IsString()`).

#### 2. Listing Status Transitions

- **Creation (`POST /products`)**: Initial status automatically set to `pending`.
- **Seller Update (`PATCH /products/:id`)**: Any edit by seller automatically resets status back to `pending`.
- **Admin Review (`PATCH /admin/products/:id/review`)**: Admin sets action `approve` -> `approved`, or `reject` -> `rejected` (requires reason).
- **Hide Toggle (`PATCH /products/:id/toggle-hide`)**: Toggles `is_hidden` boolean property on product without changing `status`.

#### 3. Verified Student Logic

- **Mechanics**: Purely manual admin review workflow.
- Standard users upload `student_id` and `student_id_card_url` on their profile.
- Verification status transitions from `"unverified"` -> `"pending"`.
- Admin inspects the image URL and approves or rejects it in `/admin/verifications`.
- There is no automated email domain regex check or OCR student card validation in code.

#### 4. Self-Purchase Prevention Rule

- Enforced in `TransactionsService.create` (lines 66-68):
  > *Code check*: `if (product.user_id === buyerId) { throw new BadRequestException("You cannot purchase your own product."); }`

#### 5. Full Purchase Flow

1. Buyer clicks **"Buy Now"** on frontend product page.
2. Frontend sends `POST /transactions` with body `{ product_id }` and Bearer JWT token.
3. Backend validates JWT token, checks product existence, and ensures seller !== buyer.
4. Backend creates a `Transaction` row synchronously with `payment_id: null`, `status: 'completed'`, `is_test: true`.
5. Response returns completed transaction object.
6. When buyer clicks **"Download File"**, frontend calls `GET /products/:id/download`.
7. Backend verifies buyer ID has a `status: 'completed'` transaction, then returns `{ deliverable_file_url }`.

#### 6. Information Access: Before vs After Purchase

- **Before Purchase**: Buyer views listing title, description, price, category, product type, seller info, and images. The `deliverable_file_url` field is explicitly removed (`delete product.deliverable_file_url`) in `findAll` and `findOne` responses.
- **After Purchase**: `GET /products/:id` returns `has_purchased: true` and `purchased_at`. Buyer gains authorization to call `GET /products/:id/download` to retrieve `deliverable_file_url`, and can submit ratings/reviews via `POST /transactions/:id/review`.

---

### Admin

#### 1. Listing Review Criteria

- No automated quality rubric, keyword filter, or automated AI scanner exists in code.
- Approval/rejection is based purely on manual admin judgment.

#### 2. Seller Rejection Notification

- When an admin rejects a product, a `ProductReview` row is stored with `status: 'rejected'` and `reason`.
- When the seller visits their dashboard, `UsersService.getNotifications` queries `ProductReview` records for products owned by that user from the last 7 days and synthesizes a notification object (`type: 'rejection'`, product title, rejection reason).

#### 3. User Banning Mechanics

- `AdminService.banUser` sets `is_banned: true`, `banned_reason`, and `banned_at` on the `User` database record.
- Every API request authenticated via `JwtStrategy.validate` executes a database lookup:
  > *Code check*: `if (user.is_banned) { throw new ForbiddenException("Your account has been suspended. Contact support for more information."); }`

- **Effect**: Banning a user blocks future logins AND **immediately invalidates all active, previously-issued JWT tokens** on their next HTTP request.

#### 4. Safeguard Against Admin Banning

- Enforced in `AdminService.banUser` (lines 332-334):
  > *Code check*: `if (user.role === "admin") { throw new BadRequestException("Cannot ban an admin account."); }`

- Admins cannot ban other admin accounts.

#### 5. Admin Student Verification Flow

- Admin calls `GET /admin/verifications` which returns all profile records.
- Admin calls `PATCH /admin/verifications/:userId` with `{ action: 'approve' | 'reject' | 'revoke', reason?: string }`.
- `approve` sets `is_verified: true`, `verification_status: 'verified'`, `verification_reason: null`.
- `reject`/`revoke` sets `is_verified: false`, `verification_status: 'rejected'`, `verification_reason: reason`.

---

## 7. Known Limitations / Not Yet Implemented

1. **Stripe Payment Gateway**: Stripe SDK is not installed, and no Stripe webhook handlers are implemented. Transactions complete instantly via internal mock workflow.
2. **Automated Testing**: Jest configuration exists, but unit and end-to-end test suites are unwritten.
3. **CI/CD Pipelines**: No GitHub Actions or automated deployment pipelines are currently configured.
4. **Production Build Setup**: Frontend and backend run in development environments (`next dev` and local NestJS dev server). Production build scripts have not been executed or deployed to production hosts.
5. **Deferred Features**: Direct real-time messaging between users and product review comments from non-buyers are explicitly deferred.

---

## 8. Environment Setup & Configuration Instructions

This section provides an exhaustive guide for developers and system administrators to configure, run, and maintain Campusly locally or in test environments.

---

### 8.1 Required Environment Variables Breakdown

The application requires environment configuration split between the backend NestJS server (`backend/.env`) and the frontend Next.js application (`.env.local`):

#### 1. Backend Environment Variables (`backend/.env`)

- **`DATABASE_URL`**: `postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`
- **`JWT_SECRET`**: `campusly_production_access_token_secret_key_change_in_prod_12345`
- **`JWT_REFRESH_SECRET`**: `campusly_production_refresh_token_secret_key_change_in_prod_67890`
- **`JWT_ACCESS_EXPIRES_IN`**: `15m`
- **`JWT_REFRESH_EXPIRES_IN`**: `7d`
- **`PORT`**: `3002`
- **`CLOUDINARY_CLOUD_NAME`**: `your_cloudinary_cloud_name`
- **`CLOUDINARY_API_KEY`**: `your_cloudinary_api_key`
- **`CLOUDINARY_API_SECRET`**: `your_cloudinary_api_secret`

#### Detailed Parameter Rationale:
- **`DATABASE_URL`**: PostgreSQL connection string. When connecting to Supabase Cloud Postgres from serverless environments or Railway backend instances, use Supabase's transaction pooler port (`6543`) with `?pgbouncer=true` to prevent connection limit exhaustion. For local Docker database, set `postgresql://postgres:postgres@localhost:5432/campusly`.
- **`JWT_SECRET` & `JWT_REFRESH_SECRET`**: Cryptographic secrets used by Passport JWT strategy to sign and verify access and refresh tokens. Must be high-entropy random strings in production.
- **`CLOUDINARY_*`**: API credentials required for buffering and streaming user profile avatars, product listing photos, and gated deliverable files.

#### 2. Frontend Environment Variables (`.env.local`)

- **`NEXT_PUBLIC_API_URL`**: `http://localhost:3002`
- _In production, set `NEXT_PUBLIC_API_URL` to your live Railway backend URL (e.g. `https://campusly-backend-production.up.railway.app`)._

---

### 8.2 Step-by-Step Local Development Setup

Follow these exact steps to instantiate a working local development environment:

#### Step 1: System Prerequisites
Ensure your local development machine has the following tools installed:
- **Node.js**: `v20.x` LTS or higher
- **npm**: `v10.x` or higher
- **Git**: For version control
- **Docker Desktop** _(Optional)_: If running a local PostgreSQL container instead of Supabase Cloud.

#### Step 2: Clone Repository & Install Root Frontend Dependencies
- **Command 1**: `git clone https://github.com/temesgen1225/campusly-marketplace.git`
- **Command 2**: `cd anti`
- **Command 3**: `npm install`

#### Step 3: Configure Database (Local Docker or Supabase)
- **Option A (Supabase Cloud Database)**: Create a free project on [Supabase.com](https://supabase.com), copy your PostgreSQL URI from **Project Settings -> Database**, and paste it as `DATABASE_URL` in `backend/.env`.
- **Option B (Local Docker PostgreSQL Container)**: Run docker compose from the project root:
  - **Command**: `docker-compose up -d db`
  - _(Starts a PostgreSQL 16 container named `campusly_postgres` bound to port `5432`)_.

#### Step 4: Setup & Run NestJS Backend API
- **Step A**: `cd backend`
- **Step B**: `npm install`
- **Step C**: `npx prisma db push`
- **Step D**: `npm run start:dev`
- _Backend server will compile TypeScript and start listening on `http://localhost:3002`._

#### Step 5: Run Next.js Frontend Application
In a separate terminal window from the project root:
- **Command**: `npm run dev`
- _Frontend client will start on `http://localhost:3000`._

---

## 9. Comprehensive Production Deployment Guide

This section outlines the exact multi-platform deployment procedure to launch Campusly into production using **Supabase** (Database), **Railway** (Backend API), **Vercel** (Frontend App), and **Cloudinary** (Media CDN).

---

### 9.1 Managed Third-Party Service Configuration

**System Deployment Flow**:
- **User Browser** → Vercel Edge Network → **Frontend (Next.js App on Vercel)**
- **Frontend** → REST API Calls → **Backend (NestJS Backend API on Railway)**
- **Backend** → Prisma Client Connection Pooler → **Supabase Cloud (PostgreSQL 16)**
- **Backend** → Multer Buffer Upload Stream → **Cloudinary CDN (Media Storage)**

#### 1. Supabase Cloud (Managed PostgreSQL Database)
- **Why Supabase?**: Required because cloud platforms (Vercel & Railway) cannot access a local development database. Supabase provides a managed, high-availability cloud PostgreSQL database accessible worldwide.
- **Setup Procedure**:
  1. Register at [Supabase.com](https://supabase.com) and create a new project.
  2. Go to **Project Settings -> Database -> Connection String** and select **URI**.
  3. Copy the pooled connection string (Port `6543`).
  4. From your local machine, run Prisma push to generate all 8 production tables on Supabase:
     - Run in terminal: `cd backend` then `npx prisma db push`
  5. Open Supabase **Table Editor** to confirm tables (`User`, `Profile`, `Category`, `ProductType`, `Product`, `ProductImage`, `ProductReview`, `Transaction`) are initialized.

#### 2. Cloudinary (Media CDN Storage)
- **Setup Procedure**:
  1. Register a free tier account at [Cloudinary.com](https://cloudinary.com).
  2. Obtain your **Cloud Name**, **API Key**, and **API Secret** from the main dashboard.
  3. Add these credentials into your Railway backend environment variables.

#### 3. Railway.app (NestJS Backend API Hosting)
- **Why Railway?**: Railway natively supports continuous deployment of Node.js / NestJS applications from GitHub repositories, auto-assigning HTTPS certificates and environment variables.
- **Setup Procedure**:
  1. Sign in to [Railway.app](https://railway.app) and click **New Project -> Deploy from GitHub repo**.
  2. Select the repository and specify the **Root Directory** as `backend`.
  3. Configure Build and Start settings:
     - **Build Command**: `npm run build`
     - **Start Command**: `node dist/main.js`
  4. Open **Variables** tab in Railway and enter all backend environment variables:
     - `DATABASE_URL`: _(Your Supabase pooled PostgreSQL URI)_
     - `JWT_SECRET`: _(Production secure random string)_
     - `JWT_REFRESH_SECRET`: _(Production secure random string)_
     - `JWT_ACCESS_EXPIRES_IN`: `15m`
     - `JWT_REFRESH_EXPIRES_IN`: `7d`
     - `PORT`: `3002`
     - `CLOUDINARY_CLOUD_NAME`: _(Your Cloudinary name)_
     - `CLOUDINARY_API_KEY`: _(Your Cloudinary API key)_
     - `CLOUDINARY_API_SECRET`: _(Your Cloudinary API secret)_
  5. Click **Deploy**. Railway will build the NestJS server and generate a public domain (e.g. `https://campusly-backend-production.up.railway.app`).

#### 4. Vercel (Next.js Frontend Hosting)
- **Why Vercel?**: Built by the creators of Next.js, Vercel provides optimal global edge network deployment, zero-config SSR support, and automatic SSL certificates.
- **Setup Procedure**:
  1. Sign in to [Vercel.com](https://vercel.com) and click **Add New -> Project**.
  2. Select your GitHub repository.
  3. Set **Framework Preset** to `Next.js` and Root Directory to `./`.
  4. Expand **Environment Variables** and add:
     - `NEXT_PUBLIC_API_URL`: Set to your live Railway backend URL (e.g. `https://campusly-backend-production.up.railway.app`).
  5. Click **Deploy**. Vercel will execute `npm run build` and publish your site to a live HTTPS domain (e.g. `https://campusly-marketplace.vercel.app`).

---

### 9.2 Production Security & CORS Adjustments

To ensure production security between Vercel and Railway:
1. **Configure CORS in NestJS**:
   In `backend/src/main.ts` (or `dist/main.js`), restrict CORS origins to your Vercel production domain:
   - _Code setup_: Set CORS `origin` to `['https://campusly-marketplace.vercel.app']` with `credentials: true`.
2. **Rotate JWT Secrets**:
   Ensure `JWT_SECRET` and `JWT_REFRESH_SECRET` in Railway are rotated away from development defaults to cryptographically generated 256-bit strings.

---

## 10. Third-Party Services & Operational Transition

1. **Cloudinary**:
   - **Current Status**: Operating in Free Tier sandbox mode for profile avatars, product photos (max 5MB), and deliverable files (max 10MB).
   - **Production Transition**: Upgrade to a Cloudinary paid tier if storage volume or global bandwidth limits exceed free tier thresholds.
2. **Telebirr Payment Gateway Integration (Future Production Step)**:
   - **Current Status**: Operating with an internal synchronous mock payment trigger designed for local testing.
   - **Production Handoff**: Obtain official Telebirr Merchant API credentials (`MERCHANT_ID`, `APP_KEY`, `FABRIC_APP_ID`, `SHORT_CODE`) from Ethio Telecom. Update `TransactionsService.create` to initialize Telebirr payment checkout sessions and expose a public webhook endpoint (`POST /transactions/telebirr/callback`) to unlock deliverable files upon asynchronous payment notification.
