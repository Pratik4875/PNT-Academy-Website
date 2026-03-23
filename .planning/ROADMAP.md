# Roadmap — Payment Page Redesign

## Milestone 1.0: Payment Page Redesign

### Phase 1: Server Component + Layout Integration
**Goal:** Rewrite `page.tsx` to use Navbar, Footer, `getAdminSettings()`, and read URL search params.

**Files:**
- `src/app/payments/page.tsx` — Rewrite server component

**Deliverables:**
- Page renders with Navbar + Footer
- Reads `searchParams` for `amount`, `course`, `name`
- Fetches payment details via `getAdminSettings()`
- Passes all data to client component

---

### Phase 2: Client Component — Full Redesign
**Goal:** Complete rewrite of `PaymentDetailsClient.tsx` with premium glassmorphism design.

**Files:**
- `src/app/payments/PaymentDetailsClient.tsx` — Full rewrite

**Sections to implement:**
1. **Hero Section**: Sparkle badge + animated gradient text + amount/course display
2. **Process Flow**: 3-step animated cards (Contact → Plan → Pay)
3. **Payment Methods**: 
   - UPI QR Card (dynamic amount QR, UPI ID copy, UPI app buttons)
   - Bank Transfer Card (all fields with copy buttons)
4. **"I've Paid" Section**: UTR input + WhatsApp confirmation button
5. **Trust Section**: SSL encrypted badge
6. **Help CTA**: Gradient banner → Contact page

**Design tokens:**
- Same animations as `ContactClient.tsx` (fadeUp, staggerContainer, AnimatedSection, cardHover)
- Same glassmorphism classes
- Same gradient orb decorations

---

### Phase 3: Verification & Polish
**Goal:** Browser-test all features across dark/light mode, mobile/desktop, and all interactive elements.

**Tests:**
- [ ] Navigate to `/payments` — Navbar active, Footer visible
- [ ] Navigate to `/payments?amount=5000&course=Robotics+Basic&name=Rahul` — hero shows details
- [ ] QR code encodes correct UPI URL with amount
- [ ] UPI intent buttons generate correct deep links
- [ ] "I've Paid" → enter UTR → WhatsApp opens with correct message
- [ ] All copy buttons work
- [ ] Dark mode toggle — everything readable
- [ ] Mobile 375px — single column, app buttons prominent
- [ ] Desktop 1440px — two-column payment cards

---

## Phase Summary

| Phase | Description | Files | Depends On |
|-------|-------------|-------|------------|
| 1 | Server Component + Layout | `page.tsx` | — |
| 2 | Client Component Redesign | `PaymentDetailsClient.tsx` | Phase 1 |
| 3 | Verification & Polish | — | Phase 2 |
