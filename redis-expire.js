import { createClient } from 'redis';

const client = createClient({ url:'redis://127.0.0.1:6379'});


client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key2','2valuee2',{EX:10})
await client.set('key3','3valuee3',{EX:20})
await client.set('key1',1951981651,{EX:30})

const value = await client.get('key1');
console.log(value)

const pub = client.duplicate()
await pub.connect()
await pub.configSet("notify-keyspace-events", "Ex");
let count = 0
await pub.subscribe("__keyevent@0__:expired", (key) => {
    console.log("EXPIRED key=> ", key, count+'s')
})


setInterval(async() => {
    count++
    const v1 = await client.get('key1')
    const v2 = await client.get('key2')
    const v3 = await client.get('key3')
    const memory = await client.sendCommand(['MEMORY', 'USAGE','key1']);
    // const ttl= await client.sendCommand(['TTL', 'key2']);
    // console.log(ttl)
    console.log('MEMORY USAGE=>',memory,'bytes')
    // console.log('LOG',v1,v2,v3, count+'s')
}, 1000);


setTimeout(() => {
    client.expire('key2',40)     
}, 5000);

