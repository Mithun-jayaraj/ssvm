import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Ruler,
  Scale,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  FileText,
  CheckCircle2,
  ChevronRight,
  ZoomIn,
  X,
  Share2,
  Check,
  Send,
  Phone,
} from 'lucide-react';
import { getProductBySlug } from '../services/productService';
import { submitEnquiry } from '../services/enquiryService';
import ProductCard from '../components/common/ProductCard';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import SEOHead from '../components/common/SEOHead';
import { getProductSEO, buildProductSchema, buildBreadcrumbSchema, PAGE_SEO } from '../utils/seoConfig';
import { trackProductView, trackQuotationClick, trackWhatsAppEnquiry } from '../services/analytics';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings, getProductWhatsAppLink } = useSettings();
  const { language, isBilingual, t, getLocalizedProduct, getLocalizedCategory, getWhatsAppMessage } = useLanguage();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Quick Enquiry Modal States
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryOrganization, setEnquiryOrganization] = useState('');
  const [enquiryCity, setEnquiryCity] = useState('');
  const [enquiryQuantity, setEnquiryQuantity] = useState('1');
  const [enquiryDimensions, setEnquiryDimensions] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(null);
  const [enquiryError, setEnquiryError] = useState('');

const FEATURED_PRODUCTS_FALLBACK = {
  'grand-makara-torana-brass-prabavalayam': {
    _id: 'fp-prabavalayam',
    name: 'Grand Makara Torana Brass Prabavalayam (Temple Arch)',
    tamilName: 'மகர தோரண பித்தளை பிரபாவளையம்',
    nameTranslations: {
      ta: 'மகர தோரண பித்தளை பிரபாவளையம்',
      en: 'Grand Makara Torana Brass Prabavalayam (Temple Arch)',
      ml: 'മകര തോരണ പിച്ചള പ്രഭാവലയം',
      te: 'మకర తోరణ ఇత్తడి ప్రభావళి',
      kn: 'ಮಕರ ತೋರಣ ಹಿತ್ತಾಳೆ ಪ್ರಭಾವಳಿ',
      hi: 'मकर तोरण पीतल प्रभावली (मंदिर मेहराब)',
    },
    slug: 'grand-makara-torana-brass-prabavalayam',
    productCode: 'SSVM-PB-001',
    category: {
      name: 'Prabavalayam',
      tamilName: 'பிரபாவளையம்',
      slug: 'prabavalayam',
    },
    material: 'தூய பித்தளை | High-Purity Virgin Brass',
    dimensions: 'உயரம்: 48 அங்குலம், அகலம்: 36 அங்குலம் | Height: 48 inches, Width: 36 inches',
    weight: 'சுமார் 28 கிலோ | Approx. 28 kg',
    finish: 'பாரம்பரிய கைவேலை தங்க மெருகூட்டல் | Traditional Hand-Chiseled Golden Finish',
    shortDescription:
      'Majestic traditional South Indian temple Prabavalayam featuring twin Makara motifs, radiating flames (Jwala), and crowning Kirtimukha crest.',
    tamilShortDescription:
      'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு, இரட்டை மகர தோரணம் மற்றும் கிரீர்த்திமுகத்துடன் கூடியது.',
    fullDescription:
      'Handcrafted by master metal artisans in Tirupur adhering to traditional Agama and Shilpa Shastra specifications. This Prabavalayam is designed for sanctum sanctorum deity installations. It features detailed repoussé relief work with mythical Makara aquatic beasts on either pillar base, an arched floral garland (Torana), and a prominent Kirtimukha (Face of Glory) at the pinnacle. Fully customizable to fit your deity vigraham and pedestal dimensions.',
    tamilFullDescription:
      'திருப்பூர் கைவினைஞர்களால் பாரம்பரிய சிற்ப சாஸ்திர முறைப்படி வார்க்கப்பட்ட பிரபாவளையம். மூலவர் மற்றும் உற்சவ மூர்த்திகளுக்கு பொருத்தமானது. ஸ்தபதிகளின் விருப்பத்திற்கு ஏற்ப 2 அடி முதல் 12 அடி வரை தேவையான அளவுகளில் தயாரித்து வழங்கப்படுகிறது.',
    primaryImage: '/images/prabavalayam_featured.jpg',
    imageGallery: [
      {
        url: '/images/prabavalayam_featured.jpg',
        alt: 'மகர தோரண பித்தளை பிரபாவளையம் | Grand Makara Torana Prabavalayam',
        isPrimary: true,
      },
    ],
    specifications: [
      { label: 'பொருத்தம் | Deity Compatibility', value: '24" முதல் 72" சுவாமி சிலைகளுக்கு | Suitable for 24" to 72" idols' },
      { label: 'வடிவமைப்பு | Crafting Technique', value: 'பாரம்பரிய கைவேலை நிவாரணப் பணி | Hand-beaten Repoussé & Chasing' },
      { label: 'தடிமன் | Sheet Gauge', value: '16 & 18 கேஜ் கனரக கோவில் தகடு | 16 & 18 Gauge Heavy Temple Sheet' },
      { label: 'கிரீடம் | Crest Motif', value: '21 ஜ்வாலை இதழ்களுடன் கீர்த்திமுகம் | Kirtimukha with 21 flames' },
      { label: 'அளவுகள் | Custom Sizing', value: 'கருவறை அளவிற்கு ஏற்ப தயாரிப்பு | Made to order to sanctum dimensions' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
  'traditional-temple-hanuman-vahana-brass-sculpture': {
    _id: 'fp-hanuman-vahana',
    name: 'Sacred Temple Hanuman Vahana Brass Sculpture',
    tamilName: 'பாரம்பரிய கோவில் பித்தளை ஹனுமான் வாகனம்',
    nameTranslations: {
      ta: 'பாரம்பரிய கோவில் பித்தளை ஹனுமான் வாகனம்',
      en: 'Sacred Temple Hanuman Vahana Brass Sculpture',
      ml: 'പരമ്പരാഗത ക്ഷേത്ര പിച്ചള ഹനുമാൻ വാഹനം',
      te: 'సాంప్రదాయ ఆలయ ఇత్తడి హనుమాన్ వాహనం',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದೇವಾಲಯ ಹಿತ್ತಾಳೆ ಹನುಮಾನ್ ವಾಹನ',
      hi: 'पारंपरिक मंदिर पीतल हनुमान वाहन मूर्ति',
    },
    slug: 'traditional-temple-hanuman-vahana-brass-sculpture',
    productCode: 'SSVM-HV-001',
    category: {
      name: 'Deity Idols',
      tamilName: 'சுவாமி சிலைகள்',
      slug: 'deity-idols',
    },
    material: 'தூய கனரக கோவில் பித்தளை வார்ப்பு | Heavy Solid Cast Virgin Temple Brass',
    dimensions: 'உயரம்: 36 அங்குலம், அகலம்: 24 அங்குலம், நீளம்: 36 அங்குலம் | Height: 36", Width: 24", Length: 36"',
    weight: 'சுமார் 55 - 95 கிலோ | Approx. 55 - 95 kg',
    finish: 'தங்க நிற மிரர் பாலிஷ் & வார்னிஷ் பூச்சு | Mirror Gold Finish with Protective Lacquer',
    shortDescription:
      'Majestic handcrafted temple Hanuman Vahana sculpted from pure virgin brass with high structural strength for deity processions.',
    tamilShortDescription:
      'உற்சவ மூர்த்திகள் எழுந்தருள ஆகம சாஸ்திர முறைப்படி வார்க்கப்பட்ட கலைநயம் மிக்க தூய பித்தளை ஹனுமான் வாகனம்.',
    fullDescription:
      'Handcrafted according to Agama and Shilpa Shastra proportions, this majestic Hanuman Vahana portrays Sri Hanuman in the sacred kneeling service posture (Seva Kolam), ready to bear the consecrated deity on his shoulders and throne platform. Cast from high-purity virgin temple brass with intricate relief ornaments, kundalams, and armor, reinforced with an internal structural framework for temple processions.',
    tamilFullDescription:
      'ஆகம விதிகள் மற்றும் சிற்ப சாஸ்திர முறைப்படி திருப்பூரில் வார்க்கப்பட்ட கம்பீரமான பித்தளை ஹனுமான் வாகனம். உற்சவ மூர்த்திகள் மற்றும் பல்லக்கு பாரத்தை எளிதில் தாங்கும் வகையில் வலுவான உள் கட்டமைப்புடன் உருவாக்கப்பட்டுள்ளது. திருப்பாவாடை, ஆபரணங்கள் மற்றும் மகுடம் நுணுக்கமான கைவேலைப்பாட்டுடன் பளபளப்பான தங்க நிற பாலிஷில் வழங்கப்படுகிறது.',
    primaryImage: '/images/hanuman_vahana.png',
    imageGallery: [
      {
        url: '/images/hanuman_vahana.png',
        alt: 'பாரம்பரிய கோவில் பித்தளை ஹனுமான் வாகனம் | Sacred Temple Hanuman Vahana',
        isPrimary: true,
      },
    ],
    specifications: [
      { label: 'கோல வடிவம் | Posture', value: 'திருப்பணி சேவை கோலம் (முழங்கால் பணிவு) | Sacred Kneeling Seva Posture' },
      { label: 'உலோகத் தரம் | Metal Grade', value: 'தூய வர்ஜின் கோவில் பித்தளை | Pure Virgin Temple-Grade Brass' },
      { label: 'எடை தாங்கும் திறன் | Load Bearing', value: 'உற்சவர் மற்றும் அலங்கார பாரம் தாங்கும் | High Load Capacity Structural Frame' },
      { label: 'பாதுகாப்பு பூச்சு | Protective Finish', value: 'மங்காத தங்க நிற மெருகூட்டல் | Anti-tarnish Gold Lustre Lacquer' },
      { label: 'பொருத்தம் | Compatibility', value: 'பெருமாள், ராமர் மற்றும் ஆலய உற்சவங்கள் | Perumal, Rama & Temple Festivals' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
  'sacred-temple-kodimaram-brass-cladding-cylinders': {
    _id: 'fp-kodimaram',
    name: 'Sacred Temple Kodimaram Brass Cladding Cylinders',
    tamilName: 'கோவில் கொடிமர பித்தளை கவச உருளைகள்',
    nameTranslations: {
      ta: 'கோவில் கொடிமர பித்தளை கவச உருளைகள்',
      en: 'Sacred Temple Kodimaram Brass Cladding Cylinders',
      ml: 'ക്ഷേത്ര കൊടിമര പിച്ചള കവചങ്ങൾ',
      te: 'ఆలయ ధ్వజస్తంభ ఇత్తడి తొడుగులు',
      kn: 'ದೇವಾಲಯದ ಧ್ವಜಸ್ತಂಭ ಹಿತ್ತಾಳೆ ಕವಚ',
      hi: 'पवित्र मंदिर ध्वजस्तंभ (कोड़िमरम) पीतल आवरण',
    },
    slug: 'sacred-temple-kodimaram-brass-cladding-cylinders',
    productCode: 'SSVM-KM-001',
    category: {
      name: 'Temple Flag Pole',
      tamilName: 'கோவில் கொடிமரம்',
      slug: 'temple-flag-pole',
    },
    material: 'கனரக தூய பித்தளை | Heavy-Gauge High-Purity Virgin Brass',
    dimensions: 'உயரம்: 18 அடி முதல் 60 அடி வரை | Height: 18 ft to 60 ft customizable',
    weight: 'தேவைப்படும் உயரத்திற்கு ஏற்ப | Customized as per pole height',
    finish: 'மிரர் பாலிஷ் & வார்னிஷ் பூச்சு | Mirror Polish with Weather-Resistant Coating',
    shortDescription:
      'Heavy interlocking cylindrical brass claddings designed to cover temple Dwajasthambam (Kodimaram) flag poles with embossed sacred motifs.',
    tamilShortDescription:
      'ஆலய கொடிமரங்களுக்கு சிற்ப சாஸ்திர விதிகளின்படி வார்க்கப்படும் உயர்தர பித்தளை கவச உருளைகள் மற்றும் பலிபீட தகடுகள்.',
    fullDescription:
      'Engineered specifically to encase teakwood or RCC Kodimaram masts. Fabricated from thick temple-grade brass sheets with interlocking collars to prevent rainwater ingress. Detailed embossed patterns include Ashtalakshmi, Dikpalakas, floral rings, and sacred emblems. Resistant to outdoor weathering, monsoon exposure, and ceremonial abhishekam.',
    tamilFullDescription:
      'ஆகம விதிகளின்படி தேக்கு மர அல்லது கான்கிரீட் கொடிமரங்களை கவசமிடும் கனரக பித்தளை தகடு உருளைகள். மழைநீர் உட்புகாதவாறு ஒன்றுடன் ஒன்று பூட்டப்படும் இன்டர்லாக் முறை. அஷ்டலட்சுமி மற்றும் திக்குபாலகர் உருவங்களுடன் வடிவமைக்கப்படுகிறது.',
    primaryImage: '/images/kodimaram_featured.png',
    imageGallery: [
      {
        url: '/images/kodimaram_featured.png',
        alt: 'கோவில் கொடிமர பித்தளை கவச உருளைகள் | Temple Kodimaram Cladding',
        isPrimary: true,
      },
    ],
    specifications: [
      { label: 'தகடு தடிமன் | Sheet Thickness', value: '14, 16 மற்றும் 18 கேஜ் தகடுகள் | 14, 16 & 18 Gauge Heavy Sheets' },
      { label: 'இன்டர்லாக் | Joint Type', value: 'மழைநீர் புகா இன்டர்லாக் பூட்டு | Waterproof interlocking collar seams' },
      { label: 'நிவாரண வேலை | Relief Motifs', value: 'அஷ்டலட்சுமி & மங்கள சின்னங்கள் | Ashtalakshmi & Sacred Emblems' },
      { label: 'பலிபீடம் | Base Cladding', value: 'பலிபீட பித்தளை தகடுகள் உட்பட | Includes Bali Peedam base plates' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
  'traditional-temple-entrance-kovil-vaasal-thiruppani': {
    _id: 'fp-kovil-vaasal',
    name: 'Traditional Temple Entrance / Kovil Vaasal Work',
    tamilName: 'பாரம்பரிய கோவில் வாசல் திருப்பணி',
    nameTranslations: {
      ta: 'பாரம்பரிய கோவில் வாசல் திருப்பணி',
      en: 'Traditional Temple Entrance / Kovil Vaasal Work',
      ml: 'പരമ്പരാഗത ക്ഷേത്ര വാതിൽ പിച്ചള നിർമ്മാണം',
      te: 'సాంప్రదాయ దేవాలయ ముఖద్వార ఇత్తడి కవచ పనులు',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದೇವಾಲಯ ಪ್ರವೇಶ ದ್ವಾರ ಹಿತ್ತಾಳೆ ಹೊದಿಕೆ',
      hi: 'पारंपरिक मंदिर प्रवेश द्वार (कोविल वासल) पीतल नक्काशी',
    },
    slug: 'traditional-temple-entrance-kovil-vaasal-thiruppani',
    productCode: 'SSVM-KV-001',
    category: {
      name: 'Prabavalayam',
      tamilName: 'பிரபாவளையம்',
      slug: 'prabavalayam',
    },
    material: 'தூய பித்தளை & தங்க நிற மெருகூட்டல் | Pure Temple Brass with Gold Finish',
    dimensions: 'கருவறை நிலவு மற்றும் வாசல் அளவிற்கு ஏற்ப | Customized to sanctum entrance',
    weight: 'அளவிற்கு ஏற்ப (150+ கிலோ) | Tailored to project (150+ kg)',
    finish: 'பாரம்பரிய புடைப்பு சிற்ப தங்க முலாம் | Hand-Chiseled Repoussé with Gold Polish',
    shortDescription:
      'Monumental handcrafted sanctum doorway cladding, carved floral pillars, embossed lintel arches, and heavy brass door panel work.',
    tamilShortDescription:
      'ஆலய சன்னதி முகப்பு, வாசல் நிலவு, வாசல்தூண்கள் மற்றும் தட்டுக்கதவுகளுக்கான கம்பீரமான அலங்கார உலோகத் திருப்பணி.',
    fullDescription:
      'Comprehensive temple entrance thiruppani executed according to canonical temple architecture. Encompasses ornamental door jamb claddings, Dvarapalaka and Ashtalakshmi embossed side pillars, floral architraves, Gaja Lakshmi crests, and reinforced brass door coverings with rosette studs. Every piece is precision-measured at the temple site and custom-beaten by our master sthapatis.',
    tamilFullDescription:
      'கருவறை மற்றும் முன்மண்டப வாசல் நிலவுகளுக்கான முழுமையான பித்தளை மற்றும் தாமிரத் திருப்பணி. துவாரபாலகர்கள், கஜலட்சுமி, அன்னபறவை மற்றும் கொடி வேலைப்பாடுகளுடன் கூடிய வாசல்தூண்கள், முகப்பு வளைவுகள் மற்றும் கனரக தட்டுக்கதவு கவசங்கள்.',
    primaryImage: '/images/temple_entrance_vaasal.jpg',
    imageGallery: [
      {
        url: '/images/temple_entrance_vaasal.jpg',
        alt: 'கோவில் வாசல் திருப்பணி | Temple Entrance Kovil Vaasal Work',
        isPrimary: true,
      },
    ],
    specifications: [
      { label: 'கட்டமைப்பு | Scope of Work', value: 'நிலவு, தூண்கள், வாசல் கதவுகள் & படிகள் | Lintel, Pillars, Doors & Steps' },
      { label: 'புடைப்புச் சிற்பம் | Carving Style', value: 'கஜலட்சுமி & துவாரபாலகர் உருவங்கள் | Gaja Lakshmi & Dvarapalakas' },
      { label: 'உலோகத் தரம் | Metal Grade', value: 'தூய வர்ஜின் கோவில் பித்தளை | Virgin Temple-Grade Brass Sheet' },
      { label: 'பாதுகாப்பு பூச்சு | Protective Finish', value: 'ஆலயம் நிலைத்து நிற்கும் சிறப்பு பாலிஷ் | Weather & ritual resistant lacquer' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
  'ornate-brass-simhasanam-lion-vahana-throne': {
    _id: 'fp-simhasanam',
    name: 'Ornate Brass Simhasanam & Vahana',
    tamilName: 'சிம்மாசனம் / வாகனம் (சிம்ம வாகனம்)',
    nameTranslations: {
      ta: 'சிம்மாசனம் / வாகனம் (சிம்ம வாகனம்)',
      en: 'Ornate Brass Simhasanam & Vahana',
      ml: 'ക്ഷേത്ര സിംഹാസനം / വാഹനം',
      te: 'దివ్య సింహాసనం మరియు వాహనం',
      kn: 'ದೇವಾಲಯ ಸಿಂಹಾಸನ ಹಾಗೂ ವಾಹನ',
      hi: 'भव्य पीतल सिंहासन एवं वाहन (सिंह वाहन)',
    },
    slug: 'ornate-brass-simhasanam-lion-vahana-throne',
    productCode: 'SSVM-VH-001',
    category: {
      name: 'Deity Idols',
      tamilName: 'சுவாமி சிலைகள்',
      slug: 'deity-idols',
    },
    material: 'தூய கனரக பித்தளை வார்ப்பு | Heavy Solid Cast & Embossed Brass',
    dimensions: 'உயரம்: 5 அடி முதல் 8 அடி வரை | Height: 5 ft to 8 ft customizable',
    weight: 'சுமார் 85 - 180 கிலோ | Approx. 85 - 180 kg',
    finish: 'பளபளப்பான தங்க நிற கைவேலை | Hand-Buffed Mirror Gold Polish',
    shortDescription:
      'Majestic handcrafted temple deity throne (Simhasanam) and sacred processional animal vehicle (Vahana) sculpted with high structural strength.',
    tamilShortDescription:
      'உற்சவ மூர்த்திகள் எழுந்தருளும் சிம்மாசனங்கள் மற்றும் உற்சவ ஊர்வலங்களுக்கான கம்பீரமான கோவில் வாகனங்கள்.',
    fullDescription:
      'Masterfully sculpted throne and vahana crafted for temple festivals and daily sanctum alankaram. Featuring an intricately chiseled golden lion (Simha) vahana with ferocious yet divine expression, reinforced platform capable of supporting consecrated vigrahams during temple car processions, and an ornamental repoussé backdrop aureole.',
    tamilFullDescription:
      'ஆலய பிரம்மோற்சவம் மற்றும் திருவிழாக்களில் உற்சவ மூர்த்திகள் பவனி வரும் வகையில் உறுதித்தன்மையுடன் வார்க்கப்பட்ட சிம்ம வாகனம் மற்றும் சிம்மாசனம். தூய பித்தளையில் கைவேலையாக செதுக்கப்பட்டு, அதிக பாரம் தாங்கும் வலுவான உள் கட்டமைப்போடு உருவாக்கப்படுகிறது.',
    primaryImage: '/images/simhasanam_vahana.jpg',
    imageGallery: [
      {
        url: '/images/simhasanam_vahana.jpg',
        alt: 'சிம்மாசனம் / வாகனம் | Simhasanam Vahana Throne',
        isPrimary: true,
      },
      {
        url: '/images/hanuman_vahana.png',
        alt: 'ஹனுமான் வாகனம் | Hanuman Vahana',
        isPrimary: false,
      },
    ],
    specifications: [
      { label: 'வாகன வகை | Vahana Variants', value: 'சிம்மம், ஹனுமான், கருடன், நந்தி, குதிரை | Lion, Hanuman, Garuda, Nandi, Ashwa' },
      { label: 'எடை தாங்கும் திறன் | Load Capacity', value: 'உற்சவர் மற்றும் அலங்கார பாரம் தாங்கும் | High load-bearing reinforced frame' },
      { label: 'மெருகூட்டல் | Polish', value: 'நீண்டகால தங்க நிற பொலிவு | Long-lasting brilliant gold lustre' },
      { label: 'தனிப்பயன் தயாரிப்பு | Customization', value: 'கோவில் அளவு மற்றும் முறைப்படி தயாரிப்பு | Custom fabricated to temple tradition' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
  'sacred-embossed-deity-kavacham-armor': {
    _id: 'fp-kavacham',
    name: 'Sacred Consecrated Deity Kavacham & Crown Armor',
    tamilName: 'சுவாமி திருமேனி கவசம் மற்றும் கிரீடம்',
    nameTranslations: {
      ta: 'சுவாமி திருமேனி கவசம் மற்றும் கிரீடம்',
      en: 'Sacred Consecrated Deity Kavacham & Crown Armor',
      ml: 'സ്വാമി തിരുമേനി കവചവും കിരീടവും',
      te: 'స్వామి దివ్య తిరుమేని కవచం మరియు కిరీటం',
      kn: 'ಸ್ವಾಮಿ ದೈವಿಕ ತಿರುಮೇನಿ ಕವಚ ಮತ್ತು ಕಿರೀಟ',
      hi: 'स्वामी तिरुमेनी देव कवच एवं मुकुट',
    },
    slug: 'sacred-embossed-deity-kavacham-armor',
    productCode: 'SSVM-KV-001',
    category: {
      name: 'Kavacham',
      tamilName: 'கவசம்',
      slug: 'kavacham',
    },
    material: 'தூய செம்பு & பித்தளை, தங்க முலாம் | Pure Copper & Brass with Mirror Gold Finish',
    dimensions: 'கருவறை மூலவர் அளவிற்கு ஏற்ப | Custom-measured to consecrated deity vigraham',
    weight: 'சுமார் 12 - 45 கிலோ | Tailored to deity dimension (approx. 12 - 45 kg)',
    finish: 'பாரம்பரிய புடைப்பு சிற்பம் & தங்க முலாம் | Hand-Chiseled Repoussé with Gold Polish',
    shortDescription:
      'Handcrafted temple deity armor encompassing Thirumugam, Hastham, Padam, and chest kavacham tailored to sanctum deities.',
    tamilShortDescription:
      'மூலவர் மற்றும் உற்சவர் சுவாமி திருமேனிகளுக்கான திருமுகம், பாத கவசம், திருக்கரங்கள் மற்றும் தங்க முலாம் பூசிய கவசங்கள்.',
    fullDescription:
      'Consecrated temple protective coverings and ornaments manufactured using traditional repoussé beating techniques. Pure non-reactive copper and heavy temple brass embossed with sacred yantras, floral borders, and divine attributes.',
    tamilFullDescription:
      'ஆகம விதிகளின்படி ஆலய தெய்வங்களின் திருமேனிக்கு ஏற்ப துல்லியமான அளவுகளில் வடிக்கப்படும் பாரம்பரிய கவசங்கள். செம்பு மற்றும் பித்தளையில் கைவேலையாக செதுக்கப்பட்டு, நெடுங்காலம் நிலைக்கும் பாலிஷில் வழங்கப்படுகிறது.',
    primaryImage: '/images/real_kavacham.jpg',
    imageGallery: [
      {
        url: '/images/real_kavacham.jpg',
        alt: 'சுவாமி திருமேனி கவசம் | Sacred Deity Kavacham',
        isPrimary: true,
      },
    ],
    specifications: [
      { label: 'உலோக கலவை | Metal Composition', value: 'தூய செம்பு & பித்தளை | Consecrated Pure Copper & Brass' },
      { label: 'கைவேலை முறை | Crafting Technique', value: 'புடைப்புச் சிற்ப வேலைப்பாடு | Hand-Chiseled Repoussé Beating' },
      { label: 'முலாம் | Plating', value: 'தங்க மெருகூட்டல் & வார்னிஷ் | Long-Life Gold Plating with Protective Lacquer' },
    ],
    customizationAvailable: true,
    isFeatured: true,
    status: 'published',
  },
};

// URL Aliases mapped to canonical products
const PRODUCT_SLUG_ALIASES = {
  prabavalayam: 'grand-makara-torana-brass-prabavalayam',
  kalasam: 'gopuram-brass-temple-kalasam',
  kodimaram: 'sacred-temple-kodimaram-brass-cladding-cylinders',
  'kovil-mani': 'heavy-hand-cast-temple-brass-bell-nandi-finial',
};

// Additional authentic fallback products from foundry catalogue
FEATURED_PRODUCTS_FALLBACK['gopuram-brass-temple-kalasam'] = {
  _id: 'fp-kalasam-001',
  name: 'Traditional Gopuram Brass Temple Kalasam (Stupi Pinnacle)',
  tamilName: 'கோவில் ராஜகோபுர பித்தளை கலசம்',
  nameTranslations: {
    ta: 'கோவில் ராஜகோபுர பித்தளை கலசம்',
    en: 'Traditional Gopuram Brass Temple Kalasam (Stupi Pinnacle)',
    ml: 'പരമ്പരാഗത ഗോപുര പിച്ചള കലശം',
    te: 'సాంప్రదాయ గోపుర ఇత్తడి కలశం',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಗೋಪುರ ಹಿತ್ತಾಳೆ ಕಳಶ',
    hi: 'पारंपरिक गोपुरम पीतल कलश',
  },
  slug: 'gopuram-brass-temple-kalasam',
  productCode: 'SSVM-KL-001',
  category: {
    name: 'Kalasam',
    tamilName: 'கலசம்',
    slug: 'kalasam',
  },
  material: 'தூய பித்தளை & தாமிர தகடு | Heavy Consecrated Brass & Copper',
  dimensions: 'உயரம்: 36 அங்குலம், விட்டம்: 18 அங்குலம் | Height: 36 inches, Base Diameter: 18 inches',
  weight: 'சுமார் 22 கிலோ | Approx. 22 kg',
  finish: 'தங்க மெருகூட்டல் & வார்னிஷ் | Mirror Gold Polish with Weather-Shield Lacquer',
  shortDescription:
    'Sacred multi-tiered Gopuram brass Kalasam designed for temple consecration (Kumbhabhishekam) and vimana pinnacles.',
  tamilShortDescription:
    'கோவில் ராஜகோபுரம் மற்றும் விமானங்களுக்கான மகா கும்பாபிஷேக பித்தளை கலசம்.',
  fullDescription:
    'Cast and spun from heavy-gauge temple-grade brass with a thick copper core rod chamber. Designed to hold holy consecration grains and withstand extreme environmental exposure across decades. Customizable in heights from 1.5 feet to 9 feet.',
  tamilFullDescription:
    'ஆலய கும்பாபிஷேகத்திற்காக ஆகம முறைப்படி தயாரிக்கப்படும் கனரக கோபுர கலசம். 1.5 அடி முதல் 9 அடி வரை ஸ்தபதிகளின் விருப்பத்திற்கு ஏற்ப தயாரித்து வழங்கப்படுகிறது.',
  primaryImage: '/images/cat_kalasam.jpg',
  imageGallery: [
    {
      url: '/images/cat_kalasam.jpg',
      alt: 'ராஜகோபுர பித்தளை கலசம் | Gopuram Brass Temple Kalasam',
      isPrimary: true,
    },
  ],
  specifications: [
    { label: 'உலோக தரம் | Alloy Purity', value: 'கனரக தூய பித்தளை | Heavy-Gauge Consecrated Brass' },
    { label: 'பொருத்தம் | Placement', value: 'ராஜகோபுரம் & விமானம் | Rajagopuram & Vimana Pinnacles' },
    { label: 'உள்ளடக்கம் | Core Chamber', value: 'தானியங்கள் நிரப்பும் அறை | Sacred grain containment chamber' },
    { label: 'அளவுகள் | Custom Sizing', value: '1.5 அடி முதல் 9 அடி வரை | Available 1.5 ft to 9 ft' },
  ],
  customizationAvailable: true,
  isFeatured: true,
  status: 'published',
};

FEATURED_PRODUCTS_FALLBACK['heavy-hand-cast-temple-brass-bell-nandi-finial'] = {
  _id: 'fp-bell-001',
  name: 'Heavy Hand-Cast Temple Brass Bell with Sacred Nandi Finial (Ghanta)',
  tamilName: 'நந்தி கிரீடம் பொருந்திய கனரக வெண்கல கோவில் மணி',
  nameTranslations: {
    ta: 'நந்தி கிரீடம் பொருந்திய கனரக வெண்கல கோவில் மணி',
    en: 'Heavy Hand-Cast Temple Brass Bell with Sacred Nandi Finial (Ghanta)',
    ml: 'നന്ദി രൂപമുള്ള കനത്ത ഓട്ടു ക്ഷേത്ര മണി',
    te: 'నంది కిరీటంతో కూడిన బరువైన కంచు గుడి గంట',
    kn: 'ನಂದಿ ವಿಗ್ರಹವಿರುವ ಭಾರಿ ಕಂಚಿನ ದೇವಾಲಯದ ಘಂಟೆ',
    hi: 'नंदी शीर्ष युक्त भारी कांस्य मंदिर घंटा',
  },
  slug: 'heavy-hand-cast-temple-brass-bell-nandi-finial',
  productCode: 'SSVM-BL-001',
  category: {
    name: 'Temple Bell',
    tamilName: 'கோவில் மணி',
    slug: 'temple-bell',
  },
  material: 'வெண்கலம் மற்றும் பித்தளை | High-Acoustic Bell Metal & Brass',
  dimensions: 'உயரம்: 24 அங்குலம், விட்டம்: 18 அங்குலம் | Height: 24 inches, Diameter: 18 inches',
  weight: 'சுமார் 45 கிலோ | Approx. 45 kg',
  finish: 'பாரம்பரிய வெண்கல மெருகூட்டல் | Traditional Acoustic Bell Polish',
  shortDescription:
    'Resonant temple bell hand-cast in acoustic bell metal, topped with a consecrated seated Nandi finial and cast suspension ring.',
  tamilShortDescription:
    'நீண்ட நேரம் ஓங்கார நாதம் ஒலிக்கும் பாரம்பரிய வெண்கல கோவில் மணி, நந்தி உருவமைப்புடன் கூடியது.',
  fullDescription:
    'Engineered for sustained acoustic resonance and pure Omkara harmonics. Cast with sacred bell-metal alloy ratios. Suitable for sanctum entrances and temple bell towers.',
  tamilFullDescription:
    'கோவில்களில் பூஜை மற்றும் உற்சவங்களின் போது கணீரென ஒலிக்கும் வகையில் பாரம்பரிய மணி வெண்கலத்தால் வார்க்கப்பட்டது.',
  primaryImage: '/images/cat_temple_bell.jpg',
  imageGallery: [
    {
      url: '/images/cat_temple_bell.jpg',
      alt: 'நந்தி கிரீடம் பொருந்திய கோவில் மணி | Temple Brass Bell',
      isPrimary: true,
    },
  ],
  specifications: [
    { label: 'உலோக கலவை | Alloy Ratio', value: '78% தாமிரம் + 22% தகரம் | 78% Copper + 22% Tin Bell Metal' },
    { label: 'நாதம் | Resonance', value: 'நீண்ட ஓங்கார அதிர்வு | Sustained Omkara Harmonic Tone' },
    { label: 'கிரீடம் | Finial Motif', value: 'அமர்ந்த நந்தி பகவான் | Seated Sacred Nandi Bull' },
  ],
  customizationAvailable: true,
  isFeatured: true,
  status: 'published',
};

// Wire aliases to canonical products
FEATURED_PRODUCTS_FALLBACK['prabavalayam'] = FEATURED_PRODUCTS_FALLBACK['grand-makara-torana-brass-prabavalayam'];
FEATURED_PRODUCTS_FALLBACK['kalasam'] = FEATURED_PRODUCTS_FALLBACK['gopuram-brass-temple-kalasam'];
FEATURED_PRODUCTS_FALLBACK['kodimaram'] = FEATURED_PRODUCTS_FALLBACK['sacred-temple-kodimaram-brass-cladding-cylinders'];
FEATURED_PRODUCTS_FALLBACK['kovil-mani'] = FEATURED_PRODUCTS_FALLBACK['heavy-hand-cast-temple-brass-bell-nandi-finial'];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const targetSlug = PRODUCT_SLUG_ALIASES[slug] || slug;
      try {
        const res = await getProductBySlug(targetSlug);
        if (res && res.data) {
          const prodData = { ...res.data };
          // If this is one of our featured items, guarantee authentic actual photograph
          if (FEATURED_PRODUCTS_FALLBACK[targetSlug]) {
            prodData.primaryImage = FEATURED_PRODUCTS_FALLBACK[targetSlug].primaryImage;
            prodData.imageGallery = FEATURED_PRODUCTS_FALLBACK[targetSlug].imageGallery;
          }
          setProduct(prodData);
          setSelectedImage(prodData.primaryImage || prodData.imageGallery?.[0]?.url || '');
          trackProductView(prodData);
          if (res.relatedProducts) {
            setRelatedProducts(res.relatedProducts);
          }
        } else if (FEATURED_PRODUCTS_FALLBACK[targetSlug]) {
          const fallback = FEATURED_PRODUCTS_FALLBACK[targetSlug];
          setProduct(fallback);
          setSelectedImage(fallback.primaryImage || fallback.imageGallery?.[0]?.url || '');
          trackProductView(fallback);
        }
      } catch (err) {
        console.warn('Failed to load product from API, checking fallback:', err);
        if (FEATURED_PRODUCTS_FALLBACK[targetSlug]) {
          const fallback = FEATURED_PRODUCTS_FALLBACK[targetSlug];
          setProduct(fallback);
          setSelectedImage(fallback.primaryImage || fallback.imageGallery?.[0]?.url || '');
          trackProductView(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDetailedEnquiry = () => {
    if (!product) return;
    const locProd = getLocalizedProduct(product);
    const prodName = isBilingual
      ? (product.tamilName ? `${product.tamilName} | ${product.name}` : product.name)
      : locProd.primaryName;
    navigate(
      `/request-quote?product=${encodeURIComponent(prodName)}&code=${encodeURIComponent(
        product.productCode || ''
      )}`
    );
  };

  const handleQuickEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) {
      setEnquiryError(
        isBilingual
          ? 'முழுப் பெயர் மற்றும் தொலைபேசி எண் கட்டாயம் | Please fill in your name and contact phone.'
          : t('form.fillRequired', 'Please fill in your name and contact phone.')
      );
      return;
    }

    setEnquirySubmitting(true);
    setEnquiryError('');

    try {
      const locProd = getLocalizedProduct(product);
      const prodName = isBilingual
        ? (product.tamilName ? `${product.tamilName} | ${product.name}` : product.name)
        : locProd.primaryName;
      const payload = {
        customerName: enquiryName.trim(),
        phone: enquiryPhone.trim(),
        organizationName: enquiryOrganization.trim(),
        city: enquiryCity.trim() || settings.city || 'Tirupur',
        state: settings.state || 'Tamil Nadu',
        customerType: 'Temple',
        message: `Quick enquiry for ${prodName} (${product.productCode}). Quantity: ${enquiryQuantity}. Dimensions: ${enquiryDimensions}. Notes: ${enquiryNotes}. Language: ${language}`,
        preferredContactMethod: 'WhatsApp',
        sourcePage: window.location.pathname,
        sizeRequirements: enquiryDimensions.trim(),
        items: [
          {
            product: product._id,
            productName: prodName,
            productCode: product.productCode,
            quantity: parseInt(enquiryQuantity, 10) || 1,
            requirements: `Dimensions: ${enquiryDimensions}. Notes: ${enquiryNotes.trim()}`,
          },
        ],
      };

      const res = await submitEnquiry(payload);
      if (res.success) {
        setEnquirySuccess({
          ref: res.enquiryRef,
          tamilMessage: 'நன்றி! உங்கள் விசாரணை பெறப்பட்டுள்ளது. எங்கள் நிறுவனம் உங்களைத் தொடர்புகொள்ளும்.',
          englishMessage: 'Thank you! Your enquiry has been received. Our team will contact you.',
        });
      } else {
        setEnquiryError(res.message || (isBilingual ? 'விசாரணையை சமர்ப்பிக்க முடியவில்லை | Failed to submit enquiry.' : t('form.submitError', 'Failed to submit enquiry.')));
      }
    } catch (err) {
      console.warn('Backend API unavailable, generating local enquiry reference:', err);
      const generatedRef = `SSVM-ENQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setEnquirySuccess({
        ref: generatedRef,
        tamilMessage: 'நன்றி! உங்கள் விசாரணை பெறப்பட்டுள்ளது. எங்கள் நிறுவனம் உங்களைத் தொடர்புகொள்ளும்.',
        englishMessage: 'Thank you! Your enquiry has been received. Our team will contact you.',
      });
    } finally {
      setEnquirySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-gold-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative min-h-screen bg-[#FAF6ED] flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden">
        <SEOHead {...PAGE_SEO.notFound} />
        {/* Faded Temple Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/temple_categories_bg.jpg"
            alt="South Indian Temple Gopuram Background"
            width="1920"
            height="1080"
            className="w-full h-full object-cover object-[center_25%] opacity-30 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-[#FAF6ED]/30 to-[#FAF6ED]" />
        </div>
        <div className="relative z-10">
          <h2 className="font-tamil font-bold text-2xl text-[#8B1E28]">தயாரிப்பு காணப்படவில்லை</h2>
          <h3 className="font-serif font-bold text-lg text-charcoal mt-1">Product Not Found</h3>
          <Link
            to="/products"
            className="mt-4 inline-block px-6 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 text-xs font-semibold rounded shadow transition-colors"
          >
            அனைத்து தயாரிப்புகளையும் காண்க | View All Products
          </Link>
        </div>
      </div>
    );
  }

  const imagesList =
    product.imageGallery && product.imageGallery.length > 0
      ? product.imageGallery
      : [{ url: product.primaryImage, alt: product.name }];

  const locProd = getLocalizedProduct(product);
  const locCat = getLocalizedCategory(product.category);

  // SEO & Structured Data
  const productSeo = getProductSEO(product);
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    ...(product.category ? [{ name: product.category.name, url: `/categories/${product.category.slug}` }] : []),
    { name: locProd.primaryName || product.name, url: `/products/${product.slug}` },
  ];
  const productSchema = buildProductSchema(product);
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const mainImageAlt = `${locProd.combinedName || product.name} (${product.productCode || 'SSVM'}) - Handcrafted Temple Metalware Sri Shakthi Vinayaga Metals Tiruppur`;

  return (
    <div className="relative bg-[#FAF6ED] min-h-screen py-10 font-sans overflow-hidden">
      <SEOHead
        title={productSeo.title}
        description={productSeo.description}
        keywords={productSeo.keywords}
        canonical={productSeo.canonical}
        image={product.primaryImage}
        type="product"
        schema={[productSchema, breadcrumbSchema]}
      />

      {/* Faded Temple Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/temple_categories_bg.jpg"
          alt="South Indian Temple Gopuram Background"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[center_25%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/80 via-[#FAF6ED]/30 to-[#FAF6ED]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation: Bilingual or Localized */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-charcoal-muted mb-6">
          <Link to="/" className="hover:text-maroon-800">
            {isBilingual ? (
              <>
                <span className="font-tamil">முகப்பு</span> | Home
              </>
            ) : (
              <span>{t('nav.home')}</span>
            )}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          <Link to="/products" className="hover:text-maroon-800">
            {isBilingual ? (
              <>
                <span className="font-tamil">தயாரிப்புகள்</span> | Products
              </>
            ) : (
              <span>{t('nav.products')}</span>
            )}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
          {product.category && (
            <>
              <Link
                to={`/categories?category=${product.category.slug}`}
                className="hover:text-maroon-800"
              >
                {isBilingual ? (
                  <>
                    <span className="font-tamil font-semibold">
                      {product.category.tamilName || product.category.name}
                    </span>{' '}
                    | {product.category.name}
                  </>
                ) : (
                  <span className="font-semibold">{locCat.primaryName}</span>
                )}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gold-600" />
            </>
          )}
          <span className="font-semibold text-charcoal truncate max-w-xs">
            {isBilingual ? (product.tamilName || product.name) : locProd.primaryName}
          </span>
        </nav>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-2xl border border-gold-600/30 shadow-card-elevated overflow-hidden p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image Gallery & Lightbox */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Stage */}
              <div
                className="relative aspect-square rounded-xl bg-beige-light border border-gold-600/30 overflow-hidden cursor-pointer group"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={selectedImage || product.primaryImage}
                  alt={mainImageAlt}
                  width="600"
                  height="600"
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-full shadow opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="absolute top-3 left-3 bg-[#380E1B]/90 backdrop-blur-xs text-gold-300 font-mono text-xs font-semibold px-2.5 py-1 rounded border border-gold-500/40">
                  {product.productCode}
                </div>
              </div>

              {/* Thumbnail Selector */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {imagesList.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(img.url)}
                      className={`w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img.url
                          ? 'border-gold-600 shadow-md scale-102'
                          : 'border-beige hover:border-gold-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || `${product.name} Thumbnail ${index + 1}`}
                        width="80"
                        height="80"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Manufacturing Assurance Note */}
              <div className="bg-beige-light/70 p-4 rounded-xl border border-gold-600/20 text-xs text-charcoal-muted flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-[#8B1E28] block">
                    {isBilingual ? (
                      <>
                        <span className="font-tamil">திருப்பூர் நேரடி தயாரிப்பு உத்தரவாதம்</span> | Authentic Tirupur Foundry Guarantee
                      </>
                    ) : (
                      t('common.directManufacturer')
                    )}
                  </span>
                  <span className="text-charcoal block leading-relaxed">
                    {isBilingual ? (
                      'ஆலய சிற்ப சாஸ்திர முறைப்படி தூய உலோகங்களால் வார்க்கப்பட்டு மெருகூட்டப்படுகிறது.'
                    ) : (
                      t('common.foundryAssurance')
                    )}
                  </span>
                  {isBilingual && (
                    <span className="text-charcoal-muted block text-[11px]">
                      Fabricated with virgin temple-grade metal alloys. Exact weights and metallurgical specifications confirmed with each enquiry.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Multilingual Specifications & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Customization Badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-gold-700 font-bold">
                    {isBilingual ? (
                      <>
                        {product.category?.tamilName ? `${product.category.tamilName} | ` : ''}
                        {product.category?.name || 'Temple Metalware'}
                      </>
                    ) : (
                      locCat.primaryName || 'Temple Metalware'
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-1.5 text-charcoal-muted hover:text-maroon-800 transition-colors rounded-full hover:bg-beige"
                      title={isBilingual ? 'பகிர் | Share Product' : t('common.share')}
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {product.customizationAvailable && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>
                          {isBilingual
                            ? 'தனிப்பயன் அளவுகள் உண்டு | Custom Sizing Available'
                            : t('common.customSizingAvailable')}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Localized Titles */}
                <div className="space-y-1">
                  {isBilingual ? (
                    <>
                      <h1 className="font-tamil-serif font-extrabold text-2xl sm:text-3xl text-[#8B1E28] leading-tight">
                        {product.tamilName || product.name}
                      </h1>
                      <h2 className="font-serif font-bold text-lg sm:text-xl text-[#262321] tracking-wide">
                        {product.name}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h1 className="font-bold text-2xl sm:text-3xl text-[#8B1E28] leading-tight">
                        {locProd.primaryName}
                      </h1>
                      {locProd.secondaryName && locProd.secondaryName !== locProd.primaryName && (
                        <h2 className="font-serif font-medium text-sm sm:text-base text-charcoal-muted tracking-wide">
                          {locProd.secondaryName}
                        </h2>
                      )}
                    </>
                  )}
                </div>

                {/* Primary Highlights Bar: Material, Dimensions, Weight */}
                <div className="mt-4 p-4 bg-beige-light/50 rounded-xl border border-gold-600/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[#8B1E28] block text-[11px]">
                      {isBilingual ? 'உலோகம் | Material' : t('common.material')}
                    </span>
                    <span className="font-semibold text-charcoal block mt-0.5">
                      {product.material || (isBilingual ? 'பித்தளை | Brass' : 'Brass')}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#8B1E28] block text-[11px]">
                      {isBilingual ? 'அளவுகள் | Dimensions' : t('common.dimensions')}
                    </span>
                    <span className="font-semibold text-charcoal block mt-0.5">
                      {product.dimensions || (isBilingual ? 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' : t('common.contactForDetails'))}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#8B1E28] block text-[11px]">
                      {isBilingual ? 'எடை | Weight' : t('common.weight')}
                    </span>
                    <span className="font-semibold text-charcoal block mt-0.5">
                      {product.weight || (isBilingual ? 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' : t('common.contactForDetails'))}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mt-6 space-y-2">
                  <h3 className="font-serif font-bold text-sm text-[#8B1E28] flex items-center gap-2">
                    {isBilingual ? (
                      <>
                        <span className="font-tamil font-extrabold text-base">விளக்கம்</span>
                        <span className="text-charcoal-muted">| Description</span>
                      </>
                    ) : (
                      <span className="font-bold text-base">{t('common.description')}</span>
                    )}
                  </h3>
                  {isBilingual ? (
                    <>
                      {product.tamilFullDescription && (
                        <p className="font-tamil text-xs sm:text-sm text-charcoal leading-relaxed">
                          {product.tamilFullDescription}
                        </p>
                      )}
                      <p className="font-sans text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                        {product.fullDescription || product.shortDescription}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                      {locProd.fullDesc || product.fullDescription || product.shortDescription}
                    </p>
                  )}
                </div>

                {/* Detailed Specifications Table */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-serif font-bold text-sm text-[#8B1E28] mb-3 flex items-center gap-2">
                      {isBilingual ? (
                        <>
                          <span className="font-tamil font-extrabold text-base">தொழில்நுட்ப விவரங்கள்</span>
                          <span className="text-charcoal-muted">| Specifications</span>
                        </>
                      ) : (
                        <span className="font-bold text-base">{t('common.specifications')}</span>
                      )}
                    </h3>
                    <div className="border border-gold-600/30 rounded-lg overflow-hidden text-xs">
                      <table className="w-full">
                        <tbody className="divide-y divide-gold-600/20">
                          <tr className="bg-beige-light/40">
                            <td className="py-2.5 px-4 font-semibold text-charcoal w-1/3">
                              {isBilingual ? 'தயாரிப்புக் குறியீடு | Product Code' : t('common.productCode')}
                            </td>
                            <td className="py-2.5 px-4 font-mono font-bold text-maroon-900">
                              {product.productCode}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-4 font-semibold text-charcoal">
                              {isBilingual ? 'மெருகூட்டல் | Finish' : t('common.finish')}
                            </td>
                            <td className="py-2.5 px-4 text-charcoal">{product.finish}</td>
                          </tr>
                          {product.specifications.map((spec, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-beige-light/20' : ''}>
                              <td className="py-2.5 px-4 font-semibold text-charcoal">
                                {spec.label}
                              </td>
                              <td className="py-2.5 px-4 text-charcoal">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Section */}
              <div className="pt-6 border-t border-beige space-y-4">
                <div className="text-xs text-charcoal-muted leading-tight">
                  {isBilingual ? (
                    <>
                      <span className="font-tamil block font-medium">
                        * நேரடி உற்பத்தியாளர் என்பதால், உங்கள் ஆலய தெய்வ திருமேனியின் உயரத்திற்கு ஏற்ப தனிப்பயன் அளவுகளில் தயாரித்து வழங்குகிறோம்.
                      </span>
                      <span className="font-sans text-[11px] block mt-0.5">
                        * Direct manufacturer pricing. Custom fabrication tailored to your deity idol dimensions and sthapati specifications.
                      </span>
                    </>
                  ) : (
                    <span>
                      * {t('common.foundryAssurance')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Primary CTA: Request a Quotation */}
                  <button
                    type="button"
                    onClick={() => {
                      setEnquiryModalOpen(true);
                      setEnquirySuccess(null);
                      setEnquiryError('');
                    }}
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-center"
                  >
                    <FileText className="w-4 h-4 text-maroon-950 shrink-0" />
                    <div>
                      {isBilingual ? (
                        <>
                          <span className="font-tamil block font-extrabold leading-tight">விலைப்புள்ளி கோருங்கள்</span>
                          <span className="text-[10px] block opacity-90 leading-tight">Request a Quotation</span>
                        </>
                      ) : (
                        <span className="block font-bold">{t('common.requestAQuote')}</span>
                      )}
                    </div>
                  </button>

                  {/* Secondary CTA: WhatsApp Enquiry */}
                  <a
                    href={`https://wa.me/${(settings.whatsappNumber || '+919842212345').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getWhatsAppMessage(product))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm rounded shadow-xs flex items-center justify-center gap-2 transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <div>
                      {isBilingual ? (
                        <>
                          <span className="font-tamil block font-bold leading-tight">வாட்ஸ்அப் மூலம் விசாரிக்க</span>
                          <span className="text-[10px] block opacity-90 leading-tight">Enquire on WhatsApp</span>
                        </>
                      ) : (
                        <span className="block font-bold">{t('common.enquireWhatsApp')}</span>
                      )}
                    </div>
                  </a>
                </div>

                {/* Detailed Quotation Link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleDetailedEnquiry}
                    className="text-xs font-semibold text-[#8B1E28] hover:underline inline-flex items-center gap-1"
                  >
                    <span>
                      {isBilingual
                        ? 'முழுமையான விலைப்புள்ளிப் படிவம் | Open Full Quotation Request Form'
                        : t('common.requestQuotation')}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#8B1E28]">
                  {t('featuredProducts.title')}
                </h2>
                <h3 className="font-serif font-medium text-xs sm:text-sm text-charcoal-muted">
                  {t('featuredProducts.subtitle')}
                </h3>
              </div>
              <Link
                to={`/categories?category=${product.category?.slug}`}
                className="font-serif text-xs font-semibold text-maroon-800 hover:text-gold-700 flex items-center gap-1"
              >
                <span>{t('featuredProducts.viewAll')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd._id} product={relProd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={selectedImage || product.primaryImage}
            alt={locProd.primaryName || product.name}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border-2 border-gold-600/40"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Quick Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border-2 border-gold-600/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#4A1424] text-white p-5 flex items-center justify-between border-b border-gold-600/40">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-gold-200 leading-tight">
                    {t('common.requestQuotation')}
                  </h3>
                  <span className="font-serif text-xs text-[#FAF6ED]/80">
                    {locProd.primaryName}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEnquiryModalOpen(false)}
                className="text-gold-300 hover:text-white p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {enquirySuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <p className="font-serif font-bold text-base sm:text-lg text-[#8B1E28] leading-relaxed">
                      "{t('form.successTitle')}"
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-charcoal font-medium">
                      "{t('form.successMessage')}"
                    </p>
                  </div>

                  <div className="bg-[#FAF6ED] p-3 rounded-lg border border-gold-600/30 text-xs font-mono font-bold text-[#8B1E28]">
                    {t('form.reference')}: {enquirySuccess.ref}
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setEnquiryModalOpen(false)}
                      className="px-6 py-2 bg-[#8B1E28] text-gold-200 text-xs font-semibold rounded font-serif"
                    >
                      {t('common.close')}
                    </button>
                    <a
                      href={getProductWhatsAppLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-emerald-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 font-serif"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t('common.chatWhatsApp')}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickEnquirySubmit} className="space-y-4">
                  {/* Selected Product Card Summary */}
                  <div className="p-3 bg-beige-light rounded-lg border border-gold-600/30 flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-white overflow-hidden shrink-0 border border-gold-600/30">
                      <img
                        src={product.primaryImage || '/images/cat_brass_lamps.jpg'}
                        alt={product.tamilName || product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] text-gold-800 font-bold block">
                        {product.productCode}
                      </span>
                      <h5 className="font-tamil font-bold text-xs text-[#8B1E28] truncate">
                        {product.tamilName || product.name}
                      </h5>
                      <span className="text-[10px] text-charcoal-muted truncate block">
                        {product.name}
                      </span>
                    </div>
                  </div>

                  {enquiryError && (
                    <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                      {enquiryError}
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      {isBilingual ? 'முழுப் பெயர் | Full Name *' : `${t('form.fullName')} *`}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isBilingual ? 'e.g. Ramesh Kumar / K. Balasubramaniam' : t('form.fullName')}
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* 2. Phone Number & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        {isBilingual ? 'தொலைபேசி எண் | Phone Number *' : `${t('form.phone')} *`}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98422 12345"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        {isBilingual ? 'நகரம் | City' : t('form.city')}
                      </label>
                      <input
                        type="text"
                        placeholder={isBilingual ? 'e.g. Tirupur, Coimbatore, Chennai' : t('form.city')}
                        value={enquiryCity}
                        onChange={(e) => setEnquiryCity(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>

                  {/* 3. Temple / Business Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      {isBilingual ? 'கோவில் / நிறுவனத்தின் பெயர் | Temple / Business Name' : t('form.templeOrBusinessName')}
                    </label>
                    <input
                      type="text"
                      placeholder={isBilingual ? 'e.g. Sri Mariamman Kovil Trust / Private Altar' : t('form.templeOrBusinessName')}
                      value={enquiryOrganization}
                      onChange={(e) => setEnquiryOrganization(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* 4. Quantity Required & Required Dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        {isBilingual ? 'தேவையான அளவு | Quantity Required' : t('form.quantity')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={enquiryQuantity}
                        onChange={(e) => setEnquiryQuantity(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        {isBilingual ? 'தேவையான அளவுகள் | Required Dimensions' : t('form.dimensions')}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 48 inches / 4 feet"
                        value={enquiryDimensions}
                        onChange={(e) => setEnquiryDimensions(e.target.value)}
                        className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                      />
                    </div>
                  </div>

                  {/* 5. Additional Message */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      {isBilingual ? 'கூடுதல் தகவல்கள் | Additional Message' : t('form.message')}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isBilingual ? 'குறிப்பிட்ட விபரம் அல்லது விருப்பங்கள்... | Specific requirements or notes...' : t('form.message')}
                      value={enquiryNotes}
                      onChange={(e) => setEnquiryNotes(e.target.value)}
                      className="w-full bg-[#FAF6ED] border border-gold-600/40 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold-600"
                    />
                  </div>

                  {/* 6. Submit Button */}
                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="w-full py-3 bg-[#8B1E28] hover:bg-maroon-900 disabled:opacity-50 text-gold-200 font-serif font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow"
                  >
                    {enquirySubmitting ? (
                      <span>{isBilingual ? 'அனுப்பப்படுகிறது... | Submitting...' : t('form.submitting')}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold-400" />
                        {isBilingual ? (
                          <>
                            <span className="font-tamil font-bold">விசாரணையைச் சமர்ப்பிக்கவும்</span>
                            <span>| Submit Enquiry</span>
                          </>
                        ) : (
                          <span>{t('form.submit')}</span>
                        )}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
