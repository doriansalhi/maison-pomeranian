import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { createServiceRoleSupabase } from '@/lib/supabase';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as string | undefined) ?? '';
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const updates: Record<string, unknown> = {};
  if (body.status) {
    updates.status = body.status;
    if (body.status === 'shipped') updates.shipped_at = new Date().toISOString();
    if (body.status === 'delivered') updates.delivered_at = new Date().toISOString();
  }
  if (body.tracking_carrier !== undefined) updates.tracking_carrier = body.tracking_carrier || null;
  if (body.tracking_number !== undefined) updates.tracking_number = body.tracking_number || null;
  if (body.tracking_url !== undefined) updates.tracking_url = body.tracking_url || null;
  if (body.admin_notes !== undefined) updates.admin_notes = body.admin_notes || null;

  const supabase = createServiceRoleSupabase();
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ order: data });
}
