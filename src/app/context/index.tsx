"use client";

import axios from "axios";
import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ISearchResults {
  items: Record<string, any>[];
  total_count: number;
}
interface IBookmark {
  results: ISearchResults;
  bookmarks: Record<string, any>[];
  error: string;
  onFetchRepos: (value: string) => void;
  onHandleBookmark: (item: Record<string, any>) => void;
}

const BookmarkContext = createContext<IBookmark>({
  results: { items: [], total_count: 0 },
  bookmarks: [],
  error: "",
  onFetchRepos: () => {},
  onHandleBookmark: () => {},
});

export const BookmarkProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [results, setResults] = useState<ISearchResults>({
    items: [],
    total_count: 0,
  });
  const [bookmarks, setBookmarks] = useState<Record<string, any>[]>([]);
  const [error, setError] = useState("");

  const onFetchRepos = (value: string) => {
    axios
      .get(`https://api.github.com/search/repositories?q=${value}`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onHandleBookmark = (record: Record<string, any>) => {
    const isBookmarked = bookmarks.find((item) => item.id === record.id);
    if (isBookmarked) {
      const filteredBooksmarks = bookmarks.filter(
        (item) => item.id !== record.id
      );
      setBookmarks(filteredBooksmarks);
      localStorage.setItem("bookmarks", JSON.stringify(filteredBooksmarks));
    } else {
      setBookmarks((prevItems) => [...prevItems, { ...record }]);
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([...bookmarks, { ...record }])
      );
    }
  };

  useEffect(() => {
    const persistedBookmarks = localStorage.getItem("bookmarks");
    if (persistedBookmarks) {
      setBookmarks(JSON.parse(persistedBookmarks));
    }
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        results,
        bookmarks,
        error,
        onFetchRepos,
        onHandleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  return useContext(BookmarkContext);
};
