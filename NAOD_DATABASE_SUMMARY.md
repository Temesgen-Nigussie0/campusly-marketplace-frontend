# CAMPUSLY MARKETPLACE: DATABASE ENGINEERING & ARCHITECTURE DEFENSE GUIDE

* **Author / Candidate:** Naod Kibrom  
* **Role:** Database Engineer & Data Architect  
* **Host Organization:** Hance Technology PLC (*Publicly Operating as Formidable*), Bole, Addis Ababa  
* **Company Supervisor:** Hana Adane (Hannah) | **Technical Mentor:** Abubeker  
* **Academic Institution:** St. Mary's University, Faculty of Informatics, Department of Computer Science  
* **Project Title:** Campusly Marketplace  
* **Live Production URL:** `https://campusly-marketplace.vercel.app/`

---

## 1. PROJECT OVERVIEW & SCOPE OF RESPONSIBILITY

### 1.1 The Critical Role of Database Engineering
In a multi-tier web application like Campusly, database engineering is often the least visible layer from the end-user's perspective, yet it represents the foundational bedrock upon which the entire system rests. Every single user interaction—from registering an account and publishing a study guide to searching categories, executing content moderation, and logging financial transactions—ultimately translates into reads, writes, updates, and relational queries executed against the database. 

If a database schema is poorly structured, lacks strict referential integrity constraints, or suffers from improper indexing, the entire application will eventually become sluggish, produce corrupted or orphaned records, or fail entirely under concurrent traffic.

### 1.2 My Specific Ownership on the Project
As the dedicated **Database Engineer and Data Architect** on the Campusly project team, I was responsible for designing, implementing, optimizing, and deploying the data tier:
* **Conceptual & Logical Data Modeling:** Deconstructing the project specification into formal Entity-Relationship Diagrams (ERDs) and establishing relational cardinalities.
* **Schema Design & Normalization:** Designing 8 normalized relational tables and 2 custom PostgreSQL ENUM types according to Third Normal Form (3NF) principles.
* **ORM Configuration with Prisma:** Managing `schema.prisma`, defining data types, primary keys, foreign key relations, cascade delete rules, and generating type-safe models for the backend developers.
* **Local Containerization with Docker:** Setting up containerized PostgreSQL database instances via Docker Compose to ensure a reproducible local development environment across the team.
* **Data Integrity & Query Optimization:** Auditing constraints, implementing B-Tree indexes on high-frequency query columns, and resolving real-world database bugs (such as foreign key crashes, cascade hazards on transactions, and empty string collisions).
* **Cloud Hosting & Infrastructure on Supabase:** Provisioning a production-grade managed PostgreSQL 16 cluster on Supabase (hosted on AWS), configuring transaction connection pooling via Supavisor / PgBouncer, and authoring automated seed data scripts.

---

## 2. THE DATA MODELING & INITIAL PLANNING WORKFLOW

Before writing any schema migrations or spinning up database containers, our team held architectural planning meetings to review the business requirements of Campusly.

### 2.1 Translating Business Requirements into Entities
An academic marketplace requires tracking distinct actors, products, approvals, and money:
* Students need accounts to log in, but also need public profiles with university identification details.
* Academic resources must be categorized into university departments and nested resource sub-types.
* Listings require multi-image previews and a secure digital deliverable file.
* Because the platform enforces content moderation, the database must track an operational lifecycle state machine (`pending`, `approved`, `rejected`, `sold`) and retain an administrative audit log.
* Purchases require an immutable financial ledger that preserves sales history even if a user account is subsequently modified or deactivated.

### 2.2 Entity-Relationship (ER) Architecture
I mapped out the primary keys, foreign keys, and cardinalities between entities:
* **One-to-One:** Between `User` and `Profile` (isolating login credentials from biographical and student verification details).
* **One-to-Many:** Between `Category` and `ProductType` (university departments parent multiple material types).
* **One-to-Many:** Between `User` and `Product` (a student seller can publish multiple resource listings).
* **One-to-Many:** Between `Product` and `ProductImage` (a listing supports multiple preview screenshots).
* **One-to-Many:** Between `Product` and `ProductReview` (audit history of admin moderation reviews).
* **One-to-Many:** Between `User` and `Transaction`, and `Product` and `Transaction` (purchase records linking buyers and products).

