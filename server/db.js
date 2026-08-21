import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

// Default initial data for Senga Systems
const initialData = {
  users: [
    { id: '1', name: 'Dr. Senga CEO', email: 'admin@sengasystems.mw', role: 'Super Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { id: '2', name: 'Chimwemwe Banda', email: 'editor@sengasystems.mw', role: 'Content Editor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { id: '3', name: 'Tiwonge Phiri', email: 'biz@sengasystems.mw', role: 'Business Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { id: '4', name: 'Kondwani Mwale', email: 'support@sengasystems.mw', role: 'Support Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
  ],
  posts: [
    {
      id: 'p1',
      title: 'Senga Systems Unveils Next-Gen AI Security Engine in Malawi',
      type: 'news',
      category: 'Artificial Intelligence',
      author: 'Dr. Senga CEO',
      date: '2026-08-15',
      excerpt: 'Senga Systems introduces SengaShield AI, bringing automated threat analysis and real-time defense to commercial banks and telecommunications in Malawi.',
      content: 'Senga Systems has launched its flagship SengaShield AI engine, designed to give Malawian enterprises active defense against ransomware, data breaches, and cyber threats.',
      featured: true,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p2',
      title: 'Mastering Enterprise Cloud Migration & ICT Modernization',
      type: 'insights',
      category: 'Cloud & Infrastructure',
      author: 'Tiwonge Phiri',
      date: '2026-08-10',
      excerpt: 'Key strategies for African organizations transitioning legacy infrastructure into high-availability cloud hybrid architecture.',
      content: 'As digital transformation accelerates across East and Southern Africa, cloud adoption requires careful planning around data sovereignty, connectivity, and zero-trust security.',
      featured: true,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p3',
      title: 'Malawi Executive Cybersecurity Summit 2026',
      type: 'events',
      category: 'Conference',
      author: 'Kondwani Mwale',
      date: '2026-09-25',
      location: 'Bingu International Convention Centre (BICC), Lilongwe',
      excerpt: 'Join tech leaders, CTOs, and cybersecurity experts for a full-day summit on defending critical national ICT infrastructure.',
      content: 'Hands-on sessions on zero-trust implementation, AI risk governance, and blockchain encryption.',
      seatsAvailable: 45,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p4',
      title: 'Scheduled System Upgrade: Core Data Infrastructure',
      type: 'announcements',
      category: 'System Maintenance',
      author: 'System Operations',
      date: '2026-08-18',
      urgency: 'Normal',
      excerpt: 'Routine server maintenance scheduled for Sunday midnight GMT+2. Cloud hosting services will remain fully redundant.',
      content: 'No disruption expected for SengaShield active clients.'
    }
  ],
  vacancies: [
    {
      id: 'v1',
      title: 'Senior AI / Machine Learning Engineer',
      department: 'Software Engineering',
      location: 'Lilongwe (Hybrid)',
      type: 'Full-time',
      deadline: '2026-09-15',
      description: 'Lead the development of custom LLM and computer vision models for our enterprise clients in financial services and logistics.',
      requirements: ['3+ years Python/PyTorch experience', 'Deep knowledge of NLP and modern transformer architecture', 'Experience deploying containerized ML pipelines on AWS/Azure']
    },
    {
      id: 'v2',
      title: 'Cybersecurity Threat Analyst',
      department: 'SengaShield Defense Unit',
      location: 'Blantyre (On-site)',
      type: 'Full-time',
      deadline: '2026-09-20',
      description: 'Monitor, detect, and respond to cyber security incidents across managed customer networks in real-time.',
      requirements: ['CEH, CISSP, or CompTIA Security+ certification', 'SIEM log monitoring expertise', 'Strong background in network forensics']
    }
  ],
  quotes: [
    {
      id: 'q1',
      clientName: 'NICO Holdings Tech Division',
      email: 'tech@nico-example.mw',
      phone: '+265 999 123 789',
      serviceRequested: 'Full-Stack Software Development',
      budget: '$25,000 - $50,000',
      details: 'We need an enterprise client mobile portal with biometric authentication and core banking backend integration.',
      status: 'New',
      submittedAt: '2026-08-19T14:30:00Z'
    }
  ],
  consultations: [
    {
      id: 'c1',
      clientName: 'FDH Bank Operations',
      email: 'ops@fdh-example.mw',
      phone: '+265 888 456 123',
      consultantNeeded: 'Cybersecurity & SengaShield Audit',
      preferredDate: '2026-08-25',
      timeSlot: '10:00 AM',
      notes: 'Initial discussion for penetration testing of our web applications.',
      status: 'Confirmed'
    }
  ],
  tickets: [
    {
      id: 't1',
      ticketNo: 'SNG-8892',
      clientName: 'National Bank Malawi',
      subject: 'SSL Certificate Renewal Assistance',
      priority: 'Medium',
      status: 'In Progress',
      date: '2026-08-18'
    }
  ]
};

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

export function readDB() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB, using initial data:', err);
    return initialData;
  }
}

export function writeDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}
