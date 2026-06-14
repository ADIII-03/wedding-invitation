import { Ceremony, Blessing } from './types';

export const ceremonies: Ceremony[] = [
  {
    id: 'senduri',
    nameHindi: 'सेंदुरी',
    nameEnglish: 'SENDURI CEREMONY',
    dateEnglish: '20 June 2026',
    dateHindi: '२० जून २०२६',
    dayHindi: 'शानिवार',
    bgDecorativeSymbol: '🌸',
    descriptionHindi: 'अंगराग एवं मांगलिक मांग सिन्दूर रस्म',
    descriptionEnglish: 'Traditional Sindoor/Vermilion Rituals'
  },
  {
    id: 'matkor',
    nameHindi: 'घृतढारी, मटकोर एवं पूजा',
    nameEnglish: 'GRITHDARI & MATKOR PUJA',
    dateEnglish: '22 June 2026',
    dateHindi: '२२ जून २०२६',
    dayHindi: 'सोमवार',
    bgDecorativeSymbol: '🍯',
    descriptionHindi: 'माटी पूजन, घृतधारी मांगलिक विधि विधान',
    descriptionEnglish: 'Sacred Soil Worship & Oil Rituals'
  },
  {
    id: 'haldi_mehndi',
    nameHindi: 'हल्दी एवं मेहंदी',
    nameEnglish: 'HALDI & MEHNDI CEREMONY',
    dateEnglish: '23 June 2026',
    dateHindi: '२३ जून २०२६',
    dayHindi: 'मंगलवार',
    bgDecorativeSymbol: '🌿',
    descriptionHindi: 'हरिद्रा लेपन एवं सखी-सहेलियों संग महँदी उत्सव',
    descriptionEnglish: 'Turmeric Smearing & Heena Celebrations'
  },
  {
    id: 'wedding',
    nameHindi: 'शुभ विवाह एवं प्रीतिभोज',
    nameEnglish: 'WEDDING CEREMONY',
    dateEnglish: '24 June 2026',
    dateHindi: '२४ जून २०२६',
    dayHindi: 'बुधवार',
    bgDecorativeSymbol: '🔥',
    time: 'प्रीतिभोज: दोपहर 02:00 बजे से | शुभविवाह: रात्रि बेला में',
    descriptionHindi: 'जयमाला, शुभ फेरे, पाणिग्रहण एवं सिन्दूर दान',
    descriptionEnglish: 'Auspicious Wedding Rituals: Jaymala, Pheras & Sindoor Daan'
  },
  {
    id: 'reception',
    nameHindi: 'वर-वधू स्वागत समारोह (Reception)',
    nameEnglish: 'RECEPTION CEREMONY',
    dateEnglish: '27 June 2026',
    dateHindi: '२७ जून २०२६',
    dayHindi: 'शनिवार',
    bgDecorativeSymbol: '🏛️',
    time: 'संध्या 07:00 बजे से प्रीतिभोज',
    descriptionHindi: 'नव-दम्पति स्वागत भोज एवं आशीर्वाद समारोह',
    descriptionEnglish: 'Grand Feast & Blessings for the Newlyweds'
  }
];

export const weddingGroom = {
  name: 'Rahul Raman',
  nameHindi: 'आयुष्मान् राहुल रमण',
  father: 'Ajay Prasad Sahu',
  fatherHindi: 'श्री अजय प्रसाद साहु',
  mother: 'Smt. Reeta Kumari',
  motherHindi: 'श्रीमती रीता कुमारी',
  grandfather: 'Late Shiv Prasad Sahu',
  grandfatherHindi: 'स्व० शिव प्रसाद साहु',
  address: {
    villagePost: 'Thahra Gopalpur (तहड़ा गोपालपुर)',
    policeStation: 'Vaini (वैनी)',
    district: 'Samastipur (समस्तीपुर)',
    state: 'Bihar - 848115'
  }
};

export const weddingBride = {
  name: 'Sushmita Rani',
  nameHindi: 'आयुष्मती सुष्मिता रानी',
  father: 'Sanjeev Kumar Sahu',
  fatherHindi: 'श्री संजीव कुमार साह',
  mother: 'Smt. Anamika Devi',
  motherHindi: 'श्रीमती अनामिका देवी',
  address: {
    village: 'Mahant Maniyari',
    villageHindi: 'ग्राम-मध्य मनियारी',
    post: 'Silaut (सिलौत)',
    policeStation: 'Maniyari (मनियारी)',
    district: 'Muzaffarpur',
    state: 'Bihar'
  }
};

export const balAagrah = {
  text: 'न कोई ड्यूटी, न दफ्तर न कोई बहाना होगा, मेरे चाचू की शादी में जलूल से जलूल आना होगा...',
  by: 'शिवेन्द्र राज'
};

export const inviters = {
  names: ['Ajay Prasad Sahu', 'Arun Kumar Sahu'],
  namesHindi: ['अजय प्रसाद साहु', 'अरुण कुमार साहु'],
  relation: 'and family members'
};

export const wellWishers = [
  'कामेश्वर साहु',
  'अरविन्द कुमार',
  'अमीय कुमार',
  'आशीष रंजन',
  'आदित्य रमण',
  'अभय रंजन',
  'शिवेन्द्र राज'
];

export const mapLocations = {
  wedding: {
    name: 'Mahant Maniyari, Muzaffarpur, Bihar',
    link: 'https://maps.google.com/?q=Mahant+Maniyari,+Muzaffarpur,+Bihar'
  },
  reception: {
    name: 'Thahra Gopalpur, Samastipur, Bihar',
    link: 'https://www.google.com/maps/place/25%C2%B055\'29.6%22N+85%C2%B040\'31.1%22E/@25.9253502,85.6737525,15.99z/data=!4m4!3m3!8m2!3d25.92488!4d85.67531?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D'
  }
};

export const initialBlessings: Blessing[] = [
  {
    id: 'blessing-1',
    name: 'Ramesh Prasad Sahu',
    relation: 'Uncle (पटना)',
    message: 'हार्दिक शुभकामनाएं! प्रभु गणेश वर-वधू को सुखी और मंगलमय दाम्पत्य जीवन प्रदान करें।',
    timestamp: '2026-06-13T10:15:00Z'
  },
  {
    id: 'blessing-2',
    name: 'Pooja Kumari',
    relation: 'Cousin (दिल्ली)',
    message: 'Wishing Rahul Bhaiya and Sushmita Bhabhi a lifetime of love, laughter, and endless happiness!',
    timestamp: '2026-06-13T14:32:00Z'
  },
  {
    id: 'blessing-3',
    name: 'Vikas & Shruti',
    relation: 'Friends (बेंगलुरु)',
    message: 'Congratulations guys! So excited for the wedding. Definitely joining the celebrations!',
    timestamp: '2026-06-13T19:45:00Z'
  }
];
