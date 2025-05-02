import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getMusics(app: FastifyInstance) {
  app.get("/songs", async (request, reply) => {
    const songs = await prisma.song.findMany({
      include: {
        artist: true,
        album: true,
      },
    });

    return reply.status(200).send(songs);
  });
}
