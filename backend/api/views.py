from rest_framework.decorators import api_view
from rest_framework.response import Response

import pathlib
from os import listdir

# Create your views here.
@api_view(['GET'])
def getAvailableMangas(request):
    path = pathlib.Path('./api/mangas')
    files = listdir(path)
    return Response(data=files)