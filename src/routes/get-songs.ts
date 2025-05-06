import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getMusics(app: FastifyInstance) {
  app.get(
    "/songs",
    {
      schema: {
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              artist: z.object({
                id: z.string(),
                name: z.string(),
              }),
              album: z
                .object({
                  id: z.string(),
                  title: z.string(),
                })
                .nullable(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const songs = await prisma.song.findMany({
        include: {
          artist: true,
          album: true,
        },
        orderBy: {
          title: "asc",
        },
      });

      return reply.status(200).send(songs);
    }
  );
}
