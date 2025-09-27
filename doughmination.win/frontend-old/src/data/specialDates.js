// Special dates and effects configuration
export const specialDates = [
  // System member birthdays - replace with your actual dates
  // 0 - Jan and 11 - Dec
  { 
    month: 8, 
    day: 15, 
    id: 'clove-birthday', 
    message: "🎂 Happy Birthday Clove! 🎂", 
    effect: 'birthday' 
  },
  {
    month: 7,
    day: 7,
    id: 'athena-birthday',
    message: "🎂 Happy Birthday Athena! 🎂",
    effect: 'birthday',
  },
  {
    month: 8,
    day: 16,
    id: "🎂 Happy Birthday Rose! 🎂",
    effect: 'birthday',
  },
  {
    month: 4,
    day: 6,
    id: 'emilylinkin-birthday',
    message: "🎂 Happy Birthday Emily! 🎂",
    effect: 'birthday'
  },
  
  // Seasonal effects
  { 
    month: 9, 
    day: 31, 
    id: 'halloween', 
    message: "👻 Happy Halloween! 👻", 
    effect: 'halloween', 
    duration: 1
  },  // Halloween
  { 
    month: 11, 
    day: 25, 
    id: 'christmas', 
    message: "🎄 Merry Christmas! 🎄", 
    effect: 'christmas', 
    duration: 7
  }, // Christmas
  { 
    month: 0, 
    day: 1, 
    id: 'new-year', 
    message: "🎆 Happy New Year! 🎆", 
    effect: 'new-year', 
    duration: 2
  },  // New Year
  { 
    month: 5, 
    day: 1, 
    id: 'pride', 
    message: "🏳️‍🌈 Happy Pride Month! 🏳️‍🌈", 
    effect: 'pride', 
    duration: 30
  },  // Pride Month
];