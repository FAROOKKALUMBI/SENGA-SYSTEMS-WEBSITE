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
      
      {/* Top Banner Header with Improved High-Contrast Wording */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">System Security & Governance</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-[#2563EB]" />
            <span>User Management & Role Permissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Oversee corporate team accounts, manage role-based security clearance, and configure staff access levels.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Staff Account</span>
        </button>
      </div>

      {/* REGISTERED USERS MANAGEMENT TABLE */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Registered System Accounts ({filteredUsers.length})</h2>
            <p className="text-xs text-slate-600">System Administrators can update permissions in real time.</p>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search user name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-700 uppercase font-black text-[11px] tracking-wider bg-slate-100/70">
                <th className="py-3.5 px-4">User Details</th>
                <th className="py-3.5 px-4">Title / Position</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || '/farook_avatar.jpg'}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover border border-blue-400"
                      />
                      <div>
                        <span className="font-extrabold text-slate-900 block">{u.name}</span>
                        <span className="text-[11px] font-medium text-slate-600">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-800 font-extrabold">{u.title || 'Staff Member'}</td>
                  <td className="py-4 px-4">
                    <select
                      value={u.roleCode || 'SYSTEM_ADMIN'}
                      onChange={(e) => updateUserRole(u.id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-[#2563EB] font-black text-xs focus:outline-none cursor-pointer shadow-xs"
                    >
                      {systemRoles.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                      {u.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-700 font-bold font-mono">{u.lastLogin || 'Recent'}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-[11px] text-[#2563EB] font-black">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CREATE USER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Create Staff Account</h3>
              <p className="text-xs text-slate-600">Assign a role and permissions to the new employee.</p>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Banda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@sengasystems.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Assign Role *</label>
                <select
                  value={formData.roleCode}
                  onChange={(e) => setFormData({ ...formData, roleCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                >
                  {systemRoles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-sm shadow-md"
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
