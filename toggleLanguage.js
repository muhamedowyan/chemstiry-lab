// Function to toggle between English and Arabic
function toggleLanguage(language) {
    const langElements = {
        atomicNumberLabel: {
            en: 'Atomic Number',
            ar: 'العدد الذري'
        },
        distributionTypeLabel: {
            en: 'Choose Distribution Type',
            ar: 'اختر نوع التوزيع'
        },
        traditionalOption: {
            en: 'Traditional Distribution',
            ar: ' التوزيع وفق مبدأ البناء التصاعدي'
        },
        nearestInertGasOption: {
            en: 'Distribution According to Nearest Inert Gas',
            ar: 'التوزيع حسب الغاز الخامل الأقرب'
        },
        calculateButton: {
            en: 'Calculate',
            ar: 'حساب'
        },
        invalidAtomicNumber: {
            en: 'Invalid Atomic Number',
            ar: 'عدد ذري غير صالح'
        },
        elementName: {
            en: 'Element',
            ar: 'العنصر'
        },
        result: {
            en: 'Result',
            ar: 'النتيجة'
        }
    };

    for (const [key, value] of Object.entries(langElements)) {
        document.getElementById(key).textContent = value[language];
    }
}

// Example usage
// toggleLanguage('ar');  // This will switch content to Arabic
// toggleLanguage('en');  // This will switch content to English
