import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getPlaylists(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/playlists",
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              songCount: z.number(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const playlists = await prisma.playlist.findMany({
        include: {
          songs: true,
        },
        orderBy: {
          name: "asc",
        },
      });

      const playlistsWithSongCount = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        songCount: playlist.songs.length,
      }));

      return playlistsWithSongCount;
    }
  );
}
