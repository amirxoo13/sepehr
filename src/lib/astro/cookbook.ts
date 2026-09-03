/**
 * Traditional Western tropical cookbook.
 * Sources: Ptolemy Tetrabiblos I–II (dignities, sect); Lilly Christian Astrology
 * (houses, planets); standard CAE planet-in-sign / planet-in-house / major-aspect
 * correspondences used by Cafe Astrology / Astrodienst free reports.
 * Not generated biography — each paragraph is looked up from THIS chart's
 * computed sign, house and aspect.
 */
export type Bi = { fa: string; en: string };

export function b(fa: string, en: string): Bi {
  return { fa, en };
}

export const RISING: Record<string, Bi> = {
  Aries: b("طالع حمل: ورود به جهان از راه پیشگامی. بدن و نمود تمایل به سرعت، صراحت و آغاز دارند. هویت بیرونی با کنش تعریف می‌شود نه با تأمل. دیگران شما را اول به‌عنوان کسی می‌بینند که راه را باز می‌کند.", "Aries rising: you meet the world by initiating. The body and manner tend to be direct, quick, and first. Outer identity is defined by action rather than deliberation. Others first meet you as the one who opens the road."),
  Taurus: b("طالع ثور: ورود از راه ثبات و حس. نمود آرام، مقاوم و وابسته به لذت‌های ملموس است. جهان را با کندی انتخاب‌شده و وفاداری به امر واقعی تجربه می‌کنید.", "Taurus rising: you meet the world through steadiness and the senses. Presence is calm, stubborn, and loyal to what can be touched. Experience is paced."),
  Gemini: b("طالع جوزا: ورود از راه گفتگو. نمود چابک، کنجکاو و دوگانه است. هویت بیرونی با پرسش، جابه‌جایی و شبکهٔ نزدیکان شکل می‌گیرد.", "Gemini rising: you meet the world through speech. Manner is quick, curious, dual. Outer identity forms in questions, movement, and the near network."),
  Cancer: b("طالع سرطان: ورود از راه حفاظت. نمود محافظ، حساس به جو، و خانه‌گراست. چهرهٔ عمومی غریزهٔ مراقبت را پیش از منطق نشان می‌دهد. دیگران امنیت یا شکنندگی شما را زود می‌خوانند.", "Cancer rising: you meet the world by protecting. Manner is receptive, mood-sensitive, homeward. The public face shows care before argument. Others read your safety — or your thin skin — at once."),
  Leo: b("طالع اسد: ورود از راه نمایش. نمود گرم، مرکزی و خواهان دیده شدن است. هویت بیرونی با قلب، خلاقیت و وفاداری به شأن خود تعریف می‌شود.", "Leo rising: you meet the world by being seen. Manner is warm, central, creative. Outer identity asks for dignity and a stage."),
  Virgo: b("طالع سنبله: ورود از راه دقت. نمود تحلیل‌گر، خدمت‌گرا و اصلاح‌کننده است. جهان را با جزئیات و کار می‌سنجید.", "Virgo rising: you meet the world through craft. Manner is precise, useful, revising. The world is measured in details and work."),
  Libra: b("طالع میزان: ورود از راه رابطه. نمود متعادل، زیباپسند و متوجه دیگری است. هویت بیرونی در آینهٔ شریک و قرارداد شکل می‌گیرد.", "Libra rising: you meet the world through the other. Manner seeks balance, beauty, fairness. Outer identity is formed in partnership."),
  Scorpio: b("طالع عقرب: ورود از راه شدت. نمود نفوذی، محافظ اسرار و مقاوم در بحران است. جهان را به لایهٔ زیرین می‌برد.", "Scorpio rising: you meet the world through intensity. Manner is probing, private, unyielding in crisis. Experience is taken to the underlayer."),
  Sagittarius: b("طالع قوس: ورود از راه معنا. نمود گشاده، جستجوگر و متمایل به افق است. هویت بیرونی با باور، سفر و صدق بیان می‌شود.", "Sagittarius rising: you meet the world through meaning. Manner is open, questing, far-aimed. Outer identity speaks as belief and travel."),
  Capricorn: b("طالع جدی: ورود از راه ساختار. نمود جدّی، زمان‌آگاه و مسئول است. جهان را با سلسله‌مراتب و دستاورد می‌سنجید.", "Capricorn rising: you meet the world through structure. Manner is sober, timed, responsible. Experience is weighed as rank and achievement."),
  Aquarius: b("طالع دلو: ورود از راه فاصله و جمع. نمود غیرشخصی، نوآور و وفادار به اصل است. هویت بیرونی با گروه و ایده تعریف می‌شود نه با صمیمیت خصوصی.", "Aquarius rising: you meet the world through the collective. Manner is cool, principled, unusual. Outer identity belongs to the group and the idea."),
  Pisces: b("طالع حوت: ورود از راه نفوذپذیری. نمود همدل، تصویری و بی‌مرز است. هویت بیرونی سیال است و خود را با محیط یکی می‌کند.", "Pisces rising: you meet the world through permeability. Manner is empathic, imaginal, unbound. Outer identity dissolves into the surrounding field."),
};

export const MC_SIGN: Record<string, Bi> = {
  Aries: b("وسط‌السماء حمل: مسیر عمومی با پیشگامی، استقلال و آغاز پروژه‌ها شناخته می‌شود.", "MC in Aries: vocation is read as pioneering, independent, first-mover."),
  Taurus: b("وسط‌السماء ثور: حرفه از راه ساختن ارزش پایدار، زمین، هنر یا دارایی شکل می‌گیرد.", "MC in Taurus: vocation builds durable value — land, craft, money, the senses."),
  Gemini: b("وسط‌السماء جوزا: مقام از راه گفتار، آموزش، رسانه و شبکه به دست می‌آید.", "MC in Gemini: status comes through speech, teaching, media, networks."),
  Cancer: b("وسط‌السماء سرطان: حرفه با مراقبت، تغذیه، خانواده یا حافظهٔ جمعی گره می‌خورد.", "MC in Cancer: vocation binds to care, feeding, family, public memory."),
  Leo: b("وسط‌السماء اسد: مسیر عمومی نمایش، رهبری خلاق و حضور قلب است.", "MC in Leo: public path is performance, creative leadership, heart-presence."),
  Virgo: b("وسط‌السماء سنبله: حرفه از خدمت تخصصی، تحلیل و اصلاح سیستم‌ها می‌گذرد.", "MC in Virgo: vocation is specialist service, analysis, repair of systems."),
  Libra: b("وسط‌السماء میزان: مقام در قانون، هنر، میانجی‌گری و شراکت عمومی است.", "MC in Libra: status lives in law, art, mediation, public partnership."),
  Scorpio: b("وسط‌السماء عقرب: حرفه با بحران، تحقیق، قدرت پنهان و باززایی تعریف می‌شود.", "MC in Scorpio: vocation is crisis-work, research, hidden power, regeneration."),
  Sagittarius: b("وسط‌السماء قوس: مسیر عمومی معنا، نشر، سفر، حقوق یا آموزش عالی است.", "MC in Sagittarius: public path is meaning, publishing, travel, higher teaching."),
  Capricorn: b("وسط‌السماء جدی: حرفه ساختار، مدیریت زمان، و مسئولیت نهادی است.", "MC in Capricorn: vocation is structure, timed achievement, institutional duty."),
  Aquarius: b("وسط‌السماء دلو: مقام از نوآوری جمعی، علم، و اصلاح اجتماعی می‌آید.", "MC in Aquarius: status comes via collective invention and social reform."),
  Pisces: b("وسط‌السماء حوت: مسیر عمومی تصویر، شفا، موسیقی، خدمت بی‌نام یا محو مرزهاست.", "MC in Pisces: public path is image, healing, music, unnamed service, dissolution."),
};

