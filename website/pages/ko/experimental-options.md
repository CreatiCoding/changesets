# 실험적 옵션 (Experimental Options)

모든 실험적 옵션은 `config.json` 파일의 `___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH` 항목 아래에 설정됩니다.

> **주의:** 실험적 옵션은 신중하게 사용해야 하며, 릴리스 노트를 꼭 확인하세요. 이 옵션들은 패치 버전에서 변경될 수 있습니다.

## `updateInternalDependents` (타입: `'out-of-range' | 'always'`)

기본값: `out-of-range`

변경 대상 패키지 외에도 **의존 패키지**를 자동으로 릴리스 목록에 추가하고, patch 버전으로 업데이트할 때 사용합니다.

* `out-of-range`: 의존 패키지가 버전 범위를 벗어난 경우에만 추가
* `always`: 항상 추가

## `onlyUpdatePeerDependentsWhenOutOfRange` (타입: `boolean`)

기본값: `false`

`true`로 설정하면 Changesets는 `peerDependencies`가 정의된 범위를 벗어나는 경우에만 **peer dependents** 패키지를 업데이트합니다.
