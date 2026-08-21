import React from 'react';
import { Shield, Users, UserCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminRoles() {
  const { users, updateUserRole, user } = useCMS();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Staff & Role Administration</h1>
          <p className="text-xs text-slate-400">Manage administrative privileges and staff user accounts</p>
        </div>
      </div>

      <div className="glass-card bg-[#0F172A] border border-slate-800 rounded-3xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Staff Team Members & Role Assignments ({users.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((u) => (
            <div key={u.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40" />
                <div>
                  <h3 className="font-bold text-white text-sm">{u.name}</h3>
                  <p className="text-xs text-slate-400">{u.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Role Privilege</label>
                <select
                  value={u.role}
                  onChange={(e) => updateUserRole(u.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-blue-400"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Business Manager">Business Manager</option>
                  <option value="Support Lead">Support Lead</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
