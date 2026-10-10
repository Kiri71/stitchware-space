'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  Gift,
  Globe,
  Heart,
  Layers3,
  MapPin,
  Menu,
  PackageCheck,
  Recycle,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  UploadCloud,
  UserRound,
  Users,
} from 'lucide-react';

type View = 'home' | 'shop' | 'trace' | 'account' | 'b2b';
type Product = {
  id: number;
  name: string;
  category: string;
  type: string;
  material: string;
  price: number;
  badge: string;
  accent: string;
  image: string;
  fallbackImage?: string;
  code: string;
};

type ProductSort = 'Terbaru' | 'Populer' | 'Harga Terendah' | 'Harga Tertinggi';

type TraceRecord = {
  artisan: string;
  profession: string;
  photo: string;
  fallbackPhoto?: string;
  experience: string;
  location: string;
  material: string;
  impact: string;
  note: string;
};

const categoryOptions = ['Tas', 'Dompet', 'Bag Charm', 'Keychain'];
const materialOptions = ['Kanvas Marsoto', 'Kain Perca Woven', 'Water-based PU'];
const paymentMethods = ['BCA', 'Mandiri', 'BRI', 'BNI', 'QRIS', 'GoPay', 'OVO', 'ShopeePay', 'Visa', 'Mastercard'];
const shippingMethods = ['J&T', 'JNE', 'SiCepat', 'GoSend', 'GrabExpress'];

const products: Product[] = [
  {
    id: 1,
    name: 'Stitch Canvas Shoulder Bag',
    category: 'Tas',
    type: 'Shoulder Bag',
    material: 'Kanvas Marsoto & Kain Perca Woven',
    price: 499900,
    badge: 'Include 1 Bag Charm',
    accent: 'Terracotta',
    image: '/bag-1.png',
    code: 'SS-001',
  },
  {
    id: 2,
    name: 'Stitch Canvas Handbag',
    category: 'Tas',
    type: 'Handbag',
    material: 'Kanvas Marsoto & Water-based PU',
    price: 499900,
    badge: 'Include 1 Bag Charm',
    accent: 'Pastel Sand',
    image: '/bag-2.png',
    code: 'SS-002',
  },
  {
    id: 3,
    name: 'S&S Minimalist Sling Bag',
    category: 'Tas',
    type: 'Sling Bag',
    material: 'Kanvas Marsoto, Perca & Water-based PU',
    price: 499900,
    badge: 'Include 1 Bag Charm',
    accent: 'Cream',
    image: '/bag-3.png',
    code: 'SS-003',
  },
  {
    id: 4,
    name: 'S&S Matching Essential Wallet',
    category: 'Dompet',
    type: 'Wallet',
    material: 'Kanvas Marsoto & Water-based PU',
    price: 299900,
    badge: 'Set Senada Tas',
    accent: 'Terracotta',
    image: '/wallet-1.png',
    code: 'SS-004',
  },
  {
    id: 5,
    name: 'Stitch Canvas Pocket Wallet',
    category: 'Dompet',
    type: 'Wallet',
    material: 'Kanvas Marsoto & Kain Perca Woven',
    price: 299900,
    badge: 'Set Senada Tas',
    accent: 'Pastel Sand',
    image: '/wallet-2.png',
    code: 'SS-005',
  },
  {
    id: 6,
    name: 'Custom Suede Doll Bag Charm',
    category: 'Bag Charm',
    type: 'Accessory',
    material: 'Kain Suede & Dakron Non-toxic',
    price: 79900,
    badge: 'Handcrafted Doll',
    accent: 'Custom Suede',
    image: '/charm-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    code: 'SS-006',
  },
  {
    id: 7,
    name: 'Custom Acrylic Name Keychain',
    category: 'Keychain',
    type: 'Accessory',
    material: 'Cast Acrylic 3mm',
    price: 39900,
    badge: 'Ukir Nama / Inisial',
    accent: 'Acrylic 3MM',
    image: '/keychain-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
    code: 'SS-007',
  },
];

const impactStats = [
  { value: '±6.7 Ton/Tahun', label: 'Serapan limbah kain perca & tekstil garmen', icon: Recycle },
  { value: '15 Pekerja', label: 'Eks-pekerja garmen Cimahi/Jawa Barat diberdayakan', icon: Users },
  { value: '100% Eco Material', label: 'Kanvas Marsoto, Kain Perca Woven, Suede, & Water-based PU', icon: Layers3 },
  { value: 'SDG 12.5 & 8.5', label: 'Konsumsi bertanggung jawab & pekerjaan layak', icon: Award },
];

