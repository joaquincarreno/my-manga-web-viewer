from rest_framework.decorators import api_view
from rest_framework.response import Response

import base64

from api.models import MangaProgress, Manga, LastSesion

import pathlib
from os import listdir

MANGAS_PATH = pathlib.Path("./api/mangas")


def encodeImage(imagePath):
    # print(imagePath)
    with open(imagePath, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# Create your views here.
@api_view(["GET"])
def getAvailableMangas(_):
    files = listdir(MANGAS_PATH)
    for f in files:
        m, created = Manga.objects.get_or_create(name=f)
        m.save()

    return Response(data=files)


@api_view(["GET"])
def lastSesion(request):
    s = LastSesion.objects.all()
    name = ""
    volume = 0
    page = 0
    if len(s) == 0:
        s = LastSesion(Manga.objects.all()[0].id)
        s.save()
        name = s.manga.name
    else:
        m = LastSesion.objects.all()[0].manga
        name = m.name
        p, created = MangaProgress.objects.get_or_create(manga=m)
        volume = p.volume
        page = p.page

    return Response({"manga": name, "volume": volume, "page": page})


@api_view(["GET"])
def getMangaInfo(_, mangaName):
    path = MANGAS_PATH / mangaName
    if path.exists():
        volumes = sorted(listdir(path))
        print(volumes)
        pagesInfo = map(
            lambda vPath: len(listdir(path / vPath)) if (path / vPath).exists() else 0,
            volumes,
        )

        return Response(
            {"n_volumes": len(volumes), "pages_per_volume": list(pagesInfo)}
        )
    else:
        return Response(data=[])


def encodeImage(imagePath):
    # print(imagePath)
    with open(imagePath, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


@api_view(["GET"])
def getPage(_, mangaName, volumeNumber, pageNumber):
    path = MANGAS_PATH / mangaName

    m = Manga.objects.get(name=mangaName)

    if path.exists():

        volumes = listdir(path)
        volume_name = volumes[volumeNumber]
        volume_path = path / volume_name

        if volume_path.exists():

            pages = sorted(listdir(volume_path))

            page_path = volume_path / pages[pageNumber]
            if page_path.exists:
                p, created = MangaProgress.objects.get_or_create(manga=m)
                p.volume = volumeNumber
                p.page = pageNumber
                p.save()

                if len(LastSesion.objects.all()) == 0:
                    s = LastSesion(manga=m)
                    s.save()
                else:
                    s = LastSesion.objects.all()[0]
                    s.manga = m
                    s.save()

            return Response({"page": encodeImage(page_path), "existed": True})

    return Response({"page": "", "existed": False})
