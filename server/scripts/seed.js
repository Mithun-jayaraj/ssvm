import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import Admin from '../models/Admin.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import BusinessSettings from '../models/BusinessSettings.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sri_shakthi_vinayaga_metals';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected successfully.');

    // 1. Clear existing collections to ensure fresh, clean, predictable state
    await Promise.all([
      Admin.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Enquiry.deleteMany({}),
      BusinessSettings.deleteMany({}),
    ]);
    console.log('[Seed] Cleared existing data.');

    // 2. Create Admin user
    const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@ssvmmetals.com').toLowerCase();
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@SSVM2026!';
    const adminName = process.env.ADMIN_DEFAULT_NAME || 'Sri Shakthi Vinayaga Metals Admin';

    const admin = await Admin.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
    });
    console.log(`[Seed] Admin created: ${admin.email}`);

    // 3. Create Business Settings for Tirupur, Tamil Nadu
    await BusinessSettings.create({
      businessName: 'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் | Sri Shakthi Vinayaga Metals',
      tagline: 'திருக்கோயில்களின் திருப்பணிக்கு தரமும் பாரம்பரியமும் | Quality and Tradition for Sacred Temple Projects',
      doorAddress: 'Near Mariamman Kovil Street, Industrial Metal Estate',
      city: 'Tirupur',
      state: 'Tamil Nadu',
      pincode: '641604',
      country: 'India',
      phone: '+91 98422 12345',
      alternativePhone: '+91 98765 43210',
      whatsappNumber: '+919842212345',
      email: 'enquiry@srishakthivinayagametals.com',
      businessHours: 'திங்கள் - சனி | Monday - Saturday: 9:00 AM – 7:30 PM (IST)',
      announcementText: 'ஆன்மீகம் உங்கள் இல்லத்தில்... | Bring Devotion to Your Home... • நேரடி உற்பத்தியாளர் | Direct Manufacturer Tirupur',
      aboutStory:
        'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸ் திருப்பூர் நகரில் அமைந்துள்ள முன்னணி பாரம்பரிய கோவில் உலோகத் திருப்பணி உற்பத்தியாளர். ஆகம விதிகள் மற்றும் சிற்ப சாஸ்திரத்தின்படி கோவில் பிரபாவளையம், கலசம், கொடிமரம், கோவில் மணி, சுவாமி சிலைகள் மற்றும் பித்தளை பூஜை பொருட்களை தயாரித்து வழங்குகிறோம். Sri Shakthi Vinayaga Metals is a trusted South Indian temple metalware foundry based in Tirupur, Tamil Nadu. Dedicated to sacred craftsmanship and strict adherence to Shilpa Shastra proportions, we manufacture masterfully carved Prabavalayam, monumental Gopuram Kalasams, Kodimaram flag poles, temple bells, deity vigrahams, and pooja vessels for temples across India and worldwide.',
      manufacturingHighlights: [
        'பாரம்பரிய ஆகம விதிமுறைகளின்படி தயாரிப்பு | Crafted according to traditional Shilpa Shastra & Agama guidelines',
        'தேவையான அளவுகளுக்கு ஏற்ப தனிப்பயன் பிரபாவளையம் | Custom Prabavalayam fabrication tailored to exact deity dimensions',
        'கனரக தூய பித்தளை மற்றும் தாமிர கலசங்கள் | Heavy-gauge brass & 99.9% pure copper Kalasams built for weather resilience',
        'நேரடி தொழிற்சாலை தயாரிப்பு மற்றும் இடைத்தரகர் இல்லாத விலை | Direct manufacturer pricing with zero middleman markups',
        'பாதுகாப்பான மரப்பெட்டி பேக்கிங் மற்றும் இந்தியா முழுவதும் விநியோகம் | Pan-India safe wooden crate packaging and logistics',
      ],
      googleMapUrl: 'https://maps.google.com/?q=Tirupur,Tamil+Nadu',
    });
    console.log('[Seed] Business settings initialized.');

    // 4. Create the 8 Exact Categories with Multilingual Support:
    const categoriesData = [
      {
        name: 'Prabavalayam',
        tamilName: 'பிரபாவளையம்',
        nameTranslations: {
          ta: 'பிரபாவளையம்',
          en: 'Prabavalayam',
          ml: 'പ്രഭാവലയം',
          te: 'ప్రభావళి',
          kn: 'ಪ್ರಭಾವಳಿ',
          hi: 'प्रभावली',
        },
        slug: 'prabavalayam',
        description: 'Traditional handcrafted deity arches, makara torana prabhavali, and sacred temple aureoles.',
        tamilDescription: 'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு மற்றும் மகர தோரண பிரபாவளையம்.',
        descriptionTranslations: {
          ta: 'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு மற்றும் மகர தோரண பிரபாவளையம்.',
          en: 'Traditional handcrafted deity arches, makara torana prabhavali, and sacred temple aureoles.',
          ml: 'ക്ഷേത്ര പ്രതിഷ്ഠകൾക്കായി നിർമ്മിക്കുന്ന പവിത്ര പ്രഭാവലയങ്ങളും മകര തോരണങ്ങളും.',
          te: 'దేవాలయ మూలవిరాట్ మరియు ఉత్సవ మూర్తుల కోసం చేతితో చెక్కబడిన పవిత్ర ప్రభావళి తోరణాలు.',
          kn: 'ದೇವಾಲಯದ ವಿಗ್ರಹಗಳಿಗಾಗಿ ನುರಿತ ಕುಶಲಕರ್ಮಿಗಳಿಂದ ನಿರ್ಮಿಸಲಾದ ಭವ್ಯ ಪ್ರಭಾವಳಿಗಳು.',
          hi: 'मंदिर के विग्रहों के लिए हस्तनिर्मित दिव्य प्रभावली एवं मकर तोरण।',
        },
        image: '/images/cat_prabavalayam.jpg',
        iconName: 'Crown',
        displayOrder: 1,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Kalasam',
        tamilName: 'கலசம்',
        nameTranslations: {
          ta: 'கலசம்',
          en: 'Kalasam',
          ml: 'കലശം',
          te: 'కలశం',
          kn: 'ಕಳಶ',
          hi: 'कलश',
        },
        slug: 'kalasam',
        description: 'Sacred temple gopuram kalasams, stupi pinnacles, and sanctum kumbhabhishekam vessels.',
        tamilDescription: 'கோவில் கோபுர கலசம், ஸ்தூபி கலசங்கள் மற்றும் கும்பாபிஷேக புனித பாத்திரங்கள்.',
        descriptionTranslations: {
          ta: 'கோவில் கோபுர கலசம், ஸ்தூபி கலசங்கள் மற்றும் கும்பாபிஷேக புனித பாத்திரங்கள்.',
          en: 'Sacred temple gopuram kalasams, stupi pinnacles, and sanctum kumbhabhishekam vessels.',
          ml: 'ക്ഷേത്ര ഗോപുര കലശങ്ങൾ, സ്തൂപികൾ, കുംഭാഭിഷേക പാത്രങ്ങൾ.',
          te: 'రాజగోపుర కలశాలు, విమాన గోపుర స్తూపి మరియు మహా కుంభాభిషేక కలశాలు.',
          kn: 'ರಾಜಗೋಪುರ ಮತ್ತು ವಿಮಾನ ಗೋಪುರಗಳ ಪವಿತ್ರ ಕಳಶಗಳು ಹಾಗೂ ಸ್ತೂಪಿಗಳು.',
          hi: 'मंदिर के राजगोपुरम एवं विमान शिखर के लिए पवित्र स्तूपी कलश।',
        },
        image: '/images/cat_kalasam.jpg',
        iconName: 'Flame',
        displayOrder: 2,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Temple Flag Pole',
        tamilName: 'கோவில் கொடிமரம்',
        nameTranslations: {
          ta: 'கோவில் கொடிமரம்',
          en: 'Temple Flag Pole',
          ml: 'ക്ഷേത്ര കൊടിമരം',
          te: 'దేవాలయ ధ్వజస్తంభం',
          kn: 'ದೇವಸ್ಥಾನದ ಧ್ವಜಸ್ತಂಭ',
          hi: 'मंदिर ध्वजस्तंभ',
        },
        slug: 'temple-flag-pole',
        description: 'Heavy gauge brass and copper Kodimaram mast cladding, stepped pedestals, and Bali Peedam coverings.',
        tamilDescription: 'கனரக பித்தளை மற்றும் செப்பு கொடிமர உறைகள், பீடங்கள் மற்றும் பலிபீட கவசங்கள்.',
        descriptionTranslations: {
          ta: 'கனரக பித்தளை மற்றும் செப்பு கொடிமர உறைகள், பீடங்கள் மற்றும் பலிபீட கவசங்கள்.',
          en: 'Heavy gauge brass and copper Kodimaram mast cladding, stepped pedestals, and Bali Peedam coverings.',
          ml: 'കനത്ത പിച്ചളയിലും ചെമ്പിലും തീർത്ത കൊടിമര കവചങ്ങളും ബലിപീഠങ്ങളും.',
          te: 'మందపాటి ఇత్తడి మరియు రాగి ధ్వజస్తంభ తొడుగులు, బలిపీఠం కవచాలు.',
          kn: 'ಹಿತ್ತಾಳೆ ಮತ್ತು ತಾಮ್ರದ ಧ್ವಜಸ್ತಂಭದ ಹೊದಿಕೆಗಳು ಹಾಗೂ ಬಲಿಪೀಠದ ಕವಚಗಳು.',
          hi: 'भारी पीतल एवं तांबे से निर्मित मंदिर ध्वजस्तंभ आवरण एवं बलिपीठम।',
        },
        image: '/images/cat_kodimaram.jpg',
        iconName: 'Shield',
        displayOrder: 3,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Temple Bell',
        tamilName: 'கோவில் மணி',
        nameTranslations: {
          ta: 'கோவில் மணி',
          en: 'Temple Bell',
          ml: 'ക്ഷേത്ര മണി',
          te: 'గుడి గంట',
          kn: 'ದೇವಾಲಯದ ಗಂಟೆ',
          hi: 'मंदिर घंटा',
        },
        slug: 'temple-bell',
        description: 'Cast bell metal temple bells, hanging bells (Ghanta), hand bells, and acoustic sacred chimes.',
        tamilDescription: 'பாரம்பரிய வெண்கல மற்றும் பித்தளை கோவில் மணிகள், தொங்கு மணிகள் மற்றும் பூஜை கைமணிகள்.',
        descriptionTranslations: {
          ta: 'பாரம்பரிய வெண்கல மற்றும் பித்தளை கோவில் மணிகள், தொங்கு மணிகள் மற்றும் பூஜை கைமணிகள்.',
          en: 'Cast bell metal temple bells, hanging bells (Ghanta), hand bells, and acoustic sacred chimes.',
          ml: 'ദീർഘ നാദമുള്ള ഓട്ടു മണികൾ, തൂക്കു മണികൾ, പൂജാ മണികൾ.',
          te: 'ఓంకార నాదం ప్రతిధ్వనించే కంచు ఘంటలు, వేలాడే గుడి గంటలు మరియు పూజా గంటలు.',
          kn: 'ದೈವಿಕ ನಾದ ಹೊರಹೊಮ್ಮಿಸುವ ಕಂಚಿನ ಹಾಗೂ ಹಿತ್ತಾಳೆಯ ದೇವಾಲಯದ ಘಂಟೆಗಳು.',
          hi: 'दीर्घ ओंकार गूंज उत्पन्न करने वाले पारंपरिक कांस्य एवं पीतल मंदिर घंटे।',
        },
        image: '/images/cat_temple_bell.jpg',
        iconName: 'Bell',
        displayOrder: 4,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Kavacham',
        tamilName: 'கவசம்',
        nameTranslations: {
          ta: 'கவசம்',
          en: 'Kavacham',
          ml: 'കവചം',
          te: 'కవచం',
          kn: 'ಕವಚ',
          hi: 'कवच',
        },
        slug: 'kavacham',
        description: 'Sacred deity armor, thirumugam, padam, and gold-finish consecrated temple protective coverings.',
        tamilDescription: 'சுவாமி திருமேனி கவசங்கள், பாத கவசம், திருக்கர கவசம் மற்றும் தங்க முலாம் பூசப்பட்ட ஆலய கவசங்கள்.',
        descriptionTranslations: {
          ta: 'சுவாமி திருமேனி கவசங்கள், பாத கவசம், திருக்கர கவசம் மற்றும் தங்க முலாம் பூசப்பட்ட ஆலய கவசங்கள்.',
          en: 'Sacred deity armor, thirumugam, padam, and gold-finish consecrated temple protective coverings.',
          ml: 'സ്വാമി തിരുമേനി കവചങ്ങൾ, പാദ കവചം, തിരുക്കര കവചങ്ങൾ.',
          te: 'స్వామి తిరుమేని కవచాలు, పాద కవచం, హస్త కవచాలు మరియు బంగారు పూత పూసిన రక్షా కవచాలు.',
          kn: 'ಸ್ವಾಮಿ ತಿರುಮೇನಿ ಕವಚಗಳು, ಪಾದ ಕವಚ, ಹಸ್ತ ಕವಚ ಹಾಗೂ ಬಂಗಾರದ ಲೇಪನದ ದೈವಿಕ ಕವಚಗಳು.',
          hi: 'स्वामी तिरुमेनी कवच, पाद कवच, हस्त कवच एवं स्वर्ण मंडित पवित्र मंदिर कवच.',
        },
        image: '/images/real_kavacham.jpg',
        iconName: 'Shield',
        displayOrder: 5,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Deity Idols',
        tamilName: 'சுவாமி சிலைகள்',
        nameTranslations: {
          ta: 'சுவாமி சிலைகள்',
          en: 'Deity Idols',
          ml: 'വിഗ്രഹങ്ങൾ',
          te: 'స్వామి విగ్రహాలు',
          kn: 'ದೇವರ ವಿಗ್ರಹಗಳು',
          hi: 'देव प्रतिमाएं',
        },
        slug: 'deity-idols',
        description: 'Cast brass, bronze, and panchaloha vigrahams of Lord Ganesha, Murugan, Shiva Nataraja, and Amman.',
        tamilDescription: 'ஆகம சிற்ப விதிப்படி வார்க்கப்பட்ட விநாயகர், முருகன், நடராஜர் மற்றும் அம்மன் பித்தளை மற்றும் ஐம்பொன் சிலைகள்.',
        descriptionTranslations: {
          ta: 'ஆகம சிற்ப விதிப்படி வார்க்கப்பட்ட விநாயகர், முருகன், நடராஜர் மற்றும் அம்மன் பித்தளை மற்றும் ஐம்பொன் சிலைகள்.',
          en: 'Cast brass, bronze, and panchaloha vigrahams of Lord Ganesha, Murugan, Shiva Nataraja, and Amman.',
          ml: 'ആഗമ ശാസ്ത്ര പ്രകാരം വാർത്ത വിനായകൻ, മുരുകൻ, നടരാജൻ വിഗ്രഹങ്ങൾ.',
          te: 'శిల్ప శాస్త్ర ప్రమాణాల ప్రకారం వార్చిన వినాయకుడు, మురుగన్, నటరాజ విగ్రహాలు.',
          kn: 'ಶಿಲ್ಪಶಾಸ್ತ್ರದಂತೆ ಸಿದ್ಧಪಡಿಸಲಾದ ಗಣೇಶ, ಮುರುಗ, ನಟರಾಜ ಹಾಗೂ ಅಮ್ಮನವರ ವಿಗ್ರಹಗಳು.',
          hi: 'आगम शिल्प शास्त्रानुसार ढली हुई गणेश, मुरुगन एवं नटराज की दिव्य मूर्तियां।',
        },
        image: '/images/cat_god_idols.jpg',
        iconName: 'Sparkles',
        displayOrder: 6,
        isPrimary: false,
        isActive: true,
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`[Seed] Inserted ${createdCategories.length} categories.`);

    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.slug] = c._id;
    });

    // 5. Create Rich Products with authentic temple specifications and multilingual content
    const productsData = [
      // --- 1. Prabavalayam (Primary Focus) ---
      {
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
        category: catMap['prabavalayam'],
        material: 'தூய பித்தளை | High-Purity Virgin Brass',
        dimensions: 'உயரம்: 48 அங்குலம், அகலம்: 36 அங்குலம் | Height: 48 inches, Width: 36 inches',
        weight: 'சுமார் 26 கிலோ | Approx. 26 kg',
        finish: 'பாரம்பரிய கைவேலை மெருகூட்டல் | Traditional Hand-Chiseled Brass Polish',
        shortDescription:
          'Majestic traditional South Indian temple Prabavalayam featuring twin Makara motifs, radiating flames (Jwala), and crowning Kirtimukha crest.',
        tamilShortDescription:
          'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு, இரட்டை மகர தோரணம் மற்றும் கிரீர்த்திமுகத்துடன் கூடியது.',
        shortDescriptionTranslations: {
          ta: 'கோவில் தெய்வங்களுக்காக வடிவமைக்கப்படும் பாரம்பரிய அலங்கார வளைவு, இரட்டை மகர தோரணம் மற்றும் கிரீர்த்திமுகத்துடன் கூடியது.',
          en: 'Majestic traditional South Indian temple Prabavalayam featuring twin Makara motifs, radiating flames (Jwala), and crowning Kirtimukha crest.',
          ml: 'ഇരട്ട മകര രൂപങ്ങളും കീർത്തിമുഖവും ജ്വാലകളും ചേർന്ന പരമ്പരാഗത ക്ഷേത്ര പ്രഭാവലയം.',
          te: 'జంట మకర తోరణాలు, జ్వాలలు మరియు కీర్తిముఖంతో కూడిన వైభవోపేత ప్రభావళి.',
          kn: 'ಮಕರ ತೋರಣ, ಜ್ವಾಲೆಗಳು ಹಾಗೂ ಕೀರ್ತಿಮುಖದೊಂದಿಗೆ ಕಂಗೊಳಿಸುವ ದೈವಿಕ ಹಿತ್ತಾಳೆ ಪ್ರಭಾವಳಿ.',
          hi: 'जुड़वां मकर रूपांकनों, ज्वालाओं एवं कीर्तिमुख से अलंकृत पारंपरिक मंदिर प्रभावली।',
        },
        fullDescription:
          'Handcrafted by master metal artisans in Tirupur adhering to traditional Agama and Shilpa Shastra specifications. This Prabavalayam is designed for sanctum sanctorum deity installations. It features detailed repoussé relief work with mythical Makara aquatic beasts on either pillar base, an arched floral garland (Torana), and a prominent Kirtimukha (Face of Glory) at the pinnacle. Fully customizable to fit your deity vigraham and pedestal dimensions.',
        tamilFullDescription:
          'திருப்பூர் கைவினைஞர்களால் பாரம்பரிய சிற்ப சாஸ்திர முறைப்படி வார்க்கப்பட்ட பிரபாவளையம். மூலவர் மற்றும் உற்சவ மூர்த்திகளுக்கு பொருத்தமானது. ஸ்தபதிகளின் விருப்பத்திற்கு ஏற்ப 2 அடி முதல் 12 அடி வரை தேவையான அளவுகளில் தயாரித்து வழங்கப்படுகிறது.',
        fullDescriptionTranslations: {
          ta: 'திருப்பூர் கைவினைஞர்களால் பாரம்பரிய சிற்ப சாஸ்திர முறைப்படி வார்க்கப்பட்ட பிரபாவளையம். மூலவர் மற்றும் உற்சவ மூர்த்திகளுக்கு பொருத்தமானது. ஸ்தபதிகளின் விருப்பத்திற்கு ஏற்ப 2 அடி முதல் 12 அடி வரை தேவையான அளவுகளில் தயாரித்து வழங்கப்படுகிறது.',
          en: 'Handcrafted by master metal artisans in Tirupur adhering to traditional Agama and Shilpa Shastra specifications. This Prabavalayam is designed for sanctum sanctorum deity installations. It features detailed repoussé relief work with mythical Makara aquatic beasts on either pillar base, an arched floral garland (Torana), and a prominent Kirtimukha (Face of Glory) at the pinnacle. Fully customizable to fit your deity vigraham and pedestal dimensions.',
          ml: 'ആഗമ ശിൽപ ശാസ്ത്ര പ്രകാരം തിരുപ്പൂരിലെ വിദഗ്ധ പിച്ചള ശിൽപികൾ നിർമ്മിച്ച പവിത്ര പ്രഭാവലയം. പ്രതിഷ്ഠയുടെ അളവുകൾക്കനുസരിച്ച് നിർമ്മിച്ചു നൽകുന്നു.',
          te: 'శిల్ప శాస్త్ర నియమాలకు అనుగుణంగా తిరుపూర్ కళాకారులచే రూపుదిద్దుకున్న పవిత్ర ప్రభావళి. గర్భగుడి మూలవిరాట్ మరియు ఉత్సవ మూర్తుల కొలతలకు అనుకూలంగా రూపొందించబడుతుంది.',
          kn: 'ಆಗಮ ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ತಿರುಪೂರಿನಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಲಾದ ಪವಿತ್ರ ಪ್ರಭಾವಳಿ. ಗರ್ಭಗುಡಿಯ ವಿಗ್ರಹಗಳಿಗೆ ತಕ್ಕಂತೆ ಅಪೇಕ್ಷಿತ ಅಳತೆಯಲ್ಲಿ ತಯಾರಿಸಲಾಗುತ್ತದೆ.',
          hi: 'आगम एवं शिल्प शास्त्र के नियमों के अनुसार तिरुपुर के कुशल कारीगरों द्वारा निर्मित दिव्य प्रभावली। गर्भगृह के मूलविग्रह के अनुरूप अनुकूलन योग्य।',
        },
        primaryImage: '/images/cat_prabavalayam.jpg',
        imageGallery: [
          {
            url: '/images/cat_prabavalayam.jpg',
            alt: 'மகர தோரண பித்தளை பிரபாவளையம் | Grand Makara Torana Prabavalayam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'பொருத்தம் | Deity Compatibility', value: '24" முதல் 36" சுவாமி சிலைகளுக்கு | Suitable for 24" to 36" idols' },
          { label: 'வடிவமைப்பு | Crafting Technique', value: 'பாரம்பரிய கைவேலை நிவாரணப் பணி | Hand-beaten Repoussé & Chasing' },
          { label: 'தடிமன் | Sheet Gauge', value: '18 கேஜ் கனரக கோவில் தகடு | 18 Gauge Heavy Temple Sheet' },
          { label: 'கிரீடம் | Crest Motif', value: '21 ஜ்வாலை இதழ்களுடன் கீர்த்திமுகம் | Kirtimukha with 21 flames' },
          { label: 'அளவுகள் | Custom Sizing', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Royal Peacock (Mayil) Brass Prabavalayam with Aureole',
        tamilName: 'மயில் வடிவ பித்தளை பிரபாவளையம்',
        nameTranslations: {
          ta: 'மயில் வடிவ பித்தளை பிரபாவளையம்',
          en: 'Royal Peacock (Mayil) Brass Prabavalayam with Aureole',
          ml: 'മയിൽ രൂപത്തിലുള്ള പിച്ചള പ്രഭാവലയം',
          te: 'మయూర ఆకార ఇత్తడి ప్రభావళి',
          kn: 'ನವಿಲು ವಿನ್ಯಾಸದ ಹಿತ್ತಾಳೆ ಪ್ರಭಾವಳಿ',
          hi: 'मयूर रूपांकित पीतल प्रभावली',
        },
        slug: 'royal-peacock-mayil-brass-prabavalayam',
        productCode: 'SSVM-PB-002',
        category: catMap['prabavalayam'],
        material: 'மெருகூட்டப்பட்ட பித்தளை | Polished Brass & Bronze Alloy',
        dimensions: 'உயரம்: 36 அங்குலம், அகலம்: 28 அங்குலம் | Height: 36 inches, Width: 28 inches',
        weight: 'சுமார் 18 கிலோ | Approx. 18 kg',
        finish: 'தங்க நிற வார்னிஷ் மெருகூட்டல் | Golden Lustre Lacquered Finish',
        shortDescription:
          'Elegant Prabhavali arch embellished with dancing peacock motifs, lotus buds, and detachable sanctum prabha ring.',
        tamilShortDescription:
          'ஆடும் மயில் வடிவங்கள், தாமரை மொட்டுகள் மற்றும் தூய தங்க நிற பொலிவுடன் கூடிய பிரபாவளையம்.',
        shortDescriptionTranslations: {
          ta: 'ஆடும் மயில் வடிவங்கள், தாமரை மொட்டுகள் மற்றும் தூய தங்க நிற பொலிவுடன் கூடிய பிரபாவளையம்.',
          en: 'Elegant Prabhavali arch embellished with dancing peacock motifs, lotus buds, and detachable sanctum prabha ring.',
          ml: 'നൃത്തം ചെയ്യുന്ന മയിൽ രൂപങ്ങളും താമര മൊട്ടുകളും നിറഞ്ഞ പ്രഭാവലയം.',
          te: 'నాట్య మయూరాలు, కమల మొగ్గలతో అలరారే దివ్య ప్రభావళి.',
          kn: 'ನರ್ತಿಸುವ ನವಿಲುಗಳು ಮತ್ತು ಕಮಲದ ಮೊಗ್ಗುಗಳಿಂದ ಶೋಭಿಸುವ ಪ್ರಭಾವಳಿ.',
          hi: 'नृत्यरत मयूरों एवं कमल कलियों से सज्जित अलौकिक प्रभावली।',
        },
        fullDescription:
          'Specially cast and embossed for Murugan, Amman, and Perumal sanctums. Features gracefully arched peacock feathers intertwining along the border, terminating in twin sculpted peacocks at the shoulder points. The protective lacquer ensures the golden brilliance endures ceremonial camphor and oil exposure.',
        tamilFullDescription:
          'முருகன், அம்மன் மற்றும் பெருமாள் ஆலயங்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட மயில் தோரண பிரபாவளையம். கற்பூரம் மற்றும் எண்ணெய் புகையினால் பாதிக்கப்படாத சிறப்பு பாதுகாப்பு பூச்சு கொண்டது.',
        fullDescriptionTranslations: {
          ta: 'முருகன், அம்மன் மற்றும் பெருமாள் ஆலயங்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட மயில் தோரண பிரபாவளையம். கற்பூரம் மற்றும் எண்ணெய் புகையினால் பாதிக்கப்படாத சிறப்பு பாதுகாப்பு பூச்சு கொண்டது.',
          en: 'Specially cast and embossed for Murugan, Amman, and Perumal sanctums. Features gracefully arched peacock feathers intertwining along the border, terminating in twin sculpted peacocks at the shoulder points. The protective lacquer ensures the golden brilliance endures ceremonial camphor and oil exposure.',
          ml: 'മുരുകൻ, ദേവി, പെരുമാൾ ക്ഷേത്രങ്ങൾക്കായി പ്രത്യേകം നിർമ്മിച്ച മയിൽ പ്രഭാവലയം. സ്വർണ്ണ തിളക്കം നഷ്ടപ്പെടാത്ത ലേപനം നൽകിയിരിക്കുന്നു.',
          te: 'మురుగన్, అమ్మవారు మరియు శ్రీవారి సన్నిధుల కోసం ప్రత్యేకంగా రూపొందించిన మయూర ప్రభావళి.',
          kn: 'ಮುರುಗ, ಅಮ್ಮನವರು ಹಾಗೂ ಪೆರುಮಾಳ್ ಸನ್ನಿಧಿಗಳಿಗಾಗಿ ವಿಶೇಷವಾಗಿ ಕಡೆದ ನವಿಲು ಪ್ರಭಾವಳಿ.',
          hi: 'भगवान कार्तिकेय, देवी मां एवं पेरुमल विग्रहों के लिए विशेष मयूर प्रभावली।',
        },
        primaryImage: '/images/cat_prabavalayam.jpg',
        imageGallery: [
          {
            url: '/images/cat_prabavalayam.jpg',
            alt: 'மயில் வடிவ பித்தளை பிரபாவளையம் | Peacock Brass Prabavalayam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'இடம் | Ideal Placement', value: 'உற்சவ மூர்த்தி & மூலவர் | Utsava Murti & Moolavar' },
          { label: 'பாதுகாப்பு பூச்சு | Finish Guarantee', value: 'மங்காத வார்னிஷ் பூச்சு | Anti-tarnish protective coating' },
          { label: 'அளவுகள் | Sizing Options', value: '18 முதல் 72 அங்குலம் வரை | 18" to 72" made to order' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- 2. Kalasam (Primary Focus) ---
      {
        name: 'Gopuram Brass Temple Kalasam (Stupi Pinnacle Pot)',
        tamilName: 'கோவில் கோபுர பித்தளை கலசம்',
        nameTranslations: {
          ta: 'கோவில் கோபுர பித்தளை கலசம்',
          en: 'Gopuram Brass Temple Kalasam (Stupi Pinnacle Pot)',
          ml: 'ക്ഷേത്ര ഗോപുര പിച്ചള കലശം',
          te: 'ఆలయ రాజగోపుర ఇత్తడి కలశం',
          kn: 'ದೇವಸ್ಥಾನದ ರಾಜಗೋಪುರ ಹಿತ್ತಾಳೆ ಕಳಶ',
          hi: 'गोपुरम पीतल मंदिर स्तूपी कलश',
        },
        slug: 'gopuram-brass-temple-kalasam',
        productCode: 'SSVM-KL-001',
        category: catMap['kalasam'],
        material: 'கனரக கோவில் பித்தளை | Heavy Temple Grade Brass',
        dimensions: 'உயரம்: 42 அங்குலம், அடிப்பாக விட்டம்: 22 அங்குலம் | Height: 42 inches, Base Dia: 22 inches',
        weight: 'சுமார் 28 கிலோ | Approx. 28 kg',
        finish: 'வானிலை எதிர்ப்பு உயர் மெருகூட்டல் | High Polish Weather-Sealed Brass',
        shortDescription:
          'Majestic multi-tiered temple tower Stupi Kalasam designed for Vimanam and Raja Gopuram installations.',
        tamilShortDescription:
          'விமானம் மற்றும் ராஜகோபுரங்களுக்காக வடிவமைக்கப்பட்ட கம்பீரமான ஸ்தூபி கோவில் கலசம்.',
        shortDescriptionTranslations: {
          ta: 'விமானம் மற்றும் ராஜகோபுரங்களுக்காக வடிவமைக்கப்பட்ட கம்பீரமான ஸ்தூபி கோவில் கலசம்.',
          en: 'Majestic multi-tiered temple tower Stupi Kalasam designed for Vimanam and Raja Gopuram installations.',
          ml: 'വിമാനത്തിനും രാജഗോപുരത്തിനും അനുയോജ്യമായ ഗംഭീര സ്തൂപി ക്ഷേത്ര കലശം.',
          te: 'విమానం మరియు రాజగోపురాల కోసం రూపొందించిన బహుళ అంచెల స్తూపి కలశం.',
          kn: 'ವಿಮಾನ ಹಾಗೂ ರಾಜಗೋಪುರಗಳಿಗೆ ಅತ್ಯಂತ ಸೂಕ್ತವಾದ ದೈವಿಕ ಸ್ತೂಪಿ ಕಳಶ.',
          hi: 'विमान एवं राजगोपुरम शिखरों के लिए निर्मित भव्य बहुस्तरीय स्तूपी कलश।',
        },
        fullDescription:
          'An essential architectural and spiritual crown for South Indian temple towers. Comprises the Kumbha (pot), neck, lotus petal flare, and elongated golden pinnacle needle (Kurcham). Built with reinforced heavy-gauge brass to withstand high wind loads, monsoon rainfall, and outdoor exposure on temple roofs.',
        tamilFullDescription:
          'தென்னிந்திய ஆலய கோபுரங்களுக்கான புனித ஸ்தூபி கலசம். கும்பம், கழுத்து பகுதி, தாமரை இதழ் பீடம் மற்றும் கூரிய ஊசியுடன் (கூர்ச்சம்) கூடியது. நவதானியங்கள் நிரப்புவதற்கான உள்ளீடற்ற அமைப்பும், இடிதாங்கி பொருத்தும் வசதியும் கொண்டது.',
        fullDescriptionTranslations: {
          ta: 'தென்னிந்திய ஆலய கோபுரங்களுக்கான புனித ஸ்தூபி கலசம். கும்பம், கழுத்து பகுதி, தாமரை இதழ் பீடம் மற்றும் கூரிய ஊசியுடன் (கூர்ச்சம்) கூடியது. நவதானியங்கள் நிரப்புவதற்கான உள்ளீடற்ற அமைப்பும், இடிதாங்கி பொருத்தும் வசதியும் கொண்டது.',
          en: 'An essential architectural and spiritual crown for South Indian temple towers. Comprises the Kumbha (pot), neck, lotus petal flare, and elongated golden pinnacle needle (Kurcham). Built with reinforced heavy-gauge brass to withstand high wind loads, monsoon rainfall, and outdoor exposure on temple roofs.',
          ml: 'കുംഭം, കഴുത്ത്, താമരപ്പൂവിതളുകൾ, കൂർcham എന്നിവയടങ്ങുന്ന പവിത്രമായ ഗോപുര കലശം. നവധാന്യങ്ങൾ നിറയ്ക്കുന്നതിനുള്ള സൗകര്യവുമുണ്ട്.',
          te: 'కుంభం, పద్మ పీఠం, స్తూపి మరియు బంగారు సూచికతో కూడిన గోపుర శిఖర కలశం. నవధాన్యాలు నింపే అంతర్గత ప్రదేశం కలిగి ఉంటుంది.',
          kn: 'ಕುಂಭ, ಕಮಲದ ದಳಗಳು ಹಾಗೂ ಚೂಪಾದ ಅಗ್ರಭಾಗವನ್ನು ಒಳಗೊಂಡ ರಾಜಗೋಪುರದ ಪವಿತ್ರ ಕಳಶ.',
          hi: 'कुंभ, ग्रीवा, कमल दल एवं तीक्ष्ण अग्रभाग से युक्त गोपुरम स्तूपी कलश। नवधान्य भरने हेतु आंतरिक खोखला भाग।',
        },
        primaryImage: '/images/cat_kalasam.jpg',
        imageGallery: [
          {
            url: '/images/cat_kalasam.jpg',
            alt: 'கோவில் கோபுர பித்தளை கலசம் | Gopuram Brass Temple Kalasam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'கோபுர அடுக்கு | Tier Compatibility', value: '3 முதல் 7 நிலை கோபுரங்கள் | 3 to 7 Tier Gopurams' },
          { label: 'தானிய அறை | Grain Chamber', value: 'நவதானியங்கள் நிரப்பும் உள்ளறை | Hollow inner core for Navadhanya' },
          { label: 'இடிதாங்கி துளை | Lightning Rod Collar', value: 'செப்பு கம்பி பொருத்தும் மையம் | Centering collar for earthing rod' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Consecration Heavy Copper Garbhagriha Kalasam',
        tamilName: 'கும்பாபிஷேக தூய செம்பு விமான கலசம்',
        nameTranslations: {
          ta: 'கும்பாபிஷேக தூய செம்பு விமான கலசம்',
          en: 'Consecration Heavy Copper Garbhagriha Kalasam',
          ml: 'കുംഭാഭിഷേക ശുദ്ധ ചെമ്പ് വിമാന കലശം',
          te: 'కుంభాభిషేక స్వచ్ఛ రాగి విమాన కలశం',
          kn: 'ಕುಂಭಾಭಿಷೇಕದ ಶುದ್ಧ ತಾಮ್ರದ ವಿಮಾನ ಕಳಶ',
          hi: 'कुंभाभिषेकम शुद्ध तांबा गर्भगृह कलश',
        },
        slug: 'consecration-heavy-copper-garbhagriha-kalasam',
        productCode: 'SSVM-KL-002',
        category: catMap['kalasam'],
        material: '99.9% தூய எலக்ட்ரோலைடிக் தாமிரம் | 99.9% Electrolytic Pure Copper',
        dimensions: 'உயரம்: 32 அங்குலம், அடிப்பாக விட்டம்: 18 அங்குலம் | Height: 32 inches, Base Dia: 18 inches',
        weight: 'சுமார் 22 கிலோ | Approx. 22 kg',
        finish: 'தூய செம்பு மெருகூட்டல் | Annealed Natural Copper Finish',
        shortDescription:
          'Consecrated pure copper Kumbhabhishekam Kalasam pot engineered for sanctum vimana spires.',
        tamilShortDescription:
          'கர்ப்பகிரக விமானத்திற்காக ஆன்மிக விதிமுறைகளுடன் தயாரிக்கப்பட்ட தூய தாமிர கும்பாபிஷேக கலசம்.',
        shortDescriptionTranslations: {
          ta: 'கர்ப்பகிரக விமானத்திற்காக ஆன்மிக விதிமுறைகளுடன் தயாரிக்கப்பட்ட தூய தாமிர கும்பாபிஷேக கலசம்.',
          en: 'Consecrated pure copper Kumbhabhishekam Kalasam pot engineered for sanctum vimana spires.',
          ml: 'ഗർഭഗൃഹ വിമാനത്തിനായി ആഗമ വിധിപ്രകാരം നിർമ്മിച്ച പവിത്ര ചെമ്പ് കലശം.',
          te: 'గర్భాలయ విమానం కోసం ఆధ్యాత్మిక విధులతో తయారైన స్వచ్ఛమైన రాగి కలశం.',
          kn: 'ಗರ್ಭಗೃಹದ ವಿಮಾನ ಶಿಖರಕ್ಕೆ ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ತಯಾರಿಸಿದ ಶುದ್ಧ ತಾಮ್ರದ ಕಳಶ.',
          hi: 'गर्भगृह विमान शिखर हेतु पवित्र तांबे से निर्मित महाकुंभाभिषेकम कलश।',
        },
        fullDescription:
          'Made from highest purity virgin copper sheet. Copper is spiritually revered for its electro-magnetic conductivity and sacred energy absorption atop the sanctum sanctorum (Garbhagriha). Specifically prepared for Sthapatis and temple committees planning Maha Kumbhabhishekam ceremonies.',
        tamilFullDescription:
          'உயர்தர தூய செப்பு தகட்டால் உருட்டப்பட்டு வார்க்கப்பட்ட கலசம். மகா கும்பாபிஷேக திருப்பணிகளுக்காக ஸ்தபதிகள் மற்றும் ஆலய அறக்கட்டளைகளுக்காக நேரடியாக தயாரிக்கப்படுகிறது.',
        fullDescriptionTranslations: {
          ta: 'உயர்தர தூய செப்பு தகட்டால் உருட்டப்பட்டு வார்க்கப்பட்ட கலசம். மகா கும்பாபிஷேக திருப்பணிகளுக்காக ஸ்தபதிகள் மற்றும் ஆலய அறக்கட்டளைகளுக்காக நேரடியாக தயாரிக்கப்படுகிறது.',
          en: 'Made from highest purity virgin copper sheet. Copper is spiritually revered for its electro-magnetic conductivity and sacred energy absorption atop the sanctum sanctorum (Garbhagriha). Specifically prepared for Sthapatis and temple committees planning Maha Kumbhabhishekam ceremonies.',
          ml: '99.9% ശുദ്ധമായ ചെമ്പ് തകിടിൽ വാർത്തത്. മഹാ കുംഭാഭിഷേകത്തിന് തയാറാക്കിയത്.',
          te: 'అత్యున్నత స్వచ్ఛత గల రాగితో చేయబడినది. కౌంభాభిషేక పూజల కొరకు సిద్ధం చేయబడింది.',
          kn: '೯೯.೯% ಶುದ್ಧ ತಾಮ್ರದಿಂದ ರೂಪಿತವಾದ ದಿವ್ಯ ಕಳಶ. ಮಹಾ ಕುಂಭಾಭಿಷೇಕ ಕಾರ್ಯಗಳಿಗೆ ಪ್ರಶಸ್ತ.',
          hi: 'उच्चतम शुद्धता वाले 99.9% तांबे से निर्मित कलश। महाकुंभाभिषेकम के लिए आदर्श।',
        },
        primaryImage: '/images/cat_kalasam.jpg',
        imageGallery: [
          {
            url: '/images/cat_kalasam.jpg',
            alt: 'தூய செம்பு விமான கலசம் | Pure Copper Vimanam Kalasam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'செம்பு தூய்மை | Copper Purity', value: '99.9% சான்றளிக்கப்பட்ட தூய செம்பு | 99.9% Certified Pure Copper' },
          { label: 'சடங்கு தயார்நிலை | Ritual Readiness', value: 'நவரத்தின நவதானிய பூர்த்திக்கு உகந்தது | Ready for Navaratna sanctification' },
          { label: 'அளவுகள் | Available Sizes', value: '18 அங்குலம் முதல் 60 அங்குலம் வரை | 18" to 60" customizable' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- 3. Temple Flag Pole / Kodimaram (Primary Focus) ---
      {
        name: 'Sacred Temple Kodimaram Brass Cladding Cylinders (Flag Pole)',
        tamilName: 'கோவில் கொடிமர பித்தளை கவச வளையங்கள்',
        nameTranslations: {
          ta: 'கோவில் கொடிமர பித்தளை கவச வளையங்கள்',
          en: 'Sacred Temple Kodimaram Brass Cladding Cylinders (Flag Pole)',
          ml: 'ക്ഷേത്ര കൊടിമര പിച്ചള കവചങ്ങൾ',
          te: 'ఆలయ ధ్వజస్తంభ ఇత్తడి కవచ వలయాలు',
          kn: 'ದೇವಸ್ಥಾನದ ಧ್ವಜಸ್ತಂಭ ಹಿತ್ತಾಳೆ ಕವಚ ಉಂಗುರಗಳು',
          hi: 'मंदिर ध्वजस्तंभ पीतल आवरण सिलेंडर',
        },
        slug: 'sacred-temple-kodimaram-brass-cladding-cylinders',
        productCode: 'SSVM-KM-001',
        category: catMap['temple-flag-pole'],
        material: 'கனரக பித்தளை தகடு | Heavy Gauge Bell Brass (16-18 Gauge)',
        dimensions: 'கொடிமர உயரத்திற்கு ஏற்ப தனிப்பயன் (20 அடி முதல் 60 அடி) | Custom sized (20 ft to 60 ft mast)',
        weight: 'உயரத்திற்கு ஏற்ப (சுமார் 80-250 கிலோ) | Varies by height (Approx. 80-250 kg)',
        finish: 'ஆலய தங்க நிற மெருகூட்டல் | Mirror Polished Temple Gold Brass',
        shortDescription:
          'Heavy gauge interlocking brass cylinders and lotus step rings for temple Kodimaram flag mast cladding.',
        tamilShortDescription:
          'கோவில் கொடிமரத்திற்கு பொருத்தப்படும் ஒன்றோடொன்று இணையும் கனரக பித்தளை வளையங்கள் மற்றும் தாமரை அடுக்குகள்.',
        shortDescriptionTranslations: {
          ta: 'கோவில் கொடிமரத்திற்கு பொருத்தப்படும் ஒன்றோடொன்று இணையும் கனரக பித்தளை வளையங்கள் மற்றும் தாமரை அடுக்குகள்.',
          en: 'Heavy gauge interlocking brass cylinders and lotus step rings for temple Kodimaram flag mast cladding.',
          ml: 'ക്ഷേത്ര കൊടിമരത്തിനായി ഇന്റർലോക്കിംഗ് സൗകര്യമുള്ള കനത്ത പിച്ചള കവചങ്ങൾ.',
          te: 'దేవాలయ ధ్వజస్తంభం కోసం మందపాటి ఇత్తడి స్థూపాకార తొడుగులు మరియు పద్మ పీఠాలు.',
          kn: 'ದೇವಾಲಯದ ಧ್ವಜಸ್ತಂಭಕ್ಕೆ ಜೋಡಿಸಬಹುದಾದ ಭದ್ರವಾದ ಹಿತ್ತಾಳೆ ಕವಚಗಳು.',
          hi: 'मंदिर ध्वजस्तंभ हेतु भारी पीतल के इंटरलॉकिंग आवरण वलय एवं पद्म पीठ।',
        },
        fullDescription:
          'Architectural sheet brass cladding manufactured to cover teakwood or concrete temple flagstaffs (Dhwajasthambham). Each cylinder segment is precision rolled, joint-brazed, and polished with interlocking step joints. Includes the base Padma Peedam lotus petals, central rings, and top flag pulleys.',
        tamilFullDescription:
          'தேக்கு மரத்தினால் ஆன கோவில் கொடிமரங்களுக்கு பாதுகாப்பு மற்றும் தெய்வீக பொலிவளிக்கும் கனரக பித்தளை உறை. அடிப்பீட தாமரை அடுக்கு முதல் உச்சி பகுதி வரை அனைத்து பாகங்களும் திருப்பூர் பட்டறையில் செதுக்கப்படுகின்றன.',
        fullDescriptionTranslations: {
          ta: 'தேக்கு மரத்தினால் ஆன கோவில் கொடிமரங்களுக்கு பாதுகாப்பு மற்றும் தெய்வீக பொலிவளிக்கும் கனரக பித்தளை உறை. அடிப்பீட தாமரை அடுக்கு முதல் உச்சி பகுதி வரை அனைத்து பாகங்களும் திருப்பூர் பட்டறையில் செதுக்கப்படுகின்றன.',
          en: 'Architectural sheet brass cladding manufactured to cover teakwood or concrete temple flagstaffs (Dhwajasthambham). Each cylinder segment is precision rolled, joint-brazed, and polished with interlocking step joints. Includes the base Padma Peedam lotus petals, central rings, and top flag pulleys.',
          ml: 'തേക്ക് തടിയിൽ നിർമ്മിച്ച കൊടിമരങ്ങൾക്ക് പൂർണ്ണ സംരക്ഷണവും ഭംഗിയും നൽകുന്ന കവചം.',
          te: 'టేకు కొయ్య లేదా కాంక్రీట్ ధ్వజస్తంభానికి అత్యంత వైభవంగా సరిపోయే ఇత్తడి కవచం.',
          kn: 'ಸಾಗವಾನಿ ಮರದ ಧ್ವಜಸ್ತಂಭಕ್ಕೆ ದೀರ್ಘಕಾಲಿಕ ರಕ್ಷಣೆ ಮತ್ತು ಮೆರುಗು ನೀಡುವ ಕವಚಗಳು.',
          hi: 'सागौन की लकड़ी या कंक्रीट के ध्वजस्तंभ को ढकने वाला टिकाऊ और मनमोहक पीतल आवरण।',
        },
        primaryImage: '/images/cat_kodimaram.jpg',
        imageGallery: [
          {
            url: '/images/cat_kodimaram.jpg',
            alt: 'கோவில் கொடிமர கவசம் | Temple Kodimaram Brass Cladding',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'பொருந்தும் உள்கூடு | Mast Type', value: 'மர கொடிமரம் & கான்கிரீட் தூண் | Teakwood or Concrete Mast' },
          { label: 'இணைப்பு முறை | Joint Design', value: 'இடைவெளியற்ற பூட்டு அமைப்பு | Interlocking weatherproof lap joints' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Ashtalakshmi Temple Bali Peedam Brass Cladding Plates',
        tamilName: 'அஷ்டலக்ஷ்மி பலிபீட பித்தளை கவசம்',
        nameTranslations: {
          ta: 'அஷ்டலக்ஷ்மி பலிபீட பித்தளை கவசம்',
          en: 'Ashtalakshmi Temple Bali Peedam Brass Cladding Plates',
          ml: 'അഷ്ടലക്ഷ്മി ബലിപീഠ പിച്ചള കവചം',
          te: 'అష్టలక్ష్మి బలిపీఠం ఇత్తడి తొడుగులు',
          kn: 'ಅಷ್ಟಲಕ್ಷ್ಮಿ ಬಲಿಪೀಠದ ಹಿತ್ತಾಳೆ ಕವಚ',
          hi: 'अष्टलक्ष्मी बलिपीठम पीतल प्लेट आवरण',
        },
        slug: 'ashtalakshmi-temple-bali-peedam-brass-cladding-plates',
        productCode: 'SSVM-KM-002',
        category: catMap['temple-flag-pole'],
        material: 'தூய பித்தளை தகடு | Pure Brass Plate & Cast Medallions',
        dimensions: 'பலிபீட அளவுக்கு ஏற்ப | Sized to temple Bali Peedam dimensions',
        weight: 'சுமார் 35-70 கிலோ | Approx. 35-70 kg',
        finish: 'பாரம்பரிய கைவேலை நிவாரணம் | Hand-Chiseled Antique Patina',
        shortDescription:
          'Sacred brass protective cover panels for temple Bali Peedam embossed with Ashtalakshmi motifs and floral borders.',
        tamilShortDescription:
          'கோவில் பலிபீடத்திற்கு பொருத்தப்படும் அஷ்டலக்ஷ்மி உருவங்கள் பொறித்த கனரக பித்தளை கவசம்.',
        shortDescriptionTranslations: {
          ta: 'கோவில் பலிபீடத்திற்கு பொருத்தப்படும் அஷ்டலக்ஷ்மி உருவங்கள் பொறித்த கனரக பித்தளை கவசம்.',
          en: 'Sacred brass protective cover panels for temple Bali Peedam embossed with Ashtalakshmi motifs and floral borders.',
          ml: 'അഷ്ടലക്ഷ്മി രൂപങ്ങൾ കൊത്തിയ പവിത്രമായ ബലിപീഠ പിച്ചള കവചം.',
          te: 'అష్టలక్ష్మి రూపాలు మరియు పూల తోరణాలతో కూడిన ఆలయ బలిపీఠం కవచం.',
          kn: 'ಅಷ್ಟಲಕ್ಷ್ಮಿಯರ ದಿವ್ಯ ಚಿತ್ರಗಳು ಕೆತ್ತಲಾದ ಬಲಿಪೀಠದ ರಕ್ಷಾ ಕವಚ.',
          hi: 'अष्टलक्ष्मी रूपांकनों एवं पुष्प नक्काशी से सज्जित बलिपीठम पीतल आवरण।',
        },
        fullDescription:
          'Custom manufactured brass sheet cladding engineered for temple Bali Peedam installations situated adjacent to the Kodimaram. Features hand-chiseled Ashtalakshmi relief panels, beaded border trims, and protective corner brackets.',
        tamilFullDescription:
          'கொடிமரத்தின் அருகே அமையும் ஆலய பலிபீடத்திற்கான பித்தளை உறை. எட்டு திசைகளிலும் அஷ்டலக்ஷ்மி தேவியின் உருவங்கள் நுட்பமாக வடிக்கப்பட்டுள்ளன.',
        fullDescriptionTranslations: {
          ta: 'கொடிமரத்தின் அருகே அமையும் ஆலய பலிபீடத்திற்கான பித்தளை உறை. எட்டு திசைகளிலும் அஷ்டலக்ஷ்மி தேவியின் உருவங்கள் நுட்பமாக வடிக்கப்பட்டுள்ளன.',
          en: 'Custom manufactured brass sheet cladding engineered for temple Bali Peedam installations situated adjacent to the Kodimaram. Features hand-chiseled Ashtalakshmi relief panels, beaded border trims, and protective corner brackets.',
          ml: 'കൊടിമരത്തിനടുത്തുള്ള ബലിപീഠത്തിനായി പ്രത്യേകം നിർമ്മിച്ച അഷ്ടലക്ഷ്മി കവചം.',
          te: 'ధ్వజస్తంభం ప్రక్కన ఉండే బలిపీఠం కోసం అష్టలక్ష్మి దేవతల మూర్తులతో కూడిన పవిత్ర తొడుగు.',
          kn: 'ಧ್ವಜಸ್ತಂಭದ ಬಳಿ ಸ್ಥಾಪಿಸುವ ಬಲಿಪೀಠಕ್ಕಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾದ ಅಷ್ಟಲಕ್ಷ್ಮಿ ಕವಚ ಫಲಕಗಳು.',
          hi: 'ध्वजस्तंभ के समीप स्थित बलिपीठम के लिए अष्टलक्ष्मी विग्रहों युक्त पीतल आवरण।',
        },
        primaryImage: '/images/cat_kodimaram.jpg',
        imageGallery: [
          {
            url: '/images/cat_kodimaram.jpg',
            alt: 'பலிபீட பித்தளை கவசம் | Bali Peedam Brass Cladding',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'வடிவம் | Profile', value: 'சதுர மற்றும் அஷ்டகோண பீடம் | Square or Octagonal pedestal' },
          { label: 'தகடு தடிமன் | Sheet Thickness', value: '16 கேஜ் பித்தளை | 16 Gauge Heavy Brass' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },

      // --- 4. Temple Bell (Primary Focus) ---
      {
        name: 'Heavy Hand-Cast Temple Brass Bell with Nandi Finial (Ghanta)',
        tamilName: 'நந்தி தலைப்பு கனரக கோவில் பித்தளை மணி',
        nameTranslations: {
          ta: 'நந்தி தலைப்பு கனரக கோவில் பித்தளை மணி',
          en: 'Heavy Hand-Cast Temple Brass Bell with Nandi Finial (Ghanta)',
          ml: 'നന്ദി ശിൽപമുള്ള കനത്ത ക്ഷേത്ര പിച്ചള മണി',
          te: 'నంది రూపం కలిగిన భారీ ఇత్తడి ఆలయ ఘంట',
          kn: 'ನಂದಿ ಶಿಲ್ಪವಿರುವ ದೇವಸ್ಥಾನದ ಭಾರಿ ಹಿತ್ತಾಳೆ ಗಂಟೆ',
          hi: 'नंदी शीर्ष युक्त भारी हस्तनिर्मित मंदिर पीतल घंटा',
        },
        slug: 'heavy-hand-cast-temple-brass-bell-nandi-finial',
        productCode: 'SSVM-BL-001',
        category: catMap['temple-bell'],
        material: 'நாத வெண்கலம் & பித்தளை | High-Tin Acoustic Bronze & Bell Metal',
        dimensions: 'உயரம்: 18 அங்குலம், விட்டம்: 12 அங்குலம் | Height: 18 inches, Rim Dia: 12 inches',
        weight: 'சுமார் 16 கிலோ | Approx. 16 kg',
        finish: 'இயற்கை வெண்கல மெருகூட்டல் | Natural Polished Bell Metal',
        shortDescription:
          'Heavy sonorous temple bell with an ornate seated Nandi bull handle that produces deep, long-sustaining divine resonance.',
        tamilShortDescription:
          'நந்தி தலைப்புடன் கூடிய கனரக கோவில் மணி, ஓங்கார நாதத்துடன் கூடிய நீண்ட ஒலி அதிர்வை உருவாக்கும்.',
        shortDescriptionTranslations: {
          ta: 'நந்தி தலைப்புடன் கூடிய கனரக கோவில் மணி, ஓங்கார நாதத்துடன் கூடிய நீண்ட ஒலி அதிர்வை உருவாக்கும்.',
          en: 'Heavy sonorous temple bell with an ornate seated Nandi bull handle that produces deep, long-sustaining divine resonance.',
          ml: 'നന്ദി രൂപമുള്ള ഹാൻഡിലോടു കൂടിയതും ദീർഘ നാദം പുറപ്പെടുവിക്കുന്നതുമായ ക്ഷേത്ര മണി.',
          te: 'నందీశ్వరుని పిడితో కూడి, గంభీరమైన ఓంకార ప్రతిధ్వనినిచ్చే పవిత్ర ఆలయ గంట.',
          kn: 'ನಂದಿ ವಿಗ್ರಹದ ಹಿಡಿಯೊಂದಿಗೆ ದೀರ್ಘ ದೈವಿಕ ಝೇಂಕಾರ ಮೊಳಗಿಸುವ ಪವಿತ್ರ ಗಂಟೆ.',
          hi: 'नंदी भगवान के सुंदर शीर्ष युक्त घंटा, जो दीर्घ एवं गंभीर ओंकार ध्वनि उत्पन्न करता है।',
        },
        fullDescription:
          'Manufactured with special high-tin acoustic metal proportions to create a rich, echoing sound that vibrates through temple halls during puja rituals and aarti ceremonies. Cast as a single monolithic acoustic bell with forged suspension loop and weighted bell striker.',
        tamilFullDescription:
          'உயர்தர மணி வெண்கல உலோகக் கலவையால் வார்க்கப்பட்டது. பூஜையின் போது எழும் ஓங்கார நாதம் நீண்ட நேரம் நீடிக்கும் வகையில் துல்லியமாக ஒலியியல் அமைப்பில் வடிவமைக்கப்பட்டுள்ளது.',
        fullDescriptionTranslations: {
          ta: 'உயர்தர மணி வெண்கல உலோகக் கலவையால் வார்க்கப்பட்டது. பூஜையின் போது எழும் ஓங்கார நாதம் நீண்ட நேரம் நீடிக்கும் வகையில் துல்லியமாக ஒலியியல் அமைப்பில் வடிவமைக்கப்பட்டுள்ளது.',
          en: 'Manufactured with special high-tin acoustic metal proportions to create a rich, echoing sound that vibrates through temple halls during puja rituals and aarti ceremonies. Cast as a single monolithic acoustic bell with forged suspension loop and weighted bell striker.',
          ml: 'ദീർഘനേരം നിലനിൽക്കുന്ന ഓംകാര നാദം ഉണ്ടാക്കുന്ന പ്രത്യേക വെങ്കലക്കൂട്ടിൽ തീർത്തത്.',
          te: 'పూజా సమయంలో సుదీర్ఘ ఓంకార నాదం ఇచ్చేలా ప్రత్యేక కంచు లోహ నిష్పత్తితో పోతపోసిన గంట.',
          kn: 'ಪೂಜಾ ಸಮಯದಲ್ಲಿ ದೀರ್ಘಕಾಲ ಗಂಭೀರ ನಾದ ನೀಡುವ ಕಂಚಿನ ಧ್ವನಿ ಸಂಯೋಜನೆಯಲ್ಲಿ ಎರಕಹೊಯ್ದ ಘಂಟೆ.',
          hi: 'आरती और पूजा के समय मंदिर प्रांगण में गूंजने वाली दिव्य ध्वनि हेतु कांस्य धातु से ढला घंटा।',
        },
        primaryImage: '/images/cat_temple_bell.jpg',
        imageGallery: [
          {
            url: '/images/cat_temple_bell.jpg',
            alt: 'கோவில் பித்தளை மணி | Temple Brass Bell with Nandi',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'ஒலி அதிர்வு | Acoustic Sustain', value: '15+ வினாடிகள் நீடிக்கும் ஓங்கார நாதம் | 15+ seconds sustain' },
          { label: 'நாக்கு அமைப்பு | Clapper Weight', value: 'கனரக பித்தளை உருண்டை | Heavy cast brass spherical striker' },
          { label: 'தலைப்பு விருப்பங்கள் | Finial Motif', value: 'நந்தி, கருடன், அனுமன் | Nandi, Garuda or Hanuman' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Monumental Temple Hanging Bell with Heavy Brass Chain',
        tamilName: 'கனரக தொங்கு கோவில் மணி மற்றும் பித்தளை சங்கிலி',
        nameTranslations: {
          ta: 'கனரக தொங்கு கோவில் மணி மற்றும் பித்தளை சங்கிலி',
          en: 'Monumental Temple Hanging Bell with Heavy Brass Chain',
          ml: 'വലിയ തൂക്കു മണിയും കനത്ത പിച്ചള ചങ്ങലയും',
          te: 'భారీ గొలుసుతో కూడిన వేలాడే ఆలయ మహాగంట',
          kn: 'ಹಿತ್ತಾಳೆಯ ಸರಪಳಿಯೊಂದಿಗೆ ತೂಗುಹಾಕುವ ಭಾರಿ ದೇವಸ್ಥಾನದ ಗಂಟೆ',
          hi: 'मजबूत पीतल जंजीर युक्त विशाल लटकता मंदिर घंटा',
        },
        slug: 'monumental-temple-hanging-bell-heavy-chain',
        productCode: 'SSVM-BL-002',
        category: catMap['temple-bell'],
        material: 'பாரம்பரிய மணி வெண்கலம் | Traditional Bell Bronze (Ven-Kalam)',
        dimensions: 'உயரம்: 28 அங்குலம், விட்டம்: 20 அங்குலம் | Height: 28 inches, Rim Dia: 20 inches',
        weight: 'சுமார் 45 கிலோ | Approx. 45 kg',
        finish: 'ஆலய பழங்கால மெருகூட்டல் | Temple Antique Patina Polish',
        shortDescription:
          'Massive temple entrance portal hanging bell with interlocking linked chain producing thunderous sacred sound.',
        tamilShortDescription:
          'கோவில் பிரதான நுழைவாயிலுக்கான பெரிய தொங்கு மணி, வலுவான பித்தளை சங்கிலியுடன் கம்பீர ஒலி தரும்.',
        shortDescriptionTranslations: {
          ta: 'கோவில் பிரதான நுழைவாயிலுக்கான பெரிய தொங்கு மணி, வலுவான பித்தளை சங்கிலியுடன் கம்பீர ஒலி தரும்.',
          en: 'Massive temple entrance portal hanging bell with interlocking linked chain producing thunderous sacred sound.',
          ml: 'ക്ഷേത്ര കവാടങ്ങളിൽ സ്ഥാപിക്കുന്ന വലിയ തൂക്കുമണി, ദൂരവ്യാപകമായ നാദം നൽകുന്നു.',
          te: 'ఆలయ ప్రధాన ద్వారం వద్ద వేలాడదీసే మహా ఘంట, బలమైన ఇత్తడి గొలుసుతో లభిస్తుంది.',
          kn: 'ದೇವಾಲಯದ ಮುಖ್ಯ ಮಹಾದ್ವಾರಕ್ಕೆ ತೂಗುಹಾಕುವ ಭಾರಿ ಗಂಟೆ ಹಾಗೂ ಭದ್ರವಾದ ಸರಪಳಿ.',
          hi: 'मंदिर के मुख्य प्रवेश द्वार के लिए महाघंटा, जो तीव्र एवं पवित्र ध्वनि गुंजायमान करता है।',
        },
        fullDescription:
          'Engineered for temple entrance mandapams and sanctum portals. Its thick rim walls produce powerful acoustic waves believed to purify negative energies and invite auspicious vibrations into the temple premises.',
        tamilFullDescription:
          'கோவில் கோபுர வாயில் மற்றும் மண்டபங்களில் தொங்கவிடப்படும் பெரிய அளவிலான மணி. பக்தர்கள் மற்றும் அர்ச்சகர்கள் எளிதில் ஒலிக்கும் வகையில் வடிவமைக்கப்பட்டது.',
        fullDescriptionTranslations: {
          ta: 'கோவில் கோபுர வாயில் மற்றும் மண்டபங்களில் தொங்கவிடப்படும் பெரிய அளவிலான மணி. பக்தர்கள் மற்றும் அர்ச்சகர்கள் எளிதில் ஒலிக்கும் வகையில் வடிவமைக்கப்பட்டது.',
          en: 'Engineered for temple entrance mandapams and sanctum portals. Its thick rim walls produce powerful acoustic waves believed to purify negative energies and invite auspicious vibrations into the temple premises.',
          ml: 'ക്ഷേത്ര മണ്ഡപങ്ങളിലും നടപ്പന്തലുകളിലും തൂക്കിയിടാൻ അനുയോജ്യമായ വലിയ മണി.',
          te: 'దేవాలయ మండపాలలో మరియు ముఖద్వారాల వద్ద భక్తులు మ్రోగించడానికి అనువైన మహా ఘంట.',
          kn: 'ದೇವಾಲಯದ ಮುಖಮಂಟಪಗಳಲ್ಲಿ ಭಕ್ತರು ನಾದ ಮೊಳಗಿಸಲು ಯೋಗ್ಯವಾದ ಭವ್ಯ ಗಂಟೆ.',
          hi: 'मंदिर के मुख्य मंडप एवं सिंहद्वार पर लटकाने योग्य महाघंटा।',
        },
        primaryImage: '/images/cat_temple_bell.jpg',
        imageGallery: [
          {
            url: '/images/cat_temple_bell.jpg',
            alt: 'தொங்கு கோவில் மணி | Hanging Temple Portal Bell',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'சங்கிலி நீளம் | Chain Length', value: '5 அடி முதல் 10 அடி வரை | 5 ft to 10 ft customizable' },
          { label: 'கலவை விகிதம் | Alloy Ratio', value: '78% தாமிரம், 22% தகரம் | 78% Copper, 22% Tin acoustic alloy' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- 5. Brass Lamps ---
      {
        name: 'Traditional South Indian Annam Kuthu Vilakku (Pair)',
        tamilName: 'பாரம்பரிய அன்னம் குத்து விளக்கு (ஜோடி)',
        nameTranslations: {
          ta: 'பாரம்பரிய அன்னம் குத்து விளக்கு (ஜோடி)',
          en: 'Traditional South Indian Annam Kuthu Vilakku (Pair)',
          ml: 'പരമ്പരാഗത അന്നം കുത്തുവിളക്ക് (ജോഡി)',
          te: 'సాంప్రదాయ హంస కుత్తు విళక్కు (జత)',
          kn: 'ಪರಂಪರೆಯ ಹಂಸ ಕುತ್ತು ದೀಪ (ಜೋಡಿ)',
          hi: 'पारंपरिक दक्षिण भारतीय अन्नम कुथु विळक्कु (जोड़ी)',
        },
        slug: 'traditional-south-indian-annam-kuthu-vilakku-pair',
        productCode: 'SSVM-LP-001',
        category: catMap['brass-lamps'],
        material: 'தூய கனரக பித்தளை | Pure Heavy Cast Brass',
        dimensions: 'உயரம்: 48 அங்குலம் (4 அடி ஜோடி) | Height: 48 inches (Pair of 2)',
        weight: 'சுமார் 24 கிலோ (ஜோடி) | Approx. 24 kg combined',
        finish: 'பிரகாசமான தங்க பித்தளை மெருகூட்டல் | Bright Golden Brass Polish',
        shortDescription:
          'Classic 5-wick Annam (Swan) crest standing temple lamps cast in detachable sections for auspicious temple occasions.',
        tamilShortDescription:
          'பாரம்பரிய 5 முகம் கொண்ட அன்னபட்சி குத்து விளக்கு, கழற்றி மாட்டக்கூடிய பாகங்களுடன் கூடியது.',
        shortDescriptionTranslations: {
          ta: 'பாரம்பரிய 5 முகம் கொண்ட அன்னபட்சி குத்து விளக்கு, கழற்றி மாட்டக்கூடிய பாகங்களுடன் கூடியது.',
          en: 'Classic 5-wick Annam (Swan) crest standing temple lamps cast in detachable sections for auspicious temple occasions.',
          ml: '5 തിരികളിട്ട് കൊളുത്താവുന്ന അന്നം കുത്തുവിളക്കുകൾ, വേർപെടുത്താവുന്ന ഭാഗങ്ങളോടെ.',
          te: 'హంస శిఖరంతో కూడిన 5 ముఖాల సాంప్రదాయ కుత్తు విళక్కు దీపాలు.',
          kn: '೫ ಬತ್ತಿಗಳ ಹಂಸ ಕುತ್ತು ದೀಪ, ಸುಲಭವಾಗಿ ಬಿಡಿಭಾಗಗಳನ್ನು ಬೇರ್ಪಡಿಸಿ ಸ್ವಚ್ಛಗೊಳಿಸಬಹುದು.',
          hi: 'हंस शीर्ष युक्त 5 मुखी पारंपरिक कुथु विळक्कु दीप जोड़ी।',
        },
        fullDescription:
          'The quintessential South Indian ritual lamp. Handcrafted with heavy cast base, ridged baluster column, deep 5-wick oil dish, and crowning mythological Annam bird. Used at temple entrances, sanctums, weddings, and sacred festivals.',
        tamilFullDescription:
          'பாரம்பரிய அன்னபட்சி முகப்பு கொண்ட 5 திரி குத்துவிளக்கு. அடிப்பாகம், தண்டு, தகளி மற்றும் அன்னப்பட்சி ஆகிய பாகங்களை எளிதாக கழற்றி சுத்தம் செய்யும் வகையில் மறையமைப்புடன் கூடியது.',
        fullDescriptionTranslations: {
          ta: 'பாரம்பரிய அன்னபட்சி முகப்பு கொண்ட 5 திரி குத்துவிளக்கு. அடிப்பாகம், தண்டு, தகளி மற்றும் அன்னப்பட்சி ஆகிய பாகங்களை எளிதாக கழற்றி சுத்தம் செய்யும் வகையில் மறையமைப்புடன் கூடியது.',
          en: 'The quintessential South Indian ritual lamp. Handcrafted with heavy cast base, ridged baluster column, deep 5-wick oil dish, and crowning mythological Annam bird. Used at temple entrances, sanctums, weddings, and sacred festivals.',
          ml: 'ശുദ്ധമായ പിച്ചളയിൽ തീർത്ത മംഗളകരമായ നിലവിളക്കുകൾ. വൃത്തിയാക്കാൻ എളുപ്പമാണ്.',
          te: 'ఆలయ ప్రవేశం, గర్భాలయ దీపారాధన మరియు పర్వదినాల కొరకు స్వచ్ఛమైన ఇత్తడితో వార్చిన జంట దీపాలు.',
          kn: 'ದೇವಾಲಯ ಹಾಗೂ ಮಂಗಳಕಾರ್ಯಗಳಲ್ಲಿ ಬೆಳಗಿಸಲು ಪ್ರಶಸ್ತವಾದ ಶುದ್ಧ ಹಿತ್ತಾಳೆಯ ಜೋಡಿ ದೀಪಗಳು.',
          hi: 'मंदिर के द्वार, गर्भगृह एवं मांगलिक आयोजनों हेतु शुद्ध पीतल से ढले पारंपरिक खड़े दीप।',
        },
        primaryImage: '/images/cat_brass_lamps.jpg',
        imageGallery: [
          {
            url: '/images/cat_brass_lamps.jpg',
            alt: 'அன்னம் குத்து விளக்கு ஜோடி | Annam Kuthu Vilakku Pair',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'திரி முகங்கள் | Wick Depressions', value: '5 மங்கல முகங்கள் | 5 Auspicious wick notches' },
          { label: 'எண்ணெய் கொள்ளளவு | Oil Capacity', value: 'சுமார் 500 மிலி | Approx. 500 ml per lamp' },
          { label: 'பாகங்கள் | Segments', value: '4 திருகு பாகங்கள் | 4 screw-together interlocking segments' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- 6. Pooja Vessels ---
      {
        name: 'Sacred Temple Abhisheka Kumbham & Pooja Vessel Set',
        tamilName: 'கோவில் அபிஷேக கும்பம் & பூஜை பாத்திர தொகுப்பு',
        nameTranslations: {
          ta: 'கோவில் அபிஷேக கும்பம் & பூஜை பாத்திர தொகுப்பு',
          en: 'Sacred Temple Abhisheka Kumbham & Pooja Vessel Set',
          ml: 'ക്ഷേത്ര അഭിഷേക കുംഭവും പൂജാ പാത്ര സെറ്റും',
          te: 'ఆలయ అభిషేక కుంభం & పూజా పాత్రల సమితి',
          kn: 'ದೇವಸ್ಥಾನದ ಅಭಿಷೇಕ ಕುಂಭ ಮತ್ತು ಪೂಜಾ ಪಾತ್ರೆಗಳ ಸೆಟ್',
          hi: 'मंदिर अभिषेक कुंभ एवं पूजा बर्तन सेट',
        },
        slug: 'sacred-temple-abhisheka-kumbham-pooja-vessel-set',
        productCode: 'SSVM-PV-001',
        category: catMap['pooja-vessels'],
        material: 'கனரக பித்தளை & தூய தாமிரம் | Heavy Brass & Pure Copper',
        dimensions: 'முழுமையான 7 பாத்திர தொகுப்பு | Complete 7-Piece Sanctum Set',
        weight: 'சுமார் 8.5 கிலோ | Approx. 8.5 kg',
        finish: 'பாரம்பரிய மெருகூட்டல் | Traditional Mirror Polish',
        shortDescription:
          'Comprehensive temple sanctum vessel set comprising Abhisheka Kumbham, Panchapathiram, Udharani, Arghya Patram, and Deeparadhana plate.',
        tamilShortDescription:
          'அபிஷேக கும்பம், பஞ்சபாத்திரம், உத்தரணி, அர்க்கிய பாத்திரம் மற்றும் தீபாராதனை தட்டு அடங்கிய முழுமையான பூஜை தொகுப்பு.',
        shortDescriptionTranslations: {
          ta: 'அபிஷேக கும்பம், பஞ்சபாத்திரம், உத்தரணி, அர்க்கிய பாத்திரம் மற்றும் தீபாராதனை தட்டு அடங்கிய முழுமையான பூஜை தொகுப்பு.',
          en: 'Comprehensive temple sanctum vessel set comprising Abhisheka Kumbham, Panchapathiram, Udharani, Arghya Patram, and Deeparadhana plate.',
          ml: 'അഭിഷേക കുംഭം, പഞ്ചപാത്രം, ഉദ്ധരണി എന്നിവയടങ്ങുന്ന 7 പാത്രങ്ങളുടെ സമഗ്ര പൂജാ സെറ്റ്.',
          te: 'అభిషేక కుంభం, పంచపాత్ర, ఉద్ధరణి మరియు హారతి పళ్లెం కలిగిన సంపూర్ణ పూజా పాత్రల సమితి.',
          kn: 'ಅಭಿಷೇಕ ಕುಂಭ, ಪಂಚಪಾತ್ರೆ, ಉದ್ದರಣೆ ಒಳಗೊಂಡಿರುವ ಸಂಪೂರ್ಣ ೭ ಪಾತ್ರೆಗಳ ಪೂಜಾ ಸೆಟ್.',
          hi: 'अभिषेक कुंभ, पंचपात्र, आचमनी एवं आरती थाल से युक्त संपूर्ण 7 वस्तु मंदिर पूजा सेट।',
        },
        fullDescription:
          'Crafted from heavy gauge virgin metals ensuring no chemical reaction during sacred milk, honey, panchamirtham, and consecrated water abhishekam rituals. Designed for daily temple puja performance.',
        tamilFullDescription:
          'தினசரி கோவில் பூஜைகள் மற்றும் இல்லத்து வழிபாடுகளுக்கு ஏற்ற தூய உலோக பாத்திரங்கள். பால், தேன் மற்றும் சந்தன அபிஷேகங்களை தாங்கும் வகையில் கனரக தகடுகளால் உருவாக்கப்பட்டது.',
        fullDescriptionTranslations: {
          ta: 'தினசரி கோவில் பூஜைகள் மற்றும் இல்லத்து வழிபாடுகளுக்கு ஏற்ற தூய உலோக பாத்திரங்கள். பால், தேன் மற்றும் சந்தன அபிஷேகங்களை தாங்கும் வகையில் கனரக தகடுகளால் உருவாக்கப்பட்டது.',
          en: 'Crafted from heavy gauge virgin metals ensuring no chemical reaction during sacred milk, honey, panchamirtham, and consecrated water abhishekam rituals. Designed for daily temple puja performance.',
          ml: 'പാൽ, തേൻ, ചന്ദന അഭിഷേകങ്ങൾക്ക് അനുയോജ്യമായ ശുദ്ധമായ കനത്ത ലോഹ പാത്രങ്ങൾ.',
          te: 'నిత్య ఆలయ పూజలు మరియు అభిషేక కైంకర్యాల కోసం మందపాటి శుద్ధ లోహాలతో చేసిన పాత్రలు.',
          kn: 'ದೈನಂದಿನ ದೇವಸ್ಥಾನ ಪೂಜೆ ಮತ್ತು ಅಭಿಷೇಕ ಕಾರ್ಯಗಳಿಗೆ ಯೋಗ್ಯವಾದ ಶುದ್ಧ ಲೋಹದ ಪಾತ್ರೆಗಳು.',
          hi: 'दूध, शहद, पंचामृत एवं गंगाजल अभिषेक हेतु रासायनिक प्रतिक्रिया मुक्त भारी धातु पात्र।',
        },
        primaryImage: '/images/cat_pooja_vessels.jpg',
        imageGallery: [
          {
            url: '/images/cat_pooja_vessels.jpg',
            alt: 'பூஜை பாத்திர தொகுப்பு | Temple Pooja Vessel Set',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'தொகுப்பில் உள்ளவை | Items Included', value: 'கும்பம், பஞ்சபாத்திரம், உத்தரணி, தட்டு | Kumbham, Panchapathiram, Spoon, Tray' },
          { label: 'உலோக தரம் | Material Standard', value: 'உணவு மற்றும் பூஜை தரம் | Food & ritual safe non-reactive brass' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },

      // --- 7. Deity Idols ---
      {
        name: 'Shri Shakthi Vinayagar Seated Brass Temple Idol',
        tamilName: 'ஸ்ரீ சக்தி விநாயகர் அமர்ந்த திருக்கோல பித்தளை சிலை',
        nameTranslations: {
          ta: 'ஸ்ரீ சக்தி விநாயகர் அமர்ந்த திருக்கோல பித்தளை சிலை',
          en: 'Shri Shakthi Vinayagar Seated Brass Temple Idol',
          ml: 'ശ്രീ ശക്തി വിനായകൻ പിച്ചള വിഗ്രഹം',
          te: 'శ్రీ శక్తి వినాయకుడు ఆసీన భంగిమ ఇత్తడి విగ్రహం',
          kn: 'ಶ್ರೀ ಶಕ್ತಿ ವಿನಾಯಕನ ಆಸೀನ ಹಿತ್ತಾಳೆ ಮೂರ್ತಿ',
          hi: 'श्री शक्ति विनायक पद्मासन पीतल देव प्रतिमा',
        },
        slug: 'shri-shakthi-vinayagar-seated-brass-temple-idol',
        productCode: 'SSVM-ID-001',
        category: catMap['deity-idols'],
        material: 'கனரக திட பித்தளை வார்ப்பு | Heavy Solid Cast Brass',
        dimensions: 'உயரம்: 24 அங்குலம், அகலம்: 16 அங்குலம் | Height: 24 inches, Width: 16 inches',
        weight: 'சுமார் 28 கிலோ | Approx. 28 kg',
        finish: 'ஆலய பழங்கால மெழுகு மெருகூட்டல் | Temple Antique Wax Polished Brass',
        shortDescription:
          'Divine Lord Ganesha seated regally on an ornate lotus throne with modak in trunk and sacred weapons.',
        tamilShortDescription:
          'தாமரை பீடத்தில் அமர்ந்த திருக்கோலத்தில், கையில் மோதகம் ஏந்திய விநாயகர் பெருமானின் அருள்மிகு திருமேனி.',
        shortDescriptionTranslations: {
          ta: 'தாமரை பீடத்தில் அமர்ந்த திருக்கோலத்தில், கையில் மோதகம் ஏந்திய விநாயகர் பெருமானின் அருள்மிகு திருமேனி.',
          en: 'Divine Lord Ganesha seated regally on an ornate lotus throne with modak in trunk and sacred weapons.',
          ml: 'താമരപ്പീഠത്തിൽ മോദകം ഏന്തി അനുഗ്രഹം ചൊരിയുന്ന ഗണപതി ഭഗവാന്റെ ദിവ്യ വിഗ്രഹം.',
          te: 'పద్మాసనంపై కొలువుదీరి, తొండంలో మోదకం ధరించిన వినాయకుని దివ్య విగ్రహం.',
          kn: 'ಕಮಲದ ಪೀಠದಲ್ಲಿ ಮೋಧಕ ಹಿಡಿದು ದರ್ಶನ ನೀಡುವ ವಿನಾಯಕನ ಮಂಗಳಕರ ವಿಗ್ರಹ.',
          hi: 'कमलासन पर विराजमान, सूंड में मोदक धारण किए भगवान श्री गणेश की अलौकिक प्रतिमा।',
        },
        fullDescription:
          'The flagship idol representing Sri Shakthi Vinayaga Metals. Portrays Lord Vinayaka with broken tusk, sweet modak, battle axe (Parashu), and noose (Pasha). Hand-chiseled by generational sthapatis following strict Dasa Tala Shilpa Shastra proportions.',
        tamilFullDescription:
          'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸின் முதன்மை தெய்வீக திருவுருவம். சாஸ்திர சம்பிரதாயப்படி வடிக்கப்பட்ட துதிக்கை விநாயகர் சிலை. கோவில் கருவறை மற்றும் பூஜை அறைகளுக்கு மங்கலம் சேர்க்கும் சிலை.',
        fullDescriptionTranslations: {
          ta: 'ஸ்ரீ சக்தி விநாயக மெட்டல்ஸின் முதன்மை தெய்வீக திருவுருவம். சாஸ்திர சம்பிரதாயப்படி வடிக்கப்பட்ட துதிக்கை விநாயகர் சிலை. கோவில் கருவறை மற்றும் பூஜை அறைகளுக்கு மங்கலம் சேர்க்கும் சிலை.',
          en: 'The flagship idol representing Sri Shakthi Vinayaga Metals. Portrays Lord Vinayaka with broken tusk, sweet modak, battle axe (Parashu), and noose (Pasha). Hand-chiseled by generational sthapatis following strict Dasa Tala Shilpa Shastra proportions.',
          ml: 'ദശ താല ശിൽപ ശാസ്ത്ര വിധിപ്രകാരം തിരുപ്പൂർ ശിൽപികൾ വാർത്ത മംഗള മൂർത്തി.',
          te: 'దశ తాల శిల్ప శాస్త్ర ప్రమాణాల ప్రకారం సూక్ష్మంగా చెక్కబడిన ఆదిపూజ్యుని విగ్రహం.',
          kn: 'ದಶ ತಾಲ ಶಿಲ್ಪಶಾಸ್ತ್ರ ನಿಯಮಗಳಂತೆ ಸಾಂಪ್ರದಾಯಿಕ ಶಿಲ್ಪಿಗಳು ಕಡೆದ ವಿಘ್ನನಿವಾರಕ ಮೂರ್ತಿ.',
          hi: 'दश ताल शिल्प शास्त्र के अनुसार वंशानुगत मूर्तिकारों द्वारा हाथ से तराशी गई मंगलकारी गणेश प्रतिमा।',
        },
        primaryImage: '/images/cat_god_idols.jpg',
        imageGallery: [
          {
            url: '/images/cat_god_idols.jpg',
            alt: 'ஸ்ரீ சக்தி விநாயகர் சிலை | Shri Shakthi Vinayagar Brass Idol',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'ஆசன நிலை | Posture', value: 'லலிதாசனம் (பத்ம பீடம்) | Lalitasana on Lotus Throne' },
          { label: 'துதிக்கை | Trunk Stance', value: 'இடம்புரி விநாயகர் | Edampuri (curving to left)' },
          { label: 'வார்ப்பு வகை | Casting Method', value: 'திட வார்ப்பு முறை | Solid lost-wax bronze casting' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- 5. Kavacham ---
      {
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
        category: catMap['kavacham'],
        material: 'கனரக பித்தளை தகடு | Heavy Polished Sheet Brass',
        dimensions: 'விட்டம்: 18 அங்குலம் | Diameter: 18 inches',
        weight: 'சுமார் 2.4 கிலோ | Approx. 2.4 kg',
        finish: 'கண்ணாடி போன்ற பளபளப்பு | Mirror Golden Polish',
        shortDescription:
          'Deep etched floral border brass thambalam tray for temple deity offerings, prasadam, and camphor deeparadhana.',
        tamilShortDescription:
          'கோவில் பிரசாதம், பழங்கள் மற்றும் கற்பூர தீபாராதனைக்கு உகந்த மலர் வேலைப்பாடுகள் கொண்ட பித்தளை தம்பாளம்.',
        shortDescriptionTranslations: {
          ta: 'கோவில் பிரசாதம், பழங்கள் மற்றும் கற்பூர தீபாராதனைக்கு உகந்த மலர் வேலைப்பாடுகள் கொண்ட பித்தளை தம்பாளம்.',
          en: 'Deep etched floral border brass thambalam tray for temple deity offerings, prasadam, and camphor deeparadhana.',
          ml: 'നിവേദ്യങ്ങൾക്കും കർപ്പൂര ആരതിക്കുമായി മനോഹരമായി കൊത്തുപണികൾ ചെയ്ത പിച്ചള തട്ട്.',
          te: 'నైవేద్యం, ప్రసాదం మరియు కర్పూర హారతి కొరకు అందమైన పూల అంచులతో కూడిన ఇత్తడి పళ్లెం.',
          kn: 'ದೇವರಿಗೆ ನೈವೇದ್ಯ ಮತ್ತು ಕರ್ಪೂರ ಆರತಿಗೆ ಬಳಸುವ ಕೆತ್ತನೆ ಕೆಲಸದ ಹಿತ್ತಾಳೆಯ ತಾಂಬೂಲ ತಟ್ಟೆ.',
          hi: 'मंदिर में भोग, प्रसाद एवं कर्पूर दीपारधना हेतु सुंदर पुष्प नक्काशीदार पीतल थाल।',
        },
        fullDescription:
          'Crafted with deep rim edge to prevent offering spillage. Features embossed Gayatri mandala center and lotus floral perimeter. High-grade brass resists denting and withstands decades of ceremonial temple use.',
        tamilFullDescription:
          'ஆலய வழிபாடுகள், திருமணங்கள் மற்றும் திருவிழாக்களில் பிரசாதம் மற்றும் தாம்பூலம் சமர்ப்பிக்க பயன்படும் நேர்த்தியான பித்தளை தட்டு.',
        fullDescriptionTranslations: {
          ta: 'ஆலய வழிபாடுகள், திருமணங்கள் மற்றும் திருவிழாக்களில் பிரசாதம் மற்றும் தாம்பூலம் சமர்ப்பிக்க பயன்படும் நேர்த்தியான பித்தளை தட்டு.',
          en: 'Crafted with deep rim edge to prevent offering spillage. Features embossed Gayatri mandala center and lotus floral perimeter. High-grade brass resists denting and withstands decades of ceremonial temple use.',
          ml: 'ക്ഷേത്ര ഉത്സവങ്ങൾക്കും കല്യാണങ്ങൾക്കും അനുയോജ്യമായ തിളങ്ങുന്ന പിച്ചള തളിക.',
          te: 'దేవాలయ ఉత్సవాలలో తాంబూలం, నైవేద్యం సమర్పించుటకు అనువైన అత్యుత్తమ ఇత్తడి పళ్లెం.',
          kn: 'ಧಾರ್ಮಿಕ ಸಮಾರಂಭಗಳು ಮತ್ತು ಉತ್ಸವಗಳಲ್ಲಿ ಪ್ರಸಾದ ವಿನಿಯೋಗಕ್ಕೆ ಪ್ರಶಸ್ತವಾದ ಹಿತ್ತಾಳೆ ತಟ್ಟೆ.',
          hi: 'धार्मिक उत्सवों एवं विवाह समारोहों में फल, नैवेद्य एवं ताम्बूल अर्पण हेतु उपयुक्त।',
        },
        primaryImage: '/images/cat_plates_thambalam.jpg',
        imageGallery: [
          {
            url: '/images/cat_plates_thambalam.jpg',
            alt: 'பித்தளை பூவேலை தம்பாளம் | Brass Floral Thambalam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'விளிம்பு அமைப்பு | Rim Profile', value: 'ஆழமான மலர் விளிம்பு | Raised reinforced perimeter' },
          { label: 'பயன்பாடு | Primary Use', value: 'பிரசாதம் மற்றும் ஆரத்தி | Prasadam and deeparadhana' },
          { label: 'அளவுகள் | Dimensions', value: 'விவரங்களுக்கு எங்களைத் தொடர்புகொள்ளவும் | Contact us for details' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`[Seed] Inserted ${insertedProducts.length} authentic temple products with multilingual fields.`);

    // 6. Seed a sample Enquiry to illustrate admin functionality
    const sampleProduct = insertedProducts[0];
    await Enquiry.create({
      enquiryRef: 'SSVM-2026-1001',
      customerName: 'கே. பாலசுப்பிரமணியம் | K. Balasubramaniam (Trustee)',
      organizationName: 'ஸ்ரீ அருள்மிகு சுப்பிரமணியசுவாமி திருக்கோயில் | Sri Arulmigu Subramaniyaswami Temple Trust',
      phone: '+91 94433 11223',
      email: 'templetrust.trustee@example.org',
      state: 'Tamil Nadu',
      city: 'Coimbatore',
      customerType: 'Temple',
      items: [
        {
          product: sampleProduct._id,
          productName: sampleProduct.tamilName ? `${sampleProduct.tamilName} | ${sampleProduct.name}` : sampleProduct.name,
          productCode: sampleProduct.productCode,
          quantity: 1,
          requirements: 'கருவறை மூலவர் சிலைக்கு ஏற்ப உயரம் 54 அங்குலம் தேவை | Need custom inner height 54 inches for main sanctum Moolavar idol.',
        },
        {
          productName: 'கோவில் கோபுர பித்தளை கலசம் | Gopuram Brass Temple Kalasam (SSVM-KL-001)',
          productCode: 'SSVM-KL-001',
          quantity: 3,
          requirements: 'ராஜகோபுர திருப்பணிக்கு 3 கலசங்கள் தேவை | For upcoming Kumbhabhishekam on Rajagopuram tower.',
        },
      ],
      materialPreference: 'Virgin Brass with Gold Lacquer',
      sizeRequirements: 'பிரபாவளையம் உயரம் 54"; கலசங்கள் 42" | Main arch height 54 inches; Kalasams 42 inches',
      customizationDetails: 'பீடத்தில் கோவில் பெயர் பொறிக்க வேண்டும் | Temple trust requires inscription of temple name on pedestal.',
      message: 'தயவுசெய்து கோவைக்கு போக்குவரத்து செலவுடன் விரிவான விலைப்புள்ளி அனுப்பவும் | Kindly send detailed quotation with delivery timeline to Coimbatore.',
      preferredContactMethod: 'WhatsApp',
      sourcePage: '/products/grand-makara-torana-brass-prabavalayam',
      status: 'Quotation Prepared',
      quotationAmount: 185000,
      quotationCurrency: 'INR',
      quotationNotes: 'Prepared quotation for 1x Custom 54" Prabavalayam + 3x 42" Brass Kalasam including wooden crating and transit insurance.',
      adminNotes: [
        {
          note: 'அறங்காவலர் பாலசுப்பிரமணியம் அவர்களுடன் தொலைபேசியில் பேசப்பட்டது. அளவுகள் உறுதி செய்யப்பட்டது. | Spoke with Trustee Balasubramaniam on phone. Confirmed dimensions and site inspection requirement.',
          addedBy: admin.name,
          addedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ],
    });
    console.log('[Seed] Sample enquiry created.');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
