import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Search, 
  UserPlus, 
  Key, 
  CheckCircle2, 
  X,
  Edit2,
  Trash2,
  Lock
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminRoles() {
  const { users, systemRoles, addUser, updateUserRole } = useCMS();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    roleCode: 'CONTENT_AUTHOR'
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const roleObj = systemRoles.find(r => r.id === formData.roleCode) || systemRoles[0];
    await addUser({
      name: formData.name,
      email: formData.email,
      title: formData.title || 'Staff Member',
      role: roleObj.name,
      roleCode: roleObj.id
    });
    setIsModalOpen(false);
    setFormData({ name: '', email: '', title: '', roleCode: 'CONTENT_AUTHOR' });
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">Access Control & Governance</span>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#2563EB]" />
            <span>Role-Based Access Control (RBAC)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage employee accounts, assign granular role permissions and oversee security policies.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Staff Account</span>
        </button>
      </div>

      {/* 10 RBAC SYSTEM ROLES REFERENCE MATRIX */}
      <section className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            <span>10 System Roles & Permission Matrix</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Enforced Access Levels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemRoles.map((role, idx) => (
            <div key={role.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 font-mono">#{idx + 1}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${role.badgeColor}`}>
                  {role.id}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{role.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{role.permissions}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTERED USERS MANAGEMENT TABLE */}
      <section className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Registered System Accounts ({filteredUsers.length})</h2>
            <p className="text-xs text-slate-400">System Administrators can update permissions in real time.</p>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search user name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-extrabold text-[11px] tracking-wider">
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Title / Position</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover border border-blue-500/40"
                      />
                      <div>
                        <span className="font-extrabold text-white block">{u.name}</span>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-semibold">{u.title || 'Staff Member'}</td>
                  <td className="py-4 px-4">
                    <select
                      value={u.roleCode || 'SYSTEM_ADMIN'}
                      onChange={(e) => updateUserRole(u.id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-blue-400 font-extrabold text-xs focus:outline-none cursor-pointer"
                    >
                      {systemRoles.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                      {u.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono">{u.lastLogin || 'Recent'}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-[11px] text-blue-400 font-extrabold">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CREATE USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">Create Staff Account</h3>
              <p className="text-xs text-slate-400">Assign a role and permissions to the new employee.</p>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Banda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@sengasystems.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Assign Role *</label>
                <select
                  value={formData.roleCode}
                  onChange={(e) => setFormData({ ...formData, roleCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                >
                  {systemRoles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm shadow-md"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
