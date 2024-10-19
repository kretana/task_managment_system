import React, { useState } from 'react';
import {User} from "../types/authTypes";


interface UserFilterProps {
    users: User[];
    onFilterChange: (selectedUsers: string[]) => void;
}

export const UserFilter: React.FC<UserFilterProps> = ({ users, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleUser = (userId: string) => {
        const updatedUsers = selectedUsers.includes(userId)
            ? selectedUsers.filter(id => id !== userId)
            : [...selectedUsers, userId];
        setSelectedUsers(updatedUsers);
        onFilterChange(updatedUsers);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-64">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <span>{selectedUsers.length ? `${selectedUsers.length} selected` : 'Select users'}</span>
                <span className="ml-2 text-gray-400">▼</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <div className="px-4 py-2">
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className="py-1 overflow-auto max-h-60" role="listbox">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                onClick={() => toggleUser(user.id)}
                            >
                                <div className="flex items-center justify-center w-5 h-5 mr-3 border rounded">
                                    {selectedUsers.includes(user.id) && (
                                        <span className="text-indigo-600">✓</span>
                                    )}
                                </div>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
