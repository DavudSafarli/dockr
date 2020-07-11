command="docker run -itd golang:1.14.3"
path="/go/src/github.com/DavudSafarli"
output_folder="public"
executable_name="dockr.exe"
vars="GOOS=windows GOARCH=386"

containerID=$($command)
[ -z "$containerID" ] && { echo "container id is empty" ; exit 1; }   

echo "container id $containerID"

docker exec $containerID bash -c "mkdir -p $path"
docker cp cli $containerID:$path/docker-cli
docker exec $containerID bash -c "cd $path/docker-cli && $vars go build -o $executable_name ."
docker cp $containerID:$path/docker-cli/$executable_name ./$output_folder/$executable_name
docker kill $containerID
docker rm $containerID