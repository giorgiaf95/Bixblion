import type { Book } from './mockData';
import type { OpenLibraryBook } from '@/services/openLibrary';
import { openLibraryService } from '@/services/openLibrary';

export function mapOpenLibraryToBook(olBook: OpenLibraryBook): Partial<Book> {
  return {
    // Campi obbligatori mappati
    id: olBook.key,
    title: olBook.title,
    author: olBook.author_name?.join(', ') || 'Unknown',
    cover: olBook.cover_id 
      ? openLibraryService.getCoverUrl(olBook.cover_id) 
      : 'https://via.placeholder.com/300x450?text=No+Cover',
    rating: 0, // L'utente lo darà dopo
    pages: olBook.page_count || 0,
    genre: (olBook.subject || []).slice(0, 5),
    tags: [],
    status: 'to-read' as const,
    dateAdded: new Date().toISOString().split('T')[0],
    
    // Campi opzionali da Open Library
    isbn: olBook.isbn?.[0],
    year: olBook.first_publish_year,
    language: 'Italiano', // Puoi rilevarlo se disponibile
    openLibraryKey: olBook.key,
    openLibraryCoverId: olBook.cover_id,
    subjects: olBook.subject?.slice(0, 10),
    source: 'openLibrary' as const,
  };
}
