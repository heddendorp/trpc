# tRPC Angular Packages

This repository contains two Angular packages for tRPC:

- `@heddendorp/angular-http-client` - Angular HttpClient link for tRPC client
- `@heddendorp/tanstack-angular-query` - TanStack Angular Query Integration for tRPC

## Overview

These packages have been extracted from the main tRPC repository and simplified for easier maintenance and publishing to the `@heddendorp` npm scope.

## Packages

### @heddendorp/angular-http-client

An Angular HttpClient link for tRPC client that allows you to use Angular's HttpClient with tRPC.

- **Location**: `packages/angular-http-client`
- **Main Purpose**: Provides HTTP transport for tRPC client using Angular's HttpClient
- **Peer Dependencies**:
  - `@angular/common >=16.0.0`
  - `@angular/core >=16.0.0`
  - `@trpc/client 11.4.3`
  - `@trpc/server 11.4.3`
  - `rxjs >=7.0.0`

### @heddendorp/tanstack-angular-query

TanStack Angular Query Integration for tRPC that provides reactive query capabilities for Angular applications.

- **Location**: `packages/tanstack-angular-query`
- **Main Purpose**: Integrates tRPC with TanStack Angular Query for reactive data fetching
- **Peer Dependencies**:
  - `@angular/core >=16.0.0`
  - `@tanstack/angular-query-experimental >=5.80.3`
  - `@trpc/client 11.4.3`
  - `@trpc/server 11.4.3`

## Development

### Prerequisites

- Node.js 18+
- pnpm 9.12.2+

### Installation

```bash
pnpm install
```

### Building

```bash
pnpm build
```

### Running Tests

```bash
pnpm test
```

### Publishing

```bash
pnpm publish
```

## Context7 Integration

This project is configured to work with Context7, an AI documentation tool. The `context7.json` file defines how AI coding assistants should interpret and use this project's documentation.

### Using with Context7

When working with AI coding assistants that support Context7, you can reference this project by:

1. **Using the library name**: Mention "tRPC Angular packages" or "heddendorp angular trpc" in your prompts
2. **Using the direct library ID**: Use `/heddendorp/trpc` if available in the Context7 registry
3. **Adding "use context7"** to your prompts to get up-to-date documentation

### Examples

```
Create an Angular service that uses tRPC with HttpClient. use context7
```

```
Set up TanStack Angular Query with tRPC in an Angular 16+ app. use context7
```

## GitHub Actions

The repository includes a simplified CI/CD pipeline:

- **CI**: Runs on push to main/next branches and PRs
- **Publishing**: Automatically publishes packages to npm when changes are pushed to main

## Architecture

The repository is structured as a monorepo with:

