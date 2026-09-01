-- ----------------------------
-- Sequence structure for alokasi_detail_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."alokasi_detail_id_seq";
CREATE SEQUENCE "public"."alokasi_detail_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for alokasi_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."alokasi_id_seq";
CREATE SEQUENCE "public"."alokasi_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for audit_logs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."audit_logs_id_seq";
CREATE SEQUENCE "public"."audit_logs_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for item_inventory_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."item_inventory_id_seq";
CREATE SEQUENCE "public"."item_inventory_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for jenis_alkes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."jenis_alkes_id_seq";
CREATE SEQUENCE "public"."jenis_alkes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for kategori_alkes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."kategori_alkes_id_seq";
CREATE SEQUENCE "public"."kategori_alkes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for faskes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."faskes_id_seq";
CREATE SEQUENCE "public"."faskes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for migrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."migrations_id_seq";
CREATE SEQUENCE "public"."migrations_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for pengiriman_event_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pengiriman_event_id_seq";
CREATE SEQUENCE "public"."pengiriman_event_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for pengiriman_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pengiriman_id_seq";
CREATE SEQUENCE "public"."pengiriman_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for permissions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."permissions_id_seq";
CREATE SEQUENCE "public"."permissions_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tenaga_medis_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tenaga_medis_id_seq";
CREATE SEQUENCE "public"."tenaga_medis_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for pod_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pod_id_seq";
CREATE SEQUENCE "public"."pod_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."roles_id_seq";
CREATE SEQUENCE "public"."roles_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for unit_rawat_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."unit_rawat_id_seq";
CREATE SEQUENCE "public"."unit_rawat_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for ukuran_alkes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ukuran_alkes_id_seq";
CREATE SEQUENCE "public"."ukuran_alkes_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for alokasi
-- ----------------------------
DROP TABLE IF EXISTS "public"."alokasi";
CREATE TABLE "public"."alokasi" (
  "id" int8 NOT NULL DEFAULT nextval('alokasi_id_seq'::regclass),
  "nan" int8 NOT NULL,
  "unit_rawat_id" int8 NOT NULL,
  "periode" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "status" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT '1'::character varying,
  "created_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of alokasi
-- ----------------------------
INSERT INTO "public"."alokasi" VALUES (1, 1773094106712, 2, 'TA2026-SEM', '1', 1, '2026-03-10 05:09:59', '2026-03-10 05:09:59');
INSERT INTO "public"."alokasi" VALUES (2, 1773104311316, 5, 'TA2026-SW0', '1', 1, '2026-03-10 07:59:27', '2026-03-10 07:59:27');

-- ----------------------------
-- Table structure for alokasi_detail
-- ----------------------------
DROP TABLE IF EXISTS "public"."alokasi_detail";
CREATE TABLE "public"."alokasi_detail" (
  "id" int8 NOT NULL DEFAULT nextval('alokasi_detail_id_seq'::regclass),
  "alokasi_nan" int8 NOT NULL,
  "jenis" text COLLATE "pg_catalog"."default" NOT NULL,
  "ukuran" text COLLATE "pg_catalog"."default" NOT NULL,
  "kategori" text COLLATE "pg_catalog"."default" NOT NULL,
  "jumlah" int4 NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of alokasi_detail
-- ----------------------------
INSERT INTO "public"."alokasi_detail" VALUES (2, 1773094106712, '{"id":14,"name":"Alkes"}', '{"id":7,"name":"M"}', '{"id":1,"name":"Baju Dinas"}', 5, '2026-03-10 06:02:44', '2026-03-10 06:02:44');
INSERT INTO "public"."alokasi_detail" VALUES (3, 1773094106712, '{"id":14,"name":"Alkes"}', '{"id":6,"name":"L"}', '{"id":2,"name":"Atribut"}', 5, '2026-03-10 06:02:44', '2026-03-10 06:02:44');
INSERT INTO "public"."alokasi_detail" VALUES (8, 1773104311316, '{"id":12,"name":"PDU"}', '{"id":7,"name":"M"}', '{"id":1,"name":"Baju Dinas"}', 1, '2026-03-10 08:07:37', '2026-03-10 08:07:37');

-- ----------------------------
-- Table structure for audit_logs
-- ----------------------------
DROP TABLE IF EXISTS "public"."audit_logs";
CREATE TABLE "public"."audit_logs" (
  "id" int8 NOT NULL DEFAULT nextval('audit_logs_id_seq'::regclass),
  "user_id" int8,
  "action" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "model_type" varchar(255) COLLATE "pg_catalog"."default",
  "model_id" int8,
  "hash_before" varchar(255) COLLATE "pg_catalog"."default",
  "hash_after" varchar(255) COLLATE "pg_catalog"."default",
  "metadata" json,
  "ip_address" inet,
  "user_agent" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of audit_logs
-- ----------------------------
INSERT INTO "public"."audit_logs" VALUES (1, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-08 23:16:53');
INSERT INTO "public"."audit_logs" VALUES (2, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-08 23:18:10');
INSERT INTO "public"."audit_logs" VALUES (3, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-08 23:19:18');
INSERT INTO "public"."audit_logs" VALUES (4, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-08 23:19:33');
INSERT INTO "public"."audit_logs" VALUES (5, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-08 23:24:35');
INSERT INTO "public"."audit_logs" VALUES (6, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:13:15');
INSERT INTO "public"."audit_logs" VALUES (7, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:17:35');
INSERT INTO "public"."audit_logs" VALUES (8, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:21:20');
INSERT INTO "public"."audit_logs" VALUES (9, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:21:23');
INSERT INTO "public"."audit_logs" VALUES (10, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:21:29');
INSERT INTO "public"."audit_logs" VALUES (11, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:21:32');
INSERT INTO "public"."audit_logs" VALUES (12, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:21:36');
INSERT INTO "public"."audit_logs" VALUES (13, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 01:24:17');
INSERT INTO "public"."audit_logs" VALUES (14, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 02:57:43');
INSERT INTO "public"."audit_logs" VALUES (15, 1, 'updated', 'App\Models\User', 1, '2f0678086741c7d80dd1fd5beba19627afea6f4a00c17b56062f27faada88324', 'aeae7a7c4baec6c426367297f5c1aef26eeed2422c620ef14fa36317c9dcbd8e', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":null,"is_active":true,"last_login_at":null,"created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":null,"is_active":true,"last_login_at":"2026-03-09T22:05:34.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:05:34');
INSERT INTO "public"."audit_logs" VALUES (16, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:05:35');
INSERT INTO "public"."audit_logs" VALUES (17, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:05:40');
INSERT INTO "public"."audit_logs" VALUES (18, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:08:19');
INSERT INTO "public"."audit_logs" VALUES (19, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:08:23');
INSERT INTO "public"."audit_logs" VALUES (20, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:10:00');
INSERT INTO "public"."audit_logs" VALUES (21, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:10:16');
INSERT INTO "public"."audit_logs" VALUES (22, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:10:23');
INSERT INTO "public"."audit_logs" VALUES (23, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:10:24');
INSERT INTO "public"."audit_logs" VALUES (24, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:26:57');
INSERT INTO "public"."audit_logs" VALUES (25, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:27:05');
INSERT INTO "public"."audit_logs" VALUES (26, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:28:20');
INSERT INTO "public"."audit_logs" VALUES (27, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:35:13');
INSERT INTO "public"."audit_logs" VALUES (28, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:48:23');
INSERT INTO "public"."audit_logs" VALUES (29, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:48:26');
INSERT INTO "public"."audit_logs" VALUES (30, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:48:40');
INSERT INTO "public"."audit_logs" VALUES (31, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:12');
INSERT INTO "public"."audit_logs" VALUES (32, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:14');
INSERT INTO "public"."audit_logs" VALUES (33, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:27');
INSERT INTO "public"."audit_logs" VALUES (34, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:32');
INSERT INTO "public"."audit_logs" VALUES (35, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:48');
INSERT INTO "public"."audit_logs" VALUES (36, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:50');
INSERT INTO "public"."audit_logs" VALUES (37, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:50:52');
INSERT INTO "public"."audit_logs" VALUES (38, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:52:23');
INSERT INTO "public"."audit_logs" VALUES (39, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:52:26');
INSERT INTO "public"."audit_logs" VALUES (40, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 22:52:29');
INSERT INTO "public"."audit_logs" VALUES (41, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:21');
INSERT INTO "public"."audit_logs" VALUES (42, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:27');
INSERT INTO "public"."audit_logs" VALUES (43, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Edit Alokasi","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:45');
INSERT INTO "public"."audit_logs" VALUES (44, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:47');
INSERT INTO "public"."audit_logs" VALUES (45, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:48');
INSERT INTO "public"."audit_logs" VALUES (46, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-09 23:02:53');
INSERT INTO "public"."audit_logs" VALUES (47, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:32:26');
INSERT INTO "public"."audit_logs" VALUES (48, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:44:34');
INSERT INTO "public"."audit_logs" VALUES (49, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:52:53');
INSERT INTO "public"."audit_logs" VALUES (50, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:57:59');
INSERT INTO "public"."audit_logs" VALUES (51, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:58:25');
INSERT INTO "public"."audit_logs" VALUES (52, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:58:28');
INSERT INTO "public"."audit_logs" VALUES (53, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:59:28');
INSERT INTO "public"."audit_logs" VALUES (54, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 00:59:31');
INSERT INTO "public"."audit_logs" VALUES (55, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:01:55');
INSERT INTO "public"."audit_logs" VALUES (56, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Edit Alokasi","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:03:01');
INSERT INTO "public"."audit_logs" VALUES (57, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:03:04');
INSERT INTO "public"."audit_logs" VALUES (58, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:03:17');
INSERT INTO "public"."audit_logs" VALUES (59, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Edit Alokasi","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:07:38');
INSERT INTO "public"."audit_logs" VALUES (60, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:07:42');
INSERT INTO "public"."audit_logs" VALUES (61, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:08:00');
INSERT INTO "public"."audit_logs" VALUES (62, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:40:36');
INSERT INTO "public"."audit_logs" VALUES (63, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:40:50');
INSERT INTO "public"."audit_logs" VALUES (64, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:40:56');
INSERT INTO "public"."audit_logs" VALUES (65, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:12');
INSERT INTO "public"."audit_logs" VALUES (66, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:18');
INSERT INTO "public"."audit_logs" VALUES (67, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:33');
INSERT INTO "public"."audit_logs" VALUES (68, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:37');
INSERT INTO "public"."audit_logs" VALUES (69, 1, 'updated', 'App\Models\User', 1, 'aeae7a7c4baec6c426367297f5c1aef26eeed2422c620ef14fa36317c9dcbd8e', 'd358ca01f9e72f8eec55eb36b9055cf0587d394841fd2dabf1c6d4879a46c047', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":null,"is_active":true,"last_login_at":"2026-03-09T22:05:34.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-09T22:05:34.000000Z","created_by":null,"created_at":null},"changed":["id_tenaga_medis"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:48');
INSERT INTO "public"."audit_logs" VALUES (70, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:41:48');
INSERT INTO "public"."audit_logs" VALUES (71, 1, 'updated', 'App\Models\User', 1, 'd358ca01f9e72f8eec55eb36b9055cf0587d394841fd2dabf1c6d4879a46c047', 'f79c068f2b8248b21c24e885f653283163c789da4c5f3e0bbd7cce35a048f445', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-09T22:05:34.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T01:42:20.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:42:20');
INSERT INTO "public"."audit_logs" VALUES (72, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:42:21');
INSERT INTO "public"."audit_logs" VALUES (73, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:43:12');
INSERT INTO "public"."audit_logs" VALUES (74, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:43:19');
INSERT INTO "public"."audit_logs" VALUES (75, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:43:21');
INSERT INTO "public"."audit_logs" VALUES (76, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:44:05');
INSERT INTO "public"."audit_logs" VALUES (77, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:57:11');
INSERT INTO "public"."audit_logs" VALUES (78, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 01:59:59');
INSERT INTO "public"."audit_logs" VALUES (79, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:00:03');
INSERT INTO "public"."audit_logs" VALUES (80, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:01:45');
INSERT INTO "public"."audit_logs" VALUES (81, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:25:57');
INSERT INTO "public"."audit_logs" VALUES (82, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:34:34');
INSERT INTO "public"."audit_logs" VALUES (83, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:45:24');
INSERT INTO "public"."audit_logs" VALUES (84, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 02:49:23');
INSERT INTO "public"."audit_logs" VALUES (85, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:11:23');
INSERT INTO "public"."audit_logs" VALUES (86, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:11:31');
INSERT INTO "public"."audit_logs" VALUES (87, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:11:53');
INSERT INTO "public"."audit_logs" VALUES (88, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:12:06');
INSERT INTO "public"."audit_logs" VALUES (89, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:13:14');
INSERT INTO "public"."audit_logs" VALUES (90, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:13:21');
INSERT INTO "public"."audit_logs" VALUES (91, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:20:07');
INSERT INTO "public"."audit_logs" VALUES (92, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:38:55');
INSERT INTO "public"."audit_logs" VALUES (93, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:40:25');
INSERT INTO "public"."audit_logs" VALUES (94, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:41:56');
INSERT INTO "public"."audit_logs" VALUES (95, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 03:42:01');
INSERT INTO "public"."audit_logs" VALUES (96, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:06:54');
INSERT INTO "public"."audit_logs" VALUES (97, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:12:46');
INSERT INTO "public"."audit_logs" VALUES (98, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:22:33');
INSERT INTO "public"."audit_logs" VALUES (99, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:23:29');
INSERT INTO "public"."audit_logs" VALUES (100, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:23:32');
INSERT INTO "public"."audit_logs" VALUES (101, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:23:36');
INSERT INTO "public"."audit_logs" VALUES (102, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 04:54:50');
INSERT INTO "public"."audit_logs" VALUES (103, 1, 'updated', 'App\Models\User', 1, 'f79c068f2b8248b21c24e885f653283163c789da4c5f3e0bbd7cce35a048f445', '483dfe00c26bf6c881a4dc98615d82c282ea38566cb8a3d3252f3f756d32b254', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T01:42:20.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T16:07:52.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:07:54');
INSERT INTO "public"."audit_logs" VALUES (104, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:07:55');
INSERT INTO "public"."audit_logs" VALUES (105, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:08:02');
INSERT INTO "public"."audit_logs" VALUES (106, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:08:05');
INSERT INTO "public"."audit_logs" VALUES (107, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:25:16');
INSERT INTO "public"."audit_logs" VALUES (108, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:29:30');
INSERT INTO "public"."audit_logs" VALUES (109, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:29:42');
INSERT INTO "public"."audit_logs" VALUES (110, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:31:32');
INSERT INTO "public"."audit_logs" VALUES (111, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:44:12');
INSERT INTO "public"."audit_logs" VALUES (112, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:45:38');
INSERT INTO "public"."audit_logs" VALUES (113, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi Baru","url":"alokasibaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:45:42');
INSERT INTO "public"."audit_logs" VALUES (114, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:45:51');
INSERT INTO "public"."audit_logs" VALUES (115, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 16:51:17');
INSERT INTO "public"."audit_logs" VALUES (116, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 17:03:37');
INSERT INTO "public"."audit_logs" VALUES (117, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 17:04:04');
INSERT INTO "public"."audit_logs" VALUES (118, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 17:10:11');
INSERT INTO "public"."audit_logs" VALUES (119, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 17:20:18');
INSERT INTO "public"."audit_logs" VALUES (120, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 18:29:56');
INSERT INTO "public"."audit_logs" VALUES (121, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 18:43:10');
INSERT INTO "public"."audit_logs" VALUES (122, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 18:45:56');
INSERT INTO "public"."audit_logs" VALUES (123, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 18:51:56');
INSERT INTO "public"."audit_logs" VALUES (124, 1, 'updated', 'App\Models\User', 1, '483dfe00c26bf6c881a4dc98615d82c282ea38566cb8a3d3252f3f756d32b254', '8b98f316fc7f294a9138083ed2b6aea87c79e1c56ceba6e60209e43a6cfdbb56', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T16:07:52.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T21:55:42.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 21:55:46');
INSERT INTO "public"."audit_logs" VALUES (125, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 21:55:46');
INSERT INTO "public"."audit_logs" VALUES (126, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 21:55:51');
INSERT INTO "public"."audit_logs" VALUES (127, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 21:55:54');
INSERT INTO "public"."audit_logs" VALUES (128, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:06:38');
INSERT INTO "public"."audit_logs" VALUES (129, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:08:39');
INSERT INTO "public"."audit_logs" VALUES (130, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:09:14');
INSERT INTO "public"."audit_logs" VALUES (131, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:25:10');
INSERT INTO "public"."audit_logs" VALUES (132, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:25:46');
INSERT INTO "public"."audit_logs" VALUES (133, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:25:56');
INSERT INTO "public"."audit_logs" VALUES (134, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:26:31');
INSERT INTO "public"."audit_logs" VALUES (135, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:28:37');
INSERT INTO "public"."audit_logs" VALUES (136, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:28:43');
INSERT INTO "public"."audit_logs" VALUES (137, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:29:27');
INSERT INTO "public"."audit_logs" VALUES (138, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:34:03');
INSERT INTO "public"."audit_logs" VALUES (139, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:34:49');
INSERT INTO "public"."audit_logs" VALUES (140, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:36:58');
INSERT INTO "public"."audit_logs" VALUES (141, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:40:04');
INSERT INTO "public"."audit_logs" VALUES (142, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:45:10');
INSERT INTO "public"."audit_logs" VALUES (143, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:45:20');
INSERT INTO "public"."audit_logs" VALUES (144, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:45:29');
INSERT INTO "public"."audit_logs" VALUES (145, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:47:08');
INSERT INTO "public"."audit_logs" VALUES (146, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:47:28');
INSERT INTO "public"."audit_logs" VALUES (147, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-10 23:50:39');
INSERT INTO "public"."audit_logs" VALUES (148, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:00:15');
INSERT INTO "public"."audit_logs" VALUES (149, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:00:18');
INSERT INTO "public"."audit_logs" VALUES (150, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:02:31');
INSERT INTO "public"."audit_logs" VALUES (151, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:03:04');
INSERT INTO "public"."audit_logs" VALUES (152, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:13:41');
INSERT INTO "public"."audit_logs" VALUES (153, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:13:54');
INSERT INTO "public"."audit_logs" VALUES (154, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:16:50');
INSERT INTO "public"."audit_logs" VALUES (155, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:26:10');
INSERT INTO "public"."audit_logs" VALUES (156, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:27:39');
INSERT INTO "public"."audit_logs" VALUES (157, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:46:37');
INSERT INTO "public"."audit_logs" VALUES (158, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:46:45');
INSERT INTO "public"."audit_logs" VALUES (159, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:46:53');
INSERT INTO "public"."audit_logs" VALUES (160, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:47:44');
INSERT INTO "public"."audit_logs" VALUES (161, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:48:00');
INSERT INTO "public"."audit_logs" VALUES (162, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:49:23');
INSERT INTO "public"."audit_logs" VALUES (163, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:49:33');
INSERT INTO "public"."audit_logs" VALUES (164, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:49:37');
INSERT INTO "public"."audit_logs" VALUES (165, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:50:24');
INSERT INTO "public"."audit_logs" VALUES (166, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:51:04');
INSERT INTO "public"."audit_logs" VALUES (226, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:27:35');
INSERT INTO "public"."audit_logs" VALUES (167, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:51:20');
INSERT INTO "public"."audit_logs" VALUES (168, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:52:15');
INSERT INTO "public"."audit_logs" VALUES (169, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:52:54');
INSERT INTO "public"."audit_logs" VALUES (170, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:52:55');
INSERT INTO "public"."audit_logs" VALUES (171, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:53:02');
INSERT INTO "public"."audit_logs" VALUES (172, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:53:12');
INSERT INTO "public"."audit_logs" VALUES (173, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:56:33');
INSERT INTO "public"."audit_logs" VALUES (174, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:56:39');
INSERT INTO "public"."audit_logs" VALUES (175, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:59:33');
INSERT INTO "public"."audit_logs" VALUES (176, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:59:37');
INSERT INTO "public"."audit_logs" VALUES (177, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 00:59:48');
INSERT INTO "public"."audit_logs" VALUES (178, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:02:00');
INSERT INTO "public"."audit_logs" VALUES (179, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:04:53');
INSERT INTO "public"."audit_logs" VALUES (180, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:05:09');
INSERT INTO "public"."audit_logs" VALUES (181, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:05:18');
INSERT INTO "public"."audit_logs" VALUES (182, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:06:26');
INSERT INTO "public"."audit_logs" VALUES (183, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:06:40');
INSERT INTO "public"."audit_logs" VALUES (184, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:07:57');
INSERT INTO "public"."audit_logs" VALUES (185, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:09:22');
INSERT INTO "public"."audit_logs" VALUES (186, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:09:46');
INSERT INTO "public"."audit_logs" VALUES (187, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:10:24');
INSERT INTO "public"."audit_logs" VALUES (188, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:10:51');
INSERT INTO "public"."audit_logs" VALUES (189, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:02');
INSERT INTO "public"."audit_logs" VALUES (190, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:11');
INSERT INTO "public"."audit_logs" VALUES (191, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:27');
INSERT INTO "public"."audit_logs" VALUES (192, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:36');
INSERT INTO "public"."audit_logs" VALUES (193, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:48');
INSERT INTO "public"."audit_logs" VALUES (194, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:11:59');
INSERT INTO "public"."audit_logs" VALUES (195, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:13:01');
INSERT INTO "public"."audit_logs" VALUES (196, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:13:05');
INSERT INTO "public"."audit_logs" VALUES (197, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:13:21');
INSERT INTO "public"."audit_logs" VALUES (198, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:14:04');
INSERT INTO "public"."audit_logs" VALUES (199, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:14:41');
INSERT INTO "public"."audit_logs" VALUES (200, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:15:34');
INSERT INTO "public"."audit_logs" VALUES (201, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:15:46');
INSERT INTO "public"."audit_logs" VALUES (202, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:16:42');
INSERT INTO "public"."audit_logs" VALUES (203, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:17:35');
INSERT INTO "public"."audit_logs" VALUES (204, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:19:16');
INSERT INTO "public"."audit_logs" VALUES (205, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:21:07');
INSERT INTO "public"."audit_logs" VALUES (206, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:24:13');
INSERT INTO "public"."audit_logs" VALUES (207, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:24:42');
INSERT INTO "public"."audit_logs" VALUES (208, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:25:43');
INSERT INTO "public"."audit_logs" VALUES (209, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:25:59');
INSERT INTO "public"."audit_logs" VALUES (210, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:26:24');
INSERT INTO "public"."audit_logs" VALUES (211, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:26:36');
INSERT INTO "public"."audit_logs" VALUES (212, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:32:29');
INSERT INTO "public"."audit_logs" VALUES (213, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:33:25');
INSERT INTO "public"."audit_logs" VALUES (214, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:33:31');
INSERT INTO "public"."audit_logs" VALUES (215, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:33:43');
INSERT INTO "public"."audit_logs" VALUES (216, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 01:33:50');
INSERT INTO "public"."audit_logs" VALUES (217, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:03:45');
INSERT INTO "public"."audit_logs" VALUES (218, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:03:55');
INSERT INTO "public"."audit_logs" VALUES (219, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:03:58');
INSERT INTO "public"."audit_logs" VALUES (220, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:09:18');
INSERT INTO "public"."audit_logs" VALUES (221, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:21:48');
INSERT INTO "public"."audit_logs" VALUES (222, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:24:52');
INSERT INTO "public"."audit_logs" VALUES (223, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:26:48');
INSERT INTO "public"."audit_logs" VALUES (224, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:26:51');
INSERT INTO "public"."audit_logs" VALUES (225, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:27:32');
INSERT INTO "public"."audit_logs" VALUES (227, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:30:22');
INSERT INTO "public"."audit_logs" VALUES (228, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:30:38');
INSERT INTO "public"."audit_logs" VALUES (229, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:31:53');
INSERT INTO "public"."audit_logs" VALUES (230, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:44:50');
INSERT INTO "public"."audit_logs" VALUES (231, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:54:53');
INSERT INTO "public"."audit_logs" VALUES (232, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:56:07');
INSERT INTO "public"."audit_logs" VALUES (233, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:57:03');
INSERT INTO "public"."audit_logs" VALUES (234, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:57:10');
INSERT INTO "public"."audit_logs" VALUES (235, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:57:11');
INSERT INTO "public"."audit_logs" VALUES (236, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:57:12');
INSERT INTO "public"."audit_logs" VALUES (237, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:57:13');
INSERT INTO "public"."audit_logs" VALUES (238, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 02:59:59');
INSERT INTO "public"."audit_logs" VALUES (239, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Hapus Data Inventory","url":"registrasiitem-del"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:01:26');
INSERT INTO "public"."audit_logs" VALUES (240, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Hapus Data Inventory","url":"registrasiitem-del"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:01:40');
INSERT INTO "public"."audit_logs" VALUES (241, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:01:46');
INSERT INTO "public"."audit_logs" VALUES (242, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:02:01');
INSERT INTO "public"."audit_logs" VALUES (243, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:02:46');
INSERT INTO "public"."audit_logs" VALUES (244, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:07:31');
INSERT INTO "public"."audit_logs" VALUES (245, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:09:39');
INSERT INTO "public"."audit_logs" VALUES (246, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:10:08');
INSERT INTO "public"."audit_logs" VALUES (247, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:11:07');
INSERT INTO "public"."audit_logs" VALUES (248, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Inventory Baru","url":"registrasiitem-add"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:13:27');
INSERT INTO "public"."audit_logs" VALUES (249, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:13:52');
INSERT INTO "public"."audit_logs" VALUES (250, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:15:05');
INSERT INTO "public"."audit_logs" VALUES (251, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:23:48');
INSERT INTO "public"."audit_logs" VALUES (252, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:24:35');
INSERT INTO "public"."audit_logs" VALUES (253, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:24:54');
INSERT INTO "public"."audit_logs" VALUES (254, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:25:16');
INSERT INTO "public"."audit_logs" VALUES (255, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:28:02');
INSERT INTO "public"."audit_logs" VALUES (256, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:28:15');
INSERT INTO "public"."audit_logs" VALUES (257, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:28:26');
INSERT INTO "public"."audit_logs" VALUES (258, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:29:37');
INSERT INTO "public"."audit_logs" VALUES (259, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:29:47');
INSERT INTO "public"."audit_logs" VALUES (260, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:34:53');
INSERT INTO "public"."audit_logs" VALUES (261, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:35:57');
INSERT INTO "public"."audit_logs" VALUES (262, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:36:26');
INSERT INTO "public"."audit_logs" VALUES (263, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:36:31');
INSERT INTO "public"."audit_logs" VALUES (264, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:36:36');
INSERT INTO "public"."audit_logs" VALUES (265, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:36:40');
INSERT INTO "public"."audit_logs" VALUES (266, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:37:13');
INSERT INTO "public"."audit_logs" VALUES (267, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:37:15');
INSERT INTO "public"."audit_logs" VALUES (268, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:37:20');
INSERT INTO "public"."audit_logs" VALUES (269, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:38:10');
INSERT INTO "public"."audit_logs" VALUES (270, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:24');
INSERT INTO "public"."audit_logs" VALUES (271, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:43');
INSERT INTO "public"."audit_logs" VALUES (272, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:47');
INSERT INTO "public"."audit_logs" VALUES (273, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:49');
INSERT INTO "public"."audit_logs" VALUES (274, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:55');
INSERT INTO "public"."audit_logs" VALUES (275, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:39:59');
INSERT INTO "public"."audit_logs" VALUES (276, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:40:06');
INSERT INTO "public"."audit_logs" VALUES (277, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:43:44');
INSERT INTO "public"."audit_logs" VALUES (278, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:43:47');
INSERT INTO "public"."audit_logs" VALUES (279, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:43:49');
INSERT INTO "public"."audit_logs" VALUES (280, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:44:12');
INSERT INTO "public"."audit_logs" VALUES (281, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:44:14');
INSERT INTO "public"."audit_logs" VALUES (282, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:44:18');
INSERT INTO "public"."audit_logs" VALUES (283, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:44:24');
INSERT INTO "public"."audit_logs" VALUES (284, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:45:46');
INSERT INTO "public"."audit_logs" VALUES (285, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 03:46:09');
INSERT INTO "public"."audit_logs" VALUES (286, 1, 'updated', 'App\Models\User', 1, '8b98f316fc7f294a9138083ed2b6aea87c79e1c56ceba6e60209e43a6cfdbb56', 'd420286f74d63a2382f53877f657bace9bdfcec6228bf9560943664f87c2f012', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-10T21:55:42.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T17:36:45.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:36:46');
INSERT INTO "public"."audit_logs" VALUES (287, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:36:46');
INSERT INTO "public"."audit_logs" VALUES (288, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:36:52');
INSERT INTO "public"."audit_logs" VALUES (289, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:38:29');
INSERT INTO "public"."audit_logs" VALUES (290, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:39:15');
INSERT INTO "public"."audit_logs" VALUES (291, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:40:09');
INSERT INTO "public"."audit_logs" VALUES (292, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:43:28');
INSERT INTO "public"."audit_logs" VALUES (293, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 17:59:38');
INSERT INTO "public"."audit_logs" VALUES (294, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:00:37');
INSERT INTO "public"."audit_logs" VALUES (295, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:01:18');
INSERT INTO "public"."audit_logs" VALUES (296, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:01:32');
INSERT INTO "public"."audit_logs" VALUES (297, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:03:45');
INSERT INTO "public"."audit_logs" VALUES (298, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:10:30');
INSERT INTO "public"."audit_logs" VALUES (299, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:10:40');
INSERT INTO "public"."audit_logs" VALUES (300, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:10:50');
INSERT INTO "public"."audit_logs" VALUES (301, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:10:52');
INSERT INTO "public"."audit_logs" VALUES (302, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:11:38');
INSERT INTO "public"."audit_logs" VALUES (303, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:15:05');
INSERT INTO "public"."audit_logs" VALUES (304, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:21:12');
INSERT INTO "public"."audit_logs" VALUES (305, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:21:36');
INSERT INTO "public"."audit_logs" VALUES (306, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:22:03');
INSERT INTO "public"."audit_logs" VALUES (307, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:22:34');
INSERT INTO "public"."audit_logs" VALUES (308, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:23:28');
INSERT INTO "public"."audit_logs" VALUES (309, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:23:32');
INSERT INTO "public"."audit_logs" VALUES (310, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:27:28');
INSERT INTO "public"."audit_logs" VALUES (311, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:27:43');
INSERT INTO "public"."audit_logs" VALUES (312, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:28:22');
INSERT INTO "public"."audit_logs" VALUES (313, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:28:28');
INSERT INTO "public"."audit_logs" VALUES (314, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:28:36');
INSERT INTO "public"."audit_logs" VALUES (315, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:30:32');
INSERT INTO "public"."audit_logs" VALUES (316, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:30:37');
INSERT INTO "public"."audit_logs" VALUES (317, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:30:38');
INSERT INTO "public"."audit_logs" VALUES (318, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:31:19');
INSERT INTO "public"."audit_logs" VALUES (319, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:32:59');
INSERT INTO "public"."audit_logs" VALUES (320, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:33:03');
INSERT INTO "public"."audit_logs" VALUES (321, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:33:17');
INSERT INTO "public"."audit_logs" VALUES (322, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:33:56');
INSERT INTO "public"."audit_logs" VALUES (323, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:34:13');
INSERT INTO "public"."audit_logs" VALUES (324, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 18:34:20');
INSERT INTO "public"."audit_logs" VALUES (325, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:02:34');
INSERT INTO "public"."audit_logs" VALUES (326, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:02:47');
INSERT INTO "public"."audit_logs" VALUES (327, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:04:22');
INSERT INTO "public"."audit_logs" VALUES (328, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:08:02');
INSERT INTO "public"."audit_logs" VALUES (329, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:08:34');
INSERT INTO "public"."audit_logs" VALUES (330, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:10:04');
INSERT INTO "public"."audit_logs" VALUES (331, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:10:14');
INSERT INTO "public"."audit_logs" VALUES (332, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:14:06');
INSERT INTO "public"."audit_logs" VALUES (333, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:14:15');
INSERT INTO "public"."audit_logs" VALUES (334, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:14:32');
INSERT INTO "public"."audit_logs" VALUES (335, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:18:25');
INSERT INTO "public"."audit_logs" VALUES (336, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:28:07');
INSERT INTO "public"."audit_logs" VALUES (337, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:28:18');
INSERT INTO "public"."audit_logs" VALUES (338, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:32:51');
INSERT INTO "public"."audit_logs" VALUES (339, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:34:45');
INSERT INTO "public"."audit_logs" VALUES (340, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:34:54');
INSERT INTO "public"."audit_logs" VALUES (341, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:35:03');
INSERT INTO "public"."audit_logs" VALUES (342, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:35:16');
INSERT INTO "public"."audit_logs" VALUES (343, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:36:08');
INSERT INTO "public"."audit_logs" VALUES (344, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:37:05');
INSERT INTO "public"."audit_logs" VALUES (345, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:37:17');
INSERT INTO "public"."audit_logs" VALUES (346, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:37:57');
INSERT INTO "public"."audit_logs" VALUES (347, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:39:26');
INSERT INTO "public"."audit_logs" VALUES (348, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:58:48');
INSERT INTO "public"."audit_logs" VALUES (349, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:59:04');
INSERT INTO "public"."audit_logs" VALUES (350, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 19:59:46');
INSERT INTO "public"."audit_logs" VALUES (351, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:00:26');
INSERT INTO "public"."audit_logs" VALUES (352, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:01:23');
INSERT INTO "public"."audit_logs" VALUES (353, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:09:48');
INSERT INTO "public"."audit_logs" VALUES (354, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:10:24');
INSERT INTO "public"."audit_logs" VALUES (355, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:11:41');
INSERT INTO "public"."audit_logs" VALUES (356, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman baru berhasil dibuat","url":"pengiriman-store"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:11:59');
INSERT INTO "public"."audit_logs" VALUES (357, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman baru berhasil dibuat","url":"pengiriman-store"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:15:39');
INSERT INTO "public"."audit_logs" VALUES (358, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:21:18');
INSERT INTO "public"."audit_logs" VALUES (359, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:25:19');
INSERT INTO "public"."audit_logs" VALUES (360, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:25:48');
INSERT INTO "public"."audit_logs" VALUES (361, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:27:42');
INSERT INTO "public"."audit_logs" VALUES (362, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:28:27');
INSERT INTO "public"."audit_logs" VALUES (363, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:30:21');
INSERT INTO "public"."audit_logs" VALUES (364, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:30:43');
INSERT INTO "public"."audit_logs" VALUES (365, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman baru berhasil dibuat","url":"pengiriman-store"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:31:20');
INSERT INTO "public"."audit_logs" VALUES (366, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:32:24');
INSERT INTO "public"."audit_logs" VALUES (367, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:33:39');
INSERT INTO "public"."audit_logs" VALUES (368, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:33:41');
INSERT INTO "public"."audit_logs" VALUES (369, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:34:40');
INSERT INTO "public"."audit_logs" VALUES (370, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman baru berhasil dibuat","url":"pengiriman-store"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 20:35:16');
INSERT INTO "public"."audit_logs" VALUES (371, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:04:32');
INSERT INTO "public"."audit_logs" VALUES (372, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:06:31');
INSERT INTO "public"."audit_logs" VALUES (373, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:06:40');
INSERT INTO "public"."audit_logs" VALUES (374, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:06:57');
INSERT INTO "public"."audit_logs" VALUES (375, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:09:12');
INSERT INTO "public"."audit_logs" VALUES (376, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:18:48');
INSERT INTO "public"."audit_logs" VALUES (377, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:19:52');
INSERT INTO "public"."audit_logs" VALUES (378, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:21:22');
INSERT INTO "public"."audit_logs" VALUES (379, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:21:28');
INSERT INTO "public"."audit_logs" VALUES (380, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:41:45');
INSERT INTO "public"."audit_logs" VALUES (381, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:42:44');
INSERT INTO "public"."audit_logs" VALUES (382, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 21:44:08');
INSERT INTO "public"."audit_logs" VALUES (383, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:01:21');
INSERT INTO "public"."audit_logs" VALUES (384, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:01:35');
INSERT INTO "public"."audit_logs" VALUES (385, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:02:57');
INSERT INTO "public"."audit_logs" VALUES (386, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:03:32');
INSERT INTO "public"."audit_logs" VALUES (387, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:04:12');
INSERT INTO "public"."audit_logs" VALUES (388, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:04:33');
INSERT INTO "public"."audit_logs" VALUES (389, 1, 'updated', 'App\Models\User', 1, 'd420286f74d63a2382f53877f657bace9bdfcec6228bf9560943664f87c2f012', 'd420286f74d63a2382f53877f657bace9bdfcec6228bf9560943664f87c2f012', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T17:36:45.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T17:36:45.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:16:13');
INSERT INTO "public"."audit_logs" VALUES (390, 1, 'updated', 'App\Models\User', 1, 'd420286f74d63a2382f53877f657bace9bdfcec6228bf9560943664f87c2f012', '9093e558479b435fb8cfb8638fbee3ece412415a2a284359a82bf5f2e387931b', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T17:36:45.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T22:16:12.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:16:13');
INSERT INTO "public"."audit_logs" VALUES (391, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:16:13');
INSERT INTO "public"."audit_logs" VALUES (392, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:16:17');
INSERT INTO "public"."audit_logs" VALUES (393, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:16:42');
INSERT INTO "public"."audit_logs" VALUES (394, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:17:13');
INSERT INTO "public"."audit_logs" VALUES (395, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:17:29');
INSERT INTO "public"."audit_logs" VALUES (396, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Registrasi Item","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:17:44');
INSERT INTO "public"."audit_logs" VALUES (397, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:17:47');
INSERT INTO "public"."audit_logs" VALUES (398, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 22:17:56');
INSERT INTO "public"."audit_logs" VALUES (399, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Roadmap","url":"roadmap"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:18:02');
INSERT INTO "public"."audit_logs" VALUES (400, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0', '2026-03-11 22:18:16');
INSERT INTO "public"."audit_logs" VALUES (401, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 23:21:20');
INSERT INTO "public"."audit_logs" VALUES (402, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 23:36:22');
INSERT INTO "public"."audit_logs" VALUES (403, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 23:50:31');
INSERT INTO "public"."audit_logs" VALUES (404, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-11 23:55:24');
INSERT INTO "public"."audit_logs" VALUES (405, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:01:27');
INSERT INTO "public"."audit_logs" VALUES (406, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:29:03');
INSERT INTO "public"."audit_logs" VALUES (407, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:36:23');
INSERT INTO "public"."audit_logs" VALUES (408, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:36:48');
INSERT INTO "public"."audit_logs" VALUES (409, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:51:04');
INSERT INTO "public"."audit_logs" VALUES (410, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:51:11');
INSERT INTO "public"."audit_logs" VALUES (411, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:51:44');
INSERT INTO "public"."audit_logs" VALUES (412, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:52:08');
INSERT INTO "public"."audit_logs" VALUES (413, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:52:29');
INSERT INTO "public"."audit_logs" VALUES (414, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:53:07');
INSERT INTO "public"."audit_logs" VALUES (415, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:53:28');
INSERT INTO "public"."audit_logs" VALUES (416, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:57:26');
INSERT INTO "public"."audit_logs" VALUES (417, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 00:58:14');
INSERT INTO "public"."audit_logs" VALUES (418, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:06:42');
INSERT INTO "public"."audit_logs" VALUES (419, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:10:14');
INSERT INTO "public"."audit_logs" VALUES (420, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:10:20');
INSERT INTO "public"."audit_logs" VALUES (421, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:12:51');
INSERT INTO "public"."audit_logs" VALUES (422, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:13:10');
INSERT INTO "public"."audit_logs" VALUES (423, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:15:28');
INSERT INTO "public"."audit_logs" VALUES (424, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:16:04');
INSERT INTO "public"."audit_logs" VALUES (425, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:16:11');
INSERT INTO "public"."audit_logs" VALUES (426, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:16:59');
INSERT INTO "public"."audit_logs" VALUES (427, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:17:27');
INSERT INTO "public"."audit_logs" VALUES (428, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:18:15');
INSERT INTO "public"."audit_logs" VALUES (429, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:18:21');
INSERT INTO "public"."audit_logs" VALUES (430, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:18:46');
INSERT INTO "public"."audit_logs" VALUES (431, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:19:24');
INSERT INTO "public"."audit_logs" VALUES (432, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:19:37');
INSERT INTO "public"."audit_logs" VALUES (433, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:20:07');
INSERT INTO "public"."audit_logs" VALUES (434, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:20:07');
INSERT INTO "public"."audit_logs" VALUES (435, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 01:20:28');
INSERT INTO "public"."audit_logs" VALUES (436, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 02:07:10');
INSERT INTO "public"."audit_logs" VALUES (437, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 02:23:04');
INSERT INTO "public"."audit_logs" VALUES (438, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 02:23:08');
INSERT INTO "public"."audit_logs" VALUES (439, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 02:24:30');
INSERT INTO "public"."audit_logs" VALUES (440, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 02:50:45');
INSERT INTO "public"."audit_logs" VALUES (441, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:11:10');
INSERT INTO "public"."audit_logs" VALUES (442, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:33:10');
INSERT INTO "public"."audit_logs" VALUES (443, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:33:17');
INSERT INTO "public"."audit_logs" VALUES (444, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:33:49');
INSERT INTO "public"."audit_logs" VALUES (445, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:34:21');
INSERT INTO "public"."audit_logs" VALUES (446, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:35:26');
INSERT INTO "public"."audit_logs" VALUES (447, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:35:56');
INSERT INTO "public"."audit_logs" VALUES (448, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:36:03');
INSERT INTO "public"."audit_logs" VALUES (449, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:36:28');
INSERT INTO "public"."audit_logs" VALUES (450, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:44:20');
INSERT INTO "public"."audit_logs" VALUES (451, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:44:21');
INSERT INTO "public"."audit_logs" VALUES (452, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:45:06');
INSERT INTO "public"."audit_logs" VALUES (453, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:47:32');
INSERT INTO "public"."audit_logs" VALUES (454, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:48:20');
INSERT INTO "public"."audit_logs" VALUES (455, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:49:40');
INSERT INTO "public"."audit_logs" VALUES (456, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:55:17');
INSERT INTO "public"."audit_logs" VALUES (457, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:55:24');
INSERT INTO "public"."audit_logs" VALUES (458, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:55:34');
INSERT INTO "public"."audit_logs" VALUES (459, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Akses Manajemen Inventory Baru ","url":"registrasiitembaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:55:38');
INSERT INTO "public"."audit_logs" VALUES (460, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:55:55');
INSERT INTO "public"."audit_logs" VALUES (461, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 03:56:08');
INSERT INTO "public"."audit_logs" VALUES (462, 1, 'updated', 'App\Models\User', 1, '9093e558479b435fb8cfb8638fbee3ece412415a2a284359a82bf5f2e387931b', 'ac62cf911af5f6ed59f92b85553c82266c765e274b7976d15fb7f90b1af144fe', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-11T22:16:12.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-12T04:02:57.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:02:57');
INSERT INTO "public"."audit_logs" VALUES (463, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:02:59');
INSERT INTO "public"."audit_logs" VALUES (464, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:03:07');
INSERT INTO "public"."audit_logs" VALUES (465, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:03:22');
INSERT INTO "public"."audit_logs" VALUES (466, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:03:38');
INSERT INTO "public"."audit_logs" VALUES (467, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:03:54');
INSERT INTO "public"."audit_logs" VALUES (468, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:04:27');
INSERT INTO "public"."audit_logs" VALUES (469, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:04:35');
INSERT INTO "public"."audit_logs" VALUES (470, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:04:46');
INSERT INTO "public"."audit_logs" VALUES (471, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:05:06');
INSERT INTO "public"."audit_logs" VALUES (472, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:05:10');
INSERT INTO "public"."audit_logs" VALUES (473, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:05:19');
INSERT INTO "public"."audit_logs" VALUES (474, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:05:37');
INSERT INTO "public"."audit_logs" VALUES (475, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:06:08');
INSERT INTO "public"."audit_logs" VALUES (476, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:06:31');
INSERT INTO "public"."audit_logs" VALUES (477, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:06:35');
INSERT INTO "public"."audit_logs" VALUES (478, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:06:41');
INSERT INTO "public"."audit_logs" VALUES (479, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-12 04:06:53');
INSERT INTO "public"."audit_logs" VALUES (708, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:43');
INSERT INTO "public"."audit_logs" VALUES (480, 1, 'updated', 'App\Models\User', 1, 'ac62cf911af5f6ed59f92b85553c82266c765e274b7976d15fb7f90b1af144fe', 'd2691c3e116779546d887687dea50fd3292eafd071a78613d86d5cd7f795dd8e', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-12T04:02:57.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T00:06:39.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:06:43');
INSERT INTO "public"."audit_logs" VALUES (481, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:06:44');
INSERT INTO "public"."audit_logs" VALUES (482, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:07:01');
INSERT INTO "public"."audit_logs" VALUES (483, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:07:05');
INSERT INTO "public"."audit_logs" VALUES (484, 1, 'created', 'App\Models\User', 5, NULL, '580d46f300276a8a01d2071b6d91c6fbabc1ee7528cf5b79484b097179ee4734', '{"before":null,"after":{"username":"user1","email":"user1@mail.com","id_tenaga_medis":"4","is_active":true,"created_by":1,"created_at":"2026-03-13T00:19:47.000000Z","id":5},"changed":["username","email","password","id_tenaga_medis","is_active","created_by","updated_at","created_at","id"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:19:50');
INSERT INTO "public"."audit_logs" VALUES (485, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:19:56');
INSERT INTO "public"."audit_logs" VALUES (486, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:28:33');
INSERT INTO "public"."audit_logs" VALUES (487, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:28:57');
INSERT INTO "public"."audit_logs" VALUES (488, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:29:54');
INSERT INTO "public"."audit_logs" VALUES (489, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:30:02');
INSERT INTO "public"."audit_logs" VALUES (490, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:30:32');
INSERT INTO "public"."audit_logs" VALUES (491, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:30:42');
INSERT INTO "public"."audit_logs" VALUES (492, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:31:47');
INSERT INTO "public"."audit_logs" VALUES (493, 1, 'deleted', 'App\Models\User', 5, '16dba431d238ef722d2a2c6ee634fc7f453fb85b731b0b9bef3d5208b3ad04a2', '16dba431d238ef722d2a2c6ee634fc7f453fb85b731b0b9bef3d5208b3ad04a2', '{"before":{"id":5,"email":"user1@mail.com","email_verified_at":null,"username":"user1","id_tenaga_medis":"4","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T00:19:47.000000Z"},"after":{"id":5,"email":"user1@mail.com","email_verified_at":null,"username":"user1","id_tenaga_medis":"4","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T00:19:47.000000Z"},"changed":[]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:31:59');
INSERT INTO "public"."audit_logs" VALUES (494, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:04');
INSERT INTO "public"."audit_logs" VALUES (495, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:15');
INSERT INTO "public"."audit_logs" VALUES (496, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:20');
INSERT INTO "public"."audit_logs" VALUES (497, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:26');
INSERT INTO "public"."audit_logs" VALUES (498, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:47');
INSERT INTO "public"."audit_logs" VALUES (499, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:32:54');
INSERT INTO "public"."audit_logs" VALUES (500, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:33:57');
INSERT INTO "public"."audit_logs" VALUES (501, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:34:34');
INSERT INTO "public"."audit_logs" VALUES (502, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:39:09');
INSERT INTO "public"."audit_logs" VALUES (503, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:39:20');
INSERT INTO "public"."audit_logs" VALUES (504, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:40:30');
INSERT INTO "public"."audit_logs" VALUES (505, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:40:39');
INSERT INTO "public"."audit_logs" VALUES (506, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:42:30');
INSERT INTO "public"."audit_logs" VALUES (507, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:43:08');
INSERT INTO "public"."audit_logs" VALUES (508, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:47:41');
INSERT INTO "public"."audit_logs" VALUES (509, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:48:59');
INSERT INTO "public"."audit_logs" VALUES (510, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:49:17');
INSERT INTO "public"."audit_logs" VALUES (511, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:49:35');
INSERT INTO "public"."audit_logs" VALUES (512, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:50:43');
INSERT INTO "public"."audit_logs" VALUES (513, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 00:54:27');
INSERT INTO "public"."audit_logs" VALUES (514, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:02:06');
INSERT INTO "public"."audit_logs" VALUES (515, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:03:04');
INSERT INTO "public"."audit_logs" VALUES (516, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:06:01');
INSERT INTO "public"."audit_logs" VALUES (517, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:07:07');
INSERT INTO "public"."audit_logs" VALUES (518, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:07:10');
INSERT INTO "public"."audit_logs" VALUES (519, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:09:00');
INSERT INTO "public"."audit_logs" VALUES (520, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:09:42');
INSERT INTO "public"."audit_logs" VALUES (521, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:10:09');
INSERT INTO "public"."audit_logs" VALUES (522, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:10:17');
INSERT INTO "public"."audit_logs" VALUES (523, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:11:03');
INSERT INTO "public"."audit_logs" VALUES (524, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:11:40');
INSERT INTO "public"."audit_logs" VALUES (525, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:12:54');
INSERT INTO "public"."audit_logs" VALUES (526, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:13:35');
INSERT INTO "public"."audit_logs" VALUES (527, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:13:54');
INSERT INTO "public"."audit_logs" VALUES (528, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:14:38');
INSERT INTO "public"."audit_logs" VALUES (529, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:15:09');
INSERT INTO "public"."audit_logs" VALUES (530, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:15:53');
INSERT INTO "public"."audit_logs" VALUES (531, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:16:07');
INSERT INTO "public"."audit_logs" VALUES (532, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:16:07');
INSERT INTO "public"."audit_logs" VALUES (533, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:33:01');
INSERT INTO "public"."audit_logs" VALUES (534, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:33:39');
INSERT INTO "public"."audit_logs" VALUES (535, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:33:44');
INSERT INTO "public"."audit_logs" VALUES (536, 1, 'created', 'App\Models\User', 6, NULL, '92bd66b50de8091d01e9ee46ac9a3a791c0b3174bc05efcc4bdc1d0ecb90cc22', '{"before":null,"after":{"username":"User1","email":"User1@email.com","id_tenaga_medis":"4","is_active":true,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z","id":6},"changed":["username","email","password","id_tenaga_medis","is_active","created_by","updated_at","created_at","id"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:34:15');
INSERT INTO "public"."audit_logs" VALUES (537, 1, 'created', 'App\Models\User', 7, NULL, 'b317a89b41f62046aed10634ac4743aaa2d16258701a8eb7be8493cdd78dd181', '{"before":null,"after":{"username":"User2","email":"User2@email.com","id_tenaga_medis":"19","is_active":true,"created_by":1,"created_at":"2026-03-13T01:34:49.000000Z","id":7},"changed":["username","email","password","id_tenaga_medis","is_active","created_by","updated_at","created_at","id"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:34:52');
INSERT INTO "public"."audit_logs" VALUES (538, 1, 'created', 'App\Models\User', 8, NULL, 'eab7adf271564a26eef9f88e9f5b1abbc77100d631740836e03b73f04d95f728', '{"before":null,"after":{"username":"User3","email":"User3@email.com","id_tenaga_medis":"20","is_active":true,"created_by":1,"created_at":"2026-03-13T01:35:20.000000Z","id":8},"changed":["username","email","password","id_tenaga_medis","is_active","created_by","updated_at","created_at","id"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:35:24');
INSERT INTO "public"."audit_logs" VALUES (539, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:35:27');
INSERT INTO "public"."audit_logs" VALUES (540, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:35:46');
INSERT INTO "public"."audit_logs" VALUES (541, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:35:55');
INSERT INTO "public"."audit_logs" VALUES (542, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:35:58');
INSERT INTO "public"."audit_logs" VALUES (543, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:10');
INSERT INTO "public"."audit_logs" VALUES (544, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Tambah Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:22');
INSERT INTO "public"."audit_logs" VALUES (545, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:23');
INSERT INTO "public"."audit_logs" VALUES (546, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:27');
INSERT INTO "public"."audit_logs" VALUES (547, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:40');
INSERT INTO "public"."audit_logs" VALUES (548, 1, 'updated', 'App\Models\User', 6, 'ce13f264db633ebb4723463730dd068ccc1555b5364d9609c9f6a58048f4d17b', '1ff4d0c801d7df1202d8b82b48c367bda811dfc5a76867394edde1a8e8459dc3', '{"before":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"4","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"after":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"23","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"changed":["id_tenaga_medis"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:48');
INSERT INTO "public"."audit_logs" VALUES (549, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:49');
INSERT INTO "public"."audit_logs" VALUES (550, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:36:58');
INSERT INTO "public"."audit_logs" VALUES (551, 1, 'updated', 'App\Models\User', 6, '1ff4d0c801d7df1202d8b82b48c367bda811dfc5a76867394edde1a8e8459dc3', '6442d7dd03630dce4b7dce92945bac9ec2170c1fd99a1b0761a8dffe126677d8', '{"before":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"23","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"after":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"changed":["id_tenaga_medis"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:37:04');
INSERT INTO "public"."audit_logs" VALUES (552, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:37:04');
INSERT INTO "public"."audit_logs" VALUES (553, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:37:29');
INSERT INTO "public"."audit_logs" VALUES (554, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:37:43');
INSERT INTO "public"."audit_logs" VALUES (555, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:37:44');
INSERT INTO "public"."audit_logs" VALUES (556, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:38:28');
INSERT INTO "public"."audit_logs" VALUES (557, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:38:44');
INSERT INTO "public"."audit_logs" VALUES (558, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:42:41');
INSERT INTO "public"."audit_logs" VALUES (559, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:42:45');
INSERT INTO "public"."audit_logs" VALUES (560, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 01:44:02');
INSERT INTO "public"."audit_logs" VALUES (561, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:09:19');
INSERT INTO "public"."audit_logs" VALUES (562, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:09:36');
INSERT INTO "public"."audit_logs" VALUES (563, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman baru berhasil dibuat","url":"pengiriman-store"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:10:06');
INSERT INTO "public"."audit_logs" VALUES (564, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:10:15');
INSERT INTO "public"."audit_logs" VALUES (565, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:10:38');
INSERT INTO "public"."audit_logs" VALUES (566, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:12:07');
INSERT INTO "public"."audit_logs" VALUES (567, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:12:21');
INSERT INTO "public"."audit_logs" VALUES (568, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:12:30');
INSERT INTO "public"."audit_logs" VALUES (569, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:15:18');
INSERT INTO "public"."audit_logs" VALUES (570, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:15:29');
INSERT INTO "public"."audit_logs" VALUES (571, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:15:35');
INSERT INTO "public"."audit_logs" VALUES (572, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:15:40');
INSERT INTO "public"."audit_logs" VALUES (573, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:06');
INSERT INTO "public"."audit_logs" VALUES (574, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:13');
INSERT INTO "public"."audit_logs" VALUES (575, 1, 'updated', 'App\Models\User', 1, 'd2691c3e116779546d887687dea50fd3292eafd071a78613d86d5cd7f795dd8e', 'd2691c3e116779546d887687dea50fd3292eafd071a78613d86d5cd7f795dd8e', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T00:06:39.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T00:06:39.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:21');
INSERT INTO "public"."audit_logs" VALUES (576, 6, 'updated', 'App\Models\User', 6, '6442d7dd03630dce4b7dce92945bac9ec2170c1fd99a1b0761a8dffe126677d8', 'a515145097f43d1084d209c966c2aaf230b5f23a4db27c8b39b616bc1d331cee', '{"before":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"after":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":"2026-03-13T02:16:27.000000Z","created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:30');
INSERT INTO "public"."audit_logs" VALUES (577, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:32');
INSERT INTO "public"."audit_logs" VALUES (578, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 02:16:44');
INSERT INTO "public"."audit_logs" VALUES (579, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 03:23:33');
INSERT INTO "public"."audit_logs" VALUES (580, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 03:25:21');
INSERT INTO "public"."audit_logs" VALUES (581, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 03:25:43');
INSERT INTO "public"."audit_logs" VALUES (582, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 03:25:49');
INSERT INTO "public"."audit_logs" VALUES (583, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-13 03:43:28');
INSERT INTO "public"."audit_logs" VALUES (584, 1, 'updated', 'App\Models\User', 1, 'd2691c3e116779546d887687dea50fd3292eafd071a78613d86d5cd7f795dd8e', '5dfecad3284126daf30f1f0632167fc618158e2b5ed9b82aef1e3ad4f8b6f746', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T00:06:39.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T10:52:02.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:07');
INSERT INTO "public"."audit_logs" VALUES (585, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:08');
INSERT INTO "public"."audit_logs" VALUES (586, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:33');
INSERT INTO "public"."audit_logs" VALUES (587, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:40');
INSERT INTO "public"."audit_logs" VALUES (588, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:46');
INSERT INTO "public"."audit_logs" VALUES (589, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:52:51');
INSERT INTO "public"."audit_logs" VALUES (590, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:53:52');
INSERT INTO "public"."audit_logs" VALUES (591, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:54:02');
INSERT INTO "public"."audit_logs" VALUES (592, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:54:13');
INSERT INTO "public"."audit_logs" VALUES (593, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:54:17');
INSERT INTO "public"."audit_logs" VALUES (594, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:54:30');
INSERT INTO "public"."audit_logs" VALUES (595, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:54:41');
INSERT INTO "public"."audit_logs" VALUES (596, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:59:25');
INSERT INTO "public"."audit_logs" VALUES (597, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 10:59:29');
INSERT INTO "public"."audit_logs" VALUES (598, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:00:05');
INSERT INTO "public"."audit_logs" VALUES (599, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:00:17');
INSERT INTO "public"."audit_logs" VALUES (600, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:01:29');
INSERT INTO "public"."audit_logs" VALUES (601, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:02:40');
INSERT INTO "public"."audit_logs" VALUES (602, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:03:33');
INSERT INTO "public"."audit_logs" VALUES (603, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:04:22');
INSERT INTO "public"."audit_logs" VALUES (604, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:04:26');
INSERT INTO "public"."audit_logs" VALUES (605, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:04:42');
INSERT INTO "public"."audit_logs" VALUES (606, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:04:54');
INSERT INTO "public"."audit_logs" VALUES (607, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:07:13');
INSERT INTO "public"."audit_logs" VALUES (608, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:07:18');
INSERT INTO "public"."audit_logs" VALUES (609, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:07:24');
INSERT INTO "public"."audit_logs" VALUES (610, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:07:28');
INSERT INTO "public"."audit_logs" VALUES (611, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:08:21');
INSERT INTO "public"."audit_logs" VALUES (612, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:08:26');
INSERT INTO "public"."audit_logs" VALUES (613, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:11:19');
INSERT INTO "public"."audit_logs" VALUES (614, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:11:50');
INSERT INTO "public"."audit_logs" VALUES (615, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:12:03');
INSERT INTO "public"."audit_logs" VALUES (616, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:14:38');
INSERT INTO "public"."audit_logs" VALUES (617, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:15:00');
INSERT INTO "public"."audit_logs" VALUES (618, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:15:04');
INSERT INTO "public"."audit_logs" VALUES (619, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:15:07');
INSERT INTO "public"."audit_logs" VALUES (620, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:15:14');
INSERT INTO "public"."audit_logs" VALUES (621, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:15:33');
INSERT INTO "public"."audit_logs" VALUES (622, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:32:56');
INSERT INTO "public"."audit_logs" VALUES (623, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:52:59');
INSERT INTO "public"."audit_logs" VALUES (624, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:53:20');
INSERT INTO "public"."audit_logs" VALUES (625, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:53:24');
INSERT INTO "public"."audit_logs" VALUES (626, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:53:36');
INSERT INTO "public"."audit_logs" VALUES (627, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:53:49');
INSERT INTO "public"."audit_logs" VALUES (628, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 11:55:01');
INSERT INTO "public"."audit_logs" VALUES (629, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 12:05:47');
INSERT INTO "public"."audit_logs" VALUES (630, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 12:08:26');
INSERT INTO "public"."audit_logs" VALUES (631, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:06:15');
INSERT INTO "public"."audit_logs" VALUES (632, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:09:20');
INSERT INTO "public"."audit_logs" VALUES (633, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:10:06');
INSERT INTO "public"."audit_logs" VALUES (634, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:10:54');
INSERT INTO "public"."audit_logs" VALUES (635, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:11:06');
INSERT INTO "public"."audit_logs" VALUES (636, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:11:26');
INSERT INTO "public"."audit_logs" VALUES (637, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:12:55');
INSERT INTO "public"."audit_logs" VALUES (638, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:13:06');
INSERT INTO "public"."audit_logs" VALUES (639, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:17:29');
INSERT INTO "public"."audit_logs" VALUES (640, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:18:21');
INSERT INTO "public"."audit_logs" VALUES (641, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:18:22');
INSERT INTO "public"."audit_logs" VALUES (642, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:18:32');
INSERT INTO "public"."audit_logs" VALUES (643, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:18:41');
INSERT INTO "public"."audit_logs" VALUES (644, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:31:24');
INSERT INTO "public"."audit_logs" VALUES (645, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:34:44');
INSERT INTO "public"."audit_logs" VALUES (646, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:46:41');
INSERT INTO "public"."audit_logs" VALUES (647, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:47:22');
INSERT INTO "public"."audit_logs" VALUES (648, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:49:05');
INSERT INTO "public"."audit_logs" VALUES (649, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:51:12');
INSERT INTO "public"."audit_logs" VALUES (650, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:56:42');
INSERT INTO "public"."audit_logs" VALUES (651, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 13:59:35');
INSERT INTO "public"."audit_logs" VALUES (652, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:00:50');
INSERT INTO "public"."audit_logs" VALUES (653, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:01:32');
INSERT INTO "public"."audit_logs" VALUES (654, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:01:39');
INSERT INTO "public"."audit_logs" VALUES (655, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:01:45');
INSERT INTO "public"."audit_logs" VALUES (656, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Form Data TenagaMedis Baru","url":"datatenaga_medisbaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:02:02');
INSERT INTO "public"."audit_logs" VALUES (657, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:02:12');
INSERT INTO "public"."audit_logs" VALUES (658, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:03:04');
INSERT INTO "public"."audit_logs" VALUES (659, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:03:46');
INSERT INTO "public"."audit_logs" VALUES (660, 1, 'updated', 'App\Models\User', 1, '5dfecad3284126daf30f1f0632167fc618158e2b5ed9b82aef1e3ad4f8b6f746', '5dfecad3284126daf30f1f0632167fc618158e2b5ed9b82aef1e3ad4f8b6f746', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T10:52:02.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T10:52:02.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:03:55');
INSERT INTO "public"."audit_logs" VALUES (661, 6, 'updated', 'App\Models\User', 6, 'a515145097f43d1084d209c966c2aaf230b5f23a4db27c8b39b616bc1d331cee', '2e9c6e6e07fa4766fe26185d7e40d7fafef75dd6e150c6b04a0c0da8fc9539c6', '{"before":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":"2026-03-13T02:16:27.000000Z","created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"after":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":"2026-03-13T14:04:00.000000Z","created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:04:05');
INSERT INTO "public"."audit_logs" VALUES (662, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:04:05');
INSERT INTO "public"."audit_logs" VALUES (663, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:04:09');
INSERT INTO "public"."audit_logs" VALUES (664, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:06:47');
INSERT INTO "public"."audit_logs" VALUES (665, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:07:32');
INSERT INTO "public"."audit_logs" VALUES (666, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:20:08');
INSERT INTO "public"."audit_logs" VALUES (667, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:20:12');
INSERT INTO "public"."audit_logs" VALUES (668, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:20:38');
INSERT INTO "public"."audit_logs" VALUES (669, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 14:46:56');
INSERT INTO "public"."audit_logs" VALUES (670, 1, 'updated', 'App\Models\User', 1, '5dfecad3284126daf30f1f0632167fc618158e2b5ed9b82aef1e3ad4f8b6f746', '32c58bc3c665274a0b6c06733824430b3632d3d636dad60d79ec0df21fc6eca2', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T10:52:02.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T23:18:21.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:18:27');
INSERT INTO "public"."audit_logs" VALUES (671, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:18:28');
INSERT INTO "public"."audit_logs" VALUES (672, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:18:33');
INSERT INTO "public"."audit_logs" VALUES (673, 1, 'updated', 'App\Models\User', 1, '32c58bc3c665274a0b6c06733824430b3632d3d636dad60d79ec0df21fc6eca2', '32c58bc3c665274a0b6c06733824430b3632d3d636dad60d79ec0df21fc6eca2', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T23:18:21.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T23:18:21.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:34:48');
INSERT INTO "public"."audit_logs" VALUES (674, 6, 'updated', 'App\Models\User', 6, '2e9c6e6e07fa4766fe26185d7e40d7fafef75dd6e150c6b04a0c0da8fc9539c6', 'b1c27fd011d4b54eb81a74c691491470f12187a6b7368c6d00db27827d8e6d14', '{"before":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":"2026-03-13T14:04:00.000000Z","created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"after":{"id":6,"email":"User1@email.com","email_verified_at":null,"username":"User1","id_tenaga_medis":"22","is_active":true,"last_login_at":"2026-03-13T23:34:55.000000Z","created_by":1,"created_at":"2026-03-13T01:34:12.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:35:02');
INSERT INTO "public"."audit_logs" VALUES (675, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:35:02');
INSERT INTO "public"."audit_logs" VALUES (676, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:35:05');
INSERT INTO "public"."audit_logs" VALUES (677, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:38:30');
INSERT INTO "public"."audit_logs" VALUES (678, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-13 23:39:06');
INSERT INTO "public"."audit_logs" VALUES (679, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:03:12');
INSERT INTO "public"."audit_logs" VALUES (680, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:03:17');
INSERT INTO "public"."audit_logs" VALUES (681, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:03:31');
INSERT INTO "public"."audit_logs" VALUES (682, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:04:40');
INSERT INTO "public"."audit_logs" VALUES (683, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:04:49');
INSERT INTO "public"."audit_logs" VALUES (684, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Pengiriman event transit berhasil diproses","url":"received-transit"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:05:46');
INSERT INTO "public"."audit_logs" VALUES (685, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:07:07');
INSERT INTO "public"."audit_logs" VALUES (686, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:07:22');
INSERT INTO "public"."audit_logs" VALUES (687, 6, 'access_menu', 'App\Models\User', 6, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:08:14');
INSERT INTO "public"."audit_logs" VALUES (688, 7, 'updated', 'App\Models\User', 7, 'a9a0aa683f2650d94c90824f26fb2040540039b3f587ccb1b06bf0b7fa176edf', 'ebbc2fefc3bdb8001042e5ef1644995273c143b8a4c7aff639e378875c527519', '{"before":{"id":7,"email":"User2@email.com","email_verified_at":null,"username":"User2","id_tenaga_medis":"19","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:34:49.000000Z"},"after":{"id":7,"email":"User2@email.com","email_verified_at":null,"username":"User2","id_tenaga_medis":"19","is_active":true,"last_login_at":"2026-03-14T00:08:55.000000Z","created_by":1,"created_at":"2026-03-13T01:34:49.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:09:02');
INSERT INTO "public"."audit_logs" VALUES (689, 7, 'access_menu', 'App\Models\User', 7, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:09:02');
INSERT INTO "public"."audit_logs" VALUES (690, 7, 'access_menu', 'App\Models\User', 7, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:09:05');
INSERT INTO "public"."audit_logs" VALUES (691, 7, 'access_menu', 'App\Models\User', 7, NULL, NULL, '{"menu":"Pengiriman event transit berhasil diproses","url":"received-transit"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:09:23');
INSERT INTO "public"."audit_logs" VALUES (692, 1, 'updated', 'App\Models\User', 1, '32c58bc3c665274a0b6c06733824430b3632d3d636dad60d79ec0df21fc6eca2', '0f146ccdfcaf75eeeb1ffa22fc47305134bd8bc644d3b909dcb2851736894c29', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-13T23:18:21.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:09:59.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:10:05');
INSERT INTO "public"."audit_logs" VALUES (693, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:10:06');
INSERT INTO "public"."audit_logs" VALUES (694, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:10:11');
INSERT INTO "public"."audit_logs" VALUES (695, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:12:43');
INSERT INTO "public"."audit_logs" VALUES (696, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:12:56');
INSERT INTO "public"."audit_logs" VALUES (697, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:42:14');
INSERT INTO "public"."audit_logs" VALUES (698, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data TenagaMedis","url":"datatenaga_medis"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:42:29');
INSERT INTO "public"."audit_logs" VALUES (699, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:42:34');
INSERT INTO "public"."audit_logs" VALUES (700, 1, 'updated', 'App\Models\User', 1, '0f146ccdfcaf75eeeb1ffa22fc47305134bd8bc644d3b909dcb2851736894c29', '0f146ccdfcaf75eeeb1ffa22fc47305134bd8bc644d3b909dcb2851736894c29', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:09:59.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:09:59.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:42:55');
INSERT INTO "public"."audit_logs" VALUES (701, 8, 'updated', 'App\Models\User', 8, '2b976968198f2443b5eeb546d9ae5d91841f9264a27152df55e6470e7ccf641f', '7db68ead401a6947d2b81b9eb88c5b3e9015166134e51acd7d14529ad7ff0067', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":null,"created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T00:42:57.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:04');
INSERT INTO "public"."audit_logs" VALUES (702, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:04');
INSERT INTO "public"."audit_logs" VALUES (703, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Roadmap","url":"roadmap"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:10');
INSERT INTO "public"."audit_logs" VALUES (704, 1, 'updated', 'App\Models\User', 1, '0f146ccdfcaf75eeeb1ffa22fc47305134bd8bc644d3b909dcb2851736894c29', 'd25ce3874247cb1270dabd445e580151c9b5fea1a9aaf97cd3275a16353a5429', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:09:59.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:43:18.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:24');
INSERT INTO "public"."audit_logs" VALUES (705, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:25');
INSERT INTO "public"."audit_logs" VALUES (706, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:28');
INSERT INTO "public"."audit_logs" VALUES (707, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun Baru","url":"akunBaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:35');
INSERT INTO "public"."audit_logs" VALUES (709, 1, 'updated', 'App\Models\User', 1, 'd25ce3874247cb1270dabd445e580151c9b5fea1a9aaf97cd3275a16353a5429', 'd25ce3874247cb1270dabd445e580151c9b5fea1a9aaf97cd3275a16353a5429', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:43:18.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:43:18.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:43:52');
INSERT INTO "public"."audit_logs" VALUES (710, 8, 'updated', 'App\Models\User', 8, '7db68ead401a6947d2b81b9eb88c5b3e9015166134e51acd7d14529ad7ff0067', '6282f811d6e7666f37970a902f71139dd087e81c84f91f5544726eef71432e9d', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T00:42:57.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T00:43:55.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:44:01');
INSERT INTO "public"."audit_logs" VALUES (711, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:44:01');
INSERT INTO "public"."audit_logs" VALUES (712, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 00:44:05');
INSERT INTO "public"."audit_logs" VALUES (713, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:12:13');
INSERT INTO "public"."audit_logs" VALUES (714, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:13:26');
INSERT INTO "public"."audit_logs" VALUES (715, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:13:46');
INSERT INTO "public"."audit_logs" VALUES (716, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:14:47');
INSERT INTO "public"."audit_logs" VALUES (717, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:14:51');
INSERT INTO "public"."audit_logs" VALUES (718, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:16:04');
INSERT INTO "public"."audit_logs" VALUES (719, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:16:06');
INSERT INTO "public"."audit_logs" VALUES (720, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:16:19');
INSERT INTO "public"."audit_logs" VALUES (721, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:23:02');
INSERT INTO "public"."audit_logs" VALUES (722, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:24:33');
INSERT INTO "public"."audit_logs" VALUES (723, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:25:28');
INSERT INTO "public"."audit_logs" VALUES (724, 1, 'updated', 'App\Models\User', 1, 'd25ce3874247cb1270dabd445e580151c9b5fea1a9aaf97cd3275a16353a5429', 'a445d50c4f7bd7a0c8ff02facb82ebdef8eb72a5fb639a272194cd18e99528bb', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T00:43:18.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T02:27:43.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:27:49');
INSERT INTO "public"."audit_logs" VALUES (725, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:27:50');
INSERT INTO "public"."audit_logs" VALUES (726, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:27:53');
INSERT INTO "public"."audit_logs" VALUES (727, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:27:57');
INSERT INTO "public"."audit_logs" VALUES (728, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:28:02');
INSERT INTO "public"."audit_logs" VALUES (729, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:29:35');
INSERT INTO "public"."audit_logs" VALUES (730, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:29:47');
INSERT INTO "public"."audit_logs" VALUES (731, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:30:09');
INSERT INTO "public"."audit_logs" VALUES (732, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:37:23');
INSERT INTO "public"."audit_logs" VALUES (733, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:42:06');
INSERT INTO "public"."audit_logs" VALUES (734, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:42:12');
INSERT INTO "public"."audit_logs" VALUES (735, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:42:24');
INSERT INTO "public"."audit_logs" VALUES (736, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:45:05');
INSERT INTO "public"."audit_logs" VALUES (737, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:45:15');
INSERT INTO "public"."audit_logs" VALUES (738, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:46:45');
INSERT INTO "public"."audit_logs" VALUES (739, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:47:05');
INSERT INTO "public"."audit_logs" VALUES (740, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:47:47');
INSERT INTO "public"."audit_logs" VALUES (741, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:47:51');
INSERT INTO "public"."audit_logs" VALUES (742, 1, 'updated', 'App\Models\User', 1, 'a445d50c4f7bd7a0c8ff02facb82ebdef8eb72a5fb639a272194cd18e99528bb', 'a445d50c4f7bd7a0c8ff02facb82ebdef8eb72a5fb639a272194cd18e99528bb', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T02:27:43.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T02:27:43.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:47:54');
INSERT INTO "public"."audit_logs" VALUES (743, 8, 'updated', 'App\Models\User', 8, '6282f811d6e7666f37970a902f71139dd087e81c84f91f5544726eef71432e9d', 'f857287d032fa328bd102b2f4fc7e23be99a98c764fb08fba6d8dc6fa5647d11', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T00:43:55.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T02:47:55.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:48:02');
INSERT INTO "public"."audit_logs" VALUES (744, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:48:03');
INSERT INTO "public"."audit_logs" VALUES (745, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:48:09');
INSERT INTO "public"."audit_logs" VALUES (746, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:48:20');
INSERT INTO "public"."audit_logs" VALUES (747, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:51:30');
INSERT INTO "public"."audit_logs" VALUES (748, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 02:51:56');
INSERT INTO "public"."audit_logs" VALUES (749, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:26:34');
INSERT INTO "public"."audit_logs" VALUES (750, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:26:45');
INSERT INTO "public"."audit_logs" VALUES (751, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:26:52');
INSERT INTO "public"."audit_logs" VALUES (752, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:27:00');
INSERT INTO "public"."audit_logs" VALUES (753, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:27:08');
INSERT INTO "public"."audit_logs" VALUES (754, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:27:20');
INSERT INTO "public"."audit_logs" VALUES (755, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Pengiriman event tiba berhasil diproses","url":"rekon-confirm-received"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:27:48');
INSERT INTO "public"."audit_logs" VALUES (756, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:27:49');
INSERT INTO "public"."audit_logs" VALUES (757, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:30:44');
INSERT INTO "public"."audit_logs" VALUES (758, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:30:46');
INSERT INTO "public"."audit_logs" VALUES (759, 1, 'updated', 'App\Models\User', 1, 'a445d50c4f7bd7a0c8ff02facb82ebdef8eb72a5fb639a272194cd18e99528bb', 'c08f176aa77a73c639bea79421784c8d10f2e67f4d07bbedc762e1ec624818af', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T02:27:43.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T03:41:14.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:41:21');
INSERT INTO "public"."audit_logs" VALUES (760, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:41:21');
INSERT INTO "public"."audit_logs" VALUES (761, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:41:25');
INSERT INTO "public"."audit_logs" VALUES (762, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:41:42');
INSERT INTO "public"."audit_logs" VALUES (763, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:43:50');
INSERT INTO "public"."audit_logs" VALUES (764, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:46:58');
INSERT INTO "public"."audit_logs" VALUES (765, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:47:06');
INSERT INTO "public"."audit_logs" VALUES (766, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:49:44');
INSERT INTO "public"."audit_logs" VALUES (767, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:49:52');
INSERT INTO "public"."audit_logs" VALUES (768, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:49:56');
INSERT INTO "public"."audit_logs" VALUES (769, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:50:08');
INSERT INTO "public"."audit_logs" VALUES (770, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:53:38');
INSERT INTO "public"."audit_logs" VALUES (771, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:54:18');
INSERT INTO "public"."audit_logs" VALUES (772, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:55:00');
INSERT INTO "public"."audit_logs" VALUES (773, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:55:04');
INSERT INTO "public"."audit_logs" VALUES (774, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:58:17');
INSERT INTO "public"."audit_logs" VALUES (775, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:58:30');
INSERT INTO "public"."audit_logs" VALUES (776, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Rekonsiliasi Penerimaan","url":"rekon-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:59:38');
INSERT INTO "public"."audit_logs" VALUES (777, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 03:59:39');
INSERT INTO "public"."audit_logs" VALUES (778, 1, 'updated', 'App\Models\User', 1, 'c08f176aa77a73c639bea79421784c8d10f2e67f4d07bbedc762e1ec624818af', 'c08f176aa77a73c639bea79421784c8d10f2e67f4d07bbedc762e1ec624818af', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T03:41:14.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T03:41:14.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:00:00');
INSERT INTO "public"."audit_logs" VALUES (779, 8, 'updated', 'App\Models\User', 8, 'f857287d032fa328bd102b2f4fc7e23be99a98c764fb08fba6d8dc6fa5647d11', 'b285e133fd9c19e688004381a43ae2e63788ff81cd5308904a477d6be9b8014a', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T02:47:55.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T04:00:03.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:00:09');
INSERT INTO "public"."audit_logs" VALUES (780, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:00:10');
INSERT INTO "public"."audit_logs" VALUES (781, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:00:12');
INSERT INTO "public"."audit_logs" VALUES (782, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:09:54');
INSERT INTO "public"."audit_logs" VALUES (783, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:10:04');
INSERT INTO "public"."audit_logs" VALUES (784, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:12:26');
INSERT INTO "public"."audit_logs" VALUES (785, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:12:36');
INSERT INTO "public"."audit_logs" VALUES (786, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:12:39');
INSERT INTO "public"."audit_logs" VALUES (787, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:13:38');
INSERT INTO "public"."audit_logs" VALUES (788, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:15:55');
INSERT INTO "public"."audit_logs" VALUES (789, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:24:07');
INSERT INTO "public"."audit_logs" VALUES (790, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:37:16');
INSERT INTO "public"."audit_logs" VALUES (791, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:37:26');
INSERT INTO "public"."audit_logs" VALUES (792, 1, 'updated', 'App\Models\User', 1, 'c08f176aa77a73c639bea79421784c8d10f2e67f4d07bbedc762e1ec624818af', 'aa60c7a31f1e9d7ce3e23947347d999511813f5a8bf228cdac8836cc69f04dfb', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T03:41:14.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T04:38:54.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:39:00');
INSERT INTO "public"."audit_logs" VALUES (793, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:39:01');
INSERT INTO "public"."audit_logs" VALUES (794, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:39:03');
INSERT INTO "public"."audit_logs" VALUES (795, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:39:29');
INSERT INTO "public"."audit_logs" VALUES (796, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:40:45');
INSERT INTO "public"."audit_logs" VALUES (797, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:40:51');
INSERT INTO "public"."audit_logs" VALUES (798, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:40:54');
INSERT INTO "public"."audit_logs" VALUES (799, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:43:41');
INSERT INTO "public"."audit_logs" VALUES (800, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:45:02');
INSERT INTO "public"."audit_logs" VALUES (801, 1, 'updated', 'App\Models\User', 1, 'aa60c7a31f1e9d7ce3e23947347d999511813f5a8bf228cdac8836cc69f04dfb', 'aa60c7a31f1e9d7ce3e23947347d999511813f5a8bf228cdac8836cc69f04dfb', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T04:38:54.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T04:38:54.000000Z","created_by":null,"created_at":null},"changed":["remember_token"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:45:18');
INSERT INTO "public"."audit_logs" VALUES (802, 8, 'updated', 'App\Models\User', 8, 'b285e133fd9c19e688004381a43ae2e63788ff81cd5308904a477d6be9b8014a', 'db10a105419894626310acaa99ee69c10ae51eaee1c1a620efcc36be3f7371ec', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T04:00:03.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T04:45:21.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:45:27');
INSERT INTO "public"."audit_logs" VALUES (803, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:45:28');
INSERT INTO "public"."audit_logs" VALUES (804, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:45:30');
INSERT INTO "public"."audit_logs" VALUES (805, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:47:47');
INSERT INTO "public"."audit_logs" VALUES (806, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:50:16');
INSERT INTO "public"."audit_logs" VALUES (807, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:51:32');
INSERT INTO "public"."audit_logs" VALUES (808, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:53:27');
INSERT INTO "public"."audit_logs" VALUES (809, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:55:26');
INSERT INTO "public"."audit_logs" VALUES (810, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:56:16');
INSERT INTO "public"."audit_logs" VALUES (811, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:57:16');
INSERT INTO "public"."audit_logs" VALUES (812, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 04:57:22');
INSERT INTO "public"."audit_logs" VALUES (813, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:01:11');
INSERT INTO "public"."audit_logs" VALUES (814, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:01:25');
INSERT INTO "public"."audit_logs" VALUES (815, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran manifest berhasil diproses","url":"penyaluran-manifest-confirm-delivery"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:01:48');
INSERT INTO "public"."audit_logs" VALUES (816, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:01:48');
INSERT INTO "public"."audit_logs" VALUES (817, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:02:13');
INSERT INTO "public"."audit_logs" VALUES (818, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:02:31');
INSERT INTO "public"."audit_logs" VALUES (819, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:02:42');
INSERT INTO "public"."audit_logs" VALUES (820, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:02:44');
INSERT INTO "public"."audit_logs" VALUES (821, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:03:09');
INSERT INTO "public"."audit_logs" VALUES (822, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:03:33');
INSERT INTO "public"."audit_logs" VALUES (823, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:03:42');
INSERT INTO "public"."audit_logs" VALUES (824, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:03:44');
INSERT INTO "public"."audit_logs" VALUES (825, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 05:04:20');
INSERT INTO "public"."audit_logs" VALUES (826, 1, 'updated', 'App\Models\User', 1, 'aa60c7a31f1e9d7ce3e23947347d999511813f5a8bf228cdac8836cc69f04dfb', '2e3bf82bb1ecfe84588fb8aea3ebbe23d3bd6a853b202f8adbfa3f3a8fdb5253', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T04:38:54.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T12:14:08.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:14:09');
INSERT INTO "public"."audit_logs" VALUES (827, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:14:09');
INSERT INTO "public"."audit_logs" VALUES (828, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:14:14');
INSERT INTO "public"."audit_logs" VALUES (829, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:14:25');
INSERT INTO "public"."audit_logs" VALUES (830, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:14:35');
INSERT INTO "public"."audit_logs" VALUES (831, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:16:43');
INSERT INTO "public"."audit_logs" VALUES (832, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:18:17');
INSERT INTO "public"."audit_logs" VALUES (833, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:19:26');
INSERT INTO "public"."audit_logs" VALUES (834, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:19:50');
INSERT INTO "public"."audit_logs" VALUES (835, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:19:53');
INSERT INTO "public"."audit_logs" VALUES (836, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:21:31');
INSERT INTO "public"."audit_logs" VALUES (837, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:21:49');
INSERT INTO "public"."audit_logs" VALUES (838, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:25:10');
INSERT INTO "public"."audit_logs" VALUES (839, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:28:37');
INSERT INTO "public"."audit_logs" VALUES (840, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:28:53');
INSERT INTO "public"."audit_logs" VALUES (841, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:53:57');
INSERT INTO "public"."audit_logs" VALUES (842, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:55:49');
INSERT INTO "public"."audit_logs" VALUES (843, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 12:57:48');
INSERT INTO "public"."audit_logs" VALUES (844, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:01:19');
INSERT INTO "public"."audit_logs" VALUES (845, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:01:58');
INSERT INTO "public"."audit_logs" VALUES (846, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:02:35');
INSERT INTO "public"."audit_logs" VALUES (847, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:14:27');
INSERT INTO "public"."audit_logs" VALUES (848, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:15:25');
INSERT INTO "public"."audit_logs" VALUES (849, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:17:20');
INSERT INTO "public"."audit_logs" VALUES (850, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:23:57');
INSERT INTO "public"."audit_logs" VALUES (851, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:38:37');
INSERT INTO "public"."audit_logs" VALUES (852, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:38:42');
INSERT INTO "public"."audit_logs" VALUES (853, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:39:44');
INSERT INTO "public"."audit_logs" VALUES (854, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:44:59');
INSERT INTO "public"."audit_logs" VALUES (855, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:45:04');
INSERT INTO "public"."audit_logs" VALUES (856, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:59:30');
INSERT INTO "public"."audit_logs" VALUES (857, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 13:59:43');
INSERT INTO "public"."audit_logs" VALUES (858, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:00:22');
INSERT INTO "public"."audit_logs" VALUES (859, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:01:15');
INSERT INTO "public"."audit_logs" VALUES (860, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:02:54');
INSERT INTO "public"."audit_logs" VALUES (861, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:05:56');
INSERT INTO "public"."audit_logs" VALUES (862, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:06:00');
INSERT INTO "public"."audit_logs" VALUES (863, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:06:59');
INSERT INTO "public"."audit_logs" VALUES (864, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:07:03');
INSERT INTO "public"."audit_logs" VALUES (865, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:08:38');
INSERT INTO "public"."audit_logs" VALUES (866, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:12:24');
INSERT INTO "public"."audit_logs" VALUES (867, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:17:17');
INSERT INTO "public"."audit_logs" VALUES (868, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:17:26');
INSERT INTO "public"."audit_logs" VALUES (869, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:19:12');
INSERT INTO "public"."audit_logs" VALUES (870, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:23:42');
INSERT INTO "public"."audit_logs" VALUES (871, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:23:58');
INSERT INTO "public"."audit_logs" VALUES (872, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Alokasi","url":"alokasi"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:24:02');
INSERT INTO "public"."audit_logs" VALUES (873, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 14:35:04');
INSERT INTO "public"."audit_logs" VALUES (874, 8, 'updated', 'App\Models\User', 8, 'db10a105419894626310acaa99ee69c10ae51eaee1c1a620efcc36be3f7371ec', 'a1a96ca1b5ee48592c20c2e8c417236f7e0e1abaa8f8504f46abc9ebb43eecfb', '{"before":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T04:45:21.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"after":{"id":8,"email":"User3@email.com","email_verified_at":null,"username":"User3","id_tenaga_medis":"20","is_active":true,"last_login_at":"2026-03-14T21:07:19.000000Z","created_by":1,"created_at":"2026-03-13T01:35:20.000000Z"},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:07:21');
INSERT INTO "public"."audit_logs" VALUES (875, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:07:22');
INSERT INTO "public"."audit_logs" VALUES (876, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:07:32');
INSERT INTO "public"."audit_logs" VALUES (877, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:07:39');
INSERT INTO "public"."audit_logs" VALUES (878, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:24:15');
INSERT INTO "public"."audit_logs" VALUES (879, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:24:38');
INSERT INTO "public"."audit_logs" VALUES (880, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:25:32');
INSERT INTO "public"."audit_logs" VALUES (881, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:25:39');
INSERT INTO "public"."audit_logs" VALUES (882, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:25:44');
INSERT INTO "public"."audit_logs" VALUES (883, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:25:47');
INSERT INTO "public"."audit_logs" VALUES (884, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:25:51');
INSERT INTO "public"."audit_logs" VALUES (885, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:29:01');
INSERT INTO "public"."audit_logs" VALUES (886, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:29:08');
INSERT INTO "public"."audit_logs" VALUES (887, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:29:15');
INSERT INTO "public"."audit_logs" VALUES (888, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:30:08');
INSERT INTO "public"."audit_logs" VALUES (889, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:30:09');
INSERT INTO "public"."audit_logs" VALUES (890, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:30:39');
INSERT INTO "public"."audit_logs" VALUES (891, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:30:41');
INSERT INTO "public"."audit_logs" VALUES (892, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:31:28');
INSERT INTO "public"."audit_logs" VALUES (893, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:32:13');
INSERT INTO "public"."audit_logs" VALUES (894, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:33:31');
INSERT INTO "public"."audit_logs" VALUES (895, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:33:37');
INSERT INTO "public"."audit_logs" VALUES (896, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:37:52');
INSERT INTO "public"."audit_logs" VALUES (897, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:38:24');
INSERT INTO "public"."audit_logs" VALUES (898, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:38:40');
INSERT INTO "public"."audit_logs" VALUES (899, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:39:05');
INSERT INTO "public"."audit_logs" VALUES (900, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:41:28');
INSERT INTO "public"."audit_logs" VALUES (901, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:43:16');
INSERT INTO "public"."audit_logs" VALUES (902, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 21:43:40');
INSERT INTO "public"."audit_logs" VALUES (903, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 22:02:07');
INSERT INTO "public"."audit_logs" VALUES (904, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 22:03:01');
INSERT INTO "public"."audit_logs" VALUES (905, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 22:03:35');
INSERT INTO "public"."audit_logs" VALUES (906, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 22:49:58');
INSERT INTO "public"."audit_logs" VALUES (907, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:32:07');
INSERT INTO "public"."audit_logs" VALUES (908, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:42:09');
INSERT INTO "public"."audit_logs" VALUES (909, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:43:47');
INSERT INTO "public"."audit_logs" VALUES (910, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi penyerahan manifest berhasil diproses","url":"penyaluran-manifest-confirm-delivery"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:44:16');
INSERT INTO "public"."audit_logs" VALUES (911, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:46:27');
INSERT INTO "public"."audit_logs" VALUES (912, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:46:39');
INSERT INTO "public"."audit_logs" VALUES (913, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:47:16');
INSERT INTO "public"."audit_logs" VALUES (914, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi penyerahan manifest berhasil diproses","url":"penyaluran-manifest-confirm-delivery"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:47:50');
INSERT INTO "public"."audit_logs" VALUES (915, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:49:45');
INSERT INTO "public"."audit_logs" VALUES (916, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:51:00');
INSERT INTO "public"."audit_logs" VALUES (917, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:51:07');
INSERT INTO "public"."audit_logs" VALUES (918, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-14 23:52:54');
INSERT INTO "public"."audit_logs" VALUES (919, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:00:56');
INSERT INTO "public"."audit_logs" VALUES (920, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:03:16');
INSERT INTO "public"."audit_logs" VALUES (921, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:27:38');
INSERT INTO "public"."audit_logs" VALUES (922, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:30:28');
INSERT INTO "public"."audit_logs" VALUES (923, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:30:46');
INSERT INTO "public"."audit_logs" VALUES (924, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:33:01');
INSERT INTO "public"."audit_logs" VALUES (925, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:35:04');
INSERT INTO "public"."audit_logs" VALUES (926, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:36:09');
INSERT INTO "public"."audit_logs" VALUES (927, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:36:16');
INSERT INTO "public"."audit_logs" VALUES (928, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:36:38');
INSERT INTO "public"."audit_logs" VALUES (929, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:37:03');
INSERT INTO "public"."audit_logs" VALUES (930, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:37:08');
INSERT INTO "public"."audit_logs" VALUES (931, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:37:52');
INSERT INTO "public"."audit_logs" VALUES (932, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:38:00');
INSERT INTO "public"."audit_logs" VALUES (933, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:42:43');
INSERT INTO "public"."audit_logs" VALUES (934, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:43:22');
INSERT INTO "public"."audit_logs" VALUES (935, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:44:08');
INSERT INTO "public"."audit_logs" VALUES (936, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi penyerahan manifest berhasil diproses","url":"penyaluran-manifest-confirm-delivery"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:44:27');
INSERT INTO "public"."audit_logs" VALUES (937, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:44:32');
INSERT INTO "public"."audit_logs" VALUES (938, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:47:53');
INSERT INTO "public"."audit_logs" VALUES (939, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:48:21');
INSERT INTO "public"."audit_logs" VALUES (940, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penerimaan","url":"data-penerimaan"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:48:32');
INSERT INTO "public"."audit_logs" VALUES (941, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:53:51');
INSERT INTO "public"."audit_logs" VALUES (942, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:59:00');
INSERT INTO "public"."audit_logs" VALUES (943, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 00:59:29');
INSERT INTO "public"."audit_logs" VALUES (944, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:11:18');
INSERT INTO "public"."audit_logs" VALUES (945, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:11:56');
INSERT INTO "public"."audit_logs" VALUES (946, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:12:57');
INSERT INTO "public"."audit_logs" VALUES (947, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:13:09');
INSERT INTO "public"."audit_logs" VALUES (948, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:13:43');
INSERT INTO "public"."audit_logs" VALUES (949, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi penyerahan manifest berhasil diproses","url":"penyaluran-manifest-confirm-delivery"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:14:01');
INSERT INTO "public"."audit_logs" VALUES (950, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:14:05');
INSERT INTO "public"."audit_logs" VALUES (951, 8, 'access_menu', 'App\Models\User', 8, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:14:22');
INSERT INTO "public"."audit_logs" VALUES (952, 1, 'updated', 'App\Models\User', 1, '2e3bf82bb1ecfe84588fb8aea3ebbe23d3bd6a853b202f8adbfa3f3a8fdb5253', 'a6fccff9b4e516359723d5b08902fcf0247e612b4dd89444c146b362b478f277', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-14T12:14:08.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-15T01:14:54.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:14:56');
INSERT INTO "public"."audit_logs" VALUES (953, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:14:56');
INSERT INTO "public"."audit_logs" VALUES (954, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:01');
INSERT INTO "public"."audit_logs" VALUES (955, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:07');
INSERT INTO "public"."audit_logs" VALUES (956, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:15');
INSERT INTO "public"."audit_logs" VALUES (957, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:34');
INSERT INTO "public"."audit_logs" VALUES (958, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:44');
INSERT INTO "public"."audit_logs" VALUES (959, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:15:59');
INSERT INTO "public"."audit_logs" VALUES (960, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:27:30');
INSERT INTO "public"."audit_logs" VALUES (961, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:27:43');
INSERT INTO "public"."audit_logs" VALUES (962, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:27:54');
INSERT INTO "public"."audit_logs" VALUES (963, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:33:14');
INSERT INTO "public"."audit_logs" VALUES (964, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:34:00');
INSERT INTO "public"."audit_logs" VALUES (965, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:36:08');
INSERT INTO "public"."audit_logs" VALUES (966, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:36:09');
INSERT INTO "public"."audit_logs" VALUES (967, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:36:21');
INSERT INTO "public"."audit_logs" VALUES (968, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:36:57');
INSERT INTO "public"."audit_logs" VALUES (969, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:37:10');
INSERT INTO "public"."audit_logs" VALUES (970, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Inventory","url":"registrasiitem"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:39:20');
INSERT INTO "public"."audit_logs" VALUES (971, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:39:23');
INSERT INTO "public"."audit_logs" VALUES (972, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:39:26');
INSERT INTO "public"."audit_logs" VALUES (973, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:39:57');
INSERT INTO "public"."audit_logs" VALUES (974, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:40:20');
INSERT INTO "public"."audit_logs" VALUES (975, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:40:31');
INSERT INTO "public"."audit_logs" VALUES (976, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:43:07');
INSERT INTO "public"."audit_logs" VALUES (977, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:44:24');
INSERT INTO "public"."audit_logs" VALUES (978, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:46:30');
INSERT INTO "public"."audit_logs" VALUES (979, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:46:38');
INSERT INTO "public"."audit_logs" VALUES (980, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:46:45');
INSERT INTO "public"."audit_logs" VALUES (981, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:46:51');
INSERT INTO "public"."audit_logs" VALUES (982, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:47:02');
INSERT INTO "public"."audit_logs" VALUES (983, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:47:06');
INSERT INTO "public"."audit_logs" VALUES (984, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:48:33');
INSERT INTO "public"."audit_logs" VALUES (985, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:48:36');
INSERT INTO "public"."audit_logs" VALUES (986, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Akun","url":"dataakun"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:57:32');
INSERT INTO "public"."audit_logs" VALUES (987, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:57:38');
INSERT INTO "public"."audit_logs" VALUES (988, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 01:57:40');
INSERT INTO "public"."audit_logs" VALUES (989, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 02:04:01');
INSERT INTO "public"."audit_logs" VALUES (990, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 02:06:27');
INSERT INTO "public"."audit_logs" VALUES (991, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran","url":"datarole"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 02:09:26');
INSERT INTO "public"."audit_logs" VALUES (992, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Manajemen Peran Baru","url":"datarolebaru"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 02:09:30');
INSERT INTO "public"."audit_logs" VALUES (993, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Penyaluran (PoD)","url":"data-pod"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:26:38');
INSERT INTO "public"."audit_logs" VALUES (994, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Penyaluran Manifest (PoD)","url":"penyaluran-manifest"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:27:00');
INSERT INTO "public"."audit_logs" VALUES (995, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:27:16');
INSERT INTO "public"."audit_logs" VALUES (996, 1, 'updated', 'App\Models\User', 1, 'a6fccff9b4e516359723d5b08902fcf0247e612b4dd89444c146b362b478f277', '3c24aaa8f5bb23bdec6b6960db3847cfb2365fc8a67f38bd7f645a6ddc14ba75', '{"before":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-15T01:14:54.000000Z","created_by":null,"created_at":null},"after":{"id":1,"email":"syderbit182@gmail.com","email_verified_at":null,"username":"admin","id_tenaga_medis":"6","is_active":true,"last_login_at":"2026-03-15T03:30:06.000000Z","created_by":null,"created_at":null},"changed":["last_login_at"]}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:06');
INSERT INTO "public"."audit_logs" VALUES (997, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:07');
INSERT INTO "public"."audit_logs" VALUES (998, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Pengiriman Baru","url":"pengiriman-baru"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:14');
INSERT INTO "public"."audit_logs" VALUES (999, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:16');
INSERT INTO "public"."audit_logs" VALUES (1000, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Monitoring Pengiriman","url":"monitoring"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:22');
INSERT INTO "public"."audit_logs" VALUES (1001, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Konfirmasi Penerimaan","url":"received-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:30');
INSERT INTO "public"."audit_logs" VALUES (1002, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Data Pengiriman","url":"data-pengiriman"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:33');
INSERT INTO "public"."audit_logs" VALUES (1003, 1, 'access_menu', 'App\Models\User', 1, NULL, NULL, '{"menu":"Dashboard","url":"dashboard"}', '10.10.0.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-15 03:30:39');

-- ----------------------------
-- Table structure for item_inventory
-- ----------------------------
DROP TABLE IF EXISTS "public"."item_inventory";
CREATE TABLE "public"."item_inventory" (
  "id" int8 NOT NULL DEFAULT nextval('item_inventory_id_seq'::regclass),
  "id_detail_alokasi" int8,
  "nsn" int8 NOT NULL,
  "hash" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" int4 NOT NULL DEFAULT 0,
  "created_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of item_inventory
-- ----------------------------
INSERT INTO "public"."item_inventory" VALUES (1, 2, 1773185369783, 'd3f59fe70fc1897a826e96ee5bdb74b7a556a9e2d084770a59c90f4696ee4e63', 1, 1, '2026-03-11 06:29:50', '2026-03-11 06:29:50');
INSERT INTO "public"."item_inventory" VALUES (6, 2, 1773198741892, '5855e0799488bcee8b3e50149d5031fa279dde654cb2c5f8157bba90801a28f7', 1, 1, '2026-03-11 10:13:23', '2026-03-11 10:13:23');
INSERT INTO "public"."item_inventory" VALUES (4, 8, 1773198578573, 'd7b224aa933af392fc44fe9691eb89f9cae6c9e3dfecf6ce77d39b036310343a', 4, 1, '2026-03-11 10:10:04', '2026-03-15 08:13:59');

-- ----------------------------
-- Table structure for jenis_alkes
-- ----------------------------
DROP TABLE IF EXISTS "public"."jenis_alkes";
CREATE TABLE "public"."jenis_alkes" (
  "id" int8 NOT NULL DEFAULT nextval('jenis_alkes_id_seq'::regclass),
  "nama" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of jenis_alkes
-- ----------------------------
INSERT INTO "public"."jenis_alkes" VALUES (12, 'PDU', 't', '2026-03-06 09:00:28', '2026-03-06 09:00:28');
INSERT INTO "public"."jenis_alkes" VALUES (13, 'PDH', 't', '2026-03-06 09:05:35', '2026-03-06 09:05:35');
INSERT INTO "public"."jenis_alkes" VALUES (14, 'Alkes', 't', '2026-03-07 11:30:57', '2026-03-07 11:30:57');

-- ----------------------------
-- Table structure for kategori_alkes
-- ----------------------------
DROP TABLE IF EXISTS "public"."kategori_alkes";
CREATE TABLE "public"."kategori_alkes" (
  "id" int8 NOT NULL DEFAULT nextval('kategori_alkes_id_seq'::regclass),
  "nama" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of kategori_alkes
-- ----------------------------
INSERT INTO "public"."kategori_alkes" VALUES (1, 'Baju Dinas', 't', '2026-03-06 09:06:50', '2026-03-06 09:06:50');
INSERT INTO "public"."kategori_alkes" VALUES (2, 'Atribut', 't', '2026-03-06 09:19:13', '2026-03-06 09:19:13');
INSERT INTO "public"."kategori_alkes" VALUES (3, 'Sepatu', 't', '2026-03-06 09:19:19', '2026-03-06 09:19:19');

-- ----------------------------
-- Table structure for faskes
-- ----------------------------
DROP TABLE IF EXISTS "public"."faskes";
CREATE TABLE "public"."faskes" (
  "id" int8 NOT NULL DEFAULT nextval('faskes_id_seq'::regclass),
  "kode" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "nama" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of faskes
-- ----------------------------
INSERT INTO "public"."faskes" VALUES (1, '001-IM', 'Faskes Iskandar Muda', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (2, '002-BB', 'Faskes I/Bukit Barisan', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (3, '003-SR', 'Faskes II/Sriwijaya', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (4, '004-SL', 'Faskes III/Siliwangi', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (5, '005-DP', 'Faskes IV/Diponegoro', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (6, '006-BW', 'Faskes V/Brawijaya', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (7, '007-MW', 'Faskes VI/Mulawarman', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (8, '008-UD', 'Faskes IX/Udayana', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (9, '009-TP', 'Faskes XII/Tanjungpura', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (10, '010-MD', 'Faskes XIII/Merdeka', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (11, '011-HN', 'Faskes XIV/Hasanuddin', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (12, '012-PM', 'Faskes XVI/Pattimura', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (13, '013-CW', 'Faskes XVII/Cenderawasih', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (14, '014-KS', 'Faskes XVIII/Kasuari', '2026-03-09 06:15:57', '2026-03-09 06:15:57');
INSERT INTO "public"."faskes" VALUES (15, '015-JY', 'Faskes Jaya/Jayakarta', '2026-03-09 06:15:57', '2026-03-09 06:15:57');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."migrations";
CREATE TABLE "public"."migrations" (
  "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
  "migration" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "batch" int4 NOT NULL
)
;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO "public"."migrations" VALUES (1, '2026_02_20_003139_faskes', 1);
INSERT INTO "public"."migrations" VALUES (2, '2026_02_20_003140_unit_rawat', 1);
INSERT INTO "public"."migrations" VALUES (3, '2026_02_22_000000_create_users_table', 1);
INSERT INTO "public"."migrations" VALUES (4, '2026_02_23_002012_create_permission_tables', 1);
INSERT INTO "public"."migrations" VALUES (5, '2026_02_23_153127_create_audit_logs_table', 1);
INSERT INTO "public"."migrations" VALUES (6, '2026_03_01_194453_create_tenaga_medis', 1);
INSERT INTO "public"."migrations" VALUES (15, '2026_03_05_224722_jenis_alkes', 7);
INSERT INTO "public"."migrations" VALUES (16, '2026_03_06_071449_ukuran_alkes', 8);
INSERT INTO "public"."migrations" VALUES (17, '2026_03_06_071458_kategori_alkes', 8);
INSERT INTO "public"."migrations" VALUES (26, '2026_03_04_231524_created_alokasi', 9);
INSERT INTO "public"."migrations" VALUES (27, '2026_03_04_231535_created_alokasi_detail', 10);
INSERT INTO "public"."migrations" VALUES (33, '2026_03_09_084138_inventory_item', 11);
INSERT INTO "public"."migrations" VALUES (47, '2026_03_11_115156_pengiriman', 12);
INSERT INTO "public"."migrations" VALUES (48, '2026_03_15_060414_po_d', 13);

-- ----------------------------
-- Table structure for model_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."model_has_permissions";
CREATE TABLE "public"."model_has_permissions" (
  "permission_id" int8 NOT NULL,
  "model_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "model_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of model_has_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for model_has_roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."model_has_roles";
CREATE TABLE "public"."model_has_roles" (
  "role_id" int8 NOT NULL,
  "model_type" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "model_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of model_has_roles
-- ----------------------------
INSERT INTO "public"."model_has_roles" VALUES (1, 'App\Models\User', 1);

-- ----------------------------
-- Table structure for pengiriman
-- ----------------------------
DROP TABLE IF EXISTS "public"."pengiriman";
CREATE TABLE "public"."pengiriman" (
  "id" int8 NOT NULL DEFAULT nextval('pengiriman_id_seq'::regclass),
  "uid" int8 NOT NULL,
  "id_nan" int8,
  "hash" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of pengiriman
-- ----------------------------
INSERT INTO "public"."pengiriman" VALUES (7, 1773367777594, 1773104311316, '6a4eb76afa94e697f5f6e2de3100aea54cc99adf1c01b30900138ac240929c5c', 1, '2026-03-13 09:10:03', '2026-03-13 09:10:03');

-- ----------------------------
-- Table structure for pengiriman_event
-- ----------------------------
DROP TABLE IF EXISTS "public"."pengiriman_event";
CREATE TABLE "public"."pengiriman_event" (
  "id" int8 NOT NULL DEFAULT nextval('pengiriman_event_id_seq'::regclass),
  "pengiriman_id" int8 NOT NULL,
  "status" int4 NOT NULL DEFAULT 0,
  "note" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of pengiriman_event
-- ----------------------------
INSERT INTO "public"."pengiriman_event" VALUES (5, 7, 1, 'Initialized/Ready', 1, '2026-03-13 09:10:03', '2026-03-13 09:10:03');
INSERT INTO "public"."pengiriman_event" VALUES (7, 7, 2, 'In Transit', 7, '2026-03-14 07:09:17', '2026-03-14 07:09:17');
INSERT INTO "public"."pengiriman_event" VALUES (6, 7, 2, 'In Transit', 6, '2026-03-13 17:09:40', '2026-03-13 17:09:40');
INSERT INTO "public"."pengiriman_event" VALUES (8, 7, 3, 'Arrived / Verified', 8, '2026-03-14 10:27:42', '2026-03-14 10:27:42');
INSERT INTO "public"."pengiriman_event" VALUES (13, 7, 4, 'Delivered PoD', 8, '2026-03-15 08:13:59', '2026-03-15 08:13:59');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."permissions";
CREATE TABLE "public"."permissions" (
  "id" int8 NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "guard_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO "public"."permissions" VALUES (1, 'menu.alokasi', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (2, 'menu.alokasi.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (3, 'menu.alokasi.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (4, 'menu.alokasi.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (5, 'menu.tenaga_medis', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (6, 'menu.tenaga_medis.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (7, 'menu.tenaga_medis.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (8, 'menu.tenaga_medis.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (9, 'menu.dataakun', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (10, 'menu.dataakun.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (11, 'menu.dataakun.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (12, 'menu.dataakun.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (13, 'menu.dataakun.disaktif', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (14, 'menu.datarole', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (15, 'menu.datarole.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (16, 'menu.datarole.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (17, 'menu.datarole.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (18, 'menu.inventory', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (19, 'menu.inventory.dataitem', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (20, 'menu.inventory.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (21, 'menu.inventory.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (22, 'menu.inventory.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (23, 'menu.pengiriman', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (24, 'menu.pengiriman.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (25, 'menu.pengiriman.hapus', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (26, 'menu.pengiriman.edit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (27, 'menu.pengiriman.dataitem', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (28, 'menu.pengiriman.monitoring', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (29, 'menu.konfirmasi', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (30, 'menu.konfirmasi.transit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (31, 'menu.konfirmasi.tiba', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (32, 'menu.konfirmasi.dataitem', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (33, 'menu.distribusi', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (34, 'menu.distribusi.confirm', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (35, 'menu.distribusi.baru', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (36, 'system.manage_roles', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."permissions" VALUES (37, 'system.view_logs', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');

-- ----------------------------
-- Table structure for tenaga_medis
-- ----------------------------
DROP TABLE IF EXISTS "public"."tenaga_medis";
CREATE TABLE "public"."tenaga_medis" (
  "id" int8 NOT NULL DEFAULT nextval('tenaga_medis_id_seq'::regclass),
  "id_hash" char(64) COLLATE "pg_catalog"."default" NOT NULL,
  "data" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of tenaga_medis
-- ----------------------------
INSERT INTO "public"."tenaga_medis" VALUES (4, 'c93a573363db231c1445b42b016d275495995589324a2f785d775c50224dbc66', 'eyJpdiI6IkE2NzBTMnk4TDBOdFN4ZzlCdE1uTmc9PSIsInZhbHVlIjoiWklqSzhwN0ZkTXlZQ2hTL05ROUFRN1BmNVluNlBkaUJ3MzVyZmM1c2Fyb0ZlTUt2N2lycG15YWlNZnRyclI1SGo2Q0pMN01NMnRmVll0ejIxN2I5bzNpcld0TlM1MGZoaEVndE1vNFo0Z0tYRTBVajhaNHVNRXFsYVZzZ2IvUU9WN2IyTFdWaHFqK2tVbytwOC9iQ3ErZTd1UEphaE5uU2t4SkpuWEtrUEJjcEVzVnJvY2ZRSUlaSnpITHBWamwvVHYyR3lSbzBCSGRoTVg3bE1Xb2VwcjRnSk9MUlI3ZXlCdHYxTDlPQnVEZTBVNEUwYXZzNUlENmFvVFpNY1BWT2k1MUFKOHc5MmZGSy9wNmhoY29rb1cvWXF2dVZXZFdsbnNKTkFtTUM1Y2UycXZzNjdEclQrcEpLZEtnUFppZ1BnZUp2dCtiVldHaFBOR01OM3drRWlZS1NnTW55Y29BMG9GVHVDc1lLRnBjPSIsIm1hYyI6ImQ3MDI4MzBhMmYwZTQ3YWQ2MGQzYWYxOTY3YzA5OGZlOGNiYjg5MzA3NzM2NmRjODFhOTdlZTMyMzY1YzhjYmQiLCJ0YWciOiIifQ==', '2026-03-03 04:21:44', '2026-03-03 08:44:26');
INSERT INTO "public"."tenaga_medis" VALUES (6, 'a29010190c04dd279929af9d50cc0b3c88a80d895364d4752f700644b922eb94', 'eyJpdiI6IkltUVZwaWxKNnFScTh6VjBHM0FuMkE9PSIsInZhbHVlIjoiQ1AzOUw1azlDOUY4R0g3VzhjYnpVOVZHQ3JobVYzZHB6UzBwYm4xNmozYXR5dThDUlRJMUNQWFlNTm5pc2JqOHlUS0lheWJpSkhuQnNQZWdhVitidWRkZGxkNTZIVHNjL1FpN2dxNFNrQ1ZJaXFzaitFNkk0ekh4VEF6QWtERlJ6WTYxRGplaXZyNGJuU2ZTU3o0M1NZYWxVdmJuUWNIV3RQVmZwcGk0a0pPUVpRbHpzbGpIRXEyZWFnUjBDRzl3cXRyaFdaVWs0NExOZ1ZUdFFZWmt0TG00YjVxdDdndk9KWElDT1ZXSGJHd2hUanF6RGFDK1NSVXhLUmdtRHYwTENiQUs5MkdjdnNDcmxrQVQzbnRPWVkraE5RTkdwM2NRRUxlUzU2SzErVk09IiwibWFjIjoiYjA1NDYzMWQ2MTYxNTYyYzFmNjZjNDY2MmRjZTQ5ZGIzNjRjMTQ4YzcwMTEyNWFhNGU1ZjA1ZTY1ZjdhM2U0YiIsInRhZyI6IiJ9', '2026-03-04 20:09:39', '2026-03-04 20:11:00');
INSERT INTO "public"."tenaga_medis" VALUES (18, '68b9a8e945a29dfc0c4e3f1a3eeed635ac6391a0d4ff888a9b854514baa3ade0', 'eyJpdiI6IjdlV2xQK1h5dFh1VHltSVZ0VFUxbXc9PSIsInZhbHVlIjoiMFhxc1l1QTB2bjF3c2RCR1dFSlhZTW5rMFkwOFBFVFhndUJkcTVkT0pnVVNZYjRwa0ExMDZQRmUyR01OWTEza2VadExlbTkzcCtGNm9IVkx2QnhKNHcvZ2VIcld2ZGxGZk5zcEVIMkVVMmZZc1U2TWREcFpOK0VBSXRQcUh1akNVaWdjSUVCcnlRZHVlVys1S01UNkRSTFllWTFwRUgvc05qWEZLYjlML001SlhtVUlTaEN4bE9MOG9lU3Vudk5hSWxmZWxYb3JaVHc4U3RKOE9RSzZ3bk1Ldi84SjV1RFZZVXluNnE3bmFJMEdmZnNCbVd5VlRSVnFJakhKQVhieERlb1NDQXhwNHhMREVUdEEzaVN1Y0RZb1JtM3BzQ0Z4UjA4dmN6S25mV3Ftb2FGQVlFaG9sc2JDaDR3UFlHRDFmbTlZanErUC9GaG1SRVBlT1Nza2ZRNzBDdmRmVTVlaVRSUE5EZVVWQTdvPSIsIm1hYyI6ImQxYzcyYzNmMzY1ZmY1ODVjZjhkZjAxNTc1MWI5MzFiZDQ2MGI0YmRiZmNkOTljYzRhYjhiOTliZGMzY2Q4NjgiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (19, '2df510ae1ae0d99ad401ee1f9b998d671370d221496708326b90ae5c5f447580', 'eyJpdiI6ImZKSmJ4U0pVTHJOMzk3TXBHWVRwWlE9PSIsInZhbHVlIjoiR0diZUViMGJPM1hMQytaK29hdkZmTm1xVGx5WjdsUmNEcFBEYWhDVFdVVzRoSU5aTmthREZsSEI4MmJsQlp2bkM5WmVwN3FrRktFREVTck1XcUJud0lBMlpIeXFrcFE3NGxiSkM4c0UzZFFpeUdFenY1dGYxZitLemFBUENrbzhJeGZHRFhpLzA5b2ZMSGUySEQzcGIrNlYvQ0l1dDdxczd2UU5uaFYwZE5xNmZFN3hJa0doaUQ5dStrb2xtUW42OEVhbUppL0pEZEllZXM5bGppQ1FXcktjQkR3VGhndHFtK0hxQVllNnlGWDFtZCsxQnVSRzVqdWNoWitXZi9HeG1RenNsdlAvdzNXQW50bVBiZTdVakNjc0hZL1FjK3hNVHFuNkpRcU1UYnBuS29yVk5mL21vNTRka3FsVkJSWmVPZW4yQnE2a0taUU04andHdEdzRlhYOE1xNUpBUFlOWHlSMkoxL0wwRWlZPSIsIm1hYyI6Ijk1NTY1NDZjN2Q2YWZkMmMxMjQ2MzkxMzRlYzg5Njc2MDQ0YzgwZjM1MTA0OTY1M2Y4NGIzODkxMjA5NjAzZTgiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (21, '2e3d26eff23d6fb3741bdc383c5295ed5662863314da7c3629a9e0c84bb6e873', 'eyJpdiI6Im9FK1ZZaHpiQmFCeHB3bFZEeWJ6R1E9PSIsInZhbHVlIjoiUjU4d2k1VFVSalFjZkZFLzlWQjlFOWsxdXIzVmFodXg0RThoSUNEVWlQR2pDUmhkeG90OHpXU040blNBeHIweHlRMkptRkJYampqT3JlN3l3Z2ZBelA4aTg1ZUxLMUtuQ0tMZjFmUlI1Zy9SYUdtSnR3NHhHVUI2STVpYXFLeEptSzg2QkNwaW9nNWl0OXRxTnNhNUI0R2RmbngzQUxHQnFia2tiL1FxM1dpOGhWS3ltZ3ZoWFJGKzVaWHlZU3p5ajhTSjd3bFBCMTdOZHlwTWtKYnBpSmIxZU45QUt0dWJRR09lLy9lTkxHaUZkOXZ2d2NmRlR0a1EyZDVzdE9DZklOWnBjUkhSSERFUHNPNlpBaENON0l3MWlTYzJzNUJvNVJGcXNJUHA2ZE9qQW5vc0t2MFp5eXBGeUFPdjg3MjgvYnRPY3Rjc1dkcnFTc0UzeTlJeWF4RlBSQWpONjFmMER5V1dQOVd0YitRPSIsIm1hYyI6ImZjODU1NDY3NTAxNTZhZDE2NmI0YTczMjU1Nzc5ZjgxNTMzMzFjOThkMGYwOTM4ZDM2NTVmNzg1ZGE4YmQ0NzQiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (22, '02d403ef71cd960908728510c9dc33be11319d679a53d63fce2b5f04eaeb17eb', 'eyJpdiI6Im56RlIyMHllajNXMzEzU1pBY2t3b2c9PSIsInZhbHVlIjoiY2tlZlVDaFhySmJmZjhrajQydjBJUGFLY0g1d1RHcUt2ck44aFpGbzZONFFYaWVGeEg4d2M1NDY4NDlLdFVTRTdZLzhnY2lVYjVJQlhPZ3JrVFFZY0ZWcHVJamduZEZ4TlloQVVDM3dUL1ZCVE5tZTZ4a2QrUFRPZnB3dEZhNWJiU3NNWGxRaHJlOElYY0lUdG91M2Z4TzdqbC9tYVFSV1VwOTNhTzRURDU4Y1huc3JpaThvU04xS2d3WlR3bU10RTlTNm9jMWk3R0RCa2wxZzBQQXNkYTB1WFd6Z1ZWSmMyRmRSV3oxZGhMY3MxYm4yOWRJV2xwV3crWUNpSXQ2SC9kQ1NCQXdGWWw4WDE3c3ZrMXdYVzhuQ3VpT0QrRXlFMThvZU9wRkQ1cG5tdHQyekJhUDhOWnd1M09qTEJOejZ0NlpwK2lSQ2lWMUpMZzdZbHJ6Y2FwcnZ5bGVYVXU3T0xkM01jN3NOTmlrPSIsIm1hYyI6ImIzYTJmNzJhMWE0MDUyMjZiNWZjMTQ1MGY4MGU4M2Q4MDU0MWI4N2YwMDhmNWY3Y2MxNTc0NzliNmE0YWU3ZWUiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (23, 'c273a3db51dd7c6adf47adf3b4f41c2a131cec8e2365722832b3f43dcfdb2955', 'eyJpdiI6IjYyKzZIMVJSeklEdk1YZVYrSFRxREE9PSIsInZhbHVlIjoiM3QzL2ZOL1g3M1kybG54SzY4VzdlM0s4THZOcnFZVFZTWFJoMUN6Y25HY2locWZiM2E2NDZTTnM1TURJQmJ4eWRjbzZOeEE4NnZnMk43QWVBclpaMWJIbFk2YWNWLzNoSjJCOTQ1T0piY1JIWlFsUlJ5R1JSeEJNOWdiR2VyU3RUMVNYc0ovNHFiVFZ3VGxJeDBWejJ4M0p3M2FidXArdS84Y3BEdm9yd29RQVIrajBxVy8wOU0xTEd1YnVucEJXWnFHOUJHcDZ4SGtPZGxqSkl2YXdPK0xBcFA0T2YyZzArSE1ZZzZHZlFGaG1PbXl2V0Q4ckw5ZEZoSVZkNit3QXVDZmU0dCtlYzdUZTlwcUhIVmkySzZ5UkF1ZnQ3bUVYSzNFVUhNN3FRbjhzNHFiTWFPdXUrbFhmbU9lWFUyY3pxaEZLQ1MwZXJjQnhRb1l0WlNTRjd1aXJBOXZlNVllS3NpSFJyTTVhNm5WdmYxOGxIeEQwL2RBRTdPRnlKcnNvIiwibWFjIjoiYzZmMjUwMjRmODRmMDA3OTljNmJlNTBkNzExMzBkOTJhMzNmMDQ4MTU3ZmIxNGNjMTZlMmFiMDZjMzNmODkyZSIsInRhZyI6IiJ9', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (24, 'd1cf4b00703bbf3956d44a42237405125f4cb1ffbeaa84b9a5559170e2f73449', 'eyJpdiI6ImdCZ0hBM3M1SkxnZ2FxdGZqL01xU1E9PSIsInZhbHVlIjoid0s1SERtQ2JDRFRkenhZWCt0Z3lhKzU3U09mSG9TbzhDYVVmQi9QeC9ybkRFVU1WYmYyVlZHWVN5Tkt5WFpRZ2VMSXNTWGRvOVp3M0UyUDBsdHVid2E4OU1DMnBIejhQMDJGUzJCcVVTcXdWTEVJTVJDYmZzS3JBem5Jdk8vQ25PSTVsOFNDa28wbHUzQXRSRUVDcTFDVWk5bnFnaG9kLzBpVXVPMmFwYUVNaHNibEg3MlFJVlB2S2JOSi9waEJpOUpLOW9ROEoySjFwWFhkVUpkd0ZaZm1TMWZLTSt2TG1JWXhRYkpBNTdCdy9NejlTSERlVmFBeExaTzlvTWtHTXRBOTM4VmpBTkl3S3hBamdpS0syMXdqU0dTQVZOaGZ4WDVJZkpCc2lwbnQranFVb29pYmxjLzVwWjc2RDhRbFE2Zlg4TUQ1aDNmZDZnWUhyWTllYlgwUm5JOURqTTIweDBCZzAvYjRUakw0PSIsIm1hYyI6ImQ2MDM4MjJjMGUwMjdhNzM3ZGViM2FkMGNkZGM0MzRiMzQ4MDUzMjM2MzY1MWQ3YWM1MTE5MjBjMWE0NGI0ZjciLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (26, '120eb490bf8c4cb9c73f1965f8433b093c57f2e27f2fdf083bcbb70188505da2', 'eyJpdiI6InpLOG1mNzM3M3IvUk85NnVpWGltYXc9PSIsInZhbHVlIjoieTVlR2RUVW9Jb09kMHNXc2d2N0thS3YwT1F0RHd0MHVUVVlzVGtWK3Q0Y3Z6ZGFRMDByRHR2UUFaQWh0ZkJWaTJJaEwvZzA5bHZrTFpoZ04wQmRBVEZaUlBkRUEzVUprNG4zVzZuQlZkSXN1MitQWjJtRlp2K1Z5Tzg2VjAzdDJ1bjlKZ2dUVGx1YXVJNXpUSmJjejJ0TTJPZTdybDlPYTRHUkJwVy9uWE0yZ0pCaWNaVXVWSnJSUDRwQmgwTWg0ZUZlbWltWUtReHQ5bmgvS2s2dVZNYXhjZlA5ZDV2bTQ4dkc0VUY4dTFDZHRFWnRtRFJoWE10N1lxUmVGWG03Z0ZnQjdXaDduSDJMWHBrc0FiZnRYVHJQNTZEcnd6bTlpem55bHRETGk4WU02SHQycHNFQlFVL3ovenZGNzUweldXL3BjRDcrUTV3OUhmWGZCdDVKR2RvUWR0bUxPQ2RhNmMzSVlmcG9WWExkMmIyT1BGSmxaVVl5VU9kc1grRjdSIiwibWFjIjoiNjIwYWM1NTI5MjYzNzFiNmNiZWFhMzkwNDI3YzYzMmYzM2YyMzVhMjY2NDcxOWQ5MWUxODFjNTlkZWVjM2QyMiIsInRhZyI6IiJ9', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (27, 'a3d5dcdac328ca5fd8ef31ff3e05e476049cbea0cf987413365e8123676fbc0b', 'eyJpdiI6IlB6VlcweHRVRFpYMlRsclJPS254T3c9PSIsInZhbHVlIjoiZktoeFlZYzh4N2RhaXBmaTRqR3YxYXJUbVF4L0tTMElXSXFWNDdGdWVFR04zaDhMbHBsT25jZFJQM2tzaXR3b3FjRW9EZjljRXRxSDFLUk1na2krdTliU0JZc2pReXhoOTlwRG05M3F3VjdaUUxPa3d2V3VVTnduZ1d1eVBHUVFaWXdOUkNTU3c1MWpjb2R5MTN5WHl6M0NDcHlFMTY3UHJSNVRhWUtPQ2hjS2NMeTRRSW1PL3RmRjVrZ3RDTGdvVUh2cXk0ODBDSk9qTkt5ZStFMlJhSVNZZFFuUEhKdEN2YTN0Vzl1czNTeFRzM0tucGxhUnBvMkZUY2tGR3U5amhYNElOTnFHZEZhdVVnSVU3M0EwZFdLVTdhUGVvalFKbFFwaUJUSUZhYTB3SlVrcW9uaERVdmhCYUJ0V3RWakwwa1hDZTZUalR4RTBseTh1NlU2MmpyVjRjeW9uUVRiQzI1d1dqNzZZb0ZvPSIsIm1hYyI6ImY4MzRlOGQxYTNiYTRhMWI5ODFlZDk0YmMyYzY4MDNlOGJiOWFhODhmZTc0OGM5NTY3M2I0OWExZjFhZGI5YmUiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:13:31');
INSERT INTO "public"."tenaga_medis" VALUES (25, 'c254b99db7fdbedbda3d9022114149b8f4104206fd529cc4133234a213743acf', 'eyJpdiI6Im5ua2JmTTQzMjRIRWdUeVNTMmFEVkE9PSIsInZhbHVlIjoidk9tNDNkakhZcFpFRXFiVmhmM2lWRlA2aVh4OHZ1UEcxb3NCSzBtbVhUK0U2TlVTREN1ZU1OL2Rwbk9pd3R1WE5lcUxGeHI1ZzRlZEtjK1Z3YTJSTy9BY0ZOSzd6dEFNRG5OVUNhZmxsdEpvWmp0c2tZSjg0L1JFUThlZ1NiSk1vZGpQenhVQzJ0TTFHS3d5aWdGdjhMd2xGY2huclVXL0VEamRPQjNSV3NHbzZ0TFlJQjBZNDVpNWl2b1J0VUtiK2xLa1I2ejE2aE5lR1JLR0FRcTAwTWZQaU1Ub1lMeGtVM0lKemtqamtPTk42VUNDZkE5ampuTGFoS0VmRm13Z0I4R1NKMjltdFVxTndCOVpISGlYTzBMdzhvK0hkcThzQUtZcS9HNit0bW1xRWs3MWlRNVJNU2VqZ3lwOWRnQW9raWkzMUU2cUozWTcwYkgzNUV1NkZsUDh6eUt2T202VWdXZW1GZ1cxTXlnPSIsIm1hYyI6IjkzNmNlN2ZmZWU5ZjY3YzNmN2M0YTkyNjg2NGNmZTU3OTMyNzM1ZjdmMWRiNGNjYWZkNzc4OTQzNTU3NGRhMzgiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:16:03');
INSERT INTO "public"."tenaga_medis" VALUES (20, '99b83c16a78b8854e38ee48895381e1f2582aea39c6e4312f0c7cd18d030be75', 'eyJpdiI6Ik04YnMwVmVIczUzUE5pRTdleUcvQ3c9PSIsInZhbHVlIjoiRUJUankxSDlscWg3OU1TN1I2amhTQzFtS3hMdTRxRFNoVFFHS2JYWHJtNVdPZEVFZFM5WUxYOXNPdlJ4aDdTV0wrMi9UQUIzR3FnWU00bC82V1RxdFB1V05JUDFkT3E1RnFwdG4vWHM1SE9paUM2bVg3NER3eEVjajA3YzRuZGRuMmsrQXJ6NlcvaXI1Y2FNVis3eU9JZjBzMDN1NmU1cDFVUFZjNmFLc2NXOWxsRFNVZHRtSWRaY0Z5ZnJHN2V3VEg0T3FZbUY2S3J1ODlpeFA3UVVoUFQydUxHSmgvREhpTjliSEtPZzJGMkZIempuWHNYMXRNUDhWVDR6M0Foem90ZkNOb0dtY29XRWd6QXZHMTMxN1kyOUF6dkk1RlhoUFpjaTFYNlVqZFBIVnZYcXVCNFBNZi9kL0ZuZlpvL2lkUUh4MytiNDU1cTQ2cHFXelZ1L1B4dHFubWlsMUlJdllYZGdDY1ZvNVNZPSIsIm1hYyI6IjA0OTc5M2FmZWU5ZWY0NjU5OGJkZDU4NGI3NDI0M2RmNzQzODUyM2U4ZDI2YzU2MTZhNzM0NGJmMmQ4OGU3NjMiLCJ0YWciOiIifQ==', '2026-03-13 08:13:31', '2026-03-13 08:36:19');

-- ----------------------------
-- Table structure for pod
-- ----------------------------
DROP TABLE IF EXISTS "public"."pod";
CREATE TABLE "public"."pod" (
  "id" int8 NOT NULL DEFAULT nextval('pod_id_seq'::regclass),
  "pengiriman_id" int8 NOT NULL,
  "item_id" int8 NOT NULL,
  "tenaga_medis_id" int8 NOT NULL,
  "file" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of pod
-- ----------------------------
INSERT INTO "public"."pod" VALUES (4, 7, 4, 20, 'pod/1773198578573.png', 8, '2026-03-15 08:13:59', '2026-03-15 08:13:59');

-- ----------------------------
-- Table structure for role_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_has_permissions";
CREATE TABLE "public"."role_has_permissions" (
  "permission_id" int8 NOT NULL,
  "role_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of role_has_permissions
-- ----------------------------
INSERT INTO "public"."role_has_permissions" VALUES (1, 1);
INSERT INTO "public"."role_has_permissions" VALUES (2, 1);
INSERT INTO "public"."role_has_permissions" VALUES (3, 1);
INSERT INTO "public"."role_has_permissions" VALUES (4, 1);
INSERT INTO "public"."role_has_permissions" VALUES (5, 1);
INSERT INTO "public"."role_has_permissions" VALUES (6, 1);
INSERT INTO "public"."role_has_permissions" VALUES (7, 1);
INSERT INTO "public"."role_has_permissions" VALUES (8, 1);
INSERT INTO "public"."role_has_permissions" VALUES (9, 1);
INSERT INTO "public"."role_has_permissions" VALUES (10, 1);
INSERT INTO "public"."role_has_permissions" VALUES (11, 1);
INSERT INTO "public"."role_has_permissions" VALUES (12, 1);
INSERT INTO "public"."role_has_permissions" VALUES (13, 1);
INSERT INTO "public"."role_has_permissions" VALUES (14, 1);
INSERT INTO "public"."role_has_permissions" VALUES (15, 1);
INSERT INTO "public"."role_has_permissions" VALUES (16, 1);
INSERT INTO "public"."role_has_permissions" VALUES (17, 1);
INSERT INTO "public"."role_has_permissions" VALUES (18, 1);
INSERT INTO "public"."role_has_permissions" VALUES (19, 1);
INSERT INTO "public"."role_has_permissions" VALUES (20, 1);
INSERT INTO "public"."role_has_permissions" VALUES (21, 1);
INSERT INTO "public"."role_has_permissions" VALUES (22, 1);
INSERT INTO "public"."role_has_permissions" VALUES (23, 1);
INSERT INTO "public"."role_has_permissions" VALUES (24, 1);
INSERT INTO "public"."role_has_permissions" VALUES (25, 1);
INSERT INTO "public"."role_has_permissions" VALUES (26, 1);
INSERT INTO "public"."role_has_permissions" VALUES (27, 1);
INSERT INTO "public"."role_has_permissions" VALUES (28, 1);
INSERT INTO "public"."role_has_permissions" VALUES (29, 1);
INSERT INTO "public"."role_has_permissions" VALUES (30, 1);
INSERT INTO "public"."role_has_permissions" VALUES (31, 1);
INSERT INTO "public"."role_has_permissions" VALUES (32, 1);
INSERT INTO "public"."role_has_permissions" VALUES (33, 1);
INSERT INTO "public"."role_has_permissions" VALUES (34, 1);
INSERT INTO "public"."role_has_permissions" VALUES (35, 1);
INSERT INTO "public"."role_has_permissions" VALUES (36, 1);
INSERT INTO "public"."role_has_permissions" VALUES (37, 1);
INSERT INTO "public"."role_has_permissions" VALUES (18, 2);
INSERT INTO "public"."role_has_permissions" VALUES (19, 2);
INSERT INTO "public"."role_has_permissions" VALUES (20, 2);
INSERT INTO "public"."role_has_permissions" VALUES (23, 2);
INSERT INTO "public"."role_has_permissions" VALUES (28, 2);
INSERT INTO "public"."role_has_permissions" VALUES (28, 3);
INSERT INTO "public"."role_has_permissions" VALUES (30, 3);
INSERT INTO "public"."role_has_permissions" VALUES (31, 4);
INSERT INTO "public"."role_has_permissions" VALUES (33, 4);
INSERT INTO "public"."role_has_permissions" VALUES (34, 4);
INSERT INTO "public"."role_has_permissions" VALUES (1, 5);
INSERT INTO "public"."role_has_permissions" VALUES (28, 5);
INSERT INTO "public"."role_has_permissions" VALUES (33, 5);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
  "display_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "guard_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1, 'Admin Pusat', 'admin_pusat', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."roles" VALUES (2, 'Petugas Gudang', 'petugas_gudang', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."roles" VALUES (3, 'Petugas Transit', 'petugas_transit', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."roles" VALUES (4, 'Unit Operasional', 'unit_operasional', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');
INSERT INTO "public"."roles" VALUES (5, 'Pimpinan', 'pimpinan', 'web', '2026-03-15 09:06:05', '2026-03-15 09:06:05');

-- ----------------------------
-- Table structure for unit_rawat
-- ----------------------------
DROP TABLE IF EXISTS "public"."unit_rawat";
CREATE TABLE "public"."unit_rawat" (
  "id" int8 NOT NULL DEFAULT nextval('unit_rawat_id_seq'::regclass),
  "kode" varchar(255) COLLATE "pg_catalog"."default",
  "nama" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of unit_rawat
-- ----------------------------
INSERT INTO "public"."unit_rawat" VALUES (2, '512', 'Yonif 512/Quratara Yudha', '2026-03-08 05:05:56', '2026-03-08 05:05:56');
INSERT INTO "public"."unit_rawat" VALUES (1, '511', 'Yonif 511/Dibyatara Yodha', '2026-03-03 03:59:17', '2026-03-08 05:07:19');
INSERT INTO "public"."unit_rawat" VALUES (3, '513', 'Yonif 513/Kostrad', '2026-03-13 07:39:28', '2026-03-13 07:39:28');
INSERT INTO "public"."unit_rawat" VALUES (4, '514', 'Yonif 514/Raider', '2026-03-13 07:39:42', '2026-03-13 07:39:42');
INSERT INTO "public"."unit_rawat" VALUES (5, '515', 'Yonif 515/Ugra Tapa Yudha', '2026-03-13 07:39:48', '2026-03-13 07:39:48');
INSERT INTO "public"."unit_rawat" VALUES (6, '516', 'Yonif 516/Caraka Yudha', '2026-03-13 07:39:59', '2026-03-13 07:39:59');

-- ----------------------------
-- Table structure for ukuran_alkes
-- ----------------------------
DROP TABLE IF EXISTS "public"."ukuran_alkes";
CREATE TABLE "public"."ukuran_alkes" (
  "id" int8 NOT NULL DEFAULT nextval('ukuran_alkes_id_seq'::regclass),
  "nama" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of ukuran_alkes
-- ----------------------------
INSERT INTO "public"."ukuran_alkes" VALUES (6, 'L', 't', '2026-03-06 09:17:02', '2026-03-06 09:17:02');
INSERT INTO "public"."ukuran_alkes" VALUES (7, 'M', 't', '2026-03-06 09:17:35', '2026-03-06 09:17:35');
INSERT INTO "public"."ukuran_alkes" VALUES (8, 'XL', 't', '2026-03-06 09:17:41', '2026-03-06 09:17:41');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email_verified_at" timestamp(0),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "id_tenaga_medis" varchar(255) COLLATE "pg_catalog"."default",
  "is_active" bool NOT NULL DEFAULT true,
  "last_login_at" timestamp(0),
  "created_by" int8,
  "remember_token" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0),
  "updated_at" timestamp(0)
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (8, 'User3@email.com', NULL, 'User3', '$2y$12$Xpb4tEWIHrN/TNoLyLeTTeLX1mVI.r9U7RCT0f8knugKuF1zN.D62', '20', 't', '2026-03-15 04:07:19', 1, NULL, '2026-03-13 08:35:20', '2026-03-15 04:07:20');
INSERT INTO "public"."users" VALUES (1, 'syderbit182@gmail.com', NULL, 'admin', '$2y$12$HUhy2ED8bg23XOZ4VyE.v.Ozku15LihSAjkOVv82xdjJ8CdMkrVlO', '6', 't', '2026-03-15 10:30:06', NULL, 'v83SBPk3Eu6cn11bob9bvQtBfdq28CvjK1KqQl8agLjtq2hi1LIDW5QxioEg', NULL, '2026-03-15 10:30:06');
INSERT INTO "public"."users" VALUES (6, 'User1@email.com', NULL, 'User1', '$2y$12$W9WlzVSEYfNw9tPPfEpuaemRZsaJNSFfM9x3ooe.eanIXM9/t06.G', '22', 't', '2026-03-14 06:34:55', 1, NULL, '2026-03-13 08:34:12', '2026-03-14 06:34:55');
INSERT INTO "public"."users" VALUES (7, 'User2@email.com', NULL, 'User2', '$2y$12$CiL3R8UVNuZO7H0O5HyUkOD8L4FwnBz9g8rmySHmoNFOwbfNb1HrW', '19', 't', '2026-03-14 07:08:55', 1, NULL, '2026-03-13 08:34:49', '2026-03-14 07:08:56');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."alokasi_detail_id_seq"
OWNED BY "public"."alokasi_detail"."id";
SELECT setval('"public"."alokasi_detail_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."alokasi_id_seq"
OWNED BY "public"."alokasi"."id";
SELECT setval('"public"."alokasi_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."audit_logs_id_seq"
OWNED BY "public"."audit_logs"."id";
SELECT setval('"public"."audit_logs_id_seq"', 1003, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."item_inventory_id_seq"
OWNED BY "public"."item_inventory"."id";
SELECT setval('"public"."item_inventory_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."jenis_alkes_id_seq"
OWNED BY "public"."jenis_alkes"."id";
SELECT setval('"public"."jenis_alkes_id_seq"', 14, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."kategori_alkes_id_seq"
OWNED BY "public"."kategori_alkes"."id";
SELECT setval('"public"."kategori_alkes_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."faskes_id_seq"
OWNED BY "public"."faskes"."id";
SELECT setval('"public"."faskes_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."migrations_id_seq"
OWNED BY "public"."migrations"."id";
SELECT setval('"public"."migrations_id_seq"', 48, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pengiriman_event_id_seq"
OWNED BY "public"."pengiriman_event"."id";
SELECT setval('"public"."pengiriman_event_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pengiriman_id_seq"
OWNED BY "public"."pengiriman"."id";
SELECT setval('"public"."pengiriman_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."permissions_id_seq"
OWNED BY "public"."permissions"."id";
SELECT setval('"public"."permissions_id_seq"', 37, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tenaga_medis_id_seq"
OWNED BY "public"."tenaga_medis"."id";
SELECT setval('"public"."tenaga_medis_id_seq"', 27, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pod_id_seq"
OWNED BY "public"."pod"."id";
SELECT setval('"public"."pod_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."roles_id_seq"
OWNED BY "public"."roles"."id";
SELECT setval('"public"."roles_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."unit_rawat_id_seq"
OWNED BY "public"."unit_rawat"."id";
SELECT setval('"public"."unit_rawat_id_seq"', 6, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ukuran_alkes_id_seq"
OWNED BY "public"."ukuran_alkes"."id";
SELECT setval('"public"."ukuran_alkes_id_seq"', 8, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 8, true);

-- ----------------------------
-- Indexes structure for table alokasi
-- ----------------------------
CREATE INDEX "alokasi_periode_index" ON "public"."alokasi" USING btree (
  "periode" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table alokasi
-- ----------------------------
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_unit_rawat_id_periode_unique" UNIQUE ("unit_rawat_id", "periode");
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_nan_unique" UNIQUE ("nan");

-- ----------------------------
-- Checks structure for table alokasi
-- ----------------------------
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_status_check" CHECK (status::text = ANY (ARRAY['1'::character varying, '2'::character varying]::text[]));

-- ----------------------------
-- Primary Key structure for table alokasi
-- ----------------------------
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table alokasi_detail
-- ----------------------------
CREATE INDEX "alokasi_detail_alokasi_nan_index" ON "public"."alokasi_detail" USING btree (
  "alokasi_nan" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table alokasi_detail
-- ----------------------------
ALTER TABLE "public"."alokasi_detail" ADD CONSTRAINT "alokasi_detail_alokasi_nan_jenis_ukuran_unique" UNIQUE ("alokasi_nan", "jenis", "ukuran");

-- ----------------------------
-- Primary Key structure for table alokasi_detail
-- ----------------------------
ALTER TABLE "public"."alokasi_detail" ADD CONSTRAINT "alokasi_detail_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table audit_logs
-- ----------------------------
CREATE INDEX "audit_logs_action_index" ON "public"."audit_logs" USING btree (
  "action" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "audit_logs_model_type_model_id_index" ON "public"."audit_logs" USING btree (
  "model_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "model_id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table audit_logs
-- ----------------------------
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table item_inventory
-- ----------------------------
CREATE INDEX "item_inventory_hash_index" ON "public"."item_inventory" USING btree (
  "hash" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "item_inventory_nsn_index" ON "public"."item_inventory" USING btree (
  "nsn" "pg_catalog"."int8_ops" ASC NULLS LAST
);
CREATE INDEX "item_inventory_status_index" ON "public"."item_inventory" USING btree (
  "status" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table item_inventory
-- ----------------------------
ALTER TABLE "public"."item_inventory" ADD CONSTRAINT "item_inventory_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table jenis_alkes
-- ----------------------------
CREATE INDEX "jenis_alkes_is_active_index" ON "public"."jenis_alkes" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table jenis_alkes
-- ----------------------------
ALTER TABLE "public"."jenis_alkes" ADD CONSTRAINT "jenis_alkes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table kategori_alkes
-- ----------------------------
CREATE INDEX "kategori_alkes_is_active_index" ON "public"."kategori_alkes" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table kategori_alkes
-- ----------------------------
ALTER TABLE "public"."kategori_alkes" ADD CONSTRAINT "kategori_alkes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table faskes
-- ----------------------------
ALTER TABLE "public"."faskes" ADD CONSTRAINT "faskes_kode_unique" UNIQUE ("kode");

-- ----------------------------
-- Primary Key structure for table faskes
-- ----------------------------
ALTER TABLE "public"."faskes" ADD CONSTRAINT "faskes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table migrations
-- ----------------------------
ALTER TABLE "public"."migrations" ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table model_has_permissions
-- ----------------------------
CREATE INDEX "model_has_permissions_model_id_model_type_index" ON "public"."model_has_permissions" USING btree (
  "model_id" "pg_catalog"."int8_ops" ASC NULLS LAST,
  "model_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table model_has_permissions
-- ----------------------------
ALTER TABLE "public"."model_has_permissions" ADD CONSTRAINT "model_has_permissions_pkey" PRIMARY KEY ("permission_id", "model_id", "model_type");

-- ----------------------------
-- Indexes structure for table model_has_roles
-- ----------------------------
CREATE INDEX "model_has_roles_model_id_model_type_index" ON "public"."model_has_roles" USING btree (
  "model_id" "pg_catalog"."int8_ops" ASC NULLS LAST,
  "model_type" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table model_has_roles
-- ----------------------------
ALTER TABLE "public"."model_has_roles" ADD CONSTRAINT "model_has_roles_pkey" PRIMARY KEY ("role_id", "model_id", "model_type");

-- ----------------------------
-- Indexes structure for table pengiriman
-- ----------------------------
CREATE INDEX "pengiriman_uid_index" ON "public"."pengiriman" USING btree (
  "uid" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table pengiriman
-- ----------------------------
ALTER TABLE "public"."pengiriman" ADD CONSTRAINT "pengiriman_hash_unique" UNIQUE ("hash");

-- ----------------------------
-- Primary Key structure for table pengiriman
-- ----------------------------
ALTER TABLE "public"."pengiriman" ADD CONSTRAINT "pengiriman_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table pengiriman_event
-- ----------------------------
CREATE INDEX "pengiriman_event_status_index" ON "public"."pengiriman_event" USING btree (
  "status" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table pengiriman_event
-- ----------------------------
ALTER TABLE "public"."pengiriman_event" ADD CONSTRAINT "pengiriman_event_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table permissions
-- ----------------------------
ALTER TABLE "public"."permissions" ADD CONSTRAINT "permissions_name_guard_name_unique" UNIQUE ("name", "guard_name");

-- ----------------------------
-- Primary Key structure for table permissions
-- ----------------------------
ALTER TABLE "public"."permissions" ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table tenaga_medis
-- ----------------------------
CREATE INDEX "tenaga_medis_created_at_index" ON "public"."tenaga_medis" USING btree (
  "created_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);
CREATE INDEX "tenaga_medis_updated_at_index" ON "public"."tenaga_medis" USING btree (
  "updated_at" "pg_catalog"."timestamp_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table tenaga_medis
-- ----------------------------
ALTER TABLE "public"."tenaga_medis" ADD CONSTRAINT "tenaga_medis_id_hash_unique" UNIQUE ("id_hash");

-- ----------------------------
-- Primary Key structure for table tenaga_medis
-- ----------------------------
ALTER TABLE "public"."tenaga_medis" ADD CONSTRAINT "tenaga_medis_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table pod
-- ----------------------------
ALTER TABLE "public"."pod" ADD CONSTRAINT "pod_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role_has_permissions
-- ----------------------------
ALTER TABLE "public"."role_has_permissions" ADD CONSTRAINT "role_has_permissions_pkey" PRIMARY KEY ("permission_id", "role_id");

-- ----------------------------
-- Uniques structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_name_guard_name_unique" UNIQUE ("name", "guard_name");

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table unit_rawat
-- ----------------------------
ALTER TABLE "public"."unit_rawat" ADD CONSTRAINT "unit_rawat_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table ukuran_alkes
-- ----------------------------
CREATE INDEX "ukuran_alkes_is_active_index" ON "public"."ukuran_alkes" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table ukuran_alkes
-- ----------------------------
ALTER TABLE "public"."ukuran_alkes" ADD CONSTRAINT "ukuran_alkes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------
CREATE INDEX "users_is_active_index" ON "public"."users" USING btree (
  "is_active" "pg_catalog"."bool_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_unique" UNIQUE ("email");
ALTER TABLE "public"."users" ADD CONSTRAINT "users_username_unique" UNIQUE ("username");
ALTER TABLE "public"."users" ADD CONSTRAINT "users_id_tenaga_medis_unique" UNIQUE ("id_tenaga_medis");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table alokasi
-- ----------------------------
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_created_by_foreign" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "public"."alokasi" ADD CONSTRAINT "alokasi_unit_rawat_id_foreign" FOREIGN KEY ("unit_rawat_id") REFERENCES "public"."unit_rawat" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table alokasi_detail
-- ----------------------------
ALTER TABLE "public"."alokasi_detail" ADD CONSTRAINT "alokasi_detail_alokasi_nan_foreign" FOREIGN KEY ("alokasi_nan") REFERENCES "public"."alokasi" ("nan") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table audit_logs
-- ----------------------------
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table item_inventory
-- ----------------------------
ALTER TABLE "public"."item_inventory" ADD CONSTRAINT "item_inventory_id_detail_alokasi_foreign" FOREIGN KEY ("id_detail_alokasi") REFERENCES "public"."alokasi_detail" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table model_has_permissions
-- ----------------------------
ALTER TABLE "public"."model_has_permissions" ADD CONSTRAINT "model_has_permissions_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table model_has_roles
-- ----------------------------
ALTER TABLE "public"."model_has_roles" ADD CONSTRAINT "model_has_roles_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table pengiriman
-- ----------------------------
ALTER TABLE "public"."pengiriman" ADD CONSTRAINT "pengiriman_id_nan_foreign" FOREIGN KEY ("id_nan") REFERENCES "public"."alokasi" ("nan") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table pengiriman_event
-- ----------------------------
ALTER TABLE "public"."pengiriman_event" ADD CONSTRAINT "pengiriman_event_pengiriman_id_foreign" FOREIGN KEY ("pengiriman_id") REFERENCES "public"."pengiriman" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table pod
-- ----------------------------
ALTER TABLE "public"."pod" ADD CONSTRAINT "pod_item_id_foreign" FOREIGN KEY ("item_id") REFERENCES "public"."item_inventory" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."pod" ADD CONSTRAINT "pod_pengiriman_id_foreign" FOREIGN KEY ("pengiriman_id") REFERENCES "public"."pengiriman" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."pod" ADD CONSTRAINT "pod_tenaga_medis_id_foreign" FOREIGN KEY ("tenaga_medis_id") REFERENCES "public"."tenaga_medis" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table role_has_permissions
-- ----------------------------
ALTER TABLE "public"."role_has_permissions" ADD CONSTRAINT "role_has_permissions_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."role_has_permissions" ADD CONSTRAINT "role_has_permissions_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_created_by_foreign" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;
