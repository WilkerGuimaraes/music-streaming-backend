import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getArtists(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/artists",
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              songCount: z.number(),
              albumCount: z.number(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const artists = await prisma.artist.findMany({
        include: {
          Song: true,
          albums: true,
        },
      });

      const result = artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        songCount: artist.Song.length,
        albumCount: artist.albums.length,
      }));

      return reply.send(result);
    }
  );
}
