import React, { useState, useMemo } from 'react';
import { Search, Play, Tv, Info, X, ShieldCheck, Zap, Globe, Heart, Share2, MessageCircle, Phone as WhatsApp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';

const channelData = [
    { id: '1', name: 'T SPORTS', cat: 'Sports' },
    { id: '105', name: 'A SPORTS HD', cat: 'Sports' },
    { id: '85', name: 'ALJAZEERA HD', cat: 'English' },
    { id: '35', name: 'AND FLIX HD', cat: 'English' },
    { id: '5', name: 'AND PICTURES HD', cat: 'Hindi' },
    { id: '41', name: 'AND PRIVE HD', cat: 'English' },
    { id: '80', name: 'ATN BANGLA', cat: 'Bangla' },
    { id: '95', name: 'ATN NEWS', cat: 'Bangla' },
    { id: '82', name: 'CHANNEL 24', cat: 'Bangla' },
    { id: '81', name: 'CHANNEL I', cat: 'Bangla' },
    { id: '12', name: 'COLORS BANGLA HD', cat: 'Bangla' },
    { id: '4', name: 'COLORS HD', cat: 'Hindi' },
    { id: '22', name: 'DISCOVERY HD', cat: 'English' },
    { id: '68', name: 'DURANTA TV', cat: 'Kids' },
    { id: '56', name: 'GTV', cat: 'Bangla' },
    { id: '75', name: 'SOMOY TV', cat: 'Bangla' },
    { id: '71', name: 'EKATTOR TV', cat: 'Bangla' },
    { id: '103', name: 'MADANI TV', cat: 'Islamic' },
    { id: '311', name: 'PEACE TV', cat: 'Islamic' },
    { id: '312', name: 'MAKKAH LIVE', cat: 'Islamic' }
];

export default function App() {
    const [selectedChannel, setSelectedChannel] = useState(channelData[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const categories = useMemo(() => ['All', ...Array.from(new Set(channelData.map(c => c.cat)))], []);
    const filteredChannels = useMemo(() => channelData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) && (activeCategory === 'All' || c.cat === activeCategory)), [searchQuery, activeCategory]);

    const handleShare = async () => {
        try {
            await navigator.share({ title: 'RStv Premium', url: window.location.href });
        } catch (err) {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied!');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30">
            <Toaster position="top-center" theme="dark" richColors />
            
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <Tv className="w-5 h-5 text-black" />
                    </div>
                    <h1 className="text-xl font-black tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">RStv Premium</h1>
                </div>
                <button onClick={() => setIsInfoOpen(true)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <Info className="w-5 h-5 text-[#D4AF37]" />
                </button>
            </header>

            <main className="pt-20 pb-24 px-4 max-w-7xl mx-auto space-y-8">
                {/* Player Section */}
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl group">
                    <iframe 
                        src={`http://103.144.89.251/player.php?stream=${selectedChannel.id}`} 
                        className="w-full h-full" 
                        allowFullScreen 
                        title="Player"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        Live Now: {selectedChannel.name}
                    </div>
                </div>

                {/* Search & Categories */}
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input 
                            type="text" 
                            placeholder="Search channels..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Channel Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredChannels.map(channel => (
                        <button 
                            key={channel.id} 
                            onClick={() => {
                                setSelectedChannel(channel);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`p-4 rounded-[1.5rem] border transition-all duration-500 group ${selectedChannel.id === channel.id ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 ${selectedChannel.id === channel.id ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37]'}`}>
                                <Tv className="w-6 h-6" />
                            </div>
                            <p className="text-[11px] font-bold truncate text-center">{channel.name}</p>
                            <p className="text-[9px] text-white/30 text-center mt-1 uppercase tracking-tighter">{channel.cat}</p>
                        </button>
                    ))}
                </div>
            </main>

            {/* Info Modal */}
            <AnimatePresence>
                {isInfoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-md bg-[#121212] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden"
                        >
                            <button onClick={() => setIsInfoOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5"><X className="w-5 h-5" /></button>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] flex items-center justify-center"><Tv className="w-8 h-8 text-black" /></div>
                                    <div>
                                        <h2 className="text-2xl font-black">RStv Premium</h2>
                                        <p className="text-white/40 text-xs uppercase tracking-widest">v2.0.0 Stable</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <Zap className="w-5 h-5 text-[#D4AF37] mb-2" />
                                        <p className="text-[10px] font-bold uppercase text-white/40">Performance</p>
                                        <p className="text-xs font-bold">Ultra Fast</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
                                        <p className="text-[10px] font-bold uppercase text-white/40">Security</p>
                                        <p className="text-xs font-bold">Encrypted</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={handleShare} className="flex-1 py-4 rounded-2xl bg-white text-black font-bold text-xs flex items-center justify-center gap-2"><Share2 className="w-4 h-4" /> Share App</button>
                                    <a href="https://wa.me/8801338810296" target="_blank" className="flex-1 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /> Support</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="fixed bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-black to-transparent text-center">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Developed by Saidur Rahman</p>
            </footer>
        </div>
    );
}
