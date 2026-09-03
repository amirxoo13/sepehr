/**
 * Original English cookbook for Pythagorean numbers.
 * Traditional 1–9 / 11 / 22 / 33 meanings and Hungarian-grid arrows.
 * Not copied from any commercial report. Not a prediction.
 */
import type { ArrowId } from "./numerology";

export const NUMEROLOGY_DISCLAIMER =
  "Pythagorean numerology is a digit method from the calendar date. It is not astronomy and it is not a prediction. Nothing here is medical, legal or financial advice. The paragraphs are traditional keywords for the calculated number, not a biography of the person.";

export const LIFE_PATH_METHOD =
  "Life path is the sum of every single digit in the birth date written as day, month, year. We do not add day + month + year as three already-reduced numbers. Example: 5 December 1995 is 5 + 1 + 2 + 1 + 9 + 9 + 5 = 32, then 3 + 2 = 5. Eleven, twenty-two and thirty-three are kept as master numbers when they appear.";

export const BIRTH_NUMBER_METHOD =
  "The birth number is the calendar day of the month, reduced the same way. Day 5 stays 5. Day 23 becomes 2 + 3 = 5. Day 11 and day 22 are kept. This number colours the first impression more than the long arc of the life path.";

export const PERSONAL_YEAR_METHOD =
  "A personal year runs from birthday to birthday. The year in the sum is the year that period started — the last birthday — not the calendar year on the wall. On the birthday itself the new personal year begins.";

export const GRID_METHOD =
  "The digit grid is the Hungarian three-by-three square used with Pythagorean dates. Digits 1 to 9 from the birth date are dropped into their cells. An arrow is complete when all three numbers of a line appear at least once. An arrow is missing when none of the three appear. A partial line is not named as an arrow.";

export const NAME_METHOD =
  "Name numbers use the Pythagorean letter chart (A and J and S = 1, through Z = 8). Expression is every letter. Heart’s desire is the vowels (A E I O U Y). Personality is the consonants. Only Latin letters are counted. A Persian name needs a Latin spelling to produce a number.";

