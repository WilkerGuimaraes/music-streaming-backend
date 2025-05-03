import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getSongsFromPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/playlists/:playlistId/songs",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;

      const songs = await prisma.song.findMany({
        where: {
          playlistsSong: {
            some: {
              playlistId,
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

      return reply.send({
        playlistId,
        songs,
      });
    }
  );
}
