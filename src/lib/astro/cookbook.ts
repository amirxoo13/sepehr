/**
 * Traditional Western tropical cookbook.
 * Sources: Ptolemy Tetrabiblos I–II (dignities, sect); Lilly Christian Astrology
 * (houses, planets); standard CAE planet-in-sign / planet-in-house / major-aspect
 * correspondences used by Cafe Astrology / Astrodienst free reports.
 * Not generated biography — each paragraph is looked up from THIS chart's
 * computed sign, house and aspect.
 */
export type Bi = string;

export function b(_fa: string, en: string): Bi {
  return en;
}

export const RISING: Record<string, Bi> = {
  Aries: b("طالع حمل: با ابتکار با دنیا ملاقات می کنید. بدن و نحوه رفتار مستقیم، سریع و اول است. هویت بیرونی با کنش تعریف می‌شود تا تدبیر. دیگران ابتدا شما را به عنوان کسی که راه را باز می‌کند ملاقات می کنند.", "Aries rising: you meet the world by initiating. The body and manner tend to be direct, quick, and first. Outer identity is defined by action rather than deliberation. Others first meet you as the one who opens the road."),
  Taurus: b("طالع ثور: دنیا را با ثبات و حواس ملاقات می کنید. حضور آرام، سرسخت و وفادار به آنچه قابل لمس است است. تجربه سرعت دارد.", "Taurus rising: you meet the world through steadiness and the senses. Presence is calm, stubborn, and loyal to what can be touched. Experience is paced."),
  Gemini: b("طالع جوزا: با گفتار با دنیا آشنا می شوید. روش سریع، کنجکاو، دوگانه است. هویت بیرونی در پرسش ها، حرکت و شبکه نزدیک شکل می گیرد.", "Gemini rising: you meet the world through speech. Manner is quick, curious, dual. Outer identity forms in questions, movement, and the near network."),
  Cancer: b("طالع سرطان: با محافظت از جهان ملاقات می کنید. منش پذیرا، حساس به خلق و خوی است. چهره عمومی قبل از بحث توجه نشان می دهد. دیگران ایمنی شما - یا پوست نازک شما - را یکباره می خوانند.", "Cancer rising: you meet the world by protecting. Manner is receptive, mood-sensitive, homeward. The public face shows care before argument. Others read your safety — or your thin skin — at once."),
  Leo: b("طالع اسد: دنیا را با دیده شدن ملاقات می کنی. رفتار گرم، مرکزی، خلاقانه است. هویت بیرونی کرامت و صحنه می‌خواهد.", "Leo rising: you meet the world by being seen. Manner is warm, central, creative. Outer identity asks for dignity and a stage."),
  Virgo: b("طالع سنبله: دنیا را از راه صنعت ملاقات می کنید. روش دقیق، مفید، بازنگری است. دنیا با جزئیات و کار سنجیده می‌شود.", "Virgo rising: you meet the world through craft. Manner is precise, useful, revising. The world is measured in details and work."),
  Libra: b("طالع میزان: دنیا را از طریق دیگری ملاقات می کنید. منش به دنبال تعادل، زیبایی، انصاف است. هویت بیرونی در مشارکت شکل می گیرد.", "Libra rising: you meet the world through the other. Manner seeks balance, beauty, fairness. Outer identity is formed in partnership."),
  Scorpio: b("طالع عقرب: دنیا را با شدت ملاقات می کنید. روش کاوشگر، خصوصی، تسلیم ناپذیر در بحران است. تجربه به لایه زیرین منتقل می‌شود.", "Scorpio rising: you meet the world through intensity. Manner is probing, private, unyielding in crisis. Experience is taken to the underlayer."),
  Sagittarius: b("طالع قوس: دنیا را از طریق معنا ملاقات می کنید. روش باز، جست‌وجوگر، هدف‌دار است. هویت بیرونی به عنوان باور و سفر صحبت می‌کند.", "Sagittarius rising: you meet the world through meaning. Manner is open, questing, far-aimed. Outer identity speaks as belief and travel."),
  Capricorn: b("طالع جدی: جهان را از طریق ساختار ملاقات می کنید. رفتار هوشیار، به موقع، مسئولیت پذیر است. تجربه به عنوان رتبه و دستاورد سنجیده می‌شود.", "Capricorn rising: you meet the world through structure. Manner is sober, timed, responsible. Experience is weighed as rank and achievement."),
  Aquarius: b("طالع دلو: از طریق جمع با جهان ملاقات می‌کنید. رفتار سرد، اصولی و غیرعادی است. هویت بیرونی متعلق به گروه و ایده است.", "Aquarius rising: you meet the world through the collective. Manner is cool, principled, unusual. Outer identity belongs to the group and the idea."),
  Pisces: b("طالع حوت: از طریق نفوذپذیری با دنیا ملاقات می کنید. رفتار همدلانه، خیالی، بی بند و بار است. هویت بیرونی در میدان اطراف حل می‌شود.", "Pisces rising: you meet the world through permeability. Manner is empathic, imaginal, unbound. Outer identity dissolves into the surrounding field."),
};

export const MC_SIGN: Record<string, Bi> = {
  Aries: b("وسط‌السماء در حمل: حرفه به عنوان پیشگام، مستقل، اولین حرکت خوانده می‌شود.", "MC in Aries: vocation is read as pioneering, independent, first-mover."),
  Taurus: b("وسط‌السماء در ثور: حرفه ارزش بادوام ایجاد می‌کند - زمین، صنعت، پول، حواس.", "MC in Taurus: vocation builds durable value — land, craft, money, the senses."),
  Gemini: b("وسط‌السماء در جوزا: وضعیت از طریق گفتار، تدریس، رسانه، شبکه ها به دست می آید.", "MC in Gemini: status comes through speech, teaching, media, networks."),
  Cancer: b("وسط‌السماء در سرطان: حرفه به مراقبت، تغذیه، خانواده، حافظه عمومی وابسته است.", "MC in Cancer: vocation binds to care, feeding, family, public memory."),
  Leo: b("وسط‌السماء در اسد: مسیر عمومی عملکرد، رهبری خلاق، حضور قلبی است.", "MC in Leo: public path is performance, creative leadership, heart-presence."),
  Virgo: b("وسط‌السماء در سنبله: حرفه خدمات تخصصی، تحلیل، تعمیر سیستم ها است.", "MC in Virgo: vocation is specialist service, analysis, repair of systems."),
  Libra: b("وسط‌السماء در میزان: وضعیت موجود در قانون، هنر، میانجیگری، مشارکت عمومی.", "MC in Libra: status lives in law, art, mediation, public partnership."),
  Scorpio: b("وسط‌السماء در عقرب: مسلک بحران کار، تحقیق، قدرت پنهان، بازسازی است.", "MC in Scorpio: vocation is crisis-work, research, hidden power, regeneration."),
  Sagittarius: b("وسط‌السماء در قوس: راه عمومی معنا، نشر، سفر، آموزش عالی است.", "MC in Sagittarius: public path is meaning, publishing, travel, higher teaching."),
  Capricorn: b("وسط‌السماء در جدی: حرفه ساختار، دستاورد زمان‌بندی شده، وظیفه نهادی است.", "MC in Capricorn: vocation is structure, timed achievement, institutional duty."),
  Aquarius: b("وسط‌السماء در دلو: موقعیت از طریق اختراع جمعی و اصلاحات اجتماعی به دست می آید.", "MC in Aquarius: status comes via collective invention and social reform."),
  Pisces: b("وسط‌السماء در حوت: مسیر عمومی تصویر، شفا، موسیقی، خدمت بی نام، انحلال است.", "MC in Pisces: public path is image, healing, music, unnamed service, dissolution."),
};

