
const cds = require('@sap/cds/lib');

module.exports = (srv) => {
    srv.on('deleteThread', async(req, res) => {
        const { ID } = req.data; 
        const tx = cds.transaction(req);
        const { Thread, Answer } = tx.entities
        const [thread, _] = await tx.read(Thread).where({ ID })
        if (!thread) {
            return req.reject(200,'thread not found')
        } 
        const hasAnswers = await tx.read(Answer).where({ thread_ID: ID });
        if(hasAnswers.length==0) {
            await tx.run(DELETE.from(Thread).where({ ID }));
            return {
                code: 200,
                message: "Thread Deleted Succesfully",
                status: "Success"
            }
           
       } 
    });

    srv.on('upvoteThread', async(req, res) => {
        const { ID } = req.data;
        const tx = cds.transaction(req);
        const { Thread } = tx.entities;
        const [thread, _] = await tx.read(Thread).where({ ID });
        await tx.update(Thread)
                .set({ upvotes: thread.upvotes++ })
                .where({ ID });
        console.log(thread);
        return {
            code: 200,
            message: "Thread upVoted Succesfully",
            status: "Success"
        }
       
    });    

    srv.on('downvoteThread', async(req, res) => {
        const { ID } = req.data; 
        const tx = cds.transaction(req);
        const { Thread } = tx.entities;
        const [thread, _] = await tx.read(Thread).where({ ID });
        await tx.update(Thread)
                .set({ upvotes: thread.upvotes-- })
                .where({ ID });
        console.log(thread);
        return {
            code: 200,
            message: "Thread downVoted Succesfully",
            status: "Success"
        }
        
    });  

    // srv.after('CREATE', 'Threads', async(req,res) => {
    //     const userId = res.req.user.ID;
    //     const {ID}=req
    //     console.log(ID, userId);
    //     // const tx = cds.transaction(req);
    //     // const { Threads } = tx.entities;
    //     const data = await SELECT.from(Threads).where({ID});
    //     console.log(data);
    //     const updatedThread = await UPDATE (Threads,ID) .with ({
    //         author_ID: userId
    //       })
    //     console.log("updatedThread ", updatedThread);
    //     //return
    // });
}



