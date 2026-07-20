create sequence if not exists public.youth_number_sequence start 101;

create table if not exists public.youth_members (
  id uuid primary key default gen_random_uuid(),
  youth_number text not null unique default ('SGY-' || lpad(nextval('public.youth_number_sequence')::text, 5, '0')),
  full_name text not null,
  date_of_birth date not null,
  gender text check (gender is null or gender in ('Male','Female')),
  phone text,
  email text,
  branch text not null default 'Okahandja HQ',
  school_or_work text,
  ministry_interest text,
  skills_and_talents text,
  leadership_role text not null default 'Member',
  parent_guardian_name text,
  parent_guardian_phone text,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  joined_date date not null default current_date,
  status text not null default 'Active' check (status in ('Active','Inactive','Graduated')),
  notes text,
  created_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.youth_attendance (
  id uuid primary key default gen_random_uuid(),
  youth_id uuid not null references public.youth_members(id) on delete cascade,
  attendance_date date not null default current_date,
  activity_name text not null default 'Youth Service',
  attended boolean not null default true,
  notes text,
  recorded_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  unique(youth_id, attendance_date, activity_name)
);

alter table public.youth_members enable row level security;
alter table public.youth_attendance enable row level security;

drop policy if exists "Admins can manage youth members" on public.youth_members;
create policy "Admins can manage youth members" on public.youth_members
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

drop policy if exists "Admins can manage youth attendance" on public.youth_attendance;
create policy "Admins can manage youth attendance" on public.youth_attendance
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

create index if not exists youth_members_status_idx on public.youth_members(status);
create index if not exists youth_members_branch_idx on public.youth_members(branch);
create index if not exists youth_attendance_date_idx on public.youth_attendance(attendance_date desc);
create index if not exists youth_attendance_member_idx on public.youth_attendance(youth_id);

create or replace function public.set_youth_member_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists youth_member_set_updated_at on public.youth_members;
create trigger youth_member_set_updated_at
before update on public.youth_members
for each row execute function public.set_youth_member_updated_at();