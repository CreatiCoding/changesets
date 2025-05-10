# Changesets 자동화

Changesets는 원래 수동 프로세스에서도 완벽하게 동작하도록 설계되었지만, 릴리스 자동화를 위한 다양한 도구도 제공합니다. 자동화 과정은 크게 두 가지로 나눌 수 있습니다.

1. PR에 changeset이 포함되었는지 어떻게 확인할 것인가?
2. version 및 publish 명령어를 어떻게 실행할 것인가?

여기서는 추천하는 빠른 자동화 workflow를 소개합니다.

## 추천 자동화 플로우

1. [Changeset GitHub Bot](https://github.com/apps/changeset-bot)을 저장소에 설치
2. [Changesets GitHub Action](https://github.com/changesets/action)을 저장소에 추가

## PR에 changeset이 있는지 확인하는 방법

Changesets는 파일로 저장되므로 리뷰어가 직접 파일 유무를 확인할 수도 있지만, 사람이 놓칠 가능성이 큽니다. 따라서 PR 작성자나 리뷰어가 직접 확인하지 않아도 되게 하는 자동 감지 시스템을 추가하는 것이 좋습니다.

### 비차단(Non-blocking)

changeset이 없더라도 PR 병합을 허용합니다. 대신 Changeset Bot이 changeset 추가를 권고합니다.

[Changeset GitHub Bot](https://github.com/apps/changeset-bot)은 가장 좋은 선택입니다. 추가로 maintainer가 직접 changeset을 추가할 수 있는 링크도 제공하여, contributor를 기다리지 않고 바로 병합할 수 있습니다.

### 차단(Blocking)

changeset이 없으면 CI 빌드를 실패하게 하여 PR 병합을 막고 싶을 경우:

CI에 다음 명령어를 추가합니다.

```bash
changeset status --since=main
```

변경된 changeset이 없으면 exit code 1로 종료합니다.

만약 릴리스가 필요 없는 PR (예: 테스트, 빌드 도구 변경 등)을 병합하고 싶다면 `changeset --empty` 명령어로 아무것도 릴리스되지 않는 특별 changeset을 추가할 수 있습니다.

## version 및 publish 명령 실행 방법

[Changesets GitHub Action](https://github.com/changesets/action)은 다음 기능을 제공합니다.

* changeset version 결과로 **version PR 생성**
* PR이 병합되면 자동으로 다시 생성 및 최신화
* base branch로 merge 시 release 자동화 옵션 제공

### manual workflow 예시

GitHub Action을 사용하지 않는 경우 추천하는 수동 프로세스는 다음과 같습니다.

1. 릴리스 코디네이터(RC)가 base branch 병합을 중단
2. RC가 base branch를 pull → `changeset version` 실행 → version 변경 PR 생성
3. version PR을 base branch에 병합
4. RC가 다시 base branch를 pull → `changeset publish` 실행
5. RC가 `git push --follow-tags`로 태그 push
6. RC가 base branch 병합 중단을 해제

> **주의:** 이 프로세스는 단계가 많고 다소 번거롭습니다. 상황에 맞게 유연하게 조정하세요.
