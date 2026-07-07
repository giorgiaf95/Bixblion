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
  searchBooks: async (query: string, limit = 20): Promise<OpenLibrarySearchResult> => {
    try {
      const response = await axios.get(`${OPEN_LIBRARY_API}/search.json`, {
        params: { q: query, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Open Library search error:', error);
      return { docs: [], numFound: 0 };
    }
  },

  getCoverUrl: (coverId: number, size = 'M'): string => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  },
};
