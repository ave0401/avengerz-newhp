// src/pages/api/contact.ts
export const prerender = false; // APIルートはSSR（サーバーサイド実行）必須

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  // 必須チェック（簡易）
  if (!data.name || !data.email || !data.message) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  // MicroCMSへPOST送信
  const microcmsResponse = await fetch(
    `https://${
      import.meta.env.MICROCMS_SERVICE_DOMAIN
    }.microcms.io/api/v1/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": import.meta.env.MICROCMS_API_KEY,
      },
      body: JSON.stringify(data),
    }
  );

  if (microcmsResponse.ok) {
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ message: "Failed to send to MicroCMS" }),
      { status: 500 }
    );
  }
};
