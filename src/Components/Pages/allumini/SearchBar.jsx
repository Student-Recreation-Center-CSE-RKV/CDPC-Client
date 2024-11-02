// SearchBar.js
import React from 'react';

const SearchBar = ({ onSearch, onFilterCompany, onFilterSalary }) => {
    return (
        <form className="max-w-md mx-auto mb-6">
            <div className="relative mb-4">
                <input
                    type="text"
                    onChange={(e) => onSearch(e.target.value)}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by name or company..."
                />
            </div>
            <div className="flex space-x-4">
                {/* Company Filter */}
                <select
                    onChange={(e) => onFilterCompany(e.target.value)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Companies</option>
                    <option value="Google">Google</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Microsoft">Microsoft</option>
                    {/* Add more options as needed */}
                </select>
                
                {/* Salary Filter */}
                <select
                    onChange={(e) => onFilterSalary(e.target.value)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Salaries</option>
                    <option value="50000">Up to $50,000</option>
                    <option value="100000">Up to $100,000</option>
                    <option value="150000">Up to $150,000</option>
                    {/* Add more salary ranges as needed */}
                </select>
            </div>
        </form>
    );
};

export default SearchBar;