const traceData: Record<string, TraceRecord> = {
  'SS-001': {
    artisan: 'Ibu Anah',
    profession: 'Eks Pekerja Garmen Cimahi',
    photo: '/ibu-anah.png',
    fallbackPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    experience: '12 tahun di industri garmen, spesialis jahit tas & presisi kain perca.',
    location: 'Bandung Raya, Jawa Barat',
    material: 'Kanvas Marsoto 350g & Limbah Perca Woven Bandung Raya',
    impact: 'Pembelian produk ini menyerap ±0.84 kg limbah kain dari TPA.',
    note: 'Setiap jahitan dibuat dengan pola modular yang meminimalkan sisa potongan kain, mempertahankan detail presisi, dan mengangkat potensi karya para pekerja garmen lokal.',
  },
  'SS-002': {
    artisan: 'Ibu Yanti',
    profession: 'Eks Pekerja Garmen Melong',
    photo: '/ibu-yanti.png',
    fallbackPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    experience: '10 tahun memproduksi aksoris fashion & potong pola kain perca.',
    location: 'Bandung Selatan, Jawa Barat',
    material: 'Water-based PU & Sisa Denim Industri Garmen',
    impact: 'Pembelian produk ini menyerap ±0.65 kg limbah kain dari TPA.',
    note: 'Proses produksi menekankan efisiensi potong pola, memakai limbah denim sisa industri, dan menjaga kualitas material tetap awet dan wearable.',
  },
};