export const PLANET_IN_SIGN: Record<string, Record<string, Bi>> = {
  SUN: {
    Aries: b("خورشید در حمل: ارادهٔ حیاتی از راه آغاز و شجاعت بیان می‌شود. هویت با کنش فوری و استقلال شعله می‌گیرد؛ صبر نقطهٔ ضعف است. زندگی وقتی معنا دارد که راه تازه‌ای باز شود.", "Sun in Aries: vital will speaks as courage and first motion. Identity ignites through immediate action and independence; patience is the weak point. Life means when a new road opens."),
    Taurus: b("خورشید در ثور: هویت از ثبات، لذت حس و ساختن ارزش آرام شکل می‌گیرد. اراده کند اما پایدار است و به آنچه ملموس است وفادار می‌ماند.", "Sun in Taurus: identity forms through stability, sensory pleasure, and slow value. The will is stubborn and loyal to what can be held."),
    Gemini: b("خورشید در جوزا: هویت در گفتگو، تطبیق و دوگانگی زنده است. اراده از راه فکر و جابه‌جایی تغذیه می‌شود، نه از راه تمرکز واحد.", "Sun in Gemini: identity lives in speech, adaptation, duality. The will is fed by thought and movement, not by a single focus."),
    Cancer: b("خورشید در سرطان: هویت حافظه، خانه و مراقبت است. اراده از احساس امنیت شعله می‌گیرد و از جدایی زخم می‌خورد. شأن با تعلق یکی می‌شود.", "Sun in Cancer: identity is memory, home, care. The will kindles from safety and is wounded by separation. Dignity fuses with belonging."),
    Leo: b("خورشید در اسد: در منزل خود است. هویت نمایش خلاق، قلب و وفاداری به شأن است. اراده می‌خواهد بدرخشد و ببخشد — و دیده شدن را حق خود می‌داند.", "Sun in Leo: in domicile. Identity is creative display, heart, and dignity. The will wants to shine and to give, and takes being seen as a right."),
    Virgo: b("خورشید در سنبله: هویت از کار دقیق، خدمت و تمایز امر درست از غلط ساخته می‌شود. اراده در اصلاح جهان کوچک خود معنا می‌یابد.", "Sun in Virgo: identity is built from precise work, service, and discrimination. The will finds meaning in repairing a small world."),
    Libra: b("خورشید در میزان: در هبوط. هویت در آینهٔ دیگری شکل می‌گیرد. اراده به جای آغاز، تعادل و زیبایی را می‌جوید و تصمیم را به تعویق می‌اندازد. کار عمر، بریدن بدون از دست دادن توازن است.", "Sun in Libra: in fall. Identity forms in the other’s mirror. The will seeks balance and beauty rather than initiation, and delays the cut. The life-task is to decide without losing poise."),
    Scorpio: b("خورشید در عقرب: هویت از بحران، عمق و باززایی می‌گذرد. اراده شدت می‌خواهد و سطح را تحمل نمی‌کند.", "Sun in Scorpio: identity passes through crisis, depth, regeneration. The will wants intensity and will not stay at the surface."),
    Sagittarius: b("خورشید در قوس: هویت با معنا، سفر و باور گشوده می‌شود. اراده به افق نیاز دارد و از جزئیات خسته می‌شود.", "Sun in Sagittarius: identity opens through meaning, travel, belief. The will needs a horizon and tires of detail."),
    Capricorn: b("خورشید در جدی: هویت ساختار، زمان و دستاورد است. اراده بلندمدت است و گرما را فدای مسئولیت می‌کند.", "Sun in Capricorn: identity is structure, time, achievement. The will is long and will trade warmth for duty."),
    Aquarius: b("خورشید در دلو: در وبال. هویت از فردیت به جمع و اصل منتقل می‌شود. اراده غیرشخصی است و از صمیمیت سلطه‌گر می‌گریزد.", "Sun in Aquarius: in detriment. Identity moves from the person to the collective and the principle. The will is impersonal and flees dominating intimacy."),
    Pisces: b("خورشید در حوت: هویت از راه همدلی، تصویر و محو مرز شکل می‌گیرد. اراده نفوذپذیر است؛ تمایز خود از دیگری کار اصلی عمر است. درخشش از راه یکی شدن می‌آید، نه از راه تسلط.", "Sun in Pisces: identity forms through empathy, image, and the dissolving of edges. The will is porous; distinguishing self from other is the life-task. Light comes by fusion, not by command."),
  },
  MOON: {
    Aries: b("ماه در حمل: نیاز عاطفی به سرعت و استقلال است. عادت، واکنش فوری است؛ امنیت وقتی حس می‌شود که راه باز باشد.", "Moon in Aries: emotional need is speed and independence. Habit is instant reaction; safety is an open road."),
    Taurus: b("ماه در ثور: در شرف. نیاز به ثبات حس، غذا، بدن و دارایی آشناست. عادت کند و تسلی‌بخش است.", "Moon in Taurus: in exaltation. Need is sensory stability, food, body, familiar goods. Habit is slow and soothing."),
    Gemini: b("ماه در جوزا: نیاز به حرف، تنوع و نزدیکان است. عادت، فکر را به جای احساس می‌نشاند.", "Moon in Gemini: need is talk, variety, siblings of the mind. Habit puts thought where feeling might be."),
    Cancer: b("ماه در سرطان: در منزل. نیاز و عادت یکی می‌شوند — خانه، مادر، حافظه، حفاظت. امنیت در تعلق است.", "Moon in Cancer: in domicile. Need and habit coincide — home, mother, memory, protection. Safety is belonging."),
    Leo: b("ماه در اسد: نیاز به دیده شدنِ قلب است. عادت، نمایش وفادارانه و گرماست.", "Moon in Leo: need is to have the heart seen. Habit is loyal warmth and display."),
    Virgo: b("ماه در سنبله: نیاز از راه خدمت و نظم کوچک برآورده می‌شود. عادت، نگرانی مفید و اصلاح است.", "Moon in Virgo: need is met through service and small order. Habit is useful worry and repair."),
    Libra: b("ماه در میزان: نیاز به همراه و زیبایی محیط است. عادت، سازش برای حفظ صلح.", "Moon in Libra: need is a companion and a beautiful room. Habit is compromise to keep the peace."),
    Scorpio: b("ماه در عقرب: در هبوط. نیاز شدت و وفاداری مطلق است. عادت، حفاظت از زخم با کنترل و سکوت.", "Moon in Scorpio: in fall. Need is intensity and absolute loyalty. Habit guards the wound with control and silence."),
    Sagittarius: b("ماه در قوس: نیاز به معنا و فضای باز است. عادت، امید و فرار از حصار خانگی. امنیت وقتی حس می‌شود که افق دیده شود — نه وقتی دیوار خانه کامل است.", "Moon in Sagittarius: need is meaning and open space. Habit is hope and flight from a tight home. Safety is a visible horizon, not a finished wall."),
    Capricorn: b("ماه در جدی: در وبال. نیاز به شایستگی و ساختار است. عادت، فشردن احساس تا زمان مناسب.", "Moon in Capricorn: in detriment. Need is competence and structure. Habit compresses feeling until it is timely."),
    Aquarius: b("ماه در دلو: نیاز به آزادی در تعلق است. عادت، فاصلهٔ دوستانه و وفاداری به اصل.", "Moon in Aquarius: need is freedom inside belonging. Habit is friendly distance and loyalty to a principle."),
    Pisces: b("ماه در حوت: نیاز به یکی شدن و تصویر است. عادت، جذب جو و محو مرز هیجانی.", "Moon in Pisces: need is fusion and image. Habit absorbs the atmosphere and blurs emotional edges."),
  },
  MERCURY: {
    Aries: b("عطارد در حمل: ادراک تند، قطع‌کننده، مبارز. بیان پیش از اتمام فکر می‌آید.", "Mercury in Aries: perception is fast, cutting, combative. Speech arrives before the thought is finished."),
    Taurus: b("عطارد در ثور: فکر کند، حسی، عملی. بیان وزن دارد و به شواهد ملموس می‌چسبد.", "Mercury in Taurus: thought is slow, sensory, practical. Speech has weight and clings to tangible proof."),
    Gemini: b("عطارد در جوزا: در منزل. ادراک دوگانه، چابک، شبکه‌ای. بیان بازی و اطلاعات است.", "Mercury in Gemini: in domicile. Perception is dual, quick, networked. Speech is play and information."),
    Cancer: b("عطارد در سرطان: فکر حافظه‌ای و محافظ. بیان از احساس خانواده رنگ می‌گیرد.", "Mercury in Cancer: thought is memorial and protective. Speech is coloured by family feeling."),
    Leo: b("عطارد در اسد: ادراک نمایشی و مرکزی. بیان داستان خود را می‌گوید.", "Mercury in Leo: perception is dramatic and central. Speech tells the story of the self."),
    Virgo: b("عطارد در سنبله: در منزل و شرف. ادراک تمایزگر، فنی، اصلاح‌کننده. بیان دقیق و خدمت‌گر است.", "Mercury in Virgo: in domicile and exaltation. Perception discriminates, crafts, revises. Speech is precise and of use."),
    Libra: b("عطارد در میزان: فکر مقایسه‌ای و عادل. بیان دیپلماسی است و از تیزی می‌پرهیزد.", "Mercury in Libra: thought compares and weighs. Speech is diplomacy and avoids the sharp edge."),
    Scorpio: b("عطارد در عقرب: ادراک نفوذی، پژوهشی، بی‌اعتماد به سطح. بیان کم و سنگین است.", "Mercury in Scorpio: perception probes, researches, distrusts the surface. Speech is scarce and heavy."),
    Sagittarius: b("عطارد در قوس: در وبال. فکر به معنا و کل می‌پرد و جزئیات را رها می‌کند. بیان باوری است.", "Mercury in Sagittarius: in detriment. Thought leaps to meaning and the whole, dropping detail. Speech is confessional of belief."),
    Capricorn: b("عطارد در جدی: ادراک ساختاری، زمانی، مدیریتی. بیان مسئول و کم‌حاشیه است.", "Mercury in Capricorn: perception is structural, timed, managerial. Speech is responsible and spare."),
    Aquarius: b("عطارد در دلو: فکر اصولی، جمعی، ناگهانی. بیان از فرد جدا می‌شود و به ایده می‌پیوندد.", "Mercury in Aquarius: thought is principled, collective, sudden. Speech leaves the person and joins the idea."),
    Pisces: b("عطارد در حوت: در وبال و هبوط. ادراک تصویری و همدل است، نه خطی. بیان شعر، ابهام و جذب است.", "Mercury in Pisces: in detriment and fall. Perception is imaginal and empathic, not linear. Speech is poem, haze, and absorption."),
  },
  VENUS: {
    Aries: b("زهره در حمل: در وبال. جذب از راه تعقیب و پیشگامی است. عشق می‌خواهد آغاز کند و از انتظار خسته می‌شود.", "Venus in Aries: in detriment. Attraction is pursuit and first fire. Love wants to begin and tires of waiting."),
    Taurus: b("زهره در ثور: در منزل. ارزش در حس، بدن، وفاداری و دارایی آرام است. عشق پایدار و مالک است.", "Venus in Taurus: in domicile. Value lives in sense, body, loyalty, slow goods. Love is steady and possessive."),
    Gemini: b("زهره در جوزا: جذب در گفتگو و تنوع است. عشق سبک، کنجکاو و چندریشه است.", "Venus in Gemini: attraction is conversation and variety. Love is light, curious, many-rooted."),
    Cancer: b("زهره در سرطان: ارزش در مراقبت و خانه است. عشق تغذیه می‌کند و به تعلق نیاز دارد.", "Venus in Cancer: value is care and home. Love feeds and needs to belong."),
    Leo: b("زهره در اسد: جذب نمایش قلب و وفاداری باشکوه است. عشق می‌خواهد جشن گرفته شود.", "Venus in Leo: attraction is heart-display and proud loyalty. Love wants to be celebrated."),
    Virgo: b("زهره در سنبله: در هبوط. ارزش در خدمت دقیق است. عشق با نقد و کار محبت می‌کند.", "Venus in Virgo: in fall. Value is precise service. Love shows as critique and useful labour."),
    Libra: b("زهره در میزان: در منزل. جذب زیبایی، عدالت و شریک است. عشق هنرِ توازن است.", "Venus in Libra: in domicile. Attraction is beauty, fairness, the partner. Love is the art of balance."),
    Scorpio: b("زهره در عقرب: در وبال. ارزش شدت، ادغام و وفاداری مطلق است. عشق بحران را از دست نمی‌دهد.", "Venus in Scorpio: in detriment. Value is intensity, fusion, absolute loyalty. Love will not skip the crisis."),
    Sagittarius: b("زهره در قوس: جذب معنا، سفر و صدق است. عشق به آزادی افق نیاز دارد.", "Venus in Sagittarius: attraction is meaning, travel, candour. Love needs a free horizon."),
    Capricorn: b("زهره در جدی: ارزش تعهد، زمان و شأن اجتماعی است. عشق قرارداد بلندمدت است.", "Venus in Capricorn: value is commitment, time, social dignity. Love is a long contract."),
    Aquarius: b("زهره در دلو: جذب دوستی، اصل و فاصله است. عشق غیرشخصی و وفادار به آزادی طرف است.", "Venus in Aquarius: attraction is friendship, principle, space. Love is impersonal and loyal to the other’s freedom."),
    Pisces: b("زهره در حوت: در شرف. ارزش همدلی، تصویر و فداکاری است. عشق محو مرز می‌کند.", "Venus in Pisces: in exaltation. Value is empathy, image, offering. Love dissolves the border."),
  },
  MARS: {
    Aries: b("مریخ در حمل: در منزل. کنش مستقیم، شجاع، آغازگر است. جدال رو در روست.", "Mars in Aries: in domicile. Action is direct, brave, initiating. Conflict is face-to-face."),
    Taurus: b("مریخ در ثور: در وبال. کنش کند، مقاوم، دفاع از دارایی است. خشم دیر می‌آید و دیر می‌رود.", "Mars in Taurus: in detriment. Action is slow, stubborn, a defence of goods. Anger comes late and stays."),
    Gemini: b("مریخ در جوزا: کنش در حرف، مهارت و جابه‌جایی است. جدال کلامی و پراکنده است.", "Mars in Gemini: action is speech, skill, displacement. Conflict is verbal and scattered."),
    Cancer: b("مریخ در سرطان: در هبوط. کنش از راه حفاظت و خلق‌وخو است. خشم غیرمستقیم و خانوادگی می‌شود.", "Mars in Cancer: in fall. Action moves through protection and mood. Anger becomes indirect and familial."),
    Leo: b("مریخ در اسد: کنش نمایشی، وفادار، قلبی است. جدال بر سر شأن است.", "Mars in Leo: action is dramatic, loyal, of the heart. Conflict is over dignity."),
    Virgo: b("مریخ در سنبله: کنش فنی، اصلاح‌گر، دقیق است. جدال با نقص سیستم است.", "Mars in Virgo: action is technical, revising, precise. Conflict is with the flaw in the system."),
    Libra: b("مریخ در میزان: در وبال. کنش به تعویق و از راه دیگری است. جدال در قرارداد و عدالت رخ می‌دهد.", "Mars in Libra: in detriment. Action is delayed and done through the other. Conflict lives in the contract and in fairness."),
    Scorpio: b("مریخ در عقرب: در منزل (سنتی). کنش نفوذی، استراتژیک، باززا است. جدال پنهان و تمام‌کننده است.", "Mars in Scorpio: traditional domicile. Action is probing, strategic, regenerative. Conflict is hidden and final."),
    Sagittarius: b("مریخ در قوس: کنش برای معنا و افق است. جدال ایدئولوژیک و صریح است.", "Mars in Sagittarius: action is for meaning and the far. Conflict is ideological and blunt."),
    Capricorn: b("مریخ در جدی: در شرف. کنش ساختاری، صبور، هدف‌دار است. جدال مدیریت زمان و قدرت است.", "Mars in Capricorn: in exaltation. Action is structural, patient, aimed. Conflict is the management of time and power."),
    Aquarius: b("مریخ در دلو: کنش برای اصل و جمع است. جدال ناگهانی و غیرشخصی است.", "Mars in Aquarius: action is for the principle and the group. Conflict is sudden and impersonal."),
    Pisces: b("مریخ در حوت: کنش نفوذپذیر، فداکار یا پراکنده است. جدال در مه و از راه تصویر رخ می‌دهد.", "Mars in Pisces: action is porous, sacrificial, or diffuse. Conflict happens in fog and through image."),
  },
  JUPITER: {
    Aries: b("مشتری در حمل: گسترش از راه شجاعت و آغاز است. معنا در پیشگامی است.", "Jupiter in Aries: growth is courage and beginning. Meaning lives in the first step."),
    Taurus: b("مشتری در ثور: گسترش از راه دارایی پایدار و لذت حس است. خوش‌بینی ملموس است.", "Jupiter in Taurus: growth is durable goods and sensory pleasure. Optimism is concrete."),
    Gemini: b("مشتری در جوزا: در وبال. گسترش در اطلاعات پراکنده است. معنا چندشاخه می‌شود.", "Jupiter in Gemini: in detriment. Growth is scattered information. Meaning forks."),
    Cancer: b("مشتری در سرطان: در شرف. گسترش از راه خانه، قوم و تغذیه است. خوش‌بینی محافظ است.", "Jupiter in Cancer: in exaltation. Growth is home, people, nourishment. Optimism protects."),
    Leo: b("مشتری در اسد: گسترش نمایشی و قلبی است. معنا در سخاوت دیده شدن است.", "Jupiter in Leo: growth is heart-display. Meaning is generosity of being seen."),
    Virgo: b("مشتری در سنبله: در وبال. گسترش در کار دقیق و خدمت است. معنا کوچک و مفید می‌شود.", "Jupiter in Virgo: in detriment. Growth is precise work and service. Meaning becomes small and useful."),
    Libra: b("مشتری در میزان: گسترش از راه شراکت و عدالت است. معنا توازن اجتماعی است.", "Jupiter in Libra: growth is partnership and fairness. Meaning is social balance."),
    Scorpio: b("مشتری در عقرب: گسترش از راه بحران و باززایی است. معنا در عمق پنهان است.", "Jupiter in Scorpio: growth is crisis and regeneration. Meaning is hidden in the depth."),
    Sagittarius: b("مشتری در قوس: در منزل. گسترش باور، سفر و آموزش است. خوش‌بینی افق است.", "Jupiter in Sagittarius: in domicile. Growth is belief, travel, teaching. Optimism is the horizon."),
    Capricorn: b("مشتری در جدی: در هبوط. گسترش ساختاری و کند است. معنا مسئولیت است نه گشایش.", "Jupiter in Capricorn: in fall. Growth is structural and slow. Meaning is duty, not ease."),
    Aquarius: b("مشتری در دلو: گسترش جمعی و اصولی است. معنا اصلاح آینده است.", "Jupiter in Aquarius: growth is collective and principled. Meaning is reform of the future."),
    Pisces: b("مشتری در حوت: در منزل. گسترش همدلی، تصویر و محو مرز است. خوش‌بینی بی‌کران و بی‌حفاظ است.", "Jupiter in Pisces: in domicile. Growth is empathy, image, dissolution. Optimism is boundless and unguarded."),
  },
  SATURN: {
    Aries: b("زحل در حمل: در هبوط. حد بر سر آغاز می‌نشیند. زمان، شجاعت را می‌آزماید و تأخیر می‌آموزد.", "Saturn in Aries: in fall. Limit sits on initiation. Time tests courage and teaches delay."),
    Taurus: b("زحل در ثور: حد بر دارایی و بدن است. زمان ارزش پایدار می‌سازد.", "Saturn in Taurus: limit is on goods and the body. Time builds durable value."),
    Gemini: b("زحل در جوزا: حد بر گفتار و فکر است. زمان، تمرکز را به پراکندگی تحمیل می‌کند.", "Saturn in Gemini: limit is on speech and thought. Time forces focus onto scatter."),
    Cancer: b("زحل در سرطان: در وبال. حد بر خانه و احساس است. زمان، تعلق را با مسئولیت سرد می‌کند.", "Saturn in Cancer: in detriment. Limit is on home and feeling. Time cools belonging with duty."),
    Leo: b("زحل در اسد: در وبال. حد بر نمایش قلب است. زمان، شأن را از راه محرومیت می‌آموزد.", "Saturn in Leo: in detriment. Limit is on heart-display. Time teaches dignity through withholding."),
    Virgo: b("زحل در سنبله: حد بر کار و بدن خدمت است. زمان، مهارت را کامل می‌کند.", "Saturn in Virgo: limit is on work and the serving body. Time completes the craft."),
    Libra: b("زحل در میزان: در شرف. حد عادلانه است. زمان، قرارداد و توازن را می‌سازد.", "Saturn in Libra: in exaltation. Limit is just. Time builds the contract and the balance."),
    Scorpio: b("زحل در عقرب: حد بر بحران و اشتراک است. زمان، قدرت پنهان را می‌پزد.", "Saturn in Scorpio: limit is on crisis and the shared. Time cooks hidden power."),
    Sagittarius: b("زحل در قوس: حد بر باور و افق است. زمان، ایمان را به قانون تبدیل می‌کند.", "Saturn in Sagittarius: limit is on belief and the far. Time turns faith into law."),
    Capricorn: b("زحل در جدی: در منزل. حد و زمان یکی‌اند. مسئولیت مسیر اصلی است.", "Saturn in Capricorn: in domicile. Limit and time are one. Duty is the path."),
    Aquarius: b("زحل در دلو: در منزل (سنتی). حد بر جمع و اصل است. زمان، ساختار آینده را می‌بندد.", "Saturn in Aquarius: traditional domicile. Limit is on the collective and the principle. Time binds the future’s structure."),
    Pisces: b("زحل در حوت: حد بر تصویر و همدلی است. زمان، مرز را در امر بی‌مرز می‌آموزد.", "Saturn in Pisces: limit is on image and empathy. Time teaches a border inside the boundless."),
  },
  URANUS: {
    Aries: b("اورانوس در حمل: گسست از راه فرد آغازگر است. بیداری ناگهانی و مستقل.", "Uranus in Aries: rupture through the initiating individual. Awakening is sudden and independent."),
    Taurus: b("اورانوس در ثور: گسست در ارزش، بدن و اقتصاد حس. ثبات می‌شکند تا شکل تازه‌ای بگیرد.", "Uranus in Taurus: rupture in value, body, sensory economy. Stability breaks to take a new form."),
    Gemini: b("اورانوس در جوزا: گسست در زبان و شبکه. فکر ناگهان چندشاخه می‌شود.", "Uranus in Gemini: rupture in language and network. Thought forks without warning."),
    Cancer: b("اورانوس در سرطان: گسست در خانه و تعلق. خانواده شکل غیرسنتی می‌گیرد.", "Uranus in Cancer: rupture in home and belonging. Family takes a non-traditional shape."),
    Leo: b("اورانوس در اسد: گسست در نمایش خود. خلاقیت از قاعدهٔ قلب خارج می‌شود.", "Uranus in Leo: rupture in self-display. Creativity leaves the heart’s usual rule."),
    Virgo: b("اورانوس در سنبله: گسست در کار و سلامت سیستم. روش ناگهان عوض می‌شود.", "Uranus in Virgo: rupture in work and the health of systems. Method changes without notice."),
    Libra: b("اورانوس در میزان: گسست در قرارداد و رابطه. توازن با آزادی بازتعریف می‌شود.", "Uranus in Libra: rupture in contract and relating. Balance is redefined by freedom."),
    Scorpio: b("اورانوس در عقرب: گسست در قدرت پنهان و بحران. باززایی ناگهانی است.", "Uranus in Scorpio: rupture in hidden power and crisis. Regeneration is abrupt."),
    Sagittarius: b("اورانوس در قوس: گسست در باور و افق. معنا ناگهان عوض می‌شود.", "Uranus in Sagittarius: rupture in belief and horizon. Meaning changes at a stroke."),
    Capricorn: b("اورانوس در جدی: گسست در نهاد و زمان. ساختار کهنه می‌شکند.", "Uranus in Capricorn: rupture in institution and time. Old structure breaks."),
    Aquarius: b("اورانوس در دلو: هم‌خوانی نسلی. گسست جمعی و نوآوری اصل است.", "Uranus in Aquarius: generational affinity. Rupture is collective; invention is the principle."),
    Pisces: b("اورانوس در حوت: گسست در تصویر جمعی و مرز روح. بیداری از راه مه.", "Uranus in Pisces: rupture in the collective image and the soul’s border. Awakening comes through fog."),
  },
  NEPTUNE: {
    Aries: b("نپتون در حمل: الهام از راه کنش محو. شجاعت تصویری و فداکاری آغازگر.", "Neptune in Aries: vision through dissolving action. Courage is imaginal; sacrifice initiates."),
    Taurus: b("نپتون در ثور: محو ارزش مادی در تصویر. لذت حس معنوی می‌شود.", "Neptune in Taurus: material value dissolves into image. Sensory pleasure becomes spiritual."),
    Gemini: b("نپتون در جوزا: محو زبان. اطلاعات مه می‌شود؛ فکر شاعرانه است.", "Neptune in Gemini: language dissolves. Information hazes; thought turns poetic."),
    Cancer: b("نپتون در سرطان: محو خانه و مادر در اسطوره. تعلق بی‌مرز است.", "Neptune in Cancer: home and mother dissolve into myth. Belonging is unbounded."),
    Leo: b("نپتون در اسد: نمایش قلب اسطوره‌ای می‌شود. خلاقیت الهام است نه اراده.", "Neptune in Leo: heart-display becomes myth. Creativity is inspiration, not will."),
    Virgo: b("نپتون در سنبله: محو کار دقیق در خدمت نامرئی. سلامت و نقد مه می‌گیرند.", "Neptune in Virgo: precise work dissolves into unnamed service. Health and critique haze."),
    Libra: b("نپتون در میزان: محو قرارداد در عشق آرمانی. توازن تصویری است.", "Neptune in Libra: the contract dissolves into ideal love. Balance is an image."),
    Scorpio: b("نپتون در عقرب: محو قدرت در راز. بحران معنوی و ادغام.", "Neptune in Scorpio: power dissolves into mystery. Crisis is spiritual fusion."),
    Sagittarius: b("نپتون در قوس: محو باور در ایمان بی‌شکل. افق مه است.", "Neptune in Sagittarius: belief dissolves into formless faith. The horizon is mist."),
    Capricorn: b("نپتون در جدی: محو نهاد در رؤیا. ساختار با الهام نرم می‌شود.", "Neptune in Capricorn: institution dissolves into dream. Structure is softened by vision."),
    Aquarius: b("نپتون در دلو: محو جمع در آرمان. نوآوری روحی است.", "Neptune in Aquarius: the collective dissolves into the ideal. Invention is of the spirit."),
    Pisces: b("نپتون در حوت: هم‌خوانی. الهام، همدلی و محو مرز در خانهٔ خود است.", "Neptune in Pisces: affinity. Vision, empathy and dissolution are at home."),
  },
  PLUTO: {
    Aries: b("پلوتو در حمل: دگرگونی از راه ارادهٔ خام. قدرت آغازگر و بی‌ملاحظه.", "Pluto in Aries: transformation through raw will. Power initiates without apology."),
    Taurus: b("پلوتو در ثور: دگرگونی ارزش و بقا. قدرت در دارایی و بدن جمع می‌شود.", "Pluto in Taurus: transformation of value and survival. Power gathers in goods and the body."),
    Gemini: b("پلوتو در جوزا: دگرگونی زبان و اطلاعات. قدرت در روایت است.", "Pluto in Gemini: transformation of language and information. Power is in the story."),
    Cancer: b("پلوتو در سرطان: دگرگونی خانه و قوم. قدرت در تعلق و حافظه است.", "Pluto in Cancer: transformation of home and people. Power is belonging and memory."),
    Leo: b("پلوتو در اسد: دگرگونی نمایش خود. قدرت در قلب و خلاقیت متمرکز است.", "Pluto in Leo: transformation of self-display. Power concentrates in heart and creation."),
    Virgo: b("پلوتو در سنبله: دگرگونی کار و پاکسازی. قدرت در نقد و خدمت پنهان است.", "Pluto in Virgo: transformation of work and purification. Power is critique and hidden service."),
    Libra: b("پلوتو در میزان: دگرگونی قرارداد و عدالت. قدرت در رابطه است.", "Pluto in Libra: transformation of contract and justice. Power is in the bond."),
    Scorpio: b("پلوتو در عقرب: هم‌خوانی. دگرگونی در خانهٔ بحران و باززایی.", "Pluto in Scorpio: affinity. Transformation at home in crisis and regeneration."),
    Sagittarius: b("پلوتو در قوس: دگرگونی باور و افق. قدرت در معنا و قانون دور است.", "Pluto in Sagittarius: transformation of belief and horizon. Power is meaning and far law."),
    Capricorn: b("پلوتو در جدی: دگرگونی نهاد و زمان. قدرت ساختاری و تاریخی است.", "Pluto in Capricorn: transformation of institution and time. Power is structural and historical."),
    Aquarius: b("پلوتو در دلو: دگرگونی جمع و آینده. قدرت در شبکه است.", "Pluto in Aquarius: transformation of the collective and the future. Power is the network."),
    Pisces: b("پلوتو در حوت: دگرگونی روح و تصویر جمعی. قدرت نامرئی است.", "Pluto in Pisces: transformation of spirit and the collective image. Power is invisible."),
  },
};

