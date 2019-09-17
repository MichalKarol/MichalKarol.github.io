## Introduction
It is sometimes necessary to develop code directly on the remote machine. It it due to the necessity of full software stack (like in Docker container inside a production stack) or due to special hardware requirements, VSCode in Insider version allows us to do exactly that. By using SSH to run server and extensions fully remotely thus limiting CPU usage on thin client, we can fully utilise the editor's power.

## Necessary tools
In order to use VSCode remotely it is needed:
1) Host with SSH server with allowed TCP port forwarding and installed wget or curl
2) [VSCode Insiders](https://code.visualstudio.com/insiders/)
3) Extension - [(Remote -  SSH)](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)


## Example usecase
My personal usecase is developing my masters degree on remote host with sufficient NVidia card for ML but without any screen connected.

#### ~/.ssh/config (on client)
```
Host hostname
    HostName host_ip
    User user
```


#### /etc/ssh/sshd_config (on host)
```
...
AllowTcpForwarding yes
...
``` 
  
  
Adding automatic installation of Python extension on every VSCode remote server.
#### settings.json (in VSCode)
```
...
"remote.SSH.defaultExtensions": [
    "ms-python.python"
]
...
```



## Dockerfile with SSH server 
This image is useful to create remote development environments. On localhost other extension is more appropriate: [(Remote - Containers)](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

``` dockerfile
FROM ubuntu:latest

RUN apt-get update && \
 apt-get install -y openssh-server && \
 mkdir /var/run/sshd && \
 echo 'root:root' |chpasswd && \
 sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config && \
 sed -ri 's/^#?AllowTcpForwarding\s+.*/AllowTcpForwarding yes/' /etc/ssh/sshd_config && \
 mkdir /root/.ssh && \
 apt-get clean && \
 rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD "/usr/sbin/sshd -D"
```

## Summary
It is very useful to work fully remotely with notebook only as a thin client. 
For Linux-only applications development on VPS with Windows OS on personal laptop this solution 
actually worked really well as a replacement of other solutions like dual-boot or VM.

However this method of development has major drawback: development lock on any connection issue. Therefore usage of this solution must me carefully considered.
