import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import externalLinks from "remark-external-links";

const newsDirectory = path.join(process.cwd(), "data", "news");

export type NewsMatter = {
    title: string;
    date: string;
    thumbnail: string;
    category: string;
};

export type News = {
    contentHtml: string;
} & NewsMatter;

export function getSortedNewsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(newsDirectory);
    const allNewsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(newsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...(matterResult.data as NewsMatter),
        };
    });
    // Sort posts by date
    return allNewsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllNewsIds() {
    const fileNames = fs.readdirSync(newsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getNewsData(id: string): Promise<News> {
    const fullPath = path.join(newsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(externalLinks)
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        // id,
        contentHtml,
        ...(matterResult.data as NewsMatter),
    };
}
