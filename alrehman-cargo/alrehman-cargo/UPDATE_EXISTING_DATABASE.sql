-- Run in Supabase SQL Editor for an existing installation.
alter table public.cargo_settings add column if not exists phone2 text not null default '';
alter table public.cargo_settings add column if not exists phone3 text not null default '';
alter table public.cargo_settings add column if not exists email text not null default '';

insert into public.cargo_settings (id,phone,phone2,phone3,email,whatsapp,address,description,updated_at)
values (1,'+92 300 4842477','+92 346 4842477','+92 333 4842477',
 'alrehmancargo6692@gmail.com','923004842477',
 'پلاٹ نمبر 31، نیو ٹرک اسٹینڈ، سبزہ زار، لاہور',
 'ٹریلر، بیڈ فورڈ، ٹرک اور مزدا کی بکنگ کے لیے رابطہ کریں۔',now())
on conflict (id) do update set phone=excluded.phone,phone2=excluded.phone2,
 phone3=excluded.phone3,email=excluded.email,whatsapp=excluded.whatsapp,
 address=excluded.address,description=excluded.description,updated_at=now();

-- First create this user in Authentication > Users using an email and password.
insert into public.cargo_admins(user_id)
select id from auth.users where lower(email)=lower('alrehmancargo6692@gmail.com')
on conflict(user_id) do nothing;

-- Confirm that admin access was assigned. No row means the Auth user does not exist.
select u.email, a.user_id from public.cargo_admins a
join auth.users u on u.id=a.user_id
where lower(u.email)=lower('alrehmancargo6692@gmail.com');