const LP: Record<number, { title: string; gifts: string; watch: string }> = {
  1: {
    title: "Life path 1 — the starter",
    gifts:
      "One is the number of beginning. The work of this path is to stand up, start, and carry a thing that did not exist before. Independence is the fuel. People with this number often feel they must lead their own day, even in a small room. Courage and a clean ‘I will’ are the traditional strengths.",
    watch:
      "The weak side of one is the lonely throne: refusing help, pushing others aside, or needing to be first in every sentence. Learning to start without crushing the people nearby is the long lesson.",
  },
  2: {
    title: "Life path 2 — the pair",
    gifts:
      "Two is the number of the other person. This path learns by listening, matching, and making peace. Patience, tact, and the wish to belong are the traditional strengths. The work is partnership — not as disappearance, but as a real second voice.",
    watch:
      "The weak side of two is waiting forever for permission, taking every mood as a verdict, or hiding anger until it leaks. The lesson is to keep a spine inside the harmony.",
  },
  3: {
    title: "Life path 3 — the voice",
    gifts:
      "Three is speech, play, and making something that can be seen or heard. This path learns by talking, drawing, joking, teaching. Warmth and a quick mind are the traditional strengths. The work is to give form to what is felt, not to leave it as a spark.",
    watch:
      "The weak side of three is scatter: too many starts, charm instead of craft, words that never become a finished thing. The lesson is to pick one stage and stay on it long enough.",
  },
  4: {
    title: "Life path 4 — the builder",
    gifts:
      "Four is order, time, and the wall that stands. This path learns by doing the slow work: lists, foundations, a craft repeated until it holds. Reliability is the traditional strength. The work is to make a structure other people can trust.",
    watch:
      "The weak side of four is rigidity: fear of change, joyless duty, or building a box so tight that life cannot enter. The lesson is that a good wall also has a door.",
  },
  5: {
    title: "Life path 5 — the mover",
    gifts:
      "Five is change, curiosity, travel, and the wish not to be boxed in. This path learns by trying more than one road. Freedom is the fuel. People with this number often need air, motion, and a new question. The work is to keep a spine while the scenery changes — to choose, not only to jump.",
    watch:
      "The weak side of five is restlessness that never lands: starting a thing and leaving it, talking more than finishing, or treating every limit as an insult. Patience, and a promise kept, are the parts this number has to practise.",
  },
  6: {
    title: "Life path 6 — the keeper",
    gifts:
      "Six is care, home, and responsibility for people nearby. This path learns by looking after what it loves. Loyalty and a sense of beauty in daily life are the traditional strengths. The work is to serve without becoming the only adult in every room.",
    watch:
      "The weak side of six is control dressed as care: meddling, guilt, or carrying other people’s loads until bitterness comes. The lesson is to love without owning.",
  },
  7: {
    title: "Life path 7 — the examiner",
    gifts:
      "Seven is study, silence, and the wish to know what is under the surface. This path learns by stepping back. Analysis, research, and an inner life are the traditional strengths. The work is to trust a few true things rather than collect every rumour.",
    watch:
      "The weak side of seven is isolation: suspicion, coldness, or living only in the head. The lesson is to bring the finding back to other people, not to disappear into it.",
  },
  8: {
    title: "Life path 8 — the steward",
    gifts:
      "Eight is weight, work, and return. This path learns through responsibility and the long result of choices. Strength, judgement, and the ability to run a thing that has real size are the traditional gifts. The work is power used with a straight back.",
    watch:
      "The weak side of eight is force without respect: ranking people, chasing status, or measuring a life only in wins. Traditional teaching says eight gives back what was given — that is a moral keyword, not a promise of money.",
  },
  9: {
    title: "Life path 9 — the closer",
    gifts:
      "Nine is the end of the 1–9 cycle: compassion, a wide view, and letting go. This path learns by finishing and by giving. Idealism and a sense of the whole are the traditional strengths. The work is to care for more than the small self without drowning in every cause.",
    watch:
      "The weak side of nine is drama of the helper: resentment after giving, scattered crusades, or refusing to end what is already over. The lesson is a clean goodbye.",
  },
  11: {
    title: "Life path 11 — the charged two",
    gifts:
      "Eleven is a master number: two, intensified. Insight, inspiration, and a nervous brightness are the traditional keywords. The work is to turn a flash of seeing into something other people can use, without burning out.",
    watch:
      "The weak side is overload: anxiety, ungrounded vision, or waiting for a perfect signal. Eleven still has to do the ordinary work of two — listen, pair, keep a spine.",
  },
  22: {
    title: "Life path 22 — the charged four",
    gifts:
      "Twenty-two is a master number: four, intensified. The traditional keyword is the large structure — a work that outlives the day. Ambition here is meant to be practical, not theatrical.",
    watch:
      "The weak side is grand plans with no foundation, or fear so large that nothing is built. Twenty-two still has to lay bricks like four.",
  },
  33: {
    title: "Life path 33 — the charged six",
    gifts:
      "Thirty-three is a master number: six, intensified. The traditional keyword is teaching through care — responsibility that reaches past the family door. It is rare, and it is still a digit, not a halo.",
    watch:
      "The weak side is the martyr, the preacher, or the person who cannot stop fixing everyone. Thirty-three still has to rest, like six.",
  },
};

