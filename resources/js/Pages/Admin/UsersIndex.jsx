import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function UsersIndex({ auth, initialUsers = [] }) {
    const [users] = useState(initialUsers.length ? initialUsers : [
        { id: 1, name: 'Admin Administrator', email: 'admin@sim.gov.my', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Ahmad Faiz', email: 'ahmad@sim.gov.my', role: 'Editor', status: 'Active' },
    ]);

    return (
        <AdminLayout auth={auth}>
            <Head title="Users - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Users & Roles</h1>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all">
                        + Add User
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-semibold">
                                <th className="p-4 pl-6">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 pl-6 font-bold text-slate-800">{user.name}</td>
                                    <td className="p-4 text-slate-600">{user.email}</td>
                                    <td className="p-4"><span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-bold">{user.role}</span></td>
                                    <td className="p-4"><span className="text-emerald-600 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{user.status}</span></td>
                                    <td className="p-4 pr-6 text-right">
                                        <button className="text-blue-600 hover:underline">Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
