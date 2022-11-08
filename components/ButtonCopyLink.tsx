import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ButtonCopyLink() {
  const router = useRouter();

  const [origin, setOrigin] = useState("");

  // ブラウザでのみ実行されるところ
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = `${origin}${router.asPath}`;

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        alert("URLをコピーしました: " + url);
      }}
    >
      <Image src="/linkbutton.svg" alt="Tweet" width={27} height={27} />
    </button>
  );
}
