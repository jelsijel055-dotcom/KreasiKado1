import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback gift ideas if Gemini fails or is offline
const getFallbackRecommendations = (occasion: string, budgetRange: string) => {
  return [
    {
      id: 'fb-1',
      title: 'Aesthetic Memories Explosion Box & Polaroid',
      category: 'DIY Kreatif',
      estimatedCost: 'Rp 25.000 - Rp 45.000',
      estimatedCostNumber: 35000,
      description: 'Kotak kado lipat hexagonal berisi 6 cetak foto polaroid kenangan manis, pesan tersembunyi, dan permen kesukaannya.',
      whyItFits: 'Sangat personal, penuh kenangan sentimental, dan biaya bahan sangat ramah di kantong.',
      studentFriendlyTip: 'Bisa dicetak di tempat print foto digital dekat kampus seharga 1000/lembar, box bisa dibuat dari kertas karton pastel.',
      suggestedWrapping: 'Pita satin rose gold tipis dan segel lilin pink blush.',
      difficulty: '✂️ DIY 15 Menit',
    },
    {
      id: 'fb-2',
      title: 'Study & Coffee Relax Kit with Wooden Coaster',
      category: 'Hampers Siap Jadi',
      estimatedCost: 'Rp 65.000 - Rp 85.000',
      estimatedCostNumber: 79000,
      description: 'Perpaduan cangkir keramik pastel beraksen emas, sachet drip specialty coffee arabica, coaster kayu alami, dan korek api kayu estetik.',
      whyItFits: 'Paling berguna untuk teman yang sering begadang nugas skripsi atau kerja kelompok.',
      studentFriendlyTip: 'Beli cangkir dan artisan coffee terpisah lalu bungkus pakai box karton die-cut.',
      suggestedWrapping: 'Kertas samson aesthetic rustic dengan tali rami & dried baby breath.',
      difficulty: '🌸 Siap Kirim',
    },
    {
      id: 'fb-3',
      title: 'Scented Soy Candle & Custom Spotify Barcode Plaque',
      category: 'Hadiah Personal',
      estimatedCost: 'Rp 50.000 - Rp 95.000',
      estimatedCostNumber: 75000,
      description: 'Lilin aromaterapi kedelai wangi Vanilla & Peony dengan label personal, dilengkapi akrilik mini ber-barcode lagu kenangan Spotify kalian.',
      whyItFits: 'Memberikan suasana menenangkan dan sentuhan lagu yang mengingatkan momen kalian bersama.',
      studentFriendlyTip: 'Bisa buat playlist Spotify gratis dan print barcode aesthetic di kertas tebal.',
      suggestedWrapping: 'Box ivory pastel dengan pita rose gold mewah.',
      difficulty: '✨ Sangat Personal',
    },
    {
      id: 'fb-4',
      title: 'Snack Bouquet Mini & Pesan Surat Gulung',
      category: 'DIY Kreatif',
      estimatedCost: 'Rp 20.000 - Rp 35.000',
      estimatedCostNumber: 25000,
      description: 'Buket mungil berisi cokelat atau camilan favoritnya, dihias kertas celophane pink lembut dan surat gulung berisi ucapan tulus.',
      whyItFits: 'Simpel, manis, dan langsung dinikmati saat hari kelulusan atau perayaan.',
      studentFriendlyTip: 'Beli jajanan di minimarket dekat kosan, pakai tusuk sate dan pita satin.',
      suggestedWrapping: 'Kertas wrap celophane transparan pink dengan pita satin blush.',
      difficulty: '🟢 Super Praktis',
    },
    {
      id: 'fb-5',
      title: 'Voucher "Traktir Kopi & Nugas Bareng"',
      category: 'Pengalaman & Kebersamaan',
      estimatedCost: 'Rp 30.000 - Rp 50.000',
      estimatedCostNumber: 40000,
      description: 'Kupon buatan tangan estetik yang bisa ia tukarkan kapan saja untuk kamu traktir segelas es kopi susu kekinian sambil ngobrol santai.',
      whyItFits: 'Terkadang kado terbaik adalah waktu dan perhatian tulus yang kita luangkan bersama.',
      studentFriendlyTip: 'Cetak tiket voucher menggunakan template Canva gratis bergaya boarding pass kado.',
      suggestedWrapping: 'Amplop pastel berstempel lilin emas wax seal.',
      difficulty: '✨ Sangat Personal',
    },
  ];
};

