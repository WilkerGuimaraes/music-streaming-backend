import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createPlaylist(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/playlists",
    {
      schema: {
        body: z.object({
          name: z.string().min(3, {
            message: "O nome da playlist deve conter pelo menos 3 caracteres.",
          }),
        }),
        response: {
          201: z.object({
            playlistId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.body;

      const existingPlaylist = await prisma.playlist.findUnique({
        where: { name },
      });

      if (existingPlaylist) {
        return reply
          .status(400)
          .send({ message: "Já existe uma playlist com este nome." });
      }

      const playlist = await prisma.playlist.create({
        data: {
          name,
        },
      });

      return reply.status(201).send({ playlistId: playlist.id });
    }
  );
}