export const PLANET_IN_HOUSE: Record<string, Record<number, Bi>> = {
  SUN: {
    1: b("خورشید در خانهٔ ۱: اراده و نمود یکی‌اند. زندگی از خودِ دیده‌شده آغاز می‌شود.", "Sun in house 1: will and appearance are one. Life starts from the seen self."),
    2: b("خورشید در خانهٔ ۲: هویت از راه ارزش شخصی و معیشت می‌درخشد.", "Sun in house 2: identity shines through personal value and livelihood."),
    3: b("خورشید در خانهٔ ۳: اراده در گفتار، خواهر/برادر و مسیرهای نزدیک است.", "Sun in house 3: the will lives in speech, siblings, the near road."),
    4: b("خورشید در خانهٔ ۴: هویت در بنیان، پدر/خانه و انتهای عمر ریشه دارد.", "Sun in house 4: identity roots in foundation, father/home, the end of life."),
    5: b("خورشید در خانهٔ ۵: اراده در خلق، عشق و بازی است.", "Sun in house 5: the will is creation, love-affairs, play."),
    6: b("خورشید در خانهٔ ۶: هویت از کار روزانه و خدمت به بدن ساخته می‌شود.", "Sun in house 6: identity is built from daily work and service to the body."),
    7: b("خورشید در خانهٔ ۷: اراده در آینهٔ شریک و قرارداد بیدار می‌شود.", "Sun in house 7: the will wakes in the partner’s mirror and the contract."),
    8: b("خورشید در خانهٔ ۸: هویت از اشتراک، بحران و آنچه از دیگری می‌آید می‌گذرد.", "Sun in house 8: identity passes through the shared, crisis, what comes from the other."),
    9: b("خورشید در خانهٔ ۹: اراده در سفر، باور و آموزش عالی است. هویت می‌خواهد معنا را عمومی کند.", "Sun in house 9: the will is travel, belief, higher teaching. Identity wants meaning made public."),
    10: b("خورشید در خانهٔ ۱۰: هویت عمومی و حرفه‌ای یکی است. دیده شدنِ مقام ضروری است. زندگی از کارِ دیده‌شده تغذیه می‌شود.", "Sun in house 10: public and vocational identity are one. To be seen in rank is necessary. Life is fed by visible work."),
    11: b("خورشید در خانهٔ ۱۱: اراده در جمع، دوستان و امید به آینده است.", "Sun in house 11: the will lives in the group, friends, hope of the future."),
    12: b("خورشید در خانهٔ ۱۲: هویت در نهان، انزوا و خدمت بی‌نام کار می‌کند.", "Sun in house 12: identity works in the hidden, in withdrawal, in unnamed service."),
  },
  MOON: {
    1: b("ماه در خانهٔ ۱: خلق‌وخو چهره است. نیاز عاطفی فوراً دیده می‌شود.", "Moon in house 1: mood is the face. Emotional need is immediately visible."),
    2: b("ماه در خانهٔ ۲: امنیت در دارایی و بدن حس است.", "Moon in house 2: safety is felt in goods and the sensing body."),
    3: b("ماه در خانهٔ ۳: عادت گفتگو و رفت‌وآمد نزدیک است.", "Moon in house 3: habit is talk and the near commute."),
    4: b("ماه در خانهٔ ۴: خانه و مادر مرکز عادت‌اند. ریشه ضروری است.", "Moon in house 4: home and mother are the habit’s centre. Roots are required."),
    5: b("ماه در خانهٔ ۵: نیاز در خلق، فرزند و لذت برآورده می‌شود.", "Moon in house 5: need is met in creating, children, pleasure."),
    6: b("ماه در خانهٔ ۶: عادت کار و مراقبت از بدن است. خدمت، آرامش می‌آورد. نیاز در مفید بودن آرام می‌گیرد.", "Moon in house 6: habit is work and care of the body. Service soothes. Need settles when it is useful."),
    7: b("ماه در خانهٔ ۷: امنیت در شریک است. خلق‌وخو به رابطه وابسته است.", "Moon in house 7: safety is the partner. Mood depends on the bond."),
    8: b("ماه در خانهٔ ۸: نیاز به ادغام عمیق و مواجهه با فقدان.", "Moon in house 8: need is deep fusion and facing loss."),
    9: b("ماه در خانهٔ ۹: عادت سفر و معنا. خانه در افق است.", "Moon in house 9: habit is travel and meaning. Home is on the horizon."),
    10: b("ماه در خانهٔ ۱۰: نیاز دیده شدن عمومی. حرفه با خلق‌وخو گره می‌خورد.", "Moon in house 10: need is public visibility. Vocation is tied to mood."),
    11: b("ماه در خانهٔ ۱۱: امنیت در دوستان و جمع امید.", "Moon in house 11: safety is friends and the hopeful group."),
    12: b("ماه در خانهٔ ۱۲: نیاز پنهان، خواب، تنهایی مفید.", "Moon in house 12: need is hidden — sleep, useful solitude."),
  },
  MERCURY: {
    1: b("عطارد در خانهٔ ۱: نمود سخن‌گو است. فکر همان چهره است.", "Mercury in house 1: the manner speaks. Thought is the face."),
    2: b("عطارد در خانهٔ ۲: ادراک به ارزش و معیشت می‌چسبد.", "Mercury in house 2: perception clings to value and livelihood."),
    3: b("عطارد در خانهٔ ۳: خانهٔ طبیعی گفتار. یادگیری نزدیک و پیوسته.", "Mercury in house 3: speech’s natural house. Learning is near and constant."),
    4: b("عطارد در خانهٔ ۴: فکر در خانه و حافظهٔ خانواده ریشه دارد.", "Mercury in house 4: thought roots in the house and family memory."),
    5: b("عطارد در خانهٔ ۵: بیان خلاق، بازی با کلمات.", "Mercury in house 5: creative speech, play with words."),
    6: b("عطارد در خانهٔ ۶: فکر در خدمت کار روزانه و سلامت.", "Mercury in house 6: thought serves daily work and health."),
    7: b("عطارد در خانهٔ ۷: ادراک در گفتگوی شریک و قرارداد.", "Mercury in house 7: perception lives in the partner’s dialogue and the contract."),
    8: b("عطارد در خانهٔ ۸: فکر پژوهشی، مالیِ شریک، راز.", "Mercury in house 8: research mind, the other’s money, secrets."),
    9: b("عطارد در خانهٔ ۹: بیان باور، نشر، زبان دور.", "Mercury in house 9: speech of belief, publishing, far language."),
    10: b("عطارد در خانهٔ ۱۰: فکر حرفه‌ای و عمومی.", "Mercury in house 10: vocational, public thought."),
    11: b("عطارد در خانهٔ ۱۱: شبکه، دوستان فکری، امید جمعی.", "Mercury in house 11: network, mind-friends, collective hope."),
    12: b("عطارد در خانهٔ ۱۲: فکر نهان، نوشتن در خلوت، زبان خواب.", "Mercury in house 12: hidden thought, writing in solitude, the language of sleep."),
  },
  VENUS: {
    1: b("زهره در خانهٔ ۱: نمود جذاب و آشتی‌جو. بدن خودِ ارزش است.", "Venus in house 1: manner is attractive and peacemaking. The body is the value."),
    2: b("زهره در خانهٔ ۲: خانهٔ طبیعی مال. لذت و دارایی یکی‌اند.", "Venus in house 2: money’s natural house. Pleasure and goods are one."),
    3: b("زهره در خانهٔ ۳: زیبایی در گفتار و نزدیکان.", "Venus in house 3: beauty in speech and the near ones."),
    4: b("زهره در خانهٔ ۴: خانه باید زیبا و آرام باشد. ریشهٔ محبت.", "Venus in house 4: the home must be beautiful and calm. Roots of affection."),
    5: b("زهره در خانهٔ ۵: عشق، هنر، لذت. خانهٔ طبیعی خلق.", "Venus in house 5: love, art, pleasure. Creation’s natural house."),
    6: b("زهره در خانهٔ ۶: محبت از راه خدمت و کار با دیگران.", "Venus in house 6: affection through service and work with others."),
    7: b("زهره در خانهٔ ۷: خانهٔ طبیعی شریک. ارزش در قرارداد برابر.", "Venus in house 7: the partner’s natural house. Value is an equal contract."),
    8: b("زهره در خانهٔ ۸: جذب در ادغام، ارث، بحران مشترک.", "Venus in house 8: attraction in fusion, inheritance, shared crisis."),
    9: b("زهره در خانهٔ ۹: عشق سفر و معنا. زیبایی باور.", "Venus in house 9: love of travel and meaning. Beauty of belief."),
    10: b("زهره در خانهٔ ۱۰: حرفه از راه زیبایی، هنر یا رابطهٔ عمومی.", "Venus in house 10: vocation through beauty, art, or public relating."),
    11: b("زهره در خانهٔ ۱۱: دوستی به‌عنوان عشق. امید زیبا.", "Venus in house 11: friendship as love. Beautiful hope."),
    12: b("زهره در خانهٔ ۱۲: عشق نهان، فداکاری بی‌نام.", "Venus in house 12: hidden love, unnamed offering."),
  },
  MARS: {
    1: b("مریخ در خانهٔ ۱: نمود مبارز. بدن آغازگر است.", "Mars in house 1: combative manner. The body initiates."),
    2: b("مریخ در خانهٔ ۲: جدال برای مال و ارزش. کار برای دارایی.", "Mars in house 2: fight for goods and value. Work for what is owned."),
    3: b("مریخ در خانهٔ ۳: حرف تیز، رفت‌وآمد پرشتاب.", "Mars in house 3: sharp speech, hurried near-travel."),
    4: b("مریخ در خانهٔ ۴: جدال در خانه و بنیان. دفاع از ریشه.", "Mars in house 4: conflict in the home and foundation. Defence of roots."),
    5: b("مریخ در خانهٔ ۵: کنش خلاق، عشق پرشور، ریسک.", "Mars in house 5: creative action, passionate love, risk."),
    6: b("مریخ در خانهٔ ۶: کار به‌عنوان میدان نبرد. بدن خدمت‌گر.", "Mars in house 6: work as the battlefield. The serving body."),
    7: b("مریخ در خانهٔ ۷: جدال در قرارداد. شریک رقیب و معلم کنش.", "Mars in house 7: conflict in the contract. The partner is rival and teacher of action."),
    8: b("مریخ در خانهٔ ۸: کنش در بحران و مال مشترک. شدت پنهان.", "Mars in house 8: action in crisis and shared money. Hidden intensity."),
    9: b("مریخ در خانهٔ ۹: مبارزه برای باور و افق.", "Mars in house 9: a fight for belief and the far."),
    10: b("مریخ در خانهٔ ۱۰: جاه‌طلبی عمومی. حرفه میدان است.", "Mars in house 10: public ambition. Vocation is the field."),
    11: b("مریخ در خانهٔ ۱۱: کنش در جمع و برای امید.", "Mars in house 11: action in the group and for hope."),
    12: b("مریخ در خانهٔ ۱۲: جدال نهان، دشمن نامرئی، کار در خلوت.", "Mars in house 12: hidden conflict, unnamed enemy, work in solitude."),
  },
  JUPITER: {
    1: b("مشتری در خانهٔ ۱: نمود گشاده و خوش‌بین. بدن برکت می‌جوید.", "Jupiter in house 1: open, optimistic manner. The body looks for blessing."),
    2: b("مشتری در خانهٔ ۲: گشایش مال و ارزش. سخاوت معیشت.", "Jupiter in house 2: opening of goods and value. Generosity of livelihood."),
    3: b("مشتری در خانهٔ ۳: گشایش گفتار و یادگیری نزدیک.", "Jupiter in house 3: opening of speech and near learning."),
    4: b("مشتری در خانهٔ ۴: برکت خانه و بنیان. خانواده به‌عنوان معنا.", "Jupiter in house 4: blessing of home and foundation. Family as meaning."),
    5: b("مشتری در خانهٔ ۵: گشایش خلق، فرزند، لذت.", "Jupiter in house 5: opening of creation, children, pleasure."),
    6: b("مشتری در خانهٔ ۶: برکت کار و خدمت. رشد از راه مفید بودن.", "Jupiter in house 6: blessing of work and service. Growth through being useful."),
    7: b("مشتری در خانهٔ ۷: گشایش از شریک. قرارداد آموزگار است.", "Jupiter in house 7: opening through the partner. The contract teaches."),
    8: b("مشتری در خانهٔ ۸: گشایش از مال دیگری و بحران. معنا در فقدان.", "Jupiter in house 8: opening from the other’s resources and from crisis. Meaning in loss."),
    9: b("مشتری در خانهٔ ۹: خانهٔ طبیعی معنا، سفر، نشر.", "Jupiter in house 9: meaning’s natural house — travel, publishing."),
    10: b("مشتری در خانهٔ ۱۰: گشایش مقام. حرفه با معنا.", "Jupiter in house 10: opening of rank. Vocation carries meaning."),
    11: b("مشتری در خانهٔ ۱۱: برکت دوستان و امید.", "Jupiter in house 11: blessing of friends and hope."),
    12: b("مشتری در خانهٔ ۱۲: گشایش نهان، حمایت نامرئی، ایمان در خلوت.", "Jupiter in house 12: hidden opening, unseen support, faith in solitude."),
  },
  SATURN: {
    1: b("زحل در خانهٔ ۱: نمود جدّی، زمان‌دیده. بدن مسئولیت است.", "Saturn in house 1: sober, time-worn manner. The body is a responsibility."),
    2: b("زحل در خانهٔ ۲: حد مال. ارزش با کار طولانی ساخته می‌شود.", "Saturn in house 2: limit on goods. Value is built by long work."),
    3: b("زحل در خانهٔ ۳: حد گفتار. یادگیری کند و سنگین.", "Saturn in house 3: limit on speech. Learning is slow and heavy."),
    4: b("زحل در خانهٔ ۴: حد خانه و پدر. بنیان با زمان سخت می‌شود.", "Saturn in house 4: limit on home and father. Foundation hardens with time."),
    5: b("زحل در خانهٔ ۵: حد لذت و خلق. خلاقیت مسئول است.", "Saturn in house 5: limit on pleasure and creation. Creativity is responsible."),
    6: b("زحل در خانهٔ ۶: کار به‌عنوان تکلیف. بدن نیازمند نظم.", "Saturn in house 6: work as duty. The body requires order."),
    7: b("زحل در خانهٔ ۷: قرارداد جدّی. شریک آموزگار زمان.", "Saturn in house 7: a serious contract. The partner teaches time."),
    8: b("زحل در خانهٔ ۸: حد اشتراک و بحران. ترس مفید از فقدان.", "Saturn in house 8: limit on the shared and on crisis. Useful fear of loss."),
    9: b("زحل در خانهٔ ۹: باور به‌عنوان قانون. سفر مسئول.", "Saturn in house 9: belief as law. Travel is responsible."),
    10: b("زحل در خانهٔ ۱۰: خانهٔ طبیعی مقام. حرفه با زمان ساخته می‌شود.", "Saturn in house 10: rank’s natural house. Vocation is built by time."),
    11: b("زحل در خانهٔ ۱۱: دوستان کم و پایدار. امید ساختاری.", "Saturn in house 11: few, lasting friends. Structured hope."),
    12: b("زحل در خانهٔ ۱۲: حد نهان. تنهایی کار است.", "Saturn in house 12: hidden limit. Solitude is the work."),
  },
  URANUS: {
    1: b("اورانوس در خانهٔ ۱: نمود ناگهانی و غیرعادی. بدن بیدار می‌شود.", "Uranus in house 1: sudden, unusual manner. The body wakes."),
    2: b("اورانوس در خانهٔ ۲: گسست ارزش و درآمد. مال غیرقابل پیش‌بینی.", "Uranus in house 2: rupture of value and income. Unpredictable goods."),
    3: b("اورانوس در خانهٔ ۳: گفتار برق‌آسا. مسیرهای نزدیک نامعمول.", "Uranus in house 3: lightning speech. Unusual near paths."),
    4: b("اورانوس در خانهٔ ۴: خانه غیرسنتی. گسست بنیان.", "Uranus in house 4: a non-traditional home. Rupture of foundation."),
    5: b("اورانوس در خانهٔ ۵: خلق ناگهانی. عشق آزاد.", "Uranus in house 5: sudden creation. Free love."),
    6: b("اورانوس در خانهٔ ۶: کار نامعمول. سلامت نوسان‌دار.", "Uranus in house 6: unusual work. Fluctuating health."),
    7: b("اورانوس در خانهٔ ۷: شریک غیرمنتظره. قرارداد آزادی.", "Uranus in house 7: an unexpected partner. A contract of freedom."),
    8: b("اورانوس در خانهٔ ۸: گسست در بحران و مال مشترک.", "Uranus in house 8: rupture in crisis and shared money."),
    9: b("اورانوس در خانهٔ ۹: باور ناگهانی. سفر نامعمول.", "Uranus in house 9: sudden belief. Unusual travel."),
    10: b("اورانوس در خانهٔ ۱۰: حرفهٔ نوآور. مقام غیرمنتظره.", "Uranus in house 10: inventive vocation. Unexpected rank."),
    11: b("اورانوس در خانهٔ ۱۱: خانهٔ طبیعی دوستان آینده. جمع بیدار.", "Uranus in house 11: the future-friends’ natural house. A waking group."),
    12: b("اورانوس در خانهٔ ۱۲: بیداری در خلوت. گسست نهان.", "Uranus in house 12: awakening in solitude. Hidden rupture."),
  },
  NEPTUNE: {
    1: b("نپتون در خانهٔ ۱: نمود سیال و تصویری. مرز بدن نازک است.", "Neptune in house 1: fluid, imaginal manner. The body’s border is thin."),
    2: b("نپتون در خانهٔ ۲: مال مه. ارزش معنوی به‌جای عدد.", "Neptune in house 2: hazy goods. Spiritual value instead of number."),
    3: b("نپتون در خانهٔ ۳: گفتار شاعرانه. مسیر نزدیک رؤیایی.", "Neptune in house 3: poetic speech. Dreamlike near paths."),
    4: b("نپتون در خانهٔ ۴: خانه به‌عنوان معبد یا مه. ریشهٔ اسطوره‌ای.", "Neptune in house 4: home as temple or fog. Mythic roots."),
    5: b("نپتون در خانهٔ ۵: خلق الهام‌گرفته. عشق آرمانی.", "Neptune in house 5: inspired creation. Ideal love."),
    6: b("نپتون در خانهٔ ۶: خدمت نامرئی. سلامت حساس به جو.", "Neptune in house 6: unseen service. Health sensitive to atmosphere."),
    7: b("نپتون در خانهٔ ۷: شریک تصویری. قرارداد مبهم.", "Neptune in house 7: an imaginal partner. A vague contract."),
    8: b("نپتون در خانهٔ ۸: ادغام روحی. مال مشترک مه.", "Neptune in house 8: spiritual fusion. Hazy shared resources."),
    9: b("نپتون در خانهٔ ۹: ایمان بی‌شکل. سفر درونی.", "Neptune in house 9: formless faith. Inner travel."),
    10: b("نپتون در خانهٔ ۱۰: حرفهٔ تصویری یا شفایی. مقام نامشخص.", "Neptune in house 10: imaginal or healing vocation. Unclear rank."),
    11: b("نپتون در خانهٔ ۱۱: جمع آرمانی. امید روحی.", "Neptune in house 11: an ideal group. Spiritual hope."),
    12: b("نپتون در خانهٔ ۱۲: خانهٔ طبیعی خلوت و الهام. نهان برکت است.", "Neptune in house 12: solitude and vision’s natural house. The hidden blesses."),
  },
  PLUTO: {
    1: b("پلوتو در خانهٔ ۱: نمود قدرتمند و دگرگون‌شونده. بدن میدان بحران است.", "Pluto in house 1: powerful, transforming manner. The body is a field of crisis."),
    2: b("پلوتو در خانهٔ ۲: قدرت در مال و بقا. ارزش از اعماق.", "Pluto in house 2: power in goods and survival. Value from the depths."),
    3: b("پلوتو در خانهٔ ۳: گفتار نافذ. مسیر نزدیک شدت دارد.", "Pluto in house 3: penetrating speech. The near road has intensity."),
    4: b("پلوتو در خانهٔ ۴: دگرگونی بنیان و خانواده.", "Pluto in house 4: transformation of foundation and family."),
    5: b("پلوتو در خانهٔ ۵: خلق قدرتمند. عشق دگرگون‌کننده.", "Pluto in house 5: powerful creation. Transforming love."),
    6: b("پلوتو در خانهٔ ۶: کار به‌عنوان باززایی. بدن میدان قدرت.", "Pluto in house 6: work as regeneration. The body is a field of power."),
    7: b("پلوتو در خانهٔ ۷: شریک قدرتمند. قرارداد دگرگون می‌کند.", "Pluto in house 7: a powerful partner. The contract transforms."),
    8: b("پلوتو در خانهٔ ۸: خانهٔ طبیعی بحران و اشتراک. قدرت در فقدان.", "Pluto in house 8: crisis and the shared — the natural house. Power in loss."),
    9: b("پلوتو در خانهٔ ۹: دگرگونی باور. افق شدت.", "Pluto in house 9: transformation of belief. An intense horizon."),
    10: b("پلوتو در خانهٔ ۱۰: مقام قدرتمند. حرفه باززا.", "Pluto in house 10: powerful rank. Regenerative vocation."),
    11: b("پلوتو در خانهٔ ۱۱: جمع قدرتمند. امید دگرگون‌کننده.", "Pluto in house 11: a powerful group. Transforming hope."),
    12: b("پلوتو در خانهٔ ۱۲: قدرت نهان. دگرگونی در خلوت.", "Pluto in house 12: hidden power. Transformation in solitude."),
  },
};

