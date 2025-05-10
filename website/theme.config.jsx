import { usePathname } from "next/navigation";
import { useRouter } from "nextra/hooks";
import { useConfig } from "nextra-theme-docs";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  logo: <span>🦋 changesets</span>,
  project: {
    link: "https://github.com/changesets/changesets",
  },
  docsRepositoryBase: "https://github.com/creaticoding/changesets/tree/main/website",
  chat: {
    icon: (
      <svg height={24} viewBox="0 0 24 24" width={24}>
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    ),
    link: "https://x.com/fe_reco",
  },
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://github.com/changesets/changesets" target="_blank">
          🦋 changesets
        </a>
        , website built by{" "}
        <a href="https://github.com/creaticoding/changesets" target="_blank">
          @creaticoding
        </a>
      </span>
    ),
  },
  i18n: [
    { locale: "ko", name: "한국어" },
    { locale: "en", name: "English" },
    { locale: "zh", name: "中文" },
  ],
  head: function useHead() {
    const config = useConfig();
    const { locale } = useRouter();

    const isZh = locale === "zh";
    const isKo = locale === "ko";
    const title = isZh
      ? `${config.title} – changesets 文档`
      : isKo
        ? `${config.title} – changesets 문서`
        : `${config.title} - changesets documentation`;
    const description = config.frontMatter.description
      ? config.frontMatter.description
      : isZh
        ? "🦋 管理 monorepo 的版本更新及变更历史的工具"
        : isKo
          ? "🦋 모노레포의 버전 업데이트 및 변경 이력을 관리하는 도구"
          : "🦋 A way to manage your versioning and changelogs with a focus on monorepos";
    const url = `https://changesets-docs.vercel.app${usePathname()}`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>"
        />
      </>
    );
  },
};