export const PLANET_IN_SIGN: Record<string, Record<string, Bi>> = {
  SUN: {
    Aries: b("خورشید در حمل: اراده حیاتی به عنوان شجاعت و حرکت اول صحبت می‌کند. هویت از طریق اقدام فوری و استقلال شعله ور می‌شود. صبر نقطه ضعف است زندگی یعنی زمانی که راه جدیدی باز شود.", "Sun in Aries: vital will speaks as courage and first motion. Identity ignites through immediate action and independence; patience is the weak point. Life means when a new road opens."),
    Taurus: b("خورشید در ثور: هویت از طریق ثبات، لذت حسی و ارزش آهسته شکل می گیرد. اراده سرسخت و وفادار به چیزی است که می توان نگه داشت.", "Sun in Taurus: identity forms through stability, sensory pleasure, and slow value. The will is stubborn and loyal to what can be held."),
    Gemini: b("خورشید در جوزا: هویت در گفتار، تطبیق، دوگانگی زندگی می‌کند. اراده با فکر و حرکت تغذیه می‌شود، نه با یک تمرکز.", "Sun in Gemini: identity lives in speech, adaptation, duality. The will is fed by thought and movement, not by a single focus."),
    Cancer: b("خورشید در سرطان: هویت حافظه، خانه، مراقبت است. اراده از ایمنی برمی خیزد و از جدایی زخمی می‌شود. کرامت با تعلق می آمیزد.", "Sun in Cancer: identity is memory, home, care. The will kindles from safety and is wounded by separation. Dignity fuses with belonging."),
    Leo: b("خورشید در اسد: در منزل. هویت، نمایش خلاق، قلب و کرامت است. اراده می‌خواهد بدرخشد و ببخشد و به عنوان یک حق تلقی شود.", "Sun in Leo: in domicile. Identity is creative display, heart, and dignity. The will wants to shine and to give, and takes being seen as a right."),
    Virgo: b("خورشید در سنبله: هویت از کار دقیق، خدمت و تبعیض ساخته می‌شود. اراده در ترمیم دنیای کوچک معنا پیدا می‌کند.", "Sun in Virgo: identity is built from precise work, service, and discrimination. The will finds meaning in repairing a small world."),
    Libra: b("خورشید در میزان: در هبوط. هویت در آینه دیگری شکل می گیرد. اراده به جای شروع به دنبال تعادل و زیبایی است و برش را به تاخیر می اندازد. وظیفه زندگی این است که بدون از دست دادن تعادل تصمیم بگیرید.", "Sun in Libra: in fall. Identity forms in the other’s mirror. The will seeks balance and beauty rather than initiation, and delays the cut. The life-task is to decide without losing poise."),
    Scorpio: b("خورشید در عقرب: هویت از بحران، عمق، باززایی می گذرد. اراده شدت می‌خواهد و در سطح نمی ماند.", "Sun in Scorpio: identity passes through crisis, depth, regeneration. The will wants intensity and will not stay at the surface."),
    Sagittarius: b("خورشید در قوس: هویت از طریق معنا، سفر، باور باز می‌شود. اراده نیاز به افق و جزئیات دارد.", "Sun in Sagittarius: identity opens through meaning, travel, belief. The will needs a horizon and tires of detail."),
    Capricorn: b("خورشید در جدی: هویت ساختار، زمان، دستاورد است. اراده طولانی است و گرما را با وظیفه عوض می‌کند.", "Sun in Capricorn: identity is structure, time, achievement. The will is long and will trade warmth for duty."),
    Aquarius: b("خورشید در دلو: در وبال. هویت از فرد به سمت جمع و اصل حرکت می‌کند. اراده غیرشخصی است و از صمیمیت غالب می گریزد.", "Sun in Aquarius: in detriment. Identity moves from the person to the collective and the principle. The will is impersonal and flees dominating intimacy."),
    Pisces: b("خورشید در حوت: هویت از طریق همدلی، تصویر و انحلال لبه ها شکل می گیرد. اراده متخلخل است; تمایز خود از دیگران وظیفه زندگی است. نور با همجوشی می آید، نه با فرمان.", "Sun in Pisces: identity forms through empathy, image, and the dissolving of edges. The will is porous; distinguishing self from other is the life-task. Light comes by fusion, not by command."),
  },
  MOON: {
    Aries: b("ماه در حمل: نیاز عاطفی سرعت و استقلال است. عادت واکنش آنی است. ایمنی یک جاده باز است", "Moon in Aries: emotional need is speed and independence. Habit is instant reaction; safety is an open road."),
    Taurus: b("ماه در ثور: در شرف. نیاز ثبات حسی، غذا، بدن، کالاهای آشناست. عادت کند و آرام بخش است.", "Moon in Taurus: in exaltation. Need is sensory stability, food, body, familiar goods. Habit is slow and soothing."),
    Gemini: b("ماه در جوزا: نیاز، حرف، تنوع، خواهر و برادر ذهن است. عادت فکر را در جایی قرار می دهد که احساس ممکن است باشد.", "Moon in Gemini: need is talk, variety, siblings of the mind. Habit puts thought where feeling might be."),
    Cancer: b("ماه در سرطان: در منزل. نیاز و عادت یکی هستند — خانه، مادر، حافظه، حفاظت. امنیت یعنی تعلق.", "Moon in Cancer: in domicile. Need and habit coincide — home, mother, memory, protection. Safety is belonging."),
    Leo: b("ماه در اسد: نیاز به دیده شدن دل است. عادت، گرمای وفادار و نمایش است.", "Moon in Leo: need is to have the heart seen. Habit is loyal warmth and display."),
    Virgo: b("ماه در سنبله: حاجت با خدمت و سفارش اندک برآورده می‌شود. عادت، نگرانی و ترمیم مفید است.", "Moon in Virgo: need is met through service and small order. Habit is useful worry and repair."),
    Libra: b("ماه در میزان: نیاز همنشین و اتاقی زیباست. عادت سازش برای حفظ صلح است.", "Moon in Libra: need is a companion and a beautiful room. Habit is compromise to keep the peace."),
    Scorpio: b("ماه در عقرب: در هبوط. نیاز، شدت و وفاداری مطلق است. عادت با کنترل و سکوت از زخم محافظت می‌کند.", "Moon in Scorpio: in fall. Need is intensity and absolute loyalty. Habit guards the wound with control and silence."),
    Sagittarius: b("ماه در قوس: نیاز معنا و فضای باز است. عادت امید و فرار از خانه ای تنگ است. ایمنی یک افق قابل مشاهده است نه یک دیوار تمام شده.", "Moon in Sagittarius: need is meaning and open space. Habit is hope and flight from a tight home. Safety is a visible horizon, not a finished wall."),
    Capricorn: b("ماه در جدی: در وبال. نیاز شایستگی و ساختار است. عادت احساس را فشرده می‌کند تا زمانی که به موقع باشد.", "Moon in Capricorn: in detriment. Need is competence and structure. Habit compresses feeling until it is timely."),
    Aquarius: b("ماه در دلو: نیاز آزادی درون تعلق است. عادت فاصله دوستانه و وفاداری به یک اصل است.", "Moon in Aquarius: need is freedom inside belonging. Habit is friendly distance and loyalty to a principle."),
    Pisces: b("ماه در حوت: نیاز آمیختگی و تصویر است. عادت جو را جذب می‌کند و لبه های احساسی را محو می‌کند.", "Moon in Pisces: need is fusion and image. Habit absorbs the atmosphere and blurs emotional edges."),
  },
  MERCURY: {
    Aries: b("عطارد در حمل: ادراک سریع، برنده، رزمی است. گفتار قبل از اینکه فکر به پایان برسد می رسد.", "Mercury in Aries: perception is fast, cutting, combative. Speech arrives before the thought is finished."),
    Taurus: b("عطارد در ثور: اندیشه کند، حسی، عملی است. گفتار وزن دارد و به برهان ملموس می چسبد.", "Mercury in Taurus: thought is slow, sensory, practical. Speech has weight and clings to tangible proof."),
    Gemini: b("عطارد در جوزا: در منزل. ادراک دوگانه، سریع، شبکه ای است. گفتار بازی و اطلاعات است.", "Mercury in Gemini: in domicile. Perception is dual, quick, networked. Speech is play and information."),
    Cancer: b("عطارد در سرطان: اندیشه یادگار و محافظ است. گفتار با احساس خانوادگی رنگ می گیرد.", "Mercury in Cancer: thought is memorial and protective. Speech is coloured by family feeling."),
    Leo: b("عطارد در اسد: ادراک نمایشی و محوری است. گفتار داستان خود را بیان می‌کند.", "Mercury in Leo: perception is dramatic and central. Speech tells the story of the self."),
    Virgo: b("عطارد در سنبله: در منزل و تعالی. ادراک تبعیض قائل می‌شود، دستکاری می‌کند، تجدید نظر می‌کند. گفتار دقیق و کاربردی است.", "Mercury in Virgo: in domicile and exaltation. Perception discriminates, crafts, revises. Speech is precise and of use."),
    Libra: b("عطارد در میزان: اندیشه مقایسه می‌کند و می سنجد. گفتار دیپلماسی است و از لبه تیز دوری می‌کند.", "Mercury in Libra: thought compares and weighs. Speech is diplomacy and avoids the sharp edge."),
    Scorpio: b("عطارد در عقرب: ادراک کاوش می‌کند، تحقیق می‌کند، ظاهر را بی اعتماد می‌کند. گفتار کمیاب و سنگین است.", "Mercury in Scorpio: perception probes, researches, distrusts the surface. Speech is scarce and heavy."),
    Sagittarius: b("عطارد در قوس: در وبال. فکر به سوی معنا و کل جهش می‌کند و جزئیات را کنار می گذارد. گفتار اعتراف به اعتقاد است.", "Mercury in Sagittarius: in detriment. Thought leaps to meaning and the whole, dropping detail. Speech is confessional of belief."),
    Capricorn: b("عطارد در جدی: ادراک ساختاری، زمان بندی شده، مشتریی است. گفتار مسئولیت پذیر و بیهوده است.", "Mercury in Capricorn: perception is structural, timed, managerial. Speech is responsible and spare."),
    Aquarius: b("عطارد در دلو: اندیشه اصولی، جمعی، ناگهانی است. گفتار از شخص خارج می‌شود و به ایده می پیوندد.", "Mercury in Aquarius: thought is principled, collective, sudden. Speech leaves the person and joins the idea."),
    Pisces: b("عطارد در حوت: در وبال و هبوط. ادراک تخیلی و همدلانه است نه خطی. گفتار شعر و غبار و جذب است.", "Mercury in Pisces: in detriment and fall. Perception is imaginal and empathic, not linear. Speech is poem, haze, and absorption."),
  },
  VENUS: {
    Aries: b("زهره در حمل: در وبال. جاذبه، تعقیب و آتش اول است. عشق می‌خواهد آغاز شود و از انتظار خسته می‌شود.", "Venus in Aries: in detriment. Attraction is pursuit and first fire. Love wants to begin and tires of waiting."),
    Taurus: b("زهره در ثور: در منزل. ارزش زندگی در حس، بدن، وفاداری، کالاهای کند. عشق ثابت و مالکانه است.", "Venus in Taurus: in domicile. Value lives in sense, body, loyalty, slow goods. Love is steady and possessive."),
    Gemini: b("زهره در جوزا: جاذبه گفتگو و تنوع است. عشق سبک، کنجکاو و ریشه دار است.", "Venus in Gemini: attraction is conversation and variety. Love is light, curious, many-rooted."),
    Cancer: b("زهره در سرطان: ارزش مراقبت و خانه است. عشق تغذیه می‌کند و نیاز به تعلق دارد.", "Venus in Cancer: value is care and home. Love feeds and needs to belong."),
    Leo: b("زهره در اسد: جاذبه، نمایش دل و وفاداری غرور آفرین است. عشق می‌خواهد جشن گرفته شود.", "Venus in Leo: attraction is heart-display and proud loyalty. Love wants to be celebrated."),
    Virgo: b("زهره در سنبله: در هبوط. ارزش خدمات دقیق است. عشق به عنوان نقد و کار مفید نشان می دهد.", "Venus in Virgo: in fall. Value is precise service. Love shows as critique and useful labour."),
    Libra: b("زهره در میزان: در منزل. جاذبه زیبایی، انصاف، شریک است. عشق هنر تعادل است.", "Venus in Libra: in domicile. Attraction is beauty, fairness, the partner. Love is the art of balance."),
    Scorpio: b("زهره در عقرب: در وبال. ارزش، شدت، آمیختگی، وفاداری مطلق است. عشق از بحران نمی گذرد.", "Venus in Scorpio: in detriment. Value is intensity, fusion, absolute loyalty. Love will not skip the crisis."),
    Sagittarius: b("زهره در قوس: جاذبه یعنی سفر، صراحت. عشق به افق آزاد نیاز دارد.", "Venus in Sagittarius: attraction is meaning, travel, candour. Love needs a free horizon."),
    Capricorn: b("زهره در جدی: ارزش تعهد، زمان، کرامت اجتماعی است. عشق یک قرارداد طولانی است.", "Venus in Capricorn: value is commitment, time, social dignity. Love is a long contract."),
    Aquarius: b("زهره در دلو: جاذبه دوستی، اصل، فضاست. عشق غیرشخصی است و به آزادی دیگری وفادار است.", "Venus in Aquarius: attraction is friendship, principle, space. Love is impersonal and loyal to the other’s freedom."),
    Pisces: b("زهره در حوت: در شرف. ارزش همدلی، تصویر، ارائه است. عشق مرزها را از بین می برد.", "Venus in Pisces: in exaltation. Value is empathy, image, offering. Love dissolves the border."),
  },
  MARS: {
    Aries: b("مریخ در حمل: در منزل. اقدام مستقیم، شجاعانه، آغازگر است. درگیری چهره به چهره است.", "Mars in Aries: in domicile. Action is direct, brave, initiating. Conflict is face-to-face."),
    Taurus: b("مریخ در ثور: در وبال. اقدام کند، سرسخت، دفاع از کالا است. عصبانیت دیر می آید و می ماند.", "Mars in Taurus: in detriment. Action is slow, stubborn, a defence of goods. Anger comes late and stays."),
    Gemini: b("مریخ در جوزا: عمل گفتار، مهارت، جابجایی است. تعارض کلامی و پراکنده است.", "Mars in Gemini: action is speech, skill, displacement. Conflict is verbal and scattered."),
    Cancer: b("مریخ در سرطان: در هبوط. عمل از طریق محافظت و خلق و خو حرکت می‌کند. خشم غیرمستقیم و خانوادگی می‌شود.", "Mars in Cancer: in fall. Action moves through protection and mood. Anger becomes indirect and familial."),
    Leo: b("مریخ در اسد: عمل نمایشی، وفادار، قلبی است. تعارض بر سر عزت است.", "Mars in Leo: action is dramatic, loyal, of the heart. Conflict is over dignity."),
    Virgo: b("مریخ در سنبله: عمل فنی، تجدید نظر، دقیق است. تعارض با نقص سیستم است.", "Mars in Virgo: action is technical, revising, precise. Conflict is with the flaw in the system."),
    Libra: b("مریخ در میزان: در وبال. اقدام به تأخیر افتاده و از طریق دیگری انجام می‌شود. تعارض در قرارداد و در انصاف زندگی می‌کند.", "Mars in Libra: in detriment. Action is delayed and done through the other. Conflict lives in the contract and in fairness."),
    Scorpio: b("مریخ در عقرب: اقامتگاه سنتی. اقدام کاوشگر، استراتژیک، احیاکننده است. تعارض پنهان و نهایی است.", "Mars in Scorpio: traditional domicile. Action is probing, strategic, regenerative. Conflict is hidden and final."),
    Sagittarius: b("مریخ در قوس: عمل برای معنا و دور است. درگیری ایدئولوژیک و صریح است.", "Mars in Sagittarius: action is for meaning and the far. Conflict is ideological and blunt."),
    Capricorn: b("مریخ در جدی: در شرف. اقدام ساختاری، صبورانه، هدفمند است. تضاد مشتری زمان و قدرت است.", "Mars in Capricorn: in exaltation. Action is structural, patient, aimed. Conflict is the management of time and power."),
    Aquarius: b("مریخ در دلو: عمل برای اصل و گروه است. تعارض ناگهانی و غیرشخصی است.", "Mars in Aquarius: action is for the principle and the group. Conflict is sudden and impersonal."),
    Pisces: b("مریخ در حوت: عمل متخلخل، قربانی یا منتشر است. تضاد در مه و از طریق تصویر اتفاق می افتد.", "Mars in Pisces: action is porous, sacrificial, or diffuse. Conflict happens in fog and through image."),
  },
  JUPITER: {
    Aries: b("مشتری در حمل: رشد شجاعت و آغاز است. معنا در قدم اول زندگی می‌کند.", "Jupiter in Aries: growth is courage and beginning. Meaning lives in the first step."),
    Taurus: b("مشتری در ثور: رشد کالای بادوام و لذت حسی است. خوش بینی عینی است.", "Jupiter in Taurus: growth is durable goods and sensory pleasure. Optimism is concrete."),
    Gemini: b("مشتری در جوزا: در وبال. رشد اطلاعات پراکنده است. چند شاخه می‌شود.", "Jupiter in Gemini: in detriment. Growth is scattered information. Meaning forks."),
    Cancer: b("مشتری در سرطان: در شرف. رشد خانه، مردم، تغذیه است. خوش بینی محافظت می‌کند.", "Jupiter in Cancer: in exaltation. Growth is home, people, nourishment. Optimism protects."),
    Leo: b("مشتری در اسد: رشد، نمایش قلب است. معنی سخاوت دیده شدن است.", "Jupiter in Leo: growth is heart-display. Meaning is generosity of being seen."),
    Virgo: b("مشتری در سنبله: در وبال. رشد کار و خدمت دقیق است. معنا کوچک و مفید می‌شود.", "Jupiter in Virgo: in detriment. Growth is precise work and service. Meaning becomes small and useful."),
    Libra: b("مشتری در میزان: رشد مشارکت و انصاف است. معنی تعادل اجتماعی است.", "Jupiter in Libra: growth is partnership and fairness. Meaning is social balance."),
    Scorpio: b("مشتری عقرب: رشد بحران و باززایی است. معنا در اعماق پنهان است.", "Jupiter in Scorpio: growth is crisis and regeneration. Meaning is hidden in the depth."),
    Sagittarius: b("مشتری در قوس: در منزل. رشد باور، سفر، آموزش است. خوش بینی افق است.", "Jupiter in Sagittarius: in domicile. Growth is belief, travel, teaching. Optimism is the horizon."),
    Capricorn: b("مشتری در جدی: در هبوط. رشد ساختاری و کند است. معنی تکلیف است نه آسانی.", "Jupiter in Capricorn: in fall. Growth is structural and slow. Meaning is duty, not ease."),
    Aquarius: b("مشتری در دلو: رشد جمعی و اصولی است. معنی اصلاح آینده است.", "Jupiter in Aquarius: growth is collective and principled. Meaning is reform of the future."),
    Pisces: b("مشتری در حوت: در منزل. رشد همدلی، تصویر، انحلال است. خوش بینی بی حد و حصر است.", "Jupiter in Pisces: in domicile. Growth is empathy, image, dissolution. Optimism is boundless and unguarded."),
  },
  SATURN: {
    Aries: b("زحل در حمل: در هبوط. محدودیت در شروع می نشیند. زمان شجاعت را می آزماید و تاخیر را می آموزد.", "Saturn in Aries: in fall. Limit sits on initiation. Time tests courage and teaches delay."),
    Taurus: b("زحل در ثور: حد بر کالا و بدن است. زمان ارزش بادوام ایجاد می‌کند.", "Saturn in Taurus: limit is on goods and the body. Time builds durable value."),
    Gemini: b("زحل در جوزا: حد در گفتار و اندیشه است. نیروهای زمان بر روی پراکندگی تمرکز می کنند.", "Saturn in Gemini: limit is on speech and thought. Time forces focus onto scatter."),
    Cancer: b("زحل در سرطان: در وبال. محدودیت در خانه و احساس است. زمان تعلق را با وظیفه خنک می‌کند.", "Saturn in Cancer: in detriment. Limit is on home and feeling. Time cools belonging with duty."),
    Leo: b("زحل در اسد: در وبال. محدودیت در نمایش قلب است. زمان از طریق خودداری، کرامت را می آموزد.", "Saturn in Leo: in detriment. Limit is on heart-display. Time teaches dignity through withholding."),
    Virgo: b("زحل در سنبله: حد در کار و خدمت بدن است. زمان کار را تکمیل می‌کند.", "Saturn in Virgo: limit is on work and the serving body. Time completes the craft."),
    Libra: b("زحل در میزان: در شرف. حد فقط است. زمان قرارداد و تعادل را ایجاد می‌کند.", "Saturn in Libra: in exaltation. Limit is just. Time builds the contract and the balance."),
    Scorpio: b("زحل در عقرب: حد بر بحران و مشترك است. زمان قدرت پنهان را می پزد.", "Saturn in Scorpio: limit is on crisis and the shared. Time cooks hidden power."),
    Sagittarius: b("زحل در قوس: حد در اعتقاد و دور است. زمان ایمان را به قانون تبدیل می‌کند.", "Saturn in Sagittarius: limit is on belief and the far. Time turns faith into law."),
    Capricorn: b("زحل در جدی: در منزل. حد و زمان یکی هستند. وظیفه راه است.", "Saturn in Capricorn: in domicile. Limit and time are one. Duty is the path."),
    Aquarius: b("زحل در دلو: اقامتگاه سنتی. حد بر جمع و اصل است. زمان ساختار آینده را پیوند می دهد.", "Saturn in Aquarius: traditional domicile. Limit is on the collective and the principle. Time binds the future’s structure."),
    Pisces: b("زحل در حوت: محدودیت در تصویر و همدلی است. زمان مرزی در درون بیکران را می آموزد.", "Saturn in Pisces: limit is on image and empathy. Time teaches a border inside the boundless."),
  },
  URANUS: {
    Aries: b("اورانوس در حمل: گسیختگی از طریق فرد آغاز کننده. بیداری ناگهانی و مستقل است.", "Uranus in Aries: rupture through the initiating individual. Awakening is sudden and independent."),
    Taurus: b("اورانوس در ثور: گسست در ارزش، بدن، اقتصاد حسی. ثبات می شکند تا شکل جدیدی به خود بگیرد.", "Uranus in Taurus: rupture in value, body, sensory economy. Stability breaks to take a new form."),
    Gemini: b("اورانوس در جوزا: گسست در زبان و شبکه. چنگال فکر بدون هشدار.", "Uranus in Gemini: rupture in language and network. Thought forks without warning."),
    Cancer: b("اورانوس در سرطان: گسست در خانه و متعلق. خانواده شکل غیر سنتی به خود می گیرد.", "Uranus in Cancer: rupture in home and belonging. Family takes a non-traditional shape."),
    Leo: b("اورانوس در اسد: گسست در خودنمايي. خلاقیت از قاعده معمول قلب خارج می‌شود.", "Uranus in Leo: rupture in self-display. Creativity leaves the heart’s usual rule."),
    Virgo: b("اورانوس در سنبله: گسست در کار و سلامت دستگاهها. روش بدون اطلاع قبلی تغییر می‌کند.", "Uranus in Virgo: rupture in work and the health of systems. Method changes without notice."),
    Libra: b("اورانوس در میزان: گسست در عقد و ربط. تعادل با آزادی دوباره تعریف می‌شود.", "Uranus in Libra: rupture in contract and relating. Balance is redefined by freedom."),
    Scorpio: b("اورانوس در عقرب: گسست در قدرت پنهان و بحران. بازسازی ناگهانی است.", "Uranus in Scorpio: rupture in hidden power and crisis. Regeneration is abrupt."),
    Sagittarius: b("اورانوس در قوس: گسست در عقیده و افق. تغییر معنی در سکته مغزی", "Uranus in Sagittarius: rupture in belief and horizon. Meaning changes at a stroke."),
    Capricorn: b("اورانوس در جدی: گسست در نهاد و زمان. ساختار قدیمی می شکند", "Uranus in Capricorn: rupture in institution and time. Old structure breaks."),
    Aquarius: b("اورانوس در دلو: قرابت نسلی. پارگی جمعی است. اختراع اصل است", "Uranus in Aquarius: generational affinity. Rupture is collective; invention is the principle."),
    Pisces: b("اورانوس در حوت: گسست در تصویر جمعی و مرز روح. بیداری از طریق مه می آید.", "Uranus in Pisces: rupture in the collective image and the soul’s border. Awakening comes through fog."),
  },
  NEPTUNE: {
    Aries: b("نپتون در حمل: بینایی از طریق عمل حل کننده. شجاعت خیالی است. فداکاری آغاز می‌شود.", "Neptune in Aries: vision through dissolving action. Courage is imaginal; sacrifice initiates."),
    Taurus: b("نپتون در ثور: ارزش مادی در تصویر حل می‌شود. لذت حسی معنوی می‌شود.", "Neptune in Taurus: material value dissolves into image. Sensory pleasure becomes spiritual."),
    Gemini: b("نپتون در جوزا: زبان حل می‌شود. ابهامات اطلاعاتی؛ فکر شاعرانه می‌شود", "Neptune in Gemini: language dissolves. Information hazes; thought turns poetic."),
    Cancer: b("نپتون در سرطان: خانه و مادر در اسطوره حل می شوند. تعلق نامحدود است.", "Neptune in Cancer: home and mother dissolve into myth. Belonging is unbounded."),
    Leo: b("نپتون در اسد: نمایش قلب اسطوره می‌شود. خلاقیت الهام است نه اراده.", "Neptune in Leo: heart-display becomes myth. Creativity is inspiration, not will."),
    Virgo: b("نپتون در سنبله: کار دقیق در خدمت بی نام حل می‌شود. سلامتی و مه نقد.", "Neptune in Virgo: precise work dissolves into unnamed service. Health and critique haze."),
    Libra: b("نپتون در میزان: قرارداد به عشق ایده آل منحل می‌شود. تعادل یک تصویر است.", "Neptune in Libra: the contract dissolves into ideal love. Balance is an image."),
    Scorpio: b("نپتون در عقرب: قدرت در رمز و راز حل می‌شود. بحران آمیختگی معنوی است.", "Neptune in Scorpio: power dissolves into mystery. Crisis is spiritual fusion."),
    Sagittarius: b("نپتون در قوس: باور به ایمان بی شکل منحل می‌شود. افق مه است.", "Neptune in Sagittarius: belief dissolves into formless faith. The horizon is mist."),
    Capricorn: b("نپتون در جدی: نهاد در رویا حل می‌شود. ساختار با بینایی نرم می‌شود.", "Neptune in Capricorn: institution dissolves into dream. Structure is softened by vision."),
    Aquarius: b("نپتون در دلو: جمع در آرمان حل می‌شود. اختراع از روح است.", "Neptune in Aquarius: the collective dissolves into the ideal. Invention is of the spirit."),
    Pisces: b("نپتون در حوت: قرابت. بینش، همدلی و انحلال در خانه است.", "Neptune in Pisces: affinity. Vision, empathy and dissolution are at home."),
  },
  PLUTO: {
    Aries: b("پلوتو در حمل: دگرگونی از طریق اراده خام. قدرت بدون عذرخواهی شروع می‌شود.", "Pluto in Aries: transformation through raw will. Power initiates without apology."),
    Taurus: b("پلوتو در ثور: دگرگونی ارزش و بقا. قدرت در کالاها و بدن جمع می‌شود.", "Pluto in Taurus: transformation of value and survival. Power gathers in goods and the body."),
    Gemini: b("پلوتو در جوزا: دگرگونی زبان و اطلاعات. قدرت در داستان است.", "Pluto in Gemini: transformation of language and information. Power is in the story."),
    Cancer: b("پلوتو در سرطان: دگرگونی خانه و مردم. قدرت تعلق و حافظه است.", "Pluto in Cancer: transformation of home and people. Power is belonging and memory."),
    Leo: b("پلوتو در اسد: دگرگونی خودنمایی. قدرت در قلب و خلقت متمرکز است.", "Pluto in Leo: transformation of self-display. Power concentrates in heart and creation."),
    Virgo: b("پلوتو در سنبله: دگرگونی کار و طهارت. قدرت نقد و خدمت پنهان است.", "Pluto in Virgo: transformation of work and purification. Power is critique and hidden service."),
    Libra: b("پلوتو در میزان: تحول عقد و عدالت. قدرت در پیوند است.", "Pluto in Libra: transformation of contract and justice. Power is in the bond."),
    Scorpio: b("پلوتو در عقرب: قرابت. تحول در خانه در بحران و بازسازی.", "Pluto in Scorpio: affinity. Transformation at home in crisis and regeneration."),
    Sagittarius: b("پلوتو در قوس: دگرگونی عقیده و افق. قدرت معنا و قانون دور است.", "Pluto in Sagittarius: transformation of belief and horizon. Power is meaning and far law."),
    Capricorn: b("پلوتو در جدی: دگرگونی نهاد و زمان. قدرت ساختاری و تاریخی است.", "Pluto in Capricorn: transformation of institution and time. Power is structural and historical."),
    Aquarius: b("پلوتو در دلو: دگرگونی جمع و آینده. قدرت شبکه است.", "Pluto in Aquarius: transformation of the collective and the future. Power is the network."),
    Pisces: b("پلوتو در حوت: دگرگونی روح و تصویر جمعی. قدرت نامرئی است.", "Pluto in Pisces: transformation of spirit and the collective image. Power is invisible."),
  },
};

