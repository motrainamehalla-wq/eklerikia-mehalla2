import { useState, useEffect } from 'react';
import { Language, Student } from './types';
import ResultSearch from './components/ResultSearch';
import StudentTranscript from './components/StudentTranscript';
import CurriculumDirectory from './components/CurriculumDirectory';
import AcademicStats from './components/AcademicStats';
import NewEnrollmentForm from './components/NewEnrollmentForm';
import { STUDENTS_DATABASE, registerExtraStudents } from './data/students';
import { fetchGoogleSheetStudents, SPREADSHEET_ID } from './data/googleSheets';

// Import popes portrait visualasset from generated images
import popesImage from './assets/images/popes_portrait_1782230228470.jpg';
import collegeLogo from './assets/images/college_logo.jpg';
import qrCodeImage from './assets/images/qr_code_enrollment.svg';
import popeTawadrosImg from './assets/images/pope_tawadros_nobg.png';
import bishopIgnatiusImg from './assets/images/bishop_ignatius_nobg.png';
import fatherAthanasiusImg from './assets/images/father_athanasius_nobg.png';

import { BookOpen, Award, FileSearch, HelpCircle, Layers, Globe, Mail, Phone, MapPin, Sparkles, BookOpenCheck, ExternalLink, HeartHandshake, UserPlus, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<'home' | 'results' | 'curriculum' | 'stats' | 'enrollment'>('home');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  const [sheetLoadedCount, setSheetLoadedCount] = useState<number>(0);
  const [sheetStudents, setSheetStudents] = useState<Student[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);
  const [sheetError, setSheetError] = useState<string | null>(null);

  useEffect(() => {
    const loadSheet = async () => {
      setIsLoadingSheet(true);
      setSheetError(null);
      try {
        const students = await fetchGoogleSheetStudents();
        registerExtraStudents(students);
        setSheetStudents(students);
        setSheetLoadedCount(students.length);
      } catch (err: any) {
        console.error('Error loading Google Sheet students:', err);
        setSheetError(err.message || 'Error fetching Google Sheet');
      } finally {
        setIsLoadingSheet(false);
      }
    };

    loadSheet();
  }, []);

  // Toggle Language Handler
  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  // Handle instant result view from landing highlights
  const handleStudentFound = (student: Student) => {
    setActiveStudent(student);
    setCurrentTab('results');
  };

  // Translation helpers
  const t = {
    titleMain: lang === 'ar' ? 'كلية البابا كيرلس عمود الإيمان والبابا شنودة الثالث' : 'Pope Cyril Pillar of Faith & Pope Shenouda III College',
    titleBranch: lang === 'ar' ? 'الإكليريكية بالمحلة الكبرى' : 'Theological Seminary — Mahalla El-Kubra',
    dioceseName: lang === 'ar' ? 'إيبارشية المحلة الكبرى وتوابعها للأقباط الأرثوذكس' : 'Diocese of Mahalla El-Kubra & Affiliated Districts',
    
    // Nav tabs
    tabHome: lang === 'ar' ? 'الرئيسية والتعريف' : 'Home & History',
    tabEnrollment: lang === 'ar' ? 'طلب إلتحاق جديد' : 'New Admission',
    tabResults: lang === 'ar' ? 'نتائج الطلاب (كافة السنوات)' : 'Inquire Student Results',
    tabCurriculum: lang === 'ar' ? 'المناهج والمواد الدراسية' : 'Curriculum Course Catalog',
    tabStats: lang === 'ar' ? 'أوائل الطلاب والإحصاءات' : 'Honor Roll & Stats',

    // Hero translations
    heroMainTitle: lang === 'ar' ? 'صرح لاهوتي وعطاء روحي ممتد' : 'Centuries of Sacred Theological Knowledge',
    heroSubtitle: lang === 'ar' 
      ? 'تحت رعاية قداسة البابا المعظم الأنبا تواضروس الثاني وشريكه في الخدمة الرسولية نيافة الأنبا أغناطيوس أسقف المحلة وتوابعها'
      : 'Under the divine guidance of H.H. Pope Tawadros II and H.G. Bishop Ignatius of Mahalla El-Kubra',
    
    popesPillarsTitle: lang === 'ar' ? 'رواد النهضة والتعليم المعاصر' : 'Pillars of Coptic Prayer & Scholarship',
    popesPillarsDesc: lang === 'ar'
      ? 'نخلد بفخر تراث الأب الروحي المعاصر البابا القديس كيرلس الأول (عمود الإيمان) ومعلم الأجيال القبطية البابا شنودة الثالث (أيقونة الفكر واللاهوت الروحي)، واللذان يرعيان روح العمل والمحبة المعرفية في وجدان طلابنا.'
      : 'Honoring the spiritual legacies of Saint Pope Cyril VI (the Saint of prayer) and Pope Shenouda III (the icon of dogmatic, pastoral and patristic theology) whose dynamic wisdom drives the heart of our courses.',
    
    quickLinksTitle: lang === 'ar' ? 'الروابط الأكاديمية السريعة' : 'Quick Academic Portals',
    schoolBrief: lang === 'ar' 
      ? 'تهدف الكلية الإكليريكية فرع المحلة الكبرى لتنشئة خادم أرثوذكسي واعي ودارس ناضج لاهوتياً وعقيدياً وقانونياً من خلال منهج متكامل يمتد على مدار أربع سنوات كاملة في الدراسات الكنسية والآبائية.'
      : 'The Mahalla Seminary equips dedicated individuals with deep dogmatic, biblical, patristic, and liturgical understanding through a comprehensive 4-year curriculum.',
    
    yearsOfStudy: lang === 'ar' ? 'سنوات الدراسة والتدريب' : 'Four Years of Systematic Study',
    y1: lang === 'ar' ? 'مقدمات لاهوتية ولغة قبطية وتاريخ الكنيسة والعهد القديم.' : 'Introductory theological studies, Coptic grammar, and Church History.',
    y2: lang === 'ar' ? 'عقيدة مقارنة، لاهوت طقسي، ولغة يونانية.' : 'Comparative theology, Liturgics, and New Testament Greek.',
    y3: lang === 'ar' ? 'لاهوت نظري، لاهوت روحي، وأحوال شخصية.' : 'Dogmatics, Spiritual theology, and Personal status laws.',
    y4: lang === 'ar' ? 'لاهوت دفاعي، قوانين كنيسة، وتاريخ كنسي حديث.' : 'Apologetics, Canon law, and Contemporary church history.',
    
    // Contacts and sidebar details
    contactTitle: lang === 'ar' ? 'تواصل مع الكلية الإكليريكية' : 'Contact Admissions & Directory',
    contactAddress: lang === 'ar' ? 'مقر مطرانية الأقباط الأرثوذكس، المحلة الكبرى، الغربية، مصر' : 'Coptic Cathedral Complex, Mahalla El-Kubra, Gharbia Gov, Egypt',
    contactEmail: lang === 'ar' ? 'info@seminary-mahalla.org' : 'admissions@seminary-mahalla.org',
    contactPhone: lang === 'ar' ? '+2 040 2220887' : '+20 40 222 0887',
    deanName: lang === 'ar' ? 'وكيل الكلية الإكليريكية بالمحلة الكبرى' : 'Seminary branch dean of studies',
    deanPerson: lang === 'ar' ? 'القس أثناسيوس بنيامين' : 'Very Rev. Fr. Athanasios Beniamin',
    
    // General terms
    footerText: lang === 'ar' 
      ? 'حقوق النشر © ٢٠٢٦ محفوظة للكلية الإكليريكية للأقباط الأرثوذكس - فرع المحلة الكبرى' 
      : 'Copyright © 2026 Coptic Orthodox Theological Seminary - Mahalla El-Kubra Branch. All Rights Reserved.',
    allYearsTitle: lang === 'ar' ? 'تحقق الاستعلام الفوري عن بيان درجات أربع سنوات' : 'Verify Result Statements Across All 4 Year Classes',
    linkResultsText: lang === 'ar' ? 'انقر هنا للانتقال لبوابة النتائج والبحث بالرقم القومي' : 'Go directly to Results Lookup via Card Search',
    viewResultHeader: lang === 'ar' ? 'بوابة النتائج' : 'Grades Query Port',
    quickResultBrief: lang === 'ar' ? 'أدخل رقمك القومي لعرض درجاتك الكاملة بالتحريري والشفهي والبحث بكل مادة ومجموعك وعشرتك بالدفعة.' : 'Query total written, oral and research scores combined with your class standing and grade certifications.'
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-brand-bg text-brand-dark selection:bg-brand-gold/20 selection:text-brand-red font-sans" 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Sticky Top Header Section (Hidden during print) */}
      <header className="sticky top-0 z-50 bg-[#7c1c1e] text-[#f4e6d1] border-b-4 border-[#c5a059] shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo and Name Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 aspect-square shrink-0 rounded-full overflow-hidden border-2 border-[#c5a059] bg-white p-0.5 shadow-md flex items-center justify-center">
              <img 
                src={collegeLogo} 
                alt="College Logo" 
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/college_logo.png';
                  }
                }}
                className="w-full h-full aspect-square object-contain rounded-full crisp-img"
              />
            </div>
            <div className={`text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
              <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight uppercase text-white">
                {t.titleMain}
              </h1>
              <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mt-1">
                <span className="text-xs text-[#c5a059] font-bold tracking-[0.2em] uppercase">{t.titleBranch}</span>
                <span className="text-[10px] text-white/70 font-medium">| {t.dioceseName}</span>
              </div>
            </div>
          </div>

          {/* Navigation Control + English/Arabic Toggle Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <nav className="flex flex-wrap items-center gap-1 bg-black/15 p-1 rounded-xl border border-white/10">
              <button
                id="tab-btn-home"
                onClick={() => { setCurrentTab('home'); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-serif transition-all cursor-pointer ${
                  currentTab === 'home' 
                    ? 'bg-[#c5a059] text-white shadow-sm' 
                    : 'text-[#f4e6d1]/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.tabHome}
              </button>
              <button
                id="tab-btn-enrollment"
                onClick={() => { setCurrentTab('enrollment'); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-serif transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'enrollment' 
                    ? 'bg-[#c5a059] text-white shadow-sm' 
                    : 'text-[#f4e6d1]/85 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{t.tabEnrollment}</span>
              </button>
              <button
                id="tab-btn-results"
                onClick={() => { setCurrentTab('results'); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-serif transition-colors cursor-pointer ${
                  currentTab === 'results' 
                    ? 'bg-[#c5a059] text-white shadow-sm' 
                    : 'text-[#f4e6d1]/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.tabResults}
              </button>
              <button
                id="tab-btn-curriculum"
                onClick={() => { setCurrentTab('curriculum'); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-serif transition-colors cursor-pointer ${
                  currentTab === 'curriculum' 
                    ? 'bg-[#c5a059] text-white shadow-sm' 
                    : 'text-[#f4e6d1]/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.tabCurriculum}
              </button>
              <button
                id="tab-btn-stats"
                onClick={() => { setCurrentTab('stats'); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-serif transition-colors cursor-pointer ${
                  currentTab === 'stats' 
                    ? 'bg-[#c5a059] text-white shadow-sm' 
                    : 'text-[#f4e6d1]/85 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.tabStats}
              </button>
            </nav>

            {/* Bilingual toggle button */}
            <button
              id="language-cfg-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-[#f4e6d1] hover:text-white border border-[#c5a059]/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Banner Section (Dynamic: Full height on home with actual generated portrait blur/overlay backdrops index) */}
      <AnimatePresence mode="wait">
        {currentTab === 'home' && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
            className="w-full relative bg-amber-900/10 border-b border-amber-200 overflow-hidden min-h-[480px] flex items-center print:hidden"
          >
            {/* Popes Background Portrait underlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={popesImage}
                alt="Pope Cyril VI and Pope Shenouda III" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top opacity-35 scale-102"
              />
              {/* Beautiful warm yellow gradient veil for maximum readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf7] via-[#fcfaf7]/70 to-[#7c1c1e]/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf7]/90 via-transparent to-[#fcfaf7]/90" />
            </div>

            {/* Hero contents container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-center space-y-6">
              
              {/* College Official Seal Centerpiece */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-24 h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-full overflow-hidden border-3 border-[#c5a059] bg-white p-1 shadow-xl flex items-center justify-center">
                  <img 
                    src={collegeLogo} 
                    alt="College Logo" 
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.dataset.fallback) {
                        el.dataset.fallback = '1';
                        el.src = '/college_logo.png';
                      }
                    }}
                    className="w-full h-full aspect-square object-contain rounded-full crisp-img"
                  />
                </div>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#e5dcd0] shadow-sm text-xs font-semibold text-[#7c1c1e] font-serif">
                  <Sparkles className="w-4 h-4 text-[#c5a059] animate-pulse" />
                  <span>{lang === 'ar' ? 'الكلية الإكليريكية بالمحلة الكبرى — الشعار الرسمي' : 'Mahalla Coptic Seminary — Official Seal'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2d2a26] tracking-tight leading-tight">
                  {t.heroMainTitle}
                </h2>
                <p className="text-slate-650 text-sm md:text-base max-w-2xl mx-auto font-medium">
                  {t.heroSubtitle}
                </p>
              </div>

              {/* Quick Launch Action Badges */}
              <div className="pt-2 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* New Enrollment Application CTA */}
                <div 
                  onClick={() => { setCurrentTab('enrollment'); }}
                  className="bg-[#2d2a26] text-[#f4e6d1] border-2 border-[#c5a059] rounded-xl p-4 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className={`text-right ${lang === 'ar' ? 'text-right' : 'text-left'} space-y-1`}>
                    <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs font-serif">
                      <UserPlus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تقديم طلب إلتحاق جديد' : 'New Admission Form'}</span>
                    </div>
                    <p className="text-[#f4e6d1]/80 text-[10px] font-medium leading-relaxed">
                      {lang === 'ar' ? 'سجل بياناتك للالتحاق بالدفعة الجديدة' : 'Enroll for upcoming year'}
                    </p>
                  </div>
                  <div className="bg-[#c5a059] text-white p-2 rounded-lg shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                </div>

                {/* Results Lookup CTA */}
                <div 
                  onClick={() => { setCurrentTab('results'); }}
                  className="bg-[#7c1c1e] text-[#f4e6d1] border-2 border-[#c5a059] rounded-xl p-4 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className={`text-right ${lang === 'ar' ? 'text-right' : 'text-left'} space-y-1`}>
                    <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs font-serif">
                      <BookOpenCheck className="w-4 h-4" />
                      <span>{t.viewResultHeader}</span>
                    </div>
                    <p className="text-[#f4e6d1]/80 text-[10px] font-medium leading-relaxed">
                      {t.allYearsTitle}
                    </p>
                  </div>
                  <div className="bg-[#c5a059] text-white p-2 rounded-lg shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AnimatePresence mode="wait">
          
          {/* ===================== TAB: HOME ===================== */}
          {currentTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Detailed introduction columns (8/12) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Express Desire / Interest in Applying Card with QR Code Image */}
                <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#c5a059] shadow-md space-y-5 relative overflow-hidden bg-[radial-gradient(#fcfaf7_1px,transparent_1px)] [background-size:16px_16px]">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7c1c1e] via-[#c5a059] to-[#7c1c1e]" />
                  
                  <div className="text-center space-y-2 border-b border-[#e5dcd0] pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7c1c1e]/10 text-[#7c1c1e] text-xs font-bold font-serif">
                      <QrCode className="w-4 h-4 text-[#c5a059]" />
                      <span>{lang === 'ar' ? 'قبول الدفعة الجديدة ٢٠٢٦ - ٢٠٢٧' : 'New Cohort Admission 2026-2027'}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#7c1c1e] tracking-tight">
                      {lang === 'ar' ? 'إبداء رغبة للتقدم للكلية الإكليريكية' : 'Express Interest in Applying to Theological Seminary'}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium">
                      {lang === 'ar' 
                        ? 'قم بمسح رمز الاستجابة السريعة (QR Code) بكاميرا الموبايل أو اضغط على الزر للانتفال المباشر لصفحة التقديم' 
                        : 'Scan the QR Code with your smartphone camera or click below to navigate directly to the application form'}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                    {/* QR Code Image Container */}
                    <div className="p-4 bg-white rounded-2xl border-2 border-[#c5a059] shadow-lg hover:shadow-xl transition-all duration-300 text-center space-y-2 group">
                      <img 
                        src={qrCodeImage} 
                        alt="QR Code - إبداء رغبة للتقدم للكلية الإكليريكية" 
                        referrerPolicy="no-referrer"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain mx-auto transition-transform duration-300 group-hover:scale-102"
                      />
                      <span className="text-[11px] text-slate-500 font-bold block font-mono">
                        {lang === 'ar' ? 'رمز الاستجابة السريعة للتسجيل' : 'Scan to Apply'}
                      </span>
                    </div>

                    <div className="text-center sm:text-right space-y-4 max-w-xs">
                      <div className="space-y-1.5">
                        <div className="font-serif font-bold text-[#2d2a26] text-base">
                          {lang === 'ar' ? 'خطوات تقديم طلب الإلتحاق:' : 'Application Steps:'}
                        </div>
                        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                          <li>{lang === 'ar' ? 'إدخال اسم الطالب رباعياً والرقم القومي' : 'Enter full student name & National ID'}</li>
                          <li>{lang === 'ar' ? 'تحديد تاريخ الميلاد والإيبارشية والكنيسة' : 'Select Birth date, Diocese & Church'}</li>
                          <li>{lang === 'ar' ? 'تحديد المؤهل الدراسي ونظام الدراسة (منتظم/منتسب)' : 'Choose qualification & modality'}</li>
                          <li>{lang === 'ar' ? 'حفظ وإرسال الطلب لشيت الكلية مباشرة' : 'Submit & record automatically'}</li>
                        </ul>
                      </div>

                      <button
                        onClick={() => { setCurrentTab('enrollment'); }}
                        className="w-full py-3 px-5 bg-[#7c1c1e] text-white hover:bg-[#601517] font-serif font-bold text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4 text-[#c5a059]" />
                        <span>{lang === 'ar' ? 'الانتقال لصفحة التسجيل مباشرة' : 'Go to Application Form'}</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* School overall introduction block */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5dcd0] shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7c1c1e]" />
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1c1e] border-b border-[#e5dcd0] pb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#c5a059]" />
                    <span>{lang === 'ar' ? 'من نحن ورسالتنا المسكونية' : 'Our Identity & Ecumenical Mission'}</span>
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    {t.schoolBrief}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed text-justify mt-2">
                    {lang === 'ar' 
                      ? 'تم تأسيس هذا الصرح اللاهوتي ليكون منارة تعليمية تخدم أبناء إيبارشية المحلة، مقدماً لهم تراكماً معرفياً وروحياً أصيلاً يربط بين نصوص الكتاب المقدس وتعاليم الآباء الأولين، لتقديم خدام قادرين على الذود عن العقيدة بالمعرفة الحكيمة والمحبة الكنسية القويمة.'
                      : 'The seminary establishment serves as a theological beacon for students of Gharbia. Connecting scriptural truth with patristic legacy, it produces servants capable of articulating Orthodox doctrine with wisdom, charity, and historical depth.'}
                  </p>
                </section>

                {/* Popes Tribute Column (Pope Cyril VI & Pope Shenouda III) */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5dcd0] shadow-sm space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#c5a059]" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5dcd0] pb-3 gap-3">
                    <h3 className="text-xl font-serif font-bold text-[#7c1c1e] flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-[#c5a059]" />
                      <span>{t.popesPillarsTitle}</span>
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-[#7c1c1e]/10 text-[#7c1c1e] px-2.5 py-1 rounded border border-[#7c1c1e]/25 self-start sm:self-auto font-mono">
                      {lang === 'ar' ? 'تراث الكنيسة الحي' : 'Ecclesiastical Heritage'}
                    </span>
                  </div>

                  {/* Thumbnail display of Popes */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-4 rounded-lg border border-[#e5dcd0] p-1 bg-[#fcfaf7]">
                      <img 
                        src={popesImage}
                        alt="Pope Cyril and Pope Shenouda"
                        referrerPolicy="no-referrer"
                        className="rounded-lg object-cover h-36 w-full object-top"
                      />
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed text-justify">
                        {t.popesPillarsDesc}
                      </p>
                    </div>
                  </div>

                  {/* Dual quotes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
                    <div className="p-4 bg-[#fcfaf7] rounded-lg border border-[#e5dcd0] space-y-2">
                      <div className="font-bold text-[#7c1c1e] font-serif">{lang === 'ar' ? 'القديس كيرلس الأول (عمود الإيمان):' : 'Saint Cyril I (Pillar of Faith):'}</div>
                      <p className="text-slate-550 italic leading-relaxed">
                        {lang === 'ar' ? '"إن الله لا يترك الذين يلتجئون إليه، بل يلبس طبيعتنا ويعيد تشكيلها بإدماجها في حياته الخاصة"' : '"God does not abandon those who take refuge in Him, but rather He puts on our nature and reshapes it by integrating it into His own life."'}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-[#e5dcd0] space-y-2">
                      <div className="font-bold text-slate-800 font-serif">{lang === 'ar' ? 'مثلث الرحمات البابا شنودة الثالث:' : 'The Late Pope Shenouda III:'}</div>
                      <p className="text-slate-550 italic leading-relaxed">
                        {lang === 'ar' ? '"كنيسة بلا شباب هي كنيسة بلا مستقبل، وشباب بلا كنيسة هو شباب بلا أمل. تعلّموا دائماً لكي تخدموا الحق."' : '"A church without youth is a church without a future, and youth without a church is youth without hope. Learn always to serve the Truth."'}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Study Curriculum Overviews */}
                <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5dcd0] shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7c1c1e]" />
                  <h3 className="text-xl font-serif font-bold text-[#7c1c1e] border-b border-[#e5dcd0] pb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#c5a059]" />
                    <span>{t.yearsOfStudy}</span>
                  </h3>
                  
                  <div className="space-y-4 pt-1">
                    <div className="flex gap-3 text-xs leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-[#7c1c1e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">1</span>
                      <p className="text-slate-700"><strong className="text-slate-900 font-semibold">{lang === 'ar' ? 'السنة الأولى:' : 'Year 1:'}</strong> {t.y1}</p>
                    </div>
                    <div className="flex gap-3 text-xs leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-[#7c1c1e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">2</span>
                      <p className="text-slate-700"><strong className="text-slate-900 font-semibold">{lang === 'ar' ? 'السنة الثانية:' : 'Year 2:'}</strong> {t.y2}</p>
                    </div>
                    <div className="flex gap-3 text-xs leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-[#7c1c1e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">3</span>
                      <p className="text-slate-700"><strong className="text-slate-900 font-semibold">{lang === 'ar' ? 'السنة الثالثة:' : 'Year 3:'}</strong> {t.y3}</p>
                    </div>
                    <div className="flex gap-3 text-xs leading-relaxed">
                      <span className="w-6 h-6 rounded-lg bg-[#7c1c1e] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">4</span>
                      <p className="text-slate-700"><strong className="text-slate-900 font-semibold">{lang === 'ar' ? 'السنة الرابعة:' : 'Year 4:'}</strong> {t.y4}</p>
                    </div>
                  </div>
                </section>

              </div>

              {/* Sidebar directory (Dean's desk + contacts) (4/12) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Result Checker widget box on home */}
                <div className="p-6 bg-[#7c1c1e] text-[#f4e6d1] rounded-xl border border-[#c5a059] shadow-md space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-white/5 select-none pointer-events-none">
                    <Layers className="w-24 h-24" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-[#c5a059] text-base">
                      {t.allYearsTitle}
                    </h4>
                    <p className="text-[#f4e6d1]/80 text-xs leading-relaxed">
                      {t.quickResultBrief}
                    </p>
                  </div>
                  <button
                    id="home-btn-results"
                    onClick={() => { setCurrentTab('results'); }}
                    className="w-full py-3 px-4 bg-[#c5a059] text-white hover:bg-[#b08b47] text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    <span>{t.tabResults}</span>
                  </button>
                </div>

                {/* Pope Tawadros II High Patronage Card */}
                <div className="bg-white p-6 rounded-xl border-2 border-[#c5a059] shadow-md space-y-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7c1c1e] via-[#c5a059] to-[#7c1c1e]" />
                  
                  {/* Transparent Portrait / Emblem of H.H. Pope Tawadros II */}
                  <div className="flex justify-center -mt-1">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#c5a059]/20 via-[#c5a059]/5 to-transparent scale-95" />
                      <img 
                        src={popeTawadrosImg} 
                        alt="قداسة البابا المعظم الأنبا تواضروس الثاني"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (!el.dataset.fallback) {
                            el.dataset.fallback = '1';
                            el.src = '/pope_tawadros_nobg.png';
                          }
                        }}
                        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105 relative z-10 crisp-img"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] text-[#7c1c1e] font-serif font-bold tracking-normal leading-tight">
                      {lang === 'ar' ? 'تحت رعاية صاحب الغبطة والقداسة البابا' : 'Under the Patronage of His Holiness Pope'}
                    </div>
                    <h3 className="font-serif font-bold text-[#7c1c1e] text-lg sm:text-xl leading-tight">
                      {lang === 'ar' ? 'الأنبا تواضروس الثانى' : 'Tawadros II'}
                    </h3>
                    <p className="text-xs font-serif font-semibold text-[#c5a059] leading-snug px-2">
                      {lang === 'ar' 
                        ? 'بابا الأسكندرية وبطريرك الكرازة المرقسية وعميد الكلية الإكليريكية' 
                        : 'Pope of Alexandria, Patriarch of the See of St. Mark & Dean of the Theological Seminary'}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed text-justify border-t border-[#e5dcd0] pt-3">
                    {lang === 'ar'
                      ? 'يرعى قداسته مسيرة التعليم اللاهوتي في الكنيسة القبطية الأرثوذكسية، مشجعاً البحث العلمي والدراسة الأصيلة لإعداد أجيال واعية من الخدام والباحثين.'
                      : 'His Holiness nurtures the path of theological education across the Coptic Orthodox Church, fostering patristic studies and academic excellence for future generations of servants.'}
                  </p>
                </div>

                {/* Bishop Ignatius patronage card */}
                <div className="bg-white p-6 rounded-xl border-2 border-[#c5a059] shadow-md space-y-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c5a059] via-[#7c1c1e] to-[#c5a059]" />
                  
                  {/* Transparent Portrait / Emblem of H.G. Bishop Ignatius */}
                  <div className="flex justify-center -mt-1">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#c5a059]/20 via-[#c5a059]/5 to-transparent scale-95" />
                      <img 
                        src={bishopIgnatiusImg} 
                        alt="حضرة صاحب النيافة الأنبا أغناطيوس"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (!el.dataset.fallback) {
                            el.dataset.fallback = '1';
                            el.src = '/bishop_ignatius_nobg.png';
                          }
                        }}
                        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105 relative z-10 crisp-img"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] text-[#7c1c1e] font-serif font-bold tracking-normal leading-tight">
                      {lang === 'ar' ? 'وشريكه فى الخدمة الرسوليه حضرة صاحب النيافة' : 'And His Partner in Apostolic Service, His Grace'}
                    </div>
                    <h3 className="font-serif font-bold text-[#7c1c1e] text-lg sm:text-xl leading-tight">
                      {lang === 'ar' ? 'الأنبا أغناطيوس' : 'Bishop Ignatius'}
                    </h3>
                    <p className="text-xs font-serif font-semibold text-[#c5a059] leading-snug px-2">
                      {lang === 'ar' 
                        ? 'أسقف عام المحلة الكبرى وتوابعها ومدير فرع الكلية الإكليريكية بالمحلة الكبرى' 
                        : 'General Bishop of El-Mahalla El-Kubra & Affiliated Districts, Director of the Theological Seminary Branch in El-Mahalla El-Kubra'}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed text-justify border-t border-[#e5dcd0] pt-3">
                    {lang === 'ar'
                      ? 'يرعى نيافته الكلية الإكليريكية بفيض الأبوة الساهرة والدعم الأكاديمي والروحي، متمنياً لجميع الدارسين امتلاءً من نعمة المعرفة والخدمة اللاهوتية لبناء الكنيسة المقدسة.'
                      : 'His Grace guides the seminary with vigilant fatherhood and continuous academic and spiritual support, wishing all students the fullness of grace and theological service.'}
                  </p>
                </div>

                {/* Branch Dean's desk card */}
                <div className="bg-white p-6 rounded-xl border border-[#e5dcd0] shadow-sm space-y-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7c1c1e]" />
                  
                  {/* Transparent Portrait of Fr. Athanasius */}
                  <div className="flex justify-center -mt-1">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#c5a059]/20 via-[#c5a059]/5 to-transparent scale-95" />
                      <img 
                        src={fatherAthanasiusImg} 
                        alt="القمص أثناسيوس ماهر"
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (!el.dataset.fallback) {
                            el.dataset.fallback = '1';
                            el.src = '/father_athanasius_nobg.png';
                          }
                        }}
                        className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105 relative z-10 crisp-img"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-[#c5a059] font-bold tracking-wider font-mono uppercase">{t.deanName}</div>
                    <h4 className="font-serif font-bold text-[#7c1c1e] text-base">{t.deanPerson}</h4>
                    <span className="text-[11px] text-slate-600 font-medium block">{lang === 'ar' ? 'أستاذ العهد القديم ووكيل الكلية الإكليريكية بالمحلة' : 'Lecturer of Old Testament & Branch Dean'}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed text-justify border-t border-[#e5dcd0] pt-3">
                    {lang === 'ar'
                      ? 'يرحب بكم وكيل الكلية وأعضاء هيئة التدريس الموقرين بفرع المحلة الكبرى، متمنين لكافة الطلاب مسيرة مباركة ملأى بالثمار الروحية والعلمية.'
                      : 'Welcome to our growing theological branch portal. On behalf of study heads and staff, we pray for your successful academic journey.'}
                  </p>
                </div>

                {/* Directory addresses */}
                <div className="bg-white p-6 rounded-xl border border-[#e5dcd0] shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#c5a059]" />
                  <h4 className="font-serif font-bold text-[#7c1c1e] text-sm border-b border-[#e5dcd0] pb-2">
                    {t.contactTitle}
                  </h4>
                  <div className="space-y-3 pt-1 text-xs">
                    
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#7c1c1e] shrink-0 mt-0.5" />
                      <span className="text-slate-650 leading-normal">{t.contactAddress}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#7c1c1e] shrink-0" />
                      <span className="text-slate-650 leading-normal font-mono">{t.contactPhone}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#7c1c1e] shrink-0" />
                      <span className="text-slate-650 leading-normal font-mono">{t.contactEmail}</span>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ===================== TAB: RESULTS ===================== */}
          {currentTab === 'results' && (
            <motion.div
              key="results-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Google Sheets Connection Status Card */}
              <div className="bg-white border border-[#e5dcd0] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${isLoadingSheet ? 'bg-amber-500 animate-pulse' : sheetError ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                  <div className="space-y-0.5 text-right sm:text-right">
                    <h4 className="font-serif font-bold text-sm text-[#2d2a26]">
                      {lang === 'ar' ? 'ربط النتائج بقاعدة بيانات Google Sheets' : 'Google Sheets Results Database Link'}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {isLoadingSheet ? (
                        lang === 'ar' ? 'جاري جلب النتائج الحية من مصفوفة جوجل شيتس...' : 'Loading live student transcripts from spreadsheet matrix...'
                      ) : sheetError ? (
                        lang === 'ar' ? `فشل الاتصال بـ Google Sheets: ${sheetError}` : `Connection to Google Sheets failed: ${sheetError}`
                      ) : (
                        lang === 'ar' 
                          ? `متصل بنجاح! تم دمج عدد ${sheetLoadedCount} طالباً عبر الصفوف الدراسية الأربعة (1، 2، 3، 4) من جوجل شيت.`
                          : `Connected successfully! Integrated ${sheetLoadedCount} students across all 4 years (1, 2, 3, 4) from Google Sheets.`
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {activeStudent ? (
                <StudentTranscript 
                  student={activeStudent} 
                  lang={lang} 
                  onClear={() => { setActiveStudent(null); }}
                />
              ) : (
                <ResultSearch 
                  lang={lang} 
                  onStudentFound={handleStudentFound} 
                />
              )}
            </motion.div>
          )}

          {/* ===================== TAB: ENROLLMENT ===================== */}
          {currentTab === 'enrollment' && (
            <motion.div
              key="enrollment-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <NewEnrollmentForm lang={lang} />
            </motion.div>
          )}

          {/* ===================== TAB: CURRICULUM ===================== */}
          {currentTab === 'curriculum' && (
            <motion.div
              key="curriculum-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CurriculumDirectory lang={lang} />
            </motion.div>
          )}

          {/* ===================== TAB: STATS ===================== */}
          {currentTab === 'stats' && (
            <motion.div
              key="stats-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AcademicStats lang={lang} students={sheetStudents} isLoading={isLoadingSheet} onSelectStudent={handleStudentFound} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Section (Hidden during print) */}
      <footer className="bg-white border-t border-[#e5dcd0] py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 aspect-square shrink-0 rounded-full overflow-hidden border border-[#c5a059] bg-white p-0.5 shadow-xs flex items-center justify-center">
              <img 
                src={collegeLogo} 
                alt="College Logo" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = '/college_logo.png';
                  }
                }}
                className="w-full h-full aspect-square object-contain rounded-full crisp-img"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 font-serif">
              {t.titleMain} — {t.titleBranch}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            {t.footerText}
          </p>
        </div>
      </footer>

    </div>
  );
}
