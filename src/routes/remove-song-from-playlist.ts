import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function removeSongFromPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/playlists/:playlistId/songs/:songId",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
          songId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { playlistId, songId } = request.params;

      const relation = await prisma.playlistSong.findFirst({
        where: {
          playlistId,
          songId,
        },
      });

      if (!relation) {
        return reply
          .status(404)
          .send({ message: "Música não encontrada nesta playlist." });
      }

      await prisma.playlistSong.delete({
        where: {
          id: relation.id,
        },
      });

      return reply
        .status(200)
        .send({ message: "Música removida da playlist com sucesso." });
    }
  );
}
