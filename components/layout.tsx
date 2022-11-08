import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Blue Scripture"
      width={214.44}
      height={64}
      className="h-[64px] w-auto"
    />
  );
}

function Header() {
  const headerItems = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
  ];
  return (
    <header className="sticky top-0 flex h-16 w-full justify-center bg-gray-800 shadow-lg">
      <div className="container flex max-w-5xl gap-8">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="flex items-center gap-8">
          {headerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex h-full items-center text-lg uppercase text-white transition-all duration-300 ease-in-out hover:text-theme-cyan"
            >
              <span className="bg-gradient-to-r from-theme-cyan to-theme-cyan bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 ease-out group-hover:bg-[length:100%_2px]">
                {item.label}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="sticky top-[100vh] mt-16 flex justify-center bg-gradient-to-br from-sky-600 to-blue-600 py-8">
      <div className="container flex flex-col items-center gap-2">
        <Logo />
        <p className="my-3 flex w-full justify-center gap-1 text-sm font-light text-white">
          <span>
            {process.env.NEXT_PUBLIC_APP_NAME} Ver
            {process.env.NEXT_PUBLIC_APP_VERSION} Flourite
          </span>
          <span>/</span>
          <span>Made with Love by Amphitrite632</span>
        </p>
      </div>
    </footer>
  );
}

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Head>
        <title>BlueScripture</title>
        <link rel="icon" href="/favicon.ico" />

        {/* テストサイトなのでインデックスさせない */}
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
