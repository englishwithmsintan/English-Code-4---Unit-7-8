import { Flashcard, MatchPair, SATQuestion } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // Unit 7 - Illnesses & Symptoms
  {
    id: 'u7-v1',
    word: 'Sore throat',
    translation: 'Tenggorokan sakit',
    category: 'illness',
    example: 'I have a sore throat, so it hurts when I swallow food.',
    unit: 7
  },
  {
    id: 'u7-v2',
    word: 'High temperature / Fever',
    translation: 'Demam tinggi',
    category: 'illness',
    example: 'A thermometer is used to measure a high temperature.',
    unit: 7
  },
  {
    id: 'u7-v3',
    word: 'Stomachache',
    translation: 'Sakit perut',
    category: 'illness',
    example: 'You should stay at home if you have a terrible stomachache.',
    unit: 7
  },
  {
    id: 'u7-v4',
    word: 'Headache',
    translation: 'Sakit kepala',
    category: 'illness',
    example: 'I need some medicine and quiet rest to cure my headache.',
    unit: 7
  },
  {
    id: 'u7-v5',
    word: 'Cholera',
    translation: 'Kolera',
    category: 'illness',
    example: 'Cholera outbreaks occur when people drink dirty water.',
    unit: 7
  },
  {
    id: 'u7-v6',
    word: 'Flu',
    translation: 'Flu',
    category: 'illness',
    example: 'George went to the clinic because he was feeling weak with the flu.',
    unit: 7
  },

  // Unit 7 - Medical Items
  {
    id: 'u7-m1',
    word: 'Thermometer',
    translation: 'Termometer',
    category: 'medical-item',
    example: 'Nurses use a thermometer to check if we have a fever.',
    unit: 7
  },
  {
    id: 'u7-m2',
    word: 'Bandage',
    translation: 'Perban',
    category: 'medical-item',
    example: 'Wrap a clean bandage around the cut to keep it dry and clean.',
    unit: 7
  },
  {
    id: 'u7-m3',
    word: 'Pills',
    translation: 'Pil / Obat',
    category: 'medical-item',
    example: 'Take one pill twice a day after meals as prescribed.',
    unit: 7
  },
  {
    id: 'u7-m4',
    word: 'Cream',
    translation: 'Krim',
    category: 'medical-item',
    example: 'Apply this soothing cream on your skin rash twice daily.',
    unit: 7
  },
  {
    id: 'u7-m5',
    word: 'X-ray',
    translation: 'Rontgen',
    category: 'medical-item',
    example: 'Dentists use X-rays to see the structure of our teeth.',
    unit: 7
  },
  {
    id: 'u7-m6',
    word: 'Cut',
    translation: 'Luka',
    category: 'medical-item',
    example: 'Wash the cut with warm water before applying a bandage.',
    unit: 7
  },

  // Unit 8 - Rides
  {
    id: 'u8-r1',
    word: 'Roller coaster',
    translation: 'Roller coaster',
    category: 'ride',
    example: 'They enjoyed riding the fast roller coaster yesterday.',
    unit: 8
  },
  {
    id: 'u8-r2',
    word: 'Ferris wheel',
    translation: 'Kincir ria',
    category: 'ride',
    example: 'We are riding the high Ferris wheel right now to see the view.',
    unit: 8
  },
  {
    id: 'u8-r3',
    word: 'Bumper car',
    translation: 'Mobil senggol',
    category: 'ride',
    example: 'He will go to the bumper cars next to have fun.',
    unit: 8
  },

  // Unit 8 - Food & Snacks
  {
    id: 'u8-f1',
    word: 'Popcorn',
    translation: 'Berondong jagung',
    category: 'food',
    example: 'We bought a big bag of popcorn to share during the ride.',
    unit: 8
  },
  {
    id: 'u8-f2',
    word: 'Hot dog',
    translation: 'Hot dog',
    category: 'food',
    example: 'I ordered a delicious hot dog with tomato sauce for lunch.',
    unit: 8
  },
  {
    id: 'u8-f3',
    word: 'Cotton candy',
    translation: 'Rambut nenek / Permen kapas',
    category: 'food',
    example: 'Her cotton candy was sticky, fluffy, and very sweet.',
    unit: 8
  },
  {
    id: 'u8-f4',
    word: 'Potato chips',
    translation: 'Kripik kentang',
    category: 'food',
    example: 'They sat on a bench, chatting and eating crunchy potato chips.',
    unit: 8
  },

  // Unit 8 - Feelings + Prepositions
  {
    id: 'u8-e1',
    word: 'Interested IN',
    translation: 'Tertarik PADA',
    category: 'feeling',
    example: 'Yong is very interested in watching the magic show.',
    unit: 8
  },
  {
    id: 'u8-e2',
    word: 'Worried ABOUT',
    translation: 'Khawatir TENTANG',
    category: 'feeling',
    example: 'The mother felt worried about her child being lost in the crowd.',
    unit: 8
  },
  {
    id: 'u8-e3',
    word: 'Scared OF',
    translation: 'Takut AKAN',
    category: 'feeling',
    example: 'Meili is scared of the high and fast Ferris wheel.',
    unit: 8
  },
  {
    id: 'u8-e4',
    word: 'Excited ABOUT',
    translation: 'Gembira / Bersemangat TENTANG',
    category: 'feeling',
    example: 'All the children are excited about riding the bumper cars.',
    unit: 8
  },

  // Unit 8 - Activities
  {
    id: 'u8-a1',
    word: 'Stand in line',
    translation: 'Mengantre',
    category: 'activity',
    example: 'You must stand in line patiently before buying tickets.',
    unit: 8
  },
  {
    id: 'u8-a2',
    word: 'Take a seat',
    translation: 'Duduk',
    category: 'activity',
    example: 'Please take a seat inside the bumper car and fasten your belt.',
    unit: 8
  },
  {
    id: 'u8-a3',
    word: 'Scream loudly',
    translation: 'Berteriak keras',
    category: 'activity',
    example: 'Riders scream loudly when the roller coaster goes down.',
    unit: 8
  }
];

