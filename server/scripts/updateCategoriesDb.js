import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sri_shakthi_vinayaga_metals';

async function updateCategories() {
  try {
    console.log('[Migration] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Migration] Connected to MongoDB.');

    const slugsToRemove = ['brass-lamps', 'pooja-vessels', 'temple-accessories'];

    // 1. Find categories to remove
    const catsToRemove = await Category.find({ slug: { $in: slugsToRemove } });
    const catIdsToRemove = catsToRemove.map((c) => c._id);
    console.log(`[Migration] Found ${catsToRemove.length} categories to remove:`, catsToRemove.map((c) => c.slug));

    // 2. Upsert Kavacham Category
    const kavachamData = {
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
    };

    let kavachamCategory = await Category.findOne({ slug: 'kavacham' });
    if (!kavachamCategory) {
      kavachamCategory = await Category.create(kavachamData);
      console.log('[Migration] Created Kavacham category:', kavachamCategory._id);
    } else {
      await Category.updateOne({ slug: 'kavacham' }, { $set: kavachamData });
      console.log('[Migration] Updated Kavacham category:', kavachamCategory._id);
    }

    // 3. Reassign or Archive products belonging to removed categories
    if (catIdsToRemove.length > 0) {
      // Reassign any temple-accessories product (like kavacham or altar products) to kavacham or deity-idols
      const productsInRemovedCats = await Product.find({ category: { $in: catIdsToRemove } });
      console.log(`[Migration] Reassigning/updating ${productsInRemovedCats.length} products from removed categories.`);

      for (const prod of productsInRemovedCats) {
        if (prod.slug.includes('thambalam') || prod.slug.includes('kavacham')) {
          prod.category = kavachamCategory._id;
          await prod.save();
        } else {
          // Archive old brass-lamps and pooja-vessels demo products
          prod.status = 'archived';
          await prod.save();
        }
      }

      // Delete the 3 removed categories
      const deleteResult = await Category.deleteMany({ slug: { $in: slugsToRemove } });
      console.log(`[Migration] Deleted ${deleteResult.deletedCount} categories from MongoDB.`);
    }

    // 4. Ensure a consecrated Kavacham product exists in Kavacham category
    const existingKavachamProduct = await Product.findOne({ slug: 'sacred-embossed-deity-kavacham-armor' });
    if (!existingKavachamProduct) {
      await Product.create({
        name: 'Sacred Embossed Deity Kavacham & Crown Armor',
        tamilName: 'சுவாமி திருமேனி கவசம் மற்றும் கிரீடம்',
        nameTranslations: {
          ta: 'சுவாமி திருமேனி கவசம் மற்றும் கிரீடம்',
          en: 'Sacred Embossed Deity Kavacham & Crown Armor',
          ml: 'സ്വാമി തിരുമേനി കവചവും കിരീടവും',
          te: 'స్వామి దివ్య తిరుమేని కవచం మరియు కిరీటం',
          kn: 'ಸ್ವಾಮಿ ದೈವಿಕ ತಿರುಮೇನಿ ಕವಚ ಮತ್ತು ಕಿರೀಟ',
          hi: 'स्वामी तिरुमेनी देव कवच एवं मुकुट',
        },
        slug: 'sacred-embossed-deity-kavacham-armor',
        productCode: 'SSVM-KV-001',
        category: kavachamCategory._id,
        material: 'தூய செம்பு & பித்தளை, தங்க முலாம் பூச்சு | Pure Copper & Brass with Mirror Gold Finish',
        dimensions: 'சுவாமி மூலவர் அளவிற்கு ஏற்ப | Custom-measured to consecrated deity vigraham',
        weight: 'அளவிற்கு ஏற்ப (12 - 45 கிலோ) | Tailored to deity dimension (approx. 12 - 45 kg)',
        finish: 'பாரம்பரிய கை புடைப்பு சிற்பம் & தங்க முலாம் | Hand-Chiseled Repoussé with 24K Pure Gold Polish',
        shortDescription:
          'Handcrafted temple deity armor encompassing Thirumugam, Hastham, Padam, and chest kavacham tailored to sanctum deities.',
        tamilShortDescription:
          'மூலவர் மற்றும் உற்சவர் சுவாமி திருமேனிகளுக்கான திருமுகம், பாத கவசம், திருக்கரங்கள் மற்றும் தங்க முலாம் பூசிய பாதுகாப்பு கவசங்கள்.',
        shortDescriptionTranslations: {
          ta: 'மூலவர் மற்றும் உற்சவர் சுவாமி திருமேனிகளுக்கான திருமுகம், பாத கவசம், திருக்கரங்கள் மற்றும் தங்க முலாம் பூசிய பாதுகாப்பு கவசங்கள்.',
          en: 'Handcrafted temple deity armor encompassing Thirumugam, Hastham, Padam, and chest kavacham tailored to sanctum deities.',
          ml: 'തിരുമുഖം, പാദ കവചം, തിരുക്കരങ്ങൾ എന്നിവയടങ്ങുന്ന ശുദ്ധമായ ദേവ കവചങ്ങൾ.',
          te: 'గర్భాలయ మూలవిరాట్ కొరకు హస్త, పాద, కిరీట మరియు వక్షస్థల దివ్య కవచములు.',
          kn: 'ಮೂಲವಿಗ್ರಹಕ್ಕಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾದ ಹಸ್ತ, ಪಾದ, ಮುಖ ಮತ್ತು ವಕ್ಷಸ್ಥಳ ಪವಿತ್ರ ಕವಚಗಳು.',
          hi: 'गर्भगृह मूल विग्रह हेतु निर्मित पारंपरिक हस्त, पाद, मुख एवं वक्षस्थल दिव्य कवच।',
        },
        fullDescription:
          'Consecrated temple protective coverings and ornaments manufactured using traditional repoussé beating techniques. Pure non-reactive copper and heavy temple brass embossed with sacred yantras, floral borders, and divine attributes.',
        tamilFullDescription:
          'ஆகம விதிகளின்படி ஆலய தெய்வங்களின் திருமேனிக்கு ஏற்ப துல்லியமான அளவுகளில் வடிக்கப்படும் பாரம்பரிய கவசங்கள். செம்பு மற்றும் பித்தளையில் கைவேலையாக செதுக்கப்பட்டு, நெடுங்காலம் நிறம் மங்காதவாறு சிறப்பு மெருகூட்டலுடன் வழங்கப்படுகிறது.',
        fullDescriptionTranslations: {
          ta: 'ஆகம விதிகளின்படி ஆலய தெய்வங்களின் திருமேனிக்கு ஏற்ப துல்லியமான அளவுகளில் வடிக்கப்படும் பாரம்பரிய கவசங்கள். செம்பு மற்றும் பித்தளையில் கைவேலையாக செதுக்கப்பட்டு, நெடுங்காலம் நிறம் மங்காதவாறு சிறப்பு மெருகூட்டலுடன் வழங்கப்படுகிறது.',
          en: 'Consecrated temple protective coverings and ornaments manufactured using traditional repoussé beating techniques. Pure non-reactive copper and heavy temple brass embossed with sacred yantras, floral borders, and divine attributes.',
          ml: 'ആഗമ ശാസ്ത്ര വിധിപ്രകാരം നിർമ്മിച്ച വിശുദ്ധ ക്ഷേത്ര കവചങ്ങൾ.',
          te: 'శిల్ప శాస్త్ర నియమాల ప్రకారం రూపొందించిన ఆలయ దివ్య కవచములు.',
          kn: 'ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ತಯಾರಿಸಲಾದ ಪರಮ ಪವಿತ್ರ ದೇವಸ್ಥಾನದ ರಕ್ಷಾ ಕವಚಗಳು.',
          hi: 'आगम शिल्प विधि द्वारा शुद्ध तांबे एवं पीतल पर हाथ से तराशा गया दिव्य देव कवच।',
        },
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
          { label: 'அளவுகள் | Customization', value: 'கோவிலில் அளவெடுத்து செய்யப்படுகிறது | Measured on-site at temple' },
        ],
        customizationAvailable: true,
        isFeatured: true,
        status: 'published',
      });
      console.log('[Migration] Created Sacred Deity Kavacham product in database.');
    }

    // 5. Update display orders of remaining categories
    await Category.updateOne({ slug: 'prabavalayam' }, { $set: { displayOrder: 1, isPrimary: true } });
    await Category.updateOne({ slug: 'kalasam' }, { $set: { displayOrder: 2, isPrimary: true } });
    await Category.updateOne({ slug: 'temple-flag-pole' }, { $set: { displayOrder: 3, isPrimary: true } });
    await Category.updateOne({ slug: 'temple-bell' }, { $set: { displayOrder: 4, isPrimary: true } });
    await Category.updateOne({ slug: 'kavacham' }, { $set: { displayOrder: 5, isPrimary: false } });
    await Category.updateOne({ slug: 'deity-idols' }, { $set: { displayOrder: 6, isPrimary: false } });

    // 6. Print remaining active categories
    const remainingCats = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
    console.log('[Migration] Success! Remaining Active Categories:');
    remainingCats.forEach((c) => {
      console.log(`  - #${c.displayOrder} [${c.slug}] ${c.name} (${c.tamilName})`);
    });

    await mongoose.disconnect();
    console.log('[Migration] Done & Disconnected.');
    process.exit(0);
  } catch (err) {
    console.error('[Migration] Error updating categories:', err);
    process.exit(1);
  }
}

updateCategories();