export const HOUSE_THEME: Record<number, Bi> = {
  1: b("خانهٔ ۱ — تن و نمود: آغاز، بدن، نقاب ورود به جهان.", "House 1 — body and appearance: beginning, the mask of entry."),
  2: b("خانهٔ ۲ — مال و ارزش: معیشت، دارایی، آنچه مالِ خود می‌دانید.", "House 2 — livelihood and value: goods, what you call your own."),
  3: b("خانهٔ ۳ — گفتار و نزدیکان: خواهر/برادر، نامه، مسیر کوتاه.", "House 3 — speech and kin: siblings, letters, the short road."),
  4: b("خانهٔ ۴ — بنیان و خانه: پدر/مادر، ریشه، پایان کار.", "House 4 — roots and home: parent, foundation, the end of the matter."),
  5: b("خانهٔ ۵ — خلق و لذت: فرزند، هنر، عشق، قمار.", "House 5 — creation and pleasure: children, art, love, risk."),
  6: b("خانهٔ ۶ — کار روزانه و سلامت: خدمت، بیماری، مهارت.", "House 6 — work and health: service, illness, craft."),
  7: b("خانهٔ ۷ — دیگری و قرارداد: همسر، شریک، دشمن آشکار.", "House 7 — the other and contracts: spouse, partner, open opponent."),
  8: b("خانهٔ ۸ — اشتراک و بحران: ارث، مال دیگری، مرگ و باززایی.", "House 8 — the shared and crisis: inheritance, the other’s money, death and return."),
  9: b("خانهٔ ۹ — سفر و باور: دین، نشر، استاد، افق.", "House 9 — travel and belief: religion, publishing, the teacher, the far."),
  10: b("خانهٔ ۱۰ — مقام و حرفه: پادشاه، کار عمومی، مادر در سنت.", "House 10 — status and vocation: the sovereign, public work, the mother in tradition."),
  11: b("خانهٔ ۱۱ — جمع و امید: دوستان، حامی، آرزو.", "House 11 — allies and hopes: friends, patrons, the wish."),
  12: b("خانهٔ ۱۲ — نهان و انزوا: زندان، خواب، دشمن پنهان، خدمت بی‌نام.", "House 12 — the hidden and withdrawal: prison, sleep, secret enemy, unnamed service."),
};