export const INFINITIVE_PAIRS: MatchPair[] = [
  { id: 'ip1', sentence: 'We use a thermometer', verb: 'to check', purpose: 'the fever' },
  { id: 'ip2', sentence: 'She takes medicine', verb: 'to feel', purpose: 'better' },
  { id: 'ip3', sentence: 'He went to the dentist', verb: 'to fix', purpose: 'his tooth' },
  { id: 'ip4', sentence: 'Dentists use X-rays', verb: 'to see', purpose: 'our teeth' },
  { id: 'ip5', sentence: 'Doctors use medicine', verb: 'to make', purpose: 'patients feel better' }
];

export const STORIES = {
  clinic: {
    title: 'A Visit to the Clinic',
    text: `George woke up with a high temperature, fever, and a sore throat. His mother took him to Greenwood Health Center.

Nurse Angela kindly used a thermometer to check his temperature, which was 39°C. Doctor Jennifer Sanders did a check-up and diagnosed: "It's a common flu."

Doctor Sanders advised: "You should stay in bed and drink water. You shouldn't go outside to school." She wrote a prescription for pills. George took one pill twice a day after meals and soon felt healthy!`
  },
  lost: {
    title: "Who's Lost?",
    text: `Yong and Meili were very excited about visiting the theme park with Uncle Bohai. After riding the Ferris wheel, they sat down to eat. Uncle Bohai bought popcorn for Yong and a hot dog for Meili.

While eating, Meili saw a beautiful butterfly and followed it without asking permission. Soon, Meili was lost!

Searching the park, Yong found Meili's favorite green hat with yellow flowers near the bumper cars. They ran to the Lost Property Office. Inside, they found Meili safe, drinking orange juice with her friend Yuyan!`
  }
};

