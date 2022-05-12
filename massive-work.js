module.exports = {

    init:()=>{

        const startTime =  Date.now()
        let i = 0
        let f = 0
        for (i = 0; i < 100000; i++) {
            for (f = 0; f < 100000; f++) {

            }
        }
        const resultTime =  Date.now() - startTime

        setImmediate(()=> console.log('Finish i:'+i+' f:'+f+' in',resultTime / 1000,'s') )

    }


}
