import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import clsx from "clsx";
import { getSortedNewsData } from "../../lib/news";
import Date from "../../components/date";
import { createTitle } from "../../lib/title";

function Category({ category }: { category: string }) {
  return (
    <div
      className={clsx(
        "w-fit rounded  p-2 px-3",
        category === "お知らせ" && "bg-green-400"
      )}
    >
      <span className="text-sm">{category}</span>
    </div>
  );
}

function NoNews() {
  return (
    <div className="my-20 flex flex-col items-center gap-12 text-gray-600">
      <pre className="text-6xl font-bold">:(</pre>
      <p className="text-center">該当するNEWSが見つかりませんでした</p>
    </div>
  );
}

export default function NewsIndexPage({
  allNewsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { q } = router.query;
  const query = q as string;
  const newsData = query
    ? allNewsData.filter((news) =>
        news.title.toLowerCase().includes(query.toLowerCase())
      )
    : allNewsData;

  return (
    <>
      <Head>
        <title>{createTitle("NEWS")}</title>
      </Head>
      <div className="sticky top-16 flex w-full justify-center bg-white bg-opacity-75 py-3 backdrop-blur-lg">
        <div className="container flex max-w-5xl items-center justify-between">
          <h1 className="text-2xl font-bold">NEWS</h1>
          <input
            type="search"
            className="w-40 bg-transparent p-2 transition-all duration-75 focus:w-80"
            placeholder="Search..."
            defaultValue={q as string}
            onChange={(e) => {
              router.push(`/news?q=${e.target.value}`);
            }}
          />
        </div>
      </div>

      <section className="container m-auto mt-8 max-w-5xl">
        <ul className="flex flex-col gap-12">
          {newsData.length === 0 ? (
            <NoNews />
          ) : (
            newsData.map(({ id, date, title, category, thumbnail }) => (
              <li
                className="overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl"
                key={id}
              >
                <Link href={`${router.asPath}/${id}`} className="flex bg-white">
                  <Image
                    src={thumbnail}
                    alt=""
                    width={640}
                    height={360}
                    quality={90}
                    className="object-cover"
                  />
                  <div className="flex flex-col gap-6 p-7">
                    <Category category={category} />
                    <p className="text-2xl font-medium">{title}</p>
                    <div className="mt-auto w-full text-right text-gray-500">
                      <Date dateString={date} />
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allNewsData = getSortedNewsData();
  return {
    props: {
      allNewsData,
    },
  };
}
