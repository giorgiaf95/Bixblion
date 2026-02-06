import { useState } from "react";
import { Search, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const categories = [
  { id: "trending", label: "Di tendenza", icon: TrendingUp },
  { id: "new", label: "Novità", icon: Sparkles },
  { id: "classic", label: "Classici", icon: BookOpen },
];

const curated = [
  {
    title: "Libri che cambiano la vita",
    description: "Selezionati dalla community",
    gradient: "from-primary/20 to-accent/20",
    books: mockBooks.slice(0, 4),
  },
  {
    title: "Autori emergenti 2026",
    description: "Scopri nuovi talenti",
    gradient: "from-accent/20 to-rose-soft/20",
    books: mockBooks.slice(2, 6),
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");

  return (
    <div className="container py-6 md:py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Esplora</h1>
        <p className="text-sm text-muted-foreground mt-1">Scopri nuovi mondi da leggere</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca libri, autori, generi..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-card transition-all text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "bg-card text-foreground border border-border hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Curated Lists */}
      {curated.map((list, idx) => (
        <motion.section
          key={list.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15 }}
        >
          <div className={`rounded-2xl bg-gradient-to-br ${list.gradient} p-6 md:p-8`}>
            <h2 className="font-display text-xl font-bold text-foreground">{list.title}</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-5">{list.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {list.books.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
          </div>
        </motion.section>
      ))}

      {/* All Books Grid */}
      <section>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Tutti i libri</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