// Fallback greeting card generator
const getFallbackGreeting = (
  recipientName: string,
  senderName: string,
  occasion: string,
  tone: string
) => {
  if (tone === 'humorous') {
    return {
      headline: `Happy ${occasion}, ${recipientName || 'Temanku'}! 🎉`,
      message: `Selamat ya! Semoga semakin berkah, makin glowing, dan yang paling penting: tugas/skripsi segera kelar tanpa drama! Kado ini dipilih dengan sepenuh hati (dan sisa dompet mahasiswa) khusus buat kamu. Jangan lupa traktirannya ya!`,
      quote: `"Persahabatan sejati adalah saat kamu tetap sayang walau temenmu rada absurd."`,
      psMessage: `P.S. Kadonya wajib difoto dan dipamerin di IG story ya! 🎁✨`,
      cardTheme: 'pastel-pink',
    };
  }

  if (tone === 'poetic') {
    return {
      headline: `Untuk ${recipientName || 'Sosok Tersayang'} 🌸`,
      message: `Di setiap lembar hari yang kamu lalui, semoga kebahagiaan selalu menemukan jalan menuju hatimu. Terima kasih telah hadir dengan ketulusan dan senyum yang selalu menghangatkan. Semoga langkahmu ke depan senantiasa bertabur kemudahan dan cinta.`,
      quote: `"Hal terindah dalam hidup bukanlah seberapa banyak yang kita miliki, melainkan kehadiran jiwa yang membuat segalanya terasa berharga."`,
      psMessage: `P.S. Semoga kado kecil ini membawa sepercik senyum di harimu yang indah.`,
      cardTheme: 'rose-gold',
    };
  }

  // Sweet / Heartfelt default
  return {
    headline: `Selamat Merayakan Hari Bahagiamu, ${recipientName || 'Sahabat'}! 💗`,
    message: `Selamat ${occasion}! Semoga di momen berharga ini semua doa terbaikmu didengar semesta. Terima kasih sudah menjadi teman terbaik yang selalu ada di suka maupun duka. Semoga hadiah kecil ini bisa menambah kebahagiaan di hari istimewamu!`,
    quote: `"Hadiah terindah adalah kebersamaan dan kenangan manis yang kita rajut bersama."`,
    psMessage: `P.S. Bangga banget sama semua pencapaian dan prosesmu sampai saat ini!`,
    cardTheme: 'rose-gold',
  };
};

