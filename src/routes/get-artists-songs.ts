import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function getArtistSongs(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/artists/:artistId/songs",
    {
      schema: {
        params: z.object({
          artistId: z.string().uuid({ message: "ID do artista inválido." }),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { artistId } = request.params;

      const songs = await prisma.song.findMany({
        where: {
          artistId,
        },
        select: {
          id: true,
          title: true,
        },
      });

      return reply.send(songs);
    }
  );
}
