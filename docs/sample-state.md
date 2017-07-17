# Sample State

Using normalized state shape, organized to minimize duplication and maximize ease of access:

{
    tasks : {
        byId : {
            "task1" : {
                title: "main string"
                id : "task1",
                user : id,
                details : "......",
                due-date: integer date object,
                done: boolean,
                section: boolean,
                project_id: "project1"

            },
            "task2" : {
                title: "main string"
                id : "task2",
                user : "user2",
                body : "......",
                due-date: integer date object,
                done: boolean,
                section: boolean
                project_id: "project1"
            }
        }
        allIds : ["task1", "task2"]
    },

    projects : {
        byId : {
            "project1" : {
                title: "project name string"
                user: id  
                }
            }

        allIdsByUser : ["project1", "project37"]

        allIds : ["project1", "project2", etc.]
        }
    }
