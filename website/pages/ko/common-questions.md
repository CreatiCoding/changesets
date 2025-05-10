# 자주 묻는 질문 (Common Questions)

Changesets의 동작 방식을 간략하게 이해하는 데 도움이 되는 질문과 답변입니다. 세부적인 workflow 설명은 포함하지 않습니다.

## Changesets는 자동으로 생성됩니다

Changesets는 `yarn changeset` 또는 `npx changeset` 명령으로 생성됩니다. changeset release flow를 따르기만 하면 문제없이 사용할 수 있습니다.

## 각 Changeset은 독립된 파일입니다

파일 충돌을 방지하기 위해 기본적으로 사람이 읽을 수 있는 랜덤 이름이 붙습니다. 원한다면 파일 이름을 변경해도 아무런 문제가 발생하지 않습니다.

## Changesets는 자동으로 삭제됩니다

`changeset version` 또는 동일한 명령어를 실행하면 모든 changeset 폴더가 삭제됩니다. changeset은 한 번만 사용되도록 설계되어 있으며, 따라서 다른 데이터를 이 폴더에 저장하는 것은 권장하지 않습니다.

## Changesets는 YAML front matter와 markdown 본문으로 구성된 파일입니다

파일은 두 부분으로 나뉩니다.

* **markdown 본문**: changelog에 추가될 변경 요약
* **YAML front matter**: 버전 명령어에서 어떤 패키지를 어떤 유형으로 버전 업데이트할지 정의

필요에 따라 자유롭게 수정할 수 있습니다.

## 변경 요약(summary)이나 버전 종류(bump type)를 수정해도 되나요?

네, 안전하게 수정할 수 있습니다. 심지어 명령어 없이 직접 changeset 파일을 작성해도 괜찮습니다.

## changeset 파일을 수동으로 삭제해도 되나요?

가능하지만 **주의가 필요합니다**. changeset을 삭제하면 해당 패키지의 릴리스 의도가 사라지므로 신중하게 판단해야 합니다.
