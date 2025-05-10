# Changesets 사용하기

Changesets는 기여자가 자신의 작업 중에 핵심적인 결정을 직접 내릴 수 있게 하여, 작업 흐름을 간편하게 만들기 위해 설계되었습니다. Changesets는 두 가지 주요 정보를 담고 있습니다.

1. 버전 유형 ([semver](https://semver.org/) 준수)
2. 변경 로그에 추가할 변경 정보

Changesets는 원래 [bolt monorepos](https://github.com/boltpkg/bolt)용으로 설계되었습니다. 따라서 모노레포 환경에서 변경된 패키지의 의존 패키지 버전도 자동으로 관리할 수 있습니다.

이 가이드는 Changesets를 도구로 추가하고자 하는 **패키지 유지 관리자**를 위한 것입니다. **기여자**를 위한 내용은 [adding a changeset](./adding-a-changeset.md) 문서를 참조하세요.

Changesets의 기본적인 사용 흐름은 다음과 같습니다.

1. 각 변경과 함께 changeset 추가
2. 릴리스 준비 시 `version` 명령어 실행 → 변경 사항 확인
3. 최종적으로 `publish` 명령어 실행

2단계와 3단계는 CI 프로세스에 포함할 수도 있습니다.

## Changesets 도구 추가하기

```sh
npm install @changesets/cli
npm run changeset init
```

## Changeset 추가하기

```sh
npm run changeset
```

> 참고: 원하면 `changeset add` 명령으로 changeset을 추가할 수도 있지만, 단순히 `npm run changeset`으로도 가능합니다.

## 버전 지정 및 배포

릴리스를 준비할 때 아래 명령어로 버전을 업데이트합니다.

```sh
npm run changeset version
```

모든 changeset을 반영하여 적절한 semver 버전으로 업데이트합니다. 각 changeset에 대한 변경 로그(changelog)도 자동 생성됩니다.

이 단계에서 changelog와 버전 변경 내용을 검토하고 필요시 수동으로 수정하는 것을 권장합니다. 검토가 완료되면 패키지를 배포합니다.

```sh
npm run changeset publish
```

현재 npm에 등록된 버전보다 높은 버전을 가진 패키지에 대해 `npm publish`가 실행됩니다.

## 유용한 팁

### 모든 변경이 changeset을 필요로 하지는 않습니다

Changesets는 릴리스와 변경 로그를 위한 도구입니다. 따라서 변경 로그나 릴리스와 관련 없는 단순 변경에는 changeset을 추가할 필요가 없습니다. 따라서 changeset이 없는 경우 기여를 차단하지 않도록 설정할 것을 권장합니다.
