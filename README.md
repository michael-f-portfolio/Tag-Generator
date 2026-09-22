# Tag Generator

A JavaScript application designed to automate inventory receiving workflows by processing Purchase Order (PO) CSV files and generating standardized product tags and inventory summaries.

Originally developed to solve a real operational challenge following an inventory management system migration, this application reduced manual administrative work, standardized inventory documentation, and improved efficiency during receiving and inventory preparation processes.

> **Portfolio Project Note**
>
> This application was developed and used in a production business environment to solve workflow challenges introduced during an inventory management system migration. The solution was adopted by approximately 5-6 inventory staff members and remained in regular use as part of weekly receiving and inventory operations for over one year.

---

# Portfolio Highlight

This project was developed in response to a real business problem encountered during a company-wide inventory management system migration.

After transitioning from a legacy inventory management platform to a newer system, several workflow features previously relied upon by inventory staff were no longer available. One of the most impactful losses was the ability to generate standardized vault tags used for inventory audits, barcode scanning, and product identification.

Without this functionality, employees were required to manually create inventory tags using office software. This process consumed approximately 3 to 4 hours per week and resulted in inconsistent formatting, as each staff member created tags slightly differently.

Recognizing both the inefficiency and the lack of standardization, I independently designed and developed Tag Generator to automate tag creation directly from purchase order data.

While building the application, I identified an additional opportunity to improve inventory receiving workflows. Supplier purchase orders often contained large amounts of information presented in a format that was difficult to quickly reference during inventory intake. To address this, I created a Purchase Order Summary tool that transforms verbose purchase orders into concise, categorized, and sortable inventory lists.

The resulting application reduced a 3-4 hour weekly manual process to approximately one minute, improved consistency across inventory documentation, and streamlined receiving workflows. The tool was adopted by 5-6 staff members and was used as part of weekly operations for over one year.

---

# Features

## Tag Generator

Automatically generates standardized product tags for inventory storage and auditing.

Each tag includes:

- Product Name
- SKU
- Barcode generated from SKU
- Category-based visual highlighting
- Consistent formatting across all products

The generated tags support:

- Inventory audits
- Product identification
- Barcode scanning workflows
- Inventory organization
- Vault management

## Purchase Order Summarizer

Automatically transforms purchase order data into concise, easy-to-review inventory summaries.

Features include:

- Category-based organization
- Alphabetical sorting
- Simplified receiving documentation
- Improved readability compared to supplier purchase orders
- Optional separation of flower products by package size:
  - 3.5g
  - 7g
  - 14g
  - 28g

---

# Problem

Following the migration from a legacy inventory management system to a newer platform, staff lost access to functionality that had previously been relied upon during inventory receiving and auditing workflows.

One of the missing features was the ability to generate standardized vault tags used for:

- Inventory audits
- Barcode scanning
- Product identification
- Product categorization
- Inventory organization

As a result, inventory staff had to manually create tags using office software. This process:

- Consumed several hours per week
- Produced inconsistent formatting between team members
- Increased administrative workload
- Reduced workflow efficiency

Additionally, supplier purchase orders often contained excessive information that made inventory receiving more cumbersome than necessary.

The team required a solution that would increase consistency, reduce manual effort, and improve visibility during inventory processing.

---

# Solution

Tag Generator automates the creation of product tags directly from purchase order CSV files.

The application reads purchase order data and automatically generates:

- Standardized inventory tags
- SKU barcodes
- Category-specific tag formatting
- Consistent product identification labels

To further improve receiving workflows, the application also generates inventory summaries that:

- Organize products by category
- Sort products alphabetically
- Present inventory in a concise, easy-to-read format
- Simplify order preparation and receiving activities

Together, these tools streamline inventory workflows and reduce repetitive manual tasks for receiving staff.

---

# Business Impact

This project was created to solve a real operational challenge rather than as a tutorial or academic exercise.

Following the company's inventory management system migration, staff members were spending approximately 3-4 hours each week manually creating inventory tags needed for receiving, inventory audits, and product identification. In addition to the time investment, each employee created tags differently, resulting in inconsistent formatting and processes.

By automating the workflow through Tag Generator, tag creation was reduced from several hours of manual work each week to approximately one minute.

## Measurable Results

- Reduced weekly tag creation effort from approximately 3-4 hours to around 1 minute
- Standardized inventory tag formatting across all users
- Adopted by approximately 5-6 inventory staff members
- Used in weekly receiving and inventory workflows for over one year
- Improved consistency during inventory audits and stock organization
- Simplified product identification and inventory preparation
- Reduced repetitive administrative work and manual data entry
- Streamlined the receiving process through concise purchase order summaries

This project demonstrates the practical application of software development to solve business problems, improve operational efficiency, and deliver measurable value to end users.

---

# Technology Stack

## Frontend

- JavaScript (ES6+)
- HTML5
- CSS3

## Tooling

- Node.js
- Webpack
- ESLint

## Core Functionality

- CSV file processing
- Data transformation
- Barcode generation
- Dynamic document generation
- Category classification and sorting

---

# Example Workflow

## Input

```csv
SKU,Product Name,Category
123456,Blue Dream 3.5g,Flower
789012,Gelato Vape Cartridge,Vape
345678,Gummies 10 Pack,Edibles
```

## Processing

The application:

1. Reads purchase order data
2. Parses product information
3. Determines product categories
4. Generates inventory tags
5. Creates SKU barcodes
6. Produces categorized inventory summaries
7. Formats output for operational use

## Example Tag Output

```text
--------------------------------
Blue Dream 3.5g

||||||||||
