import { useEffect, useState } from "react";
import "./App.css";

const SETTINGS = {
  whatsapp: "201000000000",
  photoUploadForm: "",
  guestbookForm: "",
  mapsLink: "https://maps.app.goo.gl/K16ZjTJHcPBXt8wT7",
  arrivalVideo: "/arrival-guide.mp4",
  venueName: "Tolip Madar Hotel — Gardenia Compound",
};

const copy = {
  en: {
    eyebrow: "A SPECIAL INVITATION",
    envelopeHint: "A LITTLE NOTE FOR YOU",
    openInvitation: "OPEN INVITATION",
    invite: "Together with their families, invite you to celebrate",
    countdown: "COUNTING DOWN TO FOREVER",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    journeyLabel: "HOW TO GET HERE",
    journeyTitle: "A little guide to finding us",
    journeyText:
      "Watch our short arrival guide, then use the directions button to reach the venue.",
    openMap: "Get directions",
    scheduleLabel: "SAVE THE DATE",
    scheduleTitle: "Friday, January 1, 2027",
    time: "5:00 PM — time to celebrate",
    dressTitle: "Dress to celebrate",
    dressText: "Formal attire. Come ready for a beautiful evening.",
    rsvpTitle: "It wouldn't be the same without you",
    rsvpText: "Let us know if you can join our special day.",
    rsvpButton: "Confirm via WhatsApp",
    uploadTitle: "Share your point of view",
    uploadText:
      "Be part of our wedding memories. Upload the photos and short videos you captured during the celebration so we can see the day through your eyes. Please choose your favorite moments and avoid uploading private or unflattering photos of other guests.",
    uploadButton: "Upload wedding photos",
    guestbookTitle: "Leave a little love",
    guestbookText: "Write a wish or a message we'll treasure forever.",
    guestbookButton: "Write in our guestbook",
    footer: "A day to remember. A love to last forever.",
    calendar: "Add to Google Calendar",
    noLink: "This link will be added soon.",
  },

  ar: {
    eyebrow: "دعوة مميزة",
    envelopeHint: "دعوة صغيرة لكم",
    openInvitation: "افتحوا الدعوة",
    invite: "يسعدنا دعوتكم للاحتفال بزفافنا",
    countdown: "العد التنازلي ليومنا المميز",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    journeyLabel: "طريقة الوصول",
    journeyTitle: "دليل بسيط للوصول إلينا",
    journeyText:
      "شاهدوا فيديو الوصول، ثم اضغطوا على زر الاتجاهات للوصول إلى مكان الحفل.",
    openMap: "الاتجاهات إلى مكان الحفل",
    scheduleLabel: "احفظوا الموعد",
    scheduleTitle: "الجمعة، ١ يناير ٢٠٢٧",
    time: "الساعة الخامسة مساءً",
    dressTitle: "الزي الرسمي",
    dressText: "ارتدوا ملابس رسمية واستعدوا لأمسية جميلة.",
    rsvpTitle: "فرحتنا لا تكتمل بدونكم",
    rsvpText: "يسعدنا معرفة إمكانية حضوركم ليومنا المميز.",
    rsvpButton: "تأكيد الحضور عبر واتساب",
    uploadTitle: "شاركونا يومنا من وجهة نظركم",
    uploadText:
      "خلّونا نشوف فرحتنا بعيونكم. ارفعوا الصور والفيديوهات القصيرة التي التقطتموها خلال الفرح لنحتفظ بذكريات اليوم من وجهة نظركم.",
    uploadButton: "ارفعوا صور الفرح",
    guestbookTitle: "اتركوا لنا رسالة حب",
    guestbookText: "اكتبوا أمنية أو رسالة ستبقى في ذاكرتنا دائمًا.",
    guestbookButton: "اكتبوا في دفتر الأمنيات",
    footer: "يوم من الذكريات، وحب يدوم للأبد.",
    calendar: "أضيفوا الموعد إلى التقويم",
    noLink: "سيتم إضافة الرابط قريبًا.",
  },
};