export const PLANET_IN_HOUSE: Record<string, Record<number, Bi>> = {
  SUN: {
    1: b("خورشید در خانه ۱: اراده و ظاهر یکی هستند. زندگی از خود دیده شده شروع می‌شود.", "Sun in house 1: will and appearance are one. Life starts from the seen self."),
    2: b("خورشید در خانه ۲: هویت از طریق ارزش شخصی و معیشت می درخشد.", "Sun in house 2: identity shines through personal value and livelihood."),
    3: b("خورشید در خانه ۳: اراده در گفتار زندگی می‌کند، خواهر و برادر، جاده نزدیک.", "Sun in house 3: the will lives in speech, siblings, the near road."),
    4: b("خورشید در خانهٔ ۴: ریشه های هویت در بنیاد، پدر/خانه، پایان زندگی.", "Sun in house 4: identity roots in foundation, father/home, the end of life."),
    5: b("خورشید در خانهٔ ۵: اراده آفرینش است، عشق ورزیدن، بازی.", "Sun in house 5: the will is creation, love-affairs, play."),
    6: b("خورشید در خانه ۶: هویت از کار روزانه و خدمت به بدن ساخته می‌شود.", "Sun in house 6: identity is built from daily work and service to the body."),
    7: b("خورشید در خانه ۷: اراده در آینه شریک و قرارداد بیدار می‌شود.", "Sun in house 7: the will wakes in the partner’s mirror and the contract."),
    8: b("خورشید در خانهٔ ۸: هویت از بحران مشترک می گذرد، آنچه از دیگری می آید.", "Sun in house 8: identity passes through the shared, crisis, what comes from the other."),
    9: b("خورشید در خانه ۹: اراده سفر، اعتقاد، تعلیم عالی است. هویت می‌خواهد معنا عمومی‌شود.", "Sun in house 9: the will is travel, belief, higher teaching. Identity wants meaning made public."),
    10: b("خورشید در خانه ۱۰: هویت عمومی و حرفه ای یکی است. برای دیده شدن در رتبه لازم است. زندگی با کار قابل مشاهده تغذیه می‌شود.", "Sun in house 10: public and vocational identity are one. To be seen in rank is necessary. Life is fed by visible work."),
    11: b("خورشید در خانه ۱۱: اراده در گروه زندگی می‌کند، دوستان، امید به آینده.", "Sun in house 11: the will lives in the group, friends, hope of the future."),
    12: b("خورشید در خانه ۱۲: هویت در خدمت‌های پنهان، در خروج، در خدمت بدون نام کار می‌کند.", "Sun in house 12: identity works in the hidden, in withdrawal, in unnamed service."),
  },
  MOON: {
    1: b("ماه در خانهٔ ۱: حالت صورت است. نیاز عاطفی بلافاصله قابل مشاهده است.", "Moon in house 1: mood is the face. Emotional need is immediately visible."),
    2: b("ماه در خانه ۲: ایمنی در کالاها و بدن حسگر احساس می‌شود.", "Moon in house 2: safety is felt in goods and the sensing body."),
    3: b("ماه در خانهٔ ۳: عادت صحبت است و رفت و آمد نزدیک.", "Moon in house 3: habit is talk and the near commute."),
    4: b("ماه در خانهٔ ۴: خانه و مادر مرکز عادت هستند. ریشه مورد نیاز است.", "Moon in house 4: home and mother are the habit’s centre. Roots are required."),
    5: b("ماه در خانهٔ ۵: نیاز در آفرینش، فرزندان، لذت برآورده می‌شود.", "Moon in house 5: need is met in creating, children, pleasure."),
    6: b("ماه در خانه ۶: عادت کار و مراقبت از بدن است. خدمات آرامش می بخشد نیاز زمانی حل می‌شود که مفید باشد.", "Moon in house 6: habit is work and care of the body. Service soothes. Need settles when it is useful."),
    7: b("ماه در خانه ۷: ایمنی شریک است. خلق و خوی بستگی به پیوند دارد.", "Moon in house 7: safety is the partner. Mood depends on the bond."),
    8: b("ماه در خانهٔ ۸: نیاز، آمیختگی عمیق و باخت است.", "Moon in house 8: need is deep fusion and facing loss."),
    9: b("ماه در خانهٔ ۹: عادت سفر و معناست. خانه در افق است.", "Moon in house 9: habit is travel and meaning. Home is on the horizon."),
    10: b("ماه در خانه ۱۰: نیاز دید عمومی است. حرفه با خلق و خوی گره خورده است.", "Moon in house 10: need is public visibility. Vocation is tied to mood."),
    11: b("ماه در خانهٔ ۱۱: امنیت دوستان و گروه امیدوار است.", "Moon in house 11: safety is friends and the hopeful group."),
    12: b("ماه در خانه ۱۲: نیاز پنهان است - خواب، خلوت مفید.", "Moon in house 12: need is hidden — sleep, useful solitude."),
  },
  MERCURY: {
    1: b("عطارد در خانهٔ ۱: شیوه صحبت می‌کند. فکر صورت است.", "Mercury in house 1: the manner speaks. Thought is the face."),
    2: b("عطارد در خانهٔ ۲: ادراک به ارزش و معیشت می‌چسبد.", "Mercury in house 2: perception clings to value and livelihood."),
    3: b("عطارد در خانهٔ ۳: خانه طبیعی سخنرانی. یادگیری نزدیک و ثابت است.", "Mercury in house 3: speech’s natural house. Learning is near and constant."),
    4: b("عطارد در خانهٔ ۴: ریشه فکر در خانه و حافظه خانواده.", "Mercury in house 4: thought roots in the house and family memory."),
    5: b("عطارد در خانهٔ ۵: گفتار خلاق، بازی با کلمات.", "Mercury in house 5: creative speech, play with words."),
    6: b("عطارد در خانهٔ ۶: فکر در خدمت کار روزانه و سلامتی است.", "Mercury in house 6: thought serves daily work and health."),
    7: b("عطارد در خانهٔ ۷: ادراک در گفتگو و قرارداد شریک زندگی می‌کند.", "Mercury in house 7: perception lives in the partner’s dialogue and the contract."),
    8: b("عطارد در خانهٔ ۸: ذهن تحقیق، پول دیگری، اسرار.", "Mercury in house 8: research mind, the other’s money, secrets."),
    9: b("عطارد در خانهٔ ۹: گفتار عقیده، نشر، زبان دور.", "Mercury in house 9: speech of belief, publishing, far language."),
    10: b("عطارد در خانهٔ ۱۰: حرفه‌ای، اندیشه عمومی.", "Mercury in house 10: vocational, public thought."),
    11: b("عطارد در خانهٔ ۱۱: شبکه، ذهن دوستان، امید جمعی.", "Mercury in house 11: network, mind-friends, collective hope."),
    12: b("عطارد در خانهٔ ۱۲: اندیشه پنهان، نوشتن در خلوت، زبان خواب.", "Mercury in house 12: hidden thought, writing in solitude, the language of sleep."),
  },
  VENUS: {
    1: b("زهره در خانهٔ ۱: ادب جذاب و صلح‌آمیز است. بدن ارزش است.", "Venus in house 1: manner is attractive and peacemaking. The body is the value."),
    2: b("زهره در خانهٔ ۲: خانه طبیعی پول. لذت و کالا یکی هستند.", "Venus in house 2: money’s natural house. Pleasure and goods are one."),
    3: b("زهره در خانهٔ ۳: زیبایی در گفتار و نزدیکان.", "Venus in house 3: beauty in speech and the near ones."),
    4: b("زهره در خانهٔ ۴: خانه باید زیبا و آرام باشد. ریشه های محبت.", "Venus in house 4: the home must be beautiful and calm. Roots of affection."),
    5: b("زهره در خانهٔ ۵: عشق، هنر، لذت. خانه طبیعی خلقت", "Venus in house 5: love, art, pleasure. Creation’s natural house."),
    6: b("زهره در خانهٔ ۶: محبت از طریق خدمت و کار با دیگران.", "Venus in house 6: affection through service and work with others."),
    7: b("زهره در خانهٔ ۷: خانهٔ طبیعی شریک. ارزش یک قرارداد مساوی است.", "Venus in house 7: the partner’s natural house. Value is an equal contract."),
    8: b("زهره در خانهٔ ۸: جاذبه در همجوشی، وراثت، بحران مشترک.", "Venus in house 8: attraction in fusion, inheritance, shared crisis."),
    9: b("زهره در خانهٔ ۹: عشق به سفر و معنا. زیبایی باور.", "Venus in house 9: love of travel and meaning. Beauty of belief."),
    10: b("زهره در خانهٔ ۱۰: حرفه از طریق زیبایی، هنر یا روابط عمومی.", "Venus in house 10: vocation through beauty, art, or public relating."),
    11: b("زهره در خانهٔ ۱۱: دوستی به مثابه عشق. امید زیبا", "Venus in house 11: friendship as love. Beautiful hope."),
    12: b("زهره در خانهٔ ۱۲: عشق پنهان، پیشکش بی نام.", "Venus in house 12: hidden love, unnamed offering."),
  },
  MARS: {
    1: b("مریخ در خانهٔ ۱: رزمی. بدن شروع می‌کند.", "Mars in house 1: combative manner. The body initiates."),
    2: b("مریخ در خانهٔ ۲: مبارزه برای کالا و ارزش. برای چیزی که در اختیار است کار کنید.", "Mars in house 2: fight for goods and value. Work for what is owned."),
    3: b("مریخ در خانهٔ ۳: گفتار تند، شتابزده نزدیک سفر.", "Mars in house 3: sharp speech, hurried near-travel."),
    4: b("مریخ در خانهٔ ۴: درگیری در خانه و بنیاد. دفاع از ریشه ها", "Mars in house 4: conflict in the home and foundation. Defence of roots."),
    5: b("مریخ در خانه ۵: اقدام خلاقانه، عشق پرشور، ریسک.", "Mars in house 5: creative action, passionate love, risk."),
    6: b("مریخ در خانهٔ ۶: کار به عنوان میدان جنگ. بدن خدمتگزار.", "Mars in house 6: work as the battlefield. The serving body."),
    7: b("مریخ در خانهٔ ۷: تعارض در عقد. شریک رقیب و معلم عمل است.", "Mars in house 7: conflict in the contract. The partner is rival and teacher of action."),
    8: b("مریخ در خانهٔ ۸: اقدام در بحران و پول مشترک. شدت پنهان", "Mars in house 8: action in crisis and shared money. Hidden intensity."),
    9: b("مریخ در خانهٔ ۹: مبارزه برای باور و دور.", "Mars in house 9: a fight for belief and the far."),
    10: b("مریخ در خانه ۱۰: جاه طلبی عمومی. حرفه این رشته است.", "Mars in house 10: public ambition. Vocation is the field."),
    11: b("مریخ در خانهٔ ۱۱: اقدام در گروه و برای امید.", "Mars in house 11: action in the group and for hope."),
    12: b("مریخ در خانهٔ ۱۲: درگیری پنهان، دشمن بی نام، کار در تنهایی.", "Mars in house 12: hidden conflict, unnamed enemy, work in solitude."),
  },
  JUPITER: {
    1: b("مشتری در خانهٔ ۱: نمود گشاده و خوش‌بین. بدن به‌دنبال برکت است.", "Jupiter in house 1: open, optimistic manner. The body looks for blessing."),
    2: b("مشتری خانه 2: گشایش کالا و ارزش. سخاوت معیشت.", "Jupiter in house 2: opening of goods and value. Generosity of livelihood."),
    3: b("مشتری خانه 3: گشایش گفتار و یادگیری نزدیک.", "Jupiter in house 3: opening of speech and near learning."),
    4: b("مشتری خانهٔ ۴: برکت خانه و بنیاد. خانواده به عنوان معنا", "Jupiter in house 4: blessing of home and foundation. Family as meaning."),
    5: b("مشتری خانه ۵: گشایش خلقت، فرزندان، لذت.", "Jupiter in house 5: opening of creation, children, pleasure."),
    6: b("مشتری در خانه ۶: برکت کار و خدمت. رشد از طریق مفید بودن", "Jupiter in house 6: blessing of work and service. Growth through being useful."),
    7: b("مشتری در خانه ۷: گشایش از طریق شریک. قرارداد آموزش می دهد.", "Jupiter in house 7: opening through the partner. The contract teaches."),
    8: b("مشتری در خانهٔ ۸: گشایش از منابع دیگری و از بحران. معنی در از دست دادن.", "Jupiter in house 8: opening from the other’s resources and from crisis. Meaning in loss."),
    9: b("مشتری در خانهٔ ۹: خانهٔ طبیعی معنا — سفر و نشر.", "Jupiter in house 9: meaning’s natural house — travel, publishing."),
    10: b("مشتری خانه ۱۰: گشایش رتبه. حرفه معنی دارد.", "Jupiter in house 10: opening of rank. Vocation carries meaning."),
    11: b("مشتری در خانهٔ ۱۱: برکت دوستان و امید.", "Jupiter in house 11: blessing of friends and hope."),
    12: b("مشتری در خانه ۱۲: گشایش پنهان، تکیه گاه غیبی، ایمان به تنهایی.", "Jupiter in house 12: hidden opening, unseen support, faith in solitude."),
  },
  SATURN: {
    1: b("زحل در خانهٔ ۱: هوشیار، زمان‌گیر. بدن یک مسئولیت است.", "Saturn in house 1: sober, time-worn manner. The body is a responsibility."),
    2: b("زحل در خانهٔ ۲: محدودیت کالا. ارزش با کار طولانی ساخته می‌شود.", "Saturn in house 2: limit on goods. Value is built by long work."),
    3: b("زحل در خانهٔ ۳: محدودیت در گفتار. یادگیری کند و سنگین است.", "Saturn in house 3: limit on speech. Learning is slow and heavy."),
    4: b("زحل در خانهٔ ۴: محدودیت در خانه و پدر. فونداسیون با گذشت زمان سفت می‌شود.", "Saturn in house 4: limit on home and father. Foundation hardens with time."),
    5: b("زحل در خانهٔ ۵: حد لذت و خلقت. خلاقیت مسئول است.", "Saturn in house 5: limit on pleasure and creation. Creativity is responsible."),
    6: b("زحل در خانهٔ ۶: کار به عنوان وظیفه. بدن نیاز به نظم دارد.", "Saturn in house 6: work as duty. The body requires order."),
    7: b("زحل در خانهٔ ۷: یک قرارداد جدی. شریک زمان را آموزش می دهد.", "Saturn in house 7: a serious contract. The partner teaches time."),
    8: b("زحل در خانهٔ ۸: محدودیت در مشترک و بحران. ترس مفید از دست دادن", "Saturn in house 8: limit on the shared and on crisis. Useful fear of loss."),
    9: b("زحل در خانهٔ ۹: باور به مثابه قانون. مسافرت مسئولیت دارد.", "Saturn in house 9: belief as law. Travel is responsible."),
    10: b("زحل در خانهٔ ۱۰: خانه طبیعی رتبه. حرفه توسط زمان ساخته می‌شود.", "Saturn in house 10: rank’s natural house. Vocation is built by time."),
    11: b("زحل در خانهٔ ۱۱: دوستان اندک و ماندگار. امید ساختاریافته", "Saturn in house 11: few, lasting friends. Structured hope."),
    12: b("زحل در خانهٔ ۱۲: حد پنهان. تنهایی کار است.", "Saturn in house 12: hidden limit. Solitude is the work."),
  },
  URANUS: {
    1: b("اورانوس در خانهٔ ۱: ناگهانی و غیرعادی. بدن بیدار می‌شود.", "Uranus in house 1: sudden, unusual manner. The body wakes."),
    2: b("اورانوس در خانهٔ ۲: گسست ارزش و درآمد. کالاهای غیر قابل پیش بینی", "Uranus in house 2: rupture of value and income. Unpredictable goods."),
    3: b("اورانوس در خانهٔ ۳: سخنرانی برق آسا. مسیرهای نزدیک غیرمعمول", "Uranus in house 3: lightning speech. Unusual near paths."),
    4: b("اورانوس در خانهٔ ۴: خانه ای غیر سنتی. پارگی فونداسیون.", "Uranus in house 4: a non-traditional home. Rupture of foundation."),
    5: b("اورانوس در خانهٔ ۵: آفرینش ناگهانی. عشق رایگان.", "Uranus in house 5: sudden creation. Free love."),
    6: b("اورانوس در خانهٔ ۶: کار غیر معمول. نوسان سلامت", "Uranus in house 6: unusual work. Fluctuating health."),
    7: b("اورانوس در خانهٔ ۷: یک شریک غیرمنتظره. قرارداد آزادی", "Uranus in house 7: an unexpected partner. A contract of freedom."),
    8: b("اورانوس در خانهٔ ۸: گسست در بحران و پول مشترک.", "Uranus in house 8: rupture in crisis and shared money."),
    9: b("اورانوس در خانهٔ ۹: باور ناگهانی. سفر غیر معمول", "Uranus in house 9: sudden belief. Unusual travel."),
    10: b("اورانوس در خانهٔ ۱۰: حرفهٔ نوآور. مقام غیرمنتظره.", "Uranus in house 10: inventive vocation. Unexpected rank."),
    11: b("اورانوس در خانهٔ ۱۱: خانه طبیعی دوستان آینده. یک گروه بیدار", "Uranus in house 11: the future-friends’ natural house. A waking group."),
    12: b("اورانوس در خانهٔ ۱۲: بیداری در تنهایی. پارگی پنهان", "Uranus in house 12: awakening in solitude. Hidden rupture."),
  },
  NEPTUNE: {
    1: b("نپتون در خانهٔ ۱: سیال، حالت خیالی. مرز بدن نازک است.", "Neptune in house 1: fluid, imaginal manner. The body’s border is thin."),
    2: b("نپتون در خانهٔ ۲: کالاهای مه آلود. ارزش معنوی به جای عدد.", "Neptune in house 2: hazy goods. Spiritual value instead of number."),
    3: b("نپتون در خانهٔ ۳: گفتار شاعرانه. مسیرهای نزدیک رویایی", "Neptune in house 3: poetic speech. Dreamlike near paths."),
    4: b("نپتون در خانهٔ ۴: خانه به صورت معبد یا مه. ریشه های اسطوره ای", "Neptune in house 4: home as temple or fog. Mythic roots."),
    5: b("نپتون در خانهٔ ۵: الهام گرفته شده خلقت. عشق ایده آل", "Neptune in house 5: inspired creation. Ideal love."),
    6: b("نپتون در خانهٔ ۶: خدمت دیده نشده. بهداشت حساس به جو", "Neptune in house 6: unseen service. Health sensitive to atmosphere."),
    7: b("نپتون در خانهٔ ۷: یک شریک خیالی. یک قرارداد مبهم", "Neptune in house 7: an imaginal partner. A vague contract."),
    8: b("نپتون در خانهٔ ۸: ادغام روحی. مال مشترک مبهم و مه آلود است.", "Neptune in house 8: spiritual fusion. Hazy shared resources."),
    9: b("نپتون در خانهٔ ۹: ایمان بی شکل. سفر درونی", "Neptune in house 9: formless faith. Inner travel."),
    10: b("نپتون در خانهٔ ۱۰: مسلک خیالی یا شفابخش. رتبه نامشخص", "Neptune in house 10: imaginal or healing vocation. Unclear rank."),
    11: b("نپتون در خانهٔ ۱۱: یک گروه ایده آل. امید معنوی", "Neptune in house 11: an ideal group. Spiritual hope."),
    12: b("نپتون در خانهٔ ۱۲: خانهٔ طبیعی تنهایی و دید. نعمت های پنهان", "Neptune in house 12: solitude and vision’s natural house. The hidden blesses."),
  },
  PLUTO: {
    1: b("پلوتو در خانهٔ ۱: قدرتمند، متحول کننده. بدن میدان بحران است.", "Pluto in house 1: powerful, transforming manner. The body is a field of crisis."),
    2: b("پلوتو در خانهٔ ۲: قدرت در کالاها و بقا. ارزش از عمق.", "Pluto in house 2: power in goods and survival. Value from the depths."),
    3: b("پلوتو در خانهٔ ۳: گفتار نافذ. جاده نزدیک دارای شدت است.", "Pluto in house 3: penetrating speech. The near road has intensity."),
    4: b("پلوتو در خانهٔ ۴: دگرگونی بنیان و خانواده.", "Pluto in house 4: transformation of foundation and family."),
    5: b("پلوتو در خانهٔ ۵: ایجاد قدرتمند. دگرگونی عشق", "Pluto in house 5: powerful creation. Transforming love."),
    6: b("پلوتو در خانهٔ ۶: کار به عنوان بازسازی. بدن میدان قدرت است.", "Pluto in house 6: work as regeneration. The body is a field of power."),
    7: b("پلوتو در خانهٔ ۷: یک شریک قدرتمند. قرارداد متحول می‌شود.", "Pluto in house 7: a powerful partner. The contract transforms."),
    8: b("پلوتو در خانهٔ ۸: بحران و مشترک — خانه طبیعی. قدرت در از دست دادن.", "Pluto in house 8: crisis and the shared — the natural house. Power in loss."),
    9: b("پلوتو در خانهٔ ۹: دگرگونی باور. یک افق شدید", "Pluto in house 9: transformation of belief. An intense horizon."),
    10: b("پلوتو در خانهٔ ۱۰: رتبه قدرتمند. حرفه احیا کننده", "Pluto in house 10: powerful rank. Regenerative vocation."),
    11: b("پلوتو در خانهٔ ۱۱: یک گروه قدرتمند. تغییر امید.", "Pluto in house 11: a powerful group. Transforming hope."),
    12: b("پلوتو در خانهٔ ۱۲: قدرت پنهان. دگرگونی در تنهایی", "Pluto in house 12: hidden power. Transformation in solitude."),
  },
};

