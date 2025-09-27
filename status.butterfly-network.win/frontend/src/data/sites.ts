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
  'status.butterfly-network.win': 'Status Website',
  'www.alextlm.co.uk': 'Clove Nytrix',
  'www.butterfly-network.win': 'Butterfly Network',
  'www.clove-portfolio.win': 'Portfolio',
  'www.clovetwilight3.co.uk': 'Clove Twilight',
  'www.discord-fortnite.win': 'Discord Fortnite Site',
  'www.doughmination.win': 'Doughmination System™',
  'www.head-and-69.win': 'Head and 69',
  'www.hunt-rix.rocks': 'Huntr/x',
  'www.incest-porn.win': 'Horny Social Media',
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