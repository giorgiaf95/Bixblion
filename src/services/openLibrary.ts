import axios from 'axios';

const OPEN_LIBRARY_API = 'https://openlibrary.org/api';

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_id?: number;
  isbn?: string[];
  first_publish_year?: number;
  page_count?: number;
  subject?: string[];
}

export interface OpenLibrarySearchResult {
  docs: OpenLibraryBook[];
  numFound: number;
}

export const openLibraryService = {
  // Cerca libri per titolo/autore
  searchBooks: async (query: string, limit = 20): Promise<OpenLibrarySearchResult> => {
    const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
      params: {
        q: query,
        limit,
      },
    });
    return response.data;
  },

  // Recupera dettagli di un libro per ISBN
  getByISBN: async (isbn: string) => {
    const response = await axios.get(`${OPEN_LIBRARY_API}/books.json`, {
      params: {
        bibkeys: `ISBN:${isbn}`,
        format: 'json',
        jscmd: 'details',
      },
    });
    return response.data;
  },

  // Ottieni copertina
  getCoverUrl: (coverId: number, size = 'M'): string => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  },
};