export const ASPECT_NATURE: Record<string, Bi> = {
  CONJUNCTION: b("قرآن نیروها را در یک نقطه جمع می‌کند. دو کارکرد از هم جدا نمی‌مانند؛ هویت مشترک می‌سازند. اگر سیارات سازگار باشند، تمرکز است؛ اگر نباشند، ادغام پرتنش.", "A conjunction fuses two functions at one point. They do not remain separate; they share an identity. Compatible planets concentrate; incompatible ones fuse under tension."),
  OPPOSITION: b("مقابله قطب می‌سازد. دو نیرو یکدیگر را می‌بینند و به آگاهی از «دیگری» مجبور می‌کنند. کار، آشتی دادن دو سر است نه حذف یکی.", "An opposition makes a pole. The two forces see each other and compel awareness of the other. The work is to reconcile the ends, not to erase one."),
  TRINE: b("تثلیث جریان آسان عنصر است. استعداد بدون اصطکاک حرکت می‌کند؛ خطر، راحتیِ بی‌کار است.", "A trine is easy elemental flow. Talent moves without friction; the danger is unused ease."),
  SQUARE: b("تربیع اصطکاکی است که کار می‌سازد. دو نیرو در یک خانهٔ عمل به هم می‌خورند و رشد را اجباری می‌کنند.", "A square is friction that makes work. Two forces collide in the same mode of action and force growth."),
  SEXTILE: b("تسدیس فرصت با کوشش اندک است. در را باز می‌کند اما از آن عبور نمی‌کند مگر اراده باشد.", "A sextile is opportunity with slight effort. It opens a door but will not walk through it without will."),
};

