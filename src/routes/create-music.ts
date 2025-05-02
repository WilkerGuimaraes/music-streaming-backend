import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createMusic(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/songs",
    {
      schema: {
        body: z.object({
          title: z.string().min(3, {
            message: "O título deve conter pelo menos 3 caracteres.",
          }),
          artistName: z.string().min(3, {
            message: "O nome do artista deve conter pelo menos 3 caracteres.",
          }),
          albumTitle: z.string().min(3).optional(),
        }),
      },
    },
    async (request, reply) => {
      const { title, artistName, albumTitle } = request.body;

      let artist = await prisma.artist.findFirst({
        where: { name: artistName },
      });

      if (!artist) {
        artist = await prisma.artist.create({
          data: { name: artistName },
        });
      }

      let albumId: string | null = null;

      if (albumTitle) {
        let album = await prisma.album.findFirst({
          where: {
            title: albumTitle,
            artistId: artist.id,
          },
        });

        if (!album) {
          album = await prisma.album.create({
            data: {
              title: albumTitle,
              artistId: artist.id,
            },
          });
        }

        albumId = album.id;
      }

      const song = await prisma.song.create({
        data: {
          title,
          artistId: artist.id,
          albumId,
        },
      });

      return reply.status(201).send({ songId: song.id });
    }
  );
}
