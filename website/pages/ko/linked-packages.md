# 링크된 패키지 (Linked Packages)

링크된 패키지는 특정 패키지 그룹을 함께 버전 관리하도록 설정할 수 있는 기능입니다. 복잡한 사례들이 있을 수 있어 몇 가지 예시를 통해 설명합니다.

* 링크된 패키지들도 변경 사항이 있을 때만 버전이 올라갑니다. (직접 changeset을 추가했거나, 다른 패키지의 의존 패키지로 포함된 경우)
* changeset이 있는 패키지가 링크 그룹에 포함된 경우, 해당 그룹에서 **가장 높은 현재 버전 + 가장 높은 변경 유형**(major > minor > patch)으로 버전이 맞춰집니다.

> **fixed packages**와는 달리, 링크 그룹의 모든 패키지가 반드시 버전 업 및 배포되는 것은 아닙니다. changeset이 있는 패키지만 업데이트됩니다.

## 예시

### 기본 예시

패키지 `pkg-a`, `pkg-b`, `pkg-c`가 있다고 가정합니다. `pkg-a`와 `pkg-b`만 링크되어 있으며, 설정은 다음과 같습니다.

```json
{
  "linked": [["pkg-a", "pkg-b"]]
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
* `pkg-b`: `1.1.0`
* `pkg-c`: `2.0.0`

3. changeset: `pkg-b (minor)` → 릴리스 결과

* `pkg-a`: `1.2.0`
* `pkg-b`: `1.3.0`
* `pkg-c`: `2.0.0`

4. changeset: 모든 패키지에 patch → 릴리스 결과

* `pkg-a`: `1.3.1`
* `pkg-b`: `1.3.1`
* `pkg-c`: `2.0.1`

### 의존성 있는 예시

`pkg-a`, `pkg-b`가 있으며 둘 다 링크되어 있고, `pkg-a`는 `pkg-b`에 의존합니다.

```json
{
  "linked": [["pkg-a", "pkg-b"]]
}
```

초기 상태:

* `pkg-a`: `1.0.0`
* `pkg-b`: `1.0.0`

1. changeset: `pkg-b (major)` → 릴리스 결과

* `pkg-a`: `2.0.0`
* `pkg-b`: `2.0.0`

2. changeset: `pkg-a (major)` → 릴리스 결과

* `pkg-a`: `3.0.0`
* `pkg-b`: `2.0.0`

## glob 표현식 사용

모노레포에서 여러 패키지를 링크할 때 패키지 목록을 계속 수정하는 대신 glob 표현식을 사용할 수 있습니다.

예시:

```json
{
  "linked": [["pkg-*"]]
}
```

이 설정은 이름이 `pkg-`로 시작하는 모든 패키지를 매칭합니다.

> glob 표현식은 [micromatch](https://www.npmjs.com/package/micromatch) 형식을 따라야 합니다.
