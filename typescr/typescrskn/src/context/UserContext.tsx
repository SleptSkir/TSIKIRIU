import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

//usertype
export type User = {
  id: number;
  nickname: string;
  email: string;
  role: "commissioner" | "artist";
  artistLink?: string;
  token: string;
};


type Favorite = number; //commsid

interface UserContextType {
  user: User | null;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  favorites: Favorite[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

type LoginData = { email: string; password: string };
export type RegisterData = {
  nickname: string;
  email: string;
  password: string;
  role: "commissioner" | "artist";
  artistLink?: string;
};


const UserContext = createContext<UserContextType>({} as any);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    fetch("http://localhost:4000/api/favorites", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => res.json())
      .then(favs => setFavorites(favs))
      .catch(() => setFavorites([]));
  }, [user]);

  const login = async (data: LoginData) => {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const u = await res.json();
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData) => {
    const res = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const u = await res.json();
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
  };

  const toggleFavorite = async (id: number) => {
    if (!user) return;
    let newFavs: Favorite[];
    if (favorites.includes(id)) {
      await fetch(`http://localhost:4000/api/favorites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      newFavs = favorites.filter(f => f !== id);
    } else {
      await fetch("http://localhost:4000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ artworkId: id }),
      });
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <UserContext.Provider value={{ user, login, register, logout, favorites, toggleFavorite, isFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
