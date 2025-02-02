# EventCreate project

## Developer Exercise

Build a responsive single-page application (SPA) using React that allows a user to submit and edit existing data in a table interface.

### The application should:

- Allow the user to submit a form with the following fields: Name, Email, and Age
- Allow users to add/remove a custom field dynamically to the form
- Validate inputs (eg, Email format, Age as a positive number)

### After submitting the form, the user should be able to:

- View the data of their submissions in a table
- Edit previously submitted data
- Visualize their data as a chart (e.g., Bar or Pie Chart) to visualize the data (use a library like Chart.js or D3.js) that updates when new information is submitted.

### Notes

- The application should be optimized for fast loading and handle up to large data entries without noticeable lag.
- Building a backend is not necessary but exercise should showcase how data is handled and loaded client side on the application.
- Buidling for all test cases and scenarios is not necessary but code should showcase your knowledge and experience with testing front end code.

### Deliverables

- Submit a GitHub repository link containing your code with a README on how to run the project.
- Feel free to add any additional information about your design decisions here.

## Design decisions

### Libraries used

- Next.js to quickly scaffold a React-based FE using TypeScript as well as a BE in a single repo
- shadcn/ui to utilize TailwindCSS styling without the clutter of className overload in each component
- React hook form for form building, validation, and submit handling
- Zod to support RHF validation via schema defining

## Auto-generated documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
