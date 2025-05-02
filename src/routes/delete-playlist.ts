import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function deletePlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/playlists/:playlistId",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;

      await prisma.playlistSong.deleteMany({
        where: { playlistId },
      });

      await prisma.playlist.delete({
        where: { id: playlistId },
      });

      return reply
        .status(200)
        .send({ message: "Playlist deletada com sucesso." });
    }
  );
}
