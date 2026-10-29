import { useEffect, useRef, useState } from "react";
import "./App.css";

const SETTINGS = {
  whatsapp: "201000000000",
  photoUploadForm: "",
  guestbookForm: "",
  mapsLink: "",
  venueName: "Tolip Madar Hotel — Gardenia Compound",
};

// Add, remove, or reorder route stops here. Replace placeholder photos and links with the real venue details.
const routeSteps = [
  { title: "Gate 2, Gardenia", subtitle: "Your starting point", description: "Begin at Gate 2, Gardenia. Look for the entrance shown in the photo.", image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85", mapLink: "" },
  { title: "Tolip Hotel — Gate 2", subtitle: "Your next landmark", description: "Continue toward Tolip Hotel and look for Gate 2. Exact directions will be added here.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", mapLink: "" },
  { title: "The wedding venue", subtitle: "You've arrived", description: "Follow the final entrance instructions to join Ibrahim and Karen's celebration.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85", mapLink: "" },
];

const copy = {
  en: {
    eyebrow: "A SPECIAL INVITATION", envelopeHint: "SWIPE UP TO OPEN", invite: "Together with their families, invite you to celebrate", countdown: "COUNTING DOWN TO FOREVER", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds", journeyLabel: "YOUR JOURNEY", journeyTitle: "Follow the way to our day", journeyText: "Follow each checkpoint below. We'll add real entrance photos and verified directions before the wedding.", previous: "Previous", next: "Next stop", openMap: "Open map directions", scheduleLabel: "SAVE THE DATE", scheduleTitle: "Friday, January 1, 2027", time: "6:00 PM — time to celebrate", dressTitle: "Dress to celebrate", dressText: "Formal attire. Come ready for a beautiful evening.", rsvpTitle: "It wouldn't be the same without you", rsvpText: "Let us know if you can join our special day.", rsvpButton: "Confirm via WhatsApp", uploadTitle: "Share your point of view", uploadText: "Be part of our wedding memories. Upload the photos and short videos you captured during the celebration so we can see the day through your eyes. Please choose your favorite moments and avoid uploading private or unflattering photos of other guests.", uploadButton: "Upload wedding photos", guestbookTitle: "Leave a little love", guestbookText: "Write a wish or a message we'll treasure forever.", guestbookButton: "Write in our guestbook", footer: "A day to remember. A love to last forever.", calendar: "Add to Google Calendar", noLink: "This link will be added soon.",
  },
  ar: {
    eyebrow: "دعوة مميزة", envelopeHint: "اسحبوا الظرف إلى أعلى لفتح الدعوة", invite: "يسعدنا دعوتكم للاحتفال بزفافنا", countdown: "العد التنازلي ليومنا المميز", days: "يوم", hours: "ساعة", minutes: "دقيقة", seconds: "ثانية", journeyLabel: "طريق الوصول", journeyTitle: "اتبعوا الطريق إلى يومنا", journeyText: "اتبعوا المحطات التالية. سنضيف صور المداخل والاتجاهات الدقيقة قبل موعد الزفاف.", previous: "المحطة السابقة", next: "المحطة التالية", openMap: "افتح الاتجاهات", scheduleLabel: "احفظوا الموعد", scheduleTitle: "الجمعة، ١ يناير ٢٠٢٧", time: "الساعة السادسة مساءً", dressTitle: "الزي الرسمي", dressText: "ارتدوا ملابس رسمية واستعدوا لأمسية جميلة.", rsvpTitle: "فرحتنا لا تكتمل بدونكم", rsvpText: "يسعدنا معرفة إمكانية حضوركم ليومنا المميز.", rsvpButton: "تأكيد الحضور عبر واتساب", uploadTitle: "شاركونا يومنا من وجهة نظركم", uploadText: "خلّونا نشوف فرحتنا بعيونكم. ارفعوا الصور والفيديوهات القصيرة التي التقطتموها خلال الفرح لنحتفظ بذكريات اليوم من وجهة نظركم.", uploadButton: "ارفعوا صور الفرح", guestbookTitle: "اتركوا لنا رسالة حب", guestbookText: "اكتبوا أمنية أو رسالة ستبقى في ذاكرتنا دائمًا.", guestbookButton: "اكتبوا في دفتر الأمنيات", footer: "يوم من الذكريات، وحب يدوم للأبد.", calendar: "أضيفوا الموعد إلى التقويم", noLink: "سيتم إضافة الرابط قريبًا.",
  },
};

const weddingDate = new Date("2027-01-01T18:00:00+02:00").getTime();
function getTimeLeft() {
  const difference = Math.max(0, weddingDate - Date.now());
  return { days: Math.floor(difference / 86400000), hours: Math.floor((difference / 3600000) % 24), minutes: Math.floor((difference / 60000) % 60), seconds: Math.floor((difference / 1000) % 60) };
}

function App() {
  const [language, setLanguage] = useState("en");
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [routeIndex, setRouteIndex] = useState(0);
  const swipeStartY = useRef(null);
  const t = copy[language];
  const isArabic = language === "ar";
  const activeStop = routeSteps[routeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!opening) return undefined;
    const timer = window.setTimeout(() => { setOpened(true); setOpening(false); }, 1550);
    return () => window.clearTimeout(timer);
  }, [opening]);

  function handleEnvelopePointerDown(event) {
    if (opening) return;
    swipeStartY.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function handleEnvelopePointerUp(event) {
    if (opening || swipeStartY.current === null) return;
    const distance = swipeStartY.current - event.clientY;
    swipeStartY.current = null;
    if (distance > 45) setOpening(true);
  }
  function handleEnvelopeKeyDown(event) {
    if ((event.key === "ArrowUp" || event.key === " ") && !opening) { event.preventDefault(); setOpening(true); }
  }
  function openLink(url) {
    if (!url) { window.alert(t.noLink); return; }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const message = isArabic ? "مرحبًا إبراهيم وكارين! أود تأكيد حضوري لحفل زفافكما يوم ١ يناير ٢٠٢٧. ❤️" : "Hi Ibrahim and Karen! I'd like to confirm my attendance at your wedding on January 1, 2027. ❤️";
  const whatsappLink = `https://wa.me/${SETTINGS.whatsapp}?text=${encodeURIComponent(message)}`;
  const countdown = [[timeLeft.days, t.days], [timeLeft.hours, t.hours], [timeLeft.minutes, t.minutes], [timeLeft.seconds, t.seconds]];

  return (
    <main className={`website ${isArabic ? "arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
      {!opened && <section className={`opening-screen ${opening ? "is-opening" : ""}`}>
        <div className="opening-glow" />
        <p className="opening-label">{t.eyebrow}</p>
        <button className="big-envelope" onPointerDown={handleEnvelopePointerDown} onPointerUp={handleEnvelopePointerUp} onPointerCancel={() => { swipeStartY.current = null; }} onKeyDown={handleEnvelopeKeyDown} aria-label="Swipe up to open the invitation" aria-describedby="swipe-hint" disabled={opening}>
          <span className="envelope-shadow" /><span className="envelope-back" />
          <span className="envelope-letter"><img className="letter-logo" src="/initials-seal.png" alt="Ibrahim and Karen initials" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span>
          <span className="envelope-front-left" /><span className="envelope-front-right" /><span className="envelope-front-bottom" /><span className="envelope-flap" />
          <span className="seal"><img src="/initials-seal.png" alt="Ibrahim and Karen initials seal" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span>
        </button>
        <h1 className="opening-names">{isArabic ? "ابراهيم" : "Ibrahim"} <i>&</i> {isArabic ? "كارن" : "Karen"}</h1>
        <p id="swipe-hint" className="opening-hint">{t.envelopeHint}</p>
        <span className="swipe-indicator" aria-hidden="true">↑</span>
        <p className="tap-note">01 — 01 — 2027</p>
      </section>}

      <header className="topbar">
        <a className="brand brand-logo" href="#home" aria-label="Ibrahim and Karen home"><img src="/initials-seal.png" alt="Ibrahim and Karen initials" onError={(event) => { event.currentTarget.style.display = "none"; }} /></a>
        <nav><a href="#home">{isArabic ? "الرئيسية" : "HOME"}</a><a href="#journey">{t.journeyLabel}</a><a href="#event">{isArabic ? "تفاصيل اليوم" : "THE DAY"}</a><a href="#memories">{isArabic ? "ذكريات الفرح" : "WEDDING MEMORIES"}</a></nav>
        <button className="language-button" onClick={() => setLanguage(isArabic ? "en" : "ar")}>{isArabic ? "English" : "العربية"}</button>
      </header>

      <section id="home" className="hero section-enter">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <p className="eyebrow">{t.eyebrow}</p><p className="hero-intro">{t.invite}</p>
        <h1 className={`hero-names ${isArabic ? "arabic-names" : ""}`}><span>{isArabic ? "ابراهيم" : "Ibrahim"}</span><i>&</i><span>{isArabic ? "كارن" : "Karen"}</span></h1>
        <div className="hero-rule"><span>✳</span></div><p className="hero-date">{t.scheduleTitle}</p><p className="hero-time">{t.time}</p>
        <a href="#event" className="scroll-cue"><span /> {isArabic ? "اكتشفوا التفاصيل" : "SCROLL TO DISCOVER"}</a>
      </section>

      <section className="countdown-section"><p className="eyebrow">{t.countdown}</p><div className="countdown">{countdown.map(([value, label]) => <div className="countdown-item" key={label}><span>{String(value).padStart(2, "0")}</span><small>{label}</small></div>)}</div></section>

      <section id="journey" className="journey-section"><p className="eyebrow">{t.journeyLabel}</p><h2 className="section-title">{t.journeyTitle}</h2><p className="section-subtitle">{t.journeyText}</p>
        <div className="route-progress">{routeSteps.map((step, index) => <button key={`${step.title}-${index}`} className={`progress-step ${index === routeIndex ? "active" : ""} ${index < routeIndex ? "visited" : ""}`} onClick={() => setRouteIndex(index)} aria-label={`Show route stop ${index + 1}: ${step.title}`}><span>{String(index + 1).padStart(2, "0")}</span><i /></button>)}</div>
        <article className="route-card" key={activeStop.title}><div className="route-photo"><img src={activeStop.image} alt={activeStop.title} /><span className="route-photo-number">STOP {String(routeIndex + 1).padStart(2, "0")}</span></div><div className="route-details"><p className="eyebrow">{activeStop.subtitle}</p><h3>{activeStop.title}</h3><p>{activeStop.description}</p><div className="route-actions"><button className="outline-button" onClick={() => openLink(activeStop.mapLink || SETTINGS.mapsLink)}>{t.openMap} ↗</button><span>{String(routeIndex + 1).padStart(2, "0")} / {String(routeSteps.length).padStart(2, "0")}</span></div></div></article>
        <div className="route-navigation"><button className="route-nav-button" disabled={routeIndex === 0} onClick={() => setRouteIndex((index) => index - 1)}>← {t.previous}</button><button className="route-nav-button route-nav-primary" disabled={routeIndex === routeSteps.length - 1} onClick={() => setRouteIndex((index) => index + 1)}>{t.next} →</button></div><p className="route-note">The route images are placeholders until the actual entrances and directions are confirmed.</p>
      </section>

      <section id="event" className="event-section"><p className="eyebrow">{t.scheduleLabel}</p><h2 className="section-title">{t.scheduleTitle}</h2><div className="event-card"><span className="event-symbol">✳</span><p>{t.time}</p><div className="gold-line center" /><h3>{t.dressTitle}</h3><p>{t.dressText}</p><a className="outline-button" href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ibrahim & Karen Wedding")}&dates=20270101T160000/20270101T200000&ctz=Africa/Cairo&details=${encodeURIComponent("Celebrate Ibrahim and Karen's wedding!")}`} target="_blank" rel="noreferrer">+ {t.calendar}</a></div></section>

      <section id="rsvp" className="rsvp-section"><p className="eyebrow">{isArabic ? "بكل حب" : "WITH LOVE"}</p><h2>{t.rsvpTitle}</h2><p>{t.rsvpText}</p><a className="open-button" href={whatsappLink} target="_blank" rel="noreferrer">{t.rsvpButton} ↗</a></section>

      <section id="memories" className="memories-section"><article className="memory-card"><span>{isArabic ? "ذكريات يوم الزفاف" : "YOUR VIEW OF OUR WEDDING"}</span><h2>{t.uploadTitle}</h2><p>{t.uploadText}</p><button className="outline-button" onClick={() => openLink(SETTINGS.photoUploadForm)}>{t.uploadButton} ↗</button></article><article className="memory-card"><span>02 / A LITTLE NOTE</span><h2>{t.guestbookTitle}</h2><p>{t.guestbookText}</p><button className="outline-button" onClick={() => openLink(SETTINGS.guestbookForm)}>{t.guestbookButton} ↗</button></article></section>

      <footer className="footer"><div className="brand footer-brand brand-logo"><img src="/initials-seal.png" alt="Ibrahim and Karen initials" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div><p>{t.footer}</p><span>01 · 01 · 2027</span></footer>
    </main>
  );
}

export default App;