export const ASPECT_SPECIFIC: Record<string, Bi> = {
  MOON_SUN_CONJUNCTION: b("قرآن ماه و خورشید (ماه نو): نیاز و اراده یکی‌اند. هویت از عادت جدا نیست؛ آغاز چرخه.", "Sun conjunct Moon (New Moon): need and will are one. Identity is not separate from habit; a cycle begins."),
  MOON_SUN_OPPOSITION: b("مقابلهٔ ماه و خورشید (ماه کامل): آگاهی از دیگری. اراده و نیاز در دو قطب؛ زندگی آشتی می‌خواهد.", "Sun opposite Moon (Full Moon): awareness of the other. Will and need stand at two poles; life asks for reconciliation."),
  MOON_SUN_SQUARE: b("تربیع خورشید و ماه: اصطکاک هویت و عادت. امنیت و شأن یکدیگر را می‌آزمایند.", "Sun square Moon: identity and habit chafe. Safety and dignity test each other."),
  MOON_SUN_TRINE: b("تثلیث خورشید و ماه: جریان آسان میان اراده و احساس. استعداد طبیعیِ هماهنگ بودن با خود.", "Sun trine Moon: easy flow between will and feeling. A native talent for being of a piece."),
  MOON_SUN_SEXTILE: b("تسدیس خورشید و ماه: فرصت آشتی هویت و نیاز با اندک کوشش.", "Sun sextile Moon: a chance to reconcile identity and need with slight work."),
  MERCURY_SUN_CONJUNCTION: b("قرآن خورشید و عطارد: فکر و اراده هم‌خانه‌اند. بیان همان هویت است (احتراق اگر بسیار نزدیک).", "Sun conjunct Mercury: thought and will share a house. Speech is identity (combust if extremely close)."),
  SUN_VENUS_CONJUNCTION: b("قرآن خورشید و زهره: ارزش و هویت یکی. جذابیتِ خودِ وجود.", "Sun conjunct Venus: value and identity are one. The being itself attracts."),
  MARS_SUN_CONJUNCTION: b("قرآن خورشید و مریخ: اراده و کنش یکی. شجاعت هویت است؛ خشم نزدیک به هسته.", "Sun conjunct Mars: will and action are one. Courage is identity; anger sits near the core."),
  JUPITER_SUN_CONJUNCTION: b("قرآن خورشید و مشتری: گشایش هویت. خوش‌بینی و معنا به اراده می‌چسبد.", "Sun conjunct Jupiter: identity opens. Optimism and meaning cling to the will."),
  SATURN_SUN_CONJUNCTION: b("قرآن خورشید و زحل: زمان بر هویت می‌نشیند. شأن با محرومیت و مسئولیت ساخته می‌شود.", "Sun conjunct Saturn: time sits on identity. Dignity is built by withholding and duty."),
  MOON_SATURN_CONJUNCTION: b("قرآن ماه و زحل: نیاز با حد آشناست. امنیت از راه شایستگی و تأخیر احساس می‌شود.", "Moon conjunct Saturn: need knows limit. Safety is felt through competence and delay."),
  MOON_VENUS_CONJUNCTION: b("قرآن ماه و زهره: عادتِ زیبایی و تعلق. نیاز با محبت آرام می‌شود.", "Moon conjunct Venus: a habit of beauty and belonging. Need is soothed by affection."),
  MOON_VENUS_TRINE: b("تثلیث ماه و زهره: جریان آسان میان نیاز و ارزش. ذائقه و عادت یکدیگر را تغذیه می‌کنند؛ استعداد طبیعیِ تسلی و زیبایی.", "Moon trine Venus: easy flow between need and value. Taste and habit feed each other; a native talent for consolation and beauty."),
  MARS_MOON_CONJUNCTION: b("قرآن ماه و مریخ: خلق‌وخوی مبارز. نیاز فوراً به کنش تبدیل می‌شود.", "Moon conjunct Mars: a combative mood. Need turns into action at once."),
  MERCURY_VENUS_CONJUNCTION: b("قرآن عطارد و زهره: گفتار زیبا. فکر ارزش‌گذار است.", "Mercury conjunct Venus: beautiful speech. Thought evaluates."),
  MERCURY_SATURN_CONJUNCTION: b("قرآن عطارد و زحل: فکر وزین، کند و مسئول. بیان با زمان پخته می‌شود؛ یادگیری سنگین اما ماندگار است. ذهن ساختار را بر سرعت ترجیح می‌دهد.", "Mercury conjunct Saturn: thought is heavy, slow and responsible. Speech is cooked by time; learning is hard and lasting. The mind prefers structure to speed."),
  MARS_VENUS_CONJUNCTION: b("قرآن زهره و مریخ: جذب و کنش یکی. عشق می‌جنگد و می‌آغازد.", "Venus conjunct Mars: attraction and action are one. Love fights and begins."),
  JUPITER_SATURN_CONJUNCTION: b("قرآن مشتری و زحل: گشایش و حد در یک نقطه. معنا ساختار می‌گیرد.", "Jupiter conjunct Saturn: opening and limit at one point. Meaning takes structure."),
  JUPITER_URANUS_OPPOSITION: b("مقابلهٔ مشتری و اورانوس: قطب معنا و گسست. باور باید آزادی ناگهانی را ببیند؛ نوآوری باید به قانون پاسخ دهد. کار، آشتی افق و برق است.", "Jupiter opposite Uranus: the pole of meaning and rupture. Belief must see sudden freedom; invention must answer to law. The work is to reconcile horizon and lightning."),
  MARS_PLUTO_TRINE: b("تثلیث مریخ و پلوتو: جریان آسان کنش و قدرت زیرین. کار و بحران یکدیگر را تغذیه می‌کنند؛ استعداد عمل در اعماق.", "Mars trine Pluto: easy flow of action and under-power. Work and crisis feed each other; a talent for acting in the depths."),
  JUPITER_PLUTO_SQUARE: b("تربیع مشتری و پلوتو: اصطکاک گسترش و قدرت. معنا می‌خواهد بزرگ شود؛ اعماق آن را وادار به مرگ و باززایی می‌کند.", "Jupiter square Pluto: growth and power chafe. Meaning wants to enlarge; the depths force it through death and return."),
  PLUTO_SUN_SEXTILE: b("تسدیس خورشید و پلوتو: فرصت دگرگونی هویت با اندک اراده. در را به اعماق باز می‌کند اگر شخص از آن عبور کند.", "Sun sextile Pluto: a chance to transform identity with slight will. It opens a door to the depths if walked through."),
  MARS_SUN_SEXTILE: b("تسدیس خورشید و مریخ: فرصت کنش برای شأن. اراده راهی به عمل دارد که با کوشش اندک باز می‌شود.", "Sun sextile Mars: a chance for action in the service of dignity. Will has a road to work that opens with slight effort."),
  PLUTO_URANUS_SQUARE: b("تربیع اورانوس و پلوتو: اصطکاک گسست و قدرت نسلی. ساختار و آزادی یکدیگر را می‌شکنند تا شکل تازه‌ای بسازند.", "Uranus square Pluto: generational rupture and power chafe. Structure and freedom break each other to make a new form."),
  NEPTUNE_URANUS_TRINE: b("تثلیث اورانوس و نپتون: جریان آسان بیداری و تصویر جمعی. نسل، رؤیا و نوآوری را هم‌عنصر می‌کند.", "Uranus trine Neptune: easy flow of waking and the collective image. A generation makes dream and invention of one element."),
  MARS_SATURN_SQUARE: b("تربیع مریخ و زحل: اصطکاک کنش و زمان. کار اجباری؛ خشم با تأخیر پخته می‌شود.", "Mars square Saturn: action and time chafe. Forced work; anger is cooked by delay."),
  MARS_SATURN_OPPOSITION: b("مقابلهٔ مریخ و زحل: قطب شجاعت و حد. آگاهی از قیمت کنش.", "Mars opposite Saturn: the pole of courage and limit. Awareness of the cost of action."),
  JUPITER_SUN_TRINE: b("تثلیث خورشید و مشتری: جریان آسان برکت و هویت. استعداد گشایش.", "Sun trine Jupiter: easy flow of blessing and identity. A talent for opening."),
  SATURN_SUN_SQUARE: b("تربیع خورشید و زحل: اصطکاک شأن و زمان. هویت با آزمون مسئولیت سخت می‌شود.", "Sun square Saturn: dignity and time chafe. Identity is hardened by tests of duty."),
  MOON_NEPTUNE_CONJUNCTION: b("قرآن ماه و نپتون: نیاز تصویری و نفوذپذیر. عادت جذب جو است.", "Moon conjunct Neptune: imaginal, porous need. Habit absorbs the atmosphere."),
  PLUTO_SUN_CONJUNCTION: b("قرآن خورشید و پلوتو: اراده از اعماق. هویت دگرگون می‌شود تا زنده بماند.", "Sun conjunct Pluto: will from the depths. Identity transforms in order to live."),
  URANUS_SUN_CONJUNCTION: b("قرآن خورشید و اورانوس: هویت گسست. بیداری ناگهانیِ خود.", "Sun conjunct Uranus: identity as rupture. A sudden waking of the self."),
  MARS_SUN_SQUARE: b("تربیع خورشید و مریخ: اصطکاک اراده و کنش. شجاعت بیش از ظرف؛ کار خشم.", "Sun square Mars: will and action chafe. More courage than container; anger is the work."),
  JUPITER_MOON_CONJUNCTION: b("قرآن ماه و مشتری: نیاز گشاده. عادت خوش‌بینی و تغذیهٔ معنا.", "Moon conjunct Jupiter: need opens. Habit is optimism and the feeding of meaning."),
  VENUS_SATURN_CONJUNCTION: b("قرآن زهره و زحل: ارزش با تعهد. عشق زمان می‌خواهد و محرومیت می‌شناسد.", "Venus conjunct Saturn: value is commitment. Love asks for time and knows withholding."),
  MERCURY_JUPITER_CONJUNCTION: b("قرآن عطارد و مشتری: فکر گشاده. بیان معنا و آموزش.", "Mercury conjunct Jupiter: thought opens. Speech is meaning and teaching."),
  MARS_JUPITER_CONJUNCTION: b("قرآن مریخ و مشتری: کنش گشاده و شجاع. جدال برای معنا.", "Mars conjunct Jupiter: action is open and brave. Conflict is for meaning."),
};

