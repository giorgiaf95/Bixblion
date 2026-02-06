import { useState, useMemo } from "react";
import { Search, Grid3X3, List, SlidersHorizontal, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookCard } from "@/components/BookCard";
import { mockBooks, allGenres, allTags, type Book } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";
type SortBy = "title" | "author" | "rating" | "dateAdded" | "pages";
type StatusFilter = "all" | Book["status"];

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "reading", label: "In lettura" },
  { value: "read", label: "Letti" },
  { value: "to-read", label: "Da leggere" },
  { value: "abandoned", label: "Abbandonati" },
];

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "dateAdded", label: "Data aggiunta" },
  { value: "title", label: "Titolo" },
  { value: "author", label: "Autore" },
  { value: "rating", label: "Valutazione" },
  { value: "pages", label: "Pagine" },
];

const Library = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("dateAdded");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    let books = [...mockBooks];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      books = books.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    // Status
    if (statusFilter !== "all") {
      books = books.filter(b => b.status === statusFilter);
    }

    // Genres
    if (selectedGenres.length > 0) {
      books = books.filter(b => b.genre.some(g => selectedGenres.includes(g)));
    }

    // Tags
    if (selectedTags.length > 0) {
      books = books.filter(b => b.tags.some(t => selectedTags.includes(t)));
    }

    // Sort
    books.sort((a, b) => {
      switch (sortBy) {
        case "title": return a.title.localeCompare(b.title);
        case "author": return a.author.localeCompare(b.author);
        case "rating": return b.rating - a.rating;
        case "pages": return b.pages - a.pages;
        case "dateAdded": return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default: return 0;
      }
    });

    return books;
  }, [searchQuery, statusFilter, selectedGenres, selectedTags, sortBy]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const activeFilterCount = (statusFilter !== "all" ? 1 : 0) + selectedGenres.length + selectedTags.length;

  return (
    <div className="container py-6 md:py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">La tua libreria</h1>
          <p className="text-sm text-muted-foreground mt-1">{mockBooks.length} libri nella tua collezione</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Aggiungi</span>
        </button>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cerca per titolo o autore..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
              showFilters || activeFilterCount > 0
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:bg-secondary"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtri
            {activeFilterCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-primary-foreground text-primary text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className="px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2.5 transition-colors", viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2.5 transition-colors", viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-card border border-border p-5 space-y-4">
              {/* Status */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stato</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {statusOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setStatusFilter(opt.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        statusFilter === opt.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Generi</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allGenres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        selectedGenres.includes(genre)
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tag</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setStatusFilter("all"); setSelectedGenres([]); setSelectedTags([]); }}
                  className="text-xs text-destructive font-medium hover:underline"
                >
                  Rimuovi tutti i filtri
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Books */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            : "space-y-3"
        )}
      >
        {filteredBooks.map((book, i) => (
          <BookCard key={book.id} book={book} index={i} variant={viewMode} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Nessun libro trovato</p>
          <p className="text-sm text-muted-foreground mt-1">Prova a modificare i filtri o la ricerca</p>
        </div>
      )}
    </div>
  );
};

export default Library;