export { HOUSE_THEME } from "./house-copy";


export const ASPECT_NATURE: Record<string, Bi> = {
  CONJUNCTION: b("یک قرآن دو تابع را در یک نقطه ترکیب می‌کند. آنها جدا باقی نمی مانند. آنها یک هویت مشترک دارند. سیارات سازگار متمرکز. موارد ناسازگار تحت کشش فیوز می شوند.", "A conjunction fuses two functions at one point. They do not remain separate; they share an identity. Compatible planets concentrate; incompatible ones fuse under tension."),
  OPPOSITION: b("یک مقابله باعث می‌شود یک قطب. این دو نیرو همدیگر را می بینند و از دیگری آگاه می شوند. کار این است که پایان ها را با هم هماهنگ کنیم، نه پاک کردن یکی.", "An opposition makes a pole. The two forces see each other and compel awareness of the other. The work is to reconcile the ends, not to erase one."),
  TRINE: b("تثلیث جریان عنصری آسان است. استعداد بدون اصطکاک حرکت می‌کند. خطر سهولت استفاده نشده است.", "A trine is easy elemental flow. Talent moves without friction; the danger is unused ease."),
  SQUARE: b("تربیع اصطکاک است که کار را به وجود می آورد. دو نیرو در یک حالت عمل و رشد نیرو با هم برخورد می کنند.", "A square is friction that makes work. Two forces collide in the same mode of action and force growth."),
  SEXTILE: b("تسدیس فرصتی است با کمی تلاش. دری را باز می‌کند اما بدون اراده از آن عبور نمی‌کند.", "A sextile is opportunity with slight effort. It opens a door but will not walk through it without will."),
};

