import { db } from '@/lib/db';
export async function GET(){try{const {data,error}=await db().from('cargo_settings').select('*').eq('id',1).single();if(error)throw error;return Response.json(data)}catch{return Response.json({error:'سیٹنگز دستیاب نہیں'}, {status:500})}}
export async function POST(request:Request){try{
 const b=await request.json();
 if(b.website) return Response.json({ok:true});
 const required=['customer_name','customer_phone','pickup','destination','vehicle_type'];
 if(required.some(k=>!String(b[k]||'').trim()))return Response.json({error:'تمام ضروری خانے پُر کریں'}, {status:400});
 if(!/^\+?[0-9\s-]{10,16}$/.test(b.customer_phone))return Response.json({error:'درست موبائل نمبر درج کریں'}, {status:400});
 const count=Number(b.vehicle_count);
 if(!Number.isInteger(count)||count<1||count>100)return Response.json({error:'گاڑیوں کی تعداد 1 تا 100 رکھیں'}, {status:400});
 const payload={customer_name:String(b.customer_name).slice(0,120),customer_phone:String(b.customer_phone).slice(0,25),pickup:String(b.pickup).slice(0,160),destination:String(b.destination).slice(0,160),vehicle_type:String(b.vehicle_type).slice(0,40),vehicle_count:count,goods_description:String(b.goods_description||'').slice(0,300),status:'درخواست موصول'};
 const {data,error}=await db().from('cargo_bookings').insert(payload).select('booking_no').single();if(error)throw error;return Response.json(data,{status:201});
 }catch{return Response.json({error:'درخواست محفوظ نہیں ہوئی، دوبارہ کوشش کریں'}, {status:500})}}
