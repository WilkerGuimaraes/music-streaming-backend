import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAlbumSongs(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/albums/:albumId/songs",
    {
      schema: {
        params: z.object({
          albumId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            albumTitle: z.string().optional(),
            songs: z.array(
              z.object({
                title: z.string(),
                artistName: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { albumId } = request.params;

      const songs = await prisma.song.findMany({
        where: { albumId },
        include: {
          artist: true,
          album: true,
        },
        orderBy: {
          title: "asc",
        },
      });

      if (songs.length === 0) {
        const album = await prisma.album.findUnique({
          where: { id: albumId },
        });

        return reply.send({
          albumTitle: album?.title ?? "Álbum desconhecido",
          songs: [],
        });
      }

      const formattedSongs = songs.map((song) => ({
        title: song.title,
        artistName: song.artist.name,
      }));

      return reply.send({
        albumTitle: songs[0].album?.title,
        songs: formattedSongs,
      });
    }
  );
}
