// app/market/[slug]/page.tsx
export default async function MarketDetail({ params }: { params: { slug: string } }) {
  // 这里的 slug 变量，就是未来自动生成的无数个长尾网址
  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          SEO Target ID: {params.slug}
        </h1>
        <p className="text-gray-500">
          This is an automated landing page. Specific market data and SEO keywords will be injected here.
        </p>
      </div>
    </main>
  );
}