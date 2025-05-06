import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getSongsNotInPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/playlists/:playlistId/songs/not-in-playlist",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              title: z.string(),
              artistName: z.string(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;

      const songsNotInPlaylist = await prisma.song.findMany({
        where: {
          NOT: {
            playlistsSong: {
              some: {
                playlistId: playlistId,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          artist: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          title: "asc",
        },
      });

      const formattedSongs = songsNotInPlaylist.map((song) => ({
        id: song.id,
        title: song.title,
        artistName: song.artist.name,
      }));

      return reply.status(200).send(formattedSongs);
    }
  );
}