const BD: Record<number, { title: string; gifts: string; watch: string }> = {
  1: {
    title: "Birth number 1 — first step",
    gifts: "The day-number one meets a room as a starter: direct, self-led, a little impatient to begin. Others often read this person as someone who will take the first move.",
    watch: "Watch for steamrolling a slower person, and for needing to win a small argument. The day-lesson is to start without emptying the room.",
  },
  2: {
    title: "Birth number 2 — the listener",
    gifts: "The day-number two meets a room softly: noticing mood, preferring company, good at the in-between word. First impression is often gentle or careful.",
    watch: "Watch for disappearing into the other person’s opinion. The day-lesson is a kind ‘no’.",
  },
  3: {
    title: "Birth number 3 — the spark",
    gifts: "The day-number three meets a room with talk, humour, or colour. First impression is often lively. Making something visible — a story, a joke, a picture — is the easy door.",
    watch: "Watch for performing instead of hearing, and for leaving a thing half-made. The day-lesson is one finished sentence.",
  },
  4: {
    title: "Birth number 4 — the solid",
    gifts: "The day-number four meets a room as reliable and a bit reserved. First impression is order, work, a person who will show up. Practical talk is easier than flourish.",
    watch: "Watch for stiffness, and for judging people who move faster. The day-lesson is a little play inside the plan.",
  },
  5: {
    title: "Birth number 5 — perception",
    gifts:
      "The day-number five meets a room as curious, quick, and unwilling to sit still. First impression is often sharp and mobile: a person who wants to know how a thing works and does not like being told what to do. Change is interesting. Travel, talk, and a new skill are easy doors. The traditional keyword for five as a birth day is perception — the senses and the mind both want a wide field.",
    watch:
      "Watch for haste, for jumping from one thing to the next, and for a temper when someone closes a door. Some days the same number reads as restless or thin. The day-lesson is to stay with one task past the first thrill, and not to treat every limit as an enemy.",
  },
  6: {
    title: "Birth number 6 — the host",
    gifts: "The day-number six meets a room as the one who looks after people. First impression is warmth, duty, a wish that things be fair and beautiful enough.",
    watch: "Watch for taking over other people’s problems. The day-lesson is care without a leash.",
  },
  7: {
    title: "Birth number 7 — the private eye",
    gifts: "The day-number seven meets a room a little apart: watching, thinking, not giving the whole story at once. First impression is often quiet or specialised.",
    watch: "Watch for frost, and for trusting only the inner voice. The day-lesson is one true sentence said out loud.",
  },
  8: {
    title: "Birth number 8 — the weight",
    gifts: "The day-number eight meets a room with presence. First impression is competence, a person who can carry a load. Work and a result matter.",
    watch: "Watch for measuring people by rank. The day-lesson is strength that still hears.",
  },
  9: {
    title: "Birth number 9 — the wide door",
    gifts: "The day-number nine meets a room with feeling for the whole scene. First impression can be generous, dramatic, or already a little world-weary. Endings and ideals sit near the surface.",
    watch: "Watch for rescuing everyone, then resenting it. The day-lesson is a boundary around the gift.",
  },
  11: {
    title: "Birth number 11 — the bright two",
    gifts: "Day 11 is kept as a master day-number. First impression can be intense, inspired, a little high-voltage. The ordinary work is still two: listen, pair, keep a spine.",
    watch: "Watch for nerves dressed as vision. Rest is part of the number.",
  },
  22: {
    title: "Birth number 22 — the bright four",
    gifts: "Day 22 is kept as a master day-number. First impression can be ambitious in a practical way. The ordinary work is still four: lay the brick.",
    watch: "Watch for plans too large for the week. One wall at a time.",
  },
};

