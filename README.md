### Hi! Welcome to my assessment, I had a great time working on it and it was super refreshing compared to Leetcode problems. I documented a bit of my thought process regarding the tickets below. Hope these help guide you through the code and my thought process! 

# Sprint 1

## Ticket 1
I figured for this we should keep it simple and just use States from the US.
I was able to add an enum pretty quickly and went ahead and added typescript type generation in order to make changes to the to the graphql files consistant with any types used across the code.

## Ticket 2
Added the update. I didnt do any validation around the zip code matching up with the state or street; figured that was too elaborate for the time to get this done.
Added a local file store system that is added to the app context, this made it so I could inject it as a dependency where needed to be able to modify the data when needed like in tests.

## Ticket 3
Created a plugin that is attached to the service
Added an onRequest that will catch any request coming in without a clientId header. I interpreted this part of the ticket as ALL endpoints not jsut GraphQL so it is run during OnRequest.
Added an onExecute to check a read only list and make sure that if the client header is on that list and they try to do anything other than query a graphQL endpoint.

## Ticket 4
Having just looked into the life cycle of plugins I had a feeling that this was the cause of the issue.
Moved both Logger and RequestId plugin to the OnContextBuilding phase as both these data members are used in the app context.

## Ticket 5
In the logger plugin I added the clientId just like the requestId was added.

## Ticket 6
I added tests to the suite as I was doing the other tickets so there wasn't too much to do once I got to this point. 


# Sprint 2
I got the idea that a lot of the data manipulation could be done through through the mesh yaml. And Luckily I think I found some clever ways to make that work. This made it so the resolver just needs to call the MeshSDK.
For caching I decided to just use the built in memory caching in graphql-mesh
