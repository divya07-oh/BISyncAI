git add package.json package-lock.json next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs .gitignore .eslintrc.json eslint.config.mjs
git commit -m "chore: initial project setup and dependencies"

git add src/app/globals.css src/lib/utils.ts src/app/layout.tsx src/app/page.tsx src/app/login/page.tsx
git commit -m "feat: core layouts, global styles, and landing page"

git add src/components
git commit -m "feat: add reusable components like Command Palette"

git add src/app/dashboard/layout.tsx src/app/dashboard/page.tsx
git commit -m "feat: dashboard core structure and overview page"

git add src/app/dashboard/chat/page.tsx
git commit -m "feat: interactive AI chat with voice and vision mockups"

git add src/app/dashboard/compliance/page.tsx src/app/dashboard/tender/page.tsx
git commit -m "feat: compliance wizard and tender analysis screens"

git add src/app/dashboard/standards src/app/dashboard/standards-lib
git commit -m "feat: saved standards library and search features"

git add src/app/dashboard/reports src/app/dashboard/settings
git commit -m "feat: reports and settings pages"

git add .
git commit -m "chore: finalize remaining files and polish"

git branch -M main
git remote add origin https://github.com/divya07-oh/BISyncAI.git
git push -u origin main
