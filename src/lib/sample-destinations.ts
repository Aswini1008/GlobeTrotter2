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
    country: 'Tamil Nadu',
    imageUrls: [
        'https://images.unsplash.com/photo-1613436859363-a725a39c4a4e?q=80&w=1920',
        'https://images.unsplash.com/photo-1599422336399-0a3c7e46497c?q=80&w=1920',
        'https://images.unsplash.com/photo-1559819239-e475f8a05c75?q=80&w=1920'
    ],
    tags: ['Hill Station', 'Nature', 'Relaxation'],
    bestTime: 'Oct-Jun',
    budget: 'Medium',
  },
  {
    id: 'dest-2',
    city: 'Goa',
    country: 'India',
    imageUrls: [
        'https://images.unsplash.com/photo-1590372728286-95701c385863?q=80&w=1920',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1920',
        'https://images.unsplash.com/photo-1533610216442-9a6b3996502e?q=80&w=1920'
    ],
    tags: ['Beaches', 'Parties', 'Food'],
    bestTime: 'Nov-Feb',
    budget: 'Medium',
  },
  {
    id: 'dest-3',
    city: 'Munnar',
    country: 'Kerala',
    imageUrls: [
        'https://images.unsplash.com/photo-1616388969582-87a71021437b?q=80&w=1920',
        'https://images.unsplash.com/photo-1593359677879-a4bb92f88c70?q=80&w=1920',
        'https://images.unsplash.com/photo-1582234027734-a0353a873832?q=80&w=1920',
    ],
    tags: ['Hill Station', 'Tea Gardens', 'Scenery'],
    bestTime: 'Sep-Mar',
    budget: 'Low',
  },
  {
    id: 'dest-4',
    city: 'Jaipur',
    country: 'Rajasthan',
    imageUrls: [
        'https://images.unsplash.com/photo-1567219946895-9b1a520c4a75?q=80&w=1920',
        'https://images.unsplash.com/photo-1603261578335-5825319a28fa?q=80&w=1920',
        'https://images.unsplash.com/photo-1599661046223-e0d582164ab2?q=80&w=1920',
    ],
    tags: ['Culture', 'Forts', 'History'],
    bestTime: 'Oct-Mar',
    budget: 'Medium',
  },
   {
    id: 'dest-5',
    city: 'Kodaikanal',
    country: 'Tamil Nadu',
    imageUrls: [
        'https://images.unsplash.com/photo-1600211912558-89b1b119ea73?q=80&w=1920',
        'https://images.unsplash.com/photo-1623547372921-27801a613543?q=80&w=1920',
        'https://images.unsplash.com/photo-1605540432043-37af1256338e?q=80&w=1920'
    ],
    tags: ['Hill Station', 'Lakes', 'Nature'],
    bestTime: 'Sep-May',
    budget: 'Low',
  },
   {
    id: 'dest-6',
    city: 'Rishikesh',
    country: 'Uttarakhand',
    imageUrls: [
        'https://images.unsplash.com/photo-1597653733687-1b6787d20a7b?q=80&w=1920',
        'https://images.unsplash.com/photo-1605792946927-e43594b23f1c?q=80&w=1920',
        'https://images.unsplash.com/photo-1596791552525-4a27a85c98cc?q=80&w=1920'
    ],
    tags: ['Spirituality', 'Adventure', 'Yoga'],
    bestTime: 'Sep-Nov, Feb-Apr',
    budget: 'Low',
  },
   {
    id: 'dest-7',
    city: 'Srinagar',
    country: 'Jammu & Kashmir',
    imageUrls: [
        'https://images.unsplash.com/photo-1598234339899-13f64585542b?q=80&w=1920',
        'https://images.unsplash.com/photo-1579724128096-2d57a2f5a6f2?q=80&w=1920',
        'https://images.unsplash.com/photo-1620986026367-9d9e602e1b1d?q=80&w=1920'
    ],
    tags: ['Lakes', 'Gardens', 'Scenery'],
    bestTime: 'Apr-Oct',
    budget: 'High',
  },
   {
    id: 'dest-8',
    city: 'Pondicherry',
    country: 'Puducherry',
    imageUrls: [
        'https://images.unsplash.com/photo-1615966395988-163b45e851d3?q=80&w=1920',
        'https://images.unsplash.com/photo-1581488185090-3b18ad4a6313?q=80&w=1920',
        'https://images.unsplash.com/photo-1616868565158-a256a6f4370f?q=80&w=1920'
    ],
    tags: ['Beaches', 'French Colony', 'Spirituality'],
    bestTime: 'Oct-Mar',
    budget: 'Medium',
  },
];
