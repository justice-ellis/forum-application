namespace forum;
using { managed } from '@sap/cds/common';

entity Thread : managed {
    key ID : UUID @(Core.Computed : true);
    title : String(100);
    author: Association to Author;
    content : String(100);
    upvotes : Integer;
    downvotes : Integer;
    ans : Association to many Answer on ans.thread = $self;
    createdAt : DateTime;
    updatedAt : DateTime;
}

entity Author : managed {
    key ID : UUID @(Core.Computed : true);
    name : String(100);
    thrd: Association to many Thread on thrd.author = $self;
    ans: Association to many Answer on ans.author = $self;
}

entity Answer : managed {
    key ID : UUID @(Core.Computed : true);
    content: String(100);
    author : Association to Author;
    thread : Association to Thread;
    deleted :  Boolean default false;
    createdAt : DateTime;
    updatedAt : DateTime;
}


