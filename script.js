const firebaseConfig = {
  apiKey: "AIzaSyDG9zDcphqyTfXXZBWc0-uRV74eeie_tEE",
  authDomain: "new-seas.firebaseapp.com",
  projectId: "new-seas",
  storageBucket: "new-seas.firebasestorage.app",
  messagingSenderId: "551983006255",
  appId: "1:551983006255:web:29dae15ad04dabff7afcda"
};

let db = null;
let isFirebaseReady = false;

let isReadOnly = false;
let isSuperAdmin = false;
const ADMIN_PASSWORD = "Ben10";

let currentDocId = ''; 
document.getElementById('doc-id').value = currentDocId;

const ilhasFixas = {
  "East Blue": ["Base da Marinha G-03", "Clockwork", "Conomi", "Cozia", "Dawn", "Gecko", "Goat", "Ilha dos Animais Raros", "Ilha Navio de Guerra", "Ilha Shimotsuki", "Kumate", "Mirrorball", "Organ", "Oykot", "Polestar", "Tequila Wolf", "Yotsuba"],
  "West Blue": ["Ballywood", "Base da Marinha G-12", "God Valley", "Ilusia", "Kano", "Las Camp", "Ohara", "Soja", "Thriller Bark", "Toroa"],
  "North Blue": ["Base da Marinha G-11", "Deul", "Downs", "Flevance", "Kuen", "Lvneel", "Minion", "Notice", "Polo Norte", "Rakesh", "Rubeck", "Spider Miles", "Swallow", "Welbems", "Whiteland"],
  "South Blue": ["Base da Marinha G-10", "Baterilla", "Briss", "Centaurea", "Karate", "Kutsukku", "Reino Negro de Drum", "Roshwan", "Samba", "Samuwanai", "Sorbet", "Taya", "Torino", "Tumi", "Vespa"],
  "Paraíso": ["Baltigo", "Banaro", "Base da Marinha G-02", "Base da Marinha G-08", "Boin", "Cactus", "Corrente Tarai", "Base da Marinha G-01", "Enies Lobby", "Drum", "Foolshout", "Ilha Spa", "Jaya", "Skypiea", "Karakuri", "Kenzan", "Kuraigana", "Kyuka", "Little Garden", "Long Ring Long Land", "Lulusia", "Mary Geoise", "Merveille", "Momoiro", "Namakura", "Nanimonai", "Pucci", "Sabaody", "Ilha dos Homens-Peixe", "San Faldo", "Sandy", "Water 7"],
  "Novo Mundo": ["Applenine", "Green Bit", "Mystoria", "Prodence", "Whole Cake", "Yukiryu", "Base da Marinha G-09", "Base da Marinha G-13", "Base da Marinha G-14", "Base da Marinha G-15", "Dressrosa", "Egghead", "Punk Hazard", "Elbaf", "Foodvalten", "Hachinosu", "Raijin", "Risky Red", "Wano"],
  "Calm Belt": ["Amazon Lily", "Rusukaina", "Shitsurakujima", "Base da Marinha G-04", "Base da Marinha G-05", "Base da Marinha G-06", "Base da Marinha G-07", "Impel Down"],
  "Localização Desconhecida": ["Arkham Island", "Gran Tesoro", "Ilha do Sol", "Atlantis", "Zou"],
};

const akumasFixas = {
  "Paramecia": ["Awa Awa no Mi", "Baku Baku no Mi", "Bane Bane no Mi", "Bara Bara no Mi", "Bari Bari no Mi", "Bata Bata no Mi", "Beri Beri no Mi", "Beta Beta no Mi", "Bijo Bijo no Mi", "Bisu Bisu no Mi", "Bomu Bomu no Mi", "Buki Buki no Mi", "Buku Buku no Mi", "Chiyu Chiyu no Mi", "Choki Choki no Mi", "Deka Deka no Mi", "Dero Dero no Mi", "Doa Doa no Mi", "Doku Doku no Mi", "Doru Doru no Mi", "Fude Fude no Mi", "Fuku Fuku no Mi", "Fuwa Fuwa no Mi", "Gabu Gabu no Mi", "Gasha Gasha no Mi", "Gatsu Gatsu no Mi", "Genso Genso no Mi", "Giro Giro no Mi", "Gocha Gocha no Mi", "Goe Goe no Mi", "Gomu Gomu no Mi", "Goru Goru no Mi", "Gura Gura no Mi", "Guru Guru no Mi", "Gutsu Gutsu no Mi", "Hana Hana no Mi", "Hemo Hemo no Mi", "Hira Hira no Mi", "Hiso Hiso no Mi", "Hobi Hobi no Mi", "Hone Hone no Mi", "Horo Horo no Mi", "Horu Horu no Mi", "Hoya Hoya no Mi", "Iro Iro no Mi", "Ishi Ishi no Mi", "Ito Ito no Mi", "Jake Jake no Mi", "Jara Jara no Mi", "Jiki Jiki no Mi", "Juku Juku no Mi", "Kachi Kachi no Mi", "Kage Kage no Mi", "Kama Kama no Mi", "Kegawa Kegawa no Mi", "Kesshō Kesshō no Mi", "Kibi Kibi no Mi", "Kira Kira no Mi", "Kiro Kiro no Mi", "Kobu Kobu no Mi", "Kon Kon no Mi", "Koro Koro no Mi", "Kuku Kuku no Mi", "Kuri Kuri no Mi", "Kyubu Kyubu no Mi", "Maki Maki no Mi", "Mane Mane no Mi", "Masu Masu no Mi", "Mato Mato no Mi", "Memo Memo no Mi", "Mero Mero no Mi", "Mini Mini no Mi", "Mira Mira no Mi", "Moa Moa no Mi", "Modo Modo no Mi", "Mosa Mosa no Mi", "Muchi Muchi no Mi", "Nagi Nagi no Mi", "Nawa Nawa no Mi", "Nemu Nemu no Mi", "Netsu Netsu no Mi", "Nikyu Nikyu no Mi", "Noko Noko no Mi", "Noku Noku no Mi", "Nomi Nomi no Mi", "Nori Nori no Mi", "Noro Noro no Mi", "Nui Nui no Mi", "Nuke Nuke no Mi", "Ope Ope no Mi", "Ori Ori no Mi", "Oshi Oshi no Mi", "Oto Oto no Mi", "Pamu Pamu no Mi", "Pero Pero no Mi", "Peto Peto no Mi", "Poke Poke no Mi", "Rashin Rashin no Mi", "Riki Riki no Mi", "Sabi Sabi no Mi", "Shari Shari no Mi", "Shibo Shibo no Mi", "Shiku Shiku no Mi", "Shima Shima no Mi", "Shiro Shiro no Mi", "Soru Soru no Mi", "Sube Sube no Mi", "Sui Sui no Mi", "Suji Suji no Mi", "Suke Suke no Mi", "Supa Supa no Mi", "Toge Toge no Mi", "Toki Toki no Mi", "Ton Ton no Mi", "Toshi Toshi no Mi", "Tsutsu Tsutsu no Mi", "Uta Uta no Mi", "Wapu Wapu no Mi", "Wara Wara no Mi", "Woshu Woshu no Mi", "Yomi Yomi no Mi", "Zushi Zushi no Mi"],
  "Paramecia Especial": ["Karan Karan no Mi", "Mochi Mochi no Mi"],
  "Logia": ["Ame Ame no Mi", "Chikyū Chikyū no Mi", "Gasu Gasu no Mi", "Goro Goro no Mi", "Hie Hie no Mi", "Kaze Kaze no Mi", "Kumo Kumo no Mi", "Magu Magu no Mi", "Mera Mera no Mi", "Moku Moku no Mi", "Mori Mori no Mi", "Numa Numa no Mi", "Pasa Pasa no Mi", "Pika Pika no Mi", "Suna Suna no Mi", "Susu Susu no Mi", "Toro Toro no Mi", "Yami Yami no Mi", "Yuki Yuki no Mi"],
  "Zoan": ["Batto Batto no Mi", "Gama Gama no Mi", "Hebi Hebi no Mi, Modelo: Anaconda", "Hebi Hebi no Mi, Modelo: Cobra-Real", "Hito Hito no Mi", "Inu Inu no Mi, Modelo: Cão de Caça", "Inu Inu no Mi, Modelo: Cão-Guaxinim", "Inu Inu no Mi, Modelo: Chacal", "Inu Inu no Mi, Modelo: Dachshund", "Inu Inu no Mi, Modelo: Lobo", "Kame Kame no Mi", "Mogu Mogu no Mi", "Mushi Mushi no Mi, Modelo: Besouro-Rinoceronte", "Mushi Mushi no Mi, Modelo: Vespa-Mandarina", "Neko Neko no Mi, Modelo: Leão", "Neko Neko no Mi, Modelo: Leopardo", "Neko Neko no Mi, Modelo: Onça-Pintada", "Neko Neko no Mi, Modelo: Tigre-de-BengalaBengala", "Rako Rako no Mi", "Sara Sara no Mi, Modelo: Axolote", "Tama Tama no Mi", "Tori Tori no Mi, Modelo: Águia", "Tori Tori no Mi, Modelo: Albatroz", "Tori Tori no Mi, Modelo: Falcão", "Uma Uma no Mi", "Usagi Usagi no Mi", "Ushi Ushi no Mi, Modelo: Bisão", "Ushi Ushi no Mi, Modelo: Girafa", "Ushi Ushi no Mi, Modelo: Rinoceronte", "Zou Zou no Mi"],
  "Zoan Ancestral": ["Kumo Kumo no Mi, Modelo: Rosamygale grauvogeli", "Neko Neko no Mi, Modelo: Tigre-Dente-de-Sabre", "Ryū Ryū no Mi, Modelo: Alossauro", "Ryū Ryū no Mi, Modelo: Braquiossauro", "Ryū Ryū no Mi, Modelo: Espinossauro", "Ryū Ryū no Mi, Modelo: Paquicefalossauro", "Ryū Ryū no Mi, Modelo: Pteranodonte", "Ryū Ryū no Mi, Modelo: Triceratops", "Zou Zou no Mi, Modelo: Mamute"],
  "Zoan Mítica": ["Batto Batto no Mi, Modelo: Vampiro", "Hebi Hebi no Mi, Modelo: Kaijū", "Hebi Hebi no Mi, Modelo: Yamata no Orochi", "Hito Hito no Mi, Modelo: Daibutsu", "Hito Hito no Mi, Modelo: O Anfitrião", "Hito Hito no Mi, Modelo: Ōnyūdō", "Inu Inu no Mi, Modelo: Bake-Danuki", "Inu Inu no Mi, Modelo: Cérbero", "Inu Inu no Mi, Modelo: Ōkuchi no Makami", "Inu Inu no Mi, Modelo: Raposa de Nove Caudas", "Ryū Ryū no Mi, Modelo: Dragão Ocidental", "Ryū Ryū no Mi, Modelo: Kirin", "Tori Tori no Mi, Modelo: Fênix", "Tori Tori no Mi, Modelo: Nue", "Tori Tori no Mi, Modelo: Pássaro de Cinzas", "Tori Tori no Mi, Modelo: Pássaro de Gelo", "Tori Tori no Mi, Modelo: Thunderbird", "Uma Uma no Mi, Modelo: Pégaso", "Uo Uo no Mi, Modelo: Carpa Seiryū"],
};

const shipData = { "Bote": {hp: 3, gender: "m"}, "Barco Pesqueiro": {hp: 5, gender: "m"}, "Escuna": {hp: 7, gender: "f"}, "Brigue": {hp: 8, gender: "m"}, "Caravela": {hp: 9, gender: "f"}, "Fragata": {hp: 10, gender: "f"}, "Gran General": {hp: 12, gender: "m"}, "C-15 Kenpachi": {hp: 5, gender: "m"}, "Z-10 Perci": {hp: 7, gender: "m"}, "B-47 Hajime": {hp: 10, gender: "m"}, "T-33 Apollo": {hp: 10, gender: "m"}, "K-55 Mereoleona": {hp: 15, gender: "m"}, "A-1 Atlas": {hp: 20, gender: "m"}, "5-01 Sparkle": {hp: 7, gender: "m"}, "4-01 Dream": {hp: 10, gender: "m"}, "3-01 Scream": {hp: 10, gender: "m"}, "2-01 Liberty": {hp: 15, gender: "m"}, "1-01 Hope": {hp: 20, gender: "m"}, "Pérola Negra": {hp: null, gender: "m"}, "Holandês Voador": {hp: null, gender: "m"}, "Vingança da Rainha Ana": {hp: null, gender: "f"}, "Silent Mary": {hp: null, gender: "f"}, "Pequod": {hp: null, gender: "m"} };
const baseClassesList = ["Arqueólogo", "Artista", "Atirador", "Carpinteiro", "Cientista", "Combatente", "Cozinheiro", "Ferreiro", "Inventor", "Médico", "Musicista", "Navegador"];
const racas = { "Braços Longos":{f:.30,r:.15}, "Bucaneiro":{f:.35,r:.40}, "Gigante":{f:.40,r:.35,v:-.05}, "Humano":{}, "Kuja":{}, "Kumate":{d:.30,f:.15}, "Lunariano":{v:.45,r:.50}, "Meio-Gigante":{f:.25,r:.25}, "Mink":{v:.20,r:.15}, "Oni":{f:.40,r:.40}, "Pernas Longas":{v:.30,f:.15}, "Povo do Céu: Birkan":{d:.25,v:.25}, "Povo do Céu: Shandia":{d:.25,v:.25}, "Povo do Céu: Skypieano":{d:.25,v:.25}, "Sereiano":{d:.25,r:.15}, "Tontatta":{v:.25,f:.20}, "Três-Olhos":{v:.15,r:.15,d:.15}, "Tritão":{f:.25,r:.25}, "Wotan":{f:.30,r:.25} };
const linhagens = { "Nenhuma":{}, "Augur":{d:.15,v:.15,req:["Humano"]}, "Barnum":{req:["Braços Longos","Pernas Longas","Kumate","Três-Olhos"]}, "Beckman":{d:.15,v:.15,ho:.15,req:["Humano"]}, "Boa":{f:.15,ha:.15,req:["Kuja"]}, "Capone":{d:.10,v:.10,req:["Humano"]}, "Charlotte":{charlotte:true}, "Chinjao":{f:.20,r:.10,req:["Humano"]}, "D.":{}, "Dracule":{d:.20,ho:.15,req:["Humano"]}, "Drole":{f:.10,r:.05,v:.10,ha:.10,req:["Gigante","Meio-Gigante","Wotan"]}, "Família do Sol":{f:.10,r:.10,req:["Tritão","Sereiano","Wotan"]}, "Gan":{esp:.10,req:["Povo do Céu: Birkan","Povo do Céu: Shandia","Povo do Céu: Skypieano"]}, "Kong":{req:["Humano"]}, "Kozuki":{d:.15,v:.15,esp:.10,req:["Humano"]}, "Kurozumi":{d:.10,v:.10,req:["Humano"]}, "Laufey":{f:.15,r:.15,v:-.05,req:["Gigante"]}, "Mokomo":{v:.15,req:["Mink"]}, "Nefertari":{d:.15,v:.15,req:["Humano"]}, "Neptune":{d:.15,req:["Sereiano"]}, "Newgate":{r:.20,f:.20,req:["Humano","Meio-Gigante"]}, "Nico":{req:["Humano"]}, "Sakazuki":{f:.25,r:.20,req:["Humano"]}, "Silvers":{esp:.20,req:["Humano"]}, "Tenryūbito: Família Donquixote":{d:.10,ami:.15,req:["Humano"]}, "Tenryūbito: Família Figarland":{d:.10,esp:.15,req:["Humano"]}, "Tom":{f:.10,r:.10,req:["Tritão"]}, "Vega":{v:.10,d:.05,req:["Humano"]} };

const habilidadesExclusivasDict = {
    "Arte da Esgrima": "+10% em Destreza quando tiver 5.000 pontos (15% aos 10k, 20% aos 15k). A partir dos 5.000 pontos: -20% de gasto de Estamina.",
    "Batedor de Carteiras": "+15% em Destreza quando tiver 5.000 pontos (20% aos 10k, 25% aos 15k).",
    "Caminho do Atirador": "+5% em Destreza quando tiver 5.000 pontos (10% aos 10k, 15% aos 15k). +10% em Destreza ao atirar com armas de fogo (15% aos 10k, 20% aos 15k).",
    "Constituição Única": "+10% de Força e +15% de Resistência.",
    "Contração Muscular": "+10% de Força e Resistência quando tiver 5.000 pontos (20% aos 10k).",
    "Espírito Contagiante": "Aos 5k: Aliados e Usuário +5% Atributos, -10% Estamina. Aos 10k: +10% Atributos, Usuário +10% Resistência. Aos 15k: +15% Atributos, Usuário +10% Redução de Dano.",
    "Favoritismo Armista": "Aos 10.000: Ao empunhar criações: +10% R e V, e F ou D. Aos 15.000: Bônus massivos de R, V, Dano e Redução de Dano.",
    "Filho do Mar": "+5% em Reflexo e Resistência aos 5.000 (10% aos 10k, 15% aos 15k).",
    "Flexibilidade": "+10% em Velocidade aos 5.000 (20% aos 10k).",
    "Fúria Ardente": "+5% em Força ou Destreza aos 5.000 (10% aos 10k, 15% aos 15k).",
    "Golpe de Retorno": "Reflete a dor/dano para o oponente (3x/dia). 1º uso: Normal. 2º uso: -10% de Resistência. 3º uso: -20% de Resistência.",
    "O Escolhido": "+5% em todos os tipos de Haki aos 5.000 (10% aos 10k, 15% aos 20k).",
    "Pensamento Acelerado": "+20% em Reflexo aos 5.000 (25% aos 10k).",
    "Último Recurso": "Habilidade oculta.",
    "Vontade Inabalável": "Habilidade oculta.",
    "Treinamento de Cavaleiro": "Habilidade oculta.",
    "QI Avançado": "O gasto de estamina é reduzido em 50%. Caso dure mais de 3 turnos, Reflexos aumentados em 5%."
};

const linhagemHabilidades = {
    "Dracule": ["Arte da Esgrima"], "Capone": ["Batedor de Carteiras"], "Augur": ["Caminho do Atirador"], "Drole": ["Constituição Única"], "Laufey": ["Constituição Única", "Vontade Inabalável"], "Mokomo": ["Vontade Inabalável"], "Newgate": ["Contração Muscular", "Espírito Contagiante"], "Kozuki": ["Favoritismo Armista"], "Neptune": ["Filho do Mar", "Flexibilidade"], "Boa": ["Flexibilidade"], "Sakazuki": ["Fúria Ardente"], "Silvers": ["O Escolhido", "Pensamento Acelerado"], "D.": ["Espírito Contagiante", "Vontade Inabalável"], "Gan": ["Treinamento de Cavaleiro"], "Beckman": ["QI Avançado"], "Família do Sol": ["Filho do Mar"]
};

const allStyles = ["Nenhum", "Armadilha de Cores", "Arsenal", "Arte do Tempo", "Artista Marcial", "Atirador", "Black Cat", "Boujutsu", "Boxe", "Combate Gigante", "Combate Tontatta", "Cortes Precisos", "Electro", "Escultura de Forma", "Fencing", "Freestyle", "Fúria das Marés", "Galaxy Combat", "Hasshoken", "Impacto Estrutural", "Instinto Animal", "Jao Kun Dō", "Karatê Homem-Peixe", "Kitsunebi-ryū", "Kozuki-Nitōryū", "Kung Fu", "Melodia Impactante", "Mutōryū", "Ninjutsu", "Okama Kenpō", "Paladino", "Perna Negra", "Punchstyle", "Punho Suave", "Ranger", "Rokushiki", "Rope Action", "Ryūsōken", "Seimei Kikan", "Sinfonia Ilusória", "Stinstyle", "Sumô", "Swordstyle", "Tōryū", "Yaristyle"];
const classStyles = {"Arqueólogo":["Instinto Animal"],"Artista":["Armadilha de Cores","Escultura de Forma"],"Atirador":["Atirador"],"Carpinteiro":["Impacto Estrutural","Rope Action"],"Cientista":["Punho Suave"],"Combatente":["Freestyle"],"Cozinheiro":["Cortes Precisos","Perna Negra"],"Ferreiro":["Impacto Estrutural","Rope Action"],"Inventor":["Impacto Estrutural","Rope Action"],"Médico":["Punho Suave"],"Musicista":["Melodia Impactante","Sinfonia Ilusória"],"Navegador":["Arte do Tempo","Fúria das Marés"]};

const patenteGender = {
  "Aprendiz": {m: "Aprendiz", f: "Aprendiz"},
  "Recruta": {m: "Recruta", f: "Recruta"},
  "Cabo": {m: "Cabo", f: "Cabo"},
  "Sargento": {m: "Sargento", f: "Sargento"},
  "Tenente": {m: "Tenente", f: "Tenente"},
  "Comandante": {m: "Comandante", f: "Comandante"},
  "Capitão": {m: "Capitão", f: "Capitã"},
  "Comodoro": {m: "Comodoro", f: "Comodoro"},
  "Contra-Almirante": {m: "Contra-Almirante", f: "Contra-Almirante"},
  "Vice-Almirante": {m: "Vice-Almirante", f: "Vice-Almirante"},
  "Almirante": {m: "Almirante", f: "Almirante"},
  "Almirante-de-Frota": {m: "Almirante-de-Frota", f: "Almirante-de-Frota"},
  "Agente Judicial": {m: "Agente Judicial", f: "Agente Judicial"},
  "CP-1": {m: "CP-1", f: "CP-1"},
  "CP-2": {m: "CP-2", f: "CP-2"},
  "CP-3": {m: "CP-3", f: "CP-3"},
  "CP-4": {m: "CP-4", f: "CP-4"},
  "CP-5": {m: "CP-5", f: "CP-5"},
  "CP-6": {m: "CP-6", f: "CP-6"},
  "CP-7": {m: "CP-7", f: "CP-7"},
  "CP-8": {m: "CP-8", f: "CP-8"},
  "CP-9": {m: "CP-9", f: "CP-9"},
  "CP-0": {m: "CP-0", f: "CP-0"},
  "Gorosei": {m: "Gorosei", f: "Gorosei"},
  "Líder do Governo": {m: "Líder do Governo", f: "Líder do Governo"},
  "Iniciado": {m: "Iniciado", f: "Iniciada"},
  "Operador": {m: "Operador", f: "Operadora"},
  "Infiltrador": {m: "Infiltrador", f: "Infiltradora"},
  "Soldado Revolucionário": {m: "Soldado Revolucionário", f: "Soldada Revolucionária"},
  "Coordenador De Operações": {m: "Coordenador de Operações", f: "Coordenadora de Operações"},
  "Esquadrão de Combate": {m: "Esquadrão de Combate", f: "Esquadrão de Combate"},
  "Esquadrão de Operações": {m: "Esquadrão de Operações", f: "Esquadrão de Operações"},
  "Esquadrão de Inteligência": {m: "Esquadrão de Inteligência", f: "Esquadrão de Inteligência"},
  "Esquadrão de Defesa": {m: "Esquadrão de Defesa", f: "Esquadrão de Defesa"},
  "Comandante Tático de Combate": {m: "Comandante Tático de Combate", f: "Comandante Tática de Combate"},
  "Comandante Tático de Operações": {m: "Comandante Tático de Operações", f: "Comandante Tática de Operações"},
  "Comandante Tático de Inteligência": {m: "Comandante Tático de Inteligência", f: "Comandante Tática de Inteligência"},
  "Comandante Tático de Defesa": {m: "Comandante Tático de Defesa", f: "Comandante Tática de Defesa"},
  "Capitão Tático de Combate": {m: "Capitão Tático de Combate", f: "Capitã Tática de Combate"},
  "Capitão Tático de Operações": {m: "Capitão Tático de Operações", f: "Capitã Tática de Operações"},
  "Capitão Tático de Inteligência": {m: "Capitão Tático de Inteligência", f: "Capitã Tática de Inteligência"},
  "Capitão Tático de Defesa": {m: "Capitão Tático de Defesa", f: "Capitã Tática de Defesa"},
  "Pilar": {m: "Pilar", f: "Pilar"},
  "Vice-Líder": {m: "Vice-Líder", f: "Vice-Líder"},
  "Eixo": {m: "Eixo", f: "Eixo"}
};

const baseClassGender = {
  "Arqueólogo": {m: "Arqueólogo", f: "Arqueóloga"},
  "Artista": {m: "Artista", f: "Artista"},
  "Atirador": {m: "Atirador", f: "Atiradora"},
  "Carpinteiro": {m: "Carpinteiro", f: "Carpinteira"},
  "Cientista": {m: "Cientista", f: "Cientista"},
  "Combatente": {m: "Combatente", f: "Combatente"},
  "Cozinheiro": {m: "Cozinheiro", f: "Cozinheira"},
  "Ferreiro": {m: "Ferreiro", f: "Ferreira"},
  "Inventor": {m: "Inventor", f: "Inventora"},
  "Médico": {m: "Médico", f: "Médica"},
  "Musicista": {m: "Musicista", f: "Musicista"},
  "Navegador": {m: "Navegador", f: "Navegadora"}
};

const classTitles = {
  "Arqueólogo": [{m:"Aprendiz de Arqueologia",f:"Aprendiz de Arqueologia"},{m:"Historiador",f:"Historiadora"},{m:"Mestre de Artefatos",f:"Mestra de Artefatos"},{m:"Dominante da História",f:"Dominante da História"},{m:"Guru",f:"Guru"}],
  "Artista": [{m:"Ilustrador",f:"Ilustradora"},{m:"Empresário",f:"Empresária"},{m:"Estilista de Mil Faces",f:"Estilista de Mil Faces"},{m:"Escultor de Símbolos",f:"Escultora de Símbolos"},{m:"Patrono do Mundo",f:"Patrona do Mundo"}],
  "Atirador": [{m:"Atirador Iniciante",f:"Atiradora Iniciante"},{m:"Atirador de Precisão",f:"Atiradora de Precisão"},{m:"Atirador de Elite",f:"Atiradora de Elite"},{m:"Criador Bélico",f:"Criadora Bélica"},{m:"Rambo",f:"Rambo"}],
  "Carpinteiro": [{m:"Aprendiz da Madeira",f:"Aprendiz da Madeira"},{m:"Construtor de Bordo",f:"Construtora de Bordo"},{m:"Engenheiro Naval",f:"Engenheira Naval"},{m:"Mestre da Madeira",f:"Mestra da Madeira"},{m:"Irmão à Obra",f:"Irmã à Obra"}],
  "Cientista": [{m:"Estudioso",f:"Estudiosa"},{m:"Biólogo",f:"Bióloga"},{m:"Bioengenheiro",f:"Bioengenheira"},{m:"Alquimista",f:"Alquimista"},{m:"Gênio Científico",f:"Gênia Científica"}],
  "Combatente": [{m:"Discípulo do Punho",f:"Discípula do Punho"},{m:"Guerreiro de Aço",f:"Guerreira de Aço"},{m:"Mestre da Guerra",f:"Mestra da Guerra"},{m:"Doutrinador Marcial",f:"Doutrinadora Marcial"},{m:"Colosso Implacável",f:"Colosso Implacável"}],
  "Cozinheiro": [{m:"Garçom",f:"Garçonete"},{m:"Especialista Culinário",f:"Especialista Culinária"},{m:"Nutricionista",f:"Nutricionista"},{m:"Chef",f:"Chef"},{m:"Mestre do Paladar",f:"Mestra do Paladar"}],
  "Ferreiro": [{m:"Artesão",f:"Artesã"},{m:"Forjador de Imperfeições",f:"Forjadora de Imperfeições"},{m:"Forjador de Lendas Menores",f:"Forjadora de Lendas Menores"},{m:"Mestre das Lâminas",f:"Mestra das Lâminas"},{m:"Forjador Supremo",f:"Forjadora Suprema"}],
  "Inventor": [{m:"Improvisador",f:"Improvisadora"},{m:"Mecânico",f:"Mecânica"},{m:"Arquitetônico",f:"Arquitetônica"},{m:"Condutor",f:"Condutora"},{m:"Artífice",f:"Artífice"}],
  "Médico": [{m:"Clínico de Campo",f:"Clínica de Campo"},{m:"Cirurgião",f:"Cirurgiã"},{m:"Biomédico Avançado",f:"Biomédica Avançada"},{m:"Mestre da Vida",f:"Mestra da Vida"},{m:"Apóstolo da Cura",f:"Apóstola da Cura"}],
  "Musicista": [{m:"Sonante",f:"Sonante"},{m:"Celebridade Local",f:"Celebridade Local"},{m:"Pop Star",f:"Pop Star"},{m:"Ídolo Mundial",f:"Ídolo Mundial"},{m:"Imperador Sonoro",f:"Imperatriz Sonora"}],
  "Navegador": [{m:"Marujo",f:"Maruja"},{m:"Cartógrafo",f:"Cartógrafa"},{m:"Timoneiro",f:"Timoneira"},{m:"Capitão dos Ventos",f:"Capitã dos Ventos"},{m:"Semipeixe",f:"Semipeixe"}]
};

const salarios = {"Aprendiz":0,"Recruta":10000000,"Cabo":20000000,"Sargento":30000000,"Tenente":40000000,"Comandante":50000000,"Capitão":60000000,"Comodoro":80000000,"Contra-Almirante":90000000,"Vice-Almirante":100000000,"Almirante":150000000,"Almirante-de-Frota":200000000,"Agente Judicial":10000000,"CP-1":20000000,"CP-2":30000000,"CP-3":40000000,"CP-4":50000000,"CP-5":60000000,"CP-6":70000000,"CP-7":80000000,"CP-8":100000000,"CP-9":150000000,"CP-0":200000000,"Gorosei":500000000,"Líder do Governo":0,"Iniciado":5000000,"Operador":10000000,"Infiltrador":20000000,"Soldado Revolucionário":30000000,"Coordenador De Operações":50000000,"Esquadrão de Combate":60000000,"Esquadrão de Operações":60000000,"Esquadrão de Inteligência":60000000,"Esquadrão de Defesa":60000000,"Comandante Tático de Combate":80000000,"Comandante Tático de Operações":80000000,"Comandante Tático de Inteligência":80000000,"Comandante Tático de Defesa":80000000,"Comandante Tática de Combate":80000000,"Comandante Tática de Operações":80000000,"Comandante Tática de Inteligência":80000000,"Comandante Tática de Defesa":80000000,"Capitão Tático de Combate":100000000,"Capitão Tático de Operações":100000000,"Capitão Tático de Inteligência":100000000,"Capitão Tático de Defesa":100000000,"Capitã Tática de Combate":100000000,"Capitã Tática de Operações":100000000,"Capitã Tática de Inteligência":100000000,"Capitã Tática de Defesa":100000000,"Pilar":150000000,"Vice-Líder":175000000,"Eixo":200000000};

let charData = {
  password: "",
  pcs: [],
  layoutMode: "vertical"
};
let activePcIndex = 0;
let activeNpcIndex = -1;
let currentChar = null;

function createEmptyChar(isNPC) {
    return {
        isNPC: isNPC,
        name: "",
        info: {},
        tecnicasList: [],
        logList: [],
        stats: { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 },
        substats: { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0 }
    };
}

function switchChar(pIdx, nIdx) {
    activePcIndex = pIdx;
    activeNpcIndex = nIdx;
    currentChar = nIdx === -1 ? charData.pcs[pIdx].pc : charData.pcs[pIdx].npcs[nIdx];
    renderTabs();
    updateUI();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    toggleEditability();
}

function addPC() {
    charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
    saveData();
    switchChar(charData.pcs.length - 1, -1);
}

function addNPC(pIdx) {
    charData.pcs[pIdx].npcs.push(createEmptyChar(true));
    saveData();
    switchChar(pIdx, charData.pcs[pIdx].npcs.length - 1);
}

function renderTabs() {
    const container = document.getElementById('char-tabs-container');
    let html = '';
    charData.pcs.forEach((pcObj, pIdx) => {
        html += `<div class="char-row">`;
        let pcName = pcObj.pc.name.trim() === "" ? `Personagem ${pIdx + 1}` : pcObj.pc.name;
        let pcActive = (pIdx === activePcIndex && activeNpcIndex === -1) ? 'active' : '';
        html += `<button class="btn-tab ${pcActive}" draggable="true" ondragstart="dragStart(event, ${pIdx}, -1)" ondragend="dragEnd(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondragover="allowDrop(event)" ondrop="dropOnTab(event, ${pIdx}, -1)" onclick="switchChar(${pIdx}, -1)">${pcName}</button>`;
        
        pcObj.npcs.forEach((npc, nIdx) => {
            let npcName = npc.name.trim() === "" ? `NPC ${nIdx + 1}` : npc.name;
            let npcActive = (pIdx === activePcIndex && nIdx === activeNpcIndex) ? 'active' : '';
            html += `<button class="btn-tab npc-tab ${npcActive}" draggable="true" ondragstart="dragStart(event, ${pIdx}, ${nIdx})" ondragend="dragEnd(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondragover="allowDrop(event)" ondrop="dropOnTab(event, ${pIdx}, ${nIdx})" onclick="switchChar(${pIdx}, ${nIdx})">${npcName}</button>`;
        });
        html += `<button class="btn-add" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondragover="allowDrop(event)" ondrop="dropOnAddNpc(event, ${pIdx})" onclick="addNPC(${pIdx})" title="Adicionar NPC">+ NPC</button>`;
        html += `</div>`;
    });
    html += `<div style="display: flex; gap: 10px; margin-top: 5px; flex-wrap: wrap;">
                <button class="btn-add btn-add-pc" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondragover="allowDrop(event)" ondrop="dropOnAddPc(event)" onclick="addPC()">+ Personagem</button>
                <button class="btn-add btn-add-pc" style="border-color: var(--danger); color: var(--danger);" onclick="deleteCurrentChar()">🗑️ Apagar Selecionado</button>
                <button class="btn-add btn-add-pc" style="border-color: var(--warning); color: var(--warning);" onclick="travarFichaCombate()" title="Duplica o personagem e seus NPCs com os status congelados no momento">⚔️ Travar Combate</button>
             </div>`;
    container.innerHTML = html;
}

async function deleteCurrentChar() {
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Não é possível apagar.");
        return;
    }

    if (charData.password && charData.password.trim() !== "") {
        let pwd = await customPrompt("Digite a senha da ficha para confirmar a exclusão:");
        if (pwd !== charData.password && pwd !== ADMIN_PASSWORD && pwd !== "Ben10000") {
            if (pwd !== null) await customAlert("Senha incorreta! Exclusão cancelada.");
            return;
        }
    } else {
        let pwd = await customPrompt("A ficha não tem senha. Digite 'SIM' para confirmar a exclusão:");
        if (pwd !== "SIM" && pwd !== "sim") {
            return;
        }
    }

    if (activeNpcIndex !== -1) {
        charData.pcs[activePcIndex].npcs.splice(activeNpcIndex, 1);
        activeNpcIndex = -1;
    } else {
        charData.pcs.splice(activePcIndex, 1);
        if (charData.pcs.length === 0) {
            charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
        }
        activePcIndex = 0;
        activeNpcIndex = -1;
    }

    currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
    saveData();
    renderTabs();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    updateUI();
    toggleEditability();
    await customAlert("Apagado com sucesso!");
}

async function travarFichaCombate() {
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Não é possível travar a ficha.");
        return;
    }

    let conf = await customPrompt("Deseja criar uma cópia de sua ficha para usar no combate enquanto a ficha original continua evoluindo? Digite 'SIM' para confirmar:");
    if (conf !== "SIM" && conf !== "sim" && conf !== "Sim") {
        return;
    }

    let currentPcObj = charData.pcs[activePcIndex];
    
    let clonedPcObj = JSON.parse(JSON.stringify(currentPcObj));
    
    let baseName = (clonedPcObj.pc.name || `Personagem ${activePcIndex + 1}`).trim();
    clonedPcObj.pc.name = baseName + " [COMBATE]";
    
    if (clonedPcObj.npcs && clonedPcObj.npcs.length > 0) {
        clonedPcObj.npcs.forEach((npc, nIdx) => {
            let npcBaseName = (npc.name || `NPC ${nIdx + 1}`).trim();
            npc.name = npcBaseName + " [COMBATE]";
        });
    }

    charData.pcs.push(clonedPcObj);
    
    activePcIndex = charData.pcs.length - 1;
    activeNpcIndex = -1;
    currentChar = charData.pcs[activePcIndex].pc;
    
    saveData();
    renderTabs();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    updateUI();
    toggleEditability();
    
    await customAlert("Ficha travada com sucesso! A aba de combate congelada foi criada e selecionada.");
}

window.dragStart = function(event, pIdx, nIdx) {
    if(isReadOnly) { event.preventDefault(); return; }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("pIdx", pIdx);
    event.dataTransfer.setData("nIdx", nIdx);
    setTimeout(() => event.target.classList.add('dragging'), 0);
};

window.dragEnd = function(event) {
    event.target.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
};

window.dragEnter = function(event) {
    event.preventDefault();
    let t = event.target;
    if (t.tagName === 'BUTTON' && (t.classList.contains('btn-tab') || t.classList.contains('btn-add'))) {
        t.classList.add('drag-over');
    }
};

window.dragLeave = function(event) {
    let t = event.target;
    if (t.tagName === 'BUTTON' && (t.classList.contains('btn-tab') || t.classList.contains('btn-add'))) {
        t.classList.remove('drag-over');
    }
};

window.allowDrop = function(event) {
    event.preventDefault();
};

window.dropOnTab = function(event, targetPIdx, targetNIdx) {
    event.preventDefault(); event.stopPropagation(); if(isReadOnly) return;
    let sP = parseInt(event.dataTransfer.getData("pIdx")); let sN = parseInt(event.dataTransfer.getData("nIdx"));
    if (isNaN(sP) || isNaN(sN)) return;
    if (sP === targetPIdx && sN === targetNIdx) return;

    if (sN === -1 && targetNIdx === -1) {
        let rowToMove = charData.pcs.splice(sP, 1)[0];
        let insertIdx = targetPIdx; if (sP < targetPIdx) insertIdx--; 
        charData.pcs.splice(insertIdx, 0, rowToMove);
        activePcIndex = insertIdx; activeNpcIndex = -1; saveAndRenderDrag(); return;
    }

    let charToMove; let rowWasRemoved = false;
    if (sN === -1) {
        charToMove = charData.pcs[sP].pc;
        if (charData.pcs[sP].npcs.length === 0) { charData.pcs.splice(sP, 1); rowWasRemoved = true; } 
        else { let firstNpc = charData.pcs[sP].npcs.shift(); firstNpc.isNPC = false; charData.pcs[sP].pc = firstNpc; }
    } else { charToMove = charData.pcs[sP].npcs.splice(sN, 1)[0]; }

    if (rowWasRemoved && sP < targetPIdx) targetPIdx--;

    if (targetNIdx === -1) {
        charToMove.isNPC = false;
        charData.pcs.splice(targetPIdx, 0, { pc: charToMove, npcs: [] });
        activePcIndex = targetPIdx; activeNpcIndex = -1;
    } else {
        if (sP === targetPIdx && sN !== -1 && sN < targetNIdx && !rowWasRemoved) targetNIdx--;
        charToMove.isNPC = true;
        charData.pcs[targetPIdx].npcs.splice(targetNIdx, 0, charToMove);
        activePcIndex = targetPIdx; activeNpcIndex = targetNIdx;
    }
    if (charData.pcs.length === 0) { charData.pcs.push({ pc: createEmptyChar(false), npcs: [] }); activePcIndex = 0; activeNpcIndex = -1; }
    saveAndRenderDrag();
};

window.dropOnAddNpc = function(event, targetPIdx) {
    event.preventDefault(); event.stopPropagation(); if(isReadOnly) return;
    let sP = parseInt(event.dataTransfer.getData("pIdx")); let sN = parseInt(event.dataTransfer.getData("nIdx"));
    if (isNaN(sP) || isNaN(sN)) return;

    let charToMove; let rowWasRemoved = false;
    if (sN === -1) {
        charToMove = charData.pcs[sP].pc;
        if (charData.pcs[sP].npcs.length === 0) { charData.pcs.splice(sP, 1); rowWasRemoved = true; } 
        else { let firstNpc = charData.pcs[sP].npcs.shift(); firstNpc.isNPC = false; charData.pcs[sP].pc = firstNpc; }
    } else { charToMove = charData.pcs[sP].npcs.splice(sN, 1)[0]; }

    if (rowWasRemoved && sP < targetPIdx) targetPIdx--;

    charToMove.isNPC = true;
    charData.pcs[targetPIdx].npcs.push(charToMove);
    activePcIndex = targetPIdx; activeNpcIndex = charData.pcs[targetPIdx].npcs.length - 1;
    if (charData.pcs.length === 0) { charData.pcs.push({ pc: createEmptyChar(false), npcs: [] }); activePcIndex = 0; activeNpcIndex = -1; }
    saveAndRenderDrag();
};

window.dropOnAddPc = function(event) {
    event.preventDefault(); event.stopPropagation(); if(isReadOnly) return;
    let sP = parseInt(event.dataTransfer.getData("pIdx")); let sN = parseInt(event.dataTransfer.getData("nIdx"));
    if (isNaN(sP) || isNaN(sN)) return;

    if (sN === -1) {
        let rowToMove = charData.pcs.splice(sP, 1)[0];
        charData.pcs.push(rowToMove);
        activePcIndex = charData.pcs.length - 1; activeNpcIndex = -1;
    } else {
        let charToMove = charData.pcs[sP].npcs.splice(sN, 1)[0];
        charToMove.isNPC = false;
        charData.pcs.push({ pc: charToMove, npcs: [] });
        activePcIndex = charData.pcs.length - 1; activeNpcIndex = -1;
    }
    if (charData.pcs.length === 0) { charData.pcs.push({ pc: createEmptyChar(false), npcs: [] }); activePcIndex = 0; activeNpcIndex = -1; }
    saveAndRenderDrag();
};

function saveAndRenderDrag() {
    currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
    saveData(); renderTabs(); renderTecnicas(); renderNpcsComuns(); renderNpcsEspeciais(); renderLogs(); updateUI(); toggleEditability();
}

function getClassDisplayName(baseClassWithLevel, sexo) {
    if (!baseClassWithLevel) return "";
    let match = baseClassWithLevel.match(/(.+) (\d+)/);
    if (!match) return baseClassWithLevel; 
    let baseClass = match[1];
    let lvl = parseInt(match[2]);
    let gender = (sexo === 'Feminino') ? 'f' : 'm';
    
    let cName = baseClassGender[baseClass] ? baseClassGender[baseClass][gender] : baseClass;
    let cTitle = "";
    if (classTitles[baseClass] && classTitles[baseClass][lvl - 1]) {
        cTitle = classTitles[baseClass][lvl - 1][gender];
    } else {
        cTitle = `Nível ${lvl}`; 
    }
    return `${cName}: ${cTitle}`;
}

function customPrompt(msg, numericOnly = false) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-prompt-overlay');
        const msgEl = document.getElementById('custom-prompt-msg');
        const inputEl = document.getElementById('custom-prompt-input');
        const btnOk = document.getElementById('custom-prompt-ok');
        const btnCancel = document.getElementById('custom-prompt-cancel');

        inputEl.setAttribute('autocomplete', 'new-password');
        inputEl.setAttribute('data-lpignore', 'true');
        inputEl.setAttribute('data-1p-ignore', 'true');

        msgEl.innerHTML = msg;
        inputEl.value = '';
        
        if (numericOnly) {
            inputEl.setAttribute('inputmode', 'numeric');
            inputEl.oninput = function() { this.value = this.value.replace(/[^0-9]/g, ''); };
        } else {
            inputEl.removeAttribute('inputmode');
            inputEl.oninput = null;
        }
        
        overlay.style.display = 'flex';
        inputEl.focus();

        const cleanup = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnCancel.onclick = null;
            inputEl.onkeydown = null;
        };

        btnOk.onclick = () => {
            let val = inputEl.value;
            cleanup();
            resolve(val);
        };

        btnCancel.onclick = () => {
            cleanup();
            resolve(null);
        };

        inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') {
                btnOk.click();
            } else if (e.key === 'Escape') {
                btnCancel.click();
            }
        };
    });
}

function customAlert(msg) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-alert-overlay');
        const msgEl = document.getElementById('custom-alert-msg');
        const btnOk = document.getElementById('custom-alert-ok');

        msgEl.innerHTML = msg;
        overlay.style.display = 'flex';
        btnOk.focus();

        const cleanup = () => {
            overlay.style.display = 'none';
            btnOk.onclick = null;
            btnOk.onkeydown = null;
        };

        btnOk.onclick = () => {
            cleanup();
            resolve();
        };

        btnOk.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
                cleanup();
                resolve();
            }
        };
    });
}

function setupSumButtons() {
    const inputs = document.querySelectorAll("input[oninput*='formatAndSave'], input[oninput*='formatCurrency']");
    inputs.forEach(inp => {
        if (inp.parentNode.classList.contains('sum-wrapper') || inp.classList.contains('no-sum')) return;

        let wrapper = document.createElement('div');
        wrapper.className = 'sum-wrapper';
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "stretch";
        wrapper.style.gap = "4px";
        wrapper.style.width = "100%";
        
        inp.parentNode.insertBefore(wrapper, inp);
        wrapper.appendChild(inp);

        let btnMinus = document.createElement('button');
        btnMinus.type = "button";
        btnMinus.textContent = '-';
        btnMinus.className = 'btn btn-outline';
        btnMinus.style.cssText = 'padding: 0 8px; margin: 0; font-size: 16px; font-weight: bold; border-color: var(--danger); color: var(--danger); cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;';
        btnMinus.title = "Subtrair";

        btnMinus.onclick = async () => {
            if(inp.disabled || isReadOnly) {
                await customAlert("Campo bloqueado ou em modo de leitura.");
                return;
            }
            let val = await customPrompt("Digite o valor para SUBTRAIR:", true);
            if(val !== null && val.trim() !== "") {
                let numToSub = parseInt(val.replace(/\D/g, ''), 10);
                if(!isNaN(numToSub)) {
                    let currentVal = parseInt(inp.value.replace(/\D/g, ''), 10) || 0;
                    let newVal = currentVal - numToSub;
                    if(newVal < 0) newVal = 0;
                    inp.value = newVal;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        };

        let btnPlus = document.createElement('button');
        btnPlus.type = "button";
        btnPlus.textContent = '+';
        btnPlus.className = 'btn btn-outline';
        btnPlus.style.cssText = 'padding: 0 8px; margin: 0; font-size: 16px; font-weight: bold; border-color: var(--success); color: var(--success); cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center;';
        btnPlus.title = "Somar";

        btnPlus.onclick = async () => {
            if(inp.disabled || isReadOnly) {
                await customAlert("Campo bloqueado ou em modo de leitura.");
                return;
            }
            let val = await customPrompt("Digite o valor para SOMAR:", true);
            if(val !== null && val.trim() !== "") {
                let numToAdd = parseInt(val.replace(/\D/g, ''), 10);
                if(!isNaN(numToAdd)) {
                    let currentVal = parseInt(inp.value.replace(/\D/g, ''), 10) || 0;
                    let newVal = currentVal + numToAdd;
                    inp.value = newVal;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        };

        wrapper.appendChild(btnMinus);
        wrapper.appendChild(btnPlus);
    });
}

function init() {
  document.querySelectorAll('input').forEach(inp => {
      inp.setAttribute('autocomplete', 'new-password');
      inp.setAttribute('data-lpignore', 'true');
      inp.setAttribute('data-1p-ignore', 'true');
  });

  populateSelects();
  runFallbackChecks();
  currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];

  document.querySelectorAll('.box').forEach(box => {
      if(box.querySelector('.box-inner')) return;
      let inner = document.createElement('div');
      inner.className = 'box-inner';
      let front = document.createElement('div');
      front.className = 'box-front';
      while(box.childNodes.length > 0) front.appendChild(box.childNodes[0]);
      let back = document.createElement('div');
      back.className = 'box-back';
      let backTitle = document.createElement('h3');
      backTitle.className = 'back-title';
      let backMsg = document.createElement('p');
      backMsg.className = 'back-msg';
      let backBtn = document.createElement('button');
      backBtn.className = 'btn btn-outline btn-info';
      backBtn.innerText = 'Voltar';
      backBtn.onclick = (e) => { e.stopPropagation(); box.classList.remove('flipped'); };
      back.appendChild(backTitle);
      back.appendChild(backMsg);
      back.appendChild(backBtn);
      inner.appendChild(front);
      inner.appendChild(back);
      box.appendChild(inner);

      let infoBtn = front.querySelector('span[onclick*="openInfoModal"]');
      if(infoBtn) {
          let match = infoBtn.getAttribute('onclick').match(/openInfoModal\('(.*?)',\s*'(.*?)'\)/);
          if(match) {
              backTitle.innerText = match[1];
              backMsg.innerText = match[2];
              infoBtn.removeAttribute('onclick');
              infoBtn.onclick = (e) => { 
                  e.stopPropagation(); 
                  let titleEl = front.querySelector('.box-title');
                  if(titleEl && titleEl.id) {
                      let bId = titleEl.id.replace('title-', '');
                      if(currentChar && currentChar.info && currentChar.info[bId]) { 
                          currentChar.info[bId] = false; 
                          updateUI(); 
                      }
                  }
                  box.classList.add('flipped'); 
              };
          }
      }
  });

  setupSumButtons();
  renderTabs();
  renderTecnicas();
  renderNpcsComuns();
  renderNpcsEspeciais();
  renderLogs();
  updateUI();
  initFirebase();
  toggleEditability();
}

function initFirebase() {
  try {
      firebase.initializeApp(firebaseConfig); db = firebase.firestore(); isFirebaseReady = true;
      document.getElementById('db-status').classList.add('online');
      if(currentDocId !== '') { loadFromCloud(); }
      iniciarMonitoramentoBancoDeDados();
  } catch(e) {}
}

async function changeDocId(newId) {
  if (!newId || newId.trim() === '') {
      currentDocId = '';
      return;
  }
  newId = newId.trim();
  
  if (currentDocId === "NPCS" || currentDocId === "NPCI") {
      await customAlert("Esse ID especial é permanente e não pode ser alterado.");
      document.getElementById('doc-id').value = currentDocId;
      return;
  }
  if (!/^\d{4}$/.test(newId) && newId !== "NPCS" && newId !== "NPCI") {
      await customAlert("O ID da ficha deve conter EXATAMENTE 4 NÚMEROS (ex: 1234).");
      document.getElementById('doc-id').value = currentDocId;
      return;
  }
  
  currentDocId = newId;
  loadFromCloud();
}

async function loadFromCloud() {
  if (!isFirebaseReady || !db || currentDocId === '') return;
  document.getElementById('db-status').classList.add('syncing');
  document.getElementById('db-status').classList.remove('unsaved');
  let toast = document.getElementById('save-toast');
  if (toast && toast.textContent === "Salve as alterações!") toast.style.opacity = "0";
  try {
      const doc = await db.collection("fichas_op").doc(currentDocId).get();
      if (doc.exists) { 
          let data = doc.data(); 
          isReadOnly = false;
          isSuperAdmin = false;

          if (currentDocId === "NPCS" || currentDocId === "NPCI") {
              data.password = ADMIN_PASSWORD;
              data.saveMode = "manual";
          }

          if (data.password && data.password.trim() !== '') {
              let entered = await customPrompt("Esta ficha é protegida por senha. Digite a senha para editar (ou cancele para apenas visualizar a ficha):");
              if (entered !== data.password && entered !== ADMIN_PASSWORD && entered !== "Ben10000") {
                  isReadOnly = true;
                  if(entered !== null) await customAlert("Senha incorreta. A ficha foi aberta no Modo de Leitura.");
              } else {
                  if (entered === "Ben10000") isSuperAdmin = true;
                  await customAlert("Acesso concedido!");
              }
          }

          charData = data; 
          runFallbackChecks();
          currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
          renderTabs();
          renderTecnicas(); 
          renderNpcsComuns();
          renderNpcsEspeciais();
          renderLogs();
          updateUI(); 
          toggleEditability();
      } 
      else { 
          if (currentDocId === "NPCS" || currentDocId === "NPCI") {
              charData.password = ADMIN_PASSWORD;
              charData.saveMode = "manual";
          }
          isReadOnly = false;
          saveData(); 
          toggleEditability();
      }
  } catch(e) {}
  setTimeout(() => document.getElementById('db-status').classList.remove('syncing'), 500);
}

function saveData(force = false) {
  if (isReadOnly) return;
  let saveMode = document.getElementById('save-mode');
  if (saveMode && saveMode.value === 'manual' && !force) {
      if (currentDocId !== '') {
          document.getElementById('db-status').classList.add('unsaved');
          let toast = document.getElementById('save-toast');
          if (toast) {
              toast.textContent = "Salve as alterações!";
              toast.style.color = "#0dcaf0";
              toast.style.opacity = "1";
          }
      }
      return;
  }

  let isSheetEmpty = charData.pcs.every(p => (p.pc.name || "").trim() === "" && (!p.npcs || p.npcs.every(n => (n.name || "").trim() === "")));
  if (isSheetEmpty) return;

  if (isFirebaseReady && db && currentDocId !== '') {
      document.getElementById('db-status').classList.add('syncing');
      
      let dataToSave = JSON.parse(JSON.stringify(charData));

      db.collection('fichas_op').doc(currentDocId).set(dataToSave)
        .then(() => { 
            setTimeout(() => document.getElementById('db-status').classList.remove('syncing'), 300); 
            document.getElementById('db-status').classList.remove('unsaved');
            let toast = document.getElementById('save-toast');
            if (toast) {
                toast.textContent = "Salvo!";
                toast.style.color = "var(--success)";
            }
            if(toast) { toast.style.opacity = '1'; setTimeout(() => toast.style.opacity = '0', 2000); }
        })
        .catch(error => { document.getElementById('db-status').classList.remove('syncing'); document.getElementById('db-status').classList.remove('online'); });
  }
}

function manualSave() {
    saveData(true);
}

function updateSaveMode(mode) {
    if ((currentDocId === "NPCS" || currentDocId === "NPCI") && mode !== "manual") {
        customAlert("Este ID especial deve estar sempre no modo de Save Manual.");
        document.getElementById('save-mode').value = "manual";
        mode = "manual";
    }
    charData.saveMode = mode;
    let btnSave = document.getElementById('btn-save-manual');
    if (btnSave) btnSave.style.display = mode === 'manual' ? 'inline-block' : 'none';
    if (mode === 'auto') {
        document.getElementById('db-status').classList.remove('unsaved');
        let toast = document.getElementById('save-toast');
        if (toast && toast.textContent === "Salve as alterações!") {
            toast.style.opacity = "0";
        }
    }
    saveData(true);
}

async function managePassword() {
    if (currentDocId === '') {
        await customAlert("Digite um ID na nuvem e puxe ou crie uma ficha primeiro!");
        return;
    }
    if (currentDocId === "NPCS" || currentDocId === "NPCI") {
        await customAlert("A senha dos IDs de NPC não pode ser alterada.");
        return;
    }
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Recarregue a ficha e insira a senha correta antes de tentar modificar a segurança.");
        return;
    }

    if (charData.password && charData.password.trim() !== "") {
        let oldPass = await customPrompt("Digite a senha atual para autorizar a mudança:");
        if (oldPass === charData.password || oldPass === ADMIN_PASSWORD || oldPass === "Ben10000") {
            if (oldPass === "Ben10000") isSuperAdmin = true;
            let newPass = await customPrompt("Digite a nova senha (ou deixe totalmente em branco para REMOVER a proteção atual):");
            if (newPass !== null) {
                charData.password = newPass.trim();
                saveData();
                await customAlert(charData.password === "" ? "A senha foi removida com sucesso!" : "Senha redefinida com sucesso!");
                toggleEditability();
            }
        } else {
            if (oldPass !== null) await customAlert("Senha incorreta!");
        }
    } else {
        let newPass = await customPrompt("Defina uma senha para proteger a edição desta ficha:");
        if (newPass === "Ben10000") {
            isSuperAdmin = true;
            await customAlert("Modo Super ADM ativado para esta sessão!");
            toggleEditability();
            updateUI();
            return;
        }
        if (newPass !== null && newPass.trim() !== "") {
            charData.password = newPass.trim();
            saveData();
            await customAlert("Senha definida com sucesso!");
            toggleEditability();
        }
    }
}

function toggleEditability() {
    const elements = document.querySelectorAll('.container input:not(#info-salario):not(#info-patente), .container select, .container textarea, .container button');
    let isNPC = currentChar.isNPC;
    elements.forEach(el => {
        if((el.innerText && (el.innerText.includes("Copiar") || el.innerText.includes("Colapsar"))) || el.id === 'num-logs-copy') {
            el.disabled = false;
            return;
        }
        if(el.value === "Electro") {
            el.disabled = true;
            return;
        }
        let hasBerries = currentChar.info.berries > 0;
        let hasNpcC = currentChar.info.npcsComunsList && currentChar.info.npcsComunsList.length > 0;
        let hasNpcE = currentChar.info.npcsEspeciaisList && currentChar.info.npcsEspeciaisList.length > 0;
        
        let isBerriesBlocked = isNPC && !isSuperAdmin && !hasBerries && el.id === 'info-berries';
        let isNpcCBlocked = isNPC && !isSuperAdmin && !hasNpcC && (el.id === 'btn-add-npc-c' || (el.closest && el.closest('#npcs-comuns-container')));
        let isNpcEBlocked = isNPC && !isSuperAdmin && !hasNpcE && (el.id === 'btn-add-npc-e' || (el.closest && el.closest('#npcs-especiais-container')));
        let isKuja = currentChar.info.raca === "Kuja" || currentChar.info.raca2 === "Kuja";

        if (isBerriesBlocked || isNpcCBlocked || isNpcEBlocked || (isKuja && (el.id === 'info-sexo' || el.id === 'info-genero'))) {
            el.disabled = true;
        } else if (el.id === 'info-expectativaVida') {
            el.disabled = !isSuperAdmin;
        } else if(el.type === 'checkbox') {
            el.disabled = isReadOnly;
        } else {
            el.disabled = isReadOnly;
        }
    });

    let pwdBtn = document.getElementById('btn-senha');
    if (pwdBtn) {
        if (isReadOnly) {
            pwdBtn.style.display = 'none';
        } else {
            pwdBtn.style.display = 'inline-block';
            pwdBtn.innerText = (charData.password && charData.password !== "") ? "🔑 Redefinir Senha" : "🔑 Definir Senha";
        }
    }
    
    updateUI();
}

function runFallbackChecks() {
  if (typeof charData.password === 'undefined') charData.password = "";
  if (currentDocId === "NPCS" || currentDocId === "NPCI") {
      charData.password = ADMIN_PASSWORD;
      charData.saveMode = "manual";
  }
  if (typeof charData.saveMode === 'undefined') charData.saveMode = "manual";
  if (typeof charData.layoutMode === 'undefined') charData.layoutMode = "vertical";
  let saveModeEl = document.getElementById('save-mode');
  if (saveModeEl) {
      if (currentDocId === "NPCS" || currentDocId === "NPCI") {
          saveModeEl.disabled = true;
          charData.saveMode = "manual";
      } else {
          saveModeEl.disabled = false;
      }
      saveModeEl.value = charData.saveMode;
      let btnSave = document.getElementById('btn-save-manual');
      if (btnSave) btnSave.style.display = charData.saveMode === 'manual' ? 'inline-block' : 'none';
  }
  
  if (!charData.pcs) {
      charData.pcs = [];
      if (charData.characters && charData.characters.length > 0) {
          let mainPC = charData.characters[0];
          mainPC.isNPC = false;
          let npcs = charData.characters.slice(1).filter(c => c.name || c.info.classe !== "Arqueólogo 1");
          npcs.forEach(n => n.isNPC = true);
          charData.pcs.push({ pc: mainPC, npcs: npcs });
      } else if (charData.info) {
          let c = createEmptyChar(false);
          c.name = charData.name || "";
          c.info = charData.info;
          c.tecnicasList = charData.tecnicasList || [];
          c.logList = charData.logList || [];
          c.stats = charData.stats || { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 };
          c.substats = charData.substats || { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0 };
          charData.pcs.push({ pc: c, npcs: [] });
      } else {
          charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
      }
      delete charData.characters;
      delete charData.info;
      delete charData.name;
      delete charData.tecnicasList;
      delete charData.logList;
      delete charData.stats;
      delete charData.substats;
  }
  if(charData.pcs.length === 0) {
      charData.pcs.push({ pc: createEmptyChar(false), npcs: [] });
  }

  charData.pcs.forEach(pObj => {
      let charsToCheck = [pObj.pc, ...pObj.npcs];
      charsToCheck.forEach(c => {
          if (!c.info) c.info = {};
          if (typeof c.info.recompensa === 'string') c.info.recompensa = parseInt(c.info.recompensa.replace(/\D/g, "")) || "";
          if (typeof c.info.recompensaTravada === 'string') c.info.recompensaTravada = parseInt(c.info.recompensaTravada.replace(/\D/g, "")) || "";
          if (typeof c.info.berries === 'string') c.info.berries = parseInt(c.info.berries.replace(/\D/g, "")) || "";

          if (typeof c.info.boxTec === 'undefined') c.info.boxTec = c.info.tecnicasColapsado || false;
          if (typeof c.info.boxLog === 'undefined') c.info.boxLog = c.info.logsColapsado || false;
          if (typeof c.info.boxRes === 'undefined') c.info.boxRes = c.info.resumoColapsado || false;


          const defInfo = { 
              classe: "", classe2: "", classe3: "", classe4: "", classe5: "", raca: "", raca2: "", animal: "", animal2: "", racaNomeCustom: "", customBuffF: "", customBuffD: "", customBuffR: "", customBuffV: "", racaNomeCustom2: "", customBuffF2: "", customBuffD2: "", customBuffR2: "", customBuffV2: "", 
              linhagem: "", selClasseDF: "d", selDF: "d", selRV: "r", selLinDF: "d", selLinRV: "r", selLin4: "d", selLinEspAmi: "esp", 
              alcunha: "", alcunhasList: [], alcunhaAtiva: "", recompensa: "", recompensaTravada: "", altura: "", idade: "", sexo: "", genero: "", hideSexo: false, hideGenero: false, sangue: "", nacionalidade: "", localizacao: "", 
              telefone: "", orgTipo: "", tripulacao: "", pirataStatus: "Normal", patente: "", salario: "", estilo1: "", freestyle1: "", estilo2: "", freestyle2: "",
              estilo3: "", freestyle3: "", estilo4: "", freestyle4: "", berries: 5000000, npcsComunsList: [], npcsEspeciaisList: [], akumaNome: "", 
              personalidade: "", historia: "", aparencia: "", inventario: "", naviosList: [], armasEquipadasList: [], hasAmiAlc: true, hasAmiDur: true, hasAmiPot: true, hasAmiVel: true, hasAmiDesp: false,
              amiResPct: "", amiAlcMult: "1", calcQuemAtaca: "eu", calcUseAttr: "", calcInimigoRes: "", calcResIgnorada: "", calcDanoIgnorado: "", calcDanoAmiIgnorado: "", calcBuffFlat: "", calcBuffPct: "", calcBuffDanoFinalPct: "", calcUseAmi: "sim", amiPotBuff: "", calcUseHaki: "nao", calcUseHakiRei: "nao", sceneType: "Treino Padrão", sceneText: "", hpAtual: -1,
              boxIden: false, boxMec: false, boxSoc: false, boxBase: false, boxEsp: false, boxAmi: false, boxHist: false, 
              boxInv: false, boxCalc: false, boxEstamina: false, estaminaAtual: -1, estaminaVelocidade: "", estaminaDano: "", estaminaBuffPct: "", estaminaHakiArm: "nenhum", estaminaHakiObs: "nenhum", estaminaHakiRei: "nenhum", boxScene: false, akumaId: "", selCharR1: "", selCharR2: "", treinosAcumulados: 0, ordemTecnicas: "alfabetica", hideHistoria: false, hidePersonality: false, hideTecNome: false, hideTecDesc: false, hideTecEfeito: false, hiddenStyles: [], exaustaoCompleta: false, habilidadesExclusivas: [], habCaminhoAtiradorAtivo: false, habFavArmistaAtivo: "sem", habFavArmistaAttr: "d", habFuriaArdenteAttr: "f", habQIAvancadoAtivo: false, linhagemBeckmanArma: false, habRetornoUso: 1, merito: 0, aliadosEspiritoContagiante: 0,
              unlockHA1: false, unlockHA2: false, unlockHA3: false, unlockHA4: false, unlockHA5: false, unlockHA6: false,
              unlockHO2: false, unlockHO3: false, unlockHO4: false,
              unlockHR2: false, unlockHR3: false, unlockHR4: false, unlockHR5: false, unlockHR6: false,
              zoanBuffF: 0, zoanBuffD: 0, zoanBuffR: 0, zoanBuffV: 0, zoanForma: "Comum"
          };
          for(let k in defInfo) if (typeof c.info[k] === 'undefined') c.info[k] = defInfo[k];
          
          if (!c.stats) c.stats = { f: 0, d: 0, r: 0, v: 0, esp: 0, ami: 0 };
          if (!c.substats) c.substats = { refl: 0, vcorp: 0, hArm: 0, hObs: 0, hRei: 0, amiAlc: 0, amiDur: 0, amiPot: 0, amiVel: 0, amiDesp: 0 };
          if (!c.tecnicasList) c.tecnicasList = [];
          c.tecnicasList.forEach(t => { if (typeof t.estilo === 'undefined') t.estilo = ""; });
          if (!c.logList) c.logList = [];
      });
  });
  
  if(activePcIndex >= charData.pcs.length) activePcIndex = 0;
  if(activeNpcIndex >= charData.pcs[activePcIndex].npcs.length) activeNpcIndex = -1;

  currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
}

window.toggleBox = function(id) {
    if (!currentChar) return;
    currentChar.info[id] = !currentChar.info[id];
    saveData();
    updateUI();
};

window.toggleBox = function(id) {
    if (!currentChar) return;
    currentChar.info[id] = !currentChar.info[id];
    saveData();
    updateUI();
};

window.toggleAllBoxes = function(state) {
    if (!currentChar) return;
    const boxKeys = ['boxIden', 'boxMec', 'boxSoc', 'boxHab', 'boxBase', 'boxEsp', 'boxAmi', 'boxHist', 'boxLog', 'boxInv', 'boxTec', 'boxRes', 'boxCalc', 'boxEstamina'];
    boxKeys.forEach(k => currentChar.info[k] = state);
    document.querySelectorAll('.box').forEach(box => box.classList.remove('flipped'));
    saveData();
    updateUI();
};

window.toggleHiddenStyle = function(styleName, isChecked) {
    if (!currentChar.info.hiddenStyles) currentChar.info.hiddenStyles = [];
    if (isChecked) {
        if (!currentChar.info.hiddenStyles.includes(styleName)) currentChar.info.hiddenStyles.push(styleName);
    } else {
        currentChar.info.hiddenStyles = currentChar.info.hiddenStyles.filter(s => s !== styleName);
    }
    saveData();
    updateUI();
};

window.updateHideNaoTreinadas = function(isChecked) {
    if (isReadOnly) return;
    currentChar.info.hideNaoTreinadas = isChecked;
    if (isChecked) {
        currentChar.info.showApenasNaoTreinadas = false;
        let el = document.getElementById('info-showApenasNaoTreinadas');
        if(el) el.checked = false;
    }
    saveData(); updateUI();
};

window.updateShowApenasNaoTreinadas = function(isChecked) {
    if (isReadOnly) return;
    currentChar.info.showApenasNaoTreinadas = isChecked;
    if (isChecked) {
        currentChar.info.hideNaoTreinadas = false;
        let el = document.getElementById('info-hideNaoTreinadas');
        if(el) el.checked = false;
    }
    saveData(); updateUI();
};

window.addHabilidade = function() {
    if(isReadOnly) return;
    let sel = document.getElementById('hab-select');
    let val = sel.value;
    if(val && !currentChar.info.habilidadesExclusivas.includes(val)) {
        currentChar.info.habilidadesExclusivas.push(val);
        saveData(); updateUI();
    }
    sel.value = "";
};

window.removeHabilidade = function(hab) {
    if(isReadOnly) return;
    let ln = currentChar.info.linhagem;
    let rc = currentChar.info.raca;
    let rc2 = currentChar.info.raca2;
    let mand = linhagemHabilidades[ln] ? [...linhagemHabilidades[ln]] : [];
    if (rc === "Bucaneiro") mand.push("Constituição Única");
    if (rc === "Lunariano") mand.push("Fúria Ardente");
    if (rc === "Oni") mand.push("Contração Muscular");
    if (ln === "Charlotte") {
        if (rc2 === "Bucaneiro") mand.push("Constituição Única");
        if (rc2 === "Lunariano") mand.push("Fúria Ardente");
        if (rc2 === "Oni") mand.push("Contração Muscular");
    }
    if(mand.includes(hab)) return; 
    currentChar.info.habilidadesExclusivas = currentChar.info.habilidadesExclusivas.filter(h => h !== hab);
    
    if(hab === "Caminho do Atirador") currentChar.info.habCaminhoAtiradorAtivo = false;
    if(hab === "Favoritismo Armista") { currentChar.info.habFavArmistaAtivo = "nenhum"; currentChar.info.habFavArmistaAttr = "d"; }
    if(hab === "Fúria Ardente") currentChar.info.habFuriaArdenteAttr = "f";
    if(hab === "QI Avançado") currentChar.info.habQIAvancadoAtivo = false;
    
    saveData(); updateUI();
};

function addNpcComum() {
    if (!currentChar.info.npcsComunsList) currentChar.info.npcsComunsList = [];
    currentChar.info.npcsComunsList.push({quantidade: "", raca: "Humano", pontos: ""});
    saveData(); renderNpcsComuns(); updateUI(); toggleEditability();
}
function removeNpcComum(idx) {
    currentChar.info.npcsComunsList.splice(idx, 1);
    saveData(); renderNpcsComuns(); updateUI(); toggleEditability();
}
function updateNpcComum(idx, field, val) {
    currentChar.info.npcsComunsList[idx][field] = val;
    saveData(); updateUI();
}
function formatNpcNumber(el) {
    let cleanVal = el.value.replace(/\D/g, "");
    let num = cleanVal ? parseInt(cleanVal, 10) : "";
    let formatted = cleanVal ? num.toLocaleString("pt-BR") : "";
    if (el.value !== formatted) {
        let cursor = el.selectionStart;
        let oldLength = el.value.length;
        el.value = formatted;
        let newLength = el.value.length;
        try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    }
    return num;
}
window.addNavio = function() {
    if(isReadOnly) return;
    if (!currentChar.info.naviosList) currentChar.info.naviosList = [];
    currentChar.info.naviosList.push({tipo: "", nomeCustom: "", hpAtual: "", hpMax: ""});
    saveData(); renderNavios(); updateUI(); toggleEditability();
};
window.removeNavio = function(idx) {
    if(isReadOnly) return;
    currentChar.info.naviosList.splice(idx, 1);
    saveData(); renderNavios(); updateUI(); toggleEditability();
};
window.updateNavio = function(idx, field, val) {
    if(isReadOnly) return;
    let n = currentChar.info.naviosList[idx];
    let reRender = false;
    if (field === 'tipo') {
        n.tipo = val;
        if (val !== "Personalizado" && shipData[val] && shipData[val].hp !== null) {
            n.hpAtual = shipData[val].hp;
        }
        reRender = true;
    } else if (field === 'hpAtual' || field === 'hpMax') {
        let clean = val.replace(/\D/g, "");
        let num = clean === "" ? "" : parseInt(clean, 10);
        n[field] = num;
        
        let maxVal = n.tipo === "Personalizado" ? (parseInt(n.hpMax) || 0) : (shipData[n.tipo] ? shipData[n.tipo].hp : null);
        if (maxVal !== null) {
            let currVal = parseInt(n.hpAtual) || 0;
            if (currVal > maxVal) {
                n.hpAtual = maxVal;
                if (field === 'hpMax') reRender = true;
            }
        }
    } else {
        n[field] = val;
    }
    saveData(); updateUI();
    if(reRender) renderNavios();
};
window.renderNavios = function() {
    const container = document.getElementById('navios-container');
    if(!container) return;
    let html = '';
    (currentChar.info.naviosList || []).forEach((n, idx) => {
        let isCustom = n.tipo === "Personalizado";
        let sData = shipData[n.tipo];
        let hasHp = isCustom || (sData && sData.hp !== null);
        let maxHp = isCustom ? (n.hpMax || "") : (sData ? sData.hp : "");

        let opts = `<option value="">-- Selecione um Navio --</option>
        <optgroup label="Comuns"><option value="Bote">Bote</option><option value="Barco Pesqueiro">Barco Pesqueiro</option><option value="Escuna">Escuna</option><option value="Brigue">Brigue</option><option value="Caravela">Caravela</option><option value="Fragata">Fragata</option><option value="Gran General">Gran General</option></optgroup>
        <optgroup label="Governo"><option value="C-15 Kenpachi">C-15 Kenpachi</option><option value="Z-10 Perci">Z-10 Perci</option><option value="B-47 Hajime">B-47 Hajime</option><option value="T-33 Apollo">T-33 Apollo</option><option value="K-55 Mereoleona">K-55 Mereoleona</option><option value="A-1 Atlas">A-1 Atlas</option></optgroup>
        <optgroup label="Vanguarda"><option value="5-01 Sparkle">5-01 Sparkle</option><option value="4-01 Dream">4-01 Dream</option><option value="3-01 Scream">3-01 Scream</option><option value="2-01 Liberty">2-01 Liberty</option><option value="1-01 Hope">1-01 Hope</option></optgroup>
        <optgroup label="Especiais"><option value="Pérola Negra">Pérola Negra</option><option value="Holandês Voador">Holandês Voador</option><option value="Vingança da Rainha Ana">Vingança da Rainha Ana</option><option value="Silent Mary">Silent Mary</option><option value="Pequod">Pequod</option></optgroup>
        <option value="Personalizado">Personalizado...</option>`;

        if (n.tipo) opts = opts.replace(`value="${n.tipo}"`, `value="${n.tipo}" selected`);

        html += `<div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 5px; display: flex; flex-direction: column; gap: 5px;">
            <div style="display: flex; gap: 5px; align-items: center;">
                <select onchange="updateNavio(${idx}, 'tipo', this.value)" style="flex:1; padding: 6px; font-size: 11px;">${opts}</select>
                <button type="button" class="btn btn-outline btn-danger" style="padding: 4px 8px; font-size: 11px; margin: 0;" onclick="removeNavio(${idx})">X</button>
            </div>`;

        if (isCustom) {
            html += `<div style="display: flex; gap: 5px;">
                <input type="text" placeholder="Nome do Navio" value="${n.nomeCustom || ''}" oninput="updateNavio(${idx}, 'nomeCustom', this.value)" style="flex: 2; padding: 6px;">
                <input type="text" class="no-sum" placeholder="HP Atual" value="${n.hpAtual !== undefined ? n.hpAtual : ''}" oninput="let cursor = this.selectionStart; updateNavio(${idx}, 'hpAtual', this.value); let formatted = currentChar.info.naviosList[${idx}].hpAtual !== undefined ? currentChar.info.naviosList[${idx}].hpAtual : ''; if(this.value != formatted) { this.value = formatted; try{this.setSelectionRange(cursor,cursor);}catch(e){} }" style="flex: 1; padding: 6px; text-align: center;">
                <span style="display:flex; align-items:center;">/</span>
                <input type="text" class="no-sum" placeholder="HP Máx" value="${n.hpMax || ''}" oninput="let cursor = this.selectionStart; updateNavio(${idx}, 'hpMax', this.value); let formatted2 = currentChar.info.naviosList[${idx}].hpMax !== undefined ? currentChar.info.naviosList[${idx}].hpMax : ''; if(this.value != formatted2) { this.value = formatted2; try{this.setSelectionRange(cursor,cursor);}catch(e){} }" style="flex: 1; padding: 6px; text-align: center;">
            </div>`;
        } else if (hasHp) {
            html += `<div style="display: flex; gap: 5px; align-items: center;">
                <span style="font-size: 11px; color:#aaa;">Vida do Navio:</span>
                <input type="text" class="no-sum" placeholder="HP Atual" value="${n.hpAtual !== undefined ? n.hpAtual : ''}" oninput="let cursor = this.selectionStart; updateNavio(${idx}, 'hpAtual', this.value); let formatted = currentChar.info.naviosList[${idx}].hpAtual !== undefined ? currentChar.info.naviosList[${idx}].hpAtual : ''; if(this.value != formatted) { this.value = formatted; try{this.setSelectionRange(cursor,cursor);}catch(e){} }" style="width: 60px; padding: 6px; text-align: center;">
                <span style="font-size: 11px;">/ ${maxHp}</span>
            </div>`;
        }
        html += `</div>`;
    });
    container.innerHTML = html;
}

window.addArmaEquipada = function() {
    if(isReadOnly) return;
    if (!currentChar.info.armasEquipadasList) currentChar.info.armasEquipadasList = [];
    currentChar.info.armasEquipadasList.push({nome: "", stat: "d", type: "pct", val: "", hp: "", ativo: false});
    saveData(); updateUI(); renderArmasEquipadas(); toggleEditability();
};
window.removeArmaEquipada = function(idx) {
    if(isReadOnly) return;
    currentChar.info.armasEquipadasList.splice(idx, 1);
    saveData(); updateUI(); renderArmasEquipadas(); toggleEditability();
};
window.updateArmaEquipada = function(idx, field, val) {
    if(isReadOnly) return;
    currentChar.info.armasEquipadasList[idx][field] = val;
    if(field === 'val') {
        let clean = val.replace(/\D/g, "");
        let num = clean ? parseInt(clean, 10) : "";
        if (currentChar.info.armasEquipadasList[idx].type === "pct" && num > 100) num = 100;
        currentChar.info.armasEquipadasList[idx][field] = num;
    } else if (field === 'hp') {
        let clean = val.replace(/\D/g, "");
        currentChar.info.armasEquipadasList[idx][field] = clean ? parseInt(clean, 10) : "";
    } else if (field === 'type' && val === "pct") {
        let currentVal = currentChar.info.armasEquipadasList[idx].val;
        if (currentVal > 100) currentChar.info.armasEquipadasList[idx].val = 100;
    }
    saveData(); updateUI();
    if(field !== 'nome' && field !== 'val' && field !== 'hp') renderArmasEquipadas();
};
window.toggleArmaAtiva = function(idx) {
    if(isReadOnly) return;
    currentChar.info.armasEquipadasList[idx].ativo = !currentChar.info.armasEquipadasList[idx].ativo;
    saveData(); updateUI(); renderArmasEquipadas();
};
function renderArmasEquipadas() {
    const container = document.getElementById('armas-equipadas-container');
    if(!container) return;
    let finalHtml = '';
    (currentChar.info.armasEquipadasList || []).forEach((a, idx) => {
        let valFmt = a.val ? a.val.toLocaleString('pt-BR') : '';
        let btnCor = a.ativo ? 'var(--success)' : '#444';
        let btnTxt = a.ativo ? 'ON' : 'OFF';
        finalHtml += `
            <div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed ${btnCor}; border-radius: 6px; margin-bottom: 5px; display: flex; gap: 5px; align-items: center; transition: 0.2s;">
                <input type="text" placeholder="Nome do Item/Arma" value="${a.nome || ''}" oninput="updateArmaEquipada(${idx}, 'nome', this.value)" style="flex: 2; padding: 6px;">
                <select onchange="updateArmaEquipada(${idx}, 'stat', this.value)" style="flex: 1; padding: 6px; width: auto; font-size: 11px;">
                    <optgroup label="Atributos">
                        <option value="tudoAttr" ${a.stat === 'tudoAttr' ? 'selected' : ''}>Todos os Atributos</option>
                        <option value="d" ${a.stat === 'd' ? 'selected' : ''}>Destreza</option>
                        <option value="f" ${a.stat === 'f' ? 'selected' : ''}>Força</option>
                        <option value="r" ${a.stat === 'r' ? 'selected' : ''}>Resistência</option>
                        <option value="v" ${a.stat === 'v' ? 'selected' : ''}>Velocidade</option>
                        <option value="refl" ${a.stat === 'refl' ? 'selected' : ''}>Reflexo</option>
                        <option value="vcorp" ${a.stat === 'vcorp' ? 'selected' : ''}>Vel. Corporal</option>
                        <option value="vAgua" ${a.stat === 'vAgua' ? 'selected' : ''}>Velocidade (Água)</option>
                        <option value="reflAgua" ${a.stat === 'reflAgua' ? 'selected' : ''}>Reflexo (Água)</option>
                        <option value="vcorpAgua" ${a.stat === 'vcorpAgua' ? 'selected' : ''}>Vel. Corporal (Água)</option>
                    </optgroup>
                    <optgroup label="Espírito">
                        <option value="tudoEsp" ${a.stat === 'tudoEsp' ? 'selected' : ''}>Todo o Espírito</option>
                        <option value="esp" ${a.stat === 'esp' ? 'selected' : ''}>Espírito</option>
                        <option value="ha" ${a.stat === 'ha' ? 'selected' : ''}>Armamento</option>
                        <option value="ho" ${a.stat === 'ho' ? 'selected' : ''}>Observação</option>
                        <option value="hr" ${a.stat === 'hr' ? 'selected' : ''}>Rei</option>
                    </optgroup>
                    <optgroup label="Akuma no Mi">
                        <option value="tudoAmi" ${a.stat === 'tudoAmi' ? 'selected' : ''}>Toda a Akuma</option>
                        <option value="amiAlc" ${a.stat === 'amiAlc' ? 'selected' : ''}>Alcance</option>
                        <option value="amiDur" ${a.stat === 'amiDur' ? 'selected' : ''}>Durabilidade</option>
                        <option value="amiPot" ${a.stat === 'amiPot' ? 'selected' : ''}>Potência</option>
                        <option value="amiVel" ${a.stat === 'amiVel' ? 'selected' : ''}>Velocidade</option>
                        <option value="amiDesp" ${a.stat === 'amiDesp' ? 'selected' : ''}>Despertar</option>
                    </optgroup>
                    <optgroup label="Combate">
                        <option value="dano" ${a.stat === 'dano' ? 'selected' : ''}>Dano</option>
                        <option value="ignRes" ${a.stat === 'ignRes' ? 'selected' : ''}>Ignorar Resistência</option>
                        <option value="ignDanoGeral" ${a.stat === 'ignDanoGeral' ? 'selected' : ''}>Ignorar Dano Geral</option>
                        <option value="ignDanoAmi" ${a.stat === 'ignDanoAmi' ? 'selected' : ''}>Ignorar Dano Akuma</option>
                        <option value="redEstamina" ${a.stat === 'redEstamina' ? 'selected' : ''}>Redução de Estamina</option>
                    </optgroup>
                </select>
                <select onchange="updateArmaEquipada(${idx}, 'type', this.value)" style="width: 70px; padding: 6px; font-size: 11px;">
                    <option value="pct" ${a.type === 'pct' ? 'selected' : ''}>%</option>
                    <option value="flat" ${a.type === 'flat' ? 'selected' : ''}>Pts</option>
                </select>
                <input type="text" class="no-sum" placeholder="Valor" value="${valFmt}" oninput="let cursor = this.selectionStart; let oldLen = this.value.length; updateArmaEquipada(${idx}, 'val', this.value); let formatted = currentChar.info.armasEquipadasList[${idx}].val ? currentChar.info.armasEquipadasList[${idx}].val.toLocaleString('pt-BR') : ''; if(this.value !== formatted) { this.value = formatted; let newLen = this.value.length; try { this.setSelectionRange(cursor + (newLen - oldLen), cursor + (newLen - oldLen)); } catch(e){} }" style="width: 70px; padding: 6px; text-align: center;">
                <input type="text" placeholder="HP" class="no-sum" value="${a.hp ? a.hp.toLocaleString('pt-BR') : ''}" oninput="let cursor = this.selectionStart; let oldLen = this.value.length; updateArmaEquipada(${idx}, 'hp', this.value); let formatted = currentChar.info.armasEquipadasList[${idx}].hp ? currentChar.info.armasEquipadasList[${idx}].hp.toLocaleString('pt-BR') : ''; if(this.value !== formatted) { this.value = formatted; let newLen = this.value.length; try { this.setSelectionRange(cursor + (newLen - oldLen), cursor + (newLen - oldLen)); } catch(e){} }" style="width: 60px; padding: 6px; text-align: center;">
                <button type="button" class="btn btn-outline" style="padding: 4px 8px; font-size: 11px; margin: 0; color: ${btnCor}; border-color: ${btnCor}; min-width: 40px;" onclick="toggleArmaAtiva(${idx})">${btnTxt}</button>
                <button type="button" class="btn btn-outline btn-danger" style="padding: 4px 8px; font-size: 11px; margin: 0;" onclick="removeArmaEquipada(${idx})">X</button>
            </div>
        `;
    });
    container.innerHTML = finalHtml;
}

function renderNpcsComuns() {
    if (typeof renderArmasEquipadas === 'function') renderArmasEquipadas();
    if (typeof renderNavios === 'function') renderNavios();
    const container = document.getElementById('npcs-comuns-container');
    if(!container) return;
    let finalHtml = '';
    (currentChar.info.npcsComunsList || []).forEach((n, idx) => {
        let rHtml = `<option value="Outra" ${(!racas[n.raca] && n.raca) ? 'selected' : ''}>Outra...</option>`;
        Object.keys(racas).forEach(r => {
            let isSelected = (n.raca || "Humano") === r ? 'selected' : '';
            rHtml += `<option value="${r}" ${isSelected}>${r}</option>`;
        });
        let cQtd = String(n.quantidade || "").replace(/\D/g, ""); let numQtd = parseInt(cQtd) || "";
        let cPts = String(n.pontos || "").replace(/\D/g, ""); let numPts = parseInt(cPts) || "";
        finalHtml += `
            <div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 5px; display: flex; gap: 5px; align-items: center;">
                <input type="text" placeholder="Qtd" value="${cQtd ? numQtd.toLocaleString('pt-BR') : ''}" oninput="updateNpcComum(${idx}, 'quantidade', formatNpcNumber(this))" style="width: 60px;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                    <select onchange="updateNpcComum(${idx}, 'raca', this.value)" style="width: 100%;">${rHtml}</select>
                    <input type="text" placeholder="Nome da Raça" value="${(!racas[n.raca] && n.raca) ? n.raca : ''}" 
                           style="display: ${(!racas[n.raca] && n.raca) ? 'block' : 'none'};" 
                           oninput="updateNpcComum(${idx}, 'raca', this.value)">
                </div>
                <input type="text" placeholder="Pontos" value="${cPts ? numPts.toLocaleString('pt-BR') : ''}" oninput="updateNpcComum(${idx}, 'pontos', formatNpcNumber(this))" style="width: 80px;">
                <button type="button" class="btn btn-outline btn-danger" style="padding: 2px 6px; font-size: 10px; margin: 0;" onclick="removeNpcComum(${idx})">X</button>
            </div>
        `;
    });
    container.innerHTML = finalHtml;
}

function addNpcEspecial() {
    if (!currentChar.info.npcsEspeciaisList) currentChar.info.npcsEspeciaisList = [];
    let domCount = currentChar.info.npcsEspeciaisList.filter(n => n.origem === 'Dominação').length;
    let extCount = currentChar.info.npcsEspeciaisList.filter(n => n.origem === 'Extra-Narrada').length;
    let origem = "Evento";
    if (domCount < 3) origem = "Dominação";
    else if (extCount < 3) origem = "Extra-Narrada";
    currentChar.info.npcsEspeciaisList.push({nome: "", origem: origem, sexo: "Masculino", pontos: "", classe: "", classe2: "", classe3: ""});
    saveData(); renderNpcsEspeciais(); updateUI(); toggleEditability();
}
function removeNpcEspecial(idx) {
    currentChar.info.npcsEspeciaisList.splice(idx, 1);
    saveData(); renderNpcsEspeciais(); updateUI(); toggleEditability();
}
function updateNpcEspecial(idx, field, val) {
    let n = currentChar.info.npcsEspeciaisList[idx];
    let oldOrigem = n.origem;
    n[field] = val;
    
    if (field === 'origem') {
        let domCount = currentChar.info.npcsEspeciaisList.filter(x => x.origem === 'Dominação').length;
        let extCount = currentChar.info.npcsEspeciaisList.filter(x => x.origem === 'Extra-Narrada').length;
        if (val === 'Dominação' && domCount > 3) {
            n.origem = oldOrigem;
            customAlert("Limite de 3 NPCs de Dominação atingido!");
        } else if (val === 'Extra-Narrada' && extCount > 3) {
            n.origem = oldOrigem;
            customAlert("Limite de 3 NPCs de Extra-Narrada atingido!");
        }
    }
    
    if (field === 'origem' || field === 'pontos' || field.startsWith('classe')) {
        renderNpcsEspeciais();
    }
    saveData(); updateUI();
}
function renderNpcsEspeciais() {
    const container = document.getElementById('npcs-especiais-container');
    if(!container) return;
    let list = currentChar.info.npcsEspeciaisList || [];
    let domCount = list.filter(n => n.origem === 'Dominação').length;
    let extCount = list.filter(n => n.origem === 'Extra-Narrada').length;
    let elDom = document.getElementById('count-npc-dom'); if(elDom) elDom.textContent = domCount;
    let elExt = document.getElementById('count-npc-ext'); if(elExt) elExt.textContent = extCount;

    let finalHtml = '';
    list.forEach((n, idx) => {
        let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
        let pts = parseInt(cleanPtsStr) || 0;
        let cHTML = (slotId, reqPts, prevSlots) => {
            if (pts < reqPts) return `<select disabled style="flex:1; font-size:10px;"><option>🔒 Req ${reqPts.toLocaleString('pt-BR')}</option></select>`;
            let counts = {};
            baseClassesList.forEach(c => counts[c] = 1);
            prevSlots.forEach(p => {
                if(n[p]) { let match = n[p].match(/(.+) (\d+)/); if(match) counts[match[1]] = Math.max(counts[match[1]], parseInt(match[2]) + 1); }
            });
            let html = `<select onchange="updateNpcEspecial(${idx}, '${slotId}', this.value)" style="flex:1; font-size:10px;"><option value="">-- Classe --</option>`;
            baseClassesList.forEach(c => {
                if(counts[c] <= 3) {
                    html += `<option value="${c} ${counts[c]}" ${n[slotId] === c+' '+counts[c] ? 'selected' : ''}>${c} ${counts[c]}</option>`;
                }
            });
            if (n[slotId] && !html.includes(`value="${n[slotId]}"`)) { html += `<option value="${n[slotId]}" selected>${n[slotId]}</option>`; }
            html += `</select>`;
            return html;
        };

        finalHtml += `
            <div style="background: rgba(0,0,0,0.3); padding: 5px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 5px; display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; gap: 5px; align-items: center;">
                    <input type="text" placeholder="Nome" value="${n.nome || ''}" oninput="updateNpcEspecial(${idx}, 'nome', this.value)" style="flex: 2;">
                    <select onchange="updateNpcEspecial(${idx}, 'sexo', this.value)" style="width: 60px;">
                        <option value="Masculino" ${n.sexo !== 'Feminino' ? 'selected' : ''}>Masc</option>
                        <option value="Feminino" ${n.sexo === 'Feminino' ? 'selected' : ''}>Fem</option>
                    </select>
                    <select onchange="updateNpcEspecial(${idx}, 'origem', this.value)" style="flex: 1;">
                        <option value="Dominação" ${n.origem === 'Dominação' ? 'selected' : ''}>Dominação</option>
                        <option value="Evento" ${n.origem === 'Evento' ? 'selected' : ''}>Evento</option>
                        <option value="Extra-Narrada" ${n.origem === 'Extra-Narrada' ? 'selected' : ''}>Extra-Narrada</option>
                    </select>
                    <input type="text" placeholder="Pontos" value="${cleanPtsStr ? pts.toLocaleString('pt-BR') : ''}" oninput="formatNpcNumber(this)" onchange="updateNpcEspecial(${idx}, 'pontos', this.value.replace(/\\D/g, ''))" style="width: 80px;">
                    <button type="button" class="btn btn-outline btn-danger" style="padding: 2px 6px; font-size: 10px; margin: 0;" onclick="removeNpcEspecial(${idx})">X</button>
                </div>
                <div style="display: flex; gap: 5px;">
                    ${cHTML('classe', 0, [])}
                    ${cHTML('classe2', 5000, ['classe'])}
                    ${cHTML('classe3', 10000, ['classe', 'classe2'])}
                </div>
            </div>
        `;
    });
    container.innerHTML = finalHtml;
}

function addTecnica() {
    currentChar.tecnicasList.push({nome: "", desc: "", efeito: "", estilo: "", naoTreinada: false});
    saveData();
    renderTecnicas();
    updateUI();
    toggleEditability();
}

window.cloneTecnica = function(idx) {
    if(isReadOnly) return;
    let obj = currentChar.tecnicasList[idx];
    currentChar.tecnicasList.splice(idx + 1, 0, JSON.parse(JSON.stringify(obj)));
    saveData();
    renderTecnicas();
    updateUI();
    toggleEditability();
};

function removeTecnica(idx) {
    currentChar.tecnicasList.splice(idx, 1);
    saveData();
    renderTecnicas();
    updateUI();
    toggleEditability();
}

function updateTecnica(idx, field, val) {
    currentChar.tecnicasList[idx][field] = val;
    saveData();
    updateUI();
}

function changeOrdemTecnicas(val) {
    currentChar.info.ordemTecnicas = val;
    if (val === 'alfabetica') {
        currentChar.tecnicasList.sort((a, b) => {
            let nA = (a.nome || "").trim().toLowerCase();
            let nB = (b.nome || "").trim().toLowerCase();
            return nA.localeCompare(nB);
        });
        renderTecnicas();
    } else if (val === 'estilo') {
        let i = currentChar.info;
        let availableStylesMap = {};
        if (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink") || (currentChar.isNPC && i.raca === 'Outra')) availableStylesMap["Electro"] = "Electro";
        if (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome.trim() !== "") availableStylesMap["Akuma"] = i.akumaNome;
        [1, 2, 3, 4].forEach(n => {
            let st = i['estilo'+n];
            if (st && st !== "Nenhum") {
                let dName = st === "Freestyle" ? (i['freestyle'+n] && i['freestyle'+n].trim() !== "" ? i['freestyle'+n] : "Freestyle") : st;
                availableStylesMap['estilo'+n] = dName;
            }
        });

        currentChar.tecnicasList.sort((a, b) => {
            if (a.estilo === "Akuma" && b.estilo !== "Akuma") return 1;
            if (b.estilo === "Akuma" && a.estilo !== "Akuma") return -1;
            
            let stA = a.estilo ? (availableStylesMap[a.estilo] || a.estilo) : "Sem Estilo";
            let stB = b.estilo ? (availableStylesMap[b.estilo] || b.estilo) : "Sem Estilo";
            
            if (stA === "Sem Estilo" && stB !== "Sem Estilo") return 1;
            if (stB === "Sem Estilo" && stA !== "Sem Estilo") return -1;

            let cmp = stA.localeCompare(stB);
            if (cmp !== 0) return cmp;

            let nA = (a.nome || "").trim().toLowerCase();
            let nB = (b.nome || "").trim().toLowerCase();
            return nA.localeCompare(nB);
        });
        renderTecnicas();
    }
    saveData();
    updateUI();
}

function moveTecnica(idx, dir) {
    if (currentChar.info.ordemTecnicas === 'alfabetica' || currentChar.info.ordemTecnicas === 'estilo') {
        currentChar.info.ordemTecnicas = 'manual';
        let selectOrdem = document.getElementById('info-ordemTecnicas');
        if (selectOrdem) selectOrdem.value = 'manual';
    }
    if (dir === -1 && idx > 0) {
        let temp = currentChar.tecnicasList[idx];
        currentChar.tecnicasList[idx] = currentChar.tecnicasList[idx - 1];
        currentChar.tecnicasList[idx - 1] = temp;
    } else if (dir === 1 && idx < currentChar.tecnicasList.length - 1) {
        let temp = currentChar.tecnicasList[idx];
        currentChar.tecnicasList[idx] = currentChar.tecnicasList[idx + 1];
        currentChar.tecnicasList[idx + 1] = temp;
    }
    saveData();
    renderTecnicas();
    updateUI();
}

function renderTecnicas() {
    const container = document.getElementById('tecnicas-container');
    container.innerHTML = '';
    let i = currentChar.info;
    let availableStyles = [];
    let isMink = (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink") || (currentChar.isNPC && i.raca === 'Outra'));
    if (isMink) availableStyles.push({ id: "Electro", name: "Electro" });
    if (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome.trim() !== "") availableStyles.push({ id: "Akuma", name: i.akumaNome });
    [1, 2, 3, 4].forEach(n => {
        let st = i['estilo'+n];
        if (st && st !== "Nenhum") {
            let dName = st;
            if (st === "Freestyle") dName = (i['freestyle'+n] && i['freestyle'+n].trim() !== "") ? i['freestyle'+n] : "Freestyle";
            availableStyles.push({ id: 'estilo'+n, name: dName });
        }
    });

    currentChar.tecnicasList.forEach((t, idx) => {
        let styleOptions = '<option value="">-- Sem Estilo --</option>';
        availableStyles.forEach(st => {
            styleOptions += `<option value="${st.id}" ${t.estilo === st.id ? 'selected' : ''}>${st.name}</option>`;
        });

        container.innerHTML += `
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 5px; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <label style="color:var(--info); margin:0;">Técnica ${idx + 1}</label>
                        <label style="display:flex; align-items:center; gap:4px; font-size:10px; color:var(--danger); cursor:pointer; margin:0; text-transform:none; font-weight:normal;">
                            <input type="checkbox" onchange="updateTecnica(${idx}, 'naoTreinada', this.checked)" ${t.naoTreinada ? 'checked' : ''} style="width:auto; margin:0; cursor:pointer;"> Não Treinada
                        </label>
                    </div>
                    <div style="display:flex; gap: 5px;">
                        <button type="button" class="btn btn-outline" style="color:var(--info); border-color:var(--info); font-size:10px; padding:2px 6px;" onclick="cloneTecnica(${idx})">Clonar</button>
                        <button type="button" class="btn btn-outline" style="font-size:10px; padding:2px 6px;" onclick="moveTecnica(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>⬆️</button>
                        <button type="button" class="btn btn-outline" style="font-size:10px; padding:2px 6px;" onclick="moveTecnica(${idx}, 1)" ${idx === currentChar.tecnicasList.length - 1 ? 'disabled' : ''}>⬇️</button>
                        <button type="button" class="btn btn-outline" style="color:var(--danger); border-color:var(--danger); font-size:10px; padding:2px 6px;" onclick="removeTecnica(${idx})">Remover</button>
                    </div>
                </div>
                <select onchange="updateTecnica(${idx}, 'estilo', this.value)" style="margin-bottom:5px; background-color:#222; border:1px solid #555; color:var(--text); padding:4px; font-size:11px; border-radius:4px;">
                    ${styleOptions}
                </select>
                <textarea placeholder="Nome da Técnica (Ex: Golpe Rápido)" oninput="updateTecnica(${idx}, 'nome', this.value)" style="min-height:38px; margin-bottom:5px; text-align:justify; padding-top:8px;">${t.nome}</textarea>
                <textarea placeholder="Descrição da Técnica" oninput="updateTecnica(${idx}, 'desc', this.value)" style="min-height:50px; margin-bottom:5px; text-align:justify;">${t.desc}</textarea>
                <textarea placeholder="Efeito / Buff (Ex: Perde 10% de Res)" oninput="updateTecnica(${idx}, 'efeito', this.value)" style="min-height:38px; text-align:justify; padding-top:8px;">${t.efeito}</textarea>
            </div>
        `;
    });

    if (currentChar.tecnicasList && currentChar.tecnicasList.length > 0) {
        container.innerHTML += `<button type="button" class="btn btn-outline btn-success" style="width: 100%; margin-bottom: 5px; margin-top: 5px; font-size: 12px; padding: 6px;" onclick="addTecnica()">+ Adicionar Entrada</button>`;
    }

    setTimeout(() => {
        container.querySelectorAll('textarea').forEach(ta => {
            ta.style.height = 'auto';
            ta.style.height = (ta.scrollHeight) + 'px';
        });
    }, 10);
}

function addLog() {
    currentChar.logList.push({titulo: "", conteudo: ""});
    saveData();
    renderLogs();
    updateUI();
    toggleEditability();
}

function removeLog(idx) {
    currentChar.logList.splice(idx, 1);
    saveData();
    renderLogs();
    updateUI();
    toggleEditability();
}

function updateLog(idx, field, val) {
    currentChar.logList[idx][field] = val;
    saveData();
    updateUI();
}

function renderLogs() {
    const container = document.getElementById('logs-container');
    container.innerHTML = '';
    currentChar.logList.forEach((l, idx) => {
        container.innerHTML += `
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border: 1px dashed #555; border-radius: 6px; margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 5px;">
                    <label style="color:var(--warning);">Entrada ${idx + 1}</label>
                    <button type="button" class="btn btn-outline" style="color:var(--danger); border-color:var(--danger); font-size:10px; padding:2px 6px;" onclick="removeLog(${idx})">Remover</button>
                </div>
                <input type="text" placeholder="Ex: Semana 1 (Semana Normal [09/02/2026 – 15/02/2026])" value="${l.titulo}" oninput="updateLog(${idx}, 'titulo', this.value)" style="margin-bottom:5px;">
                <textarea placeholder="- Auto-narrada [฿50.000.000 | 250 pontos]\n- Interação [300 pontos | 2 treinos de técnicas]\n- Recrutar NPCs [Humanos: 25 NPCs]\n- Trabalho [Tipo 1: ฿30.000.000]\n- Treino de Técnicas [150 pontos | 6 treinos de técnicas]\n- Treino Padrão [250 pontos]" oninput="updateLog(${idx}, 'conteudo', this.value)" style="min-height:80px;">${l.conteudo}</textarea>
            </div>
        `;
    });

    if (currentChar.logList && currentChar.logList.length > 0) {
        container.innerHTML += `<button type="button" class="btn btn-outline btn-success" style="width: 100%; margin-top: 5px; font-size: 12px; padding: 6px;" onclick="addLog()">+ Adicionar Entrada</button>`;
    }
}

window.toggleAlcunhaCondicao = function(condName) {
    if(isReadOnly) return;
    if(!currentChar.info.alcunhaCondicoes) currentChar.info.alcunhaCondicoes = {};
    currentChar.info.alcunhaCondicoes[condName] = !currentChar.info.alcunhaCondicoes[condName];
    saveData(); updateUI();
};

let editingAlcunhaOldName = "";

function openAlcunhaModal() {
    if(isReadOnly) return;
    editingAlcunhaOldName = "";
    document.getElementById('modal-alcunha-title').innerText = 'Criar Nova Alcunha';
    document.getElementById('alcunha-nome').value = '';
    document.getElementById('alcunha-has-buff').checked = false;
    document.getElementById('alcunha-buffs-container').style.display = 'none';
    document.getElementById('alcunha-buffs-list').innerHTML = '';
    document.getElementById('btn-delete-alcunha').style.display = 'none';
    document.getElementById('modal-alcunha').style.display = 'flex';
}

function editAlcunhaModal() {
    if(isReadOnly || !currentChar.info.alcunhasList || currentChar.info.alcunhasList.length === 0 || !currentChar.info.alcunhaAtiva) return;
    let ativa = currentChar.info.alcunhasList.find(a => a.nome === currentChar.info.alcunhaAtiva);
    if(!ativa) return;
    
    editingAlcunhaOldName = ativa.nome;
    document.getElementById('modal-alcunha-title').innerText = 'Editar Alcunha';
    document.getElementById('alcunha-nome').value = ativa.nome;
    document.getElementById('alcunha-buffs-list').innerHTML = '';
    
    if (ativa.buffs && ativa.buffs.length > 0) {
        document.getElementById('alcunha-has-buff').checked = true;
        document.getElementById('alcunha-buffs-container').style.display = 'block';
        ativa.buffs.forEach(b => {
            addAlcunhaBuffRow();
            let rows = document.getElementById('alcunha-buffs-list').children;
            let lastRow = rows[rows.length - 1];
            lastRow.querySelector('.buff-stat').value = b.stat;
            lastRow.querySelector('.buff-type').value = b.type;
            lastRow.querySelector('.buff-val').value = b.val;
            lastRow.querySelector('.buff-cond').value = b.cond || "";
        });
    } else {
        document.getElementById('alcunha-has-buff').checked = false;
        document.getElementById('alcunha-buffs-container').style.display = 'none';
    }
    
    document.getElementById('btn-delete-alcunha').style.display = 'inline-block';
    document.getElementById('modal-alcunha').style.display = 'flex';
}

function addAlcunhaBuffRow() {
    const list = document.getElementById('alcunha-buffs-list');
    const row = document.createElement('div');
    row.style.display = 'flex'; row.style.gap = '5px'; row.style.marginBottom = '5px';
    row.innerHTML = `
        <select class="buff-stat" style="flex:2; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;">
            <optgroup label="Atributos"><option value="tudoAttr">Todos os Atributos</option><option value="d">Destreza</option><option value="f">Força</option><option value="r">Resistência</option><option value="v">Velocidade</option><option value="refl">Reflexo</option><option value="vcorp">Vel. Corporal</option><option value="vAgua">Velocidade (Água)</option><option value="reflAgua">Reflexo (Água)</option><option value="vcorpAgua">Vel. Corporal (Água)</option></optgroup>
            <optgroup label="Espírito"><option value="tudoEsp">Todo o Espírito</option><option value="esp">Espírito</option><option value="ha">Armamento</option><option value="ho">Observação</option><option value="hr">Rei</option></optgroup>
            <optgroup label="Akuma no Mi"><option value="tudoAmi">Toda a Akuma</option><option value="amiAlc">Alcance</option><option value="amiDur">Durabilidade</option><option value="amiPot">Potência</option><option value="amiVel">Velocidade</option><option value="amiDesp">Despertar</option></optgroup>
            <optgroup label="Combate"><option value="dano">Dano</option><option value="ignRes">Ignorar Resistência</option><option value="ignDanoGeral">Ignorar Dano Geral</option><option value="ignDanoAmi">Ignorar Dano Akuma</option><option value="redEstamina">Redução de Estamina</option></optgroup>
        </select>
        <select class="buff-type" style="flex:1; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;">
            <option value="pct">% (+X%)</option>
            <option value="flat">Pts (+X)</option>
        </select>
        <input type="number" class="buff-val" placeholder="Qtd" style="flex:1; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;" oninput="if(this.parentElement.querySelector('.buff-type').value === 'pct' && this.value > 100) this.value = 100;">
        <input type="text" class="buff-cond" placeholder="Condição (Vazio = Fixo)" style="flex:2; font-size:11px; padding:4px; background:#2a2a2a; border:1px solid #444; color:#fff; border-radius:4px;" title="Se preencher, ativará apenas ligando o botão na tela inicial.">
        <button class="btn btn-outline btn-danger" style="padding:2px 6px; font-size:10px; margin:0;" onclick="this.parentElement.remove()">X</button>
    `;
    list.appendChild(row);
}

function saveAlcunha() {
    let nome = document.getElementById('alcunha-nome').value.trim();
    if(!nome) return;
    let hasBuff = document.getElementById('alcunha-has-buff').checked;
    let buffs = [];
    if(hasBuff) {
        document.querySelectorAll('#alcunha-buffs-list > div').forEach(row => {
            let stat = row.querySelector('.buff-stat').value;
            let type = row.querySelector('.buff-type').value;
            let val = parseInt(row.querySelector('.buff-val').value) || 0;
            let cond = row.querySelector('.buff-cond').value.trim();
            if (type === 'pct' && val > 100) val = 100;
            if(val !== 0) buffs.push({stat, type, val, cond});
        });
    }
    if(!currentChar.info.alcunhasList) currentChar.info.alcunhasList = [];
    
    if (editingAlcunhaOldName !== "") {
        let idx = currentChar.info.alcunhasList.findIndex(a => a.nome === editingAlcunhaOldName);
        if (idx !== -1) {
            currentChar.info.alcunhasList[idx] = {nome, buffs};
        }
    } else {
        currentChar.info.alcunhasList.push({nome, buffs});
    }
    
    currentChar.info.alcunhaAtiva = nome;
    document.getElementById('modal-alcunha').style.display = 'none';
    saveData(); updateUI();
}

function deleteAlcunha() {
    if(isReadOnly || !currentChar.info.alcunhasList || currentChar.info.alcunhasList.length === 0 || !currentChar.info.alcunhaAtiva) return;
    let targetName = editingAlcunhaOldName || currentChar.info.alcunhaAtiva;
    currentChar.info.alcunhasList = currentChar.info.alcunhasList.filter(a => a.nome !== targetName);
    currentChar.info.alcunhaAtiva = currentChar.info.alcunhasList.length > 0 ? currentChar.info.alcunhasList[0].nome : "";
    document.getElementById('modal-alcunha').style.display = 'none';
    saveData(); updateUI();
}

function populateSelects() {}

function customConfirm(msg) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('custom-prompt-overlay');
        const msgEl = document.getElementById('custom-prompt-msg');
        const inputEl = document.getElementById('custom-prompt-input');
        const btnOk = document.getElementById('custom-prompt-ok');
        const btnCancel = document.getElementById('custom-prompt-cancel');

        msgEl.textContent = msg;
        inputEl.style.display = 'none';
        btnOk.textContent = 'Sim';
        btnCancel.textContent = 'Não';
        
        overlay.style.display = 'flex';
        btnOk.focus();

        const cleanup = () => {
            overlay.style.display = 'none';
            inputEl.style.display = 'block';
            btnOk.textContent = 'Confirmar';
            btnCancel.textContent = 'Cancelar';
            btnOk.onclick = null;
            btnCancel.onclick = null;
        };

        btnOk.onclick = () => { cleanup(); resolve(true); };
        btnCancel.onclick = () => { cleanup(); resolve(false); };
    });
}

window.handleRacaChange = async function(field, val) {
    if (isReadOnly) return;
    if (val === "Kuja") {
        let conf = await customConfirm("Todas as Kuja são obrigatoriamente mulheres cisgênero. Você tem certeza que deseja escolher essa raça?");
        if (!conf) {
            updateUI();
            return;
        }
        currentChar.info.sexo = "Feminino";
        currentChar.info.genero = "Mulher";
    }
    updateField('info', field, val);
    
    if (currentChar.info.idade) {
        let currentIdadeStr = String(currentChar.info.idade).replace(/\D/g, '');
        if (currentIdadeStr) {
            let currentAge = parseInt(currentIdadeStr, 10);
            let baseExp = 100;
            let calcExp = baseExp;
            if (val === "Gigante") calcExp = baseExp * 4;
            else if (["Meio-Gigante", "Wotan", "Bucaneiro", "Lunariano", "Oni"].includes(val)) calcExp = baseExp * 2;
            let expFinal = currentChar.info.expectativaVidaOverride || calcExp;
            
            if (currentAge > expFinal) {
                currentChar.info.idade = expFinal + " anos";
                saveData();
                updateUI();
            }
        }
    }
    
    toggleEditability();
};

function updateField(category, field, value) { 
    if (category === 'name') { 
        currentChar.name = value || ""; 
        renderTabs();
    } else { 
        currentChar[category][field] = value; 
    } 
    
    saveData(); updateUI(); 
    if (field.startsWith('estilo') || field.startsWith('freestyle') || field === 'raca' || field === 'raca2' || field === 'linhagem') renderTecnicas();
}

function formatAltura(val) {
    let clean = val.replace(',', '.').trim();
    let isCm = clean.toLowerCase().includes('cm');
    let num = parseFloat(clean.replace(/[^\d.]/g, ''));
    
    if (isNaN(num)) { 
        updateField('info', 'altura', ""); 
        return; 
    }
    
    if (isCm || (!clean.includes('.') && num >= 100)) {
        num = num / 100;
    }
    
    if (!currentChar.isNPC && num > 65) {
        num = 65;
    }
    
    let formatted = "";
    if (num < 1 && num > 0) {
        formatted = Math.round(num * 100) + "cm";
    } else {
        formatted = num.toLocaleString('pt-BR') + "m";
    }
    
    updateField('info', 'altura', formatted);
}

window.formatExpectativa = function(val) {
    if (!isSuperAdmin) return;
    let num = parseInt(val.replace(/\D/g, ''));
    if (isNaN(num)) num = 0;
    currentChar.info.expectativaVidaOverride = num;
    let ageStr = String(currentChar.info.idade).replace(/\D/g, '');
    if (ageStr) {
        let currentAge = parseInt(ageStr, 10);
        if (currentAge > num && num > 0) {
            currentChar.info.idade = num + " anos";
        }
    }
    saveData();
    updateUI();
};

function formatIdade(val) {
    let digits = val.replace(/\D/g, "");
    if (!digits) { updateField('info', 'idade', ""); return; }
    let age = parseInt(digits, 10);
    
    if (!currentChar.isNPC && age < 15) {
        age = 15;
    }

    let i = currentChar.info;
    let baseExp = 100;
    let calcExp = baseExp;
    if (i.raca === "Gigante") calcExp = baseExp * 4;
    else if (["Meio-Gigante", "Wotan", "Bucaneiro", "Lunariano", "Oni"].includes(i.raca)) calcExp = baseExp * 2;
    let expFinal = i.expectativaVidaOverride || calcExp;

    if (age > expFinal) {
        age = expFinal;
        customAlert("A idade máxima para esta raça é " + expFinal + " anos.");
    }
    
    let textoIdade = age === 1 ? " ano" : " anos";
    updateField('info', 'idade', age + textoIdade);
}

function formatAmiAlcMult(el) {
    let val = el.value.replace(',', '.').trim();
    val = val.replace(/[^0-9.]/g, '');
    if (val !== '') {
        val = val + 'x';
    }
    el.value = val;
    currentChar.info.amiAlcMult = val;
    saveData();
    updateUI();
}

async function handlePatenteChange(val) {
    currentChar.info.patente = val;
    if (val !== "" && typeof salarios[val] !== 'undefined') {
        let baseSalario = salarios[val];
        if (currentChar.info.orgTipo === "Marinha" && currentChar.info.linhagem === "Kong") {
            baseSalario += 50000000;
        }
        currentChar.info.salario = baseSalario === 0 ? "0" : baseSalario.toLocaleString("pt-BR");
    } else {
        currentChar.info.salario = "";
    }
    saveData(); updateUI();
}

function formatAndSave(category, field, el) {
    let cleanVal = el.value.replace(/\D/g, ""); let num = cleanVal ? parseInt(cleanVal, 10) : 0;
    currentChar[category][field] = num;
    let formatted = cleanVal ? num.toLocaleString("pt-BR") : "";
    if (el.value !== formatted) {
        let cursor = el.selectionStart; let oldLength = el.value.length; 
        el.value = formatted;
        let newLength = el.value.length; try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    }
    saveData(); updateUI();
}

function formatCurrency(category, field, el) {
    let cleanVal = el.value.replace(/\D/g, "");
    let num = cleanVal ? parseInt(cleanVal, 10) : "";
    currentChar[category][field] = num;
    let formatted = cleanVal ? num.toLocaleString("pt-BR") : "";
    if (el.value !== formatted) {
        let cursor = el.selectionStart; let oldLength = el.value.length; 
        el.value = formatted;
        let newLength = el.value.length; try { el.setSelectionRange(cursor + (newLength - oldLength), cursor + (newLength - oldLength)); } catch(e){}
    }
    saveData(); updateUI();
}

function formatPhone(el) {
    let v = el.value.replace(/\D/g, "").substring(0, 11);
    if (v.length > 2 && v[2] !== '9') {
        v = v.substring(0, 2) + '9' + v.substring(2);
        v = v.substring(0, 11);
    }
    let res = v;
    if (v.length > 2) res = "(" + v.substring(0, 2) + ") " + v.substring(2);
    if (v.length > 7) res = res.substring(0, 10) + "-" + res.substring(10);
    el.value = res;
    currentChar.info.telefone = res;
    saveData();
}

function strCalc(base, bonus, flat = 0, itemBonus = 0, itemFlat = 0, zoanBonus = 0) {
    let passive = Math.round((base + flat) * (1 + bonus)); 
    let parts = [base.toLocaleString("pt-BR")];
    if (flat !== 0) parts.push(`${flat >= 0 ? "+" : ""}${flat.toLocaleString("pt-BR")}`);
    if (bonus !== 0) parts.push(`${bonus >= 0 ? "+" : ""}${(bonus * 100).toFixed(0)}%`);
    
    let midStr = "";
    if (bonus === 0 && flat === 0) midStr = base.toLocaleString("pt-BR");
    else midStr = `${parts.join("")} = ${passive.toLocaleString("pt-BR")}`;

    let midValue = passive;
    if (zoanBonus !== 0) {
        let zoanBoost = Math.round(passive * (1 + zoanBonus));
        midStr += `${zoanBonus > 0 ? "+" : ""}${(zoanBonus * 100).toFixed(0)}% = ${zoanBoost.toLocaleString("pt-BR")}`;
        midValue = zoanBoost;
    }

    if (itemBonus === 0 && itemFlat === 0) {
        return midStr;
    }

    let active = Math.round((midValue + itemFlat) * (1 + itemBonus));
    let activeStr = midStr;
    
    if (itemFlat !== 0) activeStr += `${itemFlat >= 0 ? "+" : ""}${itemFlat.toLocaleString("pt-BR")}`;
    if (itemBonus !== 0) activeStr += `${itemBonus >= 0 ? "+" : ""}${(itemBonus * 100).toFixed(0)}%`;
    activeStr += ` = ${active.toLocaleString("pt-BR")}`;
    
    return activeStr;
}

function formatRaceStr(rName, aName, isFem) {
    if (!rName) return "";
    let res = rName.replace("Povo do Céu: ", "");
    if (isFem) {
        if (res === "Bucaneiro") res = "Bucaneira";
        else if (res === "Humano") res = "Humana";
        else if (res === "Lunariano") res = "Lunariana";
        else if (res === "Skypieano") res = "Skypiana";
        else if (res === "Sereiano") res = "Sereiana";
    }
    if (["Tritão", "Wotan", "Mink"].includes(rName)) {
        if (aName && aName.trim() !== "") res += `: ${aName.trim()}`;
    }
    return res;
}

function toggleAmi(field, isChecked) {
    let key = 'has' + field.charAt(0).toUpperCase() + field.slice(1);
    currentChar.info[key] = isChecked;
    if (!isChecked) {
        currentChar.substats[field] = 0;
        let el = document.getElementById('sub-' + field);
        if(el) el.value = "";
    }
    saveData();
    updateUI();
}

function toggleLayout() {
    charData.layoutMode = charData.layoutMode === 'vertical' ? 'desktop' : 'vertical';
    updateUI();
    saveData();
}

window.puxarDestrezaDano = async function() {
    if (currentChar.info.calcQuemAtaca === "inimigo") {
        await customAlert("Quando o inimigo ataca, insira o Atributo Físico dele manualmente.");
        return;
    }
    let val = document.getElementById('total-d').dataset.active;
    let el = document.getElementById('info-calcUseAttr');
    el.value = parseInt(val) || 0;
    el.dispatchEvent(new Event('input', { bubbles: true }));
};

window.puxarForcaDano = async function() {
    if (currentChar.info.calcQuemAtaca === "inimigo") {
        await customAlert("Quando o inimigo ataca, insira o Atributo Físico dele manualmente.");
        return;
    }
    let val = document.getElementById('total-f').dataset.active;
    let el = document.getElementById('info-calcUseAttr');
    el.value = parseInt(val) || 0;
    el.dispatchEvent(new Event('input', { bubbles: true }));
};

window.puxarResistenciaDano = async function() {
    if (currentChar.info.calcQuemAtaca === "eu") {
        await customAlert("Quando você ataca, insira a Resistência do inimigo manualmente.");
        return;
    }
    let val = document.getElementById('total-r').dataset.active;
    let el = document.getElementById('info-calcInimigoRes');
    el.value = parseInt(val) || 0;
    el.dispatchEvent(new Event('input', { bubbles: true }));
};

window.sofrerDano = async function() {
    if (isReadOnly) return;
    let rawDano = document.getElementById('calc-dano-final').textContent.replace(/\D/g, "");
    let dano = parseInt(rawDano) || 0;
    if (dano <= 0) return;

    let currentHp = parseInt(currentChar.info.hpAtual);
    if (isNaN(currentHp) || currentHp === -1) {
        currentHp = parseInt(document.getElementById('hp-total').textContent.replace(/\D/g, "")) || 0;
    }
    
    let newHp = currentHp - dano;
    if (newHp < 0) newHp = 0;
    
    currentChar.info.hpAtual = newHp;
    let elHp = document.getElementById('hp-atual');
    if (elHp) {
        elHp.value = newHp.toLocaleString('pt-BR');
    }
    saveData();
    updateUI();
};

function updateUI() {
    const container = document.querySelector('.container');
    const btn = document.getElementById('btn-layout');
    
    let oldMeta = document.querySelector('meta[name="viewport"]');
    if (oldMeta) oldMeta.remove();
    
    let newMeta = document.createElement('meta');
    newMeta.name = "viewport";

    if (charData.layoutMode === 'vertical') {
        container.classList.add('vertical-mode');
        document.body.classList.remove('pc-mode');
        newMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
        if (btn) btn.textContent = "🖥️Modo PC";
    } else {
        container.classList.remove('vertical-mode');
        document.body.classList.add('pc-mode');
        newMeta.content = "width=1400";
        if (btn) btn.textContent = "📱Modo Lista";
    }
    document.head.appendChild(newMeta);
    let i = currentChar.info;
    let isNPC = currentChar.isNPC;

    ['boxIden', 'boxMec', 'boxSoc', 'boxHab', 'boxBase', 'boxEsp', 'boxAmi', 'boxHist', 'boxLog', 'boxInv', 'boxTec', 'boxRes', 'boxCalc', 'boxEstamina'].forEach(id => {
        let wrapper = document.getElementById('wrapper-' + id);
        let icon = document.getElementById('icon-' + id);
        let titleBlock = document.getElementById('title-' + id);
        if (wrapper && icon && titleBlock) {
            if (i[id]) { 
                wrapper.style.display = 'none';
                icon.textContent = '◀';
                titleBlock.style.borderBottom = 'none';
                titleBlock.style.paddingBottom = '0';
            } else {
                wrapper.style.display = 'block';
                icon.textContent = '▼';
                titleBlock.style.borderBottom = '1px dashed #444';
                titleBlock.style.paddingBottom = '8px';
            }
        }
    });

    const noCharlotteRaces = ["Bucaneiro", "Lunariano", "Oni", "Meio-Gigante", "Wotan"];
    if (i.linhagem === "Charlotte") {
        if (noCharlotteRaces.includes(i.raca)) i.raca = "";
        if (noCharlotteRaces.includes(i.raca2)) i.raca2 = "";
    }

    let rHtml = '<option value="">-- Selecione --</option>';
    if (isNPC) rHtml += `<option value="Outra" ${i.raca === 'Outra' ? 'selected' : ''}>Outra...</option>`;
    for(let r in racas) {
        if (i.linhagem === "Charlotte" && noCharlotteRaces.includes(r)) continue;
        rHtml += `<option value="${r}">${r}</option>`;
    }
    let sRaca = document.getElementById('info-raca');
    if (sRaca.innerHTML !== rHtml) sRaca.innerHTML = rHtml;
    sRaca.value = i.raca;
    let boxCustom = document.getElementById('box-racaCustom');
    if (boxCustom) {
        if (isNPC && i.raca === 'Outra') {
            boxCustom.style.display = 'flex';
            document.getElementById('info-racaNomeCustom').value = i.racaNomeCustom || "";
            document.getElementById('info-customBuffF').value = i.customBuffF || "";
            document.getElementById('info-customBuffD').value = i.customBuffD || "";
            document.getElementById('info-customBuffR').value = i.customBuffR || "";
            document.getElementById('info-customBuffV').value = i.customBuffV || "";
        } else {
            boxCustom.style.display = 'none';
        }
    }
    let boxCustom2 = document.getElementById('box-racaCustom2');
    if (boxCustom2) {
        if (isNPC && i.linhagem === 'Charlotte' && i.raca2 === 'Outra') {
            boxCustom2.style.display = 'flex';
            document.getElementById('info-racaNomeCustom2').value = i.racaNomeCustom2 || "";
            document.getElementById('info-customBuffF2').value = i.customBuffF2 || "";
            document.getElementById('info-customBuffD2').value = i.customBuffD2 || "";
            document.getElementById('info-customBuffR2').value = i.customBuffR2 || "";
            document.getElementById('info-customBuffV2').value = i.customBuffV2 || "";
        } else {
            boxCustom2.style.display = 'none';
        }
    }

    let sRaca2 = document.getElementById('info-raca2');
    if (i.linhagem === "Charlotte") {
        sRaca2.style.display = "block";
        let r2Html = '<option value="">-- Selecione --</option>';
        if (isNPC) r2Html += `<option value="Outra" ${i.raca2 === 'Outra' ? 'selected' : ''}>Outra...</option>`;
        for(let r in racas) {
            if (noCharlotteRaces.includes(r)) continue;
            r2Html += `<option value="${r}">${r}</option>`;
        }
        if (sRaca2.innerHTML !== r2Html) sRaca2.innerHTML = r2Html;
        sRaca2.value = i.raca2;
    } else {
        sRaca2.style.display = "none";
    }

    let boxCharRacas = document.getElementById('box-charlotteRacas');
    if (boxCharRacas) {
        if (i.linhagem === "Charlotte") {
            boxCharRacas.style.display = "flex";
            let nomes = {d: "Destreza", f: "Força", r: "Resistência", v: "Velocidade"};
            let buildOpts = (racaName, suffix = "") => {
                let html = '<option value="">-- Escolher Buff --</option>';
                if (racaName === "Humano" || racaName === "Kuja") {
                    for (let s in nomes) html += `<option value="${s}">${nomes[s]} (+${racaName === "Kuja" && (s === "f" || s === "d") ? "30" : "20"}%)</option>`;
                } else if (racas[racaName]) {
                    for (let s in racas[racaName]) {
                        if (racas[racaName][s] > 0) {
                            html += `<option value="${s}">${nomes[s]} (+${(racas[racaName][s]*100).toFixed(0)}%)</option>`;
                        }
                    }
                } else if (isNPC && racaName === "Outra") {
                    let f = parseInt(i['customBuffF' + suffix]) || 0;
                    let d = parseInt(i['customBuffD' + suffix]) || 0;
                    let r = parseInt(i['customBuffR' + suffix]) || 0;
                    let v = parseInt(i['customBuffV' + suffix]) || 0;
                    if (f > 0) html += `<option value="f">${nomes["f"]} (+${f}%)</option>`;
                    if (d > 0) html += `<option value="d">${nomes["d"]} (+${d}%)</option>`;
                    if (r > 0) html += `<option value="r">${nomes["r"]} (+${r}%)</option>`;
                    if (v > 0) html += `<option value="v">${nomes["v"]} (+${v}%)</option>`;
                }
                return html;
            };

            let sC1 = document.getElementById('info-selCharR1');
            if (sC1) {
                let h1 = buildOpts(i.raca, "");
                if (sC1.innerHTML !== h1) sC1.innerHTML = h1;
                if (Array.from(sC1.options).some(o => o.value === i.selCharR1)) sC1.value = i.selCharR1; else { sC1.value = ""; i.selCharR1 = ""; }
            }

            let sC2 = document.getElementById('info-selCharR2');
            if (sC2) {
                let h2 = buildOpts(i.raca2, "2");
                if (sC2.innerHTML !== h2) sC2.innerHTML = h2;
                if (Array.from(sC2.options).some(o => o.value === i.selCharR2)) sC2.value = i.selCharR2; else { sC2.value = ""; i.selCharR2 = ""; }
            }
        } else {
            boxCharRacas.style.display = "none";
        }
    }

    let anim1 = document.getElementById('info-animal');
    if (["Tritão", "Wotan", "Mink"].includes(i.raca) || (isNPC && i.raca === 'Outra')) {
        anim1.style.display = "block"; anim1.placeholder = i.raca === "Mink" ? "Mamífero" : "Animal Marinho";
    } else { anim1.style.display = "none"; }

    let anim2 = document.getElementById('info-animal2');
    if (i.linhagem === "Charlotte" && (["Tritão", "Wotan", "Mink"].includes(i.raca2) || (isNPC && i.raca2 === 'Outra'))) {
        anim2.style.display = "block"; anim2.placeholder = i.raca2 === "Mink" ? "Mamífero" : "Animal Marinho";
    } else { anim2.style.display = "none"; }

    let baseExp = 100;
    let calcExp = baseExp;
    if (i.raca === "Gigante") calcExp = baseExp * 4;
    else if (["Meio-Gigante", "Wotan", "Bucaneiro", "Lunariano", "Oni"].includes(i.raca)) calcExp = baseExp * 2;
    let expFinal = i.expectativaVidaOverride || calcExp;

    let elExp = document.getElementById('info-expectativaVida');
    if (elExp) {
        let fmtExp = expFinal + " anos";
        if (elExp.value !== fmtExp && document.activeElement !== elExp) {
            elExp.value = fmtExp;
        }
    }

    let currentIdadeStr = String(i.idade).replace(/\D/g, '');
    if (currentIdadeStr) {
        let currentAge = parseInt(currentIdadeStr, 10);
        if (currentAge > expFinal) {
            i.idade = expFinal + " anos";
        }
    }

    let pcNameEl = document.getElementById('pc-name');
    if (pcNameEl && pcNameEl.value !== currentChar.name) pcNameEl.value = currentChar.name || "";
    
    const textFields = ['selClasseDF', 'selDF', 'selRV', 'selLinDF', 'selLinRV', 'selLin4', 'selLinEspAmi', 'altura', 'idade', 'sexo', 'genero', 'sangue', 'telefone', 'nacionalidade', 'localizacao', 'tripulacao', 'pirataStatus', 'akumaNome', 'personalidade', 'historia', 'aparencia', 'inventario', 'animal', 'animal2', 'calcUseAmi', 'calcUseHaki', 'calcUseHakiRei', 'amiAlcMult', 'ordemTecnicas', 'estaminaHakiArm', 'estaminaHakiObs'];
    textFields.forEach(f => { 
        let el = document.getElementById('info-'+f); 
        if(el) {
            let val = i[f] || "";
            if (el.value != val) el.value = val;
        }
    });

    const checkFields = ['unlockHA1', 'unlockHA2', 'unlockHA3', 'unlockHA4', 'unlockHA5', 'unlockHA6', 'unlockHO2', 'unlockHO3', 'unlockHO4', 'unlockHR2', 'unlockHR3', 'unlockHR4', 'unlockHR5', 'unlockHR6'];
    checkFields.forEach(f => { let el = document.getElementById('chk-'+f); if(el) el.checked = i[f] || false; });
    let elAliados = document.getElementById('info-aliadosEspiritoContagiante'); if (elAliados) elAliados.value = i.aliadosEspiritoContagiante || 0;
    let chkHideHist = document.getElementById('info-hideHistoria'); if (chkHideHist) chkHideHist.checked = i.hideHistoria || false;
    let chkHidePers = document.getElementById('hide-personality'); if (chkHidePers) chkHidePers.checked = i.hidePersonality || false;
    let chkHideSexo = document.getElementById('info-hideSexo'); if (chkHideSexo) chkHideSexo.checked = i.hideSexo || false;
    let chkHideGenero = document.getElementById('info-hideGenero'); if (chkHideGenero) chkHideGenero.checked = i.hideGenero || false;
    let chkExaustao = document.getElementById('info-exaustaoCompleta'); if (chkExaustao) chkExaustao.checked = i.exaustaoCompleta || false;
    
    let chkHideTecNome = document.getElementById('info-hideTecNome'); if (chkHideTecNome) chkHideTecNome.checked = i.hideTecNome || false;
    let chkHideTecDesc = document.getElementById('info-hideTecDesc'); if (chkHideTecDesc) chkHideTecDesc.checked = i.hideTecDesc || false;
    let chkHideTecEfeito = document.getElementById('info-hideTecEfeito'); if (chkHideTecEfeito) chkHideTecEfeito.checked = i.hideTecEfeito || false;
    let chkHideNaoTreinadas = document.getElementById('info-hideNaoTreinadas'); if (chkHideNaoTreinadas) chkHideNaoTreinadas.checked = i.hideNaoTreinadas || false;
    let chkShowApenasNaoTreinadas = document.getElementById('info-showApenasNaoTreinadas'); if (chkShowApenasNaoTreinadas) chkShowApenasNaoTreinadas.checked = i.showApenasNaoTreinadas || false;
    
    let hideStylesContainer = document.getElementById('hide-styles-container');
    if (hideStylesContainer) {
        let availableStylesToHide = [];
        let isMinkEstiloUI = (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink") || (currentChar.isNPC && i.raca === 'Outra'));
        if (isMinkEstiloUI) availableStylesToHide.push("Electro");
        if (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome.trim() !== "") availableStylesToHide.push(i.akumaNome);
        [1, 2, 3, 4].forEach(n => {
            let st = i['estilo'+n];
            if (st && st !== "Nenhum") {
                let dName = st === "Freestyle" ? (i['freestyle'+n] && i['freestyle'+n].trim() !== "" ? i['freestyle'+n] : "Freestyle") : st;
                availableStylesToHide.push(dName);
            }
        });
        let hiddenStylesHtml = '';
        if (!i.hiddenStyles) i.hiddenStyles = [];
        availableStylesToHide.forEach(stName => {
            let checked = i.hiddenStyles.includes(stName) ? 'checked' : '';
            hiddenStylesHtml += `<label style="margin:0; font-size:10px; color:#aaa; text-transform:none; cursor:pointer; display:flex; gap:5px; align-items:center;">
                <input type="checkbox" onchange="toggleHiddenStyle('${stName.replace(/'/g, "\\'")}', this.checked)" style="width:auto; margin:0;" ${checked}> Ocultar ${stName}
            </label>`;
        });
        hiddenStylesHtml += `<label style="margin:0; font-size:10px; color:#aaa; text-transform:none; cursor:pointer; display:flex; gap:5px; align-items:center;">
            <input type="checkbox" onchange="toggleHiddenStyle('Sem Estilo', this.checked)" style="width:auto; margin:0;" ${i.hiddenStyles.includes('Sem Estilo') ? 'checked' : ''}> Ocultar Sem Estilo
        </label>`;
        hideStylesContainer.innerHTML = hiddenStylesHtml;
    }

    let selAlcunha = document.getElementById('info-alcunha');
    if(selAlcunha) {
        let htmlAlc = '<option value="">-- Nenhuma --</option>';
        if(i.alcunhasList) { i.alcunhasList.forEach(a => { htmlAlc += `<option value="${a.nome}">${a.nome}</option>`; }); }
        if(selAlcunha.innerHTML !== htmlAlc) selAlcunha.innerHTML = htmlAlc;
        selAlcunha.value = i.alcunhaAtiva || "";
    }
    
    let condContainer = document.getElementById('alcunha-condicoes-container');
    if (condContainer) {
        let condHtml = '';
        if (i.alcunhasList && i.alcunhaAtiva) {
            let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
            if (ativa && ativa.buffs) {
                let uniqueConds = [...new Set(ativa.buffs.filter(b => b.cond && b.cond.trim() !== "").map(b => b.cond.trim()))];
                if (!i.alcunhaCondicoes) i.alcunhaCondicoes = {};
                uniqueConds.forEach(cond => {
                    let isActive = i.alcunhaCondicoes[cond];
                    let btnCor = isActive ? 'var(--success)' : '#444';
                    let btnTxt = isActive ? 'ON' : 'OFF';
                    condHtml += `<button type="button" class="btn btn-outline" style="padding: 2px 8px; font-size: 10px; margin: 0; color: ${btnCor}; border-color: ${btnCor};" onclick="toggleAlcunhaCondicao('${cond.replace(/'/g, "\\'")}')">${cond}: ${btnTxt}</button>`;
                });
            }
        }
        condContainer.innerHTML = condHtml;
    }

    let calcQuemAtacaEl = document.getElementById('info-calcQuemAtaca');
    if (calcQuemAtacaEl && calcQuemAtacaEl.value !== i.calcQuemAtaca) calcQuemAtacaEl.value = i.calcQuemAtaca || "eu";

    let calcAttrEl = document.getElementById('info-calcUseAttr');
    let fmtCalcAttr = i.calcUseAttr ? i.calcUseAttr.toLocaleString("pt-BR") : "";
    if(calcAttrEl && calcAttrEl.value !== fmtCalcAttr) calcAttrEl.value = fmtCalcAttr;

    let calcResEl = document.getElementById('info-calcInimigoRes');
    let fmtCalcRes = i.calcInimigoRes ? i.calcInimigoRes.toLocaleString("pt-BR") : "";
    if(calcResEl && calcResEl.value !== fmtCalcRes) calcResEl.value = fmtCalcRes;

    let calcResIgnEl = document.getElementById('info-calcResIgnorada');
    let fmtCalcResIgn = i.calcResIgnorada ? i.calcResIgnorada.toLocaleString("pt-BR") : "";
    if(calcResIgnEl && calcResIgnEl.value !== fmtCalcResIgn) calcResIgnEl.value = fmtCalcResIgn;

    let calcDanoIgnEl = document.getElementById('info-calcDanoIgnorado');
    let fmtCalcDanoIgn = i.calcDanoIgnorado ? i.calcDanoIgnorado.toLocaleString("pt-BR") : "";
    if(calcDanoIgnEl && calcDanoIgnEl.value !== fmtCalcDanoIgn) calcDanoIgnEl.value = fmtCalcDanoIgn;

    let calcDanoAmiIgnEl = document.getElementById('info-calcDanoAmiIgnorado');
    let fmtCalcDanoAmiIgn = i.calcDanoAmiIgnorado ? i.calcDanoAmiIgnorado.toLocaleString("pt-BR") : "";
    if(calcDanoAmiIgnEl && calcDanoAmiIgnEl.value !== fmtCalcDanoAmiIgn) calcDanoAmiIgnEl.value = fmtCalcDanoAmiIgn;

    let calcBuffFlatEl = document.getElementById('info-calcBuffFlat');
    let fmtCalcBuffFlat = i.calcBuffFlat ? i.calcBuffFlat.toLocaleString("pt-BR") : "";
    if(calcBuffFlatEl && calcBuffFlatEl.value !== fmtCalcBuffFlat) calcBuffFlatEl.value = fmtCalcBuffFlat;

    let calcBuffPctEl = document.getElementById('info-calcBuffPct');
    let fmtCalcBuffPct = i.calcBuffPct ? i.calcBuffPct.toLocaleString("pt-BR") : "";
    if(calcBuffPctEl && calcBuffPctEl.value !== fmtCalcBuffPct) calcBuffPctEl.value = fmtCalcBuffPct;

    let calcBuffDanoFinalPctEl = document.getElementById('info-calcBuffDanoFinalPct');
    let fmtCalcBuffDanoFinalPct = i.calcBuffDanoFinalPct ? i.calcBuffDanoFinalPct.toLocaleString("pt-BR") : "";
    if(calcBuffDanoFinalPctEl && calcBuffDanoFinalPctEl.value !== fmtCalcBuffDanoFinalPct) calcBuffDanoFinalPctEl.value = fmtCalcBuffDanoFinalPct;

    let amiPotBuffEl = document.getElementById('info-amiPotBuff');
    let fmtAmiPotBuff = i.amiPotBuff ? i.amiPotBuff.toLocaleString("pt-BR") : "";
    if(amiPotBuffEl && amiPotBuffEl.value !== fmtAmiPotBuff) amiPotBuffEl.value = fmtAmiPotBuff;

    let amiVelBuffEl = document.getElementById('info-amiVelBuff');
    let fmtAmiVelBuff = i.amiVelBuff ? i.amiVelBuff.toLocaleString("pt-BR") : "";
    if(amiVelBuffEl && amiVelBuffEl.value !== fmtAmiVelBuff) amiVelBuffEl.value = fmtAmiVelBuff;

    let chkAmiVelAtivo = document.getElementById('chk-amiVelAtivo');
    if(chkAmiVelAtivo) chkAmiVelAtivo.checked = i.amiVelAtivo || false;

    let amiResPctEl = document.getElementById('info-amiResPct');
    let fmtAmiResPct = i.amiResPct ? i.amiResPct.toLocaleString("pt-BR") : "";
    if(amiResPctEl && amiResPctEl.value !== fmtAmiResPct) amiResPctEl.value = fmtAmiResPct;

    let estVelEl = document.getElementById('info-estaminaVelocidade');
    let fmtEstVel = i.estaminaVelocidade ? i.estaminaVelocidade.toLocaleString("pt-BR") : "";
    if(estVelEl && estVelEl.value !== fmtEstVel) estVelEl.value = fmtEstVel;

    let estDanoEl = document.getElementById('info-estaminaDano');
    let fmtEstDano = i.estaminaDano ? i.estaminaDano.toLocaleString("pt-BR") : "";
    if(estDanoEl && estDanoEl.value !== fmtEstDano) estDanoEl.value = fmtEstDano;

    let estBuffPctEl = document.getElementById('info-estaminaBuffPct');
    let fmtEstBuffPct = i.estaminaBuffPct ? i.estaminaBuffPct.toLocaleString("pt-BR") : "";
    if(estBuffPctEl && estBuffPctEl.value !== fmtEstBuffPct) estBuffPctEl.value = fmtEstBuffPct;

    let recEl = document.getElementById('info-recompensa');
    let fmtRec = i.recompensa ? i.recompensa.toLocaleString("pt-BR") : "";
    if(recEl && recEl.value !== fmtRec) recEl.value = fmtRec;

    let recTravEl = document.getElementById('info-recompensaTravada');
    let fmtRecTrav = i.recompensaTravada ? i.recompensaTravada.toLocaleString("pt-BR") : "";
    if(recTravEl && recTravEl.value !== fmtRecTrav) recTravEl.value = fmtRecTrav;

    let elTreinos = document.getElementById('info-treinosAcumulados');
    let fmtTreinos = i.treinosAcumulados ? i.treinosAcumulados.toLocaleString("pt-BR") : "";
    if(elTreinos && elTreinos.value !== fmtTreinos) elTreinos.value = fmtTreinos;

    let berEl = document.getElementById('info-berries');
    if(isNPC && !isSuperAdmin && (!i.berries || i.berries === 0)) {
        if (berEl && berEl.value !== "Bloqueado") berEl.value = "Bloqueado";
    } else {
        let fmtBerries = i.berries ? i.berries.toLocaleString("pt-BR") : "";
        if(berEl && berEl.value !== fmtBerries) berEl.value = fmtBerries;
    }

    let D = currentChar.stats.d, F = currentChar.stats.f, R = currentChar.stats.r, V = currentChar.stats.v;
    let totalBase = D + F + R + V;

    let totalFinal = totalBase;
    let finalHA = 0, finalHO = 0, finalHR = 0;
    {
        let tempRc = i.raca, tempRc2 = i.raca2, tempLn = i.linhagem;
        if (tempLn !== "Nenhuma" && linhagens[tempLn] && linhagens[tempLn].req && !linhagens[tempLn].req.includes(tempRc) && !(currentChar.isNPC && tempRc === 'Outra')) tempLn = "";
        let tComb = 0;
        [i.classe, i.classe2, i.classe3, i.classe4, i.classe5].forEach(c => {
            if(c && c.startsWith("Combatente")) {
                let match = c.match(/Combatente (\d+)/);
                if(match) tComb = Math.max(tComb, parseInt(match[1]));
            }
        });
        let tBonus = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0};
        let tFlat = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0};
        if (i.alcunhasList && i.alcunhaAtiva) {
            let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
            if (ativa && ativa.buffs) {
                ativa.buffs.forEach(b => {
                    if (b.cond && (!i.alcunhaCondicoes || !i.alcunhaCondicoes[b.cond])) return;
                    let targets = [b.stat];
                    if (b.stat === "tudo" || b.stat === "tudoAttr") targets = ["d","f","r","v","refl","vcorp"];
                    else if (b.stat === "tudoEsp") targets = ["esp","ha","ho","hr"];
                    else if (b.stat === "tudoAmi") targets = ["amiAlc","amiDur","amiPot","amiVel","amiDesp"];
                    
                    targets.forEach(t => {
                        if(tBonus[t] !== undefined) {
                            if (b.type === "pct") tBonus[t] += (b.val / 100);
                            else tFlat[t] += b.val;
                        }
                    });
                });
            }
        }
        
        if(tComb > 0 && i.selClasseDF) { tBonus[i.selClasseDF] += tComb * 0.05; }
        if(tempLn !== "Charlotte") {
            if(racas[tempRc]) { tBonus.d += racas[tempRc].d || 0; tBonus.f += racas[tempRc].f || 0; tBonus.r += racas[tempRc].r || 0; tBonus.v += racas[tempRc].v || 0; }
            else if (currentChar.isNPC && tempRc === 'Outra') { tBonus.f += (parseInt(i.customBuffF) || 0) / 100; tBonus.d += (parseInt(i.customBuffD) || 0) / 100; tBonus.r += (parseInt(i.customBuffR) || 0) / 100; tBonus.v += (parseInt(i.customBuffV) || 0) / 100; }
            if(tempRc === "Humano") { tBonus[i.selDF] += 0.20; tBonus[i.selRV] += 0.20; } else if(tempRc === "Kuja") { tBonus[i.selDF] += 0.30; tBonus[i.selRV] += 0.15; } else if(tempRc === "Mink") { tBonus[i.selDF] += 0.10; }
        } else {
            let appChar = (rName, selVal, suffix = "") => {
                if (racas[rName]) { for (let s in racas[rName]) { if (racas[rName][s] < 0 && tBonus[s] !== undefined) tBonus[s] += racas[rName][s]; } }
                else if (currentChar.isNPC && rName === 'Outra') { tBonus.f += (parseInt(i['customBuffF' + suffix]) || 0) / 100; tBonus.d += (parseInt(i['customBuffD' + suffix]) || 0) / 100; tBonus.r += (parseInt(i['customBuffR' + suffix]) || 0) / 100; tBonus.v += (parseInt(i['customBuffV' + suffix]) || 0) / 100; }
                if (selVal && tBonus[selVal] !== undefined) {
                    if (rName === "Humano") tBonus[selVal] += 0.20;
                    else if (rName === "Kuja") tBonus[selVal] += (selVal === "f" || selVal === "d") ? 0.30 : 0.20;
                    else if (racas[rName] && racas[rName][selVal] > 0) tBonus[selVal] += racas[rName][selVal];
                }
            };
            appChar(tempRc, i.selCharR1); appChar(tempRc2, i.selCharR2, "2");
        }
        if(linhagens[tempLn]) {
            tBonus.d += linhagens[tempLn].d || 0; tBonus.f += linhagens[tempLn].f || 0; tBonus.r += linhagens[tempLn].r || 0; tBonus.v += linhagens[tempLn].v || 0; tBonus.esp += linhagens[tempLn].esp || 0; tBonus.ha += linhagens[tempLn].ha || 0; tBonus.ho += linhagens[tempLn].ho || 0; tBonus.hr += linhagens[tempLn].hr || 0;
            if(tempLn === "Barnum") { tBonus[i.selLinDF] += 0.10; tBonus[i.selLinRV] += 0.20; } else if(tempLn === "D.") { tBonus[i.selLin4] += 0.25; } else if(tempLn === "Gan") { tBonus[i.selLinDF] += 0.20; } else if(tempLn === "Kong") { tBonus[i.selLin4] += 0.20; } else if(tempLn === "Silvers") { tBonus[i.selLin4] += 0.15; } else if(tempLn === "Nico") { tBonus[i.selLinDF] += 0.10; tBonus[i.selLinRV] += 0.05; }
        }
        let habs = i.habilidadesExclusivas || [];
        let hHas = (hab) => habs.includes(hab);
        if(hHas("Arte da Esgrima")) { if(totalBase >= 15000) tBonus.d += 0.20; else if(totalBase >= 10000) tBonus.d += 0.15; else if(totalBase >= 5000) tBonus.d += 0.10; }
        if(hHas("Batedor de Carteiras")) { if(totalBase >= 15000) tBonus.d += 0.25; else if(totalBase >= 10000) tBonus.d += 0.20; else if(totalBase >= 5000) tBonus.d += 0.15; }
        if(hHas("Caminho do Atirador")) {
            if(totalBase >= 15000) tBonus.d += 0.15; else if(totalBase >= 10000) tBonus.d += 0.10; else if(totalBase >= 5000) tBonus.d += 0.05;
            if(i.habCaminhoAtiradorAtivo) { if(totalBase >= 15000) tBonus.d += 0.20; else if(totalBase >= 10000) tBonus.d += 0.15; else if(totalBase >= 5000) tBonus.d += 0.10; }
        }
        if(hHas("Constituição Única")) { tBonus.f += 0.10; tBonus.r += 0.15; }
        if(hHas("Contração Muscular")) { if(totalBase >= 10000) { tBonus.f += 0.20; tBonus.r += 0.20; } else if(totalBase >= 5000) { tBonus.f += 0.10; tBonus.r += 0.10; } }
        if(hHas("Espírito Contagiante")) {
            if(totalBase >= 15000) { tBonus.d += 0.15; tBonus.f += 0.15; tBonus.r += 0.15; tBonus.v += 0.15; }
            else if(totalBase >= 10000) { tBonus.d += 0.10; tBonus.f += 0.10; tBonus.r += 0.20; tBonus.v += 0.10; }
            else if(totalBase >= 5000) { tBonus.d += 0.05; tBonus.f += 0.05; tBonus.r += 0.05; tBonus.v += 0.05; }
        }
        if(hHas("Favoritismo Armista")) {
            let fav = i.habFavArmistaAtivo;
            let attrCh = i.habFavArmistaAttr === 'f' ? 'f' : 'd';
            if (totalBase >= 15000) {
                if (fav === "generica") { tBonus.f -= 0.90; tBonus.d -= 0.90; tBonus.r -= 0.90; tBonus.v -= 0.90; }
                else if (fav === "favorita") { tBonus.r += 0.10; tBonus[attrCh] += 0.10; }
                else if (fav === "criacao") { tBonus.r += 0.10; tBonus.v += 0.10; tBonus[attrCh] += 0.10; }
                else if (fav === "criacao_favorita") { tBonus.r += 0.25; tBonus.v += 0.25; }
            } else if (totalBase >= 10000) {
                if (fav === "favorita") { tBonus.r += 0.10; tBonus[attrCh] += 0.10; }
                else if (fav === "criacao") { tBonus.r += 0.10; tBonus.v += 0.10; tBonus[attrCh] += 0.10; }
            } else if (totalBase >= 5000) {
                if (fav === "favorita") { tBonus.r += 0.10; tBonus[attrCh] += 0.10; }
            }
        }
        if(hHas("Filho do Mar")) { if(totalBase >= 15000) { tBonus.r += 0.15; } else if(totalBase >= 10000) { tBonus.r += 0.10; } else if(totalBase >= 5000) { tBonus.r += 0.05; } }
        if(hHas("Flexibilidade")) { if(totalBase >= 10000) tBonus.v += 0.20; else if(totalBase >= 5000) tBonus.v += 0.10; }
        if(hHas("Fúria Ardente")) { let fA = i.habFuriaArdenteAttr || 'f'; if(totalBase >= 15000) tBonus[fA] += 0.15; else if(totalBase >= 10000) tBonus[fA] += 0.10; else if(totalBase >= 5000) tBonus[fA] += 0.05; }
        if(hHas("O Escolhido")) { if(totalBase >= 20000) { tBonus.ha += 0.15; tBonus.ho += 0.15; tBonus.hr += 0.15; } else if(totalBase >= 10000) { tBonus.ha += 0.10; tBonus.ho += 0.10; tBonus.hr += 0.10; } else if(totalBase >= 5000) { tBonus.ha += 0.05; tBonus.ho += 0.05; tBonus.hr += 0.05; } }
        if(tempLn === "Beckman" && i.linhagemBeckmanArma) { tBonus.v += 0.05; }
        if(hHas("Golpe de Retorno")) { let usos = i.habRetornoUso || 1; if(usos === 2) tBonus.r -= 0.10; else if(usos === 3) tBonus.r -= 0.20; }
        let qEsp = parseInt(i.aliadosEspiritoContagiante) || 0;
        if (qEsp > 0) { let bEsp = qEsp * 0.05; tBonus.d += bEsp; tBonus.f += bEsp; tBonus.r += bEsp; tBonus.v += bEsp; }
        for (let key in tBonus) { if (tBonus[key] > 1.0) tBonus[key] = 1.0; }
        if (i.exaustaoCompleta) { tBonus.d -= 0.20; tBonus.f -= 0.20; tBonus.r -= 0.20; tBonus.v -= 0.20; tBonus.esp -= 0.20; }
        totalFinal = Math.round((D + tFlat.d) * (1 + tBonus.d)) +
                     Math.round((F + tFlat.f) * (1 + tBonus.f)) +
                     Math.round((R + tFlat.r) * (1 + tBonus.r)) +
                     Math.round((V + tFlat.v) * (1 + tBonus.v));
        finalHA = Math.round(((currentChar.substats.hArm || 0) + tFlat.ha) * (1 + tBonus.ha));
        finalHO = Math.round(((currentChar.substats.hObs || 0) + tFlat.ho) * (1 + tBonus.ho));
        finalHR = Math.round(((currentChar.substats.hRei || 0) + tFlat.hr) * (1 + tBonus.hr));
    }

    let orgTipo = i.orgTipo || "";
    document.getElementById('info-orgTipo').value = orgTipo;
    let labelTripulacao = document.getElementById('label-tripulacao');
    if(orgTipo === "Pirata" || orgTipo === "Caçador de Recompensa") {
        document.getElementById('box-tripulacao').style.display = "block";
        document.getElementById('box-patente-salario').style.display = "none";
        if(labelTripulacao) labelTripulacao.textContent = orgTipo === "Pirata" ? "Nome da Tripulação" : "Nome do Grupo";
        let boxPirataStatus = document.getElementById('box-pirataStatus');
        if(boxPirataStatus) boxPirataStatus.style.display = orgTipo === "Pirata" ? "block" : "none";
        let boxRecTravada = document.getElementById('box-recompensaTravada');
        if(boxRecTravada) boxRecTravada.style.display = (orgTipo === "Pirata" && i.pirataStatus === "Shichibukai") ? "block" : "none";
        i.patente = ""; i.salario = "";
        let selPatente = document.getElementById('info-patente');
        if(selPatente) selPatente.value = "";
    } else if (orgTipo !== "") {
        document.getElementById('box-tripulacao').style.display = "none";
        let boxPirataStatus = document.getElementById('box-pirataStatus');
        if(boxPirataStatus) boxPirataStatus.style.display = "none";
        let boxRecTravada = document.getElementById('box-recompensaTravada');
        if(boxRecTravada) boxRecTravada.style.display = "none";
        document.getElementById('box-patente-salario').style.display = "flex";
        
        let currentPts = totalFinal;
        let modifier = 1.0;
        const racasDesvantagem = ["Oni", "Lunariano", "Wotan", "Tritão", "Sereiano", "Tontatta", "Povo do Céu: Birkan", "Povo do Céu: Shandia", "Povo do Céu: Skypieano", "Mink", "Meio-Gigante", "Gigante", "Três-Olhos", "Pernas Longas", "Braços Longos"];
        if (racasDesvantagem.includes(i.raca) || racasDesvantagem.includes(i.raca2) || i.linhagem === "D.") modifier = 1.1;

        if (orgTipo === "Marinha" && (!i.patente || i.patente === "")) i.patente = "Aprendiz";
        if (orgTipo === "Governo Mundial" && (!i.patente || i.patente === "")) i.patente = "Agente Judicial";
        if (orgTipo === "Vanguarda Popular Revolucionária" && (!i.patente || i.patente === "")) i.patente = "Iniciado";

        if (orgTipo === "Marinha") {
            if (i.linhagem === "Tenryūbito: Família Donquixote" || i.linhagem === "Tenryūbito: Família Figarland" || i.linhagem === "Sakazuki" || i.linhagem === "Kong" || i.linhagem === "Nefertari") modifier = 0.9;
        } else if (orgTipo === "Governo Mundial") {
            if (i.linhagem === "Nefertari") modifier = 1.1;
            if (i.linhagem === "Tenryūbito: Família Donquixote" || i.linhagem === "Tenryūbito: Família Figarland" || i.linhagem === "Sakazuki") modifier = 0.9;
        }

        const rankOrder = orgTipo === "Marinha" ? ["Aprendiz", "Recruta", "Cabo", "Sargento", "Tenente", "Comandante", "Capitão", "Comodoro", "Contra-Almirante", "Vice-Almirante", "Almirante", "Almirante-de-Frota"] : (orgTipo === "Governo Mundial" ? ["Agente Judicial", "CP-1", "CP-2", "CP-3", "CP-4", "CP-5", "CP-6", "CP-7", "CP-8", "CP-9", "CP-0"] : ["Iniciado", "Operador", "Infiltrador", "Soldado Revolucionário", "Coordenador De Operações", "Esquadrão", "Comandante Tático", "Capitão Tático", "Pilar", "Vice-Líder", "Eixo"]);

        let baseCurrentPatente = i.patente;
        if (orgTipo === "Vanguarda Popular Revolucionária") {
            if (i.patente.startsWith("Esquadrão de ")) baseCurrentPatente = "Esquadrão";
            else if (i.patente.startsWith("Comandante Tático de ")) baseCurrentPatente = "Comandante Tático";
            else if (i.patente.startsWith("Capitão Tático de ")) baseCurrentPatente = "Capitão Tático";
        }

        let currentIdx = rankOrder.indexOf(baseCurrentPatente);
        let nextRank = currentIdx !== -1 && currentIdx < rankOrder.length - 1 ? rankOrder[currentIdx + 1] : null;
        let prevRank = currentIdx > 0 ? rankOrder[currentIdx - 1] : null;
        
        let ptsReq = 0;
        let meritReq = 0;

        if (nextRank) {
            if (orgTipo === "Marinha") {
                let reqs = {"Recruta":1000,"Cabo":2000,"Sargento":3000,"Tenente":5000,"Comandante":10000,"Capitão":15000,"Comodoro":20000,"Contra-Almirante":25000,"Vice-Almirante":30000,"Almirante":45000,"Almirante-de-Frota":50000};
                ptsReq = reqs[nextRank] * modifier;
                if (nextRank === "Vice-Almirante") meritReq = modifier === 0.9 ? 8 : (modifier === 1.1 ? 12 : 10);
                if (nextRank === "Almirante") meritReq = modifier === 0.9 ? 16 : (modifier === 1.1 ? 20 : 18);
                if (nextRank === "Almirante-de-Frota") meritReq = 0;
            } else if (orgTipo === "Governo Mundial") {
                let reqs = {"CP-1":2500,"CP-2":5000,"CP-3":7500,"CP-4":10000,"CP-5":15000,"CP-6":20000,"CP-7":25000,"CP-8":30000,"CP-9":40000,"CP-0":50000};
                ptsReq = reqs[nextRank] * modifier;
                if (nextRank === "CP-8") meritReq = modifier === 0.9 ? 8 : (modifier === 1.1 ? 12 : 10);
                if (nextRank === "CP-9") meritReq = modifier === 0.9 ? 16 : (modifier === 1.1 ? 20 : 18);
                if (nextRank === "CP-0") meritReq = modifier === 0.9 ? 24 : (modifier === 1.1 ? Infinity : 26);
            } else if (orgTipo === "Vanguarda Popular Revolucionária") {
                let reqs = {"Operador":1000,"Infiltrador":2500,"Soldado Revolucionário":5000,"Coordenador De Operações":10000,"Esquadrão":15000,"Comandante Tático":20000,"Capitão Tático":25000,"Pilar":30000,"Vice-Líder":30000,"Eixo":30000};
                ptsReq = reqs[nextRank];
                if (nextRank === "Capitão Tático") meritReq = 6;
                if (nextRank === "Pilar") meritReq = 10;
                if (nextRank === "Vice-Líder") meritReq = 18;
            }
        }

        let btn = document.getElementById('btn-promover');
        if (nextRank) {
            btn.style.display = 'block';
            btn.dataset.nextRank = nextRank;
            btn.dataset.meritReq = meritReq;
            if (currentPts >= ptsReq) {
                btn.disabled = (i.merito < meritReq && nextRank !== "Almirante-de-Frota" && nextRank !== "Eixo");
                btn.dataset.needsSuperAdmin = "false";
            } else {
                btn.disabled = false;
                btn.dataset.needsSuperAdmin = "true";
            }
        } else {
            btn.style.display = 'none';
        }

        let btnRebaixar = document.getElementById('btn-rebaixar');
        if (btnRebaixar) {
            if (prevRank) {
                btnRebaixar.style.display = 'block';
                btnRebaixar.dataset.prevRank = prevRank;
            } else {
                btnRebaixar.style.display = 'none';
            }
        }

        document.getElementById('info-merito').value = i.merito || 0;
        
        let baseSalario = typeof salarios[i.patente] !== 'undefined' ? salarios[i.patente] : null;
        if (baseSalario !== null) {
            if (i.orgTipo === "Marinha" && i.linhagem === "Kong") {
                baseSalario += 50000000;
            }
            i.salario = baseSalario === 0 ? "0" : baseSalario.toLocaleString("pt-BR");
        } else {
            i.salario = "";
        }
        
        let selPatente = document.getElementById('info-patente');
        if (selPatente) {
            let gKey = i.sexo === 'Feminino' ? 'f' : 'm';
            let dName = patenteGender[i.patente] ? patenteGender[i.patente][gKey] : i.patente;
            if (selPatente.tagName.toLowerCase() === 'select') {
                selPatente.innerHTML = `<option value="${i.patente}">${dName}</option>`;
                selPatente.value = i.patente;
            } else {
                selPatente.value = dName;
            }
        }
    } else {
        document.getElementById('box-tripulacao').style.display = "none";
        let boxPirataStatus = document.getElementById('box-pirataStatus');
        if(boxPirataStatus) boxPirataStatus.style.display = "none";
        let boxRecTravada = document.getElementById('box-recompensaTravada');
        if(boxRecTravada) boxRecTravada.style.display = "none";
        document.getElementById('box-patente-salario').style.display = "none";
    }
    
    let elSalario = document.getElementById('info-salario');
    if (elSalario) elSalario.value = i.salario || "";

    let totalBaseDisplay = document.getElementById('totalBaseDisplay');
    if(totalBaseDisplay) {
        totalBaseDisplay.textContent = totalBase.toLocaleString("pt-BR");
        totalBaseDisplay.style.color = totalBase > 1000 ? "var(--warning)" : "var(--info)";
        totalBaseDisplay.style.borderColor = totalBase > 1000 ? "var(--warning)" : "var(--info)";
    }

    let avisoBase = document.getElementById('avisoBase');
    
    let displayAviso = "none";
    let textAviso = "";
    
    if (!isNPC) {
        if(totalBase > 10000 && totalBase < 15000) { 
            displayAviso = "block"; 
            textAviso = `Atenção: Limite inicial de 10.000 pontos ultrapassado!`; 
        } else if(totalBase < 10000) { 
            displayAviso = "block"; 
            textAviso = `Atenção: Faltam distribuir ${(10000 - totalBase).toLocaleString("pt-BR")} dos pontos iniciais!`; 
        }
    }
    
    if(avisoBase) { avisoBase.style.display = displayAviso; avisoBase.textContent = textAviso; }

    let isNico = i.linhagem === "Nico", isTom = i.linhagem === "Tom", isVega = i.linhagem === "Vega";
    let isSp = isNico || isTom || isVega;
    let allowedSpClasses = [];
    if (isNico) allowedSpClasses = ["Arqueólogo"];
    if (isTom) allowedSpClasses = ["Carpinteiro"];
    if (isVega) allowedSpClasses = ["Cientista", "Inventor"];

    let html1 = '<option value="">-- Selecione --</option>';
    if (isSp) {
        allowedSpClasses.forEach(cls => {
            let display = getClassDisplayName(`${cls} 1`, i.sexo);
            html1 += `<option value="${cls} 1">${display}</option>`;
        });
    } else {
        baseClassesList.forEach(c => {
            let display = getClassDisplayName(`${c} 1`, i.sexo);
            html1 += `<option value="${c} 1">${display}</option>`;
        });
    }

    let el1 = document.getElementById('info-classe');
    if(el1.innerHTML !== html1) el1.innerHTML = html1;
    
    if (isSp) {
        let validOptions = allowedSpClasses.map(c => `${c} 1`);
        if (!validOptions.includes(i.classe)) {
            i.classe = "";
        }
        if(i.classe && el1.querySelector(`option[value="${i.classe}"]`)) el1.value = i.classe;
        else { el1.value = ""; }
    } else {
        if(i.classe && el1.querySelector(`option[value="${i.classe}"]`)) el1.value = i.classe;
        else { el1.value = ""; i.classe = ""; }
    }

    let chosenSpBase = i.classe ? i.classe.replace(/ \d+$/, "") : "";

    let classSlots = [];
    if (isSp) {
        classSlots = [
            {id: 'classe2', req: 0, spLvl: 2},
            {id: 'classe3', req: 10000, spLvl: 3},
            {id: 'classe4', req: 15000, spLvl: 4},
            {id: 'classe5', req: 30000, spLvl: 5}
        ];
    } else {
        classSlots = [
            {id: 'classe2', req: 5000, prev: [i.classe]},
            {id: 'classe3', req: 10000, prev: [i.classe, i.classe2]},
            {id: 'classe4', req: 20000, prev: [i.classe, i.classe2, i.classe3]},
            {id: 'classe5', req: 35000, prev: [i.classe, i.classe2, i.classe3, i.classe4]}
        ];
    }

    classSlots.forEach(slot => {
        let el = document.getElementById('info-' + slot.id);
        let hasClassAssigned = i[slot.id] && i[slot.id] !== "";
        if (isSuperAdmin || totalFinal >= slot.req || hasClassAssigned) {
            el.disabled = isReadOnly ? true : false;
            let html = `<option value="">-- Selecione --</option>`;
            
            if (isSp) {
                if (chosenSpBase) {
                    let display = getClassDisplayName(`${chosenSpBase} ${slot.spLvl}`, i.sexo);
                    html += `<option value="${chosenSpBase} ${slot.spLvl}">${display}</option>`;
                }
            } else {
                let counts = {};
                baseClassesList.forEach(c => counts[c] = 1);
                slot.prev.forEach(p => {
                    if(p) { let match = p.match(/(.+) (\d+)/); if(match) counts[match[1]] = Math.max(counts[match[1]], parseInt(match[2]) + 1); }
                });
                
                baseClassesList.forEach(c => {
                    if(counts[c] <= 5) {
                        let display = getClassDisplayName(`${c} ${counts[c]}`, i.sexo);
                        html += `<option value="${c} ${counts[c]}">${display}</option>`;
                    }
                });
            }
            
            if(el.innerHTML !== html) el.innerHTML = html;
            
            let currentVal = i[slot.id];
            if (isSp && currentVal && !currentVal.startsWith(chosenSpBase)) {
                currentVal = "";
                i[slot.id] = "";
            }

            if(Array.from(el.options).some(o => o.value === currentVal) && currentVal !== "") { 
                el.value = currentVal; 
            } else { 
                el.value = ""; 
                if (!isSuperAdmin && !hasClassAssigned) i[slot.id] = ""; 
            }
        } else {
            el.innerHTML = `<option value="">🔒 Requer ${slot.req.toLocaleString('pt-BR')}</option>`;
            el.disabled = true; i[slot.id] = "";
        }
    });

    let combatenteLevel = 0;
    [i.classe, i.classe2, i.classe3, i.classe4, i.classe5].forEach(c => {
        if(c && c.startsWith("Combatente")) {
            let match = c.match(/Combatente (\d+)/);
            if(match) combatenteLevel = Math.max(combatenteLevel, parseInt(match[1]));
        }
    });
    document.getElementById('box-selClasseDF').style.display = (combatenteLevel > 0) ? "block" : "none";

    const selLin = document.getElementById('info-linhagem');
    let currentLin = i.linhagem; 
    let htmlLin = '<option value="">-- Selecione --</option>';
    for(let l in linhagens) { if(l!=="Nenhuma" && (!linhagens[l].req || linhagens[l].req.includes(i.raca) || (isNPC && i.raca === 'Outra'))) { htmlLin += `<option value="${l}">${l}</option>`; } }
    if(selLin.innerHTML !== htmlLin) selLin.innerHTML = htmlLin;
    if(Array.from(selLin.options).some(o => o.value === currentLin)) { selLin.value = currentLin; } else { i.linhagem = ""; selLin.value = ""; currentLin = ""; }

    let rc = i.raca, rc2 = i.raca2, ln = currentLin;
    let isLinhagemVisible = (rc && !["Bucaneiro","Oni","Lunariano"].includes(rc));
    document.getElementById('container-linhagem').style.display = isLinhagemVisible ? "block" : "none"; 
    
    document.getElementById('box-extraRaca').style.display = (ln !== "Charlotte" && (["Humano","Kuja","Mink"].includes(rc) || (isNPC && rc === 'Outra'))) ? "flex" : "none";
    document.getElementById('info-selDF').style.display = (ln !== "Charlotte" && (["Humano","Kuja","Mink"].includes(rc) || (isNPC && rc === 'Outra'))) ? "block" : "none";
    document.getElementById('info-selRV').style.display = (ln !== "Charlotte" && (["Humano","Kuja"].includes(rc) || (isNPC && rc === 'Outra'))) ? "block" : "none";

    let showExtraLin = isLinhagemVisible && ["Barnum","Charlotte","D.","Gan","Kong","Silvers","Nico"].includes(ln);
    document.getElementById('box-extraLin').style.display = showExtraLin ? "flex" : "none";
    document.getElementById('info-selLinDF').style.display = ["Barnum","Gan","Nico"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLinRV').style.display = ["Barnum","Nico"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLin4').style.display = ["D.","Kong","Silvers"].includes(ln) ? "block" : "none";
    document.getElementById('info-selLinEspAmi').style.display = ["D."].includes(ln) ? "block" : "none";

    let isMink = (rc === "Mink" || (ln === "Charlotte" && rc2 === "Mink") || (isNPC && rc === 'Outra'));
    document.getElementById('box-estilo-mink').style.display = isMink ? "flex" : "none";

    let isStyleAllowed = (styleName) => {
        if (isSuperAdmin) return true;
        if (styleName === "Galaxy Combat") {
            return totalFinal >= 15000 && finalHA >= 1 && finalHO >= 1;
        }
        if (styleName === "Hasshoken") {
            if (ln === "Chinjao" && i.orgTipo === "Pirata") return true;
            return totalFinal >= 8000;
        }
        if (styleName === "Rokushiki") return totalFinal >= 5000;
        if (styleName === "Ryūsōken") {
            return totalFinal >= 15000 && finalHA >= 1;
        }
        if (styleName === "Seimei Kikan") return totalFinal >= 10000;
        return true;
    };

    let baseClass = (i.classe || "Arqueólogo 1").split(" ")[0];
    let allowedEstilo1 = classStyles[baseClass] || ["Freestyle"];
    if (isNPC && i.raca === 'Outra') allowedEstilo1 = allStyles;
    let elEst1 = document.getElementById('info-estilo1');
    if (elEst1) {
        let htmlE1 = '<option value="">-- Selecione --</option>';
        allowedEstilo1.forEach(e => {
            if (!isStyleAllowed(e) && i.estilo1 !== e) return;
            let disabled = (e !== "Freestyle" && e !== "Nenhum" && e !== i.estilo1 && [i.estilo2, i.estilo3, i.estilo4].includes(e)) ? "disabled" : "";
            htmlE1 += `<option value="${e}" ${disabled}>${e}</option>`;
        });
        if (elEst1.innerHTML !== htmlE1) elEst1.innerHTML = htmlE1;
        elEst1.value = i.estilo1;
    }

    [2, 3, 4].forEach(n => {
        let elEst = document.getElementById('info-estilo'+n);
        if (elEst) {
            let htmlE = '<option value="">-- Selecione --</option>';
            let otherStyles = [1, 2, 3, 4].filter(x => x !== n).map(x => i['estilo'+x]);
            allStyles.forEach(e => {
                if (!isStyleAllowed(e) && i['estilo'+n] !== e) return;
                let disabled = (e !== "Freestyle" && e !== "Nenhum" && e !== i['estilo'+n] && otherStyles.includes(e)) ? "disabled" : "";
                htmlE += `<option value="${e}" ${disabled}>${e}</option>`;
            });
            if (elEst.innerHTML !== htmlE) elEst.innerHTML = htmlE;
            elEst.value = i['estilo'+n];
        }
    });

    document.getElementById('info-estilo3').disabled = (!isSuperAdmin && totalFinal < 5000 && (!i.estilo3 || i.estilo3 === "Nenhum" || i.estilo3 === "")) || isReadOnly;
    document.getElementById('info-estilo4').disabled = (!isSuperAdmin && totalFinal < 10000 && (!i.estilo4 || i.estilo4 === "Nenhum" || i.estilo4 === "")) || isReadOnly;

    [1, 2, 3, 4].forEach(n => {
        let elFree = document.getElementById('info-freestyle'+n);
        if (elFree) {
            elFree.style.display = i['estilo'+n] === 'Freestyle' ? 'block' : 'none';
            elFree.value = i['freestyle'+n] || "";
        }
    });

    let reqEsp = (rc === "Kuja" || ln === "Silvers") ? 12000 : 15000;
    let espEl = document.getElementById('stat-esp');
    let hasEspPoints = currentChar.stats.esp > 0;
    if(isSuperAdmin || totalFinal >= reqEsp || hasEspPoints) { 
        espEl.disabled = isReadOnly ? true : false; 
        espEl.placeholder = "0"; 
        document.getElementById('box-haki').style.display = "block"; 
    } else {
        espEl.disabled = true; espEl.placeholder = `🔒 Requer ${reqEsp.toLocaleString("pt-BR")}`;
        currentChar.stats.esp = 0; currentChar.substats.hArm = 0; currentChar.substats.hObs = 0; currentChar.substats.hRei = 0;
        document.getElementById('box-haki').style.display = "none";
    }

    let amiEl = document.getElementById('stat-ami');
    let temFruta = (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome !== "");
    
    let isInimigoCalc = (i.calcQuemAtaca === 'inimigo');

    let boxCalcAmi = document.getElementById('box-calcUseAmi');
    if (boxCalcAmi) {
        boxCalcAmi.style.display = (isInimigoCalc || (temFruta && ln !== "Silvers")) ? "block" : "none";
        let lblAmi = document.getElementById('label-calcUseAmi');
        if (lblAmi) lblAmi.textContent = isInimigoCalc ? "Dano Akuma" : "Somar Akuma?";
        let elAmiSel = document.getElementById('info-calcUseAmi');
        if (elAmiSel) elAmiSel.style.display = isInimigoCalc ? "none" : "block";
        let elAmiMan = document.getElementById('info-calcAmiManual');
        if (elAmiMan) elAmiMan.style.display = isInimigoCalc ? "block" : "none";
    }
    
    let elHakiManual = document.getElementById('info-calcHakiManual');
    if (elHakiManual) elHakiManual.style.display = isInimigoCalc ? "block" : "none";
    let lblHaki = document.getElementById('label-calcUseHaki');
    if (lblHaki) lblHaki.textContent = isInimigoCalc ? "Dano Armamento" : "Somar Armamento?";
    let elCalcUseHaki = document.getElementById('info-calcUseHaki');
    if (elCalcUseHaki) elCalcUseHaki.style.display = isInimigoCalc ? "none" : "block";
    
    let elHakiReiManual = document.getElementById('info-calcHakiReiManual');
    if (elHakiReiManual) elHakiReiManual.style.display = isInimigoCalc ? "block" : "none";
    let lblHakiRei = document.getElementById('label-calcUseHakiRei');
    if (lblHakiRei) lblHakiRei.textContent = isInimigoCalc ? "Dano Rei" : "Somar Rei?";
    let elCalcUseHakiRei = document.getElementById('info-calcUseHakiRei');
    if (elCalcUseHakiRei) elCalcUseHakiRei.style.display = isInimigoCalc ? "none" : "block";

    let fmtAmiMan = i.calcAmiManual ? i.calcAmiManual.toLocaleString("pt-BR") : "";
    if (document.getElementById('info-calcAmiManual') && document.getElementById('info-calcAmiManual').value !== fmtAmiMan) document.getElementById('info-calcAmiManual').value = fmtAmiMan;
    let fmtHakiMan = i.calcHakiManual ? i.calcHakiManual.toLocaleString("pt-BR") : "";
    if (elHakiManual && elHakiManual.value !== fmtHakiMan) elHakiManual.value = fmtHakiMan;
    let fmtHakiReiMan = i.calcHakiReiManual ? i.calcHakiReiManual.toLocaleString("pt-BR") : "";
    if (elHakiReiManual && elHakiReiManual.value !== fmtHakiReiMan) elHakiReiManual.value = fmtHakiReiMan;

    let boxAmiPotBuff = document.getElementById('box-amiPotBuff');
    if (boxAmiPotBuff) boxAmiPotBuff.style.display = (temFruta && ln !== "Silvers" && i.hasAmiPot) ? "flex" : "none";
    let boxAmiVelBuff = document.getElementById('box-amiVelBuff');
    if (boxAmiVelBuff) boxAmiVelBuff.style.display = (temFruta && ln !== "Silvers" && i.hasAmiVel) ? "flex" : "none";
    
    let containerBoxAmi = document.getElementById('container-boxAmi');
    if (containerBoxAmi) containerBoxAmi.style.display = (ln === "Silvers") ? "none" : "flex";

    let hasAmiPoints = currentChar.stats.ami > 0;
    if(!isSuperAdmin && ln === "Silvers" && !hasAmiPoints) {
        amiEl.disabled = true; amiEl.placeholder = "🔒 Indisponível";
        currentChar.stats.ami = 0; currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0;
    } else if(!isSuperAdmin && !temFruta && !hasAmiPoints) {
        amiEl.disabled = true; amiEl.placeholder = "🔒 Requer Fruta";
        currentChar.stats.ami = 0; currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0;
    } else { 
        amiEl.disabled = isReadOnly ? true : false; 
        amiEl.placeholder = "0"; 
    }

    let bonus = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0, ami:0, refl:0, vcorp:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, amiDesp:0, vAgua:0, reflAgua:0, vcorpAgua:0, dano:0, ignRes:0};
    let flatBonus = {d:0, f:0, r:0, v:0, esp:0, ha:0, ho:0, hr:0, ami:0, refl:0, vcorp:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, amiDesp:0, vAgua:0, reflAgua:0, vcorpAgua:0, dano:0, ignRes:0};

    if (i.alcunhasList && i.alcunhaAtiva) {
        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        if (ativa && ativa.buffs) {
            ativa.buffs.forEach(b => {
                    if (b.cond && (!i.alcunhaCondicoes || !i.alcunhaCondicoes[b.cond])) return;
                    let targets = [b.stat];
                    if (b.stat === "tudo" || b.stat === "tudoAttr") targets = ["d","f","r","v","refl","vcorp"];
                    else if (b.stat === "tudoEsp") targets = ["esp","ha","ho","hr"];
                    else if (b.stat === "tudoAmi") targets = ["amiAlc","amiDur","amiPot","amiVel","amiDesp"];
                
                    targets.forEach(t => {
                        if (b.type === "pct") { if(typeof bonus[t] !== 'undefined') bonus[t] += (b.val / 100); }
                        else { if(typeof flatBonus[t] !== 'undefined') flatBonus[t] += b.val; }
                });
            });
        }
    }

    let baseAmiStatsForZoan = 0;
    if(i.hasAmiAlc) baseAmiStatsForZoan++; if(i.hasAmiDur) baseAmiStatsForZoan++; if(i.hasAmiPot) baseAmiStatsForZoan++; if(i.hasAmiVel) baseAmiStatsForZoan++;
    let currentBasePointsForZoan = (currentChar.substats.amiAlc || 0) + (currentChar.substats.amiDur || 0) + (currentChar.substats.amiPot || 0) + (currentChar.substats.amiVel || 0);
    let controlePctForZoan = baseAmiStatsForZoan > 0 ? parseFloat(((currentBasePointsForZoan / (baseAmiStatsForZoan * 10000)) * 100).toFixed(2)) : 0;
    
    let isZoan = i.akumaNome && (
        (akumasFixas["Zoan"] && akumasFixas["Zoan"].includes(i.akumaNome)) ||
        (akumasFixas["Zoan Ancestral"] && akumasFixas["Zoan Ancestral"].includes(i.akumaNome)) ||
        (akumasFixas["Zoan Mítica"] && akumasFixas["Zoan Mítica"].includes(i.akumaNome))
    );
    let isParameciaEspecial = i.akumaNome === "Suji Suji no Mi"; 
    let hasZoanBox = isZoan || isParameciaEspecial;
    
    let elZoanBox = document.getElementById('box-zoan-buffs');
    if (elZoanBox) {
        if (hasZoanBox) {
            elZoanBox.style.display = "block";
            document.getElementById('info-zoanBuffF').value = i.zoanBuffF || 0;
            document.getElementById('info-zoanBuffD').value = i.zoanBuffD || 0;
            document.getElementById('info-zoanBuffR').value = i.zoanBuffR || 0;
            document.getElementById('info-zoanBuffV').value = i.zoanBuffV || 0;
            
            let btnForms = document.getElementById('box-zoan-forms');
            if (isParameciaEspecial) {
                btnForms.style.display = "none";
                i.zoanForma = "Completa";
            } else {
                btnForms.style.display = "flex";
                document.getElementById('btn-forma-comum').style.borderColor = i.zoanForma === 'Comum' ? 'var(--success)' : '#444';
                document.getElementById('btn-forma-comum').style.color = i.zoanForma === 'Comum' ? 'var(--success)' : 'inherit';
                document.getElementById('btn-forma-instavel').style.borderColor = i.zoanForma === 'Instável' ? 'var(--success)' : '#444';
                document.getElementById('btn-forma-instavel').style.color = i.zoanForma === 'Instável' ? 'var(--success)' : 'inherit';
                
                let btnHibrida = document.getElementById('btn-forma-hibrida');
                if (controlePctForZoan < 20 && !isSuperAdmin) { btnHibrida.disabled = true; if(i.zoanForma === 'Híbrida') i.zoanForma = 'Comum'; }
                else { btnHibrida.disabled = false; }
                btnHibrida.style.borderColor = i.zoanForma === 'Híbrida' ? 'var(--success)' : '#444';
                btnHibrida.style.color = i.zoanForma === 'Híbrida' ? 'var(--success)' : 'inherit';
                
                let btnCompleta = document.getElementById('btn-forma-completa');
                if (controlePctForZoan < 60 && !isSuperAdmin) { btnCompleta.disabled = true; if(i.zoanForma === 'Completa') i.zoanForma = 'Comum'; }
                else { btnCompleta.disabled = false; }
                btnCompleta.style.borderColor = i.zoanForma === 'Completa' ? 'var(--success)' : '#444';
                btnCompleta.style.color = i.zoanForma === 'Completa' ? 'var(--success)' : 'inherit';
            }
        } else {
            elZoanBox.style.display = "none";
            i.zoanBuffF = 0; i.zoanBuffD = 0; i.zoanBuffR = 0; i.zoanBuffV = 0;
            i.zoanForma = "Comum";
        }
    }

    let multZoan = 0;
    if (i.zoanForma === 'Completa') multZoan = 1;
    else if (i.zoanForma === 'Híbrida') multZoan = 0.5;
    else if (i.zoanForma === 'Instável') multZoan = 0.3333;
    
    let zBonus = {
        f: Math.round((i.zoanBuffF || 0) * multZoan) / 100,
        d: Math.round((i.zoanBuffD || 0) * multZoan) / 100,
        r: Math.round((i.zoanBuffR || 0) * multZoan) / 100,
        v: Math.round((i.zoanBuffV || 0) * multZoan) / 100
    };

    let itemBonus = {d:0, f:0, r:0, v:0, refl:0, vcorp:0, vAgua:0, reflAgua:0, vcorpAgua:0, esp:0, ha:0, ho:0, hr:0, ami:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, amiDesp:0, dano:0, ignRes:0};
    let itemFlat = {d:0, f:0, r:0, v:0, refl:0, vcorp:0, vAgua:0, reflAgua:0, vcorpAgua:0, esp:0, ha:0, ho:0, hr:0, ami:0, amiAlc:0, amiDur:0, amiPot:0, amiVel:0, amiDesp:0, dano:0, ignRes:0};
    if (i.armasEquipadasList) {
        i.armasEquipadasList.forEach(a => {
            if (a.ativo && a.stat) {
                let val = parseInt(a.val) || 0;
                if (val !== 0) {
                    let targets = [a.stat];
                    if (a.stat === "tudo" || a.stat === "tudoAttr") targets = ["d","f","r","v","refl","vcorp"];
                    else if (a.stat === "tudoEsp") targets = ["esp","ha","ho","hr"];
                    else if (a.stat === "tudoAmi") targets = ["amiAlc","amiDur","amiPot","amiVel","amiDesp"];
                    
                    targets.forEach(t => {
                        if (a.type === "pct") {
                            if (typeof itemBonus[t] !== 'undefined') itemBonus[t] += (val / 100);
                        } else {
                            if (typeof itemFlat[t] !== 'undefined') itemFlat[t] += val;
                        }
                    });
                }
            }
        });
    }
    for (let k in itemBonus) { if (itemBonus[k] > 1.0) itemBonus[k] = 1.0; }

    itemBonus.amiAlc += itemBonus.ami; itemBonus.amiDur += itemBonus.ami; itemBonus.amiPot += itemBonus.ami; itemBonus.amiVel += itemBonus.ami; itemBonus.amiDesp += itemBonus.ami; itemBonus.ami = 0;
    itemFlat.amiAlc += itemFlat.ami; itemFlat.amiDur += itemFlat.ami; itemFlat.amiPot += itemFlat.ami; itemFlat.amiVel += itemFlat.ami; itemFlat.amiDesp += itemFlat.ami; itemFlat.ami = 0;

    if(combatenteLevel > 0) { bonus[i.selClasseDF] += combatenteLevel * 0.05; }

    if(ln !== "Charlotte") {
        if(racas[rc]) { 
            bonus.d += racas[rc].d || 0; bonus.f += racas[rc].f || 0; bonus.r += racas[rc].r || 0; bonus.v += racas[rc].v || 0; 
        } else if (isNPC && rc === 'Outra') {
            bonus.f += (parseInt(i.customBuffF) || 0) / 100;
            bonus.d += (parseInt(i.customBuffD) || 0) / 100;
            bonus.r += (parseInt(i.customBuffR) || 0) / 100;
            bonus.v += (parseInt(i.customBuffV) || 0) / 100;
        }
        if(rc === "Humano") { bonus[i.selDF] += 0.20; bonus[i.selRV] += 0.20; } else if(rc === "Kuja") { bonus[i.selDF] += 0.30; bonus[i.selRV] += 0.15; } else if(rc === "Mink") { bonus[i.selDF] += 0.10; }
    } else {
        let applyCharlotteBuff = (rName, selVal, suffix = "") => {
            if (racas[rName]) {
                for (let s in racas[rName]) { if (racas[rName][s] < 0) bonus[s] += racas[rName][s]; }
            } else if (isNPC && rName === 'Outra') {
                bonus.f += (parseInt(i['customBuffF' + suffix]) || 0) / 100;
                bonus.d += (parseInt(i['customBuffD' + suffix]) || 0) / 100;
                bonus.r += (parseInt(i['customBuffR' + suffix]) || 0) / 100;
                bonus.v += (parseInt(i['customBuffV' + suffix]) || 0) / 100;
            }
            if (selVal) {
                if (rName === "Humano") bonus[selVal] += 0.20;
                else if (rName === "Kuja") bonus[selVal] += (selVal === "f" || selVal === "d") ? 0.30 : 0.20;
                else if (racas[rName] && racas[rName][selVal] > 0) bonus[selVal] += racas[rName][selVal];
            }
        };
        applyCharlotteBuff(rc, i.selCharR1);
        applyCharlotteBuff(rc2, i.selCharR2, "2");
    }

    if(document.getElementById('container-linhagem').style.display === "block" && linhagens[ln]) {
            bonus.d += linhagens[ln].d || 0; bonus.f += linhagens[ln].f || 0; bonus.r += linhagens[ln].r || 0; bonus.v += linhagens[ln].v || 0; bonus.esp += linhagens[ln].esp || 0; bonus.ha += linhagens[ln].ha || 0; bonus.ho += linhagens[ln].ho || 0; bonus.hr += linhagens[ln].hr || 0; bonus.ami += linhagens[ln].ami || 0;
            
            if(ln === "Barnum") { bonus[i.selLinDF] += 0.10; bonus[i.selLinRV] += 0.20; } else if(ln === "D.") { bonus[i.selLin4] += 0.25; bonus[i.selLinEspAmi] += 0.20; } else if(ln === "Gan") { bonus[i.selLinDF] += 0.20; } else if(ln === "Kong") { bonus[i.selLin4] += 0.20; } else if(ln === "Silvers") { bonus[i.selLin4] += 0.15; } else if(ln === "Nico") { bonus[i.selLinDF] += 0.10; bonus[i.selLinRV] += 0.05; }
        }

        let mandHab = linhagemHabilidades[ln] ? [...linhagemHabilidades[ln]] : [];
        if (rc === "Bucaneiro") mandHab.push("Constituição Única");
        if (rc === "Lunariano") mandHab.push("Fúria Ardente");
        if (rc === "Oni") mandHab.push("Contração Muscular");
        if (i.linhagem === "Charlotte") {
            if (rc2 === "Bucaneiro") mandHab.push("Constituição Única");
            if (rc2 === "Lunariano") mandHab.push("Fúria Ardente");
            if (rc2 === "Oni") mandHab.push("Contração Muscular");
        }
        
        let currentList = i.habilidadesExclusivas || [];
        mandHab.forEach(h => { if (!currentList.includes(h)) currentList.push(h); });
        i.habilidadesExclusivas = currentList;

        let habListHtml = "";
        let habSelectHtml = '<option value="">-- Adicionar Habilidade --</option>';
        let formatHabDisplay = (h) => {
            if (i.sexo === "Feminino") {
                if (h === "Filho do Mar") return "Filha do Mar";
                if (h === "O Escolhido") return "A Escolhida";
                if (h === "Batedor de Carteiras") return "Batedora de Carteiras";
            }
            return h;
        };

        i.habilidadesExclusivas.sort((a, b) => formatHabDisplay(a).toLowerCase().localeCompare(formatHabDisplay(b).toLowerCase()));

        let habsDisponiveis = Object.keys(habilidadesExclusivasDict).filter(hab => !i.habilidadesExclusivas.includes(hab));
        habsDisponiveis.sort((a, b) => formatHabDisplay(a).toLowerCase().localeCompare(formatHabDisplay(b).toLowerCase()));
        
        habsDisponiveis.forEach(hab => {
            habSelectHtml += `<option value="${hab}">${formatHabDisplay(hab)}</option>`;
        });

        i.habilidadesExclusivas.forEach(hab => {
            let isMandatoryLin = linhagemHabilidades[ln] && linhagemHabilidades[ln].includes(hab);
            let isMandatoryRace = !isMandatoryLin && mandHab.includes(hab);
            let mandText = isMandatoryLin ? "(Linhagem)" : (isMandatoryRace ? "(Raça Exclusiva)" : "");
            
            habListHtml += `<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:4px; border:1px solid #444;">
                <span style="font-size:12px;">${formatHabDisplay(hab)}</span>
                ${mandText ? `<span style="font-size:10px; color:#aaa;">${mandText}</span>` : `<button class="btn btn-outline btn-danger" style="padding:2px 6px; font-size:10px; margin:0;" onclick="removeHabilidade('${hab}')">X</button>`}
            </div>`;
        });
        let habSelEl = document.getElementById('hab-select'); if(habSelEl) habSelEl.innerHTML = habSelectHtml;
        let habListEl = document.getElementById('hab-list'); if(habListEl) habListEl.innerHTML = habListHtml;

        let hasHab = (hab) => i.habilidadesExclusivas.includes(hab);
        let hasAtirador = hasHab("Caminho do Atirador");
        let hasFavArm = hasHab("Favoritismo Armista");
        let hasFuria = hasHab("Fúria Ardente");
        let hasQI = hasHab("QI Avançado");
        let hasRetorno = hasHab("Golpe de Retorno");
        let isBeckman = ln === "Beckman";
        
        let habAtivosContainer = document.getElementById('hab-ativos');
        if(habAtivosContainer) {
            habAtivosContainer.style.display = (hasAtirador || hasFavArm || hasFuria || hasQI || isBeckman || hasRetorno) ? 'block' : 'none';
            let elAtirador = document.getElementById('hab-ativo-atirador'); if(elAtirador) { elAtirador.style.display = hasAtirador ? 'block' : 'none'; document.getElementById('chk-atirador').checked = i.habCaminhoAtiradorAtivo; }
            let elQI = document.getElementById('hab-ativo-qi'); if(elQI) { elQI.style.display = hasQI ? 'block' : 'none'; document.getElementById('chk-qi').checked = i.habQIAvancadoAtivo; }
            let elBeckman = document.getElementById('hab-ativo-beckman'); if(elBeckman) { elBeckman.style.display = isBeckman ? 'block' : 'none'; document.getElementById('chk-beckman').checked = i.linhagemBeckmanArma; }
            let elArmista = document.getElementById('hab-ativo-armista'); 
            if(elArmista) { 
                elArmista.style.display = hasFavArm ? 'flex' : 'none'; 
                let selArmAtivo = document.getElementById('sel-armista-ativo');
                let armOpts = '<option value="sem">Sem Arma</option><option value="generica">Arma Genérica</option><option value="favorita">Arma Favorita</option>';
                if (totalBase >= 10000) armOpts += '<option value="criacao">Criação Própria</option>';
                if (totalBase >= 15000) armOpts += '<option value="criacao_favorita">Arma Favorita + Criação Própria</option>';
                if (selArmAtivo.innerHTML !== armOpts) selArmAtivo.innerHTML = armOpts;
                if (!Array.from(selArmAtivo.options).some(o => o.value === i.habFavArmistaAtivo)) {
                    i.habFavArmistaAtivo = "sem";
                }
                selArmAtivo.value = i.habFavArmistaAtivo; 
                document.getElementById('sel-armista-attr').value = i.habFavArmistaAttr; 
            }
            let elFuria = document.getElementById('hab-ativo-furia'); if(elFuria) { elFuria.style.display = hasFuria ? 'flex' : 'none'; document.getElementById('sel-furia-attr').value = i.habFuriaArdenteAttr || 'f'; }
            let elRetorno = document.getElementById('hab-ativo-retorno'); if(elRetorno) { elRetorno.style.display = hasRetorno ? 'flex' : 'none'; document.getElementById('sel-retorno-uso').value = i.habRetornoUso || 1; }
        }

        if(hasHab("Arte da Esgrima")) { if(totalBase >= 15000) bonus.d += 0.20; else if(totalBase >= 10000) bonus.d += 0.15; else if(totalBase >= 5000) bonus.d += 0.10; }
        if(hasHab("Batedor de Carteiras")) { if(totalBase >= 15000) bonus.d += 0.25; else if(totalBase >= 10000) bonus.d += 0.20; else if(totalBase >= 5000) bonus.d += 0.15; }
        if(hasHab("Caminho do Atirador")) { 
            if(totalBase >= 15000) bonus.d += 0.15; else if(totalBase >= 10000) bonus.d += 0.10; else if(totalBase >= 5000) bonus.d += 0.05; 
            if(i.habCaminhoAtiradorAtivo) { if(totalBase >= 15000) bonus.d += 0.20; else if(totalBase >= 10000) bonus.d += 0.15; else if(totalBase >= 5000) bonus.d += 0.10; }
        }
        if(hasHab("Constituição Única")) { bonus.f += 0.10; bonus.r += 0.15; }
        if(hasHab("Contração Muscular")) { if(totalBase >= 10000) { bonus.f += 0.20; bonus.r += 0.20; } else if(totalBase >= 5000) { bonus.f += 0.10; bonus.r += 0.10; } }
        if(hasHab("Espírito Contagiante")) {
            if(totalBase >= 15000) { bonus.d += 0.15; bonus.f += 0.15; bonus.r += 0.15; bonus.v += 0.15; }
            else if(totalBase >= 10000) { bonus.d += 0.10; bonus.f += 0.10; bonus.r += 0.20; bonus.v += 0.10; }
            else if(totalBase >= 5000) { bonus.d += 0.05; bonus.f += 0.05; bonus.r += 0.05; bonus.v += 0.05; }
        }
        if(hasHab("Favoritismo Armista")) {
            let fav = i.habFavArmistaAtivo;
            let attrCh = i.habFavArmistaAttr === 'f' ? 'f' : 'd';
            if (totalBase >= 15000) {
                if (fav === "generica") { bonus.f -= 0.90; bonus.d -= 0.90; bonus.r -= 0.90; bonus.v -= 0.90; }
                else if (fav === "favorita") { bonus.r += 0.10; bonus[attrCh] += 0.10; }
                else if (fav === "criacao") { bonus.r += 0.10; bonus.v += 0.10; bonus[attrCh] += 0.10; }
                else if (fav === "criacao_favorita") { bonus.r += 0.25; bonus.v += 0.25; }
            } else if (totalBase >= 10000) {
                if (fav === "favorita") { bonus.r += 0.10; bonus[attrCh] += 0.10; }
                else if (fav === "criacao") { bonus.r += 0.10; bonus.v += 0.10; bonus[attrCh] += 0.10; }
            } else if (totalBase >= 5000) {
                if (fav === "favorita") { bonus.r += 0.10; bonus[attrCh] += 0.10; }
            }
        }
        if(hasHab("Filho do Mar")) { if(totalBase >= 15000) { bonus.refl += 0.15; bonus.r += 0.15; } else if(totalBase >= 10000) { bonus.refl += 0.10; bonus.r += 0.10; } else if(totalBase >= 5000) { bonus.refl += 0.05; bonus.r += 0.05; } }
        if(hasHab("Flexibilidade")) { if(totalBase >= 10000) bonus.v += 0.20; else if(totalBase >= 5000) bonus.v += 0.10; }
        if(hasHab("Fúria Ardente")) { let fA = i.habFuriaArdenteAttr || 'f'; if(totalBase >= 15000) bonus[fA] += 0.15; else if(totalBase >= 10000) bonus[fA] += 0.10; else if(totalBase >= 5000) bonus[fA] += 0.05; }
        if(hasHab("O Escolhido")) { if(totalBase >= 20000) { bonus.ha += 0.15; bonus.ho += 0.15; bonus.hr += 0.15; } else if(totalBase >= 10000) { bonus.ha += 0.10; bonus.ho += 0.10; bonus.hr += 0.10; } else if(totalBase >= 5000) { bonus.ha += 0.05; bonus.ho += 0.05; bonus.hr += 0.05; } }
        if(hasHab("Pensamento Acelerado")) { if(totalBase >= 10000) bonus.refl += 0.25; else if(totalBase >= 5000) bonus.refl += 0.20; }
        if(hasHab("QI Avançado")) { if(i.habQIAvancadoAtivo) bonus.refl += 0.05; }
        if(isBeckman && i.linhagemBeckmanArma) { bonus.v += 0.05; }
        if(hasHab("Golpe de Retorno")) { let usos = i.habRetornoUso || 1; if(usos === 2) bonus.r -= 0.10; else if(usos === 3) bonus.r -= 0.20; }

        let qtdEspirito = parseInt(i.aliadosEspiritoContagiante) || 0;
        if (qtdEspirito > 0) {
            let buffEspirito = qtdEspirito * 0.05;
            bonus.d += buffEspirito;
            bonus.f += buffEspirito;
            bonus.r += buffEspirito;
            bonus.v += buffEspirito;
        }

        for (let key in bonus) {
            if (bonus[key] > 1.0) bonus[key] = 1.0;
        }

    const statFields = ['f', 'd', 'r', 'v', 'esp', 'ami'];
    statFields.forEach(f => { 
        let el = document.getElementById('stat-'+f); 
        if(el) {
            let formatted = currentChar.stats[f] ? currentChar.stats[f].toLocaleString("pt-BR") : "";
            if (el.value !== formatted) el.value = formatted;
        }
    });

    let estTotalVal = Math.round((R + flatBonus.r) * (1 + bonus.r)) * 5;
    if (ln === "Beckman") estTotalVal = Math.floor(estTotalVal * 1.10);
    if (typeof i.lastEstTotal === 'undefined') i.lastEstTotal = estTotalVal;
    if (estTotalVal !== i.lastEstTotal && (i.estaminaAtual === 0 || i.estaminaAtual === i.lastEstTotal)) i.estaminaAtual = estTotalVal;
    i.lastEstTotal = estTotalVal;
    if (typeof i.estaminaAtual === 'undefined' || i.estaminaAtual === -1) i.estaminaAtual = estTotalVal;
    if (i.estaminaAtual > estTotalVal) i.estaminaAtual = estTotalVal;

    if (i.exaustaoCompleta) {
        bonus.d -= 0.20; bonus.f -= 0.20; bonus.r -= 0.20; bonus.v -= 0.20; bonus.esp -= 0.20; bonus.ami -= 0.20;
    }

    let passiveD = Math.round((D + flatBonus.d) * (1 + bonus.d));
    let zoanBaseD = passiveD; if(zBonus.d > 0) zoanBaseD = Math.round(passiveD * (1 + zBonus.d));
    let totalD = Math.round((zoanBaseD + itemFlat.d) * (1 + itemBonus.d));
    let elTotalD = document.getElementById('total-d');
    elTotalD.innerText = "Total: " + totalD.toLocaleString("pt-BR");
    elTotalD.dataset.passive = passiveD; elTotalD.dataset.active = totalD;

    let passiveF = Math.round((F + flatBonus.f) * (1 + bonus.f));
    let zoanBaseF = passiveF; if(zBonus.f > 0) zoanBaseF = Math.round(passiveF * (1 + zBonus.f));
    let totalF = Math.round((zoanBaseF + itemFlat.f) * (1 + itemBonus.f));
    let elTotalF = document.getElementById('total-f');
    elTotalF.innerText = "Total: " + totalF.toLocaleString("pt-BR");
    elTotalF.dataset.passive = passiveF; elTotalF.dataset.active = totalF;

    let passiveR = Math.round((R + flatBonus.r) * (1 + bonus.r));
    let zoanBaseR = passiveR; if(zBonus.r > 0) zoanBaseR = Math.round(passiveR * (1 + zBonus.r));
    let totalR = Math.round((zoanBaseR + itemFlat.r) * (1 + itemBonus.r));
    let elTotalR = document.getElementById('total-r');
    elTotalR.innerText = "Total: " + totalR.toLocaleString("pt-BR");
    elTotalR.dataset.passive = passiveR; elTotalR.dataset.active = totalR;
    
    let waterBuffV = 0;
    if(ln !== "Charlotte") {
        if(rc === "Sereiano") waterBuffV += 0.30;
        if(rc === "Tritão") waterBuffV += 0.30;
        if(rc === "Wotan") waterBuffV += 0.15;
    } else {
        if(rc === "Sereiano" && i.selCharR1 === "v") waterBuffV += 0.30;
        if(rc === "Tritão" && i.selCharR1 === "v") waterBuffV += 0.30;
        if(rc === "Wotan" && i.selCharR1 === "v") waterBuffV += 0.15;
        if(rc2 === "Sereiano" && i.selCharR2 === "v") waterBuffV += 0.30;
        if(rc2 === "Tritão" && i.selCharR2 === "v") waterBuffV += 0.30;
        if(rc2 === "Wotan" && i.selCharR2 === "v") waterBuffV += 0.15;
    }
    if(document.getElementById('container-linhagem').style.display === "block" && ln === "Neptune") {
        waterBuffV += 0.30;
    }

    if (i.exaustaoCompleta && !currentChar.substats.exaustaoVelSaved) {
        currentChar.substats.origRefl = currentChar.substats.refl || 0;
        currentChar.substats.origVcorp = currentChar.substats.vcorp || 0;
        currentChar.substats.exaustaoVelSaved = true;
    } else if (!i.exaustaoCompleta && currentChar.substats.exaustaoVelSaved) {
        currentChar.substats.refl = currentChar.substats.origRefl || 0;
        currentChar.substats.vcorp = currentChar.substats.origVcorp || 0;
        currentChar.substats.exaustaoVelSaved = false;
    }

    let passiveV = Math.round((V + flatBonus.v) * (1 + bonus.v));
    let zoanBaseV = passiveV; if(zBonus.v > 0) zoanBaseV = Math.round(passiveV * (1 + zBonus.v));
    let totalV = Math.round((zoanBaseV + itemFlat.v) * (1 + itemBonus.v));
    let elTotalV = document.getElementById('total-v');
    elTotalV.innerText = "Total: " + totalV.toLocaleString("pt-BR");
    elTotalV.dataset.passive = passiveV; elTotalV.dataset.active = totalV;
    document.getElementById('container-boxVel').style.display = totalV > 0 ? "block" : "none";
    
    if(totalV === 0) { currentChar.substats.refl = 0; currentChar.substats.vcorp = 0; }
    
    let REF = currentChar.substats.refl || 0, VCORP = currentChar.substats.vcorp || 0;
    let totalVelSub = REF + VCORP;
    
    if(!isSuperAdmin && totalVelSub > totalV) {
        let diff = totalVelSub - totalV;
        let active = document.activeElement;
        if(active && active.id === 'sub-refl') { REF -= diff; currentChar.substats.refl = REF; }
        else if(active && active.id === 'sub-vcorp') { VCORP -= diff; currentChar.substats.vcorp = VCORP; }
        else {
            if (totalVelSub > 0) {
                let pctRefl = REF / totalVelSub;
                REF = Math.floor(totalV * pctRefl);
                VCORP = totalV - REF;
                currentChar.substats.refl = REF;
                currentChar.substats.vcorp = VCORP;
            } else {
                REF = 0; VCORP = 0;
                currentChar.substats.refl = 0; currentChar.substats.vcorp = 0;
            }
        }
        document.getElementById('avisoVel').style.display = "block"; document.getElementById('avisoVel').textContent = `Limite atingido!\n Máx: ${totalV.toLocaleString("pt-BR")}`;
    } else if (totalVelSub < totalV && totalV > 0) {
        let diff = totalV - totalVelSub;
        document.getElementById('avisoVel').style.display = "block"; document.getElementById('avisoVel').textContent = `Pontos não distribuídos nos sub-atributos de Velocidade: ${diff.toLocaleString("pt-BR")}`;
    } else { document.getElementById('avisoVel').style.display = "none"; }
    
    let elRefl = document.getElementById('sub-refl');
    let fmtRefl = currentChar.substats.refl ? currentChar.substats.refl.toLocaleString("pt-BR") : "";
    if (elRefl && elRefl.value !== fmtRefl) elRefl.value = fmtRefl;

    let elVcorp = document.getElementById('sub-vcorp');
    let fmtVcorp = currentChar.substats.vcorp ? currentChar.substats.vcorp.toLocaleString("pt-BR") : "";
    if (elVcorp && elVcorp.value !== fmtVcorp) elVcorp.value = fmtVcorp;

    let hasWaterDiff = (waterBuffV !== 0 || bonus.vAgua !== 0 || flatBonus.vAgua !== 0 || bonus.reflAgua !== 0 || flatBonus.reflAgua !== 0 || bonus.vcorpAgua !== 0 || flatBonus.vcorpAgua !== 0);
    let elBoxVelAgua = document.getElementById('container-boxVelAgua');
    if (elBoxVelAgua) {
        if (hasWaterDiff && V > 0) {
            elBoxVelAgua.style.display = "block";
            
            let totalBonusVAgua = bonus.v + waterBuffV + bonus.vAgua;
            let totalFlatBonusVAgua = flatBonus.v + flatBonus.vAgua;
            let totalVAgua = Math.round((V + totalFlatBonusVAgua) * (1 + totalBonusVAgua));
            document.getElementById('total-vAgua').innerText = "Total na Água: " + totalVAgua.toLocaleString("pt-BR");
            
            if(typeof currentChar.substats.reflAgua === 'undefined') currentChar.substats.reflAgua = 0;
            if(typeof currentChar.substats.vcorpAgua === 'undefined') currentChar.substats.vcorpAgua = 0;
            
            let REFAgua = currentChar.substats.reflAgua || 0, VCORPAgua = currentChar.substats.vcorpAgua || 0;
            let isBuffAgua = totalVAgua >= totalV;

            if (isBuffAgua) {
                if (REFAgua < REF) { REFAgua = REF; currentChar.substats.reflAgua = REFAgua; }
                if (VCORPAgua < VCORP) { VCORPAgua = VCORP; currentChar.substats.vcorpAgua = VCORPAgua; }
            } else {
                if (REFAgua > REF) { REFAgua = REF; currentChar.substats.reflAgua = REFAgua; }
                if (VCORPAgua > VCORP) { VCORPAgua = VCORP; currentChar.substats.vcorpAgua = VCORPAgua; }
            }
            
            let totalVelSubAgua = REFAgua + VCORPAgua;
            
            if(!isSuperAdmin && totalVelSubAgua > totalVAgua) {
                let diff = totalVelSubAgua - totalVAgua;
                let active = document.activeElement;
                if(active && active.id === 'sub-reflAgua') { 
                    REFAgua -= diff; 
                    if(isBuffAgua && REFAgua < REF) { VCORPAgua -= (REF - REFAgua); REFAgua = REF; currentChar.substats.vcorpAgua = VCORPAgua; }
                    currentChar.substats.reflAgua = REFAgua; 
                }
                else if(active && active.id === 'sub-vcorpAgua') { 
                    VCORPAgua -= diff; 
                    if(isBuffAgua && VCORPAgua < VCORP) { REFAgua -= (VCORP - VCORPAgua); VCORPAgua = VCORP; currentChar.substats.reflAgua = REFAgua; }
                    currentChar.substats.vcorpAgua = VCORPAgua; 
                }
                else {
                    if(isBuffAgua) {
                        if(VCORPAgua - diff >= VCORP) { VCORPAgua -= diff; currentChar.substats.vcorpAgua = VCORPAgua; }
                        else if(REFAgua - diff >= REF) { REFAgua -= diff; currentChar.substats.reflAgua = REFAgua; }
                        else { REFAgua = REF; VCORPAgua = VCORP; currentChar.substats.reflAgua = REFAgua; currentChar.substats.vcorpAgua = VCORPAgua; }
                    } else {
                        if (totalVelSubAgua > 0) {
                            let pctReflAgua = REFAgua / totalVelSubAgua;
                            REFAgua = Math.floor(totalVAgua * pctReflAgua);
                            VCORPAgua = totalVAgua - REFAgua;
                            currentChar.substats.reflAgua = REFAgua;
                            currentChar.substats.vcorpAgua = VCORPAgua;
                        } else {
                            REFAgua = 0; VCORPAgua = 0;
                            currentChar.substats.reflAgua = 0; currentChar.substats.vcorpAgua = 0;
                        }
                    }
                }
                document.getElementById('avisoVelAgua').style.display = "block"; document.getElementById('avisoVelAgua').textContent = `Limite atingido!\n Máx: ${totalVAgua.toLocaleString("pt-BR")}`;
            } else if (totalVelSubAgua < totalVAgua && totalVAgua > 0) {
                let diff = totalVAgua - totalVelSubAgua;
                document.getElementById('avisoVelAgua').style.display = "block"; document.getElementById('avisoVelAgua').textContent = `Pontos não distribuídos na Água: ${diff.toLocaleString("pt-BR")}`;
            } else { document.getElementById('avisoVelAgua').style.display = "none"; }
            
            let elReflAgua = document.getElementById('sub-reflAgua');
            let fmtReflAgua = currentChar.substats.reflAgua ? currentChar.substats.reflAgua.toLocaleString("pt-BR") : "";
            if (elReflAgua && elReflAgua.value !== fmtReflAgua) elReflAgua.value = fmtReflAgua;

            let elVcorpAgua = document.getElementById('sub-vcorpAgua');
            let fmtVcorpAgua = currentChar.substats.vcorpAgua ? currentChar.substats.vcorpAgua.toLocaleString("pt-BR") : "";
            if (elVcorpAgua && elVcorpAgua.value !== fmtVcorpAgua) elVcorpAgua.value = fmtVcorpAgua;
        } else {
            elBoxVelAgua.style.display = "none";
            if(currentChar.substats.reflAgua) currentChar.substats.reflAgua = 0; 
            if(currentChar.substats.vcorpAgua) currentChar.substats.vcorpAgua = 0;
        }
    }

    let tempAAlc = currentChar.substats.amiAlc || 0, tempADur = currentChar.substats.amiDur || 0, tempAPot = currentChar.substats.amiPot || 0, tempAVel = currentChar.substats.amiVel || 0;
    let tempBaseAmiStats = 0;
    if(i.hasAmiAlc) tempBaseAmiStats++; if(i.hasAmiDur) tempBaseAmiStats++; if(i.hasAmiPot) tempBaseAmiStats++; if(i.hasAmiVel) tempBaseAmiStats++;
    let tempControlePct = 0;
    if(tempBaseAmiStats > 0) {
        let currentBasePoints = tempAAlc + tempADur + tempAPot + tempAVel;
        tempControlePct = parseFloat(((currentBasePoints / (tempBaseAmiStats * 10000)) * 100).toFixed(2));
    }
    
    let calcAVelFinalBox = Math.round(((currentChar.substats.amiVel || 0) + flatBonus.amiVel) * (1 + bonus.amiVel));
    let finalAkumaVelBox = 0;
    if (i.hasAmiVel && calcAVelFinalBox > 0) {
        let baseAkumaVelBox = Math.floor(calcAVelFinalBox * (tempControlePct / 100));
        let buffAmiVelValBox = parseInt(i.amiVelBuff) || 0;
        if (buffAmiVelValBox > 0) finalAkumaVelBox = baseAkumaVelBox + Math.floor(baseAkumaVelBox * (buffAmiVelValBox / 100));
        else finalAkumaVelBox = baseAkumaVelBox;
    }

    let elBoxVelAkuma = document.getElementById('container-boxVelAkuma');
    if (elBoxVelAkuma) {
        if (i.amiVelAtivo && finalAkumaVelBox > 0) {
            elBoxVelAkuma.style.display = "block";
            document.getElementById('total-vAkuma').innerText = "Adicional: " + finalAkumaVelBox.toLocaleString("pt-BR");
            
            if(typeof currentChar.substats.reflAkuma === 'undefined') currentChar.substats.reflAkuma = 0;
            if(typeof currentChar.substats.vcorpAkuma === 'undefined') currentChar.substats.vcorpAkuma = 0;
            
            let REFAkuma = currentChar.substats.reflAkuma || 0;
            let VCORPAkuma = currentChar.substats.vcorpAkuma || 0;
            let totalVelSubAkuma = REFAkuma + VCORPAkuma;
            
            if(!isSuperAdmin && totalVelSubAkuma > finalAkumaVelBox) {
                let diff = totalVelSubAkuma - finalAkumaVelBox;
                let active = document.activeElement;
                if(active && active.id === 'sub-reflAkuma') { REFAkuma -= diff; currentChar.substats.reflAkuma = Math.max(0, REFAkuma); }
                else if(active && active.id === 'sub-vcorpAkuma') { VCORPAkuma -= diff; currentChar.substats.vcorpAkuma = Math.max(0, VCORPAkuma); }
                else {
                    if(VCORPAkuma >= diff) { VCORPAkuma -= diff; currentChar.substats.vcorpAkuma = Math.max(0, VCORPAkuma); }
                    else if(REFAkuma >= diff) { REFAkuma -= diff; currentChar.substats.reflAkuma = Math.max(0, REFAkuma); }
                }
                document.getElementById('avisoVelAkuma').style.display = "block"; document.getElementById('avisoVelAkuma').textContent = `Limite atingido!\n Máx: ${finalAkumaVelBox.toLocaleString("pt-BR")}`;
            } else if (totalVelSubAkuma < finalAkumaVelBox && finalAkumaVelBox > 0) {
                let diff = finalAkumaVelBox - totalVelSubAkuma;
                document.getElementById('avisoVelAkuma').style.display = "block"; document.getElementById('avisoVelAkuma').textContent = `Pontos não distribuídos no Adicional: ${diff.toLocaleString("pt-BR")}`;
            } else { document.getElementById('avisoVelAkuma').style.display = "none"; }
            
            let elReflAkuma = document.getElementById('sub-reflAkuma');
            let fmtReflAkuma = currentChar.substats.reflAkuma ? currentChar.substats.reflAkuma.toLocaleString("pt-BR") : "";
            if (elReflAkuma && elReflAkuma.value !== fmtReflAkuma) elReflAkuma.value = fmtReflAkuma;

            let elVcorpAkuma = document.getElementById('sub-vcorpAkuma');
            let fmtVcorpAkuma = currentChar.substats.vcorpAkuma ? currentChar.substats.vcorpAkuma.toLocaleString("pt-BR") : "";
            if (elVcorpAkuma && elVcorpAkuma.value !== fmtVcorpAkuma) elVcorpAkuma.value = fmtVcorpAkuma;
        } else {
            elBoxVelAkuma.style.display = "none";
            if(currentChar.substats.reflAkuma) currentChar.substats.reflAkuma = 0; 
            if(currentChar.substats.vcorpAkuma) currentChar.substats.vcorpAkuma = 0;
        }
    }

    let ESP = currentChar.stats.esp; 
    
    let maxEspInput = 35000;
    if (temFruta) maxEspInput = 30000;
    if (ln === "Silvers") maxEspInput = 45000;
    if ((currentChar.substats.hRei || 0) > 0) maxEspInput += 5000;
    
    if (!isSuperAdmin && ESP > maxEspInput) {
        ESP = maxEspInput;
        currentChar.stats.esp = ESP;
        let espElUpdate = document.getElementById('stat-esp');
        if (espElUpdate) espElUpdate.value = ESP.toLocaleString("pt-BR");
    }
    
    let passiveEsp = Math.round((ESP + flatBonus.esp) * (1 + bonus.esp));
    let totalEsp = Math.round((passiveEsp + itemFlat.esp) * (1 + itemBonus.esp));
    document.getElementById('total-esp').innerText = "Total: " + totalEsp.toLocaleString("pt-BR");
    
    let HA = currentChar.substats.hArm || 0, HO = currentChar.substats.hObs || 0, HR = currentChar.substats.hRei || 0;
    let totalHaki = HA + HO + HR;
    
    if(!isSuperAdmin && totalHaki > totalEsp) {
        let diff = totalHaki - totalEsp; let active = document.activeElement;
        if(active && active.id === 'sub-hArm') { HA -= diff; currentChar.substats.hArm = HA; }
        else if(active && active.id === 'sub-hObs') { HO -= diff; currentChar.substats.hObs = HO; }
        else if(active && active.id === 'sub-hRei') { HR -= diff; currentChar.substats.hRei = HR; }
        else {
            if(HR >= diff) { HR -= diff; currentChar.substats.hRei = HR; } else if(HO >= diff) { HO -= diff; currentChar.substats.hObs = HO; } else if(HA >= diff) { HA -= diff; currentChar.substats.hArm = HA; }
        }
        document.getElementById('avisoEsp').style.display = "block"; document.getElementById('avisoEsp').textContent = `Limite atingido! Máx: ${totalEsp.toLocaleString("pt-BR")}`;
    } else if (totalHaki < totalEsp && totalEsp > 0) {
        let diff = totalEsp - totalHaki;
        document.getElementById('avisoEsp').style.display = "block"; document.getElementById('avisoEsp').textContent = `Pontos não distribuídos nos sub-atributos de Espírito: ${diff.toLocaleString("pt-BR")}`;
    } else { document.getElementById('avisoEsp').style.display = "none"; }
    
    let elHArm = document.getElementById('sub-hArm');
    let fmtHArm = currentChar.substats.hArm ? currentChar.substats.hArm.toLocaleString("pt-BR") : "";
    if (elHArm && elHArm.value !== fmtHArm) elHArm.value = fmtHArm;

    let elHObs = document.getElementById('sub-hObs');
    let fmtHObs = currentChar.substats.hObs ? currentChar.substats.hObs.toLocaleString("pt-BR") : "";
    if (elHObs && elHObs.value !== fmtHObs) elHObs.value = fmtHObs;

    let elHRei = document.getElementById('sub-hRei');
    let fmtHRei = currentChar.substats.hRei ? currentChar.substats.hRei.toLocaleString("pt-BR") : "";
    if (elHRei && elHRei.value !== fmtHRei) elHRei.value = fmtHRei;

    let haPts = finalHA;
    let hoPts = finalHO;
    let hrPts = finalHR;

    document.getElementById('cont-ha1').style.display = haPts > 0 ? 'block' : 'none';
    document.getElementById('cont-ha2').style.display = (haPts > 0 && i.unlockHA1) ? 'block' : 'none';
    document.getElementById('cont-ha3').style.display = (haPts >= 3000 && i.unlockHA2) ? 'block' : 'none';
    document.getElementById('cont-ha4').style.display = (haPts >= 5000 && i.unlockHA2) ? 'block' : 'none';
    document.getElementById('cont-ha5').style.display = (haPts >= 7000 && i.unlockHA2) ? 'block' : 'none';
    document.getElementById('cont-ha6').style.display = (haPts >= 8000 && i.unlockHA5) ? 'block' : 'none';

    document.getElementById('cont-ho2').style.display = (hoPts >= 3000) ? 'block' : 'none';
    document.getElementById('cont-ho3').style.display = (hoPts >= 5000 && i.unlockHO2) ? 'block' : 'none';
    document.getElementById('cont-ho4').style.display = (hoPts >= 8000 && i.unlockHO3) ? 'block' : 'none';

    document.getElementById('cont-hr2').style.display = (hrPts >= 1000) ? 'block' : 'none';
    document.getElementById('cont-hr3').style.display = (hrPts >= 3000 && i.unlockHR2) ? 'block' : 'none';
    document.getElementById('cont-hr4').style.display = (hrPts >= 5000 && i.unlockHR3) ? 'block' : 'none';
    document.getElementById('cont-hr5').style.display = (hrPts >= 7500 && hoPts >= 8000 && i.unlockHO4) ? 'block' : 'none';
    document.getElementById('cont-hr6').style.display = (hrPts >= 10000 && i.unlockHA1 && i.unlockHA2 && i.unlockHA3 && i.unlockHA4 && i.unlockHA5 && i.unlockHO2 && i.unlockHO3 && i.unlockHR2 && i.unlockHR3 && i.unlockHR4) ? 'block' : 'none';

    ['amiAlc', 'amiDur', 'amiPot', 'amiVel', 'amiDesp'].forEach(f => {
        let chk = document.getElementById('chk-' + f); let inp = document.getElementById('sub-' + f); let key = 'has' + f.charAt(0).toUpperCase() + f.slice(1);
        let has = i[key]; if (chk) chk.checked = has; if (inp) inp.disabled = !has || isReadOnly;
    });

    let AMI = currentChar.stats.ami;
    
    let baseAmiStats = 0;
    if(i.hasAmiAlc) baseAmiStats++; if(i.hasAmiDur) baseAmiStats++; if(i.hasAmiPot) baseAmiStats++; if(i.hasAmiVel) baseAmiStats++;
    
    let maxStatAmiInput = (baseAmiStats * 10000) + (i.hasAmiDesp ? 10000 : 0);
    if (!isSuperAdmin && AMI > maxStatAmiInput) {
        AMI = maxStatAmiInput;
        currentChar.stats.ami = AMI;
        let amiElUpdate = document.getElementById('stat-ami');
        if (amiElUpdate) amiElUpdate.value = AMI.toLocaleString("pt-BR");
    }

    bonus.amiAlc += bonus.ami;
    bonus.amiDur += bonus.ami;
    bonus.amiPot += bonus.ami;
    bonus.amiVel += bonus.ami;
    bonus.amiDesp += bonus.ami;
    bonus.ami = 0;

    flatBonus.amiAlc += flatBonus.ami;
    flatBonus.amiDur += flatBonus.ami;
    flatBonus.amiPot += flatBonus.ami;
    flatBonus.amiVel += flatBonus.ami;
    flatBonus.amiDesp += flatBonus.ami;
    flatBonus.ami = 0;

    let totalAmi = AMI; 
    document.getElementById('total-ami').innerText = "Total: " + totalAmi.toLocaleString("pt-BR");
    document.getElementById('box-amiSub').style.display = temFruta ? "block" : "none";
    if(AMI === 0) { currentChar.substats.amiAlc = 0; currentChar.substats.amiDur = 0; currentChar.substats.amiPot = 0; currentChar.substats.amiVel = 0; currentChar.substats.amiDesp = 0; }
    
    let activeAmiStats = baseAmiStats + (i.hasAmiDesp ? 1 : 0);

    let maxAmiPoints = 10000;

    let aAlc = currentChar.substats.amiAlc || 0, aDur = currentChar.substats.amiDur || 0, aPot = currentChar.substats.amiPot || 0, aVel = currentChar.substats.amiVel || 0, aDesp = currentChar.substats.amiDesp || 0;
    
    let controlePct = 0;
    if(baseAmiStats > 0) {
        let currentBasePoints = aAlc + aDur + aPot + aVel;
        controlePct = parseFloat(((currentBasePoints / (baseAmiStats * 10000)) * 100).toFixed(2));
    }

    let despContainer = document.getElementById('box-despertar');
    if (despContainer) {
        if (isSuperAdmin || controlePct >= 100) {
            despContainer.style.opacity = '1';
            despContainer.style.pointerEvents = 'auto';
        } else {
            despContainer.style.opacity = '0.5';
            despContainer.style.pointerEvents = 'none';
            if (aDesp > 0 || i.hasAmiDesp) {
                currentChar.substats.amiDesp = 0;
                i.hasAmiDesp = false;
                aDesp = 0;
                let chkDesp = document.getElementById('chk-amiDesp'); if(chkDesp) chkDesp.checked = false;
                
                let subDesp = document.getElementById('sub-amiDesp'); 
                if(subDesp && subDesp.value !== "") subDesp.value = "";
                
                maxStatAmiInput = baseAmiStats * 10000;
                if (AMI > maxStatAmiInput) {
                    AMI = maxStatAmiInput;
                    currentChar.stats.ami = AMI;
                    let amiElUpdate = document.getElementById('stat-ami');
                    if (amiElUpdate) amiElUpdate.value = AMI.toLocaleString("pt-BR");
                    totalAmi = AMI; document.getElementById('total-ami').innerText = "Total: " + totalAmi.toLocaleString("pt-BR");
                }
                activeAmiStats = baseAmiStats;
                maxAmiPoints = 10000;
            }
        }
    }

    let limitAmiExcedido = false;
    if(!isSuperAdmin) {
        if(aAlc > maxAmiPoints) { aAlc = maxAmiPoints; currentChar.substats.amiAlc = maxAmiPoints; limitAmiExcedido = true; }
        if(aDur > maxAmiPoints) { aDur = maxAmiPoints; currentChar.substats.amiDur = maxAmiPoints; limitAmiExcedido = true; }
        if(aPot > maxAmiPoints) { aPot = maxAmiPoints; currentChar.substats.amiPot = maxAmiPoints; limitAmiExcedido = true; }
        if(aVel > maxAmiPoints) { aVel = maxAmiPoints; currentChar.substats.amiVel = maxAmiPoints; limitAmiExcedido = true; }
        if(aDesp > maxAmiPoints) { aDesp = maxAmiPoints; currentChar.substats.amiDesp = maxAmiPoints; limitAmiExcedido = true; }
    }
    
    let totalAmiSub = aAlc + aDur + aPot + aVel + aDesp;
    let pontosDisponiveis = totalAmi - totalAmiSub;
    let elDisp = document.getElementById('ami-distribuiveis');
    if(elDisp) elDisp.textContent = `Disponível: ${Math.max(0, pontosDisponiveis).toLocaleString("pt-BR")}`;
    
    if(!isSuperAdmin && totalAmiSub > totalAmi) {
        let diff = totalAmiSub - totalAmi; let active = document.activeElement;
        if(active && active.id === 'sub-amiAlc') { aAlc -= diff; currentChar.substats.amiAlc = Math.max(0, aAlc); }
        else if(active && active.id === 'sub-amiDur') { aDur -= diff; currentChar.substats.amiDur = Math.max(0, aDur); }
        else if(active && active.id === 'sub-amiPot') { aPot -= diff; currentChar.substats.amiPot = Math.max(0, aPot); }
        else if(active && active.id === 'sub-amiVel') { aVel -= diff; currentChar.substats.amiVel = Math.max(0, aVel); }
        else if(active && active.id === 'sub-amiDesp') { aDesp -= diff; currentChar.substats.amiDesp = Math.max(0, aDesp); }
        else {
            if(aDesp >= diff) { aDesp -= diff; currentChar.substats.amiDesp = Math.max(0, aDesp); }
            else if(aVel >= diff) { aVel -= diff; currentChar.substats.amiVel = Math.max(0, aVel); } 
            else if(aPot >= diff) { aPot -= diff; currentChar.substats.amiPot = Math.max(0, aPot); }
            else if(aDur >= diff) { aDur -= diff; currentChar.substats.amiDur = Math.max(0, aDur); } 
            else if(aAlc >= diff) { aAlc -= diff; currentChar.substats.amiAlc = Math.max(0, aAlc); }
        }
        document.getElementById('avisoAmi').style.display = "block"; document.getElementById('avisoAmi').textContent = `Limite atingido! Máx: ${totalAmi.toLocaleString("pt-BR")}`;
    } else if (limitAmiExcedido) {
        document.getElementById('avisoAmi').style.display = "block"; document.getElementById('avisoAmi').textContent = `Máximo de ${maxAmiPoints.toLocaleString("pt-BR")} pontos por atributo alcançado!`;
    } else { document.getElementById('avisoAmi').style.display = "none"; }
    
    let elAmiAlc = document.getElementById('sub-amiAlc');
    let fmtAmiAlc = currentChar.substats.amiAlc ? currentChar.substats.amiAlc.toLocaleString("pt-BR") : "";
    if (elAmiAlc && elAmiAlc.value !== fmtAmiAlc) elAmiAlc.value = fmtAmiAlc;

    let elAmiDur = document.getElementById('sub-amiDur');
    let fmtAmiDur = currentChar.substats.amiDur ? currentChar.substats.amiDur.toLocaleString("pt-BR") : "";
    if (elAmiDur && elAmiDur.value !== fmtAmiDur) elAmiDur.value = fmtAmiDur;

    let elAmiPot = document.getElementById('sub-amiPot');
    let fmtAmiPot = currentChar.substats.amiPot ? currentChar.substats.amiPot.toLocaleString("pt-BR") : "";
    if (elAmiPot && elAmiPot.value !== fmtAmiPot) elAmiPot.value = fmtAmiPot;

    let elAmiVel = document.getElementById('sub-amiVel');
    let fmtAmiVel = currentChar.substats.amiVel ? currentChar.substats.amiVel.toLocaleString("pt-BR") : "";
    if (elAmiVel && elAmiVel.value !== fmtAmiVel) elAmiVel.value = fmtAmiVel;

    let despEl2 = document.getElementById('sub-amiDesp');
    let fmtDesp = currentChar.substats.amiDesp ? currentChar.substats.amiDesp.toLocaleString("pt-BR") : "";
    if (despEl2 && despEl2.value !== fmtDesp) despEl2.value = fmtDesp;

    let amiResPctVal = parseInt(i.amiResPct) || 0;
    let calcAPotRes = Math.round((aPot + flatBonus.amiPot) * (1 + bonus.amiPot));
    if (amiResPctVal > 0 && calcAPotRes > 0) {
        let totalPotResCalc = calcAPotRes + Math.floor(calcAPotRes * (amiResPctVal / 100));
        document.getElementById('ami-res-total').textContent = `(${calcAPotRes.toLocaleString("pt-BR")} + ${amiResPctVal}% = ${totalPotResCalc.toLocaleString("pt-BR")} de Resistência)`;
    } else { document.getElementById('ami-res-total').textContent = ""; }

    let amiVelBuffVal = parseInt(i.amiVelBuff) || 0;
    let calcAVelUI = Math.round((aVel + flatBonus.amiVel) * (1 + bonus.amiVel));
    if (calcAVelUI > 0) {
        let baseAkumaVelUI = Math.floor(calcAVelUI * (controlePct / 100));
        let finalAkumaVelUI = baseAkumaVelUI;
        if (amiVelBuffVal > 0) {
            finalAkumaVelUI = baseAkumaVelUI + Math.floor(baseAkumaVelUI * (amiVelBuffVal / 100));
            document.getElementById('ami-vel-total').textContent = `(${baseAkumaVelUI.toLocaleString("pt-BR")}+${amiVelBuffVal}% = ${finalAkumaVelUI.toLocaleString("pt-BR")} de Velocidade Adicional)`;
        } else {
            document.getElementById('ami-vel-total').textContent = `(+${baseAkumaVelUI.toLocaleString("pt-BR")} de Velocidade Adicional)`;
        }
    } else {
        let elAmiVelTotal = document.getElementById('ami-vel-total');
        if (elAmiVelTotal) elAmiVelTotal.textContent = "";
    }

    let baseCalcAttr = parseInt(i.calcUseAttr) || 0;
    let buffFlat = parseInt(i.calcBuffFlat) || 0;
    let buffPct = parseInt(i.calcBuffPct) || 0;
    let step1Attr = baseCalcAttr + buffFlat;
    let calcAttrVal = step1Attr;
    if (buffPct !== 0) {
        calcAttrVal = step1Attr + Math.floor(step1Attr * (buffPct / 100));
    }

    let K = 25000;
    
    let calcAPot = Math.round((aPot + flatBonus.amiPot) * (1 + bonus.amiPot));
    let danoAmi = 0;
    let buffAmiVal = parseInt(i.amiPotBuff) || 0;
    let baseDanoAmi = 0;
    
    if (i.calcQuemAtaca === 'inimigo') {
        danoAmi = parseInt(i.calcAmiManual) || 0;
    } else {
        if (i.calcUseAmi !== 'nao') {
            baseDanoAmi = Math.floor(calcAPot * (controlePct / 100));
            danoAmi = baseDanoAmi;
            if (buffAmiVal > 0) {
                danoAmi = Math.round(baseDanoAmi * (1 + buffAmiVal / 100));
            }
        }
    }

    let calcHA = Math.round((HA + flatBonus.ha) * (1 + bonus.ha));
    let elCalcUseHakiSelect = document.getElementById('info-calcUseHaki');
    if (elCalcUseHakiSelect) {
        let htmlHaki = '<option value="nao">Não</option>';
        if (i.unlockHA1) htmlHaki += '<option value="invisivel">Invisível</option>';
        if (i.unlockHA2) htmlHaki += '<option value="visivel">Visível</option>';
        if (i.unlockHA3) htmlHaki += '<option value="imbuicao">Imbuição</option>';
        if (i.unlockHA4) htmlHaki += '<option value="fullbody">Full Body</option>';
        if (i.unlockHA5) htmlHaki += '<option value="emissao">Emissão</option>';
        if (i.unlockHA6) htmlHaki += '<option value="avancado">Avançado</option>';
        if (elCalcUseHakiSelect.innerHTML !== htmlHaki) elCalcUseHakiSelect.innerHTML = htmlHaki;
        if (Array.from(elCalcUseHakiSelect.options).some(o => o.value === i.calcUseHaki)) {
            elCalcUseHakiSelect.value = i.calcUseHaki;
        } else {
            elCalcUseHakiSelect.value = "nao";
            i.calcUseHaki = "nao";
        }
    }

    let calcHR = Math.round((HR + flatBonus.hr) * (1 + bonus.hr));
    let elCalcUseHakiReiSelect = document.getElementById('info-calcUseHakiRei');
    if (elCalcUseHakiReiSelect) {
        let htmlHakiRei = '<option value="nao">Não</option>';
        if (i.unlockHR4) htmlHakiRei += '<option value="pressao">Pressão</option>';
        if (i.unlockHR6) htmlHakiRei += '<option value="infusao">Infusão</option>';
        if (elCalcUseHakiReiSelect.innerHTML !== htmlHakiRei) elCalcUseHakiReiSelect.innerHTML = htmlHakiRei;
        if (Array.from(elCalcUseHakiReiSelect.options).some(o => o.value === i.calcUseHakiRei)) {
            elCalcUseHakiReiSelect.value = i.calcUseHakiRei;
        } else {
            elCalcUseHakiReiSelect.value = "nao";
            i.calcUseHakiRei = "nao";
        }
    }

    let danoHaki = 0;
    let hakiIgnRes = 0;
    if (i.calcQuemAtaca === 'inimigo') {
        danoHaki = parseInt(i.calcHakiManual) || 0;
    } else {
        if (calcHA > 0) {
            if (i.calcUseHaki === 'invisivel') danoHaki = Math.floor(calcHA * 0.25);
            else if (i.calcUseHaki === 'visivel') danoHaki = Math.floor(calcHA * 0.50);
            else if (i.calcUseHaki === 'imbuicao') danoHaki = Math.floor(calcHA * 0.80);
            else if (i.calcUseHaki === 'fullbody') danoHaki = calcHA;
            else if (i.calcUseHaki === 'emissao') danoHaki = calcHA;
            else if (i.calcUseHaki === 'avancado') {
                danoHaki = calcHA;
                hakiIgnRes = 25;
            }
        }
    }

    let danoHakiRei = 0;
    let hakiReiIgnRes = 0;
    let textRei = "";
    if (i.calcQuemAtaca === 'inimigo') {
        danoHakiRei = parseInt(i.calcHakiReiManual) || 0;
        textRei = "Rei: Manual";
    } else {
        if (calcHR > 0) {
            if (i.calcUseHakiRei === 'pressao') {
                danoHakiRei = Math.floor(calcHR * 0.50);
                textRei = "Rei: Pressão";
            } else if (i.calcUseHakiRei === 'infusao') {
                danoHakiRei = Math.floor(calcHR * 1.25);
                textRei = "Rei: Infusão";
                hakiReiIgnRes = 35;
            }
        }
    }

    let calcResInimiga = parseInt(i.calcInimigoRes) || 0;
    let calcResIgnManual = parseInt(i.calcResIgnorada) || 0;
    
    let ignResSourcesTexts = [];
    let totalIgnRes = 0;

    if (hakiIgnRes > 0) {
        totalIgnRes += hakiIgnRes;
        ignResSourcesTexts.push(`${hakiIgnRes}% de Armamento Avançado`);
    }
    if (hakiReiIgnRes > 0) {
        totalIgnRes += hakiReiIgnRes;
        ignResSourcesTexts.push(`${hakiReiIgnRes}% de Haki do Rei Infusão`);
    }

    if (i.alcunhasList && i.alcunhaAtiva) {
        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        if (ativa && ativa.buffs) {
            ativa.buffs.forEach(b => {
                if (b.cond && (!i.alcunhaCondicoes || !i.alcunhaCondicoes[b.cond])) return;
                if (b.stat === 'ignRes') {
                    totalIgnRes += b.val;
                    ignResSourcesTexts.push(`${b.val}% de ${ativa.nome}`);
                }
            });
        }
    }
    
    if (i.armasEquipadasList) {
        i.armasEquipadasList.forEach(a => {
            if (a.ativo && a.stat === 'ignRes') {
                let val = parseInt(a.val) || 0;
                totalIgnRes += val;
                ignResSourcesTexts.push(`${val}% de ${a.nome || 'Item'}`);
            }
        });
    }

    if (calcResIgnManual > 0) {
        totalIgnRes += calcResIgnManual;
        ignResSourcesTexts.push(`${calcResIgnManual}% manual`);
    }

    let calcResBruta = calcResInimiga;
    if (totalIgnRes > 0) {
        calcResBruta = calcResInimiga - Math.floor(calcResInimiga * (totalIgnRes / 100));
    }
    
    let danoBonusResNegativa = 0;
    let calcRes = calcResBruta;
    if (calcResBruta < 0) {
        danoBonusResNegativa = Math.abs(calcResBruta);
        calcRes = 0;
    }

    let reducaoDanoGeral = parseInt(i.calcDanoIgnorado) || 0;
    let reducaoDanoAmi = parseInt(i.calcDanoAmiIgnorado) || 0;
    let favArmDanoFinal = 0;

    if (i.calcQuemAtaca === 'inimigo') {
        let getReductions = (buffs) => {
            buffs.forEach(b => {
                if (b.stat === 'ignDanoGeral') reducaoDanoGeral += parseInt(b.val) || 0;
                else if (b.stat === 'ignDanoAmi') reducaoDanoAmi += parseInt(b.val) || 0;
            });
        };

        if (i.alcunhasList && i.alcunhaAtiva) {
            let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
            if (ativa && ativa.buffs) getReductions(ativa.buffs.filter(b => !b.cond || (i.alcunhaCondicoes && i.alcunhaCondicoes[b.cond])));
        }
        if (i.armasEquipadasList) getReductions(i.armasEquipadasList.filter(a => a.ativo));
    }

    if (hasHab("Espírito Contagiante") && totalBase >= 15000 && i.calcQuemAtaca === 'inimigo') {
        reducaoDanoGeral += 10;
    }

    if (hasHab("Favoritismo Armista")) {
        let fav = i.habFavArmistaAtivo;
        if (totalBase >= 15000) {
            if (fav === "criacao_favorita") {
                if (i.calcQuemAtaca === 'inimigo') {
                    reducaoDanoGeral += 20;
                } else {
                    favArmDanoFinal = 20;
                }
            }
        } else if (totalBase >= 5000 && totalBase < 15000) {
            if (fav === "generica" && i.calcQuemAtaca !== 'inimigo') {
                favArmDanoFinal = -10;
            }
        }
    }

    let calcAttrSemAmi = calcAttrVal;
    
    if (reducaoDanoAmi > 0) {
        danoAmi = Math.max(0, danoAmi - Math.floor(danoAmi * (reducaoDanoAmi / 100)));
    }
    calcAttrVal += danoHaki + danoHakiRei + danoAmi;

    let calcFator = K / (K + calcRes);
    let danoFisico = Math.floor(calcAttrVal * calcFator);
    let buffDanoFinalPct = parseInt(i.calcBuffDanoFinalPct) || 0;

    let extraFlatDano = i.calcQuemAtaca === 'inimigo' ? 0 : (flatBonus.dano || 0) + (itemFlat.dano || 0);
    let extraPctDano = i.calcQuemAtaca === 'inimigo' ? 0 : Math.round(((bonus.dano || 0) + (itemBonus.dano || 0)) * 100);
    let totalPctDano = buffDanoFinalPct + extraPctDano + favArmDanoFinal;

    let baseComFlat = danoFisico + extraFlatDano + danoBonusResNegativa;
    let calcDanoFinal = baseComFlat;

    if (totalPctDano !== 0) {
        calcDanoFinal = baseComFlat + Math.floor(baseComFlat * (totalPctDano / 100));
    }

    let valDanoIgnorado = 0;
    let calcDanoAntesIgnorado = calcDanoFinal;
    
    if (reducaoDanoGeral > 0) {
        if (reducaoDanoGeral > 100) reducaoDanoGeral = 100;
        valDanoIgnorado = Math.floor(calcDanoFinal * (reducaoDanoGeral / 100));
        calcDanoFinal = calcDanoFinal - valDanoIgnorado;
    }
    
    document.getElementById('calc-dano-final').textContent = calcDanoFinal.toLocaleString("pt-BR");
    
    let calcFormTexto = "";
    if (buffFlat > 0 || buffPct !== 0 || danoAmi > 0 || danoHaki > 0 || danoHakiRei > 0 || totalPctDano !== 0 || extraFlatDano !== 0) {
        calcFormTexto += `<span style="color:#0dcaf0;">${baseCalcAttr.toLocaleString("pt-BR")} (Atributo)</span>`;
        if (buffFlat > 0) calcFormTexto += ` <span style="color:#ffc107;">+ ${buffFlat.toLocaleString("pt-BR")} (Bônus de Estilo) = ${step1Attr.toLocaleString("pt-BR")}</span>`;
        if (buffPct !== 0) calcFormTexto += ` <span style="color:#198754;">+ ${buffPct}% (Buff Ativo) = ${calcAttrSemAmi.toLocaleString("pt-BR")}</span>`;
        
        let somaAtual = calcAttrSemAmi;
        if (danoAmi > 0) {
            somaAtual += danoAmi;
            if (i.calcQuemAtaca === 'inimigo') {
                calcFormTexto += ` <span style="color:#dc3545;">+ ${danoAmi.toLocaleString("pt-BR")} (Akuma no Mi Manual) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
            } else {
                if (buffAmiVal > 0) {
                    calcFormTexto += ` <span style="color:#dc3545;">+ ${danoAmi.toLocaleString("pt-BR")} (Akuma no Mi: ${controlePct.toLocaleString("pt-BR")}% de ${aPot.toLocaleString("pt-BR")} + ${buffAmiVal}%) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
                } else {
                    calcFormTexto += ` <span style="color:#dc3545;">+ ${danoAmi.toLocaleString("pt-BR")} (Akuma no Mi: ${controlePct.toLocaleString("pt-BR")}% de ${aPot.toLocaleString("pt-BR")}) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
                }
            }
        }
        if (danoHaki > 0) {
            somaAtual += danoHaki;
            let labelArm = "Armamento Manual";
            if (i.calcQuemAtaca !== 'inimigo') {
                let armLabels = {
                    "invisivel": "Armamento: Invisível",
                    "visivel": "Armamento: Visível",
                    "imbuicao": "Armamento: Imbuição",
                    "fullbody": "Armamento: Full Body",
                    "emissao": "Armamento: Emissão",
                    "avancado": "Armamento: Avançado"
                };
                labelArm = armLabels[i.calcUseHaki] || "Armamento";
            }
            calcFormTexto += ` <span style="color:#a461ff;">+ ${danoHaki.toLocaleString("pt-BR")} (${labelArm}) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
        }
        if (danoHakiRei > 0) {
            somaAtual += danoHakiRei;
            calcFormTexto += ` <span style="color:#a461ff;">+ ${danoHakiRei.toLocaleString("pt-BR")} (${textRei}) = ${somaAtual.toLocaleString("pt-BR")}</span>`;
        }
        calcFormTexto += `<br>`;
    }
    if (totalIgnRes > 0) {
        calcFormTexto += `Resistência Ignorada: ${calcResInimiga.toLocaleString("pt-BR")} - ${totalIgnRes}% *(${ignResSourcesTexts.join(" + ")})* = ${calcResBruta.toLocaleString("pt-BR")}<br>`;
    }
    calcFormTexto += `Dano Básico: ${calcAttrVal.toLocaleString("pt-BR")} × (${K.toLocaleString("pt-BR")} / (${K.toLocaleString("pt-BR")} + ${calcRes.toLocaleString("pt-BR")})) = ${danoFisico.toLocaleString("pt-BR")}`;
    
    if (danoBonusResNegativa > 0) {
        let somadoParcial = danoFisico + danoBonusResNegativa;
        calcFormTexto += `<br><span style="color:#ff69b4;">Dano Adicional (Resistência Negativa): +${danoBonusResNegativa.toLocaleString("pt-BR")} = ${somadoParcial.toLocaleString("pt-BR")}</span>`;
    }
    
    if (extraFlatDano !== 0) {
        let baseSomaText = danoBonusResNegativa > 0 ? (danoFisico + danoBonusResNegativa) : danoFisico;
        calcFormTexto += `<br><span style="color:#0dcaf0;">Bônus Fixo (Itens/Alcunha): ${baseSomaText.toLocaleString("pt-BR")} + ${extraFlatDano.toLocaleString("pt-BR")} = ${baseComFlat.toLocaleString("pt-BR")}</span>`;
    }
    if (totalPctDano !== 0) {
        let valToPrint = typeof calcDanoAntesIgnorado !== 'undefined' ? calcDanoAntesIgnorado : calcDanoFinal;
        calcFormTexto += `<br><span style="color:#ffc107;">Dano com Buff Final: ${baseComFlat.toLocaleString("pt-BR")} + ${totalPctDano}% = ${valToPrint.toLocaleString("pt-BR")}</span>`;
    }
    if (reducaoDanoGeral > 0) {
        calcFormTexto += `<br><span style="color:#dc3545;">Dano Ignorado: ${calcDanoAntesIgnorado.toLocaleString("pt-BR")} - ${reducaoDanoGeral}% = ${calcDanoFinal.toLocaleString("pt-BR")}</span>`;
    }
    document.getElementById('calc-formula').innerHTML = calcFormTexto;

    document.getElementById('estamina-total').textContent = estTotalVal.toLocaleString("pt-BR");
    let elEstAtual = document.getElementById('estamina-atual');
    if (elEstAtual) elEstAtual.value = i.estaminaAtual.toLocaleString("pt-BR");

    let elEstHakiArm = document.getElementById('info-estaminaHakiArm');
    if (elEstHakiArm && Array.from(elEstHakiArm.options).some(o => o.value === i.estaminaHakiArm)) {
        elEstHakiArm.value = i.estaminaHakiArm;
    } else if (elEstHakiArm) {
        elEstHakiArm.value = "nenhum";
        i.estaminaHakiArm = "nenhum";
    }

    let elEstHakiObs = document.getElementById('info-estaminaHakiObs');
    if (elEstHakiObs && Array.from(elEstHakiObs.options).some(o => o.value === i.estaminaHakiObs)) {
        elEstHakiObs.value = i.estaminaHakiObs;
    } else if (elEstHakiObs) {
        elEstHakiObs.value = "nenhum";
        i.estaminaHakiObs = "nenhum";
    }

    let elEstHakiRei = document.getElementById('info-estaminaHakiRei');
    if (elEstHakiRei && Array.from(elEstHakiRei.options).some(o => o.value === i.estaminaHakiRei)) {
        elEstHakiRei.value = i.estaminaHakiRei;
    } else if (elEstHakiRei) {
        elEstHakiRei.value = "nenhum";
        i.estaminaHakiRei = "nenhum";
    }

    let eVel = parseInt(i.estaminaVelocidade) || 0;
    let eDano = parseInt(i.estaminaDano) || 0;
    let eBuff = parseInt(i.estaminaBuffPct) || 0;

    let custoVel = Math.floor(eVel * 0.10);
    let custoDano = Math.floor(eDano * 0.10);
    let custoBuff = Math.floor((eBuff / 10) * 150);
    
    let subtotalAcao = custoVel + custoDano + custoBuff;
    let percHaki = 0;
    let fixoHaki = 0;

    if (i.estaminaHakiArm === 'invisivel') percHaki += 5;
    else if (i.estaminaHakiArm === 'visivel') percHaki += 10;
    else if (i.estaminaHakiArm === 'emissao') percHaki += 25;
    else if (i.estaminaHakiArm === 'avancado') percHaki += 50;
    else if (i.estaminaHakiArm === 'fullbody') percHaki += 75;

    if (i.estaminaHakiObs === 'intencao') fixoHaki += 500;
    else if (i.estaminaHakiObs === 'premonicao') fixoHaki += 750;
    else if (i.estaminaHakiObs === 'avancado') percHaki += 50;

    if (i.estaminaHakiRei === 'dominacao') fixoHaki += Math.floor(estTotalVal * 0.02);
    else if (i.estaminaHakiRei === 'incapacitacao') fixoHaki += Math.floor(estTotalVal * 0.05);
    else if (i.estaminaHakiRei === 'assassinato') percHaki += 25;
    else if (i.estaminaHakiRei === 'pressao') percHaki += 50;
    else if (i.estaminaHakiRei === 'infusao') percHaki += 90;

    let custoHaki = Math.floor(subtotalAcao * (percHaki / 100)) + fixoHaki;
    let custoEstTotal = subtotalAcao + custoHaki;
    let custoBruto = custoEstTotal;
    
    let totalRedEstamina = 0;
    let fontesRedEstamina = [];

    if (hasHab("Arte da Esgrima") && totalBase >= 5000) {
        totalRedEstamina += 20;
        fontesRedEstamina.push("Arte da Esgrima");
    }
    if (hasHab("Espírito Contagiante") && totalBase >= 5000) {
        totalRedEstamina += 10;
        fontesRedEstamina.push("Espírito Contagiante");
    }
    let qtdEspiritoEst = parseInt(i.aliadosEspiritoContagiante) || 0;
    if (qtdEspiritoEst > 0) {
        totalRedEstamina += (qtdEspiritoEst * 10);
        fontesRedEstamina.push(qtdEspiritoEst > 1 ? `Aliados c/ Espírito (${qtdEspiritoEst}x)` : "Aliado c/ Espírito");
    }
    if (hasHab("QI Avançado")) {
        totalRedEstamina += 50;
        fontesRedEstamina.push("QI Avançado");
    }

    if (i.alcunhasList && i.alcunhaAtiva) {
        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        if (ativa && ativa.buffs) {
            ativa.buffs.forEach(b => {
                if (b.cond && (!i.alcunhaCondicoes || !i.alcunhaCondicoes[b.cond])) return;
                if (b.stat === 'redEstamina') {
                    totalRedEstamina += b.val;
                    fontesRedEstamina.push(ativa.nome);
                }
            });
        }
    }
    
    if (i.armasEquipadasList) {
        i.armasEquipadasList.forEach(a => {
            if (a.ativo && a.stat === 'redEstamina') {
                let val = parseInt(a.val) || 0;
                totalRedEstamina += val;
                fontesRedEstamina.push(a.nome || 'Item');
            }
        });
    }

    if (totalRedEstamina > 100) totalRedEstamina = 100;
    if (totalRedEstamina > 0 && custoBruto > 0) {
        custoEstTotal = Math.floor(custoBruto * (1 - (totalRedEstamina / 100)));
    }

    document.getElementById('estamina-custo-final').textContent = custoEstTotal.toLocaleString("pt-BR");

    let estFormula = "";
    if (custoBruto > 0) {
        if (custoVel > 0) estFormula += `<span style="color:#0dcaf0;">+ ${custoVel.toLocaleString("pt-BR")} (10% de Vel.)</span><br>`;
        if (custoDano > 0) estFormula += `<span style="color:#dc3545;">+ ${custoDano.toLocaleString("pt-BR")} (10% de Dano)</span><br>`;
        if (custoBuff > 0) estFormula += `<span style="color:#198754;">+ ${custoBuff.toLocaleString("pt-BR")} (${eBuff}% de Buff)</span><br>`;
        if (custoHaki > 0) estFormula += `<span style="color:#a461ff;">+ ${custoHaki.toLocaleString("pt-BR")} (Haki)</span><br>`;
        if (totalRedEstamina > 0) {
            fontesRedEstamina.sort((a, b) => a.localeCompare(b));
            estFormula += `<span style="color:var(--warning);">Redução: -${totalRedEstamina}% (${fontesRedEstamina.join(" + ")})</span><br>`;
        }
        estFormula += `Gasto Total: ${custoEstTotal.toLocaleString("pt-BR")} de Estamina`;
    } else {
        estFormula = "Nenhum gasto registrado.";
    }
    document.getElementById('estamina-formula').innerHTML = estFormula;

    let rHP = i.exaustaoCompleta ? Math.round(R / 0.8) : R;
    
    let hpMultiplier = 1.5;
    if (totalFinal >= 40000) hpMultiplier = 4.0;
    else if (totalFinal >= 20000) hpMultiplier = 3.0;
    else if (totalFinal >= 10000) hpMultiplier = 2.0;

    let totalHP = 10000 + Math.floor(Math.round((rHP + flatBonus.r) * (1 + bonus.r)) * hpMultiplier);
    if (typeof i.lastHPTotal === 'undefined') i.lastHPTotal = totalHP;
    if (totalHP !== i.lastHPTotal) {
        if (i.hpAtual === 0) {
            i.hpAtual = totalHP;
        } else {
            i.hpAtual += (totalHP - i.lastHPTotal);
            if (i.hpAtual < 0) i.hpAtual = 0;
        }
    }
    i.lastHPTotal = totalHP;
    if (typeof i.hpAtual === 'undefined' || i.hpAtual === -1) i.hpAtual = totalHP;
    if (i.hpAtual > totalHP) i.hpAtual = totalHP;
    let elHPTotal = document.getElementById('hp-total');
    if (elHPTotal) elHPTotal.textContent = totalHP.toLocaleString("pt-BR");
    let elHPAtual = document.getElementById('hp-atual');
    if (elHPAtual) elHPAtual.value = i.hpAtual.toLocaleString("pt-BR");

    let formatHistPers = (text) => { return text.split('\n').map(l => { let trimL = l.trim(); if (trimL === "") return ""; return '> ' + trimL.replace(/^>\s*/, ''); }).join('\n'); };
    let histPersOut = "";
    if(!i.hidePersonality && i.personalidade && i.personalidade.trim() !== "") { histPersOut += `\n  : ᓩ _𝐏ᴇʀsᴏɴᴀʟɪᴅᴀᴅᴇ:_\n${formatHistPers(i.personalidade)}\n`; }
    if(!i.hideHistoria && i.historia && i.historia.trim() !== "") { histPersOut += `\n  : ᓩ _𝐇ɪsᴛᴏ́ʀɪᴀ:_\n${formatHistPers(i.historia)}\n`; }

    let sexoGeneroOut = "";
    if (!i.hideSexo) {
        sexoGeneroOut += `\n  : ᓩ _𝐒ᴇxᴏ:_\n> ${i.sexo || ''}\n`;
    }
    if (!i.hideGenero) {
        sexoGeneroOut += `\n  : ᓩ _𝐆ᴇ̂ɴᴇʀᴏ:_\n> ${i.genero || ''}\n`;
    }
    
    let sexoGeneroOutManual = "";
    if (!i.hideSexo) {
        sexoGeneroOutManual += `\n  : ᓩ _𝐒ᴇxᴏ:_\n> ${i.sexo || ''}\n`;
    }
    if (!i.hideGenero) {
        sexoGeneroOutManual += `\n  : ᓩ _𝐆ᴇ̂ɴᴇʀᴏ:_\n> ${i.genero || ''}\n`;
    }

    let attrOut = "";
    if (D > 0) attrOut += `↠ *𝙳𝚎𝚜𝚝𝚛𝚎𝚣𝚊:* ${strCalc(D, bonus.d, flatBonus.d, itemBonus.d, itemFlat.d, zBonus.d)}\n\n`;
    if (F > 0) attrOut += `↠ *𝙵𝚘𝚛𝚌̧𝚊:* ${strCalc(F, bonus.f, flatBonus.f, itemBonus.f, itemFlat.f, zBonus.f)}\n\n`;
    if (R > 0) { attrOut += `↠ *𝚁𝚎𝚜𝚒𝚜𝚝𝚎̂𝚗𝚌𝚒𝚊:* ${strCalc(R, bonus.r, flatBonus.r, itemBonus.r, itemFlat.r, zBonus.r)}\n> 𝙴𝚜𝚝𝚊𝚖𝚒𝚗𝚊: ${i.estaminaAtual.toLocaleString("pt-BR")} / ${estTotalVal.toLocaleString("pt-BR")}\n\n`; }
    let aVelOut = currentChar.substats.amiVel || 0;
    let calcAVelFinal = Math.round((aVelOut + flatBonus.amiVel) * (1 + bonus.amiVel));
    let finalAkumaVel = 0;
    if (i.hasAmiVel && calcAVelFinal > 0) {
        let baseAkumaVel = Math.floor(calcAVelFinal * (controlePct / 100));
        let buffAmiVelVal = parseInt(i.amiVelBuff) || 0;
        if (buffAmiVelVal > 0) {
            finalAkumaVel = baseAkumaVel + Math.floor(baseAkumaVel * (buffAmiVelVal / 100));
        } else {
            finalAkumaVel = baseAkumaVel;
        }
    }

    if (V > 0) {
        let velNormalStr = strCalc(V, bonus.v, flatBonus.v, itemBonus.v, itemFlat.v, zBonus.v);
        if (i.amiVelAtivo && finalAkumaVel > 0) {
            let totalVBase = Math.round((Math.round((V + flatBonus.v) * (1 + bonus.v)) + itemFlat.v) * (1 + itemBonus.v));
            velNormalStr += `+${finalAkumaVel.toLocaleString("pt-BR")} (Akuma no Mi) = ${(totalVBase + finalAkumaVel).toLocaleString("pt-BR")}`;
        }
        let hasWaterDiff = (waterBuffV !== 0 || bonus.vAgua !== 0 || flatBonus.vAgua !== 0 || bonus.reflAgua !== 0 || flatBonus.reflAgua !== 0 || bonus.vcorpAgua !== 0 || flatBonus.vcorpAgua !== 0);
        
        if (hasWaterDiff) {
            let totalBonusVAgua = bonus.v + waterBuffV + bonus.vAgua;
            let totalFlatBonusVAgua = flatBonus.v + flatBonus.vAgua;
            let strTotalAgua = strCalc(V, totalBonusVAgua, totalFlatBonusVAgua, itemBonus.v, itemFlat.v);
            if (i.amiVelAtivo && finalAkumaVel > 0) {
                let totalVAguaBase = Math.round((Math.round((V + totalFlatBonusVAgua) * (1 + totalBonusVAgua)) + itemFlat.v) * (1 + itemBonus.v));
                strTotalAgua += `+${finalAkumaVel.toLocaleString("pt-BR")} (Akuma no Mi) = ${(totalVAguaBase + finalAkumaVel).toLocaleString("pt-BR")}`;
            }
            attrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStr} | ${strTotalAgua} (dentro d'água)\n`;
            
            let REFAgua = currentChar.substats.reflAgua || 0;
            let VCORPAgua = currentChar.substats.vcorpAgua || 0;
            let REFAkuma = (i.amiVelAtivo) ? (currentChar.substats.reflAkuma || 0) : 0;
            let VCORPAkuma = (i.amiVelAtivo) ? (currentChar.substats.vcorpAkuma || 0) : 0;
            let totalBonusReflAgua = bonus.refl + bonus.reflAgua;
            let totalFlatBonusReflAgua = flatBonus.refl + flatBonus.reflAgua;
            let totalBonusVcorpAgua = bonus.vcorp + bonus.vcorpAgua;
            let totalFlatBonusVcorpAgua = flatBonus.vcorp + flatBonus.vcorpAgua;

            if (REF > 0 || REFAgua > 0 || REFAkuma > 0) {
                let refNormStr = "";
                if (REF > 0 || REFAkuma > 0) {
                    let totalBaseRef = Math.round((Math.round((REF + flatBonus.refl) * (1 + bonus.refl)) + itemFlat.refl) * (1 + itemBonus.refl));
                    if (bonus.refl === 0 && flatBonus.refl === 0 && itemBonus.refl === 0 && itemFlat.refl === 0) refNormStr = (totalBaseRef + REFAkuma).toLocaleString("pt-BR");
                    else {
                        refNormStr = strCalc(REF, bonus.refl, flatBonus.refl, itemBonus.refl, itemFlat.refl);
                        if (REFAkuma > 0) {
                            let ptsStr = refNormStr.includes("=") ? refNormStr.substring(0, refNormStr.lastIndexOf(" = ")) : refNormStr;
                            refNormStr = ptsStr + `+${REFAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRef + REFAkuma).toLocaleString("pt-BR")}`;
                        }
                    }
                }
                let refWaterStr = "";
                if (REFAgua > 0 || REFAkuma > 0) {
                    let totalBaseRefAgua = Math.round((Math.round((REFAgua + totalFlatBonusReflAgua) * (1 + totalBonusReflAgua)) + itemFlat.reflAgua) * (1 + itemBonus.reflAgua));
                    if (totalBonusReflAgua === 0 && totalFlatBonusReflAgua === 0 && itemBonus.reflAgua === 0 && itemFlat.reflAgua === 0) refWaterStr = (totalBaseRefAgua + REFAkuma).toLocaleString("pt-BR");
                    else {
                        refWaterStr = strCalc(REFAgua, totalBonusReflAgua, totalFlatBonusReflAgua, itemBonus.reflAgua, itemFlat.reflAgua);
                        if (REFAkuma > 0) {
                            let ptsStr = refWaterStr.includes("=") ? refWaterStr.substring(0, refWaterStr.lastIndexOf(" = ")) : refWaterStr;
                            refWaterStr = ptsStr + `+${REFAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRefAgua + REFAkuma).toLocaleString("pt-BR")}`;
                        }
                    }
                }
                if ((REF > 0 || REFAkuma > 0) && (REFAgua > 0 || REFAkuma > 0)) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr} | ${refWaterStr} (dentro d'água)\n`;
                else if (REF > 0 || REFAkuma > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr}\n`;
                else if (REFAgua > 0 || REFAkuma > 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘 (𝙳𝚎𝚗𝚝𝚛𝚘 𝚍'𝚊́𝚐𝚞𝚊):_ ${refWaterStr}\n`;
            }
            if (VCORP > 0 || VCORPAgua > 0 || VCORPAkuma > 0) {
                let vcorpNormStr = "";
                if (VCORP > 0 || VCORPAkuma > 0) {
                    let totalBaseVcorp = Math.round((Math.round((VCORP + flatBonus.vcorp) * (1 + bonus.vcorp)) + itemFlat.vcorp) * (1 + itemBonus.vcorp));
                    if (bonus.vcorp === 0 && flatBonus.vcorp === 0 && itemBonus.vcorp === 0 && itemFlat.vcorp === 0) vcorpNormStr = (totalBaseVcorp + VCORPAkuma).toLocaleString("pt-BR");
                    else {
                        vcorpNormStr = strCalc(VCORP, bonus.vcorp, flatBonus.vcorp, itemBonus.vcorp, itemFlat.vcorp);
                        if (VCORPAkuma > 0) {
                            let ptsStr = vcorpNormStr.includes("=") ? vcorpNormStr.substring(0, vcorpNormStr.lastIndexOf(" = ")) : vcorpNormStr;
                            vcorpNormStr = ptsStr + `+${VCORPAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorp + VCORPAkuma).toLocaleString("pt-BR")}`;
                        }
                    }
                }
                let vcorpWaterStr = "";
                if (VCORPAgua > 0 || VCORPAkuma > 0) {
                    let totalBaseVcorpAgua = Math.round((Math.round((VCORPAgua + totalFlatBonusVcorpAgua) * (1 + totalBonusVcorpAgua)) + itemFlat.vcorpAgua) * (1 + itemBonus.vcorpAgua));
                    if (totalBonusVcorpAgua === 0 && totalFlatBonusVcorpAgua === 0 && itemBonus.vcorpAgua === 0 && itemFlat.vcorpAgua === 0) vcorpWaterStr = (totalBaseVcorpAgua + VCORPAkuma).toLocaleString("pt-BR");
                    else {
                        vcorpWaterStr = strCalc(VCORPAgua, totalBonusVcorpAgua, totalFlatBonusVcorpAgua, itemBonus.vcorpAgua, itemFlat.vcorpAgua);
                        if (VCORPAkuma > 0) {
                            let ptsStr = vcorpWaterStr.includes("=") ? vcorpWaterStr.substring(0, vcorpWaterStr.lastIndexOf(" = ")) : vcorpWaterStr;
                            vcorpWaterStr = ptsStr + `+${VCORPAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorpAgua + VCORPAkuma).toLocaleString("pt-BR")}`;
                        }
                    }
                }
                if ((VCORP > 0 || VCORPAkuma > 0) && (VCORPAgua > 0 || VCORPAkuma > 0)) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr} | ${vcorpWaterStr} (dentro d'água)\n`;
                else if (VCORP > 0 || VCORPAkuma > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr}\n`;
                else if (VCORPAgua > 0 || VCORPAkuma > 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕 (𝙳𝚎𝚗𝚝𝚛𝚘 𝚍'𝚊́𝚐𝚞𝚊):_ ${vcorpWaterStr}\n`;
            }
        } else {
            attrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStr}\n`;
            let REFAkuma = (i.amiVelAtivo) ? (currentChar.substats.reflAkuma || 0) : 0;
            let VCORPAkuma = (i.amiVelAtivo) ? (currentChar.substats.vcorpAkuma || 0) : 0;
            if (REF > 0 || REFAkuma > 0) {
                let totalBaseRef = Math.round((Math.round((REF + flatBonus.refl) * (1 + bonus.refl)) + itemFlat.refl) * (1 + itemBonus.refl));
                if (bonus.refl === 0 && flatBonus.refl === 0 && itemBonus.refl === 0 && itemFlat.refl === 0) attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${(totalBaseRef + REFAkuma).toLocaleString("pt-BR")}\n`;
                else {
                    let refNormStr = strCalc(REF, bonus.refl, flatBonus.refl, itemBonus.refl, itemFlat.refl);
                    if (REFAkuma > 0) {
                        let ptsStr = refNormStr.includes("=") ? refNormStr.substring(0, refNormStr.lastIndexOf(" = ")) : refNormStr;
                        refNormStr = ptsStr + `+${REFAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRef + REFAkuma).toLocaleString("pt-BR")}`;
                    }
                    attrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr}\n`;
                }
            }
            if (VCORP > 0 || VCORPAkuma > 0) {
                let totalBaseVcorp = Math.round((Math.round((VCORP + flatBonus.vcorp) * (1 + bonus.vcorp)) + itemFlat.vcorp) * (1 + itemBonus.vcorp));
                if (bonus.vcorp === 0 && flatBonus.vcorp === 0 && itemBonus.vcorp === 0 && itemFlat.vcorp === 0) attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${(totalBaseVcorp + VCORPAkuma).toLocaleString("pt-BR")}\n`;
                else {
                    let vcorpNormStr = strCalc(VCORP, bonus.vcorp, flatBonus.vcorp, itemBonus.vcorp, itemFlat.vcorp);
                    if (VCORPAkuma > 0) {
                        let ptsStr = vcorpNormStr.includes("=") ? vcorpNormStr.substring(0, vcorpNormStr.lastIndexOf(" = ")) : vcorpNormStr;
                        vcorpNormStr = ptsStr + `+${VCORPAkuma.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorp + VCORPAkuma).toLocaleString("pt-BR")}`;
                    }
                    attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr}\n`;
                }
            }
        }
        attrOut += `\n`;
    }
    
    if (totalFinal >= reqEsp && ESP > 0) {
        attrOut += `↠ *𝙴𝚜𝚙𝚒́𝚛𝚒𝚝𝚘:* ${strCalc(ESP, bonus.esp, flatBonus.esp, itemBonus.esp, itemFlat.esp)}\n`;
        if (HA > 0) {
            attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝙰𝚛𝚖𝚊𝚖𝚎𝚗𝚝𝚘:_ ${strCalc(HA, bonus.ha, flatBonus.ha, itemBonus.ha, itemFlat.ha)}\n`;
            let hasHigherHA = (i.unlockHA3 || i.unlockHA4 || i.unlockHA5 || i.unlockHA6);
            if (i.unlockHA1 && !i.unlockHA2 && !hasHigherHA) attrOut += `- 𝙸𝚗𝚟𝚒𝚜𝚒́𝚟𝚎𝚕✓\n`;
            if (i.unlockHA2 && !hasHigherHA) attrOut += `- 𝚅𝚒𝚜𝚒́𝚟𝚎𝚕✓\n`;
            if (i.unlockHA3) attrOut += `- 𝙸𝚖𝚋𝚞𝚒𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHA4) attrOut += `- 𝙵𝚞𝚕𝚕 𝙱𝚘𝚍𝚢✓\n`;
            if (i.unlockHA5) attrOut += `- 𝙴𝚖𝚒𝚜𝚜𝚊̃𝚘✓\n`;
            if (i.unlockHA6) attrOut += `- 𝙰𝚟𝚊𝚗𝚌̧𝚊𝚍𝚘✓\n`;
        }
        if (HO > 0) {
            let passiveHO = Math.round((HO + flatBonus.ho) * (1 + bonus.ho));
            let totalHO = Math.round((passiveHO + itemFlat.ho) * (1 + itemBonus.ho));
            let alcanceHO = Math.floor(totalHO / 10);
            attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚊 𝙾𝚋𝚜𝚎𝚛𝚟𝚊𝚌̧𝚊̃𝚘:_ ${strCalc(HO, bonus.ho, flatBonus.ho, itemBonus.ho, itemFlat.ho)} (${alcanceHO.toLocaleString("pt-BR")}m)\n`;
            if (i.unlockHO2) attrOut += `- 𝙸𝚗𝚝𝚎𝚗𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHO3) attrOut += `- 𝙿𝚛𝚎𝚖𝚘𝚗𝚒𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHO4) attrOut += `- 𝙰𝚟𝚊𝚗𝚌̧𝚊𝚍𝚘✓\n`;
        }
        if (HR > 0) {
            let passiveHR = Math.round((HR + flatBonus.hr) * (1 + bonus.hr));
            let totalHR = Math.round((passiveHR + itemFlat.hr) * (1 + itemBonus.hr));
            let alcanceHR = Math.floor(totalHR / 10);
            attrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝚁𝚎𝚒:_ ${strCalc(HR, bonus.hr, flatBonus.hr, itemBonus.hr, itemFlat.hr)}\n`;
            if (i.unlockHR2) attrOut += `- 𝙳𝚘𝚖𝚒𝚗𝚊𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHR3) attrOut += `- 𝙸𝚗𝚌𝚊𝚙𝚊𝚌𝚒𝚝𝚊𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHR4) attrOut += `- 𝙿𝚛𝚎𝚜𝚜𝚊̃𝚘✓ (${alcanceHR.toLocaleString("pt-BR")}m)\n`;
            if (i.unlockHR5) attrOut += `- 𝙰𝚜𝚜𝚊𝚜𝚜𝚒𝚗𝚊𝚝𝚘 𝚍𝚎 𝙾𝚋𝚜𝚎𝚛𝚟𝚊𝚌̧𝚊̃𝚘✓\n`;
            if (i.unlockHR6) attrOut += `- 𝙸𝚗𝚏𝚞𝚜𝚊̃𝚘✓\n`;
        }
        attrOut += `\n`;
    }
    
    if (AMI > 0) {
        attrOut += `↠ *𝙰𝚔𝚞𝚖𝚊 𝚗𝚘 𝙼𝚒:* ${strCalc(AMI, bonus.ami, flatBonus.ami, itemBonus.ami, itemFlat.ami)}\n`;
        if (i.hasAmiAlc && aAlc > 0) {
            let calcAAlc = Math.round((Math.round((aAlc + flatBonus.amiAlc) * (1 + bonus.amiAlc)) + itemFlat.amiAlc) * (1 + itemBonus.amiAlc));
            let mult = parseFloat((i.amiAlcMult || "1").toString().replace(',', '.')) || 1;
            let metros = (calcAAlc / 20) * mult;
            attrOut += `> _𝙰𝚕𝚌𝚊𝚗𝚌𝚎:_ ${strCalc(aAlc, bonus.amiAlc, flatBonus.amiAlc, itemBonus.amiAlc, itemFlat.amiAlc)} (${metros.toLocaleString("pt-BR", {maximumFractionDigits: 1})}m)\n`;
        }
        if (i.hasAmiDur && aDur > 0) {
            let calcADur = Math.round((Math.round((aDur + flatBonus.amiDur) * (1 + bonus.amiDur)) + itemFlat.amiDur) * (1 + itemBonus.amiDur));
            let cenas = Math.floor(calcADur / 500);
            attrOut += `> _𝙳𝚞𝚛𝚊𝚋𝚒𝚕𝚒𝚍𝚊𝚍𝚎:_ ${strCalc(aDur, bonus.amiDur, flatBonus.amiDur, itemBonus.amiDur, itemFlat.amiDur)} (${cenas} cena${cenas !== 1 ? 's' : ''})\n`;
        }
        if (i.hasAmiPot && aPot > 0) {
            let calcAPotFinal = Math.round((Math.round((aPot + flatBonus.amiPot) * (1 + bonus.amiPot)) + itemFlat.amiPot) * (1 + itemBonus.amiPot));
            let strPotFinal = strCalc(aPot, bonus.amiPot, flatBonus.amiPot, itemBonus.amiPot, itemFlat.amiPot);
            let amiResPctValFicha = parseInt(i.amiResPct) || 0;
            if (amiResPctValFicha > 0) {
                let resCalcFinal = calcAPotFinal + Math.floor(calcAPotFinal * (amiResPctValFicha / 100));
                attrOut += `> _𝙿𝚘𝚝𝚎̂𝚗𝚌𝚒𝚊:_ ${strPotFinal} (${resCalcFinal.toLocaleString("pt-BR")} de Resistência)\n`;
            } else {
                attrOut += `> _𝙿𝚘𝚝𝚎̂𝚗𝚌𝚒𝚊:_ ${strPotFinal}\n`;
            }
        }
        if (i.hasAmiVel && aVel > 0) {
            let calcAVelFinalOut = Math.round((Math.round((aVel + flatBonus.amiVel) * (1 + bonus.amiVel)) + itemFlat.amiVel) * (1 + itemBonus.amiVel));
            let strVelFinal = strCalc(aVel, bonus.amiVel, flatBonus.amiVel, itemBonus.amiVel, itemFlat.amiVel);
            let baseAkumaVelUIOut = Math.floor(calcAVelFinalOut * (controlePct / 100));
            let amiVelBuffValOut = parseInt(i.amiVelBuff) || 0;
            if (amiVelBuffValOut > 0) {
                let finalAkumaVelUIOut = baseAkumaVelUIOut + Math.floor(baseAkumaVelUIOut * (amiVelBuffValOut / 100));
                attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:_ ${strVelFinal} (${finalAkumaVelUIOut.toLocaleString("pt-BR")} de Velocidade Adicional)\n`;
            } else {
                attrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:_ ${strVelFinal} (${baseAkumaVelUIOut.toLocaleString("pt-BR")} de Velocidade Adicional)\n`;
            }
        }
        if (i.hasAmiDesp && aDesp > 0) attrOut += `> _𝙳𝚎𝚜𝚙𝚎𝚛𝚝𝚊𝚛:_ ${strCalc(aDesp, bonus.amiDesp, flatBonus.amiDesp, itemBonus.amiDesp, itemFlat.amiDesp)}\n`;
        if (activeAmiStats > 0) attrOut += `> _𝙲𝚘𝚗𝚝𝚛ᴏ𝚕𝚎:_ ${controlePct.toLocaleString("pt-BR")}%\n`;
        attrOut += `\n`;
    }

    let outNpcsC = "";
    let listC = [...(i.npcsComunsList || [])];
    if (listC.length > 0) {
        listC.sort((a, b) => {
            let qA = parseInt(String(a.quantidade || "").replace(/\D/g, "")) || 0; let qB = parseInt(String(b.quantidade || "").replace(/\D/g, "")) || 0;
            if (qA !== qB) return qB - qA;
            let pA = parseInt(String(a.pontos || "").replace(/\D/g, "")) || 0; let pB = parseInt(String(b.pontos || "").replace(/\D/g, "")) || 0;
            if (pA !== pB) return pB - pA;
            let rA = (a.raca || "").toLowerCase(); let rB = (b.raca || "").toLowerCase();
            return rA.localeCompare(rB);
        });
        listC.forEach(n => {
            let rFormatada = (n.raca || "Humano").toLowerCase();
            if ((parseInt(String(n.quantidade || "").replace(/\D/g, "")) || 0) > 1) {
                if (rFormatada === "humano") rFormatada = "humanos";
                else if (rFormatada === "tritão") rFormatada = "tritões";
                else if (rFormatada === "sereiano") rFormatada = "sereianos";
                else if (rFormatada === "gigante") rFormatada = "gigantes";
                else if (rFormatada === "mink") rFormatada = "minks";
                else if (rFormatada === "bucaneiro") rFormatada = "bucaneiros";
                else if (rFormatada === "lunariano") rFormatada = "lunarianos";
                else if (rFormatada === "oni") rFormatada = "onis";
                else if (rFormatada === "tontatta") rFormatada = "tontattas";
            }
            let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
            let ptsNum = parseInt(cleanPtsStr) || 0;
            let ptsStr = ptsNum.toLocaleString("pt-BR");
            let cleanQtdStr = String(n.quantidade || "").replace(/\D/g, "");
            let qtdStr = cleanQtdStr ? (parseInt(cleanQtdStr) || 0).toLocaleString("pt-BR") : "0";
            if (ptsNum === 0) {
                outNpcsC += `> ${qtdStr} ${rFormatada}\n`;
            } else {
                outNpcsC += `> ${qtdStr} ${rFormatada} [${ptsStr} pontos]\n`;
            }
        });
        outNpcsC = outNpcsC.trim();
    } else {
        outNpcsC = "> ";
    }

    let outNpcsE = "";
    let listE = [...(i.npcsEspeciaisList || [])];
    if (listE.length > 0) {
        let getDisplayClasses = (n) => {
            let maxLvl = {};
            [n.classe, n.classe2, n.classe3].forEach(c => {
                if (c) {
                    let match = c.match(/(.+) (\d+)/);
                    if (match) {
                        let base = match[1]; let lvl = parseInt(match[2]);
                        if (!maxLvl[base] || lvl > maxLvl[base]) maxLvl[base] = lvl;
                    }
                }
            });
            let cStrs = [];
            Object.keys(maxLvl).sort().forEach(b => {
                let cName = getClassDisplayName(`${b} ${maxLvl[b]}`, n.sexo || "Masculino");
                if (cName.includes(":")) {
                    cName = cName.split(":").pop().trim();
                }
                cStrs.push(cName); 
            });
            return cStrs.length > 0 ? cStrs.join(" / ") : "Sem Classe";
        };

        ['Dominação', 'Evento', 'Extra-Narrada'].forEach(origem => {
            let filtrados = listE.filter(n => n.origem === origem);
            if (filtrados.length > 0) {
                filtrados.sort((a, b) => {
                    let pA = parseInt(String(a.pontos || "").replace(/\D/g, "")) || 0; let pB = parseInt(String(b.pontos || "").replace(/\D/g, "")) || 0;
                    if (pA !== pB) return pB - pA;
                    let nA = (a.nome || "").toLowerCase(); let nB = (b.nome || "").toLowerCase();
                    return nA.localeCompare(nB);
                });
                outNpcsE += `➾ ${origem === 'Dominação' ? '𝐃𝐨𝐦𝐢𝐧𝐚𝐜̧𝐚̃𝐨' : origem === 'Evento' ? '𝐄𝐯𝐞𝐧𝐭𝐨' : '𝐄𝐱𝐭𝐫𝐚-𝐍𝐚𝐫𝐫𝐚𝐝𝐚'}\n`;
                filtrados.forEach((n, idx) => {
                    let cleanPtsStr = String(n.pontos || "").replace(/\D/g, "");
                    let ptsNum = parseInt(cleanPtsStr) || 0;
                    let ptsStr = ptsNum.toLocaleString("pt-BR");
                    let classStr = getDisplayClasses(n);
                    
                    let displayStr = "";
                    if (classStr === "Sem Classe") {
                        displayStr = ptsNum > 0 ? `${ptsStr} pontos` : "";
                    } else {
                        displayStr = ptsNum > 0 ? `${classStr} - ${ptsStr} pontos` : classStr;
                    }
                    
                    if (displayStr === "") {
                        outNpcsE += `${idx + 1}. ${n.nome || "Desconhecido"}\n`;
                    } else {
                        outNpcsE += `${idx + 1}. ${n.nome || "Desconhecido"} [${displayStr}]\n`;
                    }
                });
            }
        });
        outNpcsE = outNpcsE.trim();
    } else {
        outNpcsE = "> 🔒";
    }

    let availableStylesMap = {};
    let isMinkEstilo = (i.raca === "Mink" || (i.linhagem === "Charlotte" && i.raca2 === "Mink") || (currentChar.isNPC && i.raca === 'Outra'));
    if (isMinkEstilo) availableStylesMap["Electro"] = "Electro";
    if (i.akumaNome && i.akumaNome !== "nenhuma" && i.akumaNome.trim() !== "") availableStylesMap["Akuma"] = i.akumaNome;
    [1, 2, 3, 4].forEach(n => {
        let st = i['estilo'+n];
        if (st && st !== "Nenhum") {
            let dName = st;
            if (st === "Freestyle") dName = (i['freestyle'+n] && i['freestyle'+n].trim() !== "") ? i['freestyle'+n] : "Freestyle";
            availableStylesMap['estilo'+n] = dName;
        }
    });
    
    let tecnicasOut = "";
    let tecnicasOutCopy = "";
    let hasValidTecnica = currentChar.tecnicasList && currentChar.tecnicasList.some(t => t.nome || t.desc || t.efeito);
    let trAcum = i.treinosAcumulados ? i.treinosAcumulados : 0;
  
    if (hasValidTecnica || trAcum > 0) {
        tecnicasOut += "▬▬▬▬  [ 𝐓ᴇ́ᴄɴɪᴄᴀs ]  ▬▬▬▬\n\n";
        tecnicasOut += `Treinos Acumulados: ${trAcum.toLocaleString("pt-BR")}\n\n`;
        tecnicasOutCopy += "▬▬▬▬  [ 𝐓ᴇ́ᴄɴɪᴄᴀs ]  ▬▬▬▬\n\n";
        tecnicasOutCopy += `Treinos Acumulados: ${trAcum.toLocaleString("pt-BR")}\n\n`;
      
        let tecnicasOrdenadas = [...currentChar.tecnicasList].filter(t => t.nome || t.desc || t.efeito);
        if (i.ordemTecnicas !== "manual") {
            tecnicasOrdenadas.sort((a, b) => { let nA = (a.nome || "").trim().toLowerCase(); let nB = (b.nome || "").trim().toLowerCase(); return nA.localeCompare(nB); });
        }
      
        let agrupado = {};
        tecnicasOrdenadas.forEach(t => {
            let stNome = "Sem Estilo";
            if (t.estilo) {
                if (availableStylesMap[t.estilo]) {
                    stNome = availableStylesMap[t.estilo];
                } else {
                    let foundId = Object.keys(availableStylesMap).find(k => availableStylesMap[k] === t.estilo);
                    if (foundId) {
                        stNome = availableStylesMap[foundId];
                        t.estilo = foundId;
                    }
                }
            }
            if (!agrupado[stNome]) agrupado[stNome] = [];
            agrupado[stNome].push(t);
        });

        let estilosKeys = Object.keys(agrupado).sort((a, b) => {
            let aIsAmi = (a === i.akumaNome);
            let bIsAmi = (b === i.akumaNome);
            let aIsSem = (a === "Sem Estilo");
            let bIsSem = (b === "Sem Estilo");

            if (aIsAmi && !bIsAmi) return 1;
            if (!aIsAmi && bIsAmi) return -1;
            if (aIsSem && !bIsSem) return 1;
            if (!aIsSem && bIsSem) return -1;

            return a.localeCompare(b);
        });

        if (!i.hiddenStyles) i.hiddenStyles = [];

        estilosKeys.forEach(stKey => {
            if (i.hiddenStyles.includes(stKey)) return;

            let stKeyContent = "";
            let stKeyContentCopy = "";
            agrupado[stKey].forEach(t => {
                if (i.hideNaoTreinadas && t.naoTreinada) return;
                if (i.showApenasNaoTreinadas && !t.naoTreinada) return;
                let tContent = "";
                let tContentCopy = "";
                let unt = t.naoTreinada ? "~" : "";
                let untCopy = (t.naoTreinada && !i.showApenasNaoTreinadas) ? "~" : "";
                
                if (t.nome && !i.hideTecNome) {
                    tContent += `* ${unt}${t.nome}${unt}\n`;
                    tContentCopy += `* ${untCopy}${t.nome}${untCopy}\n`;
                }
                if (t.desc && !i.hideTecDesc) { 
                    t.desc.split('\n').forEach(line => { 
                        let trimLine = line.trim(); 
                        if(trimLine !== "") {
                            tContent += `> ${unt}${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                            tContentCopy += `> ${untCopy}${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                        }
                    }); 
                }
                if (t.efeito && !i.hideTecEfeito) { 
                    t.efeito.split('\n').forEach((line, idx) => { 
                        let trimLine = line.trim(); 
                        if(trimLine !== "") { 
                            if (idx === 0) {
                                tContent += `> ${unt}Efeito: ${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                                tContentCopy += `> ${untCopy}Efeito: ${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                            } else {
                                tContent += `> ${unt}${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                                tContentCopy += `> ${untCopy}${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                            }
                        } 
                    }); 
                }
                
                if (tContent !== "") {
                    stKeyContent += tContent + "\n";
                    stKeyContentCopy += tContentCopy + "\n";
                }
            });

            if (stKeyContent !== "") {
                tecnicasOut += `« ${stKey} »\n` + stKeyContent;
                tecnicasOutCopy += `« ${stKey} »\n` + stKeyContentCopy;
            }
        });

        tecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`;
        tecnicasOutCopy += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`;
    } else { 
        tecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`; 
        tecnicasOutCopy += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`; 
    }

    let orgOut = "";
    if(i.orgTipo === "Pirata" || i.orgTipo === "Caçador de Recompensa") {
        let labelOrg = i.orgTipo === "Pirata" ? ((i.pirataStatus && i.pirataStatus !== "Normal") ? i.pirataStatus : "Pirata") : "Caçador de Recompensa";
        if(i.tripulacao && i.tripulacao.trim() !== "") { orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n* ${labelOrg}: ${i.tripulacao}\n`; } else { orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n* ${labelOrg}\n`; }
    } else if (i.orgTipo && i.orgTipo !== "") {
        let displayPatente = i.patente || '';
        if (displayPatente !== "") { let gKey = i.sexo === 'Feminino' ? 'f' : 'm'; displayPatente = patenteGender[displayPatente] ? patenteGender[displayPatente][gKey] : displayPatente; }
        orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ | 𝐏ᴀᴛᴇɴᴛᴇ | 𝐒ᴀʟᴀ́ʀɪᴏ:_\n* ${i.orgTipo}\n* ${displayPatente}\n* ${i.salario ? '฿' + i.salario : ''}\n`;
    } else {
        orgOut = `  : ᓩ _𝐎ʀɢᴀɴɪᴢᴀᴄ̧ᴀ̃ᴏ:_\n> \n`;
    }

    let outRecompensa = i.recompensa ? `฿${i.recompensa.toLocaleString("pt-BR")}` : '🔒';
    let outBerries = i.berries ? `฿${i.berries.toLocaleString("pt-BR")}` : '฿0';
    let estilosText = ""; if(isMink) estilosText += "* Electro\n";
    
    let formatStyle = (n) => { let st = i['estilo'+n]; if (!st || st === "Nenhum") return null; if (st === "Freestyle") return i['freestyle'+n] && i['freestyle'+n].trim() !== "" ? `Freestyle: ${i['freestyle'+n]}` : "Freestyle"; return st; };
    let e1 = formatStyle(1); if (e1) estilosText += `* ${e1}\n`; else estilosText += `* 𝙲𝚕𝚊𝚜𝚜𝚎\n`;
    let e2 = formatStyle(2); if (e2) estilosText += `* ${e2}\n`; else estilosText += `* 𝙸𝚗𝚒𝚌𝚒𝚊𝚕\n`;

    if (totalFinal >= 5000) { let e3 = formatStyle(3); if (e3) estilosText += `* ${e3}\n`; else estilosText += `* (Vazio)\n`; } else { estilosText += `* 🔒 (Libera com 5.000)\n`; }
    if (totalFinal >= 10000) { let e4 = formatStyle(4); if (e4) estilosText += `* ${e4}\n`; else estilosText += `* (Vazio)\n`; } else { estilosText += `* 🔒 (Libera com 10.000)\n`; }

    let c1Out = i.classe ? getClassDisplayName(i.classe, i.sexo) : '𝙸𝚗𝚒𝚌𝚒𝚊𝚕';
    let c2Out = i.classe2 ? getClassDisplayName(i.classe2, i.sexo) : (isSp ? '𝙸𝚗𝚒𝚌𝚒𝚊𝚕' : '5.000');
    let c3Out = i.classe3 ? getClassDisplayName(i.classe3, i.sexo) : '10.000';
    let c4Out = i.classe4 ? getClassDisplayName(i.classe4, i.sexo) : (isSp ? '15.000' : '20.000');
    let c5Out = i.classe5 ? getClassDisplayName(i.classe5, i.sexo) : (isSp ? '30.000' : '35.000');

    let racaOutput = (isNPC && i.raca === 'Outra') ? (i.racaNomeCustom || 'Raça Custom') : (formatRaceStr(i.raca, i.animal, i.sexo === "Feminino") || '');
    if (i.linhagem === "Charlotte") { 
        let raca2Output = (isNPC && i.raca2 === 'Outra') ? (i.racaNomeCustom2 || '2ª Raça Custom') : (formatRaceStr(i.raca2, i.animal2, i.sexo === "Feminino") || '');
        racaOutput += ` / ${raca2Output}`; 
    }

    let alcunhaOut = "";
    if (!i.alcunhasList || i.alcunhasList.length === 0) {
        alcunhaOut = "🔒";
    } else if (i.alcunhaAtiva) {
        let formatAlcunha = (alcObj) => {
            if (alcObj && alcObj.buffs && alcObj.buffs.length > 0) {
                let names = {tudo:"Todos os Atributos",tudoAttr:"Todos os Atributos",tudoEsp:"Todo o Espírito",tudoAmi:"Toda a Akuma",d:"Destreza",f:"Força",r:"Resistência",v:"Velocidade",refl:"Reflexo",vcorp:"Vel. Corporal",vAgua:"Velocidade (Água)",reflAgua:"Reflexo (Água)",vcorpAgua:"Vel. Corporal (Água)",esp:"Espírito",ha:"Haki do Armamento",ho:"Haki da Observação",hr:"Haki do Rei",amiAlc:"Alcance",amiDur:"Durabilidade",amiPot:"Potência",amiVel:"Velocidade",amiDesp:"Despertar",dano:"Dano Final",ignRes:"Ignorar Resistência",ignDanoGeral:"Ignorar Dano Geral",ignDanoAmi:"Ignorar Dano Akuma",redEstamina:"Redução de Estamina"};
                let condGroups = { "": [] };
                alcObj.buffs.forEach(b => {
                    let cName = (b.cond && b.cond.trim() !== "") ? b.cond.trim() : "";
                    if (!condGroups[cName]) condGroups[cName] = [];
                    condGroups[cName].push(b);
                });
                let buildStringForGroup = (buffArray) => {
                    let buffGroups = {};
                    buffArray.forEach(b => {
                        let key = (b.val >= 0 ? '+' : '') + b.val + (b.type === 'pct' ? '%' : '');
                        if(!buffGroups[key]) buffGroups[key] = [];
                        buffGroups[key].push(names[b.stat] || b.stat);
                    });
                    let buffStrings = [];
                    for (let k in buffGroups) {
                        let items = buffGroups[k];
                        let joined = items.length > 1 ? items.slice(0, -1).join(", ") + " e " + items[items.length - 1] : items[0];
                        buffStrings.push(`${k} em ${joined}`);
                    }
                    return `[${buffStrings.join("; ")}]`;
                };
                let lines = [];
                if (condGroups[""].length > 0) {
                    lines.push(`${alcObj.nome} ${buildStringForGroup(condGroups[""])}`);
                } else {
                    lines.push(`${alcObj.nome}`);
                }
                for (let cond in condGroups) {
                    if (cond !== "") {
                        lines.push(`> - Quando '${cond}': ${buildStringForGroup(condGroups[cond])}`);
                    }
                }
                return lines.join("\n");
            }
            return alcObj ? alcObj.nome : "";
        };

        let ativa = i.alcunhasList.find(a => a.nome === i.alcunhaAtiva);
        alcunhaOut = formatAlcunha(ativa);
        
        let reservas = i.alcunhasList.filter(a => a.nome !== i.alcunhaAtiva);
        if (reservas.length > 0) {
            reservas.sort((a, b) => a.nome.localeCompare(b.nome));
            let title = reservas.length === 1 ? "𝐀ʟᴄᴜɴʜᴀ 𝐑ᴇsᴇʀᴠᴀ" : "𝐀ʟᴄᴜɴʜᴀs 𝐑ᴇsᴇʀᴠᴀs";
            alcunhaOut += `\n\n  : ᓩ _${title}:_\n` + reservas.map(r => `> ${formatAlcunha(r)}`).join("\n");
        }
    }

    let displayLinhagem = i.linhagem ? i.linhagem.replace("Tenryūbito: Família ", "") : 'Nenhuma';
    let recompensaOutText = "";
    
    if (i.orgTipo === "Pirata" && i.pirataStatus === "Shichibukai") {
        if (i.recompensaTravada) {
            recompensaOutText = `\n  : ᓩ _𝐑ᴇᴄᴏᴍᴘᴇɴsᴀ 𝐓ʀᴀᴠᴀᴅᴀ:_\n> ~฿${i.recompensaTravada.toLocaleString("pt-BR")}~\n`;
        }
    } else if (i.recompensa) {
        let labelRecompensa = (i.orgTipo === "Pirata" || i.orgTipo === "Vanguarda Popular Revolucionária") ? "𝐑ᴇᴄᴏᴍᴘᴇɴsᴀ" : "𝐑ᴇᴄᴏᴍᴘᴇɴsᴀ 𝐏ᴏᴛᴇɴᴄɪᴀʟ";
        let valorRecompensa = (i.orgTipo !== "Pirata" && i.orgTipo !== "Vanguarda Popular Revolucionária") ? `~${outRecompensa}~` : outRecompensa;
        recompensaOutText = `\n  : ᓩ _${labelRecompensa}:_\n> ${valorRecompensa}\n`;
    }
    let showBerries = !isNPC || (i.berries && i.berries > 0);
    let berriesOutText = showBerries ? `\n : ᓩ _𝐁ᴇʀʀɪᴇs:_\n> ${outBerries}\n` : "";
    
    let habilidadesOut = "";
    if (i.habilidadesExclusivas && i.habilidadesExclusivas.length > 0) {
        i.habilidadesExclusivas.sort((a, b) => {
            let displayA = formatHabDisplay(a).toLowerCase();
            let displayB = formatHabDisplay(b).toLowerCase();
            return displayA.localeCompare(displayB);
        });

        if (i.habilidadesExclusivas.length === 1) {
            habilidadesOut = `  : ᓩ _𝐇ᴀʙɪʟɪᴅᴀᴅᴇ 𝐔́ɴɪᴄᴀ:_\n`;
        } else {
            habilidadesOut = `  : ᓩ _𝐇ᴀʙɪʟɪᴅᴀᴅᴇꜱ 𝐔́ɴɪᴄᴀꜱ:_\n`;
        }
        
        let getHabDesc = (hab, tb) => {
            if (hab === "Arte da Esgrima") { if (tb >= 15000) return "+20% Destreza, -20% gasto de Estamina."; if (tb >= 10000) return "+15% Destreza, -20% gasto de Estamina."; if (tb >= 5000) return "+10% Destreza, -20% gasto de Estamina."; return ""; }
            if (hab === "Batedor de Carteiras") { if (tb >= 15000) return "+25% Destreza."; if (tb >= 10000) return "+20% Destreza."; if (tb >= 5000) return "+15% Destreza."; return ""; }
            if (hab === "Caminho do Atirador") { if (tb >= 15000) return "+15% Destreza (+20% atirando)."; if (tb >= 10000) return "+10% Destreza (+15% atirando)."; if (tb >= 5000) return "+5% Destreza (+10% atirando)."; return ""; }
            if (hab === "Constituição Única") return "+10% Força, +15% Resistência.";
            if (hab === "Contração Muscular") { if (tb >= 10000) return "+20% Força e Resistência."; if (tb >= 5000) return "+10% Força e Resistência."; return ""; }
            if (hab === "Espírito Contagiante") return "Aliados recebem +5% em todos os atributos.";
            if (hab === "Favoritismo Armista") { if (tb >= 15000) return "Atributos dinâmicos por arma selecionada."; if (tb >= 10000) return "Atributos dinâmicos por arma selecionada."; if (tb >= 5000) return "Atributos dinâmicos por arma selecionada."; return ""; }
            if (hab === "Filho do Mar") { if (tb >= 15000) return "+15% Reflexo e Resistência."; if (tb >= 10000) return "+10% Reflexo e Resistência."; if (tb >= 5000) return "+5% Reflexo e Resistência."; return ""; }
            if(hasHab("Flexibilidade")) { if(totalBase >= 10000) bonus.v += 0.20; else if(totalBase >= 5000) bonus.v += 0.10; }
        if(hasHab("Fúria Ardente")) { let fA = i.habFuriaArdenteAttr || 'f'; if(totalBase >= 15000) bonus[fA] += 0.15; else if(totalBase >= 10000) bonus[fA] += 0.10; else if(totalBase >= 5000) bonus[fA] += 0.05; }
        if(hasHab("O Escolhido")) { if(totalBase >= 20000) { bonus.ha += 0.15; bonus.ho += 0.15; bonus.hr += 0.15; } else if(totalBase >= 10000) { bonus.ha += 0.10; bonus.ho += 0.10; bonus.hr += 0.10; } else if(totalBase >= 5000) { bonus.ha += 0.05; bonus.ho += 0.05; bonus.hr += 0.05; } }
            if (hab === "O Escolhido") { if (tb >= 20000) return "+15% em todos os Hakis."; if (tb >= 10000) return "+10% em todos os Hakis."; if (tb >= 5000) return "+5% em todos os Hakis."; return ""; }
            if (hab === "Pensamento Acelerado") { if (tb >= 10000) return "+25% Reflexos."; if (tb >= 5000) return "+20% Reflexos."; return ""; }
            if (hab === "QI Avançado") return "-50% gasto de Estamina. +5% Reflexos se durar >3 turnos.";
            return "oculta";
        };

        i.habilidadesExclusivas.forEach(hab => {
            let desc = getHabDesc(hab, totalBase);
            let displayHab = formatHabDisplay(hab);
            let isMandatoryLin = linhagemHabilidades[ln] && linhagemHabilidades[ln].includes(hab);
            let isMandatoryRace = !isMandatoryLin && mandHab.includes(hab);
            let specText = isMandatoryLin ? " _*(Linhagem)*_" : (isMandatoryRace ? " _*(Raça Exclusiva)*_" : "");
            
            if (desc && desc !== "oculta") {
                habilidadesOut += `> ${displayHab}: ${desc}${specText}\n`;
            } else {
                habilidadesOut += `> ${displayHab}${specText}\n`;
            }
        });
        habilidadesOut += `\n`;
    }
    let npcsOutText = "";
    if (i.npcsComunsList && i.npcsComunsList.length > 0) {
        npcsOutText += `\n  : ᓩ _𝐍𝐏𝐂s ᴄᴏᴍᴜɴꜱ:_\n${outNpcsC}\n`;
    }
    if (i.npcsEspeciaisList && i.npcsEspeciaisList.length > 0) {
        npcsOutText += `\n  : ᓩ _𝐍𝐏𝐂s ᴇꜱᴘᴇᴄɪᴀɪꜱ:_\n${outNpcsE}\n`;
    }

    let invLines = [];
    if (i.inventario && i.inventario.trim() !== "") { invLines = i.inventario.split('\n').map(l => { let t = l.trim(); if (t === "") return ""; return t.startsWith("*") ? t : "* " + t; }).filter(l => l !== ""); }
    
    if (i.naviosList && i.naviosList.length > 0) {
        i.naviosList.forEach(navio => {
            if (!navio.tipo) return;
            let name = navio.tipo;
            let gender = "m";
            let isDestruido = false;
            let hpStr = "";

            if (navio.tipo === "Personalizado") {
                name = navio.nomeCustom || "Navio Personalizado";
                let hpAtual = parseInt(navio.hpAtual) || 0;
                let hpMax = parseInt(navio.hpMax) || 0;
                if (hpAtual <= 0 && hpMax > 0) isDestruido = true;
                if (hpMax > 0) hpStr = ` [${hpAtual}/${hpMax}]`;
                if (name.trim().toLowerCase().endsWith('a')) gender = "f";
            } else if (shipData[navio.tipo]) {
                gender = shipData[navio.tipo].gender;
                let hpMax = shipData[navio.tipo].hp;
                if (hpMax !== null) {
                    let hpAtual = parseInt(navio.hpAtual);
                    if (isNaN(hpAtual)) hpAtual = hpMax;
                    if (hpAtual <= 0) isDestruido = true;
                    hpStr = ` [${hpAtual}/${hpMax}]`;
                }
            }

            if (isDestruido) {
                name = `${name} Destruíd${gender === 'f' ? 'a' : 'o'}`;
                hpStr = "";
            }

            invLines.push(`* ${name}${hpStr}`);
        });
    }

    let filledLines = invLines.filter(l => l !== "* " && l !== "*");
    while (filledLines.length < 3) { filledLines.push("* "); }
    let inventarioFormatado = filledLines.join('\n');

    let manualAttrOut = "";
    manualAttrOut += `↠ *𝙳𝚎𝚜𝚝𝚛𝚎𝚣𝚊:* ${strCalc(D, bonus.d, flatBonus.d, itemBonus.d, itemFlat.d, zBonus.d)}\n\n`;
    manualAttrOut += `↠ *𝙵𝚘𝚛𝚌̧𝚊:* ${strCalc(F, bonus.f, flatBonus.f, itemBonus.f, itemFlat.f, zBonus.f)}\n\n`;
    manualAttrOut += `↠ *𝚁𝚎𝚜𝚒𝚜𝚝𝚎̂𝚗𝚌𝚒𝚊:* ${strCalc(R, bonus.r, flatBonus.r, itemBonus.r, itemFlat.r, zBonus.r)}\n> 𝙴𝚜𝚝𝚊𝚖𝚒𝚗𝚊: ${i.estaminaAtual.toLocaleString("pt-BR")} / ${estTotalVal.toLocaleString("pt-BR")}\n\n`;

    let velNormalStrMan = strCalc(V, bonus.v, flatBonus.v, itemBonus.v, itemFlat.v, zBonus.v);
    if (i.amiVelAtivo && finalAkumaVel > 0) {
        let totalVBase = Math.round((Math.round((V + flatBonus.v) * (1 + bonus.v)) + itemFlat.v) * (1 + itemBonus.v));
        velNormalStrMan += `+${finalAkumaVel.toLocaleString("pt-BR")} (Akuma no Mi) = ${(totalVBase + finalAkumaVel).toLocaleString("pt-BR")}`;
    }
    
    let REFAkumaMan = (i.amiVelAtivo) ? (currentChar.substats.reflAkuma || 0) : 0;
    let VCORPAkumaMan = (i.amiVelAtivo) ? (currentChar.substats.vcorpAkuma || 0) : 0;
    let hasWaterDiffMan = (waterBuffV !== 0 || bonus.vAgua !== 0 || flatBonus.vAgua !== 0 || bonus.reflAgua !== 0 || flatBonus.reflAgua !== 0 || bonus.vcorpAgua !== 0 || flatBonus.vcorpAgua !== 0);

    if (hasWaterDiffMan) {
        let totalBonusVAgua = bonus.v + waterBuffV + bonus.vAgua;
        let totalFlatBonusVAgua = flatBonus.v + flatBonus.vAgua;
        let strTotalAgua = strCalc(V, totalBonusVAgua, totalFlatBonusVAgua, itemBonus.v, itemFlat.v);
        if (i.amiVelAtivo && finalAkumaVel > 0) {
            let totalVAguaBase = Math.round((Math.round((V + totalFlatBonusVAgua) * (1 + totalBonusVAgua)) + itemFlat.v) * (1 + itemBonus.v));
            strTotalAgua += `+${finalAkumaVel.toLocaleString("pt-BR")} (Akuma no Mi) = ${(totalVAguaBase + finalAkumaVel).toLocaleString("pt-BR")}`;
        }
        manualAttrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStrMan} | ${strTotalAgua} (dentro d'água)\n`;
        
        let REFAgua = currentChar.substats.reflAgua || 0;
        let VCORPAgua = currentChar.substats.vcorpAgua || 0;
        let totalBonusReflAgua = bonus.refl + bonus.reflAgua;
        let totalFlatBonusReflAgua = flatBonus.refl + flatBonus.reflAgua;
        let totalBonusVcorpAgua = bonus.vcorp + bonus.vcorpAgua;
        let totalFlatBonusVcorpAgua = flatBonus.vcorp + flatBonus.vcorpAgua;

        let refNormStr = "";
        let totalBaseRef = Math.round((Math.round((REF + flatBonus.refl) * (1 + bonus.refl)) + itemFlat.refl) * (1 + itemBonus.refl));
        if (bonus.refl === 0 && flatBonus.refl === 0 && itemBonus.refl === 0 && itemFlat.refl === 0) refNormStr = (totalBaseRef + REFAkumaMan).toLocaleString("pt-BR");
        else {
            refNormStr = strCalc(REF, bonus.refl, flatBonus.refl, itemBonus.refl, itemFlat.refl);
            if (REFAkumaMan > 0) {
                let ptsStr = refNormStr.includes("=") ? refNormStr.substring(0, refNormStr.lastIndexOf(" = ")) : refNormStr;
                refNormStr = ptsStr + `+${REFAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRef + REFAkumaMan).toLocaleString("pt-BR")}`;
            }
        }

        let refWaterStr = "";
        let totalBaseRefAgua = Math.round((Math.round((REFAgua + totalFlatBonusReflAgua) * (1 + totalBonusReflAgua)) + itemFlat.reflAgua) * (1 + itemBonus.reflAgua));
        if (totalBonusReflAgua === 0 && totalFlatBonusReflAgua === 0 && itemBonus.reflAgua === 0 && itemFlat.reflAgua === 0) refWaterStr = (totalBaseRefAgua + REFAkumaMan).toLocaleString("pt-BR");
        else {
            refWaterStr = strCalc(REFAgua, totalBonusReflAgua, totalFlatBonusReflAgua, itemBonus.reflAgua, itemFlat.reflAgua);
            if (REFAkumaMan > 0) {
                let ptsStr = refWaterStr.includes("=") ? refWaterStr.substring(0, refWaterStr.lastIndexOf(" = ")) : refWaterStr;
                refWaterStr = ptsStr + `+${REFAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRefAgua + REFAkumaMan).toLocaleString("pt-BR")}`;
            }
        }

        manualAttrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr} | ${refWaterStr} (dentro d'água)\n`;

        let vcorpNormStr = "";
        let totalBaseVcorp = Math.round((Math.round((VCORP + flatBonus.vcorp) * (1 + bonus.vcorp)) + itemFlat.vcorp) * (1 + itemBonus.vcorp));
        if (bonus.vcorp === 0 && flatBonus.vcorp === 0 && itemBonus.vcorp === 0 && itemFlat.vcorp === 0) vcorpNormStr = (totalBaseVcorp + VCORPAkumaMan).toLocaleString("pt-BR");
        else {
            vcorpNormStr = strCalc(VCORP, bonus.vcorp, flatBonus.vcorp, itemBonus.vcorp, itemFlat.vcorp);
            if (VCORPAkumaMan > 0) {
                let ptsStr = vcorpNormStr.includes("=") ? vcorpNormStr.substring(0, vcorpNormStr.lastIndexOf(" = ")) : vcorpNormStr;
                vcorpNormStr = ptsStr + `+${VCORPAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorp + VCORPAkumaMan).toLocaleString("pt-BR")}`;
            }
        }

        let vcorpWaterStr = "";
        let totalBaseVcorpAgua = Math.round((Math.round((VCORPAgua + totalFlatBonusVcorpAgua) * (1 + totalBonusVcorpAgua)) + itemFlat.vcorpAgua) * (1 + itemBonus.vcorpAgua));
        if (totalBonusVcorpAgua === 0 && totalFlatBonusVcorpAgua === 0 && itemBonus.vcorpAgua === 0 && itemFlat.vcorpAgua === 0) vcorpWaterStr = (totalBaseVcorpAgua + VCORPAkumaMan).toLocaleString("pt-BR");
        else {
            vcorpWaterStr = strCalc(VCORPAgua, totalBonusVcorpAgua, totalFlatBonusVcorpAgua, itemBonus.vcorpAgua, itemFlat.vcorpAgua);
            if (VCORPAkumaMan > 0) {
                let ptsStr = vcorpWaterStr.includes("=") ? vcorpWaterStr.substring(0, vcorpWaterStr.lastIndexOf(" = ")) : vcorpWaterStr;
                vcorpWaterStr = ptsStr + `+${VCORPAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorpAgua + VCORPAkumaMan).toLocaleString("pt-BR")}`;
            }
        }

        manualAttrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr} | ${vcorpWaterStr} (dentro d'água)\n`;

    } else {
        manualAttrOut += `↠ *𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:* ${velNormalStrMan}\n`;
        
        let totalBaseRef = Math.round((Math.round((REF + flatBonus.refl) * (1 + bonus.refl)) + itemFlat.refl) * (1 + itemBonus.refl));
        if (bonus.refl === 0 && flatBonus.refl === 0 && itemBonus.refl === 0 && itemFlat.refl === 0) manualAttrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${(totalBaseRef + REFAkumaMan).toLocaleString("pt-BR")}\n`;
        else {
            let refNormStr = strCalc(REF, bonus.refl, flatBonus.refl, itemBonus.refl, itemFlat.refl);
            if (REFAkumaMan > 0) {
                let ptsStr = refNormStr.includes("=") ? refNormStr.substring(0, refNormStr.lastIndexOf(" = ")) : refNormStr;
                refNormStr = ptsStr + `+${REFAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseRef + REFAkumaMan).toLocaleString("pt-BR")}`;
            }
            manualAttrOut += `> _𝚁𝚎𝚏𝚕𝚎𝚡𝚘:_ ${refNormStr}\n`;
        }
        
        let totalBaseVcorp = Math.round((Math.round((VCORP + flatBonus.vcorp) * (1 + bonus.vcorp)) + itemFlat.vcorp) * (1 + itemBonus.vcorp));
        if (bonus.vcorp === 0 && flatBonus.vcorp === 0 && itemBonus.vcorp === 0 && itemFlat.vcorp === 0) manualAttrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${(totalBaseVcorp + VCORPAkumaMan).toLocaleString("pt-BR")}\n`;
        else {
            let vcorpNormStr = strCalc(VCORP, bonus.vcorp, flatBonus.vcorp, itemBonus.vcorp, itemFlat.vcorp);
            if (VCORPAkumaMan > 0) {
                let ptsStr = vcorpNormStr.includes("=") ? vcorpNormStr.substring(0, vcorpNormStr.lastIndexOf(" = ")) : vcorpNormStr;
                vcorpNormStr = ptsStr + `+${VCORPAkumaMan.toLocaleString("pt-BR")} (Akuma) = ${(totalBaseVcorp + VCORPAkumaMan).toLocaleString("pt-BR")}`;
            }
            manualAttrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎 𝙲𝚘𝚛𝚙𝚘𝚛𝚊𝚕:_ ${vcorpNormStr}\n`;
        }
    }
    manualAttrOut += `\n`;

    manualAttrOut += `↠ *𝙴𝚜𝚙𝚒́𝚛𝚒𝚝𝚘:* ${strCalc(ESP, bonus.esp, flatBonus.esp, itemBonus.esp, itemFlat.esp)}\n`;
    manualAttrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝙰𝚛𝚖𝚊𝚖𝚎𝚗𝚝𝚘:_ ${strCalc(HA, bonus.ha, flatBonus.ha, itemBonus.ha, itemFlat.ha)}\n`;
    manualAttrOut += `- 𝙸𝚗𝚟𝚒𝚜𝚒́𝚟𝚎𝚕${i.unlockHA1 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝚅𝚒𝚜𝚒́𝚟𝚎𝚕${i.unlockHA2 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙸𝚖𝚋𝚞𝚒𝚌̧𝚊̃𝚘${i.unlockHA3 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙵𝚞𝚕𝚕 𝙱𝚘𝚍𝚢${i.unlockHA4 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙴𝚖𝚒𝚜𝚜𝚊̃𝚘${i.unlockHA5 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙰𝚟𝚊𝚗𝚌̧𝚊𝚍𝚘${i.unlockHA6 ? '✓' : '✘'}\n`;

    let passiveHOMan = Math.round((HO + flatBonus.ho) * (1 + bonus.ho));
    let totalHOMan = Math.round((passiveHOMan + itemFlat.ho) * (1 + itemBonus.ho));
    let alcanceHOMan = Math.floor(totalHOMan / 10);
    manualAttrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚊 𝙾𝚋𝚜𝚎𝚛𝚟𝚊𝚌̧𝚊̃𝚘:_ ${strCalc(HO, bonus.ho, flatBonus.ho, itemBonus.ho, itemFlat.ho)} (${alcanceHOMan.toLocaleString("pt-BR")}m)\n`;
    manualAttrOut += `- 𝙸𝚗𝚝𝚎𝚗𝚌̧𝚊̃𝚘${i.unlockHO2 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙿𝚛𝚎𝚖𝚘𝚗𝚒𝚌̧𝚊̃𝚘${i.unlockHO3 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙰𝚟𝚊𝚗𝚌̧𝚊𝚍𝚘${i.unlockHO4 ? '✓' : '✘'}\n`;

    let passiveHRMan = Math.round((HR + flatBonus.hr) * (1 + bonus.hr));
    let totalHRMan = Math.round((passiveHRMan + itemFlat.hr) * (1 + itemBonus.hr));
    let alcanceHRMan = Math.floor(totalHRMan / 10);
    manualAttrOut += `> _𝙷𝚊𝚔𝚒 𝚍𝚘 𝚁𝚎𝚒:_ ${strCalc(HR, bonus.hr, flatBonus.hr, itemBonus.hr, itemFlat.hr)}\n`;
    manualAttrOut += `- 𝙳𝚘𝚖𝚒𝚗𝚊𝚌̧𝚊̃𝚘${i.unlockHR2 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙸𝚗𝚌𝚊𝚙𝚊𝚌𝚒𝚝𝚊𝚌̧𝚊̃𝚘${i.unlockHR3 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙿𝚛𝚎𝚜𝚜𝚊̃𝚘${i.unlockHR4 ? '✓' : '✘'} (${alcanceHRMan.toLocaleString("pt-BR")}m)\n`;
    manualAttrOut += `- 𝙰𝚜𝚜𝚊𝚜𝚜𝚒𝚗𝚊𝚝𝚘 𝚍𝚎 𝙾𝚋𝚜𝚎𝚛𝚟𝚊𝚌̧𝚊̃𝚘${i.unlockHR5 ? '✓' : '✘'}\n`;
    manualAttrOut += `- 𝙸𝚗𝚏𝚞𝚜𝚊̃𝚘${i.unlockHR6 ? '✓' : '✘'}\n\n`;

    manualAttrOut += `↠ *𝙰𝚔𝚞𝚖𝚊 𝚗𝚘 𝙼𝚒:* ${strCalc(AMI, bonus.ami, flatBonus.ami, itemBonus.ami, itemFlat.ami)}\n`;
    let calcAAlcMan = Math.round((Math.round((aAlc + flatBonus.amiAlc) * (1 + bonus.amiAlc)) + itemFlat.amiAlc) * (1 + itemBonus.amiAlc));
    let multMan = parseFloat((i.amiAlcMult || "1").toString().replace(',', '.')) || 1;
    let metrosMan = (calcAAlcMan / 20) * multMan;
    manualAttrOut += `> _𝙰𝚕𝚌𝚊𝚗𝚌𝚎:_ ${strCalc(aAlc, bonus.amiAlc, flatBonus.amiAlc, itemBonus.amiAlc, itemFlat.amiAlc)} (${metrosMan.toLocaleString("pt-BR", {maximumFractionDigits: 1})}m)\n`;

    let calcADurMan = Math.round((Math.round((aDur + flatBonus.amiDur) * (1 + bonus.amiDur)) + itemFlat.amiDur) * (1 + itemBonus.amiDur));
    let cenasMan = Math.floor(calcADurMan / 500);
    manualAttrOut += `> _𝙳𝚞𝚛𝚊𝚋𝚒𝚕𝚒𝚍𝚊𝚍𝚎:_ ${strCalc(aDur, bonus.amiDur, flatBonus.amiDur, itemBonus.amiDur, itemFlat.amiDur)} (${cenasMan} cena${cenasMan !== 1 ? 's' : ''})\n`;

    let calcAPotFinalMan = Math.round((Math.round((aPot + flatBonus.amiPot) * (1 + bonus.amiPot)) + itemFlat.amiPot) * (1 + itemBonus.amiPot));
    let strPotFinalMan = strCalc(aPot, bonus.amiPot, flatBonus.amiPot, itemBonus.amiPot, itemFlat.amiPot);
    let amiResPctValFichaMan = parseInt(i.amiResPct) || 0;
    if (amiResPctValFichaMan > 0) {
        let resCalcFinalMan = calcAPotFinalMan + Math.floor(calcAPotFinalMan * (amiResPctValFichaMan / 100));
        manualAttrOut += `> _𝙿𝚘𝚝𝚎̂𝚗𝚌𝚒𝚊:_ ${strPotFinalMan} (${resCalcFinalMan.toLocaleString("pt-BR")} de Resistência)\n`;
    } else {
        manualAttrOut += `> _𝙿𝚘𝚝𝚎̂𝚗𝚌𝚒𝚊:_ ${strPotFinalMan}\n`;
    }

    let calcAVelFinalOutMan = Math.round((Math.round((aVel + flatBonus.amiVel) * (1 + bonus.amiVel)) + itemFlat.amiVel) * (1 + itemBonus.amiVel));
    let strVelFinalMan = strCalc(aVel, bonus.amiVel, flatBonus.amiVel, itemBonus.amiVel, itemFlat.amiVel);
    let baseAkumaVelUIOutMan = Math.floor(calcAVelFinalOutMan * (controlePct / 100));
    let amiVelBuffValOutMan = parseInt(i.amiVelBuff) || 0;
    if (amiVelBuffValOutMan > 0) {
        let finalAkumaVelUIOutMan = baseAkumaVelUIOutMan + Math.floor(baseAkumaVelUIOutMan * (amiVelBuffValOutMan / 100));
        manualAttrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:_ ${strVelFinalMan} (${finalAkumaVelUIOutMan.toLocaleString("pt-BR")} de Velocidade Adicional)\n`;
    } else {
        manualAttrOut += `> _𝚅𝚎𝚕𝚘𝚌𝚒𝚍𝚊𝚍𝚎:_ ${strVelFinalMan} (${baseAkumaVelUIOutMan.toLocaleString("pt-BR")} de Velocidade Adicional)\n`;
    }

    manualAttrOut += `> _𝙳𝚎𝚜𝚙𝚎𝚛𝚝𝚊𝚛:_ ${strCalc(aDesp, bonus.amiDesp, flatBonus.amiDesp, itemBonus.amiDesp, itemFlat.amiDesp)}\n`;
    manualAttrOut += `> _𝙲𝚘𝚗𝚝𝚛ᴏ𝚕𝚎:_ ${controlePct.toLocaleString("pt-BR")}%\n\n`;

    let out = `*Nᴇᴡ sᴇᴀs*
— ロールプレイングゲーム - 𝚁𝙿𝙶 [𝙾𝙽𝙴 𝙿𝙸𝙴𝙲𝙴]
     — 新しい海 - 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 ~*ɴꜱ*~
                          ${isNPC ? 'ᖴIᑕᕼᗩ ᗞᕮ ᘉᑭᑕ' : 'ᖴIᑕᕼᗩ'}
Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊
  : ᓩ _𝐍ᴏᴍᴇ:_
> ${currentChar.name || ''}

  : ᓩ _𝐀ʟᴄᴜɴʜᴀ:_
> ${alcunhaOut}
${recompensaOutText}
  : ᓩ _𝐀ʟᴛᴜʀᴀ:_
> ${i.altura || ''}

  : ᓩ _𝐈ᴅᴀᴅᴇ:_
> ${i.idade || '(Mínimo: 15)'}

  : ᓩ _${(i.linhagem && i.linhagem !== "Nenhuma") ? "𝐑ᴀᴄ̧ᴀ | 𝐋ɪɴʜᴀɢᴇᴍ" : "𝐑ᴀᴄ̧ᴀ"}:_
> ${(i.linhagem && i.linhagem !== "Nenhuma") ? racaOutput + " | " + displayLinhagem : racaOutput}
${sexoGeneroOut}
  : ᓩ _𝐒ᴀɴɢᴜᴇ:_
> ${i.sangue || ''}
${histPersOut}
  : ᓩ _𝐀ᴘᴀʀᴇ̂ɴᴄɪᴀ:_
> ${i.aparencia || ''}${(currentDocId === "NPCS" || currentDocId === "NPCI") ? "" : `\n\n  : ᓩ _𝐈ᴅ:_ ${currentDocId || ''}`}${(parseInt(i.aliadosEspiritoContagiante) || 0) > 0 ? `\n\n  : ᓩ _𝐀ʟɪᴀᴅᴏs ᴄᴏᴍ 𝐄sᴘɪ́ʀɪᴛᴏ 𝐂ᴏɴᴛᴀɢɪᴀɴᴛᴇ:_\n> ${parseInt(i.aliadosEspiritoContagiante)}` : ''}

  : ᓩ _𝐍ᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ:_
> ${i.nacionalidade || 'Desconhecida'}

  : ᓩ _𝐋ᴏᴄᴀʟɪᴢᴀᴄ̧ᴀ̃ᴏ ᴀᴛᴜᴀʟ:_
> ${i.localizacao || '(Local presente no mapa do RPG)'}

▬▬▬▬▬▬▬▬▬▬▬▬

  : ᓩ _Cʟᴀssᴇ(s):_
1. *${c1Out}*
2. *${c2Out}*
3. *${c3Out}*
4. *${c4Out}*
5. *${c5Out}*

${orgOut}
  : ᓩ _𝐄sᴛɪʟᴏs ᴅᴇ ʟᴜᴛᴀ:_
${estilosText.trim()}
${berriesOutText}${npcsOutText}
> _𝐈ɴᴠᴇɴᴛᴀ́ʀɪᴏ:_
${inventarioFormatado}

${habilidadesOut}  : ᓩ _𝐀ᴋᴜᴍᴀ ɴᴏ ᴍɪ:_
> ${i.akumaNome || '🔒'}

▬▬▬▬  [ 𝐒ᴛᴀᴛᴜs ]  ▬▬▬▬
HP: ${i.hpAtual.toLocaleString("pt-BR")} / ${totalHP.toLocaleString("pt-BR")}

↠  *𝐀ᴛʀɪʙᴜᴛᴏs*
* Base: ${totalBase.toLocaleString("pt-BR")}
* Total: ${totalFinal.toLocaleString("pt-BR")}

${attrOut}${tecnicasOut}`;

    let formatAlcunhaManual = (alcObj) => {
        if (alcObj && alcObj.buffs && alcObj.buffs.length > 0) {
            let names = {tudo:"Todos os Atributos",tudoAttr:"Todos os Atributos",tudoEsp:"Todo o Espírito",tudoAmi:"Toda a Akuma",d:"Destreza",f:"Força",r:"Resistência",v:"Velocidade",refl:"Reflexo",vcorp:"Vel. Corporal",vAgua:"Velocidade (Água)",reflAgua:"Reflexo (Água)",vcorpAgua:"Vel. Corporal (Água)",esp:"Espírito",ha:"Haki do Armamento",ho:"Haki da Observação",hr:"Haki do Rei",amiAlc:"Alcance",amiDur:"Durabilidade",amiPot:"Potência",amiVel:"Velocidade",amiDesp:"Despertar",dano:"Dano Final",ignRes:"Ignorar Resistência",ignDanoGeral:"Ignorar Dano Geral",ignDanoAmi:"Ignorar Dano Akuma",redEstamina:"Redução de Estamina"};
            let condGroups = { "": [] };
            alcObj.buffs.forEach(b => {
                let cName = (b.cond && b.cond.trim() !== "") ? b.cond.trim() : "";
                if (!condGroups[cName]) condGroups[cName] = [];
                condGroups[cName].push(b);
            });
            let buildStringForGroup = (buffArray) => {
                let buffGroups = {};
                buffArray.forEach(b => {
                    let key = (b.val >= 0 ? '+' : '') + b.val + (b.type === 'pct' ? '%' : '');
                    if(!buffGroups[key]) buffGroups[key] = [];
                    buffGroups[key].push(names[b.stat] || b.stat);
                });
                let buffStrings = [];
                for (let k in buffGroups) {
                    let items = buffGroups[k];
                    let joined = items.length > 1 ? items.slice(0, -1).join(", ") + " e " + items[items.length - 1] : items[0];
                    buffStrings.push(`${k} em ${joined}`);
                }
                return `[${buffStrings.join("; ")}]`;
            };
            let lines = [];
            if (condGroups[""].length > 0) {
                lines.push(`${alcObj.nome} ${buildStringForGroup(condGroups[""])}`);
            } else {
                lines.push(`${alcObj.nome}`);
            }
            for (let cond in condGroups) {
                if (cond !== "") {
                    lines.push(`> - Quando '${cond}': ${buildStringForGroup(condGroups[cond])}`);
                }
            }
            return lines.join("\n");
        }
        return alcObj ? alcObj.nome : "";
    };

    let manualAlcunhaOut = "";
    let manualAlcunhaAtiva = i.alcunhasList && i.alcunhasList.length > 0 && i.alcunhaAtiva ? formatAlcunhaManual(i.alcunhasList.find(a => a.nome === i.alcunhaAtiva)) : "";
    manualAlcunhaOut = manualAlcunhaAtiva;
    let manualReservas = (i.alcunhasList || []).filter(a => a.nome !== i.alcunhaAtiva);
    manualAlcunhaOut += `\n\n  : ᓩ _𝐀ʟᴄᴜɴʜᴀs 𝐑ᴇsᴇʀᴠᴀs:_`;
    if (manualReservas.length > 0) {
        manualReservas.sort((a, b) => a.nome.localeCompare(b.nome));
        manualAlcunhaOut += `\n` + manualReservas.map(r => `> ${formatAlcunhaManual(r)}`).join("\n");
    } else {
        manualAlcunhaOut += `\n> `;
    }

    let manualHistPersOut = "";
    manualHistPersOut += `\n  : ᓩ _𝐏ᴇʀsᴏɴᴀʟɪᴅᴀᴅᴇ:_\n${(i.personalidade && i.personalidade.trim() !== "") ? formatHistPers(i.personalidade) : "> "}\n`;
    manualHistPersOut += `\n  : ᓩ _𝐇ɪsᴛᴏ́ʀɪᴀ:_\n${(i.historia && i.historia.trim() !== "") ? formatHistPers(i.historia) : "> "}\n`;

    let manualTecnicasOut = "";
    let manualTecnicasOutCopy = "";
    if (hasValidTecnica || trAcum > 0) {
        manualTecnicasOut += "▬▬▬▬  [ 𝐓ᴇ́ᴄɴɪᴄᴀs ]  ▬▬▬▬\n\n";
        manualTecnicasOut += `Treinos Acumulados: ${trAcum.toLocaleString("pt-BR")}\n\n`;
        manualTecnicasOutCopy += "▬▬▬▬  [ 𝐓ᴇ́ᴄɴɪᴄᴀs ]  ▬▬▬▬\n\n";
        manualTecnicasOutCopy += `Treinos Acumulados: ${trAcum.toLocaleString("pt-BR")}\n\n`;

        let tecnicasOrdenadas = [...currentChar.tecnicasList].filter(t => t.nome || t.desc || t.efeito);
        if (i.ordemTecnicas !== "manual") {
            tecnicasOrdenadas.sort((a, b) => { let nA = (a.nome || "").trim().toLowerCase(); let nB = (b.nome || "").trim().toLowerCase(); return nA.localeCompare(nB); });
        }
        
        let agrupadoManual = {};
        tecnicasOrdenadas.forEach(t => {
            let stNome = "Sem Estilo";
            if (t.estilo) {
                if (availableStylesMap[t.estilo]) {
                    stNome = availableStylesMap[t.estilo];
                } else {
                    let foundId = Object.keys(availableStylesMap).find(k => availableStylesMap[k] === t.estilo);
                    if (foundId) {
                        stNome = availableStylesMap[foundId];
                        t.estilo = foundId;
                    }
                }
            }
            if (!agrupadoManual[stNome]) agrupadoManual[stNome] = [];
            agrupadoManual[stNome].push(t);
        });

        let estilosKeysManual = Object.keys(agrupadoManual).sort((a, b) => {
            let aIsAmi = (a === i.akumaNome);
            let bIsAmi = (b === i.akumaNome);
            let aIsSem = (a === "Sem Estilo");
            let bIsSem = (b === "Sem Estilo");

            if (aIsAmi && !bIsAmi) return 1;
            if (!aIsAmi && bIsAmi) return -1;
            if (aIsSem && !bIsSem) return 1;
            if (!aIsSem && bIsSem) return -1;

            return a.localeCompare(b);
        });

        estilosKeysManual.forEach(stKey => {
            let stKeyContent = "";
            let stKeyContentCopy = "";
            agrupadoManual[stKey].forEach(t => {
                if (i.hideNaoTreinadas && t.naoTreinada) return;
                if (i.showApenasNaoTreinadas && !t.naoTreinada) return;
                let tContent = "";
                let tContentCopy = "";
                let unt = t.naoTreinada ? "~" : "";
                let untCopy = (t.naoTreinada && !i.showApenasNaoTreinadas) ? "~" : "";
                
                if (t.nome) {
                    tContent += `* ${unt}${t.nome}${unt}\n`;
                    tContentCopy += `* ${untCopy}${t.nome}${untCopy}\n`;
                }
                if (t.desc) { 
                    t.desc.split('\n').forEach(line => { 
                        let trimLine = line.trim(); 
                        if(trimLine !== "") {
                            tContent += `> ${unt}${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                            tContentCopy += `> ${untCopy}${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                        }
                    }); 
                }
                if (t.efeito) { 
                    t.efeito.split('\n').forEach((line, idx) => { 
                        let trimLine = line.trim(); 
                        if(trimLine !== "") { 
                            if (idx === 0) {
                                tContent += `> ${unt}Efeito: ${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                                tContentCopy += `> ${untCopy}Efeito: ${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                            } else {
                                tContent += `> ${unt}${trimLine.replace(/^>\s*/, '')}${unt}\n`; 
                                tContentCopy += `> ${untCopy}${trimLine.replace(/^>\s*/, '')}${untCopy}\n`; 
                            }
                        } 
                    }); 
                }
                
                if (tContent !== "") {
                    stKeyContent += tContent + "\n";
                    stKeyContentCopy += tContentCopy + "\n";
                }
            });

            if (stKeyContent !== "") {
                manualTecnicasOut += `« ${stKey} »\n` + stKeyContent;
                manualTecnicasOutCopy += `« ${stKey} »\n` + stKeyContentCopy;
            }
        });

        manualTecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`;
        manualTecnicasOutCopy += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`;
    } else { 
        manualTecnicasOut += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`; 
        manualTecnicasOutCopy += `«▬▬▬▬▬▬  [ 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 𝙾𝙿 𝚁𝙿𝙶 ]  ▬▬▬▬▬▬»`; 
    }

    let outManual = `*Nᴇᴡ sᴇᴀs*
— ロールプレイングゲーム - 𝚁𝙿𝙶 [𝙾𝙽𝙴 𝙿𝙸𝙴𝙲𝙴]
     — 新しい海 - 𝙽𝚎𝚠 𝚂𝚎𝚊𝚜 ~*ɴꜱ*~
                          ${isNPC ? 'ᖴIᑕᕼᗩ ᗞᕮ ᘉᑭᑕ' : 'ᖴIᑕᕼᗩ'}
Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊
  : ᓩ _𝐍ᴏᴍᴇ:_
> ${currentChar.name || ''}

  : ᓩ _𝐀ʟᴄᴜɴʜᴀ:_
> ${manualAlcunhaOut}
${recompensaOutText}
  : ᓩ _𝐀ʟᴛᴜʀᴀ:_
> ${i.altura || ''}

  : ᓩ _𝐈ᴅᴀᴅᴇ:_
> ${i.idade || ''}

  : ᓩ _${(i.linhagem && i.linhagem !== "Nenhuma") ? "𝐑ᴀᴄ̧ᴀ | 𝐋ɪɴʜᴀɢᴇᴍ" : "𝐑ᴀᴄ̧ᴀ"}:_
> ${(i.linhagem && i.linhagem !== "Nenhuma") ? racaOutput + " | " + displayLinhagem : racaOutput}

  : ᓩ _𝐒ᴇxᴏ:_
> ${i.sexo || ''}

  : ᓩ _𝐒ᴀɴɢᴜᴇ:_
> ${i.sangue || ''}
${manualHistPersOut}
  : ᓩ _𝐀ᴘᴀʀᴇ̂ɴᴄɪᴀ:_
> ${i.aparencia || ''}${(currentDocId === "NPCS" || currentDocId === "NPCI") ? "" : `\n\n  : ᓩ _𝐈ᴅ:_ ${currentDocId || ''}`}${(parseInt(i.aliadosEspiritoContagiante) || 0) > 0 ? `\n\n  : ᓩ _𝐀ʟɪᴀᴅᴏs ᴄᴏᴍ 𝐄sᴘɪ́ʀɪᴛᴏ 𝐂ᴏɴᴛᴀɢɪᴀɴᴛᴇ:_\n> ${parseInt(i.aliadosEspiritoContagiante)}` : ''}

  : ᓩ _𝐍ᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ:_
> ${i.nacionalidade || ''}

  : ᓩ _𝐋ᴏᴄᴀʟɪᴢᴀᴄ̧ᴀ̃ᴏ ᴀᴛᴜᴀʟ:_
> ${i.localizacao || ''}

▬▬▬▬▬▬▬▬▬▬▬▬

  : ᓩ _Cʟᴀssᴇ(s):_
1. *${c1Out}*
2. *${c2Out}*
3. *${c3Out}*
4. *${c4Out}*
5. *${c5Out}*

${orgOut}
  : ᓩ _𝐄sᴛɪʟᴏs ᴅᴇ ʟᴜᴛᴀ:_
${estilosText.trim()}
${berriesOutText}${npcsOutText}
> _𝐈ɴᴠᴇɴᴛᴀ́ʀɪᴏ:_
${inventarioFormatado}

${habilidadesOut}  : ᓩ _𝐀ᴋᴜᴍᴀ ɴᴏ ᴍɪ:_
> ${i.akumaNome || ''}

▬▬▬▬  [ 𝐒ᴛᴀᴛᴜs ]  ▬▬▬▬
HP: ${i.hpAtual.toLocaleString("pt-BR")} / ${totalHP.toLocaleString("pt-BR")}

↠  *𝐀ᴛʀɪʙᴜᴛᴏs*
* Base: ${totalBase.toLocaleString("pt-BR")}
* Total: ${totalFinal.toLocaleString("pt-BR")}

${manualAttrOut}${manualTecnicasOut}`;

    window.copyDataFichaManual = outManual.replace(manualTecnicasOut, manualTecnicasOutCopy).trim();
    window.copyDataAtributos = `▬▬▬▬  [ 𝐒ᴛᴀᴛᴜs ]  ▬▬▬▬\nHP: ${i.hpAtual.toLocaleString("pt-BR")} / ${totalHP.toLocaleString("pt-BR")}\n\n↠  *𝐀ᴛʀɪʙᴜᴛᴏs*\n* Base: ${totalBase.toLocaleString("pt-BR")}\n* Total: ${totalFinal.toLocaleString("pt-BR")}\n\n${attrOut}`.trim();
    window.copyDataTecnicas = tecnicasOutCopy.trim();
    document.getElementById('resBox').textContent = out.trim();
    window.copyDataFichaPronta = out.replace(tecnicasOut, tecnicasOutCopy).trim();

    let logOut = "*Log de Atualizações:*Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊\n";
    if (currentChar.logList && currentChar.logList.length > 0) {
        currentChar.logList.forEach(l => {
            if (l.titulo || l.conteudo) {
                if (l.titulo) logOut += `> ${l.titulo}\n`;
                if (l.conteudo) logOut += `${l.conteudo}\n`;
                logOut += `\n`;
            }
        });
    }
    document.getElementById('logBox').textContent = logOut.trim();
}

async function copyFicha() {
    let text = window.copyDataFichaPronta || document.getElementById('resBox').textContent;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Ficha copiada para a área de transferência!");
}

async function copyFichaManual() {
    let text = window.copyDataFichaManual || "";
    if(!text) { await customAlert("Nada para copiar!"); return; }
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Ficha Manual copiada para a área de transferência!");
}

async function copyAtributos() {
    let text = window.copyDataAtributos || "";
    if(!text) { await customAlert("Nada para copiar!"); return; }
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Atributos copiados para a área de transferência!");
}

async function copyTecnicas() {
    let text = window.copyDataTecnicas || "";
    if(!text) { await customAlert("Nada para copiar!"); return; }
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Técnicas copiadas para a área de transferência!");
}

async function copyLog() {
    let text = document.getElementById('logBox').textContent;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Log copiado para a área de transferência!");
}

async function copyPartialLog() {
    if (!currentChar || !currentChar.logList || currentChar.logList.length === 0) { await customAlert("Não há logs para copiar."); return; }
    let numToCopy = parseInt(document.getElementById('num-logs-copy').value, 10);
    if (isNaN(numToCopy) || numToCopy < 1) numToCopy = 1;
    if (numToCopy > currentChar.logList.length) numToCopy = currentChar.logList.length;
    let logsToCopy = currentChar.logList.slice(-numToCopy);
    let logOut = "*Log de Atualizações:*Iີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີີ່້ິູຸູິິ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊໊ີ້ີ້ີ້ີ້ີ້ິ້ິີີີີີີ່່່່່່້້້່ີ໌ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້ິ້໌໌໌ີ້ຼຼຼຼຼຼຼຼຼຼຼຼ໋໋໋໋໋໋໋໊໊໊໊໊\n";
    if (logsToCopy && logsToCopy.length > 0) { logsToCopy.forEach(l => { if (l.titulo || l.conteudo) { if (l.titulo) logOut += `> ${l.titulo}\n`; if (l.conteudo) logOut += `${l.conteudo}\n`; logOut += `\n`; } }); }
    let text = logOut.trim();
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert(numToCopy === 1 ? "Última entrada copiada com sucesso!" : `As últimas ${numToCopy} entradas foram copiadas com sucesso!`);
}

async function changeFichaID() {
    if (!isFirebaseReady || !db) return;
    if (currentDocId === '') { await customAlert("Você precisa carregar ou salvar uma ficha primeiro para poder mudar o ID dela."); return; }
    if (isReadOnly) { await customAlert("Você está no modo de leitura. Insira a senha da ficha atual para provar que é o dono e poder mudar o ID."); return; }

    if (currentDocId === "NPCS" || currentDocId === "NPCI") {
        await customAlert("Esse ID especial é permanente e não pode ser alterado.");
        return;
    }
    let novoId = await customPrompt(`O ID atual é "${currentDocId}". Digite o NOVO ID desejado (Exatamente 4 números):`);
    if (!novoId || novoId.trim() === "" || novoId.trim() === currentDocId) { return; }
    novoId = novoId.trim().toUpperCase();
    if (!/^\d{4}$/.test(novoId) && novoId !== "NPCS" && novoId !== "NPCI") { await customAlert("O NOVO ID deve conter EXATAMENTE 4 NÚMEROS (ex: 1234)."); return; }
    document.getElementById('db-status').classList.add('syncing');

    try {
        const docRef = await db.collection("fichas_op").doc(novoId).get();
        if (docRef.exists) {
            let conf = await customPrompt(`ATENÇÃO: Já existe uma ficha salva no ID "${novoId}". Digite a SENHA DE ADM para sobrescrevê-la e apagar a ficha que está lá:`);
            if (conf !== ADMIN_PASSWORD && conf !== "Ben10000") {
                document.getElementById('db-status').classList.remove('syncing');
                if (conf !== null) await customAlert("Senha incorreta! Operação cancelada.");
                return;
            }
        }
        await db.collection("fichas_op").doc(novoId).set(charData);
        await db.collection("fichas_op").doc(currentDocId).delete();
        
        const backupRefOld = db.collection("fichas_op").doc("BACKUP-" + currentDocId);
        const backupDoc = await backupRefOld.get();
        if (backupDoc.exists) {
            await db.collection("fichas_op").doc("BACKUP-" + novoId).set(backupDoc.data());
            await backupRefOld.delete();
        }

        currentDocId = novoId; document.getElementById('doc-id').value = currentDocId;
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert(`Sucesso! O ID da ficha agora é "${novoId}".`);
    } catch (e) {
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert("Erro de conexão ao tentar mudar o ID.");
    }
}

document.body.addEventListener('input', function(e) {
    if (e.target.tagName.toLowerCase() === 'textarea') {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    }
});

async function deleteFichaID() {
    if (!isFirebaseReady || !db) return;
    if (currentDocId === '') { await customAlert("Nenhuma ficha foi carregada para ser apagada."); return; }
    let conf = await customPrompt(`ATENÇÃO: Você está prestes a apagar COMPLETAMENTE o ID "${currentDocId}" do banco de dados. Digite a SENHA DE ADM para confirmar:`);
    if (conf !== ADMIN_PASSWORD && conf !== "Ben10000") { if (conf !== null) await customAlert("Senha de ADM incorreta! Operação cancelada."); return; }

    document.getElementById('db-status').classList.add('syncing');
    try {
        await db.collection("fichas_op").doc(currentDocId).delete();
        currentDocId = ''; document.getElementById('doc-id').value = ''; charData = { password: "", pcs: [] }; isReadOnly = false;
        runFallbackChecks(); currentChar = charData.pcs[0].pc;
        renderTabs(); renderTecnicas(); renderLogs(); updateUI(); toggleEditability();
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert(`Sucesso! O ID foi completamente apagado.`);
    } catch (e) { document.getElementById('db-status').classList.remove('syncing'); await customAlert("Erro de conexão ao tentar apagar o ID."); }
}

async function saveBackup() {
    if (!isFirebaseReady || !db || currentDocId === '') {
        await customAlert("Carregue ou crie uma ficha com ID primeiro.");
        return;
    }
    if (isReadOnly) {
        await customAlert("Você está no modo de leitura. Insira a senha da ficha para criar um backup.");
        return;
    }
    let backupRef = db.collection('fichas_op').doc('BACKUP-' + currentDocId);
    document.getElementById('db-status').classList.add('syncing');
    let doc = await backupRef.get();
    document.getElementById('db-status').classList.remove('syncing');
    if (doc.exists) {
        let data = doc.data();
        if (data.backupPassword) {
            let pass = await customPrompt("Digite a senha atual do backup para autorizar a substituição:");
            if (pass !== data.backupPassword && pass !== ADMIN_PASSWORD && pass !== "Ben10000") {
                if (pass !== null) await customAlert("Senha do backup incorreta!");
                return;
            }
        }
    }
    let newPass = await customPrompt("Digite a senha exclusiva de backup (deve ser diferente da senha principal):");
    if (newPass === null) return;
    if (newPass.trim() === "") {
        await customAlert("A senha do backup não pode ser vazia.");
        return;
    }
    if (newPass === charData.password) {
        await customAlert("A senha do backup DEVE ser diferente da senha normal da ficha.");
        return;
    }
    document.getElementById('db-status').classList.add('syncing');
    let dataToSave = JSON.parse(JSON.stringify(charData));
    dataToSave.backupPassword = newPass;
    try {
        await backupRef.set(dataToSave);
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert("Backup salvo com sucesso!");
    } catch (e) {
        document.getElementById('db-status').classList.remove('syncing');
        await customAlert("Erro ao salvar backup.");
    }
}

async function loadBackup() {
    if (!isFirebaseReady || !db || currentDocId === '') {
        await customAlert("Carregue uma ficha com ID primeiro para puxar seu backup.");
        return;
    }
    let backupRef = db.collection('fichas_op').doc('BACKUP-' + currentDocId);
    document.getElementById('db-status').classList.add('syncing');
    let doc = await backupRef.get();
    document.getElementById('db-status').classList.remove('syncing');
    if (!doc.exists) {
        await customAlert("Não há nenhum backup salvo para este ID.");
        return;
    }
    let data = doc.data();
    let pass = await customPrompt("Digite a senha do backup para carregá-lo:");
    if (pass !== data.backupPassword && pass !== ADMIN_PASSWORD && pass !== "Ben10000") {
        if (pass !== null) await customAlert("Senha do backup incorreta!");
        return;
    }
    let conf = await customPrompt("Isso irá SOBRESCREVER sua ficha atual com o backup. Digite 'SIM' para confirmar:");
    if (conf !== "SIM" && conf !== "sim") return;
    delete data.backupPassword;
    charData = data;
    isReadOnly = false;
    runFallbackChecks();
    currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
    renderTabs();
    renderTecnicas();
    renderNpcsComuns();
    renderNpcsEspeciais();
    renderLogs();
    updateUI();
    toggleEditability();
    saveData(true);
    await customAlert("Backup carregado e restaurado com sucesso!");
}

window.onload = () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    init();
};

window.puxarVelocidade = async function() {
    if(isReadOnly) return;
    let el = document.getElementById('total-v');
    let passivo = parseInt(el.dataset.passive) || 0;
    let ativo = parseInt(el.dataset.active) || 0;
    let baseRefl = currentChar.substats.refl || 0;
    let baseVcorp = currentChar.substats.vcorp || 0;
    let proporcao = passivo > 0 ? (baseVcorp / passivo) : 0;
    let val = baseVcorp;
    
    if (ativo !== passivo && ativo > 0) {
        let resp = await customPrompt(`Este atributo possui um buff de item ativo. Deseja puxar a V. Corporal baseada no valor passivo (${val.toLocaleString("pt-BR")}) ou ativo (${Math.floor(ativo * proporcao).toLocaleString("pt-BR")})? Digite 1 para Passivo ou 2 para Ativo:`, true);
        if (resp === "2") val = Math.floor(ativo * proporcao);
        else if (resp !== "1") return;
    }
    document.getElementById('info-estaminaVelocidade').value = val.toLocaleString("pt-BR");
    currentChar.info.estaminaVelocidade = val;
    saveData(); updateUI();
};

window.puxarDestrezaDano = async function() {
    if(isReadOnly) return;
    let el = document.getElementById('total-d');
    let passivo = parseInt(el.dataset.passive) || 0;
    let ativo = parseInt(el.dataset.active) || 0;
    let val = passivo;
    if (ativo !== passivo) {
        let resp = await customPrompt(`Este atributo possui um buff de item ativo. Deseja puxar o valor passivo (${passivo.toLocaleString("pt-BR")}) ou ativo (${ativo.toLocaleString("pt-BR")})? Digite 1 para Passivo ou 2 para Ativo:`, true);
        if (resp === "2") val = ativo;
        else if (resp !== "1") return;
    }
    document.getElementById('info-calcUseAttr').value = val.toLocaleString("pt-BR");
    currentChar.info.calcUseAttr = val;
    saveData(); updateUI();
};

window.puxarForcaDano = async function() {
    if(isReadOnly) return;
    let el = document.getElementById('total-f');
    let passivo = parseInt(el.dataset.passive) || 0;
    let ativo = parseInt(el.dataset.active) || 0;
    let val = passivo;
    if (ativo !== passivo) {
        let resp = await customPrompt(`Este atributo possui um buff de item ativo. Deseja puxar o valor passivo (${passivo.toLocaleString("pt-BR")}) ou ativo (${ativo.toLocaleString("pt-BR")})? Digite 1 para Passivo ou 2 para Ativo:`, true);
        if (resp === "2") val = ativo;
        else if (resp !== "1") return;
    }
    document.getElementById('info-calcUseAttr').value = val.toLocaleString("pt-BR");
    currentChar.info.calcUseAttr = val;
    saveData(); updateUI();
};

window.puxarResistenciaDano = async function() {
    if(isReadOnly) return;
    let el = document.getElementById('total-r');
    let passivo = parseInt(el.dataset.passive) || 0;
    let ativo = parseInt(el.dataset.active) || 0;
    let val = passivo;
    if (ativo !== passivo) {
        let resp = await customPrompt(`Este atributo possui um buff de item ativo. Deseja puxar o valor passivo (${passivo.toLocaleString("pt-BR")}) ou ativo (${ativo.toLocaleString("pt-BR")})? Digite 1 para Passivo ou 2 para Ativo:`, true);
        if (resp === "2") val = ativo;
        else if (resp !== "1") return;
    }
    document.getElementById('info-calcInimigoRes').value = val.toLocaleString("pt-BR");
    currentChar.info.calcInimigoRes = val;
    saveData(); updateUI();
};

window.sofrerDano = async function() {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let danoStr = document.getElementById('calc-dano-final').textContent;
    let dano = parseInt(danoStr.replace(/\D/g, '')) || 0;
    if (dano === 0) { await customAlert("O dano calculado é 0."); return; }

    let conf = await customPrompt(`ATENÇÃO: Você está prestes a subtrair ${dano.toLocaleString('pt-BR')} de dano da SUA PRÓPRIA VIDA (HP Atual), e não da vida do inimigo. Digite 'SIM' para confirmar que deseja receber esse dano:`);
    if (conf !== "SIM" && conf !== "sim" && conf !== "Sim") {
        if (conf !== null) await customAlert("Operação cancelada.");
        return; 
    }

    let hpAtual = currentChar.info.hpAtual;
    let novoHp = hpAtual - dano;
    if (novoHp < 0) novoHp = 0;
    
    currentChar.info.hpAtual = novoHp;
    saveData(); updateUI();
    
    await customAlert(`Dano de ${dano.toLocaleString('pt-BR')} recebido! HP atualizado para: ${novoHp.toLocaleString('pt-BR')}`);
};

window.copiarDano = async function() {
    let finalStr = document.getElementById('calc-dano-final').textContent;
    let formStr = document.getElementById('calc-formula').innerText;
    let text = `*Dano Final:* ${finalStr}\n_Fórmula:_\n${formStr}`;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Cálculo de Dano copiado para a área de transferência!");
};

window.copiarEstamina = async function() {
    let finalStr = document.getElementById('estamina-custo-final').textContent;
    let formStr = document.getElementById('estamina-formula').innerText;
    let text = `*Custo de Estamina:* ${finalStr}\n_Fórmula:_\n${formStr}`;
    let tempArea = document.createElement("textarea"); tempArea.value = text;
    document.body.appendChild(tempArea); tempArea.select(); document.execCommand("copy"); document.body.removeChild(tempArea);
    await customAlert("Cálculo de Estamina copiado para a área de transferência!");
};

window.puxarDano = function() {
    if(isReadOnly) return;
    let valStr = document.getElementById('calc-dano-final').textContent;
    let val = parseInt(valStr.replace(/\D/g, '')) || 0;
    document.getElementById('info-estaminaDano').value = val.toLocaleString("pt-BR");
    currentChar.info.estaminaDano = val;
    saveData(); updateUI();
};

window.gastarEstamina = async function() {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let custoStr = document.getElementById('estamina-custo-final').textContent;
    let custo = parseInt(custoStr.replace(/\D/g, '')) || 0;
    if (custo === 0) { await customAlert("O custo de Estamina é 0."); return; }

    let estAtual = currentChar.info.estaminaAtual;
    let novaEst = estAtual - custo;
    if (novaEst < 0) novaEst = 0;
    
    currentChar.info.estaminaAtual = novaEst;
    currentChar.info.estaminaVelocidade = "";
    currentChar.info.estaminaDano = "";
    currentChar.info.estaminaBuffPct = "";
    currentChar.info.estaminaHakiArm = "nao";
    currentChar.info.estaminaHakiObs = "nao";
    
    saveData(); updateUI();
    await customAlert(`Gasto de ${custo.toLocaleString('pt-BR')} Estamina aplicado! Estamina atual: ${novaEst.toLocaleString('pt-BR')}`);
};

window.recuperarEstamina = async function(pct) {
    if(isReadOnly) { await customAlert("A ficha está no modo leitura."); return; }
    let totalStr = document.getElementById('estamina-total').textContent;
    let total = parseInt(totalStr.replace(/\D/g, '')) || 0;
    if(total === 0) return;
    
    let recup = Math.floor(total * pct);
    let estAtual = currentChar.info.estaminaAtual;
    if (estAtual >= total) { await customAlert("Estamina já está no máximo!"); return; }

    let novaEst = estAtual + recup;
    if (novaEst > total) novaEst = total;
    
    currentChar.info.estaminaAtual = novaEst;
    saveData(); updateUI();
    
    let nomeRecovery = pct === 0.10 ? "Em Movimento" : "Repouso Total";
    await customAlert(`Recuperação (${nomeRecovery}): +${recup.toLocaleString('pt-BR')} Estamina! Estamina atual: ${novaEst.toLocaleString('pt-BR')}`);
};

window.selecionarAkuma = function(novoAkumaNome) {
    if (!currentChar.info) currentChar.info = {};
    if(novoAkumaNome === "nenhuma" || !novoAkumaNome) { currentChar.info.akumaNome = ""; currentChar.info.akumaId = "nenhuma"; } 
    else { currentChar.info.akumaNome = novoAkumaNome; currentChar.info.akumaId = novoAkumaNome; }
    if(typeof saveData === 'function') saveData();
    if(typeof renderTecnicas === 'function') renderTecnicas();
    if(typeof updateUI === 'function') updateUI();
};

function iniciarMonitoramentoBancoDeDados() {
    let selectAkuma = document.getElementById('select-akuma'); let selectNac = document.getElementById('info-nacionalidade'); let selectLoc = document.getElementById('info-localizacao');
    let currentAkumaVal = (currentChar && currentChar.info && currentChar.info.akumaNome) ? currentChar.info.akumaNome : "nenhuma";
    let currentNacVal = (currentChar && currentChar.info) ? currentChar.info.nacionalidade : "";
    let currentLocVal = (currentChar && currentChar.info) ? currentChar.info.localizacao : "";

    let akumaHTML = '<option value="nenhuma">Nenhuma</option>';
    if (typeof akumasFixas !== 'undefined') {
        ['Paramecia', 'Paramecia Especial', 'Logia', 'Zoan', 'Zoan Ancestral', 'Zoan Mítica'].forEach(tipo => {
            if (akumasFixas[tipo] && akumasFixas[tipo].length > 0) {
                akumaHTML += `<optgroup label="${tipo}">`;
                akumasFixas[tipo].forEach(nome => { akumaHTML += `<option value="${nome}">${nome}</option>`; });
                akumaHTML += `</optgroup>`;
            }
        });
    }
    if (selectAkuma) { selectAkuma.innerHTML = akumaHTML; selectAkuma.value = currentAkumaVal; }

    let ilhasHTML = '<option value="">-- Selecione --</option>';
    if (typeof ilhasFixas !== 'undefined') {
        const ordemMares = ['East Blue', 'West Blue', 'North Blue', 'South Blue', 'Paraíso', 'Novo Mundo', 'Calm Belt', 'Localização Desconhecida'];
        ordemMares.forEach(mar => {
            if (ilhasFixas[mar] && ilhasFixas[mar].length > 0) {
                ilhasHTML += `<optgroup label="${mar}">`;
                ilhasFixas[mar].forEach(ilha => { ilhasHTML += `<option value="${ilha}">${ilha}</option>`; });
                ilhasHTML += `</optgroup>`;
            }
        });
    }
    if (selectNac) { selectNac.innerHTML = ilhasHTML; selectNac.value = currentNacVal; }
    if (selectLoc) { selectLoc.innerHTML = ilhasHTML; selectLoc.value = currentLocVal; }
}

setInterval(() => {
    if(!currentChar || !currentChar.info) return;
    let selectAkuma = document.getElementById('select-akuma');
    if(selectAkuma) {
        let expectedAkuma = (currentChar.info.akumaNome && currentChar.info.akumaNome !== "") ? currentChar.info.akumaNome : "nenhuma";
        currentChar.info.akumaId = expectedAkuma;
        if(selectAkuma.value !== expectedAkuma && selectAkuma.querySelector(`option[value="${expectedAkuma}"]`)) selectAkuma.value = expectedAkuma;
    }
    let selectNac = document.getElementById('info-nacionalidade');
    if(selectNac) {
        let expectedNac = currentChar.info.nacionalidade || "";
        if(selectNac.value !== expectedNac && selectNac.querySelector(`option[value="${expectedNac}"]`)) selectNac.value = expectedNac;
    }
    let selectLoc = document.getElementById('info-localizacao');
    if(selectLoc) {
        let expectedLoc = currentChar.info.localizacao || "";
        if(selectLoc.value !== expectedLoc && selectLoc.querySelector(`option[value="${expectedLoc}"]`)) selectLoc.value = expectedLoc;
    }
}, 1000);

function openInfoModal(title, msg) {
    document.getElementById('info-modal-title').textContent = title;
    document.getElementById('info-modal-msg').textContent = msg;
    document.getElementById('info-modal-overlay').style.display = 'flex';
}

window.promoverCargo = async function() {
    if (isReadOnly) return;
    let btn = document.getElementById('btn-promover');
    let nextRank = btn.dataset.nextRank;
    let req = parseFloat(btn.dataset.meritReq);
    let needsSuperAdmin = btn.dataset.needsSuperAdmin === "true";
    let isSuperAdminValid = false;

    if (needsSuperAdmin) {
        let pwd = await customPrompt("Requisitos não atendidos. Digite a senha de SUPER ADM para forçar a promoção:");
        if (pwd !== "Ben10000") {
            if (pwd !== null) await customAlert("Senha incorreta.");
            return;
        }
        isSuperAdminValid = true;
    }
    
    if (!isSuperAdminValid && nextRank === "Almirante-de-Frota") {
        let pwd = await customPrompt("A promoção para Almirante-de-Frota exige autorização. Digite a senha de ADM:");
        if (pwd !== ADMIN_PASSWORD && pwd !== "Ben10000") {
            await customAlert("Senha incorreta.");
            return;
        }
    } else if (!isSuperAdminValid && nextRank === "Eixo") {
        let pwd = await customPrompt("A promoção para Eixo exige autorização. Digite a senha de ADM:");
        if (pwd !== ADMIN_PASSWORD && pwd !== "Ben10000") {
            await customAlert("Senha incorreta.");
            return;
        }
    } else if (!isSuperAdminValid && currentChar.info.merito < req) {
        await customAlert("Você não possui Méritos suficientes.");
        return;
    }

    if (nextRank === "Esquadrão") {
        let escolha = await customPrompt("Escolha seu esquadrão (Digite exatamente: Combate, Operações, Inteligência ou Defesa):");
        if (!escolha) return;
        escolha = escolha.trim().toLowerCase();
        let tipo = "";
        if (escolha === "combate") tipo = "Esquadrão de Combate";
        else if (escolha === "operações" || escolha === "operacoes") tipo = "Esquadrão de Operações";
        else if (escolha === "inteligência" || escolha === "inteligencia") tipo = "Esquadrão de Inteligência";
        else if (escolha === "defesa") tipo = "Esquadrão de Defesa";
        else {
            await customAlert("Opção inválida.");
            return;
        }
        let conf = await customPrompt(`Deseja aceitar a promoção para ${tipo}? Digite 'SIM' para confirmar:`);
        if (conf === "SIM" || conf === "sim") {
            if (!isSuperAdminValid) currentChar.info.merito -= req;
            currentChar.info.patente = tipo;
            saveData(); updateUI();
            await customAlert("Promoção realizada com sucesso!");
        }
        return;
    }

    if (nextRank === "Comandante Tático") {
        let tipoAtual = currentChar.info.patente.replace("Esquadrão de ", "");
        nextRank = "Comandante Tático de " + tipoAtual;
    } else if (nextRank === "Capitão Tático") {
        let tipoAtual = currentChar.info.patente.replace("Comandante Tático de ", "").replace("Comandante Tática de ", "");
        nextRank = "Capitão Tático de " + tipoAtual;
    }

    let gKey = currentChar.info.sexo === 'Feminino' ? 'f' : 'm';
    let dName = patenteGender[nextRank] ? patenteGender[nextRank][gKey] : nextRank;
    let conf = await customPrompt(`Deseja aceitar a promoção para ${dName}? Digite 'SIM' para confirmar:`);
    
    if (conf === "SIM" || conf === "sim") {
        if (nextRank !== "Almirante-de-Frota" && nextRank !== "Eixo" && !isSuperAdminValid) {
            currentChar.info.merito -= req;
        }
        currentChar.info.patente = nextRank;
        saveData();
        updateUI();
        await customAlert("Promoção realizada com sucesso!");
    }
};

window.updateSexo = async function(val) {
    if (isReadOnly) return;
    if (val === "Assexuado") {
        await customAlert("Atenção: A escolha de \"Assexuado\" requer aprovação da ADM. Apenas seres bem específicos podem possuir essa característica fisiológica.");
    }
    updateField('info', 'sexo', val);
};

window.toggleHideSexoGenero = function(type, isChecked) {
    if (isReadOnly) return;
    
    if (type === 'sexo') {
        updateField('info', 'hideSexo', isChecked);
        if (isChecked) {
            let elGenero = document.getElementById('info-hideGenero');
            if (elGenero) elGenero.checked = false;
            updateField('info', 'hideGenero', false);
        }
    } else if (type === 'genero') {
        updateField('info', 'hideGenero', isChecked);
        if (isChecked) {
            let elSexo = document.getElementById('info-hideSexo');
            if (elSexo) elSexo.checked = false;
            updateField('info', 'hideSexo', false);
        }
    }
};

window.rebaixarCargo = async function() {
    if (isReadOnly) return;
    let btn = document.getElementById('btn-rebaixar');
    if (!btn) return;
    let prevRank = btn.dataset.prevRank;
    
    let gKey = currentChar.info.sexo === 'Feminino' ? 'f' : 'm';
    let dName = patenteGender[prevRank] ? patenteGender[prevRank][gKey] : prevRank;
    
    let conf = await customPrompt(`Deseja realmente voltar para a patente ${dName}? Digite 'SIM' para confirmar:`);
    
    if (conf === "SIM" || conf === "sim") {
        currentChar.info.patente = prevRank;
        saveData();
        updateUI();
        await customAlert("Patente rebaixada com sucesso!");
    }
};

window.exportarJSON = function(modo) {
    let dataToExport;
    let fileName = "ficha";

    if (modo === 'tudo') {
        dataToExport = JSON.parse(JSON.stringify(charData));
        delete dataToExport.password;
        delete dataToExport.backupPassword;
        delete dataToExport.saveMode;
        
        if (dataToExport.pcs) {
            dataToExport.pcs.forEach(pcObj => {
                if (pcObj.pc && pcObj.pc.info) {
                    delete pcObj.pc.info.id;
                    delete pcObj.pc.info.jogadorTelefone;
                }
                if (pcObj.npcs) {
                    pcObj.npcs.forEach(npc => {
                        if (npc.info) {
                            delete npc.info.id;
                            delete npc.info.jogadorTelefone;
                        }
                    });
                }
            });
        }
        fileName = "backup_completo";
    } else {
        let charClone = JSON.parse(JSON.stringify(currentChar));
        delete charClone.saveMode;
        if (charClone.info) {
            delete charClone.info.id;
            delete charClone.info.jogadorTelefone;
        }
        dataToExport = { isSingleCharacter: true, data: charClone };
        fileName = currentChar && currentChar.name ? currentChar.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "personagem";
    }

    let dataStr = JSON.stringify(dataToExport, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `ficha_${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    document.getElementById('modal-importar-exportar').style.display = 'none';
};

window.importarJSON = function(event) {
    if (isReadOnly) {
        customAlert("A ficha atual está em Modo Leitura. Desbloqueie-a ou carregue um ID em branco antes de importar.");
        event.target.value = "";
        return;
    }
    let file = event.target.files[0];
    if (!file) return;

    document.getElementById('modal-importar-exportar').style.display = 'none';
    
    let reader = new FileReader();
    reader.onload = async function(e) {
        try {
            let json = JSON.parse(e.target.result);
            let resp = await customPrompt("Digite 1 para SUBSTITUIR TUDO, 2 para ADICIONAR COMO NOVO, ou 3 para SUBSTITUIR O ATUAL:", true);
            
            if (resp !== "1" && resp !== "2" && resp !== "3") {
                event.target.value = ""; 
                return;
            }
            
            let isSingle = json.isSingleCharacter;
            let incomingData = isSingle ? json.data : json;

            if (!isSingle) {
                delete incomingData.password;
                delete incomingData.backupPassword;
                delete incomingData.saveMode;
            }

            if (resp === "1") {
                let currentPassword = charData.password;
                let currentBackupPassword = charData.backupPassword;
                let currentSaveMode = charData.saveMode;
                
                if (isSingle) {
                    charData.pcs = [{ pc: incomingData, npcs: [] }];
                } else {
                    charData = incomingData;
                }
                
                charData.password = currentPassword;
                if (currentSaveMode !== undefined) charData.saveMode = currentSaveMode;
                if (currentBackupPassword !== undefined) charData.backupPassword = currentBackupPassword;
                
                activePcIndex = 0;
                activeNpcIndex = -1;
            } else if (resp === "2") {
                if (isSingle) {
                    incomingData.isNPC = false;
                    charData.pcs.push({ pc: incomingData, npcs: [] });
                } else {
                    if (incomingData.pcs) {
                        incomingData.pcs.forEach(p => charData.pcs.push(p));
                    } else {
                        await customAlert("O arquivo não possui formato válido para adicionar múltiplos personagens.");
                        event.target.value = "";
                        return;
                    }
                }
                activePcIndex = charData.pcs.length - 1;
                activeNpcIndex = -1;
            } else if (resp === "3") {
                if (isSingle) {
                    incomingData.isNPC = currentChar.isNPC;
                    if (activeNpcIndex === -1) {
                        charData.pcs[activePcIndex].pc = incomingData;
                    } else {
                        charData.pcs[activePcIndex].npcs[activeNpcIndex] = incomingData;
                    }
                } else {
                    await customAlert("O arquivo possui múltiplos personagens. Só é possível substituir o atual usando um arquivo de personagem único.");
                    event.target.value = "";
                    return;
                }
            }
            
            runFallbackChecks();
            currentChar = activeNpcIndex === -1 ? charData.pcs[activePcIndex].pc : charData.pcs[activePcIndex].npcs[activeNpcIndex];
            
            renderTabs();
            renderTecnicas();
            renderNpcsComuns();
            renderNpcsEspeciais();
            renderLogs();
            updateUI();
            toggleEditability();
            saveData();
            
            await customAlert("Importação concluída com sucesso!");
        } catch(err) {
            await customAlert("Erro ao ler o arquivo JSON. Certifique-se de que é um arquivo válido.");
        }
        event.target.value = ""; 
    };
    reader.readAsText(file);
};