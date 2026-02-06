import { useState } from "react";
import { Search, Users, TrendingUp, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { CommunityCard } from "@/components/CommunityCard";
import { mockCommunities } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "Tutte" },
  { id: "joined", label: "Iscritto" },
  { id: "popular", label: "Popolari" },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = mockCommunities.filter(c => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.description.toLowerCase().includes(q)) return false;
    }
    if (activeTab === "joined") return c.isJoined;
    if (activeTab === "popular") return c.members > 3000;
    return true;
  });

  return (
    <div className="container py-6 md:py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Community</h1>
          <p className="text-sm text-muted-foreground mt-1">Unisciti a gruppi di lettori appassionati</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Crea gruppo</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">3</span>
          <span className="text-muted-foreground">gruppi iscritti</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="font-medium text-foreground">24.567</span>
          <span className="text-muted-foreground">lettori attivi</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cerca community..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommunities.map((community, i) => (
          <CommunityCard key={community.id} community={community} index={i} />
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Nessuna community trovata</p>
        </div>
      )}
    </div>
  );
};

export default Community;
