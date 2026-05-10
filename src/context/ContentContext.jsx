import { createContext, useState } from "react";
import { initialPosts } from "../data/content"; // ✅ FIXED PATH

export const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  // ADD POST
  const addPost = (post) => {
    setPosts((prev) => [...prev, post]);
  };

  // UPDATE POST
  const updatePost = (updated) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // DELETE POST
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ContentContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}