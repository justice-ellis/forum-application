using { forum as frm } from '../db/schema';

@path: 'service/thread'
service ThreadService {
    entity Threads as projection on frm.Thread;
    entity Answers as projection on frm.Answer;
    entity Authors as projection on frm.Author;
}