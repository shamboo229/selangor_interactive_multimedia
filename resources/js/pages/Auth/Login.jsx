import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b0f1a] p-4 transition-colors duration-500">
            <Head title="Admin Access" />

            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black uppercase tracking-tighter dark:text-white">SIM <span className="text-red-600">PORTAL</span></h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Authentication Required</p>
                </div>

                {status && <div className="mb-4 text-[10px] font-black text-green-600 uppercase tracking-widest text-center">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase ml-2 text-slate-400">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full mt-2 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white outline-none focus:ring-2 focus:ring-red-600 transition-all"
                            required
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-bold mt-2 ml-2">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase ml-2 text-slate-400">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full mt-2 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white outline-none focus:ring-2 focus:ring-red-600 transition-all"
                            required
                        />
                        {errors.password && <p className="text-[10px] text-red-500 font-bold mt-2 ml-2">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all active:scale-95"
                    >
                        {processing ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}