---

## 3. DEEP DIVE INTO THE DATABASE TECHNOLOGIES & TOOLS

### 3.1 PostgreSQL 16 (Relational Database Management System)
* **What it is:** An enterprise-grade, open-source object-relational database system known for its reliability, feature robustness, and strict SQL compliance.
* **Why it was used in Campusly:**
  * **Strict ACID Compliance:** Guaranteed Atomicity, Consistency, Isolation, and Durability across all transactions, ensuring financial and inventory data is never left in an inconsistent state.
  * **Native ENUM Types:** Allowed us to enforce system roles and product lifecycles directly within the database engine rather than relying solely on server logic.
  * **Advanced Foreign Key & Constraint Support:** PostgreSQL strictly enforces referential integrity, immediately rejecting rogue inserts or illegal deletions that violate relational rules.

### 3.2 Prisma ORM (Object-Relational Mapping & Schema Management)
* **What it is:** A modern next-generation ORM for Node.js and TypeScript that manages database schemas, automatic migrations, and type-safe database queries.
* **Why it was used in Campusly:**
  * **Declarative Schema Definition:** Allowed me to model the entire database declaratively in a single file (`schema.prisma`), defining models, fields, relations, attributes, and indexes in clean, human-readable syntax.
  * **Automated TypeScript Type Generation:** Running schema generation automatically produced type-safe TypeScript models for Usman (Backend) and Nahom (Full-Stack). When I modified a table structure, the backend developers received instant compile-time feedback, eliminating mismatch bugs between SQL columns and server code.
  * **Automated Migrations:** Allowed seamless synchronization of schema updates between local Docker setups and our live Supabase cloud database.

### 3.3 Docker & Docker Compose (Local Environment Standardization)
* **What it is:** A containerization platform that packages software and its dependencies into isolated environments.
* **Why it was used in Campusly:**
  * During the first week of the internship, our team members ran different operating systems (Windows and Linux) with differing installed versions of PostgreSQL, leading to configuration conflicts.
  * I configured a containerized PostgreSQL 16 instance using Docker Compose with persistent named volumes. This guaranteed that every developer on the team ran an identical database engine with the exact same configuration, and local test data persisted across container restarts.

### 3.4 Supabase (Cloud-Managed PostgreSQL Infrastructure)
* **What it is:** A cloud platform that provides managed, enterprise-grade PostgreSQL hosted on Amazon Web Services (AWS).
* **Why it was used in Campusly:**
  * Running a database on a local laptop is sufficient for offline development, but a deployed platform requires high availability, automated backups, SSL encryption, and global cloud access.
  * Supabase provided a dedicated PostgreSQL 16 instance with built-in monitoring, web-based SQL inspection tools, and connection poolers.

### 3.5 Connection Pooling via Supavisor / PgBouncer
* **What it is:** A lightweight connection manager that pools and maintains active connections to PostgreSQL.
* **Why it was used in Campusly:**
  * In a production environment with concurrent user requests and serverless Next.js queries, opening a new direct PostgreSQL connection for every request rapidly exhausts database memory and hits connection limits.
  * I configured connection pooling on port 6543, enabling hundreds of concurrent client queries to safely share a pool of optimized database connections without crashing the server.

---

## 4. ARCHITECTURAL JUSTIFICATION: WHY POSTGRESQL & PRISMA VS. ALTERNATIVES?

Examiners will often ask: *"Why did you use a relational database like PostgreSQL instead of a NoSQL database like MongoDB?"* or *"Why didn't you use MySQL or plain SQL queries without an ORM?"*

### 4.1 Why PostgreSQL Over MongoDB (NoSQL)?
1. **Relational Integrity vs. Document Duplication:**
   * An academic marketplace is inherently relational: users own listings, categories parent product types, buyers execute transactions, and admins leave moderation logs.
   * In a NoSQL document database like MongoDB, relationships are often handled by embedding documents or duplicating data. If a student updates their username, that change must be updated across hundreds of embedded listing documents, creating severe data inconsistency risks. In PostgreSQL, updating the user record in one row updates the relational reference everywhere instantly.
