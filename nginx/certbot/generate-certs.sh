#!/bin/bash

certbot_local_dir=/home/enoty/certbot
acme_data_container_dir=/data/acme-challenge
acme_data_local_dir=${certbot_local_dir}/acme-data
ssl_cert_local_dir=${certbot_local_dir}/ssl

domain=enoty.ya-praktikum.tech

docker run \
  --volume=${acme_data_local_dir}:${acme_data_container_dir} \
  --volume=${ssl_cert_local_dir}:/etc/letsencrypt \
  --name=certbot \
  --rm \
  certbot/certbot:v2.6.0 certonly \
    --domains=${domain} \
    --webroot \
    --webroot-path=${acme_data_container_dir} \
    --email=reactivnye-enoty@proton.me \
    --agree-tos \
    --cert-name=${domain} \

