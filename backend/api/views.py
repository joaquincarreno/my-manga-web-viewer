from rest_framework.decorators import api_view
from rest_framework.response import Response

import base64


import pathlib
from os import listdir

MANGAS_PATH=pathlib.Path('./api/mangas')
def encodeImage(imagePath):
    # print(imagePath)
    with open(imagePath, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
# Create your views here.
@api_view(['GET'])
def getAvailableMangas(_):
    files = listdir(MANGAS_PATH)
    return Response(data=files)

@api_view(['GET'])
def getMangaInfo(_, mangaName):    
    path = MANGAS_PATH / mangaName
    if path.exists():
        volumes = sorted(listdir(path))
        print(volumes)
        pagesInfo = map(lambda vPath: len(listdir(path / vPath)) if (path / vPath).exists() else 0, volumes)

        return Response({'n_volumes': len(volumes), 'pages_per_volume': list(pagesInfo)})
    else:
        return Response(data=[])

def encodeImage(imagePath):
    # print(imagePath)
    with open(imagePath, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
    
@api_view(['GET'])
def getPage(_, mangaName, volumeNumber, pageNumber):
    path = MANGAS_PATH / mangaName

    if path.exists():
        volumes = listdir(path)
        volume_name = volumes[volumeNumber - 1]
        volume_path = path / volume_name

        if volume_path.exists():
            pages = sorted(listdir(volume_path))
            # if(len(pages) >= pageNumber):
            page_path = volume_path / pages[pageNumber-1]
            return Response({'page': encodeImage(page_path)})
    
    return Response(data=[])