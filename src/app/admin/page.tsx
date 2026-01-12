"use client";

import { useEffect, useState } from "react";

interface LandingPage {
  slug: string;
  title: string;
  template: string;
  campaign: string;
  channels: string[];
  generatedAt: string;
  seoTitle: string;
}

export default function AdminPage() {
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => {
        setPages(data.pages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch pages:", err);
        setLoading(false);
      });
  }, []);

  const filteredPages = pages.filter(
    (page) =>
      page.slug.toLowerCase().includes(filter.toLowerCase()) ||
      page.title.toLowerCase().includes(filter.toLowerCase()) ||
      page.template.toLowerCase().includes(filter.toLowerCase())
  );

  const baseUrl = "https://www.pomandi.com";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Landing Pages Admin
          </h1>
          <p className="text-gray-600 mb-4">
            Toplam {pages.length} landing page | Pomandi.com
          </p>

          <input
            type="text"
            placeholder="Ara... (slug, title, template)"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Yükleniyor...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Sayfa URL
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Template
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Channels
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPages.map((page, index) => (
                  <tr key={page.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900">
                          {page.slug}
                        </span>
                        <span className="text-xs text-gray-500">
                          {page.seoTitle}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {page.template}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {page.channels.slice(0, 3).map((channel) => (
                          <span
                            key={channel}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <a
                          href={`${baseUrl}/nl/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                        >
                          NL
                        </a>
                        <a
                          href={`${baseUrl}/fr/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          FR
                        </a>
                        <a
                          href={`${baseUrl}/en/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                        >
                          EN
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPages.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tüm URL'ler (Kopyalanabilir)
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            {filteredPages.map((page) => (
              <div key={page.slug} className="py-1">
                <a
                  href={`${baseUrl}/nl/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {baseUrl}/nl/{page.slug}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
