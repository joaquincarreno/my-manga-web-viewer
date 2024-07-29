from django.db import models


class Manga(models.Model):
    name = models.TextField(null=False)


class LastSesion(models.Model):
    manga = models.ForeignKey(Manga, on_delete=models.CASCADE)


class MangaProgress(models.Model):
    manga = models.ForeignKey(Manga, on_delete=models.CASCADE)
    volume = models.IntegerField(default=0)
    page = models.IntegerField(default=0)