const weddingDate = new Date(
  "2027-01-01T17:00:00+02:00"
).getTime();

function getTimeLeft() {
  const difference = Math.max(0, weddingDate - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function App() {
  const [language, setLanguage] = useState("en");
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const t = copy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!opening) return undefined;

    const timer = window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 1550);

    return () => window.clearTimeout(timer);
  }, [opening]);

  function handleOpenInvitation() {
    if (opening || opened) return;
    setOpening(true);
  }

  function openLink(url) {
    if (!url) {
      window.alert(t.noLink);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // const message = isArabic
  //   ? "مرحبًا إبراهيم وكارين! أود تأكيد حضوري لحفل زفافكما يوم ١ يناير ٢٠٢٧. ❤️"
  //   : "Hi Ibrahim and Karen! I'd like to confirm my attendance at your wedding on January 1, 2027. ❤️";

  // const whatsappLink = `https://wa.me/${
  //   SETTINGS.whatsapp
  // }?text=${encodeURIComponent(message)}`;

  const countdown = [
    [timeLeft.days, t.days],
    [timeLeft.hours, t.hours],
    [timeLeft.minutes, t.minutes],
    [timeLeft.seconds, t.seconds],
  ];

  return (
    <main
      className={`website ${isArabic ? "arabic" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {!opened && (
        <section
          className={`opening-screen ${opening ? "is-opening" : ""}`}
        >
          <div className="opening-glow" />

          <p className="opening-label">{t.eyebrow}</p>

          <div className="big-envelope" aria-hidden="true">
            <span className="envelope-shadow" />
            <span className="envelope-back" />

            <span className="envelope-letter">
              <img
                className="letter-logo"
                src="/initials-seal.png"
                alt=""
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </span>

            <span className="envelope-front-left" />
            <span className="envelope-front-right" />
            <span className="envelope-front-bottom" />
            <span className="envelope-flap" />

            <span className="seal">
              <img
                src="/initials-seal.png"
                alt=""
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </span>
          </div>

          <h1 className="opening-names">
            {isArabic ? "إبراهيم" : "Ibrahim"} <i>&</i>{" "}
            {isArabic ? "كارن" : "Karen"}
          </h1>

          <p className="opening-hint">{t.envelopeHint}</p>

          <button
            className="open-button invitation-open-button"
            onClick={handleOpenInvitation}
            disabled={opening}
          >
            {opening
              ? isArabic
                ? "لحظة من فضلكم..."
                : "JUST A MOMENT..."
              : t.openInvitation}
            <span aria-hidden="true"></span>
          </button>

          <p className="tap-note">01 — 01 — 2027</p>
        </section>
      )}

      <header className="topbar">
        <a
          className="brand brand-logo"
          href="#home"
          aria-label="Ibrahim and Karen home"
        >
          <img
            src="/initials-seal.png"
            alt="Ibrahim and Karen initials"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </a>

        <nav>
          <a href="#home">
            {isArabic ? "الرئيسية" : "HOME"}
          </a>

          <a href="#journey">{t.journeyLabel}</a>

          <a href="#event">
            {isArabic ? "تفاصيل اليوم" : "THE DAY"}
          </a>

          <a href="#memories">
            {isArabic ? "ذكريات الفرح" : "WEDDING MEMORIES"}
          </a>
        </nav>

        <button
          className="language-button"
          onClick={() => setLanguage(isArabic ? "en" : "ar")}
        >
          {isArabic ? "English" : "العربية"}
        </button>
      </header>

      <section id="home" className="hero section-enter">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />

        <p className="eyebrow">{t.eyebrow}</p>
        <p className="hero-intro">{t.invite}</p>

        <h1
          className={`hero-names ${
            isArabic ? "arabic-names" : ""
          }`}
        >
          <span>{isArabic ? "إبراهيم" : "Ibrahim"}</span>
          <i>&</i>
          <span>{isArabic ? "كارن" : "Karen"}</span>
        </h1>

        <div className="hero-rule">
          <span>✳</span>
        </div>

        <p className="hero-date">{t.scheduleTitle}</p>
        <p className="hero-time">{t.time}</p>

        <a href="#event" className="scroll-cue">
          <span />
          {isArabic ? "اكتشفوا التفاصيل" : "SCROLL TO DISCOVER"}
        </a>
      </section>

      <section className="countdown-section">
        <p className="eyebrow">{t.countdown}</p>

        <div className="countdown">
          {countdown.map(([value, label]) => (
            <div className="countdown-item" key={label}>
              <span>{String(value).padStart(2, "0")}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>

      <section id="journey" className="journey-section">
        <p className="eyebrow">{t.journeyLabel}</p>

        <h2 className="section-title">{t.journeyTitle}</h2>

        <p className="section-subtitle">{t.journeyText}</p>

        <div className="arrival-guide-card">
          <div className="arrival-video-wrap">
            <video
              className="arrival-video"
              controls
              playsInline
              preload="metadata"
              poster="/arrival-guide-poster.jpg"
            >
              <source
                src={SETTINGS.arrivalVideo}
                type="video/mp4"
              />

              {isArabic
                ? "متصفحكم لا يدعم تشغيل الفيديو."
                : "Your browser does not support this video."}
            </video>
          </div>

          <div className="arrival-guide-footer">
            <div>
              <span className="arrival-guide-kicker">
                {isArabic ? "دليل الوصول" : "ARRIVAL GUIDE"}
              </span>

              <h3>{SETTINGS.venueName}</h3>
            </div>

            <button
              className="outline-button"
              onClick={() => openLink(SETTINGS.mapsLink)}
            >
              {t.openMap} 
            </button>
          </div>
        </div>
      </section>

      <section id="event" className="event-section">
        <p className="eyebrow">{t.scheduleLabel}</p>

        <h2 className="section-title">{t.scheduleTitle}</h2>

        <div className="event-card">
          <span className="event-symbol">✳</span>

          <p>{t.time}</p>

          <div className="gold-line center" />

          <h3>{t.dressTitle}</h3>
          <p>{t.dressText}</p>

          <a
            className="outline-button"
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
              "Ibrahim & Karen Wedding"
            )}&dates=20270101T170000/20270101T210000&ctz=Africa/Cairo&details=${encodeURIComponent(
              "Celebrate Ibrahim and Karen's wedding!"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            + {t.calendar}
          </a>
        </div>
      </section>

      {/* <section id="rsvp" className="rsvp-section">
        <p className="eyebrow">
          {isArabic ? "بكل حب" : "WITH LOVE"}
        </p>

        <h2>{t.rsvpTitle}</h2>
        <p>{t.rsvpText}</p>

        <a
          className="open-button"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          {t.rsvpButton} 
        </a>
      </section> */}

      <section id="memories" className="memories-section">
        <article className="memory-card">
          <span>
            {isArabic
              ? "ذكريات يوم الزفاف"
              : "YOUR VIEW OF OUR WEDDING"}
          </span>

          <h2>{t.uploadTitle}</h2>
          <p>{t.uploadText}</p>

          <button
            className="outline-button"
            onClick={() => openLink(SETTINGS.photoUploadForm)}
          >
            {t.uploadButton} 
          </button>
        </article>

        <article className="memory-card">
          <span>02 / A LITTLE NOTE</span>

          <h2>{t.guestbookTitle}</h2>
          <p>{t.guestbookText}</p>

          <button
            className="outline-button"
            onClick={() => openLink(SETTINGS.guestbookForm)}
          >
            {t.guestbookButton} 
          </button>
        </article>
      </section>

      <footer className="footer">
        <div className="brand footer-brand brand-logo">
          <img
            src="/initials-seal.png"
            alt="Ibrahim and Karen initials"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <p>{t.footer}</p>
        <span>01 · 01 · 2027</span>
      </footer>
    </main>
  );
}

export default App;