2. **ACID Transactions in Financial Operations:**
   * Handling purchases requires strict transactional guarantees: marking an item as sold, crediting a seller's ledger, and generating a purchase receipt must either all succeed together or all fail together. PostgreSQL provides native, hardened multi-table ACID transactions, whereas handling complex transactions across documents in MongoDB is heavier and more complex.
3. **Database-Level Constraint Enforcement:**
   * PostgreSQL enforces business rules at the lowest level: unique emails, foreign key cascades, and check constraints on prices (`price >= 0`). Even if a buggy backend route attempts to save bad data, PostgreSQL rejects it, acting as an unbreachable shield.

### 4.2 Why PostgreSQL Over MySQL?
* **Native Custom ENUM Types:** PostgreSQL allows defining custom enumerated types (`Role`, `ProductStatus`) directly in the database catalog.
* **Advanced Indexing Capabilities:** PostgreSQL offers superior indexing algorithms (including B-Tree, GIN, and GiST indexes), essential for future full-text search across academic document descriptions.
* **Superior Standards Compliance & Supabase Ecosystem:** PostgreSQL’s modern architecture integrates seamlessly with Supabase, providing effortless cloud connection pooling and real-time dashboard inspection.

### 4.3 Why Prisma ORM Over Writing Raw SQL Queries?
* **Developer Velocity & Type Safety:** Writing raw SQL queries manually in backend controllers requires constant string concatenation, leaving room for SQL injection vulnerabilities and runtime errors if a column name is misspelled.
* **Unified Source of Truth:** Prisma acts as the single source of truth for the entire engineering team. When the database schema changes, Prisma automatically generates updated TypeScript interfaces for the backend, guaranteeing that the frontend, backend, and database speak the exact same language.

---

## 5. THE COMPLETE DATA ARCHITECTURE (8 TABLES & 2 ENUMS)

The database schema was engineered in strict compliance with **Third Normal Form (3NF)** to eliminate redundancy and prevent update anomalies:

```
┌─────────────────┐       1:1       ┌──────────────────┐
│      User       ├─────────────────┤     Profile      │
│  (Auth & Role)  │                 │ (Bio & ID Card)  │
└────────┬────────┘                 └──────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       N:1       ┌──────────────────┐
│     Product     ├─────────────────┤   ProductType    │
│ (Listings & ETB)│                 │   (Sub-types)    │
└───┬─────┬───────┘                 └────────┬─────────┘
    │     │                                  │ N:1
    │     │ 1:N                              ▼
    │     ├─────────────────────────►┌──────────────────┐
    │     │                          │     Category     │
    │     ▼                          │  (Departments)   │
    │ ┌──────────────────┐           └──────────────────┘
    │ │   ProductImage   │
    │ │  (Preview URLs)  │
    │ └──────────────────┘
    │
    │ 1:N
    ├───────────────────────────────►┌──────────────────┐
    │                                │  ProductReview   │
    │                                │  (Admin Audits)  │
    │ 1:N                            └──────────────────┘
    ▼
┌─────────────────┐
│   Transaction   │
│(Purchase Ledger)│
└─────────────────┘
```

### 5.1 Custom Database ENUMs
1. `Role`: Defined as `['user', 'admin']`. Enforced at the database catalog level to prevent privilege escalation.
2. `ProductStatus`: Defined as `['pending', 'approved', 'rejected', 'sold']`. Governs the lifecycle of every uploaded academic resource.

