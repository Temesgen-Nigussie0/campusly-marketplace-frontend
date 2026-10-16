ST. MARY'S UNIVERSITY
FACULTY OF INFORMATICS
DEPARTMENT OF COMPUTER SCIENCE

INTERNSHIP REPORT
Submitted in Partial Fulfillment of the Requirements for Internship Assessment

Host Organization: Hance Technology PLC
(Publicly operating under the name Formidable)

Prepared by: Naod Kibrom
ID No.: RCD/1052/2016
Section: C
Supervisor (Company): Hannah
Internship Period: July 6 – August 29

---

# TABLE OF CONTENTS

- **PART I: ACKNOWLEDGMENT**
- **PART II: ORGANIZATION RELATED ISSUES**
  - **2.1 Background of the Organization**
    - 2.1.1 Nature of the Business
    - 2.1.2 Products and Services
    - 2.1.3 Number of Employees & Operational Structure
    - 2.1.4 Major Markets Served
    - 2.1.5 Current Revenue Size, Financial Metrics, and Annual Budget
    - 2.1.6 Vision and Mission
    - 2.1.7 Contact and Institutional Details
  - **2.2 Background of Field of Practice**
  - **2.3 Organization's Activities**
    - 2.3.1 About the Project – Campusly Marketplace
- **PART III: ACTUAL PRACTICE (WORK EXPOSURE)**
  - **3.1 Work Performed**
    - 3.1.1 Initial Job Responsibilities
    - 3.1.2 Changes in Job Scope Over the Internship
      - Core Database Architecture and Schema Planning
      - Relational Table Design and Constraint Implementation
      - Cross-Layer Coordination and Schema Evolution
      - Testing, Data Integrity, and Bugs Encountered
      - Cloud Hosting on Supabase and Production Setup
      - Final Deployment and Project Presentation
  - **3.2 Educational Value of the Internship**
  - **3.3 Relationships: Classroom Experience to Actual Work Environment**
- **PART IV: SUMMARY AND CONCLUSIONS**
  - **4.1 Summary**
  - **4.2 Conclusion**
- **References**

---

# PART I: ACKNOWLEDGMENT

First and foremost, I would like to extend my sincere gratitude to Hance Technology PLC for welcoming me into their development team and offering me the opportunity to complete my internship in a truly practical, professional setting. Stepping away from simplified classroom assignments and getting to contribute to a real-world software product that real users interact with was an eye-opening experience that significantly enhanced my perspective on software engineering.

I am deeply thankful to our company supervisor, Hannah (Hana Adane), for her consistent guidance, patience, and valuable feedback throughout the two months of our internship. Whenever our team faced architectural questions or hit roadblocks that we could not readily untangle on our own, she provided constructive advice that helped us evaluate our design choices from an industry perspective. Her mentorship encouraged us to think through data structures and business requirements carefully before jumping into execution.

A special note of thanks also goes to Abubeker at Hance Technology. He spent considerable time sitting down with our group, troubleshooting difficult issues, and walking us through debugging techniques when unexpected errors cropped up between our backend queries and database connections. Having a senior technical mentor willing to dive into the problem with us made a tremendous difference in how fast we learned and how effectively we resolved technical hurdles.

I am equally grateful to my three teammates on the Campusly Marketplace project—our frontend developer, our backend developer Usman Hassen, and our full-stack developer. Building a multi-tier web application of this scale required constant communication, compromise, and mutual accountability. Because my role was focused on the database, almost every single feature had to pass through discussions between us—aligning backend endpoints with data models, structuring fields to match user interface designs, and debugging queries when records failed to save or display properly. Having teammates who were approachable, dedicated, and ready to jump on joint debugging sessions made the entire two-month period productive and genuinely enjoyable.

Finally, I wish to express my appreciation to St. Mary's University, the Faculty of Informatics, and the Department of Computer Science. The theoretical foundations and laboratory coursework provided by our instructors—particularly in database systems, data structures, and software engineering—equipped me with the essential concepts needed to adapt to a fast-paced development environment and carry out my responsibilities with confidence.

---

# PART II: ORGANIZATION RELATED ISSUES

## 2.1 Background of the Organization

### 2.1.1 Nature of the Business

Hance Technology PLC is an Ethiopian software engineering and venture development enterprise founded and registered as a private limited company. Headquartered in Addis Ababa in the Bole area, the company operates commercially and publicly under the trade name Formidable. At its foundation, Hance Technology functions as a high-end software development firm providing bespoke digital solutions for external corporate clients and emerging ventures. However, its organizational mandate stretches significantly beyond conventional software contracting. The company positions itself as an active ecosystem builder and startup matchmaking platform designed to elevate the technological standard and commercial viability of innovation within Ethiopia and the broader African continent.

The underlying philosophy behind Hance Technology PLC stems from the observation that many promising domestic businesses and entrepreneurs frequently struggle to find technical partners capable of delivering software built to international engineering benchmarks. Often, early-stage companies settle for fragmented development, fragile software architecture, or superficial digital tools that fail to scale under actual market demands. Hance was established to resolve this dilemma by providing rigorous technical execution paired with strategic venture building.

What sets Hance apart from standard software development agencies is its integrated dual business model. On one side, it acts as an embedded technical partner, engineering complete web and mobile software platforms from scratch with the same depth of responsibility and quality control that an in-house engineering team would maintain. On the other side, the company functions as an early-stage incubator and accelerator partner, identifying high-potential startup founders and connecting them with the capital access, industry mentorship, and operational guidance required to build viable enterprises. By consolidating software engineering with venture acceleration, Hance allows an entrepreneur with an ambitious concept to transition into an operational, fundable business under one roof.

### 2.1.2 Products and Services

The core offerings of Hance Technology PLC correspond directly to its dual operational mandate, dividing into professional software engineering services and startup venture support programs.