const lookbookImages = [
  {
    image: '/lookbook-1.png',
    title: 'Campus to Café',
    description: 'Shoulder Bag Kanvas Martoso & Perca',
  },
  {
    image: '/lookbook-2.png',
    title: 'Daily Elegance',
    description: 'Handbag Kanvas Martoso & Perca',
  },
  {
    image: '/lookbook-3.png',
    title: 'Personalized Carry',
    description: 'Sling Bag & Custom Keychain Akrilik Nama',
  },
  {
    image: '/lookbook-4.png',
    title: 'Compact Essential',
    description: 'Dompet Senada Water-based PU',
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product, onCustomize }: { product: Product; onCustomize: (product: Product) => void }) {
  const accentStyles: Record<string, string> = {
    Terracotta: 'bg-[#D9886C] text-white',
    'Pastel Sand': 'bg-[#EAD8C8] text-[#2C221E]',
    Cream: 'bg-[#F7EBE1] text-[#2C221E]',
    'Custom Suede': 'bg-[#D9886C] text-white',
    'Acrylic 3MM': 'bg-[#F7EBE1] text-[#2C221E]',
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (product.fallbackImage && target.src !== product.fallbackImage) {
      target.src = product.fallbackImage;
    }
  };

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#E7DFD5] bg-white shadow-[0_16px_35px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
      <div className="relative overflow-hidden bg-[#F5EFE7] p-3">
        <span className={`absolute left-6 top-6 z-10 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${accentStyles[product.accent] ?? 'bg-[#F7EBE1] text-[#2C221E]'}`}>
          {product.accent}
        </span>

        {product.category === 'Bag Charm' || product.category === 'Keychain' ? (
          <button
            type="button"
            onClick={() => onCustomize(product)}
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D9886C]/40 bg-[#FAF5E9] p-5 text-center transition hover:border-[#D9886C] hover:bg-[#F7EBE1]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7EBE1] text-[#D9886C]">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="mt-2 text-sm font-medium text-[#2C221E]">Upload Desain / Nama Custom</p>
            <p className="mt-0.5 text-xs text-[#7A6B63]">Format PNG, JPG, atau SVG</p>
          </button>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              onError={handleImageError}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a6958]">{product.category}</p>
            <h3 className="mt-2 text-xl font-bold text-[#111111]">{product.name}</h3>
          </div>
          <button type="button" aria-label="Add to wishlist" className="rounded-full border border-[#E7DFD5] p-2 text-[#111111] transition hover:border-[#111111] hover:bg-[#111111] hover:text-white">
            <Heart size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#7a6958]">
          <Star size={14} className="fill-[#facc15] text-[#facc15]" />
          <span className="text-sm font-medium">4.9</span>
          <span className="text-xs">• {product.type}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[#6d5d4f]">{product.material}</p>
            <p className="mt-2 text-2xl font-black text-[#111111]">{formatPrice(product.price)}</p>
          </div>
          <button type="button" className="rounded-full bg-[#2C221E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#433934]">
            Add to Cart
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-2xl bg-[#F7F1E7] px-3 py-2 text-xs font-medium text-[#3a2f1d]">
            {product.badge}
          </div>
          <button
            type="button"
            onClick={() => onCustomize(product)}
            className="rounded-full border border-[#2C221E] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2C221E] transition hover:bg-[#2C221E] hover:text-white"
          >
            CUSTOM PERSONALIZE
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [showCategories, setShowCategories] = useState(false);
  const [selectedSort, setSelectedSort] = useState<ProductSort>('Terbaru');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Tas']);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Semua');
  const [accountTab, setAccountTab] = useState<'orders' | 'wishlist' | 'card'>('orders');
  const [traceCode, setTraceCode] = useState('SS-001');
  const [traceLookup, setTraceLookup] = useState('SS-001');
  const [showTraceModal, setShowTraceModal] = useState(false);
  const [customizeProduct, setCustomizeProduct] = useState<Product | null>(null);
  const [customName, setCustomName] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [customFilePreview, setCustomFilePreview] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.toLowerCase();

    const nextProducts = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesMaterial =
        selectedMaterial === 'Semua' || product.material.toLowerCase().includes(selectedMaterial.toLowerCase());

      return matchesSearch && matchesCategory && matchesMaterial;
    });

    if (selectedSort === 'Populer') {
      return [...nextProducts].sort((a, b) => b.id - a.id);
    }

    if (selectedSort === 'Harga Terendah') {
      return [...nextProducts].sort((a, b) => a.price - b.price);
    }

    if (selectedSort === 'Harga Tertinggi') {
      return [...nextProducts].sort((a, b) => b.price - a.price);
    }

    return nextProducts;
  }, [searchTerm, selectedCategories, selectedMaterial, selectedSort]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((item) => item !== category);
      }

      return [...current, category];
    });
  };

  const traceProfile = traceData[traceLookup.trim().toUpperCase()] || null;

  const handleTraceSearch = () => {
    const normalizedCode = traceCode.trim().toUpperCase();
    const codeExists = Object.prototype.hasOwnProperty.call(traceData, normalizedCode);

    setTraceLookup(normalizedCode);
    setShowTraceModal(true);

    if (!codeExists) {
      setTraceLookup(normalizedCode);
    }
  };

  const handleCustomizeFile = (file: File | null) => {
    if (!file) {
      setCustomFileName('');
      setCustomFilePreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setCustomFileName(file.name);
      setCustomFilePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCustomFileName(file.name);
    setCustomFilePreview(previewUrl);
  };

  const resetCustomizationModal = () => {
    setCustomizeProduct(null);
    setCustomName('');
    setCustomNotes('');
    setCustomFileName('');
    setCustomFilePreview(null);
  };

  const navigationItems = [
    { label: 'Trending Now', view: 'home' as const, hasDropdown: false },
    { label: 'Categories', view: 'shop' as const, hasDropdown: true },
    { label: 'Lookbook', view: 'home' as const, hasDropdown: false },
    { label: 'Traceability (QR)', view: 'trace' as const, hasDropdown: false },
    { label: 'B2B', view: 'b2b' as const, hasDropdown: false },
  ];

  const renderB2BPage = () => (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 lg:px-8">
      <section className="rounded-[32px] border border-[#E7DFD5] bg-white p-6 shadow-[0_18px_40px_rgba(44,34,30,0.04)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7F685D]">B2B / Corporate Gifting</p>
            <h1 className="mt-2 text-3xl font-black text-[#2C221E] md:text-4xl">Partnership for conscious brands.</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EBE1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2C221E]">
            <Briefcase size={14} />
            S&S B2B
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Corporate gifting',
              text: 'Koleksi custom untuk event perusahaan, anniversary, dan appreciation kit.',
              icon: Gift,
            },
            {
              title: 'Brand partnership',
              text: 'Kolaborasi produk limited-edition dengan identity brand yang selaras dengan nilai dampak.',
              icon: BadgeCheck,
            },
            {
              title: 'Loyalty program',
              text: 'Paket merchandise dan voucher reward yang menampilkan cerita artisan secara transparan.',
              icon: Award,
            },
          ].map(({ title, text, icon: Icon }) => (
            <div key={title} className="rounded-[24px] border border-[#E7DFD5] bg-[#FAF8F5] p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#D9886C] text-white">
                <Icon size={18} />
              </div>
              <h3 className="text-xl font-black text-[#2C221E]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4F433D]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[30px] border border-[#E7DFD5] bg-[#F7EBE1] p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7F685D]">Program & benefit</p>
            <h2 className="mt-2 text-3xl font-black text-[#2C221E]">Merchandise dengan storytelling dan impact yang terukur.</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#4F433D]">
              <li className="flex items-start gap-3"><BadgeCheck size={16} className="mt-0.5 text-[#2C221E]" /> Personalization untuk kebutuhan event internal maupun brand campaign.</li>
              <li className="flex items-start gap-3"><BadgeCheck size={16} className="mt-0.5 text-[#2C221E]" /> Real-time traceability untuk setiap produk dalam kemitraan.</li>
              <li className="flex items-start gap-3"><BadgeCheck size={16} className="mt-0.5 text-[#2C221E]" /> Pilihan material eco-friendly dan produksi bertanggung jawab.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#E7DFD5] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7F685D]">Contact B2B</p>
            <div className="mt-4 space-y-3 text-sm text-[#4F433D]">
              <div className="rounded-2xl bg-[#FAF8F5] p-3">
                <span className="font-semibold text-[#2C221E]">Email:</span> partners@stitchware-space.com
              </div>
              <div className="rounded-2xl bg-[#FAF8F5] p-3">
                <span className="font-semibold text-[#2C221E]">WhatsApp:</span> +62 812-3456-7890
              </div>
              <div className="rounded-2xl bg-[#FAF8F5] p-3">
                <span className="font-semibold text-[#2C221E]">MOQ:</span> 25 pcs / campaign
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );

  const renderHomePage = () => (
    <main className="bg-[#FAF8F5] text-[#2C221E]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAD8C8] bg-[#F7EBE1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2C221E]">
              <Sparkles size={12} className="text-[#D9886C]" />
              STITCHWARE & SPACE
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black leading-[0.96] tracking-[-0.04em] text-[#2C221E] md:text-5xl lg:text-6xl">
                Mengubah Limbah Menjadi Karya Personal Bertoreh Cerita.
              </h1>
              <p className="max-w-xl text-base leading-7 text-[#4F433D] md:text-lg">
                Aksesoris fashion ramah lingkungan bergaya pastel minimalis, dibuat langsung oleh tangan terampil eks-pekerja garmen Jawa Barat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setCurrentView('shop')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9886C] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(217,136,108,0.32)] transition hover:-translate-y-0.5 hover:bg-[#C87557]"
              >
                SHOP NOW
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('trace')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2C221E] bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#2C221E] transition hover:bg-[#2C221E] hover:text-white"
              >
                <Sparkles size={15} />
                PELAJARI MISI
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[30px] bg-[#F7EBE1] blur-3xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-[#F0E6DD] bg-white p-2 shadow-[0_24px_60px_rgba(44,34,30,0.12)]">
              <div className="relative h-[420px] overflow-hidden rounded-[20px] md:h-[540px]">
                <Image
                  src="/hero-craftsman.jpg"
                  alt="Craftsman and textile work"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/70 via-[#2C221E]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    <Sparkles size={12} className="text-[#F7EBE1]" />
                    Handwoven stories
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {impactStats.map(({ value, label, icon: Icon }) => (
            <div key={value} className="rounded-[24px] border border-[#F0E6DD] bg-white p-5 shadow-[0_16px_30px_rgba(44,34,30,0.04)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#2C221E] text-[#F7EBE1]">
                <Icon size={18} />
              </div>
              <p className="text-2xl font-black text-[#2C221E]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-[#4F433D]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#F0E6DD] bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9886C]">LOOKBOOK</p>
              <h2 className="mt-2 text-2xl font-bold text-[#2C221E] md:text-3xl">Gaya hidup yang membawa cerita.</h2>
            </div>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-[#F7EBE1] px-4 py-2 text-sm font-semibold text-[#2C221E] transition hover:bg-[#EAD8C8] md:inline-flex"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {lookbookImages.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="group overflow-hidden rounded-2xl border border-[#F0E6DD] bg-[#FAF5E9] p-3 shadow-[0_16px_30px_rgba(44,34,30,0.04)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pb-1 pt-3">
                  <p className="mt-2 text-base font-semibold text-[#2C221E]">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[#7A6B63]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );

  const renderShopPage = () => (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a6958]">Product Catalog</p>
          <h1 className="mt-2 text-4xl font-black text-[#111111]">Shop by category</h1>
        </div>

        <div className="flex items-center gap-3 self-start rounded-full border border-[#E7DFD5] bg-white px-3 py-2 shadow-sm lg:self-auto">
          <span className="text-sm font-medium text-[#5d5048]">Urutkan</span>
          <select
            value={selectedSort}
            onChange={(event) => setSelectedSort(event.target.value as ProductSort)}
            className="bg-transparent text-sm font-semibold text-[#111111] outline-none"
          >
            <option>Terbaru</option>
            <option>Populer</option>
            <option>Harga</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="rounded-[30px] border border-[#E7DFD5] bg-[#fffefc] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#111111]">Cari Produk</label>
            <div className="flex items-center gap-2 rounded-full border border-[#e5ddcf] bg-[#f8f5f0] px-3 py-2.5">
              <Search size={16} className="text-[#7a6958]" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Cari produk"
                className="w-full bg-transparent text-sm text-[#111111] outline-none placeholder:text-[#8b7d70]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#111111]">Kategori</p>
              <p className="mb-3 text-xs text-[#7A6B63]">Bag Charm bawaan include</p>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex cursor-pointer items-center gap-2 text-sm text-[#3d362e]">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 rounded border-[#d5c9bb] accent-[#111111]"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#111111]">Bahan</p>
              <div className="space-y-2">
                {['Semua', ...materialOptions].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedMaterial(option)}
                    className={`flex w-full items-center justify-between rounded-full border px-3 py-2 text-sm transition ${
                      selectedMaterial === option
                        ? 'border-[#d4a74d] bg-[#fef3c7] text-[#3a2f1d]'
                        : 'border-[#E7DFD5] bg-[#f9f5f0] text-[#3d362e] hover:border-[#d4a74d]'
                    }`}
                  >
                    <span>{option}</span>
                    <ShieldCheck size={14} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#111111]">Urutan Harga</p>
              <div className="rounded-full border border-[#E7DFD5] bg-[#f9f5f0] px-3 py-2">
                <select
                  value={selectedSort}
                  onChange={(event) => setSelectedSort(event.target.value as ProductSort)}
                  className="w-full bg-transparent text-sm font-medium text-[#111111] outline-none"
                >
                  <option>Terbaru</option>
                  <option>Populer</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[30px] border border-dashed border-[#cabda7] bg-[#f8f5f0] p-8 text-center">
              <PackageCheck size={42} className="text-[#7a6958]" />
              <h3 className="mt-4 text-2xl font-black text-[#111111]">Produk tidak ditemukan</h3>
              <p className="mt-2 max-w-md text-[#5d5048]">Coba ubah kata kunci atau hapus filter agar hasil pencarian lebih luas.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCustomize={setCustomizeProduct} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );

  const renderTracePage = () => (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-8 lg:px-8">
      <section className="rounded-[32px] border border-[#E7DFD5] bg-[#f9f5f0] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)] md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a6958]">Traceability</p>
            <h1 className="mt-2 text-3xl font-black text-[#111111] md:text-4xl">Scan & trace every product story</h1>
          </div>
          <div className="rounded-full bg-[#fef3c7] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#3a2f1d]">
            QR Verified
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[28px] border border-[#e5ddcf] bg-white p-5">
            <label className="mb-2 block text-sm font-semibold text-[#111111]">Kode QR produk</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={traceCode}
                onChange={(event) => setTraceCode(event.target.value)}
                placeholder="Contoh: SS-001"
                className="w-full rounded-full border border-[#e5ddcf] bg-[#faf7f2] px-4 py-3 text-sm text-[#111111] outline-none placeholder:text-[#8b7d70]"
              />
              <button
                type="button"
                onClick={handleTraceSearch}
                className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2d2d2d]"
              >
                Cari Story
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {['SS-001', 'SS-002'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setTraceCode(code);
                    setTraceLookup(code);
                    setShowTraceModal(true);
                  }}
                  className="rounded-full border border-[#e5ddcf] bg-[#f8f5f0] px-3 py-2 text-xs font-semibold text-[#3d362e] transition hover:border-[#111111]"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-[linear-gradient(135deg,#fffaf1_0%,#f3ebdf_100%)] p-5 text-[#111111]">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a6958]">Impact summary</p>
                <div className="rounded-full bg-[#facc15] p-2 text-[#111111]">
                  <ScanLine size={16} />
                </div>
              </div>
              <div>
                <p className="text-4xl font-black">0.84 kg</p>
                <p className="mt-2 text-sm text-[#5b4436]">limbah kain yang dihindari per produk terjual.</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-3 text-sm text-[#3d362e]">
                <BadgeCheck className="text-[#111111]" size={18} />
                <span>Dengan setiap pembelian, Anda turut mendukung ekonomi sirkuler.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[30px] border border-[#E7DFD5] bg-white p-6 shadow-[0_16px_35px_rgba(0,0,0,0.03)] md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] bg-[#f8f5f0] p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-[#facc15]">
              <UserRound size={18} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7a6958]">Profil Penjahit</p>
            <h3 className="mt-3 text-xl font-black text-[#111111]">{traceData['SS-001']?.artisan}</h3>
          </div>
          <div className="rounded-[24px] bg-[#f8f5f0] p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-[#facc15]">
              <MapPin size={18} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7a6958]">Asal Material</p>
            <h3 className="mt-3 text-xl font-black text-[#111111]">Bandung Raya</h3>
          </div>
          <div className="rounded-[24px] bg-[#f8f5f0] p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-[#facc15]">
              <Recycle size={18} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7a6958]">Dampak</p>
            <h3 className="mt-3 text-xl font-black text-[#111111]">0.84 kg terselamatkan</h3>
          </div>
        </div>
      </section>

      {showTraceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a6958]">Traceability Report</p>
                <h2 className="mt-2 text-2xl font-black text-[#111111]">{traceLookup}</h2>
              </div>
              <button type="button" onClick={() => setShowTraceModal(false)} className="rounded-full border border-[#E7DFD5] px-3 py-1.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f5efe7]">
                Tutup
              </button>
            </div>

            {traceProfile ? (
              <div className="mt-6 space-y-5">
                <div className="rounded-[24px] border border-[#F0E6DD] bg-[#FAF5E9] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A6B63]">PROFIL PENJAHIT</p>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={traceProfile.photo}
                      alt={traceProfile.artisan}
                      onError={(event) => {
                        const target = event.currentTarget as HTMLImageElement;
                        const fallback = traceProfile.fallbackPhoto;
                        if (fallback && target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                      className="h-16 w-16 rounded-full border-2 border-[#D9886C] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="text-base font-bold text-[#2C221E]">{traceProfile.artisan}</p>
                      <p className="text-sm text-[#4F433D]">{traceProfile.profession}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#3d362e]">
                  <div className="rounded-2xl border border-[#F0E6DD] bg-[#FAF5E9] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7A6B63]">Pengalaman</p>
                    <p className="mt-2 text-[#2C221E]">{traceProfile.experience}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-[#F0E6DD] bg-[#faf7f2] p-3">
                    <MapPin size={16} className="mt-0.5 text-[#111111]" />
                    <p><span className="font-semibold text-[#111111]">Material produk:</span> {traceProfile.material}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-[#F0E6DD] bg-[#faf7f2] p-3">
                    <Truck size={16} className="mt-0.5 text-[#111111]" />
                    <p><span className="font-semibold text-[#111111]">Lokasi produksi:</span> {traceProfile.location}</p>
                  </div>
                  <div className="rounded-2xl border border-[#F0E6DD] bg-[#faf7f2] p-3">
                    <p className="font-semibold text-[#111111]">Dampak lingkungan</p>
                    <p className="mt-2">{traceProfile.impact}</p>
                  </div>
                  <div className="rounded-2xl border border-[#F0E6DD] bg-[#faf7f2] p-3">
                    <p className="font-semibold text-[#111111]">Cerita craftsmanship</p>
                    <p className="mt-2">{traceProfile.note}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex min-h-[150px] flex-col items-center justify-center rounded-[24px] bg-[#faf7f2] text-center">
                <Search size={30} className="text-[#7a6958]" />
                <p className="mt-3 text-lg font-semibold text-[#111111]">Kode produk tidak ditemukan.</p>
                <p className="mt-2 text-sm text-[#5d5048]">Coba gunakan preset SS-001 atau SS-002.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );

  const renderAccountPage = () => (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-8 lg:px-8">
      <section className="rounded-[32px] border border-[#E7DFD5] bg-[linear-gradient(135deg,#fef3c7_0%,#fdf7e8_35%,#ffffff_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a6958]">Membership</p>
            <h1 className="mt-2 text-3xl font-black text-[#111111] md:text-4xl">S&S Exclusive Member Card</h1>
          </div>
          <div className="rounded-full border border-[#111111] bg-white px-5 py-3 text-sm font-semibold text-[#111111]">
            2.480 poin reward
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Gift, text: 'Early Access koleksi Limited Edition' },
            { icon: BadgeCheck, text: 'Voucher diskon member eksklusif' },
            { icon: Award, text: 'Poin reward & hadiah loyalitas' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="rounded-[24px] border border-[#E7DFD5] bg-white/70 p-4">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-[#facc15]">
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold text-[#111111]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-[30px] border border-[#E7DFD5] bg-white p-3 shadow-[0_16px_35px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap gap-3">
          {['Pesanan Saya', 'Wishlist', 'Kartu Member Digital'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() =>
                setAccountTab(
                  tab === 'Pesanan Saya' ? 'orders' : tab === 'Wishlist' ? 'wishlist' : 'card',
                )
              }
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                (tab === 'Pesanan Saya' && accountTab === 'orders') ||
                (tab === 'Wishlist' && accountTab === 'wishlist') ||
                (tab === 'Kartu Member Digital' && accountTab === 'card')
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#f7f1e7] text-[#3d362e] hover:bg-[#efe4d4]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-[#E7DFD5] bg-[#faf7f2] p-6">
          {accountTab === 'orders' ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
              <PackageCheck size={42} className="text-[#7a6958]" />
              <h2 className="mt-5 text-2xl font-black text-[#111111]">Tidak Ada Pesanan</h2>
              <p className="mt-2 max-w-md text-[#5d5048]">Pesanan Anda akan muncul di sini setelah pembelian berhasil diproses.</p>
            </div>
          ) : accountTab === 'wishlist' ? (
            <div className="grid gap-4 md:grid-cols-3">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="overflow-hidden rounded-[22px] border border-[#E7DFD5] bg-white">
                  <img src={product.image} alt={product.name} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7a6958]">Wishlist</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#111111]">{product.name}</h3>
                    <p className="mt-2 text-xl font-black text-[#111111]">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-[24px] bg-[#111111] p-5 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#facc15]">Member ID</p>
                <h3 className="mt-3 text-3xl font-black">S&S-2401</h3>
                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                    <span>Tier</span>
                    <span className="font-semibold text-[#facc15]">Gold Member</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                    <span>Benefit</span>
                    <span>Voucher 10%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                    <span>Reward</span>
                    <span>2.480 poin</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#E7DFD5] bg-[#f8f5f0] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a6958]">Benefit</p>
                <ul className="mt-4 space-y-3 text-sm text-[#3d362e]">
                  <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#111111]" /> Early access latest drop</li>
                  <li className="flex items-center gap-2"><Gift size={16} className="text-[#111111]" /> Voucher member setiap pembelian</li>
                  <li className="flex items-center gap-2"><Award size={16} className="text-[#111111]" /> Program loyalitas & rewards</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C221E]">
      <header className="sticky top-0 z-40 border-b border-[#EAD8C8] bg-[#F7EBE1] shadow-[0_8px_18px_rgba(44,34,30,0.05)]">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setCurrentView('home')} className="flex items-center gap-3 rounded-full px-2 py-1.5 transition hover:bg-[#F0E6DD]">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#F7EBE1]">
                <img src="/logo-icon.jpeg" alt="STITCHWARE & SPACE logo" className="mix-blend-multiply h-full w-full object-contain" />
              </div>
              <div className="text-left leading-[1.1]">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#2C221E]">STITCHWARE</div>
                <div className="text-[10px] font-black tracking-[0.24em] text-[#2C221E]">SPACE</div>
              </div>
            </button>

            <nav className="hidden items-center gap-5 text-sm font-semibold text-[#2C221E] lg:flex">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  {!item.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setCurrentView(item.view)}
                      className="inline-flex items-center gap-1 transition hover:text-[#C87557]"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowCategories((value) => !value)}
                      className="inline-flex items-center gap-1 transition hover:text-[#C87557]"
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button type="button" className="flex items-center gap-2 rounded-full border border-[#D6C7B7] bg-white/50 px-3 py-2 text-xs font-semibold text-[#2C221E] transition hover:bg-white">
                <Globe size={15} />
                <span className="hidden sm:inline">ID / IDR</span>
              </button>
              <button type="button" className="rounded-full border border-[#D6C7B7] bg-white/50 p-2.5 text-[#2C221E] transition hover:bg-white">
                <Search size={16} />
              </button>
              <button type="button" className="relative rounded-full border border-[#D6C7B7] bg-white/50 p-2.5 text-[#2C221E] transition hover:bg-white">
                <ShoppingCart size={16} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9886C] text-[10px] font-bold text-white">2</span>
              </button>
              <button type="button" onClick={() => setCurrentView('account')} className="rounded-full bg-[#2C221E] p-2.5 text-[#F7EBE1] transition hover:bg-[#3A2E2A]">
                <UserRound size={16} />
              </button>
              <button type="button" className="rounded-full border border-[#D6C7B7] bg-white/50 p-2.5 text-[#2C221E] transition hover:bg-white lg:hidden">
                <Menu size={16} />
              </button>
            </div>
          </div>

          {showCategories && (
            <div className="relative mt-3 lg:ml-[42%] lg:w-[220px]">
              <div className="absolute right-0 top-0 w-full rounded-2xl border border-[#EAD8C8] bg-white p-3 shadow-xl">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategories((current) =>
                        current.includes(category) ? current : [...current, category],
                      );
                      setShowCategories(false);
                      setCurrentView('shop');
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-[#2C221E] transition hover:bg-[#F7EBE1]"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {currentView === 'home' && renderHomePage()}
      {currentView === 'shop' && renderShopPage()}
      {currentView === 'trace' && renderTracePage()}
      {currentView === 'account' && renderAccountPage()}
      {currentView === 'b2b' && renderB2BPage()}

      {customizeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" onClick={resetCustomizationModal}>
          <div className="w-full max-w-2xl rounded-[30px] border border-[#F0E6DD] bg-[#FAF8F5] p-5 shadow-[0_20px_60px_rgba(44,34,30,0.2)]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7A6B63]">Custom Personalize</p>
                <h3 className="mt-2 text-2xl font-black text-[#2C221E]">{customizeProduct.name}</h3>
              </div>
              <button type="button" onClick={resetCustomizationModal} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DFD5] bg-white text-lg font-medium text-[#2C221E] transition hover:bg-[#F7EBE1]">
                ×
              </button>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[24px] border border-[#F0E6DD] bg-white p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={customFilePreview || customizeProduct.image}
                    alt={customizeProduct.name}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement;
                      if (customizeProduct.fallbackImage && target.src !== customizeProduct.fallbackImage) {
                        target.src = customizeProduct.fallbackImage;
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 rounded-2xl bg-[#FAF5E9] px-3 py-2 text-xs text-[#4F433D]">
                  {customFileName ? `File dipilih: ${customFileName}` : 'Preview desain custom Anda'}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2C221E]">Nama / Inisial</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(event) => setCustomName(event.target.value)}
                    placeholder="Contoh: Aisha, AS, M." 
                    className="w-full rounded-full border border-[#E7DFD5] bg-white px-4 py-3 text-sm text-[#2C221E] outline-none placeholder:text-[#8A7E74] focus:border-[#D9886C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2C221E]">Upload Desain / Sktesa</label>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[24px] border border-dashed border-[#D8C9BC] bg-[#F8F4EF] p-5 text-center transition hover:border-[#D9886C] hover:bg-[#F7EBE1]">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
                      className="hidden"
                      onChange={(event) => handleCustomizeFile(event.target.files?.[0] || null)}
                    />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAD8C8] text-[#2C221E]">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C221E]">Tarik file atau klik untuk unggah</p>
                      <p className="mt-1 text-xs text-[#7A6B63]">PNG, JPG, SVG</p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#2C221E]">Catatan Tambahan</label>
                  <textarea
                    value={customNotes}
                    onChange={(event) => setCustomNotes(event.target.value)}
                    placeholder="Tulis instruksi khusus untuk perajin eks-pekerja garmen..."
                    rows={4}
                    className="w-full rounded-[20px] border border-[#E7DFD5] bg-white px-4 py-3 text-sm text-[#2C221E] outline-none placeholder:text-[#8A7E74] focus:border-[#D9886C]"
                  />
                </div>

                <button type="button" className="w-full rounded-full bg-[#2C221E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#433934]">
                  Simpan & Tambahkan ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#1C1614] text-[#EAE3DC]">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1C1614]">
                  <img src="/logo-icon.jpeg" alt="STITCHWARE & SPACE logo" className="mix-blend-multiply h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F7EBE1]">STITCHWARE</div>
                  <div className="text-sm font-black tracking-[0.2em] text-[#EAE3DC]">SPACE</div>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#D9CEC5]">
                Fashion Accessories Berbasis Ekonomi Sirkuler dan Pemberdayaan Eks-Pekerja Garmen.
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F7EBE1]">Pembayaran</p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#EAE3DC]">
                {paymentMethods.map((method) => (
                  <span key={method} className="rounded-full border border-[#EAE3DC]/15 bg-white/5 px-3 py-1.5">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F7EBE1]">Pengiriman</p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#EAE3DC]">
                {shippingMethods.map((method) => (
                  <span key={method} className="rounded-full border border-[#EAE3DC]/15 bg-white/5 px-3 py-1.5">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#EAE3DC]/15 pt-5 text-xs text-[#D9CEC5]">
            Copyright © 2026 STITCHWARE & SPACE (Universitas Siliwangi)
          </div>
        </div>
      </footer>
    </div>
  );
}