export const ASPECT_SPECIFIC: Record<string, Bi> = {
  MOON_SUN_CONJUNCTION: b("خورشید قرآن ماه (ماه نو): نیاز و اراده یکی است. هویت جدا از عادت نیست; یک چرخه شروع می‌شود", "Sun conjunct Moon (New Moon): need and will are one. Identity is not separate from habit; a cycle begins."),
  MOON_SUN_OPPOSITION: b("خورشید مقابلهٔ ماه (ماه کامل): آگاهی از دیگری. اراده و نیاز در دو قطب ایستاده اند. زندگی آشتی می‌خواهد", "Sun opposite Moon (Full Moon): awareness of the other. Will and need stand at two poles; life asks for reconciliation."),
  MOON_SUN_SQUARE: b("خورشید تربیع ماه: هویت و عادت به هم می‌سایند. ایمنی و عزت یکدیگر را آزمایش می کنند.", "Sun square Moon: identity and habit chafe. Safety and dignity test each other."),
  MOON_SUN_TRINE: b("خورشید تثلیث ماه: جریان آسان بین اراده و احساس. استعداد بومی برای یک قطعه بودن.", "Sun trine Moon: easy flow between will and feeling. A native talent for being of a piece."),
  MOON_SUN_SEXTILE: b("خورشید تسدیس ماه: فرصتی برای آشتی دادن هویت و نیاز با کمی کار.", "Sun sextile Moon: a chance to reconcile identity and need with slight work."),
  MERCURY_SUN_CONJUNCTION: b("خورشید قرآن عطارد: فکر کرد و در خانه مشترک خواهد بود. گفتار هویت است (اگر بسیار نزدیک باشد).", "Sun conjunct Mercury: thought and will share a house. Speech is identity (combust if extremely close)."),
  SUN_VENUS_CONJUNCTION: b("خورشید قرآن زهره: ارزش و هویت یکی است. خود موجود جذب می‌کند.", "Sun conjunct Venus: value and identity are one. The being itself attracts."),
  MARS_SUN_CONJUNCTION: b("خورشید قرآن مریخ: اراده و عمل یکی است. شجاعت هویت است. خشم نزدیک به هسته می نشیند.", "Sun conjunct Mars: will and action are one. Courage is identity; anger sits near the core."),
  JUPITER_SUN_CONJUNCTION: b("خورشید قرآن مشتری: هویت باز می‌شود. خوش بینی و معنا به اراده می چسبد.", "Sun conjunct Jupiter: identity opens. Optimism and meaning cling to the will."),
  SATURN_SUN_CONJUNCTION: b("خورشید قرآن زحل: زمان بر هویت می نشیند. عزت با خودداری و تکلیف ساخته می‌شود.", "Sun conjunct Saturn: time sits on identity. Dignity is built by withholding and duty."),
  MOON_SATURN_CONJUNCTION: b("ماه قرآن زحل: نیاز حد می شناسد. ایمنی از طریق شایستگی و تاخیر احساس می‌شود.", "Moon conjunct Saturn: need knows limit. Safety is felt through competence and delay."),
  MOON_VENUS_CONJUNCTION: b("ماه قرآن زهره: عادت به زیبایی و تعلق. نیاز با محبت آرام می‌شود.", "Moon conjunct Venus: a habit of beauty and belonging. Need is soothed by affection."),
  MOON_VENUS_TRINE: b("ماه تثلیث زهره: جریان آسان بین نیاز و ارزش. ذوق و عادت یکدیگر را تغذیه می کنند. استعداد بومی برای تسلی و زیبایی.", "Moon trine Venus: easy flow between need and value. Taste and habit feed each other; a native talent for consolation and beauty."),
  MARS_MOON_CONJUNCTION: b("ماه قرآن مریخ: حالت رزمی. نیاز به یکباره به عمل تبدیل می‌شود.", "Moon conjunct Mars: a combative mood. Need turns into action at once."),
  MERCURY_VENUS_CONJUNCTION: b("عطارد قرآن زهره: گفتار زیبا. فکر ارزیابی می‌کند.", "Mercury conjunct Venus: beautiful speech. Thought evaluates."),
  MERCURY_SATURN_CONJUNCTION: b("عطارد قرآن زحل: اندیشه سنگین، کند و مسئولیت پذیر است. گفتار توسط زمان پخته می‌شود. یادگیری سخت و ماندگار است. ذهن ساختار را به سرعت ترجیح می دهد.", "Mercury conjunct Saturn: thought is heavy, slow and responsible. Speech is cooked by time; learning is hard and lasting. The mind prefers structure to speed."),
  MARS_VENUS_CONJUNCTION: b("زهره قرآن مریخ: جاذبه و عمل یکی است. عشق می جنگد و شروع می‌شود.", "Venus conjunct Mars: attraction and action are one. Love fights and begins."),
  JUPITER_SATURN_CONJUNCTION: b("مشتری قرآن زحل: گشایش و محدود کردن در یک نقطه. معنا ساختار می گیرد.", "Jupiter conjunct Saturn: opening and limit at one point. Meaning takes structure."),
  JUPITER_URANUS_OPPOSITION: b("مشتری مقابلهٔ اورانوس: قطب معنا و گسست. باور باید آزادی ناگهانی را ببیند؛ نوآوری باید به قانون پاسخ دهد. کار، آشتی افق و برق است.", "Jupiter opposite Uranus: the pole of meaning and rupture. Belief must see sudden freedom; invention must answer to law. The work is to reconcile horizon and lightning."),
  MARS_PLUTO_TRINE: b("مریخ تثلیث پلوتو: جریان آسان عمل و کم توانی. کار و بحران همدیگر را تغذیه می کنند. استعداد بازیگری در اعماق", "Mars trine Pluto: easy flow of action and under-power. Work and crisis feed each other; a talent for acting in the depths."),
  JUPITER_PLUTO_SQUARE: b("مشتری تربیع پلوتو: رشد و قدرت به هم می‌سایند. معنی می‌خواهد بزرگ شود. اعماق آن را مجبور به مرگ و بازگشت می‌کند.", "Jupiter square Pluto: growth and power chafe. Meaning wants to enlarge; the depths force it through death and return."),
  PLUTO_SUN_SEXTILE: b("خورشید تسدیس پلوتو: فرصتی برای تغییر هویت با کمی اراده. اگر از آن عبور کنید دری را به اعماق باز می‌کند.", "Sun sextile Pluto: a chance to transform identity with slight will. It opens a door to the depths if walked through."),
  MARS_SUN_SEXTILE: b("خورشید تسدیس مریخ: فرصتی برای عمل در خدمت کرامت. ویل راهی برای کار دارد که با کمی تلاش باز می‌شود.", "Sun sextile Mars: a chance for action in the service of dignity. Will has a road to work that opens with slight effort."),
  PLUTO_URANUS_SQUARE: b("اورانوس تربیع پلوتو: گسست نسلی و چفیه قدرت. ساختار و آزادی یکدیگر را می شکنند تا شکل جدیدی بسازند.", "Uranus square Pluto: generational rupture and power chafe. Structure and freedom break each other to make a new form."),
  NEPTUNE_URANUS_TRINE: b("اورانوس تثلیث نپتون: جریان آسان بیداری و تصویر جمعی. یک نسل رویا و اختراع یک عنصر را می سازد.", "Uranus trine Neptune: easy flow of waking and the collective image. A generation makes dream and invention of one element."),
  MARS_SATURN_SQUARE: b("مریخ تربیع زحل: چفیه عمل و زمان. کار اجباری؛ خشم با تاخیر پخته می‌شود", "Mars square Saturn: action and time chafe. Forced work; anger is cooked by delay."),
  MARS_SATURN_OPPOSITION: b("مریخ مقابلهٔ زحل: قطب شجاعت و حد. آگاهی از قیمت کنش.", "Mars opposite Saturn: the pole of courage and limit. Awareness of the cost of action."),
  JUPITER_SUN_TRINE: b("خورشید تثلیث مشتری: جریان آسان برکت و هویت. استعداد باز کردن", "Sun trine Jupiter: easy flow of blessing and identity. A talent for opening."),
  SATURN_SUN_SQUARE: b("خورشید تربیع زحل: کرامت و وقت به هم می‌سایند. هویت با آزمون های وظیفه سخت می‌شود.", "Sun square Saturn: dignity and time chafe. Identity is hardened by tests of duty."),
  MOON_NEPTUNE_CONJUNCTION: b("ماه قرآن نپتون: حاجت خیالی، متخلخل. عادت جو را جذب می‌کند.", "Moon conjunct Neptune: imaginal, porous need. Habit absorbs the atmosphere."),
  PLUTO_SUN_CONJUNCTION: b("خورشید قرآن پلوتو: اراده از اعماق. هویت برای زیستن دگرگون می‌شود.", "Sun conjunct Pluto: will from the depths. Identity transforms in order to live."),
  URANUS_SUN_CONJUNCTION: b("خورشید قرآن اورانوس: هویت به مثابه گسست. بیداری ناگهانی از خود.", "Sun conjunct Uranus: identity as rupture. A sudden waking of the self."),
  MARS_SUN_SQUARE: b("خورشید تربیع مریخ: به هم می‌سایند اراده و عمل. شجاعت بیشتر از ظرف؛ خشم کار است", "Sun square Mars: will and action chafe. More courage than container; anger is the work."),
  JUPITER_MOON_CONJUNCTION: b("ماه قرآن مشتری: نیاز باز می‌شود. عادت، خوش بینی و تغذیه معناست.", "Moon conjunct Jupiter: need opens. Habit is optimism and the feeding of meaning."),
  VENUS_SATURN_CONJUNCTION: b("زهره قرآن زحل: ارزش تعهد است. عشق زمان می‌خواهد و درنگ می داند.", "Venus conjunct Saturn: value is commitment. Love asks for time and knows withholding."),
  MERCURY_JUPITER_CONJUNCTION: b("عطارد قرآن مشتری: اندیشه باز می‌شود. گفتار معنا و تعلیم است.", "Mercury conjunct Jupiter: thought opens. Speech is meaning and teaching."),
  MARS_JUPITER_CONJUNCTION: b("مریخ قرآن مشتری: عمل باز و شجاع است. تعارض برای معناست.", "Mars conjunct Jupiter: action is open and brave. Conflict is for meaning."),
};

