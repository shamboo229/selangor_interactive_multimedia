<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notis Rasmi | Selangor Media</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 font-sans">

    <header class="bg-red-700 text-white py-6 shadow-xl">
        <div class="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <h1 class="font-black text-2xl tracking-tighter">WARTA SELANGOR</h1>
            <a href="/" class="text-xs border border-white/30 px-3 py-1 rounded hover:bg-white hover:text-red-700 transition">
                KEMBALI KE PORTAL MULTIMEDIA
            </a>
        </div>
    </header>

    <main class="max-w-4xl mx-auto my-12 px-4">
        <div class="bg-white p-8 md:p-12 rounded-2xl shadow-sm border-t-8 border-red-600">

            <span class="text-slate-400 font-bold text-xs uppercase tracking-widest">Diterbitkan pada: {{ $date }}</span>

            <h2 class="text-3xl font-black text-slate-800 mt-2 mb-6 uppercase leading-tight">
                {{ $title }}
            </h2>

            <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>{{ $content }}</p>

                <p>Semua jabatan kerajaan negeri akan ditutup pada tarikh tersebut. Sila layari aplikasi <strong>Selangor Media</strong> untuk info lanjut mengenai perkhidmatan dalam talian yang masih beroperasi.</p>
            </div>

            @php $isUrgent = true; @endphp

            @if($isUrgent)
                <div class="mt-10 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm italic">
                    <strong>Perhatian:</strong> Notis ini adalah muktamad dan tertakluk kepada arahan Setiausaha Kerajaan Negeri.
                </div>
            @endif

            <div class="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">J</div>
                <div>
                    <p class="font-bold text-slate-800 leading-none">Jabatan Penerangan Selangor</p>
                    <p class="text-xs text-slate-400 mt-1">Shah Alam, Darul Ehsan</p>
                </div>
            </div>
        </div>
    </main>

</body>
</html>
