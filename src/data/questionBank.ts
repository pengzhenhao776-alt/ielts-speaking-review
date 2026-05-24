// 2026年5-8月雅思口语题库 + ORED框架答案
// Part 1: 3句20秒 | Part 2: 90秒 | Part 3: 40-60秒辩证

export interface Part1QA {
  q: string
  a: string
}

export interface Part1Topic {
  topic: string
  tag: string // 新题 / 保留题 / 必考
  questions: Part1QA[]
}

export interface Part2Topic {
  topic: string
  tag: string
  cueCard: string // 完整题卡文字
  answer: string // 90秒完整回答
}

export interface Part3QA {
  q: string
  a: string
}

export interface Part3Topic {
  topic: string
  relatedTo: string // 关联的Part2话题
  questions: Part3QA[]
}

// ============================================================
// Part 1: ORED结构，3句20秒
// ============================================================
export const part1Topics: Part1Topic[] = [
  // ---- 必考 ----
  {
    topic: 'Study',
    tag: '必考',
    questions: [
      { q: 'Do you work or are you a student?', a: "I'm currently a student, pursuing my bachelor's degree in law at university. It's been quite a demanding but rewarding journey so far." },
      { q: 'What subject are you studying?', a: "I'm studying law. Personally speaking, it's a fascinating field because it covers so many aspects of society — from criminal justice to business regulations." },
      { q: 'Why did you choose that subject?', a: "To be honest, I chose it partly out of interest in how society works. On top of that, it offers solid career prospects, which appealed to my parents as well." },
      { q: 'Do you like your subject?', a: "Definitely, I'm really passionate about it. Legal studies truly appeal to me because every case is like a puzzle to solve. It brings me a strong sense of fulfillment." },
      { q: 'What would you like to do in the future?', a: "I hope to pursue a career in corporate law. From my perspective, it's a meaningful path that allows me to help businesses while staying intellectually engaged." },
    ],
  },
  {
    topic: 'Work',
    tag: '必考',
    questions: [
      { q: 'What work do you do?', a: "I'm currently working as a junior accountant. It's a practical role that involves handling financial records and preparing reports on a daily basis." },
      { q: 'Do you like your job?', a: "For the most part, yes. I find it quite rewarding because it gives me a sense of accomplishment when numbers balance perfectly. Though sometimes it can be a bit repetitive." },
    ],
  },
  {
    topic: 'Hometown',
    tag: '必考',
    questions: [
      { q: 'Where in your country do you live?', a: "I live in Dalian, a coastal city in northeast China. It's known for its stunning coastline and pleasant climate." },
      { q: 'Is that a big city or a small place?', a: "It's a fairly large city with a population of several million. Personally speaking, it strikes a nice balance — not as overwhelming as Beijing, but still with plenty of urban amenities." },
      { q: 'What do you like most about your hometown?', a: "The thing I'm really into is the seaside scenery. On my leisure time, I enjoy strolling along the coastline — it helps me wind down and feel refreshed." },
      { q: 'Has your hometown changed much these years?', a: "Absolutely, it's changed dramatically. Numerous new buildings and shopping malls have sprung up. The main reason is that tourism has been growing steadily here." },
    ],
  },
  {
    topic: 'Home & Accommodation',
    tag: '必考',
    questions: [
      { q: 'Do you live in a house or a flat?', a: "I live in a flat on the fifth floor of an apartment building. It's not particularly large, but it's tidy and well-organized." },
      { q: 'Which is your favourite room in your home?', a: "Without a doubt, my bedroom. It's my quiet place where I can unwind and chill out after a hectic day. The lighting is warm and cozy, which makes it feel peaceful." },
      { q: 'Do you live alone or with your family?', a: "I live with my family. To be honest, it can get a little crowded at times, but overall it's delightful having them around for support and company." },
    ],
  },
  {
    topic: 'The area you live in',
    tag: '必考',
    questions: [
      { q: 'Do you like the area that you live in now?', a: "Yes, I'm quite content with it. It's convenient — there are plenty of shops and restaurants within walking distance. Plus, the neighborhood is peaceful and safe." },
      { q: 'Are people in your area friendly?', a: "Generally speaking, yes. My neighbors are warm-hearted and considerate. For instance, the elderly couple next door often shares homemade food with us." },
    ],
  },

  // ---- 新题 ----
  {
    topic: 'Singing',
    tag: '新题',
    questions: [
      { q: 'Do you like singing?', a: "Absolutely, I'm a big fan of singing, especially when I'm alone at home. It helps me release pressure. Whenever I'm not busy, I'll sing along to my favorite songs." },
      { q: 'Have you ever learnt how to sing?', a: "Not formally. I've never taken professional lessons, but I did pick up some basic techniques from watching videos online. It's just a casual hobby for me." },
      { q: 'Do you think singing can bring happiness to people?', a: "Without a doubt. Music has this incredible power to lift your spirits. When you sing, it releases endorphins and brings a sense of joy. I've experienced this firsthand countless times." },
    ],
  },
  {
    topic: 'Tidiness',
    tag: '新题',
    questions: [
      { q: 'Are you a tidy person?', a: "Personally speaking, I'd say I'm fairly organized, though I wouldn't call myself a neat freak. A clutter-free environment helps me stay sharp and think more clearly." },
      { q: 'Did you use to keep your room tidy as a child?', a: "To be honest, not at all. I was quite messy as a kid and my mom constantly nagged me about it. As I grew older, I gradually became more mindful of keeping things in order." },
      { q: 'How do you keep your work or study place tidy?', a: "I make a point of tidying up at the end of each day. I put everything back where it belongs and wipe down the desk. It gives me a sense of satisfaction." },
      { q: 'Do you think it is necessary to be tidy?', a: "For the most part, yes. Being organized saves time and reduces stress. However, I also believe some creative people thrive in a bit of chaos — so it depends on the person." },
    ],
  },
  {
    topic: 'Science',
    tag: '新题',
    questions: [
      { q: 'Do you like science?', a: "I'm quite fond of science, especially biology. Personally speaking, it's fascinating to understand how living organisms function — it reveals so much about the world around us." },
      { q: 'When did you start to learn about science?', a: "I first encountered science in primary school, around age eight. Initially, we did simple experiments, and that hands-on approach really appealed to me." },
      { q: 'Which science subject is interesting to you?', a: "Biology captivates me the most. The human body is incredibly complex, and learning about it is genuinely thought-provoking. Every system works together in a way that's almost artistic." },
    ],
  },
  {
    topic: 'Watches',
    tag: '新题',
    questions: [
      { q: 'Do you wear a watch?', a: "To be honest, I'm not really into wearing watches on a daily basis. My phone keeps me on schedule, so I don't feel the need for an extra device." },
      { q: 'Have you ever got a watch as a gift?', a: "Yes, my grandfather gave me one for my graduation. It holds tremendous sentimental value, so I only wear it on special occasions." },
      { q: 'Why do some people wear expensive watches?', a: "From my perspective, it's more about status than function. An expensive watch is a fashion statement — it conveys success and sophistication. On top of that, some view them as investments." },
    ],
  },
  {
    topic: 'Parks',
    tag: '新题',
    questions: [
      { q: 'Do you like going to parks?', a: "Absolutely, I'm a big fan of parks. They're an ideal place to unwind and take it easy. Whenever the weather is nice, I'll head to the nearest park for a stroll." },
      { q: 'What do you like to do when visiting a park?', a: "I enjoy a wide range of activities — walking, people-watching, or simply sitting on a bench with a book. On weekends, I sometimes have a picnic with friends there." },
      { q: 'How are the parks today different from those you visited as a kid?', a: "They've changed significantly. Parks today are much more well-maintained and diverse. When I was young, parks were just open spaces with basic facilities. Now there are fitness equipment, art installations, and even outdoor cafes." },
    ],
  },
  {
    topic: 'Music',
    tag: '新题',
    questions: [
      { q: 'Do you like listening to music?', a: "Definitely, music is a massive part of my daily life. It helps me stay focused when studying and lifts my mood when I'm feeling down." },
      { q: 'What kind of music do you like?', a: "I'm into a variety of genres, but pop and acoustic are my go-to choices. I find acoustic music particularly calming and peaceful." },
      { q: 'Do you play any musical instruments?', a: "I learned the piano as a child but gave it up after a few years. Looking back, I wish I had stuck with it. It's a solid skill that benefits you in numerous ways." },
    ],
  },
  {
    topic: 'Social media',
    tag: '新题',
    questions: [
      { q: 'Do you use social media often?', a: "I'd say I use it fairly regularly. It helps me stay connected with friends and keep up with current events. But I try not to overdo it." },
      { q: 'What social media platforms do you use?', a: "Mainly WeChat and Douyin. WeChat is essential for daily communication, while Douyin provides engaging content when I have some spare time on my hands." },
    ],
  },
  {
    topic: 'Feeling bored',
    tag: '新题',
    questions: [
      { q: 'Do you often feel bored?', a: "Not really. I usually have a fully scheduled day, so there's rarely a dull moment. But occasionally, during long commutes, I do find myself feeling a bit restless." },
      { q: 'What do you do when you feel bored?', a: "I usually pick up my phone and scroll through social media — it's almost like an extension part of my arm at this point. Alternatively, I'll put on some music and just relax." },
    ],
  },
  {
    topic: 'Dream and ambition',
    tag: '新题',
    questions: [
      { q: 'What is your dream?', a: "My dream is to become a successful lawyer. It's a demanding path, but the idea of helping people navigate complex legal issues gives me a strong sense of purpose." },
      { q: 'Do you think dreams are important?', a: "Absolutely. Dreams give us direction and motivation. Without them, life would feel aimless. They push us to grow and achieve things we never thought possible." },
    ],
  },
  {
    topic: 'Teachers',
    tag: '新题',
    questions: [
      { q: 'Do you have a favourite teacher?', a: "Yes, my high school English teacher was truly inspiring. She was kind and approachable, and her passion for the subject was captivating." },
      { q: 'Do you want to be a teacher in the future?', a: "To be honest, I wouldn't say I'm keen on it as a career. Teaching is meaningful work, but I think it demands a level of patience I'm not sure I have." },
    ],
  },
  {
    topic: 'Cars',
    tag: '新题',
    questions: [
      { q: 'Do you like travelling by car?', a: "It depends. For short trips, I quite enjoy it — it's convenient and flexible. But for long journeys, I find it exhausting and troublesome." },
      { q: 'Do you have a car?', a: "Not yet. I haven't learned to drive, to be honest. It's on my to-do list, but finding time for lessons has been challenging." },
    ],
  },
  {
    topic: 'History',
    tag: '新题',
    questions: [
      { q: 'Do you like history?', a: "I'm quite fond of history, especially modern Chinese history. Personally speaking, understanding the past is essential for making sense of the present." },
      { q: 'Did you enjoy history lessons at school?', a: "Not initially. The way it was taught felt dry and tedious. But as I grew older, I began to find it more thought-provoking." },
    ],
  },

  // ---- 保留题 ----
  {
    topic: 'Food',
    tag: '保留题',
    questions: [
      { q: 'What is your favourite food?', a: "I'm really into hot pot. It's not just a meal — it's a social experience. Gathering around a bubbling pot with friends brings me a genuine sense of joy." },
      { q: 'What kind of food did you like when you were young?', a: "As a child, I was mainly into sweet things — cakes, candies, ice cream. My tastes have certainly diversified since then." },
      { q: 'Do you eat different foods at different times of the year?', a: "Definitely. In summer I prefer light, refreshing dishes, while winter calls for hearty, warming meals like stews and soups." },
    ],
  },
  {
    topic: 'Pets and Animals',
    tag: '保留题',
    questions: [
      { q: 'Did you have any pets when you were a child?', a: "Yes, I had a cat when I was growing up. She was incredibly calm and peaceful — just sitting with her after school helped me release pressure." },
      { q: "What's your favourite animal?", a: "I'm quite fond of dogs. They're loyal, intelligent, and always cheerful. My family means everything to me, and dogs somehow feel like family too." },
    ],
  },
  {
    topic: 'Hobby',
    tag: '保留题',
    questions: [
      { q: 'Do you have any hobbies?', a: "Yes, I'm really into photography. It broadens my horizons by making me notice details I'd otherwise overlook. On weekends, I often go out shooting." },
      { q: 'Did you have any hobbies when you were a child?', a: "As a child, I was keen on drawing. I'd spend hours sketching everything around me. Looking back, it was a solid way to develop creativity." },
    ],
  },
  {
    topic: 'Gifts',
    tag: '保留题',
    questions: [
      { q: 'What kinds of gifts do you usually like receiving?', a: "I prefer practical gifts over purely decorative ones. Something I can use in my daily routine — a good book or a versatile piece of tech." },
      { q: 'Are you good at choosing gifts?', a: "To be honest, I find gift-giving quite challenging. I always overthink whether the person will genuinely like it. It gives me a bit of anxiety." },
    ],
  },
  {
    topic: 'Reading',
    tag: '保留题',
    questions: [
      { q: 'Do you like reading?', a: "I'm a big fan of reading. Whenever I have spare time, I love picking up a book and getting lost in it. It fits my lifestyle really well." },
      { q: 'Do you prefer to read on paper or on a screen?', a: "I lean towards paper books. There's something about the tactile experience that screens just can't replicate. However, e-books are undeniably more practical for travel." },
    ],
  },
  {
    topic: 'Sports',
    tag: '保留题',
    questions: [
      { q: 'Do you have a favourite sport?', a: "I've always been a big fan of badminton. It fits me well — as a lean person, I prefer skill-based sports over intense physical contests." },
      { q: 'Have you ever been part of a sports team?', a: "Yes, I was on my school's basketball team. It taught me the value of teamwork and dedication. Though I wasn't a star player, the experience was truly rewarding." },
    ],
  },
  {
    topic: 'Walking',
    tag: '保留题',
    questions: [
      { q: 'Do you walk a lot?', a: "Fairly often. I walk to and from campus every day. It's a simple way to stay active and clear my mind at the same time." },
      { q: 'Where would you like to take a long walk?', a: "I'd love to walk along the Great Wall someday. The combination of stunning scenery and historical significance would make it a truly captivating experience." },
    ],
  },
  {
    topic: 'Shopping',
    tag: '保留题',
    questions: [
      { q: 'Do you like shopping?', a: "It depends. I enjoy browsing when I'm not rushed, but I find crowded malls quite overwhelming. Online shopping is more my style — convenient and efficient." },
      { q: 'Do you prefer shopping online or in stores?', a: "I lean towards online shopping. It's practical and saves me plenty of time. However, for clothes, I still prefer trying things on in person." },
    ],
  },
  {
    topic: 'Morning routines',
    tag: '保留题',
    questions: [
      { q: 'What is your morning routine?', a: "I typically wake up around seven, have a quick breakfast, and then head to class. I stick to this routine quite consistently on weekdays." },
      { q: 'Do you like to get up early in the mornings?', a: "To be honest, I'm not a morning person. Waking up early is challenging for me. But once I'm up, I appreciate the calm and peaceful atmosphere of the early hours." },
    ],
  },
  {
    topic: 'Films / Cinemas',
    tag: '保留题',
    questions: [
      { q: 'Do you like watching films?', a: "Absolutely, I'm a big fan of films. They're a great way to unwind after a long week. I especially enjoy thought-provoking dramas." },
      { q: 'Do you prefer watching films at home or at the cinema?', a: "It depends on the film. For big blockbusters with stunning visuals, the cinema experience is unmatched. But for casual watching, home is more comfortable and flexible." },
    ],
  },
  {
    topic: 'Time Management',
    tag: '保留题',
    questions: [
      { q: 'Can you manage your time well?', a: "I'd say I'm fairly good at it. I use a planner to organize my tasks. It helps me stay on top of things and reduces unnecessary stress." },
      { q: 'Is time management important?', a: "Without a doubt. Effective time management is essential in today's busy world. It allows you to be more productive while still having time to wind down." },
    ],
  },
  {
    topic: 'Daily routine',
    tag: '保留题',
    questions: [
      { q: 'What do you usually do in a day?', a: "My day is fairly structured. Mornings are for classes, afternoons for studying and assignments, and evenings I try to relax — maybe read or watch something." },
      { q: 'Would you like to change your daily routine?', a: "Perhaps a little. I'd like to incorporate more exercise and outdoor activities. A more balanced routine would definitely benefit my overall well-being." },
    ],
  },
  {
    topic: 'Day off',
    tag: '保留题',
    questions: [
      { q: 'What do you often do on your days off?', a: "I usually take it easy — sleep in, meet friends, or indulge in hobbies. It's my chance to recharge after a busy week." },
      { q: 'What would you like to do if you had a day off tomorrow?', a: "I'd love to go on a short trip to the countryside. Fresh air and scenic views would be a refreshing change from the usual urban routine." },
    ],
  },
  {
    topic: 'Dreams',
    tag: '保留题',
    questions: [
      { q: 'Do you often remember your dreams?', a: "Not really. Usually they fade within minutes of waking up. But occasionally a particularly vivid or strange dream sticks with me throughout the day." },
      { q: 'Are you interested in others dreams?', a: "To be honest, not particularly. Dream stories tend to be confusing and fragmented. Though I understand why some people find them fascinating." },
    ],
  },
  {
    topic: 'Names',
    tag: '保留题',
    questions: [
      { q: 'Does your name have any special meaning?', a: "Yes, my parents chose it carefully. They wanted something that conveyed strength and intelligence. It's a meaningful part of my identity." },
      { q: 'Would you like to change your name?', a: "No, I wouldn't. I've grown attached to it over the years. Besides, it's a gift from my parents, and that holds sentimental value for me." },
    ],
  },
  {
    topic: 'Keys',
    tag: '保留题',
    questions: [
      { q: 'Do you always bring a lot of keys with you?', a: "Not really. I carry just the essentials — my house key and a small keychain. I try to keep things minimal and uncluttered." },
      { q: 'Have you ever lost your keys?', a: "Yes, once in high school. It was incredibly troublesome — I had to wait outside for hours. Since then, I've been much more careful." },
    ],
  },
  {
    topic: 'Memory',
    tag: '保留题',
    questions: [
      { q: 'Do you have a good memory?', a: "I'd say it's fairly average. I'm good at remembering faces and events, but names and numbers tend to slip my mind easily." },
      { q: 'How do you remember things?', a: "I rely heavily on my phone for reminders and notes. It's practical and effective — almost like an extension of my memory." },
    ],
  },
]