export const LUNAR_PHASE: Record<string, Bi> = {
  new: b("فاز ماه نو: یک چرخه شروع می‌شود. اراده و نیاز هنوز از هم جدا نیستند. زندگی از یک دانه ساخته شده است.", "New Moon phase: a cycle begins. Will and need are not yet separate. Life is built from a seed."),
  crescent: b("فاز هلال: بیرون آمدن از تاریکی. نیاز به حرکت و اثبات وجود.", "Crescent phase: coming out of the dark. Need to move and to prove existence."),
  first_quarter: b("تربیع اول: بحران عمل. عادت برای شکل گرفتن باید با اراده مبارزه کند.", "First quarter: a crisis of action. Habit must wrestle will in order to take form."),
  gibbous: b("فاز محدب: پالایش قبل از پر شدن. کار تکمیل آنچه آغاز شده بود.", "Gibbous phase: refining before fullness. The work of completing what was begun."),
  full: b("ماه کامل: آگاهی. قطب اراده و نیاز روشن می‌شود; دیدن دیگری لازم است", "Full Moon: awareness. The pole of will and need is lit; seeing the other is required."),
  disseminating: b("پخش: توزیع آنچه فهمیده شده است. نیاز به سهم دادن", "Disseminating: distributing what has been understood. Need to give a share."),
  last_quarter: b("تربیع آخر: بحران رهایی. عادت قدیمی باید شکسته شود.", "Last quarter: a crisis of release. The old habit must break."),
  balsamic: b("حنوط: پایان چرخه. خلوت، هضم، آمادگی برای بذر بعدی.", "Balsamic: the cycle’s end. Solitude, digestion, readiness for the next seed."),
};

