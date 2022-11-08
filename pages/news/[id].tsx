import {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { getAllNewsIds, getNewsData } from "../../lib/news";
import { createTitle } from "../../lib/title";
import Date from "../../components/date";
import { ButtonTweetThisPage } from "../../components/ButtonTweetThisPage";
import { ButtonCopyLink } from "../../components/ButtonCopyLink";

export default function NewsPage({
  newsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mx-auto max-w-3xl pt-12">
      <Head>
        <title>{createTitle(newsData.title)}</title>
      </Head>

      <article className="flex flex-col gap-10">
        <div className="flex flex-col text-gray-500">
          <p>{newsData.category}</p>
          <Date dateString={newsData.date} />
        </div>
        <h1 className="text-4xl font-bold leading-normal">{newsData.title}</h1>
        <img src={newsData.thumbnail} alt="" className="rounded-lg shadow-lg" />
        <div
          dangerouslySetInnerHTML={{ __html: newsData.contentHtml }}
          className="prose prose-xl prose-cyan text-lg prose-a:font-normal prose-a:no-underline"
        />
      </article>

      <hr className="my-10" />

      <div className="mb-20 flex gap-4">
        <ButtonTweetThisPage />
        <ButtonCopyLink />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllNewsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const newsData = await getNewsData(params?.id as string);
  return {
    props: {
      newsData,
    },
  };
};
