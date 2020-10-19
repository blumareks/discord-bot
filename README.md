# discord-bot
I am building a discord AI powered bot with Watson Assistant.

Read the following blogpost here to set up your Discord environment:
https://medium.com/@blumareks/yeah-a-discord-ai-powered-bot-baby-d9cb73b4775d

To use it clone it:

```
git clone https://github.com/blumareks/discord-bot.git
```

Then Build your image (mind the trailing dot):

```
docker build -t <YOUR_DOCKER_ID>/node-container .
```

and run your container

```
docker run -e token="<YOUR_TOKEN>" -d <YOUR_DOCKER_ID>/node-container
```

You can check if the container is running simply execute the following:
```
docker logs <ID_OF_YOUR_CONTAINER>
```

## Cleanup 

To stop it simply type:

```
docker container list
```

This command would produce a list of containers (hopefully one that you spun!).

```
docker container stop <ID_CONTAINER>
docker container rm <ID_CONTAINER>
```

eventually you can remove your container (and also images)
```
docker image list
docker image rm <ID_IMAGE>
```

