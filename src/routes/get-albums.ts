import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAlbums(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/albums",
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              songCount: z.number(),
              artistName: z.string(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const albums = await prisma.album.findMany({
        include: {
          songs: true,
          artist: true,
        },
        orderBy: {
          title: "asc",
        },
      });

      const formatted = albums.map((album) => ({
        id: album.id,
        title: album.title,
        songCount: album.songs.length,
        artistName: album.artist.name,
      }));

      return reply.send(formatted);
    }
  );
}
