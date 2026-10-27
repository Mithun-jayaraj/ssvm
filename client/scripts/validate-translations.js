import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.resolve(__dirname, '../src/i18n/locales');
const REFERENCE_LANG = 'en';
const TARGET_LANGS = ['bilingual', 'ta', 'ml', 'te', 'kn', 'hi'];

function flattenKeys(obj, prefix = '') {
  let keys = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(keys, flattenKeys(value, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(keys, flattenKeys(item, `${fullKey}.${index}`));
        } else {
          keys[`${fullKey}.${index}`] = item;
        }
      });
    } else {
      keys[fullKey] = value;
    }
  }
  return keys;
}

function runValidation() {
  console.log('===========================================================');
  console.log('   SSVM GLOBAL TRANSLATION COMPLETENESS VALIDATION REPORT  ');
  console.log('===========================================================\n');

  const refPath = path.join(LOCALES_DIR, `${REFERENCE_LANG}.json`);
  if (!fs.existsSync(refPath)) {
    console.error(`❌ Reference locale ${refPath} not found!`);
    process.exit(1);
  }

  const refData = JSON.parse(fs.readFileSync(refPath, 'utf8'));
  const refKeys = flattenKeys(refData);
  const totalRefKeys = Object.keys(refKeys).length;

  console.log(`📋 Reference Language [${REFERENCE_LANG.toUpperCase()}]: ${totalRefKeys} total keys defined.\n`);

  // Explicit check for Our Process requirement
  const requiredProcessKeys = [
    'process.eyebrow',
    'process.title',
    'process.subtitle',
    'process.steps.0.title',
    'process.steps.0.description',
    'process.steps.1.title',
    'process.steps.1.description',
    'process.steps.2.title',
    'process.steps.2.description',
    'process.steps.3.title',
    'process.steps.3.description',
  ];

  let hasErrors = false;
  const summary = [];

  for (const lang of TARGET_LANGS) {
    const targetPath = path.join(LOCALES_DIR, `${lang}.json`);
    if (!fs.existsSync(targetPath)) {
      console.error(`❌ Missing locale file: ${lang}.json`);
      hasErrors = true;
      continue;
    }

    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const targetKeys = flattenKeys(targetData);

    const missingKeys = [];
    const emptyKeys = [];
    const extraKeys = [];

    // Check for missing or empty keys compared to reference
    for (const [key, value] of Object.entries(refKeys)) {
      if (!(key in targetKeys)) {
        missingKeys.push(key);
      } else {
        const val = targetKeys[key];
        if (typeof val === 'string' && val.trim() === '') {
          emptyKeys.push(key);
        }
      }
    }

    // Check for extra unexpected keys
    for (const key of Object.keys(targetKeys)) {
      if (!(key in refKeys)) {
        extraKeys.push(key);
      }
    }

    // Verify Our Process keys
    const missingProcess = requiredProcessKeys.filter(
      (k) => !(k in targetKeys) || typeof targetKeys[k] !== 'string' || targetKeys[k].trim() === ''
    );

    const isComplete = missingKeys.length === 0 && emptyKeys.length === 0 && missingProcess.length === 0;

    if (!isComplete) {
      hasErrors = true;
    }

    summary.push({
      lang,
      totalKeys: Object.keys(targetKeys).length,
      missingCount: missingKeys.length,
      emptyCount: emptyKeys.length,
      extraCount: extraKeys.length,
      processStatus: missingProcess.length === 0 ? '✅ PASSED' : `❌ ${missingProcess.length} MISSING`,
      status: isComplete ? '✅ COMPLETE' : '❌ FAILED',
      missingKeys,
      emptyKeys,
      missingProcess,
    });
  }

  // Print results table
  console.log('| Language   | Total Keys | Missing | Empty | Extra | Our Process | Status      |');
  console.log('|------------|------------|---------|-------|-------|-------------|-------------|');
  for (const s of summary) {
    console.log(
      `| ${s.lang.padEnd(10)} | ${String(s.totalKeys).padEnd(10)} | ${String(s.missingCount).padEnd(7)} | ${String(s.emptyCount).padEnd(5)} | ${String(s.extraCount).padEnd(5)} | ${s.processStatus.padEnd(11)} | ${s.status.padEnd(11)} |`
    );
  }
  console.log('\n');

  // Detailed errors if any
  for (const s of summary) {
    if (s.missingKeys.length > 0 || s.emptyKeys.length > 0 || s.missingProcess.length > 0) {
      console.log(`🚨 Issues in ${s.lang}.json:`);
      if (s.missingKeys.length > 0) {
        console.log(`   - Missing keys (${s.missingKeys.length}):`);
        s.missingKeys.slice(0, 10).forEach((k) => console.log(`     * ${k}`));
        if (s.missingKeys.length > 10) console.log(`     * ... and ${s.missingKeys.length - 10} more`);
      }
      if (s.emptyKeys.length > 0) {
        console.log(`   - Empty values (${s.emptyKeys.length}):`);
        s.emptyKeys.forEach((k) => console.log(`     * ${k}`));
      }
      if (s.missingProcess.length > 0) {
        console.log(`   - Missing Our Process steps:`);
        s.missingProcess.forEach((k) => console.log(`     * ${k}`));
      }
      console.log('');
    }
  }

  if (hasErrors) {
    console.error('❌ TRANSLATION VALIDATION FAILED: Some required keys or steps are missing.\n');
    process.exit(1);
  } else {
    console.log('✅ ALL TRANSLATION FILES VALIDATED SUCCESSFULLY! All 6 supported languages + bilingual mode have 100% key parity.\n');
    process.exit(0);
  }
}

runValidation();