export const MOCK_SAT_QUESTIONS: SATQuestion[] = [
  // --- Q1 - Q5: READING COMPREHENSION "A Visit to the Clinic" ---
  {
    id: 1,
    number: 1,
    category: 'reading-clinic',
    question: 'Why did George’s mother decide to take him to the Greenwood Health Center?',
    options: [
      'To buy some new toys and books',
      'Because George woke up with a high temperature, fever, and sore throat',
      'To visit George’s school friend Yuyan',
      'To play in the park near the clinic'
    ],
    correctAnswer: 'Because George woke up with a high temperature, fever, and sore throat',
    explanation: 'The story says George woke up with a hot, red face and a high temperature, and his mother noticed his sore throat. Thus, they went to Greenwood Health Center.',
    hint: 'Look at the first paragraph of "A Visit to the Clinic".'
  },
  {
    id: 2,
    number: 2,
    category: 'reading-clinic',
    question: 'What did Nurse Angela use to check George’s temperature, and what was the reading?',
    options: [
      'She used a bandage and the reading was 37°C',
      'She used an X-ray and the reading was 40°C',
      'She used a thermometer and the reading was 39°C',
      'She used a cream and the reading was 35°C'
    ],
    correctAnswer: 'She used a thermometer and the reading was 39°C',
    explanation: 'Nurse Angela took a thermometer to check George’s temperature, which showed 39°C.',
    hint: 'Search for "Nurse Angela" or "temperature" in the second paragraph.'
  },
  {
    id: 3,
    number: 3,
    category: 'reading-clinic',
    question: 'What was the correct diagnosis made by Doctor Jennifer Sanders?',
    options: [
      'Cholera',
      'Common Flu',
      'A broken arm',
      'Stomachache'
    ],
    correctAnswer: 'Common Flu',
    explanation: 'Doctor Sanders examined George and stated: "It’s a common flu," which is the diagnosis.',
    hint: 'Doctor Sanders diagnosed George with a very common illness.'
  },
  {
    id: 4,
    number: 4,
    category: 'reading-clinic',
    question: 'Which of the following is something George SHOULD / SHOULDN’T do, according to the Doctor’s advice?',
    options: [
      'He should drink dirty water and go to school.',
      'He shouldn’t go outside to school, and he should stay in bed and drink water.',
      'He should run outside and eat spicy food.',
      'He shouldn’t sleep in bed and should play in the water.'
    ],
    correctAnswer: 'He shouldn’t go outside to school, and he should stay in bed and drink water.',
    explanation: 'Doctor Sanders advised George that he should stay in bed, drink plenty of water, and shouldn’t go outside to school.',
    hint: 'Review Slide 5 and the clinic story for good advises ("should") and bad ideas ("shouldn’t").'
  },
  {
    id: 5,
    number: 5,
    category: 'reading-clinic',
    question: 'According to the prescription, how often should George take his pills?',
    options: [
      'Once a week before sleeping',
      'Four times a day before playtime',
      'One pill twice a day after meals',
      'Whenever he wants to decorate his room'
    ],
    correctAnswer: 'One pill twice a day after meals',
    explanation: 'The story says George took "one pill twice a day after meals" which matches the prescription details.',
    hint: 'Look at the doctor\'s prescription on Slide 7 or the final sentences of the story.'
  },

  // --- Q6 - Q15: GRAMMAR MCQS (should, to + infinitive, vocabulary) ---
  {
    id: 6,
    number: 6,
    category: 'grammar-mcq-1',
    question: 'Complete the sentence: If you have a high fever, you ________ stay in bed.',
    options: ['should', "shouldn't", 'to', 'are'],
    correctAnswer: 'should',
    explanation: 'We use "should" because staying in bed when you have a fever is good advice.',
    hint: 'Is staying in bed a good idea (should) or a bad idea (shouldn’t)?'
  },
  {
    id: 7,
    number: 7,
    category: 'grammar-mcq-1',
    question: 'Dentists use X-rays ________ our teeth.',
    options: ['for seeing', 'to see', 'saw', 'see'],
    correctAnswer: 'to see',
    explanation: 'We use the Infinitive of Purpose ("to + verb 1") to explain why dentists do something, which is "to see".',
    hint: 'Slide 6 shows: "Dentists use X-rays to see our teeth."'
  },
  {
    id: 8,
    number: 8,
    category: 'grammar-mcq-1',
    question: 'Select the correct sentence:',
    options: [
      'You shouldn’t drink dirty water because it can cause cholera.',
      'You should drink dirty water if you have a fever.',
      'You shouldn’t stay in bed if you are sick.',
      'You should go outside to school when you are weak.'
    ],
    correctAnswer: 'You shouldn’t drink dirty water because it can cause cholera.',
    explanation: 'Drinking dirty water is a very bad idea/dangerous, so "shouldn\'t" is correct.',
    hint: 'Slide 5: "You shouldn’t drink dirty water."'
  },
  {
    id: 9,
    number: 9,
    category: 'grammar-mcq-1',
    question: 'Nurses use a thermometer ________ our temperature.',
    options: ['to check', 'checking', 'checked', 'for check'],
    correctAnswer: 'to check',
    explanation: 'We use "to + verb (base form)" to express purpose. "To check" is correct here.',
    hint: 'Review Slide 6 for Infinitive of Purpose.'
  },
  {
    id: 10,
    number: 10,
    category: 'grammar-mcq-1',
    question: 'Which Indonesian translation corresponds to "Bandage"?',
    options: ['Obat', 'Termometer', 'Perban', 'Luka'],
    correctAnswer: 'Perban',
    explanation: '"Bandage" translated into Indonesian is "Perban".',
    hint: 'Slide 4 shows medical items vocabulary.'
  },
  {
    id: 11,
    number: 11,
    category: 'grammar-mcq-1',
    question: 'Complete: She went to the pharmacy ________ some medicine.',
    options: ['to buy', 'bought', 'buying', 'to buying'],
    correctAnswer: 'to buy',
    explanation: '"to + Verb 1" is used to say WHY she went to the pharmacy.',
    hint: 'Use the base form of the verb after "to".'
  },
  {
    id: 12,
    number: 12,
    category: 'grammar-mcq-1',
    question: 'Yong has a stomachache. What is the Indonesian meaning of "Stomachache"?',
    options: ['Sakit kepala', 'Tenggorokan sakit', 'Sakit perut', 'Demam tinggi'],
    correctAnswer: 'Sakit perut',
    explanation: '"Stomachache" means "Sakit perut" in Bahasa Indonesia.',
    hint: 'Slide 4 details illness vocabulary.'
  },
  {
    id: 13,
    number: 13,
    category: 'grammar-mcq-1',
    question: 'Jack needs some ________ to put on his sore cut.',
    options: ['X-ray', 'thermometer', 'cream', 'pills'],
    correctAnswer: 'cream',
    explanation: 'We apply "cream" on a sore cut, skin rash, or wound.',
    hint: 'You rub this medicine on your skin.'
  },
  {
    id: 14,
    number: 14,
    category: 'grammar-mcq-1',
    question: 'You ________ drink plenty of water every day to stay healthy.',
    options: ["shouldn't", 'should', 'to', 'will'],
    correctAnswer: 'should',
    explanation: 'Drinking plenty of water is sound health advice, so we use "should".',
    hint: 'Is it recommended to drink water?'
  },
  {
    id: 15,
    number: 15,
    category: 'grammar-mcq-1',
    question: 'Doctor Sanders uses a digital chart ________ patients\' records.',
    options: ['save', 'for save', 'to save', 'saving'],
    correctAnswer: 'to save',
    explanation: 'We use "to + verb" (to save) as the infinitive form to state purpose.',
    hint: 'Use Infinitive of Purpose formula.'
  },

  // --- Q16 - Q20: READING "Who's Lost?" ---
  {
    id: 16,
    number: 16,
    category: 'reading-lost',
    question: 'How did Yong and Meili feel about visiting the theme park with Uncle Bohai?',
    options: [
      'They were worried about being lost',
      'They were very excited and looking forward to it',
      'They were scared of hot dogs and popcorn',
      'They were interested in doing medical reports'
    ],
    correctAnswer: 'They were very excited and looking forward to it',
    explanation: 'The story starts by saying "Yong and Meili were very excited about their weekend visit to the theme park."',
    hint: 'Look at the first line of the "Who’s Lost?" story.'
  },
  {
    id: 17,
    number: 17,
    category: 'reading-lost',
    question: 'What snack did Uncle Bohai buy for Meili, and what snack did he get for Yong?',
    options: [
      'Hot dog for Meili and popcorn for Yong',
      'Cotton candy for Meili and potato chips for Yong',
      'Popcorn for Meili and hot dog for Yong',
      'Cream for Meili and pills for Yong'
    ],
    correctAnswer: 'Hot dog for Meili and popcorn for Yong',
    explanation: 'The text specifies that Uncle Bohai "walked to a food stall to buy a box of popcorn for Yong and a hot dog for Meili."',
    hint: 'Pay close attention to who got popcorn and who got the hot dog.'
  },
  {
    id: 18,
    number: 18,
    category: 'reading-lost',
    question: 'Why did Meili walk away from the outdoor café without asking permission?',
    options: [
      'She was scared of the roller coaster',
      'She saw a beautiful butterfly and followed it',
      'She wanted to find Yuyan at the bumper cars',
      'She wanted to go to school'
    ],
    correctAnswer: 'She saw a beautiful butterfly and followed it',
    explanation: 'Meili walked away because she "saw a beautiful butterfly and followed it without asking permission."',
    hint: 'Slide 126 and the text explain her distraction.'
  },
  {
    id: 19,
    number: 19,
    category: 'reading-lost',
    question: 'What clue did Yong find near the bumper cars that helped them search for Meili?',
    options: [
      'A box of spilled popcorn',
      'A bandage in a doctor’s bag',
      'Meili’s favorite green hat with yellow flowers',
      'A map of the theme park'
    ],
    correctAnswer: 'Meili’s favorite green hat with yellow flowers',
    explanation: 'The story states that Yong found "Meili\'s favorite green hat with yellow flowers" lying on the floor near the bumper cars.',
    hint: 'Look for what item of clothing was found on the ground.'
  },
  {
    id: 20,
    number: 20,
    category: 'reading-lost',
    question: 'Where did Uncle Bohai and Yong finally find Meili, and who was she with?',
    options: [
      'Riding the roller coaster with George',
      'Standing in the long food line with Alex',
      'At the Lost Property Office drinking orange juice with her friend Yuyan',
      'Taking a medical checkup at Greenwood Health Center'
    ],
    correctAnswer: 'At the Lost Property Office drinking orange juice with her friend Yuyan',
    explanation: 'They found her at the Lost Property Office safe, drinking juice with her friend Yuyan.',
    hint: 'Where do you go if you find lost things or lost kids in a theme park?'
  },

  // --- Q21 - Q25: GRAMMAR MCQS (Tenses: Past/Present/Future) ---
  {
    id: 21,
    number: 21,
    category: 'grammar-mcq-2',
    question: 'Choose the correct sentence in the PAST tense:',
    options: [
      'They ride the roller coaster right now.',
      'They rode the roller coaster yesterday.',
      'They will ride the roller coaster tomorrow.',
      'They are riding the roller coaster next.'
    ],
    correctAnswer: 'They rode the roller coaster yesterday.',
    explanation: '"Rode" is the past tense form of "ride", and "yesterday" is a past time marker.',
    hint: 'Slide 11: Past tense actions happened yesterday or ago.'
  },
  {
    id: 22,
    number: 22,
    category: 'grammar-mcq-2',
    question: 'Complete the sentence: "We are riding the Ferris wheel ________."',
    options: ['yesterday', 'tomorrow', 'now', 'next week'],
    correctAnswer: 'now',
    explanation: '"are riding" is Present Continuous (am/is/are + verb-ing), which partners with the time marker "now" or "right now".',
    hint: 'Slide 11 shows "now" / "right now" translates to the present tense.'
  },
  {
    id: 23,
    number: 23,
    category: 'grammar-mcq-2',
    question: 'What is the future tense form of: "We go to the bumper cars"?',
    options: [
      'We went to the bumper cars.',
      'We are going to the bumper cars right now.',
      'We will go to the bumper cars next.',
      'We goes to the bumper cars yesterday.'
    ],
    correctAnswer: 'We will go to the bumper cars next.',
    explanation: 'Future tense uses "will + verb (base form)" and future timers like "next" or "tomorrow".',
    hint: 'Slide 11: Future uses "will" + base verb.'
  },
  {
    id: 24,
    number: 24,
    category: 'grammar-mcq-2',
    question: 'Past tense of "see" is ________, and past tense of "eat" is ________.',
    options: ['saw / ate', 'seen / eaten', 'seeing / eating', 'see / eat'],
    correctAnswer: 'saw / ate',
    explanation: 'The past tense of "see" is irregular "saw", and "eat" becomes "ate".',
    hint: 'Look at the verb changes listed under PAST on Slide 11.'
  },
  {
    id: 25,
    number: 25,
    category: 'grammar-mcq-2',
    question: 'Identify the tense: "Ava and Ethan bought tickets before the ride."',
    options: ['Present Tense', 'Past Tense', 'Future Tense', 'Infinitive of Purpose'],
    correctAnswer: 'Past Tense',
    explanation: '"bought" is the past tense of "buy", making this a Past Tense sentence.',
    hint: 'Did they buy tickets now, tomorrow, or in the past?'
  },

  // --- Q26 - Q30: TRUE / FALSE (Doctor's Report Analysis) ---
  // Based on Slide 7 Doctor's Report:
  // Patient: Ryan Gosling
  // Symptoms: High temperature, sore throat, cough
  // Diagnosis: Common Flu
  // Doctor's Advice: Drink water, Stay in bed, Don't go outside
  // Prescription: One pill twice a day after meals
  {
    id: 26,
    number: 26,
    category: 'true-false-medical',
    question: 'True or False: The patient described in the Doctor’s Report is named Ryan Gosling.',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'TRUE',
    explanation: 'According to Slide 7, the patient name is explicitly listed as Ryan Gosling.',
    hint: 'Look at the patient name on Slide 7.'
  },
  {
    id: 27,
    number: 27,
    category: 'true-false-medical',
    question: 'True or False: Ryan Gosling is diagnosed with Cholera.',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'FALSE',
    explanation: 'The diagnosis in the medical report is Common Flu, not Cholera.',
    hint: 'Check the "Diagnosis" box in Slide 7.'
  },
  {
    id: 28,
    number: 28,
    category: 'true-false-medical',
    question: 'True or False: The doctor advised Ryan Gosling that he should stay in bed and shouldn’t go outside.',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'TRUE',
    explanation: 'The Doctor’s Advice box advises: "Drink water · Stay in bed · Don’t go outside" which is stay in bed and shouldn’t go outside.',
    hint: 'Read the "Doctor\'s Advice" bullets in the Slide 7 grid.'
  },
  {
    id: 29,
    number: 29,
    category: 'true-false-medical',
    question: 'True or False: The medical prescription says to take pills four times a day before meals.',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'FALSE',
    explanation: 'The prescription says: "One pill twice a day after meals," not four times a day before meals.',
    hint: 'Look at the "Prescription" detail at the bottom of the card on Slide 7.'
  },
  {
    id: 30,
    number: 30,
    category: 'true-false-medical',
    question: 'True or False: Common symptoms listed for Ryan Gosling are high temperature, sore throat, and cough.',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'TRUE',
    explanation: 'The "Symptoms" in the Doctor’s Report are specifically "High temperature, sore throat, cough".',
    hint: 'Check the "Symptoms" field on Slide 7.'
  },

  // --- Q31 - Q35: FILL IN THE BLANK (Adjective + Prepositions) ---
  {
    id: 31,
    number: 31,
    category: 'fill-preposition',
    question: 'Complete the sentence: Yong is very interested _______ watching the magic show.',
    options: ['in', 'about', 'of', 'at'],
    correctAnswer: 'in',
    explanation: 'We always pair the adjective "interested" with the preposition "in".',
    hint: 'Slide 10 & 13: interested + IN'
  },
  {
    id: 32,
    number: 32,
    category: 'fill-preposition',
    question: 'Complete the sentence: Meili is scared _______ the high Ferris wheel.',
    options: ['in', 'about', 'of', 'at'],
    correctAnswer: 'of',
    explanation: 'The adjective "scared" is grammatically followed by the preposition "of".',
    hint: 'Slide 10 & 13: scared + OF'
  },
  {
    id: 33,
    number: 33,
    category: 'fill-preposition',
    question: 'Complete the sentence: The children are excited _______ riding the bumper cars.',
    options: ['in', 'about', 'of', 'for'],
    correctAnswer: 'about',
    explanation: 'We pair the adjective "excited" with the preposition "about" in this context.',
    hint: 'Slide 10 & 13: excited + ABOUT'
  },
  {
    id: 34,
    number: 34,
    category: 'fill-preposition',
    question: 'Complete the sentence: She felt worried _______ being lost in the theme park crowd.',
    options: ['in', 'about', 'of', 'on'],
    correctAnswer: 'about',
    explanation: 'The adjective "worried" is paired with the preposition "about".',
    hint: 'Slide 10 & 13: worried + ABOUT'
  },
  {
    id: 35,
    number: 35,
    category: 'fill-preposition',
    question: 'Complete the sentence: Ethan is scared ________ the fast roller coaster.',
    options: ['in', 'of', 'about', 'at'],
    correctAnswer: 'of',
    explanation: 'We use the preposition "of" after "scared".',
    hint: 'What preposition always targets "scared"?'
  },

  // --- Q36 - Q40: ARRANGE THE SENTENCES (from slide 18) ---
  {
    id: 36,
    number: 36,
    category: 'arrange-sentence',
    question: 'Put these words in order: "should / you / see / a / doctor / if / you / feel / sick"',
    options: [
      'You should feel sick if you see a doctor.',
      'Sore throat you see a doctor if feel sick.',
      'You should see a doctor if you feel sick.',
      'If you feel should see a doctor you sick.'
    ],
    correctAnswer: 'You should see a doctor if you feel sick.',
    explanation: 'The correct arrangement matches sentence 1 from Slide 18: "You should see a doctor if you feel sick."',
    hint: 'Check Slide 18 item 1. Remember capital "You" starts the statement.'
  },
  {
    id: 37,
    number: 37,
    category: 'arrange-sentence',
    question: 'Put these words in order: "use / Nurses / a / thermometer / to / take / our / temperature"',
    options: [
      'Take our temperature Nurses use a thermometer to.',
      'Nurses use a thermometer to take our temperature.',
      'To take our temperature nurses use a thermometer.',
      'Nurses to take our temperature use a thermometer.'
    ],
    correctAnswer: 'Nurses use a thermometer to take our temperature.',
    explanation: 'The correct arrangement is: "Nurses use a thermometer to take our temperature."',
    hint: 'Check Slide 18 item 2. Connect the Subject + Action + Infinitive of Purpose.'
  },
  {
    id: 38,
    number: 38,
    category: 'arrange-sentence',
    question: 'Put these words in order: "roller / the / enjoyed / children / The / coaster"',
    options: [
      'The children enjoyed the roller coaster.',
      'The roller coaster children enjoyed the.',
      'Colera children enjoyed the roller coaster.',
      'Children enjoyed the coaster roller the.'
    ],
    correctAnswer: 'The children enjoyed the roller coaster.',
    explanation: 'The correct order is sentence 3 on Slide 18: "The children enjoyed the roller coaster."',
    hint: 'Past tense of enjoy. Who did the enjoying? (The children)'
  },
  {
    id: 39,
    number: 39,
    category: 'arrange-sentence',
    question: 'Put these words in order: "bought / tickets / Ava and Ethan / before / the ride"',
    options: [
      'Before the ride Ava and Ethan bought tickets.',
      'Tickets bought Ava and Ethan before the ride.',
      'Ava and Ethan bought tickets before the ride.',
      'Ava and Ethan before the ride bought tickets.'
    ],
    correctAnswer: 'Ava and Ethan bought tickets before the ride.',
    explanation: 'Sentence 4 on Slide 18 rearranges to: "Ava and Ethan bought tickets before the ride."',
    hint: 'Slide 18 item 4: Subject "Ava and Ethan" + verb "bought" + object "tickets" + prepositional phrase.'
  },
  {
    id: 40,
    number: 40,
    category: 'arrange-sentence',
    question: 'Put these words in order: "are / We / riding / the / Ferris / wheel / now"',
    options: [
      'We are riding the Ferris wheel now.',
      'Now are we riding the Ferris wheel.',
      'The Ferris wheel are we riding now.',
      'We riding are the now Ferris wheel.'
    ],
    correctAnswer: 'We are riding the Ferris wheel now.',
    explanation: 'The correct order is: "We are riding the Ferris wheel now."',
    hint: 'Slide 18 item 5. Uses continuous "are riding" with present tense marker "now".'
  }
];
