# Changesets 확인하기

`@changesets/cli` 패키지를 사용하면 `status` 명령어로 changeset 상태를 확인할 수 있습니다. 자세한 사용 방법은 [@changesets/cli readme](https://github.com/changesets/changesets/tree/main/packages/cli#status)를 참고하세요.

또한 다음 도구들도 제공합니다.

* [Changeset GitHub Bot](https://github.com/apps/changeset-bot): changeset 누락 여부를 알림
* [Bitbucket Addon](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/build/bitbucket-release-addon/): Bitbucket에서도 동일 기능 제공

CI에서 changeset 누락 시 빌드를 실패시키고 싶다면 (권장하지 않음), 아래 명령어를 실행할 수 있습니다.

```sh
changeset status --since=main
```

변경된 changeset이 없으면 **status code 1**로 종료되어 빌드가 실패합니다.
