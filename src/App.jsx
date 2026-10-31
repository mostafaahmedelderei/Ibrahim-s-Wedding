import { useEffect, useState } from "react";
import "./App.css";

const SETTINGS = {
  photoUploadForm: "",
  guestbookForm: "",
  mapsLink: "https://maps.app.goo.gl/YmzvRtV3ACoNn9eW9?g_st=ic",
  arrivalVideo: "/arrival-guide.mp4",
  venueName: "Madar Venue — Tolip Gardens Hotel — Gardenia Compound",
};

const copy = {
  en: {
    eyebrow: "✦ A SPECIAL INVITATION ✦",
    envelopeHint: "A LITTLE NOTE FOR YOU",
    openInvitation: "OPEN INVITATION",
    invite: "Together with their families, invite you to celebrate",
    welcomeTitle: "WE WOULD LOVE TO CELEBRATE WITH YOU",
    welcomeText:
      "A special day, a beautiful beginning, and the people who make every moment unforgettable. We can't wait to celebrate with you.",
    whenWhereLabel: "✦ You are warmly invited ✦",
    whenWhereTitle: "When & Where",
    date: "Friday, January 1, 2027",
    time: "5:00 PM",
    venue: "Madar Venue",
    venueAddress: "Tolip Gardens Hotel — Gardenia Compound",
    arrivalTitle: "A little guide to finding us",
    arrivalText:
      "Watch our short arrival guide, then use the directions button to reach the venue.",
      arrivalNote: "Need a little assistance getting to the venue? You may drive your car up to the entrance to drop off anyone who has difficulty walking the distance, then return to the designated parking area.",
    openMap: "Get directions",
    countdown: "✦ COUNTING EVERY BREATH ✦",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    dressLabel:  "✦ THE DRESS CODE ✦",
    dressTitle: "Dress to celebrate",
    dressText:
      "A Soirée to Remember. Gentlemen are kindly requested to wear suits, and ladies are invited to dress in elegant evening attire.",
    photosLabel: "✦ CAPTURE THE MOMENTS ✦",
    uploadTitle: "Share your photos",
    uploadText:
      "Help us keep every special moment. Take photos throughout the celebration and share them with us using the link below.",
    uploadButton: "Share your photos",
    guestbookLabel: "✦ A NOTE FROM YOU ✦",
    guestbookTitle: "Leave a little love",
    guestbookText:
      "Leave us a wish, a note, or a few kind words. Your messages will become part of our wedding memories.",
    guestbookButton: "Write in our guestbook",
    calendar: "Add to Google Calendar",
    footer: "A day to remember. A love to last forever.",
    noLink: "This link will be added soon.",


    messageLabel: "✦ A MESSAGE FROM THE HEART ✦",
messageTitle: "Written in the Stars",
messageParagraph1:
  "With joy and sincere pleasure, we invite you to join us in celebrating a special beginning. As two lives come together in love and commitment, this evening marks the start of a beautiful journey shared side by side.",
messageParagraph2:
  "Surrounded by those who matter most, we gather to honour this moment and create memories to be cherished. Your presence will truly add to the elegance and warmth of this occasion.",
messageClosing: "With all our love",
messageSignature: "The Families of Ibrahim & Karen",
  },

  ar: {
    eyebrow: "✦ دعوة مميزة ✦",
    envelopeHint: "دعوة صغيرة لكم",
    openInvitation: "افتحوا الدعوة",
    invite: "يسعدنا دعوتكم للاحتفال بزفافنا",
    welcomeTitle: "نتمنى أن تحتفلوا معنا",
    welcomeText:
      "يوم مميز وبداية جميلة، تكتمل بوجود الأشخاص الذين يجعلون كل لحظة أجمل. نتطلع للاحتفال معكم.",
    whenWhereLabel: "✦ يوم الزفاف ✦",
    whenWhereTitle: "الموعد والمكان",
    date: "الجمعة، ١ يناير ٢٠٢٧",
    time: "الساعة الخامسة مساءً",
    venue: "Madar Venue",
    venueAddress: "فندق توليب جاردنز — كمبوند جاردينيا",
    arrivalTitle: "دليل الوصول إلى مكان الحفل",
    arrivalText:
      "شاهدوا فيديو الوصول، ثم اضغطوا على زر الاتجاهات للوصول إلى مكان الحفل.",
      arrivalNote: "لو في حد من الضيوف عنده صعوبة في المشي لمسافة طويلة، ممكن تدخلوا بالعربية لحد مدخل القاعة وتنزّلوه، وبعدها ترجعوا تركنوا العربية في المكان المخصص للانتظار.",
    openMap: "الاتجاهات إلى مكان الحفل",
    countdown: "✦ حتى نحتفل معًا ✦",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    dressLabel: "✦ الزي المناسب ✦",
    dressTitle: "استعدوا للاحتفال",
    dressText: "لأمسية لا تُنسى. يُرجى من السادة ارتداء البدلات الرسمية، ومن السيدات اختيار فساتين سهرة أنيقة.",
    photosLabel: "✦ احتفظوا باللحظات ✦",
    uploadTitle: "شاركونا صوركم",
    uploadText:
      "ساعدونا في الاحتفاظ بكل لحظة جميلة. التقطوا صوركم طوال الاحتفال وشاركونا إياها من خلال الرابط بالأسفل.",
    uploadButton: "شاركوا صوركم",
    guestbookLabel: "✦ رسالة منكم ✦",
    guestbookTitle: "اتركوا لنا رسالة حب",
    guestbookText:
      "اتركوا لنا أمنية أو رسالة أو كلمات جميلة. ستصبح رسائلكم جزءًا من ذكريات زفافنا.",
    guestbookButton: "اكتبوا في دفتر الأمنيات",
    calendar: "أضيفوا الموعد إلى التقويم",
    footer: "يوم من الذكريات، وحب يدوم للأبد.",
    noLink: "سيتم إضافة الرابط قريبًا.",


    messageLabel: "✦ رسالة من القلب ✦",
messageTitle: "كأنها حكاية كُتبت في النجوم",
messageParagraph1:
  "بكل فرحة وسعادة، ندعوكم لمشاركتنا الاحتفال ببداية مميزة. فمع اجتماع قلبين على الحب والوفاء، تبدأ في هذه الليلة رحلة جميلة يسيران فيها معًا جنبًا إلى جنب.",
messageParagraph2:
  "وبين أحبائنا وأقرب الناس إلى قلوبنا، نجتمع لنحتفل بهذه اللحظة ونصنع ذكريات تبقى معنا للأبد. وجودكم سيضيف إلى هذه المناسبة المزيد من الدفء والجمال.",
messageClosing: "بكل الحب",
messageSignature: "عائلتا إبراهيم وكارن",
  },
};

const weddingDate = new Date("2027-01-01T17:00:00+02:00").getTime();

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
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
      {/* ENTRANCE — kept as you provided it */}
      {!opened && (
        <section className={`opening-screen ${opening ? "is-opening" : ""}`}>
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
          </button>

          <p className="tap-note">01 — 01 — 2027</p>
        </section>
      )}

      {/* NAVIGATION */}
      <header className="topbar">
        <a className="brand brand-logo" href="#home" aria-label="Home">
          <img
            src="/initials-seal.png"
            alt="Ibrahim and Karen initials"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </a>

        <nav>
          <a href="#home">{isArabic ? "الرئيسية" : "HOME"}</a>
          <a href="#when-where">{isArabic ? "الموعد والمكان" : "WHEN & WHERE"}</a>
          <a href="#countdown">{isArabic ? "العد التنازلي" : "COUNTDOWN"}</a>
          <a href="#dress-code">{isArabic ? "الزي المناسب" : "DRESS CODE"}</a>
          <a href="#share-photos">{isArabic ? "الصور" : "PHOTOS"}</a>
          <a href="#guestbook">{isArabic ? "دفتر الأمنيات" : "GUESTBOOK"}</a>
        </nav>

        <button
          className="language-button"
          onClick={() => setLanguage(isArabic ? "en" : "ar")}
        >
          {isArabic ? "English" : "العربية"}
        </button>
      </header>

      {/* SECTION 1 — HERO */}
      <section id="home" className="hero section-enter">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />

        <p className="eyebrow">{t.eyebrow}</p>
       <p className="hero-intro">
  <em>{t.invite}</em>
</p>

<div className="section-light-ray">
  <span></span>
  <i>✧</i>
  <span></span>
</div>

        <h1 className={`hero-names ${isArabic ? "arabic-names" : ""}`}>
          <span>{isArabic ? "إبراهيم" : "Ibrahim"}</span>
          <i>&</i>
          <span>{isArabic ? "كارن" : "Karen"}</span>
        </h1>

        <div className="hero-rule">
          <span>✦</span>
        </div>

        <p className="hero-date">
  <em>{t.date}</em>
</p>
        <p className="hero-time">{t.time}</p>

        <a href="#invitation-message" className="scroll-cue">
          <span />
          {isArabic ? "اكتشفوا دعوتنا" : "SCROLL TO DISCOVER"}
        </a>
      </section>

{/* SECTION 2 — INVITATION MESSAGE */}
<section
  id="invitation-message"
  className="invitation-message-section"
>
  <div className="heart-message-container">

    <p className="heart-message-label">
      {t.messageLabel}
    </p>

    <h2 className="heart-message-title">
      <em>{t.messageTitle}</em>
    </h2>

    <div className="section-light-ray">
      <span></span>
      <i>✧</i>
      <span></span>
    </div>

    <div className="heart-message-box">
      <span className="opening-quote">“</span>

      <p>{t.messageParagraph1}</p>

      <div className="heart-inner-ray">
        <span></span>
        <i>✧</i>
        <span></span>
      </div>

      <p>{t.messageParagraph2}</p>

      <span className="closing-quote">”</span>
    </div>

    <div className="heart-message-ending">
      <p className="heart-closing">
        {t.messageClosing}
      </p>

      <p className="heart-signature">
        {t.messageSignature}
      </p>
    </div>

  </div>
