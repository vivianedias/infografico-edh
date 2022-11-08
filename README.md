<h1 align="center">Infográfico EDH 📈🌎</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/vivianedias/infografico-edh#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vivianedias/infografico-edh/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/vivianedias/infografico-edh/blob/master/LICENSE" target="_blank">
    <img alt="License: Apache" src="https://img.shields.io/github/license/vivianedias/infografico-edh" />
  </a>
</p>

![Continuous Integration](https://github.com/vivianedias/infografico-edh/actions/workflows/integration.yml/badge.svg)

> Infográfico interativo com informações atuais sobre educação em direitos humanos no Brasil.

### 🏠 [Homepage](https://infografico-edh.vercel.app/)

## Install

```sh
yarn install
```

## Usage

```sh
yarn run dev
```

## Run tests

```sh
yarn test
```

## Chosen tools

- NextJS v13
- Typescript v4
- [SWR](https://swr.vercel.app/) to handle data fetching
- [ChakraUI](https://chakra-ui.com/) to help building UI components
- Git hooks support using [Lint Staged](https://github.com/okonet/lint-staged) and [Husky](https://github.com/typicode/husky)
- Testing setup using [Jest](https://jestjs.io/pt-BR/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Internacionalization setup using [next-i18next](https://github.com/i18next/next-i18next)
- Continuous integration using Github Actions workflow that runs at every Pull Request
  - Has support for SonarCloud scan, just add your `SONAR_TOKEN` to Github Secrets

## Author

👤 **medusa.lab**

- Website: https://www.medusalab.tech
- Github: [@vivianedias](https://github.com/vivianedias) & [@camilacrdoso](https://github.com/camilacrdoso)

## 📝 License

Copyright © 2022 [medusa.lab](https://github.com/vivianedias).<br />
This project is [Apache License](https://github.com/vivianedias/infografico-edh/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
