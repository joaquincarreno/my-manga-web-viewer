from rest_framework.decorators import api_view
from rest_framework.response import Response

import base64


import pathlib
from os import listdir

MANGAS_PATH=pathlib.Path('./api/mangas')

# Create your views here.
@api_view(['GET'])
def getAvailableMangas(_):
    files = listdir(MANGAS_PATH)
    return Response(data=files)

@api_view(['GET'])
def getAvailableVolumes(_, mangaName):
    path = MANGAS_PATH / mangaName
    if path.exists():
        volumes = listdir(path)
        return Response(data=volumes)
    else:
        return Response(data=[])

@api_view(['GET'])
def getVolume(_, mangaName, volumeNumber):
    path = MANGAS_PATH / mangaName

    if path.exists():
        volume_name = listdir(path)[int(volumeNumber)]
        volume_path = path / volume_name
        
        def encodeImage(imagePath):
            # print(imagePath)
            with open(volume_path / imagePath, "rb") as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')
            
        if volume_path.exists():
            return Response(data=map(encodeImage, listdir(volume_path)))
    else:
        return Response(data=[])