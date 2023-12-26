# Kir-Dev blog v3

A new version of our organization's blog: [Kir-Dev](https://kir-dev.hu/). Previous version v1 was built with [Jekyll](https://jekyllrb.com/) and v2 was built with [Gatsby](https://www.gatsbyjs.com/). This version is built with [Next.js](https://nextjs.org/) and [Sanity](https://www.sanity.io/).

Generated from this [starter](https://www.sanity.io/templates/nextjs-sanity-clean).

## Table of Contents

- [Kir-Dev blog v3](#kir-dev-blog-v3)
  - [Table of Contents](#table-of-contents)
  - [Configuration](#configuration)
    - [Step 1. Set up the environment](#step-1-set-up-the-environment)
    - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
    - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Next steps](#next-steps)
  - [Sponsors](#sponsors)

## Configuration

### Step 1. Set up the environment

Before you start development, make sure you have

- [Node.js](https://nodejs.org/en/) v20 installed (I recommend using NVM - on Windows too).
  - After installing run `corepack enable` to use Yarn v4.
- been added to our Vercel project as a collaborator.
- been added to our Sanity project as a collaborator.
- [Sanity Studio](https://www.sanity.io/docs/getting-started-with-sanity-cli) installed globally (`npm install --global sanity@latest`).

### Step 2. Set up the project locally

Clone this repo to your work directory.

```bash
git clone https://github.com/kir-dev/blog-next-sanity.git
```

Open the repo in VSCode and open up a terminal in it, run this to link your clone to Vercel (make sure we've already added you as a collaborator to the project on [Vercel](https://vercel.com/kir-dev)):

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

This will create a git-ignored `.env` file with environment variables that will be used for local development.

### Step 3. Run Next.js locally in development mode

```bash
yarn install && yarn dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

## Next steps

- [Setup live preview](./docs/studio-preview.md)
- [Join our Slack community to ask questions and get help][sanity-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

## Sponsors

<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10%;">
  <div style="flex: 1.4;">
    <a href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss">
      <img src="public/images/svg/powered-by-vercel.svg" width="300" />
    </a>
  </div>
  <div style="flex: 1;">
    <a href="https://rackhost.hu?utm_source=kir-dev">
      <img src="public/images/rackhost.png" width="300" />
    </a>
  </div>
  <div style="flex: 1;">
    <a href="https://betteruptime.com?utm_source=kir-dev">
      <img src="https://betteruptime.com/assets/static_assets/badges/light.png" width="300" />
    </a>
  </div>
</div>

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean&repository-name=nextjs-sanity-clean&project-name=nextjs-sanity-clean&demo-title=Clean+Sanity+%2B+Next.js+app&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F835514%2F212771865-7a603a28-0416-45e8-84d3-2aafe02b0c7f.png&demo-description=A+clean+example+of+Next.js+with+embedded+Sanity+ready+for+recomposition.&demo-url=https%3A%2F%2Ftemplate-nextjs-clean.sanity.build&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dnextjs-sanity-clean
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel-isr]: https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[app-dir]: https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory
