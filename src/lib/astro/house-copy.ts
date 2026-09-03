/**
 * House copy: traditional Lilly topics in plain complete sentences.
 * English is the source. Authored simple Persian is seeded so house
 * text is not left to a free translator. Every computed sentence in
 * report.ts names a real longitude, cusp, lord or occupant.
 */
export type Pair = string;

const FA: Record<string, string> = {};

function pair(en: string, fa: string): Pair {
  if (en && fa) FA[en] = fa;
  return en;
}

export function seededHouseFa(): Record<string, string> {
  return { ...FA };
}

export const SIGN_FA_NAME: Record<string, string> = {
  Aries: "حمل",
  Taurus: "ثور",
  Gemini: "جوزا",
  Cancer: "سرطان",
  Leo: "اسد",
  Virgo: "سنبله",
  Libra: "میزان",
  Scorpio: "عقرب",
  Sagittarius: "قوس",
  Capricorn: "جدی",
  Aquarius: "دلو",
  Pisces: "حوت",
};

export const PLANET_FA_NAME: Record<string, string> = {
  SUN: "خورشید",
  MOON: "ماه",
  MERCURY: "عطارد",
  VENUS: "زهره",
  MARS: "مریخ",
  JUPITER: "مشتری",
  SATURN: "زحل",
  URANUS: "اورانوس",
  NEPTUNE: "نپتون",
  PLUTO: "پلوتو",
};

export const DIGNITY_FA_NAME: Record<string, string> = {
  domicile: "منزل؛ یعنی سیاره در برج خودش است",
  exaltation: "شرف؛ یعنی سیاره در جای اوج سنتی است",
  detriment: "وبال؛ یعنی سیاره روبه‌روی برج خودش است و کارش سخت‌تر است",
  fall: "هبوط؛ یعنی سیاره روبه‌روی جای اوج است و کارش ضعیف‌تر است",
  peregrine: "آواره؛ یعنی سیاره میهمان است و در منزل یا شرف یا وبال یا هبوط نیست",
};

export const DIGNITY_EN_NAME: Record<string, string> = {
  domicile: "domicile (the planet is in the sign it rules)",
  exaltation: "exaltation (the planet is in its traditional peak sign)",
  detriment: "detriment (the planet is opposite the sign it rules, so the job is harder)",
  fall: "fall (the planet is opposite its peak sign, so the job is weaker)",
  peregrine: "peregrine (a guest: not in domicile, exaltation, detriment or fall)",
};

/** One everyday phrase for the planet’s traditional job. */
export const PLANET_JOB_EN: Record<string, string> = {
  SUN: "identity and life force (who you are)",
  MOON: "feelings, habits, and what makes you feel safe",
  MERCURY: "thinking, talking, learning, and short trips",
  VENUS: "love, taste, money, and what you like",
  MARS: "action, anger, desire, and how you fight or start work",
  JUPITER: "growth, luck, belief, and making a life bigger",
  SATURN: "limits, time, duty, and the hard lesson",
  URANUS: "sudden change, freedom, and breaking a rule",
  NEPTUNE: "dreams, fog, compassion, and things that are not clear",
  PLUTO: "power, deep change, and what sits under the surface",
};

export const PLANET_JOB_FA: Record<string, string> = {
  SUN: "هویت و نیروی زندگی (شما که هستید)",
  MOON: "احساس، عادت، و آنچه آدم را آرام می‌کند",
  MERCURY: "فکر کردن، حرف زدن، یاد گرفتن، و رفت‌وآمد نزدیک",
  VENUS: "عشق، سلیقه، پول، و آنچه دوست دارید",
  MARS: "عمل، خشم، میل، و شیوه جنگ یا شروع کار",
  JUPITER: "رشد، شانس، باور، و بزرگ کردن زندگی",
  SATURN: "حد، زمان، وظیفه، و درس سخت",
  URANUS: "تغییر ناگهانی، آزادی، و شکستن قاعده",
  NEPTUNE: "رؤیا، مه، دلسوزی، و چیزهای نامشخص",
  PLUTO: "قدرت، تغییر عمیق، و آنچه زیر سطح است",
};

/** Short topic, used inside calculated sentences. */
export const HOUSE_SHORT_EN: Record<number, string> = {
  1: "the body, the face, and first impressions",
  2: "your own money, food, and belongings",
  3: "speech, siblings, neighbours, and short trips",
  4: "home, family roots, and the private base",
  5: "children, romance, play, and making things for joy",
  6: "daily work, service, and ordinary care of the body",
  7: "marriage, partners, contracts, and the other person",
  8: "shared money, inheritance, debt, and deep crisis",
  9: "long travel, study, religion, law, and meaning",
  10: "public work, rank, career, and reputation",
  11: "friends, groups, allies, and hopes",
  12: "solitude, the hidden, rest, and unnamed service",
};

export const HOUSE_SHORT_FA: Record<number, string> = {
  1: "بدن، قیافه و برخورد اول",
  2: "پول خودتان، خوراک و مال خودتان",
  3: "حرف، خواهر و برادر، همسایه و سفر کوتاه",
  4: "خانه، ریشه خانواده و پایه خصوصی",
  5: "فرزند، عشق، بازی و ساختن برای شادی",
  6: "کار روزانه، خدمت و مراقبت معمولی از بدن",
  7: "ازدواج، شریک، قرارداد و طرف مقابل",
  8: "پول مشترک، ارث، بدهی و بحران عمیق",
  9: "سفر دور، درس، دین، قانون و معنا",
  10: "کار عمومی، رتبه، شغل و آبرو",
  11: "دوست، گروه، هم‌پیمان و امید",
  12: "تنهایی، امور پنهان، استراحت و خدمت بی‌نام",
};

/** Ptolemy natural houses — not a personality claim, a traditional link. */
export const NATURAL_HOUSES: Record<string, number[]> = {
  SUN: [5],
  MOON: [4],
  MERCURY: [3, 6],
  VENUS: [2, 7],
  MARS: [1],
  JUPITER: [9, 12],
  SATURN: [10, 11],
  URANUS: [11],
  NEPTUNE: [12],
  PLUTO: [8],
};

export const HOUSE_UI_LEAD = pair(
  "Each house below is a calculated slice of the sky from this birth time and place. First you get the traditional topic in plain language. Then you get the exact cusp, the planet that rules that cusp, and which planets sit inside. Nothing is invented for drama.",
  "هر خانه پایین یک برش حساب‌شده از آسمان است، از روی همین ساعت و محل تولد. اول موضوع سنتی خانه به زبان ساده می‌آید. بعد درجه دقیق شروع خانه، سیاره‌ای که آن برج را اداره می‌کند، و سیاره‌هایی که داخل خانه‌اند. برای نمایش چیزی ساخته نمی‌شود.",
);

export const HOUSE_SECTION_INTRO = pair(
  "The twelve houses are twelve areas of life. They are cut from the sky using this birth time and this birth place. The text below only uses those calculated positions plus the old traditional meaning of each house. It is not a medical, legal or money forecast, and it does not invent a story about this person.",
  "دوازده خانه یعنی دوازده بخش زندگی. این خانه‌ها با ساعت تولد و محل تولد از آسمان بریده می‌شوند. متن پایین فقط از همین موقعیت‌های حساب‌شده استفاده می‌کند، به‌اضافه معنی سنتی هر خانه. پیش‌بینی پزشکی، حقوقی یا مالی نیست و داستان ساختگی درباره این آدم نمی‌سازد.",
);

export const HOUSE_LORD_INTRO = pair(
  "In William Lilly’s method, the topic of a house is read from the planet that rules the sign on the house cusp. Where that planet sits, and how strong it is, tells you how the topic works. An empty house does not mean the topic is missing. It means you read it from the ruling planet.",
  "در روش ویلیام لیلی، موضوع هر خانه از سیاره‌ای خوانده می‌شود که حاکمِ برجِ شروع آن خانه است. آن سیاره کجا نشسته و چقدر قوی است، می‌گوید موضوع خانه چطور کار می‌کند. خالی بودن خانه موضوع را حذف نمی‌کند. موضوع را از سیاره حاکم می‌خوانید.",
);

export const HOUSE_KIND: Record<"angular" | "succedent" | "cadent", Pair> = {
  angular: pair(
    "This is an angular house (houses 1, 4, 7 and 10). Traditional astrology treats angular houses as the strongest. Topics here show up clearly and early in life.",
    "این یک خانه زاویه‌ای است (خانه‌های ۱، ۴، ۷ و ۱۰). ستاره‌شناسی سنتی این خانه‌ها را از همه قوی‌تر می‌داند. موضوع این خانه‌ها در زندگی واضح‌تر و زودتر دیده می‌شود.",
  ),
  succedent: pair(
    "This is a succedent house (houses 2, 5, 8 and 11). Traditional astrology treats these as supporting houses. They hold resources and things that last, rather than the first action.",
    "این یک خانه پشتیبان است (خانه‌های ۲، ۵، ۸ و ۱۱). ستاره‌شناسی سنتی این‌ها را خانه‌های نگهدارنده می‌داند. منبع و چیزهای ماندگار را نگه می‌دارند، نه اولین حرکت را.",
  ),
  cadent: pair(
    "This is a cadent house (houses 3, 6, 9 and 12). Traditional astrology treats these as quieter for outer events. They are more about movement, work, study, and what happens off-stage.",
    "این یک خانه افتاده است (خانه‌های ۳، ۶، ۹ و ۱۲). ستاره‌شناسی سنتی این‌ها را برای رویداد بیرونی آرام‌تر می‌داند. بیشتر درباره حرکت، کار، درس، و چیزهایی هستند که پشت صحنه می‌افتند.",
  ),
};

export function houseKindKey(n: number): "angular" | "succedent" | "cadent" {
  if (n === 1 || n === 4 || n === 7 || n === 10) return "angular";
  if (n === 2 || n === 5 || n === 8 || n === 11) return "succedent";
  return "cadent";
}

export const SIGN_PLAIN: Record<string, Pair> = {
  Aries: pair(
    "Aries is a fire sign. Traditional astrology links it to starting things, courage, and acting first.",
    "حمل یک برج آتش است. ستاره‌شناسی سنتی آن را به شروع کار، شجاعت و جلو افتادن ربط می‌دهد.",
  ),
  Taurus: pair(
    "Taurus is an earth sign. Traditional astrology links it to stability, the body, money, and what you can touch.",
    "ثور یک برج خاک است. ستاره‌شناسی سنتی آن را به ثبات، بدن، پول و چیزهایی که می‌شود لمس کرد ربط می‌دهد.",
  ),
  Gemini: pair(
    "Gemini is an air sign. Traditional astrology links it to speech, learning, siblings, and a mind that moves.",
    "جوزا یک برج هوا است. ستاره‌شناسی سنتی آن را به حرف، یادگیری، خواهر و برادر، و ذهنی که حرکت می‌کند ربط می‌دهد.",
  ),
  Cancer: pair(
    "Cancer is a water sign. Traditional astrology links it to home, family, care, and protecting what is close.",
    "سرطان یک برج آب است. ستاره‌شناسی سنتی آن را به خانه، خانواده، مراقبت و محافظت از چیز نزدیک ربط می‌دهد.",
  ),
  Leo: pair(
    "Leo is a fire sign. Traditional astrology links it to heart, pride, creativity, and being seen.",
    "اسد یک برج آتش است. ستاره‌شناسی سنتی آن را به دل، عزت، ساختن و دیده شدن ربط می‌دهد.",
  ),
  Virgo: pair(
    "Virgo is an earth sign. Traditional astrology links it to craft, detail, service, and fixing what is wrong.",
    "سنبله یک برج خاک است. ستاره‌شناسی سنتی آن را به مهارت، جزئیات، خدمت و درست کردن ایراد ربط می‌دهد.",
  ),
  Libra: pair(
    "Libra is an air sign. Traditional astrology links it to the other person, fairness, beauty, and balance.",
    "میزان یک برج هوا است. ستاره‌شناسی سنتی آن را به طرف مقابل، انصاف، زیبایی و تعادل ربط می‌دهد.",
  ),
  Scorpio: pair(
    "Scorpio is a water sign. Traditional astrology links it to depth, crisis, shared things, and not staying on the surface.",
    "عقرب یک برج آب است. ستاره‌شناسی سنتی آن را به عمق، بحران، امور مشترک و نماندن روی سطح ربط می‌دهد.",
  ),
  Sagittarius: pair(
    "Sagittarius is a fire sign. Traditional astrology links it to meaning, travel, teaching, and a wide horizon.",
    "قوس یک برج آتش است. ستاره‌شناسی سنتی آن را به معنا، سفر، آموزش و افق باز ربط می‌دهد.",
  ),
  Capricorn: pair(
    "Capricorn is an earth sign. Traditional astrology links it to time, duty, structure, and building something that lasts.",
    "جدی یک برج خاک است. ستاره‌شناسی سنتی آن را به زمان، وظیفه، ساختار و ساختن چیز ماندگار ربط می‌دهد.",
  ),
  Aquarius: pair(
    "Aquarius is an air sign. Traditional astrology links it to groups, principles, and standing a little apart.",
    "دلو یک برج هوا است. ستاره‌شناسی سنتی آن را به گروه، اصل و کمی کنار ایستادن ربط می‌دهد.",
  ),
  Pisces: pair(
    "Pisces is a water sign. Traditional astrology links it to empathy, images, faith, and thin borders.",
    "حوت یک برج آب است. ستاره‌شناسی سنتی آن را به همدلی، تصویر، ایمان و مرز نازک ربط می‌دهد.",
  ),
};

/** Long, colloquial, complete-sentence house themes. Lilly topics only. */
export const HOUSE_THEME: Record<number, Pair> = {
  1: pair(
    "House 1 is the first area of life. Traditional Western astrology uses it for the body, the face, the manner, and the first impression you make. It is calculated from the eastern horizon at the exact time of birth — the degree that was rising in that place. House 1 is not the whole personality. It is only the front door of the chart: how life starts, and how other people first meet you. A planet sitting in house 1 shows up in appearance and in the way you begin things.",
    "خانه ۱ اولین بخش زندگی در نقشه است. ستاره‌شناسی سنتی غرب این خانه را برای بدن، قیافه، رفتار، و همان برخورد اولی که مردم با شما دارند به کار می‌برد. این خانه از افق شرقی در همان لحظه تولد حساب می‌شود؛ یعنی همان درجه‌ای که در آن محل داشت از زیر زمین بالا می‌آمد. خانه ۱ کل شخصیت شما نیست. فقط درِ ورودی نقشه است: زندگی از کجا شروع می‌شود، و مردم اول شما را چطور می‌بینند. اگر سیاره‌ای در خانه ۱ نشسته باشد، اثرش روی ظاهر و روی شروع کارها دیده می‌شود.",
  ),
  2: pair(
    "House 2 is about money you earn yourself, food, belongings, and the value you put on your own work. Traditional astrology calls this the house of substance. This is not a bank forecast, and it is not other people’s money. It is what you can hold and call your own. A planet in house 2 describes how you make a living and how you treat what you own. Nothing here says you will be rich or poor. It only names the life-area of personal resources.",
    "خانه ۲ درباره پولی است که خودتان درمی‌آورید، خوراک، مال خودتان، و ارزشی که برای کار خودتان قائلید. ستاره‌شناسی سنتی به این خانه می‌گوید خانه دارایی. این یک پیش‌بینی بانکی نیست و پول دیگران هم نیست. یعنی چیزهایی که می‌توانید در دست بگیرید و مال خودتان بنامید. سیاره در خانه ۲ می‌گوید نان را چطور درمی‌آورید و با مال خودتان چطور رفتار می‌کنید. اینجا گفته نمی‌شود پولدار می‌شوید یا فقیر. فقط بخش زندگی مربوط به دارایی شخصی را نام می‌برد.",
  ),
  3: pair(
    "House 3 is about speech, writing, brothers and sisters, neighbours, and short trips. Traditional astrology also puts early learning and the everyday mind here. This is the house of the street next door, not of a far country. A planet in house 3 shows up in how you talk, how you learn nearby things, and how you deal with siblings and neighbours. The reading follows the calculated placement. It does not invent family drama.",
    "خانه ۳ درباره حرف، نوشتن، خواهر و برادر، همسایه، و سفر کوتاه است. ستاره‌شناسی سنتی یادگیری اول و ذهن روزمره را هم اینجا می‌گذارد. این خانه کوچه بغلی است، نه کشور دور. سیاره در خانه ۳ در حرف زدن، یاد گرفتن چیزهای نزدیک، و رفتار با خواهر و برادر و همسایه دیده می‌شود. خوانش از روی جای حساب‌شده است. داستان خانوادگی نمی‌سازد.",
  ),
  4: pair(
    "House 4 is about home, family roots, land, and the end of a matter. In the old books it is also the house of one parent, classically the father. It sits at the bottom of the chart, the midnight point, the foundation. Traditional astrology reads it as where you come from and where you return. A planet in house 4 shows up in private life, family, and the base you stand on. This is not a promise about buying a house. It names the life-area of roots.",
    "خانه ۴ درباره خانه، ریشه خانواده، زمین، و پایان کار است. در کتاب‌های قدیم خانه یکی از پدر و مادر هم هست؛ در سنت کلاسیک معمولاً پدر. این خانه پایین نقشه است، نقطه نیمه‌شب، پایه. ستاره‌شناسی سنتی آن را جایی می‌خواند که از آن آمده‌اید و به آن برمی‌گردید. سیاره در خانه ۴ در زندگی خصوصی، خانواده، و پایه‌ای که روی آن ایستاده‌اید دیده می‌شود. این وعده خرید خانه نیست. فقط بخش زندگی مربوط به ریشه را نام می‌برد.",
  ),
  5: pair(
    "House 5 is about children, love affairs, play, art, and taking a risk for pleasure. Traditional astrology also puts creative work here — things you make because you want to, not because you must. It is joy that you produce. A planet in house 5 shows up in romance, making things, and how you have fun. This does not predict the number of children. It names the life-area of creation and pleasure.",
    "خانه ۵ درباره فرزند، رابطه عاشقانه، بازی، هنر، و ریسک برای لذت است. ستاره‌شناسی سنتی کار خلاق را هم اینجا می‌گذارد — چیزهایی که می‌سازید چون می‌خواهید، نه چون مجبورید. شادی‌ای است که خودتان درست می‌کنید. سیاره در خانه ۵ در عشق، ساختن، و خوش گذراندن دیده می‌شود. تعداد فرزند را پیش‌بینی نمی‌کند. فقط بخش زندگی مربوط به ساختن و لذت را نام می‌برد.",
  ),
  6: pair(
    "House 6 is about daily work, service, small duties, employees, and the ordinary health of the body. Traditional astrology links illness and craft to this house. This is not a medical diagnosis and not medical advice. It only names the life-area of routine work and the body that does that work. A planet in house 6 shows up in usefulness, habit, and care of the body.",
    "خانه ۶ درباره کار روزانه، خدمت، وظیفه‌های کوچک، کارمند، و سلامت معمولی بدن است. ستاره‌شناسی سنتی بیماری و پیشه را به این خانه ربط می‌دهد. این تشخیص پزشکی نیست و توصیه پزشکی هم نیست. فقط بخش زندگی مربوط به کار روزمره و بدنی که آن کار را می‌کند نام می‌برد. سیاره در خانه ۶ در مفید بودن، عادت، و مراقبت از بدن دیده می‌شود.",
  ),
  7: pair(
    "House 7 is about the other person: marriage, a business partner, an open contract, and an open opponent. It sits opposite house 1. Traditional astrology reads the spouse and the public ‘you’ here. A planet in house 7 shows up in one-to-one relationships and in deals you sign. This is not a promise that you will marry, and not legal advice. It names the life-area of the other.",
    "خانه ۷ درباره طرف مقابل است: ازدواج، شریک کاری، قرارداد آشکار، و رقیب آشکار. روبه‌روی خانه ۱ نشسته است. ستاره‌شناسی سنتی همسر و «شما»ی عمومی را اینجا می‌خواند. سیاره در خانه ۷ در رابطه یک‌به‌یک و در معامله‌هایی که امضا می‌کنید دیده می‌شود. وعده ازدواج نیست و توصیه حقوقی هم نیست. فقط بخش زندگی مربوط به دیگری را نام می‌برد.",
  ),
  8: pair(
    "House 8 is about shared money, inheritance, debt, tax, sex as fusion, and crisis that changes you. Traditional astrology also puts other people’s resources here, and the old subject of death and return. This is not a prediction of death. It names the life-area where what is yours meets what belongs to someone else. A planet in house 8 shows up in joint money, deep bonds, and hard turning points.",
    "خانه ۸ درباره پول مشترک، ارث، بدهی، مالیات، رابطه جنسی به‌عنوان درآمیختن، و بحرانی است که آدم را عوض می‌کند. ستاره‌شناسی سنتی مال دیگران را هم اینجا می‌گذارد، و موضوع قدیم مرگ و بازگشت را. این پیش‌بینی مرگ نیست. بخش زندگی را نام می‌برد که مال شما به مال دیگری می‌رسد. سیاره در خانه ۸ در پول مشترک، پیوند عمیق، و پیچ سخت دیده می‌شود.",
  ),
  9: pair(
    "House 9 is about long travel, higher study, religion, law, publishing, and the search for meaning. Traditional astrology puts the teacher and foreign places here. It is the far road, not the street next door. A planet in house 9 shows up in belief, study, and journeys that change the mind. This does not say you will emigrate. It names the life-area of meaning and distance.",
    "خانه ۹ درباره سفر دور، درس بالاتر، دین، قانون، نشر، و جستجوی معنا است. ستاره‌شناسی سنتی معلم و جای دور را اینجا می‌گذارد. جاده دور است، نه کوچه بغلی. سیاره در خانه ۹ در باور، درس، و سفرهایی که ذهن را عوض می‌کنند دیده می‌شود. نمی‌گوید مهاجرت می‌کنید. فقط بخش زندگی مربوط به معنا و دوری را نام می‌برد.",
  ),
  10: pair(
    "House 10 is about public work, rank, reputation, and the career the world sees. It is the Midheaven, the highest point of the chart, calculated from birth time and place. Traditional astrology also puts authority here, and in later tradition often the mother. A planet in house 10 shows up in the job title and in how you are known in public. This is not a career guarantee. It names the life-area of visible work.",
    "خانه ۱۰ درباره کار عمومی، رتبه، آبرو، و شغلی است که دنیا می‌بیند. این وسط‌السماء است، بالاترین نقطه نقشه، که از ساعت و محل تولد حساب می‌شود. ستاره‌شناسی سنتی قدرت رسمی را هم اینجا می‌گذارد، و در سنت بعدی اغلب مادر را. سیاره در خانه ۱۰ در عنوان شغلی و در اینکه در جمع چطور شناخته می‌شوید دیده می‌شود. ضمانت شغل نیست. فقط بخش زندگی مربوط به کار دیده را نام می‌برد.",
  ),
  11: pair(
    "House 11 is about friends, groups, allies, hopes, and help from people who are not family. Traditional astrology calls it the house of the good spirit: hopes that can come true through others. A planet in house 11 shows up in friendship, networks, and the future you aim at. This does not count your friends. It names the life-area of chosen company.",
    "خانه ۱۱ درباره دوست، گروه، هم‌پیمان، امید، و کمکی است که از آدم‌هایی غیر از خانواده می‌رسد. ستاره‌شناسی سنتی به آن می‌گوید خانه روح خوب: امیدهایی که از راه دیگران ممکن است درست شوند. سیاره در خانه ۱۱ در دوستی، جمع، و آینده‌ای که به آن چشم دارید دیده می‌شود. تعداد دوست را نمی‌شمارد. فقط بخش زندگی مربوط به جمع انتخابی را نام می‌برد.",
  ),
  12: pair(
    "House 12 is about what is hidden: solitude, sleep, hospitals, prisons, secret enemies, and service that has no name on the door. Traditional astrology also puts self-undoing and behind-the-scenes work here. It is not a curse. It is the part of life that happens off-stage. A planet in house 12 shows up in private struggle, rest, and help that is not advertised. This is not a diagnosis.",
    "خانه ۱۲ درباره چیز پنهان است: تنهایی، خواب، بیمارستان، زندان، دشمن پنهان، و خدمتی که روی در نام ندارد. ستاره‌شناسی سنتی آسیب به دست خود و کار پشت صحنه را هم اینجا می‌گذارد. نفرین نیست. همان بخش زندگی است که پشت صحنه می‌افتد. سیاره در خانه ۱۲ در کشمکش خصوصی، استراحت، و کمکی که تبلیغ نمی‌شود دیده می‌شود. تشخیص بیماری نیست.",
  ),
};

export const EMPTY_HOUSE = pair(
  "No classical planet sits inside this house on this chart. That is a calculated fact, not a judgement. Traditional astrology does not treat an empty house as unimportant. The topic is still read from the planet that rules the sign on the cusp, and from transits that later cross this house.",
  "در این نقشه هیچ سیاره کلاسیکی داخل این خانه ننشسته است. این یک واقعیت حساب‌شده است، نه قضاوت. ستاره‌شناسی سنتی خانه خالی را بی‌اهمیت نمی‌داند. موضوع خانه همچنان از سیاره حاکمِ برجِ شروع خانه خوانده می‌شود، و از گذرهایی که بعداً از این خانه رد می‌شوند.",
);

export const OCCUPIED_LEAD = pair(
  "These classical planets actually sit inside this house on this chart. Each one is a calculated longitude, not a symbol placed by hand. The planet’s job happens in this area of life.",
  "این سیاره‌های کلاسیک واقعاً داخل این خانه روی این نقشه نشسته‌اند. هر کدام یک طول دایرةالبروج حساب‌شده است، نه نمادی که با دست گذاشته باشند. کار آن سیاره در همین بخش زندگی دیده می‌شود.",
);

/** Seed job/short phrases so Google is not needed for those keys. */
void [
  pair(PLANET_JOB_EN.SUN!, PLANET_JOB_FA.SUN!),
  pair(PLANET_JOB_EN.MOON!, PLANET_JOB_FA.MOON!),
  pair(PLANET_JOB_EN.MERCURY!, PLANET_JOB_FA.MERCURY!),
  pair(PLANET_JOB_EN.VENUS!, PLANET_JOB_FA.VENUS!),
  pair(PLANET_JOB_EN.MARS!, PLANET_JOB_FA.MARS!),
  pair(PLANET_JOB_EN.JUPITER!, PLANET_JOB_FA.JUPITER!),
  pair(PLANET_JOB_EN.SATURN!, PLANET_JOB_FA.SATURN!),
  pair(PLANET_JOB_EN.URANUS!, PLANET_JOB_FA.URANUS!),
  pair(PLANET_JOB_EN.NEPTUNE!, PLANET_JOB_FA.NEPTUNE!),
  pair(PLANET_JOB_EN.PLUTO!, PLANET_JOB_FA.PLUTO!),
  ...Object.keys(HOUSE_SHORT_EN).map((k) =>
    pair(HOUSE_SHORT_EN[Number(k)]!, HOUSE_SHORT_FA[Number(k)]!),
  ),
];

