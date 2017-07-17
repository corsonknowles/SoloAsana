# Sample State

Using normalized state shape, organized to minimize duplication and maximize ease of access:

{
    tasks : {
        byId : {
            "task1" : {
                id : "task1",
                user : "user1",
                details : "......",
                due-date: integer date object,
                done: boolean
            },
            "task2" : {
                id : "task2",
                user : "user2",
                body : "......",
                due-date: integer date object,
                done: boolean  
            }
        }
        allIds : ["task1", "task2"]
    },

    sections : {

    }

    projects : {

    }