### 5.2 Relational Tables Breakdown
1. **`User` (Root Authentication Record):** Stores system-level identity: UUID primary key, unique email index, Bcrypt password hash, role enum, and administrative soft-ban flags (`is_banned: boolean`, `banned_reason: string`).
2. **`Profile` (Biographical & Verification Record):** Linked 1-to-1 with `User` via a unique foreign key with `onDelete: Cascade`. Separating `Profile` from `User` keeps authentication queries lightweight while storing student display names, bios, avatars, student ID numbers, and uploaded university ID card links.
3. **`Category` (Academic Departments):** Stores standardized university disciplines (Computer Science, Engineering, Medicine, Law, etc.) with a unique name index.
4. **`ProductType` (Nested Subcategories):** Stores specific resource classifications (e.g., "Lecture Notes", "Past Exams", "Lab Guides"). Linked to `Category` with a composite unique constraint across `[category_id, name]`, allowing different departments to share subcategory names without duplication.
5. **`Product` (Core Resource Listing):** Stores listing title, description, price in Ethiopian Birr (ETB), deliverable file path, seller reference (`user_id`), category reference, and product type reference. Defaults to `status: pending`.
6. **`ProductImage` (Listing Preview Gallery):** Supports multi-image listings through a 1-to-many relationship with `Product` with `onDelete: Cascade`.
7. **`ProductReview` (Admin Moderation Audit Log):** Maintains an immutable audit history of admin decisions. Stores the listing reference, reviewing admin reference, status decision (`approved` or `rejected`), mandatory rejection reason, and timestamp.
8. **`Transaction` (Immutable Financial Ledger):** Records completed sales, linking buyer ID, product ID, payment intent reference, and test sandbox flags.

---

## 6. COMPLETE SYSTEM WORKFLOW: USER SIDE VS. ADMIN SIDE

To clearly explain how data moves through the database, describe the operational workflows from both perspectives:

### 6.1 THE USER SIDE (STUDENT & SELLER DATA JOURNEY)
* **Registration & Profile Creation:** When a student signs up, the database executes an atomic operation: creating a record in `User` with a Bcrypt password hash and generating an associated empty row in `Profile` linked by foreign key.
* **Listing Submission & Pending Isolation:** When a seller uploads study notes, the database inserts a row into `Product` with `status: pending`. Because all public marketplace queries include a condition where `status == 'approved'`, this newly inserted product is completely invisible to public buyers.
* **Image & Document References:** Preview image URLs are written to `ProductImage`, while the sensitive deliverable download link is saved to `Product.deliverable_file_url`.
* **Purchasing & Unlocking Deliverables:** When a student buys notes, a record is inserted into `Transaction` with `status: completed`. When the buyer subsequently requests the deliverable file, the database executes a relational check verifying that a completed transaction exists for that user and product before revealing the file link.
* **Student Verification Upload:** When a student submits their university ID card, `Profile.verification_status` updates to `pending` and `student_id_card_url` stores the document reference, awaiting administrative inspection.

### 6.2 THE ADMIN SIDE (GOVERNANCE & AUDIT DATA JOURNEY)
* **Moderation Pipeline Queries:** Admins query for all `Product` rows where `status == 'pending'`, joining seller profiles to review the submitter's identity.
* **Atomic Approval / Rejection:** When an admin approves an item, `Product.status` updates to `approved`, immediately making it queryable on the public homepage. If rejected, `Product.status` updates to `rejected` and an audit entry is created in `ProductReview` containing the mandatory feedback string.
* **Student ID Verification Processing:** Admins query for profiles with `verification_status == 'pending'`. Inspecting the image and approving it updates `is_verified: true` and `verification_status: verified`, which cascades verified checkmarks to all listings owned by that student.
* **User Management & Soft-Bans:** When an admin disciplines an abusive account, the database updates `User.is_banned = true` and records `banned_reason`. The record is never deleted from PostgreSQL, preserving relational integrity across all historical sales and purchases.

---

## 7. REAL-WORLD BUGS SOLVED & DATA INTEGRITY FIXES

During testing, several critical database challenges emerged that I diagnosed and resolved:

### 1. Foreign Key Violation on Category Deletion
* **The Problem:** When an administrator attempted to delete an academic category in the settings panel, the backend crashed with a 500 error due to a PostgreSQL foreign key violation (`ProductType_category_id_fkey`), because subcategories were still linked to it.
* **The Fix:** Configured `onDelete: Cascade` on the `ProductType` table so that removing an empty department automatically cleans up its sub-types. Furthermore, established a relational safeguard with Usman (backend) to check whether active student listings were linked to the category before permitting deletion.

