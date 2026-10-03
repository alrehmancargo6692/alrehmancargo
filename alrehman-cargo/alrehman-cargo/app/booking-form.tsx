'use client';
import {useState} from 'react';
import {vehicles} from '@/lib/types';
export default function BookingForm(){
 const [form,setForm]=useState({customer_name:'',customer_phone:'',pickup:'',destination:'',vehicle_type:'ٹرک',vehicle_count:1,goods_description:'',website:''});
 const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const set=(key:string,value:string|number)=>setForm(current=>({...current,[key]:value}));
 async function submit(event:React.FormEvent){event.preventDefault();setBusy(true);setMessage('');try{const response=await fetch('/api/booking',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)});const data=await response.json();if(!response.ok)throw Error(data.error||'درخواست محفوظ نہیں ہوئی');setMessage(`درخواست محفوظ ہوگئی۔ آپ کا بکنگ نمبر ${data.booking_no} ہے۔`);setForm({customer_name:'',customer_phone:'',pickup:'',destination:'',vehicle_type:'ٹرک',vehicle_count:1,goods_description:'',website:''})}catch(error){setMessage(error instanceof Error?error.message:'خرابی پیش آگئی')}finally{setBusy(false)}}
 return <form className="booking-form" onSubmit={submit}><h3>بکنگ کی تفصیل</h3><div className="form-grid">
 <label>آپ کا نام *<input required maxLength={120} value={form.customer_name} onChange={e=>set('customer_name',e.target.value)} placeholder="پورا نام"/></label>
 <label>موبائل نمبر *<input required type="tel" value={form.customer_phone} onChange={e=>set('customer_phone',e.target.value)} placeholder="03XXXXXXXXX"/></label>
 <label>لوڈنگ کہاں سے؟ *<input required value={form.pickup} onChange={e=>set('pickup',e.target.value)} placeholder="شہر / علاقہ"/></label>
 <label>سامان کہاں پہنچانا ہے؟ *<input required value={form.destination} onChange={e=>set('destination',e.target.value)} placeholder="شہر / علاقہ"/></label>
 <label>گاڑی کی قسم *<select value={form.vehicle_type} onChange={e=>set('vehicle_type',e.target.value)}>{vehicles.map(v=><option key={v}>{v}</option>)}</select></label>
 <label>گاڑیوں کی تعداد *<input required type="number" min="1" max="100" value={form.vehicle_count} onChange={e=>set('vehicle_count',Number(e.target.value))}/></label>
 <label className="full">سامان کی تفصیل<textarea rows={3} maxLength={300} value={form.goods_description} onChange={e=>set('goods_description',e.target.value)} placeholder="سامان کی نوعیت، وزن وغیرہ"/></label>
 <input className="honeypot" tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>set('website',e.target.value)}/></div>
 <button className="btn btn-gold submit" disabled={busy}>{busy?'درخواست بھیجی جا رہی ہے...':'بکنگ درخواست بھیجیں'}</button>{message&&<p role="status" className="form-message">{message}</p>}</form>
}
