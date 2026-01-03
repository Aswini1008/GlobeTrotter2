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
      'https://images.unsplash.com/photo-1613436859363-a725a39c4a4e?q=80&w=1920',
      'https://images.unsplash.com/photo-1599422333232-a52d3648f51a?q=80&w=1920',
      'https://images.unsplash.com/photo-1579566379515-5858c1482b63?q=80&w=1920',
    ],
    tags: ['Hill Station', 'Nature', 'Relaxation'],
    bestTime: 'Oct–Jun',
    budget: 'Medium',
  },
  {
    id: 'dest-2',
    city: 'Goa',
    country: 'India',
    imageUrls: [
      'https://images.unsplash.com/photo-1590372728286-95701c385863?q=80&w=1920',
      'https://images.unsplash.com/photo-1560179407-9f0b826b06a3?q=80&w=1920',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1920',
    ],
    tags: ['Beaches', 'Parties', 'Food'],
    bestTime: 'Nov–Feb',
    budget: 'Medium',
  },
  {
    id: 'dest-3',
    city: 'Munnar',
    country: 'Kerala, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1616388969582-c36117c78736?q=80&w=1920',
      'https://images.unsplash.com/photo-1578996328283-a2a43391d31a?q=80&w=1920',
      'https://images.unsplash.com/photo-1628183298284-a131b79e4917?q=80&w=1920',
    ],
    tags: ['Hill Station', 'Tea Gardens', 'Scenery'],
    bestTime: 'Sep–Mar',
    budget: 'Low',
  },
  {
    id: 'dest-4',
    city: 'Jaipur',
    country: 'Rajasthan, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1567219946895-9b1a520c4a75?q=80&w=1920',
      'https://images.unsplash.com/photo-1603261623403-6086e0a3233c?q=80&w=1920',
      'https://images.unsplash.com/photo-1559991802-f6046e0a5a31?q=80&w=1920',
    ],
    tags: ['Culture', 'Forts', 'History'],
    bestTime: 'Oct–Mar',
    budget: 'Medium',
  },
  {
    id: 'dest-5',
    city: 'Kodaikanal',
    country: 'Tamil Nadu, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1615462007621-e353259a43a2?q=80&w=1920',
      'https://images.unsplash.com/photo-1599752906470-e67c033c413e?q=80&w=1920',
      'https://images.unsplash.com/photo-1623631375338-ea22495d4694?q=80&w=1920',
    ],
    tags: ['Hill Station', 'Lakes', 'Nature'],
    bestTime: 'Sep–May',
    budget: 'Low',
  },
  {
    id: 'dest-6',
    city: 'Rishikesh',
    country: 'Uttarakhand, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1597653733687-1b6787d20a7b?q=80&w=1920',
      'https://images.unsplash.com/photo-1602163923365-a6a99244a0c4?q=80&w=1920',
      'https://images.unsplash.com/photo-1587899764388-75c87d191c9b?q=80&w=1920',
    ],
    tags: ['Spirituality', 'Adventure', 'Yoga'],
    bestTime: 'Sep–Nov, Feb–Apr',
    budget: 'Low',
  },
  {
    id: 'dest-7',
    city: 'Srinagar',
    country: 'Jammu & Kashmir, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1579724128096-2d57a2f5a6f2?q=80&w=1920',
      'https://images.unsplash.com/photo-1610961814270-35699c2776c1?q=80&w=1920',
      'https://images.unsplash.com/photo-1507722765375-87a8b43d7890?q=80&w=1920',
    ],
    tags: ['Lakes', 'Gardens', 'Scenery'],
    bestTime: 'Apr–Oct',
    budget: 'High',
  },
  {
    id: 'dest-8',
    city: 'Pondicherry',
    country: 'Puducherry, India',
    imageUrls: [
      'https://images.unsplash.com/photo-1549959242-269ce38a109a?q=80&w=1920',
      'https://images.unsplash.com/photo-1562911791-c2d9e0861b58?q=80&w=1920',
      'https://images.unsplash.com/photo-1591596773350-a94f63c233c4?q=80&w=1920',
    ],
    tags: ['Beaches', 'French Colony', 'Spirituality'],
    bestTime: 'Oct–Mar',
    budget: 'Medium',
  },
];