### 2. The Cascade Delete Hazard & Financial History Loss
* **The Problem:** Early schema drafts had `onDelete: Cascade` set on all user foreign keys. During testing, we realized that deleting a user account would automatically wipe out their entries in the `Transaction` table. This presented a catastrophic flaw: deleting a buyer would permanently erase a seller's recorded earnings and sales history.
* **The Fix:** Redesigned foreign keys on financial records to remove cascading deletes, switching to `RESTRICT`. Advised the team to implement soft account bans (`is_banned: true`) rather than hard-deleting records from PostgreSQL, ensuring sales ledgers remain immutable.

### 3. Empty String (`""`) vs. True `NULL` Violations
* **The Problem:** Frontend forms frequently submitted empty strings `""` for optional fields (like phone numbers or ID card links). While valid text, empty strings caused collisions on optional unique indexes and broke SQL queries checking for incomplete profiles via `IS NULL`.
* **The Fix:** Audited all optional attributes to enforce true nullable constraints (`String?`) in Prisma and collaborated with the backend to transform empty strings into true `null` values before persisting them to PostgreSQL.

### 4. Query Performance Optimization with B-Tree Indexes
* **The Problem:** As listing counts grew, executing marketplace filtering by category, search keywords, and status caused sequential full-table scans.
* **The Fix:** Created dedicated **B-Tree indexes** on high-frequency columns: `Product(status)`, `Product(category_id)`, and `Product(user_id)`. This transformed expensive linear scans into instant logarithmic lookups.

---

## 8. CLOUD HOSTING ON SUPABASE & AUTOMATED DATABASE SEEDING

* **Supabase Provisioning:** Provisioned a cloud PostgreSQL 16 cluster in the AWS Asia-Pacific region, ensuring stable cloud connectivity and SSL encryption.
* **Connection Pooling:** Connected Prisma through Supabase's Supavisor / PgBouncer connection pooler on port 6543 to handle concurrent queries from deployed Vercel frontends without exceeding database memory limits.
* **Automated Seeding (`seed.ts`):** Authored an automated database seeding script that populates standard academic departments, subcategories, an initial system administrator account, and mock verified listings to ensure the platform is ready for demonstration.

---

## 9. ORAL DEFENSE MASTER Q&A: DATABASE ENGINEERING

### Q1: "Why did you use a relational database (PostgreSQL) instead of MongoDB?"
> *"Campusly is an inherently relational marketplace. We have strict relationships between users, profiles, categories, product types, moderation logs, and financial transactions. PostgreSQL provides strict ACID transactions essential for purchase integrity, native ENUM types for role enforcement, and foreign key constraints that prevent orphaned records. In MongoDB, handling these relationships requires data duplication or fragile manual references that risk severe data inconsistency."*

### Q2: "What does Third Normal Form (3NF) mean and how did you apply it?"
> *"Third Normal Form ensures that all non-key columns depend solely on the primary key, eliminating data redundancy. For example, rather than storing duplicate academic subcategory strings across thousands of product rows, we isolated categories into a dedicated `Category` table and subcategories into a `ProductType` table, referencing them via foreign keys. Furthermore, separating `User` (auth data) from `Profile` (biographical data) ensures authentication queries remain fast while preventing user updates from affecting login credentials."*

### Q3: "How did you prevent financial records from being deleted when a user deletes their account?"
> *"In our initial schema draft, foreign keys were set to cascade on delete. We identified that deleting a user would erase their sales history in the Transaction table. I fixed this by removing cascade deletes from transactions and implementing a soft-ban mechanism (`is_banned: true`) on the User table, guaranteeing that financial transaction history remains permanent and auditable."*

### Q4: "Why was connection pooling necessary on Supabase?"
> *"In production, multiple users and serverless Next.js requests trigger concurrent API calls. Opening a dedicated PostgreSQL connection for every request quickly hits database connection limits and exhausts server memory. We configured Supabase's PgBouncer / Supavisor connection pooler on port 6543, which pools and reuses active connections, allowing hundreds of concurrent requests to execute safely."*
