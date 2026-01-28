"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const router = useRouter();

  async function handleCreate() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : null,
        max_views: views ? Number(views) : null
      })
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) return alert(data.error || "Failed");

    router.push(`/p/${data.id}`);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Pastebin Lite</h1>

      <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} cols={50} />
      <br /><br />

      TTL (seconds): <input value={ttl} onChange={e => setTtl(e.target.value)} /><br /><br />
      Max Views: <input value={views} onChange={e => setViews(e.target.value)} /><br /><br />

      <button onClick={handleCreate}>Create Paste</button>
    </main>
  );
}

