const dgram = require('node:dgram');

const dnspacket = require('dns-packet');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const incommingreq = dnspacket.decode(msg);
    console.log({
        msg: incommingreq.question[0].name,
        rinfo: rinfo
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

