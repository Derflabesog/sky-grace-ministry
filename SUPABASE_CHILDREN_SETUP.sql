create sequence if not exists public.child_number_sequence start 101;

create table if not exists public.church_children (
  id uuid primary key default gen_random_uuid(),
  child_number text not null unique default ('SGC-' || lpad(nextval('public.child_number_sequence')::text, 5, '0')),
  full_name text not null,
  date_of_birth date not null,
  gender text check (gender is null or gender in ('Male','Female')),
  class_name text not null default 'To Be Assigned',
  branch text not null default 'Okahandja HQ',
  guardian_name text not null,
  guardian_relationship text,
  guardian_phone text not null,
  alternate_phone text,
  guardian_email text,
  address text,
  allergies text,
  medical_notes text,
  special_needs text,
  authorised_pickup text,
  photo_consent boolean not null default false,
  status text not null default 'Active' check (status in ('Active','Inactive','Graduated')),
  notes text,
  created_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.children_attendance (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.church_children(id) on delete cascade,
  attendance_date date not null default current_date,
  check_in_time timestamptz not null default now(),
  check_out_time timestamptz,
  checked_in_by text,
  released_to text,
  class_name text,
  notes text,
  created_at timestamptz not null default now(),
  unique(child_id, attendance_date)
);

alter table public.church_children enable row level security;
alter table public.children_attendance enable row level security;

drop policy if exists "Admins can manage church children" on public.church_children;
create policy "Admins can manage church children" on public.church_children
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

drop policy if exists "Admins can manage children attendance" on public.children_attendance;
create policy "Admins can manage children attendance" on public.children_attendance
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

create index if not exists church_children_status_idx on public.church_children(status);
create index if not exists church_children_class_idx on public.church_children(class_name);
create index if not exists children_attendance_date_idx on public.children_attendance(attendance_date desc);
create index if not exists children_attendance_child_idx on public.children_attendance(child_id);

create or replace function public.set_church_child_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists church_child_set_updated_at on public.church_children;
create trigger church_child_set_updated_at
before update on public.church_children
for each row execute function public.set_church_child_updated_at();