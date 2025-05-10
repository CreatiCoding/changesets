# 애플리케이션 또는 npm 외 패키지 버전 관리

Changesets는 애플리케이션 버전이나 npm 외 패키지(예: dotnet NuGet 패키지, ruby gems, docker 이미지 등)의 버전 관리에도 사용할 수 있습니다.

필요한 조건은 프로젝트에 `package.json` 파일이 있어야 한다는 점입니다. 이 파일을 통해 저장소 내 버전과 의존성을 관리합니다.

이 기능을 활성화하려면 `.changesets/config.json` 파일에서 `privatePackages`를 `{ version: true, tag: true }`로 설정하세요. 기본적으로 Changesets는 변경 로그와 버전만 업데이트합니다(즉, `{ version: true, tag: false }`).

> **참고**
> Changesets는 npm `package.json` 파일만 버전 관리합니다. 다른 패키지 형식의 릴리스를 트리거하려면 Changesets가 생성한 태그나 릴리스에 따라 실행되는 워크플로를 만들어야 합니다.

## 패키지 설정하기

Changesets로 프로젝트를 추적하려면 최소한 `name`, `private`, `version` 항목이 포함된 `package.json` 파일이 필요합니다.

```json
{
  "name": "my-project",
  "private": true,
  "version": "0.0.1"
}
```