</section>

      {/* SECTION 3 — WHEN & WHERE + ARRIVAL VIDEO */}
<section id="when-where" className="when-where-section">
  <p className="eyebrow">{t.whenWhereLabel}</p>

  <h2 className="section-title">
    <em>{t.whenWhereTitle}</em>
  </h2>

  <div className="when-where-details">
    <div className="when-where-detail">
      <span className="detail-icon">✦</span>
      <h3>
        <em>{t.date}</em>
      </h3>
      <p>{t.time}</p>
    </div>

    <div className="detail-separator" />

    <div className="when-where-detail">
      <span className="detail-icon">⌖</span>
      <h3>
        <em>{t.venue}</em>
      </h3>
      <p>{t.venueAddress}</p>
    </div>
  </div>

  <div className="arrival-heading">
    <h3>
      <em>{t.arrivalTitle}</em>
    </h3>
    <p>{t.arrivalText}</p>
  </div>

        <div className="arrival-guide-card">
          <div className="arrival-video-wrap">
            <video
              className="arrival-video"
              controls
              playsInline
              preload="metadata"
              poster="/arrival-guide-poster.jpg"
            >
              <source src={SETTINGS.arrivalVideo} type="video/mp4" />
              {isArabic
                ? "متصفحكم لا يدعم تشغيل الفيديو."
                : "Your browser does not support this video."}
            </video>
          </div>

          <div className="arrival-guide-footer">
            <div>
              <span className="arrival-guide-kicker">
                {isArabic ? "موقع الحفل" : "WEDDING LOCATION"}
              </span>
              <h3>{t.venue}</h3>
              <p>{t.venueAddress}</p>
            </div>

            <button
              className="outline-button"
              onClick={() => openLink(SETTINGS.mapsLink)}
            >
              {t.openMap}
            </button>
          </div>
        </div>
<div className="arrival-info-box">
  <p>{t.arrivalNote}</p>
</div>
        <a
          className="calendar-link"
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            "Ibrahim & Karen Wedding"
          )}&dates=20270101T170000/20270101T210000&ctz=Africa/Cairo&details=${encodeURIComponent(
            "Celebrate Ibrahim and Karen's wedding at Madar Venue, Tolip Gardens Hotel, Gardenia Compound."
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          + {t.calendar}
        </a>
      </section>

      {/* SECTION 4 — COUNTDOWN */}
      <section id="countdown" className="countdown-section">
        <p className="eyebrow">{t.countdown}</p>
        <h2 className="countdown-heading">
          <em>
    {isArabic ? "الوقت يقترب..." : "Until we celebrate"}
  </em>
        </h2>
<div className="countdown-ray">
  <span></span>
  <i>✧</i>
  <span></span>
</div>
        <div className="countdown">
          {countdown.map(([value, label]) => (
            <div className="countdown-item" key={label}>
              <span>{String(value).padStart(2, "0")}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="countdown-flourish">✦</div>
      </section>

      {/* SECTION 5 — DRESS CODE */}
      <section id="dress-code" className="dress-code-section">
        <p className="eyebrow">{t.dressLabel}</p>
        <div className="dress-code-icon">✧</div>
        <h2><em>{t.dressTitle}</em></h2>
<div className="section-light-ray">
  <span></span>
  <i>✧</i>
  <span></span>
</div>
        <p>{t.dressText}</p>
        <div className="dress-code-line" />
      </section>

      {/* SECTION 6 — SHARE PHOTOS */}
      <section id="share-photos" className="share-photos-section">
        <p className="eyebrow">{t.photosLabel}</p>
        <div className="memory-symbol">♡</div>
        <h2><em>{t.uploadTitle}</em></h2>
<div className="section-light-ray">
  <span></span>
  <i>✧</i>
  <span></span>
</div>
        <p>{t.uploadText}</p>
        <button
          className="light-button"
          onClick={() => openLink(SETTINGS.photoUploadForm)}
        >
          {t.uploadButton}
        </button>
      </section>

      {/* SECTION 7 — GUESTBOOK */}
      <section id="guestbook" className="guestbook-section">
        <p className="eyebrow">{t.guestbookLabel}</p>
        <div className="memory-symbol">✉</div>
        <h2><em>{t.guestbookTitle}</em></h2>
<div className="section-light-ray">
  <span></span>
  <i>✧</i>
  <span></span>
</div>
        <p>{t.guestbookText}</p>
        <button
          className="outline-button"
          onClick={() => openLink(SETTINGS.guestbookForm)}
        >
          {t.guestbookButton}
        </button>
      </section>

      {/* FOOTER */}
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