export const LUNAR_PHASE: Record<string, Bi> = {
  new: b("فاز ماه نو: آغاز چرخه. اراده و نیاز هنوز جدا نیستند. زندگی از نطفه ساخته می‌شود.", "New Moon phase: a cycle begins. Will and need are not yet separate. Life is built from a seed."),
  crescent: b("فاز هلال: بیرون آمدن از تاریکی. نیاز به حرکت و اثبات وجود.", "Crescent phase: coming out of the dark. Need to move and to prove existence."),
  first_quarter: b("تربیع اول: بحران کنش. عادت باید با اراده درگیر شود تا شکل بگیرد.", "First quarter: a crisis of action. Habit must wrestle will in order to take form."),
  gibbous: b("فاز محدب: پالایش پیش از کمال. کارِ کامل کردن آنچه آغاز شده.", "Gibbous phase: refining before fullness. The work of completing what was begun."),
  full: b("ماه کامل: آگاهی. قطب اراده و نیاز روشن است؛ دیدن دیگری اجباری است.", "Full Moon: awareness. The pole of will and need is lit; seeing the other is required."),
  disseminating: b("فاز پخش: توزیع آنچه فهمیده شده. نیاز به سهم دادن.", "Disseminating: distributing what has been understood. Need to give a share."),
  last_quarter: b("تربیع آخر: بحران رها کردن. عادت کهنه باید بشکند.", "Last quarter: a crisis of release. The old habit must break."),
  balsamic: b("فاز حنوط: پایان چرخه. خلوت، هضم، آماده شدن برای نطفهٔ بعد.", "Balsamic: the cycle’s end. Solitude, digestion, readiness for the next seed."),
};

export const SECT: Record<"day" | "night", Bi> = {
  day: b("چارت روزانه (خورشید بالای افق): فرقهٔ روز. خورشید، مشتری و زحل از شرایط مناسب‌تری برخوردارند. هویت از راه روشنایی و امر عمومی ساخته می‌شود.", "Day chart (Sun above the horizon): diurnal sect. Sun, Jupiter and Saturn are in more suitable condition. Identity is built through light and the public."),
  night: b("چارت شبانه (خورشید زیر افق): فرقهٔ شب. ماه، زهره و مریخ از شرایط مناسب‌تری برخوردارند. هویت از راه حس، خلوت و امر درونی ساخته می‌شود.", "Night chart (Sun below the horizon): nocturnal sect. Moon, Venus and Mars are in more suitable condition. Identity is built through sense, privacy and the inward."),
};

