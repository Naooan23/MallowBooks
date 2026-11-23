--
-- PostgreSQL database dump
--

\restrict wEyzGebrx3jgr0VAi97JTLBO2UwZ4f4jFkwy8Z83Ve9uCDiWRMQPW5zJ8PSkXW3

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-16 09:52:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
--SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA IF NOT EXISTS public;


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 16705)
-- Name: carrito; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carrito (
    id_carrito integer NOT NULL,
    id_user integer NOT NULL,
    fecha_creacion date NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16704)
-- Name: carrito_id_carrito_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carrito_id_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 229
-- Name: carrito_id_carrito_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carrito_id_carrito_seq OWNED BY public.carrito.id_carrito;


--
-- TOC entry 222 (class 1259 OID 16548)
-- Name: categoria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nombre_categoria_en character varying(100) CONSTRAINT categoria_nombre_categoria_not_null NOT NULL,
    descripcion character varying(100),
    nombre_categoria_es character varying(100) NOT NULL,
    icono character varying(100)
);


--
-- TOC entry 221 (class 1259 OID 16547)
-- Name: categoria_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categoria_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 221
-- Name: categoria_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categoria_id_categoria_seq OWNED BY public.categoria.id_categoria;


--
-- TOC entry 232 (class 1259 OID 16720)
-- Name: detallecarrito; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detallecarrito (
    id_detalle integer NOT NULL,
    id_carrito integer NOT NULL,
    id_book integer NOT NULL,
    cantidad integer NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 16719)
-- Name: detallecarrito_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.detallecarrito_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 231
-- Name: detallecarrito_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.detallecarrito_id_detalle_seq OWNED BY public.detallecarrito.id_detalle;


--
-- TOC entry 228 (class 1259 OID 16655)
-- Name: detalleorden; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detalleorden (
    id_detalle integer NOT NULL,
    id_orden integer NOT NULL,
    id_book integer NOT NULL,
    cantidad integer NOT NULL,
    precio_libro numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 16654)
-- Name: detalleorden_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.detalleorden_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 227
-- Name: detalleorden_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.detalleorden_id_detalle_seq OWNED BY public.detalleorden.id_detalle;


--
-- TOC entry 224 (class 1259 OID 16622)
-- Name: libros; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.libros (
    id_book integer NOT NULL,
    id_categoria integer,
    titulo character varying(200) NOT NULL,
    autor character varying(100),
    sinopsis text,
    portada_url character varying(500),
    fecha_publicacion date,
    status character varying(100),
    precio numeric(10,2),
    stock integer
);


--
-- TOC entry 223 (class 1259 OID 16621)
-- Name: libros_id_book_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.libros_id_book_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 223
-- Name: libros_id_book_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.libros_id_book_seq OWNED BY public.libros.id_book;


--
-- TOC entry 226 (class 1259 OID 16638)
-- Name: orden; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orden (
    id_orden integer NOT NULL,
    id_user integer NOT NULL,
    fecha date NOT NULL,
    total numeric(10,2) NOT NULL,
    status character varying(100) NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 16637)
-- Name: orden_id_orden_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orden_id_orden_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 225
-- Name: orden_id_orden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orden_id_orden_seq OWNED BY public.orden.id_orden;


--
-- TOC entry 220 (class 1259 OID 16534)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id_user integer NOT NULL,
    nombre_user character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(200) NOT NULL,
    rol character varying(20) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16533)
-- Name: usuarios_id_user_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_user_seq OWNED BY public.usuarios.id_user;


