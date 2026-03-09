export type MoneyType = {
  amount: number;
  currency: string;
};

export type TableData = {
  id: string;
  date?: string;
  item: string;
  description?: string;
  price: MoneyType;
  qty: number;
  additionalData: AdditionalData;
};

export type AdditionalData = {
  description: string;
  category: string;
  supplier: string;
  inStock: boolean;
  rating: number;
};

function generateISODate() {
  const now = new Date();
  const pastYear = new Date(now.setFullYear(now.getFullYear() - 2));
  const randomDate = new Date(
    pastYear.getTime() + Math.random() * (Date.now() - pastYear.getTime()),
  );
  return randomDate.toISOString();
}

function getRandomPrice() {
  return parseFloat((Math.random() * (5000 - 49) + 49).toFixed(2));
}

function generateMockData(numRows: number): TableData[] {
  const services = [
    {
      name: 'Managed Cloud Hosting',
      description:
        '24/7 managed cloud infrastructure with proactive monitoring.',
      category: 'Cloud',
    },
    {
      name: 'SOC Monitoring',
      description:
        'Security operations center monitoring and incident response.',
      category: 'Security',
    },
    {
      name: 'Endpoint Device Management',
      description: 'Centralized endpoint policies, patching, and compliance.',
      category: 'IT Operations',
    },
    {
      name: 'Identity & Access Management',
      description: 'User lifecycle, SSO, and least-privilege access controls.',
      category: 'Security',
    },
    {
      name: 'Backup & Disaster Recovery',
      description: 'Automated backups with tested recovery runbooks.',
      category: 'Continuity',
    },
    {
      name: 'Network Performance Monitoring',
      description: 'Continuous network telemetry and alerting for uptime.',
      category: 'Network',
    },
    {
      name: 'IT Helpdesk Support',
      description: 'Tiered helpdesk support with SLA-backed response times.',
      category: 'Support',
    },
    {
      name: 'Database Administration',
      description: 'Managed database maintenance, tuning, and backups.',
      category: 'Data',
    },
    {
      name: 'Application Maintenance',
      description:
        'Bug fixes, patching, and release support for critical apps.',
      category: 'Application Services',
    },
    {
      name: 'Compliance Reporting',
      description:
        'Audit-ready reporting for security and governance standards.',
      category: 'Governance',
    },
  ];

  const suppliers = [
    'Accenture Technology Services',
    'Deloitte Digital Operations',
    'Capgemini Managed Services',
    'Kyndryl Infrastructure Services',
    'NTT Data Solutions',
    'Atos Enterprise IT',
    'Cognizant Cloud Operations',
  ];

  const descriptionAddons = [
    'Includes monthly KPI and SLA review.',
    'Delivered with onboarding and transition plan.',
    'Configured for hybrid and remote teams.',
    'Includes escalation matrix and quarterly service review.',
    'Supports compliance and internal audit requirements.',
  ];

  return Array.from({ length: numRows }, (_, index) => {
    const service = services[Math.floor(Math.random() * services.length)] || {
      name: 'General IT Service',
      description: 'Standard IT support and maintenance service.',
      category: 'General IT',
    };
    const supplier =
      suppliers[Math.floor(Math.random() * suppliers.length)] ||
      'Global IT Services Ltd.';
    const addon =
      descriptionAddons[Math.floor(Math.random() * descriptionAddons.length)];

    return {
      id: `Row ${index + 1}`,
      date: generateISODate(),
      item: service.name,
      description: `${service.description} ${addon}`,
      qty: Math.floor(Math.random() * 250) + 1,
      price: { amount: getRandomPrice(), currency: 'EUR' },
      additionalData: {
        description: `${service.name} contract managed by ${supplier}.`,
        category: service.category,
        supplier,
        inStock: Math.random() > 0.2,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
      },
    };
  });
}

export const mockData = generateMockData(30);
