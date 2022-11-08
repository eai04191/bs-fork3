import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import { overrideTailwindClasses } from "tailwind-override";

function NoteHeading({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  // https://stackoverflow.com/a/59685929/20315280
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={overrideTailwindClasses(
        clsx(
          "flex flex-col items-start gap-4",
          "after:h-1 after:w-12 after:bg-pink-400 after:content-['']",
          level === 1 &&
            "flex-row items-center text-4xl font-bold after:w-full after:flex-1",
          level === 2 && "text-3xl font-normal"
        )
      )}
    >
      {children}
    </Tag>
  );
}

function NoteBody({ children }: { children: React.ReactNode }) {
  return <p className="text-lg first-letter:ml-4">{children}</p>;
}

function Note({
  title,
  children,
  nowrap = false,
}: {
  title: string;
  children: React.ReactNode;
  nowrap?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <NoteHeading level={2}>{title}</NoteHeading>
      {nowrap ? children : <NoteBody>{children}</NoteBody>}
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx("text-theme-cyan hover:underline")}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div>
      <Image
        src="/bg.webp"
        width={1920}
        height={1080}
        alt=""
        quality={100}
        className="mx-auto h-[25vw] object-cover"
      />

      <div className="container mx-auto mt-4 flex max-w-5xl flex-col gap-8">
        <NoteHeading level={1}>HOME</NoteHeading>

        <Note title="Blue Scriptureへようこそ、先生！">
          BlueScriptureはYostarによるスマートフォン向けゲーム「ブルーアーカイブ（ブルアカ）」の情報を集積・発信しているファンサイトです。
        </Note>

        <Note title="Contact">
          当サイトはあんふぃとらいとが制作・運営しております。ご用の際は
          <ExternalLink href="https://twitter.com/Amphitrite632">
            Twitter
          </ExternalLink>
          またはメール(amphie@amphitrite632.com)までお願いします。
        </Note>

        <Note title="ご支援について" nowrap>
          <NoteBody>
            当サイトは非営利目的のため広告の掲載等は行っていませんが、ソフトウェアやサーバの契約の維持など、運営にはそれなりの経費がかかっているのも事実です。
          </NoteBody>
          <NoteBody>
            そこで当サイトでは、
            <ExternalLink href="https://ko-fi.com/amphitrite632">
              Ko-fi
            </ExternalLink>
            での支援を受け付けております。月ごとの支援に加えて一回限りの支援も可能ですので、もし当サイトが役に立ったと感じたらご支援いただければ幸いです。
          </NoteBody>
        </Note>

        <Note title="ロードマップ">
          現在はさらなる機能の充実化に向けて開発を進めています。当サイトの開発の具体的な進捗状況は
          <a
            href="https://github.com/Amphitrite632/BlueScripture"
            target="_blank"
          >
            GitHub
          </a>
          からご確認いただけます。
        </Note>

        <Note title="更新履歴" nowrap>
          <ol className="flex list-none flex-col gap-1 text-lg">
            <li>2022/11/07: Ver1.1.0&quot;Flourite&quot;公開</li>
            <li>2022/09/21: Ver1.0.2&quot;Ruby&quot;公開</li>
            <li>2022/09/20: Ver1.0.1&quot;Ruby&quot;公開</li>
            <li>2022/09/18: Ver1.0.0&quot;Ruby&quot;公開</li>
            <li>2022/08/05: Ver0.9.0&quot;Emerald&quot;公開</li>
            <li>2022/08/04: Ver0.9.0&quot;Sapphire&quot;公開</li>
            <li>2022/08/03: 開発開始</li>
          </ol>
        </Note>
      </div>
    </div>
  );
}
