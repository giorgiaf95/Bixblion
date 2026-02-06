import { Link } from "react-router-dom";
import { BookOpen, Compass, Users, Trophy, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { BookCard } from "@/components/BookCard";
import { ChallengeCard } from "@/components/ChallengeCard";
import { mockBooks, mockChallenges } from "@/lib/mockData";

const stats = [
  { label: "Libri letti", value: "34", icon: BookOpen, color: "bg-primary/10 text-primary" },
  { label: "In lettura", value: "2", icon: TrendingUp, color: "bg-accent/10 text-accent" },
  { label: "Pagine", value: "6.780", icon: BookOpen, color: "bg-rose-soft/10 text-rose-soft" },
];

const Index = () => {
  const currentlyReading = mockBooks.filter(b => b.status === 'reading');
  const recentBooks = mockBooks.slice(0, 6);

  return (
    <div className="container py-6 md:py-10 space-y-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 md:p-10"
      >
        <div className="relative z-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Bentornato, <span className="text-primary">Lettore</span> 📚
          </h1>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Hai letto 6.780 pagine quest'anno. Continua così per completare la sfida Pagine d'Oro!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 mt-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-card"
                >
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
      </motion.section>

      {/* Currently Reading */}
      {currentlyReading.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">In lettura</h2>
            <Link to="/library?status=reading" className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Vedi tutti <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentlyReading.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Active Challenges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" /> Le tue sfide
          </h2>
          <Link to="/challenges" className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Tutte le sfide <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockChallenges.slice(0, 2).map((challenge, i) => (
            <ChallengeCard key={challenge.id} challenge={challenge} index={i} />
          ))}
        </div>
      </section>

      {/* Recent Library */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-foreground">La tua libreria</h2>
          <Link to="/library" className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Vedi tutto <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: "/explore", icon: Compass, label: "Esplora nuovi libri", color: "bg-primary/10 text-primary" },
          { to: "/community", icon: Users, label: "Community", color: "bg-accent/10 text-accent" },
          { to: "/challenges", icon: Trophy, label: "Sfide attive", color: "bg-rose-soft/10 text-rose-soft" },
          { to: "/library", icon: BookOpen, label: "La tua libreria", color: "bg-purple-soft/10 text-purple-soft" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <Link
                to={item.to}
                className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`p-2.5 rounded-lg ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default Index;
