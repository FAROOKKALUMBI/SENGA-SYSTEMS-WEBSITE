import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminVacancies() {
  const { vacancies, addVacancy, deleteVacancy, user } = useCMS();
  const canDelete = user?.roleCode === 'SYSTEM_ADMIN';
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Software Engineering',
    type: 'Full-Time',
    location: 'Mzuzu / Remote',
    deadline: '2026-09-30',
    description: '',
    requirements: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqsArray = formData.requirements ? formData.requirements.split(',').map(r => r.trim()) : [];
    await addVacancy({ ...formData, requirements: reqsArray });
    setShowCreate(false);
    setFormData({
      title: '',
      department: 'Software Engineering',
      type: 'Full-Time',
      location: 'Mzuzu / Remote',
      deadline: '2026-09-30',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">Talent & Recruitment Module</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-[#2563EB]" />
            <span>Careers & Vacancies Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Post job openings, update department vacancies, and receive applications.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showCreate ? 'Close Form' : 'Post New Vacancy'}</span>
        </button>
      </div>

      {/* CREATE VACANCY FORM */}
      {showCreate && (
        <div className="bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-900">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">Post Open Position</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Full-Stack Engineer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Department</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Operations"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Job Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 uppercase mb-1">Deadline Date</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Job Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Overview of duties..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase mb-1">Requirements (Comma separated)</label>
              <input
                type="text"
                placeholder="e.g. 3+ yrs React, Node.js experience, Degree in CS"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-sm shadow-md"
              >
                Publish Job Vacancy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VACANCIES LISTING */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900">Active Job Vacancies ({vacancies.length})</h2>
          <span className="text-xs font-extrabold text-[#2563EB]">Accepting Applications</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vacancies.map((job) => (
            <div key={job.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] font-black text-[10px] uppercase">
                    {job.department}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-500">{job.type}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900">{job.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{job.description}</p>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-1">
                  <span>📍 {job.location}</span>
                  <span>⏳ Deadline: {job.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">Status: {job.status || 'ACTIVE'}</span>
                {canDelete && <button
                  onClick={() => deleteVacancy(job.id)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                  title="Remove Vacancy"
                >
                  <Trash2 className="w-4 h-4" />
                </button>}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
