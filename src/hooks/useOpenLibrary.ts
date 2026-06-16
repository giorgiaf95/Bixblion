import { useQuery } from '@tanstack/react-query';
import { openLibraryService } from '@/services/openLibrary';

export const useSearchBooks = (query: string) => {
  return useQuery({
    queryKey: ['openLibrary', 'search', query],
    queryFn: () => openLibraryService.searchBooks(query),
    enabled: query.length > 2, // Cerca solo se > 2 caratteri
    staleTime: 1000 * 60 * 10, // Cache per 10 minuti
  });
};

export const useGetBookByISBN = (isbn: string) => {
  return useQuery({
    queryKey: ['openLibrary', 'isbn', isbn],
    queryFn: () => openLibraryService.getByISBN(isbn),
    enabled: !!isbn,
  });
};
