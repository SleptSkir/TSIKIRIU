import React, { useState, useCallback } from "react";

interface Commission {
  image: string;
  title: string;
  link: string;
  price: string;
}

const CommissionCard: React.FC<{ commission: Commission }> = ({ commission }) => {
  const match = commission.link.match(/\/([^\/?#]+)(?:[\/?#]|$)/);
  const username = match ? match[1] : commission.link;

  return (
    <div className="border rounded-none overflow-hidden shadow-sm group hover:shadow-lg transition cursor-pointer">
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={commission.image}
          alt={commission.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-base mb-1 truncate">{commission.title}</h3>
        <p className="text-blue-600 text-sm mb-2 truncate">
          <a href={commission.link} target="_blank" rel="noopener noreferrer">
            @{username}
          </a>
        </p>
        <div className="text-right font-medium text-sm">{commission.price}円</div>
      </div>
    </div>
  );
};

const Drawings: React.FC = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Commission>({ image: "", title: "", link: "", price: "" });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setForm(prev => ({ ...prev, image: url }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleAdd = useCallback(() => {
    if (!form.image || !form.title || !form.price) return;
    setCommissions(prev => [...prev, form]);
    setForm({ image: "", title: "", link: "", price: "" });
    setIsModalOpen(false);
  }, [form]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">コミッション</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-none"
        >
          追加
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-none w-full max-w-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">新しいコミッション</h3>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="画像のURL（または下にドラッグ＆ドロップ）"
              className="w-full border px-3 py-2 rounded-none mb-4"
            />

            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-none flex items-center justify-center mb-4"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {form.image ? (
                <img
                  src={form.image}
                  alt="プレビュー"
                  className="max-h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">ここに画像をドロップ</span>
              )}
            </div>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="アートカテゴリ"
              className="w-full border px-3 py-2 rounded-none mb-3"
            />
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="アーティストURL"
              className="w-full border px-3 py-2 rounded-none mb-3"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="価格"
              className="w-full border px-3 py-2 rounded-none"
            />
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-none border"
              >
                キャンセル
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-none bg-blue-500 text-white"
              >
                追加
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {commissions.map((c, i) => (
          <div key={i} onClick={() => setPreviewImage(c.image)}>
            <CommissionCard commission={c} />
          </div>
        ))}
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="プレビュー"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Drawings;
