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
          200: z.object({
            artistName: z.string(),
            songs: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
              })
            ),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { artistId } = request.params;

      const artist = await prisma.artist.findUnique({
        where: { id: artistId },
        select: {
          name: true,
          Song: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              title: "asc",
            },
          },
        },
      });

      if (!artist) {
        return reply.status(404).send({ message: "Artista não encontrado." });
      }

      return reply.send({
        artistName: artist.name,
        songs: artist.Song,
      });
    }
  );
}
