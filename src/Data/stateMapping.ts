export interface StateMapping {
  [city: string]: string;
}

export const texasCities: StateMapping = {
  "houston": "Texas",
  "dallas": "Texas", 
  "austin": "Texas",
  "san antonio": "Texas",
  "el paso": "Texas",
  "fort worth": "Texas",
  "arlington": "Texas",
  "corpus christi": "Texas",
  "plano": "Texas",
  "lubbock": "Texas",
  // Add more Texas cities as needed
};

export const ohioCities: StateMapping = {
  "columbus": "Ohio",
  "cleveland": "Ohio",
  "cincinnati": "Ohio",
  "toledo": "Ohio",
  "akron": "Ohio",
  "dayton": "Ohio",
  "parma": "Ohio",
  "canton": "Ohio",
  "youngstown": "Ohio",
  "lorain": "Ohio",
  // Add more Ohio cities as needed
};

export const californiaCities: StateMapping = {
  "los angeles": "California",
  "san francisco": "California",
  "san diego": "California",
  "san jose": "California",
  "sacramento": "California",
  "fresno": "California",
  "long beach": "California",
  "oakland": "California",
  "bakersfield": "California",
  "anaheim": "California"
};

export const floridaCities: StateMapping = {
  "miami": "Florida",
  "orlando": "Florida",
  "tampa": "Florida",
  "jacksonville": "Florida",
  "tallahassee": "Florida",
  "st. petersburg": "Florida",
  "hialeah": "Florida",
  "fort lauderdale": "Florida",
  "cape coral": "Florida",
  "pembroke pines": "Florida"
};

export const newYorkCities: StateMapping = {
  "new york city": "New York",
  "buffalo": "New York",
  "rochester": "New York",
  "albany": "New York",
  "syracuse": "New York",
  "yonkers": "New York",
  "utica": "New York",
  "mount vernon": "New York",
  "schenectady": "New York",
  "new rochelle": "New York"
};

export const illinoisCities: StateMapping = {
  "chicago": "Illinois",
  "aurora": "Illinois",
  "naperville": "Illinois",
  "joliet": "Illinois",
  "rockford": "Illinois",
  "springfield": "Illinois",
  "peoria": "Illinois",
  "elgin": "Illinois",
  "waukegan": "Illinois",
  "cicero": "Illinois"
};

export const pennsylvaniaCities: StateMapping = {
  "philadelphia": "Pennsylvania",
  "pittsburgh": "Pennsylvania",
  "allentown": "Pennsylvania",
  "erie": "Pennsylvania",
  "reading": "Pennsylvania",
  "scranton": "Pennsylvania",
  "bethlehem": "Pennsylvania",
  "lancaster": "Pennsylvania",
  "harrisburg": "Pennsylvania",
  "altoona": "Pennsylvania"
};

export const arizonaCities: StateMapping = {
  "phoenix": "Arizona",
  "tucson": "Arizona",
  "mesa": "Arizona",
  "chandler": "Arizona",
  "glendale": "Arizona",
  "scottsdale": "Arizona",
  "gilbert": "Arizona",
  "tempe": "Arizona",
  "peoria": "Arizona",
  "surprise": "Arizona"
};

export const georgiaCities: StateMapping = {
  "atlanta": "Georgia",
  "augusta": "Georgia",
  "columbus": "Georgia",
  "macon": "Georgia",
  "savannah": "Georgia",
  "athens": "Georgia",
  "sandy springs": "Georgia",
  "roswell": "Georgia",
  "johns creek": "Georgia",
  "warner robins": "Georgia"
};

export const northCarolinaCities: StateMapping = {
  "charlotte": "North Carolina",
  "raleigh": "North Carolina",
  "greensboro": "North Carolina",
  "durham": "North Carolina",
  "winston-salem": "North Carolina",
  "fayetteville": "North Carolina",
  "cary": "North Carolina",
  "wilmington": "North Carolina",
  "high point": "North Carolina",
  "concord": "North Carolina"
};

export const michiganCities: StateMapping = {
  "detroit": "Michigan",
  "grand rapids": "Michigan",
  "warren": "Michigan",
  "sterling heights": "Michigan",
  "lansing": "Michigan",
  "ann arbor": "Michigan",
  "flint": "Michigan",
  "dearborn": "Michigan",
  "livonia": "Michigan",
  "westland": "Michigan"
};

export const newJerseyCities: StateMapping = {
  "newark": "New Jersey",
  "jersey city": "New Jersey",
  "paterson": "New Jersey",
  "elizabeth": "New Jersey",
  "edison": "New Jersey",
  "woodbridge": "New Jersey",
  "lakewood": "New Jersey",
  "toms river": "New Jersey",
  "hamilton": "New Jersey",
  "trenton": "New Jersey"
};

export const allCities: StateMapping = {
  ...texasCities,
  ...ohioCities,
  ...californiaCities,
  ...floridaCities,
  ...newYorkCities,
  ...illinoisCities,
  ...pennsylvaniaCities,
  ...arizonaCities,
  ...georgiaCities,
  ...northCarolinaCities,
  ...michiganCities,
  ...newJerseyCities
};
