# Vote Kori – Democracy Frontend

A modern, multilingual frontend for **Vote Kori**, a project that helps people in Bangladesh learn about democracy, take a short quiz, and earn a shareable certificate so they can vote more confidently.

This app is the **public-facing user experience** of the Vote Kori ecosystem, built with Next.js (App Router), TypeScript, Tailwind CSS, and `next-intl` for internationalization.

## Overview

The frontend lets visitors:

- Read about why voting and democracy matter in the Bangladeshi context.
- Take a quiz on core democratic concepts.
- See detailed results and explanations.
- Generate a personalized certificate for passing scores (powered by the API server).
- Access quick tools and resources related to elections and civic participation.

It is designed to be:

- **Bilingual**: Bangla (`bn`) and English (`en`).
- **Mobile-first**: Responsive from small devices up to large screens.
- **Accessible & fast**: Semantic markup, keyboard-friendly, and optimized for a low-friction experience.

## Features

- **Localized UI (Bangla & English)** via `next-intl` and locale-aware routing under `src/app/[locale]`.
- **Quiz flow**: Question fetching, answer submission, result display, and certificate eligibility.
- **Certificate integration**: Links to backend-generated certificate PDFs hosted via Supabase.
- **SEO friendly**: Rich `Metadata` and `Viewport` configuration, Open Graph and Twitter cards.
- **Clean, playful UI**: Tailwind CSS v4-based design with consistent typography and spacing.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS v4
- **Internationalization**: `next-intl` with localized message bundles
- **API integration**: REST calls to the `democracy-server` backend

## Architecture

Key pieces of the frontend:

- `src/app/[locale]/layout.tsx` – Root layout per locale, fonts, metadata, and global shell (`Navbar`, `Footer`).
- `src/app/[locale]/page.tsx` – Landing page with hero section and entry into the quiz.
- `src/app/[locale]/quiz/take/page.tsx` – Quiz-taking experience.
- `src/app/[locale]/quiz/results/[id]/page.tsx` – Detailed result view for an individual attempt.
- `src/lib/api.ts` – Typed API client using `fetch` with `NEXT_PUBLIC_API_URL` as the base.
- `messages/*.json` – Translation files for each locale (e.g. `en.json`, `bn.json`).

Internationalization is driven by `src/i18n/routing.ts`, which defines supported locales and default locale, and wires into Next.js navigation helpers.

Certificates are not generated in the browser; instead, the frontend links to a backend endpoint that streams or redirects to a generated PDF.

## Project Structure (frontend)

High-level structure:

```text
democracy-client/
  src/
    app/
      [locale]/
        layout.tsx
        page.tsx
        about/
        quiz/
        quizzes/
        quick-tools/
    i18n/
      routing.ts
    lib/
      api.ts
  messages/
    en.json
    bn.json
  public/
    favicon.svg
    navbar/
      *.svg
```

## How I built it

- **Next.js App Router first**: I chose the App Router for a clean separation of routes and layouts per locale (`[locale]` segment), which made it natural to plug in `next-intl`.
- **Internationalization upfront**: I wired `next-intl` and the `routing` helper early so that URL structure stayed simple (`/quiz/take` instead of `/bn/quiz/take`) while still supporting localized content.
- **Typed API layer**: All quiz and result data is fetched through a small typed wrapper in `src/lib/api.ts`, which keeps the rest of the app from worrying about base URLs or raw `fetch` options.
- **Component-driven design**: Reusable layout components like `Navbar`, `Footer`, and hero buttons make it easy to maintain a consistent look and feel across pages.

## Challenges & how I overcame them

- **Internationalized routing with App Router + `next-intl`**  
  Getting routing, locale detection, and `NextIntlClientProvider` working together was tricky. I resolved this by centralizing locale configuration in `routing.ts` and ensuring all layouts/pages under `[locale]` used that contract.

- **Balancing Bangla & English typography**  
  Bangla script has different visual needs than Latin. I used separate font families (e.g. `Noto_Sans_Bengali` for Bangla and `Fredoka` for English) and wired them via `next/font` to keep text legible and visually coherent.

- **Coordinating quiz flows with the backend**  
  Handling failures (network, validation, backend errors) while keeping the UX smooth required careful API error handling in `src/lib/api.ts` and clear messaging in the UI. I added user-friendly error states instead of surfacing raw errors.

- **Certificate generation and hosting**  
  Generating PDFs on the server and serving them via Supabase meant the frontend needed to trust a redirect-based flow. I solved this by exposing a `getCertificateUrl` helper in `src/lib/api.ts` and treating the certificate as an external resource.

- **Keeping the UI responsive and lightweight**  
  With Tailwind CSS v4 and careful layout choices, I made sure the quiz and result pages work well on low-end devices and small screens, prioritizing clarity over heavy visuals.