- **Root**: Contains shared configuration and scripts
- **packages/**: Contains the two Angular packages
- **Build System**: Uses `tsdown` for building TypeScript packages
- **Package Manager**: Uses `pnpm` with workspaces
- **Publishing**: Uses `lerna` for coordinated publishing

## Simplified from Original

This repository has been significantly simplified from the original tRPC repository:

- Removed all non-Angular packages
- Removed complex build tooling (turbo, extensive testing setup)
- Removed documentation website and examples
- Simplified GitHub Actions
- Removed unnecessary configuration files
- Changed package scope from `@trpc` to `@heddendorp`

## License

MIT

- 🐻&nbsp; Easy to add to your existing brownfield project.
- 🔋&nbsp; Batteries included - React.js/Next.js/Express.js/Fastify adapters. _(But tRPC is not tied to React, and there are many [community adapters](https://trpc.io/docs/awesome-trpc#-extensions--community-add-ons) for other libraries)_
- 🥃&nbsp; Subscriptions support.
- ⚡️&nbsp; Request batching - requests made at the same time can be automatically combined into one
- 👀&nbsp; Quite a few examples in the [./examples](./examples)-folder

## Quickstart

There are a few [examples](https://trpc.io/docs/example-apps) that you can use for playing out with tRPC or bootstrapping your new project. For example, if you want a Next.js app, you can use the full-stack Next.js example:

**Quick start with a full-stack Next.js example:**

```sh
# yarn
yarn create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter

# npm
npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter

# pnpm
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter

# bun
bunx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter

# deno
deno init --npm next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
```

**👉 See full documentation on [tRPC.io](https://trpc.io/docs). 👈**

## Star History

<a href="https://star-history.com/#trpc/trpc"><img src="https://api.star-history.com/svg?repos=trpc/trpc&type=Date" alt="Star History Chart" width="600" /></a>

## Core Team

> Do you want to contribute? First, read the <a href="https://github.com/trpc/trpc/blob/main/CONTRIBUTING.md">Contributing Guidelines</a> before opening an issue or PR so you understand the branching strategy and local development environment. If you need any more guidance or want to ask more questions, feel free to write to us on <a href="https://trpc.io/discord">Discord</a>!

### Project leads

> The people who lead the API-design decisions and have the most active role in the development

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://twitter.com/alexdotjs"><img src="https://avatars.githubusercontent.com/u/459267?v=4?s=100" width="100px;" alt=""/><br />Alex / KATT</a></td>
      <td align="center"><a href="http://www.jumr.dev"><img src="https://avatars.githubusercontent.com/u/51714798?v=4&s=100" width="100px;" alt=""/><br />Julius Marminge</a></td>
      <td align="center"><a href="https://github.com/Nick-Lucas"><img src="https://avatars.githubusercontent.com/u/8896153?v=4&s=100" width="100px;" alt=""/><br />Nick Lucas</a></td>
    </tr>
  </tbody>
</table>

### Active contributors

> People who actively help out improving the codebase by making PRs and reviewing code

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/hmatthieu"><img src="https://github.com/hmatthieu.png?v=4&s=100" width="100px;" alt=""/><br />Hubert Mathieu</a></td>
    </tr>
  </tbody>
</table>

### Special shout-outs

> Individuals who have made exceptional contributions to tRPC through code, documentation, community building, and other valuable efforts

<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://t3.gg"><img src="https://avatars.githubusercontent.com/u/6751787?v=4?s=100" width="100px;" alt=""/><br />Theo Browne</a></td>
      <td align="center"><a href="https://twitter.com/s4chinraja"><img src="https://avatars.githubusercontent.com/u/58836760?v=4?s=100" width="100px;" alt=""/><br />Sachin Raja</a></td>
    </tr>
  </tbody>
</table>

## Sponsors

If you enjoy working with tRPC and want to support us, consider giving a token appreciation by [GitHub Sponsors](https://trpc.io/sponsor)!

<!-- SPONSORS:LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

### 🥇 Gold Sponsors

<table>
  <tr>
   <td align="center"><a href="https://retool.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/33817679?v=4&s=180" width="180" alt="Retool"/><br />Retool</a></td>
   <td align="center"><a href="https://graphite.dev/?utm_source=github&utm_medium=repo&utm_campaign=neovim"><img src="https://github.com/withgraphite.png?s=180" width="180" alt="Graphite"/><br />Graphite</a></td>
   <td align="center"><a href="https://mobb.ai"><img src="https://github.com/mobb-dev.png?s=180" width="180" alt="Mobb"/><br />Mobb</a></td>
  </tr>
</table>

### 🥈 Silver Sponsors

<table>
  <tr>
   <td align="center"><a href="https://cal.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/79145102?v=4&s=150" width="150" alt="Cal.com,%20Inc."/><br />Cal.com, Inc.</a></td>
   <td align="center"><a href="https://greptile.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/140149887?v=4&s=150" width="150" alt="Greptile"/><br />Greptile</a></td>
   <td align="center"><a href="https://www.coderabbit.ai/?utm_source=github&utm_medium=referral&ref=trpc&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/132028505?v=4&s=150" width="150" alt="CodeRabbit"/><br />CodeRabbit</a></td>
  </tr>
</table>

### 🥉 Bronze Sponsors

<table>
  <tr>
   <td align="center"><a href="https://github.com/hidrb"><img src="https://avatars.githubusercontent.com/u/77294655?v=4&s=120" width="120" alt="Dr.%20B"/><br />Dr. B</a></td>
   <td align="center"><a href="https://jonlu.ca/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/13029040?u=0c8fb3e7ae09935e8f2cb0637affeddfb98cc4c5&v=4&s=120" width="120" alt="JonLuca%20De%20Caro"/><br />JonLuca De Caro</a></td>
   <td align="center"><a href="https://github.com/ryanmagoon"><img src="https://avatars.githubusercontent.com/u/5327290?v=4&s=120" width="120" alt="Ryan%20Magoon"/><br />Ryan Magoon</a></td>
  </tr>
</table>

### 😻 Smaller Backers

<table>
  <tr>
   <td align="center"><a href="https://backyard.ai/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/95662801?v=4&s=100" width="100" alt="Ahoy%20Labs"/><br />Ahoy Labs</a></td>
   <td align="center"><a href="https://unkey.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/138932600?v=4&s=100" width="100" alt="Unkey"/><br />Unkey</a></td>
   <td align="center"><a href="http://ballingt.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/458879?u=4b045ac75d721b6ac2b42a74d7d37f61f0414031&v=4&s=100" width="100" alt="Tom%20Ballinger"/><br />Tom Ballinger</a></td>
   <td align="center"><a href="https://proxidize.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/70805857?v=4&s=100" width="100" alt="Proxidize"/><br />Proxidize</a></td>
   <td align="center"><a href="http://openq.dev/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/28826387?u=34c5f1594ad1ce83b111390b604ed5d26e389815&v=4&s=100" width="100" alt="rickk"/><br />rickk</a></td>
   <td align="center"><a href="http://www.jaronheard.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/7065695?u=127a7eca50605c12366363d6aba3da9e749aeff7&v=4&s=100" width="100" alt="Jaron%20Heard"/><br />Jaron Heard</a></td>
  </tr>
  <tr>
   <td align="center"><a href="http://brooke.me/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/8385528?u=c29453d38f4648b12289d236421e8965d19ba636&v=4&s=100" width="100" alt="Brooke%20Holmes"/><br />Brooke Holmes</a></td>
   <td align="center"><a href="https://maxgreenwald.me/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/2615374?u=4c1402dd1e4e8ff7514f2e300adfe9b75ae76e85&v=4&s=100" width="100" alt="Max%20Greenwald"/><br />Max Greenwald</a></td>
   <td align="center"><a href="https://github.com/dmaykov"><img src="https://avatars.githubusercontent.com/u/6147048?u=8ae662ac99e91917062164de0d9404002b99cf2e&v=4&s=100" width="100" alt="Dmitry%20Maykov"/><br />Dmitry Maykov</a></td>
   <td align="center"><a href="https://chrisbradley.dev/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/11767079?u=e64f67faffd350af19aa896ff89a0708829e9a2a&v=4&s=100" width="100" alt="Chris%20Bradley"/><br />Chris Bradley</a></td>
   <td align="center"><a href="https://liminity.se/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/179804668?v=4&s=100" width="100" alt="Liminity%20AB"/><br />Liminity AB</a></td>
   <td align="center"><a href="https://github.com/val-town"><img src="https://avatars.githubusercontent.com/u/114268765?v=4&s=100" width="100" alt="Val%20Town"/><br />Val Town</a></td>
  </tr>
  <tr>
   <td align="center"><a href="https://www.illarionvk.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/5012724?u=7cfa13652f7ac5fb3c56d880e3eb3fbe40c3ea34&v=4&s=100" width="100" alt="Illarion%20Koperski"/><br />Illarion Koperski</a></td>
   <td align="center"><a href="https://iamkhan.io/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/6490268?u=59a369dc23fca0ed9943e5f020ff27ca968704d9&v=4&s=100" width="100" alt="Kalle"/><br />Kalle</a></td>
   <td align="center"><a href="http://jwyce.gg/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/16946573?u=8a27004b3c768f029b2f49b7cf5d3b94c62a16a1&v=4&s=100" width="100" alt="Jared%20Wyce"/><br />Jared Wyce</a></td>
   <td align="center"><a href="https://www.fanvue.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/72873652?v=4&s=100" width="100" alt="fanvue"/><br />fanvue</a></td>
   <td align="center"><a href="https://github.com/AscentFactory"><img src="https://avatars.githubusercontent.com/u/33631274?v=4&s=100" width="100" alt="Ascent%20Factory"/><br />Ascent Factory</a></td>
   <td align="center"><a href="https://github.com/drwpwrs"><img src="https://avatars.githubusercontent.com/u/49917220?u=ceb7a6b68f6366882ac7bc599383382f48e41e94&v=4&s=100" width="100" alt="Drew%20Powers"/><br />Drew Powers</a></td>
  </tr>
  <tr>
   <td align="center"><a href="https://drizzle.team/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/108468352?v=4&s=100" width="100" alt="Drizzle%20Team"/><br />Drizzle Team</a></td>
   <td align="center"><a href="https://github.com/cerjs"><img src="https://avatars.githubusercontent.com/u/5610115?u=76c96d0001baca5587d3f833f126ac23e91ff488&v=4&s=100" width="100" alt="Leo%20Jace"/><br />Leo Jace</a></td>
   <td align="center"><a href="https://jonas-strassel.de/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/4662748?u=c8153c564cd341ccd0ccbbc695a2292587dc1679&v=4&s=100" width="100" alt="Jonas%20Strassel"/><br />Jonas Strassel</a></td>
   <td align="center"><a href="https://www.spencermckenney.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/15722950?u=e9b60ab93918fb2352b6357571cd67b9004d91e6&v=4&s=100" width="100" alt="Spencer%20McKenney"/><br />Spencer McKenney</a></td>
   <td align="center"><a href="https://www.stefan-wallin.se/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/457653?u=548c6e3482bd0c0d935d99b9c564fdbbe0d8da5d&v=4&s=100" width="100" alt="Stefan%20Wallin"/><br />Stefan Wallin</a></td>
   <td align="center"><a href="https://github.com/maiconcarraro"><img src="https://avatars.githubusercontent.com/u/13419087?u=34a2d709766786d981dc43186d9f4831699fbf1a&v=4&s=100" width="100" alt="Maicon%20Carraro"/><br />Maicon Carraro</a></td>
  </tr>
  <tr>
   <td align="center"><a href="https://github.com/infodusha"><img src="https://avatars.githubusercontent.com/u/5677047?u=d503fccc70c9a66524639691b62853994335af0b&v=4&s=100" width="100" alt="Andrei%20Karushev"/><br />Andrei Karushev</a></td>
   <td align="center"><a href="https://venue.ink/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/67328248?v=4&s=100" width="100" alt="Venue%20Ink"/><br />Venue Ink</a></td>
   <td align="center"><a href="https://github.com/BrianCurliss"><img src="https://avatars.githubusercontent.com/u/1222949?v=4&s=100" width="100" alt="Brian%20Curliss"/><br />Brian Curliss</a></td>
   <td align="center"><a href="https://bestkru.com/?ref=trpc&utm_source=github&utm_medium=referral&utm_campaign=trpc"><img src="https://avatars.githubusercontent.com/u/159320286?v=4&s=100" width="100" alt="BestKru"/><br />BestKru</a></td>
   <td align="center"><a href="https://github.com/balataca"><img src="https://avatars.githubusercontent.com/u/14273641?u=5c4aca9fe047360ae17627694be4e43ad1105f15&v=4&s=100" width="100" alt="Augusto%20Zanoni"/><br />Augusto Zanoni</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- SPONSORS:LIST:END -->

## All contributors ✨

<a href="https://github.com/trpc/trpc/graphs/contributors">
  <p align="center">
    <img width="720" src="https://contrib.rocks/image?repo=trpc/trpc" alt="A table of avatars from the project's contributors" />
  </p>
</a>

---

<a href="https://vercel.com/?utm_source=trpc&utm_campaign=oss">
  <p align="center">
    <img src="./www/static/img/powered-by-vercel.svg" alt="Powered by Vercel" title="Powered by Vercel">
  </p>
</a>
