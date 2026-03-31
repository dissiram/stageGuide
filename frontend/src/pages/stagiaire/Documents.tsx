import React, { useState } from 'react';
import { FileText, Download, Upload, Check, Clock, AlertCircle, Eye } from 'lucide-react';

const Documents: React.FC = () => {
  const [conventions] = useState([
    { id: 1, company: 'TechCorp', startDate: '01/04/2026', endDate: '30/09/2026', status: 'signed_student', signedStudent: true, signedCompany: false, signedMentor: false },
    { id: 2, company: 'InnovateLab', startDate: '15/03/2026', endDate: '15/06/2026', status: 'completed', signedStudent: true, signedCompany: true, signedMentor: true },
  ]);

  const [documents] = useState([
    { id: 1, name: 'Convention de stage - TechCorp.pdf', type: 'convention', date: '20/03/2026', size: '245 KB' },
    { id: 2, name: 'Attestation de stage - InnovateLab.pdf', type: 'attestation', date: '15/03/2026', size: '180 KB' },
    { id: 3, name: 'Certificat React Avancé.pdf', type: 'certificat', date: '10/03/2026', size: '320 KB' },
    { id: 4, name: 'CV_Marie_Dupont_2026.pdf', type: 'cv', date: '05/03/2026', size: '150 KB' },
    { id: 5, name: 'Lettre de motivation - TechCorp.pdf', type: 'lettre', date: '01/03/2026', size: '95 KB' },
  ]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return { label: 'Brouillon', color: 'bg-gray-100 text-gray-600' };
      case 'pending': return { label: 'En attente', color: 'bg-amber-100 text-amber-700' };
      case 'signed_student': return { label: 'Signée (étudiant)', color: 'bg-blue-100 text-blue-700' };
      case 'signed_company': return { label: 'Signée (entreprise)', color: 'bg-purple-100 text-purple-700' };
      case 'completed': return { label: 'Complétée', color: 'bg-green-100 text-green-700' };
      default: return { label: status, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'convention': return <FileText size={16} className="text-blue-500" />;
      case 'attestation': return <Check size={16} className="text-green-500" />;
      case 'certificat': return <FileText size={16} className="text-amber-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2463]">Documents</h1>
          <p className="text-gray-500 text-sm mt-1">Conventions, attestations et certificats</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
          <Upload size={16} /> Importer
        </button>
      </div>

      {/* Conventions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-[#0A2463] mb-4">Conventions de stage</h2>
        <div className="space-y-4">
          {conventions.map(c => {
            const status = getStatusLabel(c.status);
            return (
              <div key={c.id} className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#0A2463]">{c.company}</h3>
                    <p className="text-xs text-gray-500">{c.startDate} - {c.endDate}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex items-center gap-6">
                  {[
                    { label: 'Étudiant', signed: c.signedStudent },
                    { label: 'Entreprise', signed: c.signedCompany },
                    { label: 'Mentor', signed: c.signedMentor },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.signed ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {s.signed ? <Check size={14} className="text-white" /> : <Clock size={14} className="text-gray-400" />}
                      </div>
                      <span className="text-xs text-gray-600">{s.label}</span>
                    </div>
                  ))}
                </div>
                {!c.signedStudent && (
                  <button className="mt-3 bg-[#3E7BFA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2D6AE0] transition-colors">
                    Signer la convention
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-[#0A2463] mb-4">Tous les documents</h2>
        <div className="space-y-2">
          {documents.map(d => (
            <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                {getTypeIcon(d.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{d.name}</p>
                <p className="text-xs text-gray-400">{d.date} - {d.size}</p>
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><Eye size={16} /></button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><Download size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
