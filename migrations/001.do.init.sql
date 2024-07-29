BEGIN TRANSACTION;

CREATE TABLE public.links (
    id serial primary key,
    short varchar(10) not null,
    long varchar(512) not null,
    is_active boolean not null
);

CREATE UNIQUE INDEX unq_idx_short_active_link ON public.links(short)
WHERE links.is_active = true;

COMMIT;