--
-- TOC entry 4891 (class 2604 OID 16708)
-- Name: carrito id_carrito; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrito ALTER COLUMN id_carrito SET DEFAULT nextval('public.carrito_id_carrito_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16551)
-- Name: categoria id_categoria; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id_categoria SET DEFAULT nextval('public.categoria_id_categoria_seq'::regclass);


--
-- TOC entry 4892 (class 2604 OID 16723)
-- Name: detallecarrito id_detalle; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detallecarrito ALTER COLUMN id_detalle SET DEFAULT nextval('public.detallecarrito_id_detalle_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16658)
-- Name: detalleorden id_detalle; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalleorden ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalleorden_id_detalle_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 16625)
-- Name: libros id_book; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.libros ALTER COLUMN id_book SET DEFAULT nextval('public.libros_id_book_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 16641)
-- Name: orden id_orden; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden ALTER COLUMN id_orden SET DEFAULT nextval('public.orden_id_orden_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 16537)
-- Name: usuarios id_user; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_user SET DEFAULT nextval('public.usuarios_id_user_seq'::regclass);


--
-- TOC entry 5073 (class 0 OID 16705)
-- Dependencies: 230
-- Data for Name: carrito; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.carrito VALUES (1, 1, '2026-09-26');
INSERT INTO public.carrito VALUES (2, 2, '2026-09-29');
INSERT INTO public.carrito VALUES (3, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (4, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (5, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (6, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (7, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (8, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (9, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (10, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (11, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (12, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (13, 1, '2026-10-14');
INSERT INTO public.carrito VALUES (14, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (15, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (16, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (17, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (18, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (19, 5, '2026-10-14');
INSERT INTO public.carrito VALUES (20, 3, '2026-11-07');


--
-- TOC entry 5065 (class 0 OID 16548)
-- Dependencies: 222
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categoria VALUES (1, 'Fantasy', 'Libros de fantasía', 'Fantasía', 'bi bi-moon-stars');
INSERT INTO public.categoria VALUES (2, 'Science Fiction', 'Libros de ciencia ficción', 'Ciencia Ficción', 'bi bi-rocket-takeoff');
INSERT INTO public.categoria VALUES (3, 'Mystery', 'Libros de misterio', 'Misterio', 'bi bi-fingerprint');
INSERT INTO public.categoria VALUES (4, 'Romance', 'Libros románticos', 'Romance', 'bi bi-arrow-through-heart');
INSERT INTO public.categoria VALUES (5, 'History', 'Libros de historia', 'Historia', 'bi bi-hourglass-split');
INSERT INTO public.categoria VALUES (6, 'Technology', 'Libros sobre tecnología', 'Tecnología', 'bi bi-cpu');
INSERT INTO public.categoria VALUES (7, 'Education', 'Libros educativos', 'Educación', 'bi bi-mortarboard');
INSERT INTO public.categoria VALUES (8, 'Horror', 'Libros de terror', 'Horror', 'bi bi-cloud-moon');
INSERT INTO public.categoria VALUES (9, 'Children', 'Libros infantiles', 'Infantil', 'bi bi-puzzle');
INSERT INTO public.categoria VALUES (10, 'Fiction', 'Obras de ficción', 'Ficción', 'bi bi-stars');


--
-- TOC entry 5075 (class 0 OID 16720)
-- Dependencies: 232
-- Data for Name: detallecarrito; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.detallecarrito VALUES (10, 3, 9, 3);
INSERT INTO public.detallecarrito VALUES (13, 3, 23, 1);


--
-- TOC entry 5071 (class 0 OID 16655)
-- Dependencies: 228
-- Data for Name: detalleorden; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.detalleorden VALUES (1, 1, 4, 4, 457.06, 1828.24);
INSERT INTO public.detalleorden VALUES (2, 1, 71, 1, 413.37, 413.37);
INSERT INTO public.detalleorden VALUES (3, 1, 10, 2, 805.77, 1611.54);
INSERT INTO public.detalleorden VALUES (4, 2, 19, 1, 365.09, 365.09);
INSERT INTO public.detalleorden VALUES (5, 3, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (6, 4, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (7, 5, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (8, 6, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (9, 7, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (10, 8, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (11, 9, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (12, 10, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (13, 11, 2, 1, 430.54, 430.54);
INSERT INTO public.detalleorden VALUES (14, 12, 11, 1, 599.74, 599.74);
INSERT INTO public.detalleorden VALUES (15, 13, 8, 1, 854.18, 854.18);
INSERT INTO public.detalleorden VALUES (16, 14, 24, 1, 658.25, 658.25);
INSERT INTO public.detalleorden VALUES (17, 15, 12, 1, 701.93, 701.93);
INSERT INTO public.detalleorden VALUES (18, 16, 33, 1, 369.28, 369.28);
INSERT INTO public.detalleorden VALUES (19, 17, 18, 1, 451.01, 451.01);
INSERT INTO public.detalleorden VALUES (20, 17, 16, 1, 654.72, 654.72);
INSERT INTO public.detalleorden VALUES (21, 18, 17, 1, 584.95, 584.95);
INSERT INTO public.detalleorden VALUES (22, 18, 28, 1, 303.13, 303.13);
INSERT INTO public.detalleorden VALUES (23, 19, 43, 1, 386.44, 386.44);
INSERT INTO public.detalleorden VALUES (24, 20, 86, 1, 234.66, 234.66);
INSERT INTO public.detalleorden VALUES (25, 21, 28, 1, 303.13, 303.13);
INSERT INTO public.detalleorden VALUES (26, 22, 99, 3, 597.29, 1791.87);
INSERT INTO public.detalleorden VALUES (27, 22, 39, 5, 498.87, 2494.35);
INSERT INTO public.detalleorden VALUES (28, 23, 59, 2, 469.32, 938.64);
INSERT INTO public.detalleorden VALUES (29, 23, 71, 1, 413.37, 413.37);
INSERT INTO public.detalleorden VALUES (30, 23, 82, 2, 691.70, 1383.40);
INSERT INTO public.detalleorden VALUES (31, 24, 89, 5, 556.28, 2781.40);
INSERT INTO public.detalleorden VALUES (32, 24, 93, 1, 848.75, 848.75);
INSERT INTO public.detalleorden VALUES (33, 24, 86, 4, 234.66, 938.64);
INSERT INTO public.detalleorden VALUES (34, 25, 56, 3, 508.81, 1526.43);
INSERT INTO public.detalleorden VALUES (35, 25, 57, 3, 643.04, 1929.12);
INSERT INTO public.detalleorden VALUES (36, 25, 58, 2, 556.28, 1112.56);


--
-- TOC entry 5067 (class 0 OID 16622)
-- Dependencies: 224
-- Data for Name: libros; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.libros VALUES (3, 1, 'The Lies of Locke Lamora', 'Scott Lynch', 'Best book ever', 'https://covers.openlibrary.org/b/id/6307636-L.jpg', '2001-01-01', 'Agotado', 853.86, 0);
INSERT INTO public.libros VALUES (6, 1, 'Krew elfów', 'Andrzej Sapkowski', 'Andrzej Sapkowski, arcymistrz światowej fantasy, zaprasza do swojego Neverlandu i przedstawia uwielbianą przez czytelników i wychwalaną przez krytykę wiedźmińską sagę!

„Tako rzecze Ithlinne, elfia wieszczka i uzdrowicielka: Drżyjcie, albowiem nadchodzi Niszczyciel Narodów. Stratują waszą ziemię i sznurem ją podzielą. Miasta wasze zostaną zburzone i pozbawione mieszkańców. Nietoperz i kruk w domach waszych zamieszkają, drzewo straci liść, zgnije owoc i zgorzknieje ziarno. Zaprawdę powiadam wam, oto nadchodzi czas miecza i topora, wiek wilczej zamieci. Miasto płonie, wąskie uliczki zieją ogniem i żarem. Narasta wrzask, odgłosy zajadłej walki, murem wstrząsają głuche uderzenia taranu. Krzyk, strach. Obezwładniający, paraliżujący, duszący strach”.', 'https://covers.openlibrary.org/b/id/8457619-L.jpg', '1994-01-01', 'Agotado', 234.84, 0);
INSERT INTO public.libros VALUES (7, 1, 'The Poppy War', 'R. F. Kuang', 'A brilliantly imaginative talent makes her exciting debut with this epic historical military fantasy, inspired by the bloody history of China’s twentieth century and filled with treachery and magic, in the tradition of Ken Liu’s Grace of Kings and N.K. Jemisin’s Inheritance Trilogy.

When Rin aced the Keju—the Empire-wide test to find the most talented youth to learn at the Academies—it was a shock to everyone: to the test officials, who couldn’t believe a war orphan from Rooster Province could pass without cheating; to Rin’s guardians, who believed they’d finally be able to marry her off and further their criminal enterprise; and to Rin herself, who realized she was finally free of the servitude and despair that had made up her daily existence. That she got into Sinegard—the most elite military school in Nikan—was even more surprising.

But surprises aren’t always good.

Because being a dark-skinned peasant girl from the south is not an easy thing at Sinegard. Targeted from the outset by rival classmates for her color, poverty, and gender, Rin discovers she possesses a lethal, unearthly power—an aptitude for the nearly-mythical art of shamanism. Exploring the depths of her gift with the help of a seemingly insane teacher and psychoactive substances, Rin learns that gods long thought dead are very much alive—and that mastering control over those powers could mean more than just surviving school.

For while the Nikara Empire is at peace, the Federation of Mugen still lurks across a narrow sea. The militarily advanced Federation occupied Nikan for decades after the First Poppy War, and only barely lost the continent in the Second. And while most of the people are complacent to go about their lives, a few are aware that a Third Poppy War is just a spark away . . .

Rin’s shamanic powers may be the only way to save her people. But as she finds out more about the god that has chosen her, the vengeful Phoenix, she fears that winning the war may cost her humanity . . . and that it may already be too late.', 'https://covers.openlibrary.org/b/id/8463552-L.jpg', '2018-01-01', 'Disponible', 227.78, 45);
INSERT INTO public.libros VALUES (5, 1, 'Wizard''s First Rule', 'Terry Goodkind', 'Richard Cypher''s father was brutally murdered a month ago, in his home with his guts ripped out of his stomach.  While coping with this sudden loss, Richard saves Kahlan Amnell from four mercenaries, and with the help of Richard''s grandfather the three flee to the midlands to stop Darken Rahl''s ever expanding empire.  Secrets will be revealed, many will perish, and the legends begins.', 'https://covers.openlibrary.org/b/id/1005963-L.jpg', '1994-01-01', 'Disponible', 180.29, 87);
INSERT INTO public.libros VALUES (4, 1, 'The Assassin’s Blade', 'Sarah J. Maas', 'Celaena Sardothien owes her reputation to Arobynn Hamel. He gave her a home at the Assassins'' Guild and taught her the skills she needed to survive.

Arobynn''s enemies stretch far and wide - from Adarlan''s rooftops and its filthy dens, to remote islands and hostile deserts. Celaena is duty-bound to hunt them down. But behind her assignments lies a dark truth that will seal her fate - and cut her heart in two forever...

Explore the dark underworld of this kick-ass heroine and find out how the legend begins in the five page-turning prequel novellas to the Throne of Glass series.', 'https://covers.openlibrary.org/b/id/7794980-L.jpg', '2014-01-01', 'Disponible', 457.06, 55);
INSERT INTO public.libros VALUES (9, 1, 'The Princess Bride', 'William Goldman', '*The Princess Bride is a timeless tale that pits country against country, good against evil, love against hate. This incredible journey and artfully rendered love story is peppered with strange beasties monstrous and gentle, memorable surprises both terrible and sublime, and such unforgettable characters as...*

**Westley**, the handsome farm boy who risks death (and much worse) for the woman he loves; **Inigo**, the Spanish swordsman who lives only to avenge his father''s death; **Fezzik**, the gentlest giant ever to have uprooted a tree with his bear hands; **Vizzini**, the evil Sicilian, with a mind so keen he''s foiled by his own perfect logic; **Prince Humperdinck**, the eviler ruler of Guilder, who has an equally insatiable thirst for war and beauteous Buttercup; **Count Rugen**, the evilest man of all, who thrives on the excruciating pain of others; **Miracle Max**, the King''s ex-Miracle Man, who can raise the dead (kind of); and, of course, **Buttercup**... the princess bride, the most perfect, beautiful woman in the history of the world!', 'https://covers.openlibrary.org/b/id/9284881-L.jpg', '1973-01-01', 'Disponible', 851.03, 25);
INSERT INTO public.libros VALUES (8, 1, 'The Eye of the World', 'Robert Jordan', 'The Wheel of Time turns and Ages come and go, leaving memories that become legend. Legend fades to myth, and even myth is long forgotten when the Age that gave it birth returns again. In the Third Age, an Age of Prophecy, the World and Time themselves hang in the balance. What was, what will be, and what is, may yet fall under the Shadow.', 'https://covers.openlibrary.org/b/id/980232-L.jpg', '1990-01-01', 'Disponible', 854.18, 72);
INSERT INTO public.libros VALUES (24, 3, 'At Bertram''s Hotel', 'Agatha Christie', '**An old-fashioned London Hotel is not quite as reputable as it makes out… When Miss Marple comes up from the country for a holiday in London, she finds what she’s looking for at Bertram’s Hotel: traditional decor, impeccable service and an unmistakable atmosphere of danger behind the highly polished veneer. Yet, not even Miss Marple can foresee the violent chain of events set in motion when an eccentric guest makes his way to the airport on the wrong day…**', 'https://covers.openlibrary.org/b/id/6379981-L.jpg', '1965-01-01', 'Disponible', 658.25, 4);
INSERT INTO public.libros VALUES (13, 2, 'The Fall of Hyperion', 'Dan Simmons', 'On the world called Hyperion, beyond the law of the Hegemony of Man, there waits the creature called the Shrike.  There are those who worship it.  There are those who fear it.  And there are those who have vowed to destroy it.  In the Valley of the Time Tombs, where huge, brooding structures move backward through time, the Shrike waits for them all.  On the eve of Armageddon, with the entire galaxy at war, seven pilgrims set forth on a final voyage to Hyperion seeking the answers to the unsolved riddles of their lives.  Each carries a desperate hope--and a terrible secret.  And one may hold the fate of humanity in his hands.', 'https://covers.openlibrary.org/b/id/484900-L.jpg', '1990-01-01', 'Agotado', 757.57, 0);
INSERT INTO public.libros VALUES (14, 2, 'The Naked Sun', 'Isaac Asimov', 'On the remote planet Solaria the first murder for two hundred years has been committed. The Solarians are Spacers with a civilisation based on robots instead of slaves - and some pretty weird taboos and phobias.
Into this strange set-up comes Terran detective Elijah Baley, assigned to find the murderer and act as an investigator for his government. But as an Earthman, Baley finds aspects of life on Solaria difficult, even terrifying, to cope with. (Men on Earth live deep underground in their vast caves of steel and are terrified of anything outside.)
From the moment of his arrival on Solaria, Baley''s investigation becomes an ordeal of nerves under the pitiless glare of the naked sun...', 'https://covers.openlibrary.org/b/id/6542967-L.jpg', '1954-01-01', 'Agotado', 583.14, 0);
INSERT INTO public.libros VALUES (25, 3, '4:50 from Paddington', 'Agatha Christie', 'Agatha Christie’s audacious mystery thriller, reissued with a striking new cover designed to appeal to the latest generation of Agatha Christie fans and book lovers.

For an instant the two trains ran together, side by side. In that frozen moment, Elspeth witnessed a murder. Helplessly, she stared out of her carriage window as a man remorselessly tightened his grip around a woman’s throat. The body crumpled. Then the other train drew away.

But who, apart from Miss Marple, would take her story seriously? After all, there were no suspects, no other witnesses… and no corpse.', 'https://covers.openlibrary.org/b/id/13151352-L.jpg', '1957-01-01', 'Agotado', 462.88, 0);
INSERT INTO public.libros VALUES (63, 7, 'Ilmu pendidikan Islam', 'Zakiah Daradjat', 'Islamic education in Indonesia.', 'https://covers.openlibrary.org/b/id/3929249-L.jpg', '1992-01-01', 'Agotado', 693.57, 0);
INSERT INTO public.libros VALUES (75, 8, 'The Hellbound Heart', 'Clive Barker', 'From his Books of Blood to The Damnation Game, Weaveworld, and The Great and Secret Show, to scores of short stories, bestselling novels, and now major motion pictures, no one comes close to the vivid imagination and unique terrors provided by Clive Barker.', 'https://covers.openlibrary.org/b/id/1726053-L.jpg', '1991-01-01', 'Disponible', 390.75, 67);
INSERT INTO public.libros VALUES (12, 2, 'The Caves of Steel', 'Isaac Asimov', 'In the future you will walk down the crowded streets of New York City not knowing if the bodies brushing past you are humans or androids. With tensions already mounting between humans and robots, the murder of a Spacer must be handled in a politically-correct fashion so Detective Elijah Baley is assigned a robot partner.

Baley and R. Daneel Olivaw become like Sir Arthur Conan Doyle s Sherlock Holmes and Dr. Watson, Law & Order s Detectives Lennie Brisco and Ed Green, and Training Day s Detective Alonzo Harris and Officer Jake Hoyt disparate partners who must work together to solve a crime. The only problem is, Baley doesn''t trust anyone not his boss, not his wife, and certainly not his robot partner.', 'https://covers.openlibrary.org/b/id/13790511-L.jpg', '1953-01-01', 'Disponible', 701.93, 92);
INSERT INTO public.libros VALUES (15, 2, 'The Invisible Man', 'H. G. Wells', 'This book is the story of Griffin, a scientist who creates a serum to render himself invisible, and his descent into madness that follows.', 'https://covers.openlibrary.org/b/id/6419199-L.jpg', NULL, 'Disponible', 808.26, 94);
INSERT INTO public.libros VALUES (20, 2, 'I Have No Mouth and I Must Scream', 'Harlan Ellison', 'This is a story set in a post-apocalyptic future. The Cold War progressed until it was too complicated for humans to manage, so the three major superpowers each developed a computer program to help run the war. When one of the programs becomes sentient it eliminates all of the human race except five persons, which it tortures for eternity.', 'https://covers.openlibrary.org/b/id/5540875-L.jpg', '1972-01-01', 'Agotado', 470.54, 0);
INSERT INTO public.libros VALUES (21, 3, 'Never Lie', 'Freida McFadden', 'Newlyweds Tricia and Ethan are searching for the house of their dreams.

But when they visit the remote manor that once belonged to Dr. Adrienne Hale, a renowned psychiatrist who vanished without a trace four years earlier, a violent winter storm traps them at the estate… with no chance of escape until the blizzard comes to an end.

In search of a book to keep her entertained until the snow abates, Tricia happens upon a secret room. One that contains audio transcripts from every single patient Dr. Hale has ever interviewed. As Tricia listens to the cassette tapes, she learns about the terrifying chain of events leading up to Dr. Hale’s mysterious disappearance.

Tricia plays the tapes one by one, late into the night. With each one, another shocking piece of the puzzle falls into place, and Dr. Adrienne Hale’s web of lies slowly unravels.

And then Tricia reaches the final cassette.

The one that reveals the entire horrifying truth.', 'https://covers.openlibrary.org/b/id/13198561-L.jpg', '2022-01-01', 'Agotado', 851.52, 0);
INSERT INTO public.libros VALUES (23, 3, 'The Secret of Chimneys', 'Agatha Christie', 'A bit of adventure and quick cash is all that good-natured drifter Anthony Cade is looking for when he accepts a messenger job from an old friend. It sounds so simple: deliver the provocative memoirs of a recently deceased European count to a London publisher. Little did Anthony suspect that a simple errand to deliver the manuscript on behalf of his friend would drop him right in the middle of an international conspiracy, and he begins to realize that it has placed him in serious danger. Why were Count Stylptich''s memoirs so important? And what was "King Victor" really after? The parcel holds ore than scandalous royal secrets - because it contains a stash of letters that suggest blackmail. Someone would stop at nothing to prevent the monarchy being restored in faraway Herzoslovakia.

Wherever ravishing Virginia Revel went, death seemed sure to follow. First her husband died. The next to perish was a foreign prince whose ruthless power was matched by his scandalous passions. Then a bungling blackmailer followed them into the grave. Murder, blackmail, stolen letters, and a fabulous missing jewel: all under the not always co-operative eyes of Scotland Yard and the Surete. All threads lead to Chimneys, one of England''s historic country house estates, where a master murderer mingled with the aristocratic guests. Virginia could turn to only one person to prove her innocence and end her nightmare, and she could only pray that she had not put her life into the hands of the man who was out to take it....

This novel was published in 1925 by Bodley Head in London, and by Dodd, Mead & Co. in New York. The Times Literary Supplement described it as "a thick fog of mystery, cross purposes, and romance, which leads up to a most unexpected and highly satisfactory ending".Chimneys was adapted by Christie as a stage play but was not performed until 2003, in Canada. It was filmed with the addition of Julia McKenzie as Miss Marple by ITV in 2009.', 'https://covers.openlibrary.org/b/id/12996574-L.jpg', '1925-01-01', 'Disponible', 430.26, 49);
INSERT INTO public.libros VALUES (19, 2, 'Nightfall', 'Isaac Asimov', 'These two renowned writers have invented a world not unlike our own--a world on the edge of chaos, torn between the madness of religious fanaticism and the stubborn denial of scientists. Only a handful of people on the planet Lagash are prepared to face the truth--that their six suns are setting all at once for the first time in 2,000 years, signaling the end of civilization!', 'https://covers.openlibrary.org/b/id/9302081-L.jpg', '1969-01-01', 'Disponible', 365.09, 75);
INSERT INTO public.libros VALUES (17, 2, 'The Dark Forest (The Three-Body Problem Series Book 2)', '刘慈欣', 'Soon to be a Netflix Original Series!

"Wildly imaginative." —President Barack Obama on The Three-Body Problem trilogy

This near-future trilogy is the first chance for English-speaking readers to experience this multiple-award-winning phenomenon from Cixin Liu, China''s most beloved science fiction author.

In The Dark Forest, Earth is reeling from the revelation of a coming alien invasion-in just four centuries'' time. The aliens'' human collaborators may have been defeated, but the presence of the sophons, the subatomic particles that allow Trisolaris instant access to all human information, means that Earth''s defense plans are totally exposed to the enemy. Only the human mind remains a secret. This is the motivation for the Wallfacer Project, a daring plan that grants four men enormous resources to design secret strategies, hidden through deceit and misdirection from Earth and Trisolaris alike. Three of the Wallfacers are influential statesmen and scientists, but the fourth is a total unknown. Luo Ji, an unambitious Chinese astronomer and sociologist, is baffled by his new status. All he knows is that he''s the one Wallfacer that Trisolaris wants dead.', 'https://covers.openlibrary.org/b/id/10526598-L.jpg', '2008-01-01', 'Disponible', 584.95, 30);
INSERT INTO public.libros VALUES (86, 9, 'Chicken Little (Read-Aloud Storybook)', 'RH Disney', 'kids entertaining and educational', 'https://covers.openlibrary.org/b/id/462969-L.jpg', '2005-01-01', 'Disponible', 234.66, 58);
INSERT INTO public.libros VALUES (26, 3, 'The Mirror Crack''d from Side to Side', 'Agatha Christie', 'E-book exclusive extras:1) Christie biographer Charles Osborne''s essay on The Mirror Crack''d from Side to Side;2) "The Marples": the complete guide to all the cases of crime literature''s foremost female detective.The quaint village of St Mary Mead has been glamourized by the presence of screen queen Marina Gregg, who has taken up residence in preparation for her comeback. But when a local fan is poisoned, Marina finds herself starring in a real-life mystery—supported with scene-stealing aplomb by Jane Marple, who suspects that the lethal cocktail was intended for someone else. But who? If it was meant for Marina, then why? And before the final fade-out, who else from St Mary Mead’s cast of seemingly innocent characters is going to be eliminated?', 'https://covers.openlibrary.org/b/id/10561150-L.jpg', '1960-01-01', 'Disponible', 757.95, 100);
INSERT INTO public.libros VALUES (27, 3, 'They Do It with Mirrors', 'Agatha Christie', 'E-book exclusive extras:1) Christie biographer Charles Osborne''s essay on They Do It with Mirrors;2) "The Marples": the complete guide to all the cases of crime literature''s foremost female detective.A sense of danger pervades the rambling Victorian mansion in which Jane Marple’s friend Carrie Louise lives—and not only because the building doubles as a rehabilitation centre for criminal youths. One inmate attempts, and fails, to shoot dead the administrator. But simultaneously, in another part of the building, a mysterious visitor is less lucky. Miss Marple must employ all her cunning to solve the riddle of the stranger’s visit, and his murder—while protecting her friend from a similarly dreadful fate.The New York Times: ‘No one on either side of the Atlantic does it better.’', 'https://covers.openlibrary.org/b/id/10249524-L.jpg', '1952-01-01', 'Disponible', 318.78, 95);
INSERT INTO public.libros VALUES (30, 3, 'After the Funeral', 'Agatha Christie', 'When Cora is savagely murdered with a hatchet, the extraordinary remark she made the previous day at her brother Richard''s funeral suddenly takes on a chilling significance. At the reading of Richard''s will, Cora was clearly heard to say: ''It''s been hushed up very nicely, hasn''t it. But he was murdered, wasn''t he?'' In desperation, the family solicitor turns to Hercule Poirot to unravel the mystery.', 'https://covers.openlibrary.org/b/id/12996535-L.jpg', '1953-01-01', 'Disponible', 347.84, 57);
INSERT INTO public.libros VALUES (31, 4, 'Um casamento arranjado', 'Zana Kheiron', 'Uma historia de uma familia falida q faz acordo com outra familia rica e sua filha mais velha e cedida em troca. O filho da família rica teve um acidente de avião que queimou 50% do seu corpo e casa c essa linda moca e se apaixonam', 'https://covers.openlibrary.org/b/id/14321120-L.jpg', '2019-01-01', 'Disponible', 453.88, 92);
INSERT INTO public.libros VALUES (32, 4, 'Twisted Games', 'Ana Huang', 'She can never be his…but he’s taking her anyway.

Stoic, broody, and arrogant, elite bodyguard Rhys Larsen has two rules: 1) Protect his clients at all costs 2) Do not become emotionally involved. Ever.

He has never once been tempted to break those rules…until her.

Bridget von Ascheberg. A princess with a stubborn streak that matches his own and a hidden fire that reduces his rules to ash. She’s nothing he expected and everything he never knew he needed.

Day by day, inch by inch, she breaks down his defenses until he’s faced with a truth he can no longer deny: he swore an oath to protect her, but all he wants is to ruin her. Take her.

Because she’s his.

His princess.

His forbidden fruit.

His every depraved fantasy.

***

Regal, strong-willed, and bound by the chains of duty, Princess Bridget dreams of the freedom to live and love as she chooses.

But when her brother abdicates, she’s suddenly faced with the prospect of a loveless, politically expedient marriage and a throne she never wanted.

And as she navigates the intricacies—and treacheries—of her new role, she must also hide her desire for a man she can’t have.

Her bodyguard.

Her protector.

Her ultimate ruin.


Unexpected and forbidden, theirs is a love that could destroy a kingdom…and doom them both.


Twisted Games is a contemporary royal bodyguard romance. It’s book two of the Twisted series but can be read as a standalone.

Warning: This book contains a possessive hero, explicit content, and profanity.', 'https://covers.openlibrary.org/b/id/12821465-L.jpg', '2021-01-01', 'Disponible', 776.59, 71);
INSERT INTO public.libros VALUES (59, 6, 'Zodiac', 'Neal Stephenson', 'Sangamon Taylor''s a New Age Sam Spade who sports a wet suit instead of a trench coat and prefers Jolt from the can to Scotch on the rocks. He knows about chemical sludge the way he knows about evil -- all too intimately. And the toxic trail he follows leads to some high and foul places. Before long Taylor''s house is bombed, his every move followed, he''s adopted by reservation Indians, moves onto the FBI''s most wanted list, makes up with his girlfriend, and plays a starring role in the near-assassination of a presidential candidate. Closing the case with the aid of his burnout roomate, his tofu-eating comrades, three major networks, and a range of unconventional weaponry, Sangamon Taylor pulls off the most startling caper in Boston Harbor since the Tea Party. As he navigates this ecological thriller with hardboiled wit and the biggest outboard motor he can get his hands on, Taylor reveals himself as one of the last of the white-hatted good guys in a very toxic world.', 'https://covers.openlibrary.org/b/id/9158744-L.jpg', '1988-01-01', 'Disponible', 469.32, 54);
INSERT INTO public.libros VALUES (34, 4, 'Married at first sight', 'Gu Lingfei', NULL, 'https://covers.openlibrary.org/b/id/14312142-L.jpg', '2015-01-01', 'Agotado', 303.39, 0);
INSERT INTO public.libros VALUES (35, 4, 'Twisted Hate', 'Ana Huang', 'He hates her...almost as much as he wants her.

Gorgeous, cocky, and fast on his way to becoming a hotshot doctor, Josh Chen has never met a woman he couldn’t charm—except for Jules f**king Ambrose.

The beautiful redhead has been a thorn in his side since they met, but she also consumes his thoughts in a way no woman ever has.

When their animosity explodes into one unforgettable night, he proposes a solution that’ll get her out of his system once and for all: an enemies with benefits arrangement with simple rules.

No jealousy.

No strings attached.

And absolutely no falling in love.

**

Outgoing and ambitious, Jules Ambrose is a former party girl who’s focused on one thing: passing the attorney’s bar exam.

The last thing she needs is to get involved with a doctor who puts the SUFFER in insufferable…no matter how good-looking he is.

But the more she gets to know him, the more she realizes there’s more than meets the eye to the man she’s hated for so long.

Her best friend’s brother.

Her nemesis.

And her only salvation.

Theirs is a match made in hell, and when the demons from their past catch up with them, they’re faced with truths that could either save them …or destroy everything they’ve worked for.

Twisted Hate is a steamy enemies with benefits/enemies to lovers romance. It''s book three in the Twisted series but can be read as a standalone.

Warning: The story contains explicit content, mild violence, profanity, and topics that may be sensitive to some readers. Detailed list linked inside the book. Recommended for 18+.', 'https://covers.openlibrary.org/b/id/12928487-L.jpg', '2022-01-01', 'Disponible', 482.66, 86);
INSERT INTO public.libros VALUES (36, 4, 'Corrupt', 'Penelope Douglas', 'Dreams are desires of the heart; Nightmares, my obsession.
Erika
When I have it close to me, I tremble. Of fear and desire.

Michael Crist, my ex-boyfriend''s older brother, is like one of those movies that, even though it''s scary, you can''t stop watching. Handsome, strong, and intimidating, I''ve watched him for years, wishing I was closer to see if what is said about him is true. He''s the star of his university''s basketball team, he''d never noticed me and he''d barely looked at me... Until now. He''s got something on his mind, I can feel it, I can almost taste it but, knowing everything I know, do I really want to find out what he has planned?

Michael
I want to get revenge. Almost as much as owning it.

Her name is Erika Fane, but everyone calls her Rika. You could say he grew up in my house, he''s always been around. She looks away when I walk into a room and stays still when I''m around. I can feel the tension he gives off, his desire for more; I don''t have his body but I know I''ve caught his mind. And now, the opportunity to avenge what happened a few years ago is too good to be true. I''ve been patient. I''ve waited for the moment. Every last of your nightmares will come true.

When passion and danger mix, anything can happen.', 'https://covers.openlibrary.org/b/id/10226443-L.jpg', '2015-01-01', 'Agotado', 362.01, 0);
INSERT INTO public.libros VALUES (37, 4, 'Punk 57', 'Penelope Douglas', '"We were perfect together. Until we met."

Misha

I can’t help but smile at the words in her letter. She misses me.

In fifth grade, my teacher set us up with pen pals from a different school. Thinking I was a girl, with a name like Misha, the other teacher paired me up with her student, Ryen. My teacher, believing Ryen was a boy like me, agreed.

It didn’t take long for us to figure out the mistake. And in no time at all, we were arguing about everything. The best take-out pizza. Android vs. iPhone. Whether or not Eminem is the greatest rapper ever…

And that was the start. For the next seven years, it was us.

Her letters are always on black paper with silver writing. Sometimes there’s one a week or three in a day, but I need them. She’s the only one who keeps me on track, talks me down, and accepts everything I am.

We only had three rules. No social media, no phone numbers, no pictures. We had a good thing going. Why ruin it?

Until I run across a photo of a girl online. Name’s Ryen, loves Gallo’s pizza, and worships her iPhone. What are the chances?

F*ck it. I need to meet her.

I just don’t expect to hate what I find.

Ryen

He hasn’t written in three months. Something’s wrong. Did he die? Get arrested? Knowing Misha, neither would be a stretch.

Without him around, I’m going crazy. I need to know someone is listening. It’s my own fault. I should''ve gotten his number or picture or something.

He could be gone forever.

Or right under my nose, and I wouldn’t even know it.', 'https://covers.openlibrary.org/b/id/10107803-L.jpg', '2016-01-01', 'Disponible', 189.05, 36);
INSERT INTO public.libros VALUES (40, 4, 'The Fine Print', 'Lauren Asher', 'Rowan
I’m in the business of creating fairy tales.
Theme parks. Production companies. Five-star hotels.
Everything could be all mine if I renovated Dreamland.
My initial idea of hiring Zahra was good in theory, but then I kissed her.
Things spiraled out of control once I texted her using an alias.
By the time I realized where I went wrong, it was too late.
People like me don’t get happy endings.
Not when we’re destined to ruin them.

Zahra
After submitting a drunk proposal criticizing Dreamland’s most expensive ride, I should have been fired.
Instead, Rowan Kane offered me a dream job.
The catch? I had to work for the most difficult boss I’d ever met.
Rowan was rude and completely off-limits, but my heart didn’t care.
At least not until I discovered his secret.
It was time to teach the billionaire that money couldn’t fix everything.
Especially not us.', 'https://covers.openlibrary.org/b/id/14319054-L.jpg', '2021-01-01', 'Disponible', 792.63, 84);
INSERT INTO public.libros VALUES (41, 5, 'Debt', 'David Graeber', 'The author shows that before there was money, there was debt. For 5,000 years humans have lived in societies divided into debtors and creditors. For 5,000 years debt and debt forgiveness have been at the center of political debates, laws and religions. The words “guilt,” “sin,” and “redemption” come from ancient debates about debt. These terms and the ideas of debt shape  our most basic ideas of right and wrong. [source][1]


  [1]: http://www.amazon.com/Debt-Updated-Expanded-First-Years/dp/1612194192/ref=dp_ob_title_bk', 'https://covers.openlibrary.org/b/id/6299464-L.jpg', '2011-01-01', 'Disponible', 382.27, 11);
INSERT INTO public.libros VALUES (42, 5, 'The Story of Philosophy', 'Will Durant', 'Includes chapters on Plato, Aristotle, Francis Bacon, Spinoza, Voltaire, Kant, and Nietzsche.', 'https://covers.openlibrary.org/b/id/405360-L.jpg', '1926-01-01', 'Disponible', 626.51, 54);
INSERT INTO public.libros VALUES (46, 5, 'Capitalist Realism', 'Mark Fisher', 'It is easier to imagine the end of the world than the end of capitalism. After 1989, capitalism has successfully presented itself as the only realistic political-economic system - a situation that the bank crisis of 2008, far from ending, actually compounded. The book analyses the development and principal features of this capitalist realism as a lived ideological framework. Using examples from politics, film (Children Of Men, Jason Bourne, Supernanny), fiction (Le Guin and Kafka), work and education, it argues that capitalist realism colours all areas of contemporary experience, is anything but realistic and asks how capitalism and its inconsistencies can be challenged. It is a sharp analysis of the post-ideological malaise that suggests that the economics and politics of free market neo-liberalism are givens rather than constructions.', 'https://covers.openlibrary.org/b/id/6707037-L.jpg', '2009-01-01', 'Agotado', 849.30, 0);
INSERT INTO public.libros VALUES (47, 5, 'The great conversation', 'Norman Melchert', NULL, 'https://covers.openlibrary.org/b/id/1454089-L.jpg', '1991-01-01', 'Disponible', 685.29, 58);
INSERT INTO public.libros VALUES (48, 5, 'The Art of War', '孙武 (Sun Tzu)', 'The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu', 'https://covers.openlibrary.org/b/id/4849549-L.jpg', '1900-01-01', 'Disponible', 165.06, 99);
INSERT INTO public.libros VALUES (49, 5, 'Freedom at Midnight', 'Dominique Lapierre', 'The end of an empire. The birth of two nations.

Seventy years ago, at midnight on August 14, 1947, the Union Jack began its final journey down the flagstaff of Viceroy’s House, New Delhi. A fifth of humanity claimed their independence from the greatest empire history has ever seen—but the price of freedom was high, as a nation erupted into riots and bloodshed, partition and war.

Freedom at Midnight is the true story of the events surrounding Indian independence, beginning with the appointment of Lord Mountbatten of Burma as the last Viceroy of British India, and ending with the assassination and funeral of Mahatma Gandhi. The book was an international bestseller and achieved enormous acclaim in the United States, Italy, Spain, and France.

This edition contains 20 black-and-white photos, five maps, a full bibliography, extensive notes, and a dedication from Dominique Lapierre to the memory of his longtime writing partner Larry Collins.', 'https://covers.openlibrary.org/b/id/4410-L.jpg', '1975-01-01', 'Agotado', 515.48, 0);
INSERT INTO public.libros VALUES (43, 5, 'A People''s History of the United States', 'Howard Zinn', 'Known for its lively, clear prose as well as its scholarly research, *A People''s History of the United States* is the only volume to tell America''s story from the point of view of -- and in the words of -- America''s women, factory workers, African Americans, Native Americans, working poor, and immigrant laborers.', 'https://covers.openlibrary.org/b/id/10592817-L.jpg', '1980-01-01', 'Disponible', 386.44, 11);
INSERT INTO public.libros VALUES (50, 5, 'Sapiens', 'Yuval Noah Harari', 'From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.”

One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us?

Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition. From examining the role evolving humans have played in the global ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine specific events within the context of larger ideas.

Dr. Harari also compels us to look ahead, because over the last few decades humans have begun to bend laws of natural selection that have governed life for the past four billion years. We are acquiring the ability to design not only the world around us, but also ourselves. Where is this leading us, and what do we want to become?

Featuring 27 photographs, 6 maps, and 25 illustrations/diagrams, this provocative and insightful work is sure to spark debate and is essential reading for aficionados of Jared Diamond, James Gleick, Matt Ridley, Robert Wright, and Sharon Moalem.', 'https://covers.openlibrary.org/b/id/8634250-L.jpg', '2011-01-01', 'Agotado', 828.56, 0);
INSERT INTO public.libros VALUES (51, 6, 'Elon Musk', 'Ashlee Vance', 'In the spirit of Steve Jobs and Moneyball, Elon Musk is both an illuminating and authorized look at the extraordinary life of one of Silicon Valley''s most exciting, unpredictable, and ambitious entrepreneurs -- a real-life Tony Stark -- and a fascinating exploration of the renewal of American invention and its new "makers." Elon Musk spotlights the technology and vision of Elon Musk, the renowned entrepreneur and innovator behind SpaceX, Tesla, and SolarCity, who sold one of his Internet companies, PayPal, for $1.5 billion. Ashlee Vance captures the full spectacle and arc of the genius''s life and work, from his tumultuous upbringing in South Africa and flight to the United States to his dramatic technical innovations and entrepreneurial pursuits. Vance uses Musk''s story to explore one of the pressing questions of our age: can the nation of inventors and creators who led the modern world for a century still compete in an age of fierce global competition? He argues that Musk -- one of the most unusual and striking figures in American business history -- is a contemporary, visionary amalgam of legendary inventors and industrialists including Thomas Edison, Henry Ford, Howard Hughes, and Steve Jobs. More than any other entrepreneur today, Musk has dedicated his energies and his own vast fortune to inventing a future that is as rich and far-reaching as the visionaries of the golden age of science-fiction fantasy. Thorough and insightful, Elon Musk brings to life a technology industry that is rapidly and dramatically changing by examining the life of one of its most powerful and influential titans. - Publisher.', 'https://covers.openlibrary.org/b/id/8463846-L.jpg', '2013-01-01', 'Agotado', 249.34, 0);
INSERT INTO public.libros VALUES (55, 6, 'The Circle', 'Dave Eggers', 'The Circle is a 2013 dystopian novel written by American author Dave Eggers. The novel chronicles tech worker Mae Holland as she joins a powerful Internet company. Her initially rewarding experience turns darker.', 'https://covers.openlibrary.org/b/id/8334682-L.jpg', '2013-01-01', 'Agotado', 463.75, 0);
INSERT INTO public.libros VALUES (60, 6, 'Crossing the Chasm', 'Geoffrey A. Moore', 'Crossing the Chasm (1991; rev. 1999) demonstrates the existence of distinct marketing challenges for each market segment in the life cycle of new technology-based products. A significant gulf -- the "chasm" -- exists between the market made up of early adopters and the markets of more pragmatic buyers. To cross the chasm, a product team must identify the needs of pragmatic buyers and deliver a "whole product" that more than meets those needs. This landmark book, part of the HarperBusiness Essentials series, shows just how to do that.', 'https://covers.openlibrary.org/b/id/684159-L.jpg', '1991-01-01', 'Disponible', 687.63, 64);
INSERT INTO public.libros VALUES (56, 6, 'All Tomorrow''s Parties', 'William Gibson', 'All Tomorrow''s Parties is the final novel in the Bridge trilogy.

From his cardboard box in the Tokyo subway, connected to the Internet, a clairvoyant cyberpunk mobilizes his friends to avert a world disaster. It is due to occur on a bridge in San Francisco, now home to squatters, and is part of a rich man''s bid for world domination.', 'https://covers.openlibrary.org/b/id/258725-L.jpg', '1999-01-01', 'Disponible', 508.81, 9);
INSERT INTO public.libros VALUES (57, 6, 'Transactions on Engineering Technologies', 'Sio-Iong Ao', NULL, 'https://covers.openlibrary.org/b/id/9334768-L.jpg', '2013-01-01', 'Disponible', 643.04, 74);
INSERT INTO public.libros VALUES (58, 6, 'Computer Concepts and Management Information Systems', 'C. P. Gupta', NULL, 'https://covers.openlibrary.org/b/id/14790669-L.jpg', '2020-01-01', 'Disponible', 556.28, 17);
INSERT INTO public.libros VALUES (64, 7, 'Democracy and Education', 'John Dewey', 'Publisher description: John Dewey (1859-1952) believed that learning was active and schooling unnecessarily long and restrictive. His idea was that children came to school to do things and live in a community which gave them real, guided experiences which fostered their capacity to contribute to society. For example, Dewey believed that students should be involved in real-life tasks and challenges: maths could be learnt via learning proportions in cooking or figuring out how long it would take to get from one place to another by mule history could be learnt by experiencing how people lived, geography, what the climate was like, and how plants and animals grew, were important subjects Dewey had a gift for suggesting activities that captured the center of what his classes were studying. Dewey''s education philosophy helped forward the "progressive education" movement, and spawned the development of "experiential education" programs and experiments.', 'https://covers.openlibrary.org/b/id/6738842-L.jpg', '1916-01-01', 'Agotado', 226.73, 0);
INSERT INTO public.libros VALUES (65, 7, 'The art of self-directed learning', 'Blake Boles', 'The Art of Self-Directed Learning is a collection of 23 stories and insights that will help you become a more motivated and self-guided learner. Drawing on a decade of research, adventures, and interviews conducted by Blake Boles (author of College Without High School and Better Than College), this book will inspire you to craft your own unconventional education.', 'https://covers.openlibrary.org/b/id/15098867-L.jpg', '2014-01-01', 'Disponible', 776.31, 30);
INSERT INTO public.libros VALUES (72, 8, 'The Shining', 'Stephen King', 'The Shining is a 1977 horror novel by American author Stephen King. It is King''s third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King''s personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism. The book was followed by a sequel, Doctor Sleep, published in 2013.

The Shining centers on the life of Jack Torrance, a struggling writer and recovering alcoholic who accepts a position as the off-season caretaker of the historic Overlook Hotel in the Colorado Rockies. His family accompanies him on this job, including his young son Danny Torrance, who possesses "the shining", an array of psychic abilities that allow Danny to see the hotel''s horrific past. Soon, after a winter storm leaves them snowbound, the supernatural forces inhabiting the hotel influence Jack''s sanity, leaving his wife and son in incredible danger.

---

Also contained in:

- [Carrie / Night Shift / ''Salem''s Lot / Shining](https://openlibrary.org/works/OL14917547W)
- [Works (Danse Macabre / Salem''s Lot / Shining)](https://openlibrary.org/works/OL24233994W)', 'https://covers.openlibrary.org/b/id/12376585-L.jpg', '1977-01-01', 'Disponible', 476.00, 58);
INSERT INTO public.libros VALUES (73, 8, 'The Exorcist', 'William Peter Blatty', 'The Exorcist is a 1971 horror novel by American writer William Peter Blatty. The book details the demonic possession of eleven-year-old Regan MacNeil, the daughter of a famous actress, and the two priests who attempt to exorcise the demon. Published by Harper & Row, the novel was the basis of a highly successful film adaptation released two years later, whose screenplay was also written and produced by Blatty, and part of The Exorcist franchise.

The novel was inspired by a 1949 case of demonic possession and exorcism that Blatty heard about while he was a student in the class of 1950 at Georgetown University. As a result, the novel takes place in Washington, D.C., near the campus of Georgetown University. In September 2011, the novel was reprinted by Harper Collins to celebrate its fortieth anniversary, with slight revisions made by Blatty as well as interior title artwork by Jeremy Caniglia.', 'https://covers.openlibrary.org/b/id/12715730-L.jpg', '1971-01-01', 'Disponible', 871.71, 8);
INSERT INTO public.libros VALUES (74, 8, 'Cujo', 'Stephen King', 'Cujo (/ˈkjuːdʒoʊ/) is a 1981 psychological horror novel by American writer Stephen King about a rabid Saint Bernard. The novel won the British Fantasy Award in 1982 and was made into a film in 1983.', 'https://covers.openlibrary.org/b/id/8570003-L.jpg', '1981-01-01', 'Disponible', 566.19, 40);
INSERT INTO public.libros VALUES (76, 8, 'The Long Walk', 'Stephen King', 'The Long Walk is a dystopian horror novel by American writer Stephen King, published in 1979, under the pseudonym Richard Bachman. It was collected in 1985 in the hardcover omnibus The Bachman Books, and has seen several reprints since, as both paperback and hardback.

Set in a future dystopian America, ruled by a totalitarian and militaristic dictator, the plot revolves around the contestants of a grueling, annual walking contest. In 2000, the American Library Association listed The Long Walk as one of the 100 best books for teenage readers published between 1966 and 2000.


----------
Also contained in:

 - [The Bachman Books][2]
 - [The Bachman Books](https://openlibrary.org/works/OL24796729W)



  [1]: https://stephenking.com/library/bachman_novel/long_walk_the.html
  [2]: https://openlibrary.org/works/OL81591W/The_Bachman_Books_(Rage_The_Long_Walk_Roadwork_The_Running_Man)', 'https://covers.openlibrary.org/b/id/14653609-L.jpg', '1979-01-01', 'Disponible', 610.40, 82);
INSERT INTO public.libros VALUES (77, 8, 'It', 'Stephen King', '"*It*" is a 1986 horror novel by American author Stephen King. "*It*" was his 22nd book and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey. "*It*" primarily appears in the form of Pennywise the Dancing Clown to attract its preferred prey of young children.

The novel won the British Fantasy Award in 1987, and received nominations for the Locus and World Fantasy Awards that same year.

In 2003, "*It*" was listed at number 144 on the BBC''s The Big Read poll.




----------
See also:

 - [IT 1/2][2]
 - [IT 2/2][3]


  [1]: https://www.stephenking.com/library/novel/it.html
  [2]: https://openlibrary.org/works/OL14916816W/It_1_2
  [3]: https://openlibrary.org/works/OL14916818W/It_2_2', 'https://covers.openlibrary.org/b/id/8569284-L.jpg', '1986-01-01', 'Agotado', 610.15, 0);
INSERT INTO public.libros VALUES (78, 8, 'Christine', 'Stephen King', 'A love triangle involving 17-year-old misfit Arnie Cunningham, his new girlfriend and a haunted 1958 Plymouth Fury. Dubbed Christine by her previous owner, Arnie''s first car is jealous, possessive and deadly. 
([source][1])


  [1]: https://stephenking.com/library/novel/christine.html', 'https://covers.openlibrary.org/b/id/14655985-L.jpg', '1983-01-01', 'Agotado', 588.83, 0);
INSERT INTO public.libros VALUES (79, 8, 'Four Past Midnight', 'Stephen King', 'Four Past Midnight is a collection of novellas written by Stephen King in 1988 and 1989 and published in August 1990. It is his second book of this type, the first one being Different Seasons. The collection won the Bram Stoker Award in 1990 for Best Collection and was nominated for a Locus Award in 1991.
    
One Past Midnight: "[The Langoliers][1]" takes a red-eye flight from L.A. to Boston into a most unfriendly sky. Only eleven passengers survive, but landing in an eerily empty world makes them wish they hadn''t. Something''s waiting for them, you see....
    
Two Past Midnight: "[Secret Window, Secret Garden][2]" enters the suddenly strange life of writer Mort Rainey, recently divorced, depressed, and alone on the shore of Tashmore Lake. Alone, that is, until a figure named John Shooter arrives, pointing an accusing finger.
    
Three Past Midnight: "[The Library Policeman][3]" is set in Junction City, Iowa, an unlikely place for evil to be hiding. But for small businessman Sam Peebles, who thinks he may be losing his mind, another enemy is hiding there as well--the truth. If he can find it in time, he might stand a chance.
    
Four Past Midnight: The flat surface of a Polaroid photograph becomes for fifteen-year-old Kevin Delevan an invitation to the supernatural. Old Pop Merrill, Castle Rock''s sharpest trader, wants to crash the party for profit, but "[The Sun Dog][4]," a creature that shouldn''t exist at all, is a very dangerous investment.
    

  [1]: https://openlibrary.org/works/OL149138W/The_Langoliers
  [2]: https://openlibrary.org/works/OL14917476W/Secret_Window_Secret_Garden
  [3]: https://openlibrary.org/works/OL14917299W/The_Library_Policeman
  [4]: https://openlibrary.org/works/OL14916850W/The_Sun_Dog', 'https://covers.openlibrary.org/b/id/8413143-L.jpg', '1990-01-01', 'Disponible', 710.75, 30);
INSERT INTO public.libros VALUES (80, 8, 'Fear Street - The Knife', 'Robert Lawrence Stine', 'Every private room at Shadyside Hospital holds a shocking secret of its own. Student volunteer Laurie stumbles onto the hospital''s sickest secret of all.', 'https://covers.openlibrary.org/b/id/2547647-L.jpg', '1991-01-01', 'Agotado', 489.67, 0);
INSERT INTO public.libros VALUES (81, 9, 'Fantastic Mr Fox', 'Roald Dahl', 'The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.

Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer''s houses.

Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.', 'https://covers.openlibrary.org/b/id/6498519-L.jpg', '1917-01-01', 'Agotado', 499.20, 0);
INSERT INTO public.libros VALUES (83, 9, 'The Book of Dragons', 'Edith Nesbit', 'Eight madcap tales of unpredictable dragons — including one made of ice, another that takes refuge in the General Post Office, and a fire-breathing monster that flies out of an enchanted book and eats an entire soccer team! Marvelous adventure and excitement for make-believers of all ages.', 'https://covers.openlibrary.org/b/id/4342323-L.jpg', '1973-01-01', 'Disponible', 539.76, 33);
INSERT INTO public.libros VALUES (84, 9, 'Love Potion', 'Steven Banks', 'Jimmy Neutron embarks on an adventure with his friends when he accidentally infects him and his friends with a love potion.', 'https://covers.openlibrary.org/b/id/438059-L.jpg', '2003-01-01', 'Disponible', 394.01, 39);
INSERT INTO public.libros VALUES (85, 9, 'James and the Giant Peach', 'Roald Dahl', '***Roald Dahl''s first and most widely celebrated book for young people continues to thrill readers around the world.***

**When James accidentally drops some magic crystals by the old peach tree, strange things start to happen.** The peach at the top of the tree begins to grow, and before long it''s as big as a house. When James discovers a secret entrance-way into the fruit and crawls inside, he meets wonderful new friends--the Old-Green-Grasshopper, the dainty Ladybug, and the Centipede of the multiple boots. ***After years of feeling like an outsider in his aunts'' house, James finally found a place where he belongs. With a snip of the stem, the peach household starts rolling away--and the adventure begins!***

"This is a stunning book to be cherished for its story, a superb fantasy."***--Chicago Tribune***

"A beautifully written, fantastic book."***--Christian Science Monitor***', 'https://covers.openlibrary.org/b/id/8252454-L.jpg', '1961-01-01', 'Disponible', 631.23, 37);
INSERT INTO public.libros VALUES (87, 9, 'Ready, Alice?', 'Amanda Haley', 'Mom and Dad have a big day planned but Alice isn''t in any hurry. Will she ever be ready to go?

Level 2. Grade 1. Ages 6–7.

Up to 100 words in the Word Bank.', 'https://covers.openlibrary.org/b/id/10507160-L.jpg', '2005-01-01', 'Disponible', 481.97, 48);
INSERT INTO public.libros VALUES (88, 9, 'The Twits', 'Roald Dahl', 'The misadventures of two terrible old people who enjoy playing nasty tricks and are finally outwitted by a family of monkeys.', 'https://covers.openlibrary.org/b/id/14838233-L.jpg', '1967-01-01', 'Agotado', 273.93, 0);
INSERT INTO public.libros VALUES (90, 9, 'Mildred and Sam', 'Sharleen Collicott', 'Mildred and Sam live in a tiny burrow underneath the daffodil roots. Sam is happy. Mildred is fidgety. No matter how hard Sam tries to fix up their house, Mildred insists that it is too small, especially if they ever have visitors.

So Mildred dreams about the exciting adventures a new house could bring, but discovers the greatest surprise is about to arrive at her very own door.', 'https://covers.openlibrary.org/b/id/20215-L.jpg', '2002-01-01', 'Disponible', 827.58, 29);
INSERT INTO public.libros VALUES (91, 10, 'The Summer I Turned Pretty Trilogy', 'Jenny Han', 'Belly has always lived for the summertime, because summer means all her favorite things: swimming, the beach, and the Fischer boys, Conrad and Jeremiah. For as long as she can remember, she''s shared her summers with the brothers at Cousins Beach. And for as long as she can remember, she''s been in love with Conrad. Then one summer it seems like he might have feelings for her too -- but so does Jeremiah. As the summer seasons pass, Belly has to choose between two brothers who love her ... and she''ll have to break one of their hearts.', 'https://covers.openlibrary.org/b/id/7719210-L.jpg', '2009-01-01', 'Disponible', 898.32, 36);
INSERT INTO public.libros VALUES (92, 10, 'The Picture of Dorian Gray', 'Oscar Wilde', '**The Picture of Dorian Gray** is a philosophical novel by Irish writer Oscar Wilde. A shorter novella-length version was published in the July 1890 issue of the American periodical *Lippincott’s Monthly Magazine*. The novel-length version was published in April 1891.

(Source: [Wikipedia](https://en.wikipedia.org/wiki/The_Picture_of_Dorian_Gray))', 'https://covers.openlibrary.org/b/id/14314858-L.jpg', '1890-01-01', 'Disponible', 714.28, 60);
INSERT INTO public.libros VALUES (94, 10, 'The Silent Patient', 'Alex Michaelides', 'Alicia Berenson’s life is seemingly perfect. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word. Alicia’s refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London. Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations–a search for the truth that threatens to consume him.', 'https://covers.openlibrary.org/b/id/9407338-L.jpg', '2018-01-01', 'Agotado', 334.28, 0);
INSERT INTO public.libros VALUES (95, 10, 'Frankenstein; or, The Modern Prometheus', 'Mary Shelley', '*Frankenstein; or, The Modern Prometheus* is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Shelley started writing the story when she was 18, and the first edition was published anonymously in London on 1 January 1818, when she was 20. Her name first appeared in the second edition, which was published in Paris in 1821.', 'https://covers.openlibrary.org/b/id/12356249-L.jpg', '1818-01-01', 'Disponible', 663.62, 14);
INSERT INTO public.libros VALUES (97, 10, 'Diary of a Wimpy Kid', 'Jeff Kinney', 'Greg Heffley finds thrust into middle school, where undersized weaklings like him share the hallways with much bigger kids who are already shaving. But nothing scares Greg more than the moldy piece of cheese on the blacktop. Can he and his best friend, Rowley Jefferson, make it through the year without getting the Cheese Touch?', 'https://covers.openlibrary.org/b/id/14376136-L.jpg', '2007-01-01', 'Disponible', 171.00, 27);
INSERT INTO public.libros VALUES (89, 9, 'First Day at Gymnastics', 'DK Publishing', NULL, 'https://covers.openlibrary.org/b/id/1488099-L.jpg', '2002-01-01', 'Disponible', 556.28, 31);
INSERT INTO public.libros VALUES (93, 10, 'Shatter Me', 'Tahereh Mafi', 'Juliette hasn''t touched anyone in exactly 264 days. The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette''s touch is fatal. As long as she doesn''t hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don''t fly anymore, and the clouds are the wrong color. The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war-- and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she''s exactly what they need right now. Juliette has to make a choice: Be a weapon. Or be a warrior. In this electrifying debut, Tahereh Mafi presents a world as riveting as The Hunger Games and a superhero story as thrilling as The X-Men. Full of pulse-pounding romance, intoxicating villainy, and high-stakes choices, Shatter Me is a fresh and original dystopian novel—with a paranormal twist—that will leave readers anxiously awaiting its sequel.', 'https://covers.openlibrary.org/b/id/6974992-L.jpg', '2011-01-01', 'Disponible', 848.75, 7);
INSERT INTO public.libros VALUES (98, 10, 'It Ends With Us', 'Colleen Hoover', 'Lily hasn’t always had it easy, but that’s never stopped her from working hard for the life she wants. She’s come a long way from the small town where she grew up—she graduated from college, moved to Boston, and started her own business. And when she feels a spark with a gorgeous neurosurgeon named Ryle Kincaid, everything in Lily’s life seems too good to be true.

Ryle is assertive, stubborn, maybe even a little arrogant. He’s also sensitive, brilliant, and has a total soft spot for Lily. And the way he looks in scrubs certainly doesn’t hurt. Lily can’t get him out of her head. But Ryle’s complete aversion to relationships is disturbing. Even as Lily finds herself becoming the exception to his “no dating” rule, she can’t help but wonder what made him that way in the first place.

As questions about her new relationship overwhelm her, so do thoughts of Atlas Corrigan—her first love and a link to the past she left behind. He was her kindred spirit, her protector. When Atlas suddenly reappears, everything Lily has built with Ryle is threatened.

With this bold and deeply personal novel, It Ends With Us is a heart-wrenching story and an unforgettable tale of love that comes at the ultimate price.', 'https://covers.openlibrary.org/b/id/10473609-L.jpg', '2012-01-01', 'Disponible', 354.13, 19);
INSERT INTO public.libros VALUES (62, 7, 'Manajemen keuangan', 'Rahmini Hadi', 'Financial management of schools in Indonesia.', 'https://tse3.mm.bing.net/th/id/OIP.bxJlFLoJWM3STeRrF_7cawHaKK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', '2011-01-01', 'Disponible', 755.51, 79);
INSERT INTO public.libros VALUES (99, 10, 'Powerless', 'Lauren Roberts', 'Only the extraordinary belong in the kingdom of Ilya—the exceptional, the empowered, the Elites.

The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity.

Surviving in the slums as an Ordinary is no simple task, and Paedyn knows this better than most. Having been trained by her father to be overly observant since she was a child, Paedyn poses as a Psychic in the crowded city, blending in with the Elites as best she can in order to stay alive and out of trouble. Easier said than done.

When Paeydn unsuspectingly saves one of Ilyas princes, she finds herself thrown into the Purging Trials. The brutal competition exists to showcase the Elites’ powers—the very thing Paedyn lacks. If the Trials and the opponents within them don’t kill her, the prince she’s fighting feelings for certainly will if he discovers what she is—completely Ordinary. [Powerless pdf](https://chesserresources.com/doc/powerless-by-lauren-roberts-pdf/)', 'https://covers.openlibrary.org/b/id/14567864-L.jpg', '2023-01-01', 'Disponible', 597.29, 84);
INSERT INTO public.libros VALUES (1, NULL, 'The Blade Itself', 'Joe Abercrombie', 'Logen Ninefingers, infamous barbarian, has finally run out of luck. Caught in one feud too many, he’s on the verge of becoming a dead barbarian – leaving nothing behind him but bad songs, dead friends, and a lot of happy enemies.
Nobleman Captain Jezal dan Luthar, dashing officer, and paragon of selfishness, has nothing more dangerous in mind than fleecing his friends at cards and dreaming of glory in the fencing circle. But war is brewing, and on the battlefields of the frozen North they fight by altogether bloodier rules.

Inquisitor Glokta, cripple turned torturer, would like nothing better than to see Jezal come home in a box. But then Glokta hates everyone: cutting treason out of the Union one confession at a time leaves little room for friendship. His latest trail of corpses may lead him right to the rotten heart of government, if he can stay alive long enough to follow it.

Enter the wizard, Bayaz. A bald old man with a terrible temper and a pathetic assistant, he could be the First of the Magi, he could be a spectacular fraud, but whatever he is, he''s about to make the lives of Logen, Jezal, and Glotka a whole lot more difficult.

Murderous conspiracies rise to the surface, old scores are ready to be settled, and the line between hero and villain is sharp enough to draw blood.', 'https://covers.openlibrary.org/b/id/14543422-L.jpg', '2000-12-31', NULL, 624.69, 6);
INSERT INTO public.libros VALUES (96, 10, 'The Cruel Prince', 'Holly Black', '**GUARD YOUR MORTAL HEART.**

JUDE WAS SEVEN WHEN HER PARENTS were murdered and she and her two sisters were stolen away to live in the treacherous High Court of Faerie. Ten years later, Jude wants nothing more than to belong there, despite her mortality. But many of the fey despise humans. Especially Prince Cardan, the youngest and wickedest son of the High King.

To win a place at the Court, she must defy him--and face the consequences.

As Jude becomes more deeply embroiled in palace intrigues and deceptions, she discovers her own capacity for tricker and bloodshed. But as betrayal threatens to drown the Courts of Faerie in violence, Jude will need to risk her life in a dangerous alliance to save her sisters, and Faerie itself.

From #1 *New York Times* bestselling author Holly Black comes the first book in a stunning new trilogy filled with twists and enchantment, as one girl learns the meaning of true power when she finds herself caught in a web of royal faerie intrigue.

This description comes from the publisher. *The Cruel Prince* is the first book of the Folk of the Air trilogy.', 'https://covers.openlibrary.org/b/id/8361789-L.jpg', '2018-01-01', 'Disponible', 279.67, 14);
INSERT INTO public.libros VALUES (28, 3, 'Hallowe''en Party', 'Agatha Christie', 'Mystery writer Ariadne Oliver has been invited to a Hallowe’en party at Woodleigh Common. One of the other guests is an adolescent girl known for telling tall tales of murder and intrigue -- and for being generally unpleasant. But when the girl, Joyce, is found drowned in an apple-bobbing tub, Mrs Oliver wonders after the fictional nature of the girl’s claim that she had once witnessed a murder. Which of the party guests wanted to keep her quiet is a question for Ariadne’s friend Hercule Poirot. But unmasking a killer this Hallowe’en is not going to be easy -- for there isn’t a soul in Woodleigh who believes the late little storyteller was actually murdered.', 'https://covers.openlibrary.org/b/id/11160095-L.jpg', '1969-01-01', 'Disponible', 303.13, 48);
INSERT INTO public.libros VALUES (2, 1, 'The Hero of Ages', 'Brandon Sanderson', 'This book is not only the third book in a trilogy, but it’s Act Three of the the three-act structure for the Mistborn Trilogy—it’s the part of the story where the heroes have discovered that what they thought was the problem all along was not the true danger, and now they’re fighting for not only their own survival but that of the world they live in. The mists are killing people and staying out much longer than they should. The Ashmounts are spewing more and more choking ash into the sky, burying the crops that everyone needs to eat to live. And Ruin, the creature Vin was tricked into freeing from its prison of a millennium, is loose to wreak havoc upon the land. Life under the Lord Ruler is starting to look like paradise in comparison.

While the first book in the trilogy turned the standard fantasy story on its head, this volume (perhaps inevitably?) returns in a way to the tropes the first volume was a reaction against. Yet in this case the enemy is not a human or humanlike Dark Lord, but something more like a force of nature—entropy itself given a will and a guiding personality in the form of Ruin.

Ultimately, the book is about how the characters we have grown to love from the previous volumes—Vin, Elend, Sazed, TenSoon, Spook, Marsh, and others—find the courage and faith to fight on in the face of overwhelming odds, just as Kelsier taught them when he plotted the downfall of the Final Empire.', 'https://covers.openlibrary.org/b/id/14658094-L.jpg', '2008-01-01', 'Disponible', 430.54, 16);
INSERT INTO public.libros VALUES (71, 8, 'Misery', 'Stephen King', 'Novelist Paul Sheldon has plans to make the difficult transition from writing historical romances featuring heroine Misery Chastain to publishing literary fiction. Annie Wilkes, Sheldon''s number one fan, rescues the author from the scene of a car accident. The former nurse takes care of him in her remote house, but becomes irate when she discovers that the author has killed Misery off in his latest book. Annie keeps Sheldon prisoner while forcing him to write a book that brings Misery back to life.

[Source][1]


  [1]: https://stephenking.com/library/novel/misery.html', 'https://covers.openlibrary.org/b/id/8259296-L.jpg', '1978-01-01', 'Disponible', 413.37, 56);
INSERT INTO public.libros VALUES (33, 4, 'Twisted Love', 'Ana Huang', 'He has a heart of ice … but for her, he''d burn the world. Alex Volkov is a devil blessed with the face of an angel and cursed with a past he can''t escape. Driven by a tragedy that has haunted him for most of his life, his ruthless pursuits for success and vengeance leave little room for matters of the heart. But when he''s forced to look after his best friend''s sister, he starts to feel something in his chest: A crack. A melt. A fire that could end his world as he knew it.

Ava Chen is a free spirit trapped by nightmares of a childhood she can''t remember. But despite her broken past, she''s never stopped seeing the beauty in the world … including the heart beneath the icy exterior of a man she shouldn''t want. Her brother''s best friend. Her neighbor. Her savior and her downfall. Theirs is a love that was never supposed to happen - but when it does, it unleashes secrets that could destroy them both … and everything they hold dear. Twisted Love is a brother''s best friend/opposites attract romance with a hint of suspense. It''s book one in the Twisted series, but can be read as a standalone. WARNING: This book contains a possessive alpha/antihero, explicit sexual content, and profanity. No cheating or ménage, but if you''re looking for a traditionally sweet, loveable hero, this is not the book for you. Recommended for 18+.', 'https://covers.openlibrary.org/b/id/12940491-L.jpg', '2021-01-01', 'Disponible', 369.28, 4);
INSERT INTO public.libros VALUES (10, 1, 'Lord of Chaos', 'Robert Jordan', 'The Wheel of Time turns and Ages come and go, leaving memories that become legend. Legend fades to myth, and even myth is long forgotten when the Age that gave it birth returns again. In the Third Age, an Age of Prophecy, the World and Time themselves hang in the balance. What was, what will be, and what is, may yet fall under the Shadow.

On the slopes of Shayol Ghul, the Myrddraal swords are forged, and the sky is not the sky of this world;

In Salidar the White Tower in exile prepares an embassy to Caemlyn, where Rand Al''Thor, the Dragon Reborn, holds the throne--and where an unexpected visitor may change the world....

In Emond''s Field, Perrin Goldeneyes, Lord of the Two Rivers, feels the pull of ta''veren to ta''veren and prepares to march...

Morgase of Caemlyn finds a most unexpected, and quite unwelcome, ally....And south lies Illian, where Sammael holds sway...

TV series update: "Sony will produce along with Red Eagle Entertainment and Radar Pictures. Rafe Judkins is attached to write and executive produce. Judkins previously worked on shows such as ABC’s “Agents of SHIELD,” the Netflix series “Hemlock Grove,” and the NBC series “Chuck.” Red Eagle partners Rick Selvage and Larry Mondragon will executive produce along with Radar’s Ted Field and Mike Weber. Darren Lemke will also executive produce, with Jordan’s widow Harriet McDougal serving as consulting producer." —*Variety*

The Wheel of Time**®**
New Spring: The Novel
#1 The Eye of the World
#2 The Great Hunt
#3 The Dragon Reborn
#4 The Shadow Rising
#5 The Fires of Heaven
#6 Lord of Chaos
#7 A Crown of Swords
#8 The Path of Daggers
#9 Winter''s Heart
#10 Crossroads of Twilight
#11 Knife of Dreams

By Robert Jordan and Brandon Sanderson
#12 The Gathering Storm
#13 Towers of Midnight
#14 A Memory of Light', 'https://covers.openlibrary.org/b/id/182398-L.jpg', '1994-01-01', 'Disponible', 805.77, 39);
INSERT INTO public.libros VALUES (29, 3, 'The Big Four', 'Agatha Christie', 'They are a vicious international quartet of criminals known as "The Big Four". Number One was a brilliant Chinese, the greatest criminal brain of all time; Number Two was a USAmerican multi-millionaire; Number Three was a beautiful Frenchwoman scientist; and Number Four was "the destroyer," the ruthless murderer with a genius for disguise, whose business it was to remove those who interfered with his masters plans. These four, working together, is a partnership with one simple goal, establish world dominance with murders.

Belgian detective Hercule Poirot was preparing for a voyage to South America when an uninvited guest, coated from head to foot in mud, stood at his doorway, collapsed, then recovered long enough to scribble the number four on a piece of paper. Now, "The Big Four" pursues eliminate the only man who can foil them: Hercule Poirot. It''s up to Poirot and his faithful assistant Hastings to follow the clues and stop the deadly cabal from achieving its devastating end. But do they really avoid the Grim Reaper? In the most dangerous case of his career, the little detective will not be diverted by poison, a falling tree, electrocution, or a hit-and-run. Poirot appears to meet his end when a bomb explodes in his apartment. Hastings, devastated, vows to avenge him--but can he succeed without Poirot?', 'https://covers.openlibrary.org/b/id/12996529-L.jpg', '1927-01-01', 'Disponible', 863.94, 64);
INSERT INTO public.libros VALUES (11, 2, 'Death''s End (The Three-Body Problem Series Book 3)', '刘慈欣', 'Soon to be a Netflix Original Series!

“The War of the Worlds for the 21st century… packed with a sense of wonder.” – Wall Street Journal

The New York Times bestselling conclusion to a tour de force near-future adventure trilogy from China''s bestselling and beloved science fiction writer.

With The Three-Body Problem, English-speaking readers got their first chance to read China''s most beloved science fiction author, Cixin Liu. The Three-Body Problem was released to great acclaim including coverage in The New York Times and The Wall Street Journal and reading list picks by Barack Obama and Mark Zuckerberg. It was also won the Hugo and Nebula Awards, making it the first translated novel to win a major SF award.

Now this epic trilogy concludes with Death''s End. Half a century after the Doomsday Battle, the uneasy balance of Dark Forest Deterrence keeps the Trisolaran invaders at bay. Earth enjoys unprecedented prosperity due to the infusion of Trisolaran knowledge. With human science advancing daily and the Trisolarans adopting Earth culture, it seems that the two civilizations will soon be able to co-exist peacefully as equals without the terrible threat of mutually assured annihilation. But the peace has also made humanity complacent.

Cheng Xin, an aerospace engineer from the early twenty-first century, awakens from hibernation in this new age. She brings with her knowledge of a long-forgotten program dating from the beginning of the Trisolar Crisis, and her very presence may upset the delicate balance between two worlds. Will humanity reach for the stars or die in its cradle?', 'https://covers.openlibrary.org/b/id/7893958-L.jpg', '2010-01-01', 'Disponible', 599.74, 79);
INSERT INTO public.libros VALUES (18, 2, 'The Foundation Trilogy', 'Isaac Asimov', '- Foundation
 - Foundation and Empire
 - Second Foundation

Isaac Asimov''s Foundation novels are some of the great masterworks of science fiction. Unsurpassed for their unique blend of nonstop action, daring ideas, and extensive world-building, they chronicle the struggle of a courageous group of men and women working to preserve humanity’s light against an inexorable tide of darkness and violence.

Led by its founding father, the great psychohistorian Hari Seldon, and taking advantage of its superior science and technology, the Foundation has survived the greed and barbarism of its neighboring warrior-planets. Yet now it must face the Empire—still the mightiest force in the Galaxy even in its death throes. When an ambitious general determined to restore the Empire’s glory turns the vast imperial fleet toward the Foundation, the only hope for the small planet of scholars and scientists lies in the prophecies of Hari Seldon.

But not even Hari Seldon could have predicted the birth of the extraordinary creature called The Mule, a mutant intelligence with a power greater than a dozen battle fleets… a power that can turn the strongest-willed human into an obedient slave.', 'https://covers.openlibrary.org/b/id/6502517-L.jpg', '1950-01-01', 'Disponible', 451.01, 5);
INSERT INTO public.libros VALUES (16, 2, 'Roadside Picnic', 'Аркадий Стругацкий', '[Comment by Hari Kunru in The Guardian][1]:

> Soviet-era Russian science fiction deserves a wider audience in English. The Strugatsky brothers collaborated on numerous novels and stories, the best known of which is this, partly because it was filmed by Andrei Tarkovsky as Stalker, in 1977. The novel takes place 10 years after a mysterious alien visitation, which seems to have no rational explanation. No one saw the visitors. Their presence caused disease and blindness in the areas where they landed. Now, in the six "Zones", the laws of physics (and, seemingly, of reality) are disturbed by anomalies, and littered with inexplicable, deadly wreckage. Only a few brave "stalkers" risk their lives to enter the zones to gather alien artefacts for sale. Some of these artefacts offer the promise of extraordinary powers. Unlike Tarkovsky''s film, which concentrates on the hallucinatory, vacated landscape of the zones, the novels portray a society adapting to an inexplicable, terrifying event, an eruption of the unknown. Though written in 1971 and published in English in 1977, the novel was heavily bowdlerised by Soviet censors, and an authoritative text wasn''t available in Russian until 2000. It''s a book with an extraordinary atmosphere – and a demonstration of how science fiction, by using a single bold central metaphor, can open up the possibilities of the novel.

Original Title: Пикник на обочине


  [1]: http://www.guardian.co.uk/books/2011/may/14/science-fiction-authors-choice', 'https://covers.openlibrary.org/b/id/6752719-L.jpg', '1978-01-01', 'Disponible', 654.72, 45);
INSERT INTO public.libros VALUES (100, NULL, 'Miraculous World', 'ZAG', 'Presenta una trama intrigante donde los superhéroes Ladybug y Cat Noir se enfrentan a un universo paralelo donde la realidad que conocen se ve invertida. En este mundo alternativo, los portadores de los Prodigios de la mariquita y el gato son los villanos, mientras que el portador del Prodigio de la mariposa, usualmente un antagonista, emerge como el héroe. La película explora la complejidad de bien y mal en un contexto completamente nuevo y plantea un desafío distinto: ayudar a Hesperia a lograr que sus dobles oscuros abandonen el camino que eligieron.', 'https://www.youloveit.com/uploads/posts/2023-10/1697906114_youloveit_com_miraculous_world_paris_the_tales_of_shadybug_and_claw_noire_poster.jpg', '2026-09-16', NULL, 8000.00, 15);
INSERT INTO public.libros VALUES (39, 4, 'The Sweetest Oblivion', 'Danielle Lori', 'She’s a romantic at heart, living in the most unromantic of worlds . . .Nicknamed Sweet Abelli for her docile nature, Elena smiles on cue and has a charming response for everything. She’s the favored daughter, the perfect mafia principessa . . . or was.Now, all she can see in the mirror’s reflection is blood staining her hands like crimson paint.They say first impressions are everything . . .In the murky waters of New York’s underworld, Elena’s sister is arranged to marry Nicolas Russo. A Made Man, a boss, a cheat—even measured against mafia standards. His reputation stretches far and wide and is darker than his black suits and ties. After his and Elena’s first encounter ends with an accidental glare on her part, she realizes he’s just as rude as he is handsome.She doesn’t like the man or anything he stands for, though that doesn’t stop her heart from pattering like rain against glass when he’s near, nor the shiver that ghosts down her spine at the sound of his voice.And he’s always near. Telling her what to do. Making her feel hotter than any future brother-in-law should. Elena may be the Sweet Abelli on the outside, but she’s beginning to learn she has a taste for the darkness, for rough hands, cigarettes, and whiskey-colored eyes. Having already escaped one scandal, however, she can hardly afford to be swept up in another.Besides, even if he were hers, everyone knows you don’t fall in love with a Made Man . . . right?This is a standalone forbidden romance.', 'https://covers.openlibrary.org/b/id/10831263-L.jpg', '2018-01-01', 'Disponible', 498.87, 38);
INSERT INTO public.libros VALUES (82, 9, 'Alice in Wonderland in Five Acts', 'Lewis Carroll', 'A dramatization of Lewis Carroll''s work, Alice''s adventures in Wonderland.', 'https://covers.openlibrary.org/b/id/13805873-L.jpg', '1897-01-01', 'Disponible', 691.70, 82);


--
-- TOC entry 5069 (class 0 OID 16638)
-- Dependencies: 226
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orden VALUES (1, 1, '2026-10-16', 3853.15, 'Pendiente');
INSERT INTO public.orden VALUES (2, 1, '2026-10-16', 365.09, 'Pendiente');
INSERT INTO public.orden VALUES (4, 1, '2026-10-16', 430.54, 'Pendiente');
INSERT INTO public.orden VALUES (7, 1, '2026-10-16', 430.54, 'Pendiente');
INSERT INTO public.orden VALUES (8, 1, '2026-10-16', 430.54, 'Pendiente');
INSERT INTO public.orden VALUES (11, 1, '2026-10-16', 430.54, 'Pendiente');
INSERT INTO public.orden VALUES (13, 1, '2026-10-16', 854.18, 'Pendiente');
INSERT INTO public.orden VALUES (14, 1, '2026-10-16', 658.25, 'Pendiente');
INSERT INTO public.orden VALUES (16, 1, '2026-10-16', 369.28, 'Pendiente');
INSERT INTO public.orden VALUES (17, 1, '2026-10-16', 1105.73, 'Pendiente');
INSERT INTO public.orden VALUES (19, 1, '2026-10-16', 386.44, 'Pendiente');
INSERT INTO public.orden VALUES (5, 1, '2026-10-16', 430.54, 'Pagado');
INSERT INTO public.orden VALUES (10, 1, '2026-10-16', 430.54, 'Pagado');
INSERT INTO public.orden VALUES (15, 1, '2026-10-16', 701.93, 'Pagado');
INSERT INTO public.orden VALUES (3, 1, '2026-10-16', 430.54, 'Cancelado');
INSERT INTO public.orden VALUES (6, 1, '2026-10-16', 430.54, 'Cancelado');
INSERT INTO public.orden VALUES (9, 1, '2026-10-16', 430.54, 'Cancelado');
INSERT INTO public.orden VALUES (12, 1, '2026-10-16', 599.74, 'Cancelado');
INSERT INTO public.orden VALUES (18, 1, '2026-10-16', 888.08, 'Cancelado');
INSERT INTO public.orden VALUES (22, 1, '2026-11-10', 4286.22, 'Pendiente');
INSERT INTO public.orden VALUES (20, 1, '2026-11-04', 234.66, 'Pagado');
INSERT INTO public.orden VALUES (21, 1, '2026-11-04', 303.13, 'Cancelado');
INSERT INTO public.orden VALUES (23, 1, '2026-11-15', 2735.41, 'Pendiente');
INSERT INTO public.orden VALUES (24, 1, '2026-11-15', 4568.79, 'Pendiente');
INSERT INTO public.orden VALUES (25, 1, '2026-11-15', 4568.11, 'Pendiente');


--
-- TOC entry 5063 (class 0 OID 16534)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios VALUES (2, 'Naomi', 'naooan1@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'admin');
INSERT INTO public.usuarios VALUES (4, 'b', 'b@gmail.com', 'fc97330bc331ec07c935c1d14d90212ab9242fed24035cf7738e29b42c338366', 'user');
INSERT INTO public.usuarios VALUES (5, 'linda', 'linda@gmail.com', '0b9397d2ddbab8244a79e1c9cb4937ed70f775e6acc35552aaa9a1afc283f7ce', 'user');
INSERT INTO public.usuarios VALUES (3, 'a', 'a@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'empleado');
INSERT INTO public.usuarios VALUES (1, 'Naomi', 'naooan1936@gmail.com', '221ac0b9a46931792fb174416257dd3b0afb9a07fcde623eb6e6b07dcaff7111', 'user');


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 229
-- Name: carrito_id_carrito_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carrito_id_carrito_seq', 20, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 221
-- Name: categoria_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categoria_id_categoria_seq', 10, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 231
-- Name: detallecarrito_id_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.detallecarrito_id_detalle_seq', 38, true);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 227
-- Name: detalleorden_id_detalle_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.detalleorden_id_detalle_seq', 36, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 223
-- Name: libros_id_book_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.libros_id_book_seq', 102, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 225
-- Name: orden_id_orden_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orden_id_orden_seq', 25, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_user_seq', 9, true);


--
-- TOC entry 4906 (class 2606 OID 16713)
-- Name: carrito carrito_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id_carrito);


--
-- TOC entry 4898 (class 2606 OID 16555)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 4908 (class 2606 OID 16729)
-- Name: detallecarrito detallecarrito_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detallecarrito
    ADD CONSTRAINT detallecarrito_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 4904 (class 2606 OID 16666)
-- Name: detalleorden detalleorden_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalleorden
    ADD CONSTRAINT detalleorden_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 4900 (class 2606 OID 16631)
-- Name: libros libros_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id_book);


--
-- TOC entry 4902 (class 2606 OID 16648)
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id_orden);


--
-- TOC entry 4894 (class 2606 OID 16546)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4896 (class 2606 OID 16544)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4913 (class 2606 OID 16714)
-- Name: carrito fk_carrito_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT fk_carrito_user FOREIGN KEY (id_user) REFERENCES public.usuarios(id_user);


--
-- TOC entry 4914 (class 2606 OID 16745)
-- Name: detallecarrito fk_detalle_carrito; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detallecarrito
    ADD CONSTRAINT fk_detalle_carrito FOREIGN KEY (id_carrito) REFERENCES public.carrito(id_carrito);


--
-- TOC entry 4911 (class 2606 OID 16672)
-- Name: detalleorden fk_detalle_libros; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalleorden
    ADD CONSTRAINT fk_detalle_libros FOREIGN KEY (id_book) REFERENCES public.libros(id_book);


--
-- TOC entry 4912 (class 2606 OID 16667)
-- Name: detalleorden fk_detalle_orden; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detalleorden
    ADD CONSTRAINT fk_detalle_orden FOREIGN KEY (id_orden) REFERENCES public.orden(id_orden);


--
-- TOC entry 4909 (class 2606 OID 16632)
-- Name: libros fk_libro_categoria; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT fk_libro_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria);


--
-- TOC entry 4910 (class 2606 OID 16649)
-- Name: orden fk_orden_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT fk_orden_user FOREIGN KEY (id_user) REFERENCES public.usuarios(id_user);


-- Completed on 2026-11-16 09:52:13

--
-- PostgreSQL database dump complete
--

\unrestrict wEyzGebrx3jgr0VAi97JTLBO2UwZ4f4jFkwy8Z83Ve9uCDiWRMQPW5zJ8PSkXW3

