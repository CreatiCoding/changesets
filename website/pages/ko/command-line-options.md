# 커맨드 라인 옵션

Changesets의 주요 인터페이스는 커맨드 라인입니다. 주요 명령어는 다음과 같습니다.
권장 workflow 및 설정 방법은 [Changesets 사용 시작하기](/intro-to-using-changesets) 문서를 참고하세요.

* init
* add \[--empty]\[--open]
* version \[--ignore, --snapshot]
* publish \[--otp=code, --tag]
* status \[--since=master --verbose --output=JSON\_FILE.json]
* pre \[exit|enter {tag}]
* tag

가장 중요한 명령어:

* `add`: 기여자가 변경 사항 정보를 추가
* `version`: `add`로 생성한 changeset을 기반으로 버전 및 changelog 업데이트
* `publish`: npm에 배포

## `init`

```bash
changeset init
```

`.changeset` 폴더를 생성하고 readme 및 config 파일을 생성합니다. 최초 설정 시 한 번만 실행합니다.

## `add`

```bash
changeset add
```

또는

```bash
changeset
```

Changesets의 주요 인터페이스입니다. 패키지 선택 → bump type 선택 → 변경 요약 입력 → changeset 파일 생성 과정을 거칩니다.

예시:

```mdx
---
"@changesets/cli": major
---

A description of the major changes.
```

* `--empty`: 업데이트할 패키지가 없지만 CI가 changeset을 요구하는 경우 사용

```bash
changeset --empty
```

```mdx
---
---
```

* `--open`: 생성된 changeset을 외부 편집기로 바로 엽니다.

## `version`

```bash
changeset version
```

Changesets로 릴리스할 때 실행합니다. 버전 및 의존성을 업데이트하고 changelog를 작성합니다.

> **주의:** publish 전에 반드시 base 브랜치로 merge 할 것을 권장합니다.

옵션:

```bash
changeset version --ignore PACKAGE_NAME
```

일부 패키지를 제외하고 부분 배포를 허용합니다. 단, 다음의 경우 실패합니다:

1. 제외 패키지가 포함된 changeset에 비제외 패키지가 있을 때
2. 제외 패키지가 업데이트된 의존성을 필요로 할 때

```bash
changeset version --snapshot
```

스냅샷 릴리스를 생성합니다. (상세: [스냅샷 릴리스](/snapshot-releases) 문서)

## `publish`

```bash
changeset publish [--otp={token}]
```

패키지를 npm에 배포하고 git 태그를 생성합니다. `pnpm` 사용 시 자동으로 `pnpm publish`를 사용합니다.

옵션:

* `--otp={token}`: npm 2차 인증 코드
* `--tag TAGNAME`: 테스트 용도의 배포 (예: `snapshot releases`와 함께 사용)

### Git 태그

배포 시 생성된 git 태그를 push 하려면 다음 명령어를 실행하세요.

```bash
git push --follow-tags
```

## `status`

```bash
changeset status [--verbose] [--output={filePath}] [--since={gitTag}]
```

현재 존재하는 changeset 정보를 확인합니다.

옵션:

* `--verbose`: 새 버전 및 관련 changeset 요약 링크 출력
* `--output`: 상태 결과를 JSON으로 파일로 출력 (CI 등에서 활용 가능)
* `--since`: 특정 브랜치나 태그 이후의 changeset만 표시

> **주의:** `version` 또는 `publish` 실행 중에는 실패합니다. 반드시 실행 직전에 사용해야 합니다.

## `pre`

```bash
changeset pre [exit|enter {tag}]
```

프리릴리스 모드를 시작(`enter`) 또는 종료(`exit`)합니다.
`enter` 후에는 `version` → `publish`로 정상 릴리스 플로우를 따릅니다.
자세한 내용은 [프리릴리스 문서](/prereleases) 참고.

> **주의:** pre-release는 매우 복잡하며, Changesets의 안전장치가 비활성화됩니다. 반드시 [모노레포 배포 문제](/problems-publishing-in-monorepos)와 함께 충분히 학습 후 사용하세요. 더 간편한 테스트용 릴리스는 [스냅샷 릴리스](/snapshot-releases)를 추천합니다.

## `tag`

```bash
changeset tag
```

현재 버전의 모든 패키지에 git 태그를 생성합니다.
실제 npm 배포는 하지 않습니다. (`changeset publish` 사용 시 별도 실행 불필요)

* monorepo: `pkg-name@version-number`
* single-package repo: `v1.0.0`

**반드시 `changeset version` 실행 후 사용해야 합니다.**
