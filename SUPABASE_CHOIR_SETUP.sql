create sequence if not exists public.choir_number_sequence start 101;

create table if not exists public.choir_members (
  id uuid primary key default gen_random_uuid(),
  choir_number text not null unique default ('SGQ-' || lpad(nextval('public.choir_number_sequence')::text, 5, '0')),
  full_name text not null,
  phone text not null,
  email text,
  voice_part text not null default 'Not Assigned'
    check (voice_part in ('Soprano','Alto','Tenor','Bass','Instrumentalist','Not Assigned')),
  choir_role text not null default 'Member',
  instrument text,
  branch text not null default 'Okahandja HQ',
  joined_date date not null default current_date,
  availability text,
  emergency_contact text,
  emergency_phone text,
  status text not null default 'Active' check (status in ('Active','Inactive','On Leave')),
  notes text,
  created_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.choir_attendance (
  id uuid primary key default gen_random_uuid(),
  choir_member_id uuid not null references public.choir_members(id) on delete cascade,
  attendance_date date not null default current_date,
  session_type text not null default 'Rehearsal',
  attendance_status text not null default 'Present'
    check (attendance_status in ('Present','Absent','Excused','Late')),
  notes text,
  recorded_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  unique(choir_member_id, attendance_date, session_type)
);

alter table public.choir_members enable row level security;
alter table public.choir_attendance enable row level security;

drop policy if exists "Admins can manage choir members" on public.choir_members;
create policy "Admins can manage choir members" on public.choir_members
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

drop policy if exists "Admins can manage choir attendance" on public.choir_attendance;
create policy "Admins can manage choir attendance" on public.choir_attendance
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

create index if not exists choir_members_status_idx on public.choir_members(status);
create index if not exists choir_members_voice_idx on public.choir_members(voice_part);
create index if not exists choir_attendance_date_idx on public.choir_attendance(attendance_date desc);
create index if not exists choir_attendance_member_idx on public.choir_attendance(choir_member_id);

create or replace function public.set_choir_member_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists choir_member_set_updated_at on public.choir_members;
create trigger choir_member_set_updated_at
before update on public.choir_members
for each row execute function public.set_choir_member_updated_at();