On the software development side, the company designs, builds, and maintains custom digital systems tailored to the specific functional requirements of each client rather than relying on prefabricated templates or generic software packages. These technical services encompass:

- **Backend Architecture and Database Engineering:** Designing resilient server-side architectures, RESTful API layers, relational data models, and database schema structures optimized for relational integrity, data security, and long-term query performance.
- **Web and Mobile Application Development:** Developing responsive, modern client-facing applications using modern frameworks such as Next.js, React, Node.js, and TypeScript.
- **Enterprise Business Systems:** Constructing enterprise resource planning (ERP) platforms, customer relationship management (CRM) systems, and specialized administrative portals that streamline internal business workflows and reporting.
- **Cloud Infrastructure and Database Management:** Configuring reliable hosting environments, managed cloud database services (such as PostgreSQL on Supabase or AWS), containerization with Docker, reverse proxy setups, and automated deployment pipelines to ensure continuous availability.
- **Technical Advisory and Ongoing Maintenance:** Assisting organizations with architectural reviews, codebase refactoring, security audits, and post-launch maintenance to ensure software continues to function properly as user bases expand.

On the startup and venture building side, Hance runs structured programs aimed at accelerating early-stage founders:

- **Hance Accelerator Cohort:** A focused 12-week program centered on product validation, technical execution, financial modeling, and growth milestones. Selected founders receive non-dilutive support, investor pitch coaching, cap-table advisory, and direct access to industry partners, culminating in a competitive Demo Day.
- **Startup World Cup Regional Hosting:** The company collaborates with international startup organizations to host the Ethiopian national qualifying round of the Startup World Cup, enabling domestic entrepreneurs to showcase their innovations and compete on a global stage.
- **Startup Assessment Framework:** An internal evaluation methodology used by Hance to assess ventures across market validation, unit economics, technical architecture, scalability, and investor readiness.
- **Ecosystem Events:** Organizing investor roundtables, founder mixers, and technical workshops that bridge the gap between technical creators, corporate stakeholders, and venture capitalists across the African tech ecosystem.

### 2.1.3 Number of Employees & Operational Structure

Hance Technology PLC maintains a lean, focused organizational structure with approximately 10 full-time core personnel operating from its headquarters in Addis Ababa. Rather than expanding an unwieldy internal corporate bureaucracy, the company emphasizes operational efficiency, agile collaboration, and a high degree of technical autonomy among its engineers and project managers.

To complement its compact internal team, Hance leverages an extensive external network of specialized advisors, domain mentors, freelance technical consultants, and venture partners. This network enables the company to execute multi-tier software projects and administer comprehensive startup acceleration cohorts without losing its agile operational pace. Within the office, the working atmosphere is distinctly collaborative; engineers, product managers, and interns work in close physical proximity, encouraging continuous communication across development layers rather than isolating team members within rigid departmental silos.

### 2.1.4 Major Markets Served

The primary market served by Hance Technology PLC is the Ethiopian domestic economy, with an acute focus on early-stage technological ventures, small-to-medium enterprises, and tech-enabled startups. Because early-stage businesses operate under intense market uncertainties and evolving requirements, Hance structures its development processes around flexibility, rapid feedback loops, and architectural reliability rather than rigid, bureaucratic enterprise waterfall cycles.

Simultaneously, through its ecosystem-building programs and regional startup competitions, the company engages with founders, investors, and startup support organizations in neighboring East African countries and key regional hubs including Kenya, Nigeria, South Africa, and Uganda. Nevertheless, the company's day-to-day software engineering initiatives—including the Campusly project assigned to our team—remain firmly anchored in addressing concrete, real-world challenges faced by Ethiopian users, taking into account local infrastructure, payment realities, and user behaviors.

### 2.1.5 Current Revenue Size, Financial Metrics, and Annual Budget

In alignment with standard corporate policies for privately registered firms, Hance Technology PLC does not make its detailed financial statements, profit margins, or annual operating budgets accessible to the general public. As student interns assigned specifically to software development and data architecture, we were not granted access to internal financial documents or proprietary client contracts, as these matters remain strictly within executive management.

Nonetheless, through day-to-day observations of the company's operations, it is evident that Hance generates revenue through two principal streams. The first is direct technical contracting, where clients pay for custom software development, backend engineering, cloud infrastructure management, and ongoing software maintenance. The second stream derives from its venture support programs, which may encompass cohort participation fees, partnership agreements, corporate sponsorships for ecosystem gatherings, and grants aimed at stimulating entrepreneurship and digital innovation across the continent.

### 2.1.6 Vision and Mission

**Vision:**  
Hance Technology PLC envisions closing the persistent gap between promising commercial concepts and the technical execution and capital investment required to turn those concepts into durable, scalable digital enterprises. The organization aims to transform disconnected startup attempts into a coherent, interconnected innovation ecosystem where African entrepreneurs can access world-class technical execution and sustainable growth pathways.

**Mission:**  
The company’s mission is articulated through several foundational priorities:
1. **Curating High-Potential Founders:** Selectively identifying driven entrepreneurs and providing them with deep, hands-on support rather than diluting resources across high volumes of unfocused projects.
2. **Delivering Rigorous Technical Execution:** Pairing strategic business consulting with production-grade software engineering, ensuring that applications are built on secure architectures, resilient databases, and clean codebases that survive past initial proof-of-concept stages.
3. **Fostering Long-Term Viability:** Prioritizing software systems and commercial models designed for stability, data integrity, and gradual scalability over hasty, superficial prototypes that fail under real operational pressure.

### 2.1.7 Contact and Institutional Details

For formal documentation and institutional verification within this report, the official organizational attributes of the host institution are summarized below:

