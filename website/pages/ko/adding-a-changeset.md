# Changeset 추가하기

안녕하세요! 누군가 또는 봇이 프로젝트에 **changeset을 추가**해 달라고 요청해서 오셨을 가능성이 있습니다. 어떻게 추가하는지 함께 알아보겠습니다. 먼저, changeset이 무엇인지부터 설명합니다.

## Changeset이란?

Changeset은 브랜치 또는 커밋에서 발생한 변경 사항을 기록하는 정보입니다. 세 가지 정보를 포함합니다.

* 어떤 패키지를 릴리스해야 하는지
* [semver 버전 규칙](https://semver.org/)에 따라 어떤 버전으로 릴리스할지
* 변경된 패키지의 changelog 내용

## 다중 패키지 저장소(mono-repo)에서의 사용

1. 명령어 실행: `npx changeset` 또는 `yarn changeset`
2. ↑↓ 키로 패키지를 선택하고, space 키로 선택합니다. 모두 선택한 후 enter를 누릅니다.
3. 각 패키지의 변경 사항에 적절한 bump type(`major`, `minor`, `patch`)을 선택합니다. [semver 버전 규칙](https://semver.org/) 참고
4. 마지막으로 changelog에 추가될 메시지를 입력합니다.

이 과정을 마치면 다음과 같은 구조로 새로운 changeset 파일이 추가됩니다.

```
-| .changeset/
-|-| UNIQUE_ID.md
```

입력한 메시지는 해당 markdown 파일에 들어 있습니다. 이후 내용을 추가하거나 수정해도 됩니다. 패키지를 추가하거나 bump type을 변경해도 무방합니다.

좋은 changeset 작성 예시는 다음 내용을 포함합니다.

* **무엇**을 변경했는가
* **왜** 변경했는가
* 사용자 코드에서 **어떻게** 업데이트해야 하는가

5. 완성된 changeset 파일을 브랜치에 커밋합니다.

## 단일 패키지 저장소에서의 사용

1. 명령어 실행: `npx changeset` 또는 `yarn changeset`
2. 변경 사항에 맞는 bump type 선택 ([semver 참조](https://semver.org/))
3. changelog에 추가할 메시지 입력

결과:

```
-| .changeset/
-|-| UNIQUE_ID.md
```

내용 추가, bump type 수정 모두 자유롭게 할 수 있습니다. 좋은 changeset 작성 기준은 다중 패키지와 동일합니다.

4. 파일을 브랜치에 커밋합니다.

## Changeset 추가 팁

### 하나의 PR에 여러 changeset을 추가할 수 있습니다

Changesets는 누적이 가능하므로 여러 개를 추가해도 문제가 없습니다. 다음과 같은 경우 유용합니다.

* 서로 다른 changelog로 여러 패키지를 릴리스하고 싶은 경우
* 동일 패키지의 변경 사항 중 각각 따로 강조하고 싶은 경우

## Changesets를 더 알고 싶다면?

[상세 설명 문서 보기](/detailed-explanation)