export const ELEMENT_PREPONDERANCE: Record<string, Bi> = {
  FIRE: b("غلبهٔ آتش: مزاج گرم و خشک. آغاز، شجاعت، نمایش. کمبود آتش یعنی تردید در شعلهٔ اراده.", "Fire preponderance: hot and dry. Initiation, courage, display. Lack of fire is hesitation in the will’s flame."),
  EARTH: b("غلبهٔ خاک: مزاج سرد و خشک. ثبات، حس، کار. کمبود خاک یعنی دشواری در تجسم و بقا.", "Earth preponderance: cold and dry. Stability, sense, work. Lack of earth is difficulty incarnating and surviving."),
  AIR: b("غلبهٔ هوا: مزاج گرم و مرطوب. گفتگو، رابطه، فکر. کمبود هوا یعنی تنگنای بیان و دیگری.", "Air preponderance: hot and moist. Speech, relating, thought. Lack of air is a cramped voice and a scarce other."),
  WATER: b("غلبهٔ آب: مزاج سرد و مرطوب. احساس، حافظه، ادغام. کمبود آب یعنی خشکیِ تعلق.", "Water preponderance: cold and moist. Feeling, memory, fusion. Lack of water is a dry belonging."),
};

export const MODALITY_PREPONDERANCE: Record<string, Bi> = {
  CARDINAL: b("غلبهٔ اصلی (حمل/سرطان/میزان/جدی): آغاز فصل. زندگی از راه شروع و نقطهٔ عطف حرکت می‌کند.", "Cardinal preponderance (Aries/Cancer/Libra/Capricorn): the season’s start. Life moves by beginning and turning points."),
  FIXED: b("غلبهٔ ثابت (ثور/اسد/عقرب/دلو): میانهٔ فصل. زندگی از راه پایداری و مقاومت معنا می‌گیرد.", "Fixed preponderance (Taurus/Leo/Scorpio/Aquarius): the season’s middle. Life means through staying and resisting."),
  MUTABLE: b("غلبهٔ متغیر (جوزا/سنبله/قوس/حوت): پایان فصل. زندگی از راه تطبیق و گذار حرکت می‌کند.", "Mutable preponderance (Gemini/Virgo/Sagittarius/Pisces): the season’s end. Life moves by adapting and crossing."),
};

export const POLARITY: Record<string, Bi> = {
  masculine: b("غلبهٔ نشانه‌های مثبت/نر (آتش و هوا): حرکت به بیرون، بیان، کنش.", "Masculine/positive signs (fire and air) preponderate: outward motion, expression, action."),
  feminine: b("غلبهٔ نشانه‌های منفی/ماده (خاک و آب): حرکت به درون، دریافت، حفظ.", "Feminine/negative signs (earth and water) preponderate: inward motion, reception, keeping."),
};

export const HEMISPHERE: Record<string, Bi> = {
  south: b("غلبهٔ نیمکرهٔ جنوبی (خانه‌های ۷–۱۲، بالای افق): زندگی در امر عمومی و اجتماعی وزن دارد.", "Southern hemisphere (houses 7–12, above the horizon) preponderates: life weights toward the public and social."),
  north: b("غلبهٔ نیمکرهٔ شمالی (خانه‌های ۱–۶، زیر افق): زندگی در امر شخصی و درونی وزن دارد.", "Northern hemisphere (houses 1–6, below the horizon) preponderates: life weights toward the personal and inward."),
  east: b("غلبهٔ شرق (خانه‌های ۱۰–۳): خودآغازگری. مسیر بیشتر از ارادهٔ خود ساخته می‌شود.", "Eastern houses (10–3) preponderate: self-initiation. The path is built more from one’s own will."),
  west: b("غلبهٔ غرب (خانه‌های ۴–۹): دیگری. مسیر بیشتر از راه مواجهه با کس/چیز دیگر ساخته می‌شود.", "Western houses (4–9) preponderate: the other. The path is built more through encounter."),
};

export const NODE_SIGN: Record<string, Bi> = {
  Aries: b("رأس در حمل: رشد از راه شجاعت شخصی؛ گرهٔ جنوب در میزان — رها کردن وابستگی به تأیید دیگری.", "North Node in Aries: growth through personal courage; South Node in Libra — release over-reliance on the other’s approval."),
  Taurus: b("رأس در ثور: رشد از راه ارزش پایدار و بدن؛ گرهٔ جنوب در عقرب — رها کردن بحران به‌عنوان خانه.", "North Node in Taurus: growth through durable value and the body; South Node in Scorpio — leave crisis as a home."),
  Gemini: b("رأس در جوزا: رشد از راه گفتار نزدیک و داده؛ گرهٔ جنوب در قوس — رها کردن باور کلی به‌جای واقعیتِ دمِ دست.", "North Node in Gemini: growth through near speech and data; South Node in Sagittarius — leave the grand belief in place of what is at hand."),
  Cancer: b("رأس در سرطان: رشد از راه تعلق و مراقبت؛ گرهٔ جنوب در جدی — رها کردن مقام به‌جای خانه.", "North Node in Cancer: growth through belonging and care; South Node in Capricorn — leave rank in place of home."),
  Leo: b("رأس در اسد: رشد از راه قلب و خلق؛ گرهٔ جنوب در دلو — رها کردن فاصلهٔ جمعی به‌جای گرمای فرد.", "North Node in Leo: growth through heart and creation; South Node in Aquarius — leave collective coolness in place of personal warmth."),
  Virgo: b("رأس در سنبله: رشد از راه خدمت دقیق؛ گرهٔ جنوب در حوت — رها کردن محو شدن به‌جای کار مشخص.", "North Node in Virgo: growth through precise service; South Node in Pisces — leave dissolution in place of a definite task."),
  Libra: b("رأس در میزان: رشد از راه رابطه و عدالت؛ گرهٔ جنوب در حمل — رها کردن تنهاییِ مبارز.", "North Node in Libra: growth through relating and fairness; South Node in Aries — leave the fighter’s solitude."),
  Scorpio: b("رأس در عقرب: رشد از راه ادغام و باززایی؛ گرهٔ جنوب در ثور — رها کردن امنیتِ سطح.", "North Node in Scorpio: growth through fusion and regeneration; South Node in Taurus — leave surface safety."),
  Sagittarius: b("رأس در قوس: رشد از راه معنا و افق؛ گرهٔ جنوب در جوزا — رها کردن پراکندگی داده.", "North Node in Sagittarius: growth through meaning and the far; South Node in Gemini — leave scatter of data."),
  Capricorn: b("رأس در جدی: رشد از راه ساختار و مقام؛ گرهٔ جنوب در سرطان — رها کردن پناه به‌جای مسئولیت.", "North Node in Capricorn: growth through structure and rank; South Node in Cancer — leave shelter in place of duty."),
  Aquarius: b("رأس در دلو: رشد از راه جمع و اصل؛ گرهٔ جنوب در اسد — رها کردن مرکز بودنِ همیشگی.", "North Node in Aquarius: growth through the group and the principle; South Node in Leo — leave the constant centre-stage."),
  Pisces: b("رأس در حوت: رشد از راه همدلی و ایمان؛ گرهٔ جنوب در سنبله — رها کردن نقد به‌جای شفقت.", "North Node in Pisces: growth through empathy and faith; South Node in Virgo — leave critique in place of compassion."),
};

export const DIGNITY_NOTE: Record<string, Bi> = {
  domicile: b("در منزل: سیاره در برج خود است و بنا به بطلمیوس از قوت اساسی برخوردار است. کارکرد به‌طور طبیعی جریان دارد.", "In domicile: the planet is in its own sign and, per Ptolemy, has essential strength. The function flows as itself."),
  exaltation: b("در شرف: سیاره در اوج بیان است. کارکرد بلند و درخشان است، اما گاهی یک‌سویه.", "In exaltation: the planet is at a peak of expression. The function is high and bright, sometimes one-sided."),
  detriment: b("در وبال: سیاره روبه‌روی منزل خود است. کارکرد بیگانه است و باید از راه دیگری کار کند.", "In detriment: the planet is opposite its home. The function is foreign and must work by another road."),
  fall: b("در هبوط: سیاره روبه‌روی شرف است. کارکرد فروکاسته و نیازمند جبران است.", "In fall: the planet is opposite its exaltation. The function is lowered and needs compensation."),
  peregrine: b("آواره: نه منزل، نه شرف، نه وبال، نه هبوط. سیاره مهمان است و از سیارهٔ حاکم برج و جنبه‌ها نیرو می‌گیرد.", "Peregrine: neither home, exaltation, detriment nor fall. The planet is a guest and takes force from the sign’s lord and from aspects."),
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
  natal: b("خوانش ناتال: نقشهٔ لحظهٔ تولد. سیارات = کارکرد؛ برج = سبک؛ خانه = میدان زندگی؛ جنبه = گفتگوی نیروها. هر بند زیر از طول محاسبه‌شدهٔ همین تولد ساخته شده است.", "Natal reading: the map of the birth instant. Planets = functions; signs = style; houses = field of life; aspects = the conversation of forces. Every paragraph below is keyed off this birth’s computed longitudes."),
  transit: b("خوانش ترانزیت: سیاراتِ لحظهٔ انتخاب‌شده به ناتال جنبه می‌گیرند. خانه از ناتال است؛ رویداد از عبور.", "Transit reading: planets of the chosen moment aspect the natal. Houses are natal; events are the crossing."),
  synastry: b("خوانش سیناستری: جنبهٔ متقابل دو ناتال با ارب تنگ‌تر (۰٫۷). سیارهٔ نفر اول در خانه/کارکرد نفر دوم چه می‌کند.", "Synastry reading: cross-aspects of two natals at 0.7× orbs. What person one’s planet does in person two’s function."),
  composite: b("خوانش کامپوزیت: نقطهٔ میانی کوتاه‌ترین کمان. این چارت شخص نیست؛ موجودِ رابطه است.", "Composite reading: shortest-arc midpoints. This chart is not a person; it is the being of the relationship."),
  solar_return: b("خوانش سولار ریترن: سال از لحظه‌ای که خورشید به طول ناتال بازمی‌گردد. خانه‌ها و طالعِ این لحظه موضوع سال‌اند.", "Solar return: the year from the instant the Sun returns to natal longitude. This moment’s houses and ASC are the year’s subject."),
  progressed: b("خوانش پروگرس ثانویه: یک روز پس از تولد = یک سال زندگی. این چارت رشد درونی است نه رویداد بیرونی.", "Secondary progression: one day after birth = one year of life. This chart is inner growth, not outer event."),
  now: b("آسمان اکنون: نقشهٔ همین لحظه برای مختصات انتخاب‌شده. خوانشِ جو است نه هویت تولد.", "Sky now: the map of this instant for the chosen coordinates. A reading of atmosphere, not of birth-identity."),
};

export function pick(bi: Bi | undefined, locale: "fa" | "en"): string {
  if (!bi) return "";
  return locale === "fa" ? bi.fa : bi.en;
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
  "در روش لیلی، موضوع هر خانه از حاکمِ برجِ کاسپ خوانده می‌شود: آن سیاره کجا نشسته، در چه شأنی است، و به چه چیز جنبه دارد. خالی بودن خانه موضوع را حذف نمی‌کند.",
  "In Lilly’s method a house’s topic is read from the lord of the cusp’s sign: where that planet sits, in what dignity, and to what it aspects. An empty house does not delete the topic.",
);

