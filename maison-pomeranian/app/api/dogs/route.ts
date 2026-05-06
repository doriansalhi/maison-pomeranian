import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServiceRoleSupabase } from '@/lib/supabase';
import type { CreateDogProfileInput } from '@/types';

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const supabase = createServiceRoleSupabase();
  const { data, error } = await supabase
    .from('dog_profiles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🔴 GET /api/dogs error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ profiles: data });
}

export async function POST(req: NextRequest) {
  console.log('🟢 POST /api/dogs — début');

  try {
    const { userId } = await auth();
    console.log('🟢 userId:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = (await req.json()) as CreateDogProfileInput;
    console.log('🟢 body reçu:', body);

    if (!body.name?.trim() || !body.birthDate || !body.weight) {
      return NextResponse.json(
        { error: 'Nom, anniversaire et poids sont requis.' },
        { status: 400 }
      );
    }
    if (body.weight < 100 || body.weight > 50000) {
      return NextResponse.json({ error: 'Poids invalide.' }, { status: 400 });
    }

    console.log('🟢 Création client Supabase...');
    const supabase = createServiceRoleSupabase();

    console.log('🟢 Insertion dans dog_profiles...');
    const { data, error } = await supabase
      .from('dog_profiles')
      .insert({
        user_id: userId,
        name: body.name.trim(),
        birth_date: body.birthDate,
        weight: body.weight,
        color: body.color?.trim() || null,
        notes: body.notes?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.error('🔴 Erreur Supabase insert:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('🟢 Profil créé avec succès:', data);
    return NextResponse.json({ profile: data });
  } catch (err) {
    console.error('🔴 Erreur catch globale:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}