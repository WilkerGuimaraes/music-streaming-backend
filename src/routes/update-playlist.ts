import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function updatePlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/playlists/:playlistId",
    {
      schema: {
        params: z.object({
          playlistId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(3, "O nome da playlist é obrigatório"),
        }),
      },
    },
    async (request, reply) => {
      const { playlistId } = request.params;
      const { name } = request.body;

      const updatedPlaylist = await prisma.playlist.update({
        where: { id: playlistId },
        data: { name },
      });

      return reply.status(200).send({
        message: "Playlist renomeada com sucesso!",
        playlist: updatedPlaylist,
      });
    }
  );
}
