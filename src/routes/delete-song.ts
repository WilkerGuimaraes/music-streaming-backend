import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function deleteSong(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/songs/:songId",
    {
      schema: {
        params: z.object({
          songId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { songId } = request.params;

      await prisma.playlistSong.deleteMany({
        where: { songId },
      });

      await prisma.song.delete({
        where: { id: songId },
      });

      return reply
        .status(200)
        .send({ message: "Música deletada com sucesso." });
    }
  );
}
