import React, { useState } from 'react';
import { Handshake, Plus, Search, Building } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminPartners() {
  const { partners } = useCMS();
  const [partnerList, setPartnerList] = useState(partners || []);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">Strategic Ecosystem</span>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2.5">
            <Handshake className="w-7 h-7 text-[#2563EB]" />
            <span>Partners & Alliances Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage corporate partners, cloud technology alliances, and showcase partner logos.
          </p>
        </div>

        <button className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all shrink-0">
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerList.map(pt => (
            <div key={pt.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{pt.name}</h3>
                  <span className="text-xs text-blue-400 font-semibold">{pt.category}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">{pt.status}</span>
                <span className="text-slate-400">Verified Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