// ============================================================
// Part 2: 90秒结构，前3题各10秒，最后一题60秒两个原因
// ============================================================
export const part2Topics: Part2Topic[] = [
  {
    topic: 'Describe a memorable trip you took',
    tag: '保留题',
    cueCard: 'Describe a memorable trip you took. You should say: where you went, who you went with, what you did, and explain why it was memorable.',
    answer: "A couple of years ago I went to Yunnan in southwest China. It's known for its stunning scenery and vibrant local culture. I traveled with two close friends — both quite laid-back and easy-going, which made the trip really delightful. We spent a week exploring the old town of Lijiang, hiking through Tiger Leaping Gorge, and trying numerous local dishes. The trip genuinely broadened my horizons — before this, I'd never experienced such diverse culture within my own country. The traditional architecture and minority festivals were truly thought-provoking. On top of that, it strengthened my friendships. We went through challenging moments together — getting lost on a trail, dealing with a sudden rainstorm — but those are the moments we still laugh about today. So overall, it was a meaningful experience that enriched my life.",
  },
  {
    topic: 'Describe a person who often helps others',
    tag: '保留题',
    cueCard: 'Describe a person who often helps others. You should say: who this person is, how often he/she helps others, how he/she helps others, and explain how you feel about this person.',
    answer: "The person I want to talk about is my neighbor, Auntie Wang. She lives next door and is always ready to lend a hand. She helps others on a daily basis — it's genuinely part of her routine. She volunteers at the community center, helps elderly neighbors with groceries, and even babysits for busy parents. I find her truly inspiring. Her kindness is genuine — she doesn't expect anything in return. She once told me that helping others brings her a deep sense of fulfillment, and I can see that in how cheerful she always is. On top of that, her influence has spread through the community. More neighbors have started helping each other because of her example. So to me, she's not just a kind person — she's someone who makes the entire neighborhood a better place to live.",
  },
  {
    topic: 'Describe a famous person you would like to meet',
    tag: '保留题',
    cueCard: 'Describe a famous person you would like to meet. You should say: who he/she is, how you knew him/her, how/where you would like to meet him/her, and explain why you would like to meet him/her.',
    answer: "I would love to meet Elon Musk, the entrepreneur behind Tesla and SpaceX. I first learned about him through news articles about space exploration. His vision of colonizing Mars was captivating and thought-provoking. If I could meet him, I'd prefer a casual setting — maybe a small conference or a Q&A session. I'd want to hear his unfiltered thoughts rather than a prepared speech. There are two reasons I'd like to meet him. Firstly, his innovative mindset genuinely inspires me. He tackles problems that most people consider impossible, and that kind of boldness is rare. On top of that, I'm curious about his personal philosophy — how he handles failure, what drives him, and what advice he'd give to young entrepreneurs. Meeting him would, without a doubt, be a life-changing experience.",
  },
  {
    topic: 'Describe a shopping mall',
    tag: '保留题',
    cueCard: 'Describe a shopping mall. You should say: what its name is, where it is, how often you visit it, and what you usually buy at the mall.',
    answer: "The shopping mall I want to talk about is Wanda Plaza, located in the city center, about a 15-minute drive from my home. I visit it roughly twice a month, usually on weekends when I have some spare time. I typically go there for a mix of shopping, dining, and entertainment — clothes, books, and occasionally some electronics. Two things make this mall stand out. Firstly, it's incredibly convenient — you can find virtually everything under one roof. From groceries to fashion to a cinema, it's a one-stop destination. On top of that, the atmosphere is vibrant and lively. There are always events happening — live music performances, holiday decorations, pop-up markets. So it's not just a shopping trip; it's genuinely a pleasant outing that helps me wind down and relax.",
  },
  {
    topic: 'Describe a family member who you are proud of',
    tag: '保留题',
    cueCard: 'Describe a family member who you are proud of. You should say: who this person is, when this happened, what this person did, and explain why you felt proud.',
    answer: "I want to talk about my mother. About five years ago, she decided to go back to university to complete her degree — something she had postponed decades earlier to raise our family. She balanced work, family responsibilities, and studying, which was incredibly demanding. I felt proud for two main reasons. Firstly, her determination was remarkable. She would wake up at 5 AM to study before work and stay up late doing assignments. Her dedication and diligence truly inspired me. On top of that, she showed me that it's never too late to pursue your dreams. At an age when many people settle into routine, she pushed herself to grow. So her achievement wasn't just a degree — it was a powerful lesson about perseverance that I carry with me every day.",
  },
  {
    topic: 'Describe your perfect job',
    tag: '保留题',
    cueCard: 'Describe your perfect job. You should say: what it is, where you heard about it from, what you need to learn to get the job, and explain why you think it is your perfect job.',
    answer: "My perfect job would be working as an environmental lawyer. I first learned about this career path from a university lecturer who specialized in environmental protection cases. To get the job, I'd need to complete my law degree, pass the bar exam, and gain specialized knowledge in environmental regulations. Two things make this my ideal career. Firstly, it combines my passion for law with my concern for the environment. I find the idea of protecting natural resources through legal means genuinely meaningful and fulfilling. On top of that, the field is rapidly evolving. As environmental issues become more pressing globally, this area of law will only grow in importance. So it's a career that offers both personal satisfaction and solid long-term prospects.",
  },
  {
    topic: 'Describe your favourite place in your house where you can relax',
    tag: '保留题',
    cueCard: 'Describe your favourite place in your house where you can relax. You should say: where it is, what it is like, what you enjoy doing there, and explain why you feel relaxed at this place.',
    answer: "My favorite place to relax is my bedroom, specifically the small reading corner I've set up by the window. It has a comfortable armchair, a soft lamp, and a small bookshelf. I enjoy reading there, listening to music, or sometimes just sitting quietly with a cup of tea. The corner brings me a genuine sense of peace. Firstly, it's my private sanctuary — when I'm there, I can shut out the noise and stress of daily life. The warm lighting and cozy atmosphere help me wind down and feel refreshed. On top of that, it's where I do things I truly enjoy. Whether it's getting lost in a novel or simply gazing out the window, those moments of quiet solitude recharge my energy like nothing else.",
  },
  {
    topic: 'Describe something that you cannot live without (not a computer/phone)',
    tag: '保留题',
    cueCard: 'Describe something that you cannot live without. You should say: what it is, what you do with it, how often you use it, and explain why you cannot live without it.',
    answer: "The thing I cannot live without is my glasses. I've been nearsighted since middle school, so I wear them every single day from the moment I wake up. I use them for everything — studying, reading, cooking, even just walking around safely. Two reasons make them truly essential. Firstly, they're literally my window to the world. Without them, everything becomes a blur, and I can't function normally. They give me independence and the ability to navigate daily life. On top of that, they've become part of my identity. People recognize me by my glasses, and I've grown fond of how they look on me. So beyond just vision correction, they're genuinely a part of who I am.",
  },
  {
    topic: 'Describe an item on which you spent more than expected',
    tag: '保留题',
    cueCard: 'Describe an item on which you spent more than expected. You should say: what it is, how much you spent on it, why you bought it, and explain why you think you spent more than expected.',
    answer: "I once bought a pair of wireless earphones that cost significantly more than I'd planned. They were around 800 yuan, which is pretty expensive for earphones. I bought them because my old wired ones broke, and I needed a replacement for my daily commute. Two reasons why it felt overpriced. Firstly, I was used to the normal price of earphones, which is around 200 yuan. So paying four times that amount hurt my budget quite a bit. On top of that, I later saw similar ones online for almost half the price. It made me realize I'd been impulsive and hadn't shopped around. So while the earphones are solid and work well, the whole experience taught me to do proper research before making purchases.",
  },
  {
    topic: 'Describe a foreign country you would like to stay or work for a short period',
    tag: '保留题',
    cueCard: 'Describe a foreign country you would like to stay or work for a short period. You should say: which country it is, where you got to know this country, what you will do there, and explain why you will stay or work there just for a short period.',
    answer: "I would love to stay in Japan for a short period. I first got to know the country through Japanese films and anime as a teenager, and later through learning about its fascinating blend of tradition and cutting-edge technology. If I went there, I'd like to do a language exchange program — teaching Chinese or English while improving my Japanese. Two reasons I'd like a short-term stay. Firstly, I want to genuinely broaden my horizons. Immersing myself in a completely different culture would be a thought-provoking and enriching experience. On top of that, a short period is practical. I have commitments at home, and a limited stay lets me experience the best of Japan without disrupting my long-term plans. It would be the perfect balance of adventure and practicality.",
  },
  {
    topic: 'Describe an occasion when many people were smiling',
    tag: '保留题',
    cueCard: 'Describe an occasion when many people were smiling. You should say: when it happened, who you were with, what happened, and explain why most people were smiling.',
    answer: "I want to talk about my graduation ceremony last year. I was with my classmates, teachers, and family members. When the ceremony ended, we all gathered on the lawn for photos — everyone was in high spirits, throwing their caps and hugging. Two reasons explain the joyful atmosphere. Firstly, it was the culmination of years of hard work. We had all been through countless exams, late-night study sessions, and stressful deadlines together. Finishing that journey brought a profound sense of accomplishment and relief. On top of that, it was a rare moment when everyone's families came together. Seeing parents beam with pride was genuinely heartwarming. So the smiles weren't just about finishing school — they were about shared struggle, achievement, and love all coming together in one moment.",
  },
  {
    topic: 'Describe a person who makes plans a lot',
    tag: '保留题',
    cueCard: 'Describe a person who makes plans a lot. You should say: who he/she is, how you knew him/her, what plans he/she makes, and explain how you feel about this person.',
    answer: "I want to talk about my friend Lisa. I met her in university — we were in the same study group. She's someone who plans everything meticulously, from weekly schedules to five-year career goals. I genuinely admire her. Firstly, her planning habit is incredibly effective. She never misses deadlines, always arrives on time, and somehow still has energy for social activities. Her organizational skills benefit everyone around her — our group projects are always smoother thanks to her. On top of that, I've learned a lot from her approach. She showed me that planning doesn't mean being rigid — it actually creates more freedom because you know exactly what needs to be done and when. So while some people might find her excessive, I see her as an inspiring example of how discipline leads to a less stressful life.",
  },
  {
    topic: 'Describe a person who is good at making people feel welcome',
    tag: '新题',
    cueCard: 'Describe a person who is good at making people feel welcome. You should say: who this person is, how you know him/her, how he/she makes people feel welcome, and explain how you feel about this person.',
    answer: "I want to talk about my aunt who runs a small bed-and-breakfast in my hometown. I've known her my whole life, of course, but I've also seen her interact with guests over the years. She greets everyone with a warm smile, remembers their names, and always has tea and snacks ready. Two things make her genuinely special. Firstly, her warmth is completely natural — it's not forced or professional. She treats every guest like a long-lost friend, and people immediately feel at ease around her. On top of that, she pays attention to small details. She remembers if a guest prefers a certain type of tea or needs an extra blanket. Those thoughtful gestures make people feel truly valued. I find her inspiring because she shows that making others feel welcome isn't about grand gestures — it's about genuine care and attention.",
  },
  {
    topic: 'Describe a difficult decision that had a positive outcome',
    tag: '新题',
    cueCard: 'Describe a difficult decision that had a positive outcome. You should say: what the decision was, why it was difficult, what happened as a result, and explain why the outcome was positive.',
    answer: "The difficult decision was choosing to study away from home for university. I'm quite close to my family, so leaving them was emotionally challenging. I was also worried about adjusting to a new city and making friends. The outcome was surprisingly positive. Firstly, the experience genuinely broadened my horizons. I became more independent — learning to manage my time, budget my expenses, and solve problems on my own. On top of that, I met people from diverse backgrounds who became lifelong friends. Living in a different city exposed me to new perspectives and opportunities I never would have encountered at home. So looking back, that tough decision turned out to be one of the most meaningful and enriching choices I've ever made.",
  },
  {
    topic: 'Describe a piece of technology that helps you save time',
    tag: '新题',
    cueCard: 'Describe a piece of technology (app or website) that helps you save time. You should say: what it is, how you use it, what you use it for, and explain how it helps you save time.',
    answer: "The technology I want to describe is a note-taking app called Notion. I discovered it through a classmate's recommendation last year. I use it to organize my study materials, track assignments, and manage my daily to-do list. Two things make it a genuine time-saver. Firstly, it consolidates everything in one place. Before, I had notes scattered across notebooks, phone memos, and sticky notes. Now, all my information is organized and searchable — I can find anything in seconds. On top of that, its template system is incredibly practical. I can set up a weekly planner once and reuse it indefinitely. What used to take me hours of organizing now takes minutes. So this app has transformed my productivity and freed up time for things I actually enjoy.",
  },
  {
    topic: 'Describe a time you gave someone advice',
    tag: '新题',
    cueCard: 'Describe a time you gave someone advice. You should say: who you gave the advice to, what the advice was about, what happened after you gave the advice, and explain how you felt about giving this advice.',
    answer: "I gave advice to my younger cousin who was struggling with choosing a university major. She was torn between studying something practical like accounting and following her passion for design. I suggested that she try the design path but keep some business electives as a backup. Two reasons I felt good about this. Firstly, I had been in her exact position a few years earlier, so my advice came from genuine experience rather than empty encouragement. She appreciated hearing from someone who understood her dilemma. On top of that, she ended up following my suggestion and is now thriving in her design program. Seeing her happy and fulfilled gives me a real sense of satisfaction, knowing I played a small part in her journey.",
  },
  {
    topic: 'Describe a time you learned something important',
    tag: '新题',
    cueCard: 'Describe a time when you learned something important. You should say: what you learned, when and where it happened, how you learned it, and explain why it was important.',
    answer: "I learned the importance of preparation during a crucial class presentation last semester. It was in our main lecture hall — I had to present a research project to about fifty students and two professors. I had prepared thoroughly — practicing multiple times, anticipating questions, and organizing my slides carefully. The importance hit me in two ways. Firstly, the presentation went remarkably smoothly. I felt confident and self-assured because I knew my material inside and out. The professors even complimented my delivery. On top of that, this experience changed my approach to everything. I used to rely on last-minute cramming, but now I understand that solid preparation reduces stress and dramatically improves results. It's a lesson I apply to every aspect of my life now.",
  },
  {
    topic: 'Describe a small but meaningful change you made in your daily routine',
    tag: '新题',
    cueCard: 'Describe a small but meaningful change you made in your daily routine. You should say: what the change was, why you decided to make this change, how you implemented it, and explain why this change was meaningful.',
    answer: "The change I made was waking up 30 minutes earlier to read before starting my day. I decided to do this because I realized I was spending too much time on my phone in the mornings and not enough time on things that genuinely enriched my life. I implemented it by setting my alarm earlier and keeping a book on my nightstand. The change was meaningful for two reasons. Firstly, those 30 minutes became the most peaceful part of my day. Reading in the quiet morning hours helps me stay sharp and sets a positive tone. On top of that, I've finished more books in the past few months than in the entire previous year. It's given me a sense of accomplishment that carries through the rest of my day. Such a tiny adjustment, but the impact has been substantial.",
  },
  {
    topic: 'Describe a goal you want to achieve in the next five years',
    tag: '新题',
    cueCard: 'Describe a goal you want to achieve in the next five years. You should say: what the goal is, why you set this goal, what you plan to do to achieve it, and explain how you will feel if you achieve this goal.',
    answer: "The goal I want to achieve is becoming fluent in Japanese. I set this goal because I'm fascinated by Japanese culture and hope to work there someday. To achieve it, I plan to take formal language classes, practice daily with language exchange apps, and ideally spend a summer in Japan for immersion. Two reasons this goal means so much to me. Firstly, it's not just about language — it's about opening doors. Being fluent would allow me to connect with people, understand media, and navigate daily life in Japan without barriers. On top of that, the journey itself is rewarding. Every new word I learn gives me a small sense of achievement. If I reach fluency in five years, I know I'll feel an incredible sense of pride and fulfillment.",
  },
]

