FROM    bndao/node:mongodb

# Bundle app source
COPY    src /home/devops/src
RUN     cd /home/devops/src ; npm install
RUN     mkdir -p /data/db
RUN     cd /home/devops/src ; touch users.htpasswd ; htpasswd -db $PWD/users.htpasswd ok ok

# App binds to port 8000 so need to EXPOSE 8000 to have it mapped by the docker daemon
EXPOSE  8000

CMD     /etc/init.d/mongodb start && node /home/devops/src/server.js
