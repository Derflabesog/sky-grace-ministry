create sequence if not exists public.bible_course_number_sequence start 101;

create table if not exists public.bible_school_courses (
  id uuid primary key default gen_random_uuid(),
  course_number text not null unique default ('SGB-' || lpad(nextval('public.bible_course_number_sequence')::text, 4, '0')),
  course_name text not null,
  course_level text not null default 'Foundation',
  instructor_name text not null,
  start_date date not null,
  end_date date,
  schedule_day text,
  schedule_time time,
  location text not null default 'Okahandja HQ',
  maximum_students integer check (maximum_students is null or maximum_students > 0),
  tuition_amount numeric(12,2) not null default 0 check (tuition_amount >= 0),
  description text,
  status text not null default 'Open' check (status in ('Draft','Open','In Progress','Completed','Cancelled')),
  notes text,
  created_by text not null default coalesce(auth.jwt()->>'email','System'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bible_school_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.bible_school_courses(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  enrollment_date date not null default current_date,
  payment_status text not null default 'Not Required' check (payment_status in ('Not Required','Pending','Part Paid','Paid')),
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  final_grade text,
  enrollment_status text not null default 'Enrolled' check (enrollment_status in ('Enrolled','In Progress','Completed','Withdrawn')),
  certificate_issued boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_id, member_id)
);

alter table public.bible_school_courses enable row level security;
alter table public.bible_school_enrollments enable row level security;

drop policy if exists "Admins can manage Bible School courses" on public.bible_school_courses;
create policy "Admins can manage Bible School courses" on public.bible_school_courses
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

drop policy if exists "Admins can manage Bible School enrollments" on public.bible_school_enrollments;
create policy "Admins can manage Bible School enrollments" on public.bible_school_enrollments
for all to authenticated
using (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')))
with check (exists(select 1 from public.admin_users where lower(admin_users.email)=lower(auth.jwt()->>'email')));

create index if not exists bible_courses_status_idx on public.bible_school_courses(status);
create index if not exists bible_enrollments_course_idx on public.bible_school_enrollments(course_id);
create index if not exists bible_enrollments_member_idx on public.bible_school_enrollments(member_id);

create or replace function public.set_bible_school_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bible_course_set_updated_at on public.bible_school_courses;
create trigger bible_course_set_updated_at before update on public.bible_school_courses
for each row execute function public.set_bible_school_updated_at();

drop trigger if exists bible_enrollment_set_updated_at on public.bible_school_enrollments;
create trigger bible_enrollment_set_updated_at before update on public.bible_school_enrollments
for each row execute function public.set_bible_school_updated_at();
