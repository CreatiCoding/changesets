# Changesets 설정하기

Changesets는 최소한의 설정만 필요합니다. 대부분 기본 workflow를 수정하고 싶을 때 사용합니다. 설정은 `.changeset/config.json` 파일에 저장됩니다. 기본 설정 예시는 다음과 같습니다.

```json
{
  "commit": false,
  "updateInternalDependencies": "patch",
  "linked": [],
  "access": "restricted",
  "baseBranch": "master",
  "ignore": [],
  "changelog": "@changesets/cli/changelog"
}
```

> **참고:** `linked`, `fixed`, `updateInternalDependencies`, `bumpVersionsWithWorkspaceProtocolOnly`, `ignore` 옵션은 monorepo에서만 사용됩니다.

## `commit`

(`boolean`, `string`, `[string, any]` 튜플)

`changeset add`, `changeset version` 명령 실행 시 git으로 파일을 자동 커밋할지 여부와 커밋 메시지를 설정합니다.

* 기본값은 `false` (직접 커밋)
* `true`: 기본 커밋 메시지 생성기 사용
* `[파일 경로, 옵션]`: 커스텀 커밋 메시지 생성기 지정 가능

예시:

```json
{
  "commit": ["../scripts/commit.js", { "customOption": true }]
}
```

## `access`

(`restricted` | `public`)

패키지 배포 시 공개 여부 설정

* `restricted` (기본값): private 패키지 (로그인 필요)
* `public`: npm 공개 패키지

개별 패키지의 `package.json`에서 `access`를 덮어쓸 수 있으며, 배포 방지 시 `private: true` 설정을 권장합니다.

## `baseBranch`

(git 브랜치 이름)

Changesets가 변경 사항 비교 시 기준으로 삼는 브랜치

* 기본값: `master`
* 일반적으로 주로 merge하는 브랜치로 설정
* 명령어에서 `--since` 플래그로 오버라이드 가능

> **권장:** `master` 대신 `main` 브랜치 사용을 추천합니다.

## `ignore`

(패키지 이름 배열)

일부 패키지를 릴리스 대상에서 임시로 제외할 때 사용합니다. Changeset에 포함되어도 배포되지 않습니다.

> **주의:** 영구적인 배포 방지 용도라면 `package.json`에 `private: true`를 설정하세요.

제약:

1. 제외된 패키지가 포함된 changeset에 제외되지 않은 패키지가 함께 있으면 배포 실패
2. 제외된 패키지가 의존성 업데이트를 필요로 할 경우 실패

> glob 표현식도 사용할 수 있습니다. ([micromatch 문법](https://www.npmjs.com/package/micromatch) 사용)

## `fixed`

(패키지 이름 배열의 배열)

서로 항상 동일한 버전으로 업데이트 및 배포할 패키지 그룹 지정

예시:

```json
{
  "fixed": [["@changesets/button", "@changesets/theme"]]
}
```

자세한 내용은 [fixed-packages 문서](/fixed-packages) 참고.

## `linked`

(패키지 이름 배열의 배열)

서로 버전을 공유하지만 완전히 동기화되지 않고 독립적으로 릴리스할 패키지 그룹 지정

예시:

```json
{
  "linked": [["@changesets/button", "@changesets/theme"]]
}
```

자세한 내용은 [linked-packages 문서](/linked-packages) 참고.

> **주의:** 다른 도구처럼 모든 패키지를 동일 버전으로 강제로 릴리스하지 않습니다.

## `updateInternalDependencies`

패키지 의존성이 변경될 때 의존하는 패키지의 버전 범위 업데이트 여부 설정

예시:

```
pkg-a @ 1.0.0
pkg-b @ 1.0.0 (pkg-a에 ^1.0.0으로 의존)
```

### 설정 값

* `patch` (기본값): 항상 최신 버전으로 업데이트

```
pkg-a @ 1.0.1
pkg-b @ 1.0.1 (pkg-a에 ^1.0.1 의존)
```

* `minor`: minor 업데이트 시에만 업데이트

```
pkg-a @ 1.0.1
pkg-b @ 1.0.1 (pkg-a에 ^1.0.0 의존)
```

> **참고:** 현재 릴리스된 패키지에만 적용됩니다. 예를 들어 B만 릴리스되고 A는 아닐 경우, A는 업데이트되지 않습니다.

## `changelog`

(`false` 또는 파일 경로)

패키지 changelog 생성 방식 설정

* `false`: changelog 비활성화
* 경로 지정: custom changelog 생성기 사용

Changesets 기본 제공:

* `@changesets/changelog-git`: 커밋 링크 추가
* `@changesets/changelog-github`: PR 작성자 이름, PR 링크 포함

예시:

```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "<org>/<repo>" }]
}
```

자세한 내용은 [changelog-functions 문서](/modifying-changelog-format) 참고.

## `bumpVersionsWithWorkspaceProtocolOnly`

(`boolean`)

workspace protocol로 연결된 패키지 의존성만 버전 업데이트할지 여부 설정

## `snapshot`

(`object` 또는 `undefined`)

### `useCalculatedVersion`

(`boolean`, 기본값: `false`)

`snapshot` 릴리스 시 기본으로 `0.0.0`이 아닌 changeset 기반 버전을 사용

### `prereleaseTemplate`

(`string`, 기본값: 없음)

스냅샷 릴리스 버전 suffix 템플릿

**사용 가능한 placeholder:**

* `{tag}`: 스냅샷 태그 이름
* `{commit}`: git commit ID
* `{timestamp}`: Unix timestamp
* `{datetime}`: 릴리스 날짜+시간 (예: `20211213000730`)

> **주의:** `--snapshot` 사용 시 태그 이름이 비어있으면 `{tag}` 사용 불가

**기본 템플릿**

`{tag}-{datetime}` → 태그가 없으면 `{datetime}`만 사용
