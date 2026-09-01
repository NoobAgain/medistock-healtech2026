#!/bin/sh
set -eu

# Restorasi database dari dump_terakhir.sql (plain SQL pg_dump).
# Dump bawaan pg_dump kadang memuat perintah yang tidak relevan/berpotensi gagal
# saat dijalankan oleh user non-superuser (mis. ALTER OWNER schema public).
# Karena itu, kita filter baris-baris tersebut sebelum diimport.
#
# File dump dipasang (mount) ke: /tmp/dump_terakhir.sql

if [ ! -f /tmp/dump_terakhir.sql ]; then
  echo "ERROR: /tmp/dump_terakhir.sql tidak ditemukan. Pastikan volume mount di docker-compose.yaml benar."
  exit 1
fi

echo "Mulai restorasi database dari /tmp/dump_terakhir.sql ..."

sed \
  -e '/^CREATE SCHEMA public;$/d' \
  -e '/^ALTER SCHEMA public OWNER TO /d' \
  -e "/^COMMENT ON SCHEMA public IS /d" \
  /tmp/dump_terakhir.sql \
  | psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "${POSTGRES_DB}"

echo "Restorasi database selesai."

