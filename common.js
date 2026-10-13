// সব পেজের জন্য একই কনফিগ (Project Settings → API)
const SUPABASE_URL = 'https://qsbvvkamhggxlabqhqxa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HjixmLfLD2DjSuz3UjX2dQ_16PaGVPE';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const ST = {draft:'ড্রাফট', review:'রিভিউতে', published:'প্রকাশিত', rejected:'ফেরত'};

function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(t._h);t._h=setTimeout(()=>t.hidden=true,2200)}
function fail(e){console.error(e);alert('ত্রুটি: '+(e.message||e))}

async function getProfile(){
  const {data:{user}}=await sb.auth.getUser();
  if(!user)return null;
  const {data}=await sb.from('profiles').select('*').eq('id',user.id).single();
  return data;
}