const PY: Record<number, { title: string; body: string }> = {
  1: {
    title: "Personal year 1 — a start",
    body: "Year one is a planting year. New work, a new role, a first move that was waiting. The twelve months from this birthday favour beginning more than finishing old business. Traditional advice: start clean, and do not drag last year’s argument into the new one. This is a timing keyword, not a guarantee.",
  },
  2: {
    title: "Personal year 2 — a pairing",
    body: "Year two slows the pace. Waiting, matching, and the other person matter more than a solo push. Patience is the tool. Traditional advice: listen longer than feels comfortable. Not a year to force a harvest.",
  },
  3: {
    title: "Personal year 3 — a voice",
    body: "Year three opens speech, study, and making. Social rooms and small creative work have more air. Traditional advice: say the true thing, and finish one piece rather than announcing ten.",
  },
  4: {
    title: "Personal year 4 — a foundation",
    body: "Year four is labour and order. Systems, health of routine, and the unglamorous brick. Traditional advice: do the boring thing that will still be standing next year. Rest is part of the structure, not a theft from it.",
  },
  5: {
    title: "Personal year 5 — a change",
    body: "Year five moves the furniture. Travel, a changed job of work, a new question. Freedom knocks. Traditional advice: choose the change; do not only flee. Keep one promise so the year does not dissolve.",
  },
  6: {
    title: "Personal year 6 — a house",
    body: "Year six turns toward home, family, and the people one is responsible for. Beauty and duty sit together. Traditional advice: care, then stop before bitterness. Not a year to abandon the near for the far.",
  },
  7: {
    title: "Personal year 7 — a study",
    body: "Year seven pulls inward. Research, rest, a long think. Traditional advice: protect some silence, and do not sign a loud contract only to fill the quiet. Bring one finding back to the world.",
  },
  8: {
    title: "Personal year 8 — a return",
    body: "Year eight is the number of weight, work and return. After a year of change, eight asks for balance: what was given, what comes back. Traditional teaching calls eight a karma number — cause and effect, not magic. Success in these twelve months is read as the harvest of how the person has worked and treated people up to now, not as a lottery. Honest dealing and a steady spine are the keywords. Force without respect is the traditional warning. This is not a promise of money, rank, or health. It is a digit for the months that run from the last birthday to the next.",
  },
  9: {
    title: "Personal year 9 — a closing",
    body: "Year nine is a finishing year. Old rooms are packed. Forgiveness, a goodbye, a gift that does not come back. Traditional advice: complete, donate, release. Planting a brand-new empire belongs more to the year-one that follows.",
  },
  11: {
    title: "Personal year 11 — a charged two",
    body: "An eleven year is a two with voltage: insight, a nervous opening, a chance to say a true thing. Ground it in ordinary pairing and rest, or the year frays.",
  },
  22: {
    title: "Personal year 22 — a charged four",
    body: "A twenty-two year is a four with voltage: a chance to build something larger than a private plan. It still needs bricks, sleep, and a real measurement.",
  },
};

export const ARROW_COPY: Record<
  ArrowId,
  { name: string; line: string; complete: string; missing: string }
