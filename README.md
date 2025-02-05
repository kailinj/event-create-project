# EventCreate project

<details>
<summary>Exercise overview</summary>

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
</details>

## How to run this project

- Clone repo locally
- Copy `.env` file to repo root directory
- Run `yarn install`
- Run `yarn dev`
- Open `localhost:3000` in your browser
- To run tests, run `yarn test`

## Design decisions

### Libraries used

#### Framework

- [**Next.js**](https://nextjs.org/): Used as a quick and easy way to spin up a React app with a connected BE.

#### Database

- [**Prisma**](https://www.prisma.io/): Used to simplify database interactions, migrations, and ensure a type-safe API.
- [**@neondatabase/serverless**](https://neon.tech/): I deployed this project to [Vercel](https://nextjs.org/docs/app/building-your-application/deploying#managed-nextjs-with-vercel), which allowed me to easily connect it to Neon, a serverless Postgres platform.

#### Forms & Validation

- [**React Hook Form**](https://react-hook-form.com/): Used to easily define a form, keep track of state, perform field and/or form-based validation and handle form submission.
- [**Zod**](https://zod.dev/): I used this along with React Hook Form to establish a schema for form validation.

#### Styling & UI Components

- [**shadcn/ui**](https://ui.shadcn.com/): I used various components from shadcn/ui, which is a set of reusable components based on TailwindCSS and [Radix UI](https://www.radix-ui.com/). The nice thing about shadcn/ui over TailwindCSS is it can auto-generate shared/reusable UI components for you that have Tailwind as the basis, but can be customized however you want. This also allows you to avoid some of the clutter that comes along with using Tailwind.
- [**Lucide React**](https://lucide.dev/): Used by shadcn/ui for icons.
- [**Recharts**](https://recharts.org/en-US/): Used by shadcn/ui for charts & visualizations. Based on D3.js.

#### State Management & Data Handling

- [**@tanstack/react-query**](https://tanstack.com/query/latest/): Used to fetch, cache, and manage server state efficiently. Probably wasn't totally necessary to use on top of Next.js, but is from the same ecosystem as React Table, which was a big part of this project.
- [**@tanstack/react-table**](https://tanstack.com/table/latest/): Used to display data in an interactive table with features like sorting, pagination, etc.

#### Testing

- [**@playwright**](https://playwright.dev/): Used to build a sample set of tests.
- [**@faker-js/faker**](https://fakerjs.dev/): Used along with playwright to generate mock data for testing.

### Items of note & takeaways
- I wasn't sure if the custom field was supposed to be a single string or a key-value pair, but figured that the latter would be more useful.
- The "age" chart isn't a very realistic use case, but I figured displaying multiple charts using the proposed data structure was better than introducing additional properties merely for the benefit of a nice-looking chart. 
- Some other charts that I considered were:
    - Users created over time
    - Number of users per age
- Using Next.js may not have been the best choice for this project, as the directory structure & naming conventions don't necessarily align with how I like to organize React-only FE apps, but hopefully it isn't too difficult to navigate.
- I created some basic Playwright tests, but given more time I would have been more intentional in what functionality I was testing and how I was selecting items in the UI
  - Ideally, I would use an attribute that is unlikely to change, even if the copy does (something like `[data-test-id]`)
  - The "Can add users & see them in table" test should be updated to check across all pages for the new user

### Other features that I'd like to implement
- Search & filter within the table
- Delete functionality per user (this would include either an "Are you sure?" dialog or would give the user the option to "Undo" on the success toast)
- Allowing users to add as many custom fields as they'd like
- Once 1+ custom fields has been defined, allow users to select from existing keys or define a new one when adding a custom field
- Select multiple users to perform actions on (delete, set field value)
- Better loading animations
- Editing rows within the table instead of needing to open the dialog

----

<details>
<summary>Auto-generated documentation</summary>

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

</details>