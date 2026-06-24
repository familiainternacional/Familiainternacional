import { getPrismaClient } from '@/lib/db/prisma';
import { ACTIVE_LEADS_WHERE } from '@/lib/leads/query';
import { isLeadSlaBreached } from '@/lib/leads/sla';
import { getLeadSourceLabel } from '@/lib/leads/source';
import { getPracticeAreaLabel } from '@/lib/leads/practice-area';

export type LeadAnalyticsSnapshot = {
  totals: {
    active: number;
    nuevo: number;
    contactado: number;
    consultaAgendada: number;
    cliente: number;
    slaBreaches: number;
    last30Days: number;
  };
  byStatus: Array<{ status: string; count: number }>;
  bySource: Array<{ source: string; label: string; count: number }>;
  byPracticeArea: Array<{ area: string; label: string; count: number }>;
  byCampaign: Array<{ campaign: string; count: number }>;
};

export async function getLeadAnalyticsSnapshot(): Promise<LeadAnalyticsSnapshot> {
  const prisma = getPrismaClient();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const leads = await prisma.lead.findMany({
    where: ACTIVE_LEADS_WHERE,
    select: {
      status: true,
      leadSource: true,
      practiceArea: true,
      utmCampaign: true,
      createdAt: true,
      contactedAt: true,
      deletedAt: true,
    },
  });

  const recentLeads = leads.filter((lead) => new Date(lead.createdAt) >= since);

  const byStatusMap = new Map<string, number>();
  const bySourceMap = new Map<string, number>();
  const byAreaMap = new Map<string, number>();
  const byCampaignMap = new Map<string, number>();

  for (const lead of leads) {
    byStatusMap.set(lead.status, (byStatusMap.get(lead.status) ?? 0) + 1);
    bySourceMap.set(lead.leadSource, (bySourceMap.get(lead.leadSource) ?? 0) + 1);

    const areaKey = lead.practiceArea ?? 'sin_clasificar';
    byAreaMap.set(areaKey, (byAreaMap.get(areaKey) ?? 0) + 1);

    if (lead.utmCampaign) {
      byCampaignMap.set(lead.utmCampaign, (byCampaignMap.get(lead.utmCampaign) ?? 0) + 1);
    }
  }

  return {
    totals: {
      active: leads.length,
      nuevo: leads.filter((lead) => lead.status === 'nuevo' || lead.status === 'pendiente').length,
      contactado: leads.filter((lead) => lead.status === 'contactado').length,
      consultaAgendada: leads.filter((lead) => lead.status === 'consulta_agendada').length,
      cliente: leads.filter((lead) => lead.status === 'cliente').length,
      slaBreaches: leads.filter((lead) => isLeadSlaBreached(lead)).length,
      last30Days: recentLeads.length,
    },
    byStatus: Array.from(byStatusMap.entries())
      .map(([status, count]) => ({ status, count }))
      .sort((a, b) => b.count - a.count),
    bySource: Array.from(bySourceMap.entries())
      .map(([source, count]) => ({
        source,
        label: getLeadSourceLabel(source),
        count,
      }))
      .sort((a, b) => b.count - a.count),
    byPracticeArea: Array.from(byAreaMap.entries())
      .map(([area, count]) => ({
        area,
        label: getPracticeAreaLabel(area === 'sin_clasificar' ? null : area),
        count,
      }))
      .sort((a, b) => b.count - a.count),
    byCampaign: Array.from(byCampaignMap.entries())
      .map(([campaign, count]) => ({ campaign, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  };
}
