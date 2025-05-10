# 변경 로그 형식 수정하기

Changesets는 패키지의 변경 로그에 대해 기본적인 형식을 제공합니다. 이 형식은 표시 정보가 비교적 단순하지만, 원하는 경우 사용자 정의가 가능합니다. 이 문서에서는 변경 로그에 추가 메타 정보를 포함하도록 수정하는 방법을 설명합니다.

## 사용할 포맷팅 함수 설정하기

변경 로그 생성 방식을 바꾸려면 `./changeset/config.json` 파일의 `changelog` 설정을 사용합니다. 이 설정은 모듈 경로를 문자열로 입력받습니다. 설치한 npm 패키지 또는 직접 작성한 로컬 파일을 지정할 수 있습니다.

예를 들어, Changesets에서 제공하는 `@changesets/changelog-git` 패키지를 사용하려면 다음과 같이 설치합니다.

```sh
npm install @changesets/changelog-git
```

그 다음 `.changeset/config.json` 파일을 아래와 같이 수정합니다.

```
"changelog": "@changesets/changelog-git"
```

직접 포맷팅 함수를 작성할 경우, 예를 들어 `.changeset/my-changelog-config.js` 파일을 만들고 다음과 같이 설정할 수 있습니다.

```
"changelog": "./my-changelog-config.js"
```

## 변경 로그 포맷팅 함수 작성하기

변경 로그 포맷팅은 `getReleaseLine`, `getDependencyReleaseLine` 두 함수로 구성됩니다. 이 함수들은 객체 형태로 export 되어야 합니다. 예시:

```js
async function getReleaseLine() {}

async function getDependencyReleaseLine() {}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
```

이 함수들은 `changeset version` 실행 시 호출되며, 문자열 또는 문자열을 반환하는 Promise를 리턴해야 합니다.

TypeScript로 작성할 경우 `@changesets/types` 패키지를 설치 후 사용할 수 있습니다.

```ts
import { ChangelogFunctions } from "@changesets/types";

async function getReleaseLine() {}

async function getDependencyReleaseLine() {}

const defaultChangelogFunctions: ChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};

export default defaultChangelogFunctions;
```

`getReleaseLine` 타입 예시:

```ts
type getReleaseLine(
    changeset: {
        summary: string,           // changeset markdown 파일의 요약 문자열
        releases,                  // 릴리스할 패키지 배열 (각 항목: name, type(major/minor/patch))
        commit                     // changeset을 도입한 커밋 해시
    },
    type,                         // major/minor/patch 중 하나
    changelogOpts                 // 추가 옵션 (@changesets/changelog-github 코드 참고)
) => string
```

> **참고:** 가이드가 아직 완전히 작성되지 않았습니다. 자세한 예시는 `@changesets/changelog-github`의 코드를 참고하시기 바랍니다.

## 변경 로그 함수에 옵션 추가하기

> **작성 예정**
> (추후 업데이트 예정입니다.)
