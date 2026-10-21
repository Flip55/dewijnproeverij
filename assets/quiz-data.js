// Quiz data for SommelAI — bewerk liever vragen/sommelai-vragen.xlsx en importeer met tools/import-vragen.py
// Elke optie lijst de druiven die +1 krijgen. core = vaste eerste ronde (v2), duels = tweekeuzevragen (v2).
window.QUIZ_DATA = {
 "red": {
  "grapes": [
   "Cabernet Sauvignon",
   "Pinot Noir",
   "Malbec",
   "Syrah",
   "Primitivo"
  ],
  "questions": [
   {
    "id": "fruit1",
    "q": "Welke fruitsmaken zou je in jouw wijn verkiezen?",
    "options": [
     {
      "t": "Rood fruit",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Primitivo"
      ]
     },
     {
      "t": "Citrus",
      "g": []
     },
     {
      "t": "Steenvrucht (zoals pruim & perzik)",
      "g": [
       "Malbec",
       "Syrah"
      ]
     },
     {
      "t": "Bosbes",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "spices1",
    "q": "Welke kruidige smaken zou je in jouw wijn verkiezen?",
    "options": [
     {
      "t": "Zwarte peper",
      "g": [
       "Cabernet Sauvignon",
       "Syrah"
      ]
     },
     {
      "t": "Kaneel",
      "g": [
       "Pinot Noir",
       "Primitivo"
      ]
     },
     {
      "t": "Gember",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Munt",
      "g": [
       "Cabernet Sauvignon",
       "Primitivo"
      ]
     },
     {
      "t": "Rozemarijn",
      "g": [
       "Syrah"
      ]
     }
    ]
   },
   {
    "id": "smell1",
    "q": "Welke geur zou je in jouw wijn verkiezen?",
    "options": [
     {
      "t": "Vanille",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Primitivo"
      ]
     },
     {
      "t": "Eik",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Tabak",
      "g": [
       "Cabernet Sauvignon",
       "Primitivo"
      ]
     },
     {
      "t": "Chocolade",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "aroma1",
    "q": "Welk wijnaroma zou je verkiezen?",
    "options": [
     {
      "t": "Fruitig",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Aards",
      "g": [
       "Pinot Noir",
       "Syrah"
      ]
     },
     {
      "t": "Bloemig",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Kruidig",
      "g": [
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "vegetables1",
    "q": "Welke groente verkies je?",
    "options": [
     {
      "t": "Aubergine",
      "g": [
       "Syrah"
      ]
     },
     {
      "t": "Champignons",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Courgette",
      "g": [
       "Primitivo"
      ]
     },
     {
      "t": "Paprika",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Tomaten",
      "g": [
       "Malbec",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "occasions1",
    "q": "Voor welke gelegenheid zou je een wijntje willen vinden?",
    "options": [
     {
      "t": "Dagdagelijks drinken",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Primitivo"
      ]
     },
     {
      "t": "Trouw",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir"
      ]
     },
     {
      "t": "Een etentje",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Romantische avond",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec"
      ]
     },
     {
      "t": "Alles van de bovenstaande (en ik zou ook nog 'booze cruise' willen toevoegen)",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "chocolate1",
    "q": "Welke chocolade verkies je?",
    "options": [
     {
      "t": "Zwarte chocolade",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah"
      ]
     },
     {
      "t": "Melkchocolade",
      "g": [
       "Pinot Noir",
       "Malbec",
       "Primitivo"
      ]
     },
     {
      "t": "Witte chocolade",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "bitter1",
    "q": "Wat is jouw mening over bittere smaken?",
    "options": [
     {
      "t": "Heerlijk!",
      "g": [
       "Syrah"
      ]
     },
     {
      "t": "Met mate",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Niets van!",
      "g": [
       "Pinot Noir",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "smell2",
    "q": "Het liefste ruik ik...",
    "options": [
     {
      "t": "Het bos",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Syrah"
      ]
     },
     {
      "t": "Pikant eten",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Koffie",
      "g": [
       "Pinot Noir",
       "Malbec",
       "Syrah"
      ]
     },
     {
      "t": "Leer",
      "g": [
       "Pinot Noir",
       "Malbec",
       "Primitivo"
      ]
     },
     {
      "t": "Napalm in the morning",
      "g": [
       "Cabernet Sauvignon",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "spicy1",
    "q": "Wat is jouw mening over pikant eten?",
    "options": [
     {
      "t": "Hoe pikanter, hoe beter!",
      "g": [
       "Syrah"
      ]
     },
     {
      "t": "Goh, niet te pikant...",
      "g": [
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Nooit ofte nimmer!",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Malbec",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "flavor1",
    "q": "Welke smaak zou jij verkiezen?",
    "options": [
     {
      "t": "Aardbei",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Kers",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir"
      ]
     },
     {
      "t": "Drop",
      "g": [
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Bosbes",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     }
    ]
   },
   {
    "id": "acid1",
    "q": "Wat is jouw mening over de zuurtegraad van een wijntje?",
    "options": [
     {
      "t": "Doe gerust, ik ben toch al een beetje de zuurpruim...",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir"
      ]
     },
     {
      "t": "Gemiddeld, als het even kan...",
      "g": [
       "Malbec",
       "Syrah",
       "Primitivo"
      ]
     },
     {
      "t": "Niet zuur aub!",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Geef maar, ik drink sowieso alles!",
      "g": []
     }
    ]
   },
   {
    "id": "occasions2",
    "q": "Voor welke gelegenheid zou je een flesje openen?",
    "options": [
     {
      "t": "Steak",
      "g": [
       "Cabernet Sauvignon",
       "Malbec",
       "Syrah"
      ]
     },
     {
      "t": "Aperitief",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Kaas",
      "g": [
       "Cabernet Sauvignon",
       "Pinot Noir",
       "Syrah"
      ]
     },
     {
      "t": "Vis",
      "g": [
       "Primitivo"
      ]
     },
     {
      "t": "Pasta",
      "g": [
       "Malbec"
      ]
     }
    ]
   }
  ],
  "desc": {
   "Cabernet Sauvignon": "De koning van de rode druiven. Krachtig, met stevige tannines, zwarte bes, cassis en vaak een vleugje groene paprika of ceder. Hou je van een steak en een wijn met ruggengraat? Dan zit je hier goed.",
   "Pinot Noir": "Elegant en verfijnd. Lichter van kleur, zachte tannines, rood fruit zoals aardbei en kers, en met wat leeftijd aardse tonen van bosgrond en champignon. Een druif voor fijnproevers, ook bij het aperitief.",
   "Malbec": "Vol en fluweelzacht, met pruim, bosbes en chocolade. Vooral uit Argentinië komt hij rond en sappig. Een gulle wijn voor gezellige tafels en gegrild vlees.",
   "Syrah": "Donker, kruidig en intens. Zwarte peper, bosbes, soms gerookt vlees of leer. Van de Rhône tot Australië (waar hij Shiraz heet): een wijn met karakter voor wie van pit houdt.",
   "Primitivo": "De Zuid-Italiaanse zonnestraal, familie van de Zinfandel. Rijp, jammy fruit, zoete kruiden en een zachte, warme afdronk. Toegankelijk en geliefd op bijna elke proeverij."
  },
  "core": [
   "fruit1",
   "spices1",
   "smell1",
   "aroma1",
   "vegetables1",
   "occasions1",
   "chocolate1",
   "bitter1"
  ],
  "duels": [
   {
    "id": "d_cs_pn_1",
    "q": "Een stevige handdruk of een kus op de wang?",
    "options": [
     {
      "t": "Stevige handdruk",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Kus op de wang",
      "g": [
       "Pinot Noir"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_pn_2",
    "q": "Picon of Strawberry Daiquiri?",
    "options": [
     {
      "t": "Picon",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Strawberry Daiquiri",
      "g": [
       "Pinot Noir"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_mb_1",
    "q": "Houthakker of chocolatier?",
    "options": [
     {
      "t": "Houthakker",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Chocolatier",
      "g": [
       "Malbec"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_mb_2",
    "q": "Bordeaux of Buenos Aires?",
    "options": [
     {
      "t": "Bordeaux",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Buenos Aires",
      "g": [
       "Malbec"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_sy_1",
    "q": "Gevulde paprika of peperroomsaus?",
    "options": [
     {
      "t": "Gevulde paprika",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Peperroomsaus",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_sy_2",
    "q": "Een klassieker in maatpak of een rocker in leren jas?",
    "options": [
     {
      "t": "Maatpak",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Leren jas",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_pr_1",
    "q": "Latijn of Zedenleer?",
    "options": [
     {
      "t": "Latijn",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Zedenleer",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_cs_pr_2",
    "q": "Een stevig schouderklopje of een warme knuffel in een glas?",
    "options": [
     {
      "t": "Stevig schouderklopje",
      "g": [
       "Cabernet Sauvignon"
      ]
     },
     {
      "t": "Warme knuffel",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_mb_1",
    "q": "Champignonsoep of boeket bloemen?",
    "options": [
     {
      "t": "Champignonsoep",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Boeket bloemen",
      "g": [
       "Malbec"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_mb_2",
    "q": "Satijn of velours?",
    "options": [
     {
      "t": "Satijn",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Velours",
      "g": [
       "Malbec"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_sy_1",
    "q": "Zijde of leer?",
    "options": [
     {
      "t": "Zijde",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Leer",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_sy_2",
    "q": "Framboos of gerookt spek?",
    "options": [
     {
      "t": "Framboos",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Gerookt spek",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_pr_1",
    "q": "Bourgondisch verfijnd of Zuid-Italiaans uitbundig?",
    "options": [
     {
      "t": "Bourgondisch verfijnd",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Zuid-Italiaans uitbundig",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pn_pr_2",
    "q": "Een glas bij de open haard of een glas op een zonnig terras?",
    "options": [
     {
      "t": "Bij de open haard",
      "g": [
       "Pinot Noir"
      ]
     },
     {
      "t": "Op een zonnig terras",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_mb_sy_1",
    "q": "Vlezige pruim of zwarte peper?",
    "options": [
     {
      "t": "Vlezige pruim",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Zwarte peper",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_mb_sy_2",
    "q": "Tango of rock-’n-roll?",
    "options": [
     {
      "t": "Tango",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Rock-’n-roll",
      "g": [
       "Syrah"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_mb_pr_1",
    "q": "Argentijnse steak of Italiaanse pasta al ragù?",
    "options": [
     {
      "t": "Argentijnse steak",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Pasta al ragù",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_mb_pr_2",
    "q": "Fluweelzacht of jammy zoet?",
    "options": [
     {
      "t": "Fluweelzacht",
      "g": [
       "Malbec"
      ]
     },
     {
      "t": "Jammy zoet",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sy_pr_1",
    "q": "Peper of confituur?",
    "options": [
     {
      "t": "Peper",
      "g": [
       "Syrah"
      ]
     },
     {
      "t": "Confituur",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sy_pr_2",
    "q": "BBQ of pasta met tomaten?",
    "options": [
     {
      "t": "BBQ",
      "g": [
       "Syrah"
      ]
     },
     {
      "t": "Pasta met tomaten",
      "g": [
       "Primitivo"
      ]
     }
    ],
    "duel": true
   }
  ]
 },
 "white": {
  "grapes": [
   "Chardonnay",
   "Sauvignon Blanc",
   "Pinot Gris",
   "Riesling",
   "Gewürztraminer"
  ],
  "questions": [
   {
    "id": "fruit1",
    "q": "Welke fruitige smaken haal je het liefste uit jouw witte wijn?",
    "options": [
     {
      "t": "Appel",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Riesling"
      ]
     },
     {
      "t": "Ananas",
      "g": [
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling"
      ]
     },
     {
      "t": "Perzik",
      "g": [
       "Chardonnay",
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Peer",
      "g": [
       "Chardonnay",
       "Pinot Gris"
      ]
     },
     {
      "t": "Passievrucht",
      "g": [
       "Sauvignon Blanc",
       "Gewürztraminer"
      ]
     }
    ]
   },
   {
    "id": "spice1",
    "q": "Wat benadert er voor jou het meest de geur van een heerlijke witte wijn?",
    "options": [
     {
      "t": "Witte peper",
      "g": [
       "Riesling"
      ]
     },
     {
      "t": "Kaneel",
      "g": [
       "Chardonnay",
       "Pinot Gris",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Gember",
      "g": [
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Kruidnagel",
      "g": [
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Nootmuskaat",
      "g": [
       "Chardonnay",
       "Gewürztraminer"
      ]
     }
    ]
   },
   {
    "id": "smell1",
    "q": "Hoe zou je het best de geur van jouw witte wijn beschrijven?",
    "options": [
     {
      "t": "Hout (Eik, Dennenboom, Ceder, ...)",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Bloemen (Violet, roos, orchidee, paardenbloem, ..)",
      "g": [
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Fruit (Appel, Peer, Mango, Pompelmoes, Limoen, Lychee, ...)",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling"
      ]
     },
     {
      "t": "Desserts (vanille, honing, koekjes, cake, ijsjes, ...)",
      "g": [
       "Chardonnay",
       "Pinot Gris",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Dieren (hond, kat, paard, ...)",
      "g": []
     }
    ]
   },
   {
    "id": "smell2",
    "q": "Het liefste ruik ik...",
    "options": [
     {
      "t": "Geroosterde nootjes",
      "g": [
       "Chardonnay",
       "Pinot Gris"
      ]
     },
     {
      "t": "(Tropisch) fruit",
      "g": [
       "Sauvignon Blanc",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Yoghurt",
      "g": []
     },
     {
      "t": "Honing",
      "g": [
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Kaneelkoekjes",
      "g": [
       "Chardonnay",
       "Pinot Gris"
      ]
     }
    ]
   },
   {
    "id": "aroma1",
    "q": "Welk aroma verkies je?",
    "options": [
     {
      "t": "Versgemaaid gras",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Bloemen",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Riesling"
      ]
     },
     {
      "t": "Rijp fruit",
      "g": [
       "Gewürztraminer"
      ]
     },
     {
      "t": "Verse kruiden",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Tropisch fruit",
      "g": [
       "Sauvignon Blanc",
       "Gewürztraminer"
      ]
     }
    ]
   },
   {
    "id": "aroma2",
    "q": "Welk aroma trekt jou het meeste aan?",
    "options": [
     {
      "t": "Essentiële oliën",
      "g": [
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Krijt en mortel",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling"
      ]
     },
     {
      "t": "De zweterige kleedkamer van de sportzaal",
      "g": []
     },
     {
      "t": "Bossig landschap",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Tankstation",
      "g": [
       "Riesling"
      ]
     }
    ]
   },
   {
    "id": "occasions1",
    "q": "Voor welke gelegenheid zou je liefst een flesje wijn uit de kast halen?",
    "options": [
     {
      "t": "Alledaags drinkfestijn",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Lunch",
      "g": [
       "Sauvignon Blanc",
       "Pinot Gris"
      ]
     },
     {
      "t": "Dessert",
      "g": [
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Feestelijke gelegenheid",
      "g": [
       "Chardonnay",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Alle bovenstaande (en ik zou 'booze cruise' willen toevoegen)",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Pinot Gris",
       "Riesling",
       "Gewürztraminer"
      ]
     }
    ]
   },
   {
    "id": "sour1",
    "q": "Wat vind je van zure smaken?",
    "options": [
     {
      "t": "Heerlijk!",
      "g": [
       "Sauvignon Blanc",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Het valt wel mee...",
      "g": [
       "Chardonnay",
       "Pinot Gris"
      ]
     },
     {
      "t": "Niets van!",
      "g": [
       "Riesling"
      ]
     }
    ]
   },
   {
    "id": "sweetness1",
    "q": "Wat vind je van zoete smaken?",
    "options": [
     {
      "t": "Geef maar hier! Hoe meer, hoe beter!",
      "g": [
       "Gewürztraminer"
      ]
     },
     {
      "t": "Dat kan, maar niet altijd...",
      "g": [
       "Pinot Gris",
       "Riesling"
      ]
     },
     {
      "t": "Héél uitzonderlijk eens...",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Geen zoete brol!",
      "g": [
       "Sauvignon Blanc"
      ]
     }
    ]
   },
   {
    "id": "aroma3",
    "q": "Welk smaakprofiel zou jouw voorkeur genieten?",
    "options": [
     {
      "t": "Fruitig",
      "g": [
       "Pinot Gris",
       "Riesling"
      ]
     },
     {
      "t": "Aards",
      "g": [
       "Chardonnay",
       "Riesling",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Floraal",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Pinot Gris"
      ]
     },
     {
      "t": "Kruidig",
      "g": [
       "Chardonnay",
       "Sauvignon Blanc",
       "Gewürztraminer"
      ]
     },
     {
      "t": "Grassig",
      "g": [
       "Sauvignon Blanc"
      ]
     }
    ]
   },
   {
    "id": "cocktail1",
    "q": "Wat is jouw favoriete cocktail?",
    "options": [
     {
      "t": "Mojito: Fris en levendig met toetsen van munt en limoen.",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Mimosa: Verfrissend en citrus-achtig met een basis van schuimende wijn.",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Margarita: Scherp en uitgesproken citrus met een subtiele zoete afdronk.",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Martini: Klassiek en verfijnd met verschillende opties voor smaken.",
      "g": [
       "Gewürztraminer"
      ]
     },
     {
      "t": "Cosmopolitan: Fruitig met een toets van veenbessen en citrus.",
      "g": [
       "Riesling"
      ]
     }
    ]
   },
   {
    "id": "pairing1",
    "q": "Wat is jouw perfecte excuus om een flesje wijn te openen?",
    "options": [
     {
      "t": "Steak",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Aperitief",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Kaas",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Vis",
      "g": [
       "Riesling"
      ]
     },
     {
      "t": "Pasta",
      "g": [
       "Gewürztraminer"
      ]
     }
    ]
   }
  ],
  "desc": {
   "Chardonnay": "De kameleon onder de witte druiven. Van strak en mineraal (Chablis) tot rijk en boterig met vanille en geroosterde noten als hij op hout rijpt. Peer, appel, en bij warmere streken ook perzik.",
   "Sauvignon Blanc": "Fris, grassig en uitgesproken. Versgemaaid gras, kruisbes, citrus en in warme streken passievrucht. Hoge zuren, veel energie. Perfect bij geitenkaas, vis en een zonnig terras.",
   "Pinot Gris": "Zacht en rond, met peer, honing en een vleugje kruiden. In Italië (Pinot Grigio) licht en fris, in de Elzas voller en rijker. Een allemansvriend bij lunch en lichte gerechten.",
   "Riesling": "Aromatisch en levendig, met groene appel, citrus, bloemen en met wat jaren die beroemde toets van petroleum. Van kurkdroog tot zoet, altijd met frisse zuren. Een topdruif bij Aziatisch eten.",
   "Gewürztraminer": "Exotisch en uitbundig: lychee, rozenblaadjes, gember en een zachte, bijna zoete rondheid. De druif voor wie van parfum, kruiden en pittig eten houdt."
  },
  "core": [
   "fruit1",
   "spice1",
   "smell1",
   "smell2",
   "aroma1",
   "aroma2",
   "occasions1",
   "sour1"
  ],
  "duels": [
   {
    "id": "d_ch_sb_1",
    "q": "Boter of versgemaaid gras?",
    "options": [
     {
      "t": "Boter",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Versgemaaid gras",
      "g": [
       "Sauvignon Blanc"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_sb_2",
    "q": "Roomijs of sorbet?",
    "options": [
     {
      "t": "Roomijs",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Sorbet",
      "g": [
       "Sauvignon Blanc"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_pg_1",
    "q": "Geroosterde noten of rijpe peer?",
    "options": [
     {
      "t": "Geroosterde noten",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Rijpe peer",
      "g": [
       "Pinot Gris"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_pg_2",
    "q": "Gegrilde vis in botersaus of een lichte lunch?",
    "options": [
     {
      "t": "Vis in botersaus",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Lichte lunch",
      "g": [
       "Pinot Gris"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_ri_1",
    "q": "Vanille of citroen?",
    "options": [
     {
      "t": "Vanille",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Citroen",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_ri_2",
    "q": "Bourgogne of de Moezel?",
    "options": [
     {
      "t": "Bourgogne, bien sûr!",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "De Moezel, bitte!",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_gw_1",
    "q": "Klassiek concert of Back to the nillies?",
    "options": [
     {
      "t": "Klassiek concert",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Back to the nillies",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ch_gw_2",
    "q": "Opaalkust of Parijs?",
    "options": [
     {
      "t": "Opaalkust",
      "g": [
       "Chardonnay"
      ]
     },
     {
      "t": "Parijs",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_pg_1",
    "q": "Kruisbes en pompelmoes, of peer en honing?",
    "options": [
     {
      "t": "Kruisbes en pompelmoes",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Peer en honing",
      "g": [
       "Pinot Gris"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_pg_2",
    "q": "Kritische noot of diepgaand gesprek?",
    "options": [
     {
      "t": "Kritische noot",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Diepgaand gesprek",
      "g": [
       "Pinot Gris"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_ri_1",
    "q": "Lente of zomer?",
    "options": [
     {
      "t": "Lente",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Zomer",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_ri_2",
    "q": "Geitenkaas of sushi?",
    "options": [
     {
      "t": "Geitenkaas",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Sushi",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_gw_1",
    "q": "Fris en kurkdroog, of weelderig en bijna zoet?",
    "options": [
     {
      "t": "Fris en kurkdroog",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Weelderig en bijna zoet",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_sb_gw_2",
    "q": "Buxus of rozen?",
    "options": [
     {
      "t": "Buxus",
      "g": [
       "Sauvignon Blanc"
      ]
     },
     {
      "t": "Rozen",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pg_ri_1",
    "q": "Zacht of levendig?",
    "options": [
     {
      "t": "Zacht",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Levendig",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pg_ri_2",
    "q": "Peer of groene appel?",
    "options": [
     {
      "t": "Peer",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Groene appel",
      "g": [
       "Riesling"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pg_gw_1",
    "q": "Het bescheiden maar aimabele muurbloempje of de allomtegenwoordige diva van het gezelschap?",
    "options": [
     {
      "t": "Muurbloempje",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Diva",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_pg_gw_2",
    "q": "Honing of gember?",
    "options": [
     {
      "t": "Honing",
      "g": [
       "Pinot Gris"
      ]
     },
     {
      "t": "Gember",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ri_gw_1",
    "q": "Strand of bergen?",
    "options": [
     {
      "t": "Strand",
      "g": [
       "Riesling"
      ]
     },
     {
      "t": "Bergen",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   },
   {
    "id": "d_ri_gw_2",
    "q": "Pittige Thaise curry of romige Indische korma?",
    "options": [
     {
      "t": "Thaise curry",
      "g": [
       "Riesling"
      ]
     },
     {
      "t": "Indische korma",
      "g": [
       "Gewürztraminer"
      ]
     }
    ],
    "duel": true
   }
  ]
 }
};
