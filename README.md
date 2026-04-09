<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h2eHd6bnkxYWtyNmswYW0wZWJ3MTcwNmVndjFwbXkxdnU3eTN0ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L5oPJU4I5kKzUaO1xX/giphy.gif" width="100%" alt="PNT Academy Banner">

  # PNT Academy Web Platform 🚀

  **The official digital platform powering India's next generation of Robotics, AI, and IoT education.**

  [Live Website](https://www.pntacademy.com) • [Trainings For Colleges](https://www.pntacademy.com/trainings/colleges) • [Contact Support](mailto:info@pntacademy.com)
</div>

---

## 🔬 About The Project

This is the central web infrastructure for **PNT Academy**. It is specifically architected to deliver a highly interactive, 3D WebGL-powered experience that matches the premium quality of the industrial robotics components we teach.

The platform manages:
- **Interactive 3D Robotics Labs:** Real-time WebGL rendering showcasing industrial AGVs, AMR systems, and drone physics.
- **Educational Pathways:** Streamlined routing for School Bootcamps, Junior Innovators, and College-level Industrial Certifications.
- **Dynamic PNT OS:** A fully simulated web-based OS capable of integrating external IDEs, Tinkercad environments, and interactive learning tools directly in the browser.

---

## 🛠️ Technology Stack

We believe in using the same cutting-edge tools in our digital products that we teach in our engineering labs.

*   **Framework:** [Next.js (App Router)](https://nextjs.org/)
*   **UI / Styling:** [Tailwind CSS](https://tailwindcss.com/) + custom Glassmorphism tokens
*   **3D Ecosystem:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (R3F)
*   **Database:** MongoDB & Firebase
*   **Performance Tracking:** [Sentry](https://sentry.io/)
*   **Automation Testing:** [Playwright](https://playwright.dev/)

---

## 🚀 Running Locally

If you are an authorized developer for PNT Academy, follow these steps to spin up the local 3D dev environment.

### Prerequisites
- Node.js (v18+)
- `npm`, `yarn`, or `pnpm`
- Access to the `.env.local` keys (Contact the PNT Academy Admin for the master environment file).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pntacademy/PNT-Academy-Website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd PNT-Academy-Website/pnt-academy-web
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The 3D canvases may take a moment to initialize on the first load.

---

## 🧪 Testing Protocol
Automated end-to-end tests monitor the critical rendering paths of our 3D components and UI routing.

To run the Playwright test suite:
```bash
npx playwright install # Run once to fetch browser binaries
npm run test:e2e
```

---

<br>
<div align="center">
  <i>"Building the future, one robot at a time."</i><br>
  <b>© 2026 PNT Academy. All Rights Reserved.</b>
</div>
