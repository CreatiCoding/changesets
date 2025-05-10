# Changesets 용어집

이 문서는 Changesets 프로젝트에서 공통적으로 사용하는 주요 용어들을 설명합니다. 일부 용어는 [types 패키지](../packages/types)에서 타입 정의도 확인할 수 있습니다.

* **changeset**: 특정 bump 유형과 변경 요약을 포함하여 패키지 릴리스를 의도하는 선언입니다. Changeset은 누적이 가능하여, `bump` 명령 실행 시 모든 changeset이 올바르게 적용됩니다. release 정보와 release plan을 생성하는 데 사용됩니다.
* **summary**: changeset이 나타내는 변경 내용을 요약한 정보로, 관련 패키지의 `CHANGELOG.md`에 작성됩니다.
* **changeset folder**: `./changeset` 폴더. 모든 changeset 파일은 여기에 저장됩니다.
* **workspace**: 다중 패키지 저장소(mono-repo) 내의 로컬 패키지입니다.
* **bump-type**: `major | minor | patch | none` 중 하나로, [semver](https://semver.org/) 규칙을 따릅니다.
* **range-type**: 의존성 버전 범위 (`1.0.0`, `~1.0.0`, `^1.0.0` 등). [node-semver](https://github.com/npm/node-semver#ranges)에서 정의된 semver 범위의 일부입니다.
* **bump**

  * (1) 모든 changeset을 적용하고 패키지 버전과 changelog를 업데이트하는 명령
  * (2) 패키지 버전을 새로운 버전으로 업데이트하는 행위
* **single-package repo**: 루트에 단일 패키지만 포함된 저장소
* **multi-package repo / monorepo**: 여러 패키지를 포함한 저장소. [Bolt](https://github.com/boltpkg/bolt)나 [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)로 관리됩니다.
* **release line generators**: `getReleaseLine`, `getDependencyReleaseLine` 함수로 changelog에 추가할 내용을 생성합니다. 예: `releaseLineGenerators(changesets)`
* **fixed packages**: 같은 semver 버전을 공유하며 항상 함께 배포되는 패키지 그룹. 자세한 내용은 [fixed-packages](./fixed-packages) 문서 참고.
* **linked packages**: 새로운 버전에서도 semver 범위 일관성을 유지하는 패키지 그룹. 자세한 내용은 [linked-packages](./linked-packages) 문서 참고.
* **release instruction**: 단일 패키지 릴리스를 나타내는 객체로, 패키지명과 bump-type을 포함합니다.
* **release plan**: 모든 changeset을 기반으로 어떤 패키지가 어떤 버전으로 릴리스될지, 의존성/linked 패키지를 포함하여 계산한 객체입니다.
* **absolutely correct semver**: 사용자의 코드가 깨질 가능성을 원천 차단하기 위해 모든 변경을 major로 간주하는 버전 관리 방식
* **pragmatically correct semver**: 현실적으로 변경 내용을 판단하여 semver 결정을 내리는 방식. 사용자의 수나 API 범위에 따라 조정됩니다. Changesets에서 "correct semver"는 일반적으로 이것을 의미합니다.
* **dependency**: 다른 패키지에 의해 참조되는 패키지
* **dependent**: 다른 패키지를 참조하는 패키지. 종속성을 기반으로 dependent 패키지를 찾아 릴리스하는 데 사용됩니다.
* **release**: 버전 업데이트 및 빌드 후 배포까지 포함하는 작업
* **prereleases**: 태그가 붙고 `npm latest`로 배포되지 않는 릴리스. 테스트 및 사전 배포 목적으로 사용됩니다. 자세한 내용은 [prereleases 문서](./prereleases) 참고.
* **Release Candidate (RC) prerelease**: 주요 릴리스 전 최종 테스트를 위한 프리릴리스. 예: `package-one@2.0.0-my-tag.0`, 이후 `package-one@2.0.0-my-tag.1`
* **snapshot prerelease**: 특정 git 커밋 시점의 변경을 테스트할 수 있게 하는 릴리스. `0.0.0-githash` 형태로 배포됩니다. RC보다 비공식적이며 테스트 편의를 위해 사용합니다.

## 아직 명확히 정의되지 않은 개념

* 패키지가 다른 패키지를 참조할 때 dependency 목록에 range와 함께 표시되지만, 이것은 dependency 자체가 아닌 dependent와 dependency 사이의 관계를 나타냅니다.
