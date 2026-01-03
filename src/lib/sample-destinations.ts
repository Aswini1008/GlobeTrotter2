export type Destination = {
  id: string;
  city: string;
  country: string;
  imageUrls: string[];
  tags: string[];
  bestTime: string;
  budget: 'Low' | 'Medium' | 'High';
};

export const sampleDestinations: Destination[] = [
  {
    id: 'dest-1',
    city: 'Ooty',
    country: 'Tamil Nadu, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?ooty,hills',
      'https://source.unsplash.com/1920x1080/?ooty,tea-plantation',
      'https://source.unsplash.com/1920x1080/?ooty,mountains',
      'https://source.unsplash.com/1920x1080/?ooty,nature'
    ],
    tags: ['Hill Station', 'Nature', 'Relaxation'],
    bestTime: 'Oct–Jun',
    budget: 'Medium'
  },
  {
    id: 'dest-2',
    city: 'Goa',
    country: 'India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?goa,beach',
      'https://source.unsplash.com/1920x1080/?goa,sea',
      'https://source.unsplash.com/1920x1080/?goa,sunset'
    ],
    tags: ['Beaches', 'Parties', 'Food'],
    bestTime: 'Nov–Feb',
    budget: 'Medium'
  },
  {
    id: 'dest-3',
    city: 'Munnar',
    country: 'Kerala, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?munnar,tea-gardens',
      'https://source.unsplash.com/1920x1080/?munnar,hills',
      'https://source.unsplash.com/1920x1080/?munnar,mountains'
    ],
    tags: ['Hill Station', 'Tea Gardens', 'Scenery'],
    bestTime: 'Sep–Mar',
    budget: 'Low'
  },
  {
    id: 'dest-4',
    city: 'Jaipur',
    country: 'Rajasthan, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?jaipur,fort',
      'https://source.unsplash.com/1920x1080/?jaipur,palace',
      'https://source.unsplash.com/1920x1080/?jaipur,heritage'
    ],
    tags: ['Culture', 'Forts', 'History'],
    bestTime: 'Oct–Mar',
    budget: 'Medium'
  },
  {
    id: 'dest-5',
    city: 'Kodaikanal',
    country: 'Tamil Nadu, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?kodaikanal,hills',
      'https://source.unsplash.com/1920x1080/?kodaikanal,lake',
      'https://source.unsplash.com/1920x1080/?kodaikanal,nature'
    ],
    tags: ['Hill Station', 'Lakes', 'Nature'],
    bestTime: 'Sep–May',
    budget: 'Low'
  },
  {
    id: 'dest-6',
    city: 'Rishikesh',
    country: 'Uttarakhand, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?rishikesh,ganga',
      'https://source.unsplash.com/1920x1080/?rishikesh,yoga',
      'https://source.unsplash.com/1920x1080/?rishikesh,rafting'
    ],
    tags: ['Spirituality', 'Adventure', 'Yoga'],
    bestTime: 'Sep–Nov, Feb–Apr',
    budget: 'Low'
  },
  {
    id: 'dest-7',
    city: 'Srinagar',
    country: 'Jammu & Kashmir, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?srinagar,dal-lake',
      'https://source.unsplash.com/1920x1080/?srinagar,houseboat',
      'https://source.unsplash.com/1920x1080/?srinagar,mountains'
    ],
    tags: ['Lakes', 'Gardens', 'Scenery'],
    bestTime: 'Apr–Oct',
    budget: 'High'
  },
  {
    id: 'dest-8',
    city: 'Pondicherry',
    country: 'Puducherry, India',
    imageUrls: [
      'https://source.unsplash.com/1920x1080/?pondicherry,beach',
      'https://source.unsplash.com/1920x1080/?pondicherry,french-colony',
      'https://source.unsplash.com/1920x1080/?pondicherry,sea'
    ],
    tags: ['Beaches', 'French Colony', 'Spirituality'],
    bestTime: 'Oct–Mar',
    budget: 'Medium'
  }
];