> = {
  "159": {
    name: "Determination",
    line: "1-5-9",
    complete:
      "The 1-5-9 diagonal is complete: start, change, finish all appear in the birth date. Traditional keyword: determination. These people can hold a goal and walk through weather to reach it. The shadow of a full 1-5-9 is stubbornness — seeing only the own road, and calling every other map an obstacle.",
    missing:
      "The 1-5-9 diagonal is empty: none of 1, 5 or 9 appear. Traditional keyword: a weak determination line. Goals may start and stall. The work is to pick one finish line and keep it, on purpose, because the date did not hand it over ready-made.",
  },
  "357": {
    name: "Spirituality",
    line: "3-5-7",
    complete:
      "The 3-5-7 diagonal is complete. Traditional keyword: an inner or spiritual line — meaning, trust, and the wish to look past the surface. The shadow is floating off into belief and skipping the ordinary task.",
    missing:
      "The 3-5-7 diagonal is empty. Traditional keyword: little native pull toward the unseen. Meaning has to be built by choice, not by mood. That is not a defect; it is a different door.",
  },
  "123": {
    name: "Planning",
    line: "1-2-3",
    complete:
      "The 1-2-3 column is complete. Traditional keyword: planning and a mind that orders a next step. These people often think in sequences. The shadow is over-planning a life that still has to be lived.",
    missing:
      "The 1-2-3 column is empty. Traditional keyword: a weak planner line. The work is to write the next three steps down, because the date did not install that habit.",
  },
  "456": {
    name: "Will",
    line: "4-5-6",
    complete:
      "The 4-5-6 column is complete. Traditional keyword: will in the middle of the square — staying power through the daily middle of a task. The shadow is forcing a result that needed patience instead.",
    missing:
      "The 4-5-6 column is empty. Traditional keyword: a weak will line in the Hungarian reading. Follow-through has to be practised; the date does not supply it for free.",
  },
  "789": {
    name: "Activity",
    line: "7-8-9",
    complete:
      "The 7-8-9 column is complete. Traditional keyword: activity — a body and schedule that want to do. The shadow is motion without aim.",
    missing:
      "The 7-8-9 column is empty. Traditional keyword: a quiet activity line. Rest is easy; starting the body toward a task may need an outside clock.",
  },
  "147": {
    name: "Physical",
    line: "1-4-7",
    complete:
      "The 1-4-7 row is complete. Traditional keyword: the physical line — body, craft, things that can be touched. The shadow is living only in the practical and ignoring the rest of the square.",
    missing:
      "The 1-4-7 row is empty. Traditional keyword: a thin physical line. The work is to keep a simple body routine, because the date did not emphasise it.",
  },
  "258": {
    name: "Emotional",
    line: "2-5-8",
    complete:
      "The 2-5-8 row is complete. Traditional keyword: the emotional line — feeling, loyalty, a full inner weather. The shadow is mood running the day.",
    missing:
      "The 2-5-8 row is empty. Traditional keyword: a thin emotional line. Feeling may be delayed or translated into work. The work is to name one feeling before acting.",
  },
  "369": {
    name: "Mental",
    line: "3-6-9",
    complete:
      "The 3-6-9 row is complete. Traditional keyword: the mental line — ideas, teaching, a mind that likes a wide view. The shadow is living in the head and skipping the body of the plan.",
    missing:
      "The 3-6-9 row is empty. Traditional keyword: a thin mental line. Study and long thought have to be chosen; they are not the native weather of the date.",
  },
};

const NAME: Record<number, string> = {
  1: "Expression / heart / personality 1: a name that reads as independent, initiating, first.",
  2: "Expression / heart / personality 2: a name that reads as pairing, tact, the second voice.",
  3: "Expression / heart / personality 3: a name that reads as speech, colour, making.",
  4: "Expression / heart / personality 4: a name that reads as order, work, a square foundation.",
  5: "Expression / heart / personality 5: a name that reads as motion, curiosity, change.",
  6: "Expression / heart / personality 6: a name that reads as care, home, responsibility.",
  7: "Expression / heart / personality 7: a name that reads as study, privacy, analysis.",
  8: "Expression / heart / personality 8: a name that reads as weight, stewardship, a public result.",
  9: "Expression / heart / personality 9: a name that reads as ending, compassion, a wide view.",
  11: "Expression / heart / personality 11: a charged two — insight in the letters, still needing rest.",
  22: "Expression / heart / personality 22: a charged four — a large practical aim in the letters.",
  33: "Expression / heart / personality 33: a charged six — care that wants to teach, still needing a boundary.",
};

export function lifePathCopy(n: number) {
  return LP[n] ?? LP[reduceToKey(n)]!;
}

export function birthCopy(n: number) {
  return BD[n] ?? BD[reduceToKey(n)] ?? BD[5]!;
}

export function personalYearCopy(n: number) {
  return PY[n] ?? PY[reduceToKey(n)]!;
}

export function nameCopy(n: number): string {
  return NAME[n] ?? NAME[reduceToKey(n)] ?? NAME[1]!;
}

function reduceToKey(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  let x = n;
  while (x > 9) x = String(x).split("").reduce((a, c) => a + Number(c), 0);
  return x;
}

export const ARROW_ORDER: ArrowId[] = ["159", "357", "123", "456", "789", "147", "258", "369"];