// API: Rekomendasi Hadiah dengan Gemini
app.post('/api/recommend-gifts', async (req, res) => {
  try {
    const { recipient, occasion, budgetRange, budgetMax, hobbies, vibe, notes } = req.body;

    const prompt = `Kamu adalah konsultan ahli hadiah kreatif dari aplikasi "KreasiKado" (rekomendasi kado ramah kantong, unik, banyak pilihan, dan berkesan untuk mahasiswa, pelajar, dan umum).
Berikan 5-6 rekomendasi ide hadiah yang SANGAT BERVARIASI, spesifik, dan kreatif berdasarkan data berikut:
- Penerima: ${recipient || 'Teman / Sahabat'}
- Momen: ${occasion || 'Ulang Tahun'}
- Kategori Anggaran: ${budgetRange || 'Mahasiswa / Hemat'} (Maksimal sekitar Rp ${budgetMax ? budgetMax.toLocaleString('id-ID') : '100.000'})
- Hobi / Minat: ${hobbies && hobbies.length > 0 ? hobbies.join(', ') : 'Umum / Menyenangkan'}
- Vibe / Suasana: ${vibe || 'Estetik & Elegan'}
- Catatan Khusus: ${notes || 'Tidak ada'}

Instruksi Khusus untuk Variasi Pilihan:
1. Berikan setidaknya:
   - 1 ide DIY Kreatif super hemat buatan sendiri (< Rp 30.000)
   - 2 ide Kado Fungsional bermanfaat harian (alat tulis estetik, tumbler, mug, lilin aroma)
   - 1 ide Kado Sentimental / Nostalgia (polaroid, playlist music, buku kenangan)
   - 1 ide Hampers Siap Kirim
   - 1 ide Pengalaman / Traktiran Seru
2. Pastikan harganya realistis di Indonesia dalam mata uang Rupiah.
3. Sertakan "difficulty" (salah satu dari: "🟢 Super Praktis", "✂️ DIY 15 Menit", "🌸 Siap Kirim", atau "✨ Sangat Personal").
4. Sertakan "studentFriendlyTip" (cara hemat atau alternatif murah) dan "suggestedWrapping" (kombinasi warna bungkus, pita satin, wax seal stamp).

Kembalikan jawaban DALAM FORMAT JSON SESUAI SKEMA BERIKUT:
{
  "creativeAdvice": "Saran hangat 1-2 kalimat tentang cara membuat hadiah ini lebih berkesan",
  "recommendations": [
    {
      "id": "1",
      "title": "Nama Ide Hadiah",
      "category": "DIY Kreatif / Hampers Siap Jadi / Hadiah Personal / Fungsional / Pengalaman",
      "estimatedCost": "Rp xx.xxx - Rp xx.xxx",
      "estimatedCostNumber": 45000,
      "description": "Penjelasan detail hadiah dan isinya (2-3 kalimat yang mudah dipahami)",
      "whyItFits": "Kenapa cocok untuk penerima ini",
      "studentFriendlyTip": "Tips hemat atau cara buat sendiri",
      "suggestedWrapping": "Saran warna kertas kado, pita satin, aksen",
      "difficulty": "🟢 Super Praktis / ✂️ DIY 15 Menit / 🌸 Siap Kirim / ✨ Sangat Personal"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            creativeAdvice: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  estimatedCost: { type: Type.STRING },
                  estimatedCostNumber: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                  whyItFits: { type: Type.STRING },
                  studentFriendlyTip: { type: Type.STRING },
                  suggestedWrapping: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.recommendations && parsed.recommendations.length > 0) {
      return res.json(parsed);
    }
    return res.json({
      creativeAdvice: 'Kado terbaik bukan tentang harga, melainkan ketulusan dan cerita di baliknya.',
      recommendations: getFallbackRecommendations(occasion, budgetRange),
    });
  } catch (error) {
    console.error('Gemini recommend-gifts error:', error);
    return res.json({
      creativeAdvice: 'Sentuhan personal seperti kartu ucapan tulisan tangan akan selalu membuat hadiah terasa jauh lebih istimewa.',
      recommendations: getFallbackRecommendations(req.body?.occasion || 'Spesial', req.body?.budgetRange || 'medium'),
    });
  }
});

// API: Generator Ucapan Otomatis AI
app.post('/api/generate-greeting', async (req, res) => {
  try {
    const { recipientName, senderName, occasion, relationship, tone, keyMemories } = req.body;

    const prompt = `Kamu adalah copywriter kartu ucapan kreatif dari KreasiKado.
Tuliskan kartu ucapan manis dan berkesan dalam Bahasa Indonesia dengan parameter:
- Nama Penerima: ${recipientName || 'Teman Baik'}
- Nama Pengirim: ${senderName || 'Sahabatmu'}
- Momen: ${occasion || 'Hari Spesial'}
- Hubungan: ${relationship || 'Teman / Sahabat'}
- Nada / Tone: ${tone || 'Sweet / Romantis / Hangat'}
- Kenangan / Detail yang ingin disinggung: ${keyMemories || 'Kenangan manis selama ini'}

Aturan Nada:
- 'sweet': Manis, hangat, tulus, penuh kasih sayang.
- 'humorous': Lucu, santai, akrab, sedikit sarkas manis khas tongkrongan mahasiswa, menghibur.
- 'poetic': Puitis, sastra estetik, mendalam, kalimat anggun.
- 'formal': Sopan, santun, berkelas, cocok untuk dosen, orang tua, atau senior.
- 'minimalist': Singkat, padat, aesthetic one-liner, elegan.

Kembalikan jawaban DALAM FORMAT JSON SESUAI SKEMA BERIKUT:
{
  "headline": "Judul ucapan singkat (misal: 'Selamat Wisuda, Sahabatku!')",
  "message": "Isi ucapan lengkap 3-5 kalimat yang mengalir indah",
  "quote": "Kutipan mutiara singkat 1 kalimat yang relate dengan momen",
  "psMessage": "P.S. kecil yang manis atau lucu di bagian akhir",
  "cardTheme": "rose-gold atau pastel-pink atau ivory-clean"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            message: { type: Type.STRING },
            quote: { type: Type.STRING },
            psMessage: { type: Type.STRING },
            cardTheme: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.message) {
      return res.json(parsed);
    }
    return res.json(getFallbackGreeting(recipientName, senderName, occasion, tone));
  } catch (error) {
    console.error('Gemini generate-greeting error:', error);
    return res.json(getFallbackGreeting(req.body?.recipientName, req.body?.senderName, req.body?.occasion, req.body?.tone));
  }
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌸 KreasiKado server running on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
