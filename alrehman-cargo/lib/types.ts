export type Booking = {
 id:string; booking_no:string; created_at:string; booking_date:string; customer_name:string; customer_phone:string; sender_name:string|null; receiver_name:string|null; receiver_phone:string|null; pickup:string; destination:string; vehicle_type:string; vehicle_count:number; goods_description:string|null; weight:string|null; vehicle_number:string|null; driver_name:string|null; driver_phone:string|null; freight:number; owner_payment:number; other_expense:number; received:number; status:string; notes:string|null;
};
export const vehicles = ['ٹریلر','بیڈ فورڈ','ٹرک','مزدا'];
export const statuses = ['درخواست موصول','تصدیق شدہ','گاڑی روانہ','سامان پہنچ گیا','مکمل','منسوخ'];
export const money = (n:number | null | undefined) => new Intl.NumberFormat('en-PK').format(Number(n || 0));
export const dateText = (s:string) => new Date(s).toLocaleDateString('ur-PK');
