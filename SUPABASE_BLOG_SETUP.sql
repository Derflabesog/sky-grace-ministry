create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  slug text not null unique,
  summary text not null check (char_length(summary) <= 320),
  content text not null,
  category text not null default 'New Revelation',
  author_name text not null default 'Sky Grace Ministry',
  cover_image_url text,
  status text not null default 'Draft'
    check (status in ('Draft', 'Published')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts for select
to anon, authenticated
using (
  status = 'Published'
  or exists (
    select 1 from public.admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can create blog posts" on public.blog_posts;
create policy "Admins can create blog posts"
on public.blog_posts for insert
to authenticated
with check (
  exists (
    select 1 from public.admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can update blog posts" on public.blog_posts;
create policy "Admins can update blog posts"
on public.blog_posts for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Admins can delete blog posts" on public.blog_posts;
create policy "Admins can delete blog posts"
on public.blog_posts for delete
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where lower(admin_users.email) = lower(auth.jwt() ->> 'email')
  )
);

create index if not exists blog_posts_status_published_idx
  on public.blog_posts (status, published_at desc);

create or replace function public.set_blog_post_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  if new.status = 'Published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before insert or update on public.blog_posts
for each row execute function public.set_blog_post_updated_at();