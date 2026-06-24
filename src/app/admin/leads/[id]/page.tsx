import { notFound } from 'next/navigation';
import { getLeadAssignees } from '@/config/lead-assignees';
import { getLeadAuditTrail, getLeadById } from '../actions';
import LeadDetailClient from '../LeadDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);

  return {
    title: lead ? `${lead.name} | Caso` : 'Caso no encontrado',
  };
}

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, auditEntries] = await Promise.all([getLeadById(id), getLeadAuditTrail(id)]);

  if (!lead) {
    notFound();
  }

  return (
    <LeadDetailClient
      lead={lead}
      assignees={getLeadAssignees()}
      auditEntries={auditEntries}
    />
  );
}