export const SECT: Record<"day" | "night", Bi> = {
  day: b("نمودار روز (خورشید بالای افق): فرقه روزانه. خورشید، مشتری و زحل وضعیت مناسب تری دارند. هویت از طریق نور و عموم ساخته می‌شود.", "Day chart (Sun above the horizon): diurnal sect. Sun, Jupiter and Saturn are in more suitable condition. Identity is built through light and the public."),
  night: b("نمودار شب (خورشید زیر افق): فرقه شبانه. ماه، زهره و مریخ وضعیت مناسب تری دارند. هویت از طریق حس، حریم خصوصی و باطن ساخته می‌شود.", "Night chart (Sun below the horizon): nocturnal sect. Moon, Venus and Mars are in more suitable condition. Identity is built through sense, privacy and the inward."),
};

export const ELEMENT_PREPONDERANCE: Record<string, Bi> = {
  FIRE: b("غلبه آتش: گرم و خشک. شروع، شجاعت، نمایش. فقدان آتش تردید در شعله اراده است.", "Fire preponderance: hot and dry. Initiation, courage, display. Lack of fire is hesitation in the will’s flame."),
  EARTH: b("برتری زمین: سرد و خشک. ثبات، حس، کار. فقدان زمین دشواری در تجسم و بقا است.", "Earth preponderance: cold and dry. Stability, sense, work. Lack of earth is difficulty incarnating and surviving."),
  AIR: b("غالب هوا: گرم و مرطوب. گفتار، ارتباط، اندیشه. کمبود هوا یک صدای تنگ و کمیاب دیگر است.", "Air preponderance: hot and moist. Speech, relating, thought. Lack of air is a cramped voice and a scarce other."),
  WATER: b("غلبه آب: سرد و مرطوب. احساس، حافظه، آمیختگی. کمبود آب یک تعلق خشک است.", "Water preponderance: cold and moist. Feeling, memory, fusion. Lack of water is a dry belonging."),
};

export const MODALITY_PREPONDERANCE: Record<string, Bi> = {
  CARDINAL: b("برتری کاردینال (حمل/سرطان/میزان/جدی): شروع فصل. زندگی با شروع و نقطه عطف حرکت می‌کند.", "Cardinal preponderance (Aries/Cancer/Libra/Capricorn): the season’s start. Life moves by beginning and turning points."),
  FIXED: b("برتری ثابت (ثور/اسد/عقرب/دلو): وسط فصل. زندگی یعنی ماندن و مقاومت کردن.", "Fixed preponderance (Taurus/Leo/Scorpio/Aquarius): the season’s middle. Life means through staying and resisting."),
  MUTABLE: b("برتری قابل تغییر (جوزا/سنبله/قوس/حوت): پایان فصل. زندگی با تطبیق و عبور حرکت می‌کند.", "Mutable preponderance (Gemini/Virgo/Sagittarius/Pisces): the season’s end. Life moves by adapting and crossing."),
};

export const POLARITY: Record<string, Bi> = {
  masculine: b("علائم مذکر/مثبت (آتش و هوا) غالب است: حرکت بیرونی، بیان، عمل.", "Masculine/positive signs (fire and air) preponderate: outward motion, expression, action."),
  feminine: b("علائم زنانه / منفی (زمین و آب) غالب است: حرکت به سمت داخل، پذیرایی، نگه داشتن.", "Feminine/negative signs (earth and water) preponderate: inward motion, reception, keeping."),
};

export const HEMISPHERE: Record<string, Bi> = {
  south: b("نیمکره جنوبی (خانه های 7 تا 12، بالای افق) برتری دارد: زندگی برای عموم و اجتماعی اهمیت دارد.", "Southern hemisphere (houses 7–12, above the horizon) preponderates: life weights toward the public and social."),
  north: b("نیمکره شمالی (خانه های 1-6، زیر افق) برتری دارد: زندگی به سمت شخصی و درونی وزن دارد.", "Northern hemisphere (houses 1–6, below the horizon) preponderates: life weights toward the personal and inward."),
  east: b("خانه های شرقی (10-3) غالب هستند: خود ابتکاری. مسیر بیشتر از اراده خود فرد ساخته می‌شود.", "Eastern houses (10–3) preponderate: self-initiation. The path is built more from one’s own will."),
  west: b("خانه های غربی (4-9) برتری دارند: دیگری. مسیر بیشتر از طریق برخورد ساخته می‌شود.", "Western houses (4–9) preponderate: the other. The path is built more through encounter."),
};

export const NODE_SIGN: Record<string, Bi> = {
  Aries: b("رأس در حمل: رشد از طریق شجاعت شخصی; ذنب در میزان - اتکای بیش از حد به تأیید دیگری را رها کنید.", "North Node in Aries: growth through personal courage; South Node in Libra — release over-reliance on the other’s approval."),
  Taurus: b("رأس در ثور: رشد از طریق ارزش پایدار و بدن; ذنب در عقرب — ترک بحران به عنوان خانه.", "North Node in Taurus: growth through durable value and the body; South Node in Scorpio — leave crisis as a home."),
  Gemini: b("رأس در جوزا: رشد از طریق گفتار و داده نزدیک. ذنب در قوس - عقیده بزرگ را به جای آنچه در دست است بگذار.", "North Node in Gemini: growth through near speech and data; South Node in Sagittarius — leave the grand belief in place of what is at hand."),
  Cancer: b("رأس در سرطان: رشد از طریق تعلق و مراقبت. ذنب در جدی — ترک رتبه در جای خانه.", "North Node in Cancer: growth through belonging and care; South Node in Capricorn — leave rank in place of home."),
  Leo: b("رأس در اسد: رشد از راه قلب و خلقت; ذنب در دلو - خنکی جمعی را به جای گرمی شخصی بگذار.", "North Node in Leo: growth through heart and creation; South Node in Aquarius — leave collective coolness in place of personal warmth."),
  Virgo: b("رأس در سنبله: رشد از طریق خدمت دقیق; ذنب در حوت - انحلال را به جای تکلیف معین بگذار.", "North Node in Virgo: growth through precise service; South Node in Pisces — leave dissolution in place of a definite task."),
  Libra: b("رأس در میزان: رشد از طریق ارتباط و انصاف. ذنب در حمل — از خلوت مبارز خارج شو.", "North Node in Libra: growth through relating and fairness; South Node in Aries — leave the fighter’s solitude."),
  Scorpio: b("رأس در عقرب: رشد از طریق آمیختگی و تجدید. ذنب در ثور - ایمنی سطح را ترک کنید.", "North Node in Scorpio: growth through fusion and regeneration; South Node in Taurus — leave surface safety."),
  Sagittarius: b("رأس در قوس: رشد از راه معنا و دور. ذنب در جوزا — ترک پراکندگی داده.", "North Node in Sagittarius: growth through meaning and the far; South Node in Gemini — leave scatter of data."),
  Capricorn: b("رأس در جدی: رشد از طریق ساختار و رتبه; ذنب در سرطان — ترک سرپناه در محل وظیفه.", "North Node in Capricorn: growth through structure and rank; South Node in Cancer — leave shelter in place of duty."),
  Aquarius: b("رأس در دلو: رشد از طریق گروه و اصل; ذنب در اسد — مركز ثابت را ترك كن.", "North Node in Aquarius: growth through the group and the principle; South Node in Leo — leave the constant centre-stage."),
  Pisces: b("رأس در حوت: رشد از طریق همدلی و ایمان. ذنب در سنبله — نقد را به جای شفقت بگذار.", "North Node in Pisces: growth through empathy and faith; South Node in Virgo — leave critique in place of compassion."),
};

export const DIGNITY_NOTE: Record<string, Bi> = {
  domicile: b(
    "در منزل: سیاره در برج خودش است. ستاره‌شناسی سنتی می‌گوید کار این سیاره اینجا راحت‌تر جریان دارد. این یک واقعیت رصدی نیست؛ یک قاعده بطلمیوسی است.",
    "In domicile: the planet sits in the sign it rules. Traditional astrology says the planet’s job flows more easily here. This is not an observed scientific fact. It is a Ptolemaic rule.",
  ),
  exaltation: b(
    "در شرف: سیاره در برج اوج سنتی است. کار سیاره بلند و یک‌طرفه خوانده می‌شود.",
    "In exaltation: the planet sits in its traditional peak sign. The job is read as loud and one-sided.",
  ),
  detriment: b(
    "در وبال: سیاره روبه‌روی برج خودش است. ستاره‌شناسی سنتی می‌گوید کار سیاره اینجا سخت‌تر است و باید از راه دیگری انجام شود.",
    "In detriment: the planet sits opposite the sign it rules. Traditional astrology says the job is harder here and must work by another road.",
  ),
  fall: b(
    "در هبوط: سیاره روبه‌روی جای اوج است. کار سیاره ضعیف‌تر خوانده می‌شود و به کمک سیاره‌های دیگر نیاز دارد.",
    "In fall: the planet sits opposite its peak sign. The job is read as weaker and in need of help from other planets.",
  ),
  peregrine: b(
    "آواره: سیاره نه در منزل است، نه در شرف، نه در وبال، نه در هبوط. میهمان است. نیرو را از حاکم همین برج و از جنبه‌ها می‌گیرد.",
    "Peregrine: the planet is not in domicile, exaltation, detriment or fall. It is a guest. It takes force from the ruler of this sign and from aspects.",
  ),
};

