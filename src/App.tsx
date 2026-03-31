import React, { useState, useMemo } from 'react';
import { Search, Tv, Info, X, ShieldCheck, Zap, Share2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';

const channelData = [
    { id: '1', name: 'T SPORTS', cat: 'Sports' },
    { id: '105', name: 'A SPORTS HD', cat: 'Sports' },
    { id: '85', name: 'ALJAZEERA HD', cat: 'English' },
    { id: '35', name: 'AND FLIX HD', cat: 'English' },
    { id: '80', name: 'ATN BANGLA', cat: 'Bangla' },
    { id: '82', name: 'CHANNEL 24', cat: 'Bangla' },
    { id: '81', name: 'CHANNEL I', cat: 'Bangla' },
    { id: '56', name: 'GTV', cat: 'Bangla' },
    { id: '75', name: 'SOMOY TV', cat: 'Bangla' },
    { id: '71', name: 'EKATTOR TV', cat: 'Bangla' },
    { id: '103', name: 'MADANI TV', cat: 'Islamic' }
];

export default function App() {
    const [selectedChannel, setSelectedChannel] = useState(channelData[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const categories = useMemo(() => ['All', ...Array.from(new Set(channelData.map(c => c.cat)))], []);
    const filteredChannels = useMemo(() => channelData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) && (activeCategory === 'All' || c.cat === activeCategory)), [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" theme="dark" />
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-black text-[#D4AF37]">RStv Premium</h1>
                <button onClick={() => setIsInfoOpen(true)} className="p-2 rounded-full bg-white/5"><Info className="w-5 h-5 text-[#D4AF37]" /></button>
            </header>
            <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-8">
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black border border-white/10">
                    <iframe src={`http://103.144.89.251/player.php?stream=${selectedChannel.id}`} className="w-full h-full" allowFullScreen />
                </div>
                <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-3 rounded-xl bg-white/5 border border-white/10" />
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs ${activeCategory === cat ? 'bg-[#D4AF37] text-black' : 'bg-white/5'}`}>{cat}</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredChannels.map(channel => (
                        <button key={channel.id} onClick={() => setSelectedChannel(channel)} className={`p-4 rounded-2xl border ${selectedChannel.id === channel.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-white/5'}`}>
                            <Tv className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
                            <p className="text-xs font-bold truncate">{channel.name}</p>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}
