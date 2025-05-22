import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function AuthPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState<{
    nickname: string;
    email: string;
    password: string;
    role: "commissioner" | "artist";
    artistLink: string;
  }>({
    nickname: "",
    email: "",
    password: "",
    role: "commissioner",
    artistLink: "",
  });

  const [error, setError] = useState("");
  const { login, register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      if (!form.nickname || !form.email || !form.password) {
        setError(language === "ja" ? "全ての項目を入力してください。" : "All fields are required.");
        return;
      }
      if (!emailRegex.test(form.email)) {
        setError(language === "ja" ? "メールの形式が正しくありません。" : "Invalid email format.");
        return;
      }
      if (form.role === "artist" && !form.artistLink) {
        setError(language === "ja" ? "アーティストはリンクを入力してください。" : "Artist link is required.");
        return;
      }
      const ok = await register(form);
      if (!ok) return setError(language === "ja" ? "登録エラー" : "Registration error");
      navigate("/");
    } else {
      if (!form.email || !form.password) {
        setError(language === "ja" ? "メールとパスワードは必須です。" : "Email and password are required.");
        return;
      }
      const ok = await login({ email: form.email, password: form.password });
      if (!ok) return setError(language === "ja" ? "メールかパスワードが間違っています。" : "Invalid email or password.");
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t.auth}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              placeholder={t.nicknamePlaceholder}
              className="border p-2 w-full"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="commissioner">{t.roleCommissioner}</option>
              <option value="artist">{t.roleArtist}</option>
            </select>
            {form.role === "artist" && (
              <input
                name="artistLink"
                value={form.artistLink}
                onChange={handleChange}
                placeholder={t.artistLinkPlaceholder}
                className="border p-2 w-full"
              />
            )}
          </>
        )}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-black text-white py-2 px-4 w-full">
          {isRegister ? t.register : t.login}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={() => setIsRegister(r => !r)} className="underline text-blue-600">
          {isRegister ? t.alreadyHaveAccount : t.noAccount}
        </button>
      </div>
    </div>
  );
}
