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
        orderBy: {
          title: "asc",
        },
      });

      return songsNotInPlaylist;
    }
  );
}
