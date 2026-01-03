#!/usr/bin/env node

/**
 * Verification script for NPM setup
 * Run: node verify-setup.js
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('========================================');
console.log('Branovis Forge - Setup Verification');
console.log('========================================\n');

let errors = [];
let warnings = [];
let success = [];

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
    success.push(`✓ Node.js version: ${nodeVersion} (OK)`);
} else {
    errors.push(`✗ Node.js version: ${nodeVersion} (Need 18+)`);
}

// Check if package.json exists
const packageJsonPath = join(__dirname, 'package.json');
if (existsSync(packageJsonPath)) {
    success.push('✓ package.json exists');
    
    try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        
        // Check required scripts
        const requiredScripts = ['dev', 'build', 'preview'];
        const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
        
        if (missingScripts.length === 0) {
            success.push('✓ All required npm scripts present');
        } else {
            errors.push(`✗ Missing scripts: ${missingScripts.join(', ')}`);
        }
        
        // Check Vite dependency
        if (packageJson.devDependencies?.vite) {
            success.push(`✓ Vite configured: ${packageJson.devDependencies.vite}`);
        } else {
            errors.push('✗ Vite not found in devDependencies');
        }
    } catch (e) {
        errors.push(`✗ Error reading package.json: ${e.message}`);
    }
} else {
    errors.push('✗ package.json not found');
}

// Check if vite.config.js exists
const viteConfigPath = join(__dirname, 'vite.config.js');
if (existsSync(viteConfigPath)) {
    success.push('✓ vite.config.js exists');
} else {
    errors.push('✗ vite.config.js not found');
}

// Check if node_modules exists
const nodeModulesPath = join(__dirname, 'node_modules');
if (existsSync(nodeModulesPath)) {
    success.push('✓ node_modules directory exists (dependencies installed)');
} else {
    warnings.push('⚠ node_modules not found - run: npm install');
}

// Check if .gitignore exists
const gitignorePath = join(__dirname, '.gitignore');
if (existsSync(gitignorePath)) {
    success.push('✓ .gitignore exists');
} else {
    warnings.push('⚠ .gitignore not found');
}

// Check HTML files
const htmlFiles = ['index.html', 'projects.html', 'blog.html', 'contact.html'];
htmlFiles.forEach(file => {
    const filePath = join(__dirname, file);
    if (existsSync(filePath)) {
        success.push(`✓ ${file} exists`);
    } else {
        warnings.push(`⚠ ${file} not found`);
    }
});

// Print results
console.log('\n✅ Success:');
success.forEach(msg => console.log(`  ${msg}`));

if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(msg => console.log(`  ${msg}`));
}

if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(msg => console.log(`  ${msg}`));
    console.log('\nPlease fix the errors above before proceeding.\n');
    process.exit(1);
} else {
    console.log('\n✨ Setup verification complete!');
    console.log('\nNext steps:');
    if (!existsSync(nodeModulesPath)) {
        console.log('  1. Run: npm install');
    }
    console.log('  2. Run: npm run dev');
    console.log('  3. Open: http://localhost:3000\n');
    process.exit(0);
}



