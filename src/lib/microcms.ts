// src/lib/microcms.ts
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ニュース一覧を取得する関数
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.get({ endpoint: "news", queries });
};

// 詳細を取得する関数
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail({
    endpoint: "news",
    contentId,
    queries,
  });
};
