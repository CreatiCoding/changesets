# 설계 결정 (Decisions)

이 문서는 Changesets 개발 과정에서 이루어진 규칙과 설계 결정에 대한 설명입니다. 목표는 **사용자는 쉽게 사용할 수 있고, 최대한 많은 가치를 제공하는 것**입니다.

## Changesets 조합 방식

Changesets는 쉽게 누적될 수 있도록 설계되었습니다. `version` 명령을 실행할 때, 모든 changeset의 버전 변경이 **가장 높은 semver 변경 수준**으로 합쳐집니다.

예시:

* `packageA` 버전: `1.1.1`
* changesets: `minor` 2개 + `patch` 1개 → 결과: `1.2.1`

이 구조 덕분에 changeset은 안전하게 계속 추가할 수 있고, 최종 릴리스는 모든 changeset을 종합하여 적절한 버전으로 릴리스됩니다. changelog에는 각각의 변경 내용과 변경 유형이 모두 기록됩니다.

## 의존성 버전 업데이트 방식

> **참고:** 이 기능은 mono-repo 환경에서만 적용됩니다.

Changesets는 생성 시, 변경된 패키지가 다른 패키지의 semver 범위를 벗어나는지 확인합니다.

예시:

* `packageA`: `1.1.1`
* `packageB`: `1.1.0` (`packageA`에 `^1.1.0`으로 의존)

`packageA`를 `major` 변경하면, `packageB`도 업데이트하지 않으면 개발과 실제 설치 환경에서 버전 불일치 문제가 발생합니다.

따라서:

* `packageA`: `major`
* `packageB`: `patch` → 의존성 업데이트

의존성 업데이트는 **항상 patch bump**로 처리됩니다. 만약 더 큰 변경을 표시하고 싶다면 `packageB`에 별도의 changeset을 추가하는 것이 좋습니다.

## 왜 파일 시스템에 저장하는가

두 가지 이유가 있습니다.

1. changeset 파일을 생성 후 **사용자가 직접 수정**할 수 있게 하기 위해
2. Git workflow(커밋 squash, 수정 등)에 **영향을 주지 않기 위해** → Git 변경으로 인한 릴리스 실패를 방지

## Changesets와 Semantic Release의 차이

[semantic release](https://github.com/semantic-release/semantic-release) 또는 [lerna semantic release](https://github.com/atlassian/lerna-semantic-release)와 비교 시 주요 차이점:

1. **Changesets는 mono-repo 중심 설계**

   * repository 내부의 패키지 간 의존성을 관리합니다.
2. **Git 대신 파일 시스템에 변경 정보를 저장**
3. **semver만 사용**

   * Changesets는 `major`, `minor`, `patch`만 선택합니다. semantic release처럼 `feature`, `fix` 등의 custom type을 사용하지 않고, 변경 설명은 changeset 본문에서 작성하도록 유도합니다.

## peerDependencies 버전 관리

현재 peerDependency로 등록된 패키지가 변경되면 해당 패키지는 `major` 버전으로 릴리스됩니다. 이유는 peerDependency는 설치 시 버전 변경을 감지할 수 없기 때문입니다.

> 이 결정은 향후 논의 및 개선이 가능합니다.

## Changesets와 Git의 상호작용

Changesets는 core workflow (changeset 추가, versioning, publishing)를 **Git 없이도 동작**하도록 설계되었습니다.

* Git 기능을 강제하지 않음 (예: add 명령어에서 Git 실패 시 에러 미출력)
* 사용자가 명시적으로 Git 기능을 사용할 경우 (예: commit 옵션, `status --since main` 명령) → 실패 시 에러를 출력하고 non-zero exit code로 종료
