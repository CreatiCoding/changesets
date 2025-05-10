# Changesets 상세 설명

아래는 Changesets가 무엇인지, 어떤 문제를 해결하고자 하는지에 대한 자세한 설명입니다.

## 문제점

패키지를 릴리스할 때, 여러 사람이 작성한 변경 사항이나 장기간 동안 누적된 변경 사항을 한꺼번에 배포해야 할 경우가 많습니다. 이런 정보를 가장 정확하게 기록할 수 있는 시점은 배포 시점이 아니라, 변경 사항을 만든 직후인 PR 제출 시점입니다.

Git은 이러한 세부 정보를 저장하는 데 적합하지 않습니다. Git 커밋 메시지는 보통 간단하게 작성되며, 상세한 변경 문서를 작성하기 어렵습니다.

## 해결책: Changesets

Changeset은 changelog나 버전 업데이트와 구별되는 \*\*변경 의도(intent to change)\*\*를 기록하는 시스템입니다. Changeset은 다음 두 가지 핵심 정보를 담습니다.

* **버전 정보**
* **변경 로그**

변경 의도는 다음과 같은 semver 변경 유형을 포함합니다.

* `major` | `minor` | `patch`

또한 모노레포 환경에서는 이 변경을 반영해야 하는 다른 패키지 정보를 함께 기록할 수 있습니다. 이렇게 하면 모든 패키지를 최신으로 업데이트했을 때 상호 호환성을 보장할 수 있습니다. 이 방식은 [bolt](https://github.com/boltpkg/bolt)의 버전 호환성 원칙을 참고해 개발되었습니다.

변경 로그는 markdown 형식으로 저장할 수 있습니다.

Git에 직접 저장하는 대신, 파일 시스템에 다음 구조로 저장합니다.

```
-| .changeset/
-|-| UNIQUE_ID.md
```

Changeset 파일은 YAML front matter와 markdown 본문을 가진 markdown 파일입니다. YAML 부분은 어떤 패키지가 어떤 유형으로 변경됐는지를 정의하고, markdown 본문은 changelog에 들어갈 변경 요약입니다.

```md
---
"@myproject/cli": major
"@myproject/core": minor
---

Change all the things
```

이 구조는 버전 관리를 다음 두 단계로 나눌 수 있게 해줍니다.

1. **Changeset 추가**: PR 단계에서 기여자가 변경 직후 작성
2. **버전 지정**: 모든 changeset을 결합하여 최대 변경 유형을 기준으로 패키지 버전을 업데이트하고, 필요 시 의존성을 업데이트하며 changelog를 작성. 최종 결과를 검토 가능

## 유용한 Changesets 도구

1. Changeset CLI로 새로운 changeset 생성
2. Changeset 자동 소비 및 버전 지정
3. PR에서 changeset 유무 감지 및 표시

모노레포에서 여러 패키지를 배포하는 도구도 중요하지만, 필수적으로 연결되어 있지는 않습니다.

## 단일 패키지 저장소에서의 장점

Changesets는 다중 패키지 저장소의 복잡한 의존성 관리와 버전 업을 목표로 설계되었습니다. 하지만 단일 패키지 저장소에서도 다음과 같은 장점이 있습니다.

* PR 작성자가 변경 내용을 작성할 때 버전 및 changelog 정보를 명확하게 기록할 수 있어, 릴리스 결정과 changelog 작성에 대한 신뢰도를 높입니다.
