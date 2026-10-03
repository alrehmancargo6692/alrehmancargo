-- Run once in Supabase SQL Editor. Use the project Auth panel to create an admin user.
create extension if not exists pgcrypto;
create sequence if not exists public.cargo_booking_seq;
create table if not exists public.cargo_admins (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
create table if not exists public.cargo_settings (
 id integer primary key default 1 check (id=1),
 phone text not null default '', phone2 text not null default '', phone3 text not null default '', email text not null default '', whatsapp text not null default '',
 address text not null default '', description text not null default '',
 updated_at timestamptz not null default now()
);
insert into public.cargo_settings(id) values(1) on conflict(id) do nothing;
create table if not exists public.cargo_bookings (
 id uuid primary key default gen_random_uuid(),
 booking_no text unique not null default ('ARC-' || to_char(now(),'YYMM') || '-' || lpad(nextval('public.cargo_booking_seq')::text,5,'0')),
 created_at timestamptz not null default now(), booking_date date not null default current_date,
 customer_name text not null, customer_phone text not null,
 sender_name text, receiver_name text, receiver_phone text,
 pickup text not null, destination text not null,
 vehicle_type text not null, vehicle_count integer not null default 1 check(vehicle_count > 0),
 goods_description text, weight text, vehicle_number text, driver_name text, driver_phone text,
 freight numeric(14,2) not null default 0 check(freight>=0),
 owner_payment numeric(14,2) not null default 0 check(owner_payment>=0),
 other_expense numeric(14,2) not null default 0 check(other_expense>=0),
 received numeric(14,2) not null default 0 check(received>=0),
 status text not null default 'درخواست موصول', notes text
);
create index if not exists cargo_bookings_created_idx on public.cargo_bookings(created_at desc);
create index if not exists cargo_bookings_status_idx on public.cargo_bookings(status);
alter table public.cargo_admins enable row level security;
alter table public.cargo_settings enable row level security;
alter table public.cargo_bookings enable row level security;
-- No direct browser access to business tables; all access goes through verified server API.
revoke all on public.cargo_admins from anon, authenticated;
revoke all on public.cargo_bookings from anon, authenticated;
revoke all on public.cargo_settings from anon, authenticated;
revoke all on sequence public.cargo_booking_seq from anon, authenticated;
-- After creating a user in Auth, grant admin access with:
-- insert into public.cargo_admins(user_id) select id from auth.users where email='YOUR_ADMIN_EMAIL';