// ============================================================
// Part 3: 40-60秒辩证结构
// ============================================================
export const part3Topics: Part3Topic[] = [
  {
    topic: 'Technology & Communication',
    relatedTo: 'Describe a piece of technology that helps you save time',
    questions: [
      {
        q: 'Do you think technology has changed the way people communicate?',
        a: "From my perspective, technology has fundamentally transformed communication. Though some argue it's made interactions more superficial — we send quick emojis instead of having meaningful conversations. But on the other hand, it tightens everyone around us up. I can video call my family anytime, even across continents. So all in all, I believe it's made communication more diverse and accessible.",
      },
      {
        q: 'What are the differences between online and face-to-face communication?',
        a: "There are various differences between the two. Online communication is convenient and practical, but it lacks the subtle cues — facial expressions, body language, tone of voice — that make face-to-face interaction so rich. However, for quick exchanges, online is undeniably more efficient. Each mode serves different purposes.",
      },
      {
        q: 'What negative effects does technology have on relationships?',
        a: "There are certainly some downsides. People can become too dependent on their devices, spending more time scrolling than talking to those around them. This can make relationships feel distant. However, I wouldn't say technology is inherently harmful — it's more about how we choose to use it.",
      },
    ],
  },
  {
    topic: 'Work & Career',
    relatedTo: 'Describe your perfect job',
    questions: [
      {
        q: 'What kind of job can be called a dream job?',
        a: "From my perspective, a dream job combines three elements: it aligns with your passions, utilizes your skills, and provides a sense of purpose. Though salary is a factor, it shouldn't be the main driver. The most fulfilling careers are those where you wake up genuinely looking forward to the day.",
      },
      {
        q: "Do people's ideal jobs change as they grow up?",
        a: "Without a doubt. As children, we're drawn to visible, exciting roles — firefighters, astronauts, pop stars. But as we mature, our priorities shift. Practical considerations like stability and work-life balance become essential. Our experiences also reveal what we're truly good at, which shapes our aspirations.",
      },
    ],
  },
  {
    topic: 'Education & Learning',
    relatedTo: 'Describe a time you learned something important',
    questions: [
      {
        q: 'What is more important — learning from books or from experience?',
        a: "Both are essential, but they serve different purposes. Books provide theoretical foundations and the accumulated wisdom of others. However, experience teaches lessons that books simply can't — like dealing with failure or handling unexpected situations. The ideal approach combines both.",
      },
      {
        q: 'Do you think children should learn practical skills at school?',
        a: "Absolutely. While academic knowledge is vital, practical skills like cooking, budgeting, and basic repairs are equally important. These are life skills that benefit people on a daily basis. Schools should strike a better balance between theory and real-world application.",
      },
    ],
  },
  {
    topic: 'Travel & Culture',
    relatedTo: 'Describe a memorable trip you took',
    questions: [
      {
        q: 'Why do people like to travel?',
        a: "There are numerous reasons. For many, travel broadens their horizons and exposes them to diverse cultures. It offers an escape from daily routine and a chance to unwind. On top of that, travel creates lasting memories — the experiences you have abroad often stay with you for a lifetime.",
      },
      {
        q: 'How has tourism changed in recent years?',
        a: "Tourism has changed dramatically. Social media has made destinations more visible — people now travel specifically for Instagram-worthy locations. On the other hand, there's been a shift towards more meaningful travel experiences rather than just sightseeing. Sustainability has also become a growing concern in the industry.",
      },
    ],
  },
  {
    topic: 'Helping Others',
    relatedTo: 'Describe a person who often helps others',
    questions: [
      {
        q: 'Why do some people choose to help others?',
        a: "From my perspective, there are various motivations. Some help others because it brings them a genuine sense of fulfillment. Others may be driven by personal values or religious beliefs. And sometimes it's simply about empathy — seeing someone struggle and wanting to ease their burden.",
      },
      {
        q: 'Should children be taught to help others?',
        a: "Absolutely. Teaching children to be considerate and helpful builds their character. It helps them develop empathy and understand that their actions affect others. However, it should be done naturally — forcing a child to help can backfire and create resentment.",
      },
    ],
  },
  {
    topic: 'Fame & Success',
    relatedTo: 'Describe a famous person you would like to meet',
    questions: [
      {
        q: 'What are the advantages and disadvantages of being famous?',
        a: "Being famous is a double-edged sword. On one hand, fame brings wealth, influence, and opportunities that most people can only dream of. On the other hand, the lack of privacy can be overwhelming — every move is scrutinized. Famous people also face tremendous pressure to maintain their image, which can be mentally exhausting.",
      },
      {
        q: 'Do people become famous because of talent or luck?',
        a: "It's usually a combination of both. Talent is essential — without it, fame is hollow and short-lived. However, luck and timing play a significant role too. Being in the right place at the right time can make all the difference. Hard work maximizes your chances, but it doesn't guarantee success.",
      },
    ],
  },
  {
    topic: 'Planning & Decisions',
    relatedTo: 'Describe a difficult decision that had a positive outcome',
    questions: [
      {
        q: "Do you think it's important to plan ahead?",
        a: "From my perspective, planning is incredibly important. It helps you stay organized and reduces unnecessary stress. However, I also believe in leaving room for flexibility. Life is unpredictable, and overly rigid plans can crumble when unexpected things happen.",
      },
      {
        q: "Should children make their own decisions?",
        a: "As for children, I think they should be given age-appropriate choices. Young children need guidance and boundaries, but as they grow older, they should gradually take more responsibility for their decisions. This helps build confidence and critical thinking skills.",
      },
    ],
  },
  {
    topic: 'Environment & Nature',
    relatedTo: 'Describe a memorable trip you took',
    questions: [
      {
        q: 'What can individuals do to protect the environment?',
        a: "There are numerous small changes that collectively make a big difference. Reducing plastic use, conserving energy, and choosing sustainable transportation are practical steps anyone can take. However, I believe the most powerful action is educating others — when awareness spreads, behavior changes.",
      },
      {
        q: 'Is it the government or individuals responsibility to protect nature?',
        a: "It's genuinely a shared responsibility. Governments have the power to implement large-scale policies and regulations. But without individual cooperation, those policies won't succeed. Every person has a role to play — from recycling at home to supporting environmentally conscious businesses.",
      },
    ],
  },
]
