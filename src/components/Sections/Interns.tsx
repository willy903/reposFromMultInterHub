import React from 'react';
import { useState } from 'react';
import { Users, Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { mockInterns } from '../../data/mockData';
import InternDetailModal from '../Modals/InternDetailModal';

export default function Interns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showInternDetail, setShowInternDetail] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || intern.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(mockInterns.map(intern => intern.department))];

  const handleViewIntern = (intern: any) => {
    setSelectedIntern(intern);
    setShowInternDetail(true);
  };

  return (
    <div className="space-y-6 mt-0 md:mt-[90px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interns</h2>
          <p className="text-white-600 mt-1">Manage and track your intern workforce</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
          <Plus className="h-4 w-4" />
          <span>Ajoutée un stagiaire</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search interns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <option value="">Tous les départements</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Interns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterns.map((intern) => (
          <div key={intern.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={intern.avatar}
                  alt={intern.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{intern.name}</h3>
                  <p className="text-sm text-gray-600">{intern.department}</p>
                </div>
              </div>
              <button 
                onClick={() => alert(`Options for ${intern.name}`)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{intern.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${intern.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">{new Date(intern.startDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  intern.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {intern.status}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => handleViewIntern(intern)}
              className="w-full mt-4 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      {/* Intern Detail Modal */}
      <InternDetailModal 
        intern={selectedIntern}
        isOpen={showInternDetail}
        onClose={() => {
          setShowInternDetail(false);
          setSelectedIntern(null);
        }}
      />
    </div>
  );
}