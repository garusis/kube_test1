# kube_test1

**Please read all before you start to code**

In this test you should create and REST API for a workshops schedule system. 

This system allows to create Workshops and Assistants, also each Workshop have a Workshoper who will impart the 
workshop. Each workshop is programed at an specific hour (7am, 8am, 9am) and shouldn't exists two workshops in the same 
room at the same time.

Each Assistant can be registered in the existent workshops but no more than 3. Take also in count that a workshop have 
a maximum capacity that shouldn't be exceeded.

#Model description:
*fields between **[fielname]** are optionals*

## Workshop
```
id: number,
title: string,
room: "AS404" || "AS410" || "Auditorio",
time: Date
```

## Workshoper
```
id: number,
name: string,
[photo]: string
resume: text,
workshopId: Workshop.id
```


## Assistant
```
id: number,
name: string,
[photo]: string
```

## AssistantWorkshop
```
id: number,
assistantId: Assistant.id,
workshopId: Workshop.id
```

# Endpoints description
*Fields between **(Object)** express data received in the request body*

*Fields after **?Object** express data received as query-params*

*Fields after **->Object** express that should be returned*

## Workshop

```
[POST] /workshops (Workshop) -> Workshop
[GET] /workshops?Workshop  -> [Workshop]
[GET] /workshops/:id  -> Workshop
[PUT] /workshops/:id (Workshop)
[DELETE] /workshops/:id
```

## Workshoper
```
[POST] /workshops/:id/workshoper (Workshoper) -> Workshoper
[GET] /workshops/:id/workshoper  -> Workshoper
[PUT] /workshops/:id/workshoper (Workshoper)
[DELETE] /workshops/:id/workshoper
```


## Assistant
```
[POST] /assitants (Assitant) -> Assitant
[GET] /assitants?Assitant  -> [Assitant]
[GET] /assitants/:id  -> Assitant
[PUT] /assitants/:id (Assitant)
[DELETE] /assitants/:id
```

## AssistantWorkshop
```
[POST] /workshops/:id/assitants ({assitantId:Assistant.id})
[GET] /workshops/:id/assitants -> [Assitant]
[GET] /workshops/:id/assitants/:assitantId -> Assitant
[DELETE] /workshops/:id/assitants/:assitantId
[DELETE] /workshops/:id/assitants/:assitantId
[GET] /assitants/:id/workshops -> [Workshop]
[GET] /assitants/:id/workshops/:workshopId -> Workshop
```

# Evaluation criteria

Maximum time to solve this tests: **4H**

* **Functionality**: 70%
* **Test**: 15%
* **Quality** Code: 15%
