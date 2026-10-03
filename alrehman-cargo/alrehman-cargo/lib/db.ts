import { createClient } from '@supabase/supabase-js';
export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are missing');
  return createClient(url, key, { auth: { persistSession: false } });
}
export async function adminFromRequest(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return false;
  const client = db();
  const { data: { user }, error } = await client.auth.getUser(token);
  if (error || !user) return false;
  const { data } = await client.from('cargo_admins').select('user_id').eq('user_id', user.id).maybeSingle();
  return Boolean(data);
}
export const unauthorized = () => Response.json({ error: 'اجازت نہیں ہے' }, { status: 401 });
