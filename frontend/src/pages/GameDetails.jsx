import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock, Check, Shield, Monitor, Cpu, HardDrive, Zap, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import FloatingCartButton from '../components/FloatingCartButton';

const GameDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState('minimum');

    // Enhanced dummy data structure
    const defaultGame = {
        id: id,
        title: "Battlefield 2042",
        desc: "A first-person shooter that marks the return to the iconic all-out warfare of the franchise.",
        image: "https://placehold.co/1920x1080/202020/FFFFFF/png?text=BATTLEFIELD+2042",
        price: "₹2,999",
        about: "Battlefield™ 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise. In a near-future world transformed by disorder, adapt and overcome dynamically-changing battlegrounds with the help of your squad and a cutting-edge arsenal. With support for 128 players, Battlefield™ 2042 brings unprecedented scale on vast battlegrounds. Players will take on several experiences comprising elevated versions of Conquest and Breakthrough, Battlefield™ Hazard Zone and a game space driven by the community, Battlefield™ Portal.",
        features: ["Multiplayer", "Co-op", "Controller Support", "Single Player", "4K Ultra HD"],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "AMD Ryzen 5 1600, Core i5 6600K",
                memory: "8 GB RAM",
                graphics: "AMD Radeon RX 560,NVIDIA GeForce GTX 1050 Ti",
                storage: "100 GB available space"
            },
            recommended: {
                os: "Windows 11 64-bit",
                processor: "AMD Ryzen 7 2700X, Intel Core i7 4790",
                memory: "16 GB RAM",
                graphics: "AMD Radeon RX 6600 XT, NVIDIA GeForce RTX 3060",
                storage: "100 GB SSD available space"
            }
        },
        legal: "© 2024 Electronic Arts Inc. Battlefield and Battlefield 2042 are trademarks of Electronic Arts Inc."
    };

    // Use location state if available, but merge with default for missing new fields if needed
    // For now, we'll primarily use the defaultGame to showcase the new UI if state lacks the new fields
    const game = { ...defaultGame, ...(location.state?.game || {}) };
    // Note: In a real app, you'd fetch the full details here based on ID.

    const pricingOptions = [
        { label: "7 Days", price: "₹10", value: "7 Days" },
        { label: "30 Days", price: "₹50", value: "30 Days" },
        { label: "Permanent", price: "₹300", value: "Permanent" },
    ];

    const handleAddToCart = (option) => {
        addToCart(game, option.value, option.price);
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white pt-24 pb-12 px-4 md:px-8 relative">
            <FloatingCartButton />
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8">

                {/* LEFT COLUMN: 70% */}
                <div className="lg:col-span-7 space-y-12">

                    {/* Hero Image Section */}
                    <div className="h-[50vh] lg:h-[80vh] rounded-2xl overflow-hidden shadow-2xl relative border border-zinc-800">
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />

                        <div className="absolute bottom-8 left-8">
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-2xl mb-4">
                                {game.title}
                            </h1>
                            <p className="text-xl text-gray-200 font-medium max-w-2xl drop-shadow-lg leading-relaxed">
                                {game.desc}
                            </p>
                        </div>
                    </div>

                    {/* About the Game */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold uppercase tracking-wide border-l-4 border-[#FF5F1F] pl-4">About the Game</h2>
                        <div className="text-gray-300 leading-relaxed text-lg space-y-4 bg-[#1a1a1a] p-8 rounded-xl border border-zinc-800">
                            <p>{game.about || defaultGame.about}</p>

                            {/* Features Tags */}
                            <div className="flex flex-wrap gap-3 pt-6">
                                {(game.features || defaultGame.features).map((feature, idx) => (
                                    <span key={idx} className="bg-zinc-800 text-gray-200 px-4 py-2 rounded-full text-sm font-medium border border-zinc-700 hover:border-[#FF5F1F] transition-colors cursor-default">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System Requirements */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold uppercase tracking-wide border-l-4 border-[#FF5F1F] pl-4">System Requirements</h2>

                            {/* Tabs */}
                            <div className="bg-[#1a1a1a] p-1 rounded-lg flex gap-1 border border-zinc-800">
                                {['minimum', 'recommended'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                                            ? 'bg-[#FF5F1F] text-white shadow-lg'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-zinc-800 transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* OS */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#FF5F1F]">
                                        <Monitor size={20} />
                                        <span className="font-bold uppercase text-sm">OS</span>
                                    </div>
                                    <p className="text-gray-300 border-b border-zinc-800 pb-2">{game.requirements?.[activeTab]?.os || defaultGame.requirements[activeTab].os}</p>
                                </div>

                                {/* Processor */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#FF5F1F]">
                                        <Cpu size={20} />
                                        <span className="font-bold uppercase text-sm">Processor</span>
                                    </div>
                                    <p className="text-gray-300 border-b border-zinc-800 pb-2">{game.requirements?.[activeTab]?.processor || defaultGame.requirements[activeTab].processor}</p>
                                </div>

                                {/* Memory */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#FF5F1F]">
                                        <Zap size={20} />
                                        <span className="font-bold uppercase text-sm">Memory</span>
                                    </div>
                                    <p className="text-gray-300 border-b border-zinc-800 pb-2">{game.requirements?.[activeTab]?.memory || defaultGame.requirements[activeTab].memory}</p>
                                </div>

                                {/* Storage */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#FF5F1F]">
                                        <HardDrive size={20} />
                                        <span className="font-bold uppercase text-sm">Storage</span>
                                    </div>
                                    <p className="text-gray-300 border-b border-zinc-800 pb-2">{game.requirements?.[activeTab]?.storage || defaultGame.requirements[activeTab].storage}</p>
                                </div>

                                {/* Graphics - Full Width on Mobile */}
                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center gap-2 text-[#FF5F1F]">
                                        <Shield size={20} />
                                        <span className="font-bold uppercase text-sm">Graphics</span>
                                    </div>
                                    <p className="text-gray-300 pt-1">{game.requirements?.[activeTab]?.graphics || defaultGame.requirements[activeTab].graphics}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: 30% (Sticky Side Panel) */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="sticky top-24 space-y-6">
                        {/* Game Info Card */}
                        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-zinc-800 shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <span className="bg-[#FF5F1F] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wide">
                                    Available Now
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Shield size={14} /> Official License
                                </span>
                            </div>

                            <div className="space-y-4 text-sm text-gray-400">
                                <p className="flex justify-between border-b border-zinc-800 pb-3">
                                    <span>Platform</span> <span className="text-white font-medium">PC (Steam/Epic)</span>
                                </p>
                                <p className="flex justify-between border-b border-zinc-800 pb-3">
                                    <span>Developer</span> <span className="text-white font-medium">Rockstar Games</span>
                                </p>
                                <p className="flex justify-between border-b border-zinc-800 pb-3">
                                    <span>Publisher</span> <span className="text-white font-medium">Electronic Arts</span>
                                </p>
                                <p className="flex justify-between pt-1">
                                    <span>Release Date</span> <span className="text-white font-medium">Oct 2024</span>
                                </p>
                            </div>
                        </div>

                        {/* Pricing Timeline Card */}
                        <div className="bg-[#202020] rounded-xl p-6 border-2 border-zinc-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-zinc-800 p-2 rounded-bl-xl text-zinc-500">
                                <Clock size={20} />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 text-white">Select Duration</h3>

                            <div className="space-y-4">
                                {pricingOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-[#151515] p-4 rounded-lg border border-zinc-700 hover:border-[#FF5F1F] transition-all duration-200 group cursor-pointer"
                                        onClick={() => handleAddToCart(option)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-lg text-white group-hover:text-[#FF5F1F] transition-colors">
                                                {option.label}
                                            </span>
                                            <span className="text-xs text-[#FF5F1F]">Instant Delivery</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="text-xl font-bold text-white">
                                                {option.price}
                                            </span>
                                            <div
                                                className="bg-zinc-800 group-hover:bg-[#FF5F1F] group-hover:text-white text-zinc-400 p-3 rounded-full transition-all duration-300 shadow-lg"
                                            >
                                                <ShoppingCart size={20} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-xs text-gray-500 mt-6">
                                *Prices are tailored for regional access.
                            </p>
                        </div>

                        {/* Legal / Report */}
                        <div className="text-xs text-zinc-600 space-y-4 text-center">
                            <p>{game.legal || defaultGame.legal}</p>
                            <div className="flex justify-center gap-4">
                                <button className="hover:text-white transition-colors">Privacy Policy</button>
                                <button className="hover:text-white transition-colors">Terms of Service</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
