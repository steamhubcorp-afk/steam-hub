import React, { useState } from 'react';
import { Upload, Plus, Trash, Database } from 'lucide-react';

const AdminUpload = () => {
    // Initial State Structure
    const initialFormState = {
        name: '',
        steam_id: '',
        images: {
            logo: '',
            banner: '',
            main: ''
        },
        platform: 'PC',
        developer: '',
        description: '',
        about: '',
        systemRequirements: {
            minimum: { os: '', processor: '', memory: '', graphics: '', storage: '' },
            recommended: { os: '', processor: '', memory: '', graphics: '', storage: '' }
        },
        price: 0,
        isEnabled: true
    };

    const [formData, setFormData] = useState(initialFormState);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle Nested Objects (images, systemRequirements)
        if (name.includes('.')) {
            const parts = name.split('.');
            if (parts.length === 2) {
                // e.g. images.logo
                setFormData(prev => ({
                    ...prev,
                    [parts[0]]: { ...prev[parts[0]], [parts[1]]: value }
                }));
            } else if (parts.length === 3) {
                // e.g. systemRequirements.minimum.os
                setFormData(prev => ({
                    ...prev,
                    [parts[0]]: {
                        ...prev[parts[0]],
                        [parts[1]]: { ...prev[parts[0]][parts[1]], [parts[2]]: value }
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Uploading to database...' });

        try {
            // Sending as array as per user's backend requirement
            const payload = [formData];

            const response = await fetch('https://7705bdd3e13c.ngrok-free.app/api/admin/upload-games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: `Success! Processed ${data.successCount} game(s).` });
                // Optional: Clear form or keep for next upload
            } else {
                setStatus({ type: 'error', message: data.message || 'Upload failed.' });
            }
        } catch (error) {
            console.error('Upload Error:', error);
            setStatus({ type: 'error', message: 'Network error or server unreachable.' });
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-gray-200 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-[#1e1e1e] p-8 rounded-xl border border-zinc-800 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 border-b border-zinc-700 pb-4">
                    <Database className="text-[#FF5F1F]" size={32} />
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Admin Game Upload</h1>
                </div>

                {status.message && (
                    <div className={`p-4 rounded mb-6 text-sm font-bold ${status.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-700' : status.type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-blue-900/50 text-blue-200 border border-blue-700'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Game Name *</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" placeholder="e.g. Battlefield 2042" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Steam ID (Unique)</label>
                            <input type="text" name="steam_id" value={formData.steam_id} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" placeholder="Optional identifier" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Developer</label>
                            <input type="text" name="developer" value={formData.developer} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Platform</label>
                            <input type="text" name="platform" value={formData.platform} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" />
                        </div>
                    </div>

                    {/* Image URLs */}
                    <div className="space-y-4 border-t border-zinc-800 pt-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><Upload size={18} /> Images (URLs)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Logo</label>
                                <input type="text" name="images.logo" value={formData.images.logo} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-2 text-sm" placeholder="https://..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Banner</label>
                                <input type="text" name="images.banner" value={formData.images.banner} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-2 text-sm" placeholder="https://..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Main Cover</label>
                                <input type="text" name="images.main" value={formData.images.main} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-2 text-sm" placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 border-t border-zinc-800 pt-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Short Description</label>
                            <textarea name="description" rows="2" value={formData.description} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">About (Long Description)</label>
                            <textarea name="about" rows="4" value={formData.about} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" />
                        </div>
                    </div>

                    {/* System Requirements */}
                    <div className="space-y-4 border-t border-zinc-800 pt-6">
                        <h3 className="text-lg font-bold text-white">System Requirements</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Minimum */}
                            <div className="space-y-3 p-4 bg-[#151515] rounded-lg">
                                <h4 className="text-[#FF5F1F] font-bold uppercase text-sm mb-2">Minimum</h4>
                                {Object.keys(formData.systemRequirements.minimum).map(key => (
                                    <div key={`min-${key}`} className="flex flex-col">
                                        <label className="text-[10px] uppercase text-gray-500">{key}</label>
                                        <input
                                            type="text"
                                            name={`systemRequirements.minimum.${key}`}
                                            value={formData.systemRequirements.minimum[key]}
                                            onChange={handleInputChange}
                                            className="bg-[#121212] border border-zinc-700 rounded px-2 py-1 text-sm focus:border-[#FF5F1F] outline-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Recommended */}
                            <div className="space-y-3 p-4 bg-[#151515] rounded-lg">
                                <h4 className="text-[#FF5F1F] font-bold uppercase text-sm mb-2">Recommended</h4>
                                {Object.keys(formData.systemRequirements.recommended).map(key => (
                                    <div key={`rec-${key}`} className="flex flex-col">
                                        <label className="text-[10px] uppercase text-gray-500">{key}</label>
                                        <input
                                            type="text"
                                            name={`systemRequirements.recommended.${key}`}
                                            value={formData.systemRequirements.recommended[key]}
                                            onChange={handleInputChange}
                                            className="bg-[#121212] border border-zinc-700 rounded px-2 py-1 text-sm focus:border-[#FF5F1F] outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex gap-8 border-t border-zinc-800 pt-6">
                        <div className="space-y-2 w-1/3">
                            <label className="text-xs uppercase font-bold text-gray-500">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-[#121212] border border-zinc-700 rounded p-3 text-white focus:border-[#FF5F1F] outline-none" />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                name="isEnabled"
                                checked={formData.isEnabled}
                                onChange={handleInputChange}
                                className="w-5 h-5 accent-[#FF5F1F]"
                            />
                            <label className="text-sm font-bold text-white">Enabled / Visible</label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#FF5F1F] hover:bg-[#d63a00] text-white font-bold uppercase tracking-wider py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-500/20">
                        Upload Game
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AdminUpload;