export const RETROGRADE_NOTE = b(
  "رجوع: از زمین، سیاره در حرکت ظاهری به عقب است. کارکرد درونی، بازبینی‌شده و خلاف جریان بیرونی کار می‌کند. در سنت، عطارد و زهرهٔ راجع بیان و ارزش را به درون می‌برند؛ سیارات بیرونی راجع نسلی‌اند.",
  "Retrograde: from Earth the planet appears to move backward. The function turns inward, revises, and works against the outer current. Traditionally Mercury and Venus retrograde take speech and value inside; outer-planet retrogrades are generational.",
);

export const STELLIUM_NOTE = b(
  "ستلیوم (سه سیاره یا بیشتر در یک برج یا یک خانه): تمرکز شدید نیرو. زندگی بارها به همان موضوع بازمی‌گردد. جداسازی سیارات در چرخ فقط برای خوانایی است؛ طول واقعی آن‌ها نزدیک مانده است.",
  "Stellium (three or more planets in one sign or house): a concentrated force. Life returns to that subject. Glyphs are spread on the wheel for legibility; the true longitudes remain close.",
);

export const CHART_RULER_INTRO = b(
  "حاکم طالع (به سنت بطلمیوس) خداوندگار برجِ روی افق شرقی است. جای این سیاره — برج، خانه و جنبه‌هایش — کلید خواندن کل نقشه است: نشان می‌دهد ارادهٔ ورود به جهان از کجا عمل می‌کند.",
  "The chart ruler (Ptolemy) is the domicile lord of the sign on the eastern horizon. That planet’s sign, house and aspects are the key to the map: they show from where the will of entry acts.",
);

export const MODE_FRAME: Record<string, Bi> = {
  natal: b("خواندن ناتال: نقشه لحظه تولد. سیارات = توابع; نشانه ها = سبک; خانه ها = میدان زندگی; جنبه ها = گفتگوی نیروها. هر پاراگراف زیر طول جغرافیایی محاسبه شده این تولد را مشخص می‌کند.", "Natal reading: the map of the birth instant. Planets = functions; signs = style; houses = field of life; aspects = the conversation of forces. Every paragraph below is keyed off this birth’s computed longitudes."),
  transit: b("خواندن گذر: سیارات لحظه انتخابی جنبه تولد دارند. خانه ها ناتال هستند. رویدادها گذرگاه هستند.", "Transit reading: planets of the chosen moment aspect the natal. Houses are natal; events are the crossing."),
  synastry: b("خواندن سیناستری: جنبه های متقاطع دو ناتال در گوی 0.7×. آنچه که سیاره یک فرد در عملکرد شخص دو انجام می دهد.", "Synastry reading: cross-aspects of two natals at 0.7× orbs. What person one’s planet does in person two’s function."),
  composite: b("خواندن ترکیبی: نقاط میانی با کوتاهترین قوس. این نمودار یک شخص نیست. وجود رابطه است.", "Composite reading: shortest-arc midpoints. This chart is not a person; it is the being of the relationship."),
  solar_return: b("بازگشت خورشیدی: سال از خورشید لحظه ای به طول جغرافیایی ناتال برمی گردد. خانه های لحظه ای و ASC موضوع سال هستند.", "Solar return: the year from the instant the Sun returns to natal longitude. This moment’s houses and ASC are the year’s subject."),
  progressed: b("پیشرفت ثانویه: یک روز پس از تولد = یک سال زندگی. این نمودار رشد درونی است، نه رویداد بیرونی.", "Secondary progression: one day after birth = one year of life. This chart is inner growth, not outer event."),
  now: b("آسمان الان: نقشه این لحظه برای مختصات انتخاب شده. خوانشی از جو، نه از هویت تولد.", "Sky now: the map of this instant for the chosen coordinates. A reading of atmosphere, not of birth-identity."),
};

export function pick(bi: Bi | undefined, _locale?: string): string {
  if (!bi) return "";
  return bi;
}

export function aspectKey(p1: string, p2: string, aspect: string): string {
  const [a, b] = [p1, p2].map((x) => x.toUpperCase()).sort();
  return `${a}_${b}_${aspect.toUpperCase()}`;
}

export const CAZIMI_NOTE = b(
  "تحت‌الشعاعِ قلب خورشید (cazimi، زیر ۰٫۲۸°): سیاره در قلب پادشاه است و به‌جای سوختن، تقویت می‌شود. کارکرد با هویت یکی و در اوج بیان است.",
  "Cazimi (within 0.28° of the Sun): the planet is in the heart of the king and is strengthened, not burned. The function fuses with identity at a peak of expression.",
);

export const COMBUST_NOTE = b(
  "احتراق (زیر ۸٫۵° از خورشید): سیاره در پرتو خورشید است. کارکرد مرئیِ آن ضعیف می‌شود و به اراده می‌پیوندد — فکر یا ارزش، مستقل از هویت شنیده نمی‌شود.",
  "Combust (within 8.5° of the Sun): the planet is in the solar rays. Its visible function weakens and joins the will — thought or value is not heard apart from identity.",
);

export const PLANET_CORE: Record<string, Bi> = {
  SUN: b(
    "خورشید در سنت غربی ارادهٔ حیاتی، هویت آگاه و مرکز گرانش نقشه است. برجِ خورشید سبک درخشش را می‌گوید؛ خانه، صحنهٔ زندگی را که این درخشش باید در آن دیده شود. جنبه‌های خورشید گفتگوهایی‌اند که شأن شخص را می‌سازند یا می‌آزمایند.",
    "In the Western tradition the Sun is vital will, conscious identity, the chart’s centre of gravity. Its sign is the style of shining; its house is the life-stage that light must occupy. Solar aspects are the conversations that build or test dignity.",
  ),
  MOON: b(
    "ماه نیاز، عادت، بدنِ حس‌کننده و حافظه است — آنچه پیش از فکر امن می‌شود. برجِ ماه زبان احساس را می‌گوید؛ خانه، اتاقی را که در آن آرام می‌گیرید یا بی‌قرار می‌شوید. در چارت شبانه ماه حتی وزن بیشتری دارد.",
    "The Moon is need, habit, the sensing body and memory — what feels safe before thought. Its sign is the language of feeling; its house is the room where you settle or become restless. In a night chart the Moon weighs still more.",
  ),
  MERCURY: b(
    "عطارد ادراک، گفتار، یادگیری و جابه‌جایی نزدیک است. برج، سرعت و بافت فکر را می‌گوید؛ خانه، موضوعاتی را که ذهن بارها به آن‌ها برمی‌گردد. نزدیکی به خورشید (احتراق) فکر را با هویت یکی می‌کند و استقلال بیان را کم می‌کند.",
    "Mercury is perception, speech, learning and near travel. The sign is the speed and texture of thought; the house is the subject the mind returns to. Closeness to the Sun (combustion) fuses thought with identity and lessens the independence of speech.",
  ),
  VENUS: b(
    "زهره جذب، ارزش‌گذاری، هنرِ رابطه و آنچه زیبا یا خواستنی شمرده می‌شود. برج، ذائقه را می‌گوید؛ خانه، بازاری را که در آن محبت و مال رد و بدل می‌شود. زهره در فرقهٔ شب راحت‌تر است.",
    "Venus is attraction, valuation, the art of relating, and what is counted beautiful or desirable. The sign is taste; the house is the market where affection and goods are exchanged. Venus is more at ease in nocturnal sect.",
  ),
  MARS: b(
    "مریخ کنش، جدال، میل و راه بریدن گره است. برج، سبک جنگ و کار را می‌گوید؛ خانه، جبهه‌ای را که انرژی آنجا خرج می‌شود. مریخ در فرقهٔ شب مناسب‌تر است؛ در روز باید مهار شود.",
    "Mars is action, conflict, desire, and the cutting of knots. The sign is the style of fight and work; the house is the front where energy is spent. Mars is more suitable in night sect; by day it must be governed.",
  ),
  JUPITER: b(
    "مشتری گسترش، معنا، برکت و قانون گشاده است. برج، افق باور را می‌گوید؛ خانه، جایی را که زندگی می‌خواهد بزرگ شود. در چارت روزانه مشتری از فرقهٔ خود حمایت می‌شود.",
    "Jupiter is growth, meaning, blessing and spacious law. The sign is the horizon of belief; the house is where life wants to enlarge. In a day chart Jupiter is supported by its own sect.",
  ),
  SATURN: b(
    "زحل حد، زمان، ترس مفید و ساختاری است که بدون آن هیچ بنایی نمی‌ماند. برج، درس را می‌گوید؛ خانه، میدان امتحان را. زحل روزانه است: در روشنایی، حد عادلانه می‌شود؛ در شب، سنگین‌تر.",
    "Saturn is limit, time, useful fear, and the structure without which nothing stands. The sign is the lesson; the house is the examination hall. Saturn is diurnal: in the light, limit becomes just; by night it weighs more.",
  ),
  URANUS: b(
    "اورانوس (مدرن) گسست، بیداری ناگهانی و اصلِ آزادی از قاعدهٔ شخصی است. در سنت کهن جایی ندارد؛ خوانش آن نسلی و جمعی است مگر در خانه‌های زاویه‌ای که فرد را لمس کند.",
    "Uranus (modern) is rupture, sudden waking, and the principle of freedom from personal rule. It has no place in the ancient canon; its reading is generational and collective unless angular, where it touches the person.",
  ),
  NEPTUNE: b(
    "نپتون (مدرن) محو مرز، الهام، تصویر جمعی و خطر فریب است. برج، سبک مه را می‌گوید؛ خانه، اتاقی را که در آن واقعیت نازک می‌شود.",
    "Neptune (modern) is the dissolving of borders, vision, the collective image, and the risk of glamour. The sign is the style of fog; the house is the room where reality thins.",
  ),
  PLUTO: b(
    "پلوتو (مدرن) قدرت، دگرگونی اجباری و آنچه زیر سطح اداره می‌شود. برج، سبک بحران را می‌گوید؛ خانه، نهادی را که باید بمیرد و باززاده شود.",
    "Pluto (modern) is power, forced transformation, and what is administered beneath the surface. The sign is the style of crisis; the house is the institution that must die and return.",
  ),
};

export const PATTERN_NOTE: Record<string, Bi> = {
  "t-square": b(
    "T-مربع: یک مقابله و دو تربیع به سیارهٔ رأس. تنش به رأس تخلیه می‌شود — آنجا کار اجباری زندگی است. راه‌حل سنتی، فعال کردن نقطهٔ خالیِ روبه‌روی رأس است.",
    "A T-square: one opposition and two squares into an apex planet. Tension discharges at the apex — that is the life’s compulsory work. The traditional remedy is to activate the empty point opposite the apex.",
  ),
  "grand-trine": b(
    "تثلیث بزرگ: سه سیاره در یک عنصر، همه تثلیث. استعداد روان است؛ خطر، مدار بسته‌ای که هرگز از راحتی بیرون نمی‌آید مگر سیاره‌ای آن را به تربیع ببرد.",
    "A grand trine: three planets in one element, all trine. Talent is fluent; the danger is a closed circuit that never leaves ease unless another planet squares it.",
  ),
};

export const HOUSE_LORD_FRAME = b(
  "در روش لیلی، موضوع هر خانه از سیاره حاکمِ برجِ شروع خانه خوانده می‌شود: آن سیاره کجا نشسته، در چه شأنی است، و به چه چیز جنبه دارد. خالی بودن خانه موضوع را حذف نمی‌کند.",
  "In Lilly’s method a house’s topic is read from the planet that rules the sign on the cusp. Where that planet sits, in what dignity, and what it aspects, tells you how the topic works. An empty house does not delete the topic.",
);

