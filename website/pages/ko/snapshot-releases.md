# 스냅샷 릴리스

스냅샷 릴리스는 버전을 업데이트하지 않고 변경 사항을 테스트용으로 배포하는 방법입니다. 이를 위해 변경된 `version` 명령과 `publish` 명령을 사용합니다. 두 명령이 모두 실행되면 Changesets의 패키지가 `0.0.0-{tag}-DATETIMESTAMP` 형태의 버전으로 배포됩니다.

## 시작하기

[changeset 추가](./adding-a-changeset.md)에 설명된 대로 일반적으로 changeset을 생성합니다. 스냅샷 릴리스를 진행할 준비가 되면 전용 브랜치를 만듭니다.

## 패키지 버전 지정

```sh
npm run changeset version --snapshot
```

이 명령은 changeset을 적용하지만, 다음 버전을 사용하는 대신 모든 버전을 `0.0.0-명령 실행 시간`으로 설정합니다.

버전 번호에 개인화된 값을 추가하고 싶다면 예를 들어 `bulbasaur`를 다음과 같이 추가할 수 있습니다.

```sh
npm run changeset version --snapshot
```

그러면 버전이 `0.0.0-bulbasaur-명령 실행 시간`으로 설정됩니다.

## 패키지 배포

`yarn changeset version` 명령을 실행한 후, 다음 명령어로 패키지를 배포할 수 있습니다.

```sh
changeset publish --tag bulbasaur
```

`--tag` 플래그를 사용하면 npm의 `latest` 태그로 추가되지 않습니다. **매우 중요**: 태그를 지정하지 않으면, 사용자가 `yarn add your-package-name`으로 패키지를 설치할 때 스냅샷 버전을 설치하게 됩니다.

## `--no-git-tag` 플래그 사용

로컬에서 스냅샷 릴리스를 배포하거나 CI 환경에서 [git 태그](http://npm.github.io/publishing-pkgs-docs/updating/using-tags.html)를 원격으로 푸시할 계획이라면 `changeset publish` 명령어에 `--no-git-tag` 플래그를 사용할 수 있습니다.

```sh
changeset publish --no-git-tag --snapshot
```

이렇게 하면 스냅샷 패키지에 대해 git 태그가 생성되지 않습니다. 안정 버전을 배포할 때는 기존 `changeset publish` 명령을 사용하여 git 태그를 만들 수 있으며, 로컬에서 스냅샷 릴리스를 안전하게 배포할 수 있습니다.

## 스냅샷 버전 사용하기

테스터가 스냅샷을 사용하도록 하려면 `package.json`의 버전을 새로 배포한 버전으로 업데이트 후 설치하거나, 다음 명령어를 사용할 수 있습니다.

```sh
npm install your-package-name@0.0.0-bulbasaur-명령 실행 시간
```

또는 태그를 사용할 수도 있습니다.

```sh
npm install your-package-name@bulbasaur
```

## 스냅샷 브랜치 관리

대부분의 경우 `version` 실행 이후의 변경 사항은 메인 브랜치로 병합하는 것이 권장되지만, 스냅샷의 경우는 예외입니다. 스냅샷은 설치용으로만 사용되며, 저장소의 최종 상태를 나타내는 것이 아니므로, 스냅샷 실행 결과를 어떤 브랜치에도 푸시하거나 메인 브랜치에 병합하지 마세요. 생성된 버전과 사용한 태그만 기록하고, 메인 브랜치로 병합하지 않도록 합니다.
