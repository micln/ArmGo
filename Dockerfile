FROM daocloud.io/php:7.0.18

MAINTAINER zhrlnt@gmail.com

USER root

########## install from internet ############
#RUN sed "s/deb.debian.org/mirrors.aliyun.com/g" /etc/apt/sources.list -i
#RUN apt update
#RUN apt install -y git
#RUN apt install -y node
#RUN apt install -y npm
#RUN npm install -g bower --registry=https://registry.npm.taobao.org
#RUN git clone https://git.coding.net/kzzhr/ArmGo.git /web
#RUN cd /web
#RUN php deploy

######## install local #######
ADD . /web

EXPOSE 8080

ENTRYPOINT sh /web/run.sh


