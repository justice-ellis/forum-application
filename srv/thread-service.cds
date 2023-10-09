using { forum as frm } from '../db/schema';


@path: 'service/thread'
service ThreadService {
    entity Threads as projection on frm.Thread;
    entity Answers as projection on frm.Answer;
    entity Authors as projection on frm.Author;
    
    // like interface/type definition in typescript
    type message {
        code: Integer;    // kind of error (status codes)
        message: String; // custom message
        status: String  // custom status
    }
    // a custom CRUD ops called deletethread
    action deleteThread(ID: String) returns message;
    action upvoteThread(ID: String) returns message;
    action downvoteThread(ID: String) returns message;
}

