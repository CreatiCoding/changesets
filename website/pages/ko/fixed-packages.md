# 고정 패키지 (Fixed Packages)

고정 패키지는 특정 패키지 그룹을 항상 함께 버전 업데이트 및 배포하도록 설정할 수 있는 기능입니다.

> **linked packages**와 달리, **fixed packages** 그룹에 포함된 모든 패키지는 일부 패키지에 변경 사항이 없어도 항상 함께 버전이 올라가고 배포됩니다.

## 예시

패키지 `pkg-a`, `pkg-b`, `pkg-c`가 있다고 가정합니다. `pkg-a`와 `pkg-b`는 고정 그룹으로 설정되어 있고, `pkg-c`는 포함되지 않았습니다.

설정 예시:

```json
{
  "fixed": [["pkg-a", "pkg-b"]]
}
```

초기 상태:

* `pkg-a`: `1.0.0`
* `pkg-b`: `1.0.0`
* `pkg-c`: `1.0.0`

1. changeset: `pkg-a (patch)`, `pkg-b (minor)`, `pkg-c (major)` → 릴리스 결과

* `pkg-a`: `1.1.0`
* `pkg-b`: `1.1.0`
* `pkg-c`: `2.0.0`

2. changeset: `pkg-a (minor)` → 릴리스 결과

* `pkg-a`: `1.2.0`
* `pkg-b`: `1.2.0`
* `pkg-c`: `2.0.0`

## glob 표현식 사용

프로젝트(예: 모노레포)에서 여러 패키지를 한꺼번에 고정하고 싶다면, glob 표현식을 사용해 목록을 자동으로 유지 관리할 수 있습니다.

예시:

```json
{
  "fixed": [["pkg-*"]]
}
```

이 설정은 `pkg-`로 시작하는 모든 패키지를 자동으로 매칭합니다.

> glob 표현식은 [micromatch](https://www.npmjs.com/package/micromatch) 문법을 따라야 합니다.