export function locSignName(sign: string, locale: string): string {
  if (locale === "fa") return SIGN_FA_NAME[sign] ?? sign;
  return sign;
}

export function locPlanetName(id: string, locale: string): string {
  const key = id.toUpperCase();
  if (locale === "fa") return PLANET_FA_NAME[key] ?? id;
  const nice = key[0] + key.slice(1).toLowerCase();
  return nice === "Sun" || nice === "Moon" ? nice : nice;
}

export function locDignity(d: string, locale: string): string {
  if (locale === "fa") return DIGNITY_FA_NAME[d] ?? d;
  return DIGNITY_EN_NAME[d] ?? d;
}

export function pickPair(en: string, locale: string): string {
  if (locale === "fa") return FA[en] ?? en;
  return en;
}

export function planetInHousePlain(planet: string, house: number, locale: string): string {
  const id = planet.toUpperCase();
  const p = locPlanetName(id, locale);
  const job = locale === "fa" ? (PLANET_JOB_FA[id] ?? "") : (PLANET_JOB_EN[id] ?? "");
  const topic = locale === "fa" ? (HOUSE_SHORT_FA[house] ?? "") : (HOUSE_SHORT_EN[house] ?? "");
  const natural = NATURAL_HOUSES[id]?.includes(house) ?? false;
  if (locale === "fa") {
    const nat = natural
      ? ` ${p} در یکی از خانه‌های طبیعی خودش است؛ در سنت ستاره‌شناسی این موضوع پررنگ‌تر خوانده می‌شود.`
      : "";
    return `${p} سیارهٔ ${job} است. خانهٔ ${house} بخش زندگی مربوط به ${topic} است. در این نقشه ${p} در خانهٔ ${house} نشسته است. این یک موقعیت حساب‌شده است، نه حدس. پس کار ${p} در همین بخش دیده می‌شود: ${topic}.${nat}`;
  }
  const article = id === "SUN" || id === "MOON" ? "The " : "";
  const nat = natural
    ? ` ${article}${p} is in one of its natural houses, so traditional astrology reads this topic as extra loud.`
    : "";
  return `${article}${p} is the planet of ${job}. House ${house} is the area of life about ${topic}. This chart places ${article.toLowerCase()}${p} in house ${house}. That is a calculated position, not a guess. So the job of ${article.toLowerCase()}${p} shows up in ${topic}.${nat}`;
}
