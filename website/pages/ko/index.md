## Changesets란?

<p align="center">
  <img src="https://github.com/changesets/changesets/raw/main/assets/images/changesets-banner-light.png" />
</p>

<p align="center">
  다중 패키지 저장소에 초점을 맞춘 <br/>
  버전 관리 및 변경 로그 관리 도구
</p>
<br/>

[![npm package](https://img.shields.io/npm/v/@changesets/cli?label=%40changesets%2Fcli)](https://npmjs.com/package/@changesets/cli)
[![View changelog](https://img.shields.io/badge/Explore%20Changelog-brightgreen)](https://github.com/changesets/changesets/blob/main/packages/cli/CHANGELOG.md)

`changesets` 워크플로는 변경 작업부터 배포까지의 과정을 간소화하는 데 목적이 있습니다. 기여자는 자신의 변경 사항이 어떻게 릴리스되어야 하는지 선언하고, 이후 Changesets가 이를 기반으로 패키지 버전, 변경 로그 업데이트, 새 버전 배포를 자동으로 수행합니다.

특히 다중 패키지 저장소(multi-package repository)에서 패키지 간 의존성을 자동으로 관리하고, 그룹으로 묶인 패키지를 쉽게 업데이트할 수 있도록 설계되었습니다.

## 어떻게 동작하나요?

`changeset`은 특정 [semver 버전 유형](https://semver.org/)과 변경 요약 정보를 포함하여 릴리스 의도를 나타냅니다.

**@changesets/cli** 패키지를 사용하면 변경 사항을 만들면서 `changeset` 파일을 작성할 수 있습니다. 이후 여러 changeset을 조합해 하나의 릴리스를 만들고, 의존 패키지 버전 업데이트, changelog 작성, 모든 패키지 릴리스를 한 번의 명령어로 수행할 수 있습니다.

## 어떻게 시작하나요?

바로 사용을 시작하고 싶다면 [Intro to using changesets](/intro-to-using-changesets.md)와 [@changesets/cli](https://github.com/changesets/changesets/blob/main/packages/cli/README.md) 문서를 참고하세요.

Changesets의 개념을 더 자세히 이해하거나 커스터마이징 방법을 알고 싶다면 [detailed-explanation](/detailed-explanation)을 확인하세요.

추가로 [dictionary](/dictionary) 문서도 준비되어 있습니다.

## CI 연동

Changesets는 수동으로도 사용 가능하지만, CI와 연동하는 것을 권장합니다.

PR에 changeset이 포함되어 있는지 확인하려면 [changeset bot](https://github.com/apps/changeset-bot)을 사용하거나, CI에서 아래 명령어를 실행하여 빌드를 실패시키는 방법도 있습니다.

```sh
npm run changeset status
```

배포 자동화를 원한다면 [Changesets GitHub Action](https://github.com/changesets/action)을 사용해 버전 PR 생성 및 패키지 배포를 자동화할 수 있습니다.

## Changesets를 사용 중인 대표 프로젝트

* [atlaskit](https://atlaskit.atlassian.com/)
* [emotion](https://emotion.sh/docs/introduction)
* [keystone](https://v5.keystonejs.com/)
* [react-select](https://react-select.com/home)
* [XState](https://xstate.js.org/)
* [pnpm](https://pnpm.io/)
* [filbert-js](https://github.com/kuldeepkeshwar/filbert-js)
* [tinyhttp](https://github.com/talentlessguy/tinyhttp)
* [Firebase Javascript SDK](https://github.com/firebase/firebase-js-sdk)
* [Formik](https://github.com/formium/formik)
* [MobX](https://github.com/mobxjs/mobx)
* [Nhost](https://github.com/nhost/nhost)
* [verdaccio](https://verdaccio.org/)
* [Chakra UI](https://chakra-ui.com/)
* [Astro](https://astro.build)
* [SvelteKit](https://kit.svelte.dev/)
* [Hydrogen](https://hydrogen.shopify.dev)
* [react-pdf](https://github.com/diegomura/react-pdf)
* [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)
* [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
* [GraphQL-Mesh](https://github.com/Urigo/graphql-mesh)
* [GraphiQL](https://github.com/graphql/graphiql)
* [wagmi](https://github.com/wagmi-dev/wagmi)
* [refine](https://github.com/pankod/refine)
* [Modern Web](https://modern-web.dev)
* [Atomizer](https://github.com/acss-io/atomizer)
* [Medusa](https://github.com/medusajs/medusa)
* [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
* [Block Protocol](https://github.com/blockprotocol/blockprotocol)
* [Remix](https://remix.run/)
* [Clerk](https://github.com/clerk/javascript)
* [Hey API](https://github.com/hey-api/openapi-ts)
* [neverthrow](https://github.com/supermacro/neverthrow)

# 감사의 말 / 영감

* [bolt](https://github.com/boltpkg/bolt): 모노레포 내 패키지 연결 및 초기 구조를 제공
* [Atlassian](https://www.atlassian.com/): Changesets 코드의 초기 스폰서이자 아이디어 제공자, 초기 구현은 [atlaskit](https://atlaskit.atlassian.com) 팀에서 수행
* [lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release): 다중 패키지 저장소에서의 업데이트 패턴 초안 제공
* [Thinkmill](https://www.thinkmill.com.au): 프로젝트 오픈소스화 및 2차 리팩토링 지원
