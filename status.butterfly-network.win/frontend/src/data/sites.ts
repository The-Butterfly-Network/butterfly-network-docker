import { StatusType } from "@/components/StatusBadge";

export type { StatusType };

export interface Site {
  domain: string;
  displayName: string;
  status: StatusType;
  responseTime?: number;
  uptime?: number;
  lastChecked: string;
}

// Domain to display name mapping
export const domainDisplayNames: Record<string, string> = {
  'discord.butterfly-network.win': 'Discord Markdown',
  'www.alextlm.co.uk': 'Clove Nytrix',
  'www.butterfly-network.win': 'Butterfly Network',
  'www.clove-portfolio.win': 'Portfolio',
  'www.clovetwilight3.co.uk': 'Clove Twilight',
  'www.doughmination.win': 'Doughmination System™',
  'www.hunt-rix.rocks': 'Huntr/x',
  'www.iwantedthislongdomainnamesoibroughtit.win': 'Calendar',
  'www.lgbwitht.win': 'Social Media',
  'www.mazeymoos.com': 'Gaming Site',
  'www.mc-svg.win': 'SVG Minecraft',
  'www.myluminarasystem.pro': 'Luminara Systems',
  'www.themidnightcyan.win': 'Athena McKillian',
  'www.themotorbikeone.win': 'Jessa Twilight',
  'www.trans4trans.win': 'Trans4Trans Letters',
  'www.transgamers.org': 'TransGamers',
  'www.unifiedgaming-systems.co.uk': 'Unified Gaming Systems Ltd',
  'www.yaoi-lover.win': 'Yaoi Cheat Sheets',
  'www.yuri-lover.win': 'Yuri CDN File',
};

// Mock data - in a real implementation, this would come from an API
export const generateMockStatus = (): Site[] => {
  const domains = [
    'discord.butterfly-network.win',
    'www.alextlm.co.uk',
    'www.butterfly-network.win',
    'www.clove-portfolio.win',
    'www.clovetwilight3.co.uk',
    'www.doughmination.win',
    'www.hunt-rix.rocks',
    'www.iwantedthislongdomainnamesoibroughtit.win',
    'www.lgbwitht.win',
    'www.mazeymoos.com',
    'www.mc-svg.win',
    'www.myluminarasystem.pro',
    'www.themidnightcyan.win',
    'www.themotorbikeone.win',
    'www.trans4trans.win',
    'www.transgamers.org',
    'www.unifiedgaming-systems.co.uk',
    'www.yaoi-lover.win',
    'www.yuri-lover.win',
  ];

  const statuses: StatusType[] = ['online', 'online', 'online', 'warning', 'offline', 'unknown'];
  const now = new Date();

  return domains.map((domain, index) => {
    // Most sites should be online for a good status page
    const statusIndex = index < 15 ? 0 : Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];
    
    return {
      domain,
      displayName: domainDisplayNames[domain] || domain,
      status,
      responseTime: status === 'online' ? Math.floor(Math.random() * 300) + 50 : 
                   status === 'warning' ? Math.floor(Math.random() * 1000) + 500 : 
                   status === 'offline' ? undefined : Math.floor(Math.random() * 200) + 100,
      uptime: status === 'online' ? Math.floor(Math.random() * 5) + 95 :
              status === 'warning' ? Math.floor(Math.random() * 15) + 80 :
              status === 'offline' ? Math.floor(Math.random() * 30) + 60 : 
              Math.floor(Math.random() * 20) + 75,
      lastChecked: new Date(now.getTime() - Math.floor(Math.random() * 300000)).toLocaleTimeString()
    };
  });
};

export const getOverallStatus = (sites: Site[]): StatusType => {
  const offlineSites = sites.filter(site => site.status === 'offline');
  const warningSites = sites.filter(site => site.status === 'warning');
  
  if (offlineSites.length > sites.length * 0.2) return 'offline';
  if (offlineSites.length > 0 || warningSites.length > 0) return 'warning';
  return 'online';
};