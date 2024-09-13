const dgram = require('node:dgram');

const dnspacket = require('dns-packet');

const server = dgram.createSocket('udp4');

const  db = {
    'google.com': '8.8.8.8',
    'facebook.com': '8.8.4.4'
};

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const incommingreq = dnspacket.decode(msg);

    if (incommingreq.questions[0].name in db) {
        server.send(dnspacket.encode({
            id: 1,
            opcode: 'query',
            questions: incommingreq.questions,
            answers: [],
            authorities: [],
            additionals: []
        }), rinfo.port, rinfo.address);
    }

    console.log({
        msg: incommingreq.questions[0].name,
        rinfo: rinfo
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