- **Corporate Legal Name:** Hance Technology PLC
- **Public Trading Name:** Formidable
- **Headquarters Location:** KKARE Building, 3rd Floor, Bole Bras, Bole Sub-City, Addis Ababa, Ethiopia
- **Official Website:** [https://formidable.et](https://formidable.et)
- **Primary Contact Email:** contact@formidable.et
- **Application and Venture Portal:** apply.formidable.et

---

## 2.2 Background of Field of Practice

My internship was conducted within the discipline of software engineering, specifically concentrating on **Database Engineering, Data Modeling, and Relational Database Management Systems (RDBMS)**. On our project team, which was tasked with building the Campusly Marketplace, our four members divided responsibilities across the application layers: one student handled frontend design and user interfaces, another student served as our primary backend logic engineer, a third teammate operated as a full-stack developer connecting the layers, and I was assigned the core responsibility of designing, implementing, maintaining, and cloud-hosting the database.

Database engineering within a multi-tier web application is often the least visible layer from the user's perspective, yet it represents the foundational bedrock upon which the entire system rests. Every single user interaction—from registering an account, publishing a study guide, and searching across categories, to admin approval workflows and transaction records—ultimately translates into reads, writes, updates, and relational queries directed at the database. If the database schema is poorly designed, lacks appropriate integrity constraints, or suffers from improper indexing, the entire application will eventually become sluggish, produce corrupted records, or fail entirely under concurrent usage.

My day-to-day field of practice required me to operate at the intersection of business requirements, relational theory, and practical server-side integration. This included:
- Translating functional product specifications into formal conceptual, logical, and physical data models.
- Establishing normalized relational tables in PostgreSQL, ensuring 3rd Normal Form (3NF) to eliminate data redundancy while maintaining relational integrity.
- Defining primary keys, composite unique keys, foreign keys, default values, check constraints, and cascade behaviors.
- Working directly with Prisma ORM (`schema.prisma`) in tandem with the backend team to ensure that generated TypeScript types and database tables remained perfectly synchronized.
- Provisioning and configuring local containerized PostgreSQL instances using Docker and Docker Compose.
- Identifying database performance bottlenecks, adding indexing strategies, and diagnosing SQL query execution plans.
- Migrating the relational schema and seed data from local development to a live, cloud-hosted PostgreSQL instance on Supabase, configuring connection pooling to support concurrent client requests securely.

### 2.2.1 About the Project – Campusly Marketplace

The practical focus of our internship team was the complete design, construction, and deployment of **Campusly**, a specialized peer-to-peer web marketplace built specifically for university students. 

Across Ethiopian universities, students frequently trade academic resources—including handwritten and typed lecture notes, comprehensive study modules, past semester examination papers with solutions, lab reports, and recorded tutorial sessions. Historically, these exchanges have occurred haphazardly through disorganized Telegram channels, Facebook groups, or informal word-of-mouth. These unorganized channels present significant challenges: files are easily lost in chat streams, there is no centralized catalog or categorization by department, pricing is inconsistent, and buyers have zero protection against fraudulent or low-quality materials.

Campusly was conceived to transform this informal exchange into a structured, secure, and trustworthy academic marketplace. The platform incorporates several core mechanisms:
1. **Curated Academic Discovery:** Students can filter listings by academic category (such as Computer Science, Engineering, Business, Medicine, and Law) and specific resource types (notes, past exams, summaries).
2. **Mandatory Content Moderation:** To prevent plagiarism, inappropriate content, and low-quality uploads, new listings do not go live automatically. Instead, they enter a `pending` state in the database and must be reviewed and approved by an administrator before becoming publicly visible.
3. **Student Identity Verification:** To build trust within the university community, users can upload their institutional student IDs. Administrators review these credentials through a dedicated queue, granting verified badges to authentic student accounts.
4. **Secure Digital Deliverables:** Study materials are stored safely in cloud storage (Cloudinary), with the database safeguarding file download references so that deliverable links are only accessible to verified purchasers, listing owners, and system admins.
5. **Transaction and Review Tracking:** Verified purchases are recorded in a transaction ledger, enabling buyers to leave authentic ratings and reviews while sellers track their cumulative earnings.

By the conclusion of the internship, our team successfully deployed the full platform into production. The Next.js frontend was launched on Vercel, the NestJS backend was hosted on cloud infrastructure, and the relational PostgreSQL database was hosted live on Supabase, accessible to the public at `https://campusly-marketplace.vercel.app/`.

---

## 2.3 Organization's Activities (Practices of the Agency/Organization)

During our two-month internship at Hance Technology PLC, our team was immersed in real-world professional development practices. Rather than working on trivial toy examples or isolated academic problems, we adhered to industry-standard software engineering workflows governed by agile methodologies, regular milestone reviews, and cross-functional team coordination.

The agency's internal engineering workflow typically follows structured phases:

1. **Requirements Gathering and Architecture Formulation:** Projects begin with a rigorous breakdown of functional specifications, user personas, and system boundaries. For our team, this phase involved analyzing documentation provided by Hance, clarifying ambiguous requirements with our supervisor, and creating preliminary data schemas and wireframes before writing a single line of application logic.
2. **Iterative Sprint Development:** The development cycle was structured into sprints. Every morning, our team participated in standup check-ins where we outlined what had been achieved, discussed ongoing tasks, and immediately flagged any blockers. For example, if the backend developer needed a new field added to the `Product` table to support listing visibility toggles, or if the frontend developer required a new sub-category relationship, we resolved the database dependencies before implementation commenced.
3. **Version Control and Collaborative Code Reviews:** We utilized GitHub for collaborative version control. Branching strategies were enforced to ensure that experimental code was never pushed directly into the main development branch without review. As the database engineer, I was responsible for ensuring that any changes to `schema.prisma` or database migration steps were thoroughly tested locally before teammates pulled them into their environments.
4. **Integration Testing and Systematic Quality Assurance:** Before features were marked as complete, they underwent multi-tier testing. We verified API contracts with Postman, verified database constraint handling by intentionally submitting malformed payloads, and confirmed that client-side components accurately reflected database states.
5. **Continuous Deployment and Stakeholder Demos:** Development culminated in deploying working builds to live cloud environments. Regular check-ins were held with Hance technical staff, where we demonstrated newly completed modules, explained architectural decisions, and received critiques on code organization, security, and scalability.

---

# PART III: ACTUAL PRACTICE (WORK EXPOSURE)

## 3.1 Work Performed

### 3.1.1 Initial Job Responsibilities

When our four-member team convened at the beginning of the internship to undertake the Campusly project, our immediate task was to study the technical requirements and delineate clear boundaries of responsibility. We recognized early that attempting to have everyone touch every layer haphazardly would lead to merge conflicts, redundant work, and incoherent architecture. Consequently, we assigned specialized roles based on individual interests and strengths: one teammate assumed ownership of the Next.js frontend interface and Figma UI design, Usman Hassen took responsibility for the NestJS backend controllers and services, our third teammate operated across the full stack connecting endpoints and components, and I took ownership of the database architecture, schema implementation, local database infrastructure, and cloud database hosting.

My initial responsibilities were centered around establishing the data foundation for the entire project. Before my teammates could implement authentication controllers, build product submission forms, or design marketplace cards, they needed a coherent data model to work against. My opening tasks included:

- **Deconstructing Technical Requirements into Entities:** I carefully analyzed the project specification document to identify all core entities required by the marketplace. This meant isolating concepts such as users, authentication credentials, profiles, academic categories, product types, resource listings, uploaded preview images, moderation logs, purchase transactions, and student verification records.
- **Formulating Conceptual and Logical ERDs:** I drafted preliminary Entity-Relationship Diagrams (ERDs) on paper and digital diagramming tools. I mapped out the primary keys, foreign key associations, and cardinalities between entities (e.g., one-to-one between `User` and `Profile`, one-to-many between `Category` and `ProductType`, one-to-many between `User` and `Product`, and one-to-many between `Product` and `Transaction`).
- **Choosing the Database Engine:** After discussing the system requirements with the team, we selected **PostgreSQL** as our relational database management system. PostgreSQL was chosen due to its strict ACID compliance, robust support for custom ENUM types, powerful indexing capabilities, strong referential integrity enforcement through foreign key constraints, and seamless compatibility with cloud hosting providers like Supabase.
- **Local Containerized Environment Setup:** To ensure that our entire team worked against an identical database environment without encountering platform-specific configuration errors (such as mismatched local PostgreSQL versions across Windows and Linux laptops), I configured a containerized database environment using Docker and Docker Compose. I wrote the `db` service definition in `docker-compose.yml`, utilizing the official `postgres:16-alpine` image, mapping standard port `5432:5432`, setting environment variables for credentials (`POSTGRES_USER: postgres`, `POSTGRES_DB: campusly`), and defining a persistent named volume (`campusly_pgdata`) to ensure that local database records persisted across container restarts.
- **ORM Integration with Prisma:** In close collaboration with Usman on the backend, I configured the Prisma Object-Relational Mapper (ORM) inside the backend repository. I established the initial `schema.prisma` file, defined the PostgreSQL datasource provider, and verified that Prisma could communicate with our local Docker container through the local connection string:
  ```
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/campusly?schema=public"
  ```
- **Authoring Foundational Tables:** I wrote the initial data models for the core entities: the `User` table for credential storage, the `Profile` table for student biographical information, the `Category` table for academic subjects, and the `Product` table for item listings. Once formulated, I executed `npx prisma db push` to generate the relational schema directly in PostgreSQL and ran `npx prisma generate` to produce type-safe TypeScript models for our backend developers.

---

### 3.1.2 Changes in Job Scope Over the Internship

As Campusly progressed from an initial architectural blueprint into an active application with complex business logic, my role expanded significantly. I moved from simply establishing static tables to managing dynamic schema iterations, resolving subtle database constraint bugs, optimizing query performance, managing data seeding, and ultimately migrating our entire data tier to Supabase for production release.

#### Core Database Architecture and Schema Planning

Over the course of the project, I designed, implemented, and refined **8 primary relational tables** and **2 custom PostgreSQL ENUM types**, establishing a clean, 3rd-Normal-Form relational structure. The complete data architecture was structured as follows:

1. **Custom ENUM Types:**
   - `Role`: Defined as `('user', 'admin')`. Enforced at the database catalog level to strictly restrict account privileges and prevent unauthorized privilege escalation.
   - `ProductStatus`: Defined as `('pending', 'approved', 'rejected', 'sold')`. Handled the operational lifecycle of every academic listing submitted to the marketplace.

2. **The `User` Table:**
   Serves as the root authentication record. Stores system-level identity details:
   - `id`: Primary key using universally unique identifiers (UUID) generated via `@default(uuid())`.
   - `email`: `String`, decorated with a `@unique` index to prevent duplicate accounts.
   - `password_hash`: `String`, storing bcrypt-hashed credentials. Plaintext passwords never enter the database.
   - `role`: `Role` enum defaulting to `user`.
   - `is_banned`: Boolean flag defaulting to `false`.
   - `banned_reason`: Nullable string documenting administrative disciplinary justification.
   - `banned_at`: Nullable timestamp recording the exact time of account suspension.
   - `created_at`: Timestamp automatically initialized via `@default(now())`.

3. **The `Profile` Table:**
   Maintains a strict **one-to-one relationship** with `User` via a unique foreign key constraint (`user_id -> User.id`) with `onDelete: Cascade`. Separating `Profile` from `User` kept authentication queries fast while isolating personal details:
   - `username`: Unique handle used across public marketplace listings.
   - `name`: Full student display name.
   - `bio`, `phone`, `avatar_url`: Optional biographical and contact attributes.
   - `is_verified`: Boolean badge indicating student verification status.
   - `student_id`: Optional text field storing institutional ID numbers.
   - `student_id_card_url`: Storing secure Cloudinary URLs of uploaded student ID cards.
   - `verification_status`: String tracking review state (`unverified`, `pending`, `verified`, `rejected`).
   - `verification_reason`: Nullable text storing admin feedback for verification decisions.
   - `notify_email`, `notify_push`, `notify_sms`: Notification preference toggles.

4. **The `Category` Table:**
   Represents top-level academic disciplines (e.g., Computer Science, Engineering, Business, Medicine, Law, Natural Sciences). Contains `id` (UUID) and `name` (`String` with a `@unique` constraint).

5. **The `ProductType` Table:**
   Represents subcategories nested under a parent discipline (e.g., "Lecture Notes", "Past Exams", "Lab Guides"). Linked to `Category` through `category_id` (FK -> `Category.id` with `onDelete: Cascade`). To prevent duplicate type entries under the same department while allowing different departments to share type names, I implemented a **composite unique constraint**:
   ```prisma
   @@unique([category_id, name])
   ```

6. **The `Product` Table:**
   The central entity of the marketplace. Represents academic items uploaded for sale:
   - `id`: UUID primary key.
   - `user_id`: Foreign key linked to `User.id` (seller) with `onDelete: Cascade`.
   - `title`, `description`: Detailed text describing the study material.
   - `price`: `Float` column representing the cost in Ethiopian Birr (ETB).
   - `status`: `ProductStatus` enum defaulting to `pending`, ensuring that items remain hidden until approved.
   - `category_id`: Foreign key referencing the associated `Category`.
   - `product_type_id`: Foreign key referencing the associated `ProductType`.
   - `is_featured`: Boolean flag for promotional placement on the homepage banner.
   - `is_hidden`: Boolean toggle allowing sellers to temporarily unpublish an active listing without deleting its history.
   - `report_count`: Integer counter defaulting to `0` for user community flags.
   - `deliverable_file_url`: Nullable URL pointing to the protected document stored in Cloudinary.
   - `created_at`: Creation timestamp.

7. **The `ProductImage` Table:**
   Supports multi-image listings through a **one-to-many relationship** with `Product`. Contains `id`, `product_id` (FK -> `Product.id` with `onDelete: Cascade`), and `image_url` storing Cloudinary image paths.

8. **The `ProductReview` Table (Admin Moderation Log):**
   Maintains a verifiable audit log of administrative decisions. Linked to `Product.id` and `User.id` (the reviewing admin). Stores the moderation decision (`status`: approved or rejected), an optional rejection `reason`, and the timestamp `reviewed_at`.

9. **The `Transaction` Table:**
   Maintains a reliable financial and purchase history:
   - `id`: UUID primary key.
   - `product_id`: Foreign key referencing `Product.id`.
   - `buyer_id`: Foreign key referencing `User.id` (the purchasing student).
   - `payment_id`: Nullable text storing external or mock payment intent identifiers.
   - `status`: Transaction status string defaulting to `pending` until completed.
   - `is_test`: Boolean indicating sandbox or test transactions.
   - `buyer_comment` and `buyer_rating`: Nullable post-purchase feedback fields (rating 1–5), allowing buyers to review materials only after a completed purchase.
   - `created_at`: Transaction timestamp.

---

#### Collaborative Schema Iteration and Cross-Layer Coordination

A major takeaway from my role was realizing that a database schema cannot be designed in complete isolation. As my teammates developed frontend pages and backend endpoints, new functional requirements frequently emerged that required schema revisions:

- **Supporting Administrative Rejections:** Initially, our team assumed that a listing was either pending or approved. However, when the backend teammate implemented the moderation dashboard, he noted that rejected listings needed a clear, mandatory explanation so sellers could correct formatting or copyright issues. I updated the schema to introduce `ProductReview` with a mandatory `reason` attribute when status changed to `rejected`, ensuring sellers received clear feedback.
- **Student Verification Architecture:** During middle sprint planning, the frontend teammate noted that student trust was our primary differentiator over Telegram channels. To support this, I expanded the `Profile` model to include `student_id_card_url`, `verification_status`, and `verification_reason`. This allowed the backend to build a dedicated verification queue and allowed the frontend to display verified checkmark badges next to seller names.
- **Listing Visibility Toggles:** Sellers wanted the ability to temporarily pause sales when revising their materials. Instead of allowing sellers to delete listings—which would break historical transaction records—I introduced the `is_hidden` boolean column to `Product`.
- **Verified Buyer Reviews:** Our team debated whether to create a standalone `Reviews` table. After analyzing user flows, I recommended attaching `buyer_rating` and `buyer_comment` directly to the `Transaction` entity. This database constraint guaranteed that a user could never submit a rating or comment for a study guide unless they had an actual, completed purchase transaction recorded in the database.

---

#### Testing, Data Integrity, and Bugs Encountered

Building and maintaining a relational schema for a live application surfaced several real-world database bugs. Working through these issues provided some of the most valuable technical lessons of the entire internship:

1. **Bug 1: Foreign Key Violation and Server Crashes on Category Deletion**  
   - *The Problem:* When testing the admin settings dashboard, attempting to delete an academic category that still contained related product types or products caused PostgreSQL to throw an error: `violates foreign key constraint "ProductType_category_id_fkey"`. Because the foreign key lacked an explicit cascading strategy, the database aborted the query, leading to an unhandled 500 error in the backend.
   - *How I Fixed It:* I resolved this at two levels. First, in the relational model, I defined `onDelete: Cascade` on the `ProductType` table, ensuring that subcategories were automatically cleared if an unused category was removed. Second, because we did not want active student listings accidentally wiped out if a category was deleted, I established a strict relational check: I worked with Usman so that the backend queried for dependent products first, rejecting category deletion if active listings were still linked, while allowing clean cascading deletion of sub-types for empty categories.

2. **Bug 2: Cascade Delete Hazards and Financial History Loss**  
   - *The Problem:* In our initial schema draft, all foreign keys referencing `User.id` were set to `onDelete: Cascade`. During testing, we realized that if a user account was deleted, cascading that deletion would automatically delete their entries in the `Transaction` table. This presented a serious flaw: deleting a buyer would erase a seller’s recorded sales history and financial earnings.
   - *How I Fixed It:* I redesigned the foreign key relationships on financial records. I removed cascading deletes from `Transaction.buyer_id` and `Transaction.product_id`, shifting the policy to prevent accidental data loss. Furthermore, I advised the team to implement soft-account bans (`is_banned: true`, `banned_at`) on the `User` table rather than hard-deleting user records from PostgreSQL, preserving the integrity of historical transactions.

3. **Bug 3: Empty String Values Violating Nullable Constraints**  
   - *The Problem:* On the frontend profile update and listing creation pages, optional form inputs (such as `bio`, `phone`, `avatar_url`, and `student_id_card_url`) frequently submitted empty strings (`""`) rather than `null` when left blank by users. While an empty string is technically valid text, it caused issues in SQL queries checking for empty fields via `IS NULL`, and caused unique constraint collisions on optional fields.
   - *How I Fixed It:* I audited the schema to verify that all optional attributes were strictly defined as nullable (`String?` in Prisma / `NULL` in PostgreSQL). I then collaborated with Usman to configure backend NestJS validation pipes and data transformation decorators (`@Transform(({ value }) => value === '' ? null : value)`), ensuring that empty input strings were normalized to true `null` values before being persisted into PostgreSQL.

4. **Bug 4: Custom ENUM Type Migration Inconsistencies**  
   - *The Problem:* Mid-way through development, we needed to introduce a new state—`sold`—to our `ProductStatus` enum. In standard SQL databases, adding an enum value can cause schema migration locks. When pushing changes locally, Prisma threw warnings indicating that modifying existing PostgreSQL enum types in place could lead to catalog inconsistencies or require dropping the enum.
   - *How I Fixed It:* I investigated PostgreSQL catalog structures (`pg_type`, `pg_enum`). Rather than dropping tables and destroying test data, I safely updated the enum by executing a targeted raw SQL command:
     ```sql
     ALTER TYPE "ProductStatus" ADD VALUE 'sold';
     ```
     Once the PostgreSQL catalog was updated, `prisma db push` completed without errors, and our backend validation logic was able to reference the `sold` status smoothly.

5. **Bug 5: Duplicate Product Types Under Categories**  
   - *The Problem:* We observed that through the admin interface, an administrator could inadvertently add duplicate subcategories (for example, creating two "Lecture Notes" sub-types under "Computer Science"). The initial table definition only checked for primary key uniqueness on `id`.
   - *How I Fixed It:* I implemented a composite unique constraint across the `category_id` and `name` columns:
     ```prisma
     @@unique([category_id, name])
     ```
     This enforced at the database engine level that no two product types under the same parent category could share an identical name, while still allowing "Lecture Notes" to exist independently under both "Computer Science" and "Medicine".

6. **Bug 6: Marketplace Search and Filtering Bottlenecks**  
   - *The Problem:* When we seeded our local database with dozens of sample listings to test the marketplace discovery interface, we noticed that search and filtering queries (filtering by `category_id`, `product_type_id`, and `status = 'approved'`) were performing full sequential table scans, which would degrade significantly as the number of listings grew.
   - *How I Fixed It:* I reviewed PostgreSQL query execution plans and introduced targeted B-tree indexes on foreign keys and frequently filtered status columns:
     ```prisma
     @@index([status])
     @@index([category_id])
     @@index([product_type_id])
     @@index([user_id])
     ```
     These indexes allowed PostgreSQL to perform fast index lookups rather than scanning every row in the `Product` table, ensuring responsive search times for frontend users.

---

#### Cloud Hosting on Supabase and Production Setup

While running PostgreSQL locally inside Docker was ideal for offline development and testing, our team needed to make Campusly accessible on the live internet. We selected **Supabase** as our cloud database hosting provider. Supabase provides an enterprise-grade, managed PostgreSQL environment hosted on top of AWS, complete with connection pooling, SSL encryption, automated backups, and a web-based SQL Editor for real-time monitoring.

The migration and production hosting process involved several key steps:

1. **Project Provisioning and Region Selection:**  
   I initialized a new Supabase cloud project, provisioning a dedicated PostgreSQL 16 instance hosted in the Asia-Pacific region (`aws-0-ap-northeast-1.pooler.supabase.com`), ensuring low network latency and stable connectivity.

2. **Connection Pooling Configuration:**  
   Because our backend service would handle concurrent API calls from multiple users and serverless requests from our deployed Next.js frontend, opening direct PostgreSQL connections for every incoming request risked exhausting the database connection limit. To prevent this, I configured Prisma to connect through Supabase's **Supavisor / PgBouncer connection pooler** on port `6543`. I configured the production connection string with transaction pooling and forced SSL encryption:
   ```
   DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require"
   ```

3. **Production Schema Synchronization:**  
   With the live cloud connection established, I synchronized our complete relational schema to Supabase using the Prisma CLI:
   ```bash
   npx prisma db push
   ```
   This command inspected our `schema.prisma` definitions, connected securely to the Supabase PostgreSQL cluster, created all custom ENUMs (`Role`, `ProductStatus`), built the 8 tables, applied foreign key relationships, established composite unique keys, and generated all B-tree indexes without requiring manual DDL script execution.

4. **Production Database Seeding:**  
   An empty marketplace is difficult to test or demonstrate. I wrote a structured database seeding script (`seed.ts`) and executed it against the live Supabase instance:
   - Seeded default academic categories: Computer Science, Engineering, Business, Medicine, Law, Natural Sciences, Mathematics, and Arts & Humanities.
   - Seeded corresponding product types for each category (Lecture Notes, Past Exams, Lab Manuals, Chapter Summaries).
   - Created an initial system administrator account with pre-hashed bcrypt credentials and `role: admin`.
   - Seeded sample verified student profiles, mock listings with realistic descriptions and pricing, and associated Cloudinary preview images.

5. **Live Backend Integration and Verification:**  
   Once the database was populated and validated on Supabase, I shared the verified production connection credentials with Usman and our full-stack teammate. We updated the backend `.env` configuration, restarted the backend container, and tested end-to-end functionality—confirming that account registrations, listing creations, admin approvals, and mock transactions were reading and writing directly to our live Supabase PostgreSQL database.

---

#### Final Deployment and Project Presentation

At the end of the internship period, our team prepared a comprehensive technical presentation to showcase Campusly to the engineers, mentors, and executive staff at Hance Technology PLC. 

During our live demonstration, each teammate presented their respective domain. When my turn arrived, I walked the audience through our data tier:
- I explained our Entity-Relationship Diagram and defended our decision to normalize data into 3NF, illustrating how separating `User` and `Profile` kept authentication fast while allowing rich biographical attributes.
- I demonstrated how our database constraints, foreign keys, and custom ENUM types actively prevented invalid data states—such as unapproved listings appearing in public searches or duplicate subcategories being inserted.
- I opened the Supabase dashboard in real time, demonstrating our active table records, live connection pooler metrics, and executed SQL queries to illustrate how data flowed smoothly between our Vercel-hosted frontend, our NestJS backend, and our cloud PostgreSQL database.

Presenting our architecture to seasoned software engineers was an empowering experience. Being able to explain why we made specific indexing choices, how we prevented cascading deletion flaws, and how connection pooling operated under concurrent requests demonstrated that our database was not just an afterthought, but a well-engineered backbone supporting the entire Campusly platform.

---

## 3.2 Educational Value of the Internship

This two-month internship at Hance Technology PLC provided immense educational value, filling critical gaps that classroom instruction alone could never fully address. In university coursework, database exercises are typically self-contained, predictable, and static: students write isolated SQL queries in a laboratory terminal, test them against synthetic datasets with ten rows, and submit them for grading. In stark contrast, building the data layer for Campusly exposed me to the realities, unpredictability, and discipline required to manage a production database in a collaborative team setting.

First, I gained a deep appreciation for the **consequences of schema design decisions**. In school assignments, if a table design is flawed, you simply edit a `.sql` file and start over. In a team project, once your teammates have written backend DTOs, controllers, and frontend forms against your schema, modifying a column name, changing a data type, or altering a foreign key constraint has ripple effects across the entire codebase. I learned to practice foresight—discussing requirements thoroughly, drafting ERDs, and validating edge cases before committing schema updates.

Second, I gained hands-on mastery over **modern database tooling and workflows**. Prior to this internship, my database exposure was mostly limited to executing basic SQL commands through local GUI tools like pgAdmin. Working on Campusly forced me to learn Docker containerization for database services, Prisma ORM for type-safe database access, schema migration tooling, and cloud database administration on Supabase. Learning how to configure connection poolers, handle SSL certificates, and manage environment variables across local and cloud environments demystified how professional web platforms operate in industry.

Third, the internship significantly enhanced my **debugging and problem-solving mindset**. Encountering foreign key deletion crashes, custom enum migration errors, and sequential query bottlenecks forced me to stop guessing and start diagnosing. I learned to read PostgreSQL error logs systematically, inspect query execution plans, trace foreign key dependencies, and understand how the database engine handles concurrency and transactions.

Finally, the experience dramatically strengthened my **interpersonal and communication skills**. Working as the dedicated database member meant I could not work in a bubble. I was in constant dialogue with our backend developer, frontend designer, and full-stack engineer. Explaining technical database constraints to teammates, negotiating field structures, and coordinating releases taught me how software is genuinely built through collaboration, empathy, and shared ownership.

---

## 3.3 Relationships: Classroom Experience to Actual Work Environment

Throughout the internship, I repeatedly noticed direct connections between the theoretical principles taught in the Department of Computer Science at St. Mary's University and the technical challenges we solved on Campusly. The academic curriculum provided the indispensable foundation, while the internship provided the practical proving ground.

- **Database Systems I & II:**  
  These foundational courses were directly relevant to every aspect of my work. Concepts such as Entity-Relationship (ER) modeling, relational schema design, primary and foreign key definitions, and database normalization (1NF, 2NF, and 3NF) were applied directly when structuring tables like `User`, `Profile`, `Category`, `ProductType`, and `Product`. The classroom emphasis on eliminating data redundancy and avoiding update anomalies guided my decision to split `User` and `Profile` into separate entities and establish a dedicated `ProductType` table rather than storing redundant subcategory strings across thousands of product rows.
- **Advanced Database Systems:**  
  Topics covered in Advanced Database—specifically referential integrity constraints, transaction ACID properties (Atomicity, Consistency, Isolation, Durability), and indexing concepts—proved vital during development. When solving Bug 1 (the category deletion crash) and Bug 2 (preventing cascade deletion of financial transactions), I relied directly on classroom concepts regarding `ON DELETE RESTRICT` versus `ON DELETE CASCADE`. Furthermore, the theoretical understanding of B-tree indexes from our coursework guided my implementation of indexes on `Product(status)`, `Product(category_id)`, and `Product(user_id)`, transforming potential performance bottlenecks into fast lookups.
- **Software Engineering:**  
  The Software Engineering course provided the conceptual framework for understanding the Software Development Life Cycle (SDLC), agile development methods, requirements gathering, and version control. When our team organized sprint tasks, held daily standup meetings, and managed shared code branches via GitHub, we were executing the exact collaborative methodologies taught in class.
- **Programming I, II, and Object-Oriented Programming (OOP):**  
  Although my primary role was database engineering, understanding object-oriented programming principles (encapsulation, abstraction, and data typing) was essential for working effectively with Prisma ORM and TypeScript. When authoring `schema.prisma` and interacting with NestJS service classes, having a firm grasp of classes, objects, interfaces, and asynchronous programming allowed me to understand how our backend consumed and manipulated database records.

**The Contrast Between Classroom and Industry:**  
The most noticeable difference between classroom exercises and the actual work environment was the **messiness, fluidity, and interconnectedness of real-world requirements**. In academic assignments, requirements are typically static, clearly stated in a homework prompt, and designed to produce a single correct output. In an actual company project, requirements are fluid and evolve continuously as the product takes shape. I had to learn how to accommodate new features—such as adding student verification uploads or administrative rejection reasons—without breaking existing tables or wiping out test data. The classroom taught me the theoretical rules of databases; the internship taught me how to apply those rules flexibly, securely, and resiliently under real project constraints.

---

# PART IV: SUMMARY AND CONCLUSIONS

## 4.1 Summary

Over the two months from July 6 to August 29, I completed my software engineering internship at Hance Technology PLC (operating publicly as Formidable) in Addis Ababa, Ethiopia. I was placed on a four-member development team tasked with building **Campusly Marketplace**, a web-based, peer-to-peer platform designed to empower university students to securely buy, sell, and exchange academic materials such as lecture notes, past exam papers, and course study modules. 

Within our team structure, while my peers handled frontend development, backend logic, and full-stack integration, my primary domain of responsibility was **Database Engineering, Relational Data Architecture, and Cloud Database Infrastructure**. 

The internship progressed through structured phases:
1. **Initial Planning and Modeling:** Analyzing product requirements, drafting conceptual and logical Entity-Relationship Diagrams (ERDs), selecting PostgreSQL as our primary RDBMS, and provisioning a local containerized database using Docker and Docker Compose.
2. **Schema Implementation and Evolution:** Designing and refining 8 primary relational tables (`User`, `Profile`, `Category`, `ProductType`, `Product`, `ProductImage`, `ProductReview`, `Transaction`) and 2 custom PostgreSQL ENUM types (`Role`, `ProductStatus`) using Prisma ORM, enforcing strict data integrity, foreign key constraints, composite unique indexes, and cascade policies.
3. **Collaborative Integration and Bug Resolution:** Collaborating daily with backend and frontend teammates to align data models with user interfaces and API endpoints. Diagnosing and resolving critical database bugs, including foreign key deletion violations, cascade delete risks on transaction records, empty string constraint issues, custom enum migration inconsistencies, and query performance bottlenecks.
4. **Cloud Hosting on Supabase:** Provisioning a live, cloud-hosted PostgreSQL database cluster on Supabase, configuring connection pooling via Supavisor on port `6543` with SSL encryption, synchronizing the complete schema via `prisma db push`, executing automated seed scripts to populate initial academic categories and test accounts, and integrating the live database with our deployed backend and frontend applications.
5. **Demonstration and Presentation:** Presenting our database architecture, relational constraints, and cloud-hosted data workflows during final company demonstrations to Hance Technology engineering staff.

Throughout this project, I gained extensive practical proficiency with PostgreSQL 16, Prisma ORM, Docker, Docker Compose, Supabase, Git, and collaborative agile workflows, fulfilling my academic requirements while making a tangible, lasting contribution to a deployed production platform.

---

## 4.2 Conclusion

My internship at Hance Technology PLC was a profoundly transformative milestone in my academic and professional journey as a Computer Science student. It provided me with a comprehensive, realistic understanding of what software engineering entails beyond the boundaries of textbook theory and classroom assignments.

Working on Campusly demonstrated that building a successful software platform is not merely about writing code; it requires rigorous architectural planning, continuous inter-team communication, careful evaluation of data integrity, systematic debugging, and a commitment to building software that serves the concrete needs of its users. Managing the database taught me that data architecture is the true foundation of any software application—when the database is designed with care, consistency, and structural foresight, the entire development process becomes faster, safer, and more scalable.

Being part of an agile team alongside dedicated frontend, backend, and full-stack colleagues taught me the value of shared ownership, active listening, and technical collaboration. Furthermore, participating in professional check-ins, receiving constructive critiques from our supervisor Hannah and mentor Abubeker, and presenting our final deployed system to experienced software practitioners gave me genuine confidence in my technical abilities.

The courses I completed at St. Mary's University—especially Database Systems, Advanced Database, and Software Engineering—provided the essential knowledge that allowed me to contribute effectively from day one. In turn, the practical experience gained during these two months breathed life into that theoretical knowledge, teaching me how real databases are modeled, managed, debugged, and maintained in production. I conclude this internship with a clear understanding of modern database engineering practices, a deep passion for data architecture, and strong confidence as I prepare to enter the software engineering profession.

---

# References

- Hance Technology PLC (Formidable). Official Corporate Website. [https://formidable.et](https://formidable.et)
- Hance Technology PLC. Company Profile and Venture Program Documentation. (Provided by host organization, Addis Ababa, Ethiopia).
- Campusly Marketplace. Live Deployed Web Application. [https://campusly-marketplace.vercel.app](https://campusly-marketplace.vercel.app)
- PostgreSQL Global Development Group. PostgreSQL 16 Documentation: Data Types, Constraints, and Indexing. [https://www.postgresql.org/docs/16/](https://www.postgresql.org/docs/16/)
- Prisma Documentation. Prisma Schema Reference, Relations, and PostgreSQL Connection Pooling. [https://www.prisma.io/docs](https://www.prisma.io/docs)
- Supabase Documentation. Managed Postgres, Connection Pooler (Supavisor), and SSL Configuration. [https://supabase.com/docs](https://supabase.com/docs)
- St. Mary's University, Department of Computer Science. Internship Guidelines and Assessment Framework. Addis Ababa, Ethiopia.
