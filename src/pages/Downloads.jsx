import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/api/entities";
import { Download } from "@/api/entities";
import { Product } from "@/api/entities";
import { Download as DownloadIcon, Calendar, AlertCircle, CheckCircle } from "lucide-react";

export default function Downloads() {
  const [user, setUser] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const userData = await User.me();
      setUser(userData);

      const userDownloads = await Download.filter({ customer_email: userData.email });
      setDownloads(userDownloads);

      // Load product details
      const productIds = [...new Set(userDownloads.map(d => d.product_id))];
      const productsData = {};
      for (const id of productIds) {
        try {
          const product = await Product.filter({ id });
          if (product && product.length > 0) {
            productsData[id] = product[0];
          }
        } catch (error) {
          console.error("Error loading product:", id, error);
        }
      }
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading downloads:", error);
      window.location.href = "/login";
    }
  };

  const handleDownload = async (download) => {
    if (!download.is_active) {
      alert("לינק ההורדה אינו פעיל יותר");
      return;
    }

    if (download.downloads_count >= download.max_downloads) {
      alert("מיצית את מספר ההורדות המקסימלי");
      return;
    }

    try {
      // Update download count
      await Download.update(download.id, {
        ...download,
        downloads_count: download.downloads_count + 1
      });

      // Get product and download
      const product = products[download.product_id];
      if (product && product.digital_file_url) {
        window.open(product.digital_file_url, '_blank');
      }

      loadDownloads();
    } catch (error) {
      console.error("Error downloading:", error);
      alert("שגיאה בהורדה. נסה שוב.");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('he-IL');
  };

  const isExpired = (dateStr) => {
    return new Date(dateStr) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">המוצרים שלי - הורדות</h1>
            <p className="text-[#233071]">גש למוצרים הדיגיטליים שרכשת והורד אותם</p>
          </div>

          {downloads.length > 0 ? (
            <div className="grid gap-6">
              {downloads.map(download => {
                const product = products[download.product_id];
                const expired = isExpired(download.expiry_date);
                const maxedOut = download.downloads_count >= download.max_downloads;
                const canDownload = download.is_active && !expired && !maxedOut;

                return (
                  <Card key={download.id} className={!canDownload ? 'opacity-60' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{product?.title || 'מוצר דיגיטלי'}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            {product?.short_description || 'אין תיאור זמין'}
                          </p>
                        </div>
                        {canDownload ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-500 mb-1">מצב הורדות</p>
                          <p className="font-semibold">
                            {download.downloads_count} / {download.max_downloads}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-500 mb-1">תוקף עד</p>
                          <p className="font-semibold flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(download.expiry_date)}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-500 mb-1">סטטוס</p>
                          <p className="font-semibold">
                            {canDownload ? (
                              <span className="text-green-600">זמין להורדה</span>
                            ) : expired ? (
                              <span className="text-red-600">פג תוקף</span>
                            ) : maxedOut ? (
                              <span className="text-orange-500">מוצה</span>
                            ) : (
                              <span className="text-[#233071]">לא פעיל</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {expired && (
                        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                          <p className="text-sm text-red-700">
                            לינק ההורדה פג תוקף. אנא צור קשר לתמיכה.
                          </p>
                        </div>
                      )}

                      {maxedOut && !expired && (
                        <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-4">
                          <p className="text-sm text-orange-700">
                            מיצית את מספר ההורדות המקסימלי. אנא צור קשר לתמיכה.
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={() => handleDownload(download)}
                        disabled={!canDownload}
                        className="w-full"
                      >
                        <DownloadIcon className="h-4 w-4 ml-2" />
                        {canDownload ? 'הורד עכשיו' : 'לא זמין'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <DownloadIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#233071] mb-2">
                  אין מוצרים להורדה
                </h3>
                <p className="text-gray-500 mb-6">
                  המוצרים הדיגיטליים שתרכוש יופיעו כאן
                </p>
                <Button onClick={() => window.location.href = '/shop'}>
                  עבור לחנות
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}