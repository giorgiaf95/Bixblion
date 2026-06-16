import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchBooks } from '@/hooks/useOpenLibrary';
import { openLibraryService } from '@/services/openLibrary';
import { mapOpenLibraryToBook } from '@/lib/bookMapper';

export function BookSearch() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useSearchBooks(query);

  const handleAddBook = (book: any) => {
    // Mappa il libro da Open Library al tuo formato
    const newBook = {
      id: book.key,
      title: book.title,
      author: book.author_name?.join(', ') || 'Unknown',
      cover: book.cover_id 
        ? openLibraryService.getCoverUrl(book.cover_id) 
        : 'https://via.placeholder.com/300x450?text=No+Cover',
      rating: 0,
      pages: book.page_count || 0,
      genre: book.subject?.slice(0, 3) || [],
      tags: [],
      status: 'want-to-read',
      isbn: book.isbn?.[0],
      year: book.first_publish_year,
      language: 'Italiano',
    };
    
    // Dispatch action per aggiungere il libro
    console.log('Libro aggiunto:', newBook);
  };

  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Cerca un libro..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p className="text-sm text-gray-500 mt-2">Caricamento...</p>}
      {error && <p className="text-sm text-red-500 mt-2">Errore nella ricerca</p>}

      <div className="mt-4 space-y-2">
        {data?.docs.map((book) => (
          <div key={book.key} className="flex gap-3 p-2 border rounded">
            {book.cover_id && (
              <img
                src={openLibraryService.getCoverUrl(book.cover_id, 'S')}
                alt={book.title}
                className="w-12 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{book.title}</h3>
              <p className="text-xs text-gray-600">{book.author_name?.join(', ')}</p>
              <Button 
                size="sm" 
                onClick={() => handleAddBook(book)}
                className="mt-1"
              >
                Aggiungi
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
