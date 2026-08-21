import React, { useState } from 'react';
import { Plus, Briefcase, Trash2, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminVacancies() {
  const { vacancies, addVacancy, deleteVacancy } = useCMS();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Software Engineering',
    location: 'Lilongwe (Hybrid)',
    type: 'Full-time',
    deadline: '2026-09-30',
    description: '',
    requirements: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqArray = formData.requirements.split(',').map(r => r.trim()).filter(Boolean);
    await addVacancy({ ...formData, requirements: reqArray });
    setShowForm(false);
    setFormData({
      title: '',
      department: 'Software Engineering',
      location: 'Lilongwe (Hybrid)',
      type: 'Full-time',
      deadline: '2026-09-30',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Vacancies & Recruitment Manager</h1>
          <p className="text-xs text-slate-400">Post job openings and manage career opportunities</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Post New Vacancy'}</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card bg-[#0F172A] border border-blue-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white">Create New Job Vacancy</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Cybersecurity Threat Analyst"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="SengaShield Security">SengaShield Security</option>
                  <option value="ICT Infrastructure">ICT Infrastructure</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Business Operations">Business Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lilongwe / Blantyre / Remote"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Job Description</label>
              <textarea
                rows="3"
                required
                placeholder="Key role responsibilities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Requirements (Comma Separated)</label>
              <input
                type="text"
                required
                placeholder="e.g. 3+ years PyTorch, CISSP certified, React Native"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Publish Vacancy
            </button>
          </form>
        </div>
      )}

      {/* VACANCIES LIST */}
      <div className="glass-card bg-[#0F172A] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Active Job Vacancies ({vacancies.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vacancies.map((v) => (
            <div key={v.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-300 font-mono text-[10px] uppercase font-bold">{v.department}</span>
                  <span className="text-[11px] text-slate-400 font-mono">Deadline: {v.deadline}</span>
                </div>
                <h3 className="font-bold text-white text-base">{v.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{v.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {v.location}</span>
                <button
                  onClick={() => deleteVacancy(v.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Remove Vacancy"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
