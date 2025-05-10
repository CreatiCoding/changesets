# 프리릴리스(Prereleases)

> **경고!** 프리릴리스는 매우 복잡합니다. 모든 npm 배포 프로세스를 충분히 이해해야 제대로 사용할 수 있습니다. 실수하면 복구가 어려운 저장소 상태나 배포 상태가 발생할 수 있습니다.

> **경고:** 프리릴리스를 저장소의 메인 브랜치에서 수행하고, 프리릴리스 변경사항이 없는 마지막 안정 버전 브랜치를 따로 만들지 않으면, 프리릴리스 모드에서 빠져나올 때까지 다른 변경 작업이 중단됩니다. 반드시 메인 브랜치가 아닌 별도의 브랜치에서만 프리릴리스를 실행할 것을 강력히 권장합니다.

실제 릴리스 전에 패키지의 테스트 버전을 배포하고 싶다면 Changesets로 이를 수행할 수 있습니다. 다만 모노레포의 특성상 복잡성이 추가되므로 반드시 원리를 이해해야 합니다.

## 프리릴리스 모드 진입

```sh
npm run changeset pre enter next
```

이 명령어는 Changesets를 프리릴리스 모드로 전환하며, `.changeset` 폴더에 `pre.json` 파일을 생성합니다. 이 파일은 프리릴리스 상태 정보를 저장합니다. 상세 구조는 [`@changesets/types`](https://github.com/changesets/changesets/tree/main/packages/types)의 `PreState` 타입 정의를 참고하세요.

## 프리릴리스 버전 지정

```sh
npm run changeset version
```

기존과 동일하게 버전을 지정하되, 버전 뒤에 `-next.0`이 추가됩니다. 프리릴리스 버전은 일반 semver 범위에서 만족되지 않으므로, 기존에는 버전 변경이 없던 의존성 패키지도 같이 버전이 상승할 수 있습니다. 예: `^5.0.0`은 `5.1.0-next.0`을 만족하지 않음.

예시:

```
packages/
  pkg-a@1.0.1-next.0 → pkg-b@^2.0.1
  pkg-b@2.1.0-next.0
  pkg-c@3.0.0
.changeset/
```

## 프리릴리스 배포

```sh
npm run changeset publish
```

`pre enter` 명령어에서 지정한 태그(`next`)로 npm에 배포됩니다.

## 추가 프리릴리스

추가 변경 사항을 적용 후 재버전을 진행할 경우:

```sh
npm run changeset version
git add .
git commit -m "Version packages"
npm run changeset publish
git push --follow-tags
```

예시:

```
packages/
  pkg-a@1.1.0-next.1 → pkg-b@^2.0.1
  pkg-b@2.1.0-next.0
  pkg-c@3.0.1-next.0
  pkg-d@1.0.0-next.0
```

신규 패키지(pkg-d)는 첫 배포 시 `latest` dist tag로 올라갑니다. 이후에는 프리릴리스 종료 시까지 계속 `latest`에 배포됩니다.

## 최종 릴리스 준비

```sh
npm run changeset pre exit
npm run changeset version
git add .
git commit -m "Exit prerelease mode and version packages"
npm run changeset publish
git push --follow-tags
```

* `changeset pre exit`: `pre.json` 파일에 프리릴리스 모드 종료 플래그만 설정합니다.
* `changeset version`: changeset 파일을 적용하고 프리릴리스 태그(`-next.x`)를 제거합니다.

결과 예시:

```
packages/
  pkg-a@1.1.0 → pkg-b@^2.0.1
  pkg-b@2.1.0
  pkg-c@3.0.1
  pkg-d@1.0.0
```

## 최종 배포

```sh
npm run changeset publish
```

모든 패키지가 정상적으로 `latest` dist tag로 npm에 배포됩니다.
