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
      businessName: 'Sri Shakthi Vinayaga Metals',
      tagline: 'Manufacturers of Sacred Temple Metalware, Prabavalayam & Kalasam',
      doorAddress: 'Near Mariamman Kovil Street, Industrial Metal Estate',
      city: 'Tirupur',
      state: 'Tamil Nadu',
      pincode: '641604',
      country: 'India',
      phone: '+91 98422 12345',
      alternativePhone: '+91 98422 67890',
      whatsappNumber: '+919842212345',
      email: 'enquiry@srishakthivinayagametals.com',
      businessHours: 'Monday to Saturday: 9:00 AM – 7:30 PM (IST)',
      announcementText: 'Direct Temple Metalware Manufacturer in Tirupur — Accepting Custom Orders & Bulk Quotations across India',
      aboutStory:
        'Sri Shakthi Vinayaga Metals is an established manufacturer of traditional South Indian temple metalware based in Tirupur, Tamil Nadu. Dedicated to sacred craftsmanship and strict adherence to Shilpa Shastra proportions, we manufacture masterfully carved Prabavalayam (temple deity arches), monumental Gopuram Kalasams, consecrated deity vigrahams, brass pooja ware, and custom sanctum metal cladding. Serving temples, sthapatis, contractors, dealers, and devotees across India.',
      manufacturingHighlights: [
        'Specialized in authentic Dravidian temple iconography & relief work',
        'Custom Prabavalayam fabrication tailored to exact deity dimensions',
        'Heavy-gauge temple Kalasams engineered for enduring weather resilience',
        'Direct factory pricing and manufacturer quotations with zero middleman markups',
        'Complete pan-India safe logistics and specialized wooden crate packaging',
      ],
      googleMapUrl: 'https://maps.google.com/?q=Tirupur,Tamil+Nadu',
    });
    console.log('[Seed] Business settings initialized.');

    // 4. Create Categories
    const categoriesData = [
      {
        name: 'Prabavalayam',
        slug: 'prabavalayam',
        description: 'Traditional handcrafted deity arches, makara torana prabhavali, and sacred temple aureoles.',
        image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
        iconName: 'Crown',
        displayOrder: 1,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Kalasam',
        slug: 'kalasam',
        description: 'Sacred temple gopuram kalasams, stupi pinnacles, and sanctum kumbhabhishekam vessels.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
        iconName: 'Flame',
        displayOrder: 2,
        isPrimary: true,
        isActive: true,
      },
      {
        name: 'Goddess Statues',
        slug: 'goddess-statues',
        description: 'Exquisitely sculpted brass and bronze vigrahams of Sri Lakshmi, Saraswati, Durga, and Amman.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        iconName: 'Sparkles',
        displayOrder: 3,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Hindu Deity Statues',
        slug: 'deity-statues',
        description: 'Sacred idols of Lord Ganesha, Murugan, Nataraja, and Perumal cast with traditional precision.',
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
        iconName: 'Shield',
        displayOrder: 4,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Temple Accessories',
        slug: 'temple-accessories',
        description: 'Temple bells (Ghanta), kavachams, aarthi stands, thooku vilakku, and ceremonial paraphernalia.',
        image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=800&q=80',
        iconName: 'Bell',
        displayOrder: 5,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Brass Pooja Products',
        slug: 'brass-pooja-products',
        description: 'Kuthu vilakku, deepams, abhisheka vessels, camphor burners, and traditional brass ritualware.',
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
        iconName: 'Sun',
        displayOrder: 6,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Copper Products',
        slug: 'copper-products',
        description: 'Pure copper abhisheka vessels, copper kumbham, sheets, and sacred ritual utensils.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
        iconName: 'Layers',
        displayOrder: 7,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Silver Products',
        slug: 'silver-products',
        description: 'Silver plated pooja thalis, ceremonial kireetams, and festive temple offerings.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        iconName: 'Gem',
        displayOrder: 8,
        isPrimary: false,
        isActive: true,
      },
      {
        name: 'Custom Temple Metalwork',
        slug: 'custom-temple-metalwork',
        description: 'Tailored architectural brass claddings, Sanctum doors, dhwajasthambham, and sthapati specifications.',
        image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=800&q=80',
        iconName: 'Hammer',
        displayOrder: 9,
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

    // 5. Create Rich Products with authentic temple specifications
    const productsData = [
      // --- Prabavalayam Category (Primary) ---
      {
        name: 'Grand Makara Torana Brass Prabavalayam (Temple Arch)',
        slug: 'grand-makara-torana-brass-prabavalayam',
        productCode: 'SSVM-PB-001',
        category: catMap['prabavalayam'],
        material: 'High-Purity Virgin Brass',
        dimensions: 'Height: 48 inches, Width: 36 inches',
        weight: 'Approx. 26 kg',
        finish: 'Traditional Antique Hand-Chiseled Brass Polish',
        shortDescription:
          'Majestic traditional South Indian temple Prabavalayam featuring twin Makara motifs, radiating flames (Jwala), and crowning Kirtimukha crest.',
        fullDescription:
          'Handcrafted by master metal artisans in Tirupur adhering to traditional Agama and Shilpa Shastra specifications. This Prabavalayam is designed for sanctum sanctorum deity installations. It features detailed repoussé relief work with mythical Makara aquatic beasts on either pillar base, an arched floral garland (Torana), and a prominent Kirtimukha (Face of Glory) at the pinnacle. Fully customizable to fit your deity vigraham and pedestal dimensions.',
        primaryImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=900&q=80',
            alt: 'Grand Makara Torana Brass Prabavalayam Front Elevation',
            isPrimary: true,
          },
          {
            url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
            alt: 'Brass Temple Craftsmanship Detail',
            isPrimary: false,
          },
        ],
        specifications: [
          { label: 'Deity Compatibility', value: 'Suitable for 24" to 36" standing or seated idols' },
          { label: 'Crafting Technique', value: 'Hand-beaten Sheet Repoussé & Chasing' },
          { label: 'Arch Thickness', value: '18 Gauge Heavy Temple Sheet' },
          { label: 'Pinnacle Motif', value: 'Kirtimukha with 21 radiant flame petals' },
          { label: 'Base Mounting', value: 'Reinforced dual rear brass brackets' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Royal Peacock (Mayil) Brass Prabavalayam with Aureole',
        slug: 'royal-peacock-mayil-brass-prabavalayam',
        productCode: 'SSVM-PB-002',
        category: catMap['prabavalayam'],
        material: 'Polished Brass & Bronze Alloy',
        dimensions: 'Height: 36 inches, Width: 28 inches',
        weight: 'Approx. 18 kg',
        finish: 'Golden Lustre Lacquered Finish',
        shortDescription:
          'Elegant Prabhavali arch embellished with dancing peacock motifs, lotus buds, and detachable sanctum prabha ring.',
        fullDescription:
          'Specially cast and embossed for Murugan, Amman, and Perumal sanctums. Features gracefully arched peacock feathers intertwining along the border, terminating in twin sculpted peacocks at the shoulder points. The protective lacquer ensures the golden brilliance endures ceremonial camphor and oil exposure.',
        primaryImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
            alt: 'Peacock Brass Prabavalayam View',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Ideal Placement', value: 'Utsava Murti & Moolavar Altar' },
          { label: 'Finish Guarantee', value: 'Anti-tarnish protective coating' },
          { label: 'Custom Sizing', value: 'Available from 18 inches to 72 inches upon order' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Panchaloha Deity Prabhavali Arch with Sacred Flame Ring',
        slug: 'panchaloha-deity-prabhavali-arch',
        productCode: 'SSVM-PB-003',
        category: catMap['prabavalayam'],
        material: 'Panchaloha (Traditional 5-Metal Alloy)',
        dimensions: 'Height: 42 inches, Width: 32 inches',
        weight: 'Approx. 34 kg',
        finish: 'Temple Antique Patina',
        shortDescription:
          'Sacred 5-metal alloy Prabhavali formulated according to traditional metallurgical proportions for temple consecration.',
        fullDescription:
          'Crafted from auspicious Panchaloha alloy (Gold, Silver, Copper, Zinc, Iron), this aureole is intended for consecrated temple deities where sacred abhishekam rituals are performed daily. The metal exhibits exceptional corrosion resistance and divine resonance.',
        primaryImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80',
            alt: 'Panchaloha Prabhavali',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Alloy Composition', value: 'Panchadhatu (Panchaloha Traditional Formulation)' },
          { label: 'Water & Milk Resilience', value: 'Certified for daily Abhishekam ritual exposure' },
          { label: 'Back Reinforcement', value: 'Integrated structural bronze stays' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },

      // --- Kalasam Category (Primary) ---
      {
        name: 'Gopuram Brass Temple Kalasam (Stupi Pinnacle Pot)',
        slug: 'gopuram-brass-temple-kalasam',
        productCode: 'SSVM-KL-001',
        category: catMap['kalasam'],
        material: 'Heavy Temple Grade Brass',
        dimensions: 'Height: 42 inches, Base Diameter: 22 inches',
        weight: 'Approx. 28 kg',
        finish: 'High Polish Weather-Sealed Brass',
        shortDescription:
          'Majestic multi-tiered temple tower Stupi Kalasam designed for Vimanam and Raja Gopuram installations.',
        fullDescription:
          'An essential architectural and spiritual crown for South Indian temple towers. Comprises the Kumbha (pot), neck, lotus petal flare, and elongated golden pinnacle needle (Kurcham). Built with reinforced heavy-gauge brass to withstand high wind loads, monsoon rainfall, and outdoor exposure on temple roofs.',
        primaryImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80',
            alt: 'Gopuram Temple Kalasam Pinnacle',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Vimana Tier Placement', value: 'Suitable for 3 to 7 tier Raja Gopurams' },
          { label: 'Grain Chamber', value: 'Hollow inner core for consecrated Navadhanya grains' },
          { label: 'Rod Aperture', value: 'Centering collar for temple lightning conductor rod' },
          { label: 'Weather Coating', value: 'High-durability clear architectural seal' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Consecration Heavy Copper Garbhagriha Kalasam',
        slug: 'consecration-heavy-copper-garbhagriha-kalasam',
        productCode: 'SSVM-KL-002',
        category: catMap['kalasam'],
        material: '99.9% Electrolytic Pure Copper',
        dimensions: 'Height: 32 inches, Base Diameter: 18 inches',
        weight: 'Approx. 22 kg',
        finish: 'Raw Spun & Annealed Copper',
        shortDescription:
          'Consecrated pure copper Kumbhabhishekam Kalasam pot engineered for sanctum vimana spires.',
        fullDescription:
          'Made from highest purity virgin copper sheet. Copper is spiritually revered for its electro-magnetic conductivity and sacred energy absorption atop the sanctum sanctorum (Garbhagriha). Specifically prepared for Sthapatis and temple committees planning Maha Kumbhabhishekam ceremonies.',
        primaryImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
            alt: 'Pure Copper Temple Kalasam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Copper Purity', value: '99.9% Certified Pure Copper' },
          { label: 'Ritual Readiness', value: 'Pre-treated for Navaratna & Navadhanya sanctification' },
          { label: 'Sizes Available', value: '18 inches to 60 inches made to specification' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Gold-Gilded Brass Temple Kalasam with Double Lotus Base',
        slug: 'gold-gilded-brass-temple-kalasam-lotus-base',
        productCode: 'SSVM-KL-003',
        category: catMap['kalasam'],
        material: 'Brass with 24K Gold-Foil / Electroplate Option',
        dimensions: 'Height: 48 inches, Base Diameter: 24 inches',
        weight: 'Approx. 32 kg',
        finish: '24 Karat Gold Plated Lustre',
        shortDescription:
          'Premium radiant golden Kalasam with dual lotus petal (Padma Peedam) layers and ornate ribbed pot structure.',
        fullDescription:
          'Engineered for prominent pilgrimage shrines and newly consecrated temple towers. The double lotus base symbolizes spiritual purity and divine ascension. Can be supplied in high-grade brass or customized with 24K gold gilding upon request.',
        primaryImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
            alt: 'Gold Gilded Temple Kalasam',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Gilding Option', value: 'Available in electro-plated gold or lacquered brass' },
          { label: 'Base Mounting', value: 'Four-point stainless steel anchoring flange' },
          { label: 'Origin', value: 'Manufactured at Tirupur facility, Tamil Nadu' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },

      // --- Goddess Statues ---
      {
        name: 'Sri Maha Lakshmi Brass Sanctum Vigraham',
        slug: 'sri-maha-lakshmi-brass-sanctum-vigraham',
        productCode: 'SSVM-GD-001',
        category: catMap['goddess-statues'],
        material: 'Solid Temple Cast Brass',
        dimensions: 'Height: 30 inches, Width: 18 inches, Depth: 12 inches',
        weight: 'Approx. 38 kg',
        finish: 'Traditional Antique Wax Polished Brass',
        shortDescription:
          'Sacred four-armed Goddess Lakshmi seated in Padmasana on a double lotus pedestal holding lotus blooms, Abhaya, and Varada mudras.',
        fullDescription:
          'Cast using traditional lost-wax (Cire Perdue) casting technique. Every fine detail—the intricate Kireeta-makuta crown, delicate silk drapery folds, armlets, necklaces, and serene facial expression—is meticulously hand-chiseled by generational craftsmen.',
        primaryImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80',
            alt: 'Sri Maha Lakshmi Vigraham',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Iconography', value: 'Shilpa Shastra compliant proportions (Dasa Tala measurement)' },
          { label: 'Mudras', value: 'Upper hands holding lotus buds; Lower hands Abhaya & Varada' },
          { label: 'Pedestal', value: 'Integrated Padma Peedam with drainage channel' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- Hindu Deity Statues ---
      {
        name: 'Shri Shakthi Vinayagar Seated Brass Idol',
        slug: 'shri-shakthi-vinayagar-seated-brass-idol',
        productCode: 'SSVM-DT-001',
        category: catMap['deity-statues'],
        material: 'Solid Brass Casting',
        dimensions: 'Height: 24 inches, Width: 16 inches, Depth: 12 inches',
        weight: 'Approx. 28 kg',
        finish: 'Classic Temple Antique Brass',
        shortDescription:
          'Divine Lord Ganesha seated regally on an ornate lotus throne with modak in trunk and sacred weapons.',
        fullDescription:
          'The flagship idol representing Sri Shakthi Vinayaga Metals. Portrays Lord Vinayaka with broken tusk, sweet modak, battle axe (Parashu), and noose (Pasha). His gentle countenance radiates wisdom and obstacle-removing grace.',
        primaryImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=80',
            alt: 'Shri Shakthi Vinayagar Seated Idol',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Postural Stance', value: 'Lalitasana (One leg folded, one resting on lotus)' },
          { label: 'Trunk Direction', value: 'Edampuri (Curving gracefully to the left)' },
          { label: 'Solid Core', value: 'Heavy solid casting for temple sanctum sanctification' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
      {
        name: 'Lord Nataraja Cosmic Dancing Shiva Bronze Vigraham',
        slug: 'lord-nataraja-cosmic-dancing-shiva-bronze-vigraham',
        productCode: 'SSVM-DT-002',
        category: catMap['deity-statues'],
        material: 'Traditional Bronze (Ven-Kalam)',
        dimensions: 'Height: 36 inches, Arch Width: 30 inches',
        weight: 'Approx. 35 kg',
        finish: 'Chola-Style Antique Dark Bronze Patina',
        shortDescription:
          'Iconic Chola bronze reproduction of Lord Nataraja performing the cosmic dance within the blazing ring of fire (Prabha Mandala).',
        fullDescription:
          'Crafted following historic Chola dynamic balance principles. The flying matted locks, Damaru drum, Agni flame, crushing of the demon Apasmara, and flying Ganga represent the rhythm of the cosmos. Ideal for temple sabhas and cultural institutions.',
        primaryImage: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=900&q=80',
            alt: 'Lord Nataraja Bronze Idol',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Art Style', value: 'Chola Dynasty classical iconography' },
          { label: 'Flames in Ring', value: '27 individual fiery plumes (Nakshatras)' },
          { label: 'Aura Detachability', value: 'Solid one-piece casting for maximum durability' },
        ],
        customizationAvailable: true,
        isFeatured: false,
        status: 'published',
      },

      // --- Temple Accessories ---
      {
        name: 'Heavy Hand-Cast Temple Brass Bell with Nandi Finial (Ghanta)',
        slug: 'heavy-hand-cast-temple-brass-bell-nandi-finial',
        productCode: 'SSVM-TA-001',
        category: catMap['temple-accessories'],
        material: 'Resonant Bell Metal / High-Tin Bronze & Brass',
        dimensions: 'Height: 18 inches, Rim Diameter: 12 inches',
        weight: 'Approx. 16 kg',
        finish: 'Natural Polished Bell Metal',
        shortDescription:
          'Heavy sonorous temple bell with an ornate seated Nandi bull handle that produces deep, long-sustaining divine resonance.',
        fullDescription:
          'Manufactured with special high-tin acoustic metal proportions to create a rich, echoing sound that vibrates through temple halls during puja rituals and aarti ceremonies.',
        primaryImage: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=900&q=80',
            alt: 'Temple Brass Bell with Nandi',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Acoustic Frequency', value: 'Deep OUM resonance with 15+ seconds sustain' },
          { label: 'Clapper', value: 'Heavy cast brass ball with forged pivot' },
          { label: 'Finial Options', value: 'Nandi, Garuda, or Hanuman finial available' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- Brass Pooja Products ---
      {
        name: 'Traditional South Indian Annam Kuthu Vilakku (Matching Pair)',
        slug: 'traditional-south-indian-annam-kuthu-vilakku-pair',
        productCode: 'SSVM-BP-001',
        category: catMap['brass-pooja-products'],
        material: 'Pure Heavy Cast Brass',
        dimensions: 'Height: 48 inches (Pair of 2)',
        weight: 'Approx. 24 kg (Combined)',
        finish: 'Bright Golden Brass Polish',
        shortDescription:
          'Classic 5-wick Annam (Swan) crest standing temple lamps cast in detachable sections for auspicious temple occasions.',
        fullDescription:
          'The quintessential South Indian ritual lamp. Handcrafted with heavy cast base, ridged baluster column, deep 5-wick oil dish, and crowning mythological Annam bird. Used at temple entrances, sanctums, weddings, and sacred festivals.',
        primaryImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
            alt: 'Annam Kuthu Vilakku Pair',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Components', value: '4 screw-together interlocking segments for easy cleaning' },
          { label: 'Oil Reservoir Capacity', value: 'Approx. 500 ml per lamp' },
          { label: 'Crest', value: 'Majestic Hamsa / Annam bird holding floral spray' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },

      // --- Custom Temple Metalwork ---
      {
        name: 'Architectural Temple Sanctum Door Brass Cladding Panels',
        slug: 'architectural-temple-sanctum-door-brass-cladding-panels',
        productCode: 'SSVM-CW-001',
        category: catMap['custom-temple-metalwork'],
        material: 'Heavy Gauge Brass Sheet & Cast Relief Medallions',
        dimensions: 'Custom sized to temple door opening (e.g., 8 ft x 4 ft)',
        weight: 'Varies with door dimensions (Approx. 60–120 kg)',
        finish: 'Antiqued Patina with Polished Highlights',
        shortDescription:
          'Custom manufactured brass sheet cladding featuring Ashtalakshmi medallions, guardian Dwarapalakas, and floral border work.',
        fullDescription:
          'Turnkey metal cladding solutions for temple Garbhagriha teak doors. We fabricate custom-dimensioned heavy brass sheets with stamped and hand-chiseled sacred motifs, rosette screw caps, and heavy ornamental handles.',
        primaryImage: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=80',
        imageGallery: [
          {
            url: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=900&q=80',
            alt: 'Temple Sanctum Brass Door Cladding',
            isPrimary: true,
          },
        ],
        specifications: [
          { label: 'Project Scope', value: 'Engineered per architectural blueprint / on-site measurements' },
          { label: 'Sheet Thickness', value: '16 to 18 Gauge Heavy Brass' },
          { label: 'Included Components', value: 'Door face sheets, jamb covers, thresholds, and handles' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      },
    ];

    const insertedProducts = await Product.insertMany(productsData);
    console.log(`[Seed] Inserted ${insertedProducts.length} authentic temple products.`);

    // 6. Seed a sample Enquiry to illustrate admin functionality
    const sampleProduct = insertedProducts[0];
    await Enquiry.create({
      enquiryRef: 'SSVM-2026-1001',
      customerName: 'K. Balasubramaniam (Trustee)',
      organizationName: 'Sri Arulmigu Subramaniyaswami Temple Trust',
      phone: '+91 94433 11223',
      email: 'templetrust.trustee@example.org',
      state: 'Tamil Nadu',
      city: 'Coimbatore',
      customerType: 'Temple',
      items: [
        {
          product: sampleProduct._id,
          productName: sampleProduct.name,
          productCode: sampleProduct.productCode,
          quantity: 1,
          requirements: 'Need custom inner height 54 inches for main sanctum Moolavar idol.',
        },
        {
          productName: 'Gopuram Brass Temple Kalasam (SSVM-KL-001)',
          productCode: 'SSVM-KL-001',
          quantity: 3,
          requirements: 'For upcoming Kumbhabhishekam on Rajagopuram tower in November 2026.',
        },
      ],
      materialPreference: 'Virgin Brass with Gold Lacquer',
      sizeRequirements: 'Main arch height 54 inches; Kalasams 42 inches',
      customizationDetails: 'Temple trust requires inscription of temple name on the pedestal.',
      message: 'Kindly send detailed quotation with delivery timeline to Coimbatore.',
      preferredContactMethod: 'WhatsApp',
      sourcePage: '/products/grand-makara-torana-brass-prabavalayam',
      status: 'Quotation Prepared',
      quotationAmount: 185000,
      quotationCurrency: 'INR',
      quotationNotes: 'Prepared quotation for 1x Custom 54" Prabavalayam + 3x 42" Brass Kalasam including wooden crating and transit insurance.',
      adminNotes: [
        {
          note: 'Spoke with Trustee Balasubramaniam on phone. Confirmed dimensions and site inspection requirement.',
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
