# AH-LDI / Civil Guards Nigeria — Editable Website

This version is built as a free-friendly website + content-management dashboard.

## What is editable?
From `admin.html`, an authorized administrator can manage:
- News & announcements
- Events
- Training/courses
- Leadership
- Departments/units
- Download links
- Gallery image links
- Contact information and social links
- Membership applications

## Recommended free architecture
- Frontend: this HTML/CSS/JavaScript website
- Hosting: GitHub Pages (free hosting is available on GitHub Free for public repositories)
- Database/Auth: Supabase Free
- Custom domain: optional and normally paid

## Setup
1. Create a Supabase account/project.
2. Open Supabase SQL Editor and run `supabase_schema.sql`.
3. In Supabase Authentication, create your admin user.
4. Copy `config.example.js` to `config.js`.
5. Put your Supabase Project URL and ANON/PUBLISHABLE key in `config.js`.
6. Upload the entire folder to GitHub Pages.
7. Visit `/admin.html` and sign in with the admin user.

## Security
Never put a Supabase service_role/secret key in `config.js` or any browser file. Use only the anon/publishable key.
For a production deployment, restrict admin users to trusted accounts and review the database RLS policies before collecting significant personal data.

## Current state
Without Supabase configuration, the public site uses demonstration content and the membership form does not persist applications. Once connected, the public site reads CMS content and membership applications are stored in Supabase.

The supplied AH-LDI and Civil Guards logo files are already included in `assets/`.
