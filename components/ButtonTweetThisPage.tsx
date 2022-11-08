import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ButtonTweetThisPage() {
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [title, setTitle] = useState("");

  // ブラウザでのみ実行されるところ
  useEffect(() => {
    setOrigin(window.location.origin);
    setTitle(document.title);
  }, []);

  const url = `${origin}${router.asPath}`;

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${title} ${url}`
      )}`}
      target="_blank"
      rel="noopener"
    >
      <Image src="/tweetbutton.svg" alt="Tweet" width={27} height={27} />
    </a>
  